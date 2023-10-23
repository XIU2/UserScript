// ==UserScript==
// @name         Ping.Sx 增强
// @version      1.0.2
// @author       X.I.U
// @description  一键复制所有 IP、清理 IP 链接（点击复制而不是跳转）、快捷回到顶部（右键两侧空白处）
// @match        https://ping.sx/ping*
// @match        https://ping.sx/dig*
// @match        https://ping.sx/check-port*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD7klEQVR4nO3WWYxfcxQH8M9//LWzdJuWaVMaI6WKKtKOfacVGuHFgy3E8iARDyKWBBEJ8SC2Jy9EeKCSqpoiBJF22k6JbdBqqqilqe4z05ol0xkP5/zz/6dPY3iQuN/kl3vv755z7lm+5/wuBQoUKFCgQIECBQoU+L+iNAb5OpRzHY5xGI8D2PMPfKlDK+qxNe2NyqHa+4k4EkdgWq6paM41GZNSrilXQ16/wE3YN8YAjsKKtH0NNo5GqVxzP6Ia9QHsQmM63IAJuSZmIBPS8UZMwfcYGKPzMA/z8Sl+G61SbQDzcbkoXxmnp7GVeX8+hrEM36bOqamzMeWm4rq0tRefYD36MRsXCJqMYAPeR3faOltQshO9KXsW9uMtQdMLU7+E7/BRbTBPpeEe/Jn33ViKP/J5BOsEzeCZ3HtEcPcVDGIH+kRPLEnZJ1J2qOb6XCarPoM5iGtxI7annTszsMcO0R9M3xC0WJ0vlmYWO/N5G+7Go5nJ3ThF0GetoM0loko9mdk2XIr7RR9VMnxr7j+QtjahBcfjd+zES5m4Llym2qdn1ujfJ2g+WJcvW3EifsFDeE2VJi/jedFg/Wl8D47DXEG5DZmR/YIqD4vp9HQGPCODPg1Xir4ZTCf6cn+6oODN6fQ9+DCTOF3QsqLfVPM9cEsKLhMlnSSoMoBFKXNDyqwQI+/2fH4dh+Xe9fhaUKE3ZZrxdn5wdcr/kLovpu1n87lX9M4w7sh3zVie+h2pvznl36vLaM9J4bWCY7NxAn4WzQLn1sgM47x8XpPGFuf9ItEbE3Bx6l2Bz3F1BtVVo9sk6HEQD+KF9OmqTGab6KMvU/82fJX6H5cFBxeKxl2fL9oy8g9EMzXjDEGhdYLXCzNjnWJCvSro0iHoNSLOhv5MSivuzeQsSdnPBP/niqq8gTm4S/TMSZn5IRyT+q0Z3G6sqRMTZSfaVQ+PyWm8PbM9TZwL7VmRlgysXZSzC4+nzOJ8/6RoyHWCIt1Zne25144tgt+bxKjcjW/wJn7MRHSKiu5L/R2pvxIbS2KEjUvHh7Js48Xo6s3KlEXjDefqFw03oNpIpdSbkjK7BC1KqoddT8rX57s+1V+RQdWDsCG/Wdkr5/cGD9UviTlbOUxmZ4bGZRa3pbMV1Gd1urAgHdibH+zI/Rli/M0SFW0SvyZb8I6g1r+GsuBfC37CTNFYU9OZNtHg9aIfmvCrKOVMUeZ5YhwuF9meg2MzkJPFaF4lqNdolD9po0UJF4msNIlG6UiHN4vZXemBVeK3oXK4VUZnhQaz8K74KWsRFDo6ZRekva25/nOoE9T6u7/nBQoUKFCgQIECBQoUKDBm/AXKhRvkgr+Z+wAAAABJRU5ErkJggg==
// @grant        GM_setClipboard
// @grant        window.onurlchange
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('urlchange', function() {addCopyButton(); cleanLinks(); backToTop();});

    setTimeout(addCopyButton, 2000); // 添加复制按钮
    setTimeout(cleanLinks, 2000); //    清理链接（可以直接点击复制单个 IP）
    setTimeout(backToTop, 2000); //     快捷回到顶部（右键左右两侧空白处）


    // 添加复制按钮
    function addCopyButton() {
        if (document.querySelector('#copy_233, #copynocn_233')) return
        // 复制全部
        let _copy = `<li><a title="复制当前页面下的所有 IP 地址到剪切板" class="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out" href="javascript:void(0);" title="一键复制所有 IP" id="copy_233">Copy</a></li>`
        document.querySelector('header ul').insertAdjacentHTML('afterbegin', _copy);

        // 复制非 CN 的 IP
        let _copyNoCn = `<li><a title="复制当前页面下的所有 IP 地址（国内除外）到剪切板" class="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out" href="javascript:void(0);" title="一键复制非 CN IP" id="copynocn_233">Copy<del><em>(Cn)</em></del></a></li>`
        document.querySelector('header ul').insertAdjacentHTML('afterbegin', _copyNoCn);

        document.getElementById('copy_233').addEventListener('click', addCopyButtonEvent1)
        document.getElementById('copynocn_233').addEventListener('click', addCopyButtonEvent2)
    }


    // 复制按钮点击事件
    function addCopyButtonEvent1() {
        let ip = new Array();
        document.querySelectorAll('span.select-all > a[href]').forEach(function(_this) {ip.push(_this.innerText);})
        if (ip.length > 0) GM_setClipboard(unique(ip).toString().replaceAll(',','\n'), 'text');
    }
    function addCopyButtonEvent2() {
        let ip = new Array();
        document.querySelectorAll('span.select-all > a[href]').forEach(function(_this) {
            let img = findParentElement(_this, 'TR').querySelector('img.max-w-none');
            if (img) {if (img.alt != 'CN Flag') ip.push(_this.innerText);}
        })
        if (ip.length > 0) GM_setClipboard(unique(ip).toString().replaceAll(',','\n'), 'text');
    }


    // 清理链接（可以直接点击复制单个 IP）
    function cleanLinks() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.tagName === 'TD' && target.className.indexOf('w-4/12') > -1) {
                        target.querySelectorAll('span.select-all > a[href]').forEach(function(_this) {
                            _this.href = 'javascript:void(0);';
                            _this.target = '_self';
                        })
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }


    // 快捷回到顶部（右键左右两侧空白处）
    function backToTop() {
        document.querySelector('section.relative').oncontextmenu = function(e){
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