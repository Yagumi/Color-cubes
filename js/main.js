//Массив цветов (неизменяемый)
var colors = ['Red', 'Green', 'Pink', 'Orange', 'Yellow', 'Aqua', 'Blue', 'Purple', 'Black'];

var newColors = [];// Массив для хранения нашего итогового массива перемешенного в рандомном порядке
// Массив для сменны классов
var squareArr = [];
//Копируем массив colors в newColors
for (var i = 0; i < colors.length; i++) {
	newColors.push(colors[i]);
}

//Функция рандома
function mixingColors(a, b) {
	return Math.random() - 0.5;
}

//Сортировка
newColors.sort(mixingColors);

// Глобальные переменные
var project = document.querySelector('.project');	
var wrapper = document.querySelector('.square__wrapper');



//======================== 2 =====================

// Создаем обертку для  border в нее вставляем кубики созданные так же, добавляем рандомные цвета и вставляем в wrapper
function createSquare() {
	for (var i = 0; i < newColors.length; i++) {
		squareBorderOnly = document.createElement('div');
		squareBorderOnly.classList.add('square__border');
		wrapper.appendChild(squareBorderOnly);

		square = document.createElement('div');
		square.classList.add('square-on');
		square.style.background = newColors[i];
		squareArr[i] = square; // Добавляем в массив элементы для сменны их классов
		squareBorderOnly.appendChild(square);
	}
	
}

//====================== 3 ========================

//Создаем таймер на 30секунд (к примеру)
function createTimer() {
	button.remove();// Удаляем кнопку Start
	var timer = document.createElement('p');
	timer.classList = 'timer';
	timer.innerHTML = '30';

	var nameTimer = document.createElement('p');
	nameTimer.classList = 'name-timer';
	nameTimer.innerHTML = 'The game will start after:';

	project.appendChild(nameTimer);
	project.appendChild(timer);
	
	go();
}

var button = document.querySelector('.button');

//Запускает таймер
function go(){
	window.timerId = window.setInterval(timer, 1000);
}

//Останавливает таймер
function stop() {
	window.clearInterval(window.timerId);
}

function timer() {
	timer = document.querySelector('.timer');
	nameTimer = document.querySelector('.name-timer');
	timerValue = +(timer.innerHTML) - 1;
	timer.innerHTML = timerValue;
	if (timerValue == 0) {
		stop();
		timer.remove();// Удаляем таймер
		nameTimer.remove();// Удалаем надпись над таймером
		changeSquareOff();//Меняем классы
		addScoreboard();//Добаляем надпись
		addColorSquare();//Добавляем квадрат для поиска
		addAttempts();
	}
}

//========================= 4 =======================

// функция смены класса
function changeSquareOff() {
	for (var i = 0; i < squareArr.length; i++) {
	squareArr[i].classList.remove('square-on');
	squareArr[i].classList.add('square-off');
	}
}

//=========================== 5 =========================
var gameColors = [];
//Копируем массив newColors в gameColor
for (var i = 0; i < newColors.length; i++) {
	gameColors.push(newColors[i]);
}
// Делаем рандом
gameColors.sort(mixingColors);



// Функция создает квадрат с цветом для поиска
var bgSquareColor = '';
function addColorSquare() {
	var squareColor = document.createElement('div');
	squareColor.classList.add('square__color');
	squareColor.style.width = '100px';
	squareColor.style.height = '100px';
	squareColor.style.background = gameColors[0];
	bgSquareColor = squareColor.style.background;
	project.appendChild(squareColor);
}


// Функция добаляет надпись над квадратом
function addScoreboard() {
	var scoreboard = document.createElement('p');
	scoreboard.classList = 'scoreboard';
	scoreboard.innerHTML = 'Find the color from the picture';
	project.appendChild(scoreboard);
	
}


// Функция создания попыток(attempts)
function addAttempts() {
	var attemptsWrapper = document.createElement('p');
	attemptsWrapper.classList.add('attempts');
	attemptsWrapper.innerHTML = '0';

	var attemptsTitle = document.createElement('p');
	attemptsTitle.classList.add('attempts-title');
	attemptsTitle.innerHTML = 'Attempts:';

	attemptsWrapper.classList.add('attempts__wrapper');
	project.appendChild(attemptsTitle);
	project.appendChild(attemptsWrapper);
}

//Функция прибаляет по 1 попытке каждый раз, когда есть щелчок
function attemtsAdd() {
	var attempts = document.querySelector('.attempts');
	attempts.innerHTML = parseInt(attempts.innerHTML) + 1;
}
//============================= 6 ========================


// функция ловли клика по квадрату и удаления и добаления классов для показа цвета квадрата
wrapper.addEventListener('click', func);
 function func() {
	var target = event.target.closest('div');
	attemtsAdd();// добаляем к количеству попыток +1
	if (target.style.background === bgSquareColor) {
		target.classList.remove('square-off');
		target.classList.add('square-on');
		colorCrossover();
	} 
};

/* Функция ищет созданный квадрат для поиска, удаляет его, и удаляет первый элемент массива gameColors
и запускают функцию создающюю новый квадрат для следующего поиска*/
function colorCrossover() {
	var squareSearch = document.querySelector('.square__color');
	squareSearch.remove();
	gameColors.shift(0);
	addColorSquare();
	if (gameColors.length == 0) {
			scoreboard = document.querySelector('.scoreboard');
			scoreboard.remove();

			var wrapperNewGame = document.createElement('div');
			wrapperNewGame.classList.add('wrapper-game');
			var newGameTitle = document.createElement('p');
			newGameTitle.classList.add('game-title');
			newGameTitle.innerHTML = 'Do you want play again?'
			var newGameButtonYes = document.createElement('button');
			newGameButtonYes.classList.add('button-yes');
			newGameButtonYes.innerHTML = "Yes";
			var newGameButtonNo = document.createElement('button');
			newGameButtonNo.classList.add('button-no');
			newGameButtonNo.innerHTML = 'No';

			project.appendChild(wrapperNewGame);
			wrapperNewGame.appendChild(newGameTitle);
			wrapperNewGame.appendChild(newGameButtonYes);
			wrapperNewGame.appendChild(newGameButtonNo);

			makeChoice();
	} 
}

//=========================== 7 ===============================//


function makeChoice() {
	var yes = document.querySelector('.button-yes');
	var no = document.querySelector('.button-no');
	
	
	yes.addEventListener('click', function () {
		document.location.reload();
	});
	
	no.addEventListener('click', function () {
		newGameTitle = document.querySelector('.game-title');
		newGameTitle.innerHTML = 'End of the game!';
		
		newGameButtonYes = document.querySelector('.button-yes');
		newGameButtonNo = document.querySelector('.button-no');
		newGameButtonNo.remove();
		newGameButtonYes.remove();
	});
		
	
}

