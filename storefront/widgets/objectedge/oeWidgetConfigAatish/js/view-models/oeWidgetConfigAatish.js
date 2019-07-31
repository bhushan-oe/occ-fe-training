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
import oeWidgetConfigAatishModel from '../models/oeWidgetConfigAatish';

export class oeWidgetConfigAatish extends BaseWidget {

  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();
    const self = this.$data;
    console.log('Selected Collection '+self.selectedCollection())
    console.log('[ONLOAD] - oeWidgetConfigAatish');
  }

  beforeAppear() {
    console.log('[BEFORE APPEAR] oeWidgetConfigAatish');
  }
}
