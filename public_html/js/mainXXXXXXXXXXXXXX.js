//声明变量
var words1="保利城商业街，风光无限好";
var words2="独自格调生活，尽享其中";
var words3="150米高楼，享受城市风景";
var words4="华丽楼群，尽显大都市氛围";
var words5="加把力，马上你要攀登到顶峰";
var words6="恭喜攀登到顶峰";
//游戏主层，进度条显示层，背景层，障碍层
var backLayer, loadingLayer, background, stageLayer,giftLayer,ruleLayer,startLayer,rankLayer;
var mBall;
var stageSpeed = 0, hero, layers = 0, layersText, hpText;
var floor_MOVE_STEP = 1;//floor左右移动速度
var STAGE_STEP = 1;//舞台背景滚动速度
var hero_move_step = 2; //主角左右移动速度
var currentfloor = 1;//当前所在楼层，用于切换背景，demo时候使用，正式环境不使用
var collision_detection = 0;//碰撞检测是否开启的标记 0 未开启，1 开启 确保主角在游戏开始的时候处于屏幕最下方
var floor_move_down = 0;//0未触发floor下移，1触发了floor下移
var game_level = 0.2;//floor下降速度
var floor_can_add = 0;//是否能添加floor 0不能 1可以
var finish_floor_number = 54;//通关楼层变量
var g = 0.08; //重力加速度
var imglist = {};
var floor_number = 7;//从屏幕上方增加的floor的楼层从7开始
var usernametxt;
var usermobiletxt;
var ruleshowed = 0;
var imgData = new Array(
{name: "hero", path: "./images/hero.png"},
{name: "wheel", path: "./images/wheel.png"},
{name: "floor0", path: "./images/floor0.png"},
{name: "stage1", path: "./images/stage1.jpg"},
{name: "stage2", path: "./images/stage2.jpg"},
{name: "stage3", path: "./images/stage3.jpg"},
{name: "stage4", path: "./images/stage4.jpg"},
{name: "stage5", path: "./images/stage5.jpg"},
{name: "ball1",path:"./images/ball1.png"},
{name: "ball2",path:"./images/ball2.png"},
{name: "ball3",path:"./images/ball3.png"},
{name: "ball4",path:"./images/ball4.png"},
{name: "ball5",path:"./images/ball5.png"},
{name: "gift",path:"./images/gift.png"},
{name: "center",path:"./images/center.jpg"},
{name:"building1",path:"./images/building1.png"},
{name:"topback",path:"./images/topback.jpg"},
{name:"topword",path:"./images/topword.png"},
{name:"index",path:"./images/index.jpg"},
{name:"rule",path:"./images/rule.png"},
{name:"start",path:"./images/start.png"},
{name:"rank",path:"./images/rank.png"}
);

function main() {
    //设置游戏全屏显示 手机全屏，PC不全屏
    if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)){
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        LSystem.screen(LStage.FULL_SCREEN);
    }
    //游戏主层初始化
    
    backLayer = new LSprite();
    ruleLayer = new LSprite();
    startLayer = new LSprite();
    rankLayer = new LSprite();
    //增加背景层
    addChild(backLayer);
    //增加规则按钮
    addChild(ruleLayer);
    //增加开始按钮
    addChild(startLayer);
    //增加排行按钮
    addChild(rankLayer);
    //FPS show
