class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    shooter = [shooter1,shooter2];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    Bullet.getBulletInfo();
    if(allPlayers !== undefined)
    {
      background("yellow");
      shooter1.visibility = true;
      shooter2.visibility = true;
      var index = 0;
      var x;
      var bullet;
     
      for(var plr in allPlayers)
      {
        index = index + 1;
        x = allPlayers[plr].x;
       
        shooter[index-1].x = x;
        if(player.index == index && keyWentDown("SPACE"))
        {
          bullets.push(new Bullet(shooter[index-1].x,shooter[index-1].y));
          bulletCount +=1;
          Bullet.updateCount(bulletCount);
          Bullet.update(shooter[index-1].x,shooter[index-1].y);
        }
      }  
      if(allBullets !== undefined)
      {
        background("yellow");
        //var bulletIndex = 0;
        var bulletX;
        var bulletY;
        for(var blt in allBullets)
        {
          //index = index + 1;
          //if(allBullets[blt].y<=player.range)
          {
           // allBullets[blt].y = allBullets[blt].y+20;
            bulletX = allBullets[blt].x;
            bulletY = allBullets[blt].y;
            background("yellow");
            fill("blue");
            bullet = createSprite(bulletX,bulletY,10,10);
            //bullet.velocityY = 10;
            bulletGroup.add(bullet);
            
          }           
        } 
      }  
    }
    if(frameCount % 60 == 0)
    {
      if(player.index==1)
      {
        console.log("player1");
        console.log(player.range);
        //var randomY = Math.round(random(50,player.range+50));
        targetSprite = createSprite(20,player.range+50,10,10);
        switch(Math.round(random(1,2)))
        {
          case 1:targetSprite.x = 0;
          targetSprite.velocityX=15;
          break;
         
          case 2:targetSprite.x = width
          targetSprite.velocityX=-15;
          break;
        }
        targetSprite.lifetime = displayWidth/15;
        targetGroup1.add(targetSprite);
      }
      if(player.index==2)
      {
        console.log("player2");
        console.log(player.range);
       // var randomY = Math.round(random(displayHeight-50,displayHeight - 50 -player.range));
        targetSprite = createSprite(20,displayHeight-50-player.range,10,10);
        switch(Math.round(random(1,2)))
        {
          case 1:targetSprite.x = 0;
          targetSprite.velocityX=15;
          break;
         
          case 2:targetSprite.x = displayWidth;
          targetSprite.velocityX=-15;
          break;
        }
        targetSprite.lifetime = displayWidth/15;
        targetGroup2.add(targetSprite);
      }
    }
    if(bulletGroup.isTouching(targetGroup1))
    {
      bulletGroup.destroyEach();
      var bulletRef = database.ref("bullets");
      bulletRef.remove(); 
     // Firebase.remove('bullets');
      targetGroup1.destroyEach();
      player.score = player.score + 10;
      Bullet.updateCount(0);
      player.update();
    }
    if(bulletGroup.isTouching(targetGroup2))
    {
      bulletGroup.destroyEach();
      var bulletRef = database.ref("bullets");
      bulletRef.remove(); 
     // Firebase.remove('bullets');
      targetGroup2.destroyEach();
      player.score = player.score + 10;
      Bullet.updateCount(0);
      player.update();
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW))
    {
      player.x += 20;
    }
    if(keyIsDown(LEFT_ARROW))
    {
      player.x -= 20;
    }    
    player.update();
   
     drawSprites();
  }
  end()
  {
    console.log("end");
  }
}