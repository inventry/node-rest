const express 		= require('express');
const router 			= express.Router();

const UserController 	= require('./../controllers/UserController');
const HomeController 	= require('./../controllers/HomeController');
const passport      	= require('passport');
const path            = require('path');

// Setup passport middleware
require('./../middleware/passport')(passport)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

// User Routes
router.post(    '/users',           UserController.create);                                                    // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)

// Customer Routes
// router.post(    '/customers',       CustomerController.create);     // C
// router.get(     '/customers',       CustomerController.get);        // R
// router.put(     '/customers',       CustomerController.update);     // U
// router.delete(  '/customers',       Customerontroller.remove);      // D


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));

module.exports = router;