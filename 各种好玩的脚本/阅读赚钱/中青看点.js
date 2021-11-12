const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"中青看点",
    indexFlagText:"美文",
});

templates.run({
    //获取首页按钮
    getIndexBtnItem:function(){
        return id("tv_home_tab").findOnce();
    },
    //签到
    signIn:function(){
        //进入我的
        click(1079,1919);
        sleep(500);
        //进入任务中心
        var taskCenter = text("任务中心").findOnce();
        if(taskCenter){
            commons.boundsClick(taskCenter);
            sleep(5000);
        }
        //点击签到领红包
        commons.UITextClick("签到领红包");
        sleep(1000);
        //返回主页面
        back();
        back();
        sleep(1000);
        //回到新闻
        click(1,1919);
    },
    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = id("tv_read_count").findOnce(1);
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
        //不存在奖励，直接退出
        if(!id("news_income_container").findOnce()){
            return true;
        }

        //存在下载安装
        if(id("button2").findOnce()){
            id("button2").findOnce().click();
            return true;
        }

        return false;
    }
});
