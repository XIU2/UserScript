// ==UserScript==
// @name         Google 翻译美化
// @version      1.0.0
// @author       X.I.U
// @description  精简多余内容、修复翻译结果溢出屏幕问题
// @icon         https://translate.google.cn/favicon.ico
// @match        *://translate.google.cn/*
// @match        *://translate.google.com/*
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/413721
// ==/UserScript==

(function() {
    var style_Add = document.createElement('style');
    style_Add.innerHTML = `
/* 清理多余内容 */
.input-button-container,.ft-icon-row,.frame:before,.app-download-bar,#gb,.gp-footer,.feedback-link,#gt-input-tool {
	display: none !important;
}
/* 翻译结果的选择列表宽度 */
.alt-menu {
    max-width: 35% !important;
}
/* 翻译结果选择时显示翻译结果的翻译结果 */
.goog-menu.round-trip-content {
    white-space: normal !important;
    word-break: break-all !important;
}
/* 主体顶部留白 */
.homepage-content-wrap {
    margin-top: 26px;
}
/* 部分元素的边框调整 */
.gt-lc.gt-lc-mobile .gt-cd,.gt-lc.gt-lc-mobile.show-as-one-card {
	border: .6px solid #eeeeee !important;
	border-radius: 2px !important;
}
.main-header {
	border: 1px solid #eee !important;
	box-shadow: none !important;
}
.ls-wrap {
	border-top: none !important;
	border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
}
.results-container.empty {
	border-left: 1px solid rgba(0, 0, 0, 0.06) !important;
}`;
    document.head.appendChild(style_Add);
})();