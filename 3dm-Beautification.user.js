// ==UserScript==
// @name         3DM论坛美化
// @version      1.0.2
// @author       X.I.U
// @description  精简多余内容、样式优化
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC0klEQVR4nJ1TS0hUYRT+/nuvd2Z0nMbRrpPpTJozoZliQmEFFkT0QlwIRWlUi4jIaFGLqE0ELlsEElGrGCKimhaVVmhW9CBSy5ohk/I1pvO66R3nOt7X30IxoyTog8OBc/i+83EOB1gEoRP8Yq3fQP5WvHxqW7kkKfkmXgx+D3PCmjLLuPYmNXyotevfAud9XhQEHZtLKpe3uAozS+12MyRJRTSc7O7tCp9uOPe0Y1GBGAUeXdiyc8vuIr8gmHgQgFACSgwQg0L8oWtP7w3s2Z/vvKse9v0pcLup3FpWV97v8S5xElBMz2hgGIKRgQRcRZmYljVEo4r45E5gVVmtMNH3UC3ifvOfZ693OC3OB50jUFRAkjTIsoqjB7xo7YhgaERChpU4isuXHUsNs+Km7Y5K8rl1L2/PHld8gSFUa6V+r6TXhWMzMNW4EArFQCMRGNMywLFgLOnIXZoD0/PIuHXfSnvUwHUuqTNdJJFvW5+WfSs3z7TVnJiB25WJyXQNjpwl0LJXQVM4ECLDYorDXWJDPM/qzPJmYaxbjHBQlFfFlc4jqZRyyr3aDgYABYXJXIFl6esAws7vm1IFRvIteOktDB0IDYg9zMfP4ZbhwamUp2SWDBBQvhhsxgYQwoEBAQOAAQVD0sBaN0JPc6O/XwoyRk4bE+tLGmJUluSkDk2nSKVUwLIGhC48EQFAQOYyNa99FUiMVQ1Vt8kkPhHnfCd3OYXCjKYCj+0gz0Oo2nEGhDHNEX7BAKAbFIFnzxsrdzb5AIDJsmWh8eK9cUvDjrOv28dqCEsGDarOTgLmwwCgaho+vHx5M3i1+ca8N0opBwDJxAzux9/hffMlW3WF7cqKQk+9RXCBsCx0g079+BpgRjv9Zvtqwb31eHtooQADALquYzQmom/yGnofqzb3txe1kw6PKEOYoBmsbKaKmVeT6SNJ9kvPp68xv98v//FZ/4OfGzYzfKjarqcAAAAASUVORK5CYII=
// @match        *://bbs.3dmgame.com/*
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/413593
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    let style_Add = document.createElement('style');
    style_Add.innerHTML = `
[url=home.php?mod=space&uid=945662]@media[/url] (min-width:1366px) {
	body {
		background: none;
	}
	.wp {
		width: 70%;
	}
}
@media (max-width:650px) {
	#postlist .favatar.pls .avatar img {
		margin: 0 0 2px;
	}
}
#toptb, .dnch_eo_pt,.dnch_eo_pr, .dnch_eo_f, .bml, dl.pil.cl, td.plc.plm .sign, .dnch_eo_pb,.dnch_eo_pt, .pls .side-star, .pls .side-group, div#h_nv, .res-footer-note, a>img[border="0"].zoom, .md_ctrl, .pls.favatar .xg1, .wp.a_h, .hd_table, .a_cn, .wp.a_f, .bm.lk, .a_pt {
	display: none !important;
}
.pls .avatar img {
	width: 100px;
	height: 100px;
	background: none;
	padding: 0;
	border: 4px solid #ffffff
}
.avtm img {
	width: 60px;
}
.pls .avatar {
	text-align: center;
}
.t_fsz {
	min-height: 60px;
}
.pls .pi {
	text-align: center;
	padding: 10px 0 0 0;
	border: none;
	overflow: visible;
}
.xw1 {
	font-size: 15px;
}
textarea#fastpostmessage {
	background: none !important;
}
.pcb img {
	max-width: 60%;
	margin: 4px;
}
.rate {
	margin: 0;
}
.ratl td {
	padding: 0px;
}
.xw1 {
	font-size: 12px;
	font-weight: 500;
}
.xi2,.xi2 a,.xi3 a {
	color: red;
}
.mtw {
	margin-top: 0px !important;
}
#p_btn {
	padding: 0px;
	margin: 0 0 0 1px;
	display: flex;
	justify-content: space-evenly;
}
#scbar {
	border-top: 0;
	border-bottom: 0;
}`;
    if (document.head) {
        document.head.appendChild(style_Add);
    } else {
        let timer = setInterval(function(){
            if (document.head) {
                document.head.appendChild(style_Add);
                clearInterval(timer);
            }
        });
    }
})();