/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Gift(){
	base(this,LSprite,[]);
	var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["gift"]));
	self.addChild(self.bitmap);
}

Gift.prototype.onframe = function (){
    var self = this;
    self.y += STAGE_STEP;
}