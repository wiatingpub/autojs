//主动打开到自己的关注列表页
width = device.width;
height = device.height;
var x = width / 2;
var y = height / 2;
console.log("屏幕分辨率为%s * %s", width, height);
setScreenMetrics(device.width, device.height);

function sop() {
    toast("开始");
    var a = 0;
    while (a < 50) {
        sleep(1000);
        while (!click("已关注"));
        sleep(2000);
        swipe(x, y, x, 0, 300);
        a = a + 1;
    };
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

sop();