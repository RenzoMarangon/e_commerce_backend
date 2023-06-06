const { response } = require('express');
const Order = require('../models/order');

const postOrder = async( req, res = response) =>
{
    const { order } = req.body;

    res.json({msg: order});
}

module.exports = 
{
    postOrder
}