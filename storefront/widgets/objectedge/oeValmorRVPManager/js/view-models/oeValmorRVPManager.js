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

  beforeAppear() {
    // Store the current product id, if the actual page is a PDP
    this.storeCurrentIfProduct();
  }

  /**
   * Retrieves the current stored products list
   */
  getStoredProducts() {
    const productList = this.storage.getItem(STORAGE_KEY);
    return productList && productList !== '' ? productList.split(';') : [];
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
   */
  storeProductById(productId) {
    if (productId) {
      const maxProducts = this.$data.maxItems && typeof this.$data.maxItems === 'function' && !isNaN(this.$data.maxItems()) ? parseInt(this.$data.maxItems(),10) : 8;
      const storedProducts = [].concat(productId, this.getStoredProducts().filter((pId) => pId !== productId)).slice(0,maxProducts);
      return this.storage.setItem(STORAGE_KEY, storedProducts.join(';'));
    }
    return false;
  }

  /**
   * If data is defined, $data.product is a function and it's return is not undefined, stores the product id
   */
  storeCurrentIfProduct() {
    if (this.$data && typeof this.$data.product === 'function' && this.$data.product()) {
      const productId = this.$data.product().id();
      return this.storeProductById(productId);
    }
    return false;
  }
}
