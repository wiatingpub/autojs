var morningTime = "07:18";//自己运动能量生成时间
var startTime = "07:00";
var endTime = "7:35";
var screen_width = 1080;  //设置屏幕的宽度，像素值
var screen_height = 2340; //设置屏幕的高度，像素值


unlock();
sleep(2000);

threads.start(function(){
    //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    events.observeKey();
    events.on("key_down", function(keyCode, events){
        //音量键关闭脚本
        if(keyCode == keys.volume_down){
            toast("您选择退出脚本！")
            sleep(2000);
            exit();
        }
    });
});

mainEntrence();

//程序主入口
function mainEntrence(){
    //前置操作
    prepareThings();
    do{
        //打开支付宝
        openAlipay();
        //蚂蚁庄园
        if(!checkTime()){
            //enterAntFarm();
         }
        //进入蚂蚁森林主页,收集自己的能量
        enterMyMainPage();
        //进入排行榜
        if(enterRank()){
        //进入好友主页，收好友能量
         enterOthers();
         }
        //结束后返回主页面
        whenComplete();
    }while(checkTime());
    
    get_alipay_points();
    exit();
}

//蚂蚁会员积分
function get_alipay_points(){
    clickByTextDesc("我的",0);
    sleep(2000);
    clickByTextDesc("支付宝会员",0);
    sleep(8000);
    clickByTextDesc("领积分",0);
    sleep(2000);
    var i=0;
    for(i=0; i<10;i++){
        clickByTextDesc("点击领取",0);
        sleep(100);
    }
    back();
    sleep(1000);
    back();
    sleep(1000);
    clickByTextDesc("首页",0);
}


//解锁
function unlock(){
    if(!device.isScreenOn()){
        //点亮屏幕
        device.wakeUp();
        //由于MIUI的解锁有变速检测，因此要点开时间以进入密码界面
        sleep(1000);
        swipe(500, 0, 500, 1900, 2000);
        click(100,150); 
        //输入屏幕解锁密码，其他密码请自行修改
        sleep(2000);
        click(540,1800);
        sleep(500);
       
        click(540,1800);
        sleep(500);
        
        click(240,1620);
        sleep(500);
        
        click(540,1620);
        sleep(500);    
    }
}
  

//获取权限和设置参数
function prepareThings(){
    setScreenMetrics(screen_width, screen_height);
    //toastLog("test1");
    //请求截图
    if(!requestScreenCapture()){
        toastLog("请求截图失败,脚本退出");
        exit();
    }
    sleep(3000);
    //toastLog("test2");
}


//获取截图
function getCaptureImg(){    
    //captureScreen("/storage/emulated/0/DCIM/Screenshots/1.png");
    //sleep(500);
    var img0 = captureScreen();
    sleep(100);
    if(img0==null || typeof(img0)=="undifined"){
        toastLog("截图失败,脚本退出");
        exit();
    }else{
       return img0;
    }
}


//从支付宝主页进入蚂蚁森林我的主页
function enterMyMainPage(){
    //五次尝试蚂蚁森林入
    var i=0;
    swipe(screen_width*0.5,screen_height*0.5,screen_width*0.5,screen_height*0.25,500);
    sleep(500);
    swipe(screen_width*0.5,screen_height*0.25,screen_width*0.5,screen_height*0.5,500);
    while (!textEndsWith("蚂蚁森林").exists() && !descEndsWith("蚂蚁森林").exists() && i<=5){
        sleep(1000);
        i++;   
    }  
    if(i>=5){
        toastLog("没有找到蚂蚁森林入口，尝试中");
        clickByTextDesc("首页",0);
        sleep(2000);
        swipe(screen_width*0.5,screen_height*0.3,screen_width*0.5,screen_height*0.7,1000);
        sleep(2000);
        swipe(screen_width*0.5,screen_height*0.3,screen_width*0.5,screen_height*0.7,1000);
        sleep(2000);
    }
    clickByTextDesc("蚂蚁森林",0);
    
    //等待进入自己的主页,10次尝试
    sleep(3000);
    i=0;
    while (!textEndsWith("种树").exists() && !descEndsWith("种树").exists() && i<=10){
        sleep(1000);
        i++;
    }
    toastLog("第"+i+"次尝试进入自己主页");
    if(i>=10){
        toastLog("进入自己能量主页失败");
        return false;
    }
    
    //收自己能量
    //clickByTextDesc("克",0);
    for(var row=screen_height*0.256;row<screen_height*0.376;row+=80)
        for(var col=screen_width*0.185;col<screen_width*0.815;col+=80){
            click(col,row);
            }
    toastLog("自己能量收集完成");
    sleep(100);
    return true;
}

//进入排行榜
function enterRank(){
    toastLog("进入排行榜");
    sleep(2000);
    swipe(screen_width*0.5,screen_height*0.8,screen_width*0.5,screen_height*0.1,500);
    sleep(500);
    swipe(screen_width*0.5,screen_height*0.8,screen_width*0.5,screen_height*0.1,500);
    toastLog("查看更多好友");
    sleep(500);
    clickByTextDesc("查看更多好友",0);
       
    //等待排行榜主页出现
    sleep(3000);
    return true;
}

//从排行榜获取可收集好友的点击位置
function  getHasEnergyfriend(type) {
    var img = getCaptureImg();
    //getCaptureImg();
    //var img = images.read("/storage/emulated/0/DCIM/Screenshots/2.png");
    var p=null;
    if(type==1){
        // 区分倒计时和可收取能量的小手
        p = images.findMultiColors(img, "#ffffff",[[0, -35, "#1da06d"],[0, 23, "#1da06d"]], {
            region: [1043,200 , 1, screen_height-300]
        });
    }
    if(p!=null){
        toastLog("找到好友");
        return p;
    }else {
        //toastLog("此页没有找到可收能量的好友");
        return null;
    }
}

