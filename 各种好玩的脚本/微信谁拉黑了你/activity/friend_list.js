"ui";
(() => {
    ui.layout(
        <vertical>
            <list id="friend_list" layout_weight="1">
                <horizontal padding="8" w="*">
                    <text text="{{friend_remark}}" layout_weight="1" maxLines="1" ellipsize="end" />
                    <Switch id="enabled_switch" checked="{{enabled}}" />
                </horizontal>
            </list>
            <horizontal bg="#EBEBEB">
                <button id="previous_page_button" layout_weight="1" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
                <text id="current_page_text" textStyle="bold" />
                <text textStyle="bold" text="  /  " />
                <text id="total_page_text" textStyle="bold" />
                <button id="next_page_button" layout_weight="1" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
            </horizontal>
            <horizontal bg="#EBEBEB">
                <button id="clear_friends_button" layout_weight="1" textColor="#CC0000" style="Widget.AppCompat.Button.Borderless" textStyle="bold" />
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

        ui.previous_page_button.setText(language["previous_page"]);
        ui.next_page_button.setText(language["next_page"]);
        ui.clear_friends_button.setText(language["clear_friend"]);
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
        ui.friend_list.setDataSource(db_util.findLabelFriendList());
        let total_page = db_util.getLabelFriendTotalPage();
        ui.total_page_text.setText(total_page > 0 ? String(total_page) : "-");
        ui.current_page_text.setText(total_page > 0 ? String(1) : "-");
        modifyPageInfoShow(total_page > 0 ? 1 : "-");
    }
    initUI();

    function modifyPageInfoShow(current_page) {
        if (Number.isInteger(current_page)) {
            ui.current_page_text.setText(String(current_page));
            ui.friend_list.setDataSource(db_util.findLabelFriendList(current_page));
            ui.friend_list.scrollToPosition(0);
        }
        ui.previous_page_button.enabled = current_page != 1 && current_page != '-';
        ui.next_page_button.enabled = current_page != ui.total_page_text.text();
    }

    ui.friend_list.on("item_bind", (itemView, itemHolder) => {
        itemView.enabled_switch.on("click", () => {
            let friend = itemHolder.item;
            friend["enabled"] = itemView.enabled_switch.checked;
            db_util.modifyFriend(friend);
        });
    });

    ui.previous_page_button.on("click", () => {
        modifyPageInfoShow(parseInt(ui.current_page_text.text()) - 1);
    });

    ui.next_page_button.on("click", () => {
        modifyPageInfoShow(parseInt(ui.current_page_text.text()) + 1);
    });

    ui.clear_friends_button.on("click", () => {
        dialogs.build({
            content: language["clear_alert_dialog_message"],
            positive: language["cancel"],
            negative: language["confirm"]
        }).on("negative", () => {
            db_util.deleteAllFriend();
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