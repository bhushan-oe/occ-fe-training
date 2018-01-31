/**
 * @author lucas.pellisoli@objectedge.com
**/
define(
  // Dependencies
  ['jquery', 'knockout', 'ccLogger', 'ccResourceLoader!global/oeLucasPellisoliTreinamentoAppLevel'],

  // Module Implementation
  function($, ko, ccLogger, oeLucasPellisoliTreinamentoAppLevel) {

     // We recommend enabling strict checking mode
     'use strict';

     // Private variables and functions can be defined here...
     var SOME_CONSTANT = 1024;

     var privateMethod = function () {
       // ...
     };

     return {
      // Widget JS

      onLoad: function(widget) {
        //onLoad code here.
        //console.log('Teste',oeLucasPellisoliTreinamentoAppLevel.oeLucasPellisoliTreinamentoAppLevel.myProp);
        ccLogger.info("[OE][onLoad] Loading oeLucasPellisoliTreinamento");
        
        // widget.textConfig = ko.observable("");
        widget.myFirstText = ko.observable("My first widget 324");
        widget.myFirstAppLevelText = ko.observable(oeLucasPellisoliTreinamentoAppLevel.oeLucasPellisoliTreinamentoAppLevel.myProp);
        widget.myCompute = ko.computed(function() {
          return widget.myFirstText() + " " + widget.myFirstAppLevelText();    
        }, this);

        
      },

      beforeAppear: function(page) {
        // Code to run before showing the widget here.
      },
      
    }
});