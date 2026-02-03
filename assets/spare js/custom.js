(function($) {
    var scroll = $(window).scrollTop();
	if (scroll >= 100) {
		$(".site-header").addClass("scrolled");
	} 
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();
		if (scroll >= 100) {
			$(".site-header").addClass("scrolled");
		} else {
			$(".site-header").removeClass("scrolled");
		}
	});
	if ($('.schema-faq-section').length) {
		$('.schema-faq-section:nth-child(1)').addClass('toggled'); 
		$('.schema-faq-section > strong').on('click',function(){
			if ($(this).parent().hasClass('toggled') ) {
				$(this).parent().removeClass('toggled');
			} else {
				$(this).parent().addClass('toggled');
			}
		});
	}
	if ($('.media-text-slider').length) {
        $('.media-text-slider').append('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div><div class="swiper-pagination"></div>');
        $('.media-text-slider .wp-block-group__inner-container').wrap('<div class="swiper" />');
        $('.media-text-slider .wp-block-group__inner-container').removeClass().addClass('swiper-wrapper');
        $('.media-text-slider .wp-block-media-text').wrap('<div class="swiper-slide" />');
        $('.media-text-slider').removeClass().addClass('media-text-slider');
        var swiper = new Swiper(".media-text-slider .swiper", {
            lazy: true,
            autoHeight: true,
            spaceBetween: 20,
            navigation: {
                nextEl: ".media-text-slider .swiper-button-next",
                prevEl: ".media-text-slider .swiper-button-prev",
            },
            pagination: {
                el: ".media-text-slider .swiper-pagination",
                clickable: true,
            },
            observer: true,
            observeParents: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        $(window).on("resize scroll",function(){
            swiper.update();
        });
	}
	if ($('.tabbed-slider').length) {
		$('.tabbed-slider-nav .wp-block-media-text:not(.disabled)').on('click',function(){
            var index = $(this).index();
            $(this).closest('.tabbed-slider').find('.wp-block-media-text').addClass('toggled').eq(index).addClass('active').siblings().removeClass("active");
            $(this).closest('.tabbed-slider').find('.wp-block-image').addClass('toggled').eq(index).addClass('active').siblings().removeClass("active");
		});
	}
  // Gallery Tabs for Homepage
  if ($('.tabs').length) {
    $('.tabs').wrapInner('<div class="tabs-content"></div>');
    $('.tabs').prepend('<div class="tabs-nav"></div>');
    $('.tabs details').each(function(index){
        var number = index+1;
        $(this).find('.gb-accordion-title').hide();
        var tabItem = $(this).find('.gb-accordion-title').html();
        $('.tabs-nav').append('<button class="tab-link" type="button">'+tabItem+'</button>');
        if ($(this).prop( "open" )) {
           $('.tabs-nav button:nth-child('+number+')').addClass('active');
        }
    });
    $('.tabs-nav button').click(function(){
        var number = $('.tabs-nav button').index(this)+1;
        $(this).addClass('active').siblings('button').removeClass('active');
        $(this).closest('.tabs').find('.tabs-content .gb-block-accordion details').attr('open', false);
        $(this).closest('.tabs').find('.tabs-content .gb-block-accordion:nth-child('+number+') details').attr('open', true);
    }); 
  }

    jQuery("#showGallery").click(function() {
        let gallery = jQuery("#more_gallery");

        if (gallery.hasClass("show")) {
            gallery.removeClass("show");
            $('#showGallery').find('.wp-element-button').text('View More');
            jQuery("html, body").animate({
                scrollTop: jQuery("#kitchen_profile").offset().top
            }, 10);
        } else {
            gallery.addClass("show");
            $('#showGallery').find('.wp-element-button').text('View Less');

        }
    });

    jQuery("#showBRGallery").click(function() {
        let gallery = jQuery("#more_bathroom_gallery");

        if (gallery.hasClass("show")) {
            gallery.removeClass("show");
            $('#showBRGallery').find('.wp-element-button').text('View More');


                jQuery("html, body").animate({
                    scrollTop: jQuery("#bathroom_profile").offset().top
                }, 10);

        } else {
            gallery.addClass("show");
            $('#showBRGallery').find('.wp-element-button').text('View Less');

        }
    });

    jQuery(".showCollapsible").click(function() {
        let gallery = jQuery(this).closest('.gb-block-accordion').find('#collapsible-mobile')

        if (gallery.hasClass("show")) {
            gallery.removeClass("show");
            jQuery(this).find('.wp-element-button').text('View More');


            jQuery("html, body").animate({
                scrollTop: jQuery("#collapsible-mobile").offset().top
            }, 20);

        } else {
            gallery.addClass("show");
            jQuery(this).find('.wp-element-button').text('View Less');

        }
    });

    jQuery('#team-section img').removeAttr('srcset').removeAttr('sizes');

    jQuery(document).ready(function() {
        function updateButtonsVisibility() {
            jQuery('.gb-block-accordion .wp-block-buttons').hide();
            jQuery('.gb-block-accordion.open .wp-block-buttons').show();
        }

        // Run on load (with slight delay to wait for class updates)
        setTimeout(updateButtonsVisibility, 100);

        // Run when clicking tab links
        jQuery('.tabs-new-nav a').on('click', function() {
            setTimeout(updateButtonsVisibility, 100);
        });


        const url = window.location.href;

        if (
            url.indexOf("kitchen-remodeling-seattle") !== -1 ||
            url.indexOf("kitchenmore.com/") !== -1 ||
            url.indexOf("kitchen-remodeling-kirkland") !== -1 ||
            url.indexOf("kitchen-remodeling-lynnwood") !== -1 ||
            url.indexOf("kitchen-remodeling-kent") !== -1 ||
            url.indexOf("kitchen-remodeling-issaquah") !== -1 ||
            url.indexOf("kitchen-remodeling-redmond") !== -1 ||
            url.indexOf("kitchen-remodeling-sammamish") !== -1 ||
            url.indexOf("kitchen-remodeling-newcastle") !== -1 ||
            url.indexOf("kitchen-remodeling-mercer-island") !== -1 ||
            url.indexOf("kitchen-remodeling-renton") !== -1 ||
            url.indexOf("kitchen-remodeling-enumclaw") !== -1 ||
            url.indexOf("kitchen-remodeling-bothell") !== -1 ||
            url.indexOf("kitchen-remodeling-shoreline") !== -1 ||
            url.indexOf("kitchen-remodeling-edmonds") !== -1 ||
            url.indexOf("kitchen-remodeling-woodinville") !== -1 ||
            url.indexOf("kitchen-and-bath-remodeling-mill-creek") !== -1 ||
            url.indexOf("kitchen-remodeling-everett") !== -1
        ) {
            jQuery('img').removeAttr('srcset').removeAttr('sizes');
        }

    });

})(jQuery);
