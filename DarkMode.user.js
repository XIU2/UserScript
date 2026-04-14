// ==UserScript==
// @name         Dark Mode
// @name:zh-CN   护眼模式
// @name:zh-TW   護眼模式
// @name:ru      Тёмный режим
// @name:en      Dark Mode
// @version      1.5.6
// @author       X.I.U
// @description  Simple and effective network-wide eye protection mode (night mode, dark mode, black mode)
// @description:zh-CN  简单有效的全网通用护眼模式（夜间模式、暗黑模式、深色模式）
// @description:zh-TW  簡單有效的全網通用護眼模式（夜間模式、暗黑模式、深色模式）
// @description:ru  Простой и эффективный режим защиты глаз по всей сети (ночной режим, тёмный режим, чёрный режим)
// @match        *://*/*
// @exclude      https://live.bilibili.com/*
// @icon         data:image/png;base64,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
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @sandbox      JavaScript
// @noframes
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// @downloadURL https://update.greasyfork.org/scripts/426377/%E6%8A%A4%E7%9C%BC%E6%A8%A1%E5%BC%8F.user.js
// @updateURL https://update.greasyfork.org/scripts/426377/%E6%8A%A4%E7%9C%BC%E6%A8%A1%E5%BC%8F.meta.js
// ==/UserScript==

