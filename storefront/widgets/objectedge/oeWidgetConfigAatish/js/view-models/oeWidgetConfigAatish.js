import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';

import ko from 'knockout';

import oeWidgetConfigAatishModel from '../models/oeWidgetConfigAatish';

export class oeWidgetConfigAatish extends BaseWidget {

  constructor() {
    super();
    const self = this.$data;
  }

  beforeAppear() {
  }
}
