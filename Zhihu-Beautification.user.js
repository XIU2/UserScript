// ==UserScript==
// @name         知乎美化
// @version      1.0.9
// @author       X.I.U
// @description  宽屏显示、隐藏文章开头大图、调整图片最大高度、浏览回答向下翻时自动隐藏标题、文章编辑页面与实际文章宽度一致
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/p/*
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/412212
// ==/UserScript==

(function() {
    var menu_widescreenDisplay = GM_getValue('xiu2_menu_widescreenDisplay'),
        menu_picHeight = GM_getValue('xiu2_menu_picHeight'),
        menu_postimg = GM_getValue('xiu2_menu_postimg'),
        menu_hideTitle = GM_getValue('xiu2_menu_hideTitle'),
    menu_widescreenDisplay_ID, menu_picHeight_ID, menu_postimg_ID, menu_hideTitle_ID, menu_feedBack_ID;
    if (menu_widescreenDisplay == null){menu_widescreenDisplay = true; GM_setValue('xiu2_menu_widescreenDisplay', menu_widescreenDisplay)};
    if (menu_picHeight == null){menu_picHeight = true; GM_setValue('xiu2_menu_picHeight', menu_picHeight)};
    if (menu_postimg == null){menu_postimg = true; GM_setValue('xiu2_menu_postimg', menu_postimg)};
    if (menu_hideTitle == null){menu_hideTitle = true; GM_setValue('xiu2_menu_hideTitle', menu_hideTitle)};
    registerMenuCommand();
    addStyle();

    // 注册脚本菜单
    function registerMenuCommand() {
        let menu_widescreenDisplay_, menu_picHeight_, menu_postimg_, menu_hideTitle_;
        if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_widescreenDisplay_ID);
            GM_unregisterMenuCommand(menu_picHeight_ID);
            GM_unregisterMenuCommand(menu_postimg_ID);
            GM_unregisterMenuCommand(menu_hideTitle_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_widescreenDisplay = GM_getValue('xiu2_menu_widescreenDisplay');
            menu_picHeight = GM_getValue('xiu2_menu_picHeight');
            menu_postimg = GM_getValue('xiu2_menu_postimg');
            menu_hideTitle = GM_getValue('xiu2_menu_hideTitle');
        }

        if (menu_widescreenDisplay){menu_widescreenDisplay_ = "√";}else{menu_widescreenDisplay_ = "×";}
        if (menu_picHeight){menu_picHeight_ = "√";}else{menu_picHeight_ = "×";}
        if (menu_postimg){menu_postimg_ = "√";}else{menu_postimg_ = "×";}
        if (menu_hideTitle){menu_hideTitle_ = "√";}else{menu_hideTitle_ = "×";}

        menu_widescreenDisplay_ID = GM_registerMenuCommand(`[ ${menu_widescreenDisplay_} ] 宽屏显示`, function(){menu_switch(menu_widescreenDisplay,'xiu2_menu_widescreenDisplay','宽屏显示')});
        menu_picHeight_ID = GM_registerMenuCommand(`[ ${menu_picHeight_} ] 调整图片最大高度`, function(){menu_switch(menu_picHeight,'xiu2_menu_picHeight','调整图片最大高度')});
        menu_postimg_ID = GM_registerMenuCommand(`[ ${menu_postimg_} ] 隐藏文章开头大图`, function(){menu_switch(menu_postimg,'xiu2_menu_postimg','隐藏文章开头大图')});
        menu_hideTitle_ID = GM_registerMenuCommand(`[ ${menu_hideTitle_} ] 隐藏浏览回答标题`, function(){menu_switch(menu_hideTitle,'xiu2_menu_hideTitle','隐藏浏览回答标题')});
        menu_feedBack_ID = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3000});
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3000});
        }
        registerMenuCommand(); // 重新注册脚本菜单
    };


    // 添加样式
    function addStyle() {
        let style = ``,
            style_1 = `/* 宽屏显示 */
.GlobalSideBar,.Question-sideColumn,.ContentLayout-sideColumn,.SearchSideBar,.Card.QuestionHeaderTopicMeta {
	display: none !important;
}
.Topstory-mainColumn,.Question-mainColumn,.ContentLayout-mainColumn,.SearchMain,.QuestionWaiting-mainColumn {
	width: 1000px !important;
}
.QuestionWaiting-mainColumn {
	margin-right: 0 !important;
}
.ImageMessage-ImageView {
	z-index: 999 !important;
}
`,
            style_2 = `/* 隐藏在各列表中查看文章时开头显示的大图，不影响文章、专栏页面 */
.RichContent img.ArticleItem-image {
	display: none !important;
}
`,
            style_3 = `/* 调整文章编辑页面与实际文章宽度一致 */
.PostEditor .RichText {
	min-width: 690px !important;
}
/* 及标题输入框内的文字大小 */
.WriteIndex-titleInput .Input {
	min-width: 690px !important;
	font-size: 24px;
}
`,
            style_4 = `/* 浏览回答时，向下翻隐藏顶栏（问题的标题）*/
header.is-hidden {
	display: none;
}
`,
            style_5 = `/* 调整图片最大高度 */
.ztext .content_image, .ztext .origin_image, .GifPlayer img {
	max-height: 500px;
	width: auto;
}
`
        let style_Add = document.createElement('style');
        // 宽屏显示
        if (menu_widescreenDisplay) {
            style += style_1;
        }
        // 调整图片最大高度
        if (menu_picHeight) {
            style += style_5;
        }
        // 隐藏文章开头大图
        if (menu_postimg) {
            style += style_2;
        }
        // 浏览回答向下翻时自动隐藏标题
        if (menu_hideTitle) {
            style += style_4;
        }
        // 文章编辑页面与实际文章宽度一致
        if(window.location.href.indexOf("zhuanlan") > -1){
            if(window.location.href.indexOf("/edit") > -1){
                style += style_3;
            }
        }
        style_Add.innerHTML = style;
        document.head.appendChild(style_Add);
    }
})();