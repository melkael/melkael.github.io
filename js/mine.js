var minesweeper = [];

function init(){
	minesweeper = []
	$("#minesweeper").text("")
	game_over = false
	for (var r=0; r<20; r++) {
	  var col = "";
	  for (var c=0; c<20; c++) {
		col += "<td id='"+ r + "-" + c +"' class=mine-case></td>";
	  }
	  $("#minesweeper").append("<tr>"+col+"</tr>");
	}

	for(var i=0; i<20; i++) {
	    minesweeper[i] = [];
	    for(var j=0; j<20; j++) {
	    	if(Math.random() > 0.85){
	        	minesweeper[i][j] = "m";
	        }
	        else {
	        	minesweeper[i][j] = 0;
	        }
	    }
	}

	for(i=0; i < 20; i++) {
		for(j=0; j < 20; j++) {
			curr = minesweeper[i][j]
			if(curr != "m") {
				if(i > 0){
					if(minesweeper[i-1][j] === "m"){
						curr += 1
					}
					if(j > 0 && minesweeper[i-1][j-1] === "m"){
						curr += 1
					}
					if(j < 19 && minesweeper[i-1][j+1] === "m"){
						curr += 1
					}
				}
				if(i < 19) {
					if(minesweeper[i+1][j] === "m"){
						curr += 1
					}
					if(j > 0 && minesweeper[i+1][j-1] === "m"){
						curr += 1
					}
					if(j < 19 && minesweeper[i+1][j+1] === "m"){
						curr += 1
					}
				}
				if(j > 0 && minesweeper[i][j-1] === "m") {
					curr += 1
				}
				if(j < 19 && minesweeper[i][j+1] === "m") {
					curr += 1
				}
			}
			minesweeper[i][j] = curr;
		}
	}
	$("td").click(function(e){
	if(!game_over){
		discover(e.target.id)
	}
	});
}

init();



function end_game(){
	for(i=0; i < 20; i++) {
			for(j=0; j < 20; j++) {
				if(minesweeper[i][j] === "m"){
					$("#" + String(i) + "-" + String(j)).css("background-color", "red")
				}
				/*
				if(minesweeper[i][j] === 0){
					$("#" + String(i) + "-" + String(j)).css("background-color", "lightgray")
				}
				if(minesweeper[i][j] === 1){
					$("#" + String(i) + "-" + String(j)).css("background-color", "blue")
				}
				if(minesweeper[i][j] === 2){
					$("#" + String(i) + "-" + String(j)).css("background-color", "green")
				}
				if(minesweeper[i][j] === 3){
					$("#" + String(i) + "-" + String(j)).css("background-color", "purple")
				}
				if(minesweeper[i][j] === 4){
					$("#" + String(i) + "-" + String(j)).css("background-color", "yellow")
				}
				*/
		}
	}
}

count = 0

function reveal(id) {
	c_str = id.split("-")
	c_int = []
	c_int[0] = parseInt(c_str[0])
	c_int[1] = parseInt(c_str[1])

	$("#" + id).addClass("seen");
	if(minesweeper[c_int[0]][c_int[1]] === 1) {
		$("#" + id).css("background-color", "blue");
	}
	if(minesweeper[c_int[0]][c_int[1]] === 2) {
		$("#" + id).css("background-color", "green");
	}
	if(minesweeper[c_int[0]][c_int[1]] === 3) {
		$("#" + id).css("background-color", "orange");
	}
	if(minesweeper[c_int[0]][c_int[1]] === 4) {
		$("#" + id).css("background-color", "purple");
	}
	if(minesweeper[c_int[0]][c_int[1]] === 5) {
		$("#" + id).css("background-color", "magenta");
	}
	if(minesweeper[c_int[0]][c_int[1]] === 6) {
		$("#" + id).css("background-color", "cyan");
	}
	if(minesweeper[c_int[0]][c_int[1]] === 7) {
		$("#" + id).css("background-color", "yellow");
	}
	if(minesweeper[c_int[0]][c_int[1]] === 8) {
		$("#" + id).css("background-color", "pink");
	}
	if(minesweeper[c_int[0]][c_int[1]] != 'm' && minesweeper[c_int[0]][c_int[1]] != 0){
		$("#" + id).text(minesweeper[c_int[0]][c_int[1]])
	}
}

function discover(id) {
	c_str = id.split("-");
	c_int = []
	c_int[0] = parseInt(c_str[0])
	c_int[1] = parseInt(c_str[1])

	if(c_int[0] < 0 || c_int[0] > 19 || c_int[1] < 0 || c_int[1] > 19) {
		return
	}

 	if(minesweeper[c_int[0]][c_int[1]] != "m") {
 		stack = [id]
 		while (stack.length != 0) {
 			id = stack.pop()
 			c_str = id.split("-");
			c_int = []
			c_int[0] = parseInt(c_str[0])
			c_int[1] = parseInt(c_str[1])
			reveal(id);
			if(minesweeper[c_int[0]][c_int[1]] === 0) {
	 			if(c_int[0] < 19
	 				&& $("#" + String(c_int[0] + 1 + "-" + c_str[1])).hasClass("seen") === false
	 				&& minesweeper[c_int[0] + 1][c_int[1]] != "m") {
	 					stack.push(String(c_int[0] + 1) + "-" + c_str[1])
	 			}
	 			if(c_int[0] > 0
	 				&& $("#" + String(c_int[0] - 1 + "-" + c_str[1])).hasClass("seen") === false
	 				&& minesweeper[c_int[0] - 1][c_int[1]] != "m") {
	 					stack.push(String(c_int[0] - 1) + "-" + c_str[1])
	 			}
	 			if(c_int[1] < 19
	 				&& $("#" + c_str[0] + "-" + String(c_int[1] + 1)).hasClass("seen") === false
	 				&& minesweeper[c_int[0]][c_int[1] + 1] != "m"){
	 					stack.push(c_str[0] + "-" + String(c_int[1] + 1))
	 			}
	 			if(c_int[1] > 0
	 				&& $("#" + c_str[0] + "-" + String(c_int[1] - 1)).hasClass("seen") === false
	 				&& minesweeper[c_int[0]][c_int[1] - 1] != "m") {
	 					stack.push(c_str[0] + "-" + String(c_int[1] - 1))
	 			}
	 		}
 		}
	}
	else {
		end_game();
		game_over = true
	}
}