// ==UserScript==
// @name         自动无缝翻页
// @version      1.1.2
// @author       X.I.U
// @description  自动无缝翻页，目前支持：423Down、Apphot(原烈火汉化)、小众软件
// @match        *://www.423down.com/*
// @exclude      *://www.423down.com/*.html
// @match        *://apphot.cc/*
// @exclude      *://apphot.cc/*.html
// @match        *://www.appinn.com/
// @match        *://www.appinn.com/*/*/
// @match        *://www.appinn.com/?s=*
// @icon         https://github.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    // 注册脚本菜单
    GM_registerMenuCommand('反馈 & 申请添加支持', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});

    // 默认 ID 为 0
    var curSite = {SiteTypeID: 0};

    // 自动翻页规则
    let DBSite = {
        postslist_423down: {
            SiteTypeID: 1,
            pager: {
                nextLink: '//div[@class="paging"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div.content-wrap ul.excerpt > li',
                HT_insert: ['css;div.content-wrap ul.excerpt', 2],
                replaceE: 'css;div.paging',
                scrollDelta: 1500
            }
        },
        postslist_apphot: {
            SiteTypeID: 2,
            pager: {
                nextLink: '//div[@class="pagination"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div.content > article.excerpt',
                HT_insert: ['css;div.pagination', 1],
                replaceE: 'css;div.pagination',
                scrollDelta: 1500
            }
        },
        postslist_appinn: {
            SiteTypeID: 3,
            pager: {
                nextLink: '//a[@class="next page-numbers"][@href]',
                pageElement: 'css;section#latest-posts > article',
                HT_insert: ['css;nav.navigation.pagination', 1],
                replaceE: 'css;div.nav-links',
                scrollDelta: 1500
            }
        }
    };

    // 用于脚本内部判断当前 URL 类型
    let SiteType = {
        POSTSLIST_423DOWN: DBSite.postslist_423down.SiteTypeID,
        POSTSLIST_APPHOT: DBSite.postslist_apphot.SiteTypeID,
        POSTSLIST_APPINN: DBSite.postslist_appinn.SiteTypeID
    };

    switch (location.host) {
        case "www.423down.com":
            curSite = DBSite.postslist_423down;
            break;
        case "apphot.cc":
            curSite = DBSite.postslist_apphot;
            break;
        case "www.appinn.com":
            curSite = DBSite.postslist_appinn;
            break;
    }
    curSite.pageUrl = ""; // 下一页URL
    pageLoading(); // 自动无缝翻页


    // 自动无缝翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === "down") { // 下滑才准备翻页
                    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    console.log(document.documentElement.scrollHeight)
                    let scrollDelta = curSite.pager.scrollDelta;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                        ShowPager.loadMorePage();
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