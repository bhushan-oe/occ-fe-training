/**
 * @fileoverview oeWidget
 *
 * @author maximiliano.porta@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['./widgetGeneric.js', './widgetSpecific.js'],
  //-------------------------------------------------------------------
  // WIDGET DEFINITION
  //-------------------------------------------------------------------
  function (generic, specific) {
    'use strict';

    // Object that will contains the final structure of the widget
    var widget = {};

    /**
     * [
     *  For every dependence, runs the callback if the
     *  dependence 'i' is different of 'generic' and 'ignore'
     * ]
     * @param  {Array}    dependence  [array of all widget dependencies]
     * @param  {Function} callback    [function executed using the dependence 'i']
     * @param  {???}      ignore      [instance of one dependence]
     * @return void
     */
    function loadDependencies(dependence, callback, ignore) {
      if (!callback || callback.constructor !== Function) {
        throw new Error('The callback must be a function!');
      }

      $.each(dependence, function(i, value) {
        if(value !== generic && value !== ignore) {
         callback(value);
        }
      });
    }

    /**
     * [
     *  Add to the widget's final object all dependencies attributes
     *  and methods that's does not contains the prefix '__OE__'
     * ]
     * @param  {???} model [instance of one dependence]
     * @return void
     */
    function inject(dependence) {
      $.each(dependence, function(i, value) {
        if (i.indexOf('__OE__') < 0) {
          widget[i] = value;
        }
      });
    }

    /**
     * [
     *  Set all widget dependencies in the right order.
     *  Generic is removed and Specific always will be the last dependence.
     *  Set the generic __run method
     * ]
     * @param  {Object} dependencies  [widget arguments]
     * @return void
     */
    (function(dependencies) {
      var dependence = [];

      $.each(dependencies, function(i, value) {
        if (value !== generic) {
          dependence.push(value);
        }
      });

      dependence = dependence.sort(function(a) { return (a === specific) ? 1 : 0; });

      generic.__dependence = dependence.slice();

      /**
       * [
       *  Controls the call of 'onLoad' and 'beforeAppear' for all dependencies
       * ]
       * @param  {String} method [the method name]
       * @param  {Object} data   [The object passed to the method ('widget' or 'page')]
       * @return void
       */
      generic.__run = function (method, data) {
        var widget = this;

        $.each(widget.__dependence, function(i, value) {
          if(!value['__OE__' + method] || value['__OE__' + method].constructor !== Function) {
            throw new Error('The ' + value.constructor + ' does not have a method ' + '__OE__' + method);
          }

          value['__OE__' + method](data);
        });
      };
    })(arguments);

    // Set the Generic reference as a parent for all dependencies
    loadDependencies(arguments, function(dependence) {
      dependence.__parent = generic;
    });

    // Add generic attributes and methods
    inject(generic);

    // Add attributes and methods of the other dependencies
    loadDependencies(arguments, function(dependence) {
      inject(dependence);
    }, specific);

    // Add specific attributes and methods
    inject(specific);

    return widget;
  }
);