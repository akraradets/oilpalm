$(document).ready(function () {
    // show/hide buffer distance inputs based on selected buffer type
    $('#buffer-type').on('change', function () {
        if ($(this).val() == 'manual') {
            $('#manual-buffer').show();
            $('#file-buffer').hide();
        } else {
            $('#manual-buffer').hide();
            $('#file-buffer').show();
        }
    });

    // show manual buffer distance input by default
    $('#manual-buffer').show();
    $('#file-buffer').hide();

    // populate tree ID and buffer columns based on uploaded file headers
    $('#file-upload').on('change', function () {
        var file = $(this)[0].files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            var csv = reader.result;
            var rows = csv.split('\n');
            var headerRow = rows[0].split(',');
            $('#tree-id-column').empty();
            $('#buffer-column').empty();
            for (var i = 0; i < headerRow.length; i++) {
                $('#tree-id-column').append($('<option>').text(headerRow[i]).attr('value', i));
                $('#buffer-column').append($('<option>').text(headerRow[i]).attr('value', i));
            }
        };
    });

    // submit form data to server
    $('#buffer-form').on('submit', function (event) {
        event.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: 'process.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert('Buffer distance submitted successfully!');
                // clear form inputs
                $('#buffer-form')[0].reset();
                $('#manual-buffer').show();
                $('#file-buffer').hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error submitting buffer distance: ' + errorThrown);
            }
        });
    });


    $('#test-api').on('click', testAPI);
    function testAPI(event){

         $.ajax({
            url: 'http://localhost:8000/post_ex',
            type: 'POST',
            data: JSON.stringify({
                id: 1,
                name: "Jo",
                number: 12.2323,
                somelist: [1,2,2,4,5]
            }),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                console.log(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error submitting buffer distance: ' + errorThrown);
            }
        });
    }


});