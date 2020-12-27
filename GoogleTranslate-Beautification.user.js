// ==UserScript==
// @name         Google 翻译美化
// @version      1.0.1
// @author       X.I.U
// @description  精简多余内容、修复翻译结果溢出屏幕问题
// @match        *://translate.google.cn/*
// @match        *://translate.google.com/*
// @icon         https://translate.google.cn/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    var menu_streamline = GM_getValue('xiu2_menu_streamline');
    var menu_streamline_ID, menu_feedBack_ID;
    if (menu_streamline == null){menu_streamline = true; GM_setValue('xiu2_menu_streamline', menu_streamline)};
    registerMenuCommand();
    addStyle();

    // 注册脚本菜单
    function registerMenuCommand() {
        var menu_streamline_;
        if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_streamline_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_streamline = GM_getValue('xiu2_menu_streamline');
        }

        if (menu_streamline){menu_streamline_ = "√";}else{menu_streamline_ = "×";}

        menu_streamline_ID = GM_registerMenuCommand(`[ ${menu_streamline_} ] 精简美化`, function(){menu_switch(menu_streamline,'xiu2_menu_streamline','精简美化')});
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


    // 添加样式
    function addStyle() {
        var style,
            style_1 = `
/* 翻译结果的选择列表宽度 */
.alt-menu {
    max-width: 35% !important;
}
/* 翻译结果选择时显示翻译结果的翻译结果 */
.goog-menu.round-trip-content {
    white-space: normal !important;
    word-break: break-all !important;
}`,
            style_2 = `
/* 清理多余内容 */
.rQKk7.zJmlgc {
	display: none !important;
}`,
            style_Add = document.createElement('style');
        if (menu_streamline) {
            style = style_1 + style_2;
        }else{
            style = style_1;
        }
        style_Add.innerHTML = style;
        document.head.appendChild(style_Add);
    }
})();