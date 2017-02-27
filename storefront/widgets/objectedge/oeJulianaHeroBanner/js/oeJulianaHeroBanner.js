/**
 * @fileoverview oe Juliana Hero Banner.
 *
 * @author juliana.flor@objectedge.com
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

    return {

      /**
       * This function will run just on time when the widget was loaded the first time
       */
      onLoad: function(widget) {
        console.log(widget);
        console.log("AEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE2");
        widget.firstName = "Bert";
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",widget.sampleText());

        /* ----------------- Temporary code ----------------- */
          widget.imageUrl1       = "http://www.creativefan.com/files/2010/02/29475-fullsize-500x300.jpg";
          widget.mobileImageUrl1 = "";
          widget.bannerLink1     = "http://google.com";
          widget.startDate1      = "";
          widget.endDate1        = "";
          widget.bannerText1     = "";

          widget.imageUrl2       = "http://www.creativefan.com/files/2010/04/01939_norwegiancoast_800x480-500x300.jpg";
          widget.mobileImageUrl2 = "";
          widget.bannerLink2     = "http://deviantart.com";
          widget.startDate2      = "";
          widget.endDate2        = "";
          widget.bannerText2     = "Hello";

          widget.imageUrl3       = "";
          widget.mobileImageUrl3 = "";
          widget.bannerLink3     = "";
          widget.startDate3      = "";
          widget.endDate3        = "";
          widget.bannerText3     = "";

          widget.imageUrl4       = "";
          widget.mobileImageUrl4 = "";
          widget.bannerLink4     = "";
          widget.startDate4      = "";
          widget.endDate4        = "";
          widget.bannerText4     = "";

          widget.imageUrl5       = "";
          widget.mobileImageUrl5 = "";
          widget.bannerLink5     = "";
          widget.startDate5      = "";
          widget.endDate5        = "";
          widget.bannerText5     = "";

          widget.imageUrl6       = "";
          widget.mobileImageUrl6 = "";
          widget.bannerLink6     = "";
          widget.startDate6      = "";
          widget.endDate6        = "";
          widget.bannerText6     = "";
        /* ----------------- End Temporary code ----------------- */

        console.log(">>>>>>>>>>>>>>>>>>>>>>>> ", widget.imageUrl1, " - ", widget["imageUrl"+"1"]);

        widget.bannerItems = ko.observableArray([
          { 
            imageUrl:       widget.imageUrl1,
            mobileImageUrl: widget.mobileImageUrl1,
            bannerLink:     widget.bannerLink1,
            startDate:      widget.startDate1,
            endDate:        widget.endDate1,
            bannerText:     widget.bannerText1
          }, { 
            imageUrl:       widget.imageUrl2,
            mobileImageUrl: widget.mobileImageUrl2,
            bannerLink:     widget.bannerLink2,
            startDate:      widget.startDate2,
            endDate:        widget.endDate2,
            bannerText:     widget.bannerText2
          }, { 
            imageUrl:       widget.imageUrl3,
            mobileImageUrl: widget.mobileImageUrl3,
            bannerLink:     widget.bannerLink3,
            startDate:      widget.startDate3,
            endDate:        widget.endDate3,
            bannerText:     widget.bannerText3
          }, { 
            imageUrl:       widget.imageUrl4,
            mobileImageUrl: widget.mobileImageUrl4,
            bannerLink:     widget.bannerLink4,
            startDate:      widget.startDate4,
            endDate:        widget.endDate4,
            bannerText:     widget.bannerText4
          }, { 
            imageUrl:       widget.imageUrl5,
            mobileImageUrl: widget.mobileImageUrl5,
            bannerLink:     widget.bannerLink5,
            startDate:      widget.startDate5,
            endDate:        widget.endDate5,
            bannerText:     widget.bannerText5
          }, { 
            imageUrl:       widget.imageUrl6,
            mobileImageUrl: widget.mobileImageUrl6,
            bannerLink:     widget.bannerLink6,
            startDate:      widget.startDate6,
            endDate:        widget.endDate6,
            bannerText:     widget.bannerText6
          }
        ]);
      },

      /**
       * This function will run when the widget was loaded and every page change
       */
      beforeAppear: function(page) {

        // var selfWidget = this;

        

        /*
          Deve ter as seguintes configurações:
          timeSwitchImage == interval
          boolLoopCarousel == wrap
          boolAutoplayCarousel == interval with false

          imageUrl
          mobileImageUrl
          bannerLink
          startDate
          endDate
          bannerText
        */

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

        generateCarousel();

      }
    };
  }
);
