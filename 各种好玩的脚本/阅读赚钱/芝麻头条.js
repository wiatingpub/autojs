const utils = require('common.js');

utils.wakeUp(); 
utils.launch("芝麻头条");

//睡眠15s
sleep(15000);


/**
 * 所有的控件ID
 */
var xwid = "tv_title";//新闻标题的id，每次更新都会变更
var btm1 = "tab_news";//底部1 新闻

//开始刷新闻，主循环
jumpToIndex();
while(true){
    //领取时段奖励
    getAward();
    //点击进入新闻
    getOneNews();
    //阅读新闻60s
    readNews(60);
    //返回新闻列表
    backToIndex();
}

//跳转到首页
function jumpToIndex(){
    //领取奖励
    var awardBtn = id("tv_draw_bonuses").findOnce();
    if(awardBtn){
        awardBtn.click();
    }
    //跳转到首页
    id(btm1).click();
}

//领取时段奖励
function getAward(){

    //自动领取时段奖励
    // var textOk = id("ll_timing").findOnce();
    // if(textOk){
    //     textOk.click();
    // }

}



// 获取一条新闻
var lastNewsText="";//上一次新闻标题
var totalNews = 0;
function getOneNews(){

    /**
     * 阅读超过50条，刷新页面
     */
    if(totalNews > 50){
        totalNews = 0;
        //刷新
        var refresh = id(btm1).findOnce();
        if(refresh){
            refresh.click();
            sleep(2000);
        }
    }

    /**
     * 上滑找新闻
     */
    var newsItem = false;
    var loopTime = 0;//循环次数
    var newsText = "";//新闻标题
    while((!newsItem || lastNewsText === newsText)  && loopTime < 20){
        loopTime++;

        //进行下翻
        swipe(device.width / 2, device.height / 4 * 2,
            device.width / 2, device.height / 4, 1000);
        sleep(1000);

        //找到阅读次数，这个是正规的新闻
        newsItem = id(xwid).findOnce(1);
        newsText = newsItem.text();
    }

    /**
     * 找到新闻
     */
    if(newsItem){
        lastNewsText = newsText;
        totalNews++;
    }else{
        toast("20次滑动没有找到新闻，请检查新闻ID");
        exit();
    }

    utils.boundsClick(newsItem);
    return newsItem;
}

//阅读新闻
function readNews(seconds){
    var times = seconds/5;

    //开始滑动
    for(var i = 1;i < times;i++){
        swipe(device.width / 2, device.height / 5 * 3,
            device.width / 2, device.height / 4 * 1, 5000);
    }
}

//回到主页面
function backToIndex(){
    var indexBtn = false;
    while(!indexBtn){
        back();
        sleep(500);
        indexBtn = id(btm1).findOnce();
    }
}