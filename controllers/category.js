const Category = require('../models/category');

const categoryGetAll = async( req, res = response ) => {

    const category = await Category.find({ state: true});


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

    const { name } = req.body;
    const { _id, ...user} = req.authUser;
    user.uid = _id;
    

    const cat = { name, user}

    const category = new Category( cat )

    await category.save()

    
    res.json({
        msg:`${ category.name } created successfuly`
    })
}
const categoryPut = async( req, res = response ) => {

    const { _id, name } = req.body;

    const { id } = req.params;

    const newcategory = { name }

    if( name == 'undefined' || name == null )
    {
        return res.status(400).json({ msg: "Propiety doesn't exist"})
    }

    await Category.findByIdAndUpdate( id , newcategory )


    res.json({
        msg: `Category ${ newcategory.name } edited successfuly`
    })
}
const categoryDelete = async( req, res = response ) => {

    const { id } = req.params;

    // const category = await category.findByIdAndDelete( id );
    const category = await Category.findByIdAndUpdate( id, { state:false } )

    res.json({
        msg:`Category ${category.name} was successfuly deleted`
    })
}

module.exports = {
    categoryGetAll,
    categoryGetOne,
    categoryDelete,
    categoryPut,
    categoryPost
}