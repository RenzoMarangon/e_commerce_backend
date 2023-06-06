const Router = require('express');
const { check } = require('express-validator');
const { 
    categoryGetAll,
    categoryGetOne,
    categoryDelete,
    categoryPut,
    categoryPost
    } = require('../controllers/category');
const { validateErrors, validateJWT, isAdminRole } = require('../middlewares');
const { isCategoryInDb, categoryExist } = require('../database/db-validators');


const router = Router();

router.get('/', categoryGetAll);

router.get('/:id', categoryGetOne);

router.post('/',[
    validateJWT,
    isAdminRole,
    check('name','Category is required').not().isEmpty(),
    check('name').custom( categoryExist ),
    validateErrors,
], categoryPost);

router.put('/:id',[
    validateJWT,
    isAdminRole,
    check('id').isMongoId(),
    validateErrors,
],categoryPut)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id').isMongoId(),
    check('name').custom( isCategoryInDb ),
    validateErrors,
],categoryDelete)


module.exports = router