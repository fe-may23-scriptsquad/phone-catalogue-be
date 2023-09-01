/* eslint-disable no-useless-catch */
import Products from '../model/products'

export const getAll = async (options = {}) => {
  try {
    const allProducts = await Products.findAll(options);

    return allProducts;
  } catch (error) {
    throw error
  }
}
