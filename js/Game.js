class Game {
  
  constructor () {}

  getState () {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  update (state) {
    database.ref('/').update({
      gameState: state
    })
  }

  async start () {
    
    background(bgImg);
    
    if(gameState === 0){

      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form();
      form.display();

    }

    car1 = createSprite(100,200);
    car1.addImage(car1Img);

    car2 = createSprite(300,200);
    car2.addImage(car2Img);

    car3 = createSprite(500,200);
    car3.addImage(car3Img);

    car4 = createSprite(700,200);
    car4.addImage(car4Img);

    cars = [car1,car2,car3,car4];

  }

  play () {

    form.hide();

    background(70,70,70);

    rightSide = createSprite(1190,500,30,7000);
    rightSide.visible = false;

    leftSide = createSprite(260,500,30,7000);
    leftSide.visible = false;

    image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);

    Player.getPlayerInfo();
    player.getRank();
    
    if(allPlayers !== undefined){
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 150;
      var y;
      var pos;

      for (var plr in allPlayers) {

        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;

        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].y = y;

        pos = x + allPlayers[plr].value;
        cars[index-1].x = pos;
        
        if(cars[index-1].isTouching(leftSide))
          player.value += 20;

        if(cars[index-1].isTouching(rightSide))
          player.value -= 20;

        if(index === player.index){

          fill("red")
          ellipse(pos,y,60,60);

          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;

        }

        fill(255);
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name,pos,y+80);
        
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.value -= 10;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.value += 10;
      player.update();
    }

    if (keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }

    if(player.distance >= 4250){

      camera.position.x = 720;
      camera.position.y = 810;

      gameState = 2;

      rank++;
      player.rank = rank;

      player.update();
      player.updateRank(rank);

    }

    car1.bounceOff(car2);
    car1.bounceOff(car3);
    car1.bounceOff(car4);
    car2.bounceOff(car3);
    car2.bounceOff(car4);
    car3.bounceOff(car4);

    drawSprites();

  }

  end () {

    background("lightblue");

    image(goldImg,displayWidth/2-150,displayHeight/2-50,350,700);
    image(silverImg,displayWidth/2-720,displayHeight/2,400,700);
    image(bronzeImg,displayWidth/2+300,displayHeight/2,400,700);

    for (var plr in allPlayers) {

      textSize(50);
      stroke(0);
      strokeWeight(2);
      
      if(allPlayers[plr].rank === 1){
        fill("gold");
        text(allPlayers[plr].name,displayWidth/2-50,displayHeight+240);
      } else if(allPlayers[plr].rank === 2){
        fill("grey")
        text(allPlayers[plr].name,displayWidth/2-600,displayHeight+300);
      } else if(allPlayers[plr].rank === 3){
        fill("brown")
        text(allPlayers[plr].name,displayWidth/2+430,displayHeight+300);
      } else if(allPlayers[plr].rank === 4){
        fill("yellow");
        text("4th Place: " + allPlayers[plr].name,displayWidth/2-150,displayHeight+310);
      }
      
    }

  }

}