"ui";
(() => {
    ui.layout(
        <vertical>
            <list id="label_list" layout_weight="1">
                <horizontal w="*">
                    <text paddingLeft="8" paddingTop="10" paddingBottom="10" id="label" text="{{label}}" maxLines="1" ellipsize="end" />
                    <text paddingTop="10" paddingBottom="10" id="count" text="({{count}})" layout_weight="1" maxLines="1" ellipsize="end" />
                    <Switch id="enabled_switch" checked="{{enabled}}" layout_gravity="center" />
                </horizontal>
            </list>
            <horizontal bg="#EBEBEB">
                <button id="clear_labels_button" layout_weight="1" textColor="#CC0000" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
                <button id="import_friends_button" layout_weight="1" textColor="#008274" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
                <button id="test_friends_button" layout_weight="1" textColor="#008274" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
            </horizontal>
        </vertical>
    );

    let language, db_util, app_util;

    /**
     * 初始化配置
     */
    function init() {
        db_util = require("utils/db_util.js");
        app_util = require("utils/app_util.js");
        language = app_util.getLanguage();

        ui.clear_labels_button.setText(language["clear_label"]);
        ui.import_friends_button.setText(language["import_friend"]);
        ui.test_friends_button.setText(language["test_friend"]);

        if (!app_util.checkSupportedLanguage()) {
            ui.import_friends_button.enabled = false;
            ui.test_friends_button.enabled = false;
            ui.import_friends_button.textColor = colors.parseColor("#B2B2B2");
            ui.test_friends_button.textColor = colors.parseColor("#B2B2B2");
        }
    }
    init();

    /**
     * 初始化UI
     */
    function initUI() {
        let label_list = db_util.findAllLabel();
        ui.label_list.setDataSource(label_list);
        ui.clear_labels_button.enabled = label_list.length > 0;
        ui.clear_labels_button.textColor = label_list.length > 0 ? colors.parseColor("#CC0000") : colors.parseColor("#B2B2B2");
    }
    initUI();

    // 当用户回到本界面时，resume事件会被触发
    ui.emitter.on("resume", function () {
        initUI();
    });

    function showFriendList(label) {
        let running_config = app_util.getRunningConfig();
        running_config["label"] = label;
        files.write("config/running_config.json", JSON.stringify(running_config));
        engines.execScriptFile("activity/label_friend_list.js");
    }

    ui.label_list.on("item_bind", (itemView, itemHolder) => {
        itemView.label.on("click", () => {
            showFriendList(itemHolder.item["label"]);
        });
        itemView.count.on("click", () => {
            showFriendList(itemHolder.item["label"]);
        });
        itemView.enabled_switch.on("click", () => {
            let label = itemHolder.item;
            label["enabled"] = itemView.enabled_switch.checked;
            db_util.modifyLabelFriendByLabel(label);
        });
    });

    ui.clear_labels_button.on("click", () => {
        let running_config = app_util.getRunningConfig();
        dialogs.build({
            content: language["clear_alert_dialog_message"],
            checkBoxPrompt: language["include_friend"],
            checkBoxChecked: running_config["include_friend"],
            positive: language["cancel"],
            negative: language["confirm"]
        }).on("check", checked => {
            running_config["include_friend"] = checked;
            files.write("config/running_config.json", JSON.stringify(running_config));
        }).on("negative", () => {
            if (running_config["include_friend"]) {
                db_util.deleteAllFriend();
            } else {
                db_util.deleteAllLabel();
            }
            initUI();
        }).show();
    });

    ui.import_friends_button.on("click", () => {
        app_util.importFriends();
    });

    ui.test_friends_button.on("click", () => {
        app_util.testFriends();
    });
})();