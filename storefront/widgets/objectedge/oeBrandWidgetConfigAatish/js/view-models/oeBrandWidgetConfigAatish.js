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
import oeBrandWidgetConfigAatishModel from '../models/oeBrandWidgetConfigAatish';

export class oeBrandWidgetConfigAatish extends BaseWidget {

  /**
   * On load view model
   */
  @exportToViewModel
  allBrands = ko.observableArray();

  constructor() {
    //Constructing the BaseWidget
    super();
   
    var brandCollection = ["gb121", "cen121", "gbc121", "kan121"];
    for(let id of brandCollection){
      rest.request(constants.ENDPOINT_COLLECTIONS_GET_COLLECTION, {}, 
        (data) => {
          this.allBrands.push(data);
          console.log(this.allBrands());
        },
        (error) =>{
          console.log("Error"+ error);
        },id);
    }
    console.log('[ONLOAD] - oeBrandWidgetConfigAatish');
  }

  beforeAppear() {
    console.log('[BEFORE APPEAR] oeBrandWidgetConfigAatish');
  }
}
