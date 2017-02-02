/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery'],
  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $){
    function Specific(){}

    Specific.prototype = (function(){
      var widgetModel;

      function init(widget){
        widgetModel = widget;
      }

      return {
        // Obligatory
        constructor : Specific,

        // Variables

        // Specific version
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
