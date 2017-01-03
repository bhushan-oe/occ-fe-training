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
      var parent,
          widgetModel;

      function init(widget){
        widgetModel = widget;
      }

      return {
        // Obligatory
        constructor : Specific,
        __OE__parent : function(_parent){
          parent = _parent;
        },
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
