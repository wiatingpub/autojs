"ui";

ui.layout(
    <vertical>
        <text textSize="18sp" textColor="#000000" margin="20" textStyle="bold">
            闲鱼自动评论【使用的时候按照提示开启权限】
        </text>
        <ScrollView>
            <vertical>
                <text textSize="16sp" margin="8">1.宝贝标签</text>
                <input w="*" text="卫衣" id="target" margin="0 16" />

                <text textSize="16sp" margin="8">2. 评论内容</text>
                <input w="*" text="你好" id="comment" margin="0 16" />
                
                <text textSize="16sp" margin="8">3. 总处理条数</text>
                <input text="2" id="total" inputType="number" margin="0 16" />

                <text textSize="16sp" margin="8">4. 是否清空数据库(是\否)</text>
                <input w="*" text="否" id="dbClear" margin="0 16" />

                <text textSize="16sp" margin="8">5. 是否点击发送留言</text>
                <input w="*" text="否" id="isSend" margin="0 16" />

                <linear gravity="center">
                    <button margin="16" id="ok">开始执行</button>
                </linear>
            </vertical>
        </ScrollView>
    </vertical>
)

ui.ok.click(() => {
    var target = ui.target.text();
    var comment = ui.comment.text();
    var total = ui.total.text();
    var dbClear = ui.dbClear.text();
    var isSend = ui.isSend.text();
    let main = new Main();

    threads.start(function () {
        main.process(target, comment, total, dbClear, isSend);
    });
});

function DbUtils(dbName, createSQL, fieldMapping) {
    importClass(android.database.sqlite.SQLiteDatabase);
    importClass(android.content.ContentValues);
    importClass(android.database.Cursor);

    let dbName = dbName;
    let createSQL = createSQL;
    let fieldMapping = fieldMapping;

    /**
     * 打开数据库连接，例子：直接调用
     */
    this.open = function () {
        let base_path = files.cwd();
        files.ensureDir(base_path + "/data/");
        return SQLiteDatabase.openOrCreateDatabase(base_path + this.dbName, null);
    }

    /**
     * 关闭数据库连接，例子：直接调用
     */
    this.close = function (db) {
        if (db && db.isOpen()) {
            db.close();
        }
    }

    /**
     * 查询结果集转对象
     * @param {Object} cursor
     * @returns {Object}
     */
    this.cursorToObject = function (cursor, fieldMapping) {
        let object = {};
        for (let i = cursor.getColumnCount() - 1; i >= 0; i--) {
            let column_name = cursor.getColumnName(i);
            switch (fieldMapping[column_name]) {
                case "String":
                    object[column_name] = cursor.getString(i);
                    break;
                case "boolean":
                    object[column_name] = cursor.getString(i) == "true";
                    break;
                case "int":
                    object[column_name] = cursor.getInt(i);
                    break;
            }
        }
        return object;
    }

    /**
     * 新增一行记录，例子："record", { desc: "124" }
     * @param {String} table_name 
     * @param {Object} object 
     * @returns {boolean}
     */
    this.addRow = function (tableName, object) {
        let db = this.open();
        let values = new ContentValues();
        for (let key in object) {
            values.put(key, String(object[key]));
        }
        let result = db.insert(tableName, null, values);
        this.close(db);
        console.log("数据插入：" + values);
        return result > 0;
    }

    /**
     * 删除记录 例子："record",null,null 
     * @param {String} table_name 
     * @param {String} where_clause 
     * @param {Array<String>} where_args 
     * @returns {boolean}
     */
    this.deleteRows = function (tableName, whereClause, whereArgs) {
        let db = this.open();
        let result = db.delete(tableName, whereClause, whereArgs);
        this.close(db);
        console.log("清空记录条数：" + result)
        return result > 0;
    }

    /**
     * 修改记录，例子："record", { desc: "124", id : 1 }, "id"
     * @param {String} tableName
     * @param {Object} object 
     * @param {String} where_key 
     * @returns {boolean}
     */
    this.modifyRow = function (tableName, object, whereKey) {
        let db = this.open();
        let values = new ContentValues();
        for (let key in object) {
            if (key == whereKey) {
                continue;
            }
            values.put(key, String(object[key]));
        }
        let result = whereKey != null ? db.update(tableName, values, whereKey + " = ?", [object[whereKey]]) : db.update(tableName, values, null, null);
        this.close(db);
        return result > 0;
    }

    /**
     * 查询记录，例子："SELECT * FROM xianyu WHERE desc = ?", ["125"], { "id": "int", "desc": "String" }
     * @param {String} sql 
     * @param {Array<String>} selectionArgs
     * @param {Object} property_mapping_type 
     * @returns {Array<Object>}
     */
    this.findRows = function (sql, selectionArgs, fieldMapping) {
        let db = this.open();
        let list = [];
        let cursor = db.rawQuery(sql, selectionArgs);
        while (cursor.moveToNext()) {
            list.push(this.cursorToObject(cursor, fieldMapping));
        }
        cursor.close();
        this.close(db);
        return list;
    }

    /**
     * 存在记录，例子："SELECT * FROM xianyu WHERE desc = ?", ["125"]
     * @param {String} sql 
     * @param {Array<String>} selectionArgs
     * @returns {boolean}
     */
    this.isExistRow = function (sql, selectionArgs) {
        let db = this.open();
        let cursor = db.rawQuery(sql, selectionArgs);
        let result = cursor.getCount();
        cursor.close();
        this.close(db);
        return result > 0;
    }

    /**
     * 执行sql建表， 例子：直接调用
     */
    this.updateDatabase = function () {
        let db = this.open();
        db.execSQL(createSQL);
        this.close(db);
    }
}

