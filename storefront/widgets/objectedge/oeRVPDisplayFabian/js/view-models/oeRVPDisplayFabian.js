/**
 * Core
 */

import {exportToViewModel} from "occ-components/widget-core/decorators";
import {BaseWidget} from "occ-components/widget-core";

/**
 * Librearies, Helpers
 */
import ko from "knockout";
import storageApi from "storageApi";
import viewportHelper from 'viewportHelper';

/**
 * Models
 */
import Products from '../models/products';
import Slide from './slide';

const KEY_STORAGE = 'oe-recently-viewed-products-fabian';

export class oeRVPDisplayFabian extends BaseWidget {
  
  @exportToViewModel
  config = ko.observable();
  
  @exportToViewModel
  slide = ko.observable([]);
  
  constructor() {
    super();
    this.storage = storageApi.getInstance();
    this.products = [];
    
    this.getConfig();
    this.getProducts();
    this.controlView();
  }
  
  controlView() {
    viewPort.viewportDesignation.subscrible((view) => {
      this.getConfig();
      this.renderSlides();
    })
  }
  
  getProducts() {
    const prodtList = this.storage.getItem(KEY_STORAGE);
    const maxItems = this.getData('maxItems', 'num', 8);
    const prodArray = prodtList !== '' ? prodtList.split(';') : [];
    const prodId = this.$data.product && typeof this.$data.product === 'function' && this.$data.product() ? 

    this.$data.product().id() : null;
    this.getNewProduct(prodArray, maxItems, prodId);
  }
  
  getNewProduct(prodArray, maxItems, prodId) {
    return new Products()
      .getProducts(prodArray.filter((pid) => !prodId || pid !== prodId).splice(0, maxItems).join(','))
      .then((prod) => {
        this.products = prod;
        this.renderSlides();
      })
      .catch((msg) => {
        console.log('Unable to retrieve product ', msg);
      });
  }
    
  getConfig() {
    const viewPort = viewportHelper.viewportDesignation();
    const title = this.getData('carouselTitle', 'str', '');
    const maxItems = this.getData('maxItems', 'num', 8);
    const itemsPRLDesktop = this.getData('itemsPerRowLargeDesktop', 'num', 4);
    const itemsPRDesktop = this.getData('itemsPerRowDesktop', 'num', 4);
    const itemsPRTablet = this.getData('itemsPerRowTablet', 'num', 2);
    const itemsPRMobile = this.getData('itemsPerRowMobile', 'num', 2);
    let itemsPerRow = 0;
    let itemWidth = 0;
    
    itemsPerRow = this.setItems(viewPort, itemsPRLDesktop, itemsPRTablet, itemsPRMobile, itemsPRDesktop);
    itemWidth = parseFloat(100 / itemsPerRow) + '%';
    
    this.config({
      title,
      maxItems,
      itemsPerRow,
      itemWidth,
    });
  }
  
  setItems(viewPort, itemsPRLDesktop, itemsPRTablet, itemsPRMobile, itemsPRDesktop) {
    let items = 0;    
    switch(viewPort.toLowerCase()) {
      case 'lg':
        items = itemsPRLDesktop;
        break;
      case 'sm':
        items = itemsPRTablet;
        break;
      case 'xs':
        items = itemsPRMobile;
        break;
      default:
        items = itemsPRDesktop;
    }
    return items;
  }
  
  getData(prop, type, value) {
    let valueFinal = value;
    switch(type.toLowerCase()) {
      case 'num':
        if (ko.isObservable(this.$data[prop]) && !isNaN(this.$data[prop]())) {
          valueFinal = parseInt(this.$data[prop](), 10);
        }
        break;
      default:
        if (ko.isObservable(this.$data[prop])) {
          valueFinal = this.$data[prop]();
        }
        break;
    }
    return valueFinal;
  }
  
  renderSlides() {
    const { itemsPerRow } = this.config();
    const products = [...this.products];
    this.slides(this.getSlides(itemsPerRow, products));
  }
  
  getSlides(itemsPerRow, products) {
    let slides = [];
    for(let i = 0 ; i < Math.ceil(this.products.length / itemsPerRow); i++) {
      slides.push(new Slide(products.splice(0, itemsPerRow)));
    }
    return slides
  }
}