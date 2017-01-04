/**
 * @fileoverview oe Banner Hero Yuri.
 *
 * @author yuri.machado@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function (ko, $) {

    "use strict";

    /**
      * This function define what is necessary on carousel image.
      * @param  {string} src path of src image
      * @param  {string} link path of link image
      * @param  {number} carouselIndex The number of images
      * @param  {string} bannerText text of banner
      * @param  {string} mobileSrc path of src image
      */
    function CarouselImage(src, link, carouselIndex, bannerText, mobileSrc){
      var self = this;
      self.imageSrc = ko.observable('/file/general/' + src);
      self.imageLink = link;
      self.carouselIndex = carouselIndex;
      self.classActive = (carouselIndex === 0) ? "active" : "";
      self.bannerText = bannerText;
      if(mobileSrc) self.mobileImageUrl = ko.observable('/file/general/' + mobileSrc);
    }

    /**
      * This function will load all images for carousel.
      * @param  {number} maxImages The number of images
      * @param  {object} objWidget The widget object
      * @return {object array}  object array with dots
      */
    function LoadImages(maxImages, objWidget) {
      var images = [];
      for(var i = 1; i <= maxImages; i++) {

        if(objWidget["imageUrl" + i]()) {
          if (objWidget.validateInterval(objWidget["startDate" + i](), objWidget["endDate" + i]())) {
            images.push(new CarouselImage(objWidget["imageUrl" + i](), 
              objWidget["bannerLink" + i](),
              images.length,
              objWidget["bannerText" + i](),
              objWidget["mobileImageUrl" + i]()
            ));
          }
        }
      }
      return images;
    }
    /**
      * This function load all dots based on images in carousel.
      * @param  {number} maxDots number of dots
      * @param  {object} objWidget The widget object
      * @return {object array}  object array with dots
      */
    function LoadDots(maxDots, objWidget){
       var dots = [];
       for(var i = 0; i < maxDots; i++) {
         var dot = {
           slideId: i,
           activeClass: (i === 0) ? "active" : ""
         };
         dots.push(dot);
       }
       return dots;
    }

    return {

      /**
       * This function will run just on time when the widget was loaded the first time
       */
      onLoad: function(widget) {
        console.log(widget);
        widget.time = ko.observable(widget.timeSwitchImage() * 1000);
        //In the future inform with a variable in config.js
        var numberImagesCarousel = 6;
        widget.images = new LoadImages(numberImagesCarousel, widget);
        var imageNumber = widget.images.length;
        widget.hidden = imageNumber === 1  ? "widget_hidden" : "";
        widget.dots = new LoadDots(imageNumber, widget);
      },

      /**
       * This function will run whe the widget was loaded and every page change
       */
      beforeAppear: function(page) {
      },

      /**
         * Controls carousel cycle
         * @param  {bool} autoplay  Define autoplay is true or false
         */
      setCycle: function(autoplay) {
        if (autoplay) {
          $('#OEBannerHeroYuri').carousel({
            pause: false
          });
        }
      },

      /**
        * Receives a date and format
        * @param  {string} date The date
        * @return {string}      The formatted date
        */
      formatDate: function(date) {
        if (date && date.indexOf('/') != -1 && date.split('/').length === 3) {
          try {
            return new Date(date.split('/').reverse()).getTime() / 1000;
          } catch(e) {
            throw new Error("Error formatting date: ", date);
          }
        }
        return null;
      },
      /**
       * Checks if the provided interval is valid
       * @param  {string} startDate The initial date
       * @param  {string} endDate   The final date
       * @return {boolean}          Whether the interval is valid or not
       */
      validateInterval: function(startDate, endDate) {
        var isValid = false;
        var now = parseInt(+(new Date() / 1000));
        var initialDate = this.formatDate(startDate);
        var finalDate   = this.formatDate(endDate);

        // First:  if not dates given, is valid
        // Second: if only final date given, it must be after today
        // Third:  if only initial give, it must be before today
        // Fourth: if both dates give, must be between now
        if ((!initialDate && !finalDate) ||
            (!initialDate && finalDate >= now) ||
            (initialDate <= now && !finalDate) ||
            (initialDate <= now && finalDate >= now)) {
          isValid = true;
        }
        return isValid;
      }

    };
  }
);
