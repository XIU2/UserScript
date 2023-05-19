// ==UserScript==
// @name         吾爱破解论坛增强 - 自动签到、翻页
// @version      1.3.6
// @author       X.I.U
// @description  自动签到、自动无缝翻页、屏蔽导读悬赏贴（最新发表页）
// @match        *://www.52pojie.cn/*
// @icon         data:image/png;base64,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
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
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
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
            menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412680/feedback', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true') {
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, title: '吾爱破解论坛增强', timeout: 3000, onclick: function(){location.reload();}});
        } else {
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, title: '吾爱破解论坛增强', timeout: 3000, onclick: function(){location.reload();}});
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
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#postlist > div[id^="post_"]',
                HT_insert: ['css;div#postlist', 2],
                replaceE: 'css;#ct > .pgs',
                scrollDelta: 766
            }
        },
        search: {
            SiteTypeID: 3,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist > ul',
                HT_insert: ['css;div#threadlist', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 766
            }
        },
        guide: {
            SiteTypeID: 4,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist div.bm_c table > tbody',
                HT_insert: ['css;div#threadlist div.bm_c table', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 766
            }
        },
        youspace: {
            SiteTypeID: 5,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;tbody > tr:not(.th)',
                HT_insert: ['css;tbody', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 1000
            }
        },
        collection: {
            SiteTypeID: 6,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#ct div.bm_c table > tbody',
                HT_insert: ['css;div#ct div.bm_c table', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 899
            }
        },
        favorite: {
            SiteTypeID: 7,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;ul#favorite_ul > li',
                HT_insert: ['css;ul#favorite_ul', 2],
                replaceE: 'css;div.pg',
                scrollDelta: 899
            }
        }
    };

    // URL 匹配正则表达式
    let patt_thread = /\/thread-\d+-\d+\-\d+.html/,
        patt_forum = /\/forum-\d+-\d+\.html/

    // URL 判断
    if (patt_thread.test(location.pathname) || location.search.indexOf('mod=viewthread') > -1) {
        if (menu_value('menu_thread_pageLoading')) {
            curSite = DBSite.thread; //      帖子内
            hidePgbtn(); //                  隐藏帖子内的 [下一页] 按钮
        }
    } else if (patt_forum.test(location.pathname) || location.search.indexOf('mod=forumdisplay') > -1) {
        curSite = DBSite.forum; //           各板块帖子列表
    } else if (location.search.indexOf('mod=guide') > -1) {
        curSite = DBSite.guide; //           导读帖子列表
        delateReward(); //                   屏蔽导读悬赏贴（最新发表）
    } else if (location.search.indexOf('mod=collection') > -1) {
        curSite = DBSite.collection; //      淘贴列表
    } else if (location.search.indexOf('do=favorite') > -1) {
        curSite = DBSite.favorite; //        收藏列表
    } else if (location.pathname === '/search.php') {
        curSite = DBSite.search; //          搜索结果列表
    } else if(location.search.indexOf('mod=space') > -1 && location.search.indexOf('&view=me') > -1) { // 别人的主题/回复
        curSite = DBSite.youspace;
    }
    curSite.pageUrl = ''; // 下一页URL

    qianDao(); // 自动签到
    pageLoading(); // 自动翻页


    // 自动签到（后台）
    function qianDao() {
        if (!menu_value('menu_autoClockIn')) return
        if (location.pathname === '/home.php' && location.search.indexOf('mod=task') > -1) {return;}
        let qiandao = document.querySelector('#um a[href^="home.php?mod=task&do=apply&id=2"]');
        if (qiandao) {
            let iframe = document.createElement('iframe'); // XHR 方式无法签到，改用 iframe 框架打开签到网页
            document.lastElementChild.appendChild(iframe);
            iframe.style = 'display: none;';
            iframe.src = qiandao.href;
            qiandao.querySelector('.qq_bind').src = 'https://www.52pojie.cn/static/image/common/wbs.png'; // 修改 [打卡签到] 图标为 [签到完毕] 图标
            qiandao.href = 'javascript:void(0);'
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
        document.lastChild.appendChild(document.createElement('style')).textContent = '.pgbtn {display: none;}';
    }


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
                            if (autopbn && autopbn.textContent == curSite.pager.nextText) { // 如果正在加载，就不再点击
                                autopbn.click();
                            }
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
    function showPager() {
        ShowPager = {
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