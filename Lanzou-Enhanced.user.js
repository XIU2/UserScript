// ==UserScript==
// @name         蓝奏云网盘增强
// @version      1.0.0
// @author       X.I.U
// @description  自动显示更多文件（文件夹末尾按钮）
// @match        https://www.lanzou.com/account.php
// @match        https://up.woozooo.com/mydisk.php*
// @icon         https://www.lanzou.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @noframes
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    // 如果位于 [https://www.lanzou.com/account.php] 网页，则跳转至 iframe 指向的 [https://up.woozooo.com/mydisk.php] 网页
    // 用来解决 iframe 跨域无法操作的问题，其实 [https://up.woozooo.com/mydisk.php] 还套了一个 iframe，但已经是同域可以操作了，没必要再跳转了
    if(window.top.location.href === "https://www.lanzou.com/account.php"){
        window.top.location.href = "https://up.woozooo.com/mydisk.php"
    }

    // 注册脚本菜单
    GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});

    // 自动显示更多文件
    function fileMore() {
        var mainframe = document.getElementById("mainframe").contentWindow;
        var filemore = mainframe.document.getElementById("filemore");
        if(filemore && filemore.style.display != "none"){
            if(filemore.children[0]){
                filemore.children[0].click();
            }
        }
    }
    // 定时执行（为了确保不漏掉，只能用这个笨方法了。。。）
    setInterval(fileMore,100)
})();