//    var fps = new FPS();
//    fps.y =460;
//    addChild(fps);
    //进度条读取层初始化
    loadingLayer = new LoadingSample2(50);
    backLayer.addChild(loadingLayer);
    LLoadManage.load(
            imgData,
            function(progress) {
                loadingLayer.setProgress(progress);
            }, gameInit
            );
}
//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(result) {
    //取得图片读取结果
    imglist = result;
    //移除进度条层
    backLayer.removeChild(loadingLayer);
    loadingLayer = null;
    var indeximg = new LBitmapData(imglist["index"]);
    var indexmap = new LBitmap(indeximg);
    backLayer.addChild(indexmap);
    var ruleimg = new LBitmapData(imglist["rule"]);
    var rulemap = new LBitmap(ruleimg);
    rulemap.x = 236;
    rulemap.y = 417;
    ruleLayer.addChild(rulemap);
    var startimg = new LBitmapData(imglist["start"]);
    var startmap = new LBitmap(startimg);
    startmap.x = 23;
    startmap.y = 418;
    startLayer.addChild(startmap);
    var rankimg = new LBitmapData(imglist["rank"]);
    var rankmap = new LBitmap(rankimg);
    rankmap.x = 140;
    rankmap.y = 418;
    rankLayer.addChild(rankmap);
    //显示游戏标题
    var title = new LTextField();
    title.y = 100;
    title.size = 30;
    title.color = "#ffffff";
    title.text = "保利城--勇攀高峰";
    title.x = (LGlobal.width - title.getWidth()) / 2;
    //显示说明文
    var txtClick = new LTextField();
    txtClick.size = 18;
    txtClick.color = "#ffffff";
    txtClick.text = "点击页面开始游戏";
    txtClick.x = (LGlobal.width - txtClick.getWidth()) / 2;
    txtClick.y = 245;
    
    //添加点击事件，点击画面则游戏开始
    startLayer.addEventListener(LMouseEvent.MOUSE_UP, function(event) {
        gameStart(false);
    });
    ruleLayer.addEventListener(LMouseEvent.MOUSE_UP, function(event) {
        if(ruleshowed==0){
            showGameRule();
        }
    });
    rankLayer.addEventListener(LMouseEvent.MOUSE_UP, function(event) {
        window.location.href="http://play.suuci.com/order.do";
    });
    //按键激活游戏
    //LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
}
//按键激活游戏
function onkeydown() {
    LEvent.removeEventListener(LGlobal.window, LKeyboardEvent.KEY_DOWN, onkeydown);
    gameStart(false);
}

function showGameRule(){
    ruleshowed=1;
    var ruledialog = new LSprite();
    backLayer.addChild(ruledialog);
    ruledialog.graphics.drawRect(4, '#ff8800', [0, 0, 300, 250], true, '#ffffff');
    ruledialog.x = (LGlobal.width - ruledialog.getWidth()) * 0.5;
    ruledialog.y = (LGlobal.height - ruledialog.getHeight()) * 0.5;
    var txt;
    txt = new LTextField();
    txt.setWordWrap(true);
    txt.x = 10;
    txt.y = 10;
    txt.width = 280;
    txt.size = 8;
    txt.text = "规则：\n1、每攀登一楼，获得100积分，共51楼，如实提交信息，积分方有效；\n2、玩家通过右上角分享功能，可生成唯一标识链接，发至任何地方，可获得500积分；有人通过该链接玩游戏并成功提交成绩，可获得100积分/人；\n3、游戏中每成功截获一个礼包，奖励200积分；\n4、玩家可重复多次提交成绩，兑奖时取最好成绩；\n5、玩家提交的姓名和电话号码为兑换奖品的唯一识别标识，请如实填写；\n6、兑奖时间为8月25日--9月10日，奖品有限，兑完为止；\n7、兑奖地点为  保利城营销中心，联系电话： \n8、主办方拥有本活动的最终解释权";
    ruledialog.addChild(txt);
    ruledialog.addEventListener(LMouseEvent.MOUSE_UP, function(event) {
        ruleshowed=0;
        ruledialog.die();
        ruledialog.removeAllChild();
    });
}



