// ==UserScript==
// @name         3DM论坛增强
// @version      1.0.5
// @author       X.I.U
// @description  自动回复、自动无缝翻页、清理置顶帖子 
// @match        *://bbs.3dmgame.com/*
// @icon         https://bbs.3dmgame.com/favicon.ico
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
// ==/UserScript==

(function() {
    var menu_thread_pageLoading = GM_getValue('xiu2_menu_thread_pageLoading'),
        menu_autoReply = GM_getValue('xiu2_menu_autoReply'),
        menu_cleanTopPost = GM_getValue('xiu2_menu_cleanTopPost');
    var menu_thread_pageLoading_ID, menu_autoReply_ID, menu_cleanTopPost_ID, menu_feedBack_ID;
    if (menu_thread_pageLoading == null){menu_thread_pageLoading = false; GM_setValue('xiu2_menu_thread_pageLoading', menu_thread_pageLoading)};
    if (menu_autoReply == null){menu_autoReply = true; GM_setValue('xiu2_menu_autoReply', menu_autoReply)};
    if (menu_cleanTopPost == null){menu_cleanTopPost = true; GM_setValue('xiu2_menu_cleanTopPost', menu_cleanTopPost)};
    registerMenuCommand();

    // 注册脚本菜单
    function registerMenuCommand() {
        var menu_thread_pageLoading_, menu_autoReply_, menu_cleanTopPost_;
        if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_thread_pageLoading_ID);
            GM_unregisterMenuCommand(menu_autoReply_ID);
            GM_unregisterMenuCommand(menu_cleanTopPost_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_thread_pageLoading = GM_getValue('xiu2_menu_thread_pageLoading');
            menu_autoReply = GM_getValue('xiu2_menu_autoReply');
            menu_cleanTopPost = GM_getValue('xiu2_menu_cleanTopPost');
        }

        if (menu_thread_pageLoading){menu_thread_pageLoading_ = "√";}else{menu_thread_pageLoading_ = "×";}
        if (menu_autoReply){menu_autoReply_ = "√";}else{menu_autoReply_ = "×";}
        if (menu_cleanTopPost){menu_cleanTopPost_ = "√";}else{menu_cleanTopPost_ = "×";}

        menu_autoReply_ID = GM_registerMenuCommand(`[ ${menu_autoReply_} ] 自动回复`, function(){menu_switch(menu_autoReply,'xiu2_menu_autoReply','自动回复')});
        menu_cleanTopPost_ID = GM_registerMenuCommand(`[ ${menu_cleanTopPost_} ] 清理置顶帖子`, function(){menu_switch(menu_cleanTopPost,'xiu2_menu_cleanTopPost','清理置顶帖子')});
        menu_thread_pageLoading_ID = GM_registerMenuCommand(`[ ${menu_thread_pageLoading_} ] 帖子内自动翻页`, function(){menu_switch(menu_thread_pageLoading,'xiu2_menu_thread_pageLoading','帖子内自动翻页')});
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
                nextLink: '//div[@id="pgt"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div#postlist > div[id^="post_"]',
                HT_insert: ['css;div#postlist', 2],
                replaceE: '//div[@class="pg"] | //div[@class="pgbtn"]',
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
        }
    };

    // 用于脚本内部判断当前 URL 类型
    let SiteType = {
        FORUM: DBSite.forum.SiteTypeID,   // 各板块帖子列表
        THREAD: DBSite.thread.SiteTypeID, // 帖子内
        GUIDE: DBSite.guide.SiteTypeID    // 导读帖子列表
    };

    // 下一页URL
    curSite.pageUrl = "";

    // URL 匹配正则表达式
    var patt_thread = /\/thread-\d+-\d+\-\d+.html/,
        patt_thread_2 = /mod\=viewthread/,
        patt_forum = /\/forum-\d+-\d+\.html/,
        patt_forum_2 = /mod\=forumdisplay/,
        patt_guide = /mod\=guide\&view\=(hot|digest)/,
        patt_reply = /mod\=post&action\=reply/,
        patt_reply_2 = /extra\=page\%3D1&page\=/

    // URL 判断
    if (patt_thread.test(location.pathname) || patt_thread_2.test(location.search)){
        // 帖子内
        if(menu_thread_pageLoading)curSite = DBSite.thread;
        if(menu_autoReply)autoReply();        // 如果有隐藏内容，则自动回复
        pageLoading();                        // 自动翻页
    }else if (patt_forum.test(location.pathname) || patt_forum_2.test(location.search)){
        // 各板块帖子列表
        curSite = DBSite.forum;
        if(menu_cleanTopPost)cleanTopPost();  // 清理置顶帖子
        pageLoading();                        // 自动翻页
    }else if (patt_guide.test(location.search)){
        // 导读帖子列表
        curSite = DBSite.guide;
        pageLoading();                        // 自动翻页
    }


    // 判断是否登陆
    function checkLogin(){
        var checklogin = document.querySelectorAll('.wp.h_menu p a');
        if (checklogin){
            for (var value of checklogin) {
                if (value.innerHTML == "退出"){
                    loginStatus = true;
                }
            }
        }
    }


    // 自动翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === "down") { // 下滑才准备翻页
                    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    let scrollDelta = 666;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                        if (curSite.SiteTypeID === SiteType.FORUM) { // 如果是各版块帖子列表则直接点下一页就行了
                            var autopbn = document.querySelector('#autopbn');
                            if (autopbn && autopbn.innerText == "下一页 »"){ // 如果已经在加载中了，就忽略
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


    // 自动回复
    function autoReply(){
        if (loginStatus){
            // 存在隐藏内容，则自动回复
            var autoreply = document.querySelector('.locked a');
            if (autoreply){
                writeReply();
                setTimeout(`window.scrollTo(0,0)`, 1000);
            }
        }

    }


    // 写入自动回复内容
    function writeReply(){
        var textarea = document.getElementById("fastpostmessage");
        if (textarea){
            textarea.value = textarea.value + replyList[Math.floor((Math.random()*replyList.length))] + replyList[Math.floor((Math.random()*replyList.length))];
            var fastpostsubmit = document.getElementById("fastpostsubmit");
            if (fastpostsubmit){
                fastpostsubmit.click();
            }
        }
    }


    // 清理置顶帖子
    function cleanTopPost(){
        var showhide = document.querySelectorAll("a.showhide.y");
        if (showhide.length > 0){
            showhide.forEach(el=>el.click());
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