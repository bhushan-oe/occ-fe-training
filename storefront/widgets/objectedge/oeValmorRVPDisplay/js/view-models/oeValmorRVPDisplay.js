/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
import ccConstants from 'ccConstants';
import ko from 'knockout';
import storageApi from 'storageApi';
import viewportHelper from 'viewportHelper';

/**
 * Models
 */
import Products from '../models/products';
import Slide from './slide';

const STORAGE_KEY = 'oe-valmor-recently-viewed-products';

export class oeValmorRVPDisplay extends BaseWidget {

  @exportToViewModel
  config = ko.observable();

  @exportToViewModel
  slides = ko.observable([]);

  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();
    this.storage = storageApi.getInstance();
    this.products = [];

    this.getConfig();
    this.getProducts();
  }

  beforeAppear() {
    this.controlView();
  }

  controlView() {
    viewportHelper.viewportDesignation.subscribe((viewport) => {
      this.getConfig();
      this.renderSlides();
    });
  }

  getData(prop, type = null, defaultValue) {
    let value = defaultValue;
    switch(type) {
      case 'num':
        if (prop && this.$data.hasOwnProperty(prop) && typeof this.$data[prop] === 'function' && !isNaN(this.$data[prop]())) {
          value = parseInt(this.$data[prop](), 10);
        }
        break;
      case 'str':
      default:
        if (prop && this.$data.hasOwnProperty(prop) && typeof this.$data[prop] === 'function' && this.$data[prop]()) {
          value = this.$data[prop]();
        }
        break;
    }
    return value;
  }

  getConfig() {
    const viewPort = viewportHelper.viewportDesignation();
    const title = this.getData('carouselTitle', 'str', '');
    const maxItems = this.getData('maxItems', 'num', 8);
    const itemsPerRowLargeDesktop = this.getData('itemsPerRowLargeDesktop', 'num', 4);
    const itemsPerRowDesktop = this.getData('itemsPerRowDesktop', 'num', 4);
    const itemsPerRowTablet = this.getData('itemsPerRowTablet', 'num', 2);
    const itemsPerRowMobile = this.getData('itemsPerRowMobile', 'num', 2);
    let itemsPerRow = 0;
    let itemWidth = 0;

    switch(viewPort.toLowerCase()) {
      case 'xs':
        itemsPerRow = itemsPerRowMobile;
        break;
      case 'sm':
        itemsPerRow = itemsPerRowTablet;
        break;
      case 'lg':
        itemsPerRow = itemsPerRowLargeDesktop;
        break;
      default:
        itemsPerRow = itemsPerRowDesktop;
    }

    itemWidth = parseFloat(100 / itemsPerRow) + '%';

    this.config({
      title,
      maxItems,
      itemsPerRow,
      itemWidth,
    });
  }

  getProducts() {
    const productList = this.storage.getItem(STORAGE_KEY);
    const maxItems = this.getData('maxItems', 'num', 8);
    const currencySymbol = this.$data.site().currency.symbol;
    const productId = this.$data.product && typeof this.$data.product === 'function' && this.$data.product() ? this.$data.product().id() : null;
    const productArray = productList && productList !== '' ? productList.split(';') : [];
    return new Products()
      .getProducts(productArray.filter((pid) => !productId || pid !== productId).splice(0, maxItems).join(','))
      .then((prod) => {
        this.products = prod;
        this.renderSlides();
      })
      .catch((msg) => {
        console.log('Unable to retrieve product ', msg);
      });
  }

  renderSlides() {
    const slides = [];
    const { itemsPerRow } = this.config();
    const products = [...this.products];
    for(let i = 0 ; i < Math.ceil(this.products.length / itemsPerRow); i++) {
      slides.push(new Slide(products.splice(0, itemsPerRow)));
    }
    this.slides(slides);
  }
}
