import $ from "jquery";

$(document).ready(function () {

  $(document).on('click', 'a[href^="#"].scroll-btn', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

});