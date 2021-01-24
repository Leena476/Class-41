var database,playerCount,rank;
var gameState = 0;
var distance = 0;
var allPlayers;
var form,player,game;
var cars,car1,car2,car3,car4;
var rightSide,leftSide;
var bgImg,car1Img,car2Img,car3Img,car4Img,trackImg,goldImg,silverImg,bronzeImg;

function preload () {
    bgImg = loadImage("images/bg.jpg");
    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");
    trackImg = loadImage("images/track.jpg");
    goldImg = loadImage("images/gold.png");
    silverImg = loadImage("images/silver.png");
    bronzeImg = loadImage("images/bronze.png");
}

function setup () {
  createCanvas(displayWidth-20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw () {
  
  if(playerCount === 4){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){

    if(rank === 4) {
      game.end();
    } 
    
    else {
      textSize(33);
      textAlign(CENTER);
      stroke(0);
      strokeWeight(2);
      fill(255);
      textFont("georgia");
      text("You're on the podium! Wait for the rest of the players to cross the finish line...",displayWidth/2-100,displayHeight/2);
    }

  }

}