define(function() {
    var li;
    
    return {
        title: function(fn) {
            this.get(fn);
        },
        link: 'http://bit.ly',
        icon: '',
        get: function(fn) {
            var that = this;
            $.get('https://api-ssl.bitly.com/v3/realtime/hot_phrases?access_token=2fa8dcc37575d96446847d1584c39087355dc052&limit=5', function(res) {
                $.get('https://api-ssl.bitly.com/v3/link/info?access_token=2fa8dcc37575d96446847d1584c39087355dc052&link=http://bit.ly/' + res.data.phrases[0].ghashes[0].ghash, function(link) {
                    fn('Trending Link<br /><span class="smaller lighter">' + (link.data.html_title || link.data.domain) + '</span>');
                });
                that.link = 'http://bit.ly/' + res.data.phrases[0].ghashes[0].ghash;
            });
        }
    }
});