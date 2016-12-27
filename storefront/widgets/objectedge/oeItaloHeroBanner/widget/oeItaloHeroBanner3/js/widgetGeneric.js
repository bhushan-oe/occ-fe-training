/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'ccConstants', 'viewportHelper', 'moment'],
  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $, constants, viewportHelper, moment){
    function Generic(){}

    Generic.prototype = (function() {
      var widgetModel, model;

      function run(method, data) {
              for (var i = 0; i < model.length; i++) {
                if (model[i].constructor !== Generic) {
                  if (model[i]['__OE__' + method] && typeof (model[i]['__OE__' + method]) == "function") {
                    model[i]['__OE__' + method](data);
                  }
                }
              }
            }

      /**
      * Creates a carouselImage object
      * @param {string}  src           The image source
      * @param {string}  srcmob        The mobile image source
      * @param {string}  link          The banner link
      * @param {string}  text          The text for the banner
      * @param {integer} carouselIndex The index of image in carousel
      */
      function carouselImage(src, srcmob, link, text, carouselIndex){
        this.imgSrc = ko.observable("/file/general/" + src);
        this.imgLink = link;
        this.carouselIndex = carouselIndex;
        this.classActive =  (carouselIndex === 0) ? "active" : "";
        this.displayText = ko.observable(text);
        this.desktopImageUrl = '/file/general/' + src;
        this.mobileImageUrl = '/file/general/mobile-' + srcmob;
      }
      /**
      * Check if date is between the specified range
      * @param {string} startDate    The starting date
      * @param {string} endDate      The final date
      * @return {boolean}            If the date is or not on the interval
      */
      function checkDate(startDate, endDate){

        startDate=moment(startDate).format("YYYY-MM-DD");
        endDate=moment(endDate).format("YYYY-MM-DD");
        var now = moment();

        if(startDate.trim() === "" || startDate === "Invalid date"){
          startDate = moment();
        }
        if(endDate.trim() === "" || endDate === "Invalid date"){
          endDate = moment();
        }
        if((now.isAfter(startDate,'day') || now.isSame(startDate, 'day')) && (now.isBefore(endDate, 'day') || now.isSame(endDate, 'day'))){
          return true;
        }
        else {
           return false;
         }
      }

      function init(widget){
        widgetModel = widget;

        widgetModel.time = ko.observable(widgetModel.timeSwitchImage() * 1000);
        widgetModel.loopCarousel = ko.observable(!widgetModel.boolLoopCarousel() + "");
        widgetModel.imagesCarousel = ko.observableArray();

        widgetModel.viewportHelper = viewportHelper;

        widgetModel.viewportClass = ko.computed(function () {
          return 'viewport-' + viewportHelper.viewportDesignation();
        });


        var displayIndex = 0;
        for(var k=1;k<=6;k++){ // 6 images variables
          if(widgetModel["imageUrl" + k]().trim() !== "" && checkDate(widget["startDate" + k](), widget["endDate" + k]())){
            widgetModel.imagesCarousel.push(
              new carouselImage(widgetModel["imageUrl" + k](), widgetModel["mobileImageUrl" + k](), widgetModel["bannerLink" + k](), widgetModel["bannerText" + k](), displayIndex)
            );
            displayIndex++;
          }
        }
      }

      return{
        // Obligatory
        constructor : Generic,
        __OE__model : function(models){
          model = [];

          $.each(models, function (index, currentModel) {
            model.push(currentModel);
          });

          model = model.sort(function(a, b){return (a.constructor === Generic) ? 0 : 1; });
        },
        // Variables
        attribute : ko.observable(),
        viewportWidth : ko.observable(),
        viewportMode : ko.observable(),

        setImageSrc: function (type) {
          var widget = this;

          ko.utils.arrayForEach(widget.imagesCarousel(), function(imageOnCarousel) {
            imageOnCarousel.imgSrc(imageOnCarousel[type]);
          });
        },

        setViewportDefinitions: function (view, imageUrlType) {
          this.viewportMode(view);
          this.setImageSrc(imageUrlType);
        },

        // Generic version
        onLoad : function(widget){
          init(widget);

          widget.checkResponsiveFeatures = function(index) {
            if (index > constants.VIEWPORT_LARGE_DESKTOP_LOWER_WIDTH) {
              if (widget.viewportMode() != constants.LARGE_DESKTOP_VIEW) {
                widget.setViewportDefinitions(constants.DESKTOP_VIEW, 'desktopImageUrl');
              }
            } else {
              if (index > constants.VIEWPORT_TABLET_UPPER_WIDTH && index <= constants.VIEWPORT_LARGE_DESKTOP_LOWER_WIDTH) {
                if (widget.viewportMode() != constants.DESKTOP_VIEW) {
                  widget.setViewportDefinitions(constants.DESKTOP_VIEW, 'desktopImageUrl');
                }
              } else {
                if (index >= constants.VIEWPORT_MOBILE_WIDTH) {
                  if (widget.viewportMode() != constants.TABLET_VIEW) {
                    widget.setViewportDefinitions(constants.TABLET_VIEW, 'desktopImageUrl');
                  }
                } else {
                  if (widget.viewportMode() != constants.PHONE_VIEW) {
                    widget.setViewportDefinitions(constants.PHONE_VIEW, 'mobileImageUrl');
                  }
                }
              }
            }
          };

          widget.checkResponsiveFeatures($(window)[0].innerWidth || $(window).width());
          $(window).resize(function() {
            widget.checkResponsiveFeatures($(window)[0].innerWidth || $(window).width());
            widget.viewportWidth($(window)[0].innerWidth || $(window).width());
          });

          run('onLoad', widget);
        },

        beforeAppear : function(page){
          this.setCycle();
          run('beforeAppear', page);
        },
        /**
        * Controls carousel cycle
        */
        setCycle: function() {
          if (this.boolAutoplayCarousel()) {
            var id = "#" + this.id();
            $(id + ".carousel").carousel('cycle');
          }
        }
      };
    })();

    return new Generic();
  }
);
