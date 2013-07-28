define(function() {
    var li;
    
    return {
        title: function(fn) {
            if(!localStorage.opt_showphoto || localStorage.opt_showphoto == 'false') { return; }
            var self = this;
            this.photo(function(res) {
                res, $(res).find('item').first().children().each(function() {
                    if(this.tagName == 'media:content') {
                        fn('<img src="' + $(this).attr('url') + '" />');
                        self.link = 'http://photography.nationalgeographic.com/photography/photo-of-the-day/';
                    }
                });
            });
        },
        icon: '',
        photo: function(fn) {
            $.get('http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/', fn);
        }
    } 
});