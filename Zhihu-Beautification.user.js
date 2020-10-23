// ==UserScript==
// @name         知乎美化
// @version      1.0.2
// @author       X.I.U
// @description  宽屏显示
// @include      *://www.zhihu.com/*
// @icon         https://static.zhihu.com/static/favicon.ico
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/412212
// ==/UserScript==

(function() {
    var style_Add = document.createElement('style');
    style_Add.innerHTML = `
.GlobalSideBar,.Question-sideColumn,.ContentLayout-sideColumn,.SearchSideBar,.RichContent img.ArticleItem-image {
	display: none !important;
}
/* 屏蔽在各列表中查看文章时开头显示的大图，不影响文章/专栏页面
.RichContent img.ArticleItem-image {
	display: none !important;
}
*/
.Topstory-mainColumn,.Question-mainColumn,.ContentLayout-mainColumn,.SearchMain,.QuestionWaiting-mainColumn {
	width: 1000px !important;
}
.QuestionWaiting-mainColumn {
	margin-right: 0 !important;
}
.ImageMessage-ImageView {
	z-index: 999 !important;
}`;
    document.head.appendChild(style_Add);
})();