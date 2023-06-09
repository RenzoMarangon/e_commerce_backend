const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validateErrors } = require('../middlewares/validate-errors');

const router = Router();

router.post('/login',[
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateErrors
], login );

router.post('/google',[
    check('id_token', 'id_token is obligatory').not().isEmpty(),
    validateErrors
], googleSignIn );


module.exports = router;