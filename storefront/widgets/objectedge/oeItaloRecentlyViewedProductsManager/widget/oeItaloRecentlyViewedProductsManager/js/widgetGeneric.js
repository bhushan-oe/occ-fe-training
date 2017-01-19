/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'ccConstants', 'viewportHelper', 'storageApi'],
  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $, constants, viewportHelper, storageApi){
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

      var maxItems = 8, keyCookieStorage = "oe-recently-viewed-products-it", pubTopic = "OE_RVP_NEW_PRODUCT";

      function init(widget){
        widgetModel = widget;

        if(localStorage.getItem(keyCookieStorage) !== null){
          widgetModel.recentlyViewed = localStorage.getItem(keyCookieStorage);
        }
        else {
          if(getCookie(keyCookieStorage !== null)){
            widgetModel.recentlyViewed = decodeURIComponent(getCookie(keyCookieStorage));
          }
          else {
            widgetModel.recentlyViewed = "";
          }
        }
        maxItems = widgetModel.maxItems();
      }

      function setLocalStorage(id){
        if(widgetModel.recentlyViewed.split(";").length-1 < maxItems){
          deleteIfRepeated(id);
          widgetModel.recentlyViewed = id + ";" + widgetModel.recentlyViewed;
          localStorage.setItem(keyCookieStorage, widgetModel.recentlyViewed);
        }
        else {
          if(deleteIfRepeated(id)){
            widgetModel.recentlyViewed = id + ";" + widgetModel.recentlyViewed;
            localStorage.setItem(keyCookieStorage, widgetModel.recentlyViewed);
          }
          else {
            deleteLast();
            widgetModel.recentlyViewed = id + ";" + widgetModel.recentlyViewed;
            localStorage.setItem(keyCookieStorage, widgetModel.recentlyViewed);
          }
        }
      }

      function deleteLast(){
        var arrElements = widgetModel.recentlyViewed.split(";"), newString="";
        arrElements.splice(arrElements.length-1 ,1);
        for(var i=0;i<arrElements.length-1;i++){
          newString = newString + arrElements[i] + ";";
        }
        widgetModel.recentlyViewed = newString;
      }

      function deleteIfRepeated(element){
        var arrElements = widgetModel.recentlyViewed.split(";") || [],
        index = arrElements.indexOf(element), newString = "";
        if(index !== -1){
          arrElements.splice(index,1);
          for(var i=0;i<arrElements.length-1;i++){
            newString = newString + arrElements[i] + ";";
          }
          widgetModel.recentlyViewed = newString;
          return true;
        }
        else{ return false; }
      }

      function setCookie(id){
        deleteIfRepeated(id);
        widgetModel.recentlyViewed = id + ";" + widgetModel.recentlyViewed;
        var cookieValue = widgetModel.recentlyViewed;
        cookieValue = encodeURIComponent(cookieValue);
        document.cookie = keyCookieStorage + "=" + cookieValue + ";expires = 365";
      }

      function getCookie(cookieName) {
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return null;
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

        // Generic version
        onLoad : function(widget){
          init(widget);
          run('onLoad', widget);
        },

        beforeAppear : function(page){

          $.Topic(pubTopic + ".memory").subscribe(function(data){ setLocalStorage(data) });

          if(page.pageId === "product"){
            try{
              setLocalStorage(widgetModel.product().id());
            }
            catch(e){
              if(e === 'QUOTA_EXCEEDED_ERR' )
                setCookie(widget.product().id);
            }
          }
          run('beforeAppear', page);
        }
      };
    })();

    return new Generic();
  }
);
