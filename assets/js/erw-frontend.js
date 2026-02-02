jQuery(document).ready(function($){
	const frontStars =  document.querySelector('.front-stars');
	const rate = e => {
		const percentage = e.target.value + '%';		
		frontStars.style.width = percentage;
	};
	if(jQuery('.erw-swiper-container').length > 0){
		new erw_swiper('.erw-swiper-container', {
			loop: true,
			nextButton:".erw-next-button",
			prevButton:".erw-prev-button",
			breakpoints:{
				1920:{
					slidesPerView:3,
				},
				1028:{
					slidesPerView:2,
				},
				600:{
					slidesPerView:1,
				}
			},
		});	
	}

});


jQuery(function () {
	jQuery(".erw-all-reviews-wrapper .erw-testimonial-wrapper").slice(0, 20).show();
	if (jQuery(".erw-all-reviews-wrapper .erw-testimonial-wrapper:hidden").length == 0) {
		jQuery("#loadMore").fadeOut('slow');
	}
	jQuery("#loadMore").on('click', function (e) {
		e.preventDefault();
		jQuery(".erw-all-reviews-wrapper .erw-testimonial-wrapper:hidden").slice(0, 10).slideDown();
		if (jQuery(".erw-all-reviews-wrapper .erw-testimonial-wrapper:hidden").length == 0) {
			jQuery("#loadMore").fadeOut('slow');
		}
	});
});