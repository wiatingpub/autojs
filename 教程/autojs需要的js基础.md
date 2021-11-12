## 说在前面

JS不熟悉？看这篇文章就对了。

推荐直接去[w3school](https://www.w3school.com.cn/js/index.asp)或者[runoob](https://www.runoob.com/js/js-tutorial.html)过一遍，这里只列举一些我觉得要注意的地方。

- 直观感受，很多语法和C\C++一模一样（除了声明变量要用`var`、函数要加`function`...）。

- `undefined`：只声明过但未赋值的变量。

- `==`与`===`： 前者是`equality`、后者为`identity`，即后者不会进行类型转换，类型不同的结果一定不等。

- JS的数据类型：

    ```js
    var length = 7;                             // 数字
    var lastName = "Gates";                      // 字符串
    var cars = ["Porsche", "Volvo", "BMW"];         // 数组
    var x = {firstName:"Bill", lastName:"Gates"};    // 对象
    ```

- `null`：类型是对象，不存在的事物。

    ```js
    null === undefined            // false
    null == undefined             // true
    ```

- 对象： 通过关键词 "new" 来声明 JavaScript 变量，则该变量会被创建为对象。

    ```js
    //也可以通过person.firstName="..."的方式初始化
    var person = {
    firstName: "Bill",
    lastName : "Gates",
    id       : 678,
    fullName : function() {   //成员函数
      return this.firstName + " " + this.lastName;
    }
    };
    ```

- 在字符串中换行，需要加一个反斜杠(非ECMAScript标准）：

    ```js
    document.getElementById("demo").innerHTML = "Hello \
    Kitty!";
    ```

- `String`和`Number`相加时，会将数字转为字符串；`String`和`Number`相减时，会将字符串转为数字；

- 数组添加元素： `array.push("value")`

- 常用对象： Date() （获取时间）、 Math() (常用数学工具)

- `use strict;`: 定义 JavaScript 代码应该以“严格模式”执行。

- JavaScript的对象通过`引用`来寻址：

    ```js
    //person是个对象
    var x = person;  // 这不会创建 person 的副本，x相当于person的别名，即引用
    ```

## 加入免费社群

![image-20211112110252165](https://gitee.com/xi_fan/img/raw/master/image-20211112110252165.png)

微信搜索：稀饭下雪

回复：autojs，获得autojs稳定安全版本

回复：加群，加入autojs社群

关注我，了解更多有趣好用的脚本，一起玩autojs

