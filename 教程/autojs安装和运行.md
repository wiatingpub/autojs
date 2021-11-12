## 安装必备工具

> VS Code 全称：Visual Studio Code

官网下载地址：<https://code.visualstudio.com/Download>

选择自己合适的版本下载，我是win10电脑，所以我以win10举例。

- 点击下载
    ![image-20211112151736294](https://gitee.com/xi_fan/img/raw/master/image-20211112151736294.png)

- 安装VS Code
    ![image-20211112151752156](https://gitee.com/xi_fan/img/raw/master/image-20211112151752156.png)
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213000832185.png)![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213000853442.png)![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213000907687.png)
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/2020121300091857.png)
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213000928228.png)



> 设置运行Auto.js所需的环境

安装插件，中文插件和Auto.js插件

![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001021493.png)

![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001044765.png)

![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001054597.png)

![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001103399.png)

> 安卓模拟器

市面上模拟器有很多，我就拿我现在在用的来说吧 夜神模拟器下载地址：https://www.yeshen.com/

- 点击下载
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001139655.png)

- 选择安装路径后点击安装
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001158209.png)

- 安装完成
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001228167.png)

安装完模拟器后需要设置一些东西

- 把平板模式改成手机模式（不必须，根据个人喜好来）
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/2020121300124292.png)
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001257194.png)

- 修改好后重启，再设置网络为桥接模式，方便做调试
    ![在这里插入图片描述]()
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001324881.png)

- 记住IP地址，方便调试

- 进入系统应用 - 点击设置 - 拉到最底下 - 选择关于平板电脑 - 点击状态信息 - IP地址
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001338243.png)
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001351811.png)![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001403344.png)



> 模拟器上安装Auto.js

- 把下载好的Auto.js的apk文件直接拖到模拟器里，会自动安装。

- 安装好后启动auto.js，根据提示启用无障碍服务。
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201213001419820.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3Mjc4NDE4,size_16,color_FFFFFF,t_70)
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201213001428710.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3Mjc4NDE4,size_16,color_FFFFFF,t_70)

- 再次回到Auto.js这个软件中，左上角的列表点开，然后选择这三项
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201213001438626.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3Mjc4NDE4,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20201213001446360.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3Mjc4NDE4,size_16,color_FFFFFF,t_70)

>  VS Code连接Auto.js

- 打开VS Code，然后按住Ctrl+Shift+P键，搜索Auto.js，然后选择Start Server
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001455669.png)

- 再次搜索Auto.js，选择连接到新设备(Connect)。
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001505557.png)
- 先点击输入设备IP地址，然后再输入之前我们记好的安卓模拟器地址，再回车
    ![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001515747.png)

- 右下角出现弹框说明连接成功，可以正常运行了。
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201213001545953.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3Mjc4NDE4,size_16,color_FFFFFF,t_70)



>  测试

新建一个js后缀的文件，然后在VS Code上打开它

```js
//输入以下代码运行测试
toastLog("Hello World!");
```

![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001559235.png)

按住Ctrl+Shift+P键，搜索Auto.js，然后选择运行脚本(Run)，观察模拟器情况
![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001654449.png)

测试结果：
![在这里插入图片描述](https://gitee.com/xi_fan/img/raw/master/20201213001742783.png)





## 加入免费社群

![image-20211112110252165](https://gitee.com/xi_fan/img/raw/master/image-20211112110252165.png)

微信搜索：稀饭下雪

回复：autojs，获得autojs稳定安全版本

回复：加群，加入autojs社群

关注我，了解更多有趣好用的脚本，一起玩autojs

