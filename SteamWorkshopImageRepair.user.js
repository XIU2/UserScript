// ==UserScript==
// @name         Steam 创意工坊大图修复
// @version      1.0.0
// @author       X.I.U
// @description  修复 Steam 创意工坊预览大图无法显示的问题（Steam 不改的话，长期可用）
// @match        *://steamcommunity.com/sharedfiles/filedetails/*
// @match        *://steamcommunity.com/workshop/filedetails/*
// @icon         https://store.steampowered.com/favicon.ico
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==

if(typeof onYouTubeIframeAPIReady == 'function') {
    onYouTubeIframeAPIReady();
}