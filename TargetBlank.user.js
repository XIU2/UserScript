// ==UserScript==
// @name         新标签页打开链接
// @version      1.0.0
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
    Array.from(document.links).forEach(function (_this) {
        _this.target = '_blank'
    })
})();