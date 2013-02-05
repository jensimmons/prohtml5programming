#!/usr/bin/env ruby

require 'nokogiri'

# ensure input / output filenames
if ARGV.length != 2
  puts "Usage: ruby convert_xml.rb [input FILENAME] [output FILENAME]"
  exit(1)
end

i_file = ARGV[0]
o_file = ARGV[1]

# ensure input file exists
if !File.exist?(i_file)
  puts "Cannot find input file: #{i_file}, please try again."
  exit(1)
end

f = File.open(i_file)
@doc = Nokogiri::XML(f) do |config|
  # config.options = Nokogiri::XML::ParseOptions::NOBLANKS
end

body = @doc.at_css "Body"

#  <Emphasis Type="Italic"> #=> <em>
em = body.css "Emphasis[Type=Italic]"
em.each do | emp | 
  emp.remove_attribute('Type')
  emp.name = 'em'
end

#  <Emphasis Type="Bold"> #=> <strong>
strong = body.css "Emphasis[Type=Bold]"
strong.each do | emp | 
  emp.remove_attribute('Type')
  emp.name = 'strong'
end

# wrap IndexTerms in spans w/classes
indexterms = body.css "IndexTerm"
indexterms.each do |term|
  primary = term.css "Primary"
  primary.each do |prim|
    prim.name = 'span'
    prim['class']= 'primary'
  end
  secondary = term.css "Secondary"
  secondary.each do |sec|
    sec.name = 'span'
    sec['class']= 'secondary'
  end
  seealsos = term.css "SeeAlso"
  seealsos.each do |seealso|
    seealso.name = 'span'
    seealso['class'] = 'see-also'
  end
  term['class'] = 'index-term'
  term.name = 'span'
end

# <Literal> #=> <code>
literals = body.css "Literal"
literals.each do |lit|
  lit.name = 'code'
end

# tables
tables = body.css "Table"
tables.each do |table|
  table.name = "table"
  id = table.attr('ID').to_s.downcase
  table.remove_attribute('Float')
  table.remove_attribute('ID')
  table['id'] = id
  num = (table.at_css "CaptionNumber").content
  caption = (table.at_css "CaptionContent").content
  table_caption = num + '. ' + caption
  tgroup = table.at_css "tgroup"

  table.content = ''
  tgroup.children.each do |child|
    table.add_child(child)
  end

  (table.css "colspec").remove
  rows = table.css "row"
  rows.each do |row|
    row.name = 'tr'
    cells = row.css "entry"

    cells.each do |cell|
      cell.name = 'td'
      cell_paras = cell.css "SimplePara"
      cell_str = cell_paras.map {|p| p.content }.join(' ')
      cell.content = cell_str
      cell.remove_attribute('colname')
    end
  end
  # table.add_next_sibling "\n"
end


# image figures
figures = body.css "Figure"
figures.each do |fig|
  
  num = (fig.at_css "CaptionNumber").inner_html
  caption = (fig.at_css "CaptionContent SimplePara").inner_html
  caption = num + '. ' + caption

  figcaption = Nokogiri::XML::Node.new "figcaption", @doc
  figcaption.inner_html = caption

  
  fig.name = 'figure'
  fig.remove_attribute('Float')
  fig.remove_attribute('Category')
  fig['class'] = 'image'
  id = fig.attribute('ID').to_s.downcase
  fig.set_attribute('ID', id)
  
  fig.content = ''
  image = Nokogiri::XML::Node.new "img", @doc
  chap_fig = num.downcase.split(' ')[1]
  chap = chap_fig.split(' ')[0]
  # NOTE: image files need to be renamed to match
  image['src'] = "images/ch#{chap}/fig#{chap_fig}.png"
  fig.add_child(image)
  fig.add_child(figcaption)
  # fig.after("\n")
  fig.parent.after(fig)
end

