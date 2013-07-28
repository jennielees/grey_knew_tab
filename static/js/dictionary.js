define(function() {
    
    return {
        title: function(fn) {
            if(localStorage.opt_hideword == 'true') { return; }
            var self = this;
            this.word(function(word) {
                fn(word);
                self.link = 'http://dictionary.reference.com/wordoftheday/';
            });
        },
        icon: '',
        word: function(fn) {
            $.get('http://dictionary.reference.com/wordoftheday/wotd.rss', function(res) {
                fn($(res).find('item description').text().split(':').join('<span class="lighter"> -') + '</span>');
            });
        }    
    };
});