// ==UserScript==
// @name                 Steam Workshop Image Repair
// @name:zh-CN           Steam 创意工坊大图修复
// @version              1.0.0
// @author               X.I.U
// @description          Fixed Steam Workshop image not showing
// @description:zh-CN    修复 Steam 创意工坊预览大图无法显示的问题 
// @match                *://steamcommunity.com/sharedfiles/filedetails/*
// @match                *://steamcommunity.com/workshop/filedetails/*
// @icon                 https://store.steampowered.com/favicon.ico
// @license              GPL-3.0 License
// @run-at               document-end
// @namespace            https://greasyfork.org/scripts/397666
// ==/UserScript==

if(typeof onYouTubeIframeAPIReady == 'function') {
    onYouTubeIframeAPIReady();
}