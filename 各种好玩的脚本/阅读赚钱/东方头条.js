const utils = require('common.js');

utils.wakeUp(); 
utils.launch("东方头条");
sleep(15000);
setScreenMetrics(1080, 1920);


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
var newsItemId = "oc";//新闻条目ID
var indexFlagText="发布";//首页特有的标志文字

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
    utils.backToIndex(indexFlagText);
}

//跳转到首页
function jumpToIndex(){

    //循环关闭所有的弹出框
    var flag = text(indexFlagText).findOnce();
    while(!flag){
        //关闭推荐
        var awardClose = id("ts").findOnce();
        if(awardClose){
            awardClose.click();
        }
        
        //点击左下角关闭提现提醒
        click(1,1919);

        sleep(1000);
        flag = text(indexFlagText).findOnce();
    }
}

//领取时段奖励
function getAward(){

    //关闭推荐新闻
    var awardClose = id("ut").findOnce();
    if(awardClose){
        awardClose.click();
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
        var newsItem = id(newsItemId).findOnce();
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
        swipe(device.width / 2, device.height * 0.8 ,
            device.width / 2, device.height * 0.5, 5000);

        swipe(device.width / 2, device.height * 0.8 ,
            device.width / 2, device.height * 0.5, 5000);

        //关闭继续阅读
        var textOk = id("text_ok").findOnce();
        if(textOk){
            textOk.click();
        }

    }
}
