import constants from 'ccConstants';
import { OERestClient as Rest } from 'occ-components/widget-core/helpers';

export default class SampleModel {

  getProduct (id) {
    this.rest = new Rest();
    this.rest.setEndpoint(constants.ENDPOINT_PRODUCTS_GET_PRODUCT);
    this.rest.setQuery({
      [constants.FIELDS_QUERY_PARAM] : 'id,displayName',
      [constants.DATA_ONLY]: true
    });
    this.rest.setPath(id);
    this.rest.send()
        .then(response => {
          console.log('Sent!', response);
        })
        .catch(error => {
          console.log('Error!', error);
        })
  }
};
