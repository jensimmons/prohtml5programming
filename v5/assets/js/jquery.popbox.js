(function(){

  $.fn.popbox = function(options){
    var increment = 1;
    var settings = $.extend({
      selector      : this.selector,
      open          : '.trigger',
      box           : '.box',
      arrow         : '.arrow',
      arrow_border  : '.arrow-border',
      close         : '.close'
    }, options);

    var methods = {
      open: function(event){
        event.preventDefault();

        var pop = $(this);
        var box = $(settings['box']);
        var trigger = $(settings['open']);
        var triggerLeft, triggerTop, panelTop;

        // box.find(settings['arrow']).css({'left': box.width()/2 - 10});
        // box.find(settings['arrow_border']).css({'left': box.width()/2 - 10});

        if(box.css('display') == 'block'){
          methods.close();
        } else {
          // box.css({'display': 'block', 'top': 10, 'left': ((pop.parent().width()/2) -box.width()/2 )});
          panelTop = jQuery('.jPanelMenu-panel').offset().top; // needs to be a child of panel so that we're in same postiion: relative context with toc header
          triggerTop = trigger.offset().top + trigger.outerHeight() - panelTop;
          triggerLeft = ((trigger.offset().left + trigger.outerWidth()/2) - box.outerWidth()) < 0 ?  0 : ((trigger.offset().left + trigger.outerWidth()/2) - box.outerWidth());
          // console.log(trigger.offset().left);
          // console.log(box.width());
          box.css({'display': 'block', 'top': triggerTop, 'left': triggerLeft });
          
          $(window).on('scroll.popbox.box' + increment, function (e) {
            var boxOuterHeight = box.outerHeight(true),
            windowOuterHeight = $(window).outerHeight(true),
            triggerOuterHeight = trigger.outerHeight(true),
            triggerOffsetTop = trigger.offset().top,
            windowScrollTop = $(window).scrollTop(),
            boxOffsetTop = box.offset().top,
            panelTop = jQuery('.jPanelMenu-panel').offset().top;
            
            
            
            // if box height < window height - trigger.outerHeight, keep at top of screen
            if (box.outerHeight(true) <= $(window).outerHeight() - trigger.outerHeight(true)) {
              box.css({'top': trigger.offset().top + trigger.outerHeight() });
            } else { // box height > window height - trigger.outerHeight
              // if windowScrollTop + windowOuterHeight > boxOffsetTop + boxOuterHeight => glue to bottom of window
              if ((windowScrollTop  + windowOuterHeight) > (boxOffsetTop + boxOuterHeight)) {
                // console.log('glue to bottom');
                box.css({'top': windowScrollTop + windowOuterHeight - boxOuterHeight - panelTop });
              } else if ( windowScrollTop + triggerOuterHeight < boxOffsetTop ) { 
                // console.log('glue to top');
                // if window.scrollTop() + trigger.outHeight() > box.offset().top => glue to usual top position
                box.css({'top': triggerOffsetTop + triggerOuterHeight - panelTop });
              } else {
                // console.log('let scroll');
                
              }
              
              
            }
            
          });
          
          $(window).on('resize.popbox.box' + increment, function (e) {
            triggerLeft = ((trigger.offset().left + trigger.outerWidth()/2) - box.outerWidth()) < 0 ?  0 : ((trigger.offset().left + trigger.outerWidth()/2) - box.outerWidth());
            box.css({ 'left': triggerLeft });
          });
        }
      },

      close: function(){
        $(settings['box']).fadeOut("fast");
        
        $(window).off('scroll.popbox.box' + increment);
        $(window).off('resize.popbox.box' + increment);
      }
    };

    $(document).bind('keyup', function(event){
      if(event.keyCode == 27){
        methods.close();
      }
    });

    $(document).bind('click', function(event){
      if(!$(event.target).closest(settings['selector']).length){
        methods.close();
      }
    });
    


    return this.each(function(){
      increment++;
      $(this).css({'width': $(settings['box']).width()}); // Width needs to be set otherwise popbox will not move when window resized.
      $(settings['open'], this).bind('click', methods.open);
      // $(settings['open'], this).parent().find(settings['close']).bind('click', function(event){
      //   event.preventDefault();
      //   methods.close();
      // });
    });
  }

}).call(this);