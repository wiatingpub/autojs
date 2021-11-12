/**
 * 删除好友
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
     * 好友备注
     */
    let last_friend_remark;
    /**
     * 好友的微信号
     */
    let last_we_chat_id;
    /**
     * 上一次点击的可见好友的位置
     */
    let last_index;
    let count_wait_delete_friend;
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
        return clickFriend;
    }

    /**
     * 点击好友
     */
    function clickFriend() {
        while (true) {
            let friend_remark_nodes = idMatches(ids["friend_remark"]).untilFind();
            if (last_index >= friend_remark_nodes.size()) {
                return idMatches(ids["contacts_count"]).findOnce() ? stopScript : scrollFriendList;
            }
            let friend_remark_node = friend_remark_nodes.get(last_index);
            let friend_remark = friend_remark_node.text();
            if (db_util.isSelectedFriendForDeleteByFriendRemark(friend_remark)) {
                if (node_util.backtrackClickNode(friend_remark_node)) {
                    last_friend_remark = friend_remark;
                    log_util.info("控件点击联系人成功");
                    break;
                }
                log_util.warn("控件点击联系人失败");
                sleep(running_config["click_delay_duration"]);
                if (node_util.backtrackSimulationClickNode(idMatches(ids["friend_remark"]).findOnce(last_index))) {
                    last_friend_remark = friend_remark;
                    log_util.info("坐标点击联系人成功");
                    break;
                }
                log_util.warn("坐标点击联系人失败");
            } else {
                last_index++;
            }
        }
        last_index++;
        return checkWeChatId;
    }

    /**
    * 检查微信号是否相同
    */
    function checkWeChatId() {
        let we_chat_id_node = idMatches(ids["we_chat_id"]).findOne(running_config["find_delay_duration"]);
        if (we_chat_id_node) {
            let we_chat_id = we_chat_id_node.text();
            if (db_util.isSelectedFriendForDeleteByWeChatID(we_chat_id)) {
                last_we_chat_id = we_chat_id;
                return clickMoreFunction;
            }
            return backToFriendList;
        }
        log_util.warn("微信号控件id可能不一致");
        return scrollFriendDetailsPage;
    }

    /**
     * 滚动联系人详情页
     */
    function scrollFriendDetailsPage() {
        while (true) {
            let node = idMatches(ids["friend_details_page_list"]).findOne(running_config["find_delay_duration"]);
            // 策略1滚动联系人详情页
            if (node) {
                if (node.bounds().right - node.bounds().left > 0) {
                    if (node_util.scrollForward(node)) {
                        log_util.info("控件滚动联系人详情页成功");
                        sleep(running_config["click_delay_duration"]);
                        break;
                    }
                    log_util.warn("控件滚动联系人详情页失败");
                } else {
                    log_util.warn("联系人详情页控件宽度为0");
                }
            } else {
                log_util.warn("联系人详情页控件id可能不一致");
            }
            // 策略2滚动联系人详情页
            setScreenMetrics(1080, 1920);
            if (swipe(540, 1658, 540, 428, running_config["click_delay_duration"])) {
                log_util.info("坐标滚动联系人详情页成功");
                break;
            }
            log_util.warn("坐标滚动联系人详情页失败");
        }
        return checkWeChatId;
    }

    /**
     * 点击更多功能
     */
    function clickMoreFunction() {
        while (true) {
            if (node_util.backtrackClickNode(idMatches(ids["more_function_by_delete"]).findOne(running_config["find_delay_duration"]))) {
                log_util.info("控件点击更多功能成功");
                break;
            }
            log_util.warn("控件点击更多功能失败");
            sleep(running_config["click_delay_duration"]);
            if (node_util.backtrackSimulationClickNode(idMatches(ids["more_function_by_delete"]).findOne(running_config["find_delay_duration"]))) {
                log_util.info("坐标点击更多功能成功");
                break;
            }
            log_util.warn("坐标点击更多功能失败");
        }
        return clickDeleteFunction;
    }

    /**
     * 点击删除功能
     */
    function clickDeleteFunction() {
        if (node_util.backtrackClickNode(idMatches(ids["delete"]).textMatches(texts["delete"]).findOne(running_config["find_delay_duration"]))) {
            log_util.info("控件点击删除功能成功");
            return clickConfirmDelete;
        }
        log_util.warn("控件点击删除功能失败");
        sleep(running_config["click_delay_duration"]);
        if (node_util.backtrackSimulationClickNode(idMatches(ids["delete"]).textMatches(texts["delete"]).findOne(running_config["find_delay_duration"]))) {
            log_util.info("坐标点击删除功能成功");
            return clickConfirmDelete;
        }
        log_util.warn("坐标点击删除功能失败");
        return scrollMoreFunctionPage;
    }

    /**
     * 点击确认删除
     */
    function clickConfirmDelete() {
        while (true) {
            if (node_util.backtrackClickNode(idMatches(ids["confirm_delete"]).findOne(running_config["find_delay_duration"]))) {
                log_util.info("控件点击删除成功");
                break;
            }
            log_util.warn("控件点击删除失败");
            sleep(running_config["click_delay_duration"]);
            if (node_util.backtrackSimulationClickNode(idMatches(ids["confirm_delete"]).findOne(running_config["find_delay_duration"]))) {
                log_util.info("坐标点击删除成功");
                break;
            }
            log_util.warn("坐标点击删除失败");
        }
        last_index--;
        count_wait_delete_friend--;
        db_util.modifyTestedFriend({ we_chat_id: last_we_chat_id, deleted: true });
        db_util.deleteLabelFriendByFriendRemark(last_friend_remark);
        log_util.log("----------------------------------------");
        return clickFriend;
    }

    /**
     * 滚动更多功能页面
     */
    function scrollMoreFunctionPage() {
        while (true) {
            let node = idMatches(ids["more_function_by_delete_list"]).findOne(running_config["find_delay_duration"]);
            // 策略1滚动更多功能页面
            if (node) {
                if (node.bounds().right - node.bounds().left > 0) {
                    if (node_util.scrollForward(node)) {
                        log_util.info("控件滚动更多功能页面成功");
                        sleep(running_config["click_delay_duration"]);
                        break;
                    }
                    log_util.warn("控件滚动更多功能页面失败");
                } else {
                    log_util.warn("更多功能页面控件宽度为0");
                }
            } else {
                log_util.warn("更多功能页面控件id可能不一致");
            }
            // 策略2滚动更多功能页面
            setScreenMetrics(1080, 1920);
            if (swipe(540, 1658, 540, 428, running_config["click_delay_duration"])) {
                log_util.info("坐标滚动更多功能页面成功");
                break;
            }
            log_util.warn("坐标滚动更多功能页面失败");
        }
        return clickDeleteFunction;
    }

    /**
     * 返回好友列表
     */
    function backToFriendList() {
        while (true) {
            if (node_util.backtrackClickNode(idMatches(ids["back_to_friend_list"]).findOne(running_config["find_delay_duration"]))) {
                log_util.info("控件点击返回好友列表成功");
                break;
            }
            log_util.warn("控件点击返回好友列表失败");
            sleep(running_config["click_delay_duration"]);
            if (node_util.backtrackSimulationClickNode(idMatches(ids["back_to_friend_list"]).findOne(running_config["find_delay_duration"]))) {
                log_util.info("坐标点击返回好友列表成功");
                break;
            }
            log_util.warn("坐标点击返回好友列表失败");
        }
        log_util.log("----------------------------------------");
        return clickFriend;
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
        last_index = 0;
        return clickFriend;
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

        last_we_chat_id = "", last_friend_remark = "", last_index = 0, run = true, accumulator = 0;

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
        count_wait_delete_friend = db_util.countWaitDeleteFriend();
        for (let nextFunction = clickContacts(); count_wait_delete_friend > 0 && run && nextFunction; nextFunction = nextFunction()) {
            accumulator++;
        }

        if (count_wait_delete_friend == 0) {
            stopScript();
        }
    }

    main();
})();