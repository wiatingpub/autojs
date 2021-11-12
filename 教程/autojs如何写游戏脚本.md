## 触摸模拟

- `sleep(n)`：暂停运行n毫秒，游戏脚本中最常出现的一个命令；有一些操作必须给它一定的缓冲时间才能正确运行完成。

- 随机数： `random(min,max)`指定区间、`random()`范围是[0,1)；点击坐标时常设置一个随机偏移，防止被检测到（每次都点同一个点还是太明显了）

- 分辨率适配问题，`setScreenMetrics(1080, 1920);`、表示脚本适合的屏幕宽高为1080x1920（编脚本时基于的设备），如果在别的分辨率手机上运行则会自动放缩光标。听上去很好的一个功能，一般游戏脚本必加这一行，但具体效果如何我没有测试过。

- `click(x,y)`：点击坐标（无需root权限），返回是否成功，点击过程大约150ms，可能被其他事件中断。更长时间的点击如`longClick(x,y)`、持续600ms。

- `press(x,y,duartion)`：按住坐标，一般超过500ms才被系统认为是长按。
- `swipe(x1,y1,x2,y2,duration)`： 从(x1,y1)滑动到(x2,y2)，持续duration。
- `RootAutomator`
    上面的几个触摸操作都是免root的，而基于RootAutomator对象的触摸需要root权限，优点是执行没有延迟，明显比click要快。

```sh
var ra=new RootAutomator(); //初始化一个对象
ra.tap(x,y,id); //id代表不同“手指”，用于多点触摸，不需要时可省略该参数
ra.swipe(x1,y1,x2,y2,duration,id)
ra.press(x,y,duration,id)
// 这些命令组合在一起就能完成复杂的操作了~
ra.touchDown(x,y,id)
ra.touchMove(x,y,id)
ra.touchUp(id)
```

- 模拟按键；（返回bool值）

```js
if(back()){};    //按下返回键
home()  //返回桌面
还有一些需要root权限的，开头字母大写:
//Home()、Back()、Power()、Menu()、OK()、KeyCode()...
```



## colors

颜色常用十六进制值或RGB值来表示，如蓝色可表示为`#0000FF`或`(0,0,255)`，一般都是`#`后面带6位十六进制数，分别表示R、G、B，但Autojs是8位，前面多了一个`A(Alpha)`、表示透明度，即ARGB。

- Autojs通过一个16进制整数或一个字符串表示一个颜色，两者可以互相转换

```js
var myBlue=colors.toString(color.BLUE); //返回#ff0000ff,colors.BLUE代表蓝色，后面必须大写。
var numBlue=colors.parseColor("#ff0000ff"); //返回-16776961,至于为什么是这个数我也不清楚，平时还是用字符串表示比较好。
```

- colors对象里还有一些判断两个颜色的相似度、返回A、R、G、B通道值的函数，平时也基本上用不上；颜色的用途主要体现在后面的多点找色上。



## images

游戏脚本的灵魂所在，images主要有图片处理、找图、找色几个部分；想让脚本识别游戏的某个区域、如果该区域的位置是固定的，通过构造多点比色比较快，而如果位置不固定则常用找图的方式，虽然占用资源比较多但准确性有保障。

- images对象使用完后必须回收，防止内存泄漏。

```js
var img=images.read("./name.png");  //读取图片，错误时返回null
//var img=images.load(url); //从网址获取图片
//...图片操作后回收
img.recycle();
// 例外：captureScreen()返回的图片无需回收
```

- mages对象能对图像进行复制、保存、Base64编码解码、剪切、调整大小、放缩、旋转、拼接、灰度化、阈值化、颜色控件转换、二值化、模糊与平滑处理、滤波...（强是很强大，就是基本上用不上）
- 获取截图权限：在找图找色之前往往要先获取当前屏幕的截图，这个截图一般是临时的、不会保存到文件（也可以设置保存）。 截图之前要向系统**申请一次**截图权限：

```js
if(!requestScreenCapture()){    //可指定参数true（横屏截图） 或者 false（竖屏截图）
    toast("请求截图失败");
    exit();
}
```

- 请求截图: `captureScreen`

```js
//在此之前记住要请求一次截图权限
var img=captureScreen();    //可以指定保存路径path
```

- 颜色获取，很重要的一个函数，后面多点找色时可以先用它获取参数值。

```js
//获取某点的ARGB颜色值
var color=images.pixel(img,100,200);    //img是之前创建的images对象
```

- 区域找色（一种颜色）；`findColor`、`findColorInRegion`、`findColorEquals`

```js
//首先说下region和threshold这两个参数，后面的找色函数options里都要用到：
//region、找色区域，默认全图、指定[x,y]代表左上角点，从(x,y)到右下角；指定[x,y,width,height]则代表从(x,y)到(x+width,y+height)。
//threshold、相似度临界值，0~255，默认为4；similarity=1-threshold/255，可以算出默认相似度达到了0.98，觉得太严了可以适当增大threshold
var point = images.findColor(img, "#ff0000", { region: [100, 200], threshold: 10 });
//如果找到则返回一个点，如：{463.0, 1242.0}；找不到返回null。
//这里颜色值是6位，8位也行不过会忽略A通道（透明度）。
// findColorInRegion，功能和findColor一样，只是优化了下参数表示。
var point=images.findColorInRegion(img,"#ff0000",100,200,1080,1920,10);
// findColorEquals，要求颜色完全相等，相当于findColor的threshold参数设为0
var point=images.findColorEquals(img,"#ff0000",100,200,1080,1920);
```

