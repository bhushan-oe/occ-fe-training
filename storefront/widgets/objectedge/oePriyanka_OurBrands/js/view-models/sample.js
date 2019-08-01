/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';
import ccRestClient from 'ccRestClient';
import constants from 'ccConstants';

/**
 * Libraries, Helpers
 */
import ko from 'knockout';

/**
 * Models
 */

export class Sample extends BaseWidget {

    /**
     * On load view model
     */
    @exportToViewModel
    brands = ko.observableArray();

    constructor() {
        //Constructing the BaseWidget
        super();

        var data = {};

    }

    beforeAppear() {
        console.log('[BEFORE APPEAR] Sample');
        var brands_ids = ["brand_greenball", "brand_centinnal", "brand_gbc", "brand_kanati"];
        var self = this;
        this.collections = brands_ids.map(function(value, key) {
            ccRestClient.request(constants.ENDPOINT_COLLECTIONS_GET_COLLECTION, null, (collections) => {
                self.brands.push({
                    link: collections.route,
                    name: collections.displayName,
                    image: collections.categoryImages[0].path
                });
            }, (error) => {}, value);

        });

    }
}