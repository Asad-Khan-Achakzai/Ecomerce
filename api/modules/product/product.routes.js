// App dependencies
const errorMiddleware = require('../common/error-middleware');
const productMiddleware = require('./product.middleware');
const productController = require('./product.controller');

const resource = '/product';

module.exports = (app) => {

  /**
   * Route to get product by productID.
   */
  app.get(
    `${resource}/:productID`,
    productMiddleware.validateGetProductByProductIDParams,
    errorMiddleware,
    productController.getProductByProductID,
  );
};

 