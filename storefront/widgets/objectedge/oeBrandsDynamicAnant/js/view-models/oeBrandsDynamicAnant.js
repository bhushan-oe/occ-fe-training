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
import SampleModel from '../models/oeBrandsDynamicAnant';

export class Sample extends BaseWidget {

  @exportToViewModel
  allBrands = ko.observableArray();
  
  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();
    
    var allCollection = ["cen_anant","gb_anant","gbc_anant","kan_anant"];

    for(let id of allCollection){
      rest.request(constants.ENDPOINT_COLLECTIONS_GET_COLLECTION, { },
        (data) => {
          console.log(data);
          this.allBrands.push(data);
          console.log(this.allBrands());
        },
        (error)=>{
          console.log("Error" + error);
        },
        id);
    }
    console.log(this.allBrands());
    console.log('[ONLOAD] - Sample-Anant');
  }

  beforeAppear() {
    console.log('[BEFORE APPEAR] Sample');
  }
}
