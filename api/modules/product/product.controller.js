// Npm Imports
const { to } = require("await-to-js");

// Mongoose Import
const mongoose = require("mongoose");

// Collections Imports
const Product = mongoose.model("Product");

// Constant imports
const constants = require("../../config/constants");
const { responseMessages } = require("./product.constants");

// App dependencies
const { winstonLog } = require("../common/common");

/**
 * Controller function to get Product by Product id
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object}
 */
const getProductByProductID = async (req, res, next) => {
  winstonLog(
    req,
    constants.logLevel.info,
    `Fetching product by product id: ${req.params.productID}`
  );

  const [err, product] = await to(Product.findById(req.params.productID));

  if (err) {
    winstonLog(
      req,
      constants.logLevel.error,
      `Error in product by ProductID: ${req.params.productID} Error: ${err}`
    );
    res.status(500);
    return next({ msgCode: "1006" });
  }

  res.status(200);
  
  return res.json({
    success: product ? 1 : 0,
    message: product
      ? responseMessages.getProduct.success
      : `${responseMessages.getProduct.failure} No data found.`,
    data: product,
  });
};

module.exports = {
  getProductByProductID,
};
