## 基础

> 关于应用名与应用包名

多个应用的应用名可能重复，可用app.getAppName(packageName)获取应用名，应用包名是唯一确定应用的标识（如微信的包名是"com.tencent.mm", QQ的包名是"com.tencent.mobileqq"），可用getPackageName(appName)获取应用包名



> 如何打开应用——App模块

app模块提供一系列函数，用于使用其他应用、与其他应用交互

- 通过应用名称启动应用：app.launchApp(appName)，通过应用名称启动应用，如果该名称对应多个应用，则只启动其中某一个。

- 通过应用包名启动应用：app.launch(packageName) ，[通过应用包名启动]似乎比[通过应用名称启动]速度更快

- 通过应用包名启动应用，packageName为 {string}，相当于app.launchPackage(packageName) launch("org.autojs.autojs");



> 更多操作

currentPackage()返回当前正在运行的应用包名
currentActivity()返回当前正在运行的Activity的名称{string}
waitForPackage(package[, period = 200])等待指定的应用包出现，period为轮询等待间隔（ms）
waitForActivity(activity[, period = 200])等待指定的Activity出现



## 进阶

### 直达应用内的某个页面——启动Activity

Activity (应用程序活动)分割了应用中不同的界面和功能（例如微信的主界面、朋友圈、聊天窗口都是不同的Activity），通过Activity可以直接进入应用的特定界面，而不仅仅是启动应用

在Auto.js中，启动Activity有两种方法：

- 用app.startActivity
- 用Shell命令（似乎后一种更简洁方便）

但无论用哪种方法，启动Activity都离不开Intent这个工具

> Intent(意图)，Intent是一个消息传递对象，Android中提供了Intent来协助应用间的交互与通讯。

其用途一般有三种：

- 启动活动(Activity)：通过活动可以直达应用内的某个页面
- 通过startActivity(Intent)，可以隐式启动新的 Activity 实例，其中Intent 描述了要启动的 Activity
- 启动服务(Service)：不使用用户界面，而在后台执行操作的组件
- 通过 startService(Intent)可以启动Service，其中Intent 描述了要启动的服务Service
- 传递广播(Broadcast)： 广播是任何应用均可接收的消息，通过 sendBroadcast(Intent )可以将广播传递给其他应用
  

> app.startActivity(options) 启动Activity

在Auto.js中，提供了与Intent(意图) 相关的进阶函数startActivity和sendBroadcast，它们可完成app模块没有内置的应用交互功能

app.startActivity(options)根据options选项构造一个Intent对象，并启动相应的Activity

其中，options选项有：

- action {string} 要完成的动作，如"android.intent.action.SEND"
- ps. 当action以"android.intent.action"开头时，可以省略前缀，直接用"SEND"
- category {Array} 意图的类别，比较少用
- packageName {string} 目标包名
- className {string} 目标Activity或Service等组件的名称
- type {string} 表示和该意图直接相关的数据的类型，如"text/plain"为纯文本类型
- data {string}如要打开一个文件, action为"android.intent.action.VIEW", data为"file:///sdcard/1.txt"。
- extras {Object} 额外信息,如发送邮件时的邮件标题、邮件正文
- flags {Array} intent的标识，字符串数组，例如[“activity_new_task”, “grant_read_uri_permission”]
- root {Boolean} 是否以root权限启动、发送该intent

