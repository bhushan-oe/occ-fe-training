/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
import ko from 'knockout';
import storageApi from 'storageApi';
import $ from 'jquery';

const STORAGE_KEY = 'oe-valmor-recently-viewed-products';

export class oeValmorRVPManager extends BaseWidget {

  /**
   * On load view model
   */
  constructor() {
    // Constructing the BaseWidget
    super();

    this.storage = storageApi.getInstance();
    this.setTopicListener();
  }

  beforeAppear(page) {
    // If the actual page is a PDP, store the current product id
    if (page.pageId && page.pageId === 'product') {
      this.storeProduct();
    }
  }

  /**
   * Retrieves the current stored products list
   */
  getStoredProducts() {
    const productList = this.storage.getItem(STORAGE_KEY);
    return productList ? productList.split(';') : [];
  }

  /**
   * Set the topic listener
   */
  setTopicListener() {
    $.Topic('OE_VALMOR_RVP_NEW_PRODUCT').subscribe((productId) => {
      return this.storeProductById(productId);
    });
  }

  /**
   * Stores the product Id
   * Sliced from storeProduct to allow it to be invoked by the topic listener, receiving an ID to store
   */
  storeProductById(productId) {
    if (productId) {
      const maxProducts = ko.isObservable(this.$data.maxItems) && !isNaN(this.$data.maxItems()) ? parseInt(this.$data.maxItems(),10) : 8;
      const storedProducts = [].concat(productId, this.getStoredProducts().filter((pId) => pId !== productId)).slice(0,maxProducts);
      return this.storage.setItem(STORAGE_KEY, storedProducts.join(';'));
    }
    return false;
  }

  /**
   * If product.id is an observable, evaluates it and stores the product id
   */
  storeProduct() {
    // if (this.$data && typeof this.$data.product === 'function' && this.$data.product()) {
    if (ko.isObservable(this.$data.product) && ko.isObservable(this.$data.product().id)) {
      const productId = this.$data.product().id();
      return this.storeProductById(productId);
    }
    return false;
  }
}
