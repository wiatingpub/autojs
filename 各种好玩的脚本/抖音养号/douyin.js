var digital = 1;
var dyName = '美团外卖';
digital = dialogs.rawInput("请输入要关注的粉丝，1：美团外卖，2：饿了么，3：号主名");
if (digital === 2) {
    dyName = '饿了么';
}
else if (digital === 3) {
    dyName = dialogs.rawInput("请输入号主名");
}
console.log("输入%s", digital);
width = device.width
height = device.height
var x = width / 2;
var y = height / 2;
console.log("屏幕分辨率为%s * %s", width, height)
setScreenMetrics(device.width, device.height);


/**
 * 运行
 */
function run() {
    var appName = "抖音";
    //退出抖音
    killApp(appName);
    console.log("===程序开始===");
    console.log("===启动抖音===");
    launchApp(appName);
    sleep(3000);
    var isAdv = true;
    idAdv = click("跳过广告");
    console.log("===跳过广告===");
    if (!isAdv) {
        while (!跳过广告);
        sleep(2000);
    }
    //点击事件
    clickEvent();
};

/**
 * 停止app
 * @param {*} appName 应用名称
 */
function killApp(appName) {
    console.log("===停止抖音===");
    recents();
    sleep(1000);
    var isExistDesc = text(appName).exists();
    if (!isExistDesc) {
        console.log("后台不存在，返回主页");
        home();
        return;
    }
    //应用边框的坐标
    var descLoc = text(appName).findOne().bounds();
    swipe(descLoc.centerX(), descLoc.centerY(), device.width, descLoc.centerY(), 300);
    sleep(1000);
    home();
    sleep(1000);
}


/**
 * 点击事件,***** 重要：前提是该人必须在对话列表里 *****
 */
function clickEvent() {
    while (!click("消息"));
    toast("===点击消息===");
    //点击对话框里的美团外卖
    while (!click(dyName));
    sleep(2000);
    //点击更多（右上角的三个点）
    desc("更多").findOne().click();
    sleep(3000);
    //点击的名字
    while (!click(dyName));
    sleep(3000);
    //点击粉丝
    while (!click('粉丝'));
    sleep(3000);
    //关注当前页面所有列表人员
    following();
}
/**
 * 递归关注
 */
function following() {
    if (textContains("关注")) {

    }
    var focus = text("关注").find();
    var size = focus.size() - 2;
    console.log('当前列表大小' + size);
    for (var index = 2; index < size; index++) {
        // console.log('循环里的第' + index + '个');
        var focusObject = focus.get(index);
        console.log('focusObject.text:' + focusObject.text());
        if (isContains(focusObject.text(), '推荐') || containsNumber(focusObject.text())) {
            continue;
        }
        var j76 = focusObject.bounds(); //j76是关注的id控件
        console.log("坐标(x:%s,y:%s)", j76.centerX(), j76.centerY());
        click(j76.centerX(), j76.centerY());
        sleep(random(500, 1500));
    }
    swipe(x, y, x, 0, 300);
    sleep(random(300, 1000));
    following();
}

function containsNumber(str) {
    var reg = /\d/;
    return reg.test(str);
}

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function sop() {
    run();
}


sop();