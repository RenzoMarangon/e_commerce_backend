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
    const user = await User.findOne({ email })

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


const isCategoryInDb = async( name ) => {
    const categoryExist = await Category.findOne( { name } );

    if( !categoryExist )
    {
        throw new Error(`${ name } doesn't exist`);
    }

}

const categoryExist = async( name ) => {
    const categoryExist = await Category.findOne( { name } );

    if( categoryExist )
    {
        throw new Error(`${ name } already exists`);
    }
}


const isProductInDb = async( id ) => {
    const productExist = await Product.findById( id );


    if( !productExist )
    {
        throw new Error(`Product doesn't exist`);
    }

}

const productExist = async( name ) => {
    const productExist = await Product.findOne( { name } );

    if( productExist )
    {
        throw new Error(`${ name } already exists`);
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
    collectionsAllowed,
    categoryExist,
    productExist
}