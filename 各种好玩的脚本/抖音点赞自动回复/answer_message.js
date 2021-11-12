//打开抖音短视频
launchApp('抖音短视频');
// console.show();
sleep(5000);

// // 点击消息按键
var fanwei_xiaoxi = text("消息").findOne().bounds(); 
click(fanwei_xiaoxi.centerX(), fanwei_xiaoxi.centerY());
sleep(2000);

// // 点击'赞'按键查看点赞人
var fanwei_zan = text("赞").findOne().bounds(); 
click(fanwei_zan.centerX(), fanwei_zan.centerY());
sleep(2000);

function num(){
    sleep(1000);
    id('bvt').findOne().click();
    sixin();
    var le = id('bvr').findOne().text()[1];
    var renshu = id('bvr').findOne().text().replace(/[^0-9]/ig,"");
    console.log(renshu);

    if(le == '了'){
        console.log('只有一个人点了赞');
    }else if(renshu == 2){
        num_2();
    }else if(renshu == 3){
        num_3();
    }else if(renshu == 4){
        num_4();
    }else if(renshu == 5){
        num_5();
    }else if(renshu == 6){
        num_6();
    }else if(renshu == 7){
        num_7();
    }else{
        num_more(renshu);
    }

}

function num_2(){
    // num = 2时,调用sixin()
    sleep(1000);
    // id('bvt').findOne().click();
    // sixin();
    click(268,438);
    sixin();
}

function num_3(){
    // num = 3时,调用sixin()
    sleep(1000);
    // id('bvt').findOne().click();
    // sixin();
    click(268,438);
    sixin();
    click(378,438);
    sixin();
}

function num_4(){
    // num = 4时,调用sixin()
    sleep(1000);
    // id('bvt').findOne().click();
    // sixin();
    click(268,438);
    sixin();
    click(378,438);
    sixin();
    click(488,438);
    sixin();
}

function num_5(){
    // num = 5时,调用sixin()
    // num == 5;
    sleep(1000);
    // id('bvt').findOne().click();
    // sixin();
    click(268,438);
    sixin()
    click(378,438);
    sixin();
    click(488,438);
    sixin();
    click(598,438);
    sixin();
}

function num_6(){
// num = 6时，调用sixin()
// 点击用户列表按钮
    sleep(1000);
    // id('bvt').findOne().click();
    // sixin();
    click(598,438);
    sleep(1500);
    swipe(518,1418,570,486,600);
    sleep(1000);
    // 第一个人已经回复完毕，跳过第一个
    // click(120,375);
    // sixin();
    click(120,602);
    sixin();
    click(120,829);
    sixin();
    click(120,1055);
    sixin();
    click(120,1283);
    sixin();
    click(120,1512);
    sixin();
    id("j3").findOne().click()
    sleep(1000);
}

function num_7(){
    // num = 7时，调用sixin()
    // 点击用户列表按钮
    sleep(1000);
    // id('bvt').findOne().click();
    // sixin();
    click(598,438);
    sleep(1500);
    swipe(518,1418,570,486,600);
    sleep(1000);
    click(120,400);
    sixin();
    click(120,635);
    sixin();
    click(120,860);
    sixin();
    click(120,1085);
    sixin();
    click(120,1315);
    sixin();
    click(120,1550);
    sixin();
    id("j3").findOne().click()
    sleep(1000);
}

// 大于7人时
function num_more(renshu){
    // 点击用户菜单列表按钮
    click(598,438);
    sleep(1500);
    var rs_num = parseInt(renshu);
    // 下拉到底部

    hd_num = Math.ceil(rs_num / 5);
    var i = 0;
    while(i < hd_num){
        swipe(518,1670,570,244,600);
        sleep(1000);
        i = i + 1;
    }

    // 点击最后一个人的头像
    // click(120,1540);
    // sixin();
    
    duoren(rs_num);
    sleep(1000);
    click(120,1540);
    sixin();
    click(120,1300);
    sixin();
    click(120,1070);
    sixin();
    click(120,840);
    sixin();
    // 点击返回键退出名单列表
    id("j3").findOne().click()
    sleep(1000);

}

// 多人页向上滑动  516,744  21人上滑16次
function duoren(rs_num){
    sleep(1000);
    var huadongcishu = rs_num - 5;
    var i = 0;
    while(i < huadongcishu){
        sleep(1000);
        click(120,1540);
        sixin();
        swipe(518,500,518,773,600);
        i = i + 1; 
    } 
}


// 发送私信动作代码部分
function sixin(){
    sleep(1000);
    // 判断用户名是不是被封号状态的"已重置"
    var user_name = id('bt9').findOne().text();
    if(user_name ==''){
        console.log('11111')
        sleep(500);
    }else{
        console.log(user_name);
        // 点击用户右上角更多信息
        id('d76').findOne().click();
        sleep(1000);
        // 点击私信框
        id('cqi').findOne().click();
        sleep(1000);
        // 输入私信/留言内容
        var sx_neirong = "感谢您的关注，针对衣服的一系列问题，欢迎您私信我们留下您的联系方式，我们会主动联系您。或者拨打主页的联系电话，便于我们为您解决问题。"
       
        // 判断是否发送过信息
        var neirong = id('bq7').find().length;
        if(neirong == 0){
            // 点击表情弹出对话框
            id('a_o').findOne().click();
            sleep(1000);
            // 写入私信内容
            setText(sx_neirong);
            sleep(1000);
            // 点击发送
            id("cqa").findOne().click();
            sleep(1000);

            // 点击左上角返回按钮
            id("bd3").findOne().click();
            sleep(1000);
            id("j3").findOne().click();
            sleep(1000);
        }else{
            // 点击左上角返回按钮
            id("bd3").findOne().click();
            sleep(1000);
            id("j3").findOne().click();
            sleep(1000);
        }
    }
    id("j3").findOne().click();
    sleep(1000);
}

// 滑动部分代码
function huadong(){
    // var fanwei =  text("赞了你的作品").findOne().bounds();
    var fanwei =  id('bvv').findOne().bounds();
    // console.log(fanwei);
    // sleep(1000);
    // 计算第一个人所占的范围大小
    var fanwei_x = fanwei.centerX();
    var fanwei_y = fanwei.centerY();

    var juli = fanwei_y * 2 - 380;
    console.log('需要滑动的距离为：',juli);

    var huadong_y = 1200 - juli;

    // sleep(1000);
    swipe(500,1200,500,huadong_y,800);
    // sleep(1000); 
}



//设置循环执行次数
var i = 0;
while(i < 1000){
    var cishu = i + 1;
    console.log('第',cishu,'次执行');
    num();
    huadong();
    i++;
}



