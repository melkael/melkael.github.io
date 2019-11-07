jQuery.fn.center = function (callback) {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    if(callback){
        callback()
    }

    return this;
}

function init_closer(name, callback) {
    $("#closer-" + name).click(function(){
        $("#" + name + "-window").hide();
    })
    if(callback){
        $("#closer-" + name).click(function(){
            callback();
        })
    }
}

function init_row(name) {
    $("#" + name + "-row").click(function(){
        focus = "#" + name + "-window";
        $("#" + name + "-window").show();
        $("#start-menu").hide();
    });
}

$.fn.nodoubletapzoom = function() {
    $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp;
        var t1 = $(this).data('lastTouch') || t2;
        var dt = t2 - t1;
        var fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) {
            return; // not double-tap
        }
        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(e.target).trigger('click');
    });
};