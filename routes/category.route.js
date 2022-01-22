const express = require('express');
const categoryController = require('../controllers/category.controller');
const {validateCategory}  = require('../middleware/formValidator');
const router = express.Router();

router.post('/',validateCategory,categoryController.saveCategory);
router.get('/',categoryController.getCategory);

module.exports = router