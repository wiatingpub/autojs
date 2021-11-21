嘿，我是帅气的小饭饭，最近刚结束了xianyu的自动评论，效果大概是这样的

![](https://gitee.com/xi_fan/img/raw/master/超级截屏_20211121_202542.png)
![](https://gitee.com/xi_fan/img/raw/master/超级截屏_20211121_202646.png)
目前已经支持了ui界面、自动化评论，现在新增了db操作，也就是会记录之前已经评论过的宝贝，由于目前autojs关于db的支持比较少，所以我这边将db支持的开源了

![](https://gitee.com/xi_fan/img/raw/master/image-20211121203615332.png)

那么如何使用呢？以我目前xianyu的应用为例子

```js
        // 字段映射
        let fieldMapping = {
            "id": "int",
            "desc": "String",
        }
        // 表名
        let table = "record";
        // 建表
        let SQL = "CREATE TABLE IF NOT EXISTS " + table+" ("
            + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "desc VARCHAR(255)"
            + ")";
        // 数据库名
        let db = "xianyu";

        let dbUtils = new DbUtils(db, SQL, fieldMapping);
        // 创建数据库和表
        dbUtils.updateDatabase();
		
		// 清表
		dbUtils.deleteRows(table, null, null)

		// 数据查询
        let existStatus = dbUtils.isExistRow("SELECT * FROM  " + table + "  WHERE desc = ?", [text]);

		// 增加数据
		dbUtils.addRow(table, { desc: text });
```

简单方便，基本满足日常需求了。



> 请问源码哪里拿呢？

我说啦，开源了，有需要的可以去仓库拿

github地址：https://github.com/wiatingpub/autojs/

码云地址：https://gitee.com/xi_fan/autojs
