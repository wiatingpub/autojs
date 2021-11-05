console.show();
let target = "卫衣";
let result = className("android.view.View").text(target).findOne();
result.click();

sleep(2000);
// 宝贝浏览面板
let targetViews = className("android.view.View").depth(10).find();
console.log(targetViews.length);