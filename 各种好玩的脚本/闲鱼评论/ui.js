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
    this.process = function (target, message, limit) {
        let utils = new AppUtils();
        utils.consoleShow();
        console.log("处理的参数：" + target + "," + message + "," + limit);
        let mainTarget;
        auto.waitFor();
        utils.openApp("闲鱼");

        let search = id("search_bar_layout").untilFind();
        utils.clickView(search[0]);

        let sousuoInputs = className("android.widget.EditText").indexInParent(1).depth(6).untilFind()
        sousuoInputs[0].setText(target)
        utils.paste(sousuoInputs[0], target);

        utils.sleep(1000);
        let results = className("android.view.View").descContains(target).untilFind();
        utils.clickView(results[0]);
        mainTarget = results[0].desc();

        console.log("设置标签：" + mainTarget);
        
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
                    utils.clickView(sendBtn);
                    console.log("评论成功，避免被监控，停止1秒")
                    utils.tryback(mainTarget);
                    utils.sleep(3000);

                    targetViewMap.put(text, targetView);
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