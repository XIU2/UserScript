// ==UserScript==
// @name         吾爱破解论坛美化 - 精简多余内容
// @version      1.0.0
// @author       X.I.U
// @description  精简多余内容
// @match        *://www.52pojie.cn/*
// @icon         https://www.52pojie.cn/favicon.ico
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/412681
// ==/UserScript==

(function() {
    var style_Add = document.createElement('style');
    style_Add.innerHTML = `
a[href="connect.php?mod=config"], #toptb, #navmenu, #nv_ph, #nv, #pt .y, #chart, #online, #ft, .bm.lk, .dnch_eo_pt, .dnch_eo_pr, .dnch_eo_f, .bml, ul.xl.xl2.o.cl, dl.pil.cl, td.plc.plm .sign, .dnch_eo_pb, .dnch_eo_pt, .pls .side-star, .pls .side-group, .res-footer-note, .comiis_nav, .scbar_hot_td, .bm_h.cl, .md_ctrl, .pls.favatar .xg1 {
	display:none !important;
}
/*.wp {
	width:70%;
}*/
@media (max-width:650px) {
	#postlist .favatar.pls .avatar img {
		margin:0 0 2px;
	}
	.pls .avatar img {
		width:100px;
		height:100px;
		background:none;
		padding:0;
		border:4px solid #ffffff
	}
	.avtm img {
		width:60px;
	}
}
.pls .avatar {
	text-align:center;
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
}`;
    document.head.appendChild(style_Add);
})();