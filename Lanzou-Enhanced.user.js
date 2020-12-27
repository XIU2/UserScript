// ==UserScript==
// @name         蓝奏云网盘增强
// @version      1.0.1
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


    // 获取 iframe 框架
    var mainframe,
        patt_mydisk=/mydisk\.php\?/;
    if(patt_mydisk.test(window.top.location.href)){
        mainframe = window; // 如果当前位于最后一个套娃 iframe 本身，则不再需要寻找 iframe 框架，暂时没什么用，但是以后如果要增加其他功能可能用得上
        EventXMLHttpRequest(); // 监听 XMLHttpRequest 事件并执行 [自动显示更多文件]
    }else{
        mainframe = document.getElementById("mainframe");
        if(mainframe){ // 只有找到 iframe 框架时才会继续运行脚本
            mainframe = mainframe.contentWindow;
            EventXMLHttpRequest(); // 监听 XMLHttpRequest 事件并执行 [自动显示更多文件]
        }
    }


    // 自动显示更多文件
    function fileMore() {
        var filemore = mainframe.document.getElementById("filemore");
        if(filemore && filemore.style.display != "none"){
            if(filemore.children[0]){
                filemore.children[0].click();
            }
        }
    }


    // 定时执行（旧方法，每隔 100ms 执行一次，比较笨且浪费一丢丢性能，但优点是不会漏掉且反应更快）
    //setInterval(fileMore,100);


    // 监听 XMLHttpRequest 事件并执行（新方法，只有在产生事件时才会执行 [自动显示更多文件]，平时不会执行，更优雅~）
    function EventXMLHttpRequest() {
        var _send = mainframe.XMLHttpRequest.prototype.send
        function sendReplacement(data) {
            setTimeout(fileMore, 200); // 延迟执行，避免网页还没加载完
            return _send.apply(this, arguments);
        }
        mainframe.XMLHttpRequest.prototype.send = sendReplacement;
    }
})();