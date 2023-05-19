// ==UserScript==
// @name         吾爱破解论坛美化
// @version      1.0.9
// @author       X.I.U
// @description  精简多余内容、样式优化
// @match        *://www.52pojie.cn/*
// @icon         data:image/png;base64,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
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