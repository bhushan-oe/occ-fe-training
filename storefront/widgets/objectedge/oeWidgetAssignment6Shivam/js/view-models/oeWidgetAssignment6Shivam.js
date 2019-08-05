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
import oeWidgetAssignment6ShivamModel from '../models/oeWidgetAssignment6Shivam';

export class oeWidgetAssignment6Shivam extends BaseWidget {

  /**
   * On load view model
   */

   @exportToViewModel
   variable1 = ko.observable("abc");
   
  constructor() {
    //Constructing the BaseWidget
    super();

    console.log('[ONLOAD] - Sample');
  }

  beforeAppear() {
    console.log('[BEFORE APPEAR] Sample');
  }
}
