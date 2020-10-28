// ==UserScript==
// @name         知乎增强
// @version      1.1.4
// @author       X.I.U
// @description  一键收起回答、置顶显示时间、区分问题文章
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @icon         https://static.zhihu.com/static/favicon.ico
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
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

var menu_collapsedAnswer = GM_getValue('xiu2_menu_collapsedAnswer');
var menu_publishTop = GM_getValue('xiu2_menu_publishTop');
var menu_typeTips = GM_getValue('xiu2_menu_typeTips');
var menu_collapsedAnswer_ID, menu_publishTop_ID, menu_typeTips_ID, menu_feedBack_ID;
if (menu_collapsedAnswer == null){menu_collapsedAnswer = true; GM_setValue('xiu2_menu_collapsedAnswer', menu_collapsedAnswer)};
if (menu_publishTop == null){menu_publishTop = true; GM_setValue('xiu2_menu_publishTop', menu_publishTop)};
if (menu_typeTips == null){menu_typeTips = true; GM_setValue('xiu2_menu_typeTips', menu_typeTips)};
registerMenuCommand();

// 注册脚本菜单
function registerMenuCommand() {
    var menu_collapsedAnswer_, menu_publishTop_, menu_typeTips_;
    if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
        GM_unregisterMenuCommand(menu_collapsedAnswer_ID);
        GM_unregisterMenuCommand(menu_publishTop_ID);
        GM_unregisterMenuCommand(menu_typeTips_ID);
        GM_unregisterMenuCommand(menu_feedBack_ID);
        menu_collapsedAnswer = GM_getValue('xiu2_menu_collapsedAnswer');
        menu_publishTop = GM_getValue('xiu2_menu_publishTop');
        menu_typeTips = GM_getValue('xiu2_menu_typeTips');
    }

    if (menu_collapsedAnswer){menu_collapsedAnswer_ = "√";}else{menu_collapsedAnswer_ = "×";}
    if (menu_publishTop){menu_publishTop_ = "√";}else{menu_publishTop_ = "×";}
    if (menu_typeTips){menu_typeTips_ = "√";}else{menu_typeTips_ = "×";}

    menu_collapsedAnswer_ID = GM_registerMenuCommand(`[ ${menu_collapsedAnswer_} ] 一键收起回答`, function(){menu_switch(menu_collapsedAnswer,'xiu2_menu_collapsedAnswer','一键收起回答')});
    menu_publishTop_ID = GM_registerMenuCommand(`[ ${menu_publishTop_} ] 置顶显示时间`, function(){menu_switch(menu_publishTop,'xiu2_menu_publishTop','置顶显示时间')});
    menu_typeTips_ID = GM_registerMenuCommand(`[ ${menu_typeTips_} ] 区分问题文章`, function(){menu_switch(menu_typeTips,'xiu2_menu_typeTips','区分问题文章')});
    menu_feedBack_ID = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});
}

// 菜单开关
function menu_switch(menu_status, Name, Tips) {
    if (menu_status){
        GM_setValue(`${Name}`, false);
        GM_notification(`已关闭 [${Tips}] 功能\n（刷新网页后生效）`);
    }else{
        GM_setValue(`${Name}`, true);
        GM_notification(`已开启 [${Tips}] 功能\n（刷新网页后生效）`);
    }
    registerMenuCommand(); // 重新注册脚本菜单
};

