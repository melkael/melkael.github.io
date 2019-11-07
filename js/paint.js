context = document.getElementById('canvasPaint').getContext("2d");
var canvas = document.querySelector('canvas');

$('#canvasPaint').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvasPaint').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvasPaint').on("touchmove_", function(e){
  if(paint){
    addClick(e.detail.pageX - this.offsetLeft, e.detail.pageY - this.offsetTop, true);
    redraw();
  }
})

$('#canvasPaint').on("touchstart_", function(e){
  var mouseX = e.detail.pageX - this.offsetLeft;
  var mouseY = e.detail.pageY - this.offsetTop;

  paint = true;
  addClick(e.detail.pageX - this.offsetLeft, e.detail.pageY - this.offsetTop);
  redraw();
})

$('#canvasPaint').mouseup(function(e){
  paint = false;
});

$('#canvasPaint').mouseleave(function(e){
  paint = false;
});

var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

var curColor = colorPurple;
var clickColor = new Array();

var clickSize = new Array();
var curSize = 5;

$("#purple").click(function(){
	curColor = colorPurple;
})

$("#green").click(function(){
	curColor = colorGreen;
})

$("#yellow").click(function(){
	curColor = colorYellow;
})

$("#brown").click(function(){
	curColor = colorBrown;
})

$("#small").click(function(){
	curSize = 2;
})

$("#normal").click(function(){
	curSize = 5;
})

$("#medium").click(function(){
	curSize = 10;
})

$("#large").click(function(){
	curSize = 25;
})


var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint = false;

function initCanvas(){
	clickX = new Array();
	clickY = new Array();
	clickDrag = new Array();
	paint = false;
}

initCanvas()

$("closer-paint").click(function(){
	initCanvas();
})

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickSize.push(curSize);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.lineJoin = "round";

  for(var i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.lineWidth = clickSize[i];
     context.stroke();
  }
}

/*
Touch support
*/

var canvas = document.getElementById("canvasPaint");

canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new CustomEvent('touchstart_', {
    detail : {
      pageX: touch.pageX,
      pageY: touch.pageY
    }
  })
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new CustomEvent('touchmove_', {
    detail : {
      pageX: touch.pageX,
      pageY: touch.pageY
    }
  })
  canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}