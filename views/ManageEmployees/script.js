$(document).ready(function () {

    //Method To Get All Employees Data
    getAllEmployees();

    //Method To Open Add Employee Modal
    $("#addEmployee").click(function () {
        $("#myModal").modal();
    });

    //Method To Add New Employee
    $("#addNewEmployee").click(function () {
        $("#addEmpForm").validate({
            rules: {
                FirstName: {
                    required: true,
                    minlength: 4
                },
                LastName: {
                    required: true,
                    minlength: 4
                },
                EmailID: {
                    required: true,
                    email: true
                },
                Contact: {
                    required: true
                },
                Password: {
                    required: true,
                    minlength: 5
                },
                ConfirmPassword: {
                    equalTo: "#Password"
                }
            },
            messages: {
                FirstName: {
                    required: "Please Provide Employee First Name",
                    minlength: "First Name Must Be At least Five Characters Long"
                },
                LastName: {
                    required: "Please Provide Employee Last Name",
                    minlength: "Last Name Must Be At least Five Characters Long"
                },
                EmailID: {
                    required: "Please Provide Email ID",
                    email: "Please Enter Valid Email ID"
                },
                Contact: {
                    required: "Please Enter Valid Contact Number"
                },
                Password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                ConfirmPassword: {
                    equalTo: "Please Enter Same Password Again"
                }
            },
            submitHandler: function (form) {
                $.ajax({
                    type: "post",
                    url: '/createNewEmployee',
                    data: $('#addEmpForm').serialize(),
                    success: function (response) {
                        alertify.success("Success");
                        getAllEmployees();
                        $('#myModal').modal('hide');
                    },
                    error: function (response) {
                        alertify.error("Something Went Wrong While Updating Employee Details");
                        $("#myModal").modal('hide');
                    }
                })
            }
        });
    });

    //Method To Edit Employee Details
    $("#editEmployee").click(function () {

        $("#editEmpForm").validate({
            rules: {
                FirstName: {
                    required: true,
                    minlength: 4
                },
                LastName: {
                    required: true,
                    minlength: 4
                },
                EmailID: {
                    required: true,
                    email: true
                },
                Contact: {
                    required: true
                },
                Password: {
                    required: true,
                    minlength: 5
                },
                ConfirmPassword: {
                    equalTo: "#EditPassword"
                }
            },
            messages: {
                FirstName: {
                    required: "Please Provide Employee First Name",
                    minlength: "First Name Must Be At least Five Characters Long"
                },
                LastName: {
                    required: "Please Provide Employee Last Name",
                    minlength: "Last Name Must Be At least Five Characters Long"
                },
                EmailID: {
                    required: "Please Provide Email ID",
                    email: "Please Enter Valid Email ID"
                },
                Contact: {
                    required: "Please Enter Valid Contact Number"
                },
                Password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                ConfirmPassword: {
                    equalTo: "Please Enter Same Password Again"
                }
            },
            submitHandler: function (form) {
                $.ajax({
                    type: "post",
                    url: '/editEmployee',
                    data: $('#editEmpForm').serialize(),
                    success: function (response) {
                        alertify.success("Success");
                        getAllEmployees();
                        $('#editModal').modal('hide');
                    },
                    error: function (response) {
                        alertify.error("Something Went Wrong While Updating Employee Details");
                        $("#editModal").modal('hide');
                    }
                })
            }
        });

    })
});

//Method To Edit Employee
function editEmployee(empID) {
    $.ajax({
        type: 'get',
        url: '/getEmployeeInfo',
        data: {EmployeeID: empID},
        success: function (response) {
            $("#editModal").modal();
            $("#_id").val(response._id);
            $("#EditFirstName").val(response.FirstName);
            $("#EditLastName").val(response.LastName);
            $("#EditEmailID").val(response.EmailID);
            $("#EditContact").val(response.Contact);
            $("#EditPassword").val(response.Password);
        },
        error: function (response) {
            alertify.error("Something Went Wrong While Getting Employee Details");
            $("#editModal").modal('hide');
        }
    });
}

//Method To Get All Employees Data
function getAllEmployees() {
    var count = 0;
    $.ajax({
        type: 'get',
        url: '/getEmployees',
        success: function (response) {
            $("#empTableBody").empty();
            for (var emp of response) {
                $("#empTableBody").append(`<tr>
                    <td>${++count}</td>
                    <td>${emp.FirstName}</td>
                    <td>${emp.LastName}</td>
                    <td>${emp.EmailID}</td>
                    <td>${emp.Contact}</td>
                    <td>${emp.Password}</td>
                    <td>
                        <button class="btn btn-warning btn-sm text-white" onclick="editEmployee('${emp._id}')"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${emp._id}')"><i class="fa fa-trash"></i> </button>
                    </td>
                </tr>`)
            }
        },
        error: function (response) {
            alertify.error("Something Went Wrong While Updating Employees List");
        }
    });
}


//Method To Delete Employee
function deleteEmployee(empID) {
    console.log(empID)
    alertify.confirm("Delete Employee", function () {
        $.ajax({
            type: "get",
            url: '/deleteEmployee',
            data: {EmployeeID: empID},
            success: function (response) {
                // console.log(response)
                alertify.success("Employee Deleted Successfully");
                getAllEmployees();
            },
            error: function (response) {
                alertify.error("Something Went Wrong While Deleting Employee Details");
                $("#editModal").modal('hide');
            }
        });
    })
}