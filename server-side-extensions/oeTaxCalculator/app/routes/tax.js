module.exports = function(app) {
  'use strict';

  app.post('/v1/tax-zorzo', function (req, res) {
    var shippingGroup = req.body.request.shippingGroups[0];
    var orderTotal = req.body.request.priceInfo.totalWithoutTax;

    // ShippingRates
    var shippingDistrictRate = 0.02;
    var shippingCountyRate = 0.075;
    var shippingCityRate = 0.2;
    var shippingStateRate = 0.25;

    // Item Rates
    var itemDistrictRate = 0.01;
    var itemCountyRate = 0.05;
    var itemCityRate = 0.1;
    var itemStateRate = 0.15;

    var items = shippingGroup.items.map(function (item) {
      var taxDetails = [
        {
          "jurisType": "state",
          "tax": itemStateRate * item.price,
          "rate": itemStateRate,
          "taxName": "state tax"
        },
        {
          "jurisType": "district",
          "tax": itemDistrictRate * item.price,
          "rate": itemDistrictRate,
          "taxName": "district tax"
        },
        {
          "jurisType": "city",
          "tax": itemCityRate * item.price,
          "rate": itemCityRate,
          "taxName": "city tax"
        },
        {
          "jurisType": "county",
          "tax": itemCountyRate * item.price,
          "rate": itemCountyRate,
          "taxName": "county tax"
        }
      ];

      var taxCost = taxDetails.reduce(function (acc, element) {
        return acc + element.tax;
      }, 0);

      var taxRate = taxDetails.reduce(function (acc, element) {
        return acc + element.rate;
      }, 0);


      return {
        "commerceId" : item.commerceId,
        "commerceItemId" : item.commerceItemId,
        "tax": taxCost,
        "rate": taxRate,
        "catRefId": item.catRefId,
        "taxDetails": taxDetails
      }
    });

    var itemsTax = items.reduce(function (acc, element) {
      return acc + element.tax
    }, 0);

    var shippingCost = shippingGroup.shippingMethod.cost;
    var shippingDetails = [
      {
        "jurisType": "county",
        "tax": shippingCountyRate * shippingCost,
        "rate": shippingCountyRate,
        "taxName": "county tax"
      },
      {
        "jurisType": "city",
        "tax": shippingCityRate * shippingCost,
        "rate": shippingCityRate,
        "taxName": "city tax"
      },
      {
        "jurisType": "state",
        "tax": shippingStateRate * shippingCost,
        "rate": shippingStateRate,
        "taxName": "state tax"
      },
      {
        "jurisType": "district",
        "tax": shippingDistrictRate * shippingCost,
        "rate": shippingDistrictRate,
        "taxName": "district tax"
      }
    ];

    var shippingTax = shippingDetails.reduce(function (acc, element) {
      return acc + element.tax;
    }, 0);

    var totalTaxCost = shippingTax + itemsTax;

    var payload = {
      "response": {
        "shippingGroups": [
          {
            "taxPriceInfo": {
              "amount": totalTaxCost
            },
            "priceInfo": {
              "tax": totalTaxCost
            },
            "shippingMethod": {
              "tax": shippingTax,
              "shippingTax": shippingTax,
              "taxDetails": shippingDetails
            },
            "shippingGroupId": shippingGroup.shippingGroupId,
            "items": items
          }
        ],
        "isTaxIncluded": true,
        "orderId": req.body.request.orderId,
        "orderProfileId": req.body.request.orderProfileId,
        "status": "success"
      }
    };

    res.type('application/json');
    res.statusCode = 200;
    res.json(payload);
  });
};
