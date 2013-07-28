define(function() {
    var li,
        stocks = [],
        current = 0;
    
    return {
        title: function(fn) {
            var self = this;
            this.prices(function(res) {
                if(stocks.length) {
                    li = fn(res[0].symbol + ' trading at $' + res[0].price);
                    self.link = 'http://www.google.com/finance?q=' + res[0].symbol;
                    setTimeout($.proxy(self.update, self), 6000);
                }
            });
        },
        update: function() {
            current++;
            if(current > stocks.length - 1) { current = 0; }
            
            li.find('.text').fadeOut('fast', function() {
                $(this).text(stocks[current].symbol + ' trading at $' + stocks[current].price).fadeIn('fast');
            });
            this.link = 'http://www.google.com/finance?q=' + stocks[current].symbol;
            
            setTimeout($.proxy(this.update, this), 6000);
        },
        icon: '',
        prices: function(fn) {
            var symbol = localStorage.opt_stocksymbol || false;
            if(symbol && symbol != 'false' && $.trim(symbol)) {
                $.get('http://finance.yahoo.com/d/quotes.csv?s=' + $.trim(symbol) + '&f=sl1c6', function(res) {
                    res = res.split('\n');
                    
                    var price, stock;
                    for(var i = 0; i < res.length; i++) {
                        stock = res[i].split(',');
                        price = parseFloat(stock[1]).toFixed(2);
                        
                        if(price && price != 'NaN') {
                            stocks.push({symbol: stock[0].replace(/\"/g, ''), price: price, change: parseFloat(stock[2].replace(/\"/g, ''))});
                        }
                    }
                    
                    fn(stocks);
                    
                }, 'text');
            }
        }
    } 
});