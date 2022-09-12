var table = null;

$(document).ready(function () {
    //debugger;
    table = $('#tbEducation').DataTable({
        "processing": true,
        "ajax": {
            url: "https://localhost:44345/api/educations",
            type: "GET",
            "datatype": "json",
            "dataSrc": "data",
        },
        "columnDefs":
            [{
                "targets": [0, 4],
                "orderable": false
            }],
        "order": [[0, 'asc']],
        "columns": [
            {
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 + "."
                }
            },
            { "data": "degree" },
            { "data": "gpa" },
            { "data": "university.name" },
            {
                "render": function (data, type, row) {
                    return '<button class="btn btn-warning " data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="return GetById(' + row.id + ')"> Edit</i></button >' + '&nbsp;' +
                        '<button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="return Delete(' + row.id + ')"> Delete</i></button >'
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
    $('#University').val('');
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
    $ele.append($('<option/>').val('0').text('Select University').hide());
    $.each(Universities, function (i, val) {
        //$.each(Departments.data, function (i, val) {
        //debugger;
        $ele.append($('<option/>').val(val.id).text(val.name));
    })
}
LoadUniversity($('#University'));


//function Save() {
//    if ($('#Name').val() == 0) {
//        Swal.fire({
//            position: 'center',
//            type: 'error',
//            title: 'Please Full Fill The University Name',
//            showConfirmButton: false,
//            timer: 1500
//        });
//    } else {
//        var University = new Object();
//        University.Name = $('#Name').val();
//        $.ajax({
//            type: 'POST',
//            url: 'https://localhost:44345/api/universities',
//            data: JSON.stringify(University),
//            contentType: "application/json; charset=utf-8",
//            crossDomain: true,
//            headers: {
//                'Access-Control-Allow-Origin': '*',
//            }
//        }).then((result) => {
//            debugger;
//            if (result.status == 201 || result.status == 204 || result.status == 200) {
//                Swal.fire({
//                    position: 'center',
//                    type: 'success',
//                    title: 'University Added Successfully'
//                });
//                table.ajax.reload();
//            } else {
//                Swal.fire('Error', 'Failed to Input', 'error');
//                ClearScreen();
//            }
//        })
//    }
//}

//function GetById(id) {
//    //debugger;
//    $.ajax({
//        url: "https://localhost:44345/api/universities/" + id,
//        type: "GET",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            const obj = result.data;
//            $('#Id').val(obj.id);
//            $('#Name').val(obj.name);
//            $('#myModal').modal('show');
//            $('#Update').show();
//            $('#Save').hide();
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

//function Update() {
//    debugger;
//    if ($('#Name').val() == 0) {
//        Swal.fire({
//            position: 'center',
//            type: 'error',
//            title: 'Please Full Fill The University Name',
//            showConfirmButton: false,
//            timer: 1500
//        });
//    } else {
//        var University = new Object();
//        University.Id = $('#Id').val();
//        University.Name = $('#Name').val();
//        $.ajax({
//            type: "PUT",
//            url: 'https://localhost:44345/api/universities/',
//            data: JSON.stringify(University)
//        }).then((result) => {
//            debugger;
//            if (result.status == 200) {
//                Swal.fire({
//                    position: 'center',
//                    type: 'success',
//                    title: 'University Updated Successfully'
//                });
//                table.ajax.reload();
//            } else {
//                Swal.fire('Error', 'Failed to Update', 'error');
//                ClearScreen();
//            }
//        })
//    }
//}

//function Delete(Id) {
//    Swal.fire({
//        title: 'Are you sure?',
//        text: "You won't be able to revert this!",
//        showCancelButton: true,
//        confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Yes, delete it!'
//    }).then((result) => {
//        if (result.value) {
//            debugger;
//            $.ajax({
//                url: "https://localhost:44345/api/universities/",
//                data: { Id: Id }
//            }).then((result) => {
//                debugger;
//                if (result.status == 200) {
//                    Swal.fire({
//                        position: 'center',
//                        type: 'success',
//                        title: 'Delete Successfully'
//                    });
//                    table.ajax.reload();
//                } else {
//                    Swal.fire('Error', 'Failed to Delete', 'error');
//                    ClearScreen();
//                }
//            })
//        };
//    });
//}

