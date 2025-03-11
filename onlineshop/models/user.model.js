const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: [true, "Username is required"], unique: [true, "Username already exists"] },
    email: { type: String, required: [true, "Email is required"], unique: [true, "Email already exists"] },
    password: { type: String, required: [true, "Password is required"] },
    fullname: { type: String },
    address: { type: String },
    phone: { type: String },
    role: { type: String, enum: ["Customer", "Admin"], default: "Customer" }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;