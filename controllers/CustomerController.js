const Customer = require('../models').Customer;

// CREATE
const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, customer;
    let user = req.user;

    let customer_info = req.body;

    [err, customer] = await to(Customer.create(customer_info));
    if(err) return ReE(res, err, 422);

    customer.addUser(user, { through: { status: 'started' }})

    [err, ccustomer] = await to(customer.save());
    if(err) return ReE(res, err, 422);

    let customer_json = customer.toWeb();
    customer_json.users = [{user:user.id}];

    return ReS(res,{customer:customer_json}, 201);
}
module.exports.create = create;

// GET ALL CUSTOMERS THAT BELONG TO USER
const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, customers;

    [err, customers] = await to(user.getCustomers());

    let customers_json =[]
    for( let i in customers){
        let customer = customers[i];
        let users =  await customer.getUsers()
        let customer_info = customer.toWeb();
        let users_info = []
        for (let i in users){
            let user = users[i];
            // let user_info = user.toJSON();
            users_info.push({user:user.id});
        }
        customer_info.users = users_info;
        customers_json.push(customer_info);
    }

    console.log('c t', customers_json);
    return ReS(res, {customers:customers_json});
}
module.exports.getAll = getAll;

// GET
const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let customer = req.customer;

    return ReS(res, {customer:customer.toWeb()});
}
module.exports.get = get;

// UPDATE
const update = async function(req, res){
    let err, customer, data;
    customer = req.customer;
    data = req.body;
    customer.set(data);

    [err, customer] = await to(customer.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {customer:customer.toWeb()});
}
module.exports.update = update;

// DELETE
const remove = async function(req, res){
    let customer, err;
    customer = req.customer;

    [err, customer] = await to(customer.destroy());
    if(err) return ReE(res, 'error occured trying to delete the customer');

    return ReS(res, {message:'Deleted Customer'}, 204);
}
module.exports.Customer = Customer;