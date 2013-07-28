define(function() {
    var feed, current = 0, li, timeout;
    
    return {
        title: function(fn) {
            if(localStorage.opt_hidenews == 'true') { return; }
            var self = this;
            this.rss(function(res) {
                feed = res;
                var item = $(res).find('item').eq(0);
                li = fn(item.find('title').text().split(' -')[0]);
                
                li.hover(function() {
                    clearTimeout(timeout);
                }, function() {
                    timeout = setTimeout($.proxy(self.next, self), 6000);
                });
                
                self.link = item.find('link').text();
                if($(res).find('item').length > 1) {
                    timeout = setTimeout($.proxy(self.next, self), 6000);
                }
            });
        },
        next: function() {
            if(current > 5) {
                current = -1;
            }
            var item = $(feed).find('item').eq(++current);
            li.find('.text').fadeOut('fast', function() {
                 $(this).text(item.find('title').text().split(' -')[0]).fadeIn('fast');
            });
            this.link = item.find('link').text();
            timeout = setTimeout($.proxy(this.next, this), 6000);
        },
        icon: '',
        rss: function(fn) {

            //var url = 'http://news.google.com/news?ned=us&topic=h&output=rss';
            var url = 'https://news.ycombinator.com/rss';
            switch(localStorage.opt_newsrss) {
                case 'bbc_top':
                    url = 'http://feeds.bbci.co.uk/news/rss.xml';
                break;
                case 'bbc_world':
                    url = 'http://feeds.bbci.co.uk/news/world/rss.xml';
                break;
                case 'cnn_europe':
                    url = 'http://rss.cnn.com/rss/edition_europe.rss';
                break;
                case 'us':
                    url = 'http://news.google.com/news?ned=us&topic=n&output=rss';
                break;
                case 'science':
                    url = 'http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=snc&output=rss';
                break;
                case 'technology':
                    url = 'http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=tc&output=rss';
                break;
                case 'business':
                    url = 'http://news.google.com/news?ned=us&topic=b&output=rss';
                break;
                case 'health':
                    url = 'http://news.google.com/news?ned=us&topic=m&output=rss';
                break;
                case 'sports':
                    url = 'http://news.google.com/news?ned=us&topic=s&output=rss';
                break;
                case 'entertainment':
                    url = 'http://news.google.com/news?ned=us&topic=e&output=rss';
                break;
                case 'hacker':
                    url = 'https://news.ycombinator.com/rss';
                break;
            }
            $.get(url, fn);
        }
    } 
});