- 多点找色：`findMultiColors`，先定位第一个点的颜色、根据(x,y)偏移获取并对比第二个点的颜色...以此类推，命令很麻烦，通常需要写一个函数来构造颜色列。

```js
var point = images.findMultiColors(img, "#ff949fc7",    //第一个点
    [[60, 60, "#ffe6efe6"], //颜色Array，
    [60, -60, "#ffeef3e6"],
    [-60, 60, "#ffe6efe6"],
    [-60, -60, "#ffeef3e6"]],
    { region: [1548, 803, 140, 140] })  //指定区域
```

- 检测某坐标颜色：前几个命令都是根据颜色找坐标，这个是给坐标、比较颜色

```js
if(images.detectsColor(img,"#fed9a8",100,200,16,"diff")){}
//最后两个参数可省略，代表threshold和匹配算法；x=100,y=200
```

- 找图：有时候找颜色会匹配到一些奇怪的地方去，还得用找图来实现，有`images.findImage`、`images.findImageInRegion`、`images.matchTemplate`。

```js
var temp1=images.read(pathToImage);
var point=images.findImage(img,temp1,{ region: [100, 200], threshold: 10 });
//同样findImageInRegion只是优化了下参数排列
//matchTemplate可以同时返回找到的多个位置，通过max控制最大的结果数量
var result=images.matchTemplate(img,temp1,{ region: [100, 200], threshold: 10 ,max:5});
//返回类型是一个MatchingResult对象，有point和similarity这两个数据成员。
```



## 脚本结构管理

#### Module

在一个文件里通过`module.exports =...;`把某个对象导出，从而可以在另一个文件通过`var name=require('file.js');`导入；相当于把整个文件当做一个函数，把exports的东西当做返回值。感觉用起来也不太方便，我选择不用这个功能。

#### Threads

- 启动一个子线程，`threads.start`：

```js
//启动一个无限循环的线程
var thread = threads.start(function(){  //用thread对象可以控制线程运行状态，如果不需要操作可以改为：
//threads.start(function(){
    while(true){
        log("子线程运行中...");
        sleep(1000);
    }
});
sleep(5000);
thread.interrupt();
```

- `threads.shutDownAll()`： 停止所有通过`threads.start()`启动的子线程

- 等待线程开始执行（一般start后需要一段时间）：`thread.waitFor();`（这里thread是前面创建的thread变量）

- 等待线程执行完成：`thread.join();`，参数可以指定一个等待时间

- 中断线程运行：`thread.interrupt();`

- 注意多线程中的变量问题，涉及到**线程安全**，文档里说的很详细

- 线程间的通信与传递变量，通过`var connect = threads.disposable();`实现；发送结果：`connect.setAndNotify(s);`，接收结果：`connect.blockedGet(s);`



## 交互界面

#### Events、Dialogs、Console

- Events模块主要用来监听按键、触摸、通知等，但放在单线程里可能会因为程序其他部分而无法及时执行，造成非预期的结果，常常和多线程`Threads`模块一起使用，如音量键关闭脚本的例子：

```js
auto();
threads.start(function(){ //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    events.observeKey();    //启用按键监听
    events.on("key_down", function(keyCode, events){
    //常用事件有key、key_down、key_up、exit、toast、notification、touch(触摸某点)
        if(keyCode == keys.volume_up){  //音量上键关闭脚本
            exit();
        }
    });
});
events.on("exit", function(){   //脚本停止运行时会触发exit事件
    toast("脚本已结束");
});
while(true){
    log("脚本运行中...");
    sleep(2000);
}
```

- Dialogs

这部分提供对话框支持，但由于是弹出一个全屏的消息提示框，实际体验是并不太能用上；如果脚本和用户的交互性比较强的话可以考虑一下。

- Console

控制台的作用更像是用于调试，但一般Windows下用VSCode写脚本也不需要在控制台上显示吧，所以这部分给人的感觉也是很鸡肋...不过`console`的UI是固定的，也可以悬浮、最小化；有时不想设计UI的时候可以偷懒直接拿`console`过来凑合用用。



#### Floaty、UI

界面设计这部分内容相当多，而且官方文档也有很多写得很简略（甚至一笔带过），要想真正从零开始设计出一个实用好看的UI出来还是有难度的；我是建议去网上多找几个模板文件运行运行，在别人的基础上修改起来就快多了，看不懂的地方再去翻翻文档解决。一般UI设计好后再和程序一对接（通过UI各组件的id），就可以打包做成apk了~



## 加入免费社群

![image-20211112110252165](https://gitee.com/xi_fan/img/raw/master/image-20211112110252165.png)

微信搜索：稀饭下雪

回复：autojs，获得autojs稳定安全版本

回复：加群，加入autojs社群

关注我，了解更多有趣好用的脚本，一起玩autojs

