var GameNodeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var appDelegate=AppDelegate.sharedApplication();
        
        var gameHud=GameHud.create();
        this.addChild(gameHud,1);
        appDelegate.gameHud=gameHud;

        var gameNode=GameNode.create();
        this.addChild(gameNode);
        appDelegate.gameNode=gameNode;
    }
});

var GameNode = cc.Layer.extend({
    preload_resources:null,
    init:function()
    {
        if (this._super())
        {
            this.preload_resources=[];
            this.preload_resources.push(folderGameResource+"sky.png");
            this.preload_resources.push(folderGameResource+"bg.png");
            this.preload_resources.push(folderGameResource+"fisherman.png");
            this.preload_resources.push(folderGameResource+"effect.png");
            this.preload_resources.push(folderGameResource+"gold_coin.png");
            this.preload_resources.push(folderGameResource+"fishing-rod.png");
            this.preload_resources.push(folderGameResource+"awesome.png");
            this.preload_resources.push(folderGameResource+"wow.png");
            // this.preload_resources.push(folderGameResource+"score-board.png");
            // this.preload_resources.push(folderGameResource+"cage.png");
            // this.preload_resources.push(folderGameResource+"yellow-spark.png");
            // this.preload_resources.push(folderGameResource+"red-spark.png");
            // this.preload_resources.push(folderGameResource+"blue-spark.png");
            // this.preload_resources.push(folderGameResource+"green-spark.png");
            // this.preload_resources.push(folderGameResource+"top.png");
            for (var i = 1; i < 27; i++) 
            {
                this.preload_resources.push(folderGameProducts+"fish-"+i+".png");
            }
            
            

            StorePanel.preLoadResource(this.preload_resources,this);
        
            return true;
        }
        return false;
    },

    loadCompleted:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        appDelegate.gameHud.loadStorePanel(Panel.GamePlay);

    },
});

GameNode.create=function()
{
    var ret = new GameNode();
    if(ret && ret.init()) {
        return ret;
    } else {
        delete ret;
        ret=null;
        return null;
    }
}