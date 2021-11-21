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