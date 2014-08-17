/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Ball(){
	base(this,LSprite,[]);
	var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["ball1"]));
	self.addChild(self.bitmap);
}

Ball.prototype.onframe = function (){
    var self = this;
    self.y -= STAGE_STEP*0.2;
    //到达顶部修改气球
    if(self.y<=-150){
        self.removeAllChild();
        var index = parseInt(4*Math.random());
        switch(index){
            case 1:
              self.bitmap = new LBitmap(new LBitmapData(imglist["ball2"]));
              break;
            case 2:
              self.bitmap = new LBitmap(new LBitmapData(imglist["ball3"]));
              break;
            case 3:
              self.bitmap = new LBitmap(new LBitmapData(imglist["ball4"]));
              break;
            default:
              self.bitmap = new LBitmap(new LBitmapData(imglist["ball1"]));
        }
        self.addChild(self.bitmap);
        self.y=480;
        self.x=Math.random() * 280;
    }
}