var canvasDom = document.getElementById("canvas1");
var canvasHeight = canvasDom.height;
var canvasWidth = canvasDom.width;
var canvasContext = canvasDom.getContext('2d');
var rows = 50;
var columns = 50;
var unitWidth = canvasWidth / columns;
var unitHeight = canvasHeight / rows;
var cellMatrix = [];
var gameState = false;
for (var i = 0; i < rows; i++) {
	cellMatrix[i] = [];
	for (var j = 0; j < columns; j++) {
		cellMatrix[i][j] = false;
	}
}


RefreshCanvas();

setInterval(function(){
	if (gameState) {
		UpdateCellStates();
		RefreshCanvas();
	}	
}, 50);

function DrawGrid() {
	canvasContext.strokeStyle = 'rgba(0, 50, 50, 0.8)';
	canvasContext.lineWidth = 1;
	canvasContext.beginPath();
	for (var i = 0; i <= columns; i++) {
		canvasContext.moveTo(i * unitWidth, 0);
		canvasContext.lineTo(i * unitWidth, canvasHeight);
	}
	for (var i = 0; i <= rows; i++) {
		canvasContext.moveTo(0, i * unitHeight);
		canvasContext.lineTo(canvasWidth, i * unitHeight);
	}
	canvasContext.stroke();
	canvasContext.closePath();
}

function DrawCells() {
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			if (cellMatrix[i][j] == false) {
				canvasContext.fillStyle = "black";	
			}
			else {
				canvasContext.fillStyle = "green";
			}
			canvasContext.fillRect(i * unitWidth, j * unitHeight, unitWidth, unitHeight);
		}
	}
}

function RefreshCanvas() {
	DrawCells();
	DrawGrid();
}

function RandomInitCellMatrix() {
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			var r = Math.random() * 5;
			if (r < 1) {
				cellMatrix[i][j] = true;
			}
			else {
				cellMatrix[i][j] = false;
			}
		}
	}
	RefreshCanvas();
}

function UpdateCellStates() {
	var newCellMatrix = [];
	for (var i = 0; i < rows; i++) {
		newCellMatrix[i] = [];
		for (var j = 0; j < columns; j++) {
			var liveCellCount = 0;
			liveCellCount += (cellMatrix[(i-1+rows)%rows][(j-1+columns)%columns] ? 1 : 0);
			liveCellCount += (cellMatrix[(i-1+rows)%rows][j%columns] ? 1 : 0);
			liveCellCount += (cellMatrix[(i-1+rows)%rows][(j+1)%columns] ? 1 : 0);
			liveCellCount += (cellMatrix[i][(j-1+columns)%columns] ? 1 : 0);
			liveCellCount += (cellMatrix[i][(j+1)%columns] ? 1 : 0);
			liveCellCount += (cellMatrix[(i+1)%rows][(j-1+columns)%columns] ? 1 : 0);
			liveCellCount += (cellMatrix[(i+1)%rows][j%columns] ? 1 : 0);
			liveCellCount += (cellMatrix[(i+1)%rows][(j+1)%columns] ? 1 : 0);
			if (liveCellCount == 3) {
				newCellMatrix[i][j] = true;
			}
			else if (liveCellCount == 2) {
				newCellMatrix[i][j] = cellMatrix[i][j];
			}
			else {
				newCellMatrix[i][j] = false;
			}
		}
	}
	cellMatrix = newCellMatrix;
}

canvasDom.onmousedown = function (e) {
	var X = Math.floor((e.pageX - canvasDom.offsetLeft) / unitWidth);
	var Y = Math.floor((e.pageY - canvasDom.offsetTop) / unitHeight);
	if (cellMatrix[X][Y]) {
		cellMatrix[X][Y] = false;
	}
	else {
		cellMatrix[X][Y] = true;
	}
	RefreshCanvas();
}

function ChangeGameState() {
	var GameStateBtn = document.getElementById("changeGameStateBtn");
	if (gameState) {
		gameState = false;
		GameStateBtn.innerHTML = "Start";
	}
	else {
		gameState = true;
		GameStateBtn.innerHTML = "Pause";
	}
}

function Clear() {
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			cellMatrix[i][j] = false;
		}
	}
	RefreshCanvas();
}