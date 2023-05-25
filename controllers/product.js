const Product = require('../models/product');

const productGetAll = async( req, res = response ) => {

    const product = await Product.find();


    res.json({
        product
    })
}

const productGetOne = async( req, res = response ) => {

    const { id } = req.params;

    const product = await Product.findById( id );

    res.json({
        product
    })
}

const productPost = async( req, res = response ) => {

    const { _id, name, price, description, category, stock } = req.body;

    const newproduct = new Product({name, price, description, category, stock})

    await newproduct.save()

    res.json({
        newproduct
    })
}
const productPut = async( req, res = response ) => {

    const { _id, name, price, description, category, stock } = req.body;

    const newproduct = new Product({name, price, description, category, stock})

    await Product.findByIdAndUpdate( id, newproduct )


    res.json({
        newproduct
    })
}
const productDelete = async( req, res = response ) => {

    const { id } = req.params;

    // const product = await product.findByIdAndDelete( id );
    const product = await product.findByIdAndUpdate( { state:false } )

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