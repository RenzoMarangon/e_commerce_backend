const { isProductInDb } = require('../database/db-validators');
const Product = require('../models/product');

const productGetAll = async( req, res = response ) => {

    const product = await Product.find();


    res.json({
        product
    })
}

const productGetOne = async( req, res = response ) => {



    const product = await Product.findById( id );

    res.json({
        product
    })
}

const productPost = async( req, res = response ) => {


    const {password, orders, google, state, __v, ...user}  = req.authUser;

    const { _id, name, price, description, category, stock  } = req.body;

    const newproduct = new Product({name, price, description, category, stock, user})

    await newproduct.save()

    res.json({
        newproduct
    })
}
const productPut = async( req, res = response ) => {

    const { id } = req.params;

    const { _id, name, price, description, category, stock } = req.body;

    const newproduct = { name, price, description, category, stock };

    const productUpdated = await Product.findByIdAndUpdate( id, newproduct )

    res.json({
        product:{
            name: name || productUpdated.name,
            description: description || productUpdated.description,
            category: category || productUpdated.category,
            stock: stock || productUpdated.stock
        }
    })
}
const productDelete = async( req, res = response ) => {

    const { id } = req.params;

    // const product = await product.findByIdAndDelete( id );
    const product = await Product.findByIdAndUpdate( id, { state:false } )

    res.json({
        deleted : product
    })
}

module.exports = {
    productGetAll,
    productGetOne,
    productDelete,
    productPut,
    productPost
}