var table = null;

$(document).ready(function () {
    //debugger;
    table = $('#tbEducation').DataTable({
        "processing": true,
        "lengthChange": false,
        "autoWidth": false,
        dom: 'Blfrtip',
        lengthMenu: [[5, 10, 25, 50, -1],
        ['5', '10', '25', '50', 'Show All']],
        dom: 'Bfrtip',
        buttons: [
            'pageLength',
            { extend: 'pdf', text: ' Export to PDF' },
            { extend: 'csv', text: ' Export to CSV' },
            { extend: 'excel', text: ' Export to EXCEL' }
        ],
        "ajax": {
            url: "https://localhost:44345/api/educations",
            type: "GET",
            "datatype": "json",
            "dataSrc": "data",
            //success: function (result) {
            //    console.log(result.data);
            //}
        },
        "columnDefs":
            [{
                "targets": [0, 4],
                "orderable": false
            }],
        "order": ([[0, 'asc']], [[3, 'asc']]),
        "columns": [
            {
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 + "."
                }
            },
            {
                render: function (data, type, row, meta) {
                    if (row.degree == 0) {
                        return "D3"
                    } else if (row.degree == 1) {
                        return "D4"
                    } else if (row.degree == 2) {
                        return "S1"
                    } else if (row.degree == 3) {
                        return "S2"
                    }
                    else {
                        return "S3"
                    }
                }
            },
            { "data": "gpa" },
            { "data": "university.name" },
            {
                "render": function (data, type, row) {
                    return '<button class="btn btn-warning " data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="return GetById(' + row.id + ')"> <i class="fa fa-pen"></i></button >' + '&nbsp;' +
                        '<button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="return Delete(' + row.id + ')"> <i class="fa fa-trash"></i></button >'
                }
            }]
    });
    table.on('order.dt search.dt', function () {
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
});

function ClearScreen() {
    $('#Id').val('');
    $('#Degree').val('');
    $('#GPA').val('');
    $('#universityId').val('');
    $('#Update').hide();
    $('#Save').show();
}

var Universities = []
function LoadUniversity(element) {
    //debugger;
    if (Universities.length == 0) {
        $.ajax({
            type: "Get",
            url: "https://localhost:44345/api/universities",
            success: function (data) {
                //debugger;
                Universities = data.data;
                renderUniversity(element);
            }
        })
    }
    else {
        renderUniversity(element);
    }
}

function renderUniversity(element) {
    //debugger;
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option selected disabled hidden/>').val('').text('Select University').hide());
    $.each(Universities, function (i, val) {
        //$.each(Departments.data, function (i, val) {
        //debugger;
        $ele.append($('<option/>').val(val.id).text(val.name));
    })
}
LoadUniversity($('#universityId'));


function Save() {
    debugger;
    var Education = new Object();
    Education.degree = $('#Degree').val();
    Education.gpa = $('#GPA').val();
    Education.universityId = $('#universityId').val();
    $.ajax({
        type: 'POST',
        url: 'https://localhost:44345/api/educations',
        data: JSON.stringify(Education),
        contentType: "application/json; charset=utf-8",
    }).then((result) => {
        if (result.status == 201 || result.status == 204 || result.status == 200) {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Education Added Successfully'
            });
            table.ajax.reload();
        } else {
            Swal.fire('Error', 'Failed to Input', 'error');
            ClearScreen();
        }
    })
}

function GetById(id) {
    //debugger;
    $.ajax({
        url: "https://localhost:44345/api/educations/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            const obj = result.data;
            $('#Id').val(obj.id);
            $('#Degree').val(obj.degree);
            $('#GPA').val(obj.gpa);
            $('#universityId').val(obj.universityId);
            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Update() {
    debugger;
    var Education = new Object();
    Education.id = $('#Id').val();
    Education.degree = $('#Degree').val();
    Education.gpa = $('#GPA').val();
    Education.universityId = $('#universityId').val();
    $.ajax({
        type: "PUT",
        url: 'https://localhost:44345/api/educations/',
        data: JSON.stringify(Education),
        contentType: "application/json; charset=utf-8",
    }).then((result) => {
        if (result.status == 200) {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Education Updated Successfully'
            });
            table.ajax.reload();
        } else {
            Swal.fire('Error', 'Failed to Update', 'error');
            ClearScreen();
        }
    })
}

function Delete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            //debugger;
            $.ajax({
                url: "https://localhost:44345/api/educations/" + id,
                type: "DELETE",
                dataType: "json",
            }).then((result) => {
                //debugger;
                if (result.status == 200) {
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Delete Successfully'
                    });
                    table.ajax.reload();
                } else {
                    Swal.fire('Error', 'Failed to Delete', 'error');
                    ClearScreen();
                }
            })
        };
    });
}