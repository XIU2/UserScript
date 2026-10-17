// ==UserScript==
// @name         Ping.Sx enhancement
// @name:zh-CN   Ping.Sx 增强
// @name:zh-TW   Ping.Sx 增強
// @version      1.0.4
// @author       X.I.U
// @description  Copy all IPs with one click, clean IP links (click Copy instead of Jump), and quickly go back to the top (blank space on both sides of the right click).
// @description:zh-CN  一键复制所有 IP、快捷回到顶部（右键两侧空白处）
// @description:zh-TW  一鍵複製所有 IP、快捷回到頂部（右鍵兩側空白處）
// @match        https://ping.sx/ping*
// @match        https://ping.sx/dig*
// @match        https://ping.sx/check-port*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD7klEQVR4nO3WWYxfcxQH8M9//LWzdJuWaVMaI6WKKtKOfacVGuHFgy3E8iARDyKWBBEJ8SC2Jy9EeKCSqpoiBJF22k6JbdBqqqilqe4z05ol0xkP5/zz/6dPY3iQuN/kl3vv755z7lm+5/wuBQoUKFCgQIECBQoU+L+iNAb5OpRzHY5xGI8D2PMPfKlDK+qxNe2NyqHa+4k4EkdgWq6paM41GZNSrilXQ16/wE3YN8YAjsKKtH0NNo5GqVxzP6Ia9QHsQmM63IAJuSZmIBPS8UZMwfcYGKPzMA/z8Sl+G61SbQDzcbkoXxmnp7GVeX8+hrEM36bOqamzMeWm4rq0tRefYD36MRsXCJqMYAPeR3faOltQshO9KXsW9uMtQdMLU7+E7/BRbTBPpeEe/Jn33ViKP/J5BOsEzeCZ3HtEcPcVDGIH+kRPLEnZJ1J2qOb6XCarPoM5iGtxI7annTszsMcO0R9M3xC0WJ0vlmYWO/N5G+7Go5nJ3ThF0GetoM0loko9mdk2XIr7RR9VMnxr7j+QtjahBcfjd+zES5m4Llym2qdn1ujfJ2g+WJcvW3EifsFDeE2VJi/jedFg/Wl8D47DXEG5DZmR/YIqD4vp9HQGPCODPg1Xir4ZTCf6cn+6oODN6fQ9+DCTOF3QsqLfVPM9cEsKLhMlnSSoMoBFKXNDyqwQI+/2fH4dh+Xe9fhaUKE3ZZrxdn5wdcr/kLovpu1n87lX9M4w7sh3zVie+h2pvznl36vLaM9J4bWCY7NxAn4WzQLn1sgM47x8XpPGFuf9ItEbE3Bx6l2Bz3F1BtVVo9sk6HEQD+KF9OmqTGab6KMvU/82fJX6H5cFBxeKxl2fL9oy8g9EMzXjDEGhdYLXCzNjnWJCvSro0iHoNSLOhv5MSivuzeQsSdnPBP/niqq8gTm4S/TMSZn5IRyT+q0Z3G6sqRMTZSfaVQ+PyWm8PbM9TZwL7VmRlgysXZSzC4+nzOJ8/6RoyHWCIt1Zne25144tgt+bxKjcjW/wJn7MRHSKiu5L/R2pvxIbS2KEjUvHh7Js48Xo6s3KlEXjDefqFw03oNpIpdSbkjK7BC1KqoddT8rX57s+1V+RQdWDsCG/Wdkr5/cGD9UviTlbOUxmZ4bGZRa3pbMV1Gd1urAgHdibH+zI/Rli/M0SFW0SvyZb8I6g1r+GsuBfC37CTNFYU9OZNtHg9aIfmvCrKOVMUeZ5YhwuF9meg2MzkJPFaF4lqNdolD9po0UJF4msNIlG6UiHN4vZXemBVeK3oXK4VUZnhQaz8K74KWsRFDo6ZRekva25/nOoE9T6u7/nBQoUKFCgQIECBQoUKDBm/AXKhRvkgr+Z+wAAAABJRU5ErkJggg==
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        window.onurlchange
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    // 注册脚本菜单
    let menu_separator_ID;
    if (GM_getValue('menu_separator') == null){GM_setValue('menu_separator', true)};
    registerMenuCommand();
    function registerMenuCommand() {
        if (menu_separator_ID) GM_unregisterMenuCommand(menu_separator_ID);
        menu_separator_ID = GM_registerMenuCommand(`🔁 当前复制 IP 分隔方式为：${GM_getValue('menu_separator')?'[一行一个]':'[逗号分隔]'}`, function(){GM_setValue('menu_separator', !GM_getValue('menu_separator'));registerMenuCommand();}, {title: '点击可切换：当前复制 IP 的分隔方式为 [一行一个](默认) 或 [逗号分隔]，切换后立即生效。'})
    }
    // 站长之家
    // let ip = new Array(); document.querySelectorAll('[name=ip]>a').forEach(function(_this) {ip.push(_this.innerText);});console.log(Array.from(new Set(ip)).sort().toString().replaceAll(',','\n'))

    window.addEventListener('urlchange', function() {addCopyButton(); /*cleanLinks();*/ backToTop();});

    setTimeout(addCopyButton, 2000); // 添加复制按钮
    //setTimeout(cleanLinks, 2000); //    清理链接（可以直接点击复制单个 IP）
    setTimeout(backToTop, 2000); //     快捷回到顶部（右键左右两侧空白处）


    // 添加复制按钮
    function addCopyButton() {
        if (document.querySelector('#copy_233, #copynocn_233')) return
        const aa = `
        <style>/* ---------- 右下角悬浮按钮容器 ---------- */
        .floating-actions {
            position: fixed;
            bottom: 75px;
            right: 7px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            z-index: 99999;
            align-items: center;
            /* 让按钮在容器中居中（水平方向） */;
        }

        /* ---------- 单个按钮样式 ---------- */
        .floating-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border: 1px solid var(--border);
            background: var(--card);
            color: #ffffff;
            font-size: 14px;
            cursor: pointer;
            box-shadow:0 6px 20px rgba(26, 47, 78, 0.30),0 2px 6px rgba(0, 0, 0, 0.08);
            transition:transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),background 0.25s ease,box-shadow 0.25s ease;
            text-decoration: none;
            position: relative;
            /* 为 tooltip 定位 */;
        }

        /* 按钮悬停效果 */
        .floating-btn:hover {
            background: var(--accent-border);
            box-shadow:0 10px 28px rgba(26, 47, 78, 0.40),0 4px 10px rgba(0, 0, 0, 0.10);
        }

        /* 按钮点击反馈 */
        .floating-btn:active {
            transform: scale(0.92) translateY(0px);
            box-shadow: 0 4px 12px rgba(26, 47, 78, 0.25);
        }
        /* ---------- 悬浮提示 (Tooltip) ---------- */
        .floating-btn .tooltip {
            position: absolute;
            right: 68px;
            /* 在按钮左侧露出 */
            top: 50%;
            transform: translateY(-50%) scale(0.92);
            background: rgba(10, 20, 35, 0.88);
            backdrop-filter: blur(6px);
            color: #f0f4fe;
            padding: 6px 16px;
            border-radius: 40px;
            font-size: 0.82rem;
            font-weight: 500;
            white-space: nowrap;
            letter-spacing: 0.3px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.20);
            border: 1px solid rgba(255, 255, 255, 0.08);
            opacity: 0;
            pointer-events: none;
            transition:opacity 0.2s ease,transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-origin: right center;
        }

        /* 悬停时显示 tooltip */
        .floating-btn:hover .tooltip {
            opacity: 1;
            transform: translateY(-50%) scale(1);
        }
        </style>
        <div class="floating-actions">
        <button class="floating-btn" id="copy_233" aria-label="一键复制所有 IP">
            Copy
            <span class="tooltip">一键复制所有 IP</span>
        </button>
        <button class="floating-btn" id="copynocn_233" aria-label="一键复制所有 IP (国内除外)">
            Copy
            <del><em>(Cn)</em></del>
            <span class="tooltip">一键复制所有 IP (国内除外)</span>
        </button>
        </div>`
        document.body.insertAdjacentHTML('beforeend', aa);
        // 复制全部
        //document.querySelector('header nav.tool-navigation').insertAdjacentHTML('beforeend', `<a title="复制当前页面下的所有 IP 地址到剪切板" style="gap: unset;font-weight: bold;" class="tool-navigation-link" href="javascript:void(0);" title="一键复制所有 IP" id="copy_233">Copy</a></li>`);
        // 复制非 CN 的 IP
        //document.querySelector('header nav.tool-navigation').insertAdjacentHTML('beforeend', `<a title="复制当前页面下的所有 IP 地址（国内除外）到剪切板" style="gap: unset;font-weight: bold;" class="tool-navigation-link" href="javascript:void(0);" title="一键复制非 CN IP" id="copynocn_233">Copy<del><em>(Cn)</em></del></a></li>`);
        document.getElementById('copy_233').addEventListener('click', addCopyButtonEvent1)
        document.getElementById('copynocn_233').addEventListener('click', addCopyButtonEvent2)
    }


    // 复制按钮点击事件
    function addCopyButtonEvent1() {
        let ip = new Array();
        document.querySelectorAll('tbody span.dns-value > a[href]').forEach(function(_this) {ip.push(_this.innerText);})
        if (ip.length > 0) {
            if (GM_getValue('menu_separator')) {
                GM_setClipboard(unique(ip).toString().replaceAll(',','\n'), 'text');
            } else {
                GM_setClipboard(unique(ip).toString(), 'text');
            }
        }
    }
    function addCopyButtonEvent2() {
        let ip = new Array();
        document.querySelectorAll('tbody span.dns-value > a[href]').forEach(function(_this) {
            let img = findParentElement(_this, 'TR').querySelector('img');
            if (img) {if (img.alt != 'China') ip.push(_this.innerText);}
        })
        if (ip.length > 0) {
            if (GM_getValue('menu_separator')) {
                GM_setClipboard(unique(ip).toString().replaceAll(',','\n'), 'text');
            } else {
                GM_setClipboard(unique(ip).toString(), 'text');
            }
        }
    }


    // 清理链接（可以直接点击复制单个 IP）
    /*function cleanLinks() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    console.log(target)
                    if (target.tagName === 'DIV' && target.className === 'dns-answer-line') {
                        target.querySelectorAll('span.dns-value > a[href]').forEach(function(_this) {
                            _this.href = 'javascript:void(0);';
                            _this.target = '_self';
                        })
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }*/


    // 快捷回到顶部（右键左右两侧空白处）
    function backToTop() {
        document.querySelector('main#main-content').oncontextmenu = function(e){
            if (e.target == this) {
                e.preventDefault();
                window.scrollTo(0,0);
            }
        }
    }


    // 数组去重复
    function unique(arr) {
        return Array.from(new Set(arr)).sort();
    }


    // 寻找父元素
    function findParentElement(item, tagName) {
        if (item.parentElement) {
            //console.log(item.parentElement)
            if (item.parentElement.tagName === tagName) {
                return item.parentElement;
            } else {
                let temp = findParentElement(item.parentElement, tagName)
                if (temp) return temp
            }
        }
        return
    }


    // 自动格式化输入框
    /*document.getElementById('target').addEventListener('focusout', function(){
        if (this.value) {
            this.value = this.value.replace(/(http:\/\/|https:\/\/|\:.+|\/.*)/ig,"");
            this.setAttribute('value',this.value);
            this.dispatchEvent(new Event('input'));
        }
    }, true);*/
})();