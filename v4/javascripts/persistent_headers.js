/* **slightly** modified from: http://css-tricks.com/persistent-headers/ */
function updateTableHeaders() {
   $(".persist-area").each(function() {
   
       var el             = $(this),
           orig           = $('.orig-menu', this),
           offset         = el.offset(),
           scrollTop      = $(window).scrollTop(),
           floatingHeader = $(".floatingHeader", this)
       if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
           floatingHeader.css({
            "visibility": "visible",
            "left": orig.offset().left + 'px'
           });
       } else {
           floatingHeader.css({
            "visibility": "hidden"
           });      
       };
   });
}

// DOM Ready      
$(function() {

   var clonedHeaderRow;

   $(".persist-area").each(function() {
       clonedHeaderRow = $(".persist-header", this);
       var left = clonedHeaderRow.offset().left;

       clonedHeaderRow
         .before(clonedHeaderRow.clone().css({ "width": clonedHeaderRow.width() }).addClass("floatingHeader").removeClass('orig-menu')
       )

         
   });
   
   // set to resize so that we set the left position appropriately as well
   $(window)
    .scroll(updateTableHeaders)
    .resize(updateTableHeaders)
    .trigger("scroll");
    
});