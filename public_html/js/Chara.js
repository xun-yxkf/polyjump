function Chara() {
    base(this, LSprite, []);
    var self = this;
    var list = LGlobal.divideCoordinate(960, 50, 1, 24);
    var data = new LBitmapData(imglist["hero"], 0, 0, 40, 50);
    self.moveType = null;
    self._charaOld = self.y;
    self.hp = 3;
    self.maxHp = 3;
    self.hpCtrl = 0;
    self.isJump = false;
    self.index = 0;
    self.speed = 0;//主角上下移动速度
    self.jumpdistance = 110;
    self.upOrDown = 0;//0 向下运动 1 向上运动 2 停在floor上面;
    self.onFloor = null;
    self.score = 0;//跳跃楼层得分
    self.giftscore = 0;//礼物得分
    self.anime = new LAnimation(self, data, [
        [list[0][0]],
        [list[0][1]],
        [list[0][2], list[0][3], list[0][4], list[0][5], list[0][6], list[0][7], list[0][8], list[0][9], list[0][10], list[0][11], list[0][12]],
        [list[0][13], list[0][14], list[0][15], list[0][16], list[0][17], list[0][18], list[0][19], list[0][20], list[0][21], list[0][22], list[0][23]]
    ]);
}
Chara.prototype.addScore = function(index){
    var self = this;
    if(index>self.score){
        self.score = index;
    }
}

Chara.prototype.onframe = function() {
    var self = this;
    if (self.moveType == "jump") {
        self.upOrDown = 1;
        hero.speed = 4;
        self.moveType = null;
    }
    if (self.upOrDown == 2) {//主角静止
        if (hero.onFloor == null) {//判断主角是否在floor上，不在则向下运动
            self.upOrDown == 0;
            self._charaOld = self.y;
            self.y += self.speed;
            self.speed += g;
            if (self.speed > 20)
                self.speed = 20;
        }
    } else if (self.upOrDown == 0) {//向下运动轨迹
        self._charaOld = self.y;
        self.y += self.speed;
        self.speed += g;
        if (self.speed > 20)
            self.speed = 20;

        if (self.y > LGlobal.height - 50) {
            self.speed = 0;
            self.upOrDown == 2;
        }
    } else {//向上运动轨迹
        self._charaOld = self.y;
        self.y -= self.speed;
        self.speed -= g;
        if (self.speed < 0) {
            self.speed = 0;
            self.upOrDown = 0;
        }
    }

    if (self.moveType == "left") {
        self.x -= hero_move_step;
    } else if (self.moveType == "right") {
        self.x += hero_move_step;
    }
    if (self.x < -10) {
        self.x = -10;
    } else if (self.x > LGlobal.width - 30) {
        self.x = LGlobal.width - 30;
    }
    if (self.y > LGlobal.height) {
        self.hp = 0;
    }
    self.addHp();
    if (self.index-- > 0) {
        return;
    }
    self.index = 10;
    self.anime.onframe();
};
Chara.prototype.addHp = function() {
    var self = this;
    if (self.hp < self.maxHp) {
        self.hpCtrl += STAGE_STEP;
        if (self.hpCtrl >= LGlobal.height * 2) {
            self.hpCtrl = 0;
            self.hp++;
        }
    }
}
Chara.prototype.changeAction = function() {
    var self = this;
    if (self.moveType == "left") {
        self.anime.setAction(3);
    } else if (self.moveType == "right") {
        self.anime.setAction(2);
    } else if (self.isJump) {
        self.anime.setAction(1, 0);
    } else {
        self.anime.setAction(0, 0);
    }
}
