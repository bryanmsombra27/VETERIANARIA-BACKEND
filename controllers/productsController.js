import Product from "../models/Product.js";

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(201).send({
      message: "Products",
      products,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) throw new Error("Product not found");

    return res.status(200).send({
      message: "Product Found",
      product,
    });
  } catch (error) {
    return res.status(404).send({
      message: error.message,
    });
  }
};

export { getProducts, getProduct };
