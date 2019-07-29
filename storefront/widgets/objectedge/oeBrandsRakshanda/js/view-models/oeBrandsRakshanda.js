
/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';
import constants from 'ccConstants';
import rest from 'ccRestClient';

/**
 * Libraries, Helpers
 */
import ko from 'knockout';

/**
 * Models
 */
import oeBrandsRakshandaModel from '../models/oeBrandsRakshanda';


export class oeBrandsRakshanda extends BaseWidget {
  @exportToViewModel
  brandImages = ko.observableArray(); 
  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
     super();
     const allBrandsNames =["Rakshanda_greenball","Rakshanda_centennial","Rakshanda_gbc","Rakshanda_kanati"]
     for(let brandId of allBrandsNames){
     rest.request(constants.ENDPOINT_COLLECTIONS_GET_COLLECTION,
      { },
      (data)=>{
        this.brandImages.push(data);
      },
      (error)=>{
        console.log("Error"+error);
      },brandId);
    }

     console.log( this.brandImages());
  }

  beforeAppear() {
    // console.log('[BEFORE APPEAR] Sample');
  }
}
