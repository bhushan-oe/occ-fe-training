/**
 * @fileoverview oeWidget
 *
 * @author @dev
 */
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout', 'jquery', 'ccConstants', 'viewportHelper', 'storageApi', 'ccRestClient'],
  //-------------------------------------------------------------------
  // WIDGET DEFINITION
  //-------------------------------------------------------------------
  function(ko, $, constants, viewportHelper, storageApi, restClient) {
    function Generic() {
      // default constructor
    }

    Generic.prototype = (function() {
      var widgetModel;


      //variables
      var maxProducts = 8;
      var cookieKey = "oe-recently-viewed-products-it";

      //

      function init(widget) {
        widgetModel = widget;
        if (Object.keys(widgetModel.site().extensionSiteSettings).length) {
          widgetModel.config(widgetModel.site().extensionSiteSettings);
        } else {
          widgetModel.config(null);
        }
      }


      //load the information in order to create data for the carousel
      //here is where cookies will be setted and rest client will be called
      function loadProductData(widget,page)
      {
        maxProducts = widgetModel.maxProducts;

        if(localStorage.getItem(cookieKey)!==null)
        {
          widgetModel.recentProducts = localStorage.getItem(cookieKey);
        }
        else
        {
          if(getCookie(cookieKey)!==null)
          {
            widgetModel.recentProducts = decodeURIComponent(getCookie(cookieKey));
          }
          else
          {
            widgetModel.recentProducts="";
          }
        }

        if(widgetModel.pageContext().page.name === "product")
        {
          var productArray = widgetModel.recentProducts.split(";") || [];
          var index = productArray.indexOf(widgetModel.product().id());
          if(index!=-1)
          {
            productArray.splice(index,1);
            widgetModel.recentProducts = productArray.join(";");
          }
        }

        //variables necessary to query 
        var productIdsString = widgetModel.recentProducts;
        var productIdArray = productIdsString.split(";").join();
        var query = createQuery(productIdArray),active;

        //request(url, data, success, error, param1, param2, param3, param4, beforeSend)
        //rest call to obtain product parameters in order to create carousel
        restClient.request(constants.ENDPOINT_PRODUCTS_LIST_PRODUCTS,query,
          function(response)
          {
            widgetModel.productsGroup(widgetModel.formatProducts(response,widgetModel.itemsPerRow()));
          },
          function(error)
          {
            alert("Error: requesting product params failed. See RVPDisplay for more information.");
          }
        )
      }


      //create the query with params needed to search products in rest request
      function createQuery(productId)
      {
        var params = {};
        params[constants.PRODUCT_ID] = productId;
        params[constants.FIELDS_QUERY_PARAM] = "displayName,listPrice,salePrice,primaryMediumImageURL";
        return params;
      }

      //preparation of carouselData.
      function carouselData(name,image,index,listPrice,salePrice)
      {
        this.name = ko.observable(name);
        this.imageSource = ko.observable(image);
        this.index = ko.observable(index);
        this.listPrice = ko.observable(listPrice.toFixed(2));
        if(salePrice)
        {
          this.salePrice = ko.observable(salePrice.toFixed(2));
        }
        if(index===0)
        {
          this.class = "active";
        }
      }


      //function to get cookies and split it
      function getCookie(cname) 
      {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
      }

      return {
        // Obligatory
        constructor : Generic,
        // Variables
        viewportWidth : ko.observable(),
        viewportMode : ko.observable(),
        productsGroup : ko.observableArray(),
        productsList : ko.observableArray(),

        // Generic version
        //viweport and items per row definitions
        setViewport: function(viewMode,itemsRow)
        {
          this.viewportMode(viewmode);
          this.setItemsPerRow(itemsRow);
        },

        setItemsPerRow: function(itemsRow)
        {
          widgetModel.itemsPerRow=ko.observable(12/widgetModel[itemsRow]);
        },




        onLoad : function(widget) {
          init(widget);

          //set what rows are, dividing the grid maximum rows per rows to be shown
          widgetModel.largeRows = 12/widget.itemsPerRowLargeDesktop();
          widgetModel.desktopRows = 12/widget.itemsPerRowDesktop();
          wdigetModel.tabletRows = 12/widget.itemsPerRowTablet();
          widgetModel.mobileRows = 12/widget.itemsPerRowMobile();

          //this function checks the width and set rows in order to display the correct amount of items
          //this function uses the config above in setViewport second parameter
          widget.checkResponsiveFeatures = function(res)
          {
            if(res>constants.VIEWPORT_LARGE_DESKTOP_LOWER_WIDTH)
            {
              if(widget.viewportMode()!==constants.LARGE_DESKTOP_VIEW)
              {
                widget.setViewport(constants.DESKTOP_VIEW,"largeRows");
              }
            }
            else
            {
              if(res > constants.VIEWPORT_TABLET_UPPER_WIDTH && res <= constants.VIEWPORT_LARGE_DESKTOP_LOWER_WIDTH)
              {
                if(widget.viewportMode()!==constants.DESKTOP_VIEW)
                {
                  widget.setViewport(constants.DESKTOP_VIEW,"desktopRows");
                }
              }
              else
              {
                if(res>=constants.VIEWPORT_MOBILE_WIDTH)
                {
                  if(widget.viewportMode() !== constants.TABLET_VIEW)
                  {
                    widget.setViewport(constants.TABLET_VIEW,"tableRows");
                  }
                }
                else
                {
                  if(widget.viewportMode()!== constants.PHONE_VIEW)
                  {
                    widget.setViewport(constants.PHONE_VIEW,"mobileRows");
                  }
                }
              }
            }
          }

        //resize function
        $(window).resize(function()
        {
            widget.checkResponsiveFeatures($(window)[0].innerWidth || $(window).width());
            widget.viewportWidth($(window)[0].innerWidth || $(window).width());
        });

          loadProductData(widgetModel,page.pageId);
          widgetModel.__run('onLoad', widget);

         
        },
        beforeAppear : function(page) {

          loadProductData(widgetModel,page.pageId);

          widgetModel.__run('beforeAppear', page);
        },

        //product format.Its called in restClient
        formatProducts: function (arrayProducts,itemsRow)
        {
          var arrayProd = [];
          var temporaryArrayprod = [];

          for(var i=0;i<arrayProducts.length;i++)
          {
            if(arrayProducts[i])
            {
              arrayProd.push(new carouselData(arrayProducts[i].displayName,arrayProducts[i].primaryMediumImageURL,i,arrayProducts[i].listPrice,arrayProducts[i].salePrice));
            }
          }
          while(arrayProd.length>0)
          {
            temporaryArrayprod = arrayProd.splice(0,itemsRow);
            widgetModel.productsList.push(temporaryArrayprod);
          }
          return widgetModel.productsList;

        }


      };
    })();

    return new Generic();
  }
);
