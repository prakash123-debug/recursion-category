const express = require('express');
const categoryController = require('../controllers/category.controller');
const {validateCategory}  = require('../middleware/formValidator');
const imageUpload = require('../middleware/imageUpload');
const router = express.Router();

router.post('/',imageUpload.upload.single('image'),validateCategory,categoryController.saveCategory);
router.get('/allCategory',categoryController.ShowAllCategories);
router.get('/',categoryController.getCategory);

module.exports = router