// ==UserScript==
// @name         护眼模式
// @version      1.0.8
// @author       X.I.U
// @description  最简单的全网通用护眼模式、夜间模式、暗黑模式
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
// ==/UserScript==

(function() {
    var menu_ALL = [
        ['menu_runDuringTheDay', '白天保持开启 (比晚上亮一点点)', '白天保持开启', true],
        ['menu_autoRecognition', '排除自带暗黑模式的网页 (beta)', '排除自带暗黑模式的网页 (beta)', true],
        ['menu_darkModeType', '点击切换模式', '点击切换模式', 1]
    ], menu_ID = [];
    for (let i=0;i<menu_ALL.length;i++){ // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
    }
    registerMenuCommand();
    addStyle();


    // 注册脚本菜单
    function registerMenuCommand() {
        if (menu_ID.length > menu_ALL.length){ // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
            for (let i=0;i<menu_ID.length;i++){
                GM_unregisterMenuCommand(menu_ID[i]);
            }
        }
        for (let i=0;i<menu_ALL.length;i++){ // 循环注册脚本菜单
            menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
            if (menu_ALL[i][0] === 'menu_darkModeType') {
                if (menu_ALL[i][3] > 3){ // 避免在减少 raw 数组后，用户储存的数据大于数组而报错
                    menu_ALL[i][3] = 1;
                    GM_setValue('menu_darkModeType', menu_ALL[i][3]);
                }
                menu_ID[i] = GM_registerMenuCommand(`🔄 [ ${menu_ALL[i][3]} ] ${menu_ALL[i][1]}`, function(){menu_toggle(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`)});
            } else {
                menu_ID[i] = GM_registerMenuCommand(`🌝 [ ${menu_ALL[i][3]?'√':'×'} ] ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412212/feedback', {active: true,insert: true,setParent: true});});
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
        let style_Add = document.createElement('style'),
            hours = new Date().getHours(),
            style = ``,
            style_00 = `html {background-color: #ffffff;}`,
            style_11 = `html {filter: brightness(80%) !important;}`,
            style_11_firefox = `html {filter: brightness(80%) !important; background-image: url();}`,
            style_12 = `html {filter: brightness(70%) !important;}`,
            style_12_firefox = `html {filter: brightness(70%) !important; background-image: url();}`,
            style_21 = `html {filter: brightness(80%) sepia(20%) !important;}`,
            style_21_firefox = `html {filter: brightness(80%) sepia(20%) !important; background-image: url();}`,
            style_22 = `html {filter: brightness(70%) sepia(30%) !important;}`,
            style_22_firefox = `html {filter: brightness(70%) sepia(30%) !important; background-image: url();}`,
            style_31 = `html {filter: invert(80%) !important;} img, video {filter: invert(1) !important;}`,
            style_31_firefox = `html {filter: invert(80%) !important;} img, video {filter: invert(1) !important; background-image: url();}`;

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
        document.lastChild.appendChild(style_Add).textContent = style;

        // 为了避免 body 还没加载导致无法检查是否设置背景颜色
        let timer = setInterval(function(){ // 每 10 毫秒检查一下 body 是否已存在（onload 太晚了，只能这么干）
            if (document.body) {
                setTimeout(function(){ // 为了避免太快 body 的 CSS 还没加载上，先延迟 100 毫秒（缺点就是可能会出现短暂一闪而过的暗黑滤镜）
                    console.log(window.getComputedStyle(document.lastChild).backgroundColor, window.getComputedStyle(document.body).backgroundColor)
                    if (window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' && window.getComputedStyle(document.lastChild).backgroundColor === 'rgba(0, 0, 0, 0)') {
                        // 如果 body 没有 CSS 背景颜色，那就需要添加一个背景颜色，否则影响滤镜效果
                        document.lastChild.appendChild(document.createElement('style')).textContent = style_00;
                    } else if (window.getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)' || window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' || window.getComputedStyle(document.body).backgroundColor.replace(/rgb|rgba|\(|\)|,| /g, '') < 898989) {
                        // 如果是黑色 (等于0,0,0) 或深色 (小于 88,88,88)，就停用本脚本滤镜
                        if (menu_value('menu_autoRecognition')) { // 排除自带暗黑模式的网页 (beta)
                            console.log('检测到当前网页自带暗黑模式，停用本脚本滤镜...')
                            document.getElementById('XIU2DarkMode').remove();
                        }
                    }
                    clearInterval(timer);
                }, 100);
            }
        }, 10);
    }
})();