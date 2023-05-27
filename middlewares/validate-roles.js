const { response } = require("express");


const isAdminRole = (req, res = response, next ) => 
{
    if( !req.authUser )
    {   //Validar que esta llegando el token
        return res.status(500).json({
            msg:"Can't validate role before validate token"
        })
    }

    const { role, name } = req.authUser;

    if( role !== 'ADMIN_ROLE')
    {
        return res.status(401).json({
            msg:"User is doesn't admin"
        })
    }

    next();
}


const isRole = (...roles) => {
    return ( req, res = response, next ) =>{
        
        if( !req.authUser )
        {   //Validar que esta llegando el token
            return res.status(500).json({
                msg:"Can't validate role before validate token"
            })
        }

        if( !roles.includes( req.authUser.role ) )
        {
            return res.status(401).json({
                msg:`${ req.authUser.role } is an invalid role, valid roles: ${ roles }`
            })
        }

        next();
    }
}

module.exports = { isAdminRole,isRole };