function wallInit() {
    //var bitmapDataUp = new LBitmapData(imglist["floor3"]);
    var bitmapDataTopBack = new LBitmapData(imglist["topback"]);
    var bitmapDataTopWord = new LBitmapData(imglist["topword"]);
    //var bitmapUp;
    var bitmapTopBack;
    var bitmapTopWord;
    bitmapTopBack = new LBitmap(bitmapDataTopBack);
    bitmapTopWord = new LBitmap(bitmapDataTopWord);
    bitmapTopWord.scaleY=0.5;
    bitmapTopWord.scaleX=0.5;
    bitmapTopWord.x = 100;
    bitmapTopBack.scaleY=0.6;
    addChild(bitmapTopBack);
    addChild(bitmapTopWord);

}
//游戏画面初始化
function gameStart(restart) {
    game_level = 0.2;
    //背景层清空
    backLayer.die();
    backLayer.removeAllChild();
    ruleLayer.die();
    ruleLayer.removeAllChild();
    startLayer.die();
    startLayer.removeAllChild();
    background = new Background();
    backLayer.addChild(background);



    stageInit();

    showInit();
    wallInit();
    hero = new Chara();
    hero.x = 140;
    hero.y = LGlobal.height - 50;
    hero.hp = hero.maxHp;
    backLayer.addChild(hero);
    backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
    backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, mousedown);
    backLayer.addEventListener(LMouseEvent.MOUSE_UP, mouseup);

    if (!LGlobal.canTouch && !restart) {
        LEvent.addEventListener(window, LKeyboardEvent.KEY_DOWN, down);
        LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, up);
    }
}
function showInit() {
    layersText = new LTextField();
    layersText.x = 10;
    layersText.y = 20;
    layersText.size = 15;
    layersText.weight = "bolder";
    layersText.color = "#ffff00";
    layersTextGift = new LTextField();
    layersTextGift.x = 10;
    layersTextGift.y = 40;
    layersTextGift.size = 15;
    layersTextGift.weight = "bolder";
    layersTextGift.color = "#ffff00";
    backLayer.addChild(layersText);

    backLayer.addChild(layersTextGift);
}
function showView(value) {
    layersText.text = value;
    layersTextGift.text = "您获取了 "+hero.giftscore+" 分的礼物!";
    if (!hero)
        return;
}
function mouseup(event) {
    if (!hero)
        return;
    hero.moveType = null;
    hero.changeAction();
}
function mousedown(event) {
    if (event.offsetY <= hero.y) {
        down({keyCode: 32});
    } else {
        if (event.offsetX <= LGlobal.width * 0.5) {
            down({keyCode: 37});
        } else {
            down({keyCode: 39});
        }
    }
}
function up(event) {
    if (!hero)
        return;
    hero.moveType = null;
    hero.changeAction();
}
function down(event) {
    if (!hero || hero.moveType)
        return;
    if (event.keyCode == 37) {
        hero.moveType = "left";
    } else if (event.keyCode == 39) {
        hero.moveType = "right";
    } else if (event.keyCode == 32) {//空格跳跃
        hero.onFloor = null;
        if (hero.speed < 0.1 && hero.upOrDown !== 1) {
            hero.moveType = "jump";
            hero.isJump = true;
            hero.upOrDown = 1;

        }
    }
    hero.changeAction();
}


