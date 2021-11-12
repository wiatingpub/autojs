"ui";
(() => {
    ui.layout(
        <drawer id="drawer">
            <vertical>
                <appbar>
                    <toolbar id="toolbar" />
                    <tabs id="tabs" />
                </appbar>
                <vertical>
                    <viewpager id="viewpager" layout_weight="1">
                        <frame>
                            <list id="abnormal_friend_list">
                                <horizontal padding="0 8">
                                    <checkbox id="selected_checkbox" layout_gravity="center" checked="{{selected}}" />
                                    <vertical>
                                        <text id="friend_remark_text" text="{{friend_remark}}" maxLines="1" ellipsize="end" />
                                        <text id="we_chat_id_text" text="{{we_chat_id}}" maxLines="1" ellipsize="end" />
                                        <text id="abnormal_message_text" text="{{abnormal_message}}" maxLines="1" ellipsize="end" />
                                    </vertical>
                                </horizontal>
                            </list>
                        </frame>
                        <frame>
                            <list id="normal_friend_list">
                                <horizontal padding="0 8">
                                    <checkbox id="selected_checkbox" layout_gravity="center" checked="{{selected}}" />
                                    <vertical>
                                        <text id="friend_remark_text" text="{{friend_remark}}" maxLines="1" ellipsize="end" />
                                        <text id="we_chat_id_text" text="{{we_chat_id}}" maxLines="1" ellipsize="end" />
                                    </vertical>
                                </horizontal>
                            </list>
                        </frame>
                        <frame>
                            <list id="ignored_friend_list">
                                <text padding="8" text="{{friend_remark}}" maxLines="1" ellipsize="end" />
                            </list>
                        </frame>
                    </viewpager>
                    <horizontal bg="#EBEBEB">
                        <button id="previous_page_button" layout_weight="1" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
                        <text id="current_page_text" textStyle="bold" />
                        <text textStyle="bold" text="  /  " />
                        <text id="total_page_text" textStyle="bold" />
                        <button id="next_page_button" layout_weight="1" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
                    </horizontal>
                    <horizontal bg="#EBEBEB">
                        <button id="clear_friends_button" layout_weight="1" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
                        <button id="delete_friends_button" layout_weight="1" textColor="#CC0000" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
                        <button id="test_friends_button" layout_weight="1" textColor="#008274" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
                    </horizontal>
                </vertical>
            </vertical>
            <vertical layout_gravity="left" bg="#FFFFFF">
                <list id="side_list">
                    <horizontal>
                        <img w="50" h="50" padding="8" src="{{this.icon}}" tint="#009688" />
                        <text textColor="black" textSize="16sp" text="{{this.title}}" layout_gravity="center" />
                    </horizontal>
                </list>
            </vertical>
        </drawer>
    );

    let base_url = "https://gitee.com/L8426936/CleanUpWeChatZombieFans/raw/master/";
    // 本地测试使用
    // let base_url = "http://192.168.123.105/auto.js-script/CleanUpWeChatZombieFans/";
    let language, db_util, app_util, page_infos, current_page_index = 0;

    /**
     * 初始化配置
     */
    function init() {
        db_util = require("utils/db_util.js");
        db_util.updateDatabase();
        app_util = require("utils/app_util.js");

        language = app_util.getLanguage();

        ui.previous_page_button.setText(language["previous_page"]);
        ui.next_page_button.setText(language["next_page"]);
        ui.clear_friends_button.setText(language["clear_friend"]);
        ui.delete_friends_button.setText(language["delete_friend"]);
        ui.test_friends_button.setText(language["test_friend"]);

        let running_config = app_util.getRunningConfig();
        if (app_util.checkSupportedLanguage()) {
            if (running_config["first_time_run"]) {
                running_config["first_time_run"] = false;
                showInstructionsForUse();
            }
            let we_chat_last_update_time = app_util.getWeChatLastUpdateTime();
            if (running_config["we_chat_last_update_time"] != we_chat_last_update_time) {
                let we_chat_release_source = app_util.getWeChatReleaseSourceByApplication();
                running_config["manual_control_we_chat_release_source"] = !(we_chat_release_source);
                running_config["we_chat_release_source"] = we_chat_release_source || "other";
                running_config["we_chat_last_update_time"] = we_chat_last_update_time;
            }
            files.write("config/running_config.json", JSON.stringify(running_config));
        } else {
            ui.delete_friends_button.enabled = false;
            ui.test_friends_button.enabled = false;
            ui.delete_friends_button.textColor = colors.parseColor("#B2B2B2");
            ui.test_friends_button.textColor = colors.parseColor("#B2B2B2");
            dialogs.build({
                content: "Does not support system language or country",
                positive: "Confirm",
                cancelable: false
            }).show();
        }

        if (running_config["auto_update"]) {
            update(false);
        }
    }
    init();

    /**
     * 初始化UI
     */
    function initUI() {
        ui.abnormal_friend_list.setDataSource(db_util.findAbnormalFriendList());
        ui.normal_friend_list.setDataSource(db_util.findNormalFriendList());
        ui.ignored_friend_list.setDataSource(db_util.findIgnoredTestFriendList());

        page_infos = {};
        let abnormal_friends_total_page = db_util.getAbnormalFriendTotalPage();
        page_infos["abnormal_friends_page_info"] = { current_page: abnormal_friends_total_page > 0 ? 1 : '-', total_page: abnormal_friends_total_page > 0 ? abnormal_friends_total_page : '-' };
        let normal_friends_total_page = db_util.getNormalFriendTotalPage();
        page_infos["normal_friends_page_info"] = { current_page: normal_friends_total_page > 0 ? 1 : '-', total_page: normal_friends_total_page > 0 ? normal_friends_total_page : '-' };
        let ignored_friends_total_page = db_util.getIgnoredTestFriendTotalPage();
        page_infos["ignored_friends_page_info"] = { current_page: ignored_friends_total_page > 0 ? 1 : '-', total_page: ignored_friends_total_page > 0 ? ignored_friends_total_page : '-' };

        modifyPageInfoShow(page_infos["abnormal_friends_page_info"]);
    }
    initUI();

    /**
     * 更新
     * @param {boolean} show_update_dialog
     */
    function update(show_update_dialog) {
        let cancel = false;
        let dialog = dialogs.build({
            content: language["wait_get_update_info"],
            positive: language["cancel"]
        }).on("positive", () => {
            cancel = true;
        });
        dialog.setCancelable(false);
        if (show_update_dialog) {
            dialog.show();
        }
        http.get(base_url + "last_version_info.json", {}, (res, err) => {
            if (!cancel) {
                if (err || res["statusCode"] != 200) {
                    if (show_update_dialog) {
                        dialog.setContent(language["update_info_get_fail_alert_dialog_message"]);
                        dialog.setActionButton("positive", language["confirm"]);
                        dialog.setCancelable(true);
                    }
                } else {
                    let local_config = JSON.parse(files.read("project.json"));
                    let last_version_info = res.body.json();
                    dialog.setContent(language["versions_info"].replace("%current_versions_name", local_config["versionName"]).replace("%current_versions_code", local_config["versionCode"]).replace("%last_versions_name", last_version_info["version_name"]).replace("%last_versions_code", last_version_info["version_code"]).replace("%update_content", last_version_info["update_content"]));
                    dialog.setActionButton("neutral", language["show_history_update_info"]);
                    dialog.on("neutral", () => {
                        showHistoryUpdateInfo(last_version_info["version_code"] > local_config["versionCode"]);
                    });
                    if (last_version_info["version_code"] > local_config["versionCode"]) {
                        dialog.setActionButton("positive", language["update"]);
                        dialog.setActionButton("negative", language["cancel"]);
                        dialog.on("positive", () => {
                            downloadFile();
                        });
                        if (!show_update_dialog) {
                            dialog.show();
                        }
                    } else if (show_update_dialog) {
                        dialog.setActionButton("positive", language["confirm"]);
                        dialog.setCancelable(true);
                    }
                }
            }
        });
    }

    /**
     * 历史更新
     * @param {boolean} show_update_button
     */
    function showHistoryUpdateInfo(show_update_button) {
        let cancel = false;
        let dialog = dialogs.build({
            content: language["wait_get_history_update_info"],
            positive: language["cancel"]
        }).on("positive", () => {
            cancel = true;
        });
        dialog.setCancelable(false);
        dialog.show();
        http.get(base_url + "history_update_info.txt", {}, (res, err) => {
            if (!cancel) {
                if (err || res["statusCode"] != 200) {
                    dialog.setContent(language["history_update_info_get_fail_alert_dialog_message"]);
                    dialog.setCancelable(true);
                } else {
                    dialog.setContent(res.body.string());
                    if (show_update_button) {
                        dialog.setActionButton("neutral", language["cancel"]);
                        dialog.setActionButton("positive", language["update"]);
                        dialog.on("positive", () => {
                            downloadFile();
                        });
                    } else {
                        dialog.setActionButton("positive", language["confirm"]);
                        dialog.setCancelable(true);
                    }
                }
            }
        });
    }

    function downloadFile() {
        let cancel = false;
        let dialog = dialogs.build({
            progress: {
                max: 100,
                showMinMax: true
            },
            positive: language["cancel"],
            cancelable: false
        }).on("positive", () => {
            cancel = true;
        }).show();
        http.get(base_url + "config/files_md5.json", {}, (res, err) => {
            if (!cancel) {
                if (err || res["statusCode"] != 200) {
                    dialog.dismiss();
                    toast(language["update_fail"]);
                } else {
                    let remote_files_md5 = res.body.json();
                    let local_files_md5 = files.exists("config/files_md5.json") ? JSON.parse(files.read("config/files_md5.json")) : {};
                    let completed_all_file = true, max_progress = 0, current_progress = 0;
                    for (let key in remote_files_md5) {
                        if (!local_files_md5[key] || local_files_md5[key]["md5"] != remote_files_md5[key]["md5"]) {
                            max_progress += remote_files_md5[key]["size"];
                        }
                    }
                    for (let key in remote_files_md5) {
                        if (!local_files_md5[key] || local_files_md5[key]["md5"] != remote_files_md5[key]["md5"]) {
                            let response = http.get(base_url + key);
                            if (!cancel && response["statusCode"] == 200) {
                                current_progress += remote_files_md5[key]["size"];
                                dialog.progress = current_progress * 100 / max_progress;
                                files.ensureDir(".download_files/" + key);
                                files.write(".download_files/" + key, response.body.string());
                            } else {
                                completed_all_file = false;
                                break;
                            }
                        }
                    }
                    if (!cancel) {
                        if (completed_all_file) {
                            for (let key in remote_files_md5) {
                                if (completed_all_file && (!local_files_md5[key] || local_files_md5[key]["md5"] != remote_files_md5[key]["md5"])) {
                                    completed_all_file = files.copy(".download_files/" + key, key);
                                }
                            }
                            if (completed_all_file) {
                                for (let key in local_files_md5) {
                                    if (!remote_files_md5[key]) {
                                        files.remove(key);
                                    }
                                }
                                dialog.dismiss();
                                toast(language["update_success"]);
                                engines.execScriptFile("main.js");
                                engines.myEngine().forceStop();
                            } else {
                                dialog.dismiss();
                                toast(language["update_fail"]);
                            }
                        } else {
                            dialog.dismiss();
                            toast(language["update_fail"]);
                        }
                    }
                    files.removeDir(".download_files");
                }
            }
        });
    }

    function showInstructionsForUse() {
        dialogs.build({
            title: language["instructions_for_use_title"],
            content: language["instructions_for_use_content"],
            positive: language["confirm"]
        }).show();
    }

    function developerQQ() {
        let cancel = false;
        let dialog = dialogs.build({
            content: language["wait_get_developer_qq"],
            positive: language["cancel"]
        }).on("positive", () => {
            cancel = true;
        });
        dialog.setCancelable(false);
        dialog.show();
        http.get(base_url + "developer_qq.txt", {}, (res, err) => {
            if (!cancel) {
                dialog.setActionButton("positive", language["confirm"]);
                dialog.setCancelable(true);
                if (err || res["statusCode"] != 200) {
                    dialog.setContent(language["developer_qq_get_fail"]);
                } else {
                    let developer_qq = res.body.string();
                    try {
                        app.startActivity({
                            action: "android.intent.action.VIEW",
                            data: "mqqapi://card/show_pslcard?&uin=" + developer_qq
                        });
                        dialog.dismiss();
                    } catch (e) {
                        dialog.setContent(language["launch_qq_fail"].replace("%developer_qq", developer_qq));
                    }
                }
            }
        });
    }

    // 创建选项菜单(右上角)
    ui.emitter.on("create_options_menu", menu => {
        menu.add(language["update"]);
        menu.add(language["instructions_for_use_title"]);
        menu.add(language["feedback_suggestions"]);
        menu.add(language["setting"]);
    });
    // 监听选项菜单点击
    ui.emitter.on("options_item_selected", (e, item) => {
        switch (item.getTitle()) {
            case language["update"]:
                update(true);
                break;
            case language["instructions_for_use_title"]:
                showInstructionsForUse();
                break;
            case language["feedback_suggestions"]:
                dialogs.build({
                    content: language["feedback_suggestions_alert_dialog_message"],
                    positive: language["cancel"],
                    negative: language["open_source_code_url"],
                    neutral: language["add_developer_qq"]
                }).on("negative", () => {
                    app.openUrl("https://github.com/L8426936/CleanUpWeChatZombieFans");
                }).on("neutral", () => {
                    developerQQ();
                }).show();
                break;
            case language["setting"]:
                engines.execScriptFile("activity/setting.js");
                break;
        }
        e.consumed = true;
    });
    ui.toolbar.title = language["app_name"];
    activity.setSupportActionBar(ui.toolbar);

    // 设置滑动页面的标题
    ui.viewpager.setTitles([language["abnormal_friend"], language["normal_friend"], language["ignored_friend"]]);
    // 让滑动页面和标签栏联动
    ui.tabs.setupWithViewPager(ui.viewpager);
    // 让工具栏左上角可以打开侧拉菜单
    ui.toolbar.setupWithDrawer(ui.drawer);
    ui.side_list.setDataSource([
        {
            icon: "@drawable/ic_label_black_48dp",
            title: language["label_list"]
        },
        {
            icon: "@drawable/ic_person_black_48dp",
            title: language["friend_list"]
        }
    ]);
    ui.side_list.on("item_click", item => {
        switch (item.title) {
            case language["label_list"]:
                engines.execScriptFile("activity/label_list.js");
                break;
            case language["friend_list"]:
                engines.execScriptFile("activity/friend_list.js");
                break;
        }
    });

    function modifyPageInfoShow(page_info) {
        ui.current_page_text.setText(String(page_info["current_page"]));
        ui.total_page_text.setText(String(page_info["total_page"]));
        ui.previous_page_button.enabled = page_info["current_page"] != 1 && page_info["current_page"] != '-';
        ui.next_page_button.enabled = page_info["current_page"] != page_info["total_page"];
    }

    ui.previous_page_button.on("click", () => {
        switch (current_page_index) {
            case 0:
                page_infos["abnormal_friends_page_info"]["current_page"] -= 1;
                ui.abnormal_friend_list.setDataSource(db_util.findAbnormalFriendList(page_infos["abnormal_friends_page_info"]["current_page"]));
                ui.abnormal_friend_list.scrollToPosition(0);
                modifyPageInfoShow(page_infos["abnormal_friends_page_info"]);
                break;
            case 1:
                page_infos["normal_friends_page_info"]["current_page"] -= 1;
                ui.normal_friend_list.setDataSource(db_util.findNormalFriendList(page_infos["normal_friends_page_info"]["current_page"]));
                ui.normal_friend_list.scrollToPosition(0);
                modifyPageInfoShow(page_infos["normal_friends_page_info"]);
                break;
            case 2:
                page_infos["ignored_friends_page_info"]["current_page"] -= 1;
                ui.ignored_friend_list.setDataSource(db_util.findIgnoredTestFriendList(page_infos["ignored_friends_page_info"]["current_page"]));
                ui.ignored_friend_list.scrollToPosition(0);
                modifyPageInfoShow(page_infos["ignored_friends_page_info"]);
                break;
        }
    });

    ui.next_page_button.on("click", () => {
        switch (current_page_index) {
            case 0:
                page_infos["abnormal_friends_page_info"]["current_page"] += 1;
                ui.abnormal_friend_list.setDataSource(db_util.findAbnormalFriendList(page_infos["abnormal_friends_page_info"]["current_page"]));
                ui.abnormal_friend_list.scrollToPosition(0);
                modifyPageInfoShow(page_infos["abnormal_friends_page_info"]);
                break;
            case 1:
                page_infos["normal_friends_page_info"]["current_page"] += 1;
                ui.normal_friend_list.setDataSource(db_util.findNormalFriendList(page_infos["normal_friends_page_info"]["current_page"]));
                ui.normal_friend_list.scrollToPosition(0);
                modifyPageInfoShow(page_infos["normal_friends_page_info"]);
                break;
            case 2:
                page_infos["ignored_friends_page_info"]["current_page"] += 1;
                ui.ignored_friend_list.setDataSource(db_util.findIgnoredTestFriendList(page_infos["ignored_friends_page_info"]["current_page"]));
                ui.ignored_friend_list.scrollToPosition(0);
                modifyPageInfoShow(page_infos["ignored_friends_page_info"]);
                break;
        }
    });

    ui.viewpager.addOnPageChangeListener({
        // 已选定页面发生改变时触发
        onPageSelected: index => {
            current_page_index = index;
            switch (index) {
                case 0:
                    modifyPageInfoShow(page_infos["abnormal_friends_page_info"]);
                    break;
                case 1:
                    modifyPageInfoShow(page_infos["normal_friends_page_info"]);
                    break;
                case 2:
                    modifyPageInfoShow(page_infos["ignored_friends_page_info"]);
                    break;
            }
        }
    });

    ui.abnormal_friend_list.on("item_bind", (itemView, itemHolder) => {
        itemView.selected_checkbox.on("check", () => {
            itemView.selected_checkbox.enabled = !itemHolder.item["deleted"];
            itemView.friend_remark_text.enabled = !itemHolder.item["deleted"];
            itemView.we_chat_id_text.enabled = !itemHolder.item["deleted"];
            itemView.abnormal_message_text.enabled = !itemHolder.item["deleted"];
        });
        itemView.selected_checkbox.on("click", () => {
            let abnormal_friend = itemHolder.item;
            let abnormal_message = abnormal_friend.abnormal_message;
            let running_config = app_util.getRunningConfig();
            if (!running_config["no_more_warning"] && itemView.selected_checkbox.checked && !(language["blacklisted_message"].match(abnormal_message) || language["deleted_message"].match(abnormal_message) || language["account_deleted"].match(abnormal_message))) {
                dialogs.build({
                    title: language["warning"],
                    content: language["selected_warining_alert_dialog_message"],
                    checkBoxPrompt: language["no_more_warning"],
                    positive: language["cancel"],
                    negative: language["confirm"],
                    negativeColor: "#CC0000",
                    cancelable: false
                }).on("check", checked => {
                    running_config["no_more_warning"] = checked;
                }).on("positive", () => {
                    running_config["no_more_warning"] = false;
                    itemView.selected_checkbox.checked = false;
                }).on("negative", () => {
                    files.write("config/running_config.json", JSON.stringify(running_config));
                    abnormal_friend["selected"] = true;
                    db_util.modifyTestedFriend(abnormal_friend);
                }).show();
            } else {
                abnormal_friend["selected"] = itemView.selected_checkbox.checked;
                db_util.modifyTestedFriend(abnormal_friend);
            }
        });
    });

    ui.normal_friend_list.on("item_bind", (itemView, itemHolder) => {
        itemView.selected_checkbox.on("check", () => {
            itemView.selected_checkbox.enabled = !itemHolder.item["deleted"];
            itemView.friend_remark_text.enabled = !itemHolder.item["deleted"];
            itemView.we_chat_id_text.enabled = !itemHolder.item["deleted"];
        });
        itemView.selected_checkbox.on("click", () => {
            let normal_friend = itemHolder.item;
            let running_config = app_util.getRunningConfig();
            if (!running_config["no_more_warning"] && itemView.selected_checkbox.checked) {
                dialogs.build({
                    title: language["warning"],
                    content: language["selected_warining_alert_dialog_message"],
                    checkBoxPrompt: language["no_more_warning"],
                    positive: language["cancel"],
                    negative: language["confirm"],
                    negativeColor: "#CC0000",
                    cancelable: false
                }).on("check", checked => {
                    running_config["no_more_warning"] = checked;
                }).on("positive", () => {
                    running_config["no_more_warning"] = false;
                    itemView.selected_checkbox.checked = false;
                }).on("negative", () => {
                    files.write("config/running_config.json", JSON.stringify(running_config));
                    normal_friend["selected"] = true;
                    db_util.modifyTestedFriend(normal_friend);
                }).show();
            } else {
                normal_friend["selected"] = itemView.selected_checkbox.checked;
                db_util.modifyTestedFriend(normal_friend);
            }
        });
    });

    ui.clear_friends_button.on("click", () => {
        let running_config = app_util.getRunningConfig();
        dialogs.build({
            content: language["clear_alert_dialog_message"],
            checkBoxPrompt: language["clear_friend_current_page_work"],
            checkBoxChecked: running_config["clear_friend_current_page_work"],
            positive: language["cancel"],
            negative: language["confirm"]
        }).on("check", checked => {
            running_config["clear_friend_current_page_work"] = checked;
            files.write("config/running_config.json", JSON.stringify(running_config));
        }).on("negative", () => {
            if (running_config["clear_friend_current_page_work"]) {
                switch (current_page_index) {
                    case 0:
                        db_util.deleteTestedFriend(db_util.ABNORMAL_FRIEND_TYPE);
                        break;
                    case 1:
                        db_util.deleteTestedFriend(db_util.NORMAL_FRIEND_TYPE);
                        break;
                    case 2:
                        db_util.deleteTestedFriend(db_util.IGNORED_FRIEND_TYPE);
                        break;
                }
            } else {
                db_util.deleteTestedFriend();
            }
            initUI();
        }).show();
    });

    ui.delete_friends_button.on("click", () => {
        let count = db_util.countWaitDeleteFriend();
        if (count > 0) {
            if (app_util.checkInstalledWeChat()) {
                let running_config = app_util.getRunningConfig();
                let view = {
                    title: language["warning"],
                    content: language["delete_friend_alert_dialog_message"],
                    positive: language["cancel"],
                    negative: language["confirm"],
                    negativeColor: "#CC0000",
                    cancelable: false
                };
                if (running_config["manual_control_we_chat_release_source"]) {
                    view["checkBoxPrompt"] = language["is_from_google_play_store"];
                    view["checkBoxChecked"] = app_util.getWeChatReleaseSourceByLocation() == "google_play_store";
                }
                dialogs.build(view)
                    .on("check", checked => {
                        app_util.checkInstallSource(checked, running_config);
                    }).on("negative", () => {
                        if (app_util.checkSupportedWeChatVersions() && app_util.checkFile() && app_util.checkService()) {
                            app_util.stopModulesScript();
                            engines.execScriptFile("modules/delete_friends.js");
                            app_util.stopUIScript();
                        }
                    }).show();
            }
        } else {
            dialogs.build({
                content: language["not_select_friend_alert_dialog_message"],
                positive: language["confirm"]
            }).show();
        }
    });

    ui.test_friends_button.on("click", () => {
        app_util.testFriends();
    });
})();