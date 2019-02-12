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

/**
 * Models
 */ 
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
  }
  
  beforeAppear() {

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
    
    itemsPerRow = setItems(viewPort, itemsPRLDesktop, itemsPRTablet, itemsPRMobile, itemsPRDesktop);
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
}