// ==UserScript==
// @name         吾爱破解论坛增强 - 自动签到、翻页
// @version      1.0.5
// @author       X.I.U
// @description  吾爱破解论坛自动签到、自动翻页
// @match        *://www.52pojie.cn/*
// @icon         https://www.52pojie.cn/favicon.ico
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412680
// ==/UserScript==

(function() {
    qianDaoBack();
    qianDao();
    pageLoading();

    // 自动签到
    function qianDao() {
        var qiandao = document.querySelector('#um p:last-child a:first-child');
        if (qiandao){
            if(qiandao.href === "https://www.52pojie.cn/home.php?mod=task&do=apply&id=2")
            {
                qiandao.click();
            }
        }
    }

    // 签到后立即返回
    function qianDaoBack() {
        var qiandaoback = document.querySelector('#messagetext p.alert_btnleft a');
        if (qiandaoback){
            if(location.href === "https://www.52pojie.cn/home.php?mod=task&do=draw&id=2")
            {
                qiandaoback.click();
            }
        }
    }

    // 自动翻页
    function pageLoading() {
        var patt1 = /\/forum-\d+-\d+\.html/
        var patt2 = /mod\=forumdisplay/
        if (patt1.test(location.pathname) || patt2.test(location.search)){
            windowScroll(function (direction, e) {
                if (direction === "down") { // 下滑才准备翻页
                    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    let scrollDelta = 666;
                    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + scrollTop + scrollDelta) {
                        var autopbn = document.querySelector('#autopbn');
                        if (autopbn && autopbn.innerText == "下一页 »"){ // 如果已经在加载中了，就忽略
                            autopbn.click();
                        }
                    }
                }
            });
        }
    }

    // 滚动条事件
    function windowScroll(fn1) {
        var beforeScrollTop = document.documentElement.scrollTop,
            fn = fn1 || function () {};
        setTimeout(function () { // 延时执行，避免刚载入到页面就触发翻页事件
            window.addEventListener("scroll", function (e) {
                var afterScrollTop = document.documentElement.scrollTop,
                    delta = afterScrollTop - beforeScrollTop;
                if (delta == 0) return false;
                fn(delta > 0 ? "down" : "up", e);
                beforeScrollTop = afterScrollTop;
            }, false);
        }, 1000)
    }
})();