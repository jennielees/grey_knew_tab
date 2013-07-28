define(function() {

    chrome.management.getAll(function(res) {
        var apps = [];
        $.each(res, function() {
            if(this.isApp) { apps.push(this); }
        });
        
        if(!apps.length) {
            return;
        }
        
        $.each(apps, function() {
            $('#apps').append('<a href="' + this.appLaunchUrl + '" data-name="' + this.name + '"><img src="' +  this.icons[this.icons.length - 1].url + '" width="32" height="32" /></a>').delay(100).slideDown('fast');
        });
        
        
        $('#apps a').hover(function() {
            $('<div />').addClass('app_tip').text($(this).data('name')).appendTo('body').css({left: $(this).offset().left });
        }, function() {
            $('.app_tip').remove();    
        });
    });
});