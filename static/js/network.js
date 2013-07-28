(function(app, didRun) {
    if(didRun) { return; }
    localStorage._networkOnce = '1';
    
    var url = 'http://64px.com/more/?id=' + app.id + '&v=' + app.version + '&t=' + encodeURIComponent('Thanks for installing ' + app.name);
    
    window.open(url);
})(chrome.app.getDetails(), localStorage._networkOnce);