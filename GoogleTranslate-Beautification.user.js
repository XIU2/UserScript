// ==UserScript==
// @name         Google 翻译美化
// @version      1.0.1
// @author       X.I.U
// @description  精简多余内容、修复翻译结果溢出屏幕问题
// @match        *://translate.google.cn/*
// @match        *://translate.google.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFHklEQVR4nMWWW0ycRRTHfzPz7S4ssIWyFOiFy1ZKCyKJFG2tqZamtDHWahqNsTExadL6ZmITX3zhoS+NT1ofaqPx1fii9dKQWqtpoya92ZuUAgWhWCj3BXYpe5nxYdllv90FYiDxbCaZ2Znv/P/nNnPgfxYBcOzz8fLuSeuspWQNJrZh5gaAMfMfxOfahD45c6zgveUSkADd0/JHS8maZODkkQBPGjoUPdrS8ou1IgQsYdXCvHUmw8FUItKV7bopKxtXhIAx6eAJwExs5iTicB9dGQKkuztZMuUCgHSoQ0eOXHUsm0Aq2GLW2/ZElvXQm7dzOQSsjDgmw3QBMmXlhedv3GyncLUHy5KJg8YYTIrL4utwONw5ORlpqq+v6rcWUg7QUKHZW6upKNQA9I5Jzt6SXP173nH909kMjofIcs3g8biRUixlNE6ns6qgQJ0DatLKKM7lzcYIzbUaAwz4BRjweTXv7NB0DTkYD4o5q+DukBtvbhCnU+F2Zy1JAEAptQUWCEFDuaa5VjMyLTj5s0XvWAys0msIR2AiCRygYzSP7eUBAoEgSkmczqXzMh4OK1lRXJprowCc+lUlwDHQMyziU5v0B3LwBw1ZLk0wGMSYLFwu15IkEgRSpbIQxoOCrmGZAP/0UMh25t6g5OPz1hwZwd2RXLyeGYyB2dlZ/hkaIxgKUesrs1mckUDqlgGEsG8MT8WstyRsWG3wZBlbhdwbyaGhdAKEweGQ3OrqpvfRKFUb1toISCmwlErxQAqDnhHYVGyoKjZ0PhIYoOW7WFzr12veb44w4J/3DkDfVA6nvr2IZYWQyiBEbP/4l18jpYrdthi2bt7IyzsaUgikSOsdxabiCO++GOHkeUXPqMQYWFdgeHt7LD8udcoEuAEQiieqX6CueBynS2I5LAQxIt//dp3qivXUVG4gP8+9dAiu9UrO3la8VBel5UCEQT+AoHiVQQCtdyTtA+kJORJdC8KPUhYb15UgBPQ8HGJmdpbGzT7KStfYwpHmgeQ8+eqyomNQsK8uis8LCLg/JPmpTfJ7l0wDN8bQO5lLv2OKG13tHD7QRFG+hwvXb1NRUkRRfh7RaBQp7bd/xjJMeKJPcq0v6YMMV3SyNVEEIq+a/Jw+frh0nfK1XsYmpnl1/zMAhEIhHA4HSqn5pIwrW6wRSf7D3ikZ2xGAjjEPexrrGZmY5EpbB01b6/DmexLnIpEI0Wg0sU57DRdiktYdzYGnvp69/hy6B/2EI1EQ8GBoFK21jazWOkFC2rSkhCJjW5b0yqV5CYiguNA2y9PVPl7f9TydDx5y5uIVtLYr11rPE1gqBHHQhay2lSOQXVjHttpNlBV7ObhrG139g3xz8XKCRLI3Yh7Qob9sxiQBpsY5k9X2vAC/LiHwWBMOR6goWcPBpu3c7x/gdndvmk4LQM8E9mlH+JxSri2kSMYCsVVDEsG5aRhoH85mW24YgMrSIg7v381qTx7GGISY7xmW7h4WkQ+PX/zgjz8nT9jK2EB2tuHIW8VUlOWS7VJ2QCGQUiKEwOfzifQq+A8yPDX4mZASqeaGlCiH4tCBQtaVuFAyBrhYe7YsAqdPvOGvrFCDgvnfa825VPncOB0KKRbvDZdNAKC00P1RXOnOZ7NofCoPhyWRUiBEeh+Qul42gUfjj78wxvBktZPdz3mQMvbmywyak8EDgdm2FSFw+sQe/9Z6Og/uXYVUBinBGJ1wvdY6cfPF59PTM+2trbdeWS72isi//t1/7RwSS+MAAAAASUVORK5CYII=
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/413721
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

'use strict';
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
/* 翻译结果的选择列表宽度
.alt-menu {
    max-width: 35% !important;
} */
/* 翻译结果选择时显示翻译结果的翻译结果
.goog-menu.round-trip-content {
    white-space: normal !important;
    word-break: break-all !important;
} */`,
            style_2 = `
/* 清理多余内容
.rQKk7.zJmlgc {
	display: none !important;
} */`,
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