
const Screen2= require("tool/unlock.js")

console.show()
var scr= new Screen2()

//setTimeout(function(){p.unlock()},3000)
//一分钟内产生随机数打卡
//var randomTime = Math.random()*10*1000;
var randomTime = 3000;

console.log('打卡计时开始' + (randomTime / 1000).toFixed(2) + '秒后打卡');
toast('打卡计时开始' + (randomTime / 1000).toFixed(2) + '秒后打卡');
setTimeout(() => {
  console.log('开始打卡');
  //swipe(500, 10, 500, 1000, 300);
  //click(100, 120);
  scr.unlock();
  punchClock();
  console.log('打卡结束');
}, randomTime);

//解锁
function unlock() {
  //息屏和锁屏状态需要解锁
  if (!device.isScreenOn() || desc("快捷方式").exists()) {
    //曲线解锁 miui锁屏滑动不能唤出密码输入 通过下拉通知栏点击时间进入密码解锁
    device.wakeUp();
    //下拉状态栏
    console.log('2');

    //swipe(500, 100, 500, 1000, 300);
    swipe(10, 2238, 1080, 2238, 3000);
      
      
    console.log('3');

      /*
    sleep(400);
    //点击时间
    click(100, 120);
    console.log('4');

    //解锁 密码5566
    desc(2).findOne().click();
    desc(4).findOne().click();
    desc(5).findOne().click();
    desc(3).findOne().click();
    desc(6).findOne().click();
    desc(8).findOne().click();

    //等待解锁完成
    text('闹钟').waitFor();
    //返回主页
     home();
     */
  }
}
//打卡
function punchClock() {
  sleep(200);
  //启动钉钉
  launch("com.alibaba.android.rimet");
  //等待钉钉启动
  desc("工作").waitFor();
  desc("工作").findOne().click();
  if (!text("考勤打卡").exists()) {
    swipe(500, 1300, 500, 500, 300);
    sleep(400);
  }
  text("考勤打卡").findOne().parent().click();
  //等待打卡界面加载
  descContains("班时间").waitFor();
  //打卡按钮名字
  var descStr = getOpr();
  if (!desc(descStr).exists()) {
    toast(descStr + '不存在');
    exit()
  }
  toast('按钮名:' + descStr);
  var button = desc(descStr).findOne();
  var bounds = button.bounds();
  var x = bounds.centerX();
  var y = bounds.centerY();
  //遮挡滚动
  if (y > 1776) {
    swipe(500, 1500, 500, 300, 300);
    sleep(500);
    button = desc(descStr).findOne();
    bounds = button.bounds();
    x = bounds.centerX();
    y = bounds.centerY();
  }
  toast('坐标:' + x + ', ' + y);
  //通过点击位置打卡
  click(x, y);
}

//根据上下班时间获取打卡按钮名字
function getOpr() {
  var span = descContains("班时间").find();
  var timeArr = [];
  var now = new Date();
  var yearStr = (now.getFullYear()) + "/" + (now.getMonth() + 1) + "/" + (now.getDate()) + ' ';
  span.forEach(v => {
    var str = v.desc();
    var exec = /(.*)时间(.*)/.exec(str);
    var opr = exec[1];
    var timeStr = exec[2];
    var opTime = new Date(yearStr + timeStr);
    //上班时间提前十分钟就可以打卡
    if (opr == '上班') {
      opTime.setMinutes(opTime.getMinutes() - 10);
    }
    console.log(yearStr + timeStr)
    timeArr.push({
      timeStr: timeStr,
      opr: opr,
      time: opTime
    })
  })
  var descStr;
  console.log(timeArr)
  timeArr.some((v, i) => {
    console.log(v.timeStr)
    if (now > v.time && (i == timeArr.length - 1 || now < timeArr[i + 1].time)) {
      descStr = v.opr + '打卡';
      return true
    }
  })
  return descStr
}