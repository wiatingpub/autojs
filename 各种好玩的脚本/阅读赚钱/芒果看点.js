const utils = require('common.js');

/**
 * 全局参数
 */
var lastNewsText="";//上一次新闻标题
var totalNewsReaded = 0;//已经阅读的新闻条数
var totalNewsOneTime = 50;//一次性阅读多少条新闻
var loopTimeToFindNews=20;//找了多少次新闻找不到会退出

/**
 * 全局控件ID
 */
var newsItemId = "tv_title";//新闻条目ID
var indexFlagText="刷新";//首页特有的标志文字

//开始刷新闻，主循环
init();
signIn();
jumpToIndex();
while(true){
    //领取时段奖励
    getAward();
    //点击进入新闻
    getOneNews();
    //阅读新闻60s
    readNews(60);
    //返回新闻列表
    utils.backToIndex(indexFlagText);
}

function init(){
    utils.wakeUp(); 
    utils.launch("芒果看点");
}

function signIn(){
    //点击任务
    var taskBtn = text("任务").findOnce();
    if(taskBtn){
        utils.boundsClick(taskBtn);
    }

    //点击签到
    utils.UIClick("iv_isqian");

    //回到新闻
    click(1,1919);
}

//跳转到首页
function jumpToIndex(){

    //循环关闭所有的弹出框
    var flag = text(indexFlagText).findOnce();
    while(!flag){




        sleep(1000);
        flag = text(indexFlagText).findOnce();
    }
}

//领取时段奖励
function getAward(){
    var timeAward = text("领取").findOnce();
    if(timeAward){
        utils.boundsClick(timeAward);
        sleep(1000);
        utils.UIClick("btn_cancel");
    }
}

// 获取一条新闻
function getOneNews(){

    //阅读超过50条，刷新页面
    if(totalNewsReaded > totalNewsOneTime){
        totalNews = 0;
        click(1,1919);
        sleep(2000);
    }

    //上滑找新闻
    var isFindNews = false;//是否找到新闻
    var newsText = "";//新闻标题
    loopTimeToFindNews = 0;
    while((!isFindNews || lastNewsText === newsText)  && loopTimeToFindNews < 20){
        //找新闻次数+1
        loopTimeToFindNews++;

        //进行下翻
        swipe(device.width / 2, device.height / 4 * 2,device.width / 2, device.height / 4, 1000);
        sleep(1000);

        //找到新闻item
        var newsItem = id(newsItemId).findOnce().parent();
        if(newsItem){
            //判断是不是广告,通过是否有阅读数量判断
            var adFlag = newsItem.child(1);
            if(adFlag && adFlag.text() == "广告"){
                newsItem = null;
            }else{
                newsText = newsItem.child(0).text();
                isFindNews=true;
            }
        }
    }
    
    //找到新闻
    if(newsItem){
        lastNewsText = newsText;
        totalNewsReaded++;
        newsItem.click();
    }else{
        toast("20次滑动没有找到新闻，请检查新闻ID");
        exit();
    }
}

//阅读新闻
function readNews(seconds){
    var times = seconds/10;

    //开始滑动
    for(var i = 1;i < times;i++){
        //滑动阅读新闻
        utils.swapeToRead();

        //不存在奖励，直接退出
        if(!id("ll_get_fruit").findOnce()){
            return;
        }

    }
}
