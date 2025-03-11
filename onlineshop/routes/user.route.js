const express = require("express");
const db = require("../models");

const UserRouter = express.Router();

UserRouter.post("/create", async (req, res, next) => {
    try {
        const { username, email, password, fullname, address, phone } = req.body;
        const newUser = new db.User({
            username,
            email,
            password,
            fullname,
            address,
            phone
        });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}
);

UserRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await db.User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User found",
            user: user
        });
    } catch (err) {
        next(err);
    }
}
);

UserRouter.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await db.User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated",
            user: user
        });
    } catch (err) {
        next(err);
    }
}
);

UserRouter.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await db.User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User deleted",
            user: user
        });
    } catch (err) {
        next(err);
    }
}
);


module.exports = UserRouter;