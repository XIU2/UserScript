// ==UserScript==
// @name         智友邦论坛增强
// @version      1.1.9
// @author       X.I.U
// @description  自动签到、自动回复、自动无缝翻页、回到顶部（右键点击两侧空白处）、清理置顶帖子、简化附件兑换/下载、清理帖子标题〖XXX〗【XXX】文字
// @icon         http://bbs.zhiyoo.net/favicon.ico
// @match        *://bbs.zhiyoo.net/*
// @match        *://www.zhiyoo.net/search.php*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412362
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menu_ALL = [
        ['menu_autoReply', '自动回复', '自动回复', true],
        ['menu_pageLoading', '自动无缝翻页', '自动无缝翻页', true],
        ['menu_backToTop', '回到顶部（右键点击两侧空白处）', '回到顶部', true],
        ['menu_cleanTopPost', '清理置顶帖子', '清理置顶帖子', true],
        ['menu_cleanPostTitle', '清理帖子标题开头〖〗【】文字', '清理帖子标题开头〖〗【】文字', true],
        ['menu_qianDaoRedirectURL', '当前页面设为签到后重定向地址', '已设置当前页面为签到后重定向地址', 'http://bbs.zhiyoo.net/forum.php?mod=forumdisplay&fid=42&filter=author&orderby=dateline']
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
            if (menu_ALL[i][0] == 'menu_qianDaoRedirectURL') {
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){GM_setValue(`${menu_ALL[i][0]}`, location.href);GM_notification({text: `${menu_ALL[i][2]}`, timeout: 3000});})
            } else {
                menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412362/feedback', {active: true,insert: true,setParent: true});});
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


    // 随机回复帖子的内容
    var replyList = [
        "感谢楼主分享的内容！",
        "感谢分享！给你点赞！",
        "感谢分享！论坛因你更精彩！",
        "看看隐藏内容是什么！谢谢！",
        "先下载看看好不好用！",
        "楼主一生平安！好人一生平安！",
        "搞机上智友提问下资源！",
        "马克！智友邦你搞机！",
        "你说的观点我也很支持！",
        "楼主太棒了！我先下为敬！",
        "给楼主点赞，希望继续分享！",
        "感谢智友帮论坛，感谢LZ热心分享！",
        "感谢楼主分享优质内容，希望继续努力！",
        "下载试用一下，如果用着不错就给楼主顶贴！",
        "这么好的东西！感谢楼主分享！感谢智友帮论坛！",
        "希望楼主继续分享更多好用的东西！谢谢！",
        "看到楼主这么努力分享，我只能顶个贴感谢一下了！",
        "好东西，拿走了，临走顶个贴感谢一下楼主！",
        "这就非常给力了！感谢分享！",
        "厉害了！先收藏，再回复！谢谢！"
    ];

    // 帖子数量，避免重复清理帖子列表中帖子标题开头的〖XXX〗【XXX】文字，用于提高效率
    var postNum = 0;

    // 检查是否登陆
    var loginStatus = false;
    if (document.querySelector('.Quater_user.logined')){
        loginStatus = true;
    }

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
                replaceE: 'css;div.pg'
            }
        },
        search: {
            SiteTypeID: 2,
            pager: {
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist > ul',
                HT_insert: ['css;div#threadlist', 2],
                replaceE: 'css;div.pg'
            }
        }
    };

    // 用于脚本内部判断当前 URL 类型
    let SiteType = {
        FORUMDISPLAY: DBSite.forumdisplay.SiteTypeID, // 各板块帖子列表
        SEARCH: DBSite.search.SiteTypeID // 搜索结果列表
    };

    var attachmentHrefTime = 0;
    curSite.pageUrl = ""; // 下一页URL

    var patt_thread = /\/thread-\d+-\d+\-\d+.html/, //      匹配 /thread-XXX-X-X.html 帖子正则表达式
        patt_search = /\/thread-\d+-\d+\-\d+.html/, //      匹配搜索结果列表正则表达式
        patt_posttitle = /^〖.+〗(：)?|^【.+】(：)?/, //    匹配帖子标题中的〖XXX〗【XXX】正则表达式
        patt_attachment_href = /(?<=\\').+(?=\\')/

    if (location.pathname === '/plugin.php'){
        switch(getQueryVariable("id"))
        {
            case 'dsu_paulsign:sign': //                被重定向到签到页面
                qiandao(); //                           自动签到
                break;
            case 'piaobo_attachment': //                兑换附件后的提示页面
                attachmentBack(); //                    立即返回帖子
                break;
            case 'threed_attach:downld': //             附件下载页面
                goPan(); //                             跳转至网盘页
                break;
        }
    }else if(location.pathname === '/forum.php'){
        switch(getQueryVariable("mod"))
        {
            case 'viewthread': //                      浏览帖子内容
                showHide(); //                         先看看是否有隐藏内容，如果已显示则定位到隐藏内容区域，如果没有隐藏内容，则啥都不干
                autoReply(); //                        自动回复（有隐藏内容才会回复），回复过就定位到底部（隐藏内容区域）
                var attachmentHref_Interval = setInterval(attachmentHref,100); // 兑换附件按钮改为直链（不再弹出确认提示框）
                break;
            case 'forumdisplay': //                    浏览帖子列表
                curSite = DBSite.forumdisplay; //      帖子列表页（自动翻页）
                cleanTop(); //                         清理置顶帖子
                cleanPostTitle(); //                   清理帖子列表中帖子标题开头的〖XXX〗【XXX】文字
                pageLoading(); //                      自动无缝翻页
                break;
        }
        backToTop(); // 回到顶部（右键点击两侧空白处）
    }else if(location.pathname === '/search.php'){
        curSite = DBSite.search; //                    搜索结果列表页（自动翻页）
        pageLoading(); //                              自动无缝翻页
    }else if (patt_thread.test(location.pathname)){ // 对于 /thread-XXX-X-X.html 这种帖子页面也和上面一样
        showHide();
        autoReply();
    }


    // 自动签到
    function qiandao(){
        if (loginStatus){
            if(document.getElementById('yl'))
            {
                document.getElementById('yl').click();
                document.querySelector('td.tr3.tac div a').click();
            }
            setTimeout(location.href=menu_value('menu_qianDaoRedirectURL'), 2000); // 跳转到指定URL
        }
    }


    // 自动回复
    function autoReply(){
        if (!menu_value('menu_autoReply')) return
        if (loginStatus){
            // 存在隐藏内容，自动回复
            if (document.getElementsByClassName("showhide").length == 0){
                writeReply();
                // 如果使用了我的 [智友邦美化] 脚本，则定位至底部，反之定位至隐藏内容区域
                if (document.getElementById("fastpostmessage").offsetParent == null){
                    setTimeout(function(){window.scrollTo(0,99999999)}, 1000);
                }else{
                    setTimeout(function(){window.scrollTo(0,document.querySelector('.showhide').offsetTop)}, 1000);
                }
            }
        }
    }


    // 写入自动回复内容
    function writeReply(){
        let textarea = document.getElementById("fastpostmessage");
        if (textarea){
            // 随机写入回复内容
            textarea.value = textarea.value + replyList[Math.floor((Math.random()*replyList.length))] + replyList[Math.floor((Math.random()*replyList.length))];
            //console.log(`${textarea.value}`)
            let fastpostsubmit = document.getElementById("fastpostsubmit");
            if (fastpostsubmit){
                setTimeout(function(){fastpostsubmit.click()}, 200);
            }
        }
    }


    // 定位到隐藏内容区域
    function showHide(){
        if (loginStatus){
            // 如果已显示隐藏内容，则定位到隐藏内容区域
            // 如果没有发现已显示隐藏内容，就不定位了
            if (document.getElementsByClassName("showhide").length > 0){
                // 如果使用了我的 [智友邦美化] 脚本，则定位至底部，反之定位至隐藏内容区域
                if (document.getElementById("fastpostmessage").offsetParent == null){
                    setTimeout(function(){window.scrollTo(0,99999999)}, 1000);
                }else{
                    setTimeout(function(){window.scrollTo(0,document.querySelector('.showhide').offsetTop)}, 1000);
                }
            }
        }
    }


    // 回到顶部（右键点击空白处）
    function backToTop() {
        if (!menu_value('menu_backToTop')) return
        document.getElementById("nv_forum").oncontextmenu = function(event){
            if (event.target==this) {
                event.preventDefault();
                window.scrollTo(0,0)
            }
        }
    }


    // 清理置顶帖子
    function cleanTop(){
        if (!menu_value('menu_cleanTopPost')) return
        let showhide = document.querySelectorAll("a.showhide.y");
        if (showhide.length > 0){
            showhide.forEach(el=>el.click());
        }
    }


    // 兑换附件后立即返回
    function attachmentBack() {
        let attachmentback = document.querySelector('#messagetext p.alert_btnleft a');
        if (attachmentback){
            attachmentback.click();
        }
    }


    // 附件下载页直接跳转至网盘
    function goPan() {
        let gopan = document.querySelector('.threed_panbox .panframe .pan_left p a');
        if (gopan){
            location.href=gopan.href;
        }
    }


    // 兑换附件按钮改为直链（不再弹出确认提示框）
    function attachmentHref() {
        attachmentHrefTime += 1; // 计算该函数执行次数
        let attachmenthref = document.querySelector('.tab_button .button a');
        if (attachmenthref && attachmenthref.href == "javascript:;"){
            let attachmenthref_href = attachmenthref.onclick.toString();
            attachmenthref.href = attachmenthref_href.match(patt_attachment_href)[0];
            attachmenthref.onclick = null;
        }
        if (attachmentHrefTime == 50 || document.getElementsByClassName("showhide").length > 0){ // 当该函数执行超过50次（5秒），或没有隐藏内容时停止定时执行
            clearInterval(attachmentHref_Interval)
        }
    }


    // 清理帖子列表中帖子标题开头的〖XXX〗【XXX】文字
    function cleanPostTitle(){
        if (!menu_value('menu_cleanPostTitle')) return
        let cleanposttitle = document.querySelectorAll("a.s.xst");
        if (cleanposttitle.length > 0){
            for(let num = postNum;num<cleanposttitle.length;num++){
                cleanposttitle[num].innerText = cleanposttitle[num].innerText.replace(patt_posttitle, ``);
                postNum += 1;
            }
        }
    }


    // 自动无缝翻页
    function pageLoading() {
        if (!menu_value('menu_pageLoading')) return
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === 'down') { //           下滑才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    let scrollDelta = 666;
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
                                // 清理帖子列表中帖子标题开头的〖XXX〗【XXX】文字
                                cleanPostTitle();
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


    // 获取GET参数
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
})();
