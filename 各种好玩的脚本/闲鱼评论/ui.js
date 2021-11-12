"ui";

ui.layout(
    <vertical>
        <text textSize="18sp" textColor="#000000" margin="20" textStyle="bold">
            闲鱼自动评论
        </text>
        <ScrollView>
            <vertical>
                <text textSize="16sp" margin="8">1.宝贝标签</text>
                <input w="*" text="卫衣" id="target" margin="0 16" />
                <text textSize="16sp" margin="8">2. 评论内容</text>
                <input w="*" text="你好" id="comment" margin="0 16" />
                <text textSize="16sp" margin="8">3. 总处理条数</text>
                <input text="2" id="total" inputType="number" margin="0 16" />
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
    let main = new Main();

    threads.start(function () {
        main.process(target, comment, total);
    });
});

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
            console.error("空指针:", obj);
            exit();
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
            console.error("空指针:{}", obj);
            exit();
        }
        let xy = obj.bounds();
        click(xy.centerX(), xy.centerY());
        this.btnClickLog(obj)
    }

    this.click = function (obj) {
        if (obj == null) {
            console.error("空指针:{}", obj);
            exit();
        }
        obj.click();
        this.btnClickLog(obj)
    }

    this.back = function (times) {
        for (let time = 0; time < times; time++) {
            let status = back();
            if (!status) {
                console.error("回退失败...");
                exit();
            }
            console.log("回退，次数:" + time + 1);
            this.sleep(1000);
        }
    }

    this.tryback = function (mainTarget) {
        if (mainTarget == null) {
            console.error("选择集为null，回退失败...");
            exit();
        }

        let targetViews = className("android.view.View").depth(5).indexInParent(1).desc(mainTarget).findOnce();
        if (targetViews != null) {
            return;
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
    this.process = function (target, message, limit) {        
        let utils = new AppUtils();
        utils.consoleShow();
        console.log("处理的参数：" + target + "," + message + "," + limit);
        let mainTarget;
        auto.waitFor();
        utils.openApp("闲鱼");

        let search = id("search_bar_layout").untilFind();
        utils.clickView(search[0]);

        utils.sleep(1000)
        let sousuoInputs = className("android.widget.EditText").indexInParent(1).depth(6).untilFind()
        utils.paste(sousuoInputs[0], target);

        utils.sleep(1000)
        let results = className("android.view.View").descContains(target).untilFind();
        utils.clickView(results[0]);
        mainTarget = results[0].desc();
        console.log("设置标签：" + mainTarget);

        var targetViewMap = new java.util.HashMap();
        while (targetViewMap.size() < limit) {
            let targetViews = className("android.view.View").descContains(target).untilFind().filter(function (w) {
                return w.desc().length >= 10;
            });
            for (key in targetViews) {
                let targetView = targetViews[key];
                let text = targetView.desc();
                text = text.substring(0, Math.min(10, text.length));
                if (!targetViewMap.containsKey(text)) {
                    utils.sleep(2000);
                    utils.clickView(targetView);
                    if (textContains("客服").findOnce() != null) {
                        utils.tryback(mainTarget);
                        continue;
                    }

                    let iwant = desc("我想要").findOnce()
                    if (iwant == null) {
                        console.warn("找不到我想要按钮:" + text);
                        exit();
                        utils.tryback(mainTarget);
                        continue;
                    }

                    let leaveMessage = iwant.parent().child(6)
                    if (leaveMessage != null) {
                        utils.clickView(leaveMessage);
                        utils.sleep(1000);
                        let leaveMessage2 = className("android.view.View").descContains("就留言").findOnce();
                        if (leaveMessage2 != null) {
                            utils.clickView(leaveMessage2);
                            utils.sleep(1000);
                            let comment = textContains("看对眼就留言").findOnce()
                            if (comment != null) {
                                comment.setText(message)
                                utils.sleep(1000);
                            } else {
                                console.warn("找不到留言按钮1：" + text + "2秒后回退")
                                utils.sleep(2000);
                                exit();
                                utils.tryback(mainTarget);
                                continue;
                            }
                        } else {
                            leaveMessage2 = textContains("看对眼就留言").findOnce();
                            if (leaveMessage2 != null) {
                                utils.click(leaveMessage2);
                                utils.sleep(1000);
                                let comment = id("comment_text").findOnce()
                                if (comment != null) {
                                    comment.setText(message)
                                    utils.sleep(1000);
                                } else {
                                    console.warn("找不到留言按钮2：" + text + "2秒后回退")
                                    utils.sleep(2000);
                                    exit();
                                    utils.tryback(mainTarget);
                                    continue;
                                }
                            } else {
                                console.warn("找不到留言按钮3：" + text + "2秒后回退")
                                utils.sleep(2000); 
                                exit();
                                utils.tryback(mainTarget);
                                continue;
                            }
                        }
                    }
                    let sendBtn = className("android.widget.Button").depth(1).id("send_button").text("发送").findOnce();
                    if (sendBtn == null) {
                        console.warn("找不到发送按钮：" + text)
                        utils.tryback(mainTarget);
                        continue;
                    }
                    // utils.clickView(sendBtn);
                    console.log("评论成功，避免被监控，停止3秒")
                    utils.sleep(3000);
                    utils.tryback(mainTarget);
                    utils.sleep(1000);

                    targetViewMap.put(text, targetView);
                    console.log("当前成功评论个数：" + targetViewMap.size())
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