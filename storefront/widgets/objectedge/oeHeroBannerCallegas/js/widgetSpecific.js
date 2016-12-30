
define(

  // DEPENDENCIES
  ['knockout', 'jquery'],
  
  // WIDGET DEFINITION
  function(ko, $){
    function Specific(){}

    Specific.prototype = (function(){
      var widgetModel;

      function init(widget){
        widgetModel = widget;
      }

      return {

        constructor : Specific,
        

        
        __OE__onLoad : function(widget){
          init(widget);

          
        },
        __OE__beforeAppear : function(page){


        }
        
      };
    })();

    return new Specific();
  }
  );