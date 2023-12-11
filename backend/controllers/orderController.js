import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";


const addOrderItem = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order Item")
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createOrder = await order.save();
        res.status(200).json(createOrder)


    }
})



const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders)
});
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(400)
        throw new Error("No order found")
    }
});
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save();
        res.status(200).json(updateOrder);
    } else {
        res.status(400)
        throw new Error("No order found")
    }
});
const updateOrderToDeliver = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliverAt = Date.now();

        const updateOrder = await order.save();
        res.status(200).json(updateOrder);
    }else{
        res.status(400)
        throw new Error("No order found")
    }
});
const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders)
});

export {
    addOrderItem,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliver,
    getOrders
}