// ==UserScript==
// @name         DuckDuckGo 增强
// @name:zh-CN   DuckDuckGo 增强
// @name:zh-TW   DuckDuckGo 增強
// @name:en      DuckDuckGo Enhancements
// @version      1.0.5
// @author       X.I.U
// @description  屏蔽指定域名、链接不携来源、快捷回到顶部（右键两侧空白处）
// @description:zh-CN  屏蔽指定域名、链接不携来源、快捷回到顶部（右键两侧空白处）
// @description:zh-TW  屏蔽指定域名、鏈接不攜來源、快捷回到頂部（右鍵兩側空白處）
// @description:en  Block the specified domain name, link without source, and quickly return to the top (the blank space on both sides of the right button)...
// @match        https://duckduckgo.com/*
// @icon         data:image/png;base64,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
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-idle
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


    document.documentElement.appendChild(document.createElement('style')).textContent = `
.blockDomainBtn {padding: 0 6px !important; font-size: 12px !important; line-height: normal !important; margin-left: 6px !important; border-radius: 3px !important; vertical-align: top !important; opacity: 0.4 !important; top: 3px; cursor: cell;}
li[data-layout=organic]>div[arial-label] {display: none;}
a[data-testid="result-title-a"]{display: inline-block}`
    mutationObserver(); // 屏蔽指定域名 链接不携来源
    setTimeout(backToTop, 500); //        快捷回到顶部


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


    // 屏蔽指定域名 链接不携来源
    function mutationObserver() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) break
                    // 屏蔽指定域名
                    if (target.tagName == 'LI' && target.dataset.layout == 'organic') {
                        Process(target)
                    } else if (target.tagName == 'OL' && target.className == 'react-results--main') {
                        target.childNodes.forEach(li=>{Process(li);})
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });

        function Process(target) {
            const a = target.querySelector('h2>a,a[data-testid=result-title-a]')
            if (a) {
                if (checkDomain(a.href.split('/')[2])) {
                    target.hidden = true
                } else {
                    // 链接不携来源
                    addRel(target);

                    // 添加屏蔽按钮
                    addBlockDomainBtn(target, a, a.href.split('/')[2]);
                }
            }
        }
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
    function addBlockDomainBtn(doc, toElement, domain) {
        if (!GM_getValue('menu_blockDomainBtn')) return
        if (toElement && !doc.querySelector('button.blockDomainBtn')) {
            toElement.insertAdjacentHTML('afterend', `<button class="btn blockDomainBtn" data-domain="${domain}" title="点击在搜索结果中屏蔽 [ ${domain} ] 域名">屏蔽</button>`);
            doc.querySelector('button.blockDomainBtn').addEventListener('click', function(e) {
                e.stopPropagation();
                // 追加屏蔽域名
                let blockDomain = GM_getValue('menu_blockDomain');
                blockDomain.push(e.target.dataset.domain)
                GM_setValue('menu_blockDomain', blockDomain);
                // 隐藏该域名的所有搜索结果
                document.querySelectorAll(`button[data-domain="${e.target.dataset.domain}"].blockDomainBtn`).forEach(function(one){one.parentElement.parentElement.parentElement.parentElement.remove();})
            });
        }
    }


    // 快捷回到顶部（右键两侧空白处）
    function backToTop() {
        if (!GM_getValue('menu_backToTop')) return
        document.querySelectorAll('#react-layout>div, #react-layout>div>div, section[data-testid=sidebar]').forEach(ele => {
            ele.oncontextmenu = function(e) {
                if (e.target == this) {
                    e.preventDefault();
                    window.scrollTo(0,0);
                }
            }
        })
    }
})();