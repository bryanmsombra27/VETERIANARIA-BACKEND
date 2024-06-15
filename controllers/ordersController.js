import Order from "../models/Order.js";
import { Types } from "mongoose";

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    });
    return res.status(200).send({
      message: "actual orders",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const addOrderItems = async (req, res) => {
  try {
    const {
      cartItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (cartItems && cartItems.length === 0) {
      throw new Error("No order items");
    }
    const order = new Order({
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      itemsPrice,
      orderItems: cartItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
    });
    const createOrder = await order.save();

    return res.status(201).send({
      message: "order created successfully",
      order: createOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      throw new Error("Order not found");
    }

    return res.status(200).send({
      message: "actual order",
      order,
    });
  } catch (error) {
    console.log(error, "ERRROR OBTENIENDO UNA ORDEN");
    return res.status(404).send({
      message: error.message,
    });
  }
};
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      console.log(updatedOrder, "ORDEN ENCONTRADA");
      return res.status(200).send({
        message: "Order paid successfully!",
        order: updatedOrder,
      });
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      return res.status(200).send({
        message: "Order paid successfully!",
        order: updatedOrder,
      });
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");

    return res.status(200).send({
      message: "all orders",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};

export {
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
  addOrderItems,
};