function onframe() {
    mBall.onframe();
    hero.isJump = false;
    
    if (hero.score == finish_floor_number ){//通关判断
         gameOver();
          return;
    }
    if (hero.score>50){
        showView('第'+hero.score+'楼 '+words6);
        game_level=1;
    }else if(hero.score>40){
        showView('第'+hero.score+'楼 '+words5);
        game_level=0.9;
    }else if(hero.score>30){
        showView('第'+hero.score+'楼 '+words4);
        game_level = 0.8;
    }else if(hero.score>20){
        showView('第'+hero.score+'楼 '+words3);
        game_level = 0.7;
    }else if(hero.score>10){
        showView('第'+hero.score+'楼 '+words2);
        game_level = 0.5;
    }else{
        showView('第'+hero.score+'楼 '+words1);
    }
    //game_level = 0.7;
    if (floor_move_down == 1) {
        background.run();
    }
    if (hero.y > LGlobal.height || (floor_move_down == 1 && hero.y > 428)) {
        gameOver();
        return;
    }

    if (!hero)
        return;
    var key = null, found = false;

    //礼物处理
    for(key in giftLayer.childList){
        var _child = giftLayer.childList[key];
        
        if (_child.y > LGlobal.height) {
            giftLayer.removeChild(_child);
            _child = null;
            return;
        }
        _child.onframe();
        if(collisionCheck(hero.x,hero.y,40,50,_child.x,_child.y,20,20)){
            hero.giftscore+=200;
            giftLayer.removeChild(_child);
            _child = null;
            return;
        }
    }

    //跳板处理
    for (key in stageLayer.childList) {
        var _child = stageLayer.childList[key];
        //如果floor移动到屏幕之外则remove掉该floor，屏幕顶部增加一个floor
        if (_child.y > LGlobal.height) {
//                    hero.y = LGlobal.height -50;
            _child.child = null;
            stageLayer.removeChild(_child);
            _child= null;
            addStage();
            return;
        }
        //碰撞判断
        if (!found && collision_detection !== 0 &&
                hero.x + 30 >= _child.x && hero.x <= _child.x + 90 &&
                hero.y + 50 >= _child.y + _child.hy && hero._charaOld + 50 <= _child.y + _child.hy + 1) {
            hero.addScore(_child.index);
            hero.isJump = false;
            hero.upOrDown = 2;
            hero.changeAction();
            _child.child = hero;
            hero.speed = 0;
            hero.y = _child.y - 49 + _child.hy;
            hero.onFloor = _child;
            _child.hitRun();
            found = true;
            floor_move_down = 1;
        } else {
            _child.child = null;

        }
        _child.onframe();
    }
    if (!found) {
        hero.onFloor = null;
    }

    if (hero.isJump)
        hero.anime.setAction(1, 0);
    if (hero) {
        hero.onframe();
    }
    //showView();
    collision_detection = 1;
}
function gameOver() {
    collision_detection = 0;
    floor_number = 7;
    floor_move_down = 0;
    stageLayer.removeAllChild();
    backLayer.die();
    var overLayer = new LSprite();
    backLayer.addChild(overLayer);
    overLayer.graphics.drawRect(4, '#ff8800', [0, 0, 300, 200], true, '#ffffff');
    overLayer.x = (LGlobal.width - overLayer.getWidth()) * 0.5;
    overLayer.y = (LGlobal.height - overLayer.getHeight()) * 0.5;
    var txt;
    txt = new LTextField();
    txt.x = 30;
    txt.y = 12;
    txt.text = "姓名:";
    overLayer.addChild(txt);
    txt = new LTextField();
    txt.x = 30;
    txt.y = 36;
    txt.text = "电话:";
    overLayer.addChild(txt);
    usernametxt = new LTextField();
    usernametxt.setType(LTextFieldType.INPUT);
    usernametxt.x = 80;
    usernametxt.y = 14;
    overLayer.addChild(usernametxt);
    usermobiletxt = new LTextField();
    usermobiletxt.setType(LTextFieldType.INPUT);
    usermobiletxt.x = 80;
    usermobiletxt.y = 40;
    overLayer.addChild(usermobiletxt);
    txt = new LTextField();
    txt.text = "恭喜！！！您攀登到了"+hero.score+"层，获得";
    txt.x = 30;
    txt.y = 70;
    overLayer.addChild(txt);
    txt = new LTextField();
    txt.color = "#FF0000";
    var finalscore = hero.score*100+hero.giftscore;
    txt.text = finalscore+" 积分";
    txt.size = 20;
    if (hero.score == finish_floor_number ){//通关判断
         txt.text = "保利城最高优惠!";
    }
    txt.x = 80;
    txt.y = 90;
    overLayer.addChild(txt);
    txt = new LTextField();
    txt.text = "您可以到我们的营销中心领取您的礼品！您提交后";
    txt.x = 10;
    txt.y = 120;
    txt.size = 10;
    overLayer.addChild(txt);
    txt = new LTextField();
    txt.text = "还可以分享朋友额外将获得500积分";
    txt.x = 40;
    txt.y = 140;
    txt.size = 10;
    overLayer.addChild(txt);
    var button01 = new LButtonSample1("提交");
    button01.x = 50;
    button01.y = 160;
    button01.scaleY=0.8;
    button01.scaleX=0.8;
    button01.addEventListener(LMouseEvent.MOUSE_DOWN,submitscore);
    overLayer.addChild(button01);
    var button02 = new LButtonSample1("重来");
    button02.x = 130;
    button02.y = 160;
    button02.scaleY=0.8;
    button02.scaleX=0.8;
    button02.addEventListener(LMouseEvent.MOUSE_DOWN, tryagain);
    overLayer.addChild(button02);  
    var button03 = new LButtonSample1("排名");
    button03.x = 200;
    button03.y = 160;
    button03.scaleY=0.8;
    button03.scaleX=0.8;
    button03.addEventListener(LMouseEvent.MOUSE_DOWN, showrank);
    overLayer.addChild(button03);  
}
function stageInit() {
    stageLayer = new LSprite();
    giftLayer = new LSprite();
    backLayer.addChild(stageLayer);
    backLayer.addChild(giftLayer);
    mBall = new Ball();
    mBall.y=380;
    mBall.x=Math.random() * 280;
    backLayer.addChild(mBall);
    layers = 0;
    var mstage;
    for (i = 1; i < 7; i++) {
        mstage = new Floor01();
        mstage.index = i;
        mstage.x = Math.random() * 280;
        mstage.y = 80 * (6-i);
        stageLayer.addChild(mstage);
    }

}
function addStage() {
    var mstage;
    mstage = new Floor01();
    mstage.y = 0;
    mstage.x = Math.random() * 280;
    mstage.index = floor_number;
    if(floor_number > finish_floor_number){
        return;
    }
    floor_number++;
    if (floor_move_down == 1) {
        stageLayer.addChild(mstage);
    }
        //判断是否增加礼物 每10层掉5个礼物
    if(floor_number%4==0){
        addGift();
    }
    
    
    if(floor_number == 10){
        background.change(1);
    }else if(floor_number == 20){
        background.change(2);
    }else if(floor_number == 30){
        background.change(3);
    }else if(floor_number == 40){
        background.change(4);
    }
}

