// ==UserScript==
// @name         吾爱破解论坛美化
// @version      1.0.9
// @author       X.I.U
// @description  精简多余内容、样式优化
// @match        *://www.52pojie.cn/*
// @icon         https://www.52pojie.cn/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/412681
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412681/feedback', {active: true,insert: true,setParent: true});});
    addStyle();
    function addStyle() {
        let style = `.bml {display:none !important;}
#postlist .plc .t_f img, #postlist .plc .tattl img {
    max-height: 500px !important;
    width: auto !important;
}
a[href="connect.php?mod=config"], #toptb, #navmenu, #nv_ph, #nv, #pt .y, #chart, #ft, #custominfo_pmenu, .bm.lk, .dnch_eo_pt, .dnch_eo_pr, .dnch_eo_f, dl.pil.cl, td.plc.plm .sign, .dnch_eo_pb, .dnch_eo_pt, .pls .side-star, .pls .side-group, .res-footer-note, .comiis_nav, .scbar_hot_td, .md_ctrl, .pls.favatar .xg1 {
	display:none !important;
}

@media (max-width:650px) {
	#postlist .favatar.pls .avatar img {
		margin:0 0 2px;
	}
	.pls .avatar img {
		background:none;
		padding:0;
		border:4px solid #ffffff
	}
	.avtm img {
		width:60px;
	}
}
.t_fsz {
	min-height:60px;
}
.pls .pi {
	text-align:center;
	padding:10px 0 0 0;
	border:none;
	overflow:visible;
}
.xw1 {
	font-size:15px;
}
textarea#fastpostmessage {
	background:none !important;
}
.pcb img {
	max-width:60%;
	margin:4px;
}
.rate {
	margin:0;
}
.ratl td {
	padding:0px;
}
.xw1 {
	font-size:12px;
	font-weight:500;
}
.xi2,.xi2 a,.xi3 a {
	color:red;
}
.toptitle_7ree td {
    border-top: 1px solid #CDCDCD;
}
.mtw {
	margin-top:0px !important;
}

#p_btn {
	padding:0px;
	margin:0 0 0 1px;
	display:flex;
	justify-content:space-evenly;
}
#scbar {
	border-top:0;
	border-bottom:0;
	background:0;
}

.pls .o li {
    margin: 0 !important;;
    height: 20px !important;;
    line-height: 20px !important;;
}

/* 左侧层主信息 */
.pls .avatar img {width: auto !important;max-height: 100px !important;}
.pls .avatar {text-align:center !important; margin: 0 !important;}
.pls .tns {padding: 0 !important;}

/* 链接点击后颜色变浅（灰白色） */
.tl th a:visited, .tl td.fn a:visited {
    color: #aaa;
}`;
        document.lastChild.appendChild(document.createElement('style')).textContent = style;
    }
})();