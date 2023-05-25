const Role = require('../models/role');
const User = require('../models/user');
const Product = require('../models/product');
const Category = require('../models/category');


const isRoleInDB = async(role = '') => {
    const roleExist = await Role.findOne({ role });

    if( !roleExist )
    {
        throw new Error(`${role} doesn't exist`);
    }
}

const isEmailInDB = async(email = '') => {
    //Verificar si el correo existe
    const user = User.findOne({ email })
    
    if( user )
    {
        throw new Error(`${ email } already exist`);
    }

}

const isUserInDB = async( id ) => {
    const userExist = await User.findById( id );

    if( !userExist )
    {
        throw new Error(`User with id: ${ id } doesn't exist`);
    }
}


const isCategoryInDb = async( category ) => {
    const categoryExist = await Category.findOne( { category } );

    if( !categoryExist )
    {
        throw new Error(`${ category } doesn't exist`);
    }

}


const isProductInDb = async( product ) => {
    const productExist = await Product.findOne( { product } );

    if( !productExist )
    {
        throw new Error(`${ product } doesn't exist`);
    }

}


const collectionsAllowed = ( collection = '', collections = []) =>
{

    const includex = collections.includes( collection );

    if( !includex)
    {
        throw new Error(`Collection ${ collection } is not allowed`);
    }
}




module.exports = {
    isRoleInDB,
    isEmailInDB,
    isUserInDB,
    isCategoryInDb,
    isProductInDb,
    collectionsAllowed
}