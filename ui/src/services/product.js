
// Third party imports
import axios from 'axios';
import to from 'await-to-js';

// Constant imports
import { constants } from '../constants/constants';

/**
 * Get product by productID
 * @param {Number} productID
 * @returns List of months
 */
export const getProductByProductID = async (productID) => {
    const [err, result] = await to(
      axios.get(constants.baseURL+'/product/'+productID)
    );
    if (err) {
      return err;
    } else {
      return result?.data;
    }
  };