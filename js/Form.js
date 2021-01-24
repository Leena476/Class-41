class Form {

  constructor () {
    this.input = createInput("Name");
    this.button = createButton('PLAY!');
    this.greeting = createElement('h2');
    this.title = createElement('h1');
    this.restart = createButton("Restart");
  }

  hide () {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display () {

    this.title.html("Multiplayer Car Racing Game");
    this.title.style("color","white");
    this.title.style("font-size","65px");
    this.title.position(displayWidth/2 - 420, 0);

    this.restart.position(displayWidth-150, 20);
    this.restart.style("color","blue");
    this.restart.style("background","lightcyan");
    this.restart.style("width","110px");
    this.restart.style("height","50px");
    this.restart.style("font-size","20px");

    this.input.position(displayWidth/2 - 200 , displayHeight/2 - 80);
    this.input.style("color","blue");
    this.input.style("background","lightcyan");
    this.input.style("width","420px");
    this.input.style("height","60px");
    this.input.style("font-size","40px");

    this.button.position(displayWidth/2-60, displayHeight/2+150);
    this.button.style("color","purple");
    this.button.style("background","lightpurple");
    this.button.style("width","150px");
    this.button.style("height","100px");
    this.button.style("font-size","40px");

    this.button.mousePressed(()=>{

      this.input.hide();
      this.button.hide();

      player.name = this.input.value();

      playerCount+=1;
      player.index = playerCount;

      player.update();
      player.updateCount(playerCount);

      this.greeting.html("Hello " + player.name + "!");
      this.greeting.style("color","lightblue");
      this.greeting.style("font-size","50px");
      this.greeting.position(displayWidth/2 - 150, displayHeight/6);

      textSize(40);
      fill("darkblue");
      textFont("Georgia");
      text("Waiting for more players to join...",50,displayHeight-150);

    })

    this.restart.mousePressed(()=>{

      database.ref("/").update({
        players:null
      })

      game.update(0);
      player.updateCount(0);
      player.updateRank(0);

    })

  }

}