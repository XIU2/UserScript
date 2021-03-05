// ==UserScript==
// @name         智友邦论坛增强
// @version      1.1.6
// @author       X.I.U
// @description  自动签到、自动回复、自动无缝翻页、清理置顶帖子、简化附件兑换/下载、清理帖子标题〖XXX〗【XXX】文字
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
// ==/UserScript==

(function() {
    var menu_cleanPostTitle = GM_getValue('xiu2_menu_cleanPostTitle'),
        menu_qianDaoRedirectURL = GM_getValue('xiu2_menu_qianDaoRedirectURL');
    var menu_cleanPostTitle_ID, menu_qianDaoRedirectURL_ID, menu_feedBack_ID;
    if (menu_cleanPostTitle == null){menu_cleanPostTitle = true; GM_setValue('xiu2_menu_cleanPostTitle', menu_cleanPostTitle)};
    if (menu_qianDaoRedirectURL == null){menu_qianDaoRedirectURL = `http://bbs.zhiyoo.net/forum.php?mod=forumdisplay&fid=42&filter=author&orderby=dateline`; GM_setValue('xiu2_menu_qianDaoRedirectURL', menu_qianDaoRedirectURL)};
    registerMenuCommand();

    // 注册脚本菜单
    function registerMenuCommand() {
        let menu_cleanPostTitle_;
        if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_cleanPostTitle_ID);
            GM_unregisterMenuCommand(menu_qianDaoRedirectURL_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_cleanPostTitle = GM_getValue('xiu2_menu_cleanPostTitle');
            menu_qianDaoRedirectURL = GM_getValue('xiu2_menu_qianDaoRedirectURL');
        }

        if (menu_cleanPostTitle){menu_cleanPostTitle_ = "√";}else{menu_cleanPostTitle_ = "×";}

        menu_cleanPostTitle_ID = GM_registerMenuCommand(`[ ${menu_cleanPostTitle_} ] 清理帖子标题开头〖〗【】文字`, function(){menu_switch(menu_cleanPostTitle,'xiu2_menu_cleanPostTitle','清理帖子标题开头〖〗【】文字')});
        menu_qianDaoRedirectURL_ID = GM_registerMenuCommand(`当前页面设为签到后重定向地址`, function(){GM_setValue('xiu2_menu_qianDaoRedirectURL', location.href);GM_notification({text: `已设置当前页面为签到后重定向地址`, timeout: 3000});;})
        menu_feedBack_ID = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能（刷新网页后生效）`, timeout: 3500});
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能（刷新网页后生效）`, timeout: 3500});
        }
        registerMenuCommand(); // 重新注册脚本菜单
    };


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
    }else if(location.pathname === '/search.php'){
        curSite = DBSite.search; //                    搜索结果列表页（自动翻页）
        pageLoading(); //                              自动无缝翻页
    }else if (patt_thread.test(location.pathname)){ // 对于 /thread-XXX-X-X.html 这种帖子页面也和上面一样
        showHide();
        autoReply();
    }


    // 判断是否登陆
    function checkLogin(){
        let checklogin = document.querySelector('.Quater_user.logined');
        if (checklogin){
            loginStatus = true;
        }
    }


    // 自动翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0){
            windowScroll(function (direction, e) {
                if (direction === "down") { //           下滑才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
        if (loginStatus){
            if(document.getElementById("yl"))
            {
                document.querySelector('#yl').click();
                document.querySelector('.tr3.tac div a').click();
            }
            setTimeout(location.href=menu_qianDaoRedirectURL, 2000); // 跳转到指定URL
        }
    }


    // 自动回复
    function autoReply(){
        if (loginStatus){
            // 存在隐藏内容，自动回复
            if (document.getElementsByClassName("showhide").length == 0){
                writeReply();
                // 如果使用了我的 [智友邦美化] 脚本，则定位至底部，反之定位至隐藏内容区域
                if (document.getElementById("fastpostmessage").offsetParent == null){
                    setTimeout(`window.scrollTo(0,99999999)`, 500);
                }else{
                    setTimeout(`window.scrollTo(0,document.querySelector('.showhide').offsetTop)`, 500);
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
            var fastpostsubmit = document.getElementById("fastpostsubmit");
            if (fastpostsubmit){
                setTimeout(`fastpostsubmit.click()`, 200);
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
                    setTimeout(`window.scrollTo(0,99999999)`, 500);
                    console.log("111")
                }else{
                    setTimeout(`window.scrollTo(0,document.querySelector('.showhide').offsetTop)`, 500);
                    console.log("222")
                }
            }
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


    // 清理置顶帖子
    function cleanTop(){
        let showhide = document.querySelectorAll("a.showhide.y");
        if (showhide.length > 0){
            showhide.forEach(el=>el.click());
        }
    }


    // 清理帖子列表中帖子标题开头的〖XXX〗【XXX】文字
    function cleanPostTitle(){
        if (menu_cleanPostTitle){
            let cleanposttitle = document.querySelectorAll("a.s.xst");
            if (cleanposttitle.length > 0){
                for(let num = postNum;num<cleanposttitle.length;num++){
                    cleanposttitle[num].innerText = cleanposttitle[num].innerText.replace(patt_posttitle, ``);
                    postNum += 1;
                }
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