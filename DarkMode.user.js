// ==UserScript==
// @name         护眼模式
// @version      1.2.1
// @author       X.I.U
// @description  简单有效的全网通用护眼模式、夜间模式、暗黑模式
// @match        *://*/*
// @exclude      *://v.qq.com/*
// @exclude      *://*.iqiyi.com/*
// @exclude      *://*.youku.com/*
// @exclude      *://*.mgtv.com/*
// @exclude      *://tv.cctv.com/*
// @icon         https://i.loli.net/2021/03/07/rdijeYm83pznxWq.png
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @noframes
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

'use strict';
(function() {
    var menu_ALL = [
        ['menu_disable', '✅ 已启用 (点击对当前网站禁用)', '❎ 已禁用 (点击对当前网站启用)', []],
        ['menu_runDuringTheDay', '白天保持开启 (比晚上亮一点点)', '白天保持开启', true],
        ['menu_autoRecognition', '智能排除自带暗黑模式的网页 (beta)', '智能排除自带暗黑模式的网页 (beta)', true],
        ['menu_forcedToEnable', '✅ 已强制当前网站启用护眼模式 (👆)', '❎ 未强制当前网站启用护眼模式 (👆)', []],
        ['menu_darkModeType', '点击切换模式', '点击切换模式', 1],
        ['menu_customMode', '自定义当前模式', '自定义当前模式', true], ['menu_customMode1',,,'80|70'], ['menu_customMode2',,,'80|20|70|30'], ['menu_customMode3',,,'80']
    ], menu_ID = [];
    for (let i=0;i<menu_ALL.length;i++){ // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
    }
    registerMenuCommand();
    if (menu_ID.length > 1) {addStyle();}


    // 注册脚本菜单
    function registerMenuCommand() {
        if (menu_ID.length > menu_ALL.length){ // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
            for (let i=0;i<menu_ID.length;i++){
                GM_unregisterMenuCommand(menu_ID[i]);
            }
        }
        for (let i=0;i<menu_ALL.length;i++){ // 循环注册脚本菜单
            menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
            if (menu_ALL[i][0] === 'menu_disable')
            { // 启用/禁用护眼模式 (当前网站)
                if (menu_disable('check')) { // 当前网站是否已存在禁用列表中
                    menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][2]}`, function(){menu_disable('del')});
                    return
                } else {
                    menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][1]}`, function(){menu_disable('add')});
                }
            }
            else if (menu_ALL[i][0] === 'menu_darkModeType')
            { // 点击切换模式
                if (menu_ALL[i][3] > 3) { // 避免在减少 raw 数组后，用户储存的数据大于数组而报错
                    menu_ALL[i][3] = 1;
                    GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
                }
                menu_ID[i] = GM_registerMenuCommand(`${menu_num(menu_ALL[i][3])} ${menu_ALL[i][1]}`, function(){menu_toggle(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`)});
            }
            else if (menu_ALL[i][0] === 'menu_customMode')
            { // 自定义当前模式
                GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_customMode()});
            }
            else if (menu_ALL[i][0] === 'menu_customMode1' || menu_ALL[i][0] === 'menu_customMode2' || menu_ALL[i][0] === 'menu_customMode3')
            { // 当前模式值
                GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
            }
            else if (menu_ALL[i][0] === 'menu_forcedToEnable')
            { // 强制当前网站启用护眼模式
                if (menu_value('menu_autoRecognition')) { // 自动排除自带暗黑模式的网页 (beta)
                    if (menu_forcedToEnable('check')) { // 当前网站是否已存在列表中
                        menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][1]}`, function(){menu_forcedToEnable('del')});
                    } else {
                        menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][2]}`, function(){menu_forcedToEnable('add')});
                    }
                }
            }
            else
            {
                menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❎'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412212/feedback', {active: true,insert: true,setParent: true});});
    }


    function menu_num(num) {
        switch(num) {
            case 1:
                return '1️⃣'
                break;
            case 2:
                return '2️⃣'
                break;
            case 3:
                return '3️⃣'
                break;
        }
    }


    // 自定义当前模式
    function menu_customMode() {
        let newMods, tip, defaults, name;
        switch(menu_value('menu_darkModeType')) {
            case 1:
                tip = '自定义 [模式 1]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|亮度 (晚上)\n默认：80|70（均为百分比 1~100，不需要 % 符号）';
                defaults = '80|70';
                name = 'menu_customMode1';
                break;
            case 2:
                tip = '自定义 [模式 2]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|暖色 (白天)|亮度 (晚上)|暖色 (晚上)\n默认：80|20|70|30（均为百分比 1~100，不需要 % 符号）';
                defaults = '80|20|70|30';
                name = 'menu_customMode2';
                break;
            case 3:
                tip = '自定义 [模式 3]，修改后立即生效 (部分网页可能需要刷新)~\n格式：反色\n默认：80（均为百分比 50~100，不需要 % 符号）';
                defaults = '80';
                name = 'menu_customMode3';
                break;
        }
        newMods = prompt(tip, GM_getValue(`${name}`));
        if (newMods === '') {
            GM_setValue(`${name}`, defaults);
            registerMenuCommand(); // 重新注册脚本菜单
        } else if (newMods != null) {
            GM_setValue(`${name}`, newMods);
            registerMenuCommand(); // 重新注册脚本菜单
        }
        if (document.getElementById('XIU2DarkMode')) {
            document.getElementById('XIU2DarkMode').remove(); // 即时修改样式
            addStyle();
        }
    }


    // 强制当前网站启用护眼模式
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
            let websiteList = menu_value('menu_forcedToEnable'); // 读取网站列表
            for (let num = 0;num<websiteList.length;num++) { // 判断是否已存在
                if (websiteList[num] === location.host) {
                    return true
                }
            };
            return false
        }

        function add() {
            if (check()) return
            let websiteList = menu_value('menu_forcedToEnable'); // 读取网站列表
            websiteList.push(location.host); // 追加网站域名
            GM_setValue('menu_forcedToEnable', websiteList); // 写入配置
            location.reload(); // 刷新网页
        }

        function del() {
            if (!check()) return
            let websiteList = menu_value('menu_forcedToEnable'), // 读取网站列表
            index = websiteList.indexOf(location.host);
            websiteList.splice(index, 1); // 删除网站域名
            GM_setValue('menu_forcedToEnable', websiteList); // 写入配置
            location.reload(); // 刷新网页
        }
    }


    // 启用/禁用护眼模式 (当前网站)
    function menu_disable(type) {
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
            let websiteList = menu_value('menu_disable'); // 读取网站列表
            for (let num = 0;num<websiteList.length;num++) { // 判断是否已存在
                if (websiteList[num] === location.host) {
                    return true
                }
            };
            return false
        }

        function add() {
            if (check()) return
            let websiteList = menu_value('menu_disable'); // 读取网站列表
            websiteList.push(location.host); // 追加网站域名
            GM_setValue('menu_disable', websiteList); // 写入配置
            location.reload(); // 刷新网页
        }

        function del() {
            if (!check()) return
            let websiteList = menu_value('menu_disable'), // 读取网站列表
            index = websiteList.indexOf(location.host);
            websiteList.splice(index, 1); // 删除网站域名
            GM_setValue('menu_disable', websiteList); // 写入配置
            location.reload(); // 刷新网页
        }
    }


    // 切换暗黑模式
    function menu_toggle(menu_status, Name) {
        menu_status = parseInt(menu_status)
        if (menu_status >= 3){
            menu_status = 1;
        } else {
            menu_status += 1;
        }
        GM_setValue(`${Name}`, menu_status);
        location.reload(); // 刷新网页
    };


    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
        }
        if (Name === 'menu_autoRecognition') {
            location.reload(); // 刷新网页
        }
        registerMenuCommand(); // 重新注册脚本菜单
    };


    // 返回菜单值
    function menu_value(menuName) {
        for (let menu of menu_ALL) {
            if (menu[0] == menuName) {
                return menu[3]
            }
        }
    }


    // 添加样式
    function addStyle() {
        let remove = false, style_Add = document.createElement('style'),
            hours = new Date().getHours(),
            style_10 = menu_value('menu_customMode1').split('|'),
            style_20 = menu_value('menu_customMode2').split('|'),
            style_30 = menu_value('menu_customMode3').split('|'),
            style = ``,
            style_00 = `html, body {background-color: #ffffff;}`,
            style_11 = `html {filter: brightness(${style_10[0]}%) !important;}`,
            style_11_firefox = `html {filter: brightness(${style_10[0]}%) !important; background-image: url();}`,
            style_12 = `html {filter: brightness(${style_10[1]}%) !important;}`,
            style_12_firefox = `html {filter: brightness(${style_10[1]}%) !important; background-image: url();}`,
            style_21 = `html {filter: brightness(${style_20[0]}%) sepia(${style_20[1]}%) !important;}`,
            style_21_firefox = `html {filter: brightness(${style_20[0]}%) sepia(${style_20[1]}%) !important; background-image: url();}`,
            style_22 = `html {filter: brightness(${style_20[2]}%) sepia(${style_20[3]}%) !important;}`,
            style_22_firefox = `html {filter: brightness(${style_20[2]}%) sepia(${style_20[3]}%) !important; background-image: url();}`,
            style_31 = `html {filter: invert(${style_30[0]}%) !important;} img, video {filter: invert(1) !important;}`,
            style_31_firefox = `html {filter: invert(${style_30[0]}%) !important; background-image: url();} img, video {filter: invert(1) !important;}`;

        // Firefox 浏览器需要特殊对待
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            style_11 = style_11_firefox
            style_12 = style_12_firefox
            style_21 = style_21_firefox
            style_22 = style_22_firefox
            style_31 = style_31_firefox
        }

        // 白天（7点到19点）
        if (hours > 6 && hours < 19) {
            if (menu_value('menu_runDuringTheDay')) {
                style_12 = style_11
                style_22 = style_21
            } else {
                style_12 = style_22 = ''
            }
        }

        switch(menu_value('menu_darkModeType')) {
            case 1:
                style += style_12;
                break;
            case 2:
                style += style_22;
                break;
            case 3:
                style += style_31;
                break;
        }
        style_Add.id = 'XIU2DarkMode';
        style_Add.type = 'text/css';
        //console.log(document,document.lastChild,document.querySelector('html'))
        if (document.lastChild) {
            document.lastChild.appendChild(style_Add).textContent = style;
        } else { // 发现个别网站速度太慢的话，就会出现脚本运行太早，连 html 标签都还没加载。。。
            let timer1 = setInterval(function(){ // 每 5 毫秒检查一下 html 是否已存在
                if (document.lastChild) {
                    clearInterval(timer1); // 取消定时器
                    document.lastChild.appendChild(style_Add).textContent = style;
                }
            }, 5);
        }

        let websiteList = [];
        if (menu_value('menu_autoRecognition')) { // 智能排除自带暗黑模式的网页 (beta)
            websiteList = menu_value('menu_forcedToEnable'); // 强制当前网站启用护眼模式
        }

        // 为了避免 body 还没加载导致无法检查是否设置背景颜色
        let timer = setInterval(function(){ // 每 10 毫秒检查一下 body 是否已存在
            if (document.body) {
                clearInterval(timer); // 取消定时器（每 10 毫秒一次的）
                setTimeout(function(){ // 为了避免太快 body 的 CSS 还没加载上，先延迟 150 毫秒（缺点就是可能会出现短暂一闪而过的暗黑滤镜）
                    console.log('html:', window.getComputedStyle(document.lastChild).backgroundColor, 'body:', window.getComputedStyle(document.body).backgroundColor)
                    if (window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' && window.getComputedStyle(document.lastChild).backgroundColor === 'rgba(0, 0, 0, 0)') {
                        // 如果 body 没有 CSS 背景颜色，那就需要添加一个背景颜色，否则影响滤镜效果
                        let style_Add2 = document.createElement('style');
                        style_Add2.id = 'XIU2DarkMode2';
                        document.lastChild.appendChild(style_Add2).textContent = style_00;
                    } else if (window.getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)' || getColorValue(document.body) > 0 && getColorValue(document.body) < 898989 || getColorValue(document.lastChild) > 0 && getColorValue(document.lastChild) < 898989 || window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' && window.getComputedStyle(document.lastChild).backgroundColor === 'rgb(0, 0, 0)') {
                        // 如果是黑色 (等于0,0,0) 或深色 (小于 89,89,89)，就停用本脚本滤镜
                        if (menu_value('menu_autoRecognition')) { // 排除自带暗黑模式的网页 (beta)
                            for (let i=0;i<websiteList.length;i++){ // 这些网站强制启用护眼模式滤镜
                                if (websiteList[i] === location.host) return
                            }
                            console.log('检测到当前网页自带暗黑模式，停用本脚本滤镜...')
                            document.getElementById('XIU2DarkMode').remove();
                            remove = true;
                        }
                    }
                }, 150);

                // 用来解决一些 CSS 加载缓慢的网站，可能会出现没有正确排除的问题，在没有找到更好的办法之前，先这样凑活着用
                setTimeout(function(){
                    console.log('html:', window.getComputedStyle(document.lastChild).backgroundColor, 'body:', window.getComputedStyle(document.body).backgroundColor)
                    if (window.getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)' || getColorValue(document.body) > 0 && getColorValue(document.body) < 898989 || getColorValue(document.lastChild) > 0 && getColorValue(document.lastChild) < 898989 || window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' && window.getComputedStyle(document.lastChild).backgroundColor === 'rgb(0, 0, 0)') {
                        // 如果是黑色 (等于0,0,0) 或深色 (小于 89,89,89)，就停用本脚本滤镜
                        if (menu_value('menu_autoRecognition')) { // 排除自带暗黑模式的网页 (beta)
                            for (let i=0;i<websiteList.length;i++){ // 这些网站强制启用护眼模式滤镜
                                if (websiteList[i] === location.host) return
                            }
                            if (remove) return
                            console.log('检测到当前网页自带暗黑模式，停用本脚本滤镜...')
                            if (document.getElementById('XIU2DarkMode')) document.getElementById('XIU2DarkMode').remove();
                            if (document.getElementById('XIU2DarkMode2')) document.getElementById('XIU2DarkMode2').remove();
                        }
                    }
                }, 1500);
            }
        }, 10);

        // 用来解决一些 CSS 加载缓慢的网站，可能会出现没有正确排除的问题，在没有找到更好的办法之前，先这样凑活着用
        /*setTimeout(function(){
            console.log('html:', window.getComputedStyle(document.lastChild).backgroundColor, 'body:', window.getComputedStyle(document.body).backgroundColor)
            if (window.getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)' || getColorValue(document.body) > 0 && getColorValue(document.body) < 898989 || getColorValue(document.lastChild) > 0 && getColorValue(document.lastChild) < 898989) {
                // 如果是黑色 (等于0,0,0) 或深色 (小于 89,89,89)，就停用本脚本滤镜
                if (menu_value('menu_autoRecognition')) { // 排除自带暗黑模式的网页 (beta)
                    for (let i=0;i<websiteList.length;i++){ // 这些网站强制启用护眼模式滤镜
                        if (websiteList[i] === location.host) return
                    }
                    if (remove) return
                    console.log('检测到当前网页自带暗黑模式，停用本脚本滤镜...')
                    if (document.getElementById('XIU2DarkMode')) document.getElementById('XIU2DarkMode').remove();
                    if (document.getElementById('XIU2DarkMode2')) document.getElementById('XIU2DarkMode2').remove();
                }
            }
        }, 3000);*/

        // 解决远景论坛会清理掉前面插入的 CSS 样式的问题
        if (location.hostname === 'bbs.pcbeta.com') {
            let timer1 = setInterval(function(){
                if (!document.getElementById('XIU2DarkMode')) {
                    document.lastChild.appendChild(style_Add).textContent = style;
                    clearInterval(timer1);
                }
            }, 10);
        }
    }

    // 获取背景颜色值
    function getColorValue(e) {
        let rgbValueArry = window.getComputedStyle(e).backgroundColor.replace(/rgba|rgb|\(|\)| /g, '').split (',')
        return parseInt(rgbValueArry[0] + rgbValueArry[1] + rgbValueArry[2])
    }
})();