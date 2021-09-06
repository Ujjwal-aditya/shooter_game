class Player
{
    constructor()
    {
        this.index = null;
        this.x = 0;
        this.name = null;
        this.score = 0;
        this.range = 100;
    }

    update()
    {
        var playerIndex = "players/player" + this.index;

        database.ref(playerIndex).set({
            name : this.name,
            x : this.x,
            score : this.score,
            range : this.range
            });
    }

    getCount()
    {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",function(data){
            playerCount = data.val();
        })
    }

    updateCount(count)
    {
        database.ref('/').update({
            playerCount : count
        })
    }

    getScore()
    {
        if(player.index==1)
        {   
            var scoreRef = database.ref('players/player1/score');
            scoreRef.on("value",function(data){
            score1 = data.val();
        })
        }
        else if(player.index==2)
        {
            var scoreRef = database.ref('players/player1/score');
            scoreRef.on("value",function(data){
            score2 = data.val();
        })  
        }   
    }
    static getPlayerInfo()
    {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value",(data)=>{
            allPlayers = data.val();
        })
    }
}