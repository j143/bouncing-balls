const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const speed = 4; //4 px

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


class Shape {

   constructor(x, y, velX, velY) {
     this.x = x;
     this.y = y;
     this.velX = velX;
     this.velY = velY;
   }
}

class Ball extends Shape {

  constructor(x, y, velX, velY, size, color) {
     super()
     this.x = x;
     this.y = y;
     this.velX = velX;
     this.velY = velY;
     this.size = size;
     this.color = color;
  }

  exists() {
    return true;
  }

  draw() {
    // 1. we use beginPath() to state that we want to draw a shape on the paper.
    ctx.beginPath()

    // 2. we use the arc() method to trace an arc shape on the paper.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    // 3. finish drawing the path we started with beginPath(), and 
    // fill the area it takes up with the color we specified earlier in fillStyle.
    ctx.fillStyle = this.color;
    ctx.fill()

  }

  update(){

    if (this.x > width) {
      this.velX = -(this.velX)
    }
    if (this.y > height) {
      this.velY = -(this.velY)
    }
    if (this.x <= 0) {
      this.velX = -(this.velX)
    }
    if (this.y <= 0) {
      this.velY = -(this.velY)
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    
    for (const ball of balls) {
      if (!(this == ball)) {
//      if (this.x == ball.x && this.y == ball.y) {
        const dx = this.x - ball.x
        const dy = this.y - ball.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance <= (this.size + ball.size)) {
          this.color = ball.color = randomRGB()
        }
      }
    }
  }

}

class EvilCircle extends Shape {

//  let size = 10

  constructor(x, y) {
    super(x, y, 20, 20)
  }

  draw() {
  ctx.beginPath();
  ctx.strokeStyle = 'red'
  ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
  ctx.lineWidth = 5
  ctx.stroke()
  }

  

}

//const ball = new Ball(100,100,0.2,0.2,10,'blue');

const balls = [];

while ( balls.length < 25) {
  const size = random(10, 15)
  const ball = new Ball(
     random(0+size, width-size),
     random(0+size, height-size),
     speed, speed,
     size,
     randomRGB()
  );
  balls.push(ball)
}

function loop() {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height)

  for (const ball of balls) {
    ball.draw()
    ball.update()
    ball.collisionDetect()
  }
  requestAnimationFrame(loop)
}

loop()
const circle1 = new EvilCircle(100, 100)
circle1.draw()
