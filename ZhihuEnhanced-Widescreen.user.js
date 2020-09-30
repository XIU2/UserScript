// ==UserScript==
// @name                 知乎增强 - 宽屏显示
// @name:zh-CN           知乎增强 - 宽屏显示
// @name:zh-TW           知乎增強 - 寬屏顯示
// @version              1.0.0
// @author               X.I.U
// @description          将知乎首页、热榜、搜索等页面由窄屏改为宽屏显示。
// @description:zh-CN    将知乎首页、热榜、搜索等页面由窄屏改为宽屏显示。
// @description:zh-TW    將知乎首頁、熱榜、搜索等頁面由窄屏改為寬屏顯示。
// @include              *://www.zhihu.com/*
// @icon                 https://static.zhihu.com/static/favicon.ico
// @license              GPL-3.0 License
// @run-at               document-start
// @namespace            https://greasyfork.org/scripts/412212
// ==/UserScript==

(function() {
    var style_Add = document.createElement('style');
    style_Add.innerHTML = `
.GlobalSideBar,.Question-sideColumn,.ContentLayout-sideColumn,.SearchSideBar {
	display: none;
}
.Topstory-mainColumn,.Question-mainColumn,.ContentLayout-mainColumn,.SearchMain {
	width: 1000px;
}
.ImageMessage-ImageView {
	z-index: 999 !important;
}`;
    document.head.appendChild(style_Add);
})();