function addGift(){
    var mgift = new Gift();
    mgift.y = -20;
    mgift.x = Math.random() * 280;
    giftLayer.addChild(mgift);
    
}

//矩形碰撞检测
function collisionCheck(x1,y1,w1,h1,x2,y2,w2,h2){
    var tempx = Math.abs((x1+w1/2)-(x2+w2/2));
    var tempw = (w1+w2)/2;
    var tempy = Math.abs((y1+h1/2)-(y2+h2/2));
    var temph = (h1+h2)/2;
    if(tempx<tempw&&tempy<temph){
        return true;
    }else{
        return false;
    }
}


function submitscore(){
     var totalscore = hero.giftscore+hero.score*100;
    var username = usernametxt.text;
    var usermobile = usermobiletxt.text;
      /* alert("提交分数处理 总分"+totalscore+"姓名："+username+"电话："+usermobile);*/
	 
	document.getElementById('totalscore').value=totalscore;   //赋值给隐藏域字段
	document.getElementById('username').value=username;   //赋值给隐藏域字段
	document.getElementById('usermobile').value=usermobile;   //赋值给隐藏域字段
	document.getElementById('floor').value=hero.score;   //赋值给隐藏域字段
//alert(document.getElementById('mid').value);
document.form1222.submit();                     //提交表单

}

function tryagain(){
    gameStart(true);
}


function showrank(){
    alert("跳转到排行榜");
}
























