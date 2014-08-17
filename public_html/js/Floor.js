function Floor(){
	base(this,LSprite,[]);
	var self = this;
	self.child = null;
	self.hy = 0;
        self.way = 0;//0左移动，1右移动
	self.setView();
        self.index = 0;
}
Floor.prototype.setView = function(){}
Floor.prototype.onframe = function (){
	var self = this;
        if(floor_move_down ==1 ){
            self.y += STAGE_STEP*game_level;
        }
        
	if(self.child){
            if(self.child.x + 30 < self.x && self.child.x > self.x + 90){
                self.child.onFloor=null;
            }
            if(self.way == 0){
                self.child.x += floor_MOVE_STEP;
            }else if(self.way == 1){
                self.child.x -= floor_MOVE_STEP;
            }
            self.child._charaOld = self.child.y;
	}
        
        if(self.way == 0){
            self.x += floor_MOVE_STEP;
            if(self.x>LGlobal.width-100){
                self.way = 1;
            }
        }else if(self.way == 1){
            self.x -= floor_MOVE_STEP;
            if(self.x < -10){
                self.way = 0;
            }
        }
};
Floor.prototype.hitRun = function (){};
function Floor01(){
	base(this,Floor,[]);
}
Floor01.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imglist["floor0"]));
	self.addChild(self.bitmap);
}