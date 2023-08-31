import Product from "../model/Product"

export const getAll = async (options = {}) => {
  try {
    const allProducts = await Product.findAll(options);

    return allProducts;
  } catch (error) {
    throw error
  }
}