(function() {
    'use strict';

    var translations = {
        "zh-CN": {
            "✅ 已启用 (点击对当前网站禁用)": "✅ 已启用 (点击对当前网站禁用)",
            "❌ 已禁用 (点击对当前网站启用)": "❌ 已禁用 (点击对当前网站启用)",
            "白天保持开启 (比晚上亮一点点)": "白天保持开启 (比晚上亮一点点)",
            "白天保持开启": "白天保持开启",
            "护眼模式跟随浏览器": "护眼模式跟随浏览器",
            "智能排除自带暗黑模式的网页 (beta)": "智能排除自带暗黑模式的网页 (beta)",
            "✅ 已强制当前网站启用护眼模式 (👆)": "✅ 已强制当前网站启用护眼模式 (👆)",
            "❌ 未强制当前网站启用护眼模式 (👆)": "❌ 未强制当前网站启用护眼模式 (👆)",
            "点击切换模式": "点击切换模式",
            "自定义当前模式": "自定义当前模式",
            "自定义昼夜时间": "自定义昼夜时间",
            "晚上自动切换模式": "晚上自动切换模式",
            "💬 反馈 & 建议": "💬 反馈 & 建议",

            "白天、晚上使用不同模式，修改后立即生效~\n格式：白天模式|晚上模式\n例如：1|3（即白天模式 1 晚上模式 3）\n默认：留空（即关闭该功能）":
            "白天、晚上使用不同模式，修改后立即生效~\n格式：白天模式|晚上模式\n例如：1|3（即白天模式 1 晚上模式 3）\n默认：留空（即关闭该功能）",

            "自定义 [模式 1]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|亮度 (晚上)\n默认：60|50（均为百分比 1~100，不需要 % 符号）":
            "自定义 [模式 1]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|亮度 (晚上)\n默认：60|50（均为百分比 1~100，不需要 % 符号）",

            "自定义 [模式 2]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|暖色 (白天)|亮度 (晚上)|暖色 (晚上)\n默认：60|40|50|50（均为百分比 1~100，不需要 % 符号）":
            "自定义 [模式 2]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|暖色 (白天)|亮度 (晚上)|暖色 (晚上)\n默认：60|40|50|50（均为百分比 1~100，不需要 % 符号）",

            "自定义 [模式 3]，修改后立即生效 (部分网页可能需要刷新)~\n格式：反色\n默认：90（均为百分比 50~100，不需要 % 符号）":
            "自定义 [模式 3]，修改后立即生效 (部分网页可能需要刷新)~\n格式：反色\n默认：90（均为百分比 50~100，不需要 % 符号）",

            "自定义 [模式 3] 排除目标，修改后立即生效 (部分网页可能需要刷新)~\n格式：CSS 选择器 (如果不会写可以找我)\n默认：img, .img, video, [style*=\"background\"][style*=\"url\"], svg\n (使用英文逗号间隔，末尾不要有逗号)":
            "自定义 [模式 3] 排除目标，修改后立即生效 (部分网页可能需要刷新)~\n格式：CSS 选择器 (如果不会写可以找我)\n默认：img, .img, video, [style*=\"background\"][style*=\"url\"], svg\n (使用英文逗号间隔，末尾不要有逗号)",

            "自定义脚本内和白天/晚上相关的时间，修改后刷新网页生效~\n格式：6:00|18:30 (即 6:00 ~ 18:30 之间是白天时间)\n也支持反向设置：14:00|12:00 (即 12:00 ~ 14:00 之间是夜晚时间)":
            "自定义脚本内和白天/晚上相关的时间，修改后刷新网页生效~\n格式：6:00|18:30 (即 6:00 ~ 18:30 之间是白天时间)\n也支持反向设置：14:00|12:00 (即 12:00 ~ 14:00 之间是夜晚时间)",

            "[公式]": "[公式]",
            "[护眼模式] html:": "[护眼模式] html:",
            "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜...": "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜...",
            "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜....": "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜...."
        },

        "zh-TW": {
            "✅ 已启用 (点击对当前网站禁用)": "✅ 已啟用 (點擊對當前網站禁用)",
            "❌ 已禁用 (点击对当前网站启用)": "❌ 已禁用 (點擊對當前網站啟用)",
            "白天保持开启 (比晚上亮一点点)": "白天保持開啟 (比晚上亮一點點)",
            "白天保持开启": "白天保持開啟",
            "护眼模式跟随浏览器": "護眼模式跟隨瀏覽器",
            "智能排除自带暗黑模式的网页 (beta)": "智能排除自帶暗黑模式的網頁 (beta)",
            "✅ 已强制当前网站启用护眼模式 (👆)": "✅ 已強制當前網站啟用護眼模式 (👆)",
            "❌ 未强制当前网站启用护眼模式 (👆)": "❌ 未強制當前網站啟用護眼模式 (👆)",
            "点击切换模式": "點擊切換模式",
            "自定义当前模式": "自訂當前模式",
            "自定义昼夜时间": "自訂晝夜時間",
            "晚上自动切换模式": "晚上自動切換模式",
            "💬 反馈 & 建议": "💬 反饋 & 建議",

            "白天、晚上使用不同模式，修改后立即生效~\n格式：白天模式|晚上模式\n例如：1|3（即白天模式 1 晚上模式 3）\n默认：留空（即关闭该功能）":
            "白天、晚上使用不同模式，修改後立即生效~\n格式：白天模式|晚上模式\n例如：1|3（即白天模式 1 晚上模式 3）\n預設：留空（即關閉該功能）",

            "自定义 [模式 1]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|亮度 (晚上)\n默认：60|50（均为百分比 1~100，不需要 % 符号）":
            "自訂 [模式 1]，修改後立即生效 (部分網頁可能需要重新整理)~\n格式：亮度 (白天)|亮度 (晚上)\n預設：60|50（均為百分比 1~100，不需要 % 符號）",

            "自定义 [模式 2]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|暖色 (白天)|亮度 (晚上)|暖色 (晚上)\n默认：60|40|50|50（均为百分比 1~100，不需要 % 符号）":
            "自訂 [模式 2]，修改後立即生效 (部分網頁可能需要重新整理)~\n格式：亮度 (白天)|暖色 (白天)|亮度 (晚上)|暖色 (晚上)\n預設：60|40|50|50（均為百分比 1~100，不需要 % 符號）",

            "自定义 [模式 3]，修改后立即生效 (部分网页可能需要刷新)~\n格式：反色\n默认：90（均为百分比 50~100，不需要 % 符号）":
            "自訂 [模式 3]，修改後立即生效 (部分網頁可能需要重新整理)~\n格式：反色\n預設：90（均為百分比 50~100，不需要 % 符號）",

            "自定义 [模式 3] 排除目标，修改后立即生效 (部分网页可能需要刷新)~\n格式：CSS 选择器 (如果不会写可以找我)\n默认：img, .img, video, [style*=\"background\"][style*=\"url\"], svg\n (使用英文逗号间隔，末尾不要有逗号)":
            "自訂 [模式 3] 排除目標，修改後立即生效 (部分網頁可能需要重新整理)~\n格式：CSS 選擇器 (如果不會寫可以找我)\n預設：img, .img, video, [style*=\"background\"][style*=\"url\"], svg\n (使用英文逗號間隔，末尾不要有逗號)",

            "自定义脚本内和白天/晚上相关的时间，修改后刷新网页生效~\n格式：6:00|18:30 (即 6:00 ~ 18:30 之间是白天时间)\n也支持反向设置：14:00|12:00 (即 12:00 ~ 14:00 之间是夜晚时间)":
            "自訂腳本內和白天/晚上相關的時間，修改後重新整理網頁生效~\n格式：6:00|18:30 (即 6:00 ~ 18:30 之間是白天時間)\n也支援反向設定：14:00|12:00 (即 12:00 ~ 14:00 之間是夜晚時間)",

            "[公式]": "[公式]",
            "[护眼模式] html:": "[護眼模式] html:",
            "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜...": "[護眼模式] 檢測到當前網頁自帶暗黑模式，停用本腳本濾鏡...",
            "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜....": "[護眼模式] 檢測到當前網頁自帶暗黑模式，停用本腳本濾鏡...."
        },

        "ru": {
            "✅ 已启用 (点击对当前网站禁用)": "✅ Включено (нажмите, чтобы отключить для этого сайта)",
            "❌ 已禁用 (点击对当前网站启用)": "❌ Отключено (нажмите, чтобы включить для этого сайта)",
            "白天保持开启 (比晚上亮一点点)": "Включено днём (чуть ярче, чем ночью)",
            "白天保持开启": "Включено днём",
            "护眼模式跟随浏览器": "Следовать настройкам браузера",
            "智能排除自带暗黑模式的网页 (beta)": "Авто-исключение сайтов с тёмной темой (beta)",
            "✅ 已强制当前网站启用护眼模式 (👆)": "✅ Принудительно включено (👆)",
            "❌ 未强制当前网站启用护眼模式 (👆)": "❌ Не принудительно включено (👆)",
            "点击切换模式": "Нажмите для переключения",
            "自定义当前模式": "Настроить режим",
            "自定义昼夜时间": "Настроить время дня/ночи",
            "晚上自动切换模式": "Автопереключение ночью",
            "💬 反馈 & 建议": "💬 Обратная связь и предложения",

            "白天、晚上使用不同模式，修改后立即生效~\n格式：白天模式|晚上模式\n例如：1|3（即白天模式 1 晚上模式 3）\n默认：留空（即关闭该功能）":
            "Разные режимы днём и ночью, изменения применяются сразу~\nФормат: день|ночь\nПример: 1|3\nПо умолчанию: пусто (выкл.)",

            "自定义 [模式 1]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|亮度 (晚上)\n默认：60|50（均为百分比 1~100，不需要 % 符号）":
            "Настройка [режим 1], применяется сразу~\nФормат: яркость (день)|яркость (ночь)\nПо умолчанию: 60|50",

            "自定义 [模式 2]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|暖色 (白天)|亮度 (晚上)|暖色 (晚上)\n默认：60|40|50|50（均为百分比 1~100，不需要 % 符号）":
            "Настройка [режим 2], применяется сразу~\nФормат: яркость|тепло|яркость|тепло\nПо умолчанию: 60|40|50|50",

            "自定义 [模式 3]，修改后立即生效 (部分网页可能需要刷新)~\n格式：反色\n默认：90（均为百分比 50~100，不需要 % 符号）":
            "Настройка [режим 3], применяется сразу~\nФормат: инверсия\nПо умолчанию: 90",

            "自定义 [模式 3] 排除目标，修改后立即生效 (部分网页可能需要刷新)~\n格式：CSS 选择器 (如果不会写可以找我)\n默认：img, .img, video, [style*=\"background\"][style*=\"url\"], svg\n (使用英文逗号间隔，末尾不要有逗号)":
            "Исключения [режим 3], применяется сразу~\nФормат: CSS селекторы\nПо умолчанию: img, .img, video...",

            "自定义脚本内和白天/晚上相关的时间，修改后刷新网页生效~\n格式：6:00|18:30 (即 6:00 ~ 18:30 之间是白天时间)\n也支持反向设置：14:00|12:00 (即 12:00 ~ 14:00 之间是夜晚时间)":
            "Настройка времени дня/ночи\nФормат: 6:00|18:30",

            "[公式]": "[формула]",
            "[护眼模式] html:": "[режим защиты глаз] html:",
            "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜...": "[режим защиты глаз] обнаружена тёмная тема, фильтр отключён...",
            "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜....": "[режим защиты глаз] обнаружена тёмная тема, фильтр отключён...."
        },

        "en": {
            "✅ 已启用 (点击对当前网站禁用)": "✅ Enabled (click to disable for this site)",
            "❌ 已禁用 (点击对当前网站启用)": "❌ Disabled (click to enable for this site)",
            "白天保持开启 (比晚上亮一点点)": "Keep enabled during the day (slightly brighter than night)",
            "白天保持开启": "Keep enabled during the day",
            "护眼模式跟随浏览器": "Follow browser dark mode",
            "智能排除自带暗黑模式的网页 (beta)": "Auto exclude sites with built-in dark mode (beta)",
            "✅ 已强制当前网站启用护眼模式 (👆)": "✅ Forced enabled for this site (👆)",
            "❌ 未强制当前网站启用护眼模式 (👆)": "❌ Not forced for this site (👆)",
            "点击切换模式": "Click to switch mode",
            "自定义当前模式": "Customize current mode",
            "自定义昼夜时间": "Customize day/night time",
            "晚上自动切换模式": "Auto switch at night",
            "💬 反馈 & 建议": "💬 Feedback & Suggestions",

            "白天、晚上使用不同模式，修改后立即生效~\n格式：白天模式|晚上模式\n例如：1|3（即白天模式 1 晚上模式 3）\n默认：留空（即关闭该功能）":
            "Use different modes for day/night, takes effect immediately~\nFormat: day|night\nExample: 1|3\nDefault: empty (disabled)",

            "自定义 [模式 1]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|亮度 (晚上)\n默认：60|50（均为百分比 1~100，不需要 % 符号）":
            "Customize [Mode 1], takes effect immediately~\nFormat: brightness (day)|brightness (night)\nDefault: 60|50",

            "自定义 [模式 2]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|暖色 (白天)|亮度 (晚上)|暖色 (晚上)\n默认：60|40|50|50（均为百分比 1~100，不需要 % 符号）":
            "Customize [Mode 2], takes effect immediately~\nFormat: brightness|warmth|brightness|warmth\nDefault: 60|40|50|50",

            "自定义 [模式 3]，修改后立即生效 (部分网页可能需要刷新)~\n格式：反色\n默认：90（均为百分比 50~100，不需要 % 符号）":
            "Customize [Mode 3], takes effect immediately~\nFormat: invert\nDefault: 90",

            "自定义 [模式 3] 排除目标，修改后立即生效 (部分网页可能需要刷新)~\n格式：CSS 选择器 (如果不会写可以找我)\n默认：img, .img, video, [style*=\"background\"][style*=\"url\"], svg\n (使用英文逗号间隔，末尾不要有逗号)":
            "Customize [Mode 3] exclusions, takes effect immediately~\nFormat: CSS selectors\nDefault: img, .img, video...",

            "自定义脚本内和白天/晚上相关的时间，修改后刷新网页生效~\n格式：6:00|18:30 (即 6:00 ~ 18:30 之间是白天时间)\n也支持反向设置：14:00|12:00 (即 12:00 ~ 14:00 之间是夜晚时间)":
            "Customize day/night time\nFormat: 6:00|18:30",

            "[公式]": "[formula]",
            "[护眼模式] html:": "[Eye Care Mode] html:",
            "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜...": "[Eye Care Mode] detected built-in dark mode, disabling filter...",
            "[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜....": "[Eye Care Mode] detected built-in dark mode, disabling filter...."
        }
    };

    var language = navigator.languages.find(l => l in translations) || 'zh-CN';

    function tr(original, lang = language) {
        return translations[lang][original] || original;
    }

    var menu_ALL = [
        ['menu_disable', tr('✅ 已启用 (点击对当前网站禁用)'), tr('❌ 已禁用 (点击对当前网站启用)'), []],
        ['menu_runDuringTheDay', tr('白天保持开启 (比晚上亮一点点)'), tr('白天保持开启'), true],
        ['menu_darkModeAuto', tr('护眼模式跟随浏览器'), tr('护眼模式跟随浏览器'), false],
        ['menu_autoRecognition', tr('智能排除自带暗黑模式的网页 (beta)'), tr('智能排除自带暗黑模式的网页 (beta)'), true],
        ['menu_forcedToEnable', tr('✅ 已强制当前网站启用护眼模式 (👆)'), tr('❌ 未强制当前网站启用护眼模式 (👆)'), []],
        ['menu_darkModeType', tr('点击切换模式'), tr('点击切换模式'), 2],
        ['menu_customMode', tr('自定义当前模式'), tr('自定义当前模式'), true], ['menu_customMode1',,,'60|50'], ['menu_customMode2',,,'60|40|50|50'], ['menu_customMode3',,,'90'], ['menu_customMode3_exclude',,,'img, .img, video, [style*="background"][style*="url"], svg'],
        ['menu_customTime', tr('自定义昼夜时间'), tr('自定义昼夜时间'), '6:00|18:00'],
        ['menu_autoSwitch', tr('晚上自动切换模式'), tr('晚上自动切换模式'), ''],
    ], menu_ID = [];
    for (let i=0;i<menu_ALL.length;i++){ // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
    }
    registerMenuCommand();

    // 自定义昼夜时间 过渡性调整（精确到分钟），过段时间移除
    if (GM_getValue('menu_customTime', '').indexOf(':') === -1) GM_setValue('menu_customTime', GM_getValue('menu_customTime', '6|18').replace('|',':00|') + ':00')

    if (menu_ID.length > 1) {addStyle();}


    // 注册脚本菜单
    function registerMenuCommand() {
        if (menu_ID.length != []){
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
                    if (GM_getValue('menu_darkModeAuto') && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        menu_ID[i] = GM_registerMenuCommand(tr(`❌ 当前浏览器为白天模式 (点击关闭 [护眼模式跟随浏览器])`), function(){GM_setValue('menu_darkModeAuto', false);location.reload();});
                        return
                    }
                    menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][1]}`, function(){menu_disable('add')});
                }
            }
            else if (menu_ALL[i][0] === 'menu_darkModeType')
            { // 点击切换模式
                if (menu_ALL[i][3] > 3) { // 避免在减少 raw 数组后，用户储存的数据大于数组而报错
                    menu_ALL[i][3] = 1;
                    GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
                }
                let menu_newMode = getAutoSwitch();
                menu_ID[i] = GM_registerMenuCommand(`${menu_num(menu_newMode)} ${menu_ALL[i][1]}`, function(){menu_toggle(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`)});
            }
            else if (menu_ALL[i][0] === 'menu_customMode')
            { // 自定义当前模式
                GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_customMode()});
            }
            else if (menu_ALL[i][0] === 'menu_customTime')
            { // 自定义昼夜时间
                GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_customTime()});
            }
            else if (menu_ALL[i][0] === 'menu_customMode1' || menu_ALL[i][0] === 'menu_customMode2' || menu_ALL[i][0] === 'menu_customMode3' || menu_ALL[i][0] === 'menu_customMode3_exclude')
            { // 当前模式值
                GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
            }
            else if (menu_ALL[i][0] === 'menu_autoSwitch')
            { // 晚上自动切换模式
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_customAutoSwitch()});
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
                menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand(tr('💬 反馈 & 建议'), function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/426377/feedback', {active: true,insert: true,setParent: true});});
    }


    // 菜单数字图标
    function menu_num(num) {
        return ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'][num]
    }


    // 晚上自动切换模式
    function menu_customAutoSwitch() {
        let newAutoSwitch = prompt(tr('白天、晚上使用不同模式，修改后立即生效~\n格式：白天模式|晚上模式\n例如：1|3（即白天模式 1 晚上模式 3）\n默认：留空（即关闭该功能）'), GM_getValue('menu_autoSwitch'));
        if (newAutoSwitch === '') {
            GM_setValue('menu_autoSwitch', '');
        } else if (newAutoSwitch != null) {
            if (newAutoSwitch.split('|').length == 2) {
                GM_setValue('menu_autoSwitch', newAutoSwitch);
            } else {
                alert(tr(`填入内容格式错误...`));
            }
        }
        registerMenuCommand(); // 重新注册脚本菜单
        if (document.getElementById('XIU2DarkMode')) {
            document.getElementById('XIU2DarkMode').remove(); // 即时修改样式
            addStyle();
        }
    }
    // 获取当前模式
    function getAutoSwitch() {
        let darkModeType = GM_getValue('menu_darkModeType'), hours = new Date().getHours(), time = GM_getValue('menu_customTime').split('|').map(Number);
        if (GM_getValue('menu_autoSwitch') != '') { // 晚上自动切换模式
            if (isDaytime()) { // 白天
                darkModeType = GM_getValue('menu_autoSwitch').split('|')[0];
            } else { // 晚上
                darkModeType = GM_getValue('menu_autoSwitch').split('|')[1];
            }
        }
        return parseInt(darkModeType)
    }


    // 自定义当前模式
    function menu_customMode() {
        let newMods, tip, defaults, name;
        switch(getAutoSwitch()) {
            case 1:
                tip = tr('自定义 [模式 1]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|亮度 (晚上)\n默认：60|50（均为百分比 1~100，不需要 % 符号）');
                defaults = '60|50';
                name = 'menu_customMode1';
                break;
            case 2:
                tip = tr('自定义 [模式 2]，修改后立即生效 (部分网页可能需要刷新)~\n格式：亮度 (白天)|暖色 (白天)|亮度 (晚上)|暖色 (晚上)\n默认：60|40|50|50（均为百分比 1~100，不需要 % 符号）');
                defaults = '60|40|50|50';
                name = 'menu_customMode2';
                break;
            case 3:
                tip = tr('自定义 [模式 3]，修改后立即生效 (部分网页可能需要刷新)~\n格式：反色\n默认：90（均为百分比 50~100，不需要 % 符号）');
                defaults = '90';
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
        if (getAutoSwitch() == 3) {
            tip = tr('自定义 [模式 3] 排除目标，修改后立即生效 (部分网页可能需要刷新)~\n格式：CSS 选择器 (如果不会写可以找我)\n默认：img, .img, video, [style*="background"][style*="url"], svg\n (使用英文逗号间隔，末尾不要有逗号)');
            defaults = 'img, .img, video, [style*="background"][style*="url"], svg';
            name = 'menu_customMode3_exclude';
            newMods = prompt(tip, GM_getValue(`${name}`));
            if (newMods === '') {
                GM_setValue(`${name}`, defaults);
                registerMenuCommand(); // 重新注册脚本菜单
            } else if (newMods != null) {
                GM_setValue(`${name}`, newMods);
                registerMenuCommand(); // 重新注册脚本菜单
            }
        }
        if (document.getElementById('XIU2DarkMode')) {
            document.getElementById('XIU2DarkMode').remove(); // 即时修改样式
            addStyle();
        }
    }


    // 自定义昼夜时间
    function menu_customTime() {
        let newMods = prompt(tr('自定义脚本内和白天/晚上相关的时间，修改后刷新网页生效~\n格式：6:00|18:30 (即 6:00 ~ 18:30 之间是白天时间)\n也支持反向设置：14:00|12:00 (即 12:00 ~ 14:00 之间是夜晚时间)'), GM_getValue('menu_customTime'));
        if (newMods === '') {
            GM_setValue('menu_customTime', '6:00|18:00');
            registerMenuCommand(); // 重新注册脚本菜单
        } else if (newMods != null) {
            GM_setValue('menu_customTime', newMods);
            registerMenuCommand(); // 重新注册脚本菜单
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
            if (websiteList.indexOf(location.host) === -1) return false // 不存在返回假
            return true
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
            if (websiteList.indexOf(location.host) === -1) return false // 不存在返回假
            return true
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
        registerMenuCommand(); // 重新注册脚本菜单
        if (document.getElementById('XIU2DarkMode')) {
            document.getElementById('XIU2DarkMode').remove(); // 即时修改样式
            addStyle();
        }
        //location.reload(); // 刷新网页
    };


    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
        }else{
            GM_setValue(`${Name}`, true);
            GM_notification({text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
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
            style_00 = `html, body {background-color: #ffffff !important;}`,
            style_11 = `html {filter: brightness(${style_10[0]}%) !important;}`,
            style_11_firefox = `html {filter: brightness(${style_10[0]}%) !important; background-image: url();}`,
            style_12 = `html {filter: brightness(${style_10[1]}%) !important;}`,
            style_12_firefox = `html {filter: brightness(${style_10[1]}%) !important; background-image: url();}`,
            style_21 = `html {filter: brightness(${style_20[0]}%) sepia(${style_20[1]}%) !important;}`,
            style_21_firefox = `html {filter: brightness(${style_20[0]}%) sepia(${style_20[1]}%) !important; background-image: url();}`,
            style_22 = `html {filter: brightness(${style_20[2]}%) sepia(${style_20[3]}%) !important;}`,
            style_22_firefox = `html {filter: brightness(${style_20[2]}%) sepia(${style_20[3]}%) !important; background-image: url();}`,
            style_31 = `html {filter: invert(${style_30[0]}%) !important; text-shadow: 0 0 0 !important;}
            ${menu_value('menu_customMode3_exclude')} {filter: invert(1) !important;}
            img[alt=${tr("[公式]")}] {filter: none !important;}`,
            style_31_firefox = `html {filter: invert(${style_30[0]}%) !important; background-image: url(); text-shadow: 0 0 0 !important;}
            ${menu_value('menu_customMode3_exclude')} {filter: invert(1) !important;}
            img[alt=${tr("[公式]")}] {filter: none !important;}`,
            style_31_scrollbar = `::-webkit-scrollbar {height: 12px !important;}
::-webkit-scrollbar-thumb {border-radius: 0;border-color: transparent;border-style: dashed;background-color: #3f4752 !important;background-clip: padding-box;transition: background-color .32s ease-in-out;}
::-webkit-scrollbar-corner {background: #202020 !important;}
::-webkit-scrollbar-track {background-color: #22272e !important;}
::-webkit-scrollbar-thumb:hover {background: #3f4752 !important;}`;


        // Firefox 浏览器需要特殊对待
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            style_11 = style_11_firefox
            style_12 = style_12_firefox
            style_21 = style_21_firefox
            style_22 = style_22_firefox
            style_31 = style_31_firefox
        }

        // 白天
        if (isDaytime()) {
            if (menu_value('menu_runDuringTheDay')) {
                style_12 = style_11
                style_22 = style_21
            } else {
                style_12 = style_22 = ''
            }
        }


        let darkModeType = getAutoSwitch();

        switch(darkModeType) {
            case 1:
                style += style_12;
                break;
            case 2:
                style += style_22;
                break;
            case 3:
                style += style_31 + style_31_scrollbar;
                if (location.hostname.indexOf('search.bilibili.com') > -1) {
                    style += `ul.video-list img, ul.video-list .video-item .img .mask-video, ul.video-list .video-item .img .van-danmu, ul.video-list .video-item .img .van-framepreview {filter: none !important;}`
                } else if (location.hostname.indexOf('.bilibili.com') > -1) {
                    style += `
.bpx-player-container[data-screen="full"] .bpx-player-video-wrap {filter: invert(1) !important;}
.bpx-player-container[data-screen="web"] {filter: invert(1) !important;}
.bpx-player-container[data-screen="web"] video {filter: none !important;}
* {font-weight: bold !important;}`
                } else if (location.hostname.indexOf('.huya.com') > -1) {
                    style += `#player-wrap[style="height: 100%;"], .player-loading, .sidebar-show, #player-ctrl-wrap {filter: invert(1) !important;}`
                }
                break;
        }
        style_Add.id = 'XIU2DarkMode';
        style_Add.type = 'text/css';
        //console.log(document,document.lastElementChild,document.querySelector('html'))
        if (document.lastElementChild) {
            document.lastElementChild.appendChild(style_Add).textContent = style;
        } else { // 发现个别网站速度太慢的话，就会出现脚本运行太早，连 html 标签都还没加载。。。
            let timer1 = setInterval(function(){ // 每 5 毫秒检查一下 html 是否已存在
                if (document.lastElementChild) {
                    clearInterval(timer1); // 取消定时器
                    document.lastElementChild.appendChild(style_Add).textContent = style;
                }
            });
        }

        let websiteList = [];
        if (menu_value('menu_autoRecognition')) { // 智能排除自带暗黑模式的网页 (beta)
            websiteList = menu_value('menu_forcedToEnable'); // 强制当前网站启用护眼模式
        }

        // 为了避免 body 还没加载导致无法检查是否设置背景颜色
        let timer = setInterval(function(){ // 每 5 毫秒检查一下 body 是否已存在
            if (document.body) {
                clearInterval(timer); // 取消定时器（每 5 毫秒一次的）
                setTimeout(function(){ // 为了避免太快 body 的 CSS 还没加载上，先延迟 150 毫秒（缺点就是可能会出现短暂一闪而过的暗黑滤镜）
                    console.log(tr('[护眼模式] html:'), window.getComputedStyle(document.lastElementChild).backgroundColor, 'body:', window.getComputedStyle(document.body).backgroundColor);
                    if (window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' && window.getComputedStyle(document.lastElementChild).backgroundColor === 'rgba(0, 0, 0, 0)' && !(document.querySelector('head>meta[name="color-scheme"],head>link[href^="resource:"]') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                        // 如果 body 没有 CSS 背景颜色（或是在资源页 且 浏览器为白天模式），那就需要添加一个背景颜色，否则影响滤镜效果
                        let style_Add2 = document.createElement('style');
                        style_Add2.id = 'XIU2DarkMode2';
                        document.lastElementChild.appendChild(style_Add2).textContent = style_00;

                    } else if ((document.querySelector('head>meta[name="color-scheme"],head>link[href^="resource:"]') && window.matchMedia('(prefers-color-scheme: dark)').matches) || (document.querySelector('html[class*=dark], html[data-dark-theme*=dark], html[data-theme*=dark], html[data-color-mode*=dark], body[class*=dark]')) || (window.getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)') || (getColorValue(document.body) > 0 && getColorValue(document.body) < 898989) || (getColorValue(document.lastElementChild) > 0 && getColorValue(document.lastElementChild) < 898989) || (window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' && window.getComputedStyle(document.lastElementChild).backgroundColor === 'rgb(0, 0, 0)')) {
                        // 如果是在资源页 且 浏览器为暗黑模式，或 html/body 元素包含 dark 标识，或底色为黑色 (等于0,0,0) 或深色 (小于 89,89,89)，就停用本脚本滤镜
                        if (menu_value('menu_autoRecognition')) { // 排除自带暗黑模式的网页 (beta)
                            for (let i=0;i<websiteList.length;i++){ // 这些网站强制启用护眼模式滤镜
                                if (websiteList[i] === location.host) return
                            }
                            console.log(tr('[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜...'));
                            document.getElementById('XIU2DarkMode').remove();
                            remove = true;
                        }
                    }
                }, 150);

                // 用来解决一些 CSS 加载缓慢的网站，可能会出现没有正确排除的问题，在没有找到更好的办法之前，先这样凑活着用
                setTimeout(function(){
                    console.log(tr('[护眼模式] html:'), window.getComputedStyle(document.lastElementChild).backgroundColor, 'body:', window.getComputedStyle(document.body).backgroundColor);
                    if ((document.querySelector('head>meta[name="color-scheme"],head>link[href^="resource:"]') && window.matchMedia('(prefers-color-scheme: dark)').matches) || (document.querySelector('html[class*=dark], html[data-dark-theme*=dark], html[data-theme*=dark], html[data-color-mode*=dark], body[class*=dark]')) || (window.getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)') || (getColorValue(document.body) > 0 && getColorValue(document.body) < 898989) || (getColorValue(document.lastElementChild) > 0 && getColorValue(document.lastElementChild) < 898989) || (window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' && window.getComputedStyle(document.lastElementChild).backgroundColor === 'rgb(0, 0, 0)')) {
                        // 如果是在资源页 且 浏览器为暗黑模式，或 html/body 元素包含 dark 标识，或底色为黑色 (等于0,0,0) 或深色 (小于 89,89,89)，就停用本脚本滤镜
                        if (menu_value('menu_autoRecognition')) { // 排除自带暗黑模式的网页 (beta)
                            for (let i=0;i<websiteList.length;i++){ // 这些网站强制启用护眼模式滤镜
                                if (websiteList[i] === location.host) return
                            }
                            if (remove) return
                            console.log(tr('[护眼模式] 检测到当前网页自带暗黑模式，停用本脚本滤镜....'))
                            if (document.getElementById('XIU2DarkMode')) document.getElementById('XIU2DarkMode').remove();
                            if (document.getElementById('XIU2DarkMode2')) document.getElementById('XIU2DarkMode2').remove();
                        }
                    }
                }, 1500);
            }
        });

        // 解决远景论坛会清理掉前面插入的 CSS 样式的问题
        if (location.hostname === 'bbs.pcbeta.com') {
            let timer1 = setInterval(function(){
                if (!document.getElementById('XIU2DarkMode')) {
                    document.lastElementChild.appendChild(style_Add).textContent = style;
                    clearInterval(timer1);
                }
            });
        }
    }

    // 获取背景颜色值
    function getColorValue(e) {
        let rgbValueArry = window.getComputedStyle(e).backgroundColor.replace(/rgba|rgb|\(|\)| /g, '').split (',')
        return parseInt(rgbValueArry[0] + rgbValueArry[1] + rgbValueArry[2])
    }


    // 判断当前是白天还是晚上
    function isDaytime() {
        let nowTime = new Date('2022/03/07 ' + new Date().getHours() + ':' + new Date().getMinutes() + ':00').getTime()/1000, time = GM_getValue('menu_customTime').split('|');
        time[0] = new Date('2022/03/07 ' + time[0] + ':00').getTime()/1000;
        time[1] = new Date('2022/03/07 ' + time[1] + ':00').getTime()/1000;
        if (time[0] < time[1]){
            if (nowTime > time[0] && nowTime < time[1]) return true
            return false
        } else {
            if (nowTime > time[0] || nowTime < time[1]) return true
            return false
        }
    }
})();
