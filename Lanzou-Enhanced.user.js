// ==UserScript==
// @name         蓝奏云网盘增强
// @version      1.2.7
// @author       X.I.U
// @description  刷新不回根目录、后退返回上一级、右键文件显示菜单、自动显示更多文件、自动打开分享链接、自动复制分享链接、带密码的分享链接自动输密码、拖入文件自动显示上传框、输入密码后回车确认、调整描述（话说）编辑框初始大小
// @match        *://*.lanzous.com/*
// @match        *://*.lanzoux.com/*
// @match        *://*.lanzoui.com/*
// @match        *://pan.lanzou.com/*
// @match        *://lanzou.com/u
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
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==
(function() {
    var menu_ALL = [
        ['menu_open_fileSha', '自动打开分享链接', '自动打开分享链接', true],
        ['menu_copy_fileSha', '自动复制分享链接', '自动复制分享链接', true],
        ['menu_refreshCorrection', '刷新不返回根目录', '刷新不返回根目录', true],
        ['menu_rightClickMenu', '右键文件显示菜单', '右键文件显示菜单', true],
        ['menu_folderDescdesMenu', '调整描述（话说）编辑框大小', '调整描述（话说）编辑框大小', true]
    ], menu_ID = [], lastFolderID;
    for (let i=0;i<menu_ALL.length;i++){ // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
    }
    registerMenuCommand();

    // 注册脚本菜单
    function registerMenuCommand() {
        if (menu_ID.length > menu_ALL.length){ // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
            for (let i=0;i<menu_ID.length;i++){
                GM_unregisterMenuCommand(menu_ID[i]);
            }
        }
        for (let i=0;i<menu_ALL.length;i++){ // 循环注册脚本菜单
            menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
            if (menu_ALL[i][0] == 'menu_refreshCorrection') {
                menu_ID[i] = GM_registerMenuCommand(`[ ${menu_ALL[i][3]?'√':'×'} ] ${menu_ALL[i][1]}`, function(){if(menu_value('menu_refreshCorrection')){UNrefreshCorrection();}else{refreshCorrection();};menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }else{
                menu_ID[i] = GM_registerMenuCommand(`[ ${menu_ALL[i][3]?'√':'×'} ] ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419224/feedback', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        let RefreshTips = '\n（刷新网页后生效）';
        if (Name == 'menu_refreshCorrection')RefreshTips = ''
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能${RefreshTips}`, timeout: 3500});
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能${RefreshTips}`, timeout: 3500});
        }
        registerMenuCommand(); // 重新注册脚本菜单
    };

    // 返回菜单值
    function menu_value(menuName) {
        for (let menu of menu_ALL) {
            if (menu[0] == menuName) {
                return menu[3]
            }
        }
    }


    if (window.top.location.pathname === '/u' || window.top.location.pathname.indexOf('account.php') > -1 || window.top.location.pathname.indexOf('mydisk.php') > -1) { // 后台页
        if (window.top.location.href != "https://pc.woozooo.com/mydisk.php") {
            window.top.location.href = "https://pc.woozooo.com/mydisk.php"
        }
        var mainframe;
        iframe();
    } else if (window.top.location.pathname.indexOf('%') > -1) { // 带密码的分享链接页面
        shareLinkWithPassword(); //                                 带密码的分享链接自动输密码
    } else {
        setTimeout(function() { //                                  延迟 300 毫秒（避免网页还没加载完）
            if (document.getElementById('infos')) { //              分享链接文件列表页
                if (document.getElementById('pwdload')) { //        分享链接输入密码页
                    enterPassword(); //                             自动输入密码（仅支持访问 带密码的分享链接 时）
                    enterToPass(); //                               输入密码后回车确认
                }
                fileMoreS(); //                                     自动显示更多文件
            }
        }, 300);
    }


    // 获取 iframe 框架
    function iframe() {
        mainframe = document.getElementById("mainframe");
        if(mainframe){ //                                只有找到 iframe 框架时才会继续运行脚本
            mainframe = mainframe.contentWindow;
            if(menu_value('menu_refreshCorrection')){
                refreshCorrection(); //                  刷新不返回根目录（F5）
            }
            setTimeout(folderDescdes, 200); //           调整话说编辑框初始大小
            setTimeout(hideSha, 200); //                 隐藏分享链接窗口（这样自动打开/复制分享链接时，不会一闪而过）
            fobiddenBack(); //                           禁止浏览器返回（并绑定新的返回事件）
            EventXMLHttpRequest(); //                    监听 XMLHttpRequest 事件并执行 [自动显示更多文件]

            dragEnter(); //                              拖入文件自动显示上传框
        }
    }


    // 带密码的分享链接自动输密码
    function shareLinkWithPassword() {
        if (location.pathname.indexOf('%E5%AF%86%E7%A0%81') > -1) {
            let shareLink = location.pathname.split('%')
            if (shareLink.length > 0) {
                shareLink = location.origin + shareLink[0]
                let password = location.pathname.replace('%E5%AF%86%E7%A0%81',':').replace(/%([A-Z]|[0-9]){2}/ig, '').split(':')
                if (password.length > 0) {
                    location.replace(shareLink + '?password=' + password[password.length - 1])
                }
            }
        }
    }


    // 自动输入密码（仅支持访问 带密码的分享链接 时）
    function enterPassword() {
        if (location.search.indexOf('?password=') > -1) {
            let password = location.search.split('=')
            if (password.length > 0) {
                document.getElementById('pwd').value = password[password.length - 1]
                document.getElementById('sub').click();
            }
        }
    }


    // 刷新不返回根目录（F5）
    function refreshCorrection() {
        document.onkeydown = mainframe.onkeydown = function (e) {
            e = window.event || e;
            if (e.key === 'F5') {
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
            if (e.key === 'F5') {
                return true;
            }
        }
    }


    // 右键文件显示菜单
    function rightClickMenu() {
        if(menu_value('menu_rightClickMenu')){ //                                脚本菜单开启时才继续
            rightClickMenu_("sub_folder_list", "fols", "folse") // 文件夹
            rightClickMenu_("filelist", "fs", "fse") //            文件
        }
    }


    // 右键文件显示菜单，参数：文件/文件夹列表 ID、菜单 ID 前缀
    function rightClickMenu_(list_id_name, menu_id_name_prefix, list_id_name_prefix) {
        let list_ = mainframe.document.getElementById(list_id_name);
        if(list_){ //                                          文件/文件夹列表
            list_.oncontextmenu = function(e){
                e.preventDefault(); //                         屏蔽浏览器自身右键菜单
                let left = e.pageX - 30; //                    右键菜单弹出位置
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
        if(filemore && filemore.style.display == "block"){ //            判断按钮是否存在且可见
            if(filemore.children[0]){ //                                 判断按钮元素下第一个元素是否存在
                filemore.children[0].click(); //                         点击 [显示更多文件] 按钮
            }
        }
    }


    // 自动显示更多文件（分享链接列表页）
    function fileMoreS() {
        windowScroll(function (direction, e) {
            if (direction === "down") { // 下滑才准备加载更多
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                let scrollDelta = 500;
                if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                    let filemore = document.getElementById("filemore"); // 寻找 [显示更多文件] 按钮
                    if (filemore && filemore.style.display != "none") { // 如果正在加载，就不再点击
                        if (filemore.innerText.indexOf('更多') > -1){ //   避免已经在加载了，重复点击
                            filemore.click(); //                           点击 [显示更多文件] 按钮
                        }
                    }
                }
            }
        });
    }


    // 滚动条事件
    function windowScroll(fn1) {
        var beforeScrollTop = document.documentElement.scrollTop,
            fn = fn1 || function () {};
        setTimeout(function () { // 延时执行，避免刚载入到页面就触发翻页事件
            window.addEventListener("scroll", function (e) {
                var afterScrollTop = document.documentElement.scrollTop,
                    delta = afterScrollTop - beforeScrollTop;
                if (delta == 0) return false;
                fn(delta > 0 ? "down" : "up", e);
                beforeScrollTop = afterScrollTop;
            }, false);
        }, 1000)
    }


    // 调整话说编辑框初始大小
    function folderDescdes() {
        if(menu_value('menu_folderDescdesMenu')) {
            let folderdescdes = mainframe.document.getElementById("folder_descdes"); // 寻找话说（描述）编辑框
            if(folderdescdes){ //                                                       判断话说（描述）元素是否存在
                folderdescdes.style.cssText="margin: 15px 0px; width: 550px; height: 125px;"
            }
            let folderdescdes2 = mainframe.document.getElementById("fol_credes"); //    寻找话说（描述）编辑框
            if(folderdescdes2){ //                                                      判断话说（描述）元素是否存在
                folderdescdes2.style.cssText="margin: 15px 0px; width: 550px; height: 125px;"
            }
            let folderdescdes3 = mainframe.document.getElementById("file_desc"); //     寻找话说（描述）编辑框
            if(folderdescdes3){ //                                                      判断话说（描述）元素是否存在
                folderdescdes3.style.cssText="margin: 15px 0px; width: 550px; height: 125px;"
            }
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
        mainframe.addEventListener("drop", function (e) {
            e.preventDefault();
            //e.stopPropagation();
            console.log('111111')
            //console.log(e.dataTransfer.files)
        });
    }


    // 分享链接相关（点击文件时）
    function fileSha() {
        var f_sha = mainframe.document.getElementById("f_sha"); // 寻找分享链接（下载链接）信息框
        if(f_sha && f_sha.style.display == "block"){ //            判断信息框是否存在且可见
            fileSha_Open(); //                                     自动打开分享链接（点击文件时）
            fileSha_Copy(); //                                     自动复制分享链接（点击文件时）
            if(menu_value('menu_open_fileSha') || menu_value('menu_copy_fileSha')){
                f_sha.style.display = "none"; //                   隐藏分享链接（下载链接）信息框
            }
        }
    }


    // 自动打开分享链接（点击文件时）
    function fileSha_Open() {
        if(menu_value('menu_open_fileSha')){ //                                                          脚本菜单开启时才继续
            let code = mainframe.document.getElementById("code").getAttribute("title"); // 获取分享链接（下载链接）
            if(code != ""){ //                                                             确保分享链接（下载链接）不是空
                window.GM_openInTab(code, {active: true,insert: true,setParent: true}) //  打开分享链接（下载链接）
            }
        }
    }


    // 自动复制分享链接（点击文件时）
    function fileSha_Copy() {
        if(menu_value('menu_copy_fileSha')){ //                                                  脚本菜单开启时才继续
            let f_sha1 = mainframe.document.getElementById("f_sha1").innerText; // 获取分享链接（下载链接）
            if(f_sha1 != ""){ //                                                   确保分享链接（下载链接）不是空
                copyToClipboard(f_sha1); //                                        复制到剪切板
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


    // 隐藏分享链接窗口（这样自动打开/复制分享链接时，不会一闪而过）
    function hideSha(){
        if(menu_value('menu_open_fileSha') || menu_value('menu_copy_fileSha')){ // [自动复制分享链接] 或 [自动打开分享链接] 任意一个功能开启时才继续
            let style_Add = mainframe.document.createElement('style');
            style_Add.type = 'text/css';
            style_Add.innerHTML = `#f_sha {display: none !important;}`;
            mainframe.document.head.appendChild(style_Add);
        }
    }


    // 禁止浏览器返回（并绑定新的返回事件）
    function fobiddenBack() {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate',backEvent)
    }


    // 允许浏览器返回
    function enableBack() {
        history.go(-1);
        window.removeEventListener('popstate',backEvent)
    }


    // 浏览器后退事件函数
    function backEvent() {
        if(lastFolderID) {
            mainframe.folder(lastFolderID);
        }
        history.pushState(null, null, document.URL);
    }


    // 获取上个文件夹 ID（用于浏览器后退事件）
    function getLastFolderID() {
        lastFolderID = null
        let f_tpspan = mainframe.document.querySelectorAll("span.f_tpspan");
        if(f_tpspan.length > 1) {
            lastFolderID = /-?\d+/.exec(f_tpspan[f_tpspan.length - 2].getAttribute("onclick"))[0];
        }
    }


    // 输入密码后回车确认
    function enterToPass() {
        document.getElementById('pwd').onkeydown = function(e){
            if(e.key === 'Enter'){
                document.getElementById('sub').click();
            }
        };
    }


    // 监听 XMLHttpRequest 事件并执行（新方法，只有在产生事件时才会执行 [自动显示更多文件]，平时不会执行，更优雅~）
    function EventXMLHttpRequest() {
        var _send = mainframe.XMLHttpRequest.prototype.send
        function sendReplacement(data) {
            setTimeout(fileMore, 200); // 自动显示更多文件
            setTimeout(fileSha, 200); // 自动打开分享链接（点击文件时）
            setTimeout(rightClickMenu, 500); // 右键文件显示菜单
            setTimeout(getLastFolderID, 200); // 获取上个文件夹 ID（用于浏览器后退事件）
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