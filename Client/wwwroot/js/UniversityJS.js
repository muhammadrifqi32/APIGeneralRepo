var table = null;

$(document).ready(function () {
    //debugger;
    table = $('#tbUniversity').DataTable({
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
            url: "https://localhost:44345/api/universities",
            type: "GET",
            "datatype": "json",
            "dataSrc": "data",
            //success: function (result) {
            //    console.log(result)
            //}
        },
        "columnDefs":
            [{
                "targets": [0, 2],
                "orderable": false
            }],
        "order": ([[0, 'asc']],[[1, 'asc']]),
        "columns": [
            {
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 + "."
                }
            },
            { "data": "name" },
            {
                "render": function (data, type, row) {
                    return '<button class="btn btn-warning " data-placement="left" data-toggle="tooltip" data-animation="false" title="Edit" onclick="return GetById(' + row.id + ')"><i class="fa fa-pen"></i></button >' + '&nbsp;' +
                        '<button class="btn btn-danger" data-placement="right" data-toggle="tooltip" data-animation="false" title="Delete" onclick="return Delete(' + row.id + ')"><i class="fa fa-trash"></i></button >'
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
    $('#Name').val('');
    $('#Update').hide();
    $('#Save').show();
}

function Save() {
    if ($('#Name').val() == 0) {
        Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Please Full Fill The University Name',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        var University = new Object();
        University.Name = $('#Name').val();
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44345/api/universities',
            data: JSON.stringify(University), //must exist on Insert method
            contentType: "application/json; charset=utf-8", //must exist on Insert method
            //crossDomain: true,
            //headers: {
            //    'Access-Control-Allow-Origin': '*',
            //}
        }).then((result) => {
            debugger;
            if (result.status == 201 || result.status == 204 || result.status == 200) {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'University Added Successfully'
                });
                table.ajax.reload();
            } else {
                Swal.fire('Error', 'Failed to Input', 'error');
                ClearScreen();
            }
        })
    }
}

function GetById(id) {
    //debugger;
    $.ajax({
        url: "https://localhost:44345/api/universities/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //console.log(result);
            var obj = result.data;
            $('#Id').val(obj.id);
            $('#Name').val(obj.name);
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
    if ($('#Name').val() == 0) {
        Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Please Full Fill The University Name',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        var University = new Object();
        University.Id = $('#Id').val();
        University.Name = $('#Name').val();
        $.ajax({
            url: 'https://localhost:44345/api/universities',
            type: 'PUT',
            data: JSON.stringify(University), //must exist on Insert method
            contentType: "application/json; charset=utf-8", //must exist on Insert method
        }).then((result) => {
            debugger;
            if (result.status == 201 || result.status == 204 || result.status == 200) {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'University Updated Successfully'
                });
                table.ajax.reload();
            } else {
                Swal.fire('Error', 'Failed to Input', 'error');
                ClearScreen();
            }
        });
    }
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
                url: "https://localhost:44345/api/universities/" + id,
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

