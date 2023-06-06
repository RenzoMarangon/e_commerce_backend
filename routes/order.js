const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateErrors, userOrder } = require('../middlewares');
const { postOrder } = require('../controllers/order');
const { isUserInDB } = require('../database/db-validators');

const router = Router();

router.post('/:id',[
    validateJWT,
    check('id').isMongoId(),
    check('id').custom( isUserInDB ),
    userOrder,
    validateErrors,
], postOrder);


module.exports = router;