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
    //养号函数
    go();
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



function go() {
    var i = 0;
    while (i < 100) {
        var t = random(4000, 12000);
        toast(t + "s sleep");
        sleep(t);
        //随机双击
        if (i === 10 % random(2, 5)) {
            click(x, y);
            sleep(50);
            click(x, y);
            sleep(50);
        };
        swipe(x, y, x, 0, 300);
    };
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


run();