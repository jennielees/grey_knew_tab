define(['options'], function(options) {
   
   if(options.isChecked('hidefacebook')) { return; }
   
    return {
        title: function(fn) {
            var self = this;
            this.unread(function(res) {
                var s = (res.notifications.num_unread != '1') ? 's' : '',
                    ms = (res.inbox.unseen != '1') ? 's' : '';
                fn(res.notifications.num_unread  + ' notification' + s + ' and ' + res.inbox.unseen + '  message' + ms);
                self.link = 'http://facebook.com';
            });
        },
        icon: '',
        unread: function(fn) {
            var cb = function(res) {
                fn(res);
            }
            $.get('https://www.facebook.com/desktop_notifications/counts.php', cb, 'json').error(cb);
        }
    } 
});