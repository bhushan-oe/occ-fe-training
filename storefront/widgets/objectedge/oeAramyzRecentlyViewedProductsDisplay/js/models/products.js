import constants from 'ccConstants';
import ccRestClient from 'ccRestClient';

export default class ProductsModel {

	/**
	* Array of products ids
	* @type {Array}
	*/

	//productsIDs = [];
	/**
	* Just initialize with all products ids
	* @param  {Array} productsIDs The products ids
	*/
	constructor(productsIDs) {

	}
	
	findProducts(productsIDs, fields) {
		return new Promise( (resolve,reject) => {
			let data = {};

			// data[constants] = productID;
			data[constants.PRODUCT_IDS] = productsIDs.join(',');
			data[constants.FIELDS_QUERY_PARAM] = fields.join(',');
			// data[constants.FIELDS_QUERY_PARAM] = "displayName";
			

			ccRestClient.request(constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS, data, (products) => {
		   		resolve(products);
		   	}, (error) => {
		   		reject(error);
		   	});
		});
	}

};


