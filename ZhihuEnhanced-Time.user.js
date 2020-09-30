// ==UserScript==
// @name         知乎增强 - 置顶显示发布/编辑时间
// @version      1.0.1
// @author       X.I.U
// @description  回答和文章置顶显示发布时间、编辑时间
// @match        *://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
// @icon         https://static.zhihu.com/static/favicon.ico
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.1.1/jquery.min.js
// @connect      zhihu.com
// @grant        unsafeWindow
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412216
// ==/UserScript==

var publishTop=1; //置顶回答时间

//首页
function index()
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
            if(publishTop==1)
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

//回答页
function question()
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
            if(publishTop==1)
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

//专栏/文章
function zhuanlan()
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
    if(publishTop==1 && $(".Post-Header").find(".ContentItem-time").length==0)
    {
        $(".ContentItem-time").css({"padding":"0px 0px 0px 0px","margin-top": "14px"});
        $(".ContentItem-time").appendTo($(".Post-Header"))
    }
}

//搜索结果页
function search()
{
    $(".ContentItem.AnswerItem, .ContentItem.ArticleItem").each(function(){
        console.log($(this).find(".ContentItem-time"))
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
            if(publishTop==1)
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

    //隐藏相关推荐的卡片，仅保留问题卡片
    $(".RelevantQuery").closest(".Card.SearchResult-Card").hide();
    $(".KfeCollection-PcCollegeCard-wrapper").closest(".Card.SearchResult-Card").hide();
    if(getQueryVariable("type")=="content")
    {
        $('.Card.SearchResult-Card[data-za-detail-view-path-module="UserItem"]').hide();
    }

}

//用户主页
function people()
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
            if(publishTop==1)
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

    //每个页面对应的功能函数
    if(window.location.href.indexOf("question") > -1) //回答页
        setInterval(question, 300);
    else if(window.location.href.indexOf("search") > -1) //搜索结果页
        setInterval(search, 300);
    else if(window.location.href.indexOf("zhuanlan") > -1) //专栏/文章
        setInterval(zhuanlan, 300);
    else if(window.location.href.indexOf("people") > -1 || window.location.href.indexOf("org") > -1) //用户主页
        setInterval(people, 300);
    else
        setInterval(index, 300); //首页
})();