// 置顶显示时间 - 首页
function topTime_index()
{
    $(".TopstoryItem").each(function(){
        if( !($(this).find(".ContentItem-time").hasClass("full")) && $(this).find(".ContentItem-time").length>0 && $(this).find(".ContentItem-time").find("span").text() != null)
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

            //发布时间置顶
            if(menu_publishTop)
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

// 置顶显示时间 - 回答页
function topTime_question()
{
    //回答的发布时间
    $(".ContentItem.AnswerItem").each(function(){
        if( !($(this).find(".ContentItem-time").hasClass("full")) && $(this).find(".ContentItem-time").length>0 && $(this).find(".ContentItem-time").find("span").text() != null)
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

            //发布时间置顶
            if(menu_publishTop)
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
}

// 置顶显示时间 - 专栏/文章
function topTime_zhuanlan()
{
    //隐藏推荐文章
    $(".Recommendations-Main").hide();


    //有"编辑于"时，增加发布时间
    if( $(".ContentItem-time").text().indexOf("编辑于")>-1 && !$(".ContentItem-time").hasClass("done"))
    {
        let bianjiyu = $(".ContentItem-time").text();
        $(".ContentItem-time").click();
        $(".ContentItem-time").text($(".ContentItem-time").text()+"，"+bianjiyu)
        $(".ContentItem-time").addClass("done");
    }

    //发布时间置顶
    if(menu_publishTop && $(".Post-Header").find(".ContentItem-time").length==0)
    {
        $(".ContentItem-time").css({"padding":"0px 0px 0px 0px","margin-top": "14px"});
        $(".ContentItem-time").appendTo($(".Post-Header"))
    }
}

// 置顶显示时间 - 搜索结果页
function topTime_search()
{
    $(".ContentItem.AnswerItem, .ContentItem.ArticleItem").each(function(){
        //console.log($(this).find(".ContentItem-time"))
        if( !($(this).find(".ContentItem-time").hasClass("full")) && $(this).find(".ContentItem-time").length>0 && $(this).find(".ContentItem-time").find("span").text() != null)
        {
            if($(this).find(".ContentItem-time").text().indexOf("发布于")==-1 && $(this).find(".ContentItem-time").text().indexOf("编辑于") > -1)  //只有"编辑于"时，增加具体发布时间data-tooltip
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

            //发布时间置顶
            if(menu_publishTop)
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

// 置顶显示时间 - 用户主页
function topTime_people()
{
    $(".ContentItem.AnswerItem").each(function(){
        if( !($(this).find(".ContentItem-time").hasClass("full")) && $(this).find(".ContentItem-time").length>0 && $(this).find(".ContentItem-time").find("span").text() != null)
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

            //发布时间置顶
            if(menu_publishTop)
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

//图片调整到最高清晰度
function originalPic(){
    $("img").each(function(){
        if($(this).attr("data-original")!=undefined && !$(this).hasClass("comment_sticker"))
        {
            if($(this).attr("src") != $(this).attr("data-original"))
                $(this).attr("src",$(this).attr("data-original"))
        }
    })
    $(".Modal-inner").css({"overflow-y":"hidden"})
}

// 一键收起回答
function collapsedAnswer(){
    if(menu_collapsedAnswer){
        var button_Add = `<button id="collapsed-button" data-tooltip="收起回答" data-tooltip-position="left" data-tooltip-will-hide-on-click="false" aria-label="收起回答" type="button" class="Button CornerButton Button--plain"><svg class="ContentItem-arrowIcon is-active" aria-label="收起回答" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></button>`
        var style_Add = document.createElement('style');
        style_Add.innerHTML = '.CornerButton{margin-bottom:8px !important;}.CornerButtons{bottom:45px !important;}';
        document.head.appendChild(style_Add);
        $(".CornerAnimayedFlex").prepend(button_Add);
        $("#collapsed-button").on("click", function () {
            document.querySelectorAll('.ContentItem-rightButton').forEach(function (el) {
                if (el.attributes[0].name === "data-zop-retract-question") {
                    el.click()
                }
            });
        })
    }
}

var postNum;
// 区分问题文章
function addTypeTips() {
    if(menu_typeTips){
        // URL 匹配正则表达式
        var patt_zhuanlan = /zhuanlan.zhihu.com/,
            patt_question = /question\/\d+/,
            patt_video = /\/zvideo\//,
            patt_tip = /zhihu_e_tips/
        var postList = document.querySelectorAll('h2.ContentItem-title a');
        postNum = document.querySelectorAll('small.zhihu_e_tips');
        console.log(`${postList.length} ${postNum.length}`)
        if (postList.length > postNum.length){
            for(var num = postNum.length;num<postList.length;num++){
                if (!patt_tip.test(postList[num].innerHTML)){             // 判断是否已添加
                    if (patt_zhuanlan.test(postList[num].href)){          // 如果是文章
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #2196F3;display: inline-block;height: 18px;">文章</small> ` + postList[num].innerHTML
                    }else if (patt_question.test(postList[num].href)){    // 如果是问题
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #f68b83;display: inline-block;height: 18px;">问题</small> ` + postList[num].innerHTML
                    }else if (patt_video.test(postList[num].href)){       // 如果是视频
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #00BCD4;display: inline-block;height: 18px;">视频</small> ` + postList[num].innerHTML
                    }
                    //postNum += 1;
                }
            }
        }
    }
}

// 监听 XMLHttpRequest 事件
function EventXMLHttpRequest() {
    var _send = window.XMLHttpRequest.prototype.send
    function sendReplacement(data) {
        addTypeTips();
        return _send.apply(this, arguments);
    }
    window.XMLHttpRequest.prototype.send = sendReplacement;
}


(function() {
    //折叠谢邀
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

    //图片调整到最高清晰度
    setInterval(originalPic,100)

    //每个页面对应的功能函数
    if(window.location.href.indexOf("question") > -1){                         // 回答页 //
        if(window.location.href.indexOf("waiting") == -1){
            collapsedAnswer();                                  // 一键收起回答
        }
        setInterval(topTime_question, 300);                     // 置顶显示时间
    }else if(window.location.href.indexOf("search") > -1){                     // 搜索结果页 //
        collapsedAnswer();                                      // 一键收起回答
        setInterval(topTime_search, 300);                       // 置顶显示时间
        EventXMLHttpRequest();                                  // 区分问题文章
    }else if(window.location.href.indexOf("topic") > -1){                      // 话题页 //
        if(window.location.href.indexOf("unanswered") == -1){
            collapsedAnswer();                                  // 一键收起回答
            setInterval(topTime_search, 300);                   // 置顶显示时间
            EventXMLHttpRequest();                              // 区分问题文章
        }
    }else if(window.location.href.indexOf("zhuanlan") > -1){                   // 文章 //
        setInterval(topTime_zhuanlan, 300);                     // 置顶显示时间
    }else if(window.location.href.indexOf("column") > -1){                     // 专栏 //
        collapsedAnswer();                                      // 一键收起回答
        setInterval(topTime_zhuanlan, 300);                     // 置顶显示时间
    }else if(window.location.href.indexOf("people") > -1 || window.location.href.indexOf("org") > -1){ // 用户主页 //
        collapsedAnswer();                                      // 一键收起回答
        setInterval(topTime_people, 300);                       // 置顶显示时间
    }else{                                                                     // 首页 //
        collapsedAnswer();                                      // 一键收起回答
        setInterval(topTime_index, 300);                        // 置顶显示时间
        EventXMLHttpRequest();                                  // 区分问题文章
    }
})();