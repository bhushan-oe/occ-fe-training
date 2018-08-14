/**
 * @fileoverview oe Nome Do Widget.
 *
 * @author developero@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'ccResourceLoader!global/oeCore'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function (ko, $, oeCore) {

    "use strict";

    return {
      text: ko.observable(),
      onLoad: function(widget) {
      },
      beforeAppear: function(page) {
        console.log(this)
        this.text(oeCore.victor.helloworldMethod());
        // console.log("VICTOR: ", );
      },
      blabla: function() {
        if(this.text() ===  'lalalallalala') {
          this.text(oeCore.victor.helloworldMethod());
        } else {
          this.text('lalalallalala');
        }
      }
    };
  }
);
