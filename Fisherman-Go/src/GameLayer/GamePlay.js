var GamePlay = cc.Layer.extend({
    allFish:[],
    targetFish:0,
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
            [3]//target fish
        ],
        [
            ["bg",0,0],
            ["bg-3",0,0],
            ["fisherman",200,10],
            ["fish-6"],
            ["fish-7"],
            ["fish-9"],
            ["fish-10"],
            ["fish-11"],
            ["fish-21"],
            ["fish-22"],
            [4]
        ],
    ],
    
    init:function()
    {
        if (this._super())
        {
            this.loadBackground();
            this.loadFisherman(); 
            this.setTouchEnable(); 
            //this.loadFishingRod();
            var appDelegate=AppDelegate.sharedApplication();
            if(appDelegate.gameLevel==1)
            {
                this.showGameLevel();
            }
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
        //

        var strBackground2 = this.level[appDelegate.gameLevel][1][0];
        this.imgBackground2=cc.Sprite.create(folderGameResource+strBackground2+".png");
        this.imgBackground2.setScaleX(cc.winSize.width/this.imgBackground2.getContentSize().width);
        this.imgBackground2.setScaleY(cc.winSize.height/this.imgBackground2.getContentSize().height);
        this.imgBackground2.setPosition(cc.winSize.width/2, -205*this.imgBackground.getScaleY());
        this.addChild(this.imgBackground2);
        //

        var strTapToEffect=folderGameResource+"effect.png";
        var btnTapToFishing=cc.MenuItemImage.create(strTapToEffect,strTapToEffect,this.tapToFishingCallBack,this);
        this.menuTapToFishing=cc.Menu.create(btnTapToFishing);
        this.menuTapToFishing.setScale(appDelegate.deviceScaleFloat/2);
        this.menuTapToFishing.setTag(0);
        this.menuTapToFishing.setPosition(cc.winSize.width/2-150*this.imgBackground.getScaleX(),cc.winSize.height/2-170*this.imgBackground.getScaleY());
        this.addChild(this.menuTapToFishing);

        this.lblTapToFishing=new cc.LabelTTF("Tap To Fishing", "Arial");
        this.lblTapToFishing.setFontSize(50);
        this.lblTapToFishing.setPosition(this.menuTapToFishing.getPosition().x+250*appDelegate.deviceScaleFloat,this.menuTapToFishing.getPosition().y+430*appDelegate.deviceScaleFloat);
        this.lblTapToFishing.setColor(cc.color(255,255,0));
        this.addChild(this.lblTapToFishing);
        
    },
    tapToFishingCallBack:function()
    {
        this.menuTapToFishing.runAction(cc.FadeOut.create(.2));
        this.lblTapToFishing.runAction(cc.FadeOut.create(.2));
        if(this.menuTapToFishing.getTag()==0)
        {
            this.imgBackground.runAction(cc.Sequence.create(cc.delayTime(.2),cc.MoveBy.create(3,0,410*this.imgBackground.getScaleY())));
            this.imgBackground2.runAction(cc.Sequence.create(cc.delayTime(.2),cc.MoveBy.create(3,0,410*this.imgBackground.getScaleY())));
            this.imgFisherman.runAction(cc.Sequence.create(cc.delayTime(.2),cc.MoveBy.create(3,0,410*this.imgBackground.getScaleY())));
            this.menuTapToFishing.setTag(1);
            this.loadAllFish();
            this.fishTargetlabel();  
            this.runAction(cc.Sequence.create(cc.delayTime(.01),cc.CallFunc.create(this.loadFishingRod, this)));

        }
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
       
        
    },  
    fishTargetlabel:function()
    {
        var appDelegate=AppDelegate.sharedApplication();

        this.lblFishTarget=new cc.LabelTTF(this.targetFish+"/"+this.level[appDelegate.gameLevel][10][0], "Arial");
        this.lblFishTarget.setFontSize(70);
        this.lblFishTarget.setPosition(cc.winSize.width-40*this.imgBackground.getScaleY(),cc.winSize.height/2);
        this.lblFishTarget.setColor(cc.color(0,0,0));
        this.addChild(this.lblFishTarget);

        var strFish1 = this.level[appDelegate.gameLevel][4][0];
        this.imgFishIcon=cc.Sprite.create(folderGameProducts+strFish1+".png");
        this.imgFishIcon.setScale(appDelegate.deviceScaleFloat/10);
        this.imgFishIcon.setPosition(this.lblFishTarget.getPositionX()+60*this.imgBackground.getScaleX(), this.lblFishTarget.getPositionY()+2*this.imgBackground.getScaleY());
        this.imgFishIcon.setTag(1);
        this.addChild(this.imgFishIcon);

        
    },
    loadFishingRod:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        var strFishingRod = this.level[appDelegate.gameLevel][4][0];
        this.imgFishingRod=cc.Sprite.create(folderGameResource+"fishing-rod.png");
        this.imgFishingRod.setScale(appDelegate.deviceScaleFloat);
        this.imgFishingRod.setPosition(cc.winSize.width/2+140*this.imgBackground.getScaleX(), cc.winSize.height/2+0*this.imgBackground.getScaleY());
        this.imgFishingRod.setTag(1);
        this.addChild(this.imgFishingRod);
        this.imgFishingRod.runAction(cc.MoveBy.create(1,0,500*appDelegate.deviceScaleFloat));
        this.imgFishingRod.runAction(cc.ScaleTo.create(1,this.imgFishingRod.getScaleX(),this.imgFishingRod.getScaleY()*1.5));

    },
    loadAllFish:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        //Fish 1
        for(var i=0;i<4;i++)
        {
            var strFish1 = this.level[appDelegate.gameLevel][3][0];
            this.imgFish1=cc.Sprite.create(folderGameProducts+strFish1+".png");
            this.imgFish1.setScale(appDelegate.deviceScaleFloat/6);
            this.imgFish1.setPosition(cc.winSize.width+100*this.imgBackground.getScaleX()+i*70*this.imgBackground.getScaleX(), -240*this.imgBackground.getScaleY()+i*40*this.imgBackground.getScaleY());
            this.imgFish1.setTag(1);
            this.addChild(this.imgFish1);
            this.allFish.push(this.imgFish1);

            var move_action = cc.MoveBy.create(8,0,420*this.imgBackground.getScaleY());
            this.imgFish1.runAction(move_action);
            var fish1_action1 = cc.MoveBy.create(8-i,-1050*this.imgBackground.getScaleX(),0);
            var fish1_action2 = cc.ScaleTo.create(.01,-this.imgFish1.getScaleX(),this.imgFish1.getScaleY())
            var fish1_action3 = cc.MoveBy.create(8-i,1050*this.imgBackground.getScaleX(),0);
            var fish1_action4 = cc.ScaleTo.create(.01,this.imgFish1.getScaleX(),this.imgFish1.getScaleY())
            var fish1_sequence = cc.RepeatForever.create(cc.Sequence.create(fish1_action1,fish1_action2,fish1_action3,fish1_action4));
            this.imgFish1.runAction(fish1_sequence);
        }

        //Fish 2
        var strFish2 = this.level[appDelegate.gameLevel][4][0];
        this.imgFish2=cc.Sprite.create(folderGameProducts+strFish2+".png");
        this.imgFish2.setScale(appDelegate.deviceScaleFloat/6);
        this.imgFish2.setPosition(cc.winSize.width+150*this.imgBackground.getScaleX(), -120*this.imgBackground.getScaleY());
        this.imgFish2.setTag(2);
        this.addChild(this.imgFish2);
        this.allFish.push(this.imgFish2);

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
        this.imgFish3.setTag(3);
        this.addChild(this.imgFish3);
        this.allFish.push(this.imgFish3);

        var move_action = cc.MoveBy.create(10,0,320*this.imgBackground.getScaleY());
        this.imgFish3.runAction(move_action);
        var fish3_action1 = cc.MoveBy.create(6,-1000*this.imgBackground.getScaleX(),20);
        var fish3_action2 = cc.ScaleTo.create(.01,-this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
        var fish3_action3 = cc.MoveBy.create(6,1000*this.imgBackground.getScaleX(),-20);
        var fish3_action4 = cc.ScaleTo.create(.01,this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
        var fish3_sequence = cc.RepeatForever.create(cc.Sequence.create(fish3_action1,fish3_action2,fish3_action3,fish3_action4));
        this.imgFish3.runAction(fish3_sequence);

        //Fish 4
        for(var i=0;i<3;i++)
        {
            var strFish4 = this.level[appDelegate.gameLevel][6][0];
            this.imgFish4=cc.Sprite.create(folderGameProducts+strFish4+".png");
            this.imgFish4.setScale(appDelegate.deviceScaleFloat/6);
            this.imgFish4.setPosition(cc.winSize.width+160*this.imgBackground.getScaleX()+i*50, -160*this.imgBackground.getScaleY()+i*100);
            this.imgFish4.setTag(4);
            this.addChild(this.imgFish4);
            this.allFish.push(this.imgFish4);

            var move_action = cc.MoveBy.create(11,0,300*this.imgBackground.getScaleY());
            this.imgFish4.runAction(move_action);
            var fish4_action1 = cc.MoveBy.create(7+i,-1000*this.imgBackground.getScaleX(),20);
            var fish4_action2 = cc.ScaleTo.create(.01,-this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
            var fish4_action3 = cc.MoveBy.create(7+i,1000*this.imgBackground.getScaleX(),-20);
            var fish4_action4 = cc.ScaleTo.create(.01,this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
            var fish4_sequence = cc.RepeatForever.create(cc.Sequence.create(fish4_action1,fish4_action2,fish4_action3,fish4_action4));
            this.imgFish4.runAction(fish4_sequence);
        }

        //Fish 5
        var strFish5 = this.level[appDelegate.gameLevel][7][0];
        this.imgFish5=cc.Sprite.create(folderGameProducts+strFish5+".png");
        this.imgFish5.setScale(appDelegate.deviceScaleFloat/6);
        this.imgFish5.setPosition(cc.winSize.width+90*this.imgBackground.getScaleX(), -160*this.imgBackground.getScaleY());
        this.imgFish5.setTag(5);
        this.addChild(this.imgFish5);
        this.allFish.push(this.imgFish5);

        var move_action = cc.MoveBy.create(11,0,230*this.imgBackground.getScaleY());
        this.imgFish5.runAction(move_action);
        var fish5_action1 = cc.MoveBy.create(6,-900*this.imgBackground.getScaleX(),20);
        var fish5_action2 = cc.ScaleTo.create(.01,-this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
        var fish5_action3 = cc.MoveBy.create(6,900*this.imgBackground.getScaleX(),-20);
        var fish5_action4 = cc.ScaleTo.create(.01,this.imgFish3.getScaleX(),this.imgFish3.getScaleY())
        var fish5_sequence = cc.RepeatForever.create(cc.Sequence.create(fish5_action1,fish5_action2,fish5_action3,fish5_action4));
        this.imgFish5.runAction(fish5_sequence);
     
    },

    showGameLevel:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        this.lblGameLevel=new cc.LabelTTF("Game Level "+(appDelegate.gameLevel+1), "Arial");
        this.lblGameLevel.setFontSize(80);
        this.lblGameLevel.setPosition(cc.winSize.width/2,cc.winSize.height-this.imgBackground.getScaleY()*50);
        this.lblGameLevel.setColor(cc.color(0,0,0));
        this.addChild(this.lblGameLevel,3);
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
        var totalItem =0;
        console.log("Began");
        this.imgFishingRod.setPositionX(touch.getLocationX());
        var appDelegate = AppDelegate.sharedApplication();
        for(var i=0;i<this.allFish.length;i++)
        {
            totalItem = totalItem+1;
            this.FishRect = this.allFish[i].getBoundingBox();
            this.startPoint = touch.getLocation();
            if(cc.rectContainsPoint(this.FishRect, this.startPoint)) 
                {
                    this.Fish = this.allFish[i];
                    cc.log(this.Fish.getTag());
                    if(this.Fish.getTag()!=0)
                    {
                        this.targetFish = this.targetFish+1;
                        this.lblFishTarget.setString(this.targetFish+"/"+this.level[appDelegate.gameLevel][10][0]);
                        this.rewardNumber(this.Fish.getPositionX(),this.Fish.getPositionY());
                        this.Fish.removeFromParent();
                        this.catchFish(this.imgFishingRod.getPositionX(),this.imgFishingRod.getPositionY());
                        this.Fish.setTag(0);
                        
                        if(this.targetFish==this.level[appDelegate.gameLevel][10][0])
                        {
                            this.imgBackground.runAction(cc.Sequence.create(cc.delayTime(.2),cc.MoveBy.create(3,0,-410*this.imgBackground.getScaleY())));
                            this.imgBackground2.runAction(cc.Sequence.create(cc.delayTime(.2),cc.MoveBy.create(3,0,-410*this.imgBackground.getScaleY())));
                            this.imgFisherman.runAction(cc.Sequence.create(cc.delayTime(.2),cc.MoveBy.create(3,0,-410*this.imgBackground.getScaleY())));
                            for(var j=0;j<this.allFish.length;j++)
                            {
                                this.allFish[j].runAction(cc.MoveBy.create(2,0,-420*this.imgBackground.getScaleY()));
                            }
                            this.runAction(cc.Sequence.create(cc.delayTime(2),cc.CallFunc.create(this.gameOver, this)));
                           
                        }
                    }
                } 
            
        }
        cc.log("totalItem "+totalItem);
		return true;
	},
	onTouchMoved:function(touch, event)
	{
        console.log("Moved");
        this.imgFishingRod.setPositionX(touch.getLocationX());
        
	},
	onTouchEnded:function(touch, event)
	{
        console.log("Ended");
	},
    catchFish:function(x,y)
    {
       
        var appDelegate = AppDelegate.sharedApplication();
        this.imgCatchFish=cc.Sprite.create(folderGameProducts+this.level[appDelegate.gameLevel][3][0]+".png");
        this.imgCatchFish.setScale(appDelegate.deviceScaleFloat/8);
        this.imgCatchFish.setPosition(x-250*appDelegate.deviceScaleFloat,y-1350*appDelegate.deviceScaleFloat);
        //this.imgFish.setTag(5);
        this.imgFishingRod.addChild(this.imgCatchFish);
        this.imgCatchFish.runAction(cc.RotateTo.create(.01,90));
    },
    rewardNumber:function(x,y)
    {
        var appDelegate=AppDelegate.sharedApplication();

        this.lblrewardNumber=new cc.LabelTTF("+250");
        this.lblrewardNumber.setFontSize(70);
        this.lblrewardNumber.setPosition(x,y);
        this.lblrewardNumber.setColor(cc.color(0,0,0));
        this.addChild(this.lblrewardNumber);
        var action_1 = cc.MoveBy.create(1,-10*this.imgBackground.getScaleX(),100*this.imgBackground.getScaleY());
        var action_2 = cc.FadeOut.create(.5);
        var sequence = cc.Sequence.create(action_1,action_2);
        this.lblrewardNumber.runAction(sequence);
    },
    

    gameOver:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        var gameStatus = "win";
        var gameEnd = GameEnd.create(gameStatus);
        appDelegate.gameHud.addChild(gameEnd,3);
        this.removeFromParent();
       
       
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