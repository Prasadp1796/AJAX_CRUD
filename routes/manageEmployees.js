var router = require('express').Router();

const {check, validationResult} = require('express-validator');

var isLoggedIn = require('../lib/isLoggedIn');

let transporter = require('../lib/mailer');

//Employee Schema Imported Here
var employeeSchema = require('../Schema/employeeSchema');

//Method To Render Manage Employees Page
router.get('/manageEmployees', isLoggedIn, function (req, res) {
    res.render('ManageEmployees/index');
});

//Method To Get Employees Data
router.get('/getEmployees', function (req, res) {
    employeeSchema.find(function (err, employees) {
        if (err)
            res.sendStatus(500);
        else
            res.send(employees);
    })
});

//Method To Get Employee Details By _id
router.get('/getEmployeeInfo', function (req, res) {
    employeeSchema.findOne({_id: req.query.EmployeeID}, function (err, employee) {
        if (err)
            res.sendStatus(500);
        else
            res.send(employee);
    });
});

//Method To Delete Employee
router.get('/deleteEmployee', function (req, res) {
    employeeSchema.findOneAndRemove({_id: req.query.EmployeeID}, function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(200);
    })
});


//Method To Create New Employee
router.post('/createNewEmployee', isLoggedIn, function (req, res) {
    var newEmployee = new employeeSchema(req.body);
    newEmployee.save(function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(201);
    });
});

//MEthod To Update Employee Details 
router.post('/editEmployee', isLoggedIn, function (req, res) {
    employeeSchema.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, function (err) {
        if(err){
            res.sendStatus(500);
        }

        else
            res.sendStatus(201);
    })
});


//Method To Update Employee Details
module.exports = router;