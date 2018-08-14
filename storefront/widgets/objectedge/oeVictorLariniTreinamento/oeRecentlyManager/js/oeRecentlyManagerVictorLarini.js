/**
 * @fileoverview oeRecentlyManagerVictorLarini.
 *
 * @author victorugo.godinho@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'storageApi'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function (ko, $, storageApi) {

    "use strict";

    var KEY_STORAGE = 'oe-recently-viewed-products';
    var STORAGE_API = storageApi.getInstance();
    
    function updateLocalStorage(value) {
      STORAGE_API.saveToLocalStorage(KEY_STORAGE,value.join(';'));
    }

    function updateCookies(value) {
      STORAGE_API.saveToCookies(KEY_STORAGE,value.join(';'), 7);
    }

    function getStorage() {
      return STORAGE_API.readFromLocalStrorage(KEY_STORAGE);
    }

    function getCookie() {
      return STORAGE_API.readFromCookies(KEY_STORAGE);
    }

    function saveNewList(list) {
      updateLocalStorage(list);
      updateCookies(list);
    }

    function getList() {

      if (!getStorage())
        return getStorage();
      
      if (!getCookie()) 
        return getCookie();
      
      return [];
    }

    function addProductID(listIds, nId, maxId) {

      var nListIds = listIds.filter(function (pId) {
        return pId != nId
      });

      if (nListIds.length >= parseInt(maxId)) 
        nListIds.pop();
    
      nListIds.unshift(nId);

      saveNewList(nListIds);
    };

    return {

      onLoad: function (widget) {
        ccLogger.info('[OE][onLoad] oeRecentlyManagerVictorLarini');
        widget.listProd = getList();
     
        $.Topic('OE_RVP_NEW_PRODUCT').subscribe(function (productId) {
          addProductID(widget.listProd,productId,(widget.maxItems|| 0));
        });

      },

      beforeAppear: function (page) {

      }
    };
  }
);
