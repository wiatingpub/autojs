## 正文

调试麻烦？？？看这篇文章就对了。

weditor 地址

```
https://github.com/openatx/weditor
```

先把weditor安装好并运行起来。然后：

1. .设备通过USB线连接电脑。
2. 在cmd命令行中输入adb tcpip 5555
3. 拔掉数据线
4. 在cmd命令行中输入adb connect 192.168.1.5(设备在局域网中的ip)

在weditor 网页中输入手机的ip并且点击Connect连接

![img](https://img2018.cnblogs.com/common/908249/201912/908249-20191202095434074-1437890406.png)

 

连接成功后，点击“Dump Hierarchy” 获取最新的界面。这里以微信为例，然后我们会看到布局分析，点击我们需要操作的控件，可以获取到resourceId、className、text等信息，然后我们运用autojs进行操作。

```js
app.launchApp("微信");//打开微信
sleep(1500);//暂停1.5秒
 id("ka").findOne().click();//点击微信搜索按钮
//text("搜索").findOne().click();
```

autojs本身就有布局分析，但不一定所有手机都能用



## 加入免费社群

![image-20211112110252165](https://gitee.com/xi_fan/img/raw/master/image-20211112110252165.png)

微信搜索：稀饭下雪

回复：autojs，获得autojs稳定安全版本

回复：加群，加入autojs社群

关注我，了解更多有趣好用的脚本，一起玩autojs

