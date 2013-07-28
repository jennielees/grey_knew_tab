/* Setup options */
define(function() {
    $('#opt_boxes').find('input,select').each(function() {
        if('checked' in this && localStorage[this.id] == 'true') {
            this.checked = true;
        } else if(localStorage[this.id] && localStorage[this.id] != 'false') {
            $(this).val(localStorage[this.id]);
        }
    }).on('change', function() {
        if('checked' in this && this.type != 'text') {
            localStorage[this.id] = this.checked ? true : false;
        } else {
            localStorage[this.id] = this.value ? this.value : false;
        }
        setTimeout(function() {
            window.location.reload();
        },1);
    });
    
    $('#options_toggle').on('click', function(e) {
        e.preventDefault();
        $('#options_wrap').fadeIn('fast');
    });
    
    $('#options_wrap').on('click', function(e) {
        if(e.target != this) return;
        $('#options_wrap').fadeOut('fast');
    });
   
    return {
        isChecked: function(setting) {
            return (localStorage['opt_' + setting] && localStorage['opt_' + setting] == 'true');
        }
    }
});