# code_listings = <FormalPara[RenderingStyle=Style1]> w/ heading of "Listing x-xx"
special_paras = body.css "FormalPara[RenderingStyle=Style1]"
special_paras.each do |p|
  # if we have a heading and that heading consists of Listing... we have a code listing
  heading = p.at_css "Heading"
  if heading
    if /^listing/i =~ heading.content
      #code listing
      # iterate thru next siblings of <Para Type="Programcode"> for the code listings
      nodes_arr = []
      ne = p.next_element
      while ne && ne.attribute('Type') && ne.attribute('Type').to_s == 'Programcode'
        nodes_arr << ne
        ne = ne.next_element
      end
      
      # join with "\n" wrap with <pre><code>
      pre = Nokogiri::XML::Node.new "pre", @doc
      code = Nokogiri::XML::Node.new "code", @doc
      code.content = nodes_arr.map {|n| n.content }.join("\n")
      code.parent = pre
      p.add_child(pre)
      
      #clear the old para tags
      nodes_arr.each do |n|
        n.remove
      end

      p.remove_attribute('RenderingStyle')
      p.name = 'figure'
      p['class'] = 'listing'
      
      
      heading.name = 'figcaption'
      
      caption = p.at_css "Para"
      heading.add_child ' '
      heading.add_child caption.inner_html
      caption.remove
      
    else
      # assume aside for now 
      # puts 'not code listing'
      p.name = 'aside'
      p.remove_attribute('RenderingStyle')
      heading.name = 'h3'
      if /^n Note$/ =~ heading.text
        heading.content = 'Note'
      end
      p.add_next_sibling "\n"
    end
    
  end
  
end

# unordered lists
uls = body.css "UnorderedList"
uls.each do |ul|
  ul.name = 'ul'
  ul.remove_attribute('Mark')
  lis = ul.css "ItemContent"
  lis.each do |li|
    li.name = 'li'
  end
end

# ordered lists
ols = body.css "OrderedList"
ols.each do |ol|
  ol.name = 'ol'
  lis = ol.css "ListItem"
  lis.each do |li|
    # TODO: check for format of itemnumber to set appropriate counter style
    (li.css "ItemNumber").remove
    li.name = 'li'
    li.inner_html = (li.css "ItemContent").inner_html
  end

end

#all subsections + (sub)headings
subsections = body.css "Section2"
subsections.each do |subsection|
  headings = subsection.css "Heading"
  headings.each do |heading|
    heading.name = 'h3'
  end
  subsection.name = 'section'
  id = subsection.attr('ID').to_s.downcase
  subsection.set_attribute('ID', id)
end

# all sections + headings
sections = body.css "Section1"
sections.each do |section|
  heading = section.at_css "Heading"
  heading.name = 'h2'
  section.name = 'section'
  id = section.attr('ID').to_s.downcase
  section.set_attribute('ID', id)
end
# 
# all code paras (need to do this after we've done the code listings themselves)
while ((body.css "Para[Type=Programcode]").length > 0)
  nodes_arr = []
  ne = body.at_css "Para[Type=Programcode]"
  while ne && ne.name.to_s == 'Para' && ne.attribute('Type') && ne.attribute('Type').to_s == 'Programcode'
    nodes_arr << ne
    ne = ne.next_element
  end
  # join with "\n" wrap with <pre><code>
  pre = Nokogiri::XML::Node.new "pre", @doc
  code = Nokogiri::XML::Node.new "code", @doc
  code.inner_html = nodes_arr.map {|n| n.inner_html }.join("\n")
  code.parent = pre
  nodes_arr[0].before(pre)
      
  #clear the old para tags
  nodes_arr.each do |n|
    n.remove
  end
end

# internal refs
# TOOD: links?
irs = body.css "InternalRef"
irs.each do |ir|
  ir.name = 'span'
  ir['class'] = 'internal-reference'
  id = 'ir_' + ir.attr('RefID').downcase
  ir.remove_attribute('RefID')
  ir.set_attribute('id', id) 
end

# external refs
# TODO: create links for these?
ers = body.css "ExternalRef"
ers.each do |er|
  er.name = 'span'
  er['class'] = 'external-reference'
  source = er.at_css "RefSource"
  source.name = 'span'
  source['class'] = 'ref-source'
  target = er.at_css "RefTarget"
  target.name = 'span'
  target['class'] = 'ref-target'
  target.content = target.attr('TargetType') + "::" + target.attr('Address')
  target.remove_attribute('TargetType')
  target.remove_attribute('Address')
end

# all reg paras
paras = body.css "Para"
paras.each do |p|
  p.name = 'p'
  p.add_next_sibling "\n"
end
  


# trim to our article content
body = body.inner_html

#  write new file
@newdoc = Nokogiri::HTML(body.encode('UTF-8'))
File.open(o_file,'w') {|file| @newdoc.write_html_to file }