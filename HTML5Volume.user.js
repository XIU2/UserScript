// ==UserScript==
// @name         HTML5 Video Audio Default Volume
// @name:zh-CN   HTML5 视频音频默认音量
// @name:zh-TW   HTML5 視訊音訊預設音量
// @name:ru      Громкость аудио-видео в формате HTML5 по умолчанию
// @version      1.0.4
// @author       X.I.U
// @description  Avoid being startled by some video/audio with default 100% volume! And support each website to remember the volume separately...
// @description:zh-CN  避免被一些默认 100% 音量的视频/音频吓一跳（或社死）！且支持各网站分别记住音量...
// @description:zh-TW  避免被一些預設 100% 音量的視訊/音訊嚇一跳（或社死）！且支援各網站分別記住音量...
// @description:ru  Больше не пугайтесь при просмотре видео или прослушивании аудио со стандартной громкостью 100%! Так ещё каждый веб-сайт запоминает громкость отдельно...
// @match        *://*/*
// @icon         data:image/png;base64,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
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menu_ID = [];
    registerMenuCommand(); // 注册脚本菜单
    function registerMenuCommand() {
        if (self != top) return
        // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
        if (menu_ID.length > 0){for (let i=0;i<menu_ID.length;i++){GM_unregisterMenuCommand(menu_ID[i]);}}
        menu_ID[0] = GM_registerMenuCommand('#️⃣ 修改全局默认音量 [ ' + GM_getValue('menu_defaultVolume', 30) + '% ]', function(){customDefaultVolume()});
        let nowVolume = ' (跟随全局)'
        if (localStorage.getItem('html5_xiu_currentVolume')) nowVolume = ' [ ' + parseInt(localStorage.getItem('html5_xiu_currentVolume')) + '% ]'
        menu_ID[1] = GM_registerMenuCommand('🔁 忘记当前网站音量' + nowVolume, function(){resetCurrentVolume()});
        // 强制当前网站使用全局音量（针对部分不支持调节音量的网站）
        if (menu_forcedToEnable('check')) { // 当前网站是否已存在强制列表中
            menu_ID[2] = GM_registerMenuCommand('✅ 已强制当前网站使用全局音量 (针对不支持调节音量的)', function(){menu_forcedToEnable('del')});
            menu_ID[4] = GM_registerMenuCommand('#️⃣ 修改当前网站默认音量 (针对不支持调节音量的)', function(){customCurrentDefaultVolume()});
        } else {
            menu_ID[2] = GM_registerMenuCommand('❌ 未强制当前网站使用全局音量 (针对不支持调节音量的)', function(){menu_forcedToEnable('add')});
        }
        menu_ID[3] = GM_registerMenuCommand('💬 反馈 & 建议', function () {GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true}); GM_openInTab('https://greasyfork.org/zh-CN/scripts/438400/feedback', {active: true,insert: true,setParent: true});});
    }

    insPage();
    currentPage();

    // 强制当前网站使用全局音量（针对部分不支持调节音量的网站）
    function menu_forcedToEnable(type) {
        switch(type) {
            case 'check':
                if(check()) return true
                return false
                break;
            case 'add':
                add();
                break;
            case 'del':
                del();
                break;
        }

        function check() { // 存在返回真，不存在返回假
            let websiteList = GM_getValue('menu_forcedToEnable',[]); // 读取网站列表
            if (websiteList.indexOf(location.host) === -1) return false // 不存在返回假
            return true
        }

        function add() {
            if (check()) return
            let websiteList = GM_getValue('menu_forcedToEnable',[]); // 读取网站列表
            websiteList.push(location.host); // 追加网站域名
            GM_setValue('menu_forcedToEnable', websiteList); // 写入配置
            location.reload(); // 刷新网页
        }

        function del() {
            if (!check()) return
            let websiteList = GM_getValue('menu_forcedToEnable',[]), // 读取网站列表
            index = websiteList.indexOf(location.host);
            websiteList.splice(index, 1); // 删除网站域名
            GM_setValue('menu_forcedToEnable', websiteList); // 写入配置
            location.reload(); // 刷新网页
        }
    }


    // 网页本身的 Video Audio 标签
    function currentPage() {
        document.querySelectorAll('video, audio').forEach(function(_this){
            //console.log('网页本身：', _this)
            isFirstEvent(_this)
        })
    }


    // 后续动态插入的 Video Audio 标签（插入事件）
    function insPage() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) break
                    //console.log('所有插入：', target)
                    if (target.tagName === 'VIDEO' || target.tagName === 'AUDIO') {
                        //console.log('后续插入1：', target)
                        isFirstEvent(target)
                    } else if (target.tagName === 'DIV') {
                        target.querySelectorAll('video, audio').forEach(function(_this){
                            //console.log('后续插入2：', _this)
                            isFirstEvent(_this)
                        })
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }


    // 音量变化事件（记住音量）
    function volumeChangeEvent(event) {
        if (event.target.muted) { // 判断是否静音
            localStorage.setItem('html5_xiu_currentVolume', 0)
            registerMenuCommand(); // 修改脚本菜单
        } else if (localStorage.getItem('html5_xiu_currentVolume') || ((event.target.volume * 100) !== GM_getValue('menu_defaultVolume', 30))) {
            localStorage.setItem('html5_xiu_currentVolume', event.target.volume * 100)
            registerMenuCommand(); // 修改脚本菜单
        }
    }


    // 判断该视频/音频元素是否已监听事件
    function isFirstEvent(target) {
        if (!menu_forcedToEnable('check')) { // 如果未强制当前网站使用全局音量（针对部分不支持调节音量的网站）
            if (!target.controls) return; // 如果视频/音频已经有了自己的控件（即没有使用 HTML5 默认的控件），则退出
        }
        modifyVolume(target);
        // 如果没有该属性，则代表是还未监听事件
        if (target.dataset.html5VolumeXiu != 'true') {
            target.dataset.html5VolumeXiu = 'true'
            target.addEventListener('volumechange', volumeChangeEvent);
        }
    }


    // 修改视频音量
    function modifyVolume(_this) {
        let nowVolume = parseFloat(localStorage.getItem('html5_xiu_currentVolume')); // 先看看 localStorage 有没有（即用户是否手动调整过音量）
        if (!nowVolume && nowVolume !== 0) nowVolume = GM_getValue('menu_defaultVolume', 30); // 如果 localStorage 没有，那就从脚本配置中获取
        if (!((typeof nowVolume === 'number') && nowVolume <= 100)) nowVolume = 30; // 如果获取到的音量数值不是数字，或大于 100，则重置为 30
        //console.log(_this, _this.volume, nowVolume, nowVolume / 100)
        _this.volume = nowVolume / 100; // 设置音量为 0.00~1.00 范围
        //console.log(_this.volume)
    }


    // 修改全局默认音量
    function customDefaultVolume() {
        let newValue = parseFloat(prompt('修改全局默认音量，不影响各网站记住的音量，修改后当前网页立即生效~\n范围：0~100 (即 0%~100%，不需要加 % 百分号)\n默认：30', GM_getValue('menu_defaultVolume', 30)));
        if (!Number.isNaN(newValue) && newValue >= 0 && newValue <= 100) {GM_setValue('menu_defaultVolume', newValue);}
        currentPage(); // 重置当前网页的音量
        registerMenuCommand(); // 重新注册菜单（刷新菜单上的音量值）
    }


    // 修改当前网站默认音量 (针对不支持调节音量的网站)
    function customCurrentDefaultVolume() {
        let newValue = parseFloat(prompt('修改当前网站默认音量 (针对不支持调节音量的网站)，修改后立即生效~\n范围：0~100 (即 0%~100%，不需要加 % 百分号)\n默认：全局默认音量', localStorage.getItem('html5_xiu_currentVolume') || GM_getValue('menu_defaultVolume', 30)));
        if (!Number.isNaN(newValue) && newValue >= 0 && newValue <= 100) {localStorage.setItem('html5_xiu_currentVolume', newValue);}
        currentPage(); // 重置当前网页的音量
        registerMenuCommand(); // 重新注册菜单（刷新菜单上的音量值）
    }


    // 忘记当前网站音量
    function resetCurrentVolume() {
        if (localStorage.getItem('html5_xiu_currentVolume')) localStorage.removeItem('html5_xiu_currentVolume') // 清理 localStorage
        currentPage(); // 重置当前网页的音量
        registerMenuCommand(); // 重新注册菜单（刷新菜单上的音量值）
    }
})();
