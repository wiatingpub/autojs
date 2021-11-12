
## Autojs的历史
Auto.js 就是一个可以用来开发脚本的app，它不只是支持开发，还支持打包app、远程调试等强大的功能，最重要的是入门简单，不用root，只要你有一台安卓手机，然后懂点js就可以了。

> autojs有什么优点？为什么推荐？

- 抛弃了 root，而是基于无障碍服务。为啥一而再，再而三的强调无需 root，那是因为 root 刷机本身是一个存在风险的事，无需 root 就代表着远离风险。

- 上手简单，你看看 Auto.js 内置的教程，就能写出很多有趣的脚本。这是因为 Auto.js 虽然依托于 JS 语言，却做了很多封装。别的不说，单支持中文变量这一点就很贴心。

- 支持打包，可以将脚本打包成 apk 文件，这一点对不爱折腾的小伙伴来说，简直是福音。

> 那么它收费吗？毕竟我穷

看版本，目前最新的版本都是收费的，不贵，45块钱永久会员，不过4.1之前的版本都是开源的，并且功能基本上差不多，我有充了会员，不过目前仍旧是用4.1的版本。

![image-20211112011937635](https://gitee.com/xi_fan/img/raw/master/image-20211112011937635.png)

> 都充VIP了，都是大户了，为什么还用4.1？

因为最新版本都是阉割版，新版本屏蔽了很多主流应用，而4.1版本仍旧是可用的，不过4.1版本已经被全网下架了，没有隐藏外挂的网上不好找。

> 4.1这么屌为什么会被下线？

我去 Github 的 Issues 讨论区考了考古，发现了这些线索

![图片](https://mmbiz.qpic.cn/mmbiz_png/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhGh3a78TcpLHtZGGvP8WbjF5VqnqGcaW68gQW3Bpsic8jXYnLAAra6sA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

原因作者也说的明明白白，因为 Auto.js 被大面积的用于灰产，作者怕事态超出他的控制，才在无奈之下做出这样的选择。

不过在上一年 10 月份，作者还推出了一款 Auto.js Pro，我去查了查，一次性收费 45 元。

相比以前的免费版本，Pro 增加了不少开发向的功能，而且针对灰产进行了限制。

![图片](https://mmbiz.qpic.cn/mmbiz_png/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhO4lGbFdknhtW1nHibDNhap3dfrWWm7NzoWHt8Qibj9x4L5ic9xffbcSfw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 这么厉害，怎么获得安全的4.1版本？

随着网上 Auto.js 免费版的全网下架，现在能见到的大都是各路高玩的私藏版本，唯一的风险就是害怕别有用心者在安装包里加料。

如果小伙伴们不放心网上流传的乱七八糟的版本，可以用我最后所提供的 Auto.js 最新最稳定的免费版本。



## 给几个好玩的用法
**微信删除僵尸好友**

不知道小伙伴生活里有没有碰到过这种尴尬事哈，你碍于情面加了不认识的谁谁谁的微信，之后对方也不跟你聊天，就躺在通讯录的角落静静的吃灰。

直到某一天你误操作了微信，看到的却是一个红色感叹号。

是不是想想就难受，关键是微信还没有这种直接检查对方是否将你删除的功能。

其实网上不乏第三方工具帮你实现这个功能，但不是收费，就是存在各种隐患，哪里有 Auto.js 脚本用的安全方便。

不知道大家听没听说过有个小技巧，微信进行转账时，对方把你拉黑删除后的提示信息会发生变化。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjh3wkreK9vj6JM2o8KRhMicJ1KGaUey0s0QoHFYcy84zlsNRb30Yic9G1g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

左图是正常情况下的转账截图，右图则是对方将你删除后的转账截图，这种方法还不会打扰到对方。

有了检测的方法，又需要你重复对每个好友测试，不正符合脚本的定义。

网上有大佬凭借上面的方法，利用 auto.js 实现了自动化清楚僵尸好友的功能。

不仅如此，大佬还把项目开源了出来，GitHub 和 Gitee 上都能查的到，项目名就叫CleanUpWeChatZombieFans。

作者贴心的写了个 UI 界面，只要将我提供的压缩包解压到脚本文件夹，运行程序后你会看到作者的提醒。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhkhkCiaibRWibAPoAXnEkL2TsuImVs9ZiasOH0SmIQVfPkbDKRbodQRby5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

然后点击主页面的测试好友，脚本就会真正跑起来，对每个好友进行测试。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhbia8YpCee7iaVna4GpKmexic6e9ibicnPOweIdsX7j0RBM68y4WVICPAiatg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

最后你会得到一份正常好友和异常好友的清单。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhxpTEnRrA38068wBykPjUkxf62PSVyC2NvGkibm3nSUpxBN7oey4LIKQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在最下方还贴心的为你提供了删除好友的选项。

美中不足的大概就是这个脚本没有办法判断被限制登录或账号异常的情况，所以删好友之前最好再人工检查一遍，小心出现误会。

看看整体的效果图。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhlqz1S6VGTu15nf149YUVmQ7ZkGwKO4P1Iriad4LqIibCDfdqKKR2G6Nw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

更巧的是刚好在截稿的前一天，这个脚本刚好完成了升级，改了几个 Bug，正适合我们去尝试。

**喵币领取**

双十一不是马上就要来了，不知道大家喵币准备够了没。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhvJGrAehKEibJoWLicC4UOIx5R5CSqw4Kuibluf4RORaHTiakkACxl7XOrA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

接下来介绍的脚本可以通过帮你打开喵铺主页，点击小猫自动获取喵币，还可以浏览对应店铺获取喵币。

而你需要做的，仅仅只是动手点个运行按钮，看看效果图。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhIB09nETBpeUyF51CXFIDFWGQkicFQXiaicq1eXOmsFlt7txuib2O2SC4vQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)      

别觉得上面眼花缭乱，40 多秒的录屏为了上传硬生生砍到 40 多帧。。。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhHIgPjzl2cicknRibuTo3vWONpyaudjq7xwQ80HPy4wMMzHqUZUlwCbqw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

实际看上面的代码，脚本会在适当的地方停顿，如果你觉得脚本整体运行过慢，可以适当的减少上面 sleep() 方法内的数值。

但为此你要承担淘宝官方关于自动化脚本监测的风险，当然有条件的小伙伴上旧版本的淘宝，旧版本的淘宝就截稿为止还是可用滴。

**自动刷短视频**

刷短视频类的脚本网上简直不要太多，这还不因为很多短视频 App 在推广的初期都承诺了刷视频可提现的承诺。

这个脚本就是模仿手机滑动观看短视频的，其实只要是下拉类的 App 都能适配，下面以某音为例看看效果图。



​      ![图片](https://mmbiz.qpic.cn/mmbiz_gif/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhn10eMP0LpSZ6Lw6LQI9oib9MxJ2HmDswbic0mN5JfofX7iaubVoDlMYWA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)



上面的动图当然也进行了加速，但还是能看出中间有个手动切到某音的操作，这是为了能让这段脚本适用于更多刷刷刷的 App。

![图片](https://mmbiz.qpic.cn/mmbiz_png/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhIsLxjf2IyTwZmgexlpibatYjsKsE1ibCvXLniatpdRxQ03QIDiaLiaxbcfg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1) 

脚本中 sleep() 方法内的时间，就是用来切换之后要刷刷刷的 App 上的时间。

手速快的小伙伴也可以将方法内的 7000 改成 n秒×1000，至于后面那个框框是用来随机停留等待。

毕竟是薅平台的羊毛，平台方一旦发现有脚本怪，可能会封号也说不定，小心为上。

## 操作简单
Auto.js 能做什么在我看来是一个很具备想象力的东西，因为只要是有迹可循的重复性动作，autojs都搞得定。

下面给大家介绍三个脚本，我都加了详细的备注，供大家尝试学习。

- 导入脚本

因为这篇文章面向的是小白，我还是从头说的好。

Auto.js 在使用过程中还是有很多需要注意的地方，但最重要的就是打开无障碍服务。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhfv0YweicLKqQVZTIUjBjodb3sdUurpiclffzcwE7YquLr9PoNejEsG2A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

很多人都不知道什么是无障碍服务，给你们科普下

![image-20211112012822635](https://gitee.com/xi_fan/img/raw/master/image-20211112012822635.png)

所以不用怕打开了有风险什么的，另外整个 Autojs 都是依托于这个无障碍服务的，你如果不开也根本没法用。

- 打开Autojs，创建脚本

然后打开 App，进入到它的主页面，你能在右下角发现一个加号，点击加号就能选择导入本地脚本或创建一个空白文件脚本。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhRkyw3ibE2ogzdiaSOwNVK1UpXodiaT0r2PULeLDialEIOjsjYKMrxQVVHA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

当然你也可以通过电脑微信将脚本传到手机，然后再通过 Auto.js 将脚本导入。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/7omGzoTyJGmMLy1eTenm0fxvcIzJyQjhicdFyicGERB5OB4OZzFlnEkWbD6PGjkjg2CjS0spI2hCsP7ODZS4bdmg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这一步后就可以开始进行脚本编写了。



## 如何获得4.1稳定安全版本
![image-20211112110252165](https://gitee.com/xi_fan/img/raw/master/image-20211112110252165.png)

微信搜索：稀饭下雪

回复：autojs，获得autojs稳定安全版本

回复：加群，加入autojs社群

关注我，了解更多有趣好用的脚本，一起玩autojs