//在排行榜页面,循环查找可收集好友
function enterOthers(){
    sleep(1000);
    var i=1;
    var ePoint=getHasEnergyfriend(1);
    
    //不断滑动，查找好友
    while(ePoint==null){
        //如果到了收取自己能量的时间，先收取自己能量
        if(myEnergyTime()){
            return false;
        }
        swipe(screen_width*0.5,screen_height*0.7,screen_width*0.5,screen_height*0.1,500);
        sleep(1000);
        ePoint=getHasEnergyfriend(1);
        i++;


        //如果连续15次都未检测到可收集好友,无论如何停止查找 
        if(i>15){
            toastLog("程序可能出错,连续"+i+"次未检测到可收集好友");
            return false;
        }
    }
    
    //找到好友
    //进入好友页面,10次尝试
    click(ePoint.x,ePoint.y+20);
    sleep(3000);
    i=0;
    while (!textEndsWith("你收取TA").exists() && !descEndsWith("你收取TA").exists() && i<=10){
        sleep(1000);
        i++;
    }
    toastLog("第"+i+"次尝试进入好友主页");
    if(i>=10){
        toastLog("进入好友能量主页失败");
        return false;
    }
    
    //收能量
    //clickByTextDesc("克",0);
    for(var row=screen_height*0.256;row<screen_height*0.376;row+=80)
        for(var col=screen_width*0.185;col<screen_width*0.815;col+=80){
            click(col,row);
            }

    //等待返回好友排行榜
    back();

    //返回排行榜成功，继续
    enterOthers();

}


function clickByTextDesc(energyType,paddingY){
    var clicked = false;
    if(descEndsWith(energyType).exists()){
        descEndsWith(energyType).find().forEach(function(pos){
            var posb=pos.bounds();
            if(posb.centerX()<0 || posb.centerY()-paddingY<0){
                return false;
            }
            //toastLog(pos.id());
            var str = pos.id();
            if(str != null){
                if(str.search("search") == -1){
                    click(posb.centerX(),posb.centerY()-paddingY);
                     //toastLog("get it 1");
                     clicked = true;   
                }
            }else{
                click(posb.centerX(),posb.centerY()-paddingY);
                //toastLog("get it 2");
                clicked = true;
            }
            sleep(100);
        });
    }
    
    if(textEndsWith(energyType).exists() && clicked == false){
        textEndsWith(energyType).find().forEach(function(pos){
            var posb=pos.bounds();
            if(posb.centerX()<0 || posb.centerY()-paddingY<0){
                return false;
            }
            //toastLog(pos.id());
            var str = pos.id();
            if(str != null){
                if(str.search("search") == -1){
                    click(posb.centerX(),posb.centerY()-paddingY); 
                    //toastLog("get it 3"); 
                    clicked = true;  
                }
            }else{
                click(posb.centerX(),posb.centerY()-paddingY);
                //toastLog("get it 4");
                clicked = true;
            }
            sleep(100);
        });
    }
    
    return clicked;
}

//结束后返回主页面
function whenComplete() {
    toastLog("结束");
    back();
    sleep(1500);
    back();
}

function checkTime(){
    var now =new Date();
    var hour=now.getHours();
    var minu=now.getMinutes();
    var time_a=startTime.split(":");
    var time_b=endTime.split(":");
    var timea = 60*Number(time_a[0])+Number(time_a[1]);
    var timeb = 60*Number(time_b[0])+Number(time_b[1]);
    var time  = 60*hour + minu;
    if(time>=timea && time<=timeb){
        //sleep(2000);
        return true;
    }else{
        return false;
    }   
}

function myEnergyTime(){
    var now =new Date();
    var hour=now.getHours();
    var minu=now.getMinutes();
    var mytime=morningTime.split(":");
    
    if(mytime[0]==hour && (mytime[1]==minu || mytime[1]==minu-1) ){
        return true;
    }else{
        return false;
    }   
}

function enterAntFarm(){
    var i=0;
    sleep(2000);
    while (!textEndsWith("蚂蚁庄园").exists() &&!descEndsWith("蚂蚁庄园").exists() && i<=5){
        sleep(1000);
        i++;   
    }
    if(i>=5){
        return false;
    }
        
    clickByTextDesc("蚂蚁庄园",0);
    sleep(7000);
    //captureScreen("/storage/emulated/0/DCIM/Screenshots/2_1.png");
    //exit();
    click(931,2150);
    sleep(2000);
    click(340,1420);
    sleep(1000);
    click(340,1900);sleep(1000);click(230,1600);sleep(1000);
    click(930,1900);sleep(1000);click(670,1600);sleep(1000);
    //captureScreen("/storage/emulated/0/DCIM/Screenshots/2_2.png");
    back();
    sleep(2000);
    return true;
}

function openAlipay(){
    //launchApp("Alipay");
    
    launchApp("支付宝");
    toastLog("等待支付宝启动");
    //sleep(3000);
    var i=0;
    while (!textEndsWith("扫一扫").exists() && !descEndsWith("扫一扫").exists() && i<=5){
        sleep(2000);
        i++;
    }
    toastLog("第"+i+"次尝试进入支付宝主页");
    if(i>=5){
        toastLog("没有找到支付宝首页");
        sleep(1000);
        clickByTextDesc("首页",0);
        return false;
    }
    return true;
}
    

