// 打开抖音短视频APP
launchApp("抖音短视频");
console.show();
sleep(5000);


// 定义抖音用户名关键字（正则匹配）
var pattern1 = /衣/;
var pattern2 = /穿/;
var pattern3 = /服/;
var pattern4 = /搭/;
var pattern5 = /装/;

// 点赞
function dz(username){
    var OK = pattern1.test(username) | pattern2.test(username) | pattern3.test(username) | pattern4.test(username) | pattern5.test(username);
    if (OK) {
        sleep(500);
        click(800, 500);
        sleep(100);
        click(800, 500);
        console.log("点赞成功");
        // 获取点赞数
        // dznum();
        i = i + 1;
        // sleep(1000);
        // 广告判断
        gg(username);
        // 点击关注
        // gz();
        sleep(1000);
        swipe(500,1200,500,300,500);

    } else {
        sleep(500);
        swipe(500,1200,500,300,500);
        i = i + 1;

    }
}

// 判断是否是广告
function gg(username){
    // sleep(1000);
    var obj_gg = id("a3w").find();
    // console.log(obj_gg.length);
    var pattern_gg = /[t]/;
    if(obj_gg.length == 3){
        var gg = obj_gg[1].text();
        // console.log("视频介绍：",gg);
        var gg_ok = pattern_gg.test(gg);
        if(gg_ok){
            console.log("该视频是广告");
        }else{
            // console.log("该视频不是广告");
            gz(username);
            // fs();
            // api(username,dz_num,fensi);
        }
    }else{
        // fs();
        // api(username,dz_num,fensi);
        gz(username);
        // console.log("无法判断");
    }
    sleep(1000);
}  

// 关注
function gz(username){
    sleep(1000);
    var obj_gz = id("ah1").find();
    console.log(obj_gz.length);
    if(obj_gz.length == 3){
        obj_gz[1].click();
        console.log("关注成功")
        sleep(1000);
    }
    // fs(username);
    dznum(username);
}

// 点赞数
function dznum(username){
    var obj_dz = id("a5b").find();
    // console.log("判断点赞数",obj2.length);

    if(obj_dz.length == 3){
        var dz_num = obj_dz[1].text();
        console.log("点赞数：",dz_num);
        sleep(1000);
        fs(username,dz_num)
        // api(username,fensi,dz_num);
    }else if(obj_dz.length == 2){
        var dz_num = obj_dz[1].text();
        console.log("点赞数：",dz_num);
        sleep(1000);
        fs(username,dz_num)
        // api(username,fensi,dz_num);
    }else{
        console.log("无法判断");
        sleep(1000);
    }
}

// 粉丝数
function fs(username,dz_num){
    id("dpj").findOne().click();
    sleep(1500);
    
    
    // 判断是否在直播
    try{
        // 正在直播
        var aaa = id("a2i").findOne(1000).text();
        console.log(aaa);
        var zhibo = "yes";
    }catch(err){
        // 未直播
        var zhibo = "no";
    }
    if(zhibo == "yes"){
        sleep(3000);
        // 如果在直播，点击关闭当前页面
        id("tl").findOne().click();
    }else{
        // 留在当前页面
        console.log("该主播未直播");

        try{
            var fensi = id("ahj").findOne(1500).text();
            console.log("粉丝数：",fensi);
        }catch(err){
            var fensi = "";
            console.log("粉丝数：",fensi);
        }
    
        if (fensi == ""){
            // 广告页面点击返回
            console.log("该视频是广告");
            id("ts").findOne().click();
        }else{
            // 用户页面点击返回
            // id("ir").findOne().click();
            sleep(1000);
            detail();
            // api(username,dz_num,fensi);
        }

    }
}
function detail(){
    // id("dpj").findOne().click();
    sleep(1500);
    // 粉丝数
    // var fensi = id("ahj").findOne().text();
    // console.log("粉丝数：",fensi);
    // 关注数
    var gznum = id("ahn").findOne().text();
    console.log("关注数：",gznum);
    // 总获赞数
    var hznum = id("a4p").findOne().text();
    console.log("获赞数：",hznum);
    // 抖音号
    var dyid = id("dq7").findOne().text();
    console.log("抖音号：",dyid.substring(5))
    // 简介
    var jianjie = id("dqw").findOne().text();
    console.log("简介：",jianjie);
    // 调用私信方法
    sixin();
    sleep(1000);
    id("ir").findOne().click();
    // swipe(500,1200,500,300,500);
    // sleep(1000);
}

