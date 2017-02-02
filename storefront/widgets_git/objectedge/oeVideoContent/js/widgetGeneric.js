/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'viewportHelper'],
  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $, viewportHelper){
    function Generic(){}

    Generic.prototype = (function() {
      var widgetModel;

      function init(widget){
        widgetModel = widget;
        
        widgetModel.viewportClass = ko.computed(function (){
          var viewport = 'viewport-' + viewportHelper.viewportDesignation();

          if(viewport != 'viewport-xs') widgetModel.playVideo();

          return viewport;
        });

        if(widgetModel.video() && widgetModel.videoImage() && widgetModel.imageMobile()){
          widgetModel.video('/file/general/' + widgetModel.video());
          widgetModel.videoImage('/file/general/' + widgetModel.videoImage());
          widgetModel.imageMobile('/file/general/' + widgetModel.imageMobile());

          widgetModel.showVideo(true);
        }
      }

      return {
        // Obligatory
        constructor : Generic,

        // Variables
        showVideo : ko.observable(false),
        // Generic version
        onLoad : function(widget) {
          init(widget);
          
          widgetModel.__run('onLoad', widget);
        },
        beforeAppear : function(page){
          widgetModel.playVideo();

          widgetModel.__run('beforeAppear', page);
        },
        playVideo : function(){
          var video = document.getElementById("oe-video");

          if(!video) return null;

          function checkVideoLoaded(){
            if(video.buffered.end(0) >= video.duration * 0.8){
              video.play();
            }else{
              setTimeout(checkVideoLoaded, 1e2);
            }
          }

          setTimeout(function(){
            video.onloadstart = checkVideoLoaded();
          }, 1e4);
        }
      };
    })();

    return new Generic();
  }
);
