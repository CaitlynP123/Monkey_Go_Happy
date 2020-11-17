var PLAY = 1
var END = 0
var gameState = PLAY

var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var survivalTime = 0
var score = 0

var ground

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(500, 500)

  monkey = createSprite(150, 300)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.125
  monkey.setCollider("rectangle", 0, 0, 500, 555)

  ground = createSprite( 300, 350, 500, 10)

  FoodGroup = createGroup()
  obstacleGroup = createGroup()
  
  obstacle = createSprite(600,305)
  obstacle.addImage("rock", obstacleImage)
  obstacle.scale = 0.21

}

function draw() {
  background("lightgray")

  stroke("white")
  textSize(20)
  fill("white")
  text("Score: " + score, 500, 50)

  stroke("black")
  textSize(20)
  fill("black")
  text("Survival Time: " + survivalTime, 10, 25)
  survivalTime = Math.ceil(frameCount / frameRate())

  monkey.collide(ground)
  obstacle.collide(monkey)
  obstacle.collide(ground) 
  
  score = survivalTime
  
  if (gameState == PLAY) {
    ground.velocityX = -4
    ground.x = ground.width / 2

    if (keyDown("space")) {
      monkey.y = monkey.y - 20
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.collide(obstacle)){
      gameState = END
    }
  } 
  
  if(gameState==END){  
   FoodGroup.setLifetimeEach(-1)
   FoodGroup.setVelocityXEach(0)
   ground.velocityX = 0
   obstacleGroup.setLifetimeEach(-1)
   obstacleGroup.setVelocityXEach(0)
   monkey.velocityX = 0
  }
  
  spawnFood()
  spawnRocks()
  drawSprites()
}

function spawnFood() {
  if (frameCount % 80 == 0) {
    banana = createSprite(550,Math.round(random(100, 200)))
    banana.velocityX = -4
    banana.addImage("food", bananaImage)
    banana.scale = 0.125
    banana.lifetime = 125
    
    banana.depth = monkey.depth
    monkey.depth = monkey.depth+1
    
    FoodGroup.add(banana)
  }
}

function spawnRocks(){
    
  if(frameCount%300 == 0){  
    obstacle.velocityX = -4
    obstacle.setCollider("circle",0,0,195)
  }
  obstacleGroup.add(obstacle)
  obstacle.lifetime = 125  
}
