### Auto.js简介

Auto.js是利用安卓系统的“辅助功能”实现类似于按键精灵一样，可以通过代码模拟一系列界面动作的辅助工作。
与“按键精灵”不同的是，它的模拟动作并不是简单的使用在界面定坐标点来实现，而是类似与win一般，找窗口句柄来实现的。

Auto.js使用JavaScript作为脚本语言，目前使用Rhino 1.7.7.2作为脚本引擎，支持ES5与部分ES6特性。

### 推荐教程

Auto.js Pro安卓全分辨率免ROOT引流脚本开发视频教程(HD超清1080p)

### 开发文档

Auto.js Pro开发文档
文档尚在完善中，可能有文档描述和代码实际行为有出入的情况。

### 为什么要使用Auto.js Pro开发脚本，有什么特点？

吸引我使用Auto.js Pro的原因有很多。最主要的几个原因是：

- Auto.js Pro能开发免ROOT的安卓脚本
- Auto.js Pro基于节点操作，能开发全分辨率的脚本，自动适配各种安卓机型
- Auto.js Pro丰富的UI组件，能自定义各种样式的安卓界面
- Auto.js Pro使用的javascript的语法比较优雅，代码可读性强
- Auto.js Pro的命令库非常的丰富，接口比较多
- Auto.js Pro脚本文件体积比较小。1000行的代码，打包后的apk文件只有3-5M，还没有广告

### 示例代码

百度文字识别(自动获取token)

```js
 //此代码由飞云脚本圈整理提供（www.feiyunjs.com）
function Baidu_OCR(imgFile) {
    access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YIKKfQbdpYRRYtqqTPnZ5bCE&client_secret=hBxFiPhOCn6G9GH0sHoL0kTwfrCtndDj").body.json().access_token;
    url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
    imag64 = images.toBase64(images.read(imgFile));
    res = http.post(url, {headers: {'Content-Type': 'application/x-www-form-urlencoded'},image: imag64,image_type: "BASE64",language_type:"JAP"});
    str = JSON.parse(res.body.string()).words_result.map(val => val.words).join('\n');
    return str;
}

imgFile = "/storage/emulated/0/tencent/Tim_Images/-2c197ea407301935.jpg";
log(Baidu_OCR(imgFile));

```



## 加入免费社群

![image-20211112110252165](https://gitee.com/xi_fan/img/raw/master/image-20211112110252165.png)

微信搜索：稀饭下雪

回复：autojs，获得autojs稳定安全版本

回复：加群，加入autojs社群

关注我，了解更多有趣好用的脚本，一起玩autojs

