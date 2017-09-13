/**
 * @fileoverview oe Hero Banner Victor Castro
 *
 * @author victor.castro@objectedge.com
 */
define
(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout','jquery', 'moment'],
  //-------------------------------------------------------------------
  // WIDGET DEFINITION
  //-------------------------------------------------------------------
  function (ko,$,moment) 
  {
    'use strict';


    return{

      onLoad: function(widget) 
      { 

          //start the properties and make them ready to populate by the for loop below
          
          function BannerItem(imageUrl,mobileImageUrl,bannerLink,startDate,endDate,bannerText)
          {
              var self = this;
              self.imageUrl = imageUrl;
              self.mobileImageUrl = mobileImageUrl;
              self.bannerLink = bannerLink;
              self.startDate = startDate;
              self.endDate = endDate;
              self.bannerText = bannerText;
          }

          //create the observable array
          widget.bannerData = ko.observableArray();

          //for loop to populate the array with the right properties index
          //it should starts on 1 and not 0 in order to properly manage the properties, that also starts in 1
          //do not forget the () at every property, for is an observable
          for (var i = 1; i < 7; i++) 
          {
            widget.bannerData.push(new BannerItem(widget['imageUrl'+i].src(),
                          widget['mobileImageUrl'+i].src(),
                          widget['bannerLink'+i](),
                          widget['startDate'+i](),
                          widget['endDate'+i](),
                          widget['bannerText'+i]()));
        }

          //format the date using momentJS. Necessary for item validation
         


          //item validation
          widget.bannerItems = ko.computed(function() {
            widget.currentDate = moment().format('YYYYMMDD');
            var filtered = ko.utils.arrayFilter(widget.bannerData(), function (item)
            {          
                //check if there is an image URL. Without it, the item will not be add   
                if(item.imageUrl)
                {
                    //verify start and end date, and check if the current date is between those values, in order to display item in right time
                    if(item.startDate && item.endDate)
                    {
                        if(moment(widget.currentDate).isSameOrAfter(item.startDate) && moment(widget.currentDate).isSameOrBefore(item.endDate))
                        {
                          return item;
                        }
                    }
                    //if there is only startDate, it checks for start item display
                    else if(item.startDate)
                    {
                        if(moment(widget.currentDate).isSameOrAfter(item.startDate))
                        {
                          return item;
                        }
                    }
                    //if there is only endDate, it checks for finish item display
                    else if(item.endDate)
                    {
                        if(moment(widget.currentDate).isSameOrBefore(item.endDate))
                        {
                          return item; 
                        }
                    }
                    //if there is neither start nor end date, it will display item as long the widget is active
                    else
                    {
                        return item; 
                    }
                } 
            });
             
            return filtered;
          });
      },

      beforeAppear: function(page)
      {
        var self = this;

        function loadHeroBanner(timeSwitchImage, boolLoopCarousel, boolAutoPlayCarousel)
        {

          //validation of timeSwitchImage property
          //if its null, for any reason, it will setted 4000 (4 seconds)
          //if its not null, it will be multiplied by 1000 
          if(timeSwitchImage===null)
          {
            timeSwitchImage=4000; 
          }
          else
          {
            timeSwitchImage=timeSwitchImage*1000;
          }


          //validation of boolAutoplay and boolLoop properties - if null, they'll be settled to default value
          if(boolAutoPlayCarousel===null)
          {
              boolAutoPlayCarousel=true; 
          }
          if(boolLoopCarousel===null)
          {
              boolLoopCarousel=false;
          }

          //generate the carousel itself, as seen in bootstrap documentation
          //https://www.w3schools.com/bootstrap/bootstrap_ref_js_carousel.asp
          $('.carousel').carousel({interval:timeSwitchImage, wrap:boolLoopCarousel});
        }

        //validate if autoplat is true, then create the banner using the function above
        if(self.boolAutoPlayCarousel()===true)
        {
            loadHeroBanner(self.timeSwitchImage(), self.boolLoopCarousel(),self.boolAutoPlayCarousel());          
        }
        
      }


    };
  }
);