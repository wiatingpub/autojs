//console.show()
//定义屏幕类
function _Screen() {
  
}


_Screen.prototype.getxy = function(num) {
  arr = Array()
  arr[1] = [250, 1335]
  arr[2] = [540, 1335]
  arr[3] = [830, 1335]

  arr[4] = [250, 1625]
  arr[5] = [540, 1625]
  arr[6] = [830, 1625]

  arr[7] = [250, 1915]
  arr[8] = [540, 1915]
  arr[9] = [830, 1915]

  return arr[num]
};

_Screen.prototype.unlock = function() {
 // console.log("checking Screen")
  if (!device.isScreenOn()) {
    //console.log("Screen is off, going to unlock")
    //唤醒手机
    device.wakeUp()
    sleep(500)
    //下拉状态栏
    swipe(500, 10, 500, 1000, 200)
    sleep(300)
    //点击时间
    click(100, 120)
    //swipe(250,1335,540,1335,1000)
    sleep(200)
    //滑动手势进行解锁
    gesture(1000, this.getxy(2), this.getxy(4), this.getxy(5),
      this.getxy(3), this.getxy(6), this.getxy(8)
    )
    sleep(1000)
    home()
  }else{
       //下拉状态栏
    swipe(500, 10, 500, 1000, 200)
    sleep(300)
    //点击时间
    click(100, 120)
    //swipe(250,1335,540,1335,1000)
    sleep(300)
    var c =className("TextView").text("闹钟2").find()
    console.log(c)
    
    //滑动手势进行解锁
    gesture(1000, this.getxy(2), this.getxy(4), this.getxy(5),
      this.getxy(3), this.getxy(6), this.getxy(8)
    )
    sleep(1000)
    home()
  }
}




//setTimeout(function(){p.unlock()},3000)

module.exports = _Screen