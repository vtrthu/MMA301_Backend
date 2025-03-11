const express = require("express");
const db = require("../models");

const OrderRouter = express.Router();

OrderRouter.post("/create", async (req, res, next) => {
    try {
        const { user, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "An order must have at least one item"
            });
        }

        for (const item of items) {
            const product = await db.Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    message: `Product with id ${item.product} not found`
                });
            }
            if (product.unitInStock < item.quantity) {
                return res.status(400).json({
                    message: `Product with id ${item.product} has only ${product.unitInStock} units in stock`
                });
            }
            product.unitInStock -= item.quantity;
            await product.save();
        }
        const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

        const newOrder = new db.Order({
            user,
            orderDate: new Date(),
            status: "Pending",
            items,
            totalAmount
        });

        await newOrder.save()

        res.status(201).json({
            message: "Order created successfully",
            result: newOrder
        });
        
    } catch (err) {
        next(err);
    }
});




module.exports = OrderRouter;


