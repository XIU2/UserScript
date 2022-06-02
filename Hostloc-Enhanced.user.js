// ==UserScript==
// @name         全球主机交流论坛增强
// @version      1.4.5
// @author       X.I.U
// @description  自动签到（访问空间 +22 积分）、屏蔽用户（黑名单）、屏蔽关键词（帖子标题）、回帖小尾巴、自动无缝翻页、快捷回到顶部（右键网页两侧空白处）、收起预览帖子（左键网页两侧空白处）、屏蔽投票贴、屏蔽阅读权限 255 帖子、预览帖子快速回复带签名、显示是否在线、显示帖子内隐藏回复
// @match        *://hostloc.com/*
// @match        *://91ai.net/*
// @icon         https://hostloc.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        unsafeWindow
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/414005
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menu_ALL = [
        ['menu_autoSignIn', '自动签到（22 积分）', '自动签到', true],
        ['menu_reAutoSignIn', '重新签到', '重新签到', ''],
        ['menu_customBlockUsers', '屏蔽用户（黑名单）', '屏蔽用户', []],
        ['menu_customBlockKeywords', '屏蔽关键词（帖子标题）', '屏蔽关键词', []],
        ['menu_customLittleTail', '回帖小尾巴', '回帖小尾巴', ''],
        ['menu_pageLoading', '自动无缝翻页（总开关）', '自动无缝翻页', true],
        ['menu_thread_pageLoading', '帖子内自动翻页', '帖子内自动翻页', true],
        ['menu_showhide', '显示帖内隐藏回复', '显示帖内隐藏回复', true],
        ['menu_delate255', '屏蔽阅读权限 255 帖子', '屏蔽阅读权限 255 帖子', true],
        ['menu_delatePolls', '屏蔽投票帖子', '屏蔽投票帖子', false]
    ], menu_ID = [];
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
            if (menu_ALL[i][0] === 'menu_reAutoSignIn') {
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){reAutoSignIn()});
            } else if (menu_ALL[i][0] === 'menu_customBlockUsers') {
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockUsers()});
            } else if (menu_ALL[i][0] === 'menu_customBlockKeywords') {
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockKeywords()});
            } else if (menu_ALL[i][0] === 'menu_customLittleTail') {
                if (menu_value(menu_ALL[i][0]).length === 0) {GM_setValue(menu_ALL[i][0], '')} // 修改旧版类型
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customLittleTail()});
            } else {
                menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/414005/feedback', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
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

    // 检查是否登陆
    var loginStatus = false;
    if (document.getElementById('um')){
        loginStatus = true;
    } else {
        if (typeof discuz_uid != 'undefined') loginStatus = (discuz_uid != '0' ? true : false);
    }

    // 默认 ID 为 0
    var curSite = {SiteTypeID: 0};

    // 自动翻页规则
    let DBSite = {
        forum: {
            SiteTypeID: 1
        },
        thread: {
            SiteTypeID: 2,
            pager: {
                nextLink: 'a.nxt',
                pageElement: 'div#postlist > div[id^="post_"]',
                HT_insert: ['div#postlist', 2],
                replaceE: '#ct > .pgs',
            }
        },
        search: {
            SiteTypeID: 3,
            pager: {
                nextLink: 'a.nxt',
                pageElement: 'div#threadlist > ul',
                HT_insert: ['div#threadlist', 2],
                replaceE: 'div.pg'
            }
        },
        guide: {
            SiteTypeID: 4,
            pager: {
                nextLink: 'a.nxt',
                pageElement: 'div#threadlist div.bm_c table > tbody',
                HT_insert: ['div#threadlist div.bm_c table', 2],
                replaceE: 'div.pg',
            }
        },
        youreply: {
            SiteTypeID: 5,
            pager: {
                nextLink: 'a.nxt',
                pageElement: 'tbody > tr:not(.th)',
                HT_insert: ['tbody', 2],
                replaceE: 'div.pg',
            }
        }
    };

    // 用于脚本内部判断当前 URL 类型
    let SiteType = {
        FORUM: DBSite.forum.SiteTypeID, // 各板块帖子列表
        THREAD: DBSite.thread.SiteTypeID, // 帖子内
        GUIDE: DBSite.guide.SiteTypeID, // 导读帖子列表
        SEARCH: DBSite.search.SiteTypeID // 搜索结果列表
    };

    // URL 匹配正则表达式
    let patt_thread = /\/thread-\d+-\d+\-\d+.html/,
        patt_forum = /\/forum-\d+-\d+\.html/

    // URL 判断
    if (patt_thread.test(location.pathname) || location.search.indexOf('mod=viewthread') > -1) { // 帖子内
        if (menu_value('menu_thread_pageLoading')) {
            curSite = DBSite.thread;
            hidePgbtn(); //                                               隐藏帖子内的 [下一页] 按钮
        }
        showPosts(); //                                                   自动显示帖子内被隐藏的回复
        blockUsers('thread'); //                                          屏蔽用户（黑名单）
        onlineStatus(); //                                                显示是否在线
        replyCustom('thread'); //                                         回复自定义
    } else if (patt_forum.test(location.pathname) || location.search.indexOf('mod=forumdisplay') > -1) { // 各板块帖子列表
        curSite = DBSite.forum;
        collapsedNowPost(); //                                            收起当前帖子预览（左键左右两侧空白处）
        delate255(); //                                                   屏蔽 255 权限帖子
        delatePolls(); //                                                 屏蔽投票贴子
        blockUsers('forum'); //                                           屏蔽用户（黑名单）
        blockKeywords(); //                                               屏蔽关键词（帖子标题）
        vfastpostDOMNodeInserted(); //                                    监听插入事件（预览快速回复带签名）
        replyCustom('forum'); //                                          回复自定义
        if (patt_forum.test(location.pathname)) blockDOMNodeInserted(); //监听插入事件（有新的回复主题，点击查看）
     }else if (location.search.indexOf('mod=guide') > -1) { //            导读帖子列表
        curSite = DBSite.guide;
    } else if(location.pathname === '/search.php') { //                   搜索结果列表
        curSite = DBSite.search;
        blockUsers('search'); //                                          屏蔽用户（黑名单）
    } else if(location.pathname === '/home.php' && location.search.indexOf('mod=space&do=notice&view=mypost') > -1) { // 消息(帖子/点评/提到)
        blockUsers('notice'); //                                          屏蔽用户（黑名单）
    } else if(location.pathname === '/home.php' && location.search.indexOf('mod=space&do=pm') > -1) { // 消息(私人聊天)
        blockUsers('pm'); //                                              屏蔽用户（黑名单）
    } else if(location.search.indexOf('mod=space') > -1 && location.search.indexOf('&view=me') > -1) { // 别人的主题/回复
        curSite = DBSite.youreply;
    } else if(location.pathname === '/forum.php' && location.search.indexOf('mod=post&action=reply') > -1 || location.pathname === '/forum.php' && location.search.indexOf('mod=post&action=newthread') > -1) { // 回复：高级回复
        replyCustom('reply'); //                                          回复自定义
    }

    curSite.pageUrl = ""; // 下一页URL
    pageLoading(); // 自动翻页
     backToTop(); //    回到顶部（右键点击左右两侧空白处）
    if(menu_value('menu_autoSignIn')) autoSignIn(); //  自动签到（访问空间 10 次 = 20 积分）
    //replyIntervalDOMNodeInserted(); //                 监听插入事件（回帖间隔）


    // 自动签到（访问空间 10 次 = 20 积分 + 当天首次访问论坛 2 积分）
    function autoSignIn() {
        if (!loginStatus) return
        let timeNow = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate(),
            timeOld = GM_getValue('menu_signInTime');
        if (!timeOld || timeOld != timeNow) { // 是新的一天
            GM_setValue('menu_signInTime', timeNow); //      写入签到时间以供后续比较
            GM_notification({text: '请不要关闭/刷新本页！耐心等待 60 秒~\n在此期间可以在 "其他标签页" 浏览论坛！', timeout: 10000});
            let url_list = [],
                url = 0;
            // 随机生成 12 个空间地址（2 个冗余）
            for(let i = 0;i < 12;i++){url_list[i] = "https://" + location.host + "/space-uid-" + Math.floor(Math.random()*(50000-10000+1)+10000) + ".html";}
            // 每 5 秒访问一次（避免触发网站防御机制，而且还可以适当浏览论坛）
            let signIn = setInterval(function(){
                GM_xmlhttpRequest({
                    url: url_list[url++],
                    method: 'GET',
                    timeout: 4000
                });
                console.log(`[全球主机交流论坛 增强] 积分 +2 (${url_list[url]})`);
                if (url === 11) { // 次数够了就取消定时循环
                    clearInterval(signIn);
                    console.log('[全球主机交流论坛 增强] 签到完成！');
                    GM_notification({text: '签到完成！积分 +22 ~', timeout: 3500});
                }
            }, 5000);
        }
    }


    // 重新签到
    function reAutoSignIn() {
        GM_setValue('menu_signInTime', '1970/1/1'); // 设置为比当前日期更早
        location.reload(); // 刷新网页
    }


    // 自定义屏蔽用户
    function customBlockUsers() {
        let nowBlockUsers = '';
        GM_getValue('menu_customBlockUsers').forEach(function(item){nowBlockUsers += '|' + item})
        let newBlockUsers = prompt('编辑 [自定义屏蔽用户]，刷新网页后生效\n（不同用户名之间使用 "|" 分隔，\n（例如：用户A|用户B|用户C，如果只有一个就不需要 "|" 了。', nowBlockUsers.replace('|',''));
        if (newBlockUsers === '') {
            GM_setValue('menu_customBlockUsers', []);
            registerMenuCommand(); // 重新注册脚本菜单
        } else if (newBlockUsers != null) {
            GM_setValue('menu_customBlockUsers', newBlockUsers.split('|'));
            registerMenuCommand(); // 重新注册脚本菜单
        }
    };


    // 屏蔽用户
    function blockUsers(type) {
        if (!menu_value('menu_customBlockUsers') || menu_value('menu_customBlockUsers').length < 1) return
        switch(type) {
            case 'thread': // 帖子内
                blockUsers_('[id^="post_"]', 'a[href^="space-uid"]');
                blockUsers_('[id^="comment_"] > div', 'a.xi2.xw1'); // 点评
                break;
            case 'forum': //  各版块帖子列表
                blockUsers_('[id^="normalthread_"]', 'a[href^="space-uid"]');
                blockUsers_vfastpost(); // 预览帖子中的回复
                break;
            case 'search': // 搜索结果
                blockUsers_('.pbw', 'a[href^="space-uid"]');
                break;
            case 'notice': // 消息
                blockUsers_('dl.cl', '.ntc_body a[href^="space-uid"]');
                break;
            case 'pm': //     私人聊天
                blockUsers_('dl[id^="pmlist_"]', '.ptm.pm_c a[href^="space-uid"]');
                break;
        }

        function blockUsers_(list1, list2) {
            document.querySelectorAll(list1).forEach(function(item){ // 遍历所有帖子
                menu_value('menu_customBlockUsers').forEach(function(item1){ // 遍历用户黑名单
                    let itemName = item.querySelector(list2); // 寻找用户名
                    if (itemName && itemName.textContent === item1) {
                        console.log(`屏蔽用户：${item1}`);
                        item.hidden = true; // 删除帖子
                    }
                })
            })
        }

        function blockUsers_vfastpost() {
            let vfastpost = e => {
                if (e.target.nodeType == 1 && e.target.outerHTML && e.target.outerHTML.indexOf('class="fastpreview"') > -1) {
                    e.target.querySelectorAll('.bm_c > [id^="post_"]').forEach(function(item){ // 遍历所有回复
                        menu_value('menu_customBlockUsers').forEach(function(item1){ // 遍历用户黑名单
                            let itemName = item.querySelector('a.xi2'); // 寻找用户名
                            if (itemName && itemName.textContent === item1) {
                                console.log(`屏蔽用户：${item1}`);
                                item.hidden = true; // 删除回复
                            }
                        })
                    })
                }
            }
            document.addEventListener('DOMNodeInserted', vfastpost); // 监听插入事件
        }
    }


    // 自定义屏蔽关键词（帖子标题）
    function customBlockKeywords() {
        let nowBlockKeywords = '';
        GM_getValue('menu_customBlockKeywords').forEach(function(item){nowBlockKeywords += '|' + item})
        let newBlockKeywords = prompt('编辑 [自定义屏蔽关键词]，刷新网页后生效\n（不同关键词之间使用 "|" 分隔，\n（例如：助力|互助|互点，如果只有一个就不需要 "|" 了。', nowBlockKeywords.replace('|',''));
        if (newBlockKeywords === '') {
            GM_setValue('menu_customBlockKeywords', []);
            registerMenuCommand(); // 重新注册脚本菜单
        } else if (newBlockKeywords != null) {
            GM_setValue('menu_customBlockKeywords', newBlockKeywords.split('|'));
            registerMenuCommand(); // 重新注册脚本菜单
        }
    };


    // 屏蔽关键词（帖子标题）
    function blockKeywords() {
        if (!menu_value('menu_customBlockKeywords') || menu_value('menu_customBlockKeywords').length < 1) return
        document.querySelectorAll('[id^="normalthread_"]').forEach(function(item){ // 遍历所有帖子标题
            menu_value('menu_customBlockKeywords').forEach(function(item1){ // 遍历关键词
                let itemName = item.querySelector('a.s.xst'); // 寻找帖子标题
                if (itemName && itemName.textContent.indexOf(item1) > -1) {
                    console.log(`屏蔽关键词：[${item1}]`, `，帖子标题：[${itemName.textContent}]`);
                    item.hidden = true; // 删除帖子
                }
            })
        })
    }


    // 监听插入事件（有新的回复主题，点击查看）
    function blockDOMNodeInserted() {
        let block = e => {
            if (e.target.nodeType == 1 && e.target.textContent && e.target.textContent.indexOf('newthread') > -1) {
                setTimeout(function () {
                    blockUsers('forum'); //                           屏蔽用户（黑名单）
                    blockKeywords(); //                               屏蔽关键词（帖子标题）
                }, 100)
            }
        }
        document.addEventListener('DOMNodeInserted', block); // 监听插入事件
    }


    // 监听插入事件（预览快速回复带签名）
    function vfastpostDOMNodeInserted() {
        let vfastpost = e => {
            if (e.target.nodeType == 1 && e.target.innerHTML && e.target.innerHTML.indexOf('id="vfastpost"') > -1) {
                e.target.getElementsByTagName('form')[0].insertAdjacentHTML('afterbegin', `<input type="hidden" name="usesig" value="1">`);
            }
        }
        document.addEventListener('DOMNodeInserted', vfastpost); // 监听插入事件
    }


    // 自定义小尾巴内容
    function customLittleTail() {
        let newLittleTail = prompt('编辑 [自定义小尾巴内容]，刷新网页后生效（换行请使用 \\n\n提示①：记得在小尾巴前面加上几个 \\n 换行，用来分隔开回帖内容~\n提示②：建议使用 [align=right] 标签来使小尾巴居右~\n提示③：支持论坛富文本标签（建议先找个回复编辑预览好~\n示例：\\n\\n\\n\\n[align=right]第一行内容~\\n第二行内容~[/align]', GM_getValue('menu_customLittleTail'));
        if (newLittleTail === '') {
            GM_setValue('menu_customLittleTail', '');
            registerMenuCommand(); // 重新注册脚本菜单
        } else if (newLittleTail != null) {
            GM_setValue('menu_customLittleTail', newLittleTail);
            registerMenuCommand(); // 重新注册脚本菜单
        }
    };


    // 回复自定义
    function replyCustom(type) {
        switch(type) {
            case 'forum': // 各版块帖子列表的预览帖子
                replyCustom_0(); // 预览帖子 快速回复（底部）
                replyCustom_1(); // 预览帖子 回复（悬浮）
                break;
            case 'thread': // 帖子内
                replyCustom_1(); // 快速回复（悬浮）
                replyCustom_2(); // 回复框（底部）
                break;
            case 'reply': // 高级回复
                replyCustom_3();
                break;
        }

        function replyCustom_0() {
            let vfastpost = e => {
                if (e.target.nodeType == 1 && e.target.innerHTML && e.target.innerHTML.indexOf('id="vfastpost"') > -1) {
                    let message = e.target.querySelector('input[name="message"]'), id = message.id.match(/\d+/g)[0];
                    message.parentNode.innerHTML = `<textarea type="text" name="message" id="vmessage_${id}" style="width: 99.8%;height: 30px;border: none;outline: none;font-size: 14px;overflow-y: hidden;"></textarea>`
                    document.getElementById(`vreplysubmit_${id}`).onclick = function(){
                        if (GM_getValue('menu_customLittleTail')) document.getElementById(`vmessage_${id}`).value += GM_getValue('menu_customLittleTail').replaceAll('\\n', '\n');
                    }
                }
            }
            document.addEventListener('DOMNodeInserted', vfastpost); // 监听插入事件
        }

        function replyCustom_1() {
            let floatlayout_reply = e => {
                if (e.target.nodeType == 1 && e.target.innerHTML && e.target.innerHTML.indexOf('id="floatlayout_reply"') > -1) {
                    document.getElementById('postsubmit').onclick = function(){
                        if (GM_getValue('menu_customLittleTail')) document.getElementById('postmessage').value += GM_getValue('menu_customLittleTail').replaceAll('\\n', '\n');
                    }
                }
            }
            document.addEventListener('DOMNodeInserted', floatlayout_reply); // 监听插入事件
        }

        function replyCustom_2() { // 帖子底部的回复框
            document.getElementById('fastpostsubmit').onclick = function(){
                if (GM_getValue('menu_customLittleTail')) document.getElementById('fastpostmessage').value += GM_getValue('menu_customLittleTail').replaceAll('\\n', '\n');
            }
        }

        function replyCustom_3() {
            let postsubmit = document.getElementById('postsubmit');
            if (postsubmit && postsubmit.textContent === '\n参与/回复主题\n' || postsubmit && postsubmit.textContent === '\n发表帖子\n') {
                postsubmit.onclick = function(){
                    if (GM_getValue('menu_customLittleTail')) document.getElementById('e_textarea').value += GM_getValue('menu_customLittleTail').replaceAll('\\n', '\n');
                }
            }
        }
    }


    // 监听插入事件（回帖间隔）
    /*function replyIntervalDOMNodeInserted() {
        let replyInterval = e => {
            if (e.target.nodeType == 1 && e.target.innerHTML && e.target.textContent.indexOf('发表回复 金钱+1') > -1) {
                setTimeout(function () {GM_notification({text: '过去 60 秒了，可以回帖了~', timeout: 3500});}, 60000)
            }
        }
        document.addEventListener('DOMNodeInserted', replyInterval); // 监听插入事件
    }*/


    // 自动显示帖子内被隐藏的回复
    function showPosts() {
        if(menu_value('menu_showhide')){
            let showposts = document.querySelector('#hiddenpoststip a');
            if (showposts){ // 如果存在
                showposts.click();
            }
        }
    }


    // 隐藏帖子内的 [下一页] 按钮
    function hidePgbtn() {
        document.lastChild.appendChild(document.createElement('style')).textContent = '.pgbtn {display: none;}';
    }


    // 快捷回到顶部（右键左右两侧空白处）
    function backToTop() {
        document.body.oncontextmenu = function(event){
            if (event.target == this) {
                event.preventDefault();
                window.scrollTo(0,0)
            }
        }
    }


    // 收起帖子预览（左键左右两侧空白处）
    function collapsedNowPost() {
        document.body.onclick = function(event){
            if (event.target == this) {
                document.querySelectorAll('[id^="threadPreviewTR_"] .closeprev').forEach(function (el) {
                    if (!el.parentElement.querySelector('[name="message"]') || el.parentElement.querySelector('[name="message"]').value === '' && !document.getElementById('fwin_reply')) { // 避免快速回复过程中误点收起了
                        let parentElement = el.parentElement.parentElement.parentElement.parentElement.parentElement,
                            top = parentElement.offsetTop + parentElement.offsetParent.offsetTop + parentElement.offsetParent.offsetParent.offsetTop; // 元素距离顶部的高度
                        if (top < document.documentElement.scrollTop) window.scrollTo(0,top) // 帖子标题在上面时才会滚动到该帖子处
                        el.click()
                    }
                });
            }
        }
    }


    // 显示在线状态
    function onlineStatus() {
        document.querySelectorAll('[id^="favatar"]').forEach(function(item){ // 遍历所有帖子
            let icon = (item.querySelector('[id^="userinfo"] > .i.y em').textContent === '当前在线') ? '🌝' : '🌚';
            let divStatus = document.createElement('div');
            divStatus.style = 'position: absolute;margin: -8px 0 0 8px;padding: 0 1px 1.2px;background-color: #ffffff;border-radius: 50%;';
            divStatus.textContent = icon;
            let mochu = item.querySelector('.avatar');
            mochu.parentNode.insertBefore(divStatus,mochu);
        })
    }


    // 屏蔽阅读权限 255 的帖子
    function delate255() {
        if (!menu_value('menu_delate255')) return
        if (patt_forum.test(location.pathname) || location.search.indexOf('mod=forumdisplay') > -1){
            document.querySelectorAll('tbody[id^="normalthread_"] .xw1').forEach(function (_this) {
                if (_this.textContent === '255') {
                    _this.parentNode.parentNode.parentNode.hidden = true;
                }
            })
        }
    }


    // 屏蔽投票贴
    function delatePolls() {
        if (!menu_value('menu_delatePolls')) return
        if (patt_forum.test(location.pathname) || location.search.indexOf('mod=forumdisplay') > -1){
            document.querySelectorAll('tbody[id^="normalthread_"] .icn>a>img[alt="投票"]').forEach(function (_this) {
                    _this.parentNode.parentNode.parentNode.parentNode.hidden = true;
            })
        }
    }


    // 自动翻页
    function pageLoading() {
        if (!menu_value('menu_pageLoading')) return
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === 'down') { // 下滑才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + 999) {
                        if (curSite.SiteTypeID === SiteType.FORUM) { // 如果是各版块帖子列表则直接点下一页就行了
                            let autopbn = document.querySelector('#autopbn');
                            if (autopbn && autopbn.textContent === "下一页 »"){ // 如果已经在加载中了，就忽略
                                autopbn.click();
                                let timer = setInterval(function(){ // 在下一页加载完成后
                                    if (document.querySelector('#autopbn').textContent === '下一页 »') {
                                        delate255(); // 屏蔽 255 权限帖子
                                        delatePolls(); // 屏蔽投票贴子
                                        blockUsers('forum'); // 屏蔽用户（黑名单）
                                        blockKeywords(); // 屏蔽关键词（帖子标题）
                                        clearInterval(timer);
                                    }
                                }, 10);
                            }
                        } else {
                            ShowPager.loadMorePage();
                        }
                    }
                }
            });
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


    // 修改自 https://greasyfork.org/scripts/14178 , https://github.com/machsix/Super-preloader
    var ShowPager = {
        getFullHref: function (e) {
            if (e != null && e.nodeType === 1 && e.href && e.href.slice(0,4) === 'http') return e.href;
            return '';
        },
        createDocumentByString: function (e) {
            if (e) {
                if ('HTML' !== document.documentElement.nodeName) return (new DOMParser).parseFromString(e, 'application/xhtml+xml');
                var t;
                try { t = (new DOMParser).parseFromString(e, 'text/html');} catch (e) {}
                if (t) return t;
                if (document.implementation.createHTMLDocument) {
                    t = document.implementation.createHTMLDocument('ADocument');
                } else {
                    try {((t = document.cloneNode(!1)).appendChild(t.importNode(document.documentElement, !1)), t.documentElement.appendChild(t.createElement('head')), t.documentElement.appendChild(t.createElement('body')));} catch (e) {}
                }
                if (t) {
                    var r = document.createRange(),
                        n = r.createContextualFragment(e);
                    r.selectNodeContents(document.body);
                    t.body.appendChild(n);
                    for (var a, o = { TITLE: !0, META: !0, LINK: !0, STYLE: !0, BASE: !0}, i = t.body, s = i.childNodes, c = s.length - 1; c >= 0; c--) o[(a = s[c]).nodeName] && i.removeChild(a);
                    return t;
                }
            } else console.error('没有找到要转成 DOM 的字符串');
        },
        loadMorePage: function () {
            if (curSite.pager) {
                let curPageEle = document.querySelector(curSite.pager.nextLink);
                var url = this.getFullHref(curPageEle);
                if(url === '') return;
                if(curSite.pageUrl === url) return;// 不会重复加载相同的页面
                curSite.pageUrl = url;
                // 读取下一页的数据
                curSite.pager.startFilter && curSite.pager.startFilter();
                GM_xmlhttpRequest({
                    url: url,
                    method: 'GET',
                    timeout: 5000,
                    onload: function (response) {
                        try {
                            var newBody = ShowPager.createDocumentByString(response.responseText);
                            let pageElems = getAllCSS(curSite.pager.pageElement, newBody),
                                toElement = getAllCSS(curSite.pager.HT_insert[0])[0];
                            if (pageElems.length >= 0) {
                                let addTo = "beforeend";
                                if (curSite.pager.HT_insert[1] == 1) addTo = 'beforebegin';
                                // 插入新页面元素
                                pageElems.forEach(function (one) {toElement.insertAdjacentElement(addTo, one);});
                                // 屏蔽用户（黑名单）
                                if (patt_thread.test(location.pathname) || location.search.indexOf('mod=viewthread') > -1) {blockUsers('thread');} else if (location.pathname === '/search.php') {blockUsers('search');}
                                delate255(); // 屏蔽 255 权限帖子
                                delatePolls(); // 屏蔽投票贴子
                                // 替换待替换元素
                                try {
                                    let oriE = getAllCSS(curSite.pager.replaceE),
                                        repE = getAllCSS(curSite.pager.replaceE, newBody);
                                    if (oriE.length === repE.length) {
                                        for (var i = 0; i < oriE.length; i++) {
                                            oriE[i].outerHTML = repE[i].outerHTML;
                                        }
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                });
            }
        },
    };
    function getAllCSS(css, contextNode = document) {
        return [].slice.call(contextNode.querySelectorAll(css));
    }
})();