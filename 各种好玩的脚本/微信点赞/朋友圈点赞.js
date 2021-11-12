"auto";

//下滑
function scroll() {
  className("ListView").scrollDown(); //.scrollForward();
}

//尝试点赞
function tryFav(btn) {
  btn.click();
  sleep(300)
  if (!click("赞")) {
    btn.click();
  }
    sleep(200)
}
console.show()
while (true) {
  className("ImageView").desc("评论").untilFind();
  var c = className("ImageView").desc("评论").find();
  var n = c.length
  console.log(n)
  var i = 0
  c.each(function(btn) {
    tryFav(btn);
      i++
    if (i >= n) {
      scroll()
    }
  });

  //scroll();
}