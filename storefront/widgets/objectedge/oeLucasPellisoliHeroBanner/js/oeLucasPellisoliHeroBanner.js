/**
 * @fileoverview oe LucasPellisoli HeroBanner.
 *
 * @author lucas.pellisoli@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'ccLogger', 'viewportHelper'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function (ko, $, ccLogger, viewportHelper) {

    "use strict";

    //CLASS 

    function CAROUSELIMAGE(i, src, srcMobile, link, sDate, eDate, text) {

      this.srcComputer = ko.observable("/file/general/" + src());       // imageUrl1
      this.link = link;                              // bannerLink1
      this.sDate = sDate;                            // startDate1
      this.eDate = eDate;                            // endDate1
      this.textBanner = text;                        // bannerText1  
      if (srcMobile()) {
        this.srcMobile = ko.observable("/file/general/" + srcMobile());
      } else {
        this.srcMobile = ko.observable("");
      }

      return this;
    }

    function validadeDate(sDate, eDate) {

      if (!sDate && !eDate) {
        return true;
      }

      var fsDate = dateGetObjeto(sDate);
      var feDate = dateGetObjeto(eDate);

      var today = new Date();
      var day = parseInt(today.getDate());
      var month = parseInt((today.getMonth() + 1));
      var year = parseInt(today.getFullYear());


      if (sDate && !eDate) {
        if ((fsDate.year >= year)) {
          if ((fsDate.month >= month)) {
            if ((fsDate.day >= day)) {
              return true;
            }
          }
        }
      }
      if (!sDate && eDate) {
        if ((feDate.year >= year)) {
          if ((feDate.month >= month)) {

            if ((feDate.day >= day)) {

              return true;
            }
          }
        }
      }
      if (sDate && eDate) {
        if ((fsDate.year >= year) && (feDate.year >= year)) {
          if ((fsDate.month >= month) && (feDate.month >= month)) {
            if ((fsDate.day >= day) && (feDate.day >= day)) {

              return true;

            }
          }
        }
      }



      return false;
    }

    function dateGetObjeto(date) {
      var dateF = date.toString().split("/");
      var fDATE = { day: "", month: "", year: "" };
      fDATE = { day: parseInt(dateF[0]), month: parseInt(dateF[1]), year: parseInt(dateF[2]) }
      return fDATE;
    }

    function loadCarousel(widget, max) {
      var carousel = [];
      for (var i = 1; i <= max; i++) {
        if ((widget["imageUrl" + i]()) && validadeDate((widget["startDate" + i]()), (widget["endDate" + i]()))) {
          if(widget["mobileImageUrl" + i]){
            widget.carouselDataMobileTam=  widget.carouselDataMobileTam+1;

          }
          carousel.push(new CAROUSELIMAGE(i, widget["imageUrl" + i], widget["mobileImageUrl" + i], widget["bannerLink" + i], widget["startDate" + i], widget["endDate" + i], widget["bannerText" + i]));
        }
      }
      console.log('TESTE',widget.carouselDataMobileTam);
      return carousel;
    }

    function carouselSetings(widget) {

      $('#HeroBanerLP').carousel({
        interval: (widget.timeSwitchImage * 1000),
        pause: widget.boolAutoplayCarousel,
        wrap: widget.boolLoopCarousel
      });


      ccLogger.info("[OE][onLoad] Carousel setings");
    }

    function viewPortChang(viewPort) {
      var widget = this;
      return viewPort;
    }

    function setCarouselIndex(number){
      $('#HeroBanerLP').carousel(number);
    }

    return {

      /**
       * This function will run just on time when the widget was loaded the first time
       */

      onLoad: function (widget) {
        const numberImage = 6; // define number max into carousel;        

        ccLogger.info("[OE][onLoad] Loading oeLucasPellisoliHeroBanner");

        widget.carouselData = loadCarousel(widget, numberImage); //widiget, number; 

        carouselSetings(widget);

        widget.carouselDataTam = ko.observable(widget.carouselData.length);

        widget.carouselDataMobileTam = ko.observable(0);

        // widget.viewportHelper = viewportHelper;
        widget.testDisplayA = ko.observable(viewportHelper.viewportDesignation());

        widget.testDisplay = viewportHelper.viewportDesignation.subscribe(function (vw) {
          setCarouselIndex(0);
          widget.testDisplayA(vw);
        });

      },

      /**
       * This function will run whe the widget was loaded and every page change
       */
      beforeAppear: function (page) {

      }
    };
  }
);
