$(document).ready(function(){

    //Method To Get All Employees Data
    getAllEmployees();

    //Method To Open Add Employee Modal
    $("#addEmployee").click(function(){
        $("#myModal").modal();
    });

    //Method To Add New Employee
    $("#addNewEmployee").click(function () {
        // console.log($("#addEmpForm").serialize());
        $.ajax({
            type: "post",
            url: '/createNewEmployee',
            data: $('#addEmpForm').serialize(),
            success: function (response) {
                alertify.success("Success");
                getAllEmployees();
                $('#myModal').modal('hide');
            }
        })
    });
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
        }
    });
}

//Method To Get All Employees Data
function  getAllEmployees() {
    var count = 0;
    $.ajax({
        type: 'get',
        url: '/getEmployees',
        success: function (response) {
            $("#empTableBody").empty();
            for(var emp of response){
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
        }
    });
}


//Method To Delete Employee
function  deleteEmployee(empID) {
    console.log(empID)
    alertify.confirm("Delete Employee", function () {
        $.ajax({
            type: "get",
            url: '/deleteEmployee',
            data: {EmployeeID: empID},
            success: function (response) {
                console.log(response)
                alertify.success("Employee Deleted Successfully");
                getAllEmployees();
            }
        });
    })
}