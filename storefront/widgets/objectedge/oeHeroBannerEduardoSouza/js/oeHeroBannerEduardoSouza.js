/**
 * @fileoverview oeHeroBannerEduardoSouza
 *
 * @author eduardo.souza@objectedge.com
 */
define(['knockout', 'moment', 'jquery'], function (ko, momentjs, $) {
    
  'use strict';

  var dateFormat = 'DDMMYYYY';

  /**
   * Carousel item instantiator
   * @param {String} img (imageUrl)
   * @param {String} mobileImg (mobileImageUrl)
   * @param {String} link (bannerLink)
   * @param {String} start (startDate)
   * @param {String} end (endDate)
   * @param {String} text (bannerText)
   * @return {Object} returns an inline object with the given parameters
   */
  function slidableItem(img, mobileImg, link, start, end, text) {
    return {
      image: img,
      mobileImage: mobileImg,
      link: link,
      start: momentjs(start, dateFormat),
      end: momentjs(end, dateFormat),
      text: text,
      displayable: !!img.trim() && !!mobileImg.trim()
    };
  }

  /**
   * Returns an Observable Array of slidable itens
   * @param {Integer} size (Amount of itens to display on banner)
   * @param {Object} wg (Widget)
   */
  function itemPopulator(size, wg) {
    var array = ko.observableArray();
    var today = momentjs();

    for (var i = 1; i <= size; i++) {
      array.push(
        slidableItem(
          wg['imageUrl' + i].src(),
          wg['mobileImageUrl'+ i].src(),
          wg['bannerLink'+ i](),
          wg['startDate'+ i](),
          wg['endDate'+ i](),
          wg['bannerText'+ i]()
        )
      );
    }

    // Filter the array to remove invalid items, such as late dates and images not defined
    return ko.observableArray(ko.utils.arrayFilter(array(), function(item) {
      return item.displayable && !item.start.isAfter(today) && !item.end.isBefore(today);
    }));
  }

  return {

    onLoad: function(widget) {
      widget.slidableItems = itemPopulator(6, widget);
    },
    beforeAppear: function(page) {

      var options = {};

      // Time in ms to switch images (Default is 4s)
      options.interval = this.timeSwitchImage() ? this.timeSwitchImage() * 1000 : 4000;

      // Loop carousel? (Default is false)
      options.wrap = !!this.boolLoopCarousel();

      // Start carousel with given parameters and check if autoplay option is enabled
      $("#heroBannerCarousel.carousel").carousel(options).carousel(this.boolAutoplayCarousel() ? 'cycle' : 'pause' ).click(function(evt) {
        $(this).carousel('cycle');
      });

    }

  };

});