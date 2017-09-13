/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';

/**
 * Libraries, Helpers
 */
import ccConstants from 'ccConstants';
import ko from 'knockout';
import storageApi from 'storageApi';
import viewportHelper from 'viewportHelper';

/**
 * Models
 */
import Product from '../models/product';

export class oeValmorRVPDisplay extends BaseWidget {

  @exportToViewModel
  products = ko.observableArray([]);

  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();

  }

  beforeAppear() {

  }
}
