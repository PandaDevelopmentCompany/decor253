(function($) {
	'use strict';

	$.fn.multiselect = function(options) {
		var settings = $.extend({
			onChange: function() {}
		}, options);

		this.each(function() {
			var $selectList = $(this);
			var $title = $selectList.find('.wra-title');

			function updateTitle() {
				var selectedServices = $selectList.find('input[type="checkbox"]:checked')
				.map(function() { return $(this).next('label').text(); })
				.get()
				.join(', ');

				var servicelabel = servicelabel;
				if(servicelabel){
					var service_lable = servicelabel;
				}else{
					var service_lable = 'Select Services';
				}

				$title.text(selectedServices.length ? selectedServices : service_lable);
			}

			function setupEventHandlers() {
				$selectList.find('.wra-title').on('click', function() {
					$selectList.find('.wra-select-options').toggle();
				});

				$selectList.find('input[type="checkbox"]').on('change', function() {
					updateTitle();
					settings.onChange.call(this);
				});

				$(document).on('click', function(e) {
					if (!$selectList.is(e.target) && $selectList.has(e.target).length === 0) {
						$selectList.find('.wra-select-options').hide();
					}
				});
			}

			setupEventHandlers();
			updateTitle();
		});

		return this;
	};

	$(document).ready(function () {
		function initSwiper(selector, slidesPerViewDefault) {
			if (!$(selector).length) return;
	
			let swiperInstance = new Swiper(selector, {
				slidesPerView: slidesPerViewDefault,
				spaceBetween: 10,
				loop: true,
				slidesPerGroup: 1,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					dynamicBullets: true,
				},
				autoplay: {
					delay: 3000,
					disableOnInteraction: true,
				},
				breakpoints: {
					480: { slidesPerView: 1,spaceBetween: 1 },
					540: { slidesPerView: 1,spaceBetween: 1 },
					768: { slidesPerView: 2,spaceBetween: 5 },
					1024: { slidesPerView: slidesPerViewDefault }, // Desktop default
				},
				on: {
					init: function () {
						// console.log(`Initialized Swiper for ${selector} | slidesPerView:`, this.params.slidesPerView);
					}
				}
			});
	
			return swiperInstance;
		}
	
		let swipers = {};
	
		function initAllSwipers() {
			// console.log("Initializing all Swipers (Desktop)...");
			swipers['swiper2'] = initSwiper('.wra-swiper-column-2-container', 2);
			swipers['swiper3'] = initSwiper('.wra-swiper-column-3-container', 3);
			swipers['swiper4'] = initSwiper('.wra-swiper-column-4-container', 4);
		}
	
		function mobileFunctionality() {
			// console.log("Initializing all Swipers (Mobile - Single Layout)...");
			swipers['swiper2'] = initSwiper('.wra-swiper-column-2-container', 1);
			swipers['swiper3'] = initSwiper('.wra-swiper-column-3-container', 1);
			swipers['swiper4'] = initSwiper('.wra-swiper-column-4-container', 1);
		}
	
		function destroyAllSwipers() {
			// console.log("Destroying all Swipers...");
			$.each(swipers, function (key, swiper) {
				if (swiper) {
					swiper.destroy(true, true);
				}
			});
			swipers = {}; // Clear all instances
		}
	
		function checkScreenWidth() {
			let screenWidth = $(window).width();
			destroyAllSwipers(); // Destroy before re-initializing
			if (screenWidth <= 767) {
				mobileFunctionality();
			} else {
				initAllSwipers();
			}
		}
	
		// Initial check on page load
		checkScreenWidth();
	
		// Reinitialize on window resize or orientation change
		$(window).on('resize orientationchange', function () {
			// console.log("Window resized or rotated. Rechecking screen width...");
			setTimeout(checkScreenWidth, 300); // Delay to ensure proper detection
		});
		
		function initSingleSwiper(selector) {
        if (!$(selector).length) return;

        return new Swiper(selector, {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            slidesPerGroup: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.custom-swiper-next',
                prevEl: '.custom-swiper-prev',
            },
            autoplay: {
                delay: 8000,
                disableOnInteraction: true,
            },
        });
    }

    initSingleSwiper('.wra-swiper-single-container');

	});
	
	
	

	$(document).ready(function() {
		$('.wra-select-list').multiselect({
			onChange: function() {
				updateReviews();
			}
		});

		$('#use_for_all').on('change', function() {
			updateReviews();
		});

		let isSubmitting = false;
		var wra_recaptcha_type = wraReview.recaptcha_type || '';


		$('#new_wra_post').on('submit', function(event) {
			event.preventDefault();


			if (isSubmitting) return; 
			isSubmitting = true;
			
			var isValid = true;
			var selectedServices = $('input[name="select_product[]"]:checked');
			var errorMessage = '';

			var $submitButton = $(this).find('button[type="submit"]');
			$submitButton.prop('disabled', true);

			$('#recaptcha-error').text('').hide();
			$('#service-error-message').hide();

			if (selectedServices.length == 0) {
				$('#service-error-message').show();
				isValid = false;
				isSubmitting = false;
			}

			if (selectedServices.length > 0) {
				if ($('#use_for_all').is(':checked')) {
					var $ratingDescriptionField = $('textarea[name="rating_description_all"]');
					if ($ratingDescriptionField.length && $ratingDescriptionField.val()) {
						var wordCount = $ratingDescriptionField.val().trim().split(/\s+/).length;
						if (wordCount < 5) {
							isValid = false;
							$ratingDescriptionField.addClass('wra-error');
							$ratingDescriptionField.next('.wra-error-message').remove();
							$ratingDescriptionField.after('<span class="wra-error-message" style="color: red;">Please enter at least 5 words in the rating description.</span>');
							isSubmitting = false;
						} else {
							$ratingDescriptionField.removeClass('wra-error');
							$ratingDescriptionField.next('.wra-error-message').remove();
						}
					}

					var $ratingField = $('input[name="rating_all"]:checked');
					if ($ratingField.length === 0) {
						isValid = false;
						var $fieldset = $('input[name="rating_all"]').closest('fieldset');
						$fieldset.addClass('wra-error');
						$fieldset.next('.wra-error-message').remove();
						$fieldset.after('<span class="wra-error-message" style="color: red;">Please select a rating.</span>');
						isSubmitting = false;
					} else {
						var $fieldset = $('input[name="rating_all"]').closest('fieldset');
						$fieldset.removeClass('wra-error');
						$fieldset.next('.wra-error-message').remove();
					}
				} else {
					selectedServices.each(function() {
						var serviceId = $(this).val();

						var $ratingDescriptionField = $('textarea[name="rating_description_' + serviceId + '"]');
						if ($ratingDescriptionField.length && $ratingDescriptionField.val()) {
							var wordCount = $ratingDescriptionField.val().trim().split(/\s+/).length;
							if (wordCount < 5) {
								isValid = false;
								$ratingDescriptionField.addClass('wra-error');
								$ratingDescriptionField.next('.wra-error-message').remove();
								$ratingDescriptionField.after('<span class="wra-error-message" style="color: red;">Please enter at least 5 words in the rating description.</span>');
								isSubmitting = false;
							} else {
								$ratingDescriptionField.removeClass('wra-error');
								$ratingDescriptionField.next('.wra-error-message').remove();
							}
						}

						var $ratingField = $('input[name="rating_' + serviceId + '"]:checked');
						if ($ratingField.length === 0) {
							isValid = false;
							var $fieldset = $('input[name="rating_' + serviceId + '"]').closest('fieldset');
							$fieldset.addClass('wra-error');
							$fieldset.next('.wra-error-message').remove();
							$fieldset.after('<span class="wra-error-message" style="color: red;">Please select a rating.</span>');
							isSubmitting = false;
						} else {
							var $fieldset = $('input[name="rating_' + serviceId + '"]').closest('fieldset');
							$fieldset.removeClass('wra-error');
							$fieldset.next('.wra-error-message').remove();
						}
					});
				}
			}

			if (!isValid) {
				if (errorMessage) {
					alert(errorMessage);
				}
				$submitButton.prop('disabled', false);
				return;
			}

			
			if (recaptchaSiteKey !== '') {
				if (wra_recaptcha_type === 'v2') {
		
					var recaptchaResponse = grecaptcha.getResponse();
					if (!recaptchaResponse) {
						$('#recaptcha-error').text('Please complete the reCAPTCHA.').show();
						$submitButton.prop('disabled', false);
						isSubmitting = false;
						return;
					}

					var formData = $(this).serialize() + '&nonce=' + wraReview.nonce + '&g-recaptcha-response=' + recaptchaResponse;
					var btn_width = $('form#new_wra_post #submit').outerWidth();
					$('form#new_wra_post #submit').css("min-width", btn_width);
					$('form#new_wra_post #button-text').hide();
					$('form#new_wra_post #spinner').show();
					$('form#new_wra_post #submit').attr('disabled', true);
				
					$.ajax({
						type: 'POST',
						url: wraReview.ajax_url,
						data: formData,
						dataType: 'json',
						success: function(response) {
							if (response.success) {
								$('#wra-thank-you-popup').fadeIn();
								$('#new_wra_post')[0].reset();
							} else {
								$('#recaptcha-error').text(response.data.message).show();
							}
						},
						error: function(xhr, status, error) {
							alert('An error occurred. Please try again.');
						},
						complete: function() {
							$('form#new_wra_post #spinner').hide();
							$('form#new_wra_post #button-text').show();
							$('form#new_wra_post #submit').attr('disabled', false);
						}
					});
				}else if (wra_recaptcha_type === 'v3') {
					grecaptcha.execute(recaptchaSiteKey, { action: 'submit' }).then(function(token) {
						var formData = $(this).serialize() + '&nonce=' + wraReview.nonce + '&g-recaptcha-response=' + token;
				
					var btn_width = $('form#new_wra_post #submit').outerWidth();
					$('form#new_wra_post #submit').css("min-width", btn_width);
					$('form#new_wra_post #button-text').hide();
					$('form#new_wra_post #spinner').show();
					$('form#new_wra_post #submit').attr('disabled', true);
				
					$.ajax({
						type: 'POST',
						url: wraReview.ajax_url,
						data: formData,
						dataType: 'json',
						success: function(response) {
							if (response.success) {
								$('#wra-thank-you-popup').fadeIn();
								$('#new_wra_post')[0].reset();
							} else {
								$('#recaptcha-error').text(response.data.message).show();
								$('#recaptcha-error').text('Please complete the reCAPTCHA.').show();
								$('#recaptcha-type-error').show();
								isSubmitting = false;
							}
						},
						error: function(xhr, status, error) {
							alert('An error occurred. Please try again.');
						},
						complete: function() {
							$('form#new_wra_post #spinner').hide();
							$('form#new_wra_post #button-text').show();
							$('form#new_wra_post #submit').attr('disabled', false);
						}
					});
				}.bind(this))
				}
			}else{
				var btn_width = $('form#new_wra_post #submit').outerWidth();
				$('form#new_wra_post #submit').css("min-width", btn_width);
				$('form#new_wra_post #button-text').hide();
				$('form#new_wra_post #spinner').show();
				$('form#new_wra_post #submit').attr('disabled', true);

				var formData = $(this).serialize() + '&nonce=' + wraReview.nonce;
				$.ajax({
					type: 'POST',
					url: wraReview.ajax_url,
					data: formData,
					dataType: 'json',
					success: function(response) {
						if (response.success) {
							$('#wra-thank-you-popup').fadeIn();
							$('#new_wra_post')[0].reset();

							setTimeout(function() { 
								location.reload();
							},2000
						);
						}

						
					},
					error: function(xhr, status, error) {
						alert('An error occurred. Please try again.');
					},
					complete: function() {
						$('form#new_wra_post #spinner').hide();
						$('form#new_wra_post #button-text').show();
						$('form#new_wra_post #submit').attr('disabled', false);
					}
				});
			}
		});

		$(document).on('click', '#wra-close-popup', function() {
			location.reload();
		});
		
	$(document).ready(function() {
		var preselectedLocation = $('#wra_select_location').val();
		if (preselectedLocation) {
			$('#wra_select_location').trigger('change');
		}
    
	});

	$('form#new_wra_post #wra_select_location').on('change', function() {
		var locationID = $(this).val();
		$('form#new_wra_post #wra_service_options').empty();
		if (locationID) {
			$.ajax({
				url: wraReview.ajax_url,
				type: 'POST',
				data: {
					action: 'wra_load_services_by_location',
					location_id: locationID,
					nonce: wraReview.nonce
				},
				success: function(response) {
					if (response.success) {
						$('form#new_wra_post #wra_service_options').html(response.data);
						$('.wra-select-list').multiselect({
							onChange: function() {
								updateReviews();
							}
						});
					}
					updateReviews();
				}
			});
		}
	});

});

