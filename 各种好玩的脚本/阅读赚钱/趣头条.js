const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"趣头条"
});

templates.run({
    //签到
    signIn:function(){
        commons.UITextBoundsClick("任务");
        sleep(2000);
        click(1,1919);
    },
    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = className("android.support.v4.view.ViewPager").className("LinearLayout").findOnce();
        //判断是否是广告
        if(newsItem && newsItem.childCount() > 0){
            var adFlag = newsItem.child(1);
            if(adFlag && adFlag.text() == "广告"){
                newsItem = null;
            }
        }
        return newsItem;
    },
    //阅读页面是否应该返回
    isShouldBack:function(){
        //图集直接返回
        var imgItem = className("android.support.v4.view.ViewPager").className("ImageView").findOnce();
        if(imgItem){
            return true;
        }
        return false;
    }
});
