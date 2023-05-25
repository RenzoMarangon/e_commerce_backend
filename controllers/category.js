const Category = require('../models/category');

const categoryGetAll = async( req, res = response ) => {

    const category = await Category.find();


    res.json({
        category
    })
}

const categoryGetOne = async( req, res = response ) => {

    const { id } = req.params;

    const category = await Category.findById( id );

    res.json({
        category
    })
}

const categoryPost = async( req, res = response ) => {

    const { _id, name } = req.body;

    const category = new Category({ name })

    await category.save()

    res.json({
        category
    })
}
const categoryPut = async( req, res = response ) => {

    const { _id, name, price, description, category, stock } = req.body;

    const newcategory = new Category({name})

    await Category.findByIdAndUpdate( id, newcategory )


    res.json({
        newcategory
    })
}
const categoryDelete = async( req, res = response ) => {

    const { id } = req.params;

    // const category = await category.findByIdAndDelete( id );
    const category = await Category.findByIdAndUpdate( id, { state:false } )

    res.json({
        deleted : category
    })
}

module.exports = {
    categoryGetAll,
    categoryGetOne,
    categoryDelete,
    categoryPut,
    categoryPost
}