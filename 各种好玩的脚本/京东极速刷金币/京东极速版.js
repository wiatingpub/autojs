auto.waitFor();

//初始化方法
function init() {
    events.observeKey();
    events.on("key", function(keyCode, event){
        if(keyCode == keys.volume_up){
            toastLog("音量上键按下,结束脚本");
            exit();
        }
    });
}

//常量定义
let JD_NAME = 'com.jd.jdlite';

//弹框
function myAlert(val) {
    alert('温馨提示', val);
}

//打开京东极速版
function openJD(name) {
    return launch(name);
}

//循环滑动函数
function mySwipe(num,time) {
    var xpi = device.width / 2;
    var ypi = device.height * 2 / 3;
    var ypi2 = 200;
    for(var i=0;i<=num;i++) {
        swipe(xpi, ypi, xpi, ypi2, 800);
        sleep(time);
    }
}

//看一次商品任务
function doShopTask(shopBtn) {
    shopBtn.click();
    sleep(2000);
    mySwipe(6,500);
    back();
    sleep(3000);
}

//看一次活动任务
function doActiveTask(activeBtn) {
    activeBtn.click();
    sleep(2000);
    mySwipe(12,300);
    back();
    sleep(3000);
}

//看视频任务
function doVideoTask(videoBtn) {
    videoBtn.click();
    //进入视频流
    var child = idEndsWith('text_title').findOne();
    toastLog('识别文本：'+child.text());
    click(child.text(),0);
    //一次看20秒,循环上限为10*50=500次
    for(var i=0; i< 50; i++) {
        mySwipe(10, 20000);
        toastLog('完成第'+i+'次看视频循环');
        if (videoIsEnd()) {
            toastLog('识别到今日已完成，结束看视频：');
            break;
        }
    }
}

//判断视频是否结束
function videoIsEnd() {
    var isEnd = text('今日已完成').findOne(2000);
    if (isEnd){
        return true;
    }
    return false;
}

//找任务按钮
function findTaskBtn(type) {
    var taskBtnGroup = text('去赚钱').untilFind();
    var btn;
    taskBtnGroup.forEach(function(item){
        if (type == 1 && !item.parent().findByText('逛商品赚金币').empty){
            btn = item;
        } else if(type == 2 && !item.parent().findByText('逛活动赚金币').empty){
            btn = item;
        } else if(type == 3 && !item.parent().findByText('看视频赚金币').empty){
            btn = item;
        }
    });
    return btn;
}

//找‘我的’
function findMyBtn() {
    var myBtn = className("android.view.View").desc("我的").findOne();
    return myBtn;
}

//启动函数
function main() {
    init();
    if (!openJD(JD_NAME)) {
        myAlert('未安装京东极速版哦!');
        return;
    }
    //找到‘我的’
    var myBtn = findMyBtn();
    myBtn.click();
    //判断任务是否需要执行
    var btn;
    var i=1;
    while(btn = findTaskBtn(1)) {
        doShopTask(btn);
        toastLog('第'+i+'次看商品完成');
        if (++i>100) {
            break;
        }
    }
    toastLog('商品任务结束');
    i=1;
    while(btn = findTaskBtn(2)) {
        doActiveTask(btn);
        toastLog('第'+i+'次看活动完成');
        if (++i>30) {
            break;
        }
    }
    toastLog('活动任务结束');
    if(btn = findTaskBtn(3)) {
        toastLog('视频按钮找到了');
        doVideoTask(btn);
    }
    toastLog('视频任务结束');
    exit();
}

main();
