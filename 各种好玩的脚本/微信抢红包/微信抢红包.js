while (true) {
    sleep(100)
  var c = className("TextView").text("领取红包").find()
  var n = c.length
  console.log(n)

  c.each(function(obj) {
    obj.parent().click()
    sleep(200)
    className("TextView").text("给你发了一个红包").untilFind()
    click(500, 1300)
    sleep(200)
    var ro = className("ImageView").desc("返回").untilFind()
    ro[0].click()
    back()
  })
}