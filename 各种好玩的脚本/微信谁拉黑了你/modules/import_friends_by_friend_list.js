/**
 * 导入好友
 */

(() => {
    let node_util;
    let db_util;
    let app_util;
    let log_util;
    /**
     * 控件id
     */
    let ids;
    /**
     * 控件文本
     */
    let texts;
    let language;
    let running_config;
    /**
     * 运行状态
     */
    let run;
    let accumulator;

    /**
     * 点击通讯录
     */
    function clickContacts() {
        while (true) {
            if (node_util.backtrackClickNode(idMatches(ids["contacts"]).textMatches(texts["contacts"]).findOne(running_config["find_delay_duration"]))) {
                log_util.info("控件点击通讯录成功");
                break;
            }
            log_util.warn("控件点击通讯录失败");
            sleep(running_config["click_delay_duration"]);
            if (node_util.backtrackSimulationClickNode(idMatches(ids["contacts"]).textMatches(texts["contacts"]).findOne(running_config["find_delay_duration"]))) {
                log_util.info("坐标点击通讯录成功");
                break;
            }
            log_util.warn("坐标点击通讯录失败");
        }
        return synchronizeFriends;
    }

    /**
     * 导入好友备注
     */
    function synchronizeFriends() {
        let friend_remark_nodes = idMatches(ids["friend_remark"]).untilFind();
        for (let i = 0; i < friend_remark_nodes.size(); i++) {
            let friend_remark = friend_remark_nodes.get(i).text();
            if (!(db_util.isExistFriendRemark(friend_remark) || db_util.addLabelFriend({ friend_remark: friend_remark, label: "", enabled: false }))) {
                log_util.error("导入好友失败");
            }
        }
        return idMatches(ids["contacts_count"]).findOnce() ? stopScript : scrollFriendList;
    }

    /**
     * 滚动好友列表
     */
    function scrollFriendList() {
        while (true) {
            let friend_list_node = idMatches(ids["friend_list"]).findOne(running_config["find_delay_duration"]);
            // 策略1滚动联系人列表控件
            if (friend_list_node) {
                if (friend_list_node.bounds().right - friend_list_node.bounds().left > 0) {
                    if (node_util.scrollForward(friend_list_node)) {
                        log_util.info("控件滚动联系人列表成功");
                        sleep(running_config["click_delay_duration"]);
                        break;
                    }
                    log_util.warn("控件滚动联系人列表失败");
                } else {
                    log_util.warn("联系人列表控件宽度为0");
                }
            } else {
                log_util.warn("联系人列表控件id可能不一致");
            }
            // 策略2滚动联系人列表控件
            let friend_remark_nodes = idMatches(ids["friend_remark"]).untilFind();
            let first_bounds = friend_remark_nodes.get(0).bounds();
            let last_bounds = friend_remark_nodes.get(friend_remark_nodes.size() - 1).bounds();
            if (swipe(last_bounds.centerX(), last_bounds.centerY(), first_bounds.centerX(), first_bounds.top, running_config["click_delay_duration"])) {
                log_util.info("策略1坐标滚动联系人列表成功");
                break;
            }
            log_util.warn("策略1坐标滚动联系人列表失败");
            // 策略3滚动联系人列表控件
            setScreenMetrics(1080, 1920);
            if (swipe(540, 1658, 540, 428, running_config["click_delay_duration"])) {
                log_util.info("策略2坐标滚动联系人列表成功");
                break;
            }
            log_util.warn("策略2坐标滚动联系人列表失败");
        }
        log_util.log("----------------------------------------");
        return synchronizeFriends;
    }

    /**
     * 监听音量下键按下，停止脚本运行
     */
    function keyDownListenerByVolumeDown() {
        threads.start(function () {
            // 启用按键监听
            events.observeKey();
            events.setKeyInterceptionEnabled("volume_down", true);
            // 监听减音量键按下
            events.onceKeyDown("volume_down", () => {
                stopScript();
            });
        });
    }

    /**
     * 累计器监听器
     */
    function accumulatorListener() {
        threads.start(function () {
            let localAccumulator = 0;
            setInterval(() => {
                device.wakeUpIfNeeded();
                if (localAccumulator == accumulator) {
                    if (running_config["reboot_script"]) {
                        device.cancelKeepingAwake();
                        engines.execScriptFile(engines.myEngine().getSource().toString());
                        engines.myEngine().forceStop();
                    } else {
                        stopScript();
                    }
                }
                localAccumulator = accumulator;
            }, running_config["accumulator_delay_duration"]);
        });
    }

    /**
     * 停止脚本运行
     */
    function stopScript() {
        run = false;
        device.cancelKeepingAwake();
        toastLog(language["script_stopped"]);
        engines.execScriptFile("main.js");
        engines.myEngine().forceStop();
    }

    function main() {
        node_util = require("utils/node_util.js");
        db_util = require("utils/db_util.js");
        log_util = require("utils/log_util.js");
        app_util = require("utils/app_util.js");

        language = app_util.getLanguage();
        running_config = app_util.getRunningConfig();
        ids = app_util.getWeChatIds();
        texts = JSON.parse(files.read("config/text_id/text.json"));

        run = true;

        keyDownListenerByVolumeDown();
        accumulatorListener();
        device.keepScreenDim();

        toastLog(language["script_running"]);

        // 确保在微信首页
        let we_chat_package_name = app_util.getConfig()["we_chat_package_name"];
        launch(we_chat_package_name);
        while (!idMatches(ids["contacts"]).textMatches(texts["contacts"]).findOne(running_config["find_delay_duration"])) {
            back();
            if (currentPackage() == we_chat_package_name) {
                accumulator++;
            }
        }

        /**
         * 此方式流程控制较为灵活
         */
        for (let nextFunction = clickContacts(); run && nextFunction; nextFunction = nextFunction()) {
            accumulator++;
        }
    }

    main();
})();