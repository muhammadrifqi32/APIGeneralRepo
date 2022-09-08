var table = null;

$(document).ready(function () {
    //debugger;
    table = $('#tbDepartment').DataTable({
        "processing": true,
        "ajax": {
            url: "https://localhost:44345/api/universities",
            type: "GET",
            "datatype": "json",
            "dataSrc": "results",
            success: function (result) {
                console.log(result.data);
            }
        },
        "columnDefs":
            [{
                "targets": [0, 2],
                "orderable": false
            }],
        "order": [[0, 'asc']],
        "columns": [
            {
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 + "."
                }
            },
            { "data": "name" },
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
        var Department = new Object();
        Department.Name = $('#Name').val();
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44345/api/universities',
            data: JSON.stringify(Department),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
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