(function($) {
    var interval;
    
    $.fn.tip = function() {
        return $(this).on('mouseenter', function() {
            var self = $(this);
            $('.tip').remove();
            clearInterval(interval);
            
            var tip = $('<div />').addClass('tip')
                        .html($(this).data('title'))
                        .appendTo('body')
                        .css({top: self.offset().top + self.outerHeight() + 5});
                        
            tip.css({left: self.offset().left - Math.round(tip.outerWidth() / 2) + Math.round(self.outerWidth() / 2)});
            
            interval = setInterval(function() {
               tip.html(self.data('title'));
               tip.css({left: self.offset().left - Math.round(tip.outerWidth() / 2) + Math.round(self.outerWidth() / 2)});
            }, 100);
            
        }).on('mouseleave', function() {
            $('.tip').remove();
            clearInterval(interval);
        });
    };
    
})(jQuery);