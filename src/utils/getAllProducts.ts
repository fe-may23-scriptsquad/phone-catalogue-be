import Product from "../model/Product"

export const getAll = async () => {
  try {
    const allProducts = await Product.findAll();

    return allProducts;
  } catch (error) {
    throw error
  }
}