function AppUtils() {
    // 打开app
    this.openApp = function (str) {
        app.launchApp(str);
        console.log("启动" + str);
    }

    // 等待
    this.sleep = function (milSecond) {
        sleep(milSecond);
        console.log("休眠：" + milSecond);
    }

    // 打开后台
    this.consoleShow = function () {
        console.show();
        console.log("打开后台");
    }

    // 输入拼音
    this.inputPinyin = function (str) {
        Text(str);
        console.log("输入拼音：" + str);
    }

    this.clickView = function (obj) {
        if (obj == null) {
            return;
        }
        if (obj.clickable()) {
            this.click(obj);
        } else {
            this.clickXY(obj);
        }
    }

    this.btnClickLog = function (obj) {
        var btn = "未知按钮...";
        var txt = obj.text();
        if (txt != null && txt.length != 0) {
            btn = txt;
        }
        var desc = obj.desc();
        if (desc != null && desc.length != 0) {
            btn = desc;
        }
        console.log("点击按钮:" + btn.substring(0, Math.min(4, btn.length)));
    }

    this.clickXY = function (obj) {
        if (obj == null) {
            return;
        }
        let xy = obj.bounds();
        click(xy.centerX(), xy.centerY());
        this.btnClickLog(obj)
    }

    this.click = function (obj) {
        if (obj == null) {
            return;
        }
        obj.click();
        this.btnClickLog(obj)
    }

    this.back = function (times) {
        for (let time = 0; time < times; time++) {
            let status = back();
            if (!status) {
                console.error("回退失败...");
                return;
            }
            console.log("回退，次数:" + time + 1);
            this.sleep(1000);
        }
    }

    this.tryback = function (mainTarget) {
        if (mainTarget == null) {
            console.error("选择集为null，回退失败...");
            return;
        }

        let views = className("android.view.View").find();
        for (let index in views) {
            let view = views[index];
            try{
                if (view.desc() == mainTarget) {
                    return;
                }
            } catch(error) {

            }
        }

        console.log("找不到标签：" + mainTarget + "则回退");
        this.back(1);
        this.tryback(mainTarget);
    }

    this.paste = function (obj, str) {
        setClip(str);
        obj.paste();
        console.log("复制粘贴：" + str);
    }
}

