/**
 * Core
 */
 import { exportToViewModel } from 'occ-components/widget-core/decorators';
 import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
 import ko from 'knockout';
 import $ from 'jquery'
 import constants from 'ccConstants'
 import storageApi from 'storageApi';

/**
 * Models
 */
 import SampleModel from '../models/sample';

 export class manager extends BaseWidget {

  /**
   * On load view model
   */

   //global vars

   constructor() {
    //Constructing the BaseWidget
    super();    
    const widget = this.$data;

    $.Topic("OE_RVP_NEW_PRODUCT").subscribe(newId => {
        this.setStorageApi(newId);
    })
    
  }

  beforeAppear(page) {
    const widget = this.$data;
    const keyCookieStorage = "oe-recently-viewed-products";
    let storage = storageApi.getInstance() || new storageApi();

    if(storage.getItem(keyCookieStorage) !== null){
      widget.recentlyViewed = storage.getItem(keyCookieStorage);
    }
    else {
      if(storage.readFromCookies(keyCookieStorage !== null)){
        widget.recentlyViewed = readFromCookies(keyCookieStorage);
      }
      else {
        widget.recentlyViewed = "";
      }
    }

    if(page.pageId === "product"){
      let id = widget.product().id();

      this.setStorageApi(id);
      
    }


  }

  setStorageApi(id){
    const widget = this.$data
    let storage = storageApi.getInstance() || new storageApi();
    let maxItems = widget.maxItems();
    const keyCookieStorage = "oe-recently-viewed-products";

    //insert id into storage if the number of id's is smaller than maxitems
    if(widget.recentlyViewed.split(":").length-1 < maxItems){
      this.deleteIfRepeated(id);
      widget.recentlyViewed = id + ":" + widget.recentlyViewed;
      storage.setItem(keyCookieStorage, widget.recentlyViewed);
    }//if id is repeated, delete it from the storage and insert again in the beggining
    else {
      if(this.deleteIfRepeated(id)){
        widget.recentlyViewed = id + ":" + widget.recentlyViewed;
        storage.setItem(keyCookieStorage, widget.recentlyViewed);
      }//if storage is full, delete the last id from the storage and insert the new id
      else {
        this.deleteLast();
        widget.recentlyViewed = id + ":" + widget.recentlyViewed;
        storage.setItem(keyCookieStorage, widget.recentlyViewed);
      }
    }
  }

  deleteIfRepeated(element){
    const widget = this.$data
    let arrElements = widget.recentlyViewed.split(":") || [],
    //index of the repeated id
    index = arrElements.indexOf(element), newString = "";
    //if id is repeated
    if(index !== -1){
      arrElements.splice(index,1);
      for(let i=0;i<arrElements.length-1;i++){
        newString = newString + arrElements[i] + ":";
      }
      widget.recentlyViewed = newString;
      return true;
    }
    //if id is not repeated
    else{ return false; }
  }

  //delete last id from the local
  deleteLast(){
    const widget = this.$data
    let arrElements = widget.recentlyViewed.split(":"), newString="";
    arrElements.splice(arrElements.length-1 ,1);
    for(let i=0;i<arrElements.length-1;i++){
      newString = newString + arrElements[i] + ":";
    }
    widget.recentlyViewed = newString;
  }
}
