// ==UserScript==
// @name                 知乎增强 - 一键收起回答
// @name:zh-CN           知乎增强 - 一键收起回答
// @name:zh-TW           知乎增強 - 壹鍵收起回答
// @version              1.0.1
// @author               X.I.U
// @description          在知乎右下角添加「一键收起回答」按钮，点击后可以收起所有长篇回答。
// @description:zh-CN    在知乎右下角添加「一键收起回答」按钮，点击后可以收起所有长篇回答。
// @description:zh-TW    在知乎右下角添加「壹鍵收起回答」按鈕，點擊後可以收起所有長篇回答。
// @include              *://www.zhihu.com/question/*
// @include              https://www.zhihu.com/
// @icon                 https://static.zhihu.com/static/favicon.ico
// @require              https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @license              GPL-3.0 License
// @run-at               document-end
// @namespace            https://greasyfork.org/scripts/412205
// ==/UserScript==

(function() {
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
})();