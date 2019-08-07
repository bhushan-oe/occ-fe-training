/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';
import constantsPracticeDynamicAnant from 'ccConstants';
import restPracticeDynamicAnant from 'ccRestClient';
/**
 * Libraries, Helpers
 */
import ko from 'knockout';

/**
 * Models
 */
import SampleModel from '../models/oePracticeDynamicAnant';

export class Sample extends BaseWidget {

  @exportToViewModel
  allBrands = ko.observableArray();
  brand = ko.observableArray();
  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();

    const v = this.$data;
    const collection = v.anyBrand().split(",");
    
    for (let id of collection) {
      
      restPracticeDynamicAnant.request(constantsPracticeDynamicAnant.ENDPOINT_COLLECTIONS_GET_COLLECTION, { },
        (data) => {
          this.allBrands.push(data);
          
        },
        (error) => {
          console.log("Error" + error);
        },
        id);
    }
    console.log('[ONLOAD] - Sample');
  }

  beforeAppear() {
    console.log('[BEFORE APPEAR] Sample');
  }
}
