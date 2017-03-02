/**
 * @fileoverview oe Juliana Hero Banner.
 *
 * @author juliana.flor@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'moment'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function (ko, $, moment) {

    "use strict";

    return {

      /**
       * This function will run just on time when the widget was loaded the first time
       */
      onLoad: function(widget) { 
        console.log(widget);
        widget.currentDate = moment().format('YYYYMMDD');

        //Populate the array with custom data from config.json
        widget.bannerData = ko.observableArray([
          { 
            imageUrl:       widget.imageUrl1.src(),
            mobileImageUrl: widget.mobileImageUrl1.src(),
            bannerLink:     widget.bannerLink1(),
            startDate:      widget.startDate1(),
            endDate:        widget.endDate1(),
            bannerText:     widget.bannerText1()
          }, {
            imageUrl:       widget.imageUrl2.src(),
            mobileImageUrl: widget.mobileImageUrl2.src(),
            bannerLink:     widget.bannerLink2(),
            startDate:      widget.startDate2(),
            endDate:        widget.endDate2(),
            bannerText:     widget.bannerText2()
          }, { 
            imageUrl:       widget.imageUrl3.src(),
            mobileImageUrl: widget.mobileImageUrl3.src(),
            bannerLink:     widget.bannerLink3(),
            startDate:      widget.startDate3(),
            endDate:        widget.endDate3(),
            bannerText:     widget.bannerText3()
          }, { 
            imageUrl:       widget.imageUrl4.src(),
            mobileImageUrl: widget.mobileImageUrl4.src(),
            bannerLink:     widget.bannerLink4(),
            startDate:      widget.startDate4(),
            endDate:        widget.endDate4(),
            bannerText:     widget.bannerText4()
          }, { 
            imageUrl:       widget.imageUrl5.src(),
            mobileImageUrl: widget.mobileImageUrl5.src(),
            bannerLink:     widget.bannerLink5(),
            startDate:      widget.startDate5(),
            endDate:        widget.endDate5(),
            bannerText:     widget.bannerText5()
          }, { 
            imageUrl:       widget.imageUrl6.src(),
            mobileImageUrl: widget.mobileImageUrl6.src(),
            bannerLink:     widget.bannerLink6(),
            startDate:      widget.startDate6(),
            endDate:        widget.endDate6(),
            bannerText:     widget.bannerText6()
          }
        ]);

        //Filter the array to show only valid items
        widget.bannerItems = ko.computed(function() {
          var filtered = ko.utils.arrayFilter(widget.bannerData(), function (item) {
            //If the imageUrl exist
            if(item.imageUrl) {
              //If startDate and endDate were provided
              if(item.startDate && item.endDate) {
                //If currentDate exist between startDate and endDate
                if(widget.currentDate >= item.startDate && widget.currentDate <= item.endDate) {
                  return item;
                }
              //If exist only startDate and currentDate is equal or after startDate
              } else if(item.startDate) {
                if(widget.currentDate >= item.startDate) {
                  return item;
                }
              //If exist only endDate and currentDate is equal or before endDate
              } else if(item.endDate) {
                if(widget.currentDate <= item.endDate) {
                  return item;
                }
              //If startDate and endDate don't exist
              } else {
                return item;
              }
            }
          });
           
          return filtered;
        });
      },

      /**
       * This function will run when the widget was loaded and every page change
       */
      beforeAppear: function(page) {

        var selfWidget = this;
        /*
          ------------- Instructions to configure the carousel -------------

          timeSwitchImage     : amount of time to switch the images in seconds. Default: 4.
          boolLoopCarousel    : stop the transition on the last slide - true/false. Default: false.
          boolAutoplayCarousel: autoplay the carousel - true/false. Default: true.

          ------------------------------------------------------------------
        */
        function generateCarousel(timeSwitchImage, boolLoopCarousel, boolAutoplayCarousel) {
          timeSwitchImage = timeSwitchImage ? timeSwitchImage*1000 : 4000;
          boolLoopCarousel = boolLoopCarousel ? boolLoopCarousel : false;
          boolAutoplayCarousel = boolAutoplayCarousel ? boolAutoplayCarousel : true;

          if(boolAutoplayCarousel === false) {
            timeSwitchImage = false;
          }
          $('.carousel').carousel({interval: timeSwitchImage, wrap: boolLoopCarousel});
        }

        generateCarousel(selfWidget.timeSwitchImage(), selfWidget.boolLoopCarousel(), selfWidget.boolAutoplayCarousel());
        
      }
    };
  }
);
