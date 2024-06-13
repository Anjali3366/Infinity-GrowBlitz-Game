// Game Constants and variables
let inputDir = {
  x: 0,
  y: 0,
};
const foodsound = new Audio("./sound/food.mp3");
const gameOverSound = new Audio("./sound/gameover.mp3");
const moveSound = new Audio("./sound/move.mp3");
const musicSound = new Audio("./sound/music.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let SnakeArr = [{ x: 13, y: 15 }];

let food = {
  x: 13,
  y: 12,
};

// Game Functions

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;

  gameEngine();
}

function isCollid(snake) {
  // If Our snake cut their own body
  for (let i = 1; i < SnakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If our snake collid with boundaries
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}
function gameEngine() {
  // Part 1 : updating the snake array and food

  // if our snake is collid with boundary
  if (isCollid(SnakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over !! Press any key to play again ");
    SnakeArr = [{ x: 13, y: 15 }];
  }

  //If our snake have eaten the food, increment the score and regenerate the food
  if (SnakeArr[0].y === food.y && SnakeArr[0].x === food.x) {
    foodsound.play();
    score++;
    console.log(score);
    scoreBox.innerHTML = `Score :${score} `;
    SnakeArr.unshift({
      x: SnakeArr[0].x + inputDir.x,
      y: SnakeArr[0].y + inputDir.y,
    });
    food = {
      x: Math.floor(Math.random() * 15) + 2,
      y: Math.floor(Math.random() * 15) + 2,
    };
  }

  // moving the snake
  for (let i = SnakeArr.length - 2; i >= 0; i--) {
    SnakeArr[i + 1] = { ...SnakeArr[i] };
  }
  SnakeArr[0].x += inputDir.x;
  SnakeArr[0].y += inputDir.y;

  // Part 2 : Display the snake and food
  //Display the snake
  board.innerHTML = "";
  SnakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });

  //Display the food:
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
  }
});
