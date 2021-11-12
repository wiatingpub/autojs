const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"微鲤看看",
    indexFlagText:"发布",
    timeAwardText:"领红包",
});

templates.run({
    //获取首页按钮
    getIndexBtnItem:function(){
        return id("rl_bottom_1").findOnce();
    },
    //签到
    signIn:function(){
        commons.UIClick("rl_bottom_4");
        sleep(1000);
        commons.UIClick("ll_not_sign");
        sleep(1000);
        back();
        sleep(1000);
        commons.UIClick("rl_bottom_1");
    },
    //找出新闻的条目
    findNewsItem:function(){

        //领取宝藏
        commons.UIClick("text_ok");
        commons.UIClick("bt_ok");

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
    //时段奖励之后执行
    doingAfterTimeAward:function(){
        back();
    },
    //阅读页面是否应该返回
    isShouldBack:function(){

        //领取宝藏
        commons.UIClick("text_ok");
        commons.UIClick("bt_ok");

        return false;
    }
});