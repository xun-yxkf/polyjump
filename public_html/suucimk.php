<!DOCTYPE html>
<!--
html5 游戏 保利城--勇攀高峰
author:维明 深圳速策网络-武汉信飞信息分公司
-->
<?
header("Content-Type:text/html;charset=utf-8"); 
$conn=mysql_connect ("localhost", "root", "x93lf04ks9q0m4a02flr");
mysql_select_db('imifang',$conn);  
mysql_query("set names utf8");
$id=trim($_REQUEST["id"]);
if($id!=""){
$fatherid=$id;
$sqlx="select num,score_other from c_add where id=$fatherid";//
$resultx=mysql_query($sqlx);
$rsx=mysql_fetch_array($resultx);
$score_otherx=$rsx["score_other"];
$numx=$rsx["num"];
///echo $numx;
//die();
if(($numx>2)&&($score_otherx<500)){
	//echo "update c_add set score_other=score_other+1000 where id=$fatherid";
	//die();
mysql_query("update c_add set score_other=score_other+500 where id=$fatherid");//如果分享后，有5次点击，那么算分享成功。
mysql_query("update c_add set allscore=score_other+score where id=$fatherid");///增加合计分数 方便排序
}

mysql_query("update c_add set num=num+1 where id=$fatherid");//增加某个人的浏览次数
}
else{
$fatherid="0";
}
$score=$_POST["totalscore"];
$title=$_POST["username"];
$tel=$_POST["usermobile"];
$fatherid=$_POST["fatherid"];
$floor=$_POST["floor"];
$mk=$_POST["mk"];
$timex=time()+8*3600;
if($mk=="mk"){
if(!stristr ($_SERVER['HTTP_REFERER'],"play.suuci.com")) {  
echo '非法操作';  
die();  
}  

	if($fatherid==""){
$fatherid="0";
	}
$sqlx="insert into c_add (title,tel,score,timex,fatherid,allscore,floor) values ('$title','$tel','$score','$timex','$fatherid','$score','$floor')";//
$resultx=mysql_query($sqlx);
$myid=mysql_insert_id();
//window.location.href="target.aspx"; 
if($fatherid!="0"){///如果是第一次点开，没有通过朋友圈点开。
mysql_query("update c_add set score_other=score_other+100 where id=$fatherid");
mysql_query("update c_add set allscore=score_other+score where id=$fatherid");///增加合计分数 方便排序
}
?>
<script>
//浏览器类型判定  
function getOs()   
{    
   if(navigator.userAgent.indexOf("MSIE")>0) {   
       return "IE"; //InternetExplor  
   }   
   else if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){   
        return "FF"; //firefox  
    }   
   else if(isSafari=navigator.userAgent.indexOf("Safari")>0) {   
         return "SF"; //Safari  
   }    
   else if(isCamino=navigator.userAgent.indexOf("Camino")>0){   
        return "C"; //Camino  
    }   
    else if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){   
         return "G"; //Gecko  
    }   
    else if(isMozilla=navigator.userAgent.indexOf("Opera")>=0){  
         return "O"; //opera  
   }else{  
        return 'Other';  
  }  
    
}   
  
function alert_br(){  
       var os=getOs();  
        if(os=='FF' || os=='SF'){  //FireFox、谷歌浏览器用这个  
           alert('记得立刻分享哦！分享马上奖励1000个积分！\n  微信分享点击右上角的分享竖型图标！\n 浏览器用户直接复制地址分享好友！\n  还等什么，点击确定后马上分享啦！\n 每次通过分享参与的玩家，发起分享的人还可以额外获得100个积分\n 分享越多 惊喜越多');  
        }else{   //IE系列用这个  
           alert('记得立刻分享哦！分享马上奖励1000个积分！\r\n  微信分享点击右上角的分享竖型图标！\r\n 浏览器用户直接复制地址分享好友！\r\n  还等什么，点击确定后马上分享啦！\r\n  每次通过分享参与的玩家，发起分享的人还可以额外获得100个积分\r\n  分享越多 惊喜越多');  
        }  
}  
alert_br(); 

	</script>";
<?
echo "<script>self.location='http://play.suuci.com/?id=".$myid."'</script>";
	

}
?>
<html>
    <head>
        <title>保利城--勇攀高峰 玩游戏送奖品，积分越高奖品越大！</title>
		<meta name="keywords" content="保利城--勇攀高峰 玩游戏送奖品，积分越高奖品越大！" />
<meta name="description" content="保利城--勇攀高峰 玩游戏送奖品，积分越高奖品越大！" />

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <script type="text/javascript" src="js/lufylegend-1.9.0.js"></script>
        <script type="text/javascript" src="js/lufylegend.ui-0.9.0.min.js"></script>
        <script type="text/javascript" src="js/main.js"></script> 
        <script type="text/javascript" src="js/Background.js"></script> 
        <script type="text/javascript" src="js/Floor.js"></script> 
        <script type="text/javascript" src="js/Chara.js"></script> 
        <script type="text/javascript" src="js/Ball.js"></script> 
        <script type="text/javascript" src="js/Gift.js"></script> 
        <script>
            function doScroll() {
                if (window.pageYOffset === 0) {
                    window.scrollTo(0, 1);
                }
            }
            window.onload = function() {
                setTimeout(doScroll, 100);
                init(10, "mylegend", 320, 480, main, LEvent.INIT);

            }
            // iPhone屏幕旋转
            window.onorientationchange = function() {
                setTimeout(doScroll, 100);
            };
            // Android屏幕旋转
            window.onresize = function() {
                setTimeout(doScroll, 100);
            }
        </script>
    </head>
     <body style="margin-left: 0px;margin-top: 0px;">

        <div id="mylegend">loading……</div>
		<div  class="picbox"  style="display:none;"><img src="http://www.imifang.net/blc7/images/stage1.jpg" alt='pic'></div>
    </body>
	
	<form name="form1222" action="/" method="post" style="margin:0; padding:0;"> 
<input type="hidden" id="totalscore" name="totalscore" value=""> 
<input type="hidden" id="username" name="username" value=""> 
<input type="hidden" id="usermobile" name="usermobile" value="">
<input type="hidden" id="floor" name="floor" value="">
<input type="hidden" id="mk" name="mk" value="mk"> 
<input type="hidden" id="fatherid" name="fatherid" value="<?=$id?>"> 

</form>
</html>
