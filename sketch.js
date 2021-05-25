var platform, platformGroup;
var mario;
var wall;
var flag;
var obstacle;
var groundImage, marioImage, wallImage, obstacleImage, flagImage;
var gameState = PLAY;
var obstacleGroup;
var PLAY = 1;
var LOSE = 2;
var WIN = 3;  

function preload()
{
  groundImage = loadImage("images/ground.png");
  marioImage = loadAnimation("images/Capture1.png", "images/Capture3.png", "images/Capture4.png");
  wallImage = loadImage("images/wall.png");
  obstacleImage = loadImage("images/obstacle1.png");
  flagImage = loadImage("images/Flag.png")
}

function setup() 
{
  createCanvas(displayWidth, 700);
                                                
  var xPosition = 0;  
  var gap; 
  
  mario = new Player();
  platformGroup = new Group();
  obstacleGroup= new Group();



  for(i=0; i<20; i++)
  {
    platform = new Platform(xPosition); 
    platformGroup.add(platform.spt);
    gap = random([90, 140]);
    xPosition = xPosition + platform.sptW + gap;

    if(i%3 === 0)
    {
      wall = new Wall(xPosition);
      platformGroup.add(wall.spt);

      obstacle = new Obstacle(xPosition);
      obstacleGroup.add(obstacle.spt);
      
    }
  }

  flag = createSprite(xPosition-100,350);
  flag.addImage("flag", flagImage);
  flag.scale = 0.2;
}

function draw() 
{
  background('skyblue');  

  translate(-mario.spt.x + width/2, 0);

  mario.applyGravity();
  mario.spt.collide(platformGroup);



if(gameState = PLAY)
{
  if(keyDown("left"))
  {
    mario.moveLeft();
  }

  if(keyDown("right"))
  {
    mario.moveRight();
  }

  if(keyDown("up") && mario.spt.velocityY === 0)
  {
    mario.jump();
  }
  if(obstacleGroup.isTouching(mario.spt) || mario.spt.y > height)
  {
    gameState = LOSE;
  } 
  if(flag.isTouching(mario.spt))
  {
    gameState = WIN;
  }


}
if(gameState === LOSE)
{
  textSize(30);
  text("GAME OVER", mario.spt.x, 350);
  mario.spt.setVelocity(0,0);
  mario.spt.pause();
  obstacleGroup.destroyEach();
}
if(gameState === WIN)
{
  textSize(30);
  text("YOU WIN", mario.spt.x, 350);
  mario.spt.setVelocity(0,0);
  mario.spt.pause();
  obstacleGroup.destroyEach();
}


  drawSprites();
}

