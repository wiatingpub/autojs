const commons = require('common.js');
const templates = require('template.js');

templates.init({
    appName:"红包头条",
    indexBtnText: "头条",
    indexFlagText:"头条",
});

templates.run({
    //签到
    signIn:function(){

    },
    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = id("ll_root").findOnce();;
        //判断是否是广告
        if(newsItem){
            var adFlag = newsItem.child(1);
            if(adFlag && adFlag.text() == "广告"){
                newsItem = null;
            }
        }
        return newsItem;
    },
    //阅读页面是否应该返回
    isShouldBack:function(){
        //不存在奖励，直接退出
        if(!id("circularProgressBar").findOnce()){
            return true;
        }
        return false;
    }
});
