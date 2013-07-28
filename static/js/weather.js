define(['options'], function(options) {
    var API = 'http://api.wunderground.com/api/a71f2e6769460c47/';
    
    if(options.isChecked('hideweather')) { return; }
    
    return {
        title: function(fn) {
            if(localStorage.opt_hideweather == 'true') { return; }
            var self = this;
            this.conditions(function(res) {
                if(res && !('error' in res.response)) {
                    self.icon = self.getIcon(res.current_observation.icon);
                    self.link = res.current_observation.forecast_url + '?apiref=40c64ece8843c98f';
                    
                    var temp = (localStorage.opt_celcius == 'true') ? res.current_observation.temp_c : res.current_observation.temp_f;
                    var text = (temp + '').split('.')[0] + '&deg; and ' + res.current_observation.weather.toLowerCase() + ' in ' + res.current_observation.display_location.full;
    
                    fn(text);
                }
            });
        },
        icon: '',
        iconClass: 'weather',
        conditions: function(fn) {
            var that = this,
                zip = localStorage.opt_weatherzip;
            
            if(zip && zip != '' && zip != 'false') {
                return that.api('conditions/q/' + zip, fn);
            }
            
            window.navigator.geolocation.getCurrentPosition(function(pos) {
                that.api('geolookup/conditions/q/' + pos.coords.latitude + ',' + pos.coords.longitude, fn);
            });
        },
        api: function(path, fn) {
            $.get(API + path + '.json', fn);
        },
        getIcon: function(icon) {
            switch(icon) {
                case 'flurries':
                case 'chanceflurries':
                case 'chancesnow':
                case 'snow':
                    return 'W'
                break;
                case 'chancerain':
                case 'rain':
                case 'chancesleet':
                    return 'R';
                break;
                case 'chanceclear':
                case 'mostlycloudy':
                case 'mostlysunny':
                case 'partlycloudy':
                case 'partlysunny':
                    if((new Date()).getHours() > 6 && (new Date()).getHours() < 21) {
                        return 'H';
                    } else {
                        return 'I';
                    }
                break;
                case 'sleet':
                    return 'X';
                break;
                
                case 'chancetstorms':
                case 'tstorms':
                    return '0';
                break;
                case 'fog':
                case 'hazy':
                    return 'L';
                break;
                case 'cloudy':
                    return 'Y';
                break;
                case 'sunny':
                case 'clear':
                    if((new Date()).getHours() > 6 && (new Date()).getHours() < 21) {
                        return 'B';
                    } else {
                        return '2';
                    }
                break;
                default:
                    return 'A';
                break;
            }
        }
    };
});