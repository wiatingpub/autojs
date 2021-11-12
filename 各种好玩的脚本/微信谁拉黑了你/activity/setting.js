"ui";
(() => {
    ui.layout(
        <vertical padding="8">
            <checkbox id="manual_control_we_chat_release_source" />
            <checkbox id="no_more_warning" />
            <checkbox id="debug" />
            <checkbox id="auto_update" />
            <vertical>
                <text id="click_delay_duration_text" gravity="center" />
                <seekbar id="click_delay_duration_seekbar" max="90" />
            </vertical>
            <vertical>
                <text id="find_delay_duration_text" gravity="center" />
                <seekbar id="find_delay_duration_seekbar" max="250" />
            </vertical>
            <vertical>
                <text id="accumulator_delay_duration_text" gravity="center" />
                <seekbar id="accumulator_delay_duration_seekbar" max="5" />
            </vertical>
            <checkbox id="reboot_script" />
        </vertical>
    );

    let language, running_config;

    /**
     * 初始化配置
     */
    function init() {
        let app_util = require("utils/app_util.js");
        language = app_util.getLanguage();
        running_config = app_util.getRunningConfig();

        ui.manual_control_we_chat_release_source.setText(language["manual_control_we_chat_release_source"]);
        ui.manual_control_we_chat_release_source.checked = running_config["manual_control_we_chat_release_source"];
        ui.manual_control_we_chat_release_source.enabled = !!(app_util.getWeChatReleaseSourceByApplication());

        ui.no_more_warning.setText(language["no_more_warning"]);
        ui.no_more_warning.checked = running_config["no_more_warning"];

        ui.debug.setText(language["debug"]);
        ui.debug.checked = running_config["debug"];

        ui.auto_update.setText(language["auto_update"]);
        ui.auto_update.checked = running_config["auto_update"];

        ui.click_delay_duration_text.setText(language["click_delay_duration"].replace("%click_delay_duration%", running_config["click_delay_duration"] / 1000));
        ui.click_delay_duration_seekbar.setProgress((running_config["click_delay_duration"] - 100) / 10);

        ui.find_delay_duration_text.setText(language["find_delay_duration"].replace("%find_delay_duration%", running_config["find_delay_duration"] / 1000).replace("%find_delay_duration%", running_config["find_delay_duration"] / 1000));
        ui.find_delay_duration_seekbar.setProgress((running_config["find_delay_duration"] - 500) / 10);

        ui.accumulator_delay_duration_text.setText(language["accumulator_delay_duration"].replace("%time%", running_config["accumulator_delay_duration"] / 1000));
        ui.accumulator_delay_duration_seekbar.setProgress((running_config["accumulator_delay_duration"] - 10000) / 1000);

        ui.reboot_script.setText(language["reboot_script"].replace("%time%", running_config["accumulator_delay_duration"] / 1000));
        ui.reboot_script.checked = running_config["reboot_script"];
    }
    init();

    ui.manual_control_we_chat_release_source.on("check", checked => {
        running_config["manual_control_we_chat_release_source"] = checked;
        files.write("config/running_config.json", JSON.stringify(running_config));
    });

    ui.no_more_warning.on("check", checked => {
        running_config["no_more_warning"] = checked;
        files.write("config/running_config.json", JSON.stringify(running_config));
    });

    ui.debug.on("check", checked => {
        running_config["debug"] = checked;
        files.write("config/running_config.json", JSON.stringify(running_config));
    });

    ui.auto_update.on("check", checked => {
        running_config["auto_update"] = checked;
        files.write("config/running_config.json", JSON.stringify(running_config));
    });

    ui.click_delay_duration_seekbar.setOnSeekBarChangeListener({
        onProgressChanged: (seekbar, progress, from_user) => {
            if (from_user) {
                running_config["click_delay_duration"] = (progress + 10) * 10;
                files.write("config/running_config.json", JSON.stringify(running_config));
                ui.click_delay_duration_text.setText(language["click_delay_duration"].replace("%click_delay_duration%", running_config["click_delay_duration"] / 1000));
                ui.find_delay_duration_text.setText(language["find_delay_duration"].replace("%find_delay_duration%", running_config["find_delay_duration"] / 1000).replace("%find_delay_duration%", running_config["find_delay_duration"] / 1000));
            }
        }
    });

    ui.find_delay_duration_seekbar.setOnSeekBarChangeListener({
        onProgressChanged: (seekbar, progress, from_user) => {
            if (from_user) {
                running_config["find_delay_duration"] = (progress + 50) * 10;
                files.write("config/running_config.json", JSON.stringify(running_config));
                ui.click_delay_duration_text.setText(language["click_delay_duration"].replace("%click_delay_duration%", running_config["click_delay_duration"] / 1000));
                ui.find_delay_duration_text.setText(language["find_delay_duration"].replace("%find_delay_duration%", running_config["find_delay_duration"] / 1000).replace("%find_delay_duration%", running_config["find_delay_duration"] / 1000));
            }
        }
    });

    ui.accumulator_delay_duration_seekbar.setOnSeekBarChangeListener({
        onProgressChanged: (seekbar, progress, from_user) => {
            if (from_user) {
                running_config["accumulator_delay_duration"] = (progress + 10) * 1000;
                files.write("config/running_config.json", JSON.stringify(running_config));
                ui.accumulator_delay_duration_text.setText(language["accumulator_delay_duration"].replace("%time%", running_config["accumulator_delay_duration"] / 1000));
                ui.reboot_script.setText(language["reboot_script"].replace("%time%", running_config["accumulator_delay_duration"] / 1000));
            }
        }
    });

    ui.reboot_script.on("check", checked => {
        running_config["reboot_script"] = checked;
        files.write("config/running_config.json", JSON.stringify(running_config));
    });

})();