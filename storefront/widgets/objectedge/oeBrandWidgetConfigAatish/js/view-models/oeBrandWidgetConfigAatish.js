import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';
import constants from 'ccConstants';
import rest from 'ccRestClient';

import ko from 'knockout';

import oeBrandWidgetConfigAatishModel from '../models/oeBrandWidgetConfigAatish';

export class oeBrandWidgetConfigAatish extends BaseWidget {
  @exportToViewModel
  allBrands = ko.observableArray();

  constructor() {
    super();
   const self = this.$data;
    var brandCollection = self.selectedBrandCollection().split(",");
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
