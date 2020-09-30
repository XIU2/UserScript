// ==UserScript==
// @name         知乎增强 - 默认显示高清原图
// @version      1.0.0
// @author       X.I.U
// @description  回答和文章默认显示高清原图
// @match        *://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/*
// @icon         https://static.zhihu.com/static/favicon.ico
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.1.1/jquery.min.js
// @connect      zhihu.com
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412217
// ==/UserScript==

//图片调整到最高清晰度
function originalPic()
{
    $("img").each(function(){
        if($(this).attr("data-original")!=undefined && !$(this).hasClass("comment_sticker"))
        {
            if($(this).attr("src") != $(this).attr("data-original"))
                $(this).attr("src",$(this).attr("data-original"))
        }
    })
    $(".Modal-inner").css({"overflow-y":"hidden"})
}

(function() {
    //图片调整到最高清晰度
    setInterval(originalPic,100)
})();
