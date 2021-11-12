module.exports = (() => {
    importClass(android.provider.Settings);
    let config = JSON.parse(files.read("config/config.json"));
    let local_language = context.resources.configuration.locale.language + "-" + context.resources.configuration.locale.country;
    let default_language = getLanguage();

    /**
     * 获取微信发布源
     * @returns {String}
     */
    function getWeChatReleaseSourceByApplication() {
        try {
            let package_name = context.getPackageManager().getInstallerPackageName(config["we_chat_package_name"]);
            let we_chat_release_source = config["we_chat_release_source"];
            for (let key in we_chat_release_source) {
                if (we_chat_release_source[key].indexOf(package_name) >= 0) {
                    return key;
                }
            }
        } catch (e) {
            log(e);
        }
        return null;
    }

    /**
     * 获取微信发布源
     * @returns {String}
     */
    function getWeChatReleaseSourceByLocation() {
        let running_config = getRunningConfig();
        return running_config["manual_control_we_chat_release_source"] ? running_config["we_chat_release_source"] : getWeChatReleaseSourceByApplication();
    }

    /**
     * 获取微信版本号
     * @returns {string}
     */
    function getWeChatVersionsName() {
        return context.getPackageManager().getPackageInfo(config["we_chat_package_name"], 0).versionName;
    }

    /**
     * 获取微信最后一次更新时间
     * @returns {string}
     */
    function getWeChatLastUpdateTime() {
        try {
            return context.getPackageManager().getPackageInfo(config["we_chat_package_name"], 0).lastUpdateTime;
        } catch (e) {
            log(e);
        }
        return null;
    }

    /**
     * 检查是否支持该版本的app，仅支持 \d+(\.\d+)? 的格式
     * @param {string} current_versions
     * @param {string} min_supported_versions
     * @param {string} max_supported_versions
     * @returns {boolean} 支持返回true
     */
    function supportedApplicationVersions(current_versions, min_supported_versions, max_supported_versions) {
        let min_supported_versions_arr = min_supported_versions.match(/\d+/g);
        let current_versions_arr = current_versions.match(/\d+/g);
        let max_supported_versions_arr = max_supported_versions.match(/\d+/g);
        for (let i = 0; i < min_supported_versions_arr.length || i < current_versions_arr.length; i++) {
            let min = i < min_supported_versions_arr.length ? parseInt(min_supported_versions_arr[i]) : 0;
            let middle = i < current_versions_arr.length ? parseInt(current_versions_arr[i]) : 0;
            if (min < middle) {
                break;
            } else if (min > middle) {
                return false;
            }
        }
        for (let i = 0; i < current_versions_arr.length || i < max_supported_versions_arr.length; i++) {
            let middle = i < current_versions_arr.length ? parseInt(current_versions_arr[i]) : 0;
            let max = i < max_supported_versions_arr.length ? parseInt(max_supported_versions_arr[i]) : 0;
            if (middle < max) {
                break;
            } else if (middle > max) {
                return false;
            }
        }
        return true;
    }

    function getLanguage() {
        return JSON.parse(files.read("config/languages/" + (config["supported_languages"].match(local_language) ? local_language : "zh-CN") + ".json"));
    }

    function getConfig() {
        return config;
    }

    function getRunningConfig() {
        return JSON.parse(files.read("config/running_config.json"));
    }

    function getWeChatIdFilePath() {
        let we_chat_release_source = getWeChatReleaseSourceByLocation();
        let ids_versions = config["ids_versions"][we_chat_release_source];
        let we_chat_versions = getWeChatVersionsName();
        for (let key in ids_versions) {
            let supported_versions = key.split("-");
            if (supportedApplicationVersions(we_chat_versions, supported_versions[0], supported_versions[1])) {
                return "config/text_id/" + we_chat_release_source + "/" + ids_versions[key];
            }
        }
    }

    function getWeChatIds() {
        return JSON.parse(files.read(getWeChatIdFilePath()));
    }

    /**
     * 不小于8.0.11中国版微信某些操作需要暂停
     */
    function operatePause() {
        let min_supported_versions_arr = "8.0.11".match(/\d+/g);
        let current_versions_arr = getWeChatVersionsName().match(/\d+/g);
        for (let i = 0; i < min_supported_versions_arr.length || i < current_versions_arr.length; i++) {
            let min = i < min_supported_versions_arr.length ? parseInt(min_supported_versions_arr[i]) : 0;
            let middle = i < current_versions_arr.length ? parseInt(current_versions_arr[i]) : 0;
            if (min < middle) {
                break;
            } else if (min > middle) {
                return false;
            }
        }
        return true;
    }

    /**
     * 检验语言
     * @returns {boolean}
     */
    function checkSupportedLanguage() {
        return config["supported_languages"].match(local_language) != null;
    }

    /**
     * 校验已安装微信
     * @returns {boolean}
     */
    function checkInstalledWeChat() {
        try {
            return context.getPackageManager().getPackageInfo(config["we_chat_package_name"], 0) != null;
        } catch (e) {
            log(e);
            dialogs.build({
                content: default_language["uninstalled_we_chat_alert_dialog_message"],
                positive: default_language["confirm"]
            }).show();
        }
        return false;
    }

    /**
     * 校验支持微信版本
     * @returns {boolean}
     */
    function checkSupportedWeChatVersions() {
        let supported_we_chat_versions = config["supported_we_chat_versions"][getWeChatReleaseSourceByLocation()];
        let we_chat_versions = getWeChatVersionsName();
        let min_supported_versions = supported_we_chat_versions["min_supported_versions"];
        let max_supported_versions = supported_we_chat_versions["max_supported_versions"];
        let supported = supportedApplicationVersions(we_chat_versions, min_supported_versions, max_supported_versions);
        if (!supported) {
            dialogs.build({
                content: default_language["unsupported_we_chat_versions_alert_dialog_message"].replace("%min_supported_versions", min_supported_versions).replace("%max_supported_versions", max_supported_versions).replace("%we_chat_versions", we_chat_versions),
                positive: default_language["confirm"]
            }).show();
        }
        return supported;
    }

    /**
     * 校验文件
     * @returns {boolean}
     */
    function checkFile() {
        let file_path = getWeChatIdFilePath();
        if (!files.exists(file_path)) {
            dialogs.build({
                content: default_language["file_lost_alert_dialog_message"].replace("%file_path", file_path),
                positive: default_language["confirm"]
            }).show();
            return false;
        }
        return true;
    }

    /**
     * 校验已开启无障碍服务
     * @returns {boolean}
     */
    function checkService() {
        let enabled = false;
        try {
            enabled = auto.service || Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES).indexOf(context.getPackageName() + "/com.stardust.autojs.core.accessibility.AccessibilityService") >= 0;
        } catch (e) {
            log(e);
        }
        if (!enabled) {
            dialogs.build({
                content: default_language["jump_to_settings_alert_dialog_message"].replace("%app_name", getAppName(context.getPackageName())),
                positive: default_language["confirm"],
                negative: default_language["cancel"],
                cancelable: false
            }).on("positive", () => {
                app.startActivity({
                    action: "android.settings.ACCESSIBILITY_SETTINGS"
                });
            }).show();
        }
        return enabled;
    }

    /**
     * 停止已在运行的脚本，确保单脚本运行
     */
    function stopModulesScript() {
        let scripts = engines.all();
        for (let i = 0; i < scripts.length; i++) {
            if (/.+modules.+/.test(scripts[i].getSource().toString())) {
                scripts[i].forceStop();
            }
        }
    }

    function stopUIScript() {
        let scripts = engines.all();
        for (let i = 0; i < scripts.length; i++) {
            if (/.+(main|activity).+/.test(scripts[i].getSource().toString())) {
                scripts[i].forceStop();
            }
        }
    }

    /**
     * 检查安装源
     * @param {boolean} checked 
     * @param {Ojbect} running_config 
     */
    function checkInstallSource(checked, running_config) {
        running_config["we_chat_release_source"] = checked ? "google_play_store" : "other";
        files.write("config/running_config.json", JSON.stringify(running_config));
        if (checkSupportedWeChatVersions()) {
            let we_chat_release_source = getWeChatReleaseSourceByApplication();
            if (we_chat_release_source && running_config["we_chat_release_source"] != we_chat_release_source) {
                dialogs.build({
                    content: default_language["install_source_different_warning"],
                    positive: default_language["confirm"],
                    cancelable: false
                }).show();
            }
        }
    }

    function testFriends() {
        if (checkInstalledWeChat()) {
            let running_config = getRunningConfig();
            let view = {
                content: default_language["before_running_alert_dialog_message"],
                items: [default_language["whitelist_mode"], default_language["blacklist_mode"]],
                itemsSelectMode: "single",
                itemsSelectedIndex: running_config["test_friend_mode"],
                positive: default_language["confirm"],
                negative: default_language["cancel"],
                cancelable: false
            };
            if (running_config["manual_control_we_chat_release_source"]) {
                view["checkBoxPrompt"] = default_language["is_from_google_play_store"];
                view["checkBoxChecked"] = getWeChatReleaseSourceByLocation() == "google_play_store";
            }
            dialogs.build(view)
                .on("single_choice", (index, item) => {
                    running_config["test_friend_mode"] = index;
                    files.write("config/running_config.json", JSON.stringify(running_config));
                }).on("check", checked => {
                    checkInstallSource(checked, running_config);
                }).on("positive", () => {
                    if (checkSupportedWeChatVersions() && checkFile() && checkService()) {
                        stopModulesScript();
                        engines.execScriptFile("modules/test_friends.js");
                        stopUIScript();
                    }
                }).show();
        }
    }

    function importFriends() {
        if (checkInstalledWeChat()) {
            let running_config = getRunningConfig();
            let view = {
                content: default_language["before_running_alert_dialog_message"],
                items: [default_language["import_friends_by_label_list"], default_language["import_friends_by_friend_list"]],
                itemsSelectMode: "single",
                itemsSelectedIndex: running_config["import_friend_mode"],
                positive: default_language["confirm"],
                negative: default_language["cancel"],
                cancelable: false
            };
            if (running_config["manual_control_we_chat_release_source"]) {
                view["checkBoxPrompt"] = default_language["is_from_google_play_store"];
                view["checkBoxChecked"] = getWeChatReleaseSourceByLocation() == "google_play_store";
            }
            dialogs.build(view)
                .on("single_choice", (index, item) => {
                    running_config["import_friend_mode"] = index;
                    files.write("config/running_config.json", JSON.stringify(running_config));
                })
                .on("check", checked => {
                    checkInstallSource(checked, running_config);
                }).on("positive", () => {
                    if (checkSupportedWeChatVersions() && checkFile() && checkService()) {
                        stopModulesScript();
                        if (running_config["import_friend_mode"] == 0) {
                            engines.execScriptFile("modules/import_friends_by_label_list.js");
                        } else {
                            engines.execScriptFile("modules/import_friends_by_friend_list.js");
                        }
                        stopUIScript();
                    }
                }).show();
        }
    }

    return {
        getLanguage: getLanguage,
        getConfig: getConfig,
        getRunningConfig: getRunningConfig,
        getWeChatIds: getWeChatIds,
        operatePause: operatePause,
        checkSupportedLanguage: checkSupportedLanguage,
        checkInstalledWeChat: checkInstalledWeChat,
        checkSupportedWeChatVersions: checkSupportedWeChatVersions,
        checkFile: checkFile,
        checkService: checkService,
        getWeChatReleaseSourceByApplication: getWeChatReleaseSourceByApplication,
        getWeChatReleaseSourceByLocation: getWeChatReleaseSourceByLocation,
        getWeChatLastUpdateTime: getWeChatLastUpdateTime,
        stopModulesScript: stopModulesScript,
        stopUIScript: stopUIScript,
        checkInstallSource: checkInstallSource,
        testFriends: testFriends,
        importFriends: importFriends
    };
})();