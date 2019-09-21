var express = require('express');
var router = express.Router();

var employeeSchema = require('../Schema/employeeSchema');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {error: false, message: "Log In Here", Data: {}});
});

//Method To Log In User
router.post('/login', function (req, res) {
    employeeSchema.findOne({EmailID: req.body.EmailID}, function (err, employee) {
        if (err)
            throw err;
        else if (employee) {
            if (employee.Password === req.body.Password) {
                req.session.UserName = `${employee.FirstName}  ${employee.LastName}`;
                req.session.EmailID = employee.EmailID;
                res.redirect('/manageEmployees');
            } else {
                res.render('index', {error: true, message: "Please Enter Correct Password", Data: req.body});
            }
        } else if (!employee) {
            res.render('index', {error: true, message: "Employee Does Not Exist", Data: req.body});
        }
    });
});


//Method To Log Out User
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;
