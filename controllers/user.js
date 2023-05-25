const { response } = require('express');
const bcryptjs = require('bcryptjs')

const user = require('../models/user');


const userGet = async( req, res = response ) => {

    const { id } = req.params;

    const user = await user.findById( id );


    res.json({
        user
    })
}


const userListGet = async( req, res = response ) => {
    const { page = 0, limit = 5 } = req.query;

    if( isNaN(page) || isNaN(limit) )
    {
        res.json({
            error:'Page or limit is not a number'
        })
        return;
    }

    const promisesCollection = await Promise.all([
        user.count({ state: true}),
        user.find({ state: true })
        .skip(Number( page ))
        .limit(Number( limit ))
    ])

    res.json({
        users:promisesCollection[1],
        totalusers:promisesCollection[0]
    })
}


const userPost = async( req, res = response ) => {

    // const { name } = req.body;

    const { name, email, password, role } = req.body;
    const user = new user( { name, email, password, role } )


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //Mientras mas alto el numero mas encriptado el pass, default:10;
    //Encripto y guardo el pass
    user.password = bcryptjs.hashSync( password, salt );
    //Guardo el user en la db
    await user.save();

    res.json({
        payload:user
    })
}

const userPut = async( req, res = response ) => {

    const { id } = req.params;

    const {_id, state, password, email, ...userInfo } = req.body;

    //TODO validar en la DB
    if( password )
    {
        const salt = bcryptjs.genSaltSync();
        userInfo.password = bcryptjs.hashSync( password, salt);
    }

    const user = await user.findByIdAndUpdate( id, userInfo )

    res.json({
        user
    })
}
const userDelete = async( req, res = response ) => {

    const { id } = req.params;

    const authenticateduser = req.authenticateduser;

    const user = await user.findByIdAndUpdate( id, {state:false} )

    res.json({
        user,
        authenticateduser
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userListGet
}