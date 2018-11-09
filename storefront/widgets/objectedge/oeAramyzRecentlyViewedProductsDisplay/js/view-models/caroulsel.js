/**
 * Core
 */
 import { exportToViewModel } from 'occ-components/widget-core/decorators';
 import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
 import ko from 'knockout';
 import $ from 'jquery';
 import viewportHelper from 'viewportHelper';
 import storageApi from 'storageApi';

/**
 * Models
 */
 import ProductsModel from '../models/products';

 export class caroulsel extends BaseWidget {

  /**
   * On load view model
   */

   @exportToViewModel
   textCaroulsel = ko.observable();

   @exportToViewModel
   products = ko.observable([]);

   @exportToViewModel
   columns = ko.observable([]);

   @exportToViewModel
   groupProducts = ko.observable([]);




   constructor() {
    //Constructing the BaseWidget
    super();

    

  }

  beforeAppear(page) {

    const widget = this.$data;

    //Set the number of columns for Bootstrap classes on the caroulsel
    this.columns({
      largeColumns: 12/widget.itemsPerRowLargeDesktop(),
      desktopColumns: 12/widget.itemsPerRowDesktop(),
      tabletColumns: 12/widget.itemsPerRowTablet(),
      mobileColumns: 12/widget.itemsPerRowMobile()
    });      

    
    //1010:battery01:43609:27811:987654321:20162320:20162309:20162308:20162307:20162306:20162305:20162304:
    // let productIDs = [1010,11552,20162301,20162302,20162303,20162304,20162305,20162306];
    
    
    let storage = storageApi.getInstance() || new storageApi();
    const keyCookieStorage = "oe-recently-viewed-products";

    let productIDs = [];
    //gets the list of products from the storageApi if it exists
    if(storage.getItem(keyCookieStorage) !== null){
      productIDs = storage.getItem(keyCookieStorage).split(":");
    }

    //check if product detail id is in the id string, and remove from string if it is
    if(page.pageId === "product"){
      let productDetailID = widget.product().id();
      if (productIDs.indexOf(productDetailID) != -1){
        let index = productIDs.indexOf(productDetailID)
        productIDs.splice(index, 1);
      }
    }

    
    //

    let fields = ['id','sourceImageURLs','displayName','listPrice','salePrice'];
    
    this.productsModel = new ProductsModel();


    //list Products by group
    this.productsModel.findProducts(productIDs,fields).then( (list) => {

      this.groupProducts(this.formatProducts(list,productRows()));
      
    },(error) => {
      console.log(error);
    });


    //sets product rows on load
    let currentViewport = ko.observable(viewportHelper.viewportDesignation());
    let productRows = ko.observable(this.formatRows(currentViewport()));

    //change product rows when the window rezize
    viewportHelper.viewportDesignation.subscribe( (viewport) => {
      currentViewport = ko.observable(viewport);
      productRows = ko.observable(this.formatRows(currentViewport()));     

      //separates products by rows each time the window rezize
      this.productsModel.findProducts(productIDs,fields).then( (list) => {

        this.products(list);  
        this.groupProducts(this.formatProducts(list,productRows()));
        
      },(error) => {
        console.log(error);
      });
    }); 
  }

  //divides products into groups of rows for the caroulsel
  formatProducts(arrItems, itemsRow){
    let results = [];
    var length = arrItems.length;
    
    for(let i = 0; i < length; i++){
      
      if(arrItems[0]){
        results[i] = [];
        for (let y = 0; y < itemsRow ; y++){

          results[i].push(arrItems[0]);
          arrItems.splice(0,1);
          
        }
      }
    }

    return results;
  }

  //checks the viewport and sets the number of rows for that viewport
  formatRows(viewport){
    let rows = ko.observable()
    switch (viewport){
      case 'xs':
      rows = ko.observable(this.$data.itemsPerRowMobile())
      break;

      case 'sm':
      rows = ko.observable(this.$data.itemsPerRowTablet())
      break;

      case 'md':
      rows = ko.observable(this.$data.itemsPerRowDesktop())
      break;

      case 'lg':
      rows = ko.observable(this.$data.itemsPerRowLargeDesktop())
      break;
    }

    return rows();
  }

  //forces the caroulsel to start when the page renders
  @exportToViewModel
  startCarousel(element) {
    $(element).carousel({
      interval: false,
      wrap: false
    });

  }




}
