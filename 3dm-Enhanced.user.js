// ==UserScript==
// @name         3DM论坛增强
// @version      1.0.2
// @author       X.I.U
// @description  自动回复、自动无缝翻页、清理置顶帖子
// @match        *://bbs.3dmgame.com/*
// @icon         https://bbs.3dmgame.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412890
// ==/UserScript==

(function() {
    // 是否开启帖子内自动翻页功能，true 为开启，false 为关闭。
    var thread_pageLoading = false;

    // 随机回复帖子的内容
    var replyList = [
        "感谢楼主分享！",
        "感谢分享，给你点赞！",
        "感谢分享，论坛因你更精彩！",
        "看看隐藏内容是什么！",
        "下载看看好不好用！",
        "好人一生平安！"
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
        if(thread_pageLoading)curSite = DBSite.thread;
        autoReply();                    // 如果有隐藏内容，则自动回复
        pageLoading();                  // 自动翻页
    }else if (patt_forum.test(location.pathname) || patt_forum_2.test(location.search)){
        // 各板块帖子列表
        curSite = DBSite.forum;
        cleanTop();                     // 清理置顶帖子
        pageLoading();                  // 自动翻页
    }else if (patt_guide.test(location.search)){
        // 导读帖子列表
        curSite = DBSite.guide;
        pageLoading();                  // 自动翻页
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
        if (loginStatus == true){
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
            textarea.value = textarea.value + replyList[Math.floor((Math.random()*replyList.length))];
            var fastpostsubmit = document.getElementById("fastpostsubmit");
            if (fastpostsubmit){
                fastpostsubmit.click();
            }
        }
    }


    // 清理置顶帖子
    function cleanTop(){
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