// ==UserScript==
// @name         蓝奏云网盘增强
// @version      1.4.3
// @author       X.I.U
// @description  刷新不回根目录、快捷返回上一级（右键网页空白处）、后退返回上一级、右键文件显示菜单、点击直接下载文件、点击空白进入目录、自动显示更多文件、一键复制所有分享链接、自定义分享链接域名、自动打开/复制分享链接、带密码的分享链接自动输密码、拖入文件自动显示上传框、输入密码后回车确认、调整描述（话说）编辑框初始大小
// @include      /^https:\/\/.+\.lanzou[a-z]\.com\/.*$/
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
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @noframes
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menu_ALL = [
        ['menu_customFileSha', '自定义分享链接域名', '自定义分享链接域名', ''],
        ['menu_open_fileSha', '自动打开分享链接', '自动打开分享链接', true],
        ['menu_copy_fileSha', '自动复制分享链接', '自动复制分享链接', true],
        ['menu_refreshCorrection', '刷新不返回根目录', '刷新不返回根目录', true],
        ['menu_rightClickMenu', '右键文件显示菜单', '右键文件显示菜单', true],
        ['menu_directDownload', '点击直接下载文件 (分享链接列表页)', '点击直接下载文件', true],
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
                menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){if(menu_value('menu_refreshCorrection')){UNrefreshCorrection();}else{refreshCorrection();};menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            } else if (menu_ALL[i][0] === 'menu_customFileSha') {
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customFileSha()});
            } else {
                menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419224/feedback', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true') {
            GM_setValue(`${Name}`, false);
            if (Name == 'menu_refreshCorrection') {
                GM_notification({text: `已关闭 [${Tips}] 功能`, timeout: 3500});
            } else {
                GM_notification({text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
            }
        } else {
            GM_setValue(`${Name}`, true);
            if (Name == 'menu_refreshCorrection') {
                GM_notification({text: `已开启 [${Tips}] 功能`, timeout: 3500});
            } else {
                GM_notification({text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
            }
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
        if (window.top.location.href != 'https://pc.woozooo.com/mydisk.php') window.top.location.href = 'https://pc.woozooo.com/mydisk.php';
        var mainframe;
        iframe();
    } else if (window.top.location.pathname.indexOf('%') > -1) { // > 带密码的分享链接页面
        shareLinkWithPassword(); //                                 带密码的分享链接自动输密码
    } else {
        setTimeout(function() { //                                  延迟 300 毫秒（避免网页还没加载完）
            if (document.getElementById('infos')) { //              > 分享链接文件列表页
                if (document.getElementById('pwdload')) { //        > 分享链接输入密码页
                    enterPassword(); //                             自动输入密码（仅支持访问 带密码的分享链接 时）
                    enterToPass(); //                               输入密码后回车确认
                }
                fileMoreS(); //                                     自动显示更多文件
                directDownload(); //                                点击直接下载文件（分享链接列表页）
            }
        }, 300);
        directDownload_(); //                                       点击直接下载文件（分享链接列表页）
    }


    // 获取 iframe 框架
    function iframe() {
        mainframe = document.getElementById('mainframe');
        if (mainframe) { //                              只有找到 iframe 框架时才会继续运行脚本
            mainframe = mainframe.contentWindow;
            if (menu_value('menu_refreshCorrection')) refreshCorrection(); // 刷新不返回根目录（F5）
            setTimeout(folderDescdes, 500); //           调整话说编辑框初始大小
            setTimeout(hideSha, 500); //                 隐藏分享链接窗口（这样自动打开/复制分享链接时，不会一闪而过）
            fobiddenBack(); //                           禁止浏览器返回（并绑定新的返回事件）
            EventXMLHttpRequest(); //                    监听 XMLHttpRequest 事件并执行 [自动显示更多文件]
            setTimeout(clickOpenDirectory, 500); //      点击空白进入目录
            setTimeout(backToTop, 2000); //              快捷返回上级（右键点击 网页右侧/下方 空白处）

            dragEnter(); //                              拖入文件自动显示上传框
            setTimeout(viewTop,1000); //                 监听并修改右键菜单 [外链分享地址] 为 [复制并打开分享链接] / [复制分享链接] / [打开分享链接] 之一
            setTimeout(copyAllfileSha, 500); //          一键复制所有分享链接
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
                let folderID = /-?\d+/.exec(mainframe.document.getElementById('filemore').children[0].onclick)
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


    // 点击空白进入目录
    function clickOpenDirectory() {
        mainframe.document.getElementById('sub_folder_list').onclick = function(e){
            //console.log(e.target);
            if (e.target.className && e.target.className == 'f_tb') {
                e.target.querySelector('span.follink').click()
            }
        }
    }


    // 右键文件显示菜单
    function rightClickMenu() {
        if (!menu_value('menu_rightClickMenu')) return
        rightClickMenu_('sub_folder_list', 'fols', 'folse') // 文件夹
        rightClickMenu_('filelist', 'fs', 'fse') //            文件
    }


    // 右键文件显示菜单，参数：文件/文件夹列表 ID、菜单 ID、菜单 ID前缀
    function rightClickMenu_(list_id_name, menu_id_name_prefix, list_id_name_prefix) {
        let list_ = mainframe.document.getElementById(list_id_name);
        if (!list_) return //                                文件/文件夹列表
        list_.oncontextmenu = function(e){
            e.preventDefault(); //                           屏蔽浏览器自身右键菜单
            let left = e.pageX - 30; //                      右键菜单弹出位置
            let list_ID = e.target.id;
            if (e.target.nodeName === 'FONT') {
                list_ID = e.target.parentNode.parentNode.id
            } else if(e.target.id === '') {
                list_ID = e.target.parentNode.id
            }
            list_ID = /\d+/.exec(list_ID)
            if(list_ID.length > 0){
                mainframe.document.getElementById(menu_id_name_prefix + list_ID[0]).style.cssText='position: absolute !important; left: ' + left + 'px;' // 修改右键菜单弹出位置（X）
                mainframe.document.getElementById(list_id_name_prefix + list_ID[0]).focus();
                mainframe.document.getElementById(list_id_name_prefix + list_ID[0]).click();
            }
        }
    }


    // 自动显示更多文件（后台页）
    function fileMore() {
        let filemore = mainframe.document.getElementById('filemore'); // 寻找 [显示更多文件] 按钮
        if (filemore && filemore.style.display === 'block') { //         判断按钮是否存在且可见
            if (filemore.children[0]) { //                               判断按钮元素下第一个元素是否存在
                filemore.children[0].click(); //                         点击 [显示更多文件] 按钮
            }
        }
    }


    // 自动显示更多文件（分享链接列表页）
    function fileMoreS() {
        windowScroll(function (direction, e) {
            if (direction === 'down') { // 下滑才准备加载更多
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                let scrollDelta = 500;
                if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                    let filemore = document.getElementById('filemore'); // 寻找 [显示更多文件] 按钮
                    if (filemore && filemore.style.display != 'none') { // 如果正在加载，就不再点击
                        if (filemore.textContent.indexOf('更多') > -1){ // 避免已经在加载了，重复点击
                            filemore.click(); //                           点击 [显示更多文件] 按钮
                        }
                    }
                }
            }
        });
    }


    // 点击直接下载文件（分享链接列表页）
    function directDownload() {
        if (!menu_value('menu_directDownload')) return
        if (document.getElementById('infos')) {
            document.getElementById('infos').addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    e.preventDefault(); // 阻止默认打开链接事件
                    GM_openInTab(e.target.href + '#download', {active: false, insert: true, setParent: true}); // 后台打开
                }
            });
        }
    }
    // 点击下载按钮
    function directDownload_() {
        if (!menu_value('menu_directDownload')) return
        if (location.hash != '#download') return
        let iframe = document.querySelector('iframe.ifr2');
        if (iframe) { // 只有找到 iframe 框架时才会继续运行脚本
            iframe = iframe.contentWindow;
            let timer = setInterval(function(){
                if (iframe.document.querySelector('#go a[href]')) {
                    //iframe.document.querySelector('#go a[href]').target = '_top'
                    //iframe.document.querySelector('#go a[href]').click();
                    GM_openInTab(iframe.document.querySelector('#go a[href]').href, {active: false, insert: true, setParent: false}); // 后台打开
                    clearInterval(timer);
                    // 关闭该后台标签页
                    if (GM_info.scriptHandler === 'Violentmonkey') { // Violentmonkey 需要延迟一会儿
                        setTimeout(function(){window.top.close();}, 500)
                    } else {
                        window.top.close();
                    }
                }
            }, 10);
        }
    }


    // 滚动条事件
    function windowScroll(fn1) {
        var beforeScrollTop = document.documentElement.scrollTop,
            fn = fn1 || function () {};
        setTimeout(function () { // 延时执行，避免刚载入到页面就触发翻页事件
            window.addEventListener('scroll', function (e) {
                var afterScrollTop = document.documentElement.scrollTop,
                    delta = afterScrollTop - beforeScrollTop;
                if (delta == 0) return false;
                fn(delta > 0 ? 'down' : 'up', e);
                beforeScrollTop = afterScrollTop;
            }, false);
        }, 1000)
    }


    // 调整话说编辑框初始大小
    function folderDescdes() {
        if (!menu_value('menu_folderDescdesMenu')) return
        let folderdescdes = mainframe.document.getElementById('folder_descdes'); //   寻找话说（描述）编辑框
        if (folderdescdes) { //                                                       判断话说（描述）元素是否存在
            folderdescdes.style.cssText='margin: 15px 0px; width: 550px; height: 125px;'
        }
        let folderdescdes2 = mainframe.document.getElementById('fol_credes'); //      寻找话说（描述）编辑框
        if (folderdescdes2) { //                                                      判断话说（描述）元素是否存在
            folderdescdes2.style.cssText='margin: 15px 0px; width: 550px; height: 125px;'
        }
        let folderdescdes3 = mainframe.document.getElementById('file_desc'); //       寻找话说（描述）编辑框
        if (folderdescdes3) { //                                                      判断话说（描述）元素是否存在
            folderdescdes3.style.cssText='margin: 15px 0px; width: 550px; height: 125px;'
        }
    }


    // 拖入文件自动显示上传框
    function dragEnter() {
        mainframe.addEventListener('dragenter', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let f_upb = mainframe.document.querySelector('.f_upb')
            if(f_upb.style.top != '-36px') {
                f_upb.style.top = '-36px';
                mainframe.f_upc();
            }
        }, false);
        mainframe.addEventListener('drop', function (e) {
            e.preventDefault();
            //e.stopPropagation();
            //console.log(e.dataTransfer.files)
        });
    }


    // 一键复制所有分享链接
    function copyAllfileSha() {
        var f_data = '', tmep_data = [];
        let f_tp = mainframe.document.getElementById('f_tp');
        //console.log(f_tp, mainframe.document.location.href)
        f_tp.insertAdjacentHTML('afterend', `<a id="f_copyAll" class="f_sela" style="float: right; width: auto; font-size: 12px !important; font: inherit; padding: 2px 10px; margin-top: -25px;" title="获取所有分享链接需要一些时间（取决于有多少文件）。&#10;因为分享链接没有显示在网页上，需要通过网页接口获取，因此为了避免太频繁被限制，所以设置了 300ms 间隔时间！">一键复制所有分享链接</a>`);
        mainframe.document.getElementById('f_copyAll').onclick = function() {
            f_data = ''; tmep_data = [];
            mainframe.document.querySelectorAll('.f_tb').forEach(function (_this) {
                //console.log(_this, _this.id.indexOf('fol') > -1)
                if (_this.id.indexOf('fol') > -1) {
                    //console.log(`task=18&folder_id=${_this.id.replace('fol','')}`)
                    tmep_data.push([`${_this.querySelector('span[id^="folname"]').textContent}`, `task=18&folder_id=${_this.id.replace('fol','')}`])
                } else {
                    //console.log(`task=22&file_id=${_this.id.replace('f','')}`)
                    tmep_data.push([`${_this.querySelector('span[id^="filename"]').textContent}`, `task=22&file_id=${_this.id.replace('f','')}`])
                }
            })
            //console.log(tmep_data)
            if (tmep_data.length > 0) {
                getUrl(0);
                GM_notification({text: '获取所有分享链接需要一些时间（取决于有多少文件），在此期间请不要关闭网页！', timeout: 5000});
            }
        };


        function getUrl(i) {
            //console.log(i)
            GM_xmlhttpRequest({
                url: 'https://pc.woozooo.com/doupload.php',
                method: 'POST',
                data: tmep_data[i][1],
                responseType: 'json',
                overrideMimeType: 'application/json; charset=utf-8',
                headers: {
                    'Referer': mainframe.document.location.href,
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                timeout: 5000,
                onload: function (response) {
                    try {
                        //console.log('返回内容：',response.response)
                        if (response.response && response.response.zt === 1) {
                            //console.log(response.response)
                            if (response.response.info.f_id) {
                                //console.log('文件 1',f_data)
                                f_data += `${tmep_data[i][0]} `
                                if (menu_value('menu_customFileSha')) {
                                    f_data += `https://${menu_value('menu_customFileSha')}/${response.response.info.f_id} `
                                } else {
                                    f_data += `${response.response.info.is_newd}/${response.response.info.f_id} `
                                }
                                if (response.response.info.onof == '1') f_data += `密码:${response.response.info.pwd}`
                                f_data += `\n`
                                //console.log('文件 2',f_data)
                            } else {
                                //console.log('目录 1',f_data)
                                f_data += `${response.response.info.name} `
                                if (menu_value('menu_customFileSha')) {
                                    f_data += `${response.response.info.new_url.replace(/\/\/.+\//i, '//' + menu_value('menu_customFileSha') + '/')} `
                                } else {
                                    f_data += `${response.response.info.new_url} `
                                }
                                if (response.response.info.onof == '1') f_data += `密码:${response.response.info.pwd}`
                                f_data += `\n`
                                //console.log('目录 2',f_data)
                            }
                            if (++i < tmep_data.length) {
                                setTimeout(function(){getUrl(i);}, 300);
                            } else {
                                console.log(f_data)
                                GM_setClipboard(f_data, 'text');
                                GM_notification({text: '✅ 已复制所有文件/目录的分享链接到剪切板~', timeout: 2000});
                            }
                        } else {
                            GM_notification({text: '❌ 更新失败，请联系作者解决...', timeout: 5000});
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            })
        }
    }

    // 分享链接相关（点击文件时）
    function fileSha() {
        var f_sha = mainframe.document.getElementById('f_sha'); //                      寻找分享链接（下载链接）信息框
        if (f_sha && f_sha.style.display === 'block') { //                              判断信息框是否存在且可见
            let f_sha1 = mainframe.document.getElementById('f_sha1'); //                获取分享链接（下载链接）
            if (f_sha1 && f_sha1.textContent != '') { //                                确保分享链接（下载链接）不是空
                // 自定义分享链接域名
                if (menu_value('menu_customFileSha')) {f_sha1.innerText = f_sha1.innerText.replace(/\/\/.+\//i, '//' + menu_value('menu_customFileSha') + '/');}
                // 打开分享链接
                if (menu_value('menu_open_fileSha')) {f_sha.style.display = 'none';GM_openInTab(f_sha1.textContent, {active: true,insert: true,setParent: true});}
                // 复制分享链接（并已复制的提示信息）
                if (menu_value('menu_copy_fileSha')) {f_sha.style.display = 'none';GM_setClipboard(f_sha1.textContent, 'text');GM_notification({text: '已复制分享链接~', timeout: 2000});}
                // 直接下载文件
                //if (menu_value('menu_directDownload')) {f_sha.style.display = 'none';GM_openInTab(f_sha1.textContent + '#download', {active: false,insert: true,setParent: true});}
            }
        }
    }


    // 自定义分享链接域名
    function customFileSha() {
        let newDomain = prompt('请输入 [自定义分享链接域名]，点击确定后立即生效\n蓝奏云分享链接末尾的 ID 是唯一的，而前面的域名用谁的都一样\n示例：pan.lanzoui.com 或 wwe.lanzoui.com 或 xiu.lanzoui.com', GM_getValue('menu_customFileSha'));
        if (newDomain === '') {
            GM_setValue('menu_customFileSha', '');
            registerMenuCommand(); // 重新注册脚本菜单
        } else if (newDomain != null) {
            GM_setValue('menu_customFileSha', newDomain);
            registerMenuCommand(); // 重新注册脚本菜单
        }
    }


    // 隐藏分享链接窗口（这样自动打开/复制分享链接时，不会一闪而过）
    function hideSha(){
        if (menu_value('menu_open_fileSha') || menu_value('menu_copy_fileSha')) { // [自动复制分享链接] 或 [自动打开分享链接] 任意一个功能开启时才继续
            mainframe.document.lastElementChild.appendChild(document.createElement('style')).textContent = '#f_sha {display: none !important;}';
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
        if (lastFolderID) {
            mainframe.folder(lastFolderID);
        }
        history.pushState(null, null, document.URL);
    }


    // 获取上个文件夹 ID（用于浏览器后退事件）
    function getLastFolderID() {
        lastFolderID = null
        let f_tpspan = mainframe.document.querySelectorAll('span.f_tpspan');
        if (f_tpspan.length > 1) {
            lastFolderID = /-?\d+/.exec(f_tpspan[f_tpspan.length - 2].getAttribute('onclick'))[0];
        }
    }


    // 输入密码后回车确认
    function enterToPass() {
        document.getElementById('pwd').onkeydown = function(e){
            if (e.key === 'Enter') {
                document.getElementById('sub').click();
            }
        };
    }


    // 快捷返回上级（右键点击 网页右侧/下方 空白处）
    function backToTop() {
        mainframe.document.getElementById('container').oncontextmenu = mainframe.document.body.oncontextmenu = function(e){
            if (e.target == this) {
                e.preventDefault();
                backEvent();
            }
        }
    }


    // 监听 XMLHttpRequest 事件并执行
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


    // 监听并修改右键菜单 [外链分享地址] 为 [复制并打开分享链接] / [复制分享链接] / [打开分享链接] 之一
    function viewTop() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === 'f_view') {
                        //console.log(target)
                        let f_viewtop = target.querySelector('.f_viewtop');
                        if (f_viewtop && f_viewtop.textContent === '外链分享地址') {
                            if (menu_value('menu_open_fileSha') && menu_value('menu_copy_fileSha')) {
                                f_viewtop.textContent = '复制并打开分享链接';
                            } else if (menu_value('menu_open_fileSha')) {
                                f_viewtop.textContent = '打开分享链接';
                            } else if (menu_value('menu_copy_fileSha')) {
                                f_viewtop.textContent = '复制分享链接';
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(mainframe.document, { childList: true, subtree: true });
    }
})();