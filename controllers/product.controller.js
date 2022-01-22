const model = require('../models');

async function saveProduct(req,res){
    const productData = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        categoryId: req.body.categoryId,
    }
    try {
        let category = await model.Category.findOne({where:{
            id:productData.categoryId
        } })
        if(category){
            let products = await model.Product.create(productData);
            res.status(201).json({
                message:"Product created sucessfully",
                data:products
            })

        }else{
            res.status(404).json({
                message:"Category not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

async function getProduct(req,res){
    try {
       let Products = await model.Product.findAll({
        include : [
            {
              model: model.Category,
              as: "categories"
            }
        ]
       });
       if(Products){
           res.status(200).json({
               data:Products
           })
       }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}




module.exports = {
    saveProduct:saveProduct,
    getProduct:getProduct
}


