const express = require('express');
const productController = require('../controllers/product.controller');
const {validateCategory}  = require('../middleware/formValidator');
const router = express.Router();

router.post('/',validateCategory,productController.saveProduct);
router.get('/',productController.getProduct);

module.exports = router