// ==UserScript==
// @name         护眼模式
// @version      1.0.5
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
// @noframes
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    var menu_ALL = [
        ['menu_runDuringTheDay', '白天保持开启 (比晚上亮一点点)', '白天保持开启', true],
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
        //document.documentElement.style.filter = 'brightness(80%) sepia(20%)';
        let grayLevel,rgbValueArry,
            style_Add = document.createElement('style'),
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

        // 判断网页是否没有设置背景颜色（没有背景颜色会导致滤镜对背景颜色无效）
        /*if (document.body) {
            console.log(window.getComputedStyle(document.body).backgroundColor)
            rgbValueArry = window.getComputedStyle(document.body).backgroundColor.replace ('rgb(', '').replace ('rgba(', '').replace (')', '').split (', ');
            grayLevel = rgbValueArry [0] + rgbValueArry [1] + rgbValueArry [2];
            if (grayLevel === "000") style += style_00
        }*/

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
        //style_Add.innerHTML = style;
        document.lastChild.appendChild(document.createElement("style")).textContent = style;
        /*if (document.head) {
                document.head.appendChild(style_Add);
        } else { // 为了避免脚本运行的时候 head 还没加载导致报错
            let timer = setInterval(function(){
                if (document.head) {
                    document.head.appendChild(style_Add);
                    clearInterval(timer);
                }
            }, 1);
        }*/

        // 为了避免 body 还没加载导致无法检查是否设置背景颜色的备用措施
        //if (!grayLevel) {
        setTimeout(function(){
            if (document.body) {
                console.log(window.getComputedStyle(document.body).backgroundColor)
                let rgbValueArry = window.getComputedStyle(document.body).backgroundColor.replace ('rgb(', '').replace ('rgba(', '').replace (')', '').split (', ');
                    //style_Add1 = document.createElement('style');
                if (rgbValueArry [0] + rgbValueArry [1] + rgbValueArry [2] === "000") {
                    //style_Add1.innerHTML = style_00;
                    //document.head.appendChild(style_Add1);
                    document.lastChild.appendChild(document.createElement("style")).textContent = style_00;
                }
            }
        }, 100);
        //}
    }
})();