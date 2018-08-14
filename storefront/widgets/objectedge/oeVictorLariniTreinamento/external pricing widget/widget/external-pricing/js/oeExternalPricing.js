define(

  ['jquery', 'knockout', 'ccLogger'],

  function($, ko, CCLogger) {

    'use strict';
    return {

      onLoad: function(widget) {
      CCLogger.info("Loading external pricing widget");
      var callbackMap = {};
      var performPrepricing = function()
      {
          // sample code to invoke external system, can be any other logic that implements the price info update
        $.ajax({
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          url: 'https://322d6b54.ngrok.io', // the URL of the external pricing system
          data: JSON.stringify(widget.cart().items()),
          success: function(data) {
              var isExternalPriceUpdated = false;
            // update the cart items with external price details,
            // assuming data has item details with external prices
            if (data.items && data.items.length > 0) {
              for (var i = 0; i < widget.cart().items().length; i++) {
                for (var j = 0; j < data.items.length; j++) {
                  if (widget.cart().items()[i].productId == data.items[j].productId &&
                    widget.cart().items()[i].catRefId == data.items[j].catRefId && 
                    data.items[i].externalPrice && data.items[j].externalPriceQuantity) {
                    // the 2 main informations that must be updated
                    // do not update if is already updated with the external pricing
                    if((data.items[j].externalPrice != widget.cart().items()[i].externalPrice())){
                        isExternalPriceUpdated = true;
                    }
                    widget.cart().items()[i].externalPrice(data.items[j].externalPrice);
                    widget.cart().items()[i].externalPriceQuantity(data.items[j].externalPriceQuantity);
                   }
                 }
               }
            // invoke pricing in this success callback only if the price was updated
            if (isExternalPriceUpdated) {
                widget.cart().markDirty();
            }
          }
        },
        error: function() {
            // errors should be handled here
        }
      });
    };
    callbackMap['prepricing'] = performPrepricing;
    widget.cart().setCallbackFunctions(callbackMap);
    }
   }
  }
);