- 更多参见[官方文档](https://hyb1996.github.io/AutoJs-Docs/#/app?id=appintentoptions)

> options(即intent的参数)如何获取？

className（即Activity）、packageName通过Auto.js自带的布局分析获取
category、action等可以通过例如"intent记录"，"隐式启动"等应用拦截内部intent或者查询暴露的intent。

其中拦截内部intent需要XPosed框架，或者可以通过反编译等手段获取参数。总之，没有简单直接的方法。
举个例子：

例如，在某界面用Auto.js查询到应用包名com.netease.buff，当前活动

```js
com.netease.buff.userCenter.pushSetting.PushSettingsActivity
又使用“隐式启动”应用查询到Intent为
Intent {
act=android.intent.action.MAIN
cat=[android.intent.category.NOTIFICATION_PREFERENCES]
flg=0x14000040
cmp=com.netease.buff/.userCenter.pushSetting.PushSettingsActivity
}
```

```js
function gotoOptions() {//打开设置页面
    app.startActivity({
        action: "android.intent.action.MAIN",
        packageName: "com.netease.buff",
        className: "com.netease.buff.userCenter.pushSetting.PushSettingsActivity",
        category: [android.intent.category.NOTIFICATION_PREFERENCES]
    });
    return;
}
gotoOptions();
```

注意，此方法有一个限制和缺点，使用此方法，填入的action必须满足android.intent.action.XXX 的格式

例如有时，在“隐式启动”应用中，得到的intent信息如下：

```js
Intent {
act=DELIVERY
flg=0x14000040
cmp=com.netease.buff/.entry.SplashActivity
}
```

若继续将这里的DELIVERY 填入action，则会出错（因为上面介绍过，如果写action: "DELIVERY"，将会被startActivity自动补全为action: "android.intent.action.DELIVERY"，然而很明显没有这个action）

我们另寻出路：因为给出了cmp（即component）参数，可尝试用用Shell命令启动Activity


> 用Shell命令启动Activity

打开应用或Activity的另一种方法是：通过AndroidStudio的Shell命令

```shell
 shell('am start -p com.tencent.mm');
```

启动微信，这里使用了Shell命令中的am命令，shell即Unix Shell，是在类Unix系统提供的一系列命令。
在Auto.js大致等同于用adb执行命令"adb shell"，有两种执行shell命令的方式：

- shell函数：一次性执行单条命令。
    一般格式shell(cmd[, root])，[root]{Boolean} 表示是否以root权限运行，默认为false
- Shell对象：一般用于需要执行多条命令的情况，这时Shell对象效率更高。（因为每次运行shell函数都会打开一个单独的shell进程，而Shell对象自始至终使用同一个shell进程）
    一般格式new Shell(root)、Shell.exec(cmd)、Shell.exit()等，详见官方文档
- Shell之am命令：Activity Manager
    am命令即Activity Manager命令，用于管理应用程序活动、服务等。
    以下命令均以"am "开头，例如shell('am start -p com.tencent.mm');
- start [options] intent：启动 intent 指定的 Activity
    option常用参数（可以不填）：参见官方文档；
    intent常用参数：
    - a action
    - n component，指定组件名称，如“com.example.app/.ExampleActivity”，注意，这里的component参数是上面的startActivity所没有的，这个参数的获取来自于“隐式启动”应用中"cmp"的值
    - c category
    - f flags
    - t Mime_type
        d data_uri

举个例子：

在“隐式启动”应用中，得到的intent信息如下：

```js
Intent {
act=DELIVERY
flg=0x14000040
cmp=com.netease.buff/.entry.SplashActivity
}
```

故对应的Shell命令如下

```js
shell('am start -a DELIVERY -f 0x14000040 -n com.netease.buff/.entry.SplashActivity');
```

法一转换为法二
另外，可以用法一中的option来构造一个Intent，并转换为对应的shell的intent命令的参数——app.intentToShell(options)，示例

```shell
shell("am start " + app.intentToShell({
packageName: “org.autojs.autojs”,
className: “org.autojs.autojs.ui.settings.SettingsActivity_”
}), true);
```



## 加入免费社群

![image-20211112110252165](https://gitee.com/xi_fan/img/raw/master/image-20211112110252165.png)

微信搜索：稀饭下雪

回复：autojs，获得autojs稳定安全版本

回复：加群，加入autojs社群

关注我，了解更多有趣好用的脚本，一起玩autojs

