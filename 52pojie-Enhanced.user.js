// ==UserScript==
// @name         吾爱破解论坛增强 - 自动签到、翻页
// @version      1.2.8
// @author       X.I.U
// @description  自动签到、自动无缝翻页、屏蔽导读悬赏贴（最新发表页）
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
    var menu_ALL = [
        ['menu_autoClockIn', '自动签到', '自动签到', true],
        ['menu_pageLoading', '自动无缝翻页', '自动无缝翻页', true],
        ['menu_thread_pageLoading', '帖子内自动无缝翻页', '帖子内自动无缝翻页', true],
        ['menu_delateReward', '屏蔽导读悬赏贴（最新发表）', '屏蔽导读悬赏贴', true]
    ], menu_ID = [];
    for (let i=0;i<menu_ALL.length;i++) { // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
    }
    registerMenuCommand();

    // 注册脚本菜单
    function registerMenuCommand() {
        if (menu_ID.length > menu_ALL.length) { // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
            for (let i=0;i<menu_ID.length;i++) {
                GM_unregisterMenuCommand(menu_ID[i]);
            }
        }
        for (let i=0;i<menu_ALL.length;i++) { // 循环注册脚本菜单
            menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
            menu_ID[i] = GM_registerMenuCommand(`[ ${menu_ALL[i][3]?'√':'×'} ] ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412680/feedback', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true') {
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, title: '吾爱破解论坛增强', timeout: 3000});
        } else {
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（刷新网页后生效）`, title: '吾爱破解论坛增强', timeout: 3000});
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

    var ShowPager;
    showPager();
    // 默认 ID 为 0
    var curSite = {SiteTypeID: 0};

    // 自动翻页规则
    // type：1 = 脚本实现自动无缝翻页，2 = 网站自带了自动无缝翻页功能，只需要点击下一页按钮即可，这时 nextText 为按钮文本，避免一瞬间加载太多次下一页
    // HT_insert：1 = 插入元素前面；2 = 插入元素中的最后一个子元素后面
    // scrollDelta：数值越大，滚动条触发点越靠上（越早开始翻页）
    let DBSite = {
        forum: {
            SiteTypeID: 1,
            pager: {
                type: 2,
                nextLink: '#autopbn',
                nextText: '下一页 »',
                scrollDelta: 766
            }
        },
        thread: {
            SiteTypeID: 2,
            pager: {
                type: 1,
                nextLink: '//div[@id="pgt"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div#postlist > div[id^="post_"]',
                HT_insert: ['css;div#postlist', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 766
            }
        },
        guide: {
            SiteTypeID: 3,
            pager: {
                type: 1,
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
                type: 1,
                nextLink: '//div[@class="pg"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div#ct div.bm_c table > tbody',
                HT_insert: ['css;div#ct div.bm_c table', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 899
            }
        },
        favorite: {
            SiteTypeID: 5,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;ul#favorite_ul > li',
                HT_insert: ['css;ul#favorite_ul', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 899
            }
        },
        search: {
            SiteTypeID: 6,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist > ul',
                HT_insert: ['css;div#threadlist', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 766
            }
        }
    };

    // URL 匹配正则表达式
    let patt_thread = /\/thread-\d+-\d+\-\d+.html/,
        patt_forum = /\/forum-\d+-\d+\.html/,
        patt_guide = /mod\=guide\&view\=(hot|digest|new|newthread|my|tech|help)/

    // URL 判断
    if (patt_thread.test(location.pathname) || location.search.indexOf('mod=viewthread') > -1) {
        if (menu_value('menu_thread_pageLoading')) {
            curSite = DBSite.thread; //      帖子内
            hidePgbtn(); //                  隐藏帖子内的 [下一页] 按钮
        }
    } else if (patt_forum.test(location.pathname) || location.search.indexOf('mod=forumdisplay') > -1) {
        curSite = DBSite.forum; //           各板块帖子列表
    } else if (patt_guide.test(location.search)) {
        curSite = DBSite.guide; //           导读帖子列表
        delateReward(); //                   屏蔽导读悬赏贴（最新发表）
    } else if (location.search.indexOf('mod=collection') > -1) {
        curSite = DBSite.collection; //      淘贴列表
    } else if (location.search.indexOf('do=favorite') > -1) {
        curSite = DBSite.favorite; //        收藏列表
    } else if (location.pathname === '/search.php') {
        curSite = DBSite.search; //          搜索结果列表
    }
    curSite.pageUrl = ""; // 下一页URL

    qianDao(); // 自动签到
    pageLoading(); // 自动翻页


    // 自动翻页
    function pageLoading() {
        if (!menu_value('menu_pageLoading')) return
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
                            if (autopbn && autopbn.innerText == curSite.pager.nextText) { // 如果正在加载，就不再点击
                                autopbn.click();
                            }
                        }
                    }
                }
            });
        }
    }


    // 自动签到（后台）
    function qianDao() {
        if (!menu_value('menu_autoClockIn')) return
        let qiandao = document.querySelector('#um a[href="home.php?mod=task&do=apply&id=2"]');
        if (qiandao) {
            GM_xmlhttpRequest({
                url: qiandao.href,
                method: "GET",
                timeout: 5000,
                onload: function (response) {
                    let html = ShowPager.createDocumentByString(response.responseText);
                    html = html.querySelector('#messagetext p')
                    if (html && html.innerText.indexOf("任务已完成") > -1) {
                        qiandao.querySelector('.qq_bind').setAttribute('src','https://www.52pojie.cn/static/image/common/wbs.png') // 修改 [打卡签到] 图标为 [签到完毕]
                        qiandao.href = "#" // 修改 URL 为 #
                    } else {
                        GM_notification({text: '自动签到失败！请联系作者解决！', title: '吾爱破解论坛增强', timeout: 3000});
                    }
                }
            });
        }
    }


    //屏蔽悬赏贴（导读-最新发表）
    function delateReward() {
        if (!menu_value('menu_delateReward')) return
        if (location.search.indexOf('mod=guide&view=newthread') > -1) {
            let tbody = document.querySelectorAll('#threadlist tbody[id^="normalthread"]');
            Array.from(tbody).forEach(function (_this) {
                if (_this.querySelector('img[alt="悬赏"]')) {
                    _this.remove();
                }
            })
        }

        if (document.body.scrollHeight < window.innerHeight) {
            // 如果屏蔽悬赏贴后，剩余帖子列表太少会没有滚动条，无法滚动页面触发自动翻页事件，需要手动触发
            ShowPager.loadMorePage();
        }
    }


    // 隐藏帖子内的 [下一页] 按钮
    function hidePgbtn() {
        let style_hidePgbtn = document.createElement('style');
        style_hidePgbtn.innerHTML = `.pgbtn {display: none;}`;
        document.head.appendChild(style_hidePgbtn);
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


    // 自动无缝翻页，修改自 https://greasyfork.org/scripts/14178
    function showPager() {
        ShowPager = {
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
                                    //删除悬赏贴
                                    delateReward();
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
    }


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