$(document).on('ajaxComplete', function() {
	$('.wra-select-list').multiselect({
		onChange: function() {
			updateReviews();
		}
	});
});

var reviewData = {};

function saveReviewData() {
	$('.wra-prod-review').each(function() {
		var serviceId = $(this).find('.wra-catId-field').val();
		if (!serviceId) return;

		reviewData[serviceId] = {
			description: $(this).find('.wra-desc-field').val(),
			rating: $(this).find('input[name="rating_' + serviceId + '"]:checked').val()
		};
	});
}

function restoreReviewData() {
	$('.wra-prod-review').each(function() {
		var serviceId = $(this).find('.wra-catId-field').val();
		if (!serviceId || !reviewData[serviceId]) return;

		$(this).find('.wra-desc-field').val(reviewData[serviceId].description);
		var $ratingInputs = $(this).find('input[name="rating_' + serviceId + '"]');
		var ratingValue = reviewData[serviceId].rating;
		$ratingInputs.filter('[value="' + ratingValue + '"]').prop('checked', true);
		updateStarRating($ratingInputs.filter('[value="' + ratingValue + '"]'));
	});
}

function updateReviews() {
	var $container = $('#wra-reviews-container');
	var isUseForAllChecked = $('#use_for_all').is(':checked');
	var selectedServices = $('input[name="select_product[]"]:checked');

	saveReviewData();

	if (selectedServices.length > 1) {
		$('form#new_wra_post .wra-field.for-all').show();
	} else {
		$('form#new_wra_post .wra-field.for-all').hide();
	}

	if (isUseForAllChecked) {
		var firstReviewData = reviewData['all'] || { description: '', rating: '' };

		var reviewHtml = `
		<div class="wra-prod-review for-all">
		<div class="wra-desc">
		<div class="wra-field wra-review-wrap">
		<textarea name="rating_description_all" id="desc_all" class="wra-desc-field" placeholder="Review for all selected services" required>${firstReviewData.description || ''}</textarea>
		</div>
		</div>
		<div class="wra-starlisting">
		<label for="Rating_all" class="rating-title-frm">Your Rating</label>
		<fieldset class="wra-rate">
		<input type="radio" id="rating1_all" name="rating_all" value="1">
		<label for="rating1_all">&#9733;</label>
		<input type="radio" id="rating2_all" name="rating_all" value="2">
		<label for="rating2_all">&#9733;</label>
		<input type="radio" id="rating3_all" name="rating_all" value="3">
		<label for="rating3_all">&#9733;</label>
		<input type="radio" id="rating4_all" name="rating_all" value="4">
		<label for="rating4_all">&#9733;</label>
		<input type="radio" id="rating5_all" name="rating_all" value="5">
		<label for="rating5_all">&#9733;</label>
		</fieldset>
		<div class="wra-rating-value-star">
		<input type="hidden" id="info_all" name="Rating[]" value="" class="wra-rating-field">
		</div>
		</div>
		</div>`;

		$container.html(reviewHtml);
		restoreReviewData();
	} else {
		var reviewHtml = '';
		selectedServices.each(function() {
			var serviceId = $(this).val();
			var firstReviewData = reviewData[serviceId] || { description: '', rating: '' };

			reviewHtml += `
			<div class="wra-prod-review">
			<div class="wra-catId-field" style="display: none;">${serviceId}</div>
			<div class="wra-desc">
			<div class="wra-field wra-review-wrap">
			<textarea name="rating_description_${serviceId}" class="wra-desc-field" placeholder="Review for ${$(this).next('label').text()}" required>${firstReviewData.description}</textarea>
			</div>
			</div>
			<div class="wra-starlisting">
			<label for="Rating_${serviceId}" class="rating-title-frm">Your Rating</label>
			<fieldset class="wra-rate">
			<input type="radio" id="rating1_${serviceId}" name="rating_${serviceId}" value="1">
			<label for="rating1_${serviceId}">&#9733;</label>
			<input type="radio" id="rating2_${serviceId}" name="rating_${serviceId}" value="2">
			<label for="rating2_${serviceId}">&#9733;</label>
			<input type="radio" id="rating3_${serviceId}" name="rating_${serviceId}" value="3">
			<label for="rating3_${serviceId}">&#9733;</label>
			<input type="radio" id="rating4_${serviceId}" name="rating_${serviceId}" value="4">
			<label for="rating4_${serviceId}">&#9733;</label>
			<input type="radio" id="rating5_${serviceId}" name="rating_${serviceId}" value="5">
			<label for="rating5_${serviceId}">&#9733;</label>
			</fieldset>
			<div class="wra-rating-value-star">
			<input type="hidden" id="info_${serviceId}" name="Rating[]" value="" class="wra-rating-field">
			</div>
			</div>
			</div>`;
		});

		$container.html(reviewHtml);
		restoreReviewData();
	}

	$('.wra-starlisting input[type="radio"]').on('change', function() {
		updateStarRating($(this));
	});
}

function updateStarRating(radio) {
	var rating = parseInt(radio.val(), 10);
	var $fieldset = radio.closest('.wra-rate');
	var $labels = $fieldset.find('label');

	$labels.each(function(index) {
		if (index < rating) {
			$(this).addClass('full');
		} else {
			$(this).removeClass('full');
		}
	});
}

$(document).on('click', '#bar-close-btn', function() {
	$('.wra-static-badge-wrap').hide();
});

// setTimeout(function () {
// $('#wra_select_location').each(function () {
// 	var $select = $(this);
// 	var $options = $select.find('option:not(:disabled)');

// 	if ($options.length === 1) {
// 		$select.val($options.val()).change();
// 		$select.hide();
// 	}

// 	console.log('Location changed automatically');
// });
// }, 2500);

})(jQuery);