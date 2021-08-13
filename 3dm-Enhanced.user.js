// ==UserScript==
// @name         3DM论坛增强
// @version      1.1.1
// @author       X.I.U
// @description  自动回复、自动无缝翻页、清理置顶帖子、自动滚动至隐藏内容
// @match        *://bbs.3dmgame.com/*
// @icon         https://www.3dmgame.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412890
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menu_ALL = [
        ['menu_autoReply', '自动回复', '自动回复', true],
        ['menu_cleanTopPost', '清理置顶帖子', '清理置顶帖子', true],
        ['menu_thread_pageLoading', '帖子内自动翻页', '帖子内自动翻页', true],
        ['menu_scrollToShowhide', '自动滚动至隐藏内容', '自动滚动至隐藏内容', true]
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
            menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412890/feedback', {active: true,insert: true,setParent: true});});
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


    // 随机回复帖子的内容
    var replyList = [
        "感谢楼主分享的内容！",
        "感谢分享！给你点赞！",
        "感谢分享！论坛因你更精彩！",
        "看看隐藏内容是什么！谢谢！",
        "先下载看看好不好用！",
        "楼主一生平安！好人一生平安！",
        "你说的观点我也很支持！",
        "楼主太棒了！我先下为敬！",
        "给楼主点赞，希望继续分享！",
        "感谢论坛，感谢LZ热心分享！",
        "感谢楼主分享优质内容，希望继续努力！",
        "下载试用一下，如果用着不错就给楼主顶贴！",
        "这么好的东西！感谢楼主分享！感谢论坛！",
        "希望楼主继续分享更多好用的东西！谢谢！",
        "看到楼主这么努力分享，我只能顶个贴感谢一下了！",
        "好东西，拿走了，临走顶个贴感谢一下楼主！",
        "这就非常给力了！感谢分享！",
        "厉害了！先收藏，再回复！谢谢！"
    ];

    // 检查是否登陆
    var loginStatus = false;
    checkLogin();

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
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#postlist > div[id^="post_"]',
                HT_insert: ['css;div#postlist', 2],
                replaceE: 'css;div.pg'
            }
        },
        search: {
            SiteTypeID: 3,
            pager: {
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist > ul',
                HT_insert: ['css;div#threadlist', 2],
                replaceE: 'css;div.pg'
            }
        },
        guide: {
            SiteTypeID: 4,
            pager: {
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist div.bm_c table > tbody',
                HT_insert: ['css;div#threadlist div.bm_c table', 2],
                replaceE: 'css;div.pg'
            }
        },
        youspace: {
            SiteTypeID: 5,
            pager: {
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;tbody > tr:not(.th)',
                HT_insert: ['css;tbody', 2],
                replaceE: 'css;div.pg'
            }
        }
    };

    // 用于脚本内部判断当前 URL 类型
    let SiteType = {
        FORUM: DBSite.forum.SiteTypeID, //   各板块帖子列表
        THREAD: DBSite.thread.SiteTypeID, // 帖子内
        GUIDE: DBSite.guide.SiteTypeID //    导读帖子列表
    };

    // 下一页URL
    curSite.pageUrl = "";

    // URL 匹配正则表达式
    let patt_thread = /\/thread-\d+-\d+\-\d+.html/,
        patt_forum = /\/forum-\d+-\d+\.html/

    // URL 判断
    if (patt_thread.test(location.pathname) || location.search.indexOf('mod=viewthread') > -1){
        // 帖子内
        hidePgbtn(); //                  隐藏帖子内的 [下一页] 按钮
        if(menu_value('menu_thread_pageLoading'))curSite = DBSite.thread;
        if(menu_value('menu_autoReply'))autoReply(); //       如果有隐藏内容，则自动回复
        if(menu_value('menu_scrollToShowhide'))setTimeout(function(){window.scrollTo(0,document.querySelector('.showhide').offsetTop)}, 500); // 滚动至隐藏内容
    } else if (patt_forum.test(location.pathname) || location.search.indexOf('mod=forumdisplay') > -1){
        // 各板块帖子列表
        curSite = DBSite.forum;
        if(menu_value('menu_cleanTopPost'))cleanTopPost(); // 清理置顶帖子
    } else if (location.search.indexOf('mod=guide') > -1){
        // 导读帖子列表
        curSite = DBSite.guide;
    } else if (location.pathname === '/search.php') {
        // 搜索结果列表
        curSite = DBSite.search;
    } else if(location.search.indexOf('mod=space') > -1 && location.search.indexOf('&view=me') > -1) {
        // 别人的主题/回复
        curSite = DBSite.youspace;
    } else {
        curSite = DBSite.forum;
    }

    pageLoading(); //                       自动翻页


    // 判断是否登陆
    function checkLogin(){
        let checklogin = document.querySelectorAll('.wp.h_menu p a');
        if (checklogin){
            for (let value of checklogin) {
                if (value.textContent == '退出'){
                    loginStatus = true;
                }
            }
        }
    }


    // 自动回复
    function autoReply(){
        if (loginStatus){
            // 存在隐藏内容，则自动回复
            let autoreply = document.querySelector('.locked a');
            if (autoreply){
                writeReply();
                // 滚动至隐藏内容
                if(menu_value('menu_scrollToShowhide')){
                    let showhideTime=setInterval(function(){
                        let showhide=document.querySelector('.showhide')
                        if(showhide){
                            clearInterval(showhideTime)
                            window.scrollTo(0,showhide.offsetTop)
                        }}, 100)
                    }else{
                        setTimeout(function(){window.scrollTo(0,0)}, 1000);
                    }
            }
        }

    }


    // 写入自动回复内容
    function writeReply(){
        let textarea = document.getElementById('fastpostmessage');
        if (textarea){
            textarea.value = textarea.value + replyList[Math.floor((Math.random()*replyList.length))] + replyList[Math.floor((Math.random()*replyList.length))];
            let fastpostsubmit = document.getElementById('fastpostsubmit');
            if (fastpostsubmit){
                fastpostsubmit.click();
            }
        }
    }


    // 清理置顶帖子
    function cleanTopPost(){
        let showhide = document.querySelectorAll('a.showhide.y');
        if (showhide.length > 0){
            showhide.forEach(el=>el.click());
        }
    }


    // 隐藏帖子内的 [下一页] 按钮
    function hidePgbtn() {
        document.lastChild.appendChild(document.createElement('style')).textContent = '.pgbtn {display: none;}';
    }


    // 自动翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === 'down') { // 下滑才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    let scrollDelta = 666;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                        if (curSite.SiteTypeID === SiteType.FORUM) { // 如果是各版块帖子列表则直接点下一页就行了
                            let autopbn = document.querySelector('#autopbn');
                            if (autopbn && autopbn.textContent == '下一页 »'){ // 如果已经在加载中了，就忽略
                                autopbn.click();
                            }
                        }else{
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
            if(e == null) return '';
            'string' != typeof e && (e = e.getAttribute('href'));
            var t = this.getFullHref.a;
            return t || (this.getFullHref.a = t = document.createElement('a')), (t.href = e), t.href;
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
    function getElementByCSS(css, contextNode = document) {
        return contextNode.querySelector(css);
    }
    function getAllElementsByCSS(css, contextNode = document) {
        return [].slice.call(contextNode.querySelectorAll(css));
    }
    function getElementByXpath(xpath, contextNode, doc = document) {
        contextNode = contextNode || doc;
        try {
            const result = doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            // 应该总是返回一个元素节点
            return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
        } catch (err) {
            throw new Error(`Invalid xpath: ${xpath}`);
        }
    }
    function getAllElementsByXpath(xpath, contextNode, doc = document) {
        contextNode = contextNode || doc;
        const result = [];
        try {
            const query = doc.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < query.snapshotLength; i++) {
                const node = query.snapshotItem(i);
                // 如果是 Element 节点
                if (node.nodeType === 1) result.push(node);
            }
        } catch (err) {
            throw new Error(`无效 Xpath: ${xpath}`);
        }
        return result;
    }
    function getAllElements(selector, contextNode = undefined, doc = document, win = window, _cplink = undefined) {
        if (!selector) return [];
        contextNode = contextNode || doc;
        if (typeof selector === 'string') {
            if (selector.search(/^css;/i) === 0) {
                return getAllElementsByCSS(selector.slice(4), contextNode);
            } else {
                return getAllElementsByXpath(selector, contextNode, doc);
            }
        } else {
            const query = selector(doc, win, _cplink);
            if (!Array.isArray(query)) {
                throw new Error('getAllElements 返回错误类型');
            } else {
                return query;
            }
        }
    }
})();