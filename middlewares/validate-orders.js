const { response } = require("express");
const User = require('../models/user')

const userOrder = async( req, res = response, next ) => {

    const { id } = req.params;

    const orderUser = await User.findById( id );

    const user = req.authUser;


    if(orderUser && user.email !== orderUser.email)
    {
        return res.status(400).json({msg:'Invalid access'})
    }

    next();
}

module.exports = {
    userOrder
}