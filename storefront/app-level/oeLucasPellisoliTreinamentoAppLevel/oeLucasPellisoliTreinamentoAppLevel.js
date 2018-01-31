/**
 * @author lucas.pellisoli@objectedge.com
**/

define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['jquery', 'knockout', 'ccLogger', 'ccResourceLoader!global/oeLucasPellisoliTreinamentoAppLevel'],
  //----------------------------------------------------------oeLucasPellisoliTreinamentoAppLevel
  // Module definition
  //-------------------------------------------------------------------
  function($, ko, ccLogger, oeLucasPellisoliTreinamentoAppLevel) {
          'use strict';
    return {

      myFirstText: ko.observable("My first widget"),

      myFirstAppLevelText : ko.observable(myAppLevel.myProp),
      
      myCompute = ko.computed(function() {
        return this.myFirstText() + " " + this.myFirstAppLevelText();    
      }, this),

      onLoad: function(widget) {
        ccLogger.info("[OE][Widget] Loading oeLucasPellisoliTreinamento");
        //onLoad code here.
        var myAppLevel = oeLucasPellisoliTreinamentoAppLevel.oeLucasPellisoliTreinamentoAppLevel;

        

        
      },
    };
  }
);
