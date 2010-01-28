// Assorted jQuery feature enhancements.
// Ralph Holzmann. MIT License.

(function($){

    /***
     * next() accepts numerical argument
     * next().next().next() === next(3)
     * next() and next(<string selector>) still in tact
    */
    var _next = $.fn.next;

    $.fn.next = function(selector) {
        if ( typeof (selector) === "number" && selector > 1) {
            return $(jQuery.nth( this[0], ( selector + 1 ), "nextSibling" ));
        }

        return _next.apply(this, arguments);
    }


    /***
     * prev() accepts numerical argument
     * prev().prev().prev() === prev(3)
     * prev() and prev(<string selector>) still in tact
    */
    var _prev = $.fn.prev;

    $.fn.prev = function(selector) {
        if ( typeof (selector) === "number" && selector > 1) {
            return $(jQuery.nth( this[0], ( selector + 1 ), "previousSibling" ));
        }

        return _prev.apply(this, arguments);
    }


    /***
     * parent() accepts numerical argument
     * parent().parent().parent() === parent(3)
     * parent() and parent(<string selector>) still in tact
    */
    var _parent = $.fn.parent;

    $.fn.parent = function(selector) {
        if ( typeof (selector) === "number" && selector > 1) {
            var parent = this[0].parentNode;
            while ( --selector ) {
                parent = parent.parentNode;
            }
            return parent && parent.nodeType !== 11 ? $(parent) : null;
        }

        return _parent.apply(this, arguments);
    }

})(jQuery);

(function($){

    /***
     * clone() accepts numerical argument
     * returns an array containing n clones
     * clone() and clone(withDataAndEvents) still in tact
    */
    var _clone = $.fn.clone;

    $.fn.clone = function(n, withDataAndEvents) {
        if ( typeof (n) === "number" && n > 1) {
            var stack = [];
            while (n--) {
                stack.push(_clone.call(this, withDataAndEvents));
            }
            return stack;
        }

        return _clone.call(this, withDataAndEvents);
    }

})(jQuery);

(function($){

    /***
     * fadeIn() and fadeOut() now removes filter attribute in IE to resolve
     * clearType issues in IE6 and IE7. Can be short-circuited by setting
     * cancel to true. Addresses tickets #2457, #3230, #4779 and others.
    */
    var _fadeIn = $.fn.fadeIn;

    $.fn.fadeIn = function(easing, callback, cancel) {
        return _fadeIn.call(this, easing, function(){
            if(jQuery.browser.msie && !cancel) {
                $(this).get(0).style.removeAttribute('filter');
            }
            if($.isFunction(callback)) callback();
        });
    }


    var _fadeOut = $.fn.fadeOut;

    $.fn.fadeOut = function(easing, callback, cancel) {
        return _fadeOut.call(this, easing, function() {
            if(jQuery.browser.msie && !cancel) {
                $(this).get(0).style.removeAttribute('filter');
            }
            if($.isFunction(callback)) callback();
        });
    }

})(jQuery);
