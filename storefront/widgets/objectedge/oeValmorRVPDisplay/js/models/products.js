import constants from 'ccConstants';
import { OERestClient } from 'occ-components/widget-core/helpers';

export default class Products {

  constructor(prodList) {
    if (prodList) {
      this.getProducts(prodList);
    }
  }

  getProducts(prodList) {
    const restClient = new OERestClient;
    const endpoint = constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS;
    const query = {};

    query[constants.FIELDS_QUERY_PARAM] = "active,id,route,displayName,primaryThumbImageURL,listPrice,salePrice";
    query[constants.PRODUCT_IDS] = prodList;
    query[constants.SHOW_INACTIVE_PRODUCT] = false;
    query[constants.DATA_ONLY] = true;

    restClient.setEndpoint(endpoint);
    restClient.setQuery(query);
    restClient.setPath();
    return restClient.send();
  }
};





