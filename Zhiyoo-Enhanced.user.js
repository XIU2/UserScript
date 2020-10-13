// ==UserScript==
// @name         智友邦论坛增强
// @version      1.0.5
// @author       X.I.U
// @description  自动签到、自动回复、自动无缝翻页、清理置顶帖子
// @icon         http://bbs.zhiyoo.net/favicon.ico
// @match        *://bbs.zhiyoo.net/*
// @grant        GM_xmlhttpRequest
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412362
// ==/UserScript==

(function() {
    // 签到后跳转的URL
    var qiandao_Redirect_URL = `http://bbs.zhiyoo.net/forum.php?mod=forumdisplay&fid=42&filter=author&orderby=dateline`;

    // 检查是否登陆
    var loginStatus = false;
    checkLogin();

    // 默认 ID 为 0
    var curSite = {SiteTypeID: 0};

    // 自动翻页规则
    let DBSite = {
        forumdisplay: {
            SiteTypeID: 1,
            pager: {
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;table#threadlisttableid > tbody[id^="normalthread_"]',
                HT_insert: ['css;table#threadlisttableid', 2],
                replaceE: 'css;div.pg',
            }
        }
    };

    // 用于脚本内部判断当前 URL 类型
    let SiteType = {
        FORUMDISPLAY: DBSite.forumdisplay.SiteTypeID  // 各板块帖子列表
    };

    var patt_thread = /\/thread-\d+-\d+\-\d+.html/; // 匹配 /thread-XXX-X-X.html 帖子正则表达式

    if (location.pathname === '/plugin.php'){
        switch(getQueryVariable("id"))
        {
            case 'dsu_paulsign:sign':    // 被重定向到签到页面
                qiandao();               // 自动签到
                break;
            case 'piaobo_attachment':    // 兑换附件后的提示页面
                attachmentBack();        // 立即返回帖子
                break;
        }
    }
    else if(location.pathname === '/forum.php'){
        switch(getQueryVariable("mod"))
        {
            case 'viewthread':         // 浏览帖子内容
                showHide();            // 先看看是否有隐藏内容，如果已显示则定位到隐藏内容区域，如果没有隐藏内容，则啥都不干
                autoReply();           // 自动回复（有隐藏内容才会回复），回复过就定位到底部（隐藏内容区域）
                break;
            case 'forumdisplay':       // 浏览帖子列表
                curSite = DBSite.forumdisplay;
                curSite.pageUrl = "";  // 下一页URL
                cleanTop();            // 清理置顶帖子
                pageLoading();         // 自动翻页
                break;
        }
    }
    else if (patt_thread.test(location.pathname)){ // 对于 /thread-XXX-X-X.html 这种帖子页面也和上面一样
        showHide();
        autoReply();
    }


    // 判断是否登陆
    function checkLogin(){
        var checklogin = document.querySelector('.Quater_user.logined');
        if (checklogin){
            loginStatus = true;
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
                        ShowPager.loadMorePage();
                    }
                }
            });
        }
    }


    // 自动签到
    function qiandao(){
        if (loginStatus == true){
            if(document.getElementById("yl"))
            {
                document.querySelector('#yl').click();
                document.querySelector('.tr3.tac div a').click();
            }
            setTimeout(location.href=qiandao_Redirect_URL, 2000); // 跳转到指定URL
        }
    }


    // 自动回复
    function autoReply(){
        if (loginStatus == true){
            // 存在隐藏内容，自动回复
            if (document.getElementsByClassName("locked").length > 0){
                document.querySelector('#saya_fastreply_div div').click();
                setTimeout(`document.getElementById('fastpostsubmit').click()`, 200);
                setTimeout(`window.scrollTo(0,99999999)`, 1000);
            }
        }
    }


    // 定位到隐藏内容区域
    function showHide(){
        if (loginStatus == true){
            // 如果已显示隐藏内容，则定位到隐藏内容区域
            // 如果没有发现已显示隐藏内容，就不定位了
            if (document.getElementsByClassName("showhide").length > 0){
                setTimeout(`window.scrollTo(0,99999999)`, 1000);
                //setTimeout(`location.hash='#footer'`, 1000);
            }
        }
    }


    // 兑换附件后立即返回
    function attachmentBack() {
        var attachmentback = document.querySelector('#messagetext p.alert_btnleft a');
        if (attachmentback){
            attachmentback.click();
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
                //console.log(`${url} ${curSite.pageUrl}`);
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

// 获取GET参数
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}