// ==UserScript==
// @name         智友邦论坛美化
// @version      1.0.0
// @author       X.I.U
// @description  精简多余内容、宽屏显示
// @icon         http://bbs.zhiyoo.net/favicon.ico
// @match        *://bbs.zhiyoo.net/*
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/412361
// ==/UserScript==

(function() {
    var style_Add = document.createElement('style');
    style_Add.innerHTML = `
.forum_top,#main_sidebar,.drag,.nav,.tps,.bm.bml,.ct2 .sd,.mn div.box.cl:nth-of-type(3),#f_pst,.plc.plm,#diy_like1,#hm_qrcode_main,#ft,.po.bbd.reply_p,.ft_top.cl,div a[href="https://weibo.com/372458419"] {
	display: none;
}
.ct2 .mn,#wp .forum-left,#thread_types1 {
	width: auto;
}
#footer {
    height: 0 !important;
    margin: 0 !important;
}
#thread_subject {
	font-size: 19px !important;
}
.locked a {
	color: #ffffff;
	border: 1px dashed #ffffff;
	padding: 0 5px 3px;
	margin: 0 5px;
	font-size: 20px;
	background-color: #e24e72;
}
#postlist .pcb img {
	max-width: 30%;
}`;
    document.head.appendChild(style_Add);
})();