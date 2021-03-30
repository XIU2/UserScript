// ==UserScript==
// @name         知乎增强
// @version      1.3.2
// @author       X.I.U
// @description  移除登录弹窗、一键收起回答、收起当前回答/评论（点击两侧空白处）、快捷回到顶部（右键两侧空白处）、置顶显示时间、显示问题时间、区分问题文章、默认高清原图、默认站外直链
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
/* globals $ */
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412205
// ==/UserScript==

var menu_ALL = [
    ['menu_collapsedAnswer', '一键收起回答', '一键收起回答', true],
    ['menu_collapsedNowAnswer', '收起当前回答/评论（点击两侧空白处）', '收起当前回答/评论', true],
    ['menu_backToTop', '快捷回到顶部（右键两侧空白处）', '快捷回到顶部', true],
    ['menu_publishTop', '置顶显示时间', '置顶显示时间', true],
    ['menu_allTime', '完整显示时间', '完整显示时间', true],
    ['menu_typeTips', '区分问题文章', '区分问题文章', true],
    ['menu_directLink', '默认站外直链', '默认站外直链', true]
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
    menu_ID[menu_ID.length] = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});
}

// 菜单开关
function menu_switch(menu_status, Name, Tips) {
    if (menu_status == 'true'){
        GM_setValue(`${Name}`, false);
        GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
    }else{
        GM_setValue(`${Name}`, true);
        GM_notification({text: `已开启 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
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


// 置顶显示时间 - 首页，来自：https://greasyfork.org/scripts/402808
function topTime_index()
{
    $(".TopstoryItem").each(function(){
        if( !($(this).find(".ContentItem-time").hasClass("full")) && $(this).find(".ContentItem-time").length>0 && $(this).find(".ContentItem-time").find("span").text() != null)
        {
            // 完整显示时间
            if(menu_value('menu_allTime'))
            {
                if($(this).find(".ContentItem-time").text().indexOf("发布于")==-1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") > -1) //只有"编辑于"时增加具体发布时间data-tooltip
                {
                    let data_tooltip = $(this).find(".ContentItem-time").find("span").attr("data-tooltip");
                    var oldtext =$(this).find(".ContentItem-time").find("span").text();
                    $(this).find(".ContentItem-time").find("span").text(data_tooltip+"，"+oldtext);
                    $(this).find(".ContentItem-time").addClass("full");
                }
                else if($(this).find(".ContentItem-time").text().indexOf("发布于") > -1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") == -1) //只有"发布于"时替换为具体发布时间data-tooltip
                {
                    let data_tooltip = $(this).find(".ContentItem-time").find("span").attr("data-tooltip");
                    $(this).find(".ContentItem-time").find("span").text(data_tooltip);
                    $(this).find(".ContentItem-time").addClass("full");
                }
            }

            //发布时间置顶
            if(menu_value('menu_publishTop'))
            {
                if(!$(this).find(".ContentItem-time").parent().hasClass("ContentItem-meta"))
                {
                    let temp_time = $(this).find(".ContentItem-time").clone();
                    $(this).find(".RichContent .ContentItem-time").hide();
                    $(this).find(".ContentItem-meta").append(temp_time);
                }

            }
        }

    })
}


// UTC 标准时转 UTC+8 北京时间，来自：https://greasyfork.org/zh-CN/scripts/402808
function getUTC8 (datetime) {
    let month = (datetime.getMonth() + 1) < 10 ? "0" + (datetime.getMonth() + 1) : (datetime.getMonth() + 1);
    let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    let hours = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    let minutes = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    let seconds = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return (datetime.getFullYear() + "-" + month + "-" + date + "\xa0\xa0" + hours + ":" + minutes + ":" + seconds);
}


// 置顶显示时间 - 回答页，来自：https://greasyfork.org/scripts/402808
function topTime_question()
{
    //回答的发布时间
    $(".ContentItem.AnswerItem").each(function(){
        if( !($(this).find(".ContentItem-time").hasClass("full")) && $(this).find(".ContentItem-time").length>0 && $(this).find(".ContentItem-time").find("span").text() != null)
        {
            // 完整显示时间
            if(menu_value('menu_allTime'))
            {
                if($(this).find(".ContentItem-time").text().indexOf("发布于")==-1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") > -1) //只有"编辑于"时增加具体发布时间data-tooltip
                {
                    let data_tooltip = $(this).find(".ContentItem-time").find("span").attr("data-tooltip");
                    var oldtext =$(this).find(".ContentItem-time").find("span").text();
                    $(this).find(".ContentItem-time").find("span").text(data_tooltip+"，"+oldtext);
                    $(this).find(".ContentItem-time").addClass("full");
                }
                else if($(this).find(".ContentItem-time").text().indexOf("发布于") > -1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") == -1) //只有"发布于"时替换为具体发布时间data-tooltip
                {
                    let data_tooltip = $(this).find(".ContentItem-time").find("span").attr("data-tooltip");
                    $(this).find(".ContentItem-time").find("span").text(data_tooltip);
                    $(this).find(".ContentItem-time").addClass("full");
                }
            }

            //发布时间置顶
            if(menu_value('menu_publishTop'))
            {
                if(!$(this).find(".ContentItem-time").parent().hasClass("ContentItem-meta"))
                {
                    let temp_time = $(this).find(".ContentItem-time").clone();
                    $(this).find(".RichContent .ContentItem-time").hide();
                    $(this).find(".ContentItem-meta").append(temp_time);
                }
            }
        }

    })

    $(".Pc-card.Card").attr("style","display:none")

    //问题创建时间，来自：https://greasyfork.org/zh-CN/scripts/402808
    if ($(".QuestionPage .QuestionHeader-side p").length == 0 && window.location.href.indexOf("log") == -1) //非问题日志页
    {
        let createtime = $(".QuestionPage>[itemprop~=dateCreated]").attr("content");
        let modifiedtime = $(".QuestionPage>[itemprop~=dateModified]").attr("content");
        createtime = getUTC8(new Date(createtime));
        modifiedtime = getUTC8(new Date(modifiedtime));

        $(".QuestionPage .QuestionHeader-side").append('<div style=\"color:#8590a6; margin-top:15px\"><p>创建时间:&nbsp;&nbsp;' + createtime + '</p><p>最后编辑:&nbsp;&nbsp;' + modifiedtime + '</p></div>');
    }
}

// 置顶显示时间 - 专栏/文章，来自：https://greasyfork.org/scripts/402808
function topTime_zhuanlan()
{
    //隐藏推荐文章
    $(".Recommendations-Main").hide();

    // 完整显示时间
    if(menu_value('menu_allTime'))
    {
        if( $(".ContentItem-time").text().indexOf("编辑于")>-1 && !$(".ContentItem-time").hasClass("done"))
        {
            let bianjiyu = $(".ContentItem-time").text();
            $(".ContentItem-time").click();
            $(".ContentItem-time").text($(".ContentItem-time").text()+"，"+bianjiyu)
            $(".ContentItem-time").addClass("done");
        }
    }

    //发布时间置顶
    if(menu_value('menu_publishTop') && $(".Post-Header").find(".ContentItem-time").length==0)
    {
        $(".ContentItem-time").css({"padding":"0px 0px 0px 0px","margin-top": "14px"});
        $(".ContentItem-time").appendTo($(".Post-Header"))
    }
}

// 置顶显示时间 - 搜索结果页，来自：https://greasyfork.org/scripts/402808
function topTime_search()
{
    $(".ContentItem.AnswerItem, .ContentItem.ArticleItem").each(function(){
        if( !($(this).find(".ContentItem-time").hasClass("full")) && $(this).find(".ContentItem-time").length>0 && $(this).find(".ContentItem-time").find("span").text() != null)
        {
            // 完整显示时间
            if(menu_value('menu_allTime'))
            {
                if($(this).find(".ContentItem-time").text().indexOf("发布于")==-1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") > -1) //只有"编辑于"时，增加具体发布时间data-tooltip
                {
                    let data_tooltip = $(this).find(".ContentItem-time").find("span").attr("data-tooltip");
                    var oldtext =$(this).find(".ContentItem-time").find("span").text();
                    $(this).find(".ContentItem-time").find("span").text(data_tooltip+"，"+oldtext);
                    $(this).find(".ContentItem-time").addClass("full");
                }
                else if($(this).find(".ContentItem-time").text().indexOf("发布于") > -1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") == -1) //只有"发布于"时替换为具体发布时间data-tooltip
                {
                    let data_tooltip = $(this).find(".ContentItem-time").find("span").attr("data-tooltip");
                    $(this).find(".ContentItem-time").find("span").text(data_tooltip);
                    $(this).find(".ContentItem-time").addClass("full");
                }
            }

            //发布时间置顶
            if(menu_value('menu_publishTop'))
            {
                if(!$(this).find(".ContentItem-time").parent().hasClass("SearchItem-meta"))
                {
                    let temp_time = $(this).find(".ContentItem-time").clone();
                    $(this).find(".RichContent .ContentItem-time").hide();
                    $(this).find(".SearchItem-meta").append(temp_time);
                }
            }
        }

    })
}

// 置顶显示时间 - 用户主页，来自：https://greasyfork.org/scripts/402808
function topTime_people()
{
    $(".ContentItem.AnswerItem, .ContentItem.ArticleItem").each(function(){
        if( !($(this).find(".ContentItem-time").hasClass("full")) && $(this).find(".ContentItem-time").length>0 && $(this).find(".ContentItem-time").find("span").text() != null)
        {
            // 完整显示时间
            if(menu_value('menu_allTime'))
            {
                if($(this).find(".ContentItem-time").text().indexOf("发布于")==-1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") > -1) //只有"编辑于"时增加具体发布时间data-tooltip
                {
                    let data_tooltip = $(this).find(".ContentItem-time").find("span").attr("data-tooltip");
                    var oldtext =$(this).find(".ContentItem-time").find("span").text();
                    $(this).find(".ContentItem-time").find("span").text(data_tooltip+"，"+oldtext);
                    $(this).find(".ContentItem-time").addClass("full");
                }
                else if($(this).find(".ContentItem-time").text().indexOf("发布于") > -1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") == -1) //只有"发布于"时替换为具体发布时间data-tooltip
                {
                    let data_tooltip = $(this).find(".ContentItem-time").find("span").attr("data-tooltip");
                    $(this).find(".ContentItem-time").find("span").text(data_tooltip);
                    $(this).find(".ContentItem-time").addClass("full");
                }
            }

            //发布时间置顶
            if(menu_value('menu_publishTop'))
            {
                if(!$(this).find(".ContentItem-time").parent().hasClass("ContentItem-meta"))
                {
                    let temp_time = $(this).find(".ContentItem-time").clone();
                    $(this).find(".RichContent .ContentItem-time").hide();
                    $(this).find(".ContentItem-meta").append(temp_time);
                }
            }
        }

    })
}

// 默认站外直链，来自：https://greasyfork.org/scripts/402808
function directLink () {
    var equal, colon, external_href, protocol, path, new_href;
    //文字链接
    $("a[class*=\'external\']").each(function () {
        if ($(this).find("span").length > 0) {
            new_href = $(this).text();
            $(this).attr("href", new_href);
        } else if ($(this).attr("href").indexOf("link.zhihu.com/?target=") > -1) {
            external_href = $(this).attr("href");
            new_href = external_href.substring(external_href = $(this).attr("href").indexOf("link.zhihu.com/?target=") + "link.zhihu.com/?target=".length);
            //console.log(`${new_href}`)
            $(this).attr("href", decodeURIComponent(new_href));
        } else {
            external_href = $(this).attr("href");
            if (external_href.lastIndexOf("https%3A")) {
                new_href = $(this).attr("href").substring($(this).attr("href").lastIndexOf("https%3A"));
            } else if (external_href.lastIndexOf("http%3A%2F%2F")) {
                new_href = $(this).attr("href").substring($(this).attr("href").lastIndexOf("http%3A"));
            }
            $(this).attr("href", decodeURIComponent(new_href));
        }
    });

    //卡片链接
    $("a[class*=\'LinkCard\']:not([class*=\'MCNLinkCard\']):not([class*=\'ZVideoLinkCard\'])").each(function () {
        if ($(this).find("LinkCard-title").length > 0 && $(this).find("LinkCard-title").indexOf("http") > -1) {
            new_href = $(this).find("LinkCard-title").text();
            $(this).attr("href", new_href);
        } else if ($(this).attr("href").indexOf("link.zhihu.com/?target=") > -1) {
            external_href = $(this).attr("href");
            new_href = external_href.substring(external_href = $(this).attr("href").indexOf("link.zhihu.com/?target=") + "link.zhihu.com/?target=".length);
            $(this).attr("href", decodeURIComponent(new_href));
        } else {
            external_href = $(this).attr("href");
            if (external_href.lastIndexOf("https%3A")) {
                new_href = $(this).attr("href").substring($(this).attr("href").lastIndexOf("https%3A"));
            } else if (external_href.lastIndexOf("http%3A%2F%2F")) {
                new_href = $(this).attr("href").substring($(this).attr("href").lastIndexOf("http%3A"));
            }
            $(this).attr("href", decodeURIComponent(new_href));
        }
    });

    //旧版视频卡片链接
    $("a.VideoCard-link").each(function () {
        if ($(this).attr("href").indexOf("link.zhihu.com/?target=") > -1) {
            external_href = $(this).attr("href");
            equal = external_href.lastIndexOf("http");
            colon = external_href.lastIndexOf("%3A");
            protocol = external_href.substring(equal, colon);
            path = external_href.substring(colon + 5, external_href.length);
            new_href = protocol + "://" + path;
            $(this).attr("href", decodeURIComponent(new_href));
        }
    });

    //隐藏首页广告卡片
    $(".TopstoryItem--advertCard").hide();
}

// 默认高清原图，来自：https://greasyfork.org/scripts/402808
function originalPic(){
    $("img").each(function(){
        if ($(this).attr("data-original")!=undefined && !$(this).hasClass("comment_sticker")) {
            if ($(this).attr("src") != $(this).attr("data-original")) {
                $(this).attr("src",$(this).attr("data-original"))
            }
        }
    })
    $(".Modal-inner").css({"overflow-y":"hidden"})
}

// 一键收起回答
function collapsedAnswer(){
    if(menu_value('menu_collapsedAnswer')){
        let button_Add = `<button id="collapsed-button" data-tooltip="收起回答" data-tooltip-position="left" data-tooltip-will-hide-on-click="false" aria-label="收起回答" type="button" class="Button CornerButton Button--plain"><svg class="ContentItem-arrowIcon is-active" aria-label="收起回答" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></button>`
        let style_Add = document.createElement('style');
        style_Add.innerHTML = '.CornerButton{margin-bottom:8px !important;}.CornerButtons{bottom:45px !important;}';
        document.head.appendChild(style_Add);
        $(".CornerAnimayedFlex").prepend(button_Add);
        $("#collapsed-button").on("click", function () {
            document.querySelectorAll('.ContentItem-rightButton').forEach(function (el) {
                if (el.hasAttribute('data-zop-retract-question')) {
                    el.click()
                }
            });
        })
    }
}


// 收起当前回答、评论（监听点击事件，点击网页两侧空白处）
function collapsedNowAnswer(selectors){
    backToTop(selectors)
    if(menu_value('menu_collapsedNowAnswer')){
        document.querySelector(selectors).onclick = function(event){
            if (event.target==this) {
                let rightButton = document.querySelector('.ContentItem-actions.Sticky.RichContent-actions.is-fixed.is-bottom')
                if(rightButton) { // 悬浮的 [收起回答]
                    // 固定的 [收起评论]
                    let commentCollapseButton = rightButton.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel')
                    if(commentCollapseButton && commentCollapseButton.innerText.indexOf("收起评论") > -1) {
                        commentCollapseButton.click();
                    }
                    // 悬浮的 [收起回答]
                    rightButton = rightButton.querySelector('.ContentItem-rightButton')
                    if(rightButton && rightButton.hasAttribute('data-zop-retract-question')) {
                        rightButton.click();
                    }
                }else{ // 固定的 [收起回答]
                    document.querySelectorAll('.ContentItem-rightButton').forEach(function (el) {
                        if (el.hasAttribute('data-zop-retract-question')) {
                            if (isElementInViewport(el)) {
                                // 固定的 [收起评论]
                                let commentCollapseButton = el.parentNode.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel')
                                if(commentCollapseButton && commentCollapseButton.innerText.indexOf("收起评论") > -1) {
                                    commentCollapseButton.click();
                                }
                                el.click()
                            }
                        }
                    })
                }

                // 悬浮的 [收起评论]
                let commentCollapseButton = document.querySelector('.CommentCollapseButton')
                if(commentCollapseButton) {
                    commentCollapseButton.click();
                }else{ // 固定的 [收起评论]（针对短篇没有收起按钮的回答）
                    document.querySelectorAll('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel').forEach(function (el) {
                        if (el.innerText.indexOf("收起评论") > -1) {
                            if (isElementInViewport(el)) {
                                el.click()
                            }
                        }
                    })
                }
            }
        }
    }
}


// 回到顶部（监听点击事件，鼠标右键点击网页两侧空白处）
function backToTop(selectors){
    if(menu_value('menu_backToTop')){
        document.querySelector(selectors).oncontextmenu = function(event){
            if (event.target==this) {
                event.preventDefault();
                window.scrollTo(0,0)
            }
        }
    }
}


//获取元素是否在可视区域
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
}


var postNum;
// 区分问题文章
function addTypeTips() {
    if(menu_value('menu_typeTips')){
        // URL 匹配正则表达式
        let patt_zhuanlan = /zhuanlan.zhihu.com/,
            patt_question = /question\/\d+/,
            patt_question_answer = /answer\/\d+/,
            patt_video = /\/zvideo\//,
            patt_tip = /zhihu_e_tips/
        let postList = document.querySelectorAll('h2.ContentItem-title a');
        postNum = document.querySelectorAll('small.zhihu_e_tips');
        //console.log(`${postList.length} ${postNum.length}`)
        if (postList.length > postNum.length){
            for(let num = postNum.length;num<postList.length;num++){
                if (!patt_tip.test(postList[num].innerHTML)){ //               判断是否已添加
                    if (patt_zhuanlan.test(postList[num].href)){ //            如果是文章
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #2196F3;display: inline-block;height: 18px;">文章</small> ` + postList[num].innerHTML
                    }else if (patt_question.test(postList[num].href)){ //      如果是问题
                        if (patt_question_answer.test(postList[num].href)){ // 如果是指向回答的问题（而非指向纯问题的链接）
                            postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #f68b83;display: inline-block;height: 18px;">问题</small> ` + postList[num].innerHTML
                        }else{
                            postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #ff5a4e;display: inline-block;height: 18px;">问题</small> ` + postList[num].innerHTML
                        }
                    }else if (patt_video.test(postList[num].href)){ //         如果是视频
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #00BCD4;display: inline-block;height: 18px;">视频</small> ` + postList[num].innerHTML
                    }
                    //postNum += 1;
                }
            }
        }
    }
}

