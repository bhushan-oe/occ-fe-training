/**
 * Core
 */
import {BaseWidget} from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */

import ko from 'knockout';
import storageApi from 'storageApi';
import $ from 'jQuery';
 
const KEY_STORAGE = 'oe-recently-viewed-products-fabian';

export class oeRVPManagerFabian extends BaseWidget {
   
  /**
   * On load view model
   */
  constructor() {
    // Constructing the BaseWidget
    super();
    
    this.storageApi = storageApi.getInstance();
  }
  
  getStoredProducts() {
    const productList = this.storageApi.getItem(KEY_STORAGE);
    return productList ? productList.split(';') : [];
  }
  
  beforeAppear(page) {
    // If the actual page is a PDP, store the current product id
    if (page.pageId && page.pageId === 'product') {
      this.storeProduct();
    }
  }
  
  storeProduct() {
    // if (this.$data && typeof this.$data.product === 'function' && this.$data.product()) {
    if (ko.isObservable(this.$data.product) && ko.isObservable(this.$data.product().id)) {
      const productId = this.$data.product().id();
      return this.storeProductById(productId);
    }
    return false;
  }
  
  storeProductById(productId) {
    if (productId) {
      const maxProducts = ko.isObservable(this.$data.maxItems) && !isNaN(this.$data.maxItems()) ? parseInt(this.$data.maxItems(),10) : 8;
      const storedProducts = [].concat(productId, this.getStoredProducts().filter((pId) => pId !== productId)).slice(0,maxProducts);
      return this.storage.setItem(STORAGE_KEY, storedProducts.join(';'));
    }
    return false;
  }
  
  setTopicListener() {
    $.Topic('OE_RVP_NEW_PRODUCT_FABIAN').subscribe((productId) => {
      return this.storeProductById(productId);
    });
  }  
}