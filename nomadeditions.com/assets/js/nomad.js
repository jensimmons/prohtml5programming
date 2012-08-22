var ADAPT_CONFIG = {
    // Where is your CSS?
    path: '/assets/css/grids/',

    // false = Only run once, when page first loads.
    // true = Change on window resize and page tilt.
    dynamic: true,

    // First range entry is the minimum.
    // Last range entry is the maximum.
    // Separate ranges by "to" keyword.
    range: [
    '0px    to 750px  = mobile.css',
    '750px  to 1920px  = 850.css'
    ]
};

(function(window, document, undefined){
    // Add jQuery "Does element exist" function
    $.fn.exists = function(){
        return $(this).length > 0;
    }
	
    // Make an element imitate static positioning, but animated
    function staticFloatElement(element, top_spacing, footer_height) {
        // Make sure we can actually move the elem
        element.css({
            'position':'relative'
        });
        // Default vals (pixels)
        if (top_spacing === undefined) top_spacing = 20;
        if (footer_height === undefined) footer_height = 400;
        var initial_top = element.offset().top;
        // Self executing wonderfulness
        (function animateStaticPosition() {
            var elem_top = element.offset().top;
            var window_top = $(window).scrollTop();
            if (window_top != elem_top) {
                var top = window_top - initial_top + top_spacing;
                if (top < 0)
                    top = 0;
                else {
                    var elem_bottom  = element.height() + top;
                    var doc_bottom = $(document).height() - footer_height;
	                
                    // Limit how far down the element can go (so it doesn't overlap the footer, etc)
                    if (elem_bottom > doc_bottom)
                        top = top - (elem_bottom - doc_bottom);
                }
                element.animate({
                    'top':top
                }, 500, animateStaticPosition);
            }
        })();
    }
	
    function back_issue_paging(event) {
        var container = $(this).parent().parent().parent().parent();
        var publication = container.attr('id');
        var page = $(this).attr('id').split("-")[1];
        var url = "/my_editions/" + publication + "/page/" + page;
        $.ajax({
            url: url,
            context: container,
            success: function(data) {
                $(this).animate({
                    'opacity':0
                }, 150, function(){
                    $(this).html(data);
                    $(this).animate({
                        'opacity':1
                    }, 150);
                });
            }
        });
        event.preventDefault();
    }
	
    // Init Page function run by jQuery document.ready
    function initPage() {
        // Modal Message
        if ($('#message-link').exists() && modal) {
            $('#message-link').fancybox({
                'modal': true,
                'overlayOpacity': 0.8,
                'overlayColor':'#333',
                'showCloseButton': false,
                'hideOnOverlayClick': true,
                'hideOnContentClick': true,
            });
            $('#message-link').click();
        }
		
        // Make Blog sidebar have animated static positioning
        if ($("#blog-right").exists()) {
            staticFloatElement($("#blog-right"), -60);
        }
		
        // Back issue paging
        if ($('.back-issue-container').exists()) {
            $('.back-issue-page').live("click", back_issue_paging);
        }
		
        // Set Current Page in Nav
        var CURRENT_PAGE = $('#nav-' + PAGE + ' a');
        var NAV_ROOT = $('#nav-top ul li');
        CURRENT_PAGE.addClass('active');
        NAV_ROOT.hover(function(){
            NAV_ROOT.find('a').removeClass('active');
        }, function(){
            CURRENT_PAGE.addClass('active');
        });
	    
        // Newsletter
        $('.subscribe-newsletter').click(function(event) {
            if (!$(this).hasClass('disabled')) {
                var button = this;
                var list_id = $(button).attr('data-pubid');
                var params = {
                    email_address: $(button).siblings('#email_address').val()
                };
                $.ajax({
                    url: '/subscribers/newsletter/' + list_id + '/',
                    data: $.param(params),
                    type: 'POST',
                    success: function(response){
                        $(button).addClass('disabled');
                        $(button).children('span').html(response);
                    },
                    error: function(){
                        $(button).addClass('disabled');
                        $(button).children('span').html("Error :(");
                    }
                });
            }
            event.preventDefault();
        });

        $('#read_free_copy').click(function(event){
            var email_address = $('#email_address').val();

            $("#email_address").tipsy({
                trigger:'manual',
                gravity: 's'
            });
            $("#email_address").tipsy("hide");
            var pub_name = $(this).attr('data-pubname');
            $.ajax({
                async: false,
                dataType: "json",

                data: {
                    email_address:email_address
                },
                url: "/readfree/" + $(this).attr('data-pubid') + "/",
                success:  function(data) {
                	try{
	                    if (data.error) {
	                        $('#email_address').attr('original-title', data.error)
	                        $("#email_address").tipsy("show");
	                    }else{
	                        _gaq.push(['_trackEvent', 'Read Free copy Landing Page ' + pub_name, 'Click', 'Publication ' + pub_name]);
	                        var new_window = window.open(data.url, '_blank');
	                        new_window.focus();
	                    }
                	}catch(e){
                        _gaq.push(['_trackEvent', 'Read Free copy Landing Page ' + pub_name, 'Click', 'Publication ' + pub_name]);
                        window.location.href = data.url;
                	}
                }
            });
        });
    }

    // Document ready Function
    $(document).ready(initPage);
})(this, this.document);