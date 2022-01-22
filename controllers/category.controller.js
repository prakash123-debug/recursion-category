const model = require('../models');
const fs = require('fs');
async function saveCategory(req,res){
    if(req.file)
    {
        var img = req.file.path;
    }
    const categoryData = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.file.path,
        parentId: req.body.parentId == '' ? null : req.body.parentId,
    }
    console.log(categoryData);
   
    try {
        if (categoryData.parentId == null || categoryData.parentId == '') {
            let newCategory = await model.Category.create(categoryData);
            res.status(201).json({
                message: "category created sucessfully",
                data: newCategory
            })
        }

        let oldCategory = await model.Category.findOne({
            where: {
                id: categoryData.parentId
            }
        });
        if (oldCategory) {
            let newCategory = await model.Category.create(categoryData);
            res.status(201).json({
                message: "category created sucessfully",
                data: newCategory
            })
        }
        else {
            res.status(404).json(({
                message: "parent category not found not found !!"
            }))
        }
    } catch (err) {

        res.status(500).json({
            error: err.message
        })
    }
}

async function ShowAllCategories(req,res){
    
    try{
        const allCategory=await model.Category.findAll();
        if(allCategory){
            res.status(200).json({
                data:allCategory
            })
        }
    }catch(err){
        res.status(500).json({
            error:err.message
        }) 
    }
}

async function getCategory(req,res){
    try{
        const AllCategory = await model.Category.findAll({
            
        });
        if(AllCategory){

            let categories = await AllCategories(AllCategory);
            res.status(200).json({
                data:categories
            })
        }
        else{
            res.status(404).json({
                message:"Category not found"
            })
        }

    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
  
}

async function AllCategories(data,parentId=null){
     let categoryList = [];
     let parentCat;
     if(parentId == null){
         parentCat = data.filter((element)=>element.parentId == null)
     }
     else{
        parentCat = data.filter((element)=>element.parentId == parentId)
     }
     for(let dataCat of parentCat){
         categoryList.push({
             id:dataCat.id,
             name:dataCat.name,
             image:dataCat.image,
             children:await AllCategories(data,dataCat.id)
         })

     }

     return categoryList;

}



module.exports = {
    saveCategory:saveCategory,
    getCategory:getCategory,
    ShowAllCategories:ShowAllCategories
    
}


