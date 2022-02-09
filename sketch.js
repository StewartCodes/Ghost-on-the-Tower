var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var edges;
var gameState;
var spawnDoor;
var rand
var random
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 
  ghost = createSprite(300, 400);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.35
  ghost.debug = true 
  ghost.setCollider("rectangle", -10, 25, 175, 250);


  gameState = "playing"

  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  climbersGroup = new Group();

  spookySound.loop();

  edges = createEdgeSprites()
}

function draw() {
  background(200);

  ghost.collide(doorsGroup);

  if(tower.y > 400){
      tower.y = 300
    }
  if (gameState === "playing"){  
    if (keyDown("Space") || keyDown("w") || keyDown("UP_ARROW")){
      ghost.velocityY = -7.5
    }

    if (keyDown("LEFT_ARROW") || keyDown("a") || keyDown("RIGHT_ARROW") || keyDown("d")) {
      if (keyDown("LEFT_ARROW") || keyDown("a")){
        ghost.x -= 3
      } else if (keyDown("RIGHT_ARROW") || keyDown("d")){
        ghost.x += 3
      } 
    }

    if (frameCount % 300 === 0){
      rand = Math.round(random(75,425))
      spawnDoor()
      spawnClimber()
    }
  

    if (ghost.isTouching(edges[0])  || ghost.isTouching(edges[1]) || ghost.isTouching(edges[2]) || ghost.isTouching(edges[3]) || ghost.isTouching(climbersGroup)) {
      gameState = "over"
    }
  }
  if (gameState === "over"){
    background("black")
    fill("yellow")
    textSize(35)
    text("Game Over", 200, 200)
    ghost.visible = false
    tower.visible = false
    doorsGroup.setLifetimeEach (0)
    climbersGroup.setLifetimeEach (0) 
  }

  ghost.velocityY += 0.30
  
  
  drawSprites()
}

function spawnDoor(){
  door = createSprite(rand, -70, 10, 10)
  door.scale = 0.75
  door.velocityY = (1)
  door.lifetime = (2000)
  ghost.depth = (door.depth + 1)
  door.setCollider("rectangle", 0, 60, 100, 15);
  door.debug = true
  door.addImage("door", doorImg)
  doorsGroup.add (door)
}

function spawnClimber(){
  climber = createSprite(rand, -20, 10, 10)
  climber.scale = 0.75
  climber.velocityY = (1)
  climber.lifetime = (2000)
  ghost.depth = (climber.depth + 1)
  climber.setCollider("rectangle", 0, 5, 100, 7.5);
  climber.addImage("climber", climberImg)
  climber.debug = true;
  climbersGroup.add (climber)
}