/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
import ko from 'knockout';

/**
 * Models
 */
import oeWidgetConfigShivamModel from '../models/oeWidgetConfigShivam';

export class oeWidgetConfigShivam extends BaseWidget {
  
  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();
    const self = this.$data;  
    console.log(self.gbBrands()+" our Brands");
    console.log('[ONLOAD] - Sample shivam');
  }

  beforeAppear() {
    console.log('[BEFORE APPEAR] Sample');
  }
}
