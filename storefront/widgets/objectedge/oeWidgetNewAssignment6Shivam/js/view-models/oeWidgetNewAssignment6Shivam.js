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
import  oeWidgetNewAssignment6ShivamModel from '../models/oeWidgetNewAssignment6Shivam';

export class oeWidgetNewAssignment6Shivam extends BaseWidget {

  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();

    console.log('[ONLOAD] - Sample');
  }

  beforeAppear() {
    console.log('[BEFORE APPEAR] Sample');
  }
}
