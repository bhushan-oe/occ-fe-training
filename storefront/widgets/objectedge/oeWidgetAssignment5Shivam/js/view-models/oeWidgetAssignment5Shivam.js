/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';
import oeViewModelsConstants from 'ccConstants';
import oeViewModelsRest from 'ccRestClient';
/**
 * Libraries, Helpers
 */
import ko from 'knockout';

/**
 * Models
 */
import oeWidgetAssignment5ShivamModel from '../models/oeWidgetAssignment5Shivam';
 
export class oeWidgetAssignment5Shivam extends BaseWidget {
  @exportToViewModel
  oeOurBrands = ko.observableArray();
  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();
    const self = this.$data;   
    oeViewModelsRest.request(oeViewModelsConstants.ENDPOINT_LIST_COLLECTIONS,
          {categoryIds: self.oeGbBrands()},
          (data)=>{
            console.log(data);
            self.oeOurBrands.push(data);
            
          },
          (error)=>{
            console.log("Error"+error);
          }
        );
  }
  beforeAppear() {
    console.log('[BEFORE APPEAR] Sample');
  }
}
