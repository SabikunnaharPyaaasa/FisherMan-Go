var GamePlay = cc.Layer.extend({
    allFish:[],
    loadFish:[
        "fish-1",
        "fish-2",
        "fish-3",
        "fish-4",
        "fish-5",
        "fish-6",
        "fish-7",
        "fish-8",
        "fish-9",
        "fish-10",
        "fish-11",
        "fish-12",
        "fish-13",
        "fish-14",
        "fish-15",
    ],
    level:[
        [
            ["bg",0,0],
            ["bg-3",0,0],
            ["fisherman",200,10],
            ["fish-1"],
            ["fish-2"],
            ["fish-3"],
            ["fish-4"],
            ["fish-5"],
            ["fish-6"],
            ["fish-7"],
        ]
    ],
    
    init:function()
    {
        if (this._super())
        {
            this.loadBackground();
            this.loadFisherman();
            this.loadAllFish();
         
            
        
            
            return true;
        }
        return false;
    },

    loadBackground:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        var strBackground = this.level[appDelegate.gameLevel][0][0];
        this.imgBackground=cc.Sprite.create(folderGameResource+strBackground+".jpg");
        this.imgBackground.setScaleX(cc.winSize.width/this.imgBackground.getContentSize().width);
        this.imgBackground.setScaleY(cc.winSize.height/this.imgBackground.getContentSize().height);
        this.imgBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgBackground);
        this.imgBackground.runAction(cc.Sequence.create(cc.delayTime(2),cc.MoveBy.create(3,0,410*this.imgBackground.getScaleY())));

        var strBackground2 = this.level[appDelegate.gameLevel][1][0];
        this.imgBackground2=cc.Sprite.create(folderGameResource+strBackground2+".png");
        this.imgBackground2.setScaleX(cc.winSize.width/this.imgBackground2.getContentSize().width);
        this.imgBackground2.setScaleY(cc.winSize.height/this.imgBackground2.getContentSize().height);
        this.imgBackground2.setPosition(cc.winSize.width/2, -205*this.imgBackground.getScaleY());
        this.addChild(this.imgBackground2);
        this.imgBackground2.runAction(cc.Sequence.create(cc.delayTime(2),cc.MoveBy.create(3,0,410*this.imgBackground.getScaleY())));
        
    },
    loadFisherman:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        var strFisherman = this.level[appDelegate.gameLevel][2][0];
        this.imgFisherman=cc.Sprite.create(folderGameResource+strFisherman+".png");
        this.imgFisherman.setScale(appDelegate.deviceScaleFloat);
        this.imgFisherman.setPosition(cc.winSize.width/2-this.imgBackground.getScaleX()*this.level[appDelegate.gameLevel][2][1], cc.winSize.height/2-this.imgBackground.getScaleY()*this.level[appDelegate.gameLevel][2][2]);
        this.addChild(this.imgFisherman);
        var move_action = cc.MoveBy.create(2,200*this.imgBackground.getScaleX(),0);
        this.imgFisherman.runAction(move_action);
        this.imgFisherman.runAction(cc.Sequence.create(cc.delayTime(2),cc.MoveBy.create(3,0,410*this.imgBackground.getScaleY())));
        
    },  
    tapToLabel:function()
    {

    },
    loadAllFish:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        //Fish 1
        var strFish1 = this.level[appDelegate.gameLevel][3][0];
        this.imgFish1=cc.Sprite.create(folderGameProducts+strFish1+".png");
        this.imgFish1.setScale(appDelegate.deviceScaleFloat/6);
        this.imgFish1.setPosition(cc.winSize.width+100*this.imgBackground.getScaleX(), -120*this.imgBackground.getScaleY());
        this.addChild(this.imgFish1);
        var move_action = cc.MoveBy.create(10,0,400*this.imgBackground.getScaleY());
        this.imgFish1.runAction(move_action);
        var fish1_action1 = cc.MoveBy.create(8,-900*this.imgBackground.getScaleX(),20);
        var fish1_action2 = cc.ScaleTo.create(.01,-this.imgFish1.getScaleX(),this.imgFish1.getScaleY())
        var fish1_action3 = cc.MoveBy.create(8,900*this.imgBackground.getScaleX(),-20);
        var fish1_action4 = cc.ScaleTo.create(.01,this.imgFish1.getScaleX(),this.imgFish1.getScaleY())
        var fish1_sequence = cc.RepeatForever.create(cc.Sequence.create(fish1_action1,fish1_action2,fish1_action3,fish1_action4));
        this.imgFish1.runAction(fish1_sequence);

        //Fish 2
        var strFish2 = this.level[appDelegate.gameLevel][4][0];
        this.imgFish2=cc.Sprite.create(folderGameProducts+strFish2+".png");
        this.imgFish2.setScale(appDelegate.deviceScaleFloat/6);
        this.imgFish2.setPosition(cc.winSize.width+150*this.imgBackground.getScaleX(), -120*this.imgBackground.getScaleY());
        this.addChild(this.imgFish2);
        var move_action = cc.MoveBy.create(10,0,350*this.imgBackground.getScaleY());
        this.imgFish2.runAction(move_action);
        var fish2_action1 = cc.MoveBy.create(7,-950*this.imgBackground.getScaleX(),20);
        var fish2_action2 = cc.ScaleTo.create(.01,-this.imgFish2.getScaleX(),this.imgFish2.getScaleY())
        var fish2_action3 = cc.MoveBy.create(7,950*this.imgBackground.getScaleX(),-20);
        var fish2_action4 = cc.ScaleTo.create(.01,this.imgFish2.getScaleX(),this.imgFish2.getScaleY())
        var fish2_sequence = cc.RepeatForever.create(cc.Sequence.create(fish2_action1,fish2_action2,fish2_action3,fish2_action4));
        this.imgFish2.runAction(fish2_sequence);

        //Fish 3
        var strFish3 = this.level[appDelegate.gameLevel][5][0];
        this.imgFish3=cc.Sprite.create(folderGameProducts+strFish3+".png");
        this.imgFish3.setScale(appDelegate.deviceScaleFloat/6);
        this.imgFish3.setPosition(cc.winSize.width+200*this.imgBackground.getScaleX(), -140*this.imgBackground.getScaleY());
        this.addChild(this.imgFish3);
        var move_action = cc.MoveBy.create(10,0,320*this.imgBackground.getScaleY());
        this.imgFish3.runAction(move_action);
        var fish3_action1 = cc.MoveBy.create(6,-1000*this.imgBackground.getScaleX(),20);
        var fish3_action2 = cc.ScaleTo.create(.01,-this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
        var fish3_action3 = cc.MoveBy.create(6,1000*this.imgBackground.getScaleX(),-20);
        var fish3_action4 = cc.ScaleTo.create(.01,this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
        var fish3_sequence = cc.RepeatForever.create(cc.Sequence.create(fish3_action1,fish3_action2,fish3_action3,fish3_action4));
        this.imgFish3.runAction(fish3_sequence);

        //Fish 4
        var strFish4 = this.level[appDelegate.gameLevel][6][0];
        this.imgFish4=cc.Sprite.create(folderGameProducts+strFish4+".png");
        this.imgFish4.setScale(appDelegate.deviceScaleFloat/6);
        this.imgFish4.setPosition(cc.winSize.width+160*this.imgBackground.getScaleX(), -160*this.imgBackground.getScaleY());
        this.addChild(this.imgFish4);
        var move_action = cc.MoveBy.create(11,0,300*this.imgBackground.getScaleY());
        this.imgFish4.runAction(move_action);
        var fish4_action1 = cc.MoveBy.create(7,-1000*this.imgBackground.getScaleX(),20);
        var fish4_action2 = cc.ScaleTo.create(.01,-this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
        var fish4_action3 = cc.MoveBy.create(7,1000*this.imgBackground.getScaleX(),-20);
        var fish4_action4 = cc.ScaleTo.create(.01,this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
        var fish4_sequence = cc.RepeatForever.create(cc.Sequence.create(fish4_action1,fish4_action2,fish4_action3,fish4_action4));
        this.imgFish4.runAction(fish4_sequence);
        // for(var i = 0;i<this.loadFish.length;i++)
        // {
        //     if(i<9)
        //     {
        //         var strFish = this.loadFish[i];
        //         this.imgFish=cc.Sprite.create(folderGameProducts+strFish+".png");
        //         this.imgFish.setScale(appDelegate.deviceScaleFloat/6);
        //         this.imgFish.setPosition(cc.winSize.width+this.imgBackground.getScaleX()*50+(i%2)*150, -100*this.imgBackground.getScaleY()-i*170);
        //         this.addChild(this.imgFish);
        //         var move_action = cc.MoveBy.create(12,0,400*this.imgBackground.getScaleY());
        //         this.imgFish.runAction(move_action);
        //         //this.imgFish.runAction(cc.Sequence.create(cc.delayTime(6),cc.MoveBy.create(8,-850*this.imgBackground.getScaleX(),0)));
        //         var fish_move1 = cc.MoveBy.create(8,-1100*this.imgBackground.getScaleX(),0);
        //         var fish_scale1 = cc.ScaleTo.create(.01,-this.imgFish.getScaleX(),this.imgFish.getScaleY())
        //         var fish_move2 = cc.MoveBy.create(8,1100*this.imgBackground.getScaleX(),0);
        //         var fish_scale2 = cc.ScaleTo.create(.01,this.imgFish.getScaleX(),this.imgFish.getScaleY())
        //         var fish_sequence = cc.RepeatForever.create(cc.Sequence.create(fish_move1,fish_scale1,fish_move2,fish_scale2));
        //         this.imgFish.runAction(fish_sequence);
        //         //this.imgFish.runAction(cc.Sequence.create(cc.delayTime(6),fish_sequence));
        //     }
        //     if(i>=9)
        //     {
        //         cc.log("dfd")
        //         var strFish = this.loadFish[i];
        //         this.imgFish2=cc.Sprite.create(folderGameProducts+strFish+".png");
        //         this.imgFish2.setScale(appDelegate.deviceScaleFloat*1.5);
        //         //this.imgFish2.setPosition(300,300);
        //         this.imgFish2.setPosition(this.imgFish.getPositionX()*5+(i%2)*150, -100*this.imgBackground.getScaleY()-i*170);
        //         this.addChild(this.imgFish2);

        //         var move2_action = cc.MoveBy.create(2,0,400*this.imgBackground.getScaleY());
        //         this.imgFish2.runAction(move2_action);

        //         // var fish2_scale0 = cc.ScaleTo.create(.01,-this.imgFish.getScaleX(),this.imgFish.getScaleY())
        //         // var fish2_move1 = cc.MoveBy.create(8,1000*this.imgBackground.getScaleX(),0);
        //         // var fish2_scale1 = cc.ScaleTo.create(.01,-this.imgFish.getScaleX(),this.imgFish.getScaleY())
        //         // var fish2_move2 = cc.MoveBy.create(8,-1000*this.imgBackground.getScaleX(),0);
        //         // var fish2_scale2 = cc.ScaleTo.create(.01,this.imgFish.getScaleX(),this.imgFish.getScaleY())
        //         // var fish2_sequence = cc.RepeatForever.create(cc.Sequence.create(fish2_scale0,fish2_move1,fish2_scale1,fish2_move2,fish2_scale2));
        //         // this.imgFish2.runAction(fish2_sequence);
        //     }
        // }
    },
    setTouchEnable: function () {
        cc.eventManager.addListener(
            {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function (touch, event) {
                    return event.getCurrentTarget().onTouchBegan(touch, event);
                },
                onTouchMoved: function (touch, event) {
                    event.getCurrentTarget().onTouchMoved(touch, event);
                },
                onTouchEnded: function (touch, event) {
                    event.getCurrentTarget().onTouchEnded(touch, event);
                }
            },
            this
        );
    },
    onTouchBegan:function(touch, event)
	{  
        console.log("Began");
		return true;
	},
	onTouchMoved:function(touch, event)
	{
        console.log("Moved");
        
	},
	onTouchEnded:function(touch, event)
	{
        console.log("Ended");
	},
    

    gameOver:function()
    {
    //     var appDelegate = AppDelegate.sharedApplication();
        
    //     if(this.scoreDiamond>10 && this.scoreGold>10 && this.scoreRuby>10)
    //     {
    //         var gameStatus = "win";
    //     }
    //     else{
    //         var gameStatus = "lose";
    //     }
     }

});


GamePlay.sharedInstance=null;
    
GamePlay.sharedApplication=function() 
{
    if(GamePlay.sharedInstance==null)
    {
        GamePlay.sharedInstance=GamePlay.create();
    }
    return GamePlay.sharedInstance;
}


GamePlay.create=function()
{
    var ret = new GamePlay();
    if(ret && ret.init()) {
        return ret;
    } else {
        delete ret;
        ret=null;
        return null;
    }
}