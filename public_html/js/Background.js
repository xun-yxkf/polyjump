function Background(){
	base(this,LSprite,[]);
	var self = this;
        self.bitmapData1 = new LBitmapData(imglist["center"]);
	self.bitmap1 = new LBitmap(self.bitmapData1);
	self.addChild(self.bitmap1);
        
        self.stageData1 = new LBitmapData(imglist["stage1"]);
        self.stagemap1 = new LBitmap(self.stageData1);
        self.stagemap1.y = -self.bitmap1.getHeight();
        self.addChild(self.stagemap1);
        
        self.stageData2 = new LBitmapData(imglist["stage2"]);
        self.stagemap2 = new LBitmap(self.stageData2);
        self.stagemap2.y = -self.bitmap1.getHeight();
        self.addChild(self.stagemap2);
        
        self.stageData3 = new LBitmapData(imglist["stage3"]);
        self.stagemap3 = new LBitmap(self.stageData3);
        self.stagemap3.y = -self.bitmap1.getHeight();
        self.addChild(self.stagemap3);
        
        self.stageData4 = new LBitmapData(imglist["stage4"]);
        self.stagemap4 = new LBitmap(self.stageData4);
        self.stagemap4.y = -self.bitmap1.getHeight();
        self.addChild(self.stagemap4);
        
        self.buildingData1 = new LBitmapData(imglist["building1"]);
	self.buildingmap1 = new LBitmap(self.buildingData1);
        self.buildingmap1.y = -self.bitmap1.getHeight()*8;
	self.addChild(self.buildingmap1);
        
//        self.buildingData2 = new LBitmapData(imglist["building2"]);
//	self.buildingmap2 = new LBitmap(self.buildingData2);
//        self.buildingmap2.y = -self.bitmap1.getHeight()*19;
//	self.addChild(self.buildingmap2);
//        
//        self.buildingData3 = new LBitmapData(imglist["building3"]);
//	self.buildingmap3 = new LBitmap(self.buildingData3);
//        self.buildingmap3.y = -self.bitmap1.getHeight()*29;
//	self.addChild(self.buildingmap3);
//        
//        self.buildingData4 = new LBitmapData(imglist["building4"]);
//	self.buildingmap4 = new LBitmap(self.buildingData4);
//        self.buildingmap4.y = -self.bitmap1.getHeight()*39;
//	self.addChild(self.buildingmap4);
//        
//        self.buildingData5 = new LBitmapData(imglist["building5"]);
//	self.buildingmap5 = new LBitmap(self.buildingData5);
//        self.buildingmap5.y = -self.bitmap1.getHeight()*49;
//	self.addChild(self.buildingmap5);
}
Background.prototype.run = function(){
	var self = this;
	self.buildingmap1.y += STAGE_STEP*game_level;
//        self.buildingmap2.y += STAGE_STEP*game_level;
//        self.buildingmap3.y += STAGE_STEP*game_level;
//        self.buildingmap4.y += STAGE_STEP*game_level;
//        self.buildingmap5.y += STAGE_STEP*game_level;
//        console.log(self.buildingmap1.y);
//        console.log(self.buildingmap2.y);
//        console.log(self.buildingmap3.y);
//        console.log(self.buildingmap4.y);
//        console.log(self.buildingmap5.y);
}
Background.prototype.change = function(stagenumber){
    var self = this;
    switch(stagenumber)
    {
        case 1:
            self.stagemap1.y = 0;
            self.removeChild(self.bitmap1);
            self.bitmap1 = null;
            break;
        case 2:
            self.stagemap2.y = 0;
            self.removeChild(self.stagemap1);
            self.stagemap1 = null;
            break;
        case 3:
            self.removeChild(self.stagemap2);
            self.stagemap2 = null;
            self.stagemap3.y = 0;
            break;
        case 4:
            self.removeChild(self.stagemap3);
            self.stagemap3 = null;
            self.stagemap4.y = 0;
            break;
        default:

    }
}