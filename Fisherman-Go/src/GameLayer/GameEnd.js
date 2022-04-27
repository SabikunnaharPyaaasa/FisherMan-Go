var GameEnd=cc.Layer.extend({
    preload_resources:null,
	init:function(gameStatus)
    {
        if (this._super())
        {
            this.preload_resources=[];
            this.preload_resources.push(folderGameResource+"sky.png");
            this.preload_resources.push(folderGameResource+"lock_box.png");
            this.preload_resources.push(folderGameResource+"coin_stock_box.png");
            this.preload_resources.push(folderGameResource+"victory.png");
            this.preload_resources.push(folderGameResource+"next-level.png");
            this.preload_resources.push(folderGameResource+"collect.png");
            this.preload_resources.push(folderGameResource+"gold_coin.png");
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
            this.coinCollect();
            this.goldCoin();
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
        this.imgBackground=cc.Sprite.create(folderGameResource+"sky.png");
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
        this.imgVictory.setPosition(cc.winSize.width/2, cc.winSize.height/2+this.imgBackground.getScaleY()*250);
        this.addChild(this.imgVictory,5);
        this.imgVictory_action = cc.ScaleTo.create(.6, this.imgVictory.getScaleX()-this.imgVictory.getScaleX()/4,this.imgVictory.getScaleY()-this.imgVictory.getScaleY()/4);
        this.imgVictory_action1 = cc.ScaleTo.create(.6, this.imgVictory.getScaleX(),this.imgVictory.getScaleY());
        this.imgVictory_sequence = cc.RepeatForever.create(cc.Sequence.create(this.imgVictory_action,this.imgVictory_action1));
        this.imgVictory.runAction( this.imgVictory_sequence);
    },
    goldCoin:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgGoldCoin=cc.Sprite.create(folderGameResource+"gold_coin.png");
        this.imgGoldCoin.setScale(appDelegate.deviceScaleFloat);
        this.imgGoldCoin.setPosition(cc.winSize.width/2, cc.winSize.height-this.imgBackground.getScaleY()*30);
        this.addChild(this.imgGoldCoin,2);
        
    },
    gold:function()
    {
        for(var i=0;i<10;i++){
        this.imgGold=cc.Sprite.create(folderGameResource+"gold_coin.png");
        this.imgGold.setScale(this.imgLockBox.getScale()/2);
        this.imgGold.setPosition(cc.winSize.width/2+i%2*this.imgGold.getScaleX()*5, cc.winSize.height/2-i%3*this.imgGold.getScaleY()*5);
        this.addChild(this.imgGold,2);
        this.imgGold_action = cc.MoveBy.create(i*.2, cc.p(this.imgGoldCoin.getPositionX()-this.imgGoldCoin.getScaleX()*450,this.imgGoldCoin.getPositionY()-this.imgGoldCoin.getScaleY()*80));
        this.imgGold_action1 = cc.FadeOut.create(.1);
        this.imgGold.runAction(cc.Sequence.create(this.imgGold_action,this.imgGold_action1));
        }

    },
    coinCollect:function()
    {
        var strCollectImage = folderGameResource+"collect.png";
        this.btnCollect = new ccui.Button();
        this.btnCollect.loadTextures(strCollectImage);
        this.btnCollect.setScale(this.imgLockBox.getScale());
        
        this.btnCollect.setPosition(this.imgCoinBox.getPositionX(), this.imgCoinBox.getPositionY()-this.btnCollect.getScaleY()*600);
        this.btnCollect.addTouchEventListener(this.btnCollectCallBack,this);
        this.addChild(this.btnCollect,3);
        this.btnCollect_action = cc.ScaleTo.create(.6, this.btnCollect.getScaleX()+this.btnCollect.getScaleX()/4,this.btnCollect.getScaleY()+this.btnCollect.getScaleY()/4);
        this.btnCollect_action1 = cc.ScaleTo.create(.6, this.btnCollect.getScaleX(),this.btnCollect.getScaleY());
        this.btnCollect_sequence = cc.RepeatForever.create(cc.Sequence.create(this.btnCollect_action,this.btnCollect_action1));
        this.btnCollect.runAction( this.btnCollect_sequence);      
    },
    btnCollectCallBack:function()
    {
        this.gold();
        this.nextLevel();   
        this.runAction(cc.Sequence.create(cc.delayTime(.5),cc.CallFunc.create(this.rewardNumber, this)));
        this.btnCollect.removeFromParent(); 
    },
    nextLevel:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        var strNextImage = folderGameResource+"next-level.png";
        this.btnNextLevel = new ccui.Button();
        this.btnNextLevel.loadTextures(strNextImage);
        this.btnNextLevel.setScale(appDelegate.deviceScaleFloat);
        this.btnNextLevel.setPosition(this.imgCoinBox.getPositionX(), this.imgCoinBox.getPositionY()-this.imgBackground.getScaleY()*300);
        this.btnNextLevel.addTouchEventListener(this.btnNextLevelCallBack,this);
        this.addChild(this.btnNextLevel,3);

        this.btnNextLevel_action = cc.ScaleTo.create(.6, this.btnNextLevel.getScaleX()+this.btnNextLevel.getScaleX()/4,this.btnNextLevel.getScaleY()+this.btnNextLevel.getScaleX()/4);
        this.btnNextLevel_action1 = cc.ScaleTo.create(.6, this.btnNextLevel.getScaleX(),this.btnNextLevel.getScaleY());
        this.btnNextLevel_sequence = cc.RepeatForever.create(cc.Sequence.create(this.btnNextLevel_action,this.btnNextLevel_action1));
        this.btnNextLevel.runAction( this.btnCollect_sequence);      
    },
    btnNextLevelCallBack:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        appDelegate.gameLevel = appDelegate.gameLevel+1;
        console.log(appDelegate.gameLevel);
        appDelegate.gameHud.loadStorePanel(Panel.GamePlay);
        this.removeFromParent();
       
        
    },
    rewardNumber:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        if(appDelegate.gameLevel==0)
        {
            this.lblrewardNumber=new cc.LabelTTF("+$750");
        }
        if(appDelegate.gameLevel==1)
        {
            this.lblrewardNumber=new cc.LabelTTF("+$1000");
        }
        
        this.lblrewardNumber.setFontSize(70);
        this.lblrewardNumber.setPosition(this.imgGoldCoin.getPositionX()+this.imgBackground.getScaleX()*100,this.imgGoldCoin.getPositionY());
        this.lblrewardNumber.setColor(cc.color(255,255,255));
        this.addChild(this.lblrewardNumber,3);
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
