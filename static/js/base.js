define(['jquery.min', 'underscore'], function() {
    
    /* Setup vars */
    var modules = ['weather', 'gmail', 'facebook', 'dictionary', 'clock', 'news', 'stocks'],
        body = $('body'),
        icons = $('#icons'),
        ticker = $('#ticker');
    
    /* Make sure we aren't caching */
    $.ajaxSetup ({cache: false});
    
    /* Bring in the options and notepad */
    require(['options', 'notepad', 'apps']);
    
    /* Set default button to open the real new tab */
    $('#default').on('click', function() {
        chrome.tabs.update({url: 'chrome-internal://newtab/'});
    });
    
    /* Load and display modules */
    $.each(modules, function(a, b) {
        require([b, 'jquery.tip'], function(module) {
            module && module.title(function(text) {
                var icon = $('<div />').html(module.icon).addClass(module.iconClass || 'awesome').appendTo(icons).hide().slideDown('slow').on('click', function() {
                    module.link && (window.location.href = module.link);
                }).data('title', text).tip();
                
                return $('<li />').html('<div class="text">' + text + '</div>').prepend($('<div />').html(module.icon).addClass(module.iconClass || 'awesome').addClass('modcon')).appendTo(ticker).on('click', function() {
                    module.link && (window.location.href = module.link);
                }).data('icon', icon).hide().slideDown('fast').find('.modcon').addClass('modload').parent();
            });
        });
    });
    
});
