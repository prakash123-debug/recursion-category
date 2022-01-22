const express = require('express');
const bodyParser = require('body-parser');
const CategoryRoute = require('./routes/category.route');
const ProductRoute = require('./routes/product.route');

const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/category",CategoryRoute);
app.use("/product",ProductRoute);

module.exports = app;
