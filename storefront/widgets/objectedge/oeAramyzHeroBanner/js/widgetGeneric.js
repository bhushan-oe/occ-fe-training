  /**
   * @fileoverview oeWidget
   *
   * @author @dev
   */
   define(
    //-------------------------------------------------------------------
    // DEPENDENCIES
    //-------------------------------------------------------------------
    ['knockout','jquery','moment'],
    //-------------------------------------------------------------------
    // WIDGET DEFINITION
    //-------------------------------------------------------------------
    function(ko, $, moment) {
      function Generic() {
        // default constructor
      }

      Generic.prototype = (function() {
        var widgetModel;

        function init(widget) {
          widgetModel = widget;
          if (Object.keys(widgetModel.site().extensionSiteSettings).length) {
            widgetModel.config(widgetModel.site().extensionSiteSettings);
          } else {
            widgetModel.config(null);
          }
        }

        return {
          // Obligatory
          constructor : Generic,
          // Variables
          config : ko.observable(),

          // Generic version
          onLoad : function(widget) {
          init(widget);

          
          //not necessary when using ES6
          var self = this;   
          
          widget.timeSwitchImage = ko.observable(widget.timeSwitchImage() * 1000);
          widget.boolLoopCarousel = ko.observable(widget.boolLoopCarousel());
          widget.boolAutoplayCarousel = ko.observable(widget.boolAutoplayCarousel()); 
          this.currentDate = moment();
          
          //disable autoplay if parameter is false
          if(!(widget.boolAutoplayCarousel())){
            widget.timeSwitchImage = ko.observable(false);
          };
          
          widget.bannerItems = ko.observableArray([
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

          //checking dates using moment.js
          widget.bannerItems().forEach( function(item){
            
            if (item.startDate){
              item.startDate = moment(item.startDate);
            }
            if (item.endDate){
              item.endDate = moment(item.endDate);
            }
            
            if(item.startDate || item.endDate ){ //Filter by startDates and EndDates
              item.isOnDate = ko.observable( (self.currentDate.isAfter(item.startDate) ||  self.currentDate.isSame(item.startDate,'date')) && (self.currentDate.isBefore(item.endDate)  ) );
            }else{ //If there are no dates defined, the banner will show
              item.isOnDate = ko.observable('true');
            }

          });  


          widgetModel.__run('onLoad', widget);
        },
        beforeAppear : function(page) {


          widgetModel.__run('beforeAppear', page);
        },

        startCarousel : function (element) {

          $(element).carousel({
            interval: this.timeSwitchImage(),
            wrap: this.boolLoopCarousel()
          });
        }
      };
    })();

    return new Generic();
  }
  );
