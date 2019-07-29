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
import SampleModel from '../models/oeWidgetDemoShivam';

export class Sample extends BaseWidget {

  /**
   * On load view model
   */
   
  @exportToViewModel
  allBrands = ko.observableArray();

  constructor() {
    //Constructing the BaseWidget
    super();
    const allBrandsId = ["shivam_gb","shivam_centennial","shivam_gbc","shivam_kanati"];
    for(let id of allBrandsId){
      rest.request(constants.ENDPOINT_COLLECTIONS_GET_COLLECTION,
        { },
        (data)=>{
          this.allBrands.push(data);
          
        },
        (error)=>{
          console.log("Error"+error);
        },
        id);
    }
  }
  
  beforeAppear() {
    console.log('[BEFORE APPEAR] Sample');
  }
}
