const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"惠头条",
    indexBtnText: "头条",
    indexFlagText:"刷新",
    timeAwardText : "点击领取",//时段奖励关键字
});

templates.run({
    //签到
    signIn:function(){
        commons.UITextBoundsClick("任务中心");
        sleep(1000);
        commons.UIClick("sign_btn_container");
        sleep(1000);
        click(20,1917);
        sleep(1000);
        click(20,1917);
    },
    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = id("tv_title").findOnce(1);
        //判断是否是广告
        if(newsItem){
            newsItem = newsItem.parent();
            var adFlag = newsItem.child(1);
            if(adFlag && adFlag.text() == "广告"){
                newsItem = null;
            }
        }
        return newsItem;
    },
    //阅读页面是否应该返回
    isShouldBack:function(){
        commons.UITextClick("取消");
        return false;
    },
    //时段奖励之后执行
    doingAfterTimeAward:function(){
        back();
    },
});