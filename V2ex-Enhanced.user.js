// ==UserScript==
// @name         V2EX 增强
// @version      1.0.9
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
// ==/UserScript==

(function() {
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
            menu_ID[i] = GM_registerMenuCommand(`[ ${menu_ALL[i][3]?'√':'×'} ] ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/424246/feedback', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3000});
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3000});
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
    // HT_insert：1 = 插入该元素本身的前面；2 = 插入该元素当中，第一个子元素前面；3 = 插入该元素当中，最后一个子元素后面；4 = 插入该元素本身的后面；
    // scrollDelta：数值越大，滚动条触发点越靠上（越早开始翻页），一般是访问网页速度越慢，该值就需要越大
    // function：before = 插入前执行函数；after = 插入后执行函数；parameter = 参数
    let DBSite = {
        recent: { // 最近主题页
            SiteTypeID: 1,
            pager: {
                type: 1,
                nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                pageElement: 'css;.cell.item',
                HT_insert: ['//div[@id="Main"]//div[@class="box"]//div[@class="cell"][last()]', 1],
                replaceE: 'css;#Main > .box > .cell[style]:not(.item) > table',
                scrollDelta: 1000
            },
            function: {
                after: linksBlank,
                parameter: '#Main a.topic-link:not([target])'
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
                scrollDelta: 1000
            },
            function: {
                after: linksBlank,
                parameter: '#Main a[href^="/t/"]:not([target])'
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
                scrollDelta: 1000
            },
            function: {
                after: linksBlank,
                parameter: '#Main a[href^="/t/"]:not([target])'
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
                scrollDelta: 1000
            },
            function: {
                after: linksBlank,
                parameter: '#Main a.topic-link:not([target])'
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
                scrollDelta: 1000
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
                scrollDelta: 1000
            }
        },
        balance: { // 账户余额页
            SiteTypeID: 7,
            pager: {
                type: 1,
                nextLink: '//div[@id="Main"]//div[@class="cell"][last()]//a[@class="page_current"]/following-sibling::a[1][@href]',
                pageElement: '//div[@id="Main"]//div[@class="cell"][last()]/preceding-sibling::div[1]//tr[position()>1]',
                HT_insert: ['//div[@id="Main"]//div[@class="cell"][last()]/preceding-sibling::div[1]//tr[last()]', 4],
                replaceE: 'css;#Main > .box > .cell[style] > table',
                scrollDelta: 700
            }
        }
    };


    switch (location.pathname) {
        case "/": //              首页
            linksBlank('#Main a.topic-link:not([target])');
            addChangesLink();
            break;
        case "/recent": //        最近主题页
            curSite = DBSite.recent;
            linksBlank('#Main a.topic-link:not([target])');
            break;
        case "/notifications": // 提醒消息页
            curSite = DBSite.notifications;
            linksBlank('#Main a[href^="/t/"]:not([target])');
            break;
        case "/balance": //       账户余额页
            curSite = DBSite.balance;
            break;
        default:
            if (location.pathname.indexOf('/go/') > -1) { // 分类主题页
                curSite = DBSite.go;
                linksBlank('#Main a.topic-link:not([target])');
            } else if (location.pathname.indexOf('/t/') > -1) { // 帖子内容页
                if(menu_value('menu_pageLoading_reply'))curSite = DBSite.reply_positive; // 帖子内自动无缝翻页
                if(menu_value('menu_quickReply'))quickReply(); // 快速回复（双击左右两侧空白处）
                linksBlank('#Main .box .topic_content a:not([href^="/member"]):not([target])');
            } else if (location.pathname.indexOf('/replies') > -1) { // 用户回复页
                curSite = DBSite.replies;
                linksBlank('#Main a[href^="/t/"]:not([target])');
            }
    }

    curSite.pageUrl = ""; // 下一页URL
    if(menu_value('menu_fish'))fish(); // 标签页伪装为 Github（摸鱼）
    if(menu_value('menu_autoClockIn'))setTimeout(qianDao, 1000); // 自动签到（后台），延迟 1 秒执行是为了兼容 [V2ex Plus] 扩展
    if(menu_value('menu_pageLoading'))pageLoading(); // 自动翻页（无缝）
    if(menu_value('menu_backToTop'))backToTop(); // 回到顶部（右键点击左右两侧空白处）
    if(menu_value('menu_linksToImgs'))linksToImgs(); // 链接转图片


    // 自动签到（后台）
    function qianDao() {
        let timeNow = new Date().getUTCFullYear() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCDate() // 当前 UTC-0 时间（V2EX 按这个时间的）
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
            } else { //                                                  新旧签到时间一致
                console.info('[V2EX 增强] 已经签过到了。')
            }
        }
    }


    // 后台签到
    function qianDao_(qiandao, timeNow) {
        let url = (location.origin + "/mission/daily/redeem?" + RegExp("once\\=(\\d+)").exec(document.querySelector('div#Top .tools').innerHTML)[0]);
        GM_xmlhttpRequest({
            url: url,
            method: "GET",
            timeout: 5000,
            onload: function (response) {
                let html = ShowPager.createDocumentByString(response.responseText);
                if (html.querySelector('li.fa.fa-ok-sign')) {
                    html = html.getElementById('Main').innerText.match(/已连续登录 (\d+?) 天/)[0];
                    GM_setValue('menu_clockInTime', timeNow); // 写入签到时间以供后续比较
                    console.info('[V2EX 增强] 自动签到完成！')
                    if (qiandao) {
                        qiandao.innerText = `自动签到完成！${html}`;
                        qiandao.href = '#';
                    }
                } else {
                    GM_notification({text: '自动签到失败！请联系作者解决！', timeout: 4000, onclick() {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/424246/feedback', {active: true,insert: true,setParent: true});}});
                    console.warn('[V2EX 增强] 自动签到失败！请联系作者解决！')
                    if (qiandao) qiandao.innerText = '自动签到失败！请尝试手动签到！';
                }
            }
        });
    }


    // 后台获取签到状态（并判断是否需要签到）
    function qianDaoStatus_(timeNow) {
        GM_xmlhttpRequest({
            url: 'https://www.v2ex.com/mission/daily',
            method: "GET",
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
        document.getElementById("Wrapper").oncontextmenu = document.querySelector("#Wrapper > .content").oncontextmenu = function(event){
            if (event.target==this) {
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
        document.getElementById("Wrapper").ondblclick = document.querySelector("#Wrapper > .content").ondblclick = function(event){
            if (event.target==this) {
                if (document.querySelector('.box.reply-box-sticky')) {
                    document.getElementById('undock-button').click();
                }else{
                    let _top = document.body.scrollTop + document.documentElement.scrollTop;
                    document.getElementById('reply_content').focus();
                    window.scrollTo(0,_top);console.log(_top);
                }
            }
        }
        //document.querySelector('div.topic_buttons').insertAdjacentHTML('beforeend', '<a href="javascript:void(0);" id="reply_233" class="tb">快速回复</a>');
        /*document.getElementById('reply_233').onclick = function () {
            if (document.querySelector('.box.reply-box-sticky')) {
                document.getElementById('undock-button').click();
            }else{
                let _top = document.body.scrollTop + document.documentElement.scrollTop;
                document.getElementById('reply_content').focus();
                window.scrollTo(0,_top);console.log(_top);
            }
        }*/
    }


    // 新标签页打开链接
    function linksBlank(css) {
        if (!menu_value('menu_linksBlank')) return
        let links = document.querySelectorAll(css);if (!links) return
        links.forEach(function (_this) {
            _this.target = '_blank'
        });
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
                if (direction === "down") { // 下滑才准备翻页
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