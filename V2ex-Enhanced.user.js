// ==UserScript==
// @name         V2EX 增强
// @version      1.1.6
// @author       X.I.U
// @description  自动签到、链接转图片、自动无缝翻页、回到顶部（右键点击两侧空白处）、快速回复（左键双击两侧空白处）、新标签页打开链接、标签页伪装为 Github（摸鱼）
// @match        *://v2ex.com/*
// @match        *://*.v2ex.com/*
// @icon         https://www.v2ex.com/static/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menu_ALL = [
        ['menu_autoClockIn', '自动签到', '自动签到', true],
        ['menu_linksToImgs', '链接转图片', '链接转图片', true],
        ['menu_pageLoading', '自动无缝翻页', '自动无缝翻页', true],
        ['menu_pageLoading_reply', '帖子内自动翻页', '帖子内自动翻页', false],
        ['menu_backToTop', '回到顶部（右键点击两侧空白处）', '回到顶部', true],
        ['menu_quickReply', '快速回复（左键双击两侧空白处）', '快速回复', true],
        ['menu_linksBlank', '新标签页打开链接', '新标签页打开链接', true],
        ['menu_fish', '标签页伪装为 Github（摸鱼）', '标签页伪装为 Github', false]
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
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/424246/feedback', {active: true,insert: true,setParent: true});});
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


    // 默认 ID 为 0
    var curSite = {SiteTypeID: 0};

    // 自动翻页规则
    let DBSite = {
        recent: { // 最近主题页
            SiteTypeID: 1,
            pager: {
                type: 1,
                nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                pageElement: 'css;.cell.item',
                HT_insert: ['//div[@id="Main"]//div[@class="box"]//div[@class="cell"][last()]', 1],
                replaceE: 'css;#Main > .box > .cell[style]:not(.item) > table',
                scrollDelta: 1500
            }
        },
        notifications: { // 提醒消息页
            SiteTypeID: 2,
            pager: {
                type: 1,
                nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                pageElement: 'css;#notifications > div',
                HT_insert: ['css;#notifications', 3],
                replaceE: 'css;#Main > .box > .cell[style] > table',
                scrollDelta: 1500
            }
        },
        replies: { // 用户回复页
            SiteTypeID: 3,
            pager: {
                type: 1,
                nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                pageElement: '//div[@id="Main"]//div[@class="box"]//div[@class="dock_area"] | //*[@id="Main"]//div[@class="box"]//div[@class="inner"] | //*[@id="Main"]//div[@class="box"]//div[@class="dock_area"][last()]/following-sibling::div[@class="cell"][1]',
                HT_insert: ['//div[@id="Main"]//div[@class="box"]//div[@class="cell"][last()]', 1],
                replaceE: 'css;#Main > .box > .cell[style] > table',
                scrollDelta: 1500
            }
        },
        go: { // 分类主题页
            SiteTypeID: 4,
            pager: {
                type: 1,
                nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                pageElement: 'css;#TopicsNode > div',
                HT_insert: ['css;#TopicsNode', 3],
                replaceE: 'css;#Main > .box > .cell[style] > table',
                scrollDelta: 1500
            }
        },
        reply: { // 帖子内容页
            SiteTypeID: 5,
            pager: {
                type: 1,
                nextLink: '//a[@class="page_current"]/preceding-sibling::a[1][@href]',
                pageElement: 'css;.cell[id^="r_"]',
                HT_insert: ['//div[starts-with(@id, "r_")][last()]/following-sibling::div[@class="cell"][1]', 1],
                replaceE: 'css;#Main > .box > .cell[style] > table',
                scrollDelta: 1500
            }
        },
        reply_positive: { // 帖子内容页（正序）
            SiteTypeID: 6,
            pager: {
                type: 1,
                nextLink: '//a[@class="page_current"]/preceding-sibling::a[1][@href]',
                pageElement: 'css;.cell[id^="r_"]',
                HT_insert: ['//div[starts-with(@id, "r_")][1]', 1],
                replaceE: 'css;#Main > .box > .cell[style] > table',
                scrollDelta: 1500
            }
        },
        balance: { // 账户余额页
            SiteTypeID: 7,
            pager: {
                type: 1,
                nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                pageElement: 'css;#Main .box > div:not(.cell) > table > tbody > tr:not(:first-child)',
                HT_insert: ['css;#Main .box > div:not(.cell) > table > tbody', 3],
                replaceE: 'css;#Main > .box > .cell[style] > table',
                scrollDelta: 1000
            }
        }
    };


    switch (location.pathname) {
        case '/': //              首页
            addChangesLink();
            break;
        case '/recent': //        最近主题页
            curSite = DBSite.recent;
            break;
        case '/notifications': // 提醒消息页
            curSite = DBSite.notifications;
            break;
        case '/balance': //       账户余额页
            curSite = DBSite.balance;
            break;
        default:
            if (location.pathname.indexOf('/go/') > -1) { // 分类主题页
                curSite = DBSite.go;
            } else if (location.pathname.indexOf('/t/') > -1) { // 帖子内容页
                if(menu_value('menu_pageLoading_reply'))curSite = DBSite.reply_positive; // 帖子内自动无缝翻页
                if(menu_value('menu_quickReply'))quickReply(); // 快速回复（双击左右两侧空白处）
            } else if (location.pathname.indexOf('/replies') > -1) { // 用户回复页
                curSite = DBSite.replies;
            }
    }

    curSite.pageUrl = ''; // 下一页URL
    if(menu_value('menu_linksBlank')) linksBlank(); //               新标签页打开链接
    if(menu_value('menu_fish')) fish(); //                           标签页伪装为 Github（摸鱼）
    if(menu_value('menu_autoClockIn')) setTimeout(qianDao, 1000); // 自动签到（后台），延迟 1 秒执行是为了兼容 [V2ex Plus] 扩展
    if(menu_value('menu_pageLoading')) pageLoading(); //             自动翻页（无缝）
    if(menu_value('menu_backToTop')) backToTop(); //                 回到顶部（右键点击左右两侧空白处）
    if(menu_value('menu_linksToImgs')) linksToImgs(); //             链接转图片


    // 自动签到（后台）
    function qianDao() {
        let timeNow = new Date().getUTCFullYear() + '/' + (new Date().getUTCMonth() + 1) + '/' + new Date().getUTCDate() // 当前 UTC-0 时间（V2EX 按这个时间的）
        if (location.pathname == '/') { //                               在首页
            let qiandao = document.querySelector('.box .inner a[href="/mission/daily"]');
            if (qiandao) { //                                            如果找到了签到提示
                qianDao_(qiandao, timeNow); //                           后台签到
            } else if (document.getElementById('gift_v2excellent')) { // 兼容 [V2ex Plus] 扩展
                document.getElementById('gift_v2excellent').click();
                GM_setValue('menu_clockInTime', timeNow); //             写入签到时间以供后续比较
                console.info('[V2EX 增强] 自动签到完成！')
            } else { //                                                  都没有找到，说明已经签过到了
                console.info('[V2EX 增强] 已经签过到了。')
            }
        } else { //                                                      不在首页
            let timeOld = GM_getValue('menu_clockInTime')
            if (!timeOld || timeOld != timeNow) {
                qianDaoStatus_(timeNow) //                               后台获取签到状态（并判断是否需要签到）
            }/* else { //                                                  新旧签到时间一致
                console.info('[V2EX 增强] 已经签过到了。')
            }*/
        }
    }


    // 后台签到
    function qianDao_(qiandao, timeNow) {
        let url = (location.origin + "/mission/daily/redeem?" + RegExp("once\\=(\\d+)").exec(document.querySelector('div#Top .tools, #menu-body').innerHTML)[0]);
        GM_xmlhttpRequest({
            url: url,
            method: 'GET',
            timeout: 5000,
            onload: function (response) {
                let html = ShowPager.createDocumentByString(response.responseText);
                //console.log(html)
                if (html.querySelector('li.fa.fa-ok-sign')) {
                    html = html.getElementById('Main').textContent.match(/已连续登录 (\d+?) 天/)[0];
                    GM_setValue('menu_clockInTime', timeNow); // 写入签到时间以供后续比较
                    console.info('[V2EX 增强] 自动签到完成！')
                    if (qiandao) {
                        qiandao.textContent = `自动签到完成！${html}`;
                        qiandao.href = 'javascript:void(0);';
                    }
                } else {
                    GM_notification({text: '自动签到失败！请联系作者解决！', timeout: 4000, onclick() {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/424246/feedback', {active: true,insert: true,setParent: true});}});
                    console.warn('[V2EX 增强] 自动签到失败！请联系作者解决！')
                    if (qiandao) qiandao.textContent = '自动签到失败！请尝试手动签到！';
                }
            }
        });
    }


    // 后台获取签到状态（并判断是否需要签到）
    function qianDaoStatus_(timeNow) {
        GM_xmlhttpRequest({
            url: 'https://www.v2ex.com/mission/daily',
            method: 'GET',
            timeout: 5000,
            onload: function (response) {
                let html = ShowPager.createDocumentByString(response.responseText);
                if (html.querySelector('input[value^="领取"]')) { //     还没有签到...
                    qianDao_(null, timeNow); //                          后台签到
                } else { //                                              已经签到了...
                    console.info('[V2EX 增强] 已经签过到了。')
                    GM_setValue('menu_clockInTime', timeNow); //         写入签到时间以供后续比较
                }
            }
        });
    }


    // 回到顶部（右键左右两侧空白处）
    function backToTop() {
        document.getElementById('Wrapper').oncontextmenu = document.querySelector('#Wrapper > .content').oncontextmenu = function(event){
            if (event.target == this) {
                event.preventDefault();
                window.scrollTo(0,0)
            }
        }
    }


    // 标签页伪装为 Github（摸鱼）
    function fish() {
        window.document.title = 'GitHub'
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.querySelector("link[rel*='shortcut icon']").href = 'https://github.githubassets.com/favicons/favicon-dark.png'
        } else {
            document.querySelector("link[rel*='shortcut icon']").href = 'https://github.githubassets.com/favicons/favicon.png'
        }
    }


    // 链接转图片，修改自：https://greasyfork.org/scripts/14182
    function linksToImgs() {
        let links = document.links;
        Array.from(links).forEach(function (_this) {
            if (/^https.*\.(?:jpg|jpeg|jpe|bmp|png|gif)/i.test(_this.href) && !(/<img\s/i.test(_this.innerHTML))) {
                _this.innerHTML = `<img src="${_this.href}" style="max-width: 100%!important;" />`;
            }
        });
    }


    // 快速回复（双击左右两侧空白处）
    function quickReply() {
        document.getElementById('Wrapper').ondblclick = document.querySelector('#Wrapper > .content').ondblclick = function(event){
            if (event.target==this) {
                if (document.querySelector('.box.reply-box-sticky')) {
                    document.getElementById('undock-button').click();
                } else {
                    let _top = document.body.scrollTop + document.documentElement.scrollTop;
                    document.getElementById('reply_content').focus();
                    window.scrollTo(0,_top);console.log(_top);
                }
            }
        }
    }


    // 新标签页打开链接
    function linksBlank() {
        if (location.pathname.indexOf('/settings') > -1) return
        document.head.appendChild(document.createElement('base')).target = '_blank'; // 让所有链接默认以新标签页打开
        Array.from(document.links).forEach(function (_this) {
            if (_this.onclick || _this.href.slice(0,4) != 'http' || _this.href.indexOf('#;') > -1 || _this.href.indexOf('night/toggle') > -1 || _this.href.indexOf('/favorite') > -1 || _this.href.indexOf('/?tab=') > -1) {
                _this.target = '_self'
            }
        })
        document.querySelectorAll('form').forEach(function (_this) {
            if (!_this.target) {_this.target = '_self'}
        });

        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.tagName === 'A') {
                        if (target.onclick || target.href.slice(0,4) != 'http' || target.href.indexOf('#;') > -1 || target.href.indexOf('night/toggle') > -1 || target.href.indexOf('/favorite') > -1) {
                            target.target = '_self'
                        }
                    } else {
                        document.querySelectorAll('a').forEach(function (_this) {
                            if (_this.onclick || _this.href.slice(0,4) != 'http' || _this.href.indexOf('#;') > -1 || _this.href.indexOf('night/toggle') > -1 || _this.href.indexOf('/favorite') > -1) {
                                _this.target = '_self'
                            }
                        });
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }


    // 添加全站最近更新主题链接
    function addChangesLink() {
        let links = document.querySelector('#Main .box .inner:last-child');if (!links) return
        links.innerHTML = `<div style="float: left;"><span class="chevron">»</span> &nbsp;<a href="/recent" target="_blank">更多新主题</a></div><div style="text-align: right;"><a href="/changes" target="_blank" style="text-align: right;">全站最近更新主题</a> &nbsp;<span class="chevron">«</span></div>`
    }


    // 自动无缝翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === 'down') { // 下滑才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    //console.log(document.documentElement.scrollHeight)
                    let scrollDelta = curSite.pager.scrollDelta;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                        if (curSite.pager.type === 1) {
                            ShowPager.loadMorePage();
                        }else{
                            let autopbn = document.querySelector(curSite.pager.nextLink);
                            if (autopbn){
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
    var ShowPager = {
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
                console.log(`${url} ${curPageEle} ${curSite.pageUrl}`);
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