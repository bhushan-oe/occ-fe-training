/**
 * @fileoverview oe Nome Do Widget.
 *
 * @author developero@objectedge.com
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
    
    function stringToDate(yyyymmdd) {
    	var date = yyyymmdd.split('-');
    	return new Date(date[0], date[1], date[2]);
    }
    
    function checkDate(start, end) {
    	if(start && end) {
    		var today = new Date();
    		today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
    		start = stringToDate(start);
    		end = stringToDate(end);
    		return today > start && today < end
    	}
    	return true
	}
    
    return {
      /**
       * This function will run just on time when the widget was loaded the first time
       */
      onLoad: function(widget) {
    	  
    	  console.log("============================ oeWidgetTesteErion ============================");
    	  console.log('widget', widget);
    	  console.log('elements', widget.elements);
    	  console.log('elementsJs', widget.elementsJs);
    	  console.log('elementsSrc', widget.elementsSrc());

    	  var heroImages = [
    	      {'imageUrl': widget.imageUrl.src(), 'bannerText': widget.bannerText, 'bannerLink': widget.bannerLink, 'visibleTime': checkDate(widget.startDate(), widget.endDate())},
    	  ];
 
		  heroImages.forEach(function(item, i) {
			  if (item.imageUrl == '' || item.visibleTime == false)
				  ko.utils.arrayRemoveItem(heroImages, item);
		  });

		  widget.heroImages = heroImages;
		  widget.showNavigation = widget.heroImages.length > 1;

		  console.log("============================================================================");
      },

      /**
       * This function will run whe the widget was loaded and every page change
       */
      beforeAppear: function(page) {

      },
      
      onRender: function(el) {
    	  if(el) {
        	  $('#heroBannerErionCarousel').carousel({
          	    'interval': 1000,
       	           'pause': true,
       	    	    'wrap': true
       	      });
    	  }
      }
    };
  }
);
