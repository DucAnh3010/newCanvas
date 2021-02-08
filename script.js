const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
let countLife = 3;
let score = 0;
let lifes = [];
let replay = {
  x: 380,
  y: 20,
  radius: 10,
  color: "blue",
};
let add = 0;
// for( i =0;i<3;i++){
//   lifes[i].push({
//     x:10+10*i,
//     y:50
//   })
// }

let lastUpdate = Date.now();
const balls = [];

const drawCircle = (ctx, x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
};
let paddle = {
  x: 200,
  y: 280,
  width: 50,
  height: 10,
};

let accumulate = 0;
let touched = false;
let targetX = paddle.x;

const PADDLE_SPEED = 240;

function loop() {
  requestAnimationFrame(loop);

  const delta = (Date.now() - lastUpdate) / 1000;
  lastUpdate = Date.now();

  if (touched) {
    let speed = 0;
    const dist = Math.abs(paddle.x - targetX);
    if (dist <= PADDLE_SPEED * delta) {
      paddle.x = targetX;
    } else if (paddle.x > targetX) {
      speed = -PADDLE_SPEED;
    } else if (paddle.x < targetX) {
      speed = PADDLE_SPEED;
    }
    paddle.x += speed * delta;
  }

  if (countLife == 0) {
    ctx.clearRect(10, 50, 10, 10);
    ctx.font = "bold 50px Open Sans";
    ctx.style = "green";
    ctx.fillText("Game Over", 100, 200);
    return;
    // countLife = k;
  }
  let k = ctx.clearRect(0, 0, 400, 300);
  accumulate += delta;
  if (accumulate >= 3) {
    accumulate = 0;
    balls.push({
      x: Math.random() * 400,
      y: 0,
      isPowerUp: Math.random() * 10,
    });
  }

  for (let ball of balls) {
    ball.y += 1;
  }

  for (i = 0; i < countLife; i++) {
    ctx.fillStyle = "red";
    ctx.fillRect(10 + 20 * i, 50, 10, 10);
  }

  for (let ball of balls) {
    if (ball.isPowerUp <= 4) {
      drawCircle(ctx, ball.x, ball.y, 10, "red");
    } else {
      drawCircle(ctx, ball.x, ball.y, 10, "green");
    }
  }

  for (let ball of balls) {
    if (ball.y == paddle.y) {
      if (ball.x >= paddle.x && ball.x <= paddle.x + 50 + add) {
        score++;
        ctx.fillStyle = "white";
        ctx.fillRect(ball.x - 20, ball.y - 10, 30, 10);
        var x = balls.indexOf(ball);
        balls.splice(x, 1);
        if (ball.isPowerUp <= 4) {
          paddle.width = paddle.width + 10;
          console.log(paddle.width);
          add = add + 10;
        }
        ctx.fillRect(ball.x - 20, ball.y + 10, 30, 20);
      } else {
        countLife--;
      }
    }
  }
  ctx.fillStyle = "blue";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.font = "bold 10px Open Sans";
  ctx.fillText("Score " + score, 10, 10);
  drawCircle(ctx, replay.x, replay.y, replay.radius, replay.color);
}
loop();
// canvas.addEventListener("touchstart",function(event){
//   var x = event.touches[0].clientX
//   if(x-25>=paddle.x){
//     right();
//   }
//   else {
//     left();
//   }
// })
// canvas.addEventListener("click",function(event){

//   if(event.x-25>=paddle.x){
//     right();
//   }
//   else {
//     left();
//   }
// })

canvas.addEventListener("mousedown", function (event) {
  touched = true;
  targetX = event.clientX - paddle.width / 2;
});
canvas.addEventListener("mousemove", function (event) {
  targetX = event.clientX - paddle.width / 2;
});
canvas.addEventListener("mouseup", function (event) {
  touched = false;
});
canvas.addEventListener("touchstart", function (event) {
  touched = true;
  targetX = event.touches[0].clientX - paddle.width / 2;
  // console.log(event.touches.clientX);
});
canvas.addEventListener("touchmove", function (event) {
  targetX = event.touches[0].clientX - paddle.width / 2;
});
canvas.addEventListener("touchend", function (event) {
  touched = false;
});
canvas.addEventListener("click", function (event) {
  if (
    event.x >= replay.x &&
    event.y >= replay.y &&
    event.x <= 400 &&
    event.y <= 38
  ) {
    // console.log(event.y);
    countLife = 3;
    score = 0;
    paddle.width = 50;
    add = 0;
  }
});
canvas.addEventListener("touchstart", function (event) {
  if (
    event.touches[0].clientX >= replay.x &&
    event.touches[0].clientY >= replay.y &&
    event.touches[0].clientX <= 400 &&
    event.touches[0].clientY <= 45
  ) {
    console.log(event.touches[0].clientY);
    countLife = 3;
    score = 0;
    paddle.width = 50;
    add = 0;
    ctx.clearRect(0, 0, 400, 300);
  }
});
// function left() {
//   paddle.x = paddle.x - 20;

//   if (paddle.x <= 0) {
//     paddle.x = 0;
//   }
// }
// function right() {
//   paddle.x = paddle.x + 20;

//   if (paddle.x >= 350) {
//     paddle.x = 350;
//   }
// }
