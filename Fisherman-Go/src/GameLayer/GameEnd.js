var GameEnd=cc.Layer.extend({
    preload_resources:null,
	init:function(gameStatus)
    {
        if (this._super())
        {
            this.preload_resources=[];
            this.preload_resources.push(folderGameResource+"bg.jpg");
            this.preload_resources.push(folderGameResource+"lock_box.png");
            this.preload_resources.push(folderGameResource+"coin_stock_box.png");
            this.preload_resources.push(folderGameResource+"victory.png");
            // this.preload_resources.push(folderGameResource+"star.png");
            // this.preload_resources.push(folderGameResource+"white-spark.png");
            this.gameStatus = gameStatus;
            
            
            StorePanel.preLoadResource(this.preload_resources,this);
           
            return true;
        }
        return false;
    },
    loadCompleted:function()
    {
  
        if(this.gameStatus=="win")
        {
            console.log("lose");
            this.setBackground();
            this.loadBackgroundColor();
            this.lockBox();
            this.coinStockBox();
            this.victory();
            // this.loadStar();
            // this.loadWhiteSpark();
            // this.nextButton();
            // this.showGameLevel();
            //this.setTouchEnable();
       
        }
        // if(this.gameStatus=="lose")
        // {
            
            
        // }
    },
    setBackground:function()
    {
        this.imgBackground=cc.Sprite.create(folderGameResource+"bg.jpg");
        this.imgBackground.setScaleX(cc.winSize.width/this.imgBackground.getContentSize().width);
        this.imgBackground.setScaleY(cc.winSize.height/this.imgBackground.getContentSize().height);
        this.imgBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgBackground);
        //this.imgBackground.setOpacity(0);
    },
    loadBackgroundColor:function()
    {
       this.colorBackground=cc.LayerColor.create(cc.color.black,cc.winSize.width,cc.winSize.height);
       this.colorBackground.setOpacity(0.5*255);
       this.colorBackground.setPosition(cc.p(0 , 0));
       this.addChild(this.colorBackground,1);
    },
    lockBox:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgLockBox=cc.Sprite.create(folderGameResource+"lock_box.png");
        if(appDelegate.deviceScaleFloat==0.5){
        this.imgLockBox.setScale(appDelegate.deviceScaleFloat*4);
        }
        else if(appDelegate.deviceScaleFloat>0.5){
            this.imgLockBox.setScale(appDelegate.deviceScaleFloat);
            }
        this.imgLockBox.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgLockBox,2);
        this.imgLockBox_action1 = cc.MoveBy.create(1,0,0);
        this.imgLockBox_action2 = cc.FadeOut.create(.01);
        this.imgLockBox_sequence = cc.Sequence.create(this.imgLockBox_action1,this.imgLockBox_action2);
        this.imgLockBox.runAction(this.imgLockBox_sequence);
    },

    coinStockBox:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgCoinBox=cc.Sprite.create(folderGameResource+"coin_stock_box.png");
        this.imgCoinBox.setScale(this.imgLockBox.getScale());
        this.imgCoinBox.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgCoinBox,2);
        this.imgCoinBox.setOpacity(0);
        this.imgCoinBox_action1 = cc.MoveBy.create(1,0,0);
        this.imgCoinBox_action2 = cc.FadeIn.create(.01);
        this.imgCoinBox_sequence = cc.Sequence.create(this.imgCoinBox_action1,this.imgCoinBox_action2);
        this.imgCoinBox.runAction(this.imgCoinBox_sequence);
    },
    victory:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgVictory=cc.Sprite.create(folderGameResource+"victory.png");
        this.imgVictory.setScale(appDelegate.deviceScaleFloat/4);
        this.imgVictory.setPosition(cc.winSize.width/2, cc.winSize.height/2+this.imgBackground.getScaleY()*100);
        this.addChild(this.imgVictory,5);
        this.imgVictory_action = cc.ScaleTo.create(.6, this.imgVictory.getScaleX()-this.imgVictory.getScaleX()/4,this.imgVictory.getScaleY()-this.imgVictory.getScaleY()/4);
        this.imgVictory_action1 = cc.ScaleTo.create(.6, this.imgVictory.getScaleX(),this.imgVictory.getScaleY());
        this.imgVictory_sequence = cc.RepeatForever.create(cc.Sequence.create(this.imgVictory_action,this.imgVictory_action1));
        this.imgVictory.runAction( this.imgVictory_sequence);
    },
});

GameEnd.create=function(gameStatus)
{
    var ret = new GameEnd();
    if(ret && ret.init(gameStatus)) {
        return ret;
    } else {
        delete ret;
        ret=null;
        return null;
    }
}
