function AppUtils() {
    // 输入
    this.write = function (str) {
        setText(0, str);
        setText(1, str);
    }

    // 打开app
    this.openApp = function (str) {
        app.launchApp(str);
        console.log("启动" + str);
    }

    // 等待
    this.sleep = function (milSecond) {
        sleep(milSecond);
        console.log("休眠：" + milSecond);
    }

    // 打开后台
    this.consoleShow = function () {
        console.show();
        console.log("打开后台");
    }

    // 输入拼音
    this.inputPinyin = function (str) {
        Text(str);
        console.log("输入拼音：" + str);
    }

    // 检查是否存在
    this.exist = function (str) {
        if (!str) {
            console.log("按钮不存在：" + str.text);
            return false;
        }

        return true;
    }

    this.clickView = function (obj) {
        if (obj==null) {
            console.error("空指针:{}", obj);
            exit();
        }
        if (obj.clickable()) {
            obj.click();
        } else {
            let xy = obj.bounds();
            click(xy.centerX(), xy.centerY());
        }
        console.log("点击按钮...");
    }
}

// 参数
let target = "卫衣";
let pinyin = "weiyi"

auto.waitFor();
let utils = new AppUtils();
utils.consoleShow();
utils.openApp("闲鱼");

utils.sleep(5000);

let sousuo = className("android.widget.RelativeLayout").depth(2).findOnce();
utils.clickView(sousuo)


utils.sleep(2000);
utils.inputPinyin(pinyin);

utils.sleep(3000);
let result = className("android.view.View").text(target).findOne();
result.click();

utils.sleep(3000);
// 宝贝浏览面板
let targetViews = className("android.view.View").depth(10).find();
console.log(targetViews.length);
if (targetViews.length != 0) {
//     for (key in targetViews) {
//         let targetView = targetViews[key];
//         utils.clickView(targetView);
//         utils.sleep(2000);
//         back();
//         utils.sleep(2000);
//     }
}

console.log("执行完毕");

