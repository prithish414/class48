var bg,ground;
var run,runimg
var girl,girlimg;
var invisibleGround;
var coinsGroup, coinImg;
var distance = 0;
var coins=0;
var RocksGroup, RockImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var girl_collided;
var gameOver,restart;
var gameOverImg,restartImg;

function preload()
{
  bg = loadImage("forest1.jpg")
  run =     loadAnimation("Run__000.png","Run__001.png","Run__002.png","Run__003.png","Run__004.png","Run__005.png","Run__006.png","Run__007.png","Run__008.png","Run__009.png")
  girlimg = loadImage("Idle__000.png") 
  coinImg = loadImage("coin.png");
  RockImg = loadImage("Rock.png");
  girl_collided=loadImage("Dead__006.png");
  gameOverImg=loadImage("go.png");
  restartImg=loadImage("play.png")
  
}
function setup()
{
createCanvas(750,500);
  
  ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
  ground.addImage("forest1.jpg",bg);
  ground.scale=2.5;
  
  ground.x = ground.width /2;
  
  girl = createSprite(300,380,600,10);
  girl.addAnimation("Run__000.png",run);
  girl.addAnimation("collided", girl_collided);
  girl.addImage("girlimg",girlimg);
  girl.scale = 0.2;
  
  gameOver = createSprite(350,140);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,145);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.2;
  restart.scale = 0.02;

  gameOver.visible = false;
  restart.visible = false;
  
  
  invisibleGround = createSprite(200,400,380,10);
  invisibleGround.visible = false;
  
  coinsGroup = createGroup();
  
  RocksGroup = createGroup();
}

function draw(){
  background(180);  
  
  if(gameState===PLAY)
  {
      distance = distance + Math.round(getFrameRate()/60);
      ground.velocityX = -(4 + 3* distance/500);
      if (ground.x<0)
      {
        ground.x = ground.width/2
      }
     // ground.velocityX=-5

      if((keyDown("space")&& girl.y >= 280)) 
      {
         girl.velocityY = -12;
      } 
      girl.velocityY = girl.velocityY +0.8;
      
      spawnCoins();
      spawnRocks();
      
      if(girl.isTouching(coinsGroup))
      {
        coins = coins+100;
        coinsGroup.destroyEach();
      }
      
      if(RocksGroup.isTouching(girl))
      {
        gameState = END;
      }
  
  }
  else if (gameState === END) 
  {
    
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      girl.velocityY = 0;
  
      girl.changeAnimation("collided",girl_collided);
     
      RocksGroup.setLifetimeEach(-1);
      coinsGroup.setLifetimeEach(-1);
     
      RocksGroup.setVelocityXEach(0);
      coinsGroup.setVelocityXEach(0);
     
      if(mousePressedOver(restart)) 
      {
        reset();
      }
   }
  
  
  girl.collide(invisibleGround);
  drawSprites();
  stroke("yellow")
  fill("yellow")
  textSize(20)
  text("COINS: "+ coins, 600,50);
  text("DISTANCE: "+ distance, 300,50);

  
  
  
  
  
}
function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var coin = createSprite(600,120,40,10);
    coin.velocityX = -(4 + 3*distance/500);
    coin.y = Math.round(random(200,250));
    coin.addImage(coinImg);
    coin.scale = 0.02;
    //coin.velocityX = -5;
    
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    coin.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //add each cloud to the group
    coinsGroup.add(coin);
  }
}

function spawnRocks() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var Rock = createSprite(600,120,40,10);
    Rock.velocityX = -(4 + 3*distance/500);
    Rock.y = Math.round(random(390,400));
    Rock.addImage(RockImg);
    Rock.scale = 0.05;
    //Rock.velocityX = -5;
    
     //assign lifetime to the variable
    Rock.lifetime = 200;
    
    
    
    //add each cloud to the group
    RocksGroup.add(Rock);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  girl.changeAnimation("Run__000.png",run);
  
  RocksGroup.destroyEach();
  coinsGroup.destroyEach();
  
  distance= 0;
  coins=0;
  level=0;
  
}