const url = "http://localhost/company/server/company_employee/sf/public/index.php/employee";

const getEmployees = () => {
    $.ajax({
        method: "GET",
        url: url
    }).done(function (res) {
        content = "";
        res = res.listEmployees
        for (let i = 0; i < res.length; i++) {
            content += `
                        <tr>
                            <td>${res[i].id}</td>
                            <td>${res[i].name}</td>
                            <td>${res[i].address}</td>
                            <td>${res[i].salary}</td>
                            <td>${res[i].idOffice}</td>
                            <td>${res[i].registered.date}</td>
                            <td>${res[i].updated.date}</td>
                            <td>${res[i].status ==1?"Activo":"Inactivo"} </td>
                            <td>
                                <button type="button" onclick="getEmployeeById(${res[i].id})" data-bs-toggle="modal" data-bs-target="#modalModify" class="btn btn-outline-primary"><i class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button onclick="deleteEmployee(${res[i].id})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;
        }
        $("#table > tbody").html(content);

    });
};

const getEmployeeById = async (id) => {
    await $.ajax({
        method: "GET",
        url: url + '/' + id
    }).done(res =>{
        console.log(res.employee);
        document.getElementById("salary1").value = res.employee[0].salary;
        document.getElementById("status1").value = res.employee[0].status;
        document.getElementById("name1").value = res.employee[0].name;
        document.getElementById("idOfficeFk1").value = res.employee[0].idOffice;
        document.getElementById("address1").value = res.employee[0].address;
        document.getElementById("id1").value =res.employee[0].id;
    });
};

const createEmployee = async() => {
    let employee = new Object();
    employee.name = document.getElementById("name").value;
    employee.address = document.getElementById("address").value;
    employee.salary = document.getElementById("salary").value;
    employee.idOffice = document.getElementById("idOfficeFk").value;
    
    await $.ajax({
        method: "POST",
        url: url + '/create',
        data: employee
    }).done(res => {
        Swal.fire({
            title: 'The employee has been registered',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("closeEmp").click();
                getOffices();
                getEmployees();
            }
        })
    });
};

const updateEmployee = async() =>{
    let employee = new Object();
    employee.id = document.getElementById("id1").value;
    employee.name = document.getElementById("name1").value;
    employee.salary = document.getElementById("salary1").value;
    employee.address = document.getElementById("address1").value;
    employee.id_office = document.getElementById("idOfficeFk1").value;
    
    await $.ajax({
        method: "POST",
        url: url + '/update',
        data: employee
    }).done(res =>{
        Swal.fire({
            title: 'The employee has been modified',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getOffices();
                getEmployees();
                document.getElementById("close").click();
            }
        })
    });
};

const deleteEmployee= async(id)=>{
    await $.ajax({
        method: "POST",
        url: url + '/delete/'+id
    }).done(res =>{
        Swal.fire({
            title: 'The employee has been desactivated',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getOffices();
                getEmployees();
            }
        })
    });
};

const url2 = "http://localhost:4000/offices";

const getOffices = () => {
    $.ajax({
        method: "GET",
        url: url2
    }).done(function (res) {
        content = "";
        res = res.listOffices
        for (let i = 0; i < res.length; i++) {
            content += `
                        <tr>
                            <td>${res[i].id}</td>
                            <td>${res[i].address}</td>
                            <td>${res[i].office_code}</td>
                            <td>
                                <button type="button" onclick="getOfficeById(${res[i].id})" data-bs-toggle="modal" data-bs-target="#modalModifyOf" class="btn btn-outline-primary"><i class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button onclick="deleteOffice(${res[i].id})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;
        }
        $("#table2 > tbody").html(content);

    });
};

const getOfficeById = async (id) => {
    await $.ajax({
        method: "GET",
        url: url2 + '/' + id
    }).done(res =>{
        console.log(res.office);
        document.getElementById("idOffice1").value = res.office[0].id;
        document.getElementById("officeCode1").value = res.office[0].office_code;
        document.getElementById("addressOf1").value = res.office[0].address;
    });
};

const createOffice = async() => {
    let office = new Object();
    office.address = document.getElementById("addressOf").value;
    office.office_code = document.getElementById("officeCode").value;
    
    await $.ajax({
        method: "POST",
        url: url2 + '/create',
        data: office
    }).done(res => {
        Swal.fire({
            title: 'The office has been registered',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("addressOf").value= "";
                document.getElementById("officeCode").value = "";
                getOffices();
                getEmployees();
                document.getElementById("closeCreate").click();
            }
        })
    });
};

const updateOffice= async()=>{
    let office = new Object();
    office.office_code = document.getElementById("officeCode1").value;
    office.address = document.getElementById("addressOf1").value;
    office.id = document.getElementById("idOffice1").value;
    await $.ajax({
        method: "POST",
        url: url2 + '/update/'+ office.id,
        data: office
    }).done(res =>{
        Swal.fire({
            title: 'The office has been modify',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getOffices();
                getEmployees();
                document.getElementById("closeUpdate").click();
            }
        })
    });
}

const deleteOffice = async(id)=>{
    await $.ajax({
        method: "POST",
        url: url2 + '/delete/'+id
    }).done(res =>{
        Swal.fire({
            title: 'The office has been delete',
            confirmButtonText: 'Ok',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                getOffices();
                getEmployees();
            }
        })
    }).fail(res =>{
        console.log("Fail");
        Swal.fire({
            title: 'The office has not been delete',
            confirmButtonText: 'Ok',
            icon: 'error',
        }).then((result) => {
            if (result.isConfirmed) {
                getOffices();
                getEmployees();
            }
        })
    });
};