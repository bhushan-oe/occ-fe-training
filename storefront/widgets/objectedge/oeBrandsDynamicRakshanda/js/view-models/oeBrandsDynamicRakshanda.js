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
import oeBrandsDynamicRakshandaModel from '../models/oeBrandsDynamicRakshanda';

export class oeBrandsDynamicRakshanda extends BaseWidget {
 @exportToViewModel
 collections = ko.observableArray();
  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();
    var Ids = this.$data.collectionIds().split(',');
    for(let brandId of Ids){
      rest.request(constants.ENDPOINT_COLLECTIONS_GET_COLLECTION,
       { },
       (data)=>{
        this.$data.collections.push(data);
       },
       (error)=>{
         console.log("Error"+error);
       },brandId);
     }

    console.log('[ONLOAD] - Sample..Raksha');
  }

  beforeAppear() {
    console.log('[BEFORE APPEAR] Sample');
  }
}