// 私信/留言
function sixin(){
    try{
        // 进入私信/留言页面
        id("a_y").findOne(1000).click();
        var dialog = "ok";
    }catch(err){
        var dialog = "";
    }
    if(dialog == "ok"){
        sleep(1000);
        try{
            className("android.widget.ImageView").clickable(true).findOne(1000).click();
        }catch(err){
            sleep(100);
        }

        sleep(1500);
        // 点击表情弹出对话框
        id("a9k").findOne().click();
        sleep(1000);
        // 输入私信/留言内容
        setText("衣服很好看哦！");
        sleep(1000);
        // 点击发送
        id("cnn").findOne().click();
        sleep(1000);
        // 返回用户主页
        id("bba").findOne().click();
    }else{
        console.log("此用户已互相关注");
    }
    sleep(1000);
    // id("ir").findOne().click();
    // sleep(1000);
    // swipe(500,1200,500,300,500);
    // sleep(1000);
}


// 访问接口，存储数据
function api(username,dz_num,fensi){
    sleep(1000);
    var randnum = Math.random()*1000;
    // console.log(randnum);
    var url = "";  // 接口地址，存储数据的接口
    var data = {
        "id": "168", 
        "code": "100", 
        "url": "https://live.kuaishou.com/profile/ksp55888", 
        "uid": username, 
        "fabu_time": "1小时前", 
        "release_time": "2019-08-24 14:01:02", 
        "video_url": randnum, 
        "play_count": fensi, 
        "like_count": "111111111", 
        "comment_count": dz_num, 
        "dzrate": "0.0087", 
        "jiami": randnum, 
        "img_url": randnum,
        "create_time": "2019-08-24 14:10:03"
    };
    // console.log(data);
    var r = http.post(url, data);
    sleep(1000);
    if(r.statusCode == 200){
        console.log("请求成功！");
        sleep(1000);
    }else{
        console.log(r.statusCode);
        console.log("请求失败！")
        sleep(1000);
    }
}




//设置循环执行次数
var i = 0;
while(i < 200){
    var randtime = Math.random()*5000 + 2000;
    console.log("睡眠时间",randtime);
    sleep(randtime);
    // 用户名对象
    var obj=id("dpj").find();
    console.log(obj.length)
    // sleep(2000);
    if(obj.length == 3){
        username = obj[1].desc();
        console.log(username);
        dz(username);
    }else{
        username = "此视频无法判断";
        console.log(username); 
        // dz(username);
        swipe(500,1200,500,300,500);
        sleep(1000);
    }
}

    
    

    

 
// 关注
// function gz(){
//     // 点击头像进入用户主页
//     id("dpj").findOne().click();
//     sleep(1500);

    // try{
    //     // var guanzhu = className("android.widget.Button").depth(15).findOne(1000).text();
    //     var guanzhu = id("c72").findOne(1000).text();
    //     // console.log(guanzhu);
    // }catch(err){
    //     // var guanzhu = className("android.widget.TextView").depth(15).findOne(1000).text();
    //     var guanzhu = id("ah4").findOne(1000).text();
    //     // console.log(guanzhu);
    // }
//     if(guanzhu == "关注"){
//         id("c72").findOne().click();
//         console.log("关注成功！")
//         sleep(1000);
//         id("ir").findOne().click();
//     }else{
//         console.log("此主播已关注！")
//         id("ir").findOne().click();
//     }
// }

// 粉丝数
// var fensi = id("ahj").findOne().text();
// console.log("粉丝数：",fensi);
// sleep(1000);
// id("ir").findOne().click();
// sleep(1000);
// dznum(username,fensi);
// sleep(1000);
// api(username,dz_num,fensi)
