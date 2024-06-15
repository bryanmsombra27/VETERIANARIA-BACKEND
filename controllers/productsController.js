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

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "sample brand",
      category: "sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const productSaved = await product.save();

    return res.status(201).send({
      message: "Product created successfully!",
      product: productSaved,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product doesnt exists");
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const productSaved = await product.save();

    return res.status(201).send({
      message: "Product updated successfully!",
      product: productSaved,
    });
  } catch (error) {
    console.log(error, "UPDATE ERROR");
    return res.status(400).send({
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product doesnt exists");
    }
    await Product.findByIdAndDelete(id);

    return res.status(201).send({
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log(error, "DELETE ERROR");
    return res.status(400).send({
      message: error.message,
    });
  }
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
