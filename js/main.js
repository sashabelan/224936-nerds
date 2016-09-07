(function() {
  // Feedback form
  var link = $(".contacts-btn"),
      popup = $(".feedback-form"),
      close = $(".feedback-cancel"),
      input_name = $("#input-name"),
      input_email = $("#input-e-mail"),
      input_message = $("#input-message"),
      control_active, control, myMap;

  // Form opening, closure and animation for error indication
  link.click(function(event) {
    event.preventDefault();
    console.log(input_email.val());
    if (popup.hasClass("feedback-form-show")) {
      popup.removeClass("feedback-form-show feedback-form-animation feedback-form-error");
    }
    else {
      popup.removeClass("feedback-form-error");
      popup.addClass("feedback-form-show feedback-form-animation");
      setTimeout(function() {
        input_name.focus() }, 500);
    }
  });

  close.click(function(event) {
    event.preventDefault();
      popup.removeClass("feedback-form-show feedback-form-animation feedback-form-error");
  });

  // Simple form validation - error if at least one input is empty
  popup.submit(function(event) {
    if (!input_name.val() || !input_email.val() || !input_message.val()) {
      event.preventDefault();
        popup.removeClass("feedback-form-error feedback-form-animation");
        setTimeout(function() {
          popup.addClass("feedback-form-error") }, 50);
    }
  });

  // Form closure with Esc
  $(window).keydown(function(event) {
    if (event.keyCode == 27
    && popup.hasClass("feedback-form-show")) {
      popup.removeClass("feedback-form-show feedback-form-animation");
    }
  });

  // Form closure when clicking outside of its borders
  $('body').click(function(e) {
    if (popup.hasClass("feedback-form-show")
    && ($(e.target).closest(popup).length===0) && (!$(e.target).hasClass('contacts-btn'))) {
      popup.removeClass("feedback-form-show");
    }
  });

  // Slider - owl carousel plugin
  control = $(".owl-dot"),
  control_active = $(".owl-dot.active");

  $('.owl-carousel').owlCarousel({
    items:1,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true
  });

  // Map (Yandex)
  // Wait till API and DOM are loaded.
  ymaps.ready(init);

  function init () {
    // Create a map copy and binding it to container with id="map"
    myMap = new ymaps.Map('map', {
      // Indicating a map center and zoom index
      center:[45.043746,38.943404], // Coordinates of our address
      zoom:18
    });

    myMap.controls
      // Zoom button
      .add('zoomControl', { left: 15, top: 15 });

    myPlacemark = new ymaps.Placemark([45.043323,38.94424], {
    }, {
      iconImageHref: 'img/mark.png',
      // Label size
      iconImageSize: [231, 190],
      // Icon's upper left edge offset to its "leg" (binding point)
      iconImageOffset: [-60, -200]
    });

    myMap.geoObjects.add(myPlacemark);
  }
})();
