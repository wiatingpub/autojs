const utils = require('common.js');

/**
 * 通过酷安或者豌豆荚的连接下载
 * 1：浏览器下载
 * 2：小米app商城下载
 */
//趣头条
download("http://api.1sapp.com/app/download",1);
//中青看点
download("https://res.youth.cn/youth_v1.2.8_code20_180824_c3001.apk",1);
//红包头条
download("https://www.wandoujia.com/apps/com.martian.hbnews/download/dot?ch=detail_normal_dl",1);
//微鲤看看
download("https://www.wandoujia.com/apps/cn.weli.story/download/dot?ch=detail_normal_dl",1);
//牛牛头条
download("https://www.wandoujia.com/apps/com.huolea.bull/download/dot?ch=detail_normal_dl",1);
//惠头条
download("https://www.wandoujia.com/apps/com.cashtoutiao/download/dot?ch=detail_normal_dl",1);
//薪头条
download("http://www.shouzuan.net/download.php?id=19578",1);

//下载app
function download(url,type){
    //打开浏览器下载
    app.openUrl(url);
    if(type == 1){
        //立即下载
        utils.UITextClick("立即下载");
        //循环找安装
        var installFlag = false;
        while(!installFlag){
            var uiele = text("安装").findOnce();
            if(uiele){
                uiele.click();
                installFlag = true;
            }
        }
        //安装完成
        var installFinishFlag = false;
        while(!installFinishFlag){
            var uiele = text("完成").findOnce();
            if(uiele){
                uiele.click();
                installFinishFlag = true;
            }
        } 
    }

    if(type == 2){
        //循环找安装
        var installFlag = false;
        while(!installFlag){
            toast(installFlag);
            var uiele = text("安装").findOnce();
            toast(123);
            if(uiele){
                toast(uiele);
                uiele.click();
                installFlag = true;
            }
            sleep(2000);
        }
    }

}


