/**
 * @author lucas.pellisoli@objectedge.com
**/
define(
    // Dependencies
    ['jquery', 'knockout', 'ccLogger'],
  
    // Module Implementation
    function($, ko, ccLogger) {
  
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
          ccLogger.info("Loading external pricing widget");
          var callbackMap = {};
          function performPrepricing(){
            $.ajax({
              type: 'POST',
              dataType: 'json',
              contentType: 'application/json',
              url: '', // the URL of the external pricing system
              data: JSON.stringify(widget.cart().items()),
              success: function(data) {
                  var UpdatedExternalPrincing = false; /* Apos receber os dados a var UpdatedExternalPrincing 
                  recebe false, informando que tem novos dados que não foram atualizados ainda*/
                  if(data.items && data.items.length > 0){
                    for(var i = 0; i <  widget.cart().items().length; i++){
                      for(var j = 0; j <  data.items.length; j++){
                        if(widget.cart().items()[i].productId == data.items[j].productId &&
                          widget.cart().items()[i].catRefId == data.items[j].catRefId &&
                          data.items[i].externalPrice && data.items[j].externalPriceQuantity) {
                        /** 
                          *Confere se os itens são os mesmos;
                         */
                          if((data.items[j].externalPrice != widget.cart().items()[i].externalPrice())){
                              isExternalPriceUpdated = true;
                          }
                          /** 
                            *Confere se os itens estão diferentes;
                          */
                          widget.cart().items()[i].externalPrice(data.items[j].externalPrice);
                          widget.cart().items()[i].externalPriceQuantity(data.items[j].externalPriceQuantity);
                          /** 
                            *Atualiza os itens do carrinho (obs: Passa o valor para o ko.observable alterar);
                          */ 
                        }
                      } 
                    }
                    if(isExternalPriceUpdated) {
                      widget.cart().markDirty();
                    }
                  }
              },
              error:function(xhr,status,error){
                  ccLogger.info("[OE][error]", xhr, status, error);
              }
          });
        }
        callbackMap['prepricing'] = performPrepricing;
        widget.cart().setCallbackFunctions(callbackMap);
        },
  
        beforeAppear: function(page) {
          // Code to run before showing the widget here.
        },
        
      }
  });