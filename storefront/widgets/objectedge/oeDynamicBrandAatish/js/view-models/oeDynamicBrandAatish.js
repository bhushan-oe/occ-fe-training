import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';
import constants from 'ccConstants';
import rest from 'ccRestClient';

import ko from 'knockout';

import oeDynamicBrandAatishModel from '../models/oeDynamicBrandAatish';

export class oeDynamicBrandAatish extends BaseWidget {

  @exportToViewModel
  allBrands = ko.observableArray();

  constructor() {
    super();

    var brandCollection = ["gb121", "cen121", "gbc121", "kan121"];

    for(let id of brandCollection){
      rest.request(constants.ENDPOINT_COLLECTIONS_GET_COLLECTION, {}, 
        (data) => {
          this.allBrands.push(data);
        },
        (error) =>{
          console.log("Error"+ error);
        },id);
    }
  }
  beforeAppear() {
  }
}
