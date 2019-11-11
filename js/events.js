focus = "#popup-window"

$("#popup-window").click(function(){
    focus = "#popup-window";
})

$("#mine-window").click(function(){
    focus = "#mine-window"
})

// Handling the start menu



$("#start-button").click(function(){
    focus = "#start-menu"
	$("#start-menu").toggle();
    clearInterval(shakeInterval);
});

$("#calc-window").click(function(){
    focus = "#calc-window";
})

$("#paint-window").click(function(){
    focus = "#paint-window";
})

// ok button of the popup

$(".close-button").click(function(){
  $(this).parent().parent().parent().parent().remove()
});



// centering the popup

// setting up the clock
var clock = ''

setInterval(function() {
    var date = new Date();
    hours = date.getHours();
    if(String(hours).length === 1){
    	hours = '0' + hours
    }

    minutes = date.getMinutes()
    if(String(minutes).length === 1){
    	minutes = '0' + minutes
    }
    clock = hours + ":" +  minutes
    $('#clock-wrapper').html(clock);
}, 500);

var shakeInterval = setInterval(function() {
    $("#start-button").toggleClass("shake");
}, 20000);

setInterval(function() {
    if(focus != "#start-menu") {
        $("#start-menu").css("z-index", "10");
    }
    let idArray = [];
    $(".window").each(function(){
        idArray.push(this.id);
    })
    var i;
    for (i = 0; i < idArray.length; i++) {
        $("#" + idArray[i]).css("z-index", 9);
    }
    $(focus).css("z-index", "1000");

}, 50);


// handling the icons (background change on click, open windows on double clicks)

let active_icon = '';

$(".icon").click(function(){
	active_icon = $(this).attr('id')
})

$("#about-icon").click(function(){
    focus = "#about-window";
    type_about.go();
	$("#about-window").show();
})

$("#about-window").click(function(){
    focus = "#about-window";
})

$("#contact-icon").click(function(){
    focus = "#contact-window";
    $("#contact-window").show();
})

$("#contact-window").click(function(){
    focus = "#contact-window";
})

$("#manu-icon").click(function(){
    focus = "#manu-window";
})

$("#manu-window").click(function(){
    focus = "#manu-window";
})

setInterval(function() {
    $(".icon").css("background", "transparent")
    if(active_icon != '') {
    	$("#" + active_icon).css("background", "rgba(0, 0, 255, 0.3)")
    }
}, 5);

/* When we click somewhere else than on start menu, it needs to get closed */

$(document).mouseup(function(e) {
    var container = $("#start-menu");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        // if we close a windows keep the start menu open
        if (!($(e.target).attr("id") === "close-button" ||
            $(e.target).attr("id") === "closer-about" ||
            $(e.target).attr("id") === "closer-calc") ||
            $(e.target).attr("id") === "closer-mine") {
                container.hide();
        }
    }
});

//$('body').nodoubletapzoom();

init_closer("mine", init);
init_closer("contact");
init_closer("calc");
init_closer("popup");
init_closer("paint");
init_closer("about");
init_closer("manu");
init_closer("bsod")

init_row("mine");
init_row("calc");
init_row("paint");

/* We want our windows always centered at first especially in case we are running on mobiles*/

function start_center(){
    $("#manu-window").center()
    $("#calc-window").center()
    $("#mine-window").center()
    $("#bsod-window").center()
    //$("#paint-window").center()
    $("#contact-window").center()
    $("#about-window").center(function(){
        $("#about-icon").trigger("click");
    });
}

/* In case a mobile user is changing between portrait and landscape formats */

$(window).resize(function() {
  $("#bsod-window").center();
  $("#manu-window").center();
  $("#popup-window").center();
  $("calc-window").center();
  $("#about-window").center();
  $("#mine-window").center();
  $("#contact-window").center()
});

$(".window").draggable({ handle: ".windowheader", scroll: false, containment:"window"});

$("#start-button").sparkle({
  fill: "#fff",
  stroke: "#000",
  size: 25,
  delay: 0,
  duration: 1500,
  pause: 600
});

var type_about = new TypeIt('.typewriter', {
    speed: 35,
    html: true,
    waitUntilVisible: true
})

$('#contact-form').submit(function(e){
    e.preventDefault();
    $.ajax({
        url: "https://hooks.zapier.com/hooks/catch/4551695/pi5ajh/",
        type:'post',
        data:$('#contact-form').serialize(),
        success:function(){
            $("#contact-form").empty()
            $("#contact-form").append("<span class='new-title'><h1>\
                                       Thanks for contacting me</h1>\
                                       <h3>We'll be in touch very soon !</h3></span>")

        }
    });
});

var shutdown = false;

$('.footer-img').click(function() {
    $("#warning").fadeOut("slow",function(){
        if(!shutdown){
            shutdown = true;
                setTimeout(function() {
                    $("#start-menu").hide();
                    $("#bsod-window").show();
                }, 500)
        }
    });
})

start_center();