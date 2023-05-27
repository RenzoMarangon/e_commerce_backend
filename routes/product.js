const Router = require('express');
const { check } = require('express-validator');
const { 
    productGetAll,
    productGetOne,
    productDelete,
    productPut,
    productPost
    } = require('../controllers/product');

const { validateErrors, validateJWT, isAdminRole } = require('../middlewares');
const { productExist, isProductInDb } = require('../database/db-validators');


const router = Router();

router.get('/', productGetAll);

router.get('/:id', productGetOne);

router.post('/',[
    validateJWT,
    isAdminRole,
    check('name','Product is required').not().isEmpty(),
    check('name').custom( productExist ),
    validateErrors
], productPost);

router.put('/:id',[
    validateJWT,
    isAdminRole,
    check('id').isMongoId(),
    check('id').custom( isProductInDb ),
    validateErrors,
],productPut)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id').isMongoId(),
    check('id').custom( isProductInDb ),
    validateErrors,
],productDelete)


module.exports = router