const commons = require('common.js');
const templates = require('template.js');


templates.init({
    appName:"牛牛头条",
    indexBtnText: "资讯",
    indexFlagText:"刷新",
});

templates.run({
    //签到
    signIn:function(){
        commons.UITextBoundsClick("每日金币");
        sleep(2000);
        click(1,1919);
    },
    //找出新闻的条目
    findNewsItem:function(){
        var newsItem = className("android.support.v4.view.ViewPager")
            .className("android.support.v4.view.ViewPager")
            .className("android.support.v7.widget.RecyclerView")
            .className("RelativeLayout").findOnce();
        //判断是否是广告
        if(newsItem){
            if(newsItem.childCount() > 1){
                var adFlag = newsItem.child(1);
                if(adFlag && adFlag.text() == "广告"){
                    newsItem = null;
                }
            }
        }
        return newsItem;
    },
    //阅读页面是否应该返回
    isShouldBack:function(){
        return false;
    },
    //时段奖励之后执行
    doingAfterTimeAward:function(){
        back();
    },
});
