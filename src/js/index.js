import jQuery from "jquery";

jQuery(document).ready(function () {

  jQuery('.burger').on('click', function (e) {
    jQuery('.burger').toggleClass('burger--close');
    jQuery('.menu-popup').toggleClass('menu-popup--close');
  });

  jQuery('#closePopup').on('click', function (e) {
    jQuery('.popup').addClass('popup--hide');
  });

  let $totalSlides = jQuery('#slidesContainer .slider__item').length;
  jQuery('#slidesCount').text($totalSlides);

  for (let i = 0; i < $totalSlides; i++){
    jQuery('.slider__line').append('<div class="slider__line-item"></div>');
  }

  jQuery('.slider__line-item').eq(0).addClass('slider__line-item--current');

  jQuery('#slidesContainer .slider__item').each(function (index, value) {
    jQuery(this).attr('data-item', index + 1);
  });

  jQuery('#nextBtn, #prevBtn, .slider__item').on('click', function (e) {

    let $newSlideId = 1;
    let $slides = jQuery('#slidesContainer .slider__item');
    if (jQuery(this).attr('id') === 'prevBtn'){
      $newSlideId = $totalSlides - 1;
    } else if (jQuery(this).attr('id') === 'nextBtn'){
      $newSlideId = 1;
    } else {
      $newSlideId = jQuery(this).index();
    }

    let $title = $slides.eq($newSlideId).find('.slider__item-title').text();
    let $benefits = $slides.eq($newSlideId).find('.slider__list--hide .main-list__item').clone();
    let $img = $slides.eq($newSlideId).find('.slider__item-pic').attr('src');
    let $id = $slides.eq($newSlideId).data('item');

    jQuery('#currentBenefits .main-list__item').remove();

    jQuery('#currentTitle').text($title);
    jQuery('#currentBenefits').append($benefits);
    jQuery('#currentSlide').text($id);
    jQuery('#currentImg').attr('src', $img);
    jQuery('#currentImg').addClass('slider__active-pic--anim');
    jQuery('.slider__line-item').removeClass('slider__line-item--current');
    jQuery('.slider__line-item').eq($id - 1).addClass('slider__line-item--current');

    jQuery('#slidesContainer .slider__item').eq(0).removeClass('slider__item--current');

    if ($newSlideId === 1){
      jQuery('#slidesContainer').append(jQuery('#slidesContainer .slider__item').eq(0));
    } else if ($newSlideId === $totalSlides - 1){
      jQuery('#slidesContainer').prepend(jQuery('#slidesContainer .slider__item').eq($newSlideId));
    } else {
      jQuery('#slidesContainer').append(jQuery('#slidesContainer .slider__item').eq($newSlideId).prevAll().get().reverse());
    }

    jQuery('#slidesContainer .slider__item').eq(0).addClass('slider__item--current');

    setTimeout(function () {
      jQuery('#currentImg').removeClass('slider__active-pic--anim');
    }, 1200);

  });

  jQuery('.slider').on('click', '.slider__line-item', function () {
    let startPos = 0;
    let stepSlider = 570;
    let slideIndex = jQuery(this).index() * -1;
    let id = jQuery(this).index() + 1;

    if (jQuery(window).width() < 641){
      stepSlider = 290;
    }

    jQuery(window).on('resize', function () {
      if (jQuery(window).width() < 641){
        stepSlider = 290;
        jQuery('.slider__items').css('left', startPos + stepSlider * slideIndex);
        jQuery('#currentSlide').text(id);
      } else {
        stepSlider = 570;
        jQuery('.slider__items').css('left', startPos + stepSlider * slideIndex);
        jQuery('#currentSlide').text(id);
      }
    });

    jQuery('.slider__line-item').removeClass('slider__line-item--current');
    jQuery(this).addClass('slider__line-item--current');
    jQuery('#currentSlide').text(id);
    jQuery('.slider__items').css('left', startPos + stepSlider * slideIndex);
  });

  jQuery('.open-popup').on('click', function (e) {
    e.preventDefault();
    jQuery('.popup').toggleClass('popup--hide');
  });

  jQuery('.contacts__form').on('submit', function (e) {
    e.preventDefault();
    jQuery('.contacts__error').remove();
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let valueEmail = jQuery(this).find('.default-input__input[name="email"]').val();
    if(reg.test(valueEmail) === false) {
      jQuery(this).find('.default-input__input[name="email"]').after('<div class="contacts__error">Incorrect email address</div>')
    } else {
      jQuery(this)[0].submit();
      // if(grecaptcha && grecaptcha.getResponse().length > 0)
      // {
      // }
      // else
      // {
      //   jQuery(this).find('.contacts__brand-btn').before('<div class="contacts__error contacts__error--btn">Please, enter captcha..</div>');
      // }
    }
  });

  jQuery('.go_to').on('click', function(e){
    e.preventDefault();
    let scroll_el = jQuery(this).attr('href');
    jQuery('.menu-popup').addClass('menu-popup--close');
    jQuery('.burger').toggleClass('burger--close');
    if ( jQuery(scroll_el).length != 0) {
      jQuery('html, body').animate({ scrollTop: jQuery(scroll_el).offset().top }, 500);
    }
    return false;
  });

  jQuery('.contacts__brand-btn').prop('disabled', true);

});