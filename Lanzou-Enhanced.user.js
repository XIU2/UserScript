// ==UserScript==
// @name         蓝奏云网盘增强
// @version      1.0.3
// @author       X.I.U
// @description  自动显示更多文件（文件夹末尾按钮）、自动打开分享链接（点击文件时）
// @match        *://www.lanzou.com/account.php
// @match        *://www.lanzou.com/u
// @match        *://up.woozooo.com/u
// @match        *://up.woozooo.com/mydisk.php*
// @match        *://pc.woozooo.com/u
// @match        *://pc.woozooo.com/mydisk.php*
// @icon         https://www.lanzou.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @noframes
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    if(window.top.location.href != "https://pc.woozooo.com/mydisk.php"){
        window.top.location.href = "https://pc.woozooo.com/mydisk.php"
    }

    var menu_open_fileSha = GM_getValue('xiu2_menu_open_fileSha');
    var menu_open_fileSha_ID, menu_feedBack_ID;
    if (menu_open_fileSha == null){menu_open_fileSha = true; GM_setValue('xiu2_menu_open_fileSha', menu_open_fileSha)};
    registerMenuCommand();

    // 注册脚本菜单
    function registerMenuCommand() {
        var menu_open_fileSha_;
        if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_open_fileSha_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_open_fileSha = GM_getValue('xiu2_menu_open_fileSha');
        }

        if (menu_open_fileSha){menu_open_fileSha_ = "√";}else{menu_open_fileSha_ = "×";}

        menu_open_fileSha_ID = GM_registerMenuCommand(`[ ${menu_open_fileSha_} ] 自动打开分享链接（点击文件时）`, function(){menu_switch(menu_open_fileSha,'xiu2_menu_open_fileSha','自动打开分享链接（点击文件时）')});
        menu_feedBack_ID = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});
    }


    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status){
            GM_setValue(`${Name}`, false);
            GM_notification(`已关闭 [${Tips}] 功能\n（刷新网页后生效）`);
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification(`已开启 [${Tips}] 功能\n（刷新网页后生效）`);
        }
        registerMenuCommand(); // 重新注册脚本菜单
    };


    // 获取 iframe 框架
    var mainframe
    mainframe = document.getElementById("mainframe");
    if(mainframe){ // 只有找到 iframe 框架时才会继续运行脚本
        mainframe = mainframe.contentWindow;
        EventXMLHttpRequest(); // 监听 XMLHttpRequest 事件并执行 [自动显示更多文件]
    }


    // 自动显示更多文件
    function fileMore() {
        let filemore = mainframe.document.getElementById("filemore"); // 寻找 [显示更多文件] 按钮
        if(filemore && filemore.style.display == "block"){ // 判断按钮是否存在且可见
            if(filemore.children[0]){ // 判断按钮元素下第一个元素是否存在
                filemore.children[0].click(); // 点击 [显示更多文件] 按钮
            }
        }
    }


    // 自动打开分享链接（点击文件时）
    function fileSha() {
        if(menu_open_fileSha){ // 脚本菜单开启时才继续
            var f_sha = mainframe.document.getElementById("f_sha"); // 寻找分享链接（下载链接）信息框
            if(f_sha && f_sha.style.display == "block"){ // 判断信息框是否存在且可见
                let f_sha1 = mainframe.document.getElementById("f_sha1").innerText; // 获取分享链接（下载链接）
                if(f_sha1 != ""){ // 确保分享链接（下载链接）不是空
                    f_sha.style.display = "none"; // 隐藏分享链接（下载链接）信息框
                    window.GM_openInTab(f_sha1, {active: true,insert: true,setParent: true}) // 打开分享链接（下载链接）
                }
            }
        }
    }


    // 定时执行（旧方法，每隔 100ms 执行一次，比较笨且浪费一丢丢性能，但优点是不会漏掉且反应更快）
    //setInterval(fileMore,100);


    // 监听 XMLHttpRequest 事件并执行（新方法，只有在产生事件时才会执行 [自动显示更多文件]，平时不会执行，更优雅~）
    function EventXMLHttpRequest() {
        var _send = mainframe.XMLHttpRequest.prototype.send
        function sendReplacement(data) {
            setTimeout(fileMore, 200); // 自动显示更多文件
            setTimeout(fileSha, 200); // 自动打开分享链接（点击文件时）
            return _send.apply(this, arguments);
        }
        mainframe.XMLHttpRequest.prototype.send = sendReplacement;
    }


    /*(function (open) {
        mainframe.XMLHttpRequest.prototype.open = function () {
            this.addEventListener("readystatechange", function () {
                if(this.responseURL != "") {
                    console.log(this.responseURL);
                }
            }, false);
            open.apply(this, arguments);
        };
    })(mainframe.XMLHttpRequest.prototype.open);*/
})();