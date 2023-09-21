// Importing npm dependencies
const { param } = require("express-validator");

module.exports = {
  validateGetProductByProductIDParams: [
    param("productID", "1002").exists({ checkFalsy: true }),
    param("productID", "1003").isString(),
  ],
};
