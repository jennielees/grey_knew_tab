define(['options', 'moment', 'moment.lang'], function(options) {
    var li;
    
    if(options.isChecked('hideclock')) { return; }
    
    return {
        title: function(fn) {
            if(localStorage.opt_hideclock == 'true') { return; }
            var self = this;
            this.tick(function(time) {
                li = fn(time);
                setInterval(function() {
                    self.tick(function(time) {
                        li.find('.text').html(time);
                    });
                }, 100);
            });
        },
        link: 'http://www.timeanddate.com/worldclock/',
        icon: '',
        tick: function(fn) {
            var date = new Date();
            var hour = (date.getHours() < 10) ? '' + date.getHours() : date.getHours(),
                min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
                sec = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
            
            var ampm = '';
            
            if(localStorage.opt_24 != 'true') {
                ampm = moment().format("A");
                if(parseInt(hour) == 0) {
                    hour = '12';
                } else if(parseInt(hour) > 12) {
                    hour = parseInt(hour) - 12;
                    hour = (hour < 10) ? '0' + hour : hour;
                }
            }
            
            try {
                moment.lang(window.navigator.language.split('-')[0]);
            } catch(e) {
                moment.lang('en');
            }
            var d = moment().format("dddd, MMM Do");
            
            var time = d + ' ' + hour + '<span class="lighter">:</span>' + min + '<span class="lighter">:</span>' + sec + ' ' + ampm;
            fn(time);
            li.data('icon').data('title', time);
        }
    }
});