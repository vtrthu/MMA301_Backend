const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Pending", "Processing", "Delivered", "Shipped", "Cancelled"], default: "Pending" },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: [true, "Quantity is required"], min: 1 },
            price: { type: Number, required: [true, "Price is required"] }
        }
    ],
    totalAmount: { type: Number, required: [true, "Total amount is required"] }

}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;