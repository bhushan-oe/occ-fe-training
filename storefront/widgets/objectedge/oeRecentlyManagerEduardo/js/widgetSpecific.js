/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout'],
  //-------------------------------------------------------------------
  // WIDGET DEFINITION
  //-------------------------------------------------------------------
  function(ko) {
    function Specific() {
      // default constructor
    }

    Specific.prototype = (function() {
      var widgetModel;

      function init(widget) {
        widgetModel = widget;
      }

      return {
        // Obligatory
        constructor : Specific,

        // Specific version
        __OE__onLoad : function(widget) {
          init(widget);
        },

        __OE__beforeAppear : function(page) {
          // ...
        }
      };
    })();

    return new Specific();
  }
);
