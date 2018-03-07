const express 		= require('express');
const router 			= express.Router();

const UserController 	    = require('./../controllers/UserController');
const CompanyController 	= require('./../controllers/CompanyController');
// const CustomerController 	= require('./../controllers/CustomerController');
const HomeController 	    = require('./../controllers/HomeController');
const passport      	    = require('passport');
const path                = require('path');

const custom 	            = require('./../middleware/custom');

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

// Company Routes
router.post(    '/companies',               passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
router.get(     '/companies',               passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

router.get(     '/companies/:company_id',   passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
router.put(     '/companies/:company_id',   passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
router.delete(  '/companies/:company_id',   passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D

// Customer Routes
// router.post(    '/customers',               passport.authenticate('jwt', {session:false}), CustomerController.create);                    // C
// router.get(     '/customers',               passport.authenticate('jwt', {session:false}), CustomerController.getAll);                       // R

// router.get(     '/companies/:customer_id',  passport.authenticate('jwt', {session:false}), custom.customer, CustomerController.get);      // R
// router.put(     '/customers/:customer_id',  passport.authenticate('jwt', {session:false}), custom.customer, CustomerController.update);  // U
// router.delete(  '/customers/:customer_id',  passport.authenticate('jwt', {session:false}), custom.customer, CustomerController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.raml',            express.static(path.join(__dirname, '/../public/v1/documentation/api.raml')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));

module.exports = router;