function Main() {
    this.process = function (target, message, limit, dbClear, isSend) {
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

        let utils = new AppUtils();
        utils.consoleShow();
        console.log("处理的参数：" + target + "," + message + "," + limit + "," + dbClear + "," + isSend);
        auto.waitFor();
        utils.openApp("闲鱼");
        
        dbClear = dbClear == "是";
        isSend = isSend == "是";
        let dbUtils = new DbUtils(db, SQL, fieldMapping);
        // 创建数据库和表
        dbUtils.updateDatabase();
        console.log("打开数据库...")
        if (dbClear) { 
            dbUtils.deleteRows(table, null, null)
        }

        let search = id("search_bar_layout").untilFind();
        utils.clickView(search[0]);
        utils.sleep(1000);

        let sousuoInputs = className("android.widget.EditText").untilFind()
        sousuoInputs[0].setText(target)
        utils.paste(sousuoInputs[0], target);

        utils.sleep(1000);
        let result = desc("搜索").findOnce();
        utils.clickView(result);
        let mainTarget = target;

        console.log("设置标签：" + mainTarget);
        utils.sleep(1000);

        var targetViewMap = new java.util.HashMap();
        while (targetViewMap.size() < limit) {
            let viewIndex = 0;
            while (true) {
                let targetViews = className("android.view.View").descContains(target).untilFind().filter(function (w) {
                    return w.desc().length >= 10;
                });
                if (targetViews.length <= viewIndex) {
                    break;
                }
                let targetView = targetViews[viewIndex++];
                let text = targetView.desc();
                text = text.substring(0, Math.min(10, text.length));
                let existStatus = dbUtils.isExistRow("SELECT * FROM  " + table + "  WHERE desc = ?", [text]);
                if (existStatus) {
                    console.log(text+"db已经记录过了，跳过")
                    continue;
                }

                if (!targetViewMap.containsKey(text)) {
                    utils.sleep(1000);
                    utils.clickView(targetView);
                    utils.sleep(1000);
                    if (textContains("客服").findOnce() != null) {
                        utils.tryback(mainTarget);
                        continue;
                    }

                    let btns = className("android.view.View").untilFind()
                    var leaveMessage;
                    for (key in btns) {
                        let btn = btns[key]
                        try {
                            if (btn.desc() == null) {
                                continue;
                            }

                            if (btn.desc() == "留言") {
                                leaveMessage = btn;
                                break;
                            }

                            if (!isNaN(btn.desc())) {
                                leaveMessage = btn;
                                break;
                            }
                        } catch (error) {

                        }
                    }
                    
                    utils.clickView(leaveMessage);
                    utils.sleep(1000);
                    try{
                        leaveMessage.setText(message)
                    } catch(error) {
                    }
                    try {
                        let leaveMessage2 = descContains("看对眼就留言").findOnce();
                        utils.clickView(leaveMessage2);
                        utils.sleep(1000);
                        leaveMessage2.setText(message)
                    } catch (error) {
                    }
                    try {
                        let leaveMessage3 = textContains("看对眼就留言").findOnce();
                        utils.clickView(leaveMessage3);
                        utils.sleep(1000);
                        leaveMessage3.setText(message)
                    } catch (error) {
                    }
                 
                    utils.sleep(1000);
                    let sendBtn = textContains("发送").findOnce();
                    if (sendBtn == null) {
                        console.warn("找不到发送按钮：" + text)
                        continue;
                    }

                    if (isSend) {
                        utils.clickView(sendBtn);
                        utils.sleep(3000);
                        console.log("评论成功，避免被监控，停止3秒")
                    } else {
                        console.log("测试模式，不做评论")
                    }
                    utils.tryback(mainTarget);

                    targetViewMap.put(text, targetView);
                    dbUtils.addRow(table, { desc: text });
                    console.log("当前成功评论个数：" + targetViewMap.size())

                    if (targetViewMap.size() >= limit) {
                        break;
                    }
                }
            }
            while (true) {
                if (scrollDown(0)) {
                    break;
                }
            }
        }

        console.log("执行完毕");
    }
}