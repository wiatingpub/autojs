//确保开启了无障碍
auto.waitFor();

//开启控制台浮窗
console.show();

//开启任务
main();

//完成，退出脚本
exit();

/**
 * 初始化函数
 */
function init() {
    //设置菜单键按下终止脚本,避免过长等待或死循环
    events.observeKey();
    events.on("key", function(keyCode, event){
        if(keyCode == keys.volume_up){
            toastLog("菜单键按下");
            exit();
        }
    });
}

/**
 * 主函数
 */
function main() {
    init();
    if (goAppActivity() == 1) {
        var taskBtn = text('赚喵币').findOne(10000);
        if (taskBtn != null) {
            taskBtn.click();
            //完成浏览类型任务
            doBrowseTask();
            //完成搜索类型任务
            doSearchTask();
            //其他类型任务
            doOtherTask();
            //领取奖励
            receiveAward();
        }
    }
}

/**
 * 进入app活动界面
 */
function goAppActivity() {
    app.startActivity({
        action: "VIEW",
        data: "taobao://pages.tmall.com/wow/z/hdwk/act-20201111/index"
    });
    return 1;
}

/**
 * 完成浏览型任务，每个浏览页面是15秒
 */
function doBrowseTask() {
    var btn;
    var num = 1;
    while(btn = text('去浏览').findOne(3000)) {
        btn.click();
        mySwipe(15, 1000);
        toastLog('第'+num+'次看浏览任务完成');
        if (++num>200) {
            //防止太卡的手机死循环
            break;
        }
    }
    toastLog('所有浏览任务已完成');
}

/**
 * 完成搜索型任务，跟浏览的一致
 */
function doSearchTask() {
    var btn;
    var num = 1;
    while(btn = text('去搜索').findOne(3000)) {
        btn.click();  
        mySwipe(15, 1000);
        toastLog('第'+num+'次去搜索任务完成');
        if (++num>60) {
            //防止太卡的手机死循环
            break;
        }
    }
    toastLog('所有去搜索任务已完成');
}

/**
 * 完成其他类型任务
 */
function doOtherTask() {
    var taskBtnGroup = text('去完成').find();
    var num = 1;
    taskBtnGroup.forEach(function(item,index) {
        //邀请好友任务无法自动完成
        if(item.parent() && item.parent().findByText('邀请').empty) {
            item.click();
            mySwipe(15, 1000);
            toastLog('第'+num+'次去完成任务完成');
        }
    });
}

/**
 * 完成任务后领取奖励
 */
function receiveAward() {
    var taskBtnGroup = text('领取奖励').find();
    taskBtnGroup.forEach(function(item,index){
        item.click();
        toastLog('领取奖励成功');
    });
}

/**
 * 循环滑动函数
 * @param {num} 滑动次数
 * @param {time} 滑动停歇时间 
 */
function mySwipe(num,time) {
    sleep(2000);
    var xpi = device.width / 2;
    var ypi = device.height * 2 / 3;
    var ypi2 = 200;
    for(var i=0;i<=num;i++) {
        swipe(xpi, ypi, xpi, ypi2, 800);
        sleep(time);
    }
    sleep(1000);
    back();
}