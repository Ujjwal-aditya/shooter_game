var database,positionX,backGroundImg,gameState=0,playerCount,player,shooter1,shooter2;
var allPlayers,game,form,shooter,bullets = [],bulletCount=0,allBullets,targetSprite,
targetGroup1, targetGroup2 , bulletGroup,score1,score2;
function preload()
{

}

function setup()
{
    createCanvas(displayWidth-20,displayHeight-20);
    shooter1 = createSprite(displayWidth/2,50,50,10);  
    shooter2 = createSprite(displayWidth/2,displayHeight-50,50,10);
    shooter1.visibility = false;
    shooter2.visibility = false;
    database = firebase.database();
    score1 = 0;
    score2 = 0;
    game = new Game();
    game.getState();
    Bullet.getCount();
    game.start();

    targetGroup1 = new Group();
    targetGroup2 = new Group();
    bulletGroup  = new Group();

}

function draw()
{
    background("yellow");
    player.getScore();
    //console.log(score1);
    //console.log(score2);
    console.log("gamestate="+gameState);
    if(playerCount==2)
        {
            game.update(1);
        }

    if(gameState==1)
    {
        clear();
        game.play();
        
    }
    if(gameState==2)
    {
        game.end();
    }
    
    text("SCORE1="+score1,displayWidth/2-50,100);
    text("SCORE2="+score2,displayWidth/2-50,displayHeight-100);
}





