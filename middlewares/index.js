const validateErrors = require('../middlewares/validate-errors');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validateFileToUpload = require('../middlewares/validate-file');
const validateUserOrder = require('../middlewares/validate-orders');


module.exports = {
    ...validateErrors,
    ...validateJWT,
    ...validateRoles,
    ...validateFileToUpload,
    ...validateUserOrder,
}
