// ==UserScript==
// @name         智友邦论坛增强 - 自动签到、回复、清理置顶帖子
// @version      1.0.0
// @author       X.I.U
// @description  智友邦论坛自动签到、自动回复、自动清理置顶帖子
// @icon         http://bbs.zhiyoo.net/favicon.ico
// @match        *://bbs.zhiyoo.net/*
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412362
// ==/UserScript==

(function() {
    var qiandao_Redirect_URL = `http://bbs.zhiyoo.net/forum.php?mod=forumdisplay&fid=42&filter=author&orderby=dateline`; // 签到后跳转的URL
    if (location.pathname === '/plugin.php'){
        if (location.href === 'http://bbs.zhiyoo.net/plugin.php?id=dsu_paulsign:sign'){ // 如果被重定向到签到页面
            if(document.getElementById("yl"))
            {
                document.querySelector('#yl').click();
                document.querySelector('.tr3.tac div a').click();
            }
            setTimeout("location.href=qiandao_Redirect_URL", 2000); // 跳转到指定URL
        }
    }
    else if(location.pathname === '/forum.php'){
        switch(getQueryVariable("mod"))
        {
            case 'viewthread': // 浏览帖子内容，自动回复，回复过就定位到底部（隐藏内容区域）
                if (document.getElementsByClassName("locked").length > 0){
                    document.querySelector('#saya_fastreply_div div').click();
                    setTimeout("document.getElementById('fastpostsubmit').click()", 200);
                }
                setTimeout("location.hash='#footer'", 300);
                break;
            case 'forumdisplay': // 浏览帖子列表，清理置顶帖子
                var showhide = document.querySelectorAll("a.showhide.y");
                if (showhide.length > 0){
                    showhide.forEach(el=>el.click());
                }
                break;
        }
    }
})();

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}