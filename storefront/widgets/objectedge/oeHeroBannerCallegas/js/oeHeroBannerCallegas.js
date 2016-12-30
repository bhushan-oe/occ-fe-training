
define(

  // DEPENDENCIES
  ['./widgetGeneric.js', './widgetSpecific.js'],


  // WIDGET DEFINITION
  function (generic, specific) {
    'use strict';

    // Object that will contains the final structure of the widget
    var widget = {};


    function dependLoad(dependence, callback, ignore){
      if(!callback || callback.constructor !== Function) throw new Error('The callback must be a function!');

      $.each(dependence, function(i, value){
        if(value !== generic && value !== ignore) callback(value);
      });
    }

    
    function inject(dependence){
      $.each(dependence, function(i, value){
        if(i.indexOf('__OE__') < 0) widget[i] = value;
      });
    }

    
    (function(dependencies){
      var dependence = [];

      $.each(dependencies, function(i, value){
        if(value !== generic) dependence.push(value);
      });

      dependence = dependence.sort(function(a, b){return (a === specific) ? 1:0; });

      generic.__dependence = dependence.slice();

      
      generic.__run = function (method, data) {
        var widget = this;

        $.each(widget.__dependence, function(i, value){
          if(!value['__OE__' + method] || value['__OE__' + method].constructor !== Function){
            throw new Error('The ' + value.constructor + ' does not have a method ' + '__OE__' + method);
          }

          value['__OE__' + method](data);
        });
      };
    })(arguments);

    
    dependLoad(arguments, function(dependence){
      dependence.__parent = generic;
    });

    
    inject(generic);

    
    dependLoad(arguments, function(dependence){
      inject(dependence);
    }, specific);



    inject(specific);

    return widget;
  }
  );