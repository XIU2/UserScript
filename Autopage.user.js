// ==UserScript==
// @name         自动无缝翻页
// @version      1.2.1
// @author       X.I.U
// @description  自动无缝翻页，目前支持：423Down、Apphot、不死鸟、小众软件、异次元软件、微当下载、FitGirl Repacks、AlphaCoders、PubMed、三国杀论坛、百分浏览器论坛
// @match        *://www.423down.com/*
// @exclude      *://www.423down.com/*.html
// @match        *://apphot.cc/*
// @exclude      *://apphot.cc/*.html
// @match        *://iao.su/*
// @match        *://www.appinn.com/
// @match        *://www.appinn.com/*/*/
// @match        *://www.appinn.com/?s=*
// @match        *://www.iplaysoft.com/*
// @match        *://www.weidown.com/*
// @match        *://fitgirl-repacks.site/*
// @match        *://*.alphacoders.com/*
// @match        *://club.sanguosha.com/*
// @match        *://www.centbrowser.net/*
// @match        *://pubmed.ncbi.nlm.nih.gov/?term=*
// @icon         https://i.loli.net/2021/03/07/rdijeYm83pznxWq.png
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    // 注册脚本菜单
    GM_registerMenuCommand('反馈 & 欢迎申请支持', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});});

    // 默认 ID 为 0
    var curSite = {SiteTypeID: 0};

    // 自动翻页规则
    // type：1 = 脚本实现自动无缝翻页，2 = 网站自带了自动无缝翻页功能，只需要点击下一页按钮即可，这时 nextText 为按钮文本，避免一瞬间加载太多次下一页
    // HT_insert：1 = 插入该元素本身的前面；2 = 插入该元素当中，第一个子元素前面；3 = 插入该元素当中，最后一个子元素后面；4 = 插入该元素本身的后面；
    // scrollDelta：数值越大，滚动条触发点越靠上（越早开始翻页），一般是访问网页速度越慢，该值就需要越大
    // function：before = 插入前执行函数；after = 插入后执行函数；parameter = 参数
    let DBSite = {
        _423down_postslist: {
            SiteTypeID: 1,
            pager: {
                type: 1,
                nextLink: '//div[@class="paging"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div.content-wrap ul.excerpt > li',
                HT_insert: ['css;div.content-wrap ul.excerpt', 3],
                replaceE: 'css;div.paging',
                scrollDelta: 1500
            }
        },
        apphot_postslist: {
            SiteTypeID: 2,
            pager: {
                type: 1,
                nextLink: '//div[@class="pagination"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div.content > article.excerpt',
                HT_insert: ['css;div.pagination', 1],
                replaceE: 'css;div.pagination',
                scrollDelta: 1500
            }
        },
        iao_su_postslist: {
            SiteTypeID: 3,
            pager: {
                type: 1,
                nextLink: '//li[@class="btn btn-primary next"]//a[@href]',
                pageElement: 'css;#index > article, #archive > article',
                HT_insert: ['css;ol.page-navigator', 1],
                replaceE: 'css;ol.page-navigator',
                scrollDelta: 800
            },
            function: {
                before: iao_su_postslist_beforeFunction
            }
        },
        appinn_postslist: {
            SiteTypeID: 4,
            pager: {
                type: 1,
                nextLink: '//a[@class="next page-numbers"][@href]',
                pageElement: 'css;section#latest-posts > article',
                HT_insert: ['css;nav.navigation.pagination', 1],
                replaceE: 'css;div.nav-links',
                scrollDelta: 1500
            }
        },
        iplaysoft_postslist: {
            SiteTypeID: 5,
            pager: {
                type: 1,
                nextLink: '//div[@class="pagenavi"]//a[@title="下一页"][@href]',
                pageElement: 'css;#postlist > div.entry',
                HT_insert: ['css;#postlist > .pagenavi-button', 1],
                replaceE: 'css;.pagenavi-button, .pagenavi',
                scrollDelta: 1200
            },
            function: {
                before: iplaysoft_postslist_beforeFunction
            }
        },
        iplaysoft_postcomments: {
            SiteTypeID: 6,
            pager: {
                type: 2,
                nextLink: '#loadHistoryComments',
                nextText: '展开后面',
                scrollDelta: 1200
            }
        },
        discuz_forum: {
            SiteTypeID: 7,
            pager: {
                type: 2,
                nextLink: '#autopbn',
                nextText: '下一页 »',
                scrollDelta: 1000
            }
        },
        discuz_thread: {
            SiteTypeID: 8,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#postlist > div[id^="post_"]',
                HT_insert: ['css;div#postlist', 3],
                replaceE: 'css;div.pg',
                scrollDelta: 1000
            }
        },
        discuz_search: {
            SiteTypeID: 9,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist > ul',
                HT_insert: ['css;div#threadlist', 3],
                replaceE: 'css;div.pg',
                scrollDelta: 1000
            }
        },
        pubmed_postslist: {
            SiteTypeID: 10,
            pager: {
                type: 2,
                nextLink: 'button.load-button.next-page',
                nextText: 'Show more',
                scrollDelta: 1500
            }
        },
        wall_alphacoders: {
            SiteTypeID: 11,
            pager: {
                type: 1,
                nextLink: '//a[@id="next_page"][@href]',
                pageElement: 'css;.thumb-container-big, .avatar-thumb, .thumb-element',
                HT_insert: ['css;.thumb-container-big:nth-last-child(1), .avatar-thumb:nth-last-child(1), .thumb-element:nth-last-child(1)', 4],
                replaceE: '//div[@class="hidden-xs hidden-sm"]/..',
                scrollDelta: 1000
            }
        },
        art_alphacoders: {
            SiteTypeID: 12,
            pager: {
                type: 1,
                nextLink: '//a[@id="next_page"][@href]',
                pageElement: 'css;.container-masonry > div',
                HT_insert: ['css;.container-masonry', 3],
                replaceE: '//div[@class="hidden-xs hidden-sm"]/..',
                scrollDelta: 1000
            },
            function: {
                before: art_alphacoders_beforeFunction
            }
        },
        fitgirl: {
            SiteTypeID: 13,
            pager: {
                type: 1,
                nextLink: '//a[@class="next page-numbers"][@href]',
                pageElement: 'css;article[id^="post-"]',
                HT_insert: ['css;nav.navigation.paging-navigation', 1],
                replaceE: 'css;nav.navigation.paging-navigation',
                scrollDelta: 2000
            }
        },
        weidown: {
            SiteTypeID: 14,
            pager: {
                type: 1,
                nextLink: '//a[@class="nextpage"][@href]',
                pageElement: 'css;.articleWrapper > .itemArticle, .articleWrapper > .richTextItem.search',
                HT_insert: ['css;.articleWrapper', 3],
                replaceE: 'css;#pageGroup',
                scrollDelta: 1500
            }
        },
        weidown_search: {
            SiteTypeID: 14,
            pager: {
                type: 1,
                nextLink: '//a[@class="nextpage"][@href]',
                pageElement: 'css;.articleListWrapper > .richTextItem.search',
                HT_insert: ['css;#pageGroup', 1],
                replaceE: 'css;#pageGroup',
                scrollDelta: 700
            }
        },
        weidown_special: {
            SiteTypeID: 14,
            pager: {
                type: 1,
                nextLink: '//a[@class="nextpage"][@href]',
                pageElement: 'css;.special > .item',
                HT_insert: ['css;.special', 3],
                replaceE: 'css;#pageGroup',
                scrollDelta: 700
            }
        }
    };


    switch (location.host) {
        case "www.423down.com":
            curSite = DBSite._423down_postslist;
            break;
        case "apphot.cc":
            curSite = DBSite.apphot_postslist;
            break;
        case "iao.su":
            curSite = DBSite.iao_su_postslist;
            break;
        case "www.appinn.com":
            curSite = DBSite.appinn_postslist;
            break;
        case "www.iplaysoft.com":
            if (location.pathname.indexOf(".html") > -1 || location.pathname.indexOf("/p/") > -1) { // 文章内
                curSite = DBSite.iplaysoft_postcomments;
            } else { // 其他页面
                curSite = DBSite.iplaysoft_postslist;
            }
            break;
        case "www.weidown.com":
            if (location.pathname.indexOf("/search/") > -1) {
                curSite = DBSite.weidown_search;
            } else if (location.pathname.indexOf("/special/") > -1) {
                curSite = DBSite.weidown_special;
            } else {
                curSite = DBSite.weidown;
            }
            break;
        case "fitgirl-repacks.site":
            curSite = DBSite.fitgirl;
            break;
        case "art.alphacoders.com":
            curSite = DBSite.art_alphacoders;
            setTimeout(art_alphacoders_beforeFunction_0, 1000);
            break;
        case "wall.alphacoders.com":
        case "avatars.alphacoders.com":
        case "mobile.alphacoders.com":
            curSite = DBSite.wall_alphacoders;
            break;
        case "club.sanguosha.com": //                                           Discuz! 论坛专用
        case "www.centbrowser.net":
            if (location.pathname.indexOf('.html') > -1) { //                   判断是不是静态网页（.html 结尾）
                if (location.pathname.indexOf('forum') > -1) { //               各版块帖子列表
                    curSite = DBSite.discuz_forum;
                } else if (location.pathname.indexOf('thread') > -1) { //       帖子内
                    curSite = DBSite.discuz_thread;
                    hidePgbtn(); //                                             隐藏帖子内的 [下一页] 按钮
                }else if(location.pathname.indexOf('search') > -1) { //         搜索结果
                    curSite = DBSite.discuz_search;
                }
            } else {
                if (location.search.indexOf('mod=forumdisplay') > -1) { //      各版块帖子列表
                    curSite = DBSite.discuz_forum;
                } else if (location.search.indexOf('mod=viewthread') > -1) { // 帖子内
                    curSite = DBSite.discuz_thread;
                    hidePgbtn(); //                                             隐藏帖子内的 [下一页] 按钮
                } else if (location.pathname.indexOf('search') > -1) { //       搜索结果
                    curSite = DBSite.discuz_search;
                }
            }
            break;
        case "pubmed.ncbi.nlm.nih.gov":
            curSite = DBSite.pubmed_postslist;
            break;
    }
    curSite.pageUrl = ""; // 下一页URL
    pageLoading(); // 自动无缝翻页


    // 自动无缝翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0) {
            windowScroll(function (direction, e) {
                if (direction === "down") { // 下滑才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    let scrollDelta = curSite.pager.scrollDelta;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                        if (curSite.pager.type === 1) {
                            ShowPager.loadMorePage();
                        } else {
                            let autopbn = document.querySelector(curSite.pager.nextLink);
                            if (autopbn) { // 如果正在加载，就不再点击
                                if (!curSite.pager.nextText) { // 如果没有指定 nextText 就直接点击
                                    autopbn.click();
                                } else if (autopbn.innerText.indexOf(curSite.pager.nextText) > -1){ // 如果指定了 nextText 就需要判断后再点击（避免已经在加载了，还重复点击）
                                    autopbn.click();
                                }
                            }
                        }
                    }
                }
            });
        }
    }


    // 隐藏帖子内的 [下一页] 按钮
    function hidePgbtn() {
        let style_hidePgbtn = document.createElement('style');
        style_hidePgbtn.innerHTML = `.pgbtn {display: none;}`;
        document.head.appendChild(style_hidePgbtn);
    }


    // iplaysoft 的插入前函数
    function iplaysoft_postslist_beforeFunction(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.querySelector("img.lazyload")
            if (now && !now.getAttribute('src')) {
                now.setAttribute("src",now.getAttribute('data-src'))
                now.setAttribute("srcset",now.getAttribute('data-src'))
                now.setAttribute("class","lazyloaded")
            }
        });
        return pageElems
    }


    // iao.su 的插入前函数
    function iao_su_postslist_beforeFunction(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.getElementsByClassName("post-card")[0]
            if (now) {
                now.getElementsByClassName("blog-background")[0].style.backgroundImage = 'url("' + RegExp("(?<=loadBannerDirect\\(').*(?=', '',)").exec(now.getElementsByTagName("script")[0].innerText)[0]; + '")';
            }
        });
        return pageElems
    }


    // art_alphacoders
    function art_alphacoders_beforeFunction_0() {
        let pageElems1 = document.querySelectorAll(".container-masonry > div")
        document.querySelector(".container-masonry").style.height = "auto"
        pageElems1.forEach(function (one) {
            one.setAttribute("style","float: left");
        });
    }


    // art_alphacoders 的插入前函数
    function art_alphacoders_beforeFunction(pageElems) {
        pageElems.forEach(function (one) {
            one.setAttribute("style","float: left");
        });
        return pageElems
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
                if(curSite.pageUrl === url) return;// 避免重复加载相同的页面
                curSite.pageUrl = url;
                // 读取下一页的数据
                curSite.pager.startFilter && curSite.pager.startFilter();
                GM_xmlhttpRequest({
                    url: url,
                    method: "GET",
                    timeout: 5000,
                    onload: function (response) {
                        try {
                            //console.log(`${response.responseText}`)
                            var newBody = ShowPager.createDocumentByString(response.responseText);
                            let pageElems = getAllElements(curSite.pager.pageElement, newBody, newBody);
                            let toElement = getAllElements(curSite.pager.HT_insert[0])[0];
                            if (pageElems.length >= 0) {
                                // 如果有插入前函数就执行函数
                                if (curSite.function && curSite.function.before) {
                                    if (curSite.function.parameter) { // 如果指定了参数
                                        pageElems = curSite.function.before(curSite.function.parameter);
                                    }else{
                                        pageElems = curSite.function.before(pageElems);
                                    }
                                }
                                // 插入位置
                                let addTo;
                                switch (curSite.pager.HT_insert[1]) {
                                    case 1:
                                        addTo = "beforebegin"
                                        break;
                                    case 2:
                                        addTo = "afterbegin"
                                        break;
                                    case 3:
                                        addTo = "beforeend"
                                        break;
                                    case 4:
                                        addTo = "afterend"
                                        break;
                                }
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
                                // 如果有插入后函数就执行函数
                                if (curSite.function && curSite.function.after) {
                                    if (curSite.function.parameter) { // 如果指定了参数
                                        curSite.function.after(curSite.function.parameter);
                                    }else{
                                        curSite.function.after();
                                    }
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