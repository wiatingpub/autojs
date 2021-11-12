width = device.width;
height = device.height;
var x = width / 2;
var y = height / 2;
console.log("屏幕分辨率为%s * %s", width, height);
setScreenMetrics(device.width, device.height);

function sop() {
    toast("开始");
    var a = 0;
    while (a < 500) {
        sleep(1000);
        var abd = text("互相关注").find();
        var len = abd.length;
        toast("查询长度:" + len);
        for (var i = 0; i < len - 1; i++) {
            var tv = abd[i]; //表示第几个控件 
            if (tv) {
                var tr = tv.bounds(); //获取坐标位置 
                click(tr.centerX(), tr.centerY());
                //sleep(1000); 
                while (!click("取消关注"));
                sleep(1500);
            };
        };
        swipe(x, y, x, 0, 300);
        a = a + 1;
    };
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

sop();