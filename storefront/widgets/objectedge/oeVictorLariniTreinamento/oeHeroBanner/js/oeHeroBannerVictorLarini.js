/**
 * @fileoverview oeHeroBannerVictorLarini
 *
 * @author victorugo.godinho@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'moment'],
  //-------------------------------------------------------------------
  // WIDGET DEFINITION
  //-------------------------------------------------------------------
  function (ko,$,moment ) {
    
    return {
      
      onLoad: function(widget){
        
        function BannerItem(imageUrl, mobileUrl, bannerLink, startDate, endDate, bannerText){
          var self = this;
          self.imageUrl = imageUrl;
          self.mobileUrl = mobileUrl;
          self.bannerLink = bannerLink;
          self.startDate = startDate;
          self.endDate = endDate;
          self.bannerText = bannerText;
        }

        widget.bannerData = ko.observableArray();

        for (var i=1; i<=6; i++){
          widget.bannerData.push(new BannerItem(
              widget['imageUrl' +i].src(),
              widget['mobileImageUrl' +i].src(),
              widget['bannerLink' +i](),
              widget['startDate' +i](),
              widget['endDate' +i](),
              widget['bannerText' +i](),
          ));
        }

        widget.bannerItems = ko.computed(function() {

          widget.currentDate = moment().format('l');
          var filtered = ko.utils.arrayFilter(widget.bannerData(), function (item){          
              
            if(item.imageUrl){

                  if(item.startDate && item.endDate){
                      if(widget.currentDate>=item.startDate && widget.currentDate<=item.endDate)
                      return item;
                  }
                  else if(item.startDate){
                      if(widget.currentDate>=item.startDate)
                      return item;
                  }
                  else if(item.endDate){
                      if(widget.currentDate<=item.endDate)
                      return item; 
                  }
                  else return item; 
              } 
          });

          return filtered;
        });
      },

      beforeAppear: function(page){
        var self = this;

        function loadHeroBanner(timeSwitchImage, boolLoopCarousel, boolAutoPlayCarousel){
          
          if(timeSwitchImage===null)
            timeSwitchImage=4000;

          if(boolAutoPlayCarousel===null)
              boolAutoPlayCarousel=true; 

          if(boolLoopCarousel===null)
              boolLoopCarousel=false;

          $('.carousel').carousel({interval:timeSwitchImage, wrap:boolLoopCarousel});
        }

        if(self.boolAutoPlayCarousel()===true)
            loadHeroBanner(self.timeSwitchImage(), self.boolLoopCarousel(),self.boolAutoPlayCarousel());          
        
      }
    }
  }
);