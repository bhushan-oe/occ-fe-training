/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'moment'],
  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $, moment){
    function Generic(){}

    Generic.prototype = (function(){
      var widgetModel;

      /**
       * Creates a CarouselImage object
       * @param {string}  src           The image source
       * @param {string}  link          The banner link
       * @param {integer} carouselIndex The index of image in carousel
       * @param {string}  bannerText    The text for the current carousel item
       * @param {string}  mobileSrc     The mobile image
       */
      function CarouselImage(src, link, carouselIndex, bannerText, mobileSrc){
        this.imageLink        = link;
        this.carouselIndex    = carouselIndex;
        this.classActive      = (carouselIndex === 0)? "active": "";
        this.bannerText       = bannerText;
        this.desktopImageUrl  = ko.observable(src);
            
        if(mobileSrc) this.mobileImageUrl = ko.observable(mobileSrc);
      }

      function init(widget){
        widgetModel                 = widget;
        widgetModel.time            = widgetModel.timeSwitchImage() * 1000;
        widgetModel.ride            = widgetModel.boolAutoplayCarousel();
        widgetModel.wrapCarousel    = widgetModel.boolLoopCarousel();
        widgetModel.imagesCarousel  = ko.observableArray();

        var imageUrl        = "imageUrl",
            mobileImageUrl  = "mobileImageUrl",
            startDate       = "startDate",
            endDate         = "endDate",
            bannerLink      = "bannerLink",
            bannerText      = "bannerText";

        // Loops into configuration variables
        for(var x = 1; x < 7; x++){
          if(widgetModel[imageUrl + x] && widgetModel[imageUrl + x].src()){
            // Check if banner is inside date interval
            if(widgetModel.validateInterval(widgetModel[startDate + x](), widgetModel[endDate + x]())){
              widgetModel.imagesCarousel.push(new CarouselImage(
                widgetModel[imageUrl + x].src(),      // image url
                widgetModel[bannerLink + x](),        // banner link
                x - 1,                                // carousel index
                widgetModel[bannerText + x](),        // banner text
                widgetModel[mobileImageUrl + x].src() // mobile src
              ));
            }
          }
        }
      }

      return {
        // Obligatory
        constructor: Generic,

        onLoad: function(widget){
          init(widget);

          widgetModel.__run('onLoad', widget);
        },
        beforeAppear: function(page){
          widgetModel.setCycle();

          $(document).on('click', '.oeHeroBanner .carousel-control', function(){
            $(this).blur();
          });

          widgetModel.__run('beforeAppear', page);
        },
        /**
         * Controls carousel cycle
         */
        setCycle: function(){
          $("#" + widgetModel.id() + ".carousel").carousel({
            ride: widgetModel.ride,
            interval: (widgetModel.ride? widgetModel.time: false),
            wrap: widgetModel.wrapCarousel
          });
        },
        /**
         * Checks if the provided interval is valid
         * @param  {string} startDate The initial date
         * @param  {string} endDate   The final date
         * @return {boolean}          Whether the interval is valid or not
         */
        validateInterval: function(startDate, endDate){
          return (
            startDate && moment(startDate,'MM/DD/YYYY','en',true).isValid()? moment(startDate,'MM/DD/YYYY','en',true) <= moment(): true
          ) && (
            endDate && moment(endDate,'MM/DD/YYYY','en',true).isValid()? moment(endDate,'MM/DD/YYYY','en',true) >= moment(): true
          );
        }
      };
    })();

    return new Generic();
  }
);