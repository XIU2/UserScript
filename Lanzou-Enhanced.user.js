// ==UserScript==
// @name         蓝奏云网盘增强
// @version      1.1.6
// @author       X.I.U
// @description  刷新不返回根目录、右键文件显示菜单、自动显示更多文件、自动打开分享链接、自动复制分享链接、调整描述（话说）编辑框初始大小、拖入文件自动显示上传框
// @match        *://*.lanzous.com/*
// @match        *://*.lanzoux.com/*
// @match        *://*.lanzoui.com/*
// @match        *://pan.lanzou.com/*
// @match        *://www.lanzou.com/account.php*
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
// @grant        unsafeWindow
// @noframes
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==
(function() {
    var menu_open_fileSha = GM_getValue('xiu2_menu_open_fileSha'),
        menu_copy_fileSha = GM_getValue('xiu2_menu_copy_fileSha'),
        menu_refreshCorrection = GM_getValue('xiu2_menu_refreshCorrection'),
        menu_rightClickMenu = GM_getValue('xiu2_menu_rightClickMenu');
    var menu_open_fileSha_ID, menu_copy_fileSha_ID, menu_refreshCorrection_ID, menu_rightClickMenu_ID, menu_feedBack_ID;
    if (menu_open_fileSha == null){menu_open_fileSha = true; GM_setValue('xiu2_menu_open_fileSha', menu_open_fileSha)};
    if (menu_copy_fileSha == null){menu_copy_fileSha = true; GM_setValue('xiu2_menu_copy_fileSha', menu_copy_fileSha)};
    if (menu_refreshCorrection == null){menu_refreshCorrection = true; GM_setValue('xiu2_menu_refreshCorrection', menu_refreshCorrection)};
    if (menu_rightClickMenu == null){menu_rightClickMenu = true; GM_setValue('xiu2_menu_rightClickMenu', menu_rightClickMenu)};
    registerMenuCommand();

    // 注册脚本菜单
    function registerMenuCommand() {
        var menu_open_fileSha_, menu_copy_fileSha_, menu_refreshCorrection_, menu_rightClickMenu_;
        if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_open_fileSha_ID);
            GM_unregisterMenuCommand(menu_copy_fileSha_ID);
            GM_unregisterMenuCommand(menu_refreshCorrection_ID);
            GM_unregisterMenuCommand(menu_rightClickMenu_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_open_fileSha = GM_getValue('xiu2_menu_open_fileSha');
            menu_copy_fileSha = GM_getValue('xiu2_menu_copy_fileSha');
            menu_refreshCorrection = GM_getValue('xiu2_menu_refreshCorrection');
            menu_rightClickMenu = GM_getValue('xiu2_menu_rightClickMenu');
        }

        if (menu_open_fileSha){menu_open_fileSha_ = "√";}else{menu_open_fileSha_ = "×";}
        if (menu_copy_fileSha){menu_copy_fileSha_ = "√";}else{menu_copy_fileSha_ = "×";}
        if (menu_refreshCorrection){menu_refreshCorrection_ = "√";}else{menu_refreshCorrection_ = "×";}
        if (menu_rightClickMenu){menu_rightClickMenu_ = "√";}else{menu_rightClickMenu_ = "×";}

        menu_open_fileSha_ID = GM_registerMenuCommand(`[ ${menu_open_fileSha_} ] 自动打开分享链接`, function(){menu_switch(menu_open_fileSha,'xiu2_menu_open_fileSha','自动打开分享链接', true)});
        menu_copy_fileSha_ID = GM_registerMenuCommand(`[ ${menu_copy_fileSha_} ] 自动复制分享链接`, function(){menu_switch(menu_copy_fileSha,'xiu2_menu_copy_fileSha','自动复制分享链接', true)});
        menu_refreshCorrection_ID = GM_registerMenuCommand(`[ ${menu_refreshCorrection_} ] 刷新不返回根目录`, function(){if(menu_refreshCorrection){UNrefreshCorrection();}else{refreshCorrection();};menu_switch(menu_refreshCorrection,'xiu2_menu_refreshCorrection','刷新不返回根目录', false)});
        menu_rightClickMenu_ID = GM_registerMenuCommand(`[ ${menu_rightClickMenu_} ] 右键文件显示菜单`, function(){menu_switch(menu_rightClickMenu,'xiu2_menu_rightClickMenu','右键文件显示菜单', true)});
        menu_feedBack_ID = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});
    }


    // 菜单开关
    function menu_switch(menu_status, Name, Tips, RefreshTips) {
        if(RefreshTips){
            RefreshTips = "\n（刷新网页后生效）"
        }else{
            RefreshTips = ""
        }
        if (menu_status){
            GM_setValue(`${Name}`, false);
            GM_notification(`已关闭 [${Tips}] 功能${RefreshTips}`);
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification(`已开启 [${Tips}] 功能${RefreshTips}`);
        }
        registerMenuCommand(); // 重新注册脚本菜单
    };


    if(document.getElementById("infos")){ // 分享链接文件列表页
        setTimeout(fileMoreS, 300); // 自动显示更多文件
    }else if(document.querySelector("iframe.ifr2")){ // 分享链接文件下载页（暂时没有这方面的功能，先空着）
        //console.log()
    }else if(document.getElementById("mainframe") || window.top.location.href.indexOf("mydisk.php?") > -1){ // 后台页
        if(window.top.location.href != "https://pc.woozooo.com/mydisk.php"){
            window.top.location.href = "https://pc.woozooo.com/mydisk.php"
        }
        var mainframe;
        iframe();
    }


    // 获取 iframe 框架
    function iframe() {
        mainframe = document.getElementById("mainframe");
        if(mainframe){ // 只有找到 iframe 框架时才会继续运行脚本
            mainframe = mainframe.contentWindow;
            if(menu_refreshCorrection){
                refreshCorrection(); // 刷新不返回根目录（F5）
            }
            setTimeout(folderDescdes, 200); // 调整话说编辑框初始大小
            EventXMLHttpRequest(); // 监听 XMLHttpRequest 事件并执行 [自动显示更多文件]

            dragEnter(); // 拖入文件自动显示上传框
        }
    }


    // 刷新不返回根目录（F5）
    function refreshCorrection() {
        document.onkeydown = mainframe.onkeydown = function (e) {
            e = window.event || e;
            let keycode = e.keyCode;
            if (keycode == 116) {
                e.keyCode = 0;
                let folderID = /-?\d+/.exec(mainframe.document.getElementById("filemore").children[0].getAttribute("onclick"))
                if(folderID.length > 0){
                    mainframe.folder(folderID[0]);
                    e.returnValue = false;
                    e.cancelBubble = true;
                    return false;
                }
            }
        }
    }


    // 恢复刷新机制
    function UNrefreshCorrection() {
        document.onkeydown = mainframe.onkeydown = function (e) {
            e = window.event || e;
            let keycode = e.keyCode;
            if (keycode == 116) {
                return true;
            }
        }
    }


    // 右键文件显示菜单
    function rightClickMenu() {
        if(menu_rightClickMenu){ // 脚本菜单开启时才继续
            rightClickMenu_("sub_folder_list", "fols", "folse") // 文件夹
            rightClickMenu_("filelist", "fs", "fse") // 文件
        }
    }


    // 右键文件显示菜单，参数：文件/文件夹列表 ID、菜单 ID 前缀
    function rightClickMenu_(list_id_name, menu_id_name_prefix, list_id_name_prefix) {
        let list_ = mainframe.document.getElementById(list_id_name);
        if(list_){ // 文件/文件夹列表
            list_.oncontextmenu = function(e){
                e.preventDefault(); // 屏蔽浏览器自身右键菜单
                let left = e.pageX - 30; // 右键菜单弹出位置
                let list_ID = e.target.id;
                if(e.target.nodeName == "FONT"){
                    list_ID = e.target.parentNode.parentNode.id
                }else if(e.target.id == ""){
                    list_ID = e.target.parentNode.id
                }
                list_ID = /\d+/.exec(list_ID)
                if(list_ID.length > 0){
                    mainframe.document.getElementById(menu_id_name_prefix + list_ID[0]).style.cssText="position: absolute !important; left: " + left + "px;" // 修改右键菜单弹出位置（X）
                    mainframe.document.getElementById(list_id_name_prefix + list_ID[0]).focus();
                    mainframe.document.getElementById(list_id_name_prefix + list_ID[0]).click();
                }
            }
        }
    }


    // 自动显示更多文件（后台页）
    function fileMore() {
        let filemore = mainframe.document.getElementById("filemore"); // 寻找 [显示更多文件] 按钮
        if(filemore && filemore.style.display == "block"){ // 判断按钮是否存在且可见
            if(filemore.children[0]){ // 判断按钮元素下第一个元素是否存在
                filemore.children[0].click(); // 点击 [显示更多文件] 按钮
            }
        }
    }


    // 自动显示更多文件（分享链接列表页）
    function fileMoreS() {
        let filemore = document.getElementById("filemore"); // 寻找 [显示更多文件] 按钮
        if(filemore && filemore.style.display != "none"){ // 判断按钮是否存在且可见
            filemore.click(); // 点击 [显示更多文件] 按钮
        }
    }


    // 调整话说编辑框初始大小
    function folderDescdes() {
        let folderdescdes = mainframe.document.getElementById("folder_descdes"); // 寻找话说（描述）编辑框
        if(folderdescdes){ // 判断话说（描述）元素是否存在
            folderdescdes.style.cssText="margin: 15px 0px; width: 666px; height: 150px;"
        }
        let folderdescdes2 = mainframe.document.getElementById("fol_credes"); // 寻找话说（描述）编辑框
        if(folderdescdes2){ // 判断话说（描述）元素是否存在
            folderdescdes2.style.cssText="margin: 15px 0px; width: 666px; height: 150px;"
        }
        let folderdescdes3 = mainframe.document.getElementById("file_desc"); // 寻找话说（描述）编辑框
        if(folderdescdes3){ // 判断话说（描述）元素是否存在
            folderdescdes3.style.cssText="margin: 15px 0px; width: 666px; height: 150px;"
        }
    }


    // 拖入文件自动显示上传框
    function dragEnter() {
        mainframe.addEventListener("dragenter", function (e) {
            e.preventDefault();
            e.stopPropagation();
            let f_upb = mainframe.document.querySelector(".f_upb")
            if(f_upb.style.top != "-36px") {
                f_upb.style.top = "-36px";
                mainframe.f_upc();
            }
        }, false);
    }


    // 分享链接相关（点击文件时）
    function fileSha() {
        var f_sha = mainframe.document.getElementById("f_sha"); // 寻找分享链接（下载链接）信息框
        if(f_sha && f_sha.style.display == "block"){ // 判断信息框是否存在且可见
            fileSha_Open(); // 自动打开分享链接（点击文件时）
            fileSha_Copy(); // 自动复制分享链接（点击文件时）
            if(menu_open_fileSha || menu_copy_fileSha){
                f_sha.style.display = "none"; // 隐藏分享链接（下载链接）信息框
            }
        }
    }


    // 自动打开分享链接（点击文件时）
    function fileSha_Open() {
        if(menu_open_fileSha){ // 脚本菜单开启时才继续
            let code = mainframe.document.getElementById("code").getAttribute("title"); // 获取分享链接（下载链接）
            if(code != ""){ // 确保分享链接（下载链接）不是空
                window.GM_openInTab(code, {active: true,insert: true,setParent: true}) // 打开分享链接（下载链接）
            }
        }
    }


    // 自动复制分享链接（点击文件时）
    function fileSha_Copy() {
        if(menu_copy_fileSha){ // 脚本菜单开启时才继续
            let f_sha1 = mainframe.document.getElementById("f_sha1").innerText; // 获取分享链接（下载链接）
            if(f_sha1 != ""){ // 确保分享链接（下载链接）不是空
                copyToClipboard(f_sha1); // 复制到剪切板
            }
        }
    }


    // 复制到剪切板
    function copyToClipboard(s){
        if(window.clipboardData){
            window.clipboardData.setData('text',s);
        }else{
            (function(s){
                document.oncopy=function(e){
                    e.clipboardData.setData('text',s);
                    e.preventDefault();
                    document.oncopy=null;
                }
            })(s);
            document.execCommand('Copy');
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
            setTimeout(rightClickMenu, 500); // 右键文件显示菜单
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