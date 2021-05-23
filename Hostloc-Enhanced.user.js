// ==UserScript==
// @name         全球主机交流论坛增强
// @version      1.1.5
// @author       X.I.U
// @description  自动签到（访问空间）、屏蔽指定用户（黑名单）、自动无缝翻页、自动显示帖子内隐藏回复、自动隐藏阅读权限 255 的帖子、回到顶部（右键点击两侧空白处）
// @match        *://hostloc.com/*
// @icon         https://www.hostloc.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/414005
// ==/UserScript==

(function() {
    var menu_ALL = [
        ['menu_autoSignIn', '自动签到', '自动签到', true],
        ['menu_reAutoSignIn', '重新签到', '重新签到', ''],
        ['menu_blockUsers', '屏蔽指定用户', '屏蔽指定用户', false],
        ['menu_customBlockUsers', '自定义屏蔽用户', '自定义屏蔽用户', []],
        ['menu_thread_pageLoading', '帖子内自动翻页', '帖子内自动翻页', true],
        ['menu_showhide', '自动显示隐藏回复', '自动显示隐藏回复', true],
        ['menu_delate255', '自动隐藏阅读权限 255 的帖子', '自动隐藏阅读权限 255 的帖子', true],
        ['menu_backToTop', '回到顶部（右键点击两侧空白处）', '回到顶部', true]
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
                menu_ID[i] = GM_registerMenuCommand(`[ ⚑ ] ${menu_ALL[i][1]}`, function(){reAutoSignIn()});
            } else if (menu_ALL[i][0] === 'menu_customBlockUsers') {
                menu_ID[i] = GM_registerMenuCommand(`[ ⚑ ] ${menu_ALL[i][1]}`, function(){customBlockUsers()});
            } else {
                menu_ID[i] = GM_registerMenuCommand(`[ ${menu_ALL[i][3]?'√':'×'} ] ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/414005/feedback', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
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
                nextLink: '//div[@id="pgt"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div#postlist > div[id^="post_"]',
                HT_insert: ['css;div#postlist', 2],
                replaceE: 'css;div.pg',
            }
        },
        guide: {
            SiteTypeID: 3,
            pager: {
                nextLink: '//div[@id="pgt"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div#threadlist div.bm_c table > tbody[id^="normalthread_"]',
                HT_insert: ['css;div#threadlist div.bm_c table', 2],
                replaceE: 'css;div.pg',
            }
        },
        search: {
            SiteTypeID: 4,
            pager: {
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist > ul',
                HT_insert: ['css;div#threadlist', 2],
                replaceE: 'css;div.pg'
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
        patt_forum = /\/forum-\d+-\d+\.html/,
        patt_guide = /mod\=guide\&view\=(hot|digest)/

    // URL 判断
    if (patt_thread.test(location.pathname) || location.search.indexOf('mod=viewthread') > -1) { // 帖子内
        if (menu_value('menu_thread_pageLoading')) {
            curSite = DBSite.thread;
            hidePgbtn(); // 隐藏帖子内的 [下一页] 按钮
        }
        showPosts(); // 自动显示帖子内被隐藏的回复
        blockUsers('thread');
    } else if (patt_forum.test(location.pathname) || location.search.indexOf('mod=forumdisplay') > -1) { // 各板块帖子列表
        curSite = DBSite.forum;
        if (menu_value('menu_delate255')) delate255(); // 自动隐藏阅读权限 255 的帖子
        blockUsers('forum');
     }else if (patt_guide.test(location.search)) { // 导读帖子列表
        curSite = DBSite.guide;
    } else if(location.pathname === '/search.php') { // 搜索结果列表
        curSite = DBSite.search;
        blockUsers('search');
    } else if(location.pathname === '/home.php' && location.search.indexOf('mod=space&do=notice&view=mypost') > -1) { // 消息(帖子/点评/提到)
        blockUsers('notice');
    } else if(location.pathname === '/home.php' && location.search === '?mod=space&do=pm') { // 消息(私人聊天)
        blockUsers('pm');
    }

    curSite.pageUrl = ""; // 下一页URL
    pageLoading(); // 自动翻页
    if(menu_value('menu_backToTop'))backToTop(); //    回到顶部（右键点击左右两侧空白处）
    if(menu_value('menu_autoSignIn'))autoSignIn(); //  自动签到（访问空间 10 次 = 20 积分）


    // 自动签到（访问空间 10 次 = 20 积分）
    function autoSignIn() {
        if (!loginStatus) return
        if (GM_getValue('menu_signingIn')) return
        let timeNow = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate(),
            timeOld = GM_getValue('menu_signInTime');
        if (!timeOld || timeOld != timeNow) { // 是新的一天
            GM_notification({text: '请不要关闭/刷新本页！耐心等待 60 秒~\n在此期间可以在 "其他标签页" 浏览论坛！', timeout: 10000});
            let url_list = [],
                url = 0;
            // 随机生成 12 个空间地址（2 个冗余）
            for(let i = 0;i < 12;i++){url_list[i] = "https://hostloc.com/space-uid-" + Math.floor(Math.random()*(50000-10000+1)+10000) + ".html";}
            // 每 5 秒访问一次（避免触发网站防御机制）
            GM_setValue('menu_signingIn', true);
            let signIn = setInterval(function(){
                GM_xmlhttpRequest({
                    url: url_list[url++],
                    method: "GET",
                    timeout: 4000
                });
                console.log(`[全球主机交流论坛 增强] 金钱 +2 (${url_list[url]})`);
                if (url === 11) { // 次数够了就取消定时循环
                    console.log('[全球主机交流论坛 增强] 签到完成！');
                    GM_notification({text: '签到完成！金钱 +20 ~', timeout: 3500});
                    GM_setValue('menu_signingIn', false);
                    GM_setValue('menu_signInTime', timeNow); //      写入签到时间以供后续比较
                    clearInterval(signIn);
                }
            }, 5000);
        } else { //                                                  新旧签到时间一致
            console.info('[全球主机交流论坛 增强] 已经签过到了。')
        }
    }


    // 重新签到
    function reAutoSignIn() {
        GM_setValue('menu_signingIn', false);
        GM_setValue('menu_signInTime', '1970/1/1');
        location.reload(); // 刷新网页
    }


    // 自定义屏蔽用户
    function customBlockUsers() {
        let nowBlockUsers = '';
        GM_getValue('menu_customBlockUsers').forEach(function(item){nowBlockUsers = nowBlockUsers + '|' + item})
        let newBlockUsers = prompt('编辑 [自定义屏蔽用户]，刷新网页后生效\n（不同用户名之间使用 "|" 分隔，\n（例如：用户A|用户B|用户C，如果只有一个就不需要 "|" 了。', nowBlockUsers.replace('|',''));
        if (newBlockUsers === '') {
            GM_setValue('menu_customBlockUsers', []);
            registerMenuCommand(); // 重新注册脚本菜单
        } else if (newBlockUsers != null) {
            GM_setValue('menu_customBlockUsers', newBlockUsers.split('|'));
            registerMenuCommand(); // 重新注册脚本菜单
        }
    };


    // 屏蔽指定用户
    function blockUsers(type) {
        if (!menu_value('menu_blockUsers')) return
        if (!menu_value('menu_customBlockUsers') || menu_value('menu_customBlockUsers').length < 1) return
        switch(type) {
            case 'thread': // 帖子内
                blockUsers_('[id^="post_"]', 'a[href^="space-uid"]');
                blockUsers_('[id^="comment_"] > div', 'a.xi2.xw1'); // 点评
                break;
            case 'forum': // 各版块帖子列表
                blockUsers_('[id^="normalthread_"]', 'a[href^="space-uid"]');
                break;
            case 'search': // 搜索结果
                blockUsers_('.pbw', 'a[href^="space-uid"]');
                break;
            case 'notice': // 消息
                blockUsers_('dl.cl', '.ntc_body a[href^="space-uid"]');
                break;
            case 'pm': // 私人聊天
                blockUsers_('dl[id^="pmlist_"]', '.ptm.pm_c a[href^="space-uid"]');
                break;
        }

        function blockUsers_(list1, list2) {
            let listItem = document.querySelectorAll(list1);
            if (listItem.length < 1) return
            listItem.forEach(function(item){ // 遍历所有帖子
                menu_value('menu_customBlockUsers').forEach(function(item1){ // 遍历用户黑名单
                    let itemName = item.querySelector(list2); // 寻找用户名
                    if (itemName && itemName.innerText === item1) {
                        console.log(item1);
                        item.remove(); // 删除帖子
                    }
                })
            })
        }
    }


    // 自动翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === "down") { // 下滑才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + 999) {
                        if (curSite.SiteTypeID === SiteType.FORUM) { // 如果是各版块帖子列表则直接点下一页就行了
                            let autopbn = document.querySelector('#autopbn');
                            if (autopbn && autopbn.innerText === "下一页 »"){ // 如果已经在加载中了，就忽略
                                autopbn.click();
                                if (menu_value('menu_delate255')) { // 自动隐藏阅读权限 255 的帖子
                                    let timer = setInterval(function(){
                                        if (document.querySelector('#autopbn').innerText === "下一页 »") {
                                            delate255();
                                            blockUsers('forum');
                                            clearInterval(timer);
                                        }
                                    }, 10);
                                }
                            }
                        }else{
                            ShowPager.loadMorePage();
                        }
                    }
                }
            });
        }
    }


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
        let style_hidePgbtn = document.createElement('style');
        style_hidePgbtn.innerHTML = `.pgbtn {display: none;}`;
        document.head.appendChild(style_hidePgbtn);
    }


    // 回到顶部（右键左右两侧空白处）
    function backToTop() {
        document.body.oncontextmenu = function(event){
            if (event.target==this) {
                event.preventDefault();
                window.scrollTo(0,0)
            }
        }
    }


    // 自动隐藏阅读权限 255 的帖子
    function delate255() {
        if (patt_forum.test(location.pathname) || location.search.indexOf('mod=forumdisplay') > -1){
            let tbody = document.querySelectorAll('tbody[id^="normalthread_"] .common .xw1');
            Array.from(tbody).forEach(function (_this) {
                if (_this.innerText === '255') {
                    _this.parentNode.parentNode.parentNode.remove();
                }
            })
        }
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


    var ShowPager = { // 修改自 https://greasyfork.org/scripts/14178
        getFullHref: function (e) {
            if(e == null) return '';
            "string" != typeof e && (e = e.getAttribute("href"));
            var t = this.getFullHref.a;
            return t || (this.getFullHref.a = t = document.createElement("a")), t.href = e, t.href;
        },
        createDocumentByString: function (e) {
            if (e) {
                if ("HTML" !== document.documentElement.nodeName) return (new DOMParser).parseFromString(e, "application/xhtml+xml");
                var t;
                try {
                    t = (new DOMParser).parseFromString(e, "text/html");
                } catch (e) {
                }
                if (t) return t;
                if (document.implementation.createHTMLDocument) t = document.implementation.createHTMLDocument("ADocument"); else try {
                    (t = document.cloneNode(!1)).appendChild(t.importNode(document.documentElement, !1)),
                        t.documentElement.appendChild(t.createElement("head")), t.documentElement.appendChild(t.createElement("body"));
                } catch (e) {
                }
                if (t) {
                    var r = document.createRange();
                    r.selectNodeContents(document.body);
                    var n = r.createContextualFragment(e);
                    t.body.appendChild(n);
                    for (var a, o = {
                        TITLE: !0,
                        META: !0,
                        LINK: !0,
                        STYLE: !0,
                        BASE: !0
                    }, i = t.body, s = i.childNodes, c = s.length - 1; c >= 0; c--) o[(a = s[c]).nodeName] && i.removeChild(a);
                    return t;
                }
            } else console.error("没有找到要转成DOM的字符串");
        },
        loadMorePage: function () {
            if (curSite.pager) {
                let curPageEle = getElementByXpath(curSite.pager.nextLink);
                var url = this.getFullHref(curPageEle);
                //console.log(`${url} ${curPageEle} ${curSite.pageUrl}`);
                if(url === '') return;
                if(curSite.pageUrl === url) return;// 不会重复加载相同的页面
                curSite.pageUrl = url;
                // 读取下一页的数据
                curSite.pager.startFilter && curSite.pager.startFilter();
                GM_xmlhttpRequest({
                    url: url,
                    method: "GET",
                    timeout: 5000,
                    onload: function (response) {
                        try {
                            var newBody = ShowPager.createDocumentByString(response.responseText);
                            let pageElems = getAllElements(curSite.pager.pageElement, newBody, newBody);
                            let toElement = getAllElements(curSite.pager.HT_insert[0])[0];
                            if (pageElems.length >= 0) {
                                let addTo = "beforeend";
                                if (curSite.pager.HT_insert[1] == 1) addTo = "beforebegin";
                                // 插入新页面元素
                                pageElems.forEach(function (one) {
                                    toElement.insertAdjacentElement(addTo, one);
                                });
                                if (menu_value('menu_blockUsers')) { // 屏蔽指定用户
                                    if (patt_thread.test(location.pathname) || location.search.indexOf('mod=viewthread') > -1) {
                                        blockUsers('thread');
                                    } else if (location.pathname === '/search.php') {
                                        blockUsers('search');
                                    }
                                }
                                // 替换待替换元素
                                try {
                                    let oriE = getAllElements(curSite.pager.replaceE);
                                    let repE = getAllElements(curSite.pager.replaceE, newBody, newBody);
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


    function getElementByXpath(e, t, r) {
        r = r || document, t = t || r;
        try {
            return r.evaluate(e, t, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        } catch (t) {
            return void console.error("无效的xpath");
        }
    }


    function getAllElements(e, t, r, n, o) {
        let getAllElementsByXpath = function(e, t, r) {
            return r = r || document, t = t || r, r.evaluate(e, t, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        }

        var i, s = [];
        if (!e) return s;
        if (r = r || document, n = n || window, o = o || void 0, t = t || r, "string" == typeof e) i = 0 === e.search(/^css;/i) ? function getAllElementsByCSS(e, t) {
            return (t || document).querySelectorAll(e);
        }(e.slice(4), t) : getAllElementsByXpath(e, t, r); else {
            if (!(i = e(r, n, o))) return s;
            if (i.nodeType) return s[0] = i, s;
        }
        return function makeArray(e) {
            var t, r, n, o = [];
            if (e.pop) {
                for (t = 0, r = e.length; t < r; t++) (n = e[t]) && (n.nodeType ? o.push(n) : o = o.concat(makeArray(n)));
                return a()(o);
            }
            if (e.item) {
                for (t = e.length; t;) o[--t] = e[t];
                return o;
            }
            if (e.iterateNext) {
                for (t = e.snapshotLength; t;) o[--t] = e.snapshotItem(t);
                return o;
            }
        }(i);
    }
})();