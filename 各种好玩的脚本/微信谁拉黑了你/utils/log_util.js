module.exports = (() => {
    let running_config = JSON.parse(files.read("config/running_config.json"));

    function debug(level, message) {
        if (running_config["debug"]) {
            if (level == "log") {
                console.log(message);
            } else if (level == "verbose") {
                console.verbose(message);
            } else if (level == "info") {
                console.info(message);
            } else if (level == "warn") {
                console.warn(message);
            } else if (level == "error") {
                console.error(message);
            }
        }
    }

    function log(message) {
        debug("log", message);
    }

    function verbose(message) {
        debug("verbose", message);
    }

    function info(message) {
        debug("info", message);
    }

    function warn(message) {
        debug("warn", message);
    }

    function error(message) {
        debug("error", message);
    }

    return {
        log: log,
        verbose: verbose,
        info: info,
        warn: warn,
        error: error
    };
})();