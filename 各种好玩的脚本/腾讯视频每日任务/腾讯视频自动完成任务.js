auto.waitFor(); //等待获取无障碍辅助权限

var height = device.height;
var width = device.width;
toast("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release)



app.launchApp("腾讯视频") //打开腾讯视频
sleep(1000)
if (className("android.widget.Button").text("暂不升级").exists()) { //判断升级弹窗
    className("android.widget.Button").text("暂不升级").click() //关闭升级弹窗
    toast("已自动关闭弹窗")
}
sleep(500)
id("cv9").findOne().click() //打开搜索框
sleep(1000)
setText("朱妮托尼儿歌") //输入“朱妮托尼儿歌”
sleep(500)
text("搜索").findOne().click() //点击搜索
sleep(1000)
text("缓存").findOne().parent().parent().click() //打开缓存
sleep(500)
text("第001话 色彩乐园之旅，带宝宝开启奇妙视野：感受色彩魅力").findOne().parent().parent().click() //缓存第一集
sleep(500)
text("已缓存文件").findOne().parent().parent().click() //打开已缓存
sleep(500)
text("朱妮托尼儿歌").findOne().parent().parent().parent().parent().parent().click() //打开缓存完成的“朱妮托尼儿歌” 
sleep(500)
text("编辑").findOne().click() //点击编辑
sleep(500)
text("全选").findOne().click() //点击全选
sleep(500)
text("删除(1)").findOne().click() //点击删除
sleep(1500)
back() //返回
sleep(1000)
back() //返回
sleep(1000)
back() //返回
sleep(1000)
back() //返回
sleep(1000)
id("cv9").findOne().click() //打开搜索框
sleep(1000)
setText("西虹市首富") //输入“西虹市首富”
sleep(1000)
text("搜索").findOne().click() //点击搜索
sleep(1000)
text("立即播放").findOne().parent().parent().parent().click() //点击播放
sleep(3000)
id("c9x").findOne().click() //全屏播放
sleep(10000)

//在播放视频界面改时间 秒过60mi任务【如果没有root就删除这一段！！没有root不能用！！】
shell("settings put global auto_time 0;date $(date +%m%d$(expr $(date +%H) + 2)%M) set", true);


//
if (id("ee5").exists()) { //判断是否有开关
    if (id("ee5").exists()) { //判断是否打开弹幕
        toast("已打开弹幕")
        id("ee5").findOne().click() //输入
    } else {
        toast("没有检测到弹幕入口")
        click(width / 2, height / 2)
        sleep(1000)
        id("ee5").findOne().click() //点击输入
    }

} else {
    click(666, 666)
    sleep(1000)
    if (id("ee5").exists()) { //判断是否打开弹幕
        toast("终于打开弹幕了")
        id("ee5").findOne().click() //点击输入
    } else {
        toast("还是没有检测到弹幕入口")
        sleep(1000)
        click(width / 2, height / 2) //打开弹幕开关
        sleep(1000)
        id("ee5").findOne().click() //点击输入
    }

}

sleep(500)
setText("我又来了") //输入
text("发送").findOne().click() //发送弹幕
sleep(1000)
back()

sleep(500)
id("dp2").findOne().click() //点击赠送礼物
sleep(1000)
text("QQ好友").findOne().parent().click() //点击赠送礼物
sleep(1000)
text("关闭").findOne().click() //关闭分享页面
sleep(1000)

//时间恢复 很重要！！！【如果没有root就删除下面这两段段！！没有root不能用！！】
shell("settings put global auto_time 1", true);
shell("am broadcast -a com.autojs.end", true);
//
sleep(500)
toast("开始自动提交中，请等待")
sleep(2000)
back()
sleep(2000)
back()
sleep(2000)

// if (text("跳过").exists()) { //检测有没有广告
//     text("跳过").findOne().click()
// }

back()
sleep(2000)
toast("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release)
sleep(1000)
toast("前往领取经验")
if (id("cdc").exists()) { //检测是否到达主页
    back()
}
click(width - 80, height - 130) //点击右下角的个人中心
sleep(3000)
text("VIP会员").findOne().parent().click() //进入会员中心
sleep(3000)
text("V力值").findOne().click() //点击V力值
sleep(3000)
if (text("领取").exists()) { //判断是否有开关
    toast("还有未领取的V力值")
    className("android.view.View").text("领取").findOne().click() //领取
    sleep(3000)
    className("android.view.View").text("领取").findOne().click() //领取
    sleep(3000)
    className("android.view.View").text("领取").findOne().click() //领取
    sleep(3000)
    className("android.view.View").text("领取").findOne().click() //领取
    sleep(3000)
    className("android.view.View").text("领取").findOne().click() //领取
    sleep(3000)
    className("android.view.View").text("领取").findOne().click() //领取
    sleep(3000)
    className("android.view.View").text("领取").findOne().click() //领取
} else {
    toast("没有可领取的V力值")
}
sleep(1000)
toast("结束")
