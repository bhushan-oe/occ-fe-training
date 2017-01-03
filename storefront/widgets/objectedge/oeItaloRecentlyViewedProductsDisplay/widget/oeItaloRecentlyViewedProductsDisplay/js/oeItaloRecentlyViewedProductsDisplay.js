/**
 * @fileoverview oeRecentlyViewedProducts
 *
 * @author developero@objectedge.com
 */
 define(
   //-------------------------------------------------------------------
   // DEPENDENCIES
   //-------------------------------------------------------------------
   ['/file/widget/oeItaloRecentlyViewedProductsDisplay/js/widgetGeneric.js', './widgetSpecific.js'],
   //-------------------------------------------------------------------
   // MODULE DEFINITION
   //-------------------------------------------------------------------
   function (generic, specific) {
     'use strict';

     var widget = {};

     function loadDependencies(dependence, callback, ignore){
       if(!callback || callback.constructor !== Function) throw new Error('The callback must be a function!');

       for(var i = 0; i < dependence.length; i++){
         if(dependence[i] === generic || dependence[i] === ignore) continue;

         callback(dependence[i]);
       }
     }

     function inject(model){
       for(var i in model){
         if(i.indexOf('__OE__') < 0){
           widget[i] = model[i];
         }
       }
     }

     generic.__OE__model(arguments);

     loadDependencies(arguments, function(model){
       model.__OE__parent(generic);
     });

     inject(generic);

     loadDependencies(arguments, function(model){
       inject(model);
     }, specific);

     inject(specific);

     return widget;
   }
 );
