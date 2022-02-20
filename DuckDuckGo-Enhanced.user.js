// ==UserScript==
// @name         DuckDuckGo 增强
// @name:zh-CN   DuckDuckGo 增强
// @name:zh-TW   DuckDuckGo 增強
// @name:en      DuckDuckGo Enhancements
// @version      1.0.1
// @author       X.I.U
// @description  屏蔽指定域名、修复图标加载、链接不携来源、快捷回到顶部（右键两侧空白处）
// @description:zh-CN  简单有效的全网通用护眼模式（夜间模式、暗黑模式、深色模式）
// @description:zh-TW  屏蔽指定域名、修復圖標加載、鏈接不攜來源、快捷回到頂部（右鍵兩側空白處）
// @description:en  Block the specified domain name, fix icon loading, link without source, and quickly return to the top (the blank space on both sides of the right button)...
// @match        https://duckduckgo.com/*
// @icon         https://duckduckgo.com/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menu_ALL = [
        ['menu_blockDomainBtn', '显示屏蔽按钮', '显示屏蔽按钮', true],
        ['menu_blockDomain', '编辑屏蔽域名', '编辑屏蔽域名', []],
        ['menu_backToTop', '快捷回到顶部', '快捷回到顶部', true]
    ], menu_ID = [];
    for (let i=0;i<menu_ALL.length;i++){if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};}
    registerMenuCommand();

    // 注册脚本菜单
    function registerMenuCommand() {
        // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
        if (menu_ID.length > menu_ALL.length){for (let i=0;i<menu_ID.length;i++){GM_unregisterMenuCommand(menu_ID[i]);}}
        // 循环注册脚本菜单
        for (let i=0;i<menu_ALL.length;i++){
            if (menu_ALL[i][0] === 'menu_blockDomain') {
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockDomain()});
            } else {
                menu_ID[i] = GM_registerMenuCommand(`${GM_getValue(menu_ALL[i][0])?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(GM_getValue(menu_ALL[i][0]), menu_ALL[i][0], menu_ALL[i][2])});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true}); GM_openInTab('https://greasyfork.org/zh-CN/scripts/436428/feedback', {active: true,insert: true,setParent: true});});
    }

    // 菜单开关
    function menu_switch(Status, Name, Tips) {
        if (Status == true) {GM_setValue(Name, false); GM_notification({text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});} else {GM_setValue(Name, true); GM_notification({text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});}
        registerMenuCommand();
    };


    document.documentElement.appendChild(document.createElement('style')).textContent = '.blockDomainBtn {padding: 0 8px !important; font-size: 12px !important; line-height: normal !important; margin-left: 10px !important; border-radius: 3px !important; vertical-align: top !important; opacity: 0.4 !important; top: 3px; cursor: cell;} .result.result--sep--hr {display: none;}';
    mutationObserver(); // 屏蔽指定域名 + 修复图标加载 + 链接不携来源
    backToTop(); //        快捷回到顶部


    // 自定义屏蔽指定域名
    function customBlockDomain() {
        let nowBlockDomain = '';
        GM_getValue('menu_blockDomain').forEach(function(item){nowBlockDomain += '|' + item})
        let newBlockDomain = prompt('编辑 [屏蔽指定域名]\n（不同域名之间使用 "|" 分隔，例如：a.com|b.com|c.com ）', nowBlockDomain.replace('|',''));
        if (newBlockDomain === '') {
            GM_setValue('menu_blockDomain', []);
            registerMenuCommand();
        } else if (newBlockDomain != null) {
            GM_setValue('menu_blockDomain', newBlockDomain.split('|'));
            registerMenuCommand();
        }
    }


    // 屏蔽指定域名 + 修复图标加载 + 链接不携来源
    function mutationObserver() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) break

                    // 屏蔽指定域名
                    if (target.dataset.domain && checkDomain(target.dataset.domain)) {target.remove(); break;}

                    // 修复图标加载
                    let img = target.querySelector('img.result__icon__img[data-src]'); // 寻找图标元素
                    if (img && !img.src) img.src = img.dataset.src

                    // 链接不携来源
                    addRel(target);

                    // 添加屏蔽按钮
                    addBlockDomainBtn(target, target.dataset.domain);
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }


    // 检查域名是否存在黑名单中
    function checkDomain(domain) {
        let blockDomain = GM_getValue('menu_blockDomain');
        for (let i=0; i<blockDomain.length; i++) {
            if (domain === blockDomain[i]) return true
        }
        return false
    }


    // 添加 rel 属性
    function addRel(doc) {
        doc.querySelectorAll('a').forEach(function(one){one.rel = 'noreferrer noopener nofollow'})
    }


    // 添加屏蔽按钮
    function addBlockDomainBtn(doc, domain) {
        if (!GM_getValue('menu_blockDomainBtn')) return
        let toElement = doc.querySelector('a.result__url');
        if (toElement) {
            toElement.insertAdjacentHTML('afterend', `<button class="btn blockDomainBtn" data-domain="${domain}" title="点击在搜索结果中屏蔽 [ ${domain} ] 域名">屏蔽</button>`);
            doc.querySelector('button.blockDomainBtn').addEventListener('click', function(e) {
                e.stopPropagation();
                // 追加屏蔽域名
                let blockDomain = GM_getValue('menu_blockDomain');
                blockDomain.push(e.target.dataset.domain)
                GM_setValue('menu_blockDomain', blockDomain);
                // 隐藏该域名的所有搜索结果
                document.querySelectorAll(`#links > div[data-domain="${e.target.dataset.domain}"]`).forEach(function(one){one.style.display = 'none'})
            });
        }
    }


    // 快捷回到顶部（右键两侧空白处）
    function backToTop() {
        if (!GM_getValue('menu_backToTop')) return
        document.querySelectorAll('#web_content_wrapper, #web_content_wrapper > .cw, #links_wrapper').forEach(ele => {
            ele.oncontextmenu = function(e) {
                if (e.target == this) {
                    e.preventDefault();
                    window.scrollTo(0,0);
                }
            }
        })
    }
})();