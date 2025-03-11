const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpErrors = require("http-errors");
require("dotenv").config();

const db = require("./models");
const CategoryRouter = require("./routes/category.route");
const ProductRouter = require("./routes/product.route");
const UserRouter = require("./routes/user.route");
const OrderRouter = require("./routes/order.route");

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
    res.status(200).send({ message: "Welcome to Restful API server" });
});

//Recieve request 
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter)
app.use("/user", UserRouter);
app.use("/order", OrderRouter);

//Error handling
app.use(async (req, res, next) => {
    next(httpErrors.BadRequest("Bad request"));
});

app.use(async (err, req, res, next) => {
    res.status = err.status || 500,
        res.send({
            "error": {
                "status": err.status || 500,
                "message": err.message
            }
        });
})

const HOST_NAME = process.env.HOST_NAME;
const PORT = process.env.PORT;

app.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at: http://${HOST_NAME}:${PORT}`);
    //Connect to database
    db.connectDb();
});