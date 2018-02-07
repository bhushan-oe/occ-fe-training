/**
 * @fileoverview oe Lucas Pellisoli Recently Viewed Products Manager.
 *
 * @author lucas.pellisoli@objectedge.com
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'ccConstants', 'ccLogger', 'viewportHelper', 'storageApi', 'ccRestClient'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function (ko, $, constants, ccLogger, viewportHelper, storageApi, restClient) {

    "use strict";

    var STORAGE_API = storageApi.getInstance();
    var KEY_STORAGE = 'oe-recently-viewed-products1';
    function saveLocalStorage(value) {
      STORAGE_API.saveToLocalStorage(KEY_STORAGE,value.join(';'));
    }

    function savesCookies(value) {
      STORAGE_API.saveToCookies(KEY_STORAGE,value.join(';'), 7);
    }

    function getStorage() {
      return STORAGE_API.readFromLocalStrorage(KEY_STORAGE).split(";");
    }

    function getCookiekey() {
      return STORAGE_API.readFromCookies(KEY_STORAGE).split(";");
    }

    function getList() {
      if (!getStorage()) {
        return getStorage();
      }
      if (!getCookiekey()) {
        return getCookiekey();
      }
      return [];
    }
    function saveNewList(list) {
      saveLocalStorage(list);
      saveCookies(list);
    }

    function addIdProd(listIds, nId, maxId) {
      var nListIds = listIds.filter(function (pId) {
        return pId != nId
      });
      if (nListIds.length >= parseInt(maxId)) {
        nListIds.pop();
      }
      nListIds.unshift(nId);

      saveNewList(nListIds);
    };

    return {

      /**
       * This function will run just on time when the widget was loaded the first time
       */

      onLoad: function (widget) {
        ccLogger.info('[OE][onLoad] oeLucasPellisoliRecentlyViewedProductsManager');
        widget.listProd = getList();

        console.log('TESTE', widget.listProd, widget.maxItems);        $.Topic('OE_RVP_NEW_PRODUCT').subscribe(function (productId) {
          addIdProd(widget.listProd,productId,(widget.maxItems|| 0));
        });

      },

      /**
       * This vwfunction will run whe the widget was loaded and every page change
       */
      beforeAppear: function (page) {

      }
    };
  }
);
