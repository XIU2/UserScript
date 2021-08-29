// ==UserScript==
// @name         新标签页打开链接
// @version      1.0.1
// @author       X.I.U
// @description  将网页中所有链接改为新标签页打开~
// @match        *://*/*
// @icon         https://i.loli.net/2021/03/07/rdijeYm83pznxWq.png
// @grant        none
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    targetBlank(); // 修改为新标签页打开

    // 针对 Discuz! 论坛的帖子
    if (document.querySelector('meta[name="author"][content*="Discuz!"], meta[name="generator"][content*="Discuz!"]') || document.getElementById('ft') && document.getElementById('ft').textContent.indexOf('Discuz!') > -1) {
        let atarget = document.getElementById('atarget');
        if (atarget && atarget.className.indexOf('atarget_1') === -1) { // 强制勾选 [新窗]
            atarget.click();
        }
    }

     // 修改为新标签页打开
    function targetBlank() {
        Array.from(document.links).forEach(function (_this) {
            _this.target = '_blank'
        })
    }
})();