// 监听 网页插入元素 事件
function addEventListener_DOMNodeInserted() {
    // 知乎免登录，来自：https://greasyfork.org/zh-CN/scripts/417126
    let removeLoginModal = e => {
        if (e.target.innerHTML && e.target.getElementsByClassName('Modal-wrapper').length > 0) {
            if (e.target.getElementsByClassName('Modal-wrapper')[0].querySelector('.signFlowModal')){
                e.target.getElementsByClassName('Modal-wrapper')[0].remove();
            }
            setTimeout(() => {document.documentElement.style.overflowY = 'scroll';}, 0);
        }
    }

    // 收起当前评论（监听点击事件，点击网页两侧空白处）
    let collapseNowComment = e => {
        if (e.target.innerHTML && e.target.getElementsByClassName('Modal-wrapper Modal-enter').length > 0) {
            document.getElementsByClassName('Modal-backdrop')[0].onclick = function(event){
                if (event.target==this) {
                    let closeButton = document.getElementsByClassName('Modal-closeButton')[0]
                    if(closeButton) {
                        closeButton.click();
                    }
                }
            }
        }
    }

    if (document.querySelector('button.AppHeader-login')){ // 未登录时才会监听并移除登录弹窗
        document.addEventListener('DOMNodeInserted', removeLoginModal);
        document.querySelector('button.AppHeader-login').onclick=function(){location.href='https://www.zhihu.com/signin';} // [登录]按钮跳转至登录页面
        document.querySelector('.AppHeader-profile button.Button--primary').onclick=function(){location.href='https://www.zhihu.com/signin';} // [加入知乎]按钮跳转至注册页面（实际上是同一个页面）
    } else if(window.location.href.indexOf("zhuanlan") > -1){
        document.addEventListener('DOMNodeInserted', removeLoginModal);
    }
    document.addEventListener('DOMNodeInserted', collapseNowComment); // 收起当前评论（监听点击事件，点击网页两侧空白处）
}


// 监听 XMLHttpRequest 事件
function EventXMLHttpRequest() {
    var _send = window.XMLHttpRequest.prototype.send
    function sendReplacement(data) {
        //console.log(`111111`);
        addTypeTips();
        return _send.apply(this, arguments);
    }
    window.XMLHttpRequest.prototype.send = sendReplacement;
}

/*(function (open) {
    XMLHttpRequest.prototype.open = function () {
        this.addEventListener("readystatechange", function () {
                //console.log(this.responseURL);
        }, false);
        open.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.open);*/

(function() {
    addEventListener_DOMNodeInserted(); // 监听 网页插入元素 事件


    // 默认折叠邀请，来自：https://greasyfork.org/scripts/402808
    let timer=setInterval(function(){
        if($(".QuestionInvitation-content").text().indexOf("更多推荐结果") > -1)
        {
            clearInterval(timer);
            $(".QuestionInvitation-content").addClass("hide");
            $(".QuestionInvitation-content").hide();

            $(".QuestionInvitation-title").html($(".QuestionInvitation-title").text()+'<span style="color: #8590a6;font-size: 14px;"> 展开/折叠</span>')

            $(".Topbar").click(function(){

                if(($(".QuestionInvitation-content").hasClass("hide")))
                {
                    $(".QuestionInvitation-content").removeClass("hide").addClass("show");
                    $(".QuestionInvitation-content").show();
                }
                else
                {
                    $(".QuestionInvitation-content").removeClass("show").addClass("hide");
                    $(".QuestionInvitation-content").hide();
                }
            })
        }
    })


    setInterval(originalPic,100); //                                    默认高清原图
    if(menu_value('menu_directLink')) setInterval(directLink, 100); //                默认站外直链


    if(window.location.href.indexOf("question") > -1){ //                             回答页 //
        if(window.location.href.indexOf("waiting") == -1){
            collapsedAnswer(); //                                       一键收起回答
            collapsedNowAnswer(".QuestionPage");
            collapsedNowAnswer(".Question-main");
        }
        setInterval(topTime_question, 300); //                          置顶显示时间
    }else if(window.location.href.indexOf("search") > -1){ //                        搜索结果页 //
        collapsedAnswer(); //                                           一键收起回答
        collapsedNowAnswer("main div");
        collapsedNowAnswer(".Search-container");
        setInterval(topTime_search, 300); //                            置顶显示时间
        EventXMLHttpRequest(); //                                       区分问题文章
    }else if(window.location.href.indexOf("topic") > -1){ //                         话题页 //
        if(window.location.href.indexOf("unanswered") == -1){
            collapsedAnswer(); //                                       一键收起回答
            collapsedNowAnswer("main.App-main");
            collapsedNowAnswer(".ContentLayout");
            setInterval(topTime_search, 300); //                        置顶显示时间
            EventXMLHttpRequest(); //                                   区分问题文章
        }
    }else if(window.location.href.indexOf("zhuanlan") > -1){ //                      文章 //
        backToTop("article.Post-Main.Post-NormalMain")
        backToTop("div.Post-Sub.Post-NormalSub")
        setInterval(topTime_zhuanlan, 300); //                          置顶显示时间
    }else if(window.location.href.indexOf("column") > -1){ //                        专栏 //
        collapsedAnswer(); //                                           一键收起回答
        collapsedNowAnswer("main div");
        setInterval(topTime_zhuanlan, 300); //                          置顶显示时间
    }else if(window.location.href.indexOf("people") > -1 || window.location.href.indexOf("org") > -1){ // 用户主页 //
        collapsedAnswer(); //                                           一键收起回答
        collapsedNowAnswer("main div");
        collapsedNowAnswer(".Profile-main");
        setInterval(topTime_people, 300); //                            置顶显示时间
    }else{ //                                                                        首页 //
        collapsedAnswer(); //                                           一键收起回答
        collapsedNowAnswer("main div");
        collapsedNowAnswer(".Topstory-container");
        setInterval(topTime_index, 300); //                             置顶显示时间
        EventXMLHttpRequest(); //                                       区分问题文章
    }
})();