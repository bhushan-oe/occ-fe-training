define(

  // DEPENDENCIES
  ['knockout', 'jquery', 'moment'],

  // WIDGET DEFINITION
  function(ko, $, moment){
    function Generic(){}

    Generic.prototype = (function() {
      var widgetModel;
      var imageUrl        = "imageUrl";
      var mobileImageUrl  = "mobileImageUrl";
      var bannerText      = "bannerText";
      var bannerLink      = "bannerLink";
      var startDate       = "startDate";
      var endDate         = "endDate"
      
      function init(widget) {
        widgetModel = widget;
        widgetModel.config(Object.keys(widgetModel.site().extensionSiteSettings).length ? widgetModel.site().extensionSiteSettings : null);
        widgetModel.time = ko.observable(widgetModel.timeSwitchImage() * 1000);
        widgetModel.loopCarousel = ko.observable(widgetModel.boolLoopCarousel());
        widgetModel.autoPlayCarousel = ko.observable(widgetModel.boolAutoplayCarousel());

        widgetModel.autoPlay = function(element) {
          if (widgetModel.autoPlayCarousel()) {
            $(element).carousel({
              pause:false
            });
          }
        }
      }

      function itemCarousel(src, msrc, text, link, position) {
        this.src = '/file/general/' + src;
        if (msrc !== ""){ 
         this.msrc = '/file/general/' + msrc; 
       }
       this.msrc = msrc ? '/file/general/' + msrc : null;
       this.text = text;
       this.link = link;
       this.position = position;
       this.classActive = (position === 0) ? "active" : "";
     }

     function verifyFileExist(url, i) {
      var http = $.ajax({
        type: "HEAD",
        url: "/file/general/" + url,
        async: true,
        success: function(response) {
          addItem(i);
        }
      });
    }

    function addItem(i) {
      widgetModel.images.push(new itemCarousel(
        widgetModel[imageUrl + i](), 
        widgetModel[mobileImageUrl + i](),
        widgetModel[bannerText + i](),
        widgetModel[bannerLink + i](),
        i - 1
        ));
    }

    function statusDate(startDate, endDate){
      startDate     = moment(startDate, "YYYY-MM-DD");
      endDate       = moment(endDate, "YYYY-MM-DD");
      var nowDate   = moment();

      if(startDate === ""){
        startDate = moment();
      }
      if(endDate === ""){
        endDate = moment();
      }
      if((nowDate.isAfter(startDate,'day') || nowDate.isSame(startDate, 'day')) && (nowDate.isBefore(endDate, 'day') || nowDate.isSame(endDate, 'day'))){
        return true;
      }
      else {
        return false;
      }
    }

    return {
      constructor : Generic,
      config : ko.observable(),

      onLoad : function(widget){
        init(widget);
        widgetModel.images = ko.observableArray();

        for(var i=1; i<=6; i++){
          if(widgetModel[imageUrl + i]() && statusDate(widget[startDate + i](), widget[endDate + i]())){
            verifyFileExist(widgetModel[imageUrl + i](), i);
          }
        }

        widgetModel.__run('onLoad', widget);
      },

      beforeAppear : function(page){
        widgetModel.__run('beforeAppear', page);
      },

    };
  })();

  return new Generic();
}
);