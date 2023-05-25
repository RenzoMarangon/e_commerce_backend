const { response } = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');

const { ObjectId } = require('mongoose').Types;

const allowCollections = [ 'user','categorys', 'products'];


const searchUsers = async( object = '', res = response) => {
    const isMongoID = ObjectId.isValid( object ); //TRUE

    if(isMongoID)
    {
        const user = await User.findById( object );

        return res.json({
            results: ( user ) ? [ user] : []
        })
    }

    //Expresion regular insensible a las mayusculas o minisculas
    const regex = RegExp( object, "i");

    const users = await User.find({ 
        $or: [{name: regex }, {email: regex}],
        $and: [{state:true}]
    });

    const count = await User.count({ 
        $or: [{name: regex }, {email: regex}],
        $and: [{state:true}]
    });

    return res.json({
        results: users,
        count
    })
}


const searchProducts = async( object = '', res = response) => {
    const isMongoID = ObjectId.isValid( object ); //TRUE

    if(isMongoID)
    {
        const product = await Product.findById( object );

        return res.json({
            results: ( product) ? [ product ] : []
        })
    }

    //Expresion regular insensible a las mayusculas o minisculas
    const regex = RegExp( object, "i");

    const products = await Product.find({ name: regex },{state:true});

    const count = await Product.count({ name: regex },{state:true});

    return res.json({
        results: products,
        count
    })
}

const searchCategorys = async( object = '', res = response) => {
    const isMongoID = ObjectId.isValid( object ); //TRUE

    if(isMongoID)
    {
        const category = await Category.findById( object );

        return res.json({
            results: ( category) ? [ category ] : []
        })
    }

    //Expresion regular insensible a las mayusculas o minisculas
    const regex = RegExp( object, "i");

    const categorys = await Product.find({ name: regex },{state:true});

    const count = await Category.count({ name: regex },{state:true});

    return res.json({
        results: categorys,
        count
    })
}



const search = (req, res = response) => 
{

    const { collection, object } = req.params;

    if( !allowCollections.includes( collection ))
    {
        return res.status(400).json({
            msg: `Collections allowed: ${ allowCollections }`
        })
    }



    switch (collection) {

        case 'user':
            searchUsers(object, res);
        break;

        case 'products':
            searchProducts(object, res);
        break;

        case 'categorys':
            searchCategorys(object, res);
        break;


    
        default:
            res.status(500).json({
                msg: "Search doesn't work"
            });
    }


}


module.exports = {
    search,
   
}