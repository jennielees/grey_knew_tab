$('#notepad textarea').val(localStorage.notepad || '').on('keyup change blur', function() {
        localStorage.notepad = $(this).val();
    }).on('focus', function() {
        this.setSelectionRange(this.value.length, this.value.length);
    });
    if(localStorage.notepad && $.trim(localStorage.notepad).length) {
        $('#notepad').show();
    }
    $('#notepad_toggle').on('click', function(e) {
        e.preventDefault();
        var text = $('#notepad').slideToggle('fast').find('textarea').focus();
        
    });