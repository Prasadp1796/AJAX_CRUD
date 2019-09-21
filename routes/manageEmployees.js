var router = require('express').Router();

const {check, validationResult} = require('express-validator');

var isLoggedIn = require('../lib/isLoggedIn');

let transporter = require('../lib/mailer');

//Employee Schema Imported Here
var employeeSchema = require('../Schema/employeeSchema');

//Method To Render Manage Employees Page
router.get('/manageEmployees', isLoggedIn, function (req, res) {
    console.log("rendering Page...");
    employeeSchema.find(function (err, employees) {
        if (err)
            throw err;
        else {
            console.log(employees)
            res.render('ManageEmployees/index', {Employees: employees});
        }

    })
});

//Method To Create New Employee
router.route('/createEmployee').get(isLoggedIn, function (req, res) {
    res.render('ManageEmployees/addEmployee', {Messages: [], Data: {}});
}).post(isLoggedIn, [
    check('FirstName').isLength({min: 2}).withMessage('First Name must be at least 2 chars long'),
    check('LastName').isLength({min: 1}),
    check('EmailID').isEmail().withMessage("Invalid Email Address"),
    check('Contact').isLength({min: 10}).withMessage("Invalid Contact Number"),
    check('Password').isLength({min: 5}).withMessage("Password Must Be At-least 5 Characters Long")
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var errorMsgs = errors.array();
        var messages = [];
        for (var i of errorMsgs) {
            messages.push(i.msg);
        }
        return res.render('ManageEmployees/addEmployee', {Messages: messages, Data: req.body});
    } else {
        let newEmployee = new employeeSchema(req.body);
        newEmployee.save(function (err) {
            if (err)
                throw err;
            else {
                const mailOptions = {
                    from: "System Admin Mail", // sender address
                    to: req.body.EmailID, // list of receivers,
                    // cc: "", //cc address
                    subject: "", // Subject line
                    html: ""

                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    else {
                        res.redirect('/manageEmployees')

                    }
                });
            }

        });
    }
});

//Method To Update Employee Details
module.exports = router;