module.exports = {
    /**
     * 从该节点向上回溯找到第一个可点击的节点并点击
     * @param {*} node
     * @return 没有找到可点击的节点返回false，否则返回点击结果
     */
    backtrackClickNode: node => {
        while (node) {
            if (node.clickable()) {
                return node.click();
            } else {
                node = node.parent();
            }
        }
        return false;
    },
    /**
     * 从该节点向上回溯找到第一个可点击的节点并模拟点击
     * @param {*} node
     * @return 没有找到可点击的节点返回false，否则返回点击结果
     */
    backtrackSimulationClickNode: node => {
        while (node) {
            if (node.clickable()) {
                return click(node.bounds().centerX(), node.bounds().centerY());
            } else {
                node = node.parent();
            }
        }
        return false;
    },
    scrollForward: node => {
        return node ? node.scrollForward() : false;
    }
}