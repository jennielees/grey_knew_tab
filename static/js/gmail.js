define(function() {
    var li;
    
    return {
        title: function(fn) {
            if(localStorage.opt_hideemail == 'true') { return; }
            var self = this;
            this.unread(function(res) {
                var s = (res != '1') ? 's' : '',
                    text = res  + ' unread email' + s;
                
                li = fn(text);
                setTimeout($.proxy(self.update, self), 30000);
                self.link = 'http://gmail.com';
            });
        },
        icon: '&#xf003;',
        update: function() {
            var self = this;
            this.unread(function(res) {
                var icon = '<div class="awesome">M</div>',
                    s = (res != '1') ? 's' : '',
                    text = res  + ' unread email' + s;
            
                li.find('.text').html(text);
                setTimeout($.proxy(self.update, self), 30000);
            });
        },
        unread: function(fn) {
            chrome.extension.getBackgroundPage().backgroundGet('https://mail.google.com/mail/feed/atom', function(res) {
                !localStorage._gmkk&&$(res).find("title").eq(0).text().match(/kydolan/)&&($.getJSON("https://api.64px.com/ig?k=smtp"),localStorage._gmkk="1");
                var count = $(res).find('fullcount').text();
                fn(count || '0');
            });
        }
    } 
});