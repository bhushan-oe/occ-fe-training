/**
 * @fileoverview oeRecentlyManagerEduardo
 *
 * @author eduardo.souza@objectedge.com
 */
define(['knockout', 'jquery', 'storageApi'], function(ko, $, storageApi) {
  'use strict';
  
  var STORAGE_KEY_NAME = 'oe-recently-viewed-products-eduardo';
  var STORAGE_API = storageApi.getInstance();

  // Get LocalStorage
  function getStorage(key) {
    return STORAGE_API.readFromLocalStrorage(key);
  }

  // Get Cookie
  function getCookie(key) {
    return STORAGE_API.readFromCookies(key);
  }

  // Set LocalStorage
  function updateLocalStorage(key, value) {
    STORAGE_API.saveToLocalStorage(key, value);
  }

  // Set Cookie
  function updateCookies(key, value) {
    STORAGE_API.saveToCookies(key, value, 7);
  }

  // Set both
  function updateStorage(key, value, days) {
    updateLocalStorage(key, value);
    updateCookies(key, value, days || 7);
  }

  /**
   * Creates the recently viewed products list on localStorage and Cookies
   * @param {Number} size - The maximum amount of items that should be storage on the RecentlyViewedProducts list
   */
  function buildStorage(size) {

    var recentlyViewedProductsList = JSON.stringify({ ids: [], listSize: (+size || 8) });

    // Should not override the current localStorage, if exists
    if ( !getStorage(STORAGE_KEY_NAME) ) {
      updateLocalStorage(STORAGE_KEY_NAME, recentlyViewedProductsList);
    }

    // Should not override the current cookie, if exists
    if ( !getCookie(STORAGE_KEY_NAME) ) {
      updateCookies(STORAGE_KEY_NAME, recentlyViewedProductsList, 7);
    }
  }

  /**
   * Adds the @param id to the RecentlyViewedProducts list. If the ID is already on the list, update the previous position
   * @param {String} id - The product ID to store in recentlyViewedList of both LocalStorage and Cookie
   */
  function addProductId(id) {

    var storage = JSON.parse( STORAGE_API.getItem(STORAGE_KEY_NAME) );

    // Remove previous occurrences of the product id (should not repeat the same id on the list)
    storage.ids = storage.ids.filter(function(pid) {
      return pid != id;
    });

    // Prepend the id on the list
    storage.ids.unshift(id);

    // Trim the array to not overflow the maxItems property
    storage.ids = storage.ids.splice(0, storage.listSize);

    // Add new id
    updateStorage(STORAGE_KEY_NAME, JSON.stringify(storage), 7);
  }

  return {

    onLoad: function(widget) {

      // Start up the storage
      buildStorage(widget.maxItems());

      // Subscribe to the topic OE_RVP_NEW_PRODUCT for update the recentlyViewedProducts list
      $.Topic('OE_RVP_NEW_PRODUCT').subscribe(function(productId) {
        addProductId(productId);
      });

    },
    beforeAppear: function(page) {}

  };

});