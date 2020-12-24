// ==UserScript==
// @name         吾爱破解论坛增强 - 自动签到、翻页
// @version      1.1.7
// @author       X.I.U
// @description  自动签到、自动无缝翻页（全站）
// @match        *://www.52pojie.cn/*
// @icon         https://www.52pojie.cn/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412680
// ==/UserScript==

(function() {
    var menu_thread_pageLoading = GM_getValue('xiu2_menu_thread_pageLoading');
    var menu_thread_pageLoading_ID, menu_feedBack_ID;
    if (menu_thread_pageLoading == null){menu_thread_pageLoading = false; GM_setValue('xiu2_menu_thread_pageLoading', menu_thread_pageLoading)};
    registerMenuCommand();

    //屏蔽悬赏帖
    function delateReward(){
        // delateSwitch: 是否开启新帖区屏蔽悬赏帖，true或者false
        var delateSwitch = true;
        if(location.href === "https://www.52pojie.cn/forum.php?mod=guide&view=newthread" && delateSwitch){
            var table = document.querySelector("#threadlist > div.bm_c > table");
            var tbodys = table.getElementsByTagName('tbody');
            var arrs = []
            for (let i=0; i<tbodys.length; i++){
                var by_td = tbodys[i].childNodes[1].children[2].children[0].attributes[0].value;
                if(by_td=="forum-8-1.html"){
                    arrs.push(tbodys[i]);
                }
            }
            for (let i=0; i<arrs.length; i++){
                arrs[i].parentNode.removeChild(arrs[i]);
            }
            console.log("悬赏帖屏蔽成功");
        }
    }
    delateReward();

    // 注册脚本菜单
    function registerMenuCommand() {
        var menu_thread_pageLoading_;
        if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_thread_pageLoading_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_thread_pageLoading = GM_getValue('xiu2_menu_thread_pageLoading');
        }

        if (menu_thread_pageLoading){menu_thread_pageLoading_ = "√";}else{menu_thread_pageLoading_ = "×";}

        menu_thread_pageLoading_ID = GM_registerMenuCommand(`[ ${menu_thread_pageLoading_} ] 帖子内自动翻页`, function(){menu_switch(menu_thread_pageLoading,'xiu2_menu_thread_pageLoading','帖子内自动翻页')});
        menu_feedBack_ID = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status){
            GM_setValue(`${Name}`, false);
            GM_notification(`已关闭 [${Tips}] 功能\n（刷新网页后生效）`, '吾爱破解论坛增强');
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification(`已开启 [${Tips}] 功能\n（刷新网页后生效）`, '吾爱破解论坛增强');
        }
        registerMenuCommand(); // 重新注册脚本菜单
    };

    // 默认 ID 为 0
    var curSite = {SiteTypeID: 0};

    // 自动翻页规则，scrollDelta 数值越大，滚动条触发点越高
    let DBSite = {
        forum: {
            SiteTypeID: 1,
            pager: {
                scrollDelta: 766
            }
        },
        thread: {
            SiteTypeID: 2,
            pager: {
                nextLink: '//div[@id="pgt"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div#postlist > div[id^="post_"]',
                HT_insert: ['css;div#postlist', 2],
                replaceE: '//div[@class="pg"] | //div[@class="pgbtn"]',
                scrollDelta: 766
            }
        },
        guide: {
            SiteTypeID: 3,
            pager: {
                nextLink: '//div[@id="pgt"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div#threadlist div.bm_c table > tbody[id^="normalthread_"]',
                HT_insert: ['css;div#threadlist div.bm_c table', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 766
            }
        },
        collection: {
            SiteTypeID: 4,
            pager: {
                nextLink: '//div[@class="pg"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div#ct div.bm_c table > tbody',
                HT_insert: ['css;div#ct div.bm_c table', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 899
            }
        },
        search: {
            SiteTypeID: 5,
            pager: {
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist > ul',
                HT_insert: ['css;div#threadlist', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 766
            }
        }
    };

    // 用于脚本内部判断当前 URL 类型
    let SiteType = {
        FORUM: DBSite.forum.SiteTypeID,        // 各板块帖子列表
        THREAD: DBSite.thread.SiteTypeID,      // 帖子内
        GUIDE: DBSite.guide.SiteTypeID,        // 导读帖子列表
        COLLECTION: DBSite.collection.SiteTypeID,    // 淘贴列表
        SEARCH: DBSite.search.SiteTypeID  // 搜索结果列表
    };

    // URL 匹配正则表达式
    var patt_thread = /\/thread-\d+-\d+\-\d+.html/,
        patt_thread_2 = /mod\=viewthread/,
        patt_forum = /\/forum-\d+-\d+\.html/,
        patt_forum_2 = /mod\=forumdisplay/,
        patt_guide = /mod\=guide\&view\=(hot|digest|new|newthread|my|tech|help)/,
        patt_collection = /mod\=collection/

    // URL 判断
    if (patt_thread.test(location.pathname) || patt_thread_2.test(location.search)){
        // 帖子内
        if(menu_thread_pageLoading)curSite = DBSite.thread;
    }else if (patt_forum.test(location.pathname) || patt_forum_2.test(location.search)){
        // 各板块帖子列表
        curSite = DBSite.forum;
    }else if (patt_guide.test(location.search)){
        // 导读帖子列表
        curSite = DBSite.guide;
    }else if (patt_collection.test(location.search)){
        // 淘贴列表
        curSite = DBSite.collection;
    }else if(location.pathname === '/search.php'){
        // 搜索结果列表
        curSite = DBSite.search;
    }
    curSite.pageUrl = ""; // 下一页URL


    qianDaoBack();        // 先看看是不是签到跳转页面，如果是则返回
    qianDao();            // 看看有没有签到
    pageLoading();        // 自动翻页


    // 自动翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === "down") { // 下滑才准备翻页
                    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    let scrollDelta = curSite.pager.scrollDelta;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                        if (curSite.SiteTypeID === SiteType.FORUM) { // 如果是原创、精品等版块则直接点下一页就行了
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


    // 自动签到
    function qianDao() {
        var qiandao = document.querySelector('#um p:last-child a:first-child');
        if (qiandao){
            if(qiandao.href === "https://www.52pojie.cn/home.php?mod=task&do=apply&id=2")
            {
                qiandao.click();
            }
        }
    }


    // 签到后立即返回
    function qianDaoBack() {
        if(location.href === "https://www.52pojie.cn/home.php?mod=task&do=draw&id=2"){
            var qiandaoback = document.querySelector('#messagetext p.alert_btnleft a');
            if (qiandaoback){
                setTimeout(function(){qiandaoback.click()}, 500);
            }
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


    // 监听 XMLHttpRequest 事件
    function EventXMLHttpRequest() {
        var _send = window.XMLHttpRequest.prototype.send
        function sendReplacement(data) {
            if(this.onreadystatechange) {
                this._onreadystatechange = this.onreadystatechange;
            }
            this.onreadystatechange = onReadyStateChangeReplacement;
            return _send.apply(this, arguments);
        }
        function onReadyStateChangeReplacement() {
            if(this._onreadystatechange) {
                if (this.readyState==4 && this.status==200)
                {
                    console.log('xxx')
                }
            }
            return this._onreadystatechange.apply(this, arguments);
        }
        window.XMLHttpRequest.prototype.send = sendReplacement;
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
                                //屏蔽悬赏帖
                                delateReward();
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