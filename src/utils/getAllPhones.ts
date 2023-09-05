/* eslint-disable no-useless-catch */
import Phones from '../model/phones';

export const getAllPhones = async(options = {}) => {
  try {
    const allProducts = await Phones.findAll(options);

    return allProducts;
  } catch (error) {
    throw error;
  }
};
