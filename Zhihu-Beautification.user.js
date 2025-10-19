// ==UserScript==
// @name         知乎美化
// @version      1.5.19
// @author       X.I.U
// @description  宽屏显示、暗黑模式（4种）、暗黑模式跟随浏览器、屏蔽首页活动广告、隐藏文章开头大图、调整图片最大高度、向下翻时自动隐藏顶栏
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @exclude      https://www.zhihu.com/signin*
// @icon         data:image/png;base64,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
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @sandbox      JavaScript
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/412212
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menu_ALL = [
        ['menu_widescreenDisplay', '宽屏显示', '勾选 = 该页面开启宽屏显示（刷新后查看效果）', ''],
        ['menu_widescreenDisplayIndex', '首页', '宽屏显示', true],
        ['menu_widescreenDisplayQuestion', '问题页', '宽屏显示', true],
        ['menu_widescreenDisplaySearch', '搜索页、话题页、圈子', '宽屏显示', true],
        ['menu_widescreenDisplayCollection', '收藏页', '宽屏显示', true],
        ['menu_widescreenDisplayPost', '文章页', '宽屏显示', false],
        ['menu_widescreenDisplayPeople', '用户主页', '用户主页', false],
        ['menu_widescreenDisplayWidth', '宽屏宽度', '宽屏宽度 (默认 1000)', '1000'],
        ['menu_darkMode', '暗黑模式', '暗黑模式', true],
        ['menu_darkModeType', '暗黑模式切换（1~4）', '暗黑模式切换', 1],
        ['menu_darkModeAuto', '暗黑模式跟随浏览器', '暗黑模式跟随浏览器', false],
        ['menu_picHeight', '调整图片最大高度', '调整图片最大高度', true],
        ['menu_postimg', '隐藏文章开头大图', '隐藏文章开头大图', true],
        ['menu_hideTitle', '向下翻时自动隐藏顶栏', '向下翻时自动隐藏顶栏', true]
    ], menu_ID = [];
    for (let i=0;i<menu_ALL.length;i++){ // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
    }
    registerMenuCommand();
    addStyle();
    // 向下翻时自动隐藏顶栏
    if (menu_value('menu_hideTitle')) setTimeout(hideTitle, 2000);

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
                if (menu_ALL[i][3] > 4){ // 避免在减少 raw 数组后，用户储存的数据大于数组而报错
                    menu_ALL[i][3] = 1;
                    GM_setValue('menu_darkModeType', menu_ALL[i][3]);
                }
                menu_ID[i] = GM_registerMenuCommand(`${menu_num(menu_ALL[i][3])} ${menu_ALL[i][1]}`, function(){menu_toggle(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`)});
            } else if (menu_ALL[i][0] === 'menu_widescreenDisplay'){
                    GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_setting('checkbox', menu_ALL[i][1], menu_ALL[i][2], true, [menu_ALL[i+1], menu_ALL[i+2], menu_ALL[i+3], menu_ALL[i+4], menu_ALL[i+5], menu_ALL[i+6], menu_ALL[i+7]])});
            } else if (menu_ALL[i][0].indexOf('menu_widescreenDisplay') === -1) {
                menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412212/feedback', {active: true,insert: true,setParent: true});});
    }

    // 切换暗黑模式
    function menu_toggle(menu_status, Name) {
        menu_status = parseInt(menu_status)
        if (menu_status >= 4){
            menu_status = 1;
        } else {
            menu_status += 1;
        }
        GM_setValue(`${Name}`, menu_status);
        if (menu_status === 1) { // 设置 Cookie
            if (getTheme() === 'light') setTheme('dark');
        } else {
            if (getTheme() === 'dark') {
                setTheme('light');
            } else {
                if (menu_value('menu_darkMode')) {location.reload();} else {registerMenuCommand();}
            }
        }
    };

    // 菜单数字图标
    function menu_num(num) {
        return ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'][num]
    }

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);

            if (Name === 'menu_darkMode') { // 暗黑模式
                if (getTheme() === 'dark') {setTheme('light');} else {location.reload();}
            } else {
                GM_notification({text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
            }
        } else {
            GM_setValue(`${Name}`, true);

            if (Name === 'menu_darkMode') {
                if (menu_value('menu_darkModeType') === 1) {
                    if (getTheme() === 'light') setTheme('dark');
                } else {
                    if (getTheme() === 'dark') {setTheme('light');} else {location.reload();}
                }
            } else {
                GM_notification({text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
            }
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


    // 脚本设置
    function menu_setting(type, title, tips, line, menu) {
        let _br = '', _html = `<style class="zhihuE_SettingStyle">.zhihuE_SettingRoot {position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);transform: translate(-50%, -50%);width: auto;min-width: 400px;max-width: 600px;height: auto;min-height: 150px;max-height: 400px;color: #535353;background-color: #fff;border-radius: 3px;}
.zhihuE_SettingBackdrop_1 {position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 203;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;overflow-x: hidden;overflow-y: auto;-webkit-transition: opacity .3s ease-out;transition: opacity .3s ease-out;}
.zhihuE_SettingBackdrop_2 {position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 0;background-color: rgba(18,18,18,.65);-webkit-transition: background-color .3s ease-out;transition: background-color .3s ease-out;}
.zhihuE_SettingRoot .zhihuE_SettingHeader {padding: 10px 20px;color: #fff;font-weight: bold;background-color: #3994ff;border-radius: 3px 3px 0 0;}
.zhihuE_SettingRoot .zhihuE_SettingMain {padding: 10px 20px;border-radius: 0 0 3px 3px;}
.zhihuE_SettingHeader span {float: right;cursor: pointer;}
.zhihuE_SettingMain input {margin: 10px 6px 10px 0;vertical-align:middle;}
.zhihuE_SettingMain input[type=text] {margin: 5px 6px 5px 0;padding-block: 0;}
.zhihuE_SettingMain input[name=zhihuE_Setting_Checkbox] {cursor: pointer;}
.zhihuE_SettingMain label {margin-right: 20px;user-select: none;cursor: pointer;vertical-align:middle;}
.zhihuE_SettingMain hr {border: 0.5px solid #f4f4f4;}
[data-theme="dark"] .zhihuE_SettingRoot {color: #adbac7;background-color: #343A44;}
[data-theme="dark"] .zhihuE_SettingHeader {color: #d0d0d0;background-color: #2D333B;}
[data-theme="dark"] .zhihuE_SettingMain hr {border: 0.5px solid #2d333b;}</style>
        <div class="zhihuE_SettingBackdrop_1"><div class="zhihuE_SettingBackdrop_2"></div><div class="zhihuE_SettingRoot">
            <div class="zhihuE_SettingHeader">${title}<span class="zhihuE_SettingClose" title="点击关闭"><svg class="Zi Zi--Close Modal-closeIcon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg></span></div>
            <div class="zhihuE_SettingMain"><p>${tips}</p><hr>`
        if (line) _br = '<br>'
        for (let i=0; i<menu.length; i++) {
            if (menu[i][0] === 'menu_widescreenDisplayWidth') {
                _html += `<label>${menu[i][2]}：<input name="${menu[i][0]}" type="text" oninput="value=value.replace(/[^\\d]/g,'')" value="${GM_getValue(menu[i][0])}" style="width: 50px;"></label>${_br}`
            } else if (GM_getValue(menu[i][0])) {
                _html += `<label><input name="zhihuE_Setting_Checkbox" type="checkbox" value="${menu[i][0]}" checked="checked">${menu[i][1]}</label>${_br}`
            } else {
                _html += `<label><input name="zhihuE_Setting_Checkbox" type="checkbox" value="${menu[i][0]}">${menu[i][1]}</label>${_br}`
            }
        }
        _html += `</div></div></div>`
        document.body.insertAdjacentHTML('beforeend', _html); // 插入网页末尾
        setTimeout(function() { // 延迟 100 毫秒，避免太快
            const doc = document.querySelector('.zhihuE_SettingBackdrop_1');
            if (!doc) return
            // 关闭按钮 点击事件
            doc.querySelector('.zhihuE_SettingClose').onclick = function(){this.parentElement.parentElement.parentElement.remove();document.querySelector('.zhihuE_SettingStyle').remove();}
            // 点击周围空白处 = 点击关闭按钮
            doc.querySelector('.zhihuE_SettingBackdrop_2').onclick = function(event){if (event.target == this) {document.querySelector('.zhihuE_SettingClose').click();};}
            // 复选框 点击事件
            doc.querySelectorAll('input[name=zhihuE_Setting_Checkbox]').forEach(function (checkBox) {
                checkBox.addEventListener('click', function(){if (this.checked) {GM_setValue(this.value, true);} else {GM_setValue(this.value, false);}});
            })
            // 输入框 变化事件
            doc.querySelectorAll('input[type=text]').forEach(function (checkBox) {
                checkBox.onchange = function(){GM_setValue(this.name, this.value);};
            })
        }, 100)
    }


    // 添加样式
    function addStyle() {
        let style = `/* 屏蔽登录提示（问题页中间的元素） */
.Question-mainColumnLogin {display: none !important;}
/* 屏蔽回答页/首页广告 */
.Pc-card.Card, .Pc-Business-Card-PcTopFeedBanner {display: none !important;}
/* 屏蔽文章页推荐文章 */
.Recommendations-Main {display: none !important;}
/* 解除盐选内容选中复制限制 */
div[class*="ManuscriptIntro-root-"] {user-select: auto !important;}
`,
            style_index = `/* 屏蔽首页广告 */
.TopstoryItem--advertCard {display: none !important;}
/* 屏蔽首页活动广告 */
main.App-main > .Topstory > div:not(.Topstory-container) {display: none !important;}
html[data-theme="light"] header.AppHeader {background-color: #ffffff !important; -webkit-box-shadow: 0 1px 3px rgba(18,18,18,.1) !important; box-shadow: 0 1px 3px rgba(18,18,18,.1) !important;}
html[data-theme="light"] header.AppHeader a[aria-label="知乎"] svg {filter: invert(57%) sepia(71%) saturate(949%) hue-rotate(190deg) brightness(86%) contrast(188%) !important;}
html[data-theme="light"] .AppHeader-TabsLink {color: #8590a6 !important; font-weight: normal !important;}
html[data-theme="light"] .AppHeader-userInfo Button svg, .SearchBar-searchButton svg {color: inherit !important;}
html[data-theme="light"] .AppHeader-userInfo button>div {color: #8590a6 !important;}
html[data-theme="light"] .Input-wrapper.Input-wrapper--grey {background: #f6f6f6 !important;}
html[data-theme="light"] .SearchBar input {color: #121212 !important;}
html[data-theme="light"] .SearchBar input::placeholder, html[data-theme="light"] .SearchBar input::-webkit-input-placeholder, html[data-theme="light"] {color: #919baf !important;}
html[data-theme="light"] .Button--primary.Button--blue {color: #fff !important;background-color: #06f !important;}
/* 右上角 通知/私信 红点颜色 */
html[data-theme=light] .AppHeader-notifications:not([aria-label=通知])>div:first-of-type, html[data-theme=light] .AppHeader-messages:not([aria-label=私信])>div:first-of-type {color: #ffffff !important;border: 2px solid #ffffff !important;}

            `,
            style_widescreenDisplayIndex = `/* 宽屏显示 - 首页 */
.Topstory-mainColumn, .QuestionWaiting-mainColumn {width: inherit !important;}
.Topstory-mainColumn~div,[data-za-detail-view-path-module="RightSideBar"] {display: none !important;}
.Topstory-container {width: ${GM_getValue('menu_widescreenDisplayWidth')}px;}
@media only screen and (max-width: ${Number(GM_getValue('menu_widescreenDisplayWidth'))+50}px) {.Topstory-container {width: 97% !important;}}
`,
            style_widescreenDisplayQuestion = `/* 宽屏显示 - 问题页 */
.Question-mainColumn, .ListShortcut, .QuestionWaiting-mainColumn {width: inherit !important;}
.Question-mainColumn+div,[data-za-detail-view-path-module="RightSideBar"], .Question-sideColumn, .GlobalSideBar {display: none !important;}
.QuestionWaiting-mainColumn {margin-right: 0 !important;}
.Question-main {width: ${GM_getValue('menu_widescreenDisplayWidth')}px;}
@media only screen and (max-width: ${Number(GM_getValue('menu_widescreenDisplayWidth'))+50}px) {.Question-main {width: auto !important;}}
@media only screen and (max-width: ${GM_getValue('menu_widescreenDisplayWidth')-100}px) {.Question-main {width: 98.5% !important;}}
.AuthorInfo {max-width: 100% !important;}
`,
            style_widescreenDisplaySearch = `/* 宽屏显示 - 搜索页 */
.SearchMain, .ContentLayout-mainColumn, .Club-mainColumn, .Post-mainColumn, [data-za-detail-view-path-module=TopicItem]>div:first-child {width: inherit !important;}
.SearchMain+div, .ContentLayout-sideColumn, .Card.QuestionHeaderTopicMeta, .ClubSideBar, [data-za-detail-view-path-module=TopicItem]>div:not(:first-child) {display: none !important;}
.Search-container, .ContentLayout, .Club-container, .Post-container, [data-za-detail-view-path-module=TopicItem] {width: ${GM_getValue('menu_widescreenDisplayWidth')}px;}
@media only screen and (max-width: ${Number(GM_getValue('menu_widescreenDisplayWidth'))+50}px) {.Search-container, .ContentLayout, .Club-container, .Post-container, [data-za-detail-view-path-module=TopicItem] {width: 97.5% !important;}}
`,
            style_widescreenDisplayCollection = `/* 宽屏显示 - 收藏页 */
.CollectionsDetailPage-mainColumn {width: inherit !important;}
.CollectionsDetailPage-mainColumn+div {display: none !important;}
.CollectionsDetailPage {width: ${GM_getValue('menu_widescreenDisplayWidth')}px;}
@media only screen and (max-width: ${Number(GM_getValue('menu_widescreenDisplayWidth'))+50}px) {.CollectionsDetailPage {width: 98.5% !important;}}
`,
            style_widescreenDisplayPost = `/* 宽屏显示 - 文章页 */
.Post-content {min-width: auto !important;}
.Post-SideActions {left: calc(10vw) !important;}
.Post-Row-Content-right {display: none !important;}
.Post-Row-Content, .Post-Row-Content-left, .RichContent-actions {width: ${GM_getValue('menu_widescreenDisplayWidth')}px !important;}
@media only screen and (max-width: ${Number(GM_getValue('menu_widescreenDisplayWidth'))+50}px) {.Post-Row-Content, .Post-Row-Content-left, .RichContent-actions {width: auto !important;}}
@media only screen and (max-width: ${GM_getValue('menu_widescreenDisplayWidth')-100}px) {.Post-Row-Content, .Post-Row-Content-left, .RichContent-actions {width: 98% !important;}}
`,
            style_widescreenDisplayPeople = `/* 宽屏显示 - 用户主页 */
.Profile-mainColumn {width: inherit !important;}
.Profile-mainColumn+div,[data-za-module="RightSideBar"],.Profile-sideColumn {display: none !important;}
.Profile-main, #ProfileHeader {width: ${GM_getValue('menu_widescreenDisplayWidth')}px !important;}
@media only screen and (max-width: ${Number(GM_getValue('menu_widescreenDisplayWidth'))+50}px) {.Profile-main, #ProfileHeader {width: auto !important;}}
@media only screen and (max-width: ${GM_getValue('menu_widescreenDisplayWidth')-100}px) {.Profile-main, #ProfileHeader {width: 98.5% !important;}}
`,
            style_2 = `/* 隐藏在各列表中查看文章时开头显示的大图，不影响文章、专栏页面 */
.RichContent img.ArticleItem-image {display: none !important;}
`,
//            style_3 = `/* 向下翻时自动隐藏顶栏*/
//header.is-hidden {display: none;}
//`,
            style_4 = `/* 调整图片最大高度 */
.ztext .content_image, .ztext .origin_image, .GifPlayer img {max-height: 500px !important;width: auto !important;}
`,
            style_darkMode_1 = `/* 暗黑模式（方案 1） */
/* 右上角 通知/私信 红点颜色 */
html[data-theme=dark] .AppHeader-notifications:not([aria-label=通知])>div:first-of-type, html[data-theme=dark] .AppHeader-messages:not([aria-label=私信])>div:first-of-type {color: #ffffff !important;border: 2px solid #2d333b !important;}
/* 文字颜色 */
html[data-theme=dark] body, html[data-theme=dark] .ContentItem-title, html[data-theme=dark] .QuestionHeader-title, html[data-theme=dark] .Tabs-link, html[data-theme=dark] .CreatorEntrance-title, html[data-theme=dark] .Search-container, html[data-theme=dark] .HotItem-excerpt, html[data-theme=dark] .PushNotifications-item, html[data-theme=dark] .Notifications-Main>header h1, html[data-theme=dark] .Notifications-Section-header h2, html[data-theme=dark] .NotificationList-Item-content, html[data-theme=dark] .Reward, html[data-theme=dark] .ChatSideBar-Search-Input input, html[data-theme=dark] input.Input, html[data-theme=dark] .LinkCard-title, html[data-theme=dark] .MCNLinkCard-title, html[data-theme=dark] .ZVideoLinkCard-title, html[data-theme=dark] .TipjarDialog-customButton, html[data-theme=dark] .Question-mainColumn .Card:not(.AnswersNavWrapper) a[data-za-detail-view-id] > div:last-child, html[data-theme=dark] .TextArea {color: #adbac7 !important;}
html[data-theme=dark] .LinkCard-meta, html[data-theme=dark] .MCNLinkCard-source {color: #5a6f83 !important;}
/* 热榜标题 */
html[data-theme=dark] .HotItem-title {color: #c4cfda !important;}
/* 首页信息流标题 */
html[data-theme=dark] .ContentItem-title a:hover, html[data-theme=dark] .RichContent.is-collapsed .RichContent-inner:hover, html[data-theme=dark] .ContentItem-more:hover, html[data-theme=dark] .QuestionRichText--expandable.QuestionRichText--collapsed:hover {color: #b3c3d6 !important;}
/* 搜索高亮红字 */
html[data-theme=dark] .Highlight em {color: #c33c39 !important;}

/* 背景颜色 - 网页 */
html[data-theme=dark] body, html[data-theme=dark] .Select-option:focus {background: #22272E !important;}
/* 背景颜色 - 问题 */
html[data-theme=dark] .AppHeader, html[data-theme=dark] .QuestionHeader, html[data-theme=dark] .QuestionHeader-footer, html[data-theme=dark] .EmoticonsFooter-item--selected, html[data-theme=dark] .Card, html[data-theme=dark] .Question-mainColumn .Card .Sticky.is-bottom, html[data-theme=dark] .ContentItem-actions, html[data-theme=dark] .MoreAnswers .List-headerText, html[data-theme=dark] .CommentsV2-withPagination, html[data-theme=dark] .Topbar, html[data-theme=dark] .CommentsV2-footer, html[data-theme=dark] .CommentEditorV2-inputWrap--active, html[data-theme=dark] .InputLike, html[data-theme=dark] .InputLike + div div, html[data-theme=dark] .Popover-content, html[data-theme=dark] .Notifications-footer, html[data-theme=dark] .Messages-footer, html[data-theme=dark] .Modal-inner, html[data-theme=dark] .Emoticons, html[data-theme=dark] .EmoticonsFooter, html[data-theme=dark] .SearchTabs, html[data-theme=dark] .Popover-arrow:after, html[data-theme=dark] .CommentEditorV2-inputWrap, html[data-theme=dark] .ProfileHeader-wrapper, html[data-theme=dark] .UserCover, html[data-theme=dark] .AnswerForm-footer, html[data-theme=dark] .Editable-toolbar, html[data-theme=dark] .AnswerForm-fullscreenContent .Editable-toolbar, html[data-theme=dark] .KfeCollection-PcCollegeCard-wrapper, html[data-theme=dark] .KfeCollection-PcCollegeCard-root, html[data-theme=dark] .HotItem, html[data-theme=dark] .HotList, html[data-theme=dark] .HotListNavEditPad, html[data-theme=dark] .QuestionWaiting-typesTopper, html[data-theme=dark] .QuestionWaiting-types, html[data-theme=dark] .PostItem, html[data-theme=dark] .ClubSideBar section, html[data-theme=dark] .SearchSubTabs, html[data-theme=dark] .Club-SearchPosts-Content, html[data-theme=dark] .Club-content, html[data-theme=dark] .ClubJoinOrCheckinButton, html[data-theme=dark] .ClubEdit, html[data-theme=dark] .CornerButton, html[data-theme=dark] .Notifications-Section-header, html[data-theme=dark] .NotificationList, .NotificationList-Item.NotificationList-Item:after, .NotificationList-DateSplit.NotificationList-DateSplit:after, html[data-theme=dark] .Chat, .ChatUserListItem:after, .ChatListGroup-SectionTitle--bottomBorder:after, html[data-theme=dark] .ActionMenu, .ChatSideBar-Search--active, html[data-theme=dark] .ChatSideBar-Search-ResultListWrap, html[data-theme=dark] .QuestionMainDivider-inner, html[data-theme=dark] .Topic-bar, html[data-theme=dark] .AnnotationTag, html[data-theme=dark] .HoverCard, html[data-theme=dark] .HoverCard-loading, html[data-theme=dark] .ExploreSpecialCard, html[data-theme=dark] .ExploreHomePage-ContentSection-moreButton a, html[data-theme=dark] .ExploreRoundtableCard, html[data-theme=dark] .ExploreCollectionCard, html[data-theme=dark] .ExploreColumnCard, html[data-theme=dark] .RichText .lazy[data-lazy-status], html[data-theme=dark] #TopstoryContent > div:first-child, html[data-theme=dark] .Topstory-newUserFollowCountPanel, html[data-theme=dark] .AnswerForm-fullscreenContent .RichText, html[data-theme=dark] .Club-Search-Content, html[data-theme=dark] .WriteIndexLayout .Sticky {background: #2D333B !important;}
html[data-theme=dark] .CommentListV2-header-divider, html[data-theme=dark] .CommentsV2-openComment-divider, html[data-theme=dark] .AnswerForm-fullscreenScroller, html[data-theme=dark] .HotListNav-item, html[data-theme=dark] .AutoInviteItem-wrapper--desktop, html[data-theme=dark] .ExploreSpecialCard-contentTag, html[data-theme=dark] .ExploreCollectionCard-contentTypeTag, html[data-theme=dark] .Reward-TipjarDialog-tagLine, html[data-theme=dark] .AnswerForm-footer.useNewEditorSetting > div, html[data-theme=dark] .AnswerForm-fullscreenContent > div:first-child, html[data-theme=dark] .Editable-toolbar button:hover, html[data-theme=dark] .AuthorInfo.AnswerAdd-info + div {background-color: #222933 !important;}
html[data-theme=dark] .CornerButton:hover {background: #3f4752 !important;} /* 右下角按钮 */

/* 背景颜色 - 引用 */
html[data-theme=dark] .ztext blockquote {color: #768390 !important;border-left: 3px solid #3b3b3b !important;}

/* 背景颜色 - 卡片 */
html[data-theme=dark] .MCNLinkCard, html[data-theme=dark] .LinkCard-content, html[data-theme=dark] .ZVideoLinkCard-info {background-color: #22272e !important;}
html[data-theme=dark] .Post-content .MCNLinkCard, html[data-theme=dark] .Post-content .LinkCard-content, html[data-theme=dark] .Post-content .ZVideoLinkCard-info {background-color: #2D333B !important;}
html[data-theme=dark] .LinkCard-backdrop {background-image: url() !important;}

/* 背景颜色 - 头像 */
html[data-theme=dark] .Avatar, html[data-theme=dark] .UserAvatar {background-color: #2d333b !important;}
html[data-theme=dark] .UserAvatar {border: 4px solid #2d333b !important;}

/* 通知信息中点评论链接时，在弹出的评论框中 "高亮" 目标评论 */
html[data-theme=dark] .CommentItemV2[tabindex='-1'] {background-color: #343a44 !important;}

/* 搜索框 */
html[data-theme=dark] .Input-wrapper.Input-wrapper--grey, html[data-theme=dark] .ChatSideBar-Search-Input input {background: #333a44 !important;}

/* 加载动画 */
html[data-theme=dark] .PlaceHolder-bg {background: -webkit-gradient(linear,left top,right top,from(#22272e),color-stop(20%,#2d333b),color-stop(40%,#22272e),to(#22272e)) !important;background: linear-gradient(90deg,#22272e 0,#2d333b 20%,#22272e 40%,#22272e) !important;}
html[data-theme=dark] .PlaceHolder-inner {background: #22272e !important;color: #2d333b !important;}

/* 私信 */
html[data-theme=dark] .Input-wrapper {background-color: #30363f !important;}
html[data-theme=dark] .TextMessage-sender, html[data-theme="dark"] .TextMessage-sender::after {background-color: #57616f !important;}
html[data-theme=dark] .TextMessage-receiver, html[data-theme="dark"] .TextMessage-receiver::after {background-color: #1e5fbf !important;}

html[data-theme=dark] .TextMessage-sender, html[data-theme=dark] .TextMessage-receiver {color: #dcdcdc !important;}
/*html[data-theme=dark] .MessagesBox::-webkit-scrollbar {width: 0px !important;height: 0px !important;}*/
html[data-theme=dark] .ToolBar, html[data-theme=dark] .Input-wrapper, html[data-theme=dark] .ClubTopPosts, html[data-theme=dark] .ChatSideBar-Search-Input input {border: none !important;}

html[data-theme=dark] .ChatBoxModal-closeIcon {fill: #8590a6 !important;}

/* 私信网页 */
html[data-theme=dark] .ChatUserListItem .Chat-ActionMenuPopover-Button {background: -webkit-gradient(linear,left top,right top,from(rgba(18,18,18,0)),color-stop(20%,#22272e)) !important;background: linear-gradient(90deg,rgba(18,18,18,0),#22272e 20%) !important;}
html[data-theme=dark] .css-1j6tmrz {border: 2px solid #2d333b !important;}

/* 选项鼠标指向时背景颜色 */
html[data-theme=dark] .Messages-item:hover, html[data-theme=dark] .GlobalSideBar-navLink:hover, html[data-theme=dark] .Menu-item.is-active, html[data-theme=dark] .ActionMenu-item:hover, html[data-theme=dark] .ChatUserListItem--active, html[data-theme=dark] .Messages-newItem {background-color: #272c33 !important;}
/* 通知 */
html[data-theme=dark] .PushNotifications-item a {color: #8ab5e0 !important;}

/* 封面大图/文章头部大图 */
html[data-theme=dark] img.UserCover-image, html[data-theme=dark] img.TitleImage {opacity: 0.7 !important;}
/* 其他图片 */
html[data-theme=dark] img {opacity: 0.8 !important;}
/* GIF 动图、放大图除外 */
html[data-theme=dark] .GifPlayer img, html[data-theme=dark] .ImageView-img, html[data-theme=dark]>body>img {opacity: 1 !important;}

/* 边框 */
html[data-theme=dark] .Topbar, html[data-theme=dark] .CommentsV2-footer, html[data-theme=dark] .Topstory-mainColumnCard .Card:not(.Topstory-tabCard), html[data-theme=dark] .NestComment:not(:last-child):after, html[data-theme=dark] .NestComment--rootComment:after, html[data-theme=dark] .NestComment .NestComment--child:after, html[data-theme=dark] .NestComment .NestComment--child:after, html[data-theme=dark] .CommentsV2-replyNum, html[data-theme=dark] .CommentItemV2:not(:first-child):after, html[data-theme=dark] .Tabs, html[data-theme=dark] .Popover-arrow:after, html[data-theme=dark] .SelfCollectionItem-innerContainer, html[data-theme=dark] .CollectionDetailPageItem-innerContainer {border-bottom: 1px solid #282d35 !important;}
html[data-theme=dark] .CommentEditorV2-inputWrap--active, html[data-theme=dark] .CommentEditorV2-inputWrap, html[data-theme=dark] .PostItem, html[data-theme=dark] .AnswerForm .Editable-toolbar, html[data-theme=dark] .Editable-toolbar span {border: none !important;}
html[data-theme=dark] .InputLike {border: 1px solid #424b56 !important;}
html[data-theme=dark] .Popover .InputLike {border: 1px solid #2d333b !important;}
html[data-theme=dark] .HotLanding-contentItem:not(:last-child) {border-bottom: 1px solid #424b56 !important;}
html[data-theme=dark] .HotLanding-content {border-left: 2px solid #424b56 !important;}

html[data-theme=dark] .Popover-content, html[data-theme=dark] .Popover-arrow:after {border: 1px solid #22272e !important;}

/* 滚动条 */
html[data-theme=dark] body::-webkit-scrollbar, html[data-theme="dark"] .MessagesBox::-webkit-scrollbar, html[data-theme="dark"] .Messages-list::-webkit-scrollbar, html[data-theme=dark] .PushNotifications-list::-webkit-scrollbar, html[data-theme=dark] .CommentListV2::-webkit-scrollbar, .ChatListGroup-SectionContent::-webkit-scrollbar, html[data-theme=dark] .ChatSideBar-Search-ResultListWrap::-webkit-scrollbar, html[data-theme=dark] .ChatBox textarea.Input::-webkit-scrollbar {width: 6px !important;height: 1px !important;}
html[data-theme=dark] body::-webkit-scrollbar-thumb, html[data-theme="dark"] .MessagesBox::-webkit-scrollbar-thumb, html[data-theme="dark"] .Messages-list::-webkit-scrollbar-thumb, html[data-theme=dark] .PushNotifications-list::-webkit-scrollbar-thumb, html[data-theme=dark] .CommentListV2::-webkit-scrollbar-thumb, .ChatListGroup-SectionContent::-webkit-scrollbar-thumb, html[data-theme=dark] .ChatSideBar-Search-ResultListWrap::-webkit-scrollbar-thumb, html[data-theme=dark] .ChatBox textarea.Input::-webkit-scrollbar-thumb {background: #3f4752 !important;}
html[data-theme=dark] body::-webkit-scrollbar-track {background: #22272e !important;}
html[data-theme=dark] .MessagesBox::-webkit-scrollbar-track, html[data-theme="dark"] .Messages-list::-webkit-scrollbar-track, html[data-theme=dark] .PushNotifications-list::-webkit-scrollbar-track, html[data-theme=dark] .CommentListV2::-webkit-scrollbar-track, .ChatListGroup-SectionContent::-webkit-scrollbar-track, html[data-theme=dark] .ChatSideBar-Search-ResultListWrap::-webkit-scrollbar-track, html[data-theme=dark] .ChatBox textarea.Input::-webkit-scrollbar-track {background: #2d333b !important;}

/* 滚动条 - 回答目录 */
html[data-theme=dark] .AnswerItem .RichContent-hasCatalog .RichContent-inner .Catalog.isCatalogV2::-webkit-scrollbar {width: 0 !important;}
html[data-theme=dark] .AnswerItem .RichContent-hasCatalog .RichContent-inner .Catalog.isCatalogV2 > :first-child {background: #2D333B !important;}

html {scrollbar-width: thin; scrollbar-color: #3f4752 #22272e;}
.MessagesBox, .Messages-list, .PushNotifications-list, .CommentListV2, .ChatListGroup-SectionContent, .ChatSideBar-Search-ResultListWrap {scrollbar-width: thin; scrollbar-color: #3f4752 #2D333B;}

/* 背景颜色 - 专栏/文章 */
html[data-theme=dark] .WhiteBg-body, html[data-theme=dark] .Post-content, html[data-theme=dark] .Post-Row-Content .Post-Row-Content-left {background: #22272E !important;}
html[data-theme=dark] .ColumnPageHeader, html[data-theme=dark] .BottomInfo {background: #1c2129 !important;}

/* 按钮颜色 */
.TopstoryTabs-link.is-active, html[data-theme=dark] .TopstoryTabs-link.is-active, html[data-theme=dark] .VoteButton, .Tag, html[data-theme=dark] .Tag, html[data-theme=dark] .HotListNav-item.is-active, html[data-theme=dark] .RichText a.UserLink-link {color: #3faaff !important;}
/*html[data-theme=dark] .Tabs-link.is-active:after {background: #2196F3 !important;}*/
html[data-theme=dark] .Reward-rewardBtn, html[data-theme=dark] .SearchBar-searchIcon.hasValue, html[data-theme=dark] .Chat-UnreadCount, html[data-theme=dark] .Payment-CheckedButton {color: #ffffff !important;}

/* 关闭查看回复时的高闪 */
html[data-theme=dark] .CommentItemV2--highlighted {-webkit-animation: nano !important;animation: nano !important;}

/* 赞赏 */
html[data-theme=dark] .Reward-TipjarDialog-amountList .Button--red, html[data-theme=dark] .Reward-TipjarDialog-amountList .Button--red, html[data-theme=dark] .Reward-TipjarDialog-amountInput .SimpleInput {color: #d3d3d3 !important; background-color: #353b44 !important; border: none !important;}

/* 赞同 */
html[data-theme=dark] .VoteButton.is-active {color: #d6edff !important;}

/* 创作中心 - 分析图表 */
html[data-theme=dark] .CreatorSection-body .AnalyticsChart text {fill: #adbac7 !important;}
`,
            style_darkMode_1_x = `/* 问题日志页 */
html[data-theme=dark] .zu-top {background: #2D333B !important;border: none !important;}
html[data-theme=dark] .zm-tag-editor-labels.zg-clear a {background: rgba(51,119,255,.1) !important;}
html[data-theme=dark] .zu-main {background: #2D333B !important;padding-left: 20px;padding-right: 20px;}
html[data-theme=dark] .zm-item+.zm-item {border-top: 1px solid #424b56;}
html[data-theme=dark] a {color: #D4E5F4 !important;}
html[data-theme=dark] ins, html[data-theme=dark] ins a {color: #009688 !important;}
html[data-theme=dark] del a {color: #E91E63 !important;}
html[data-theme=dark] div#zh-hovercard a {color: #353535 !important;}
            `,
            style_darkMode_2 = `/* 暗黑模式（方案 2） */
html {filter: invert(90%) !important; text-shadow: 0 0 0 !important;}
html[data-theme=light] body.ZVideo-body {background-color: #fff;}
img, .ZVideoItem-video, .ZVideo-video, .VideoAnswerPlayer-video {filter: invert(1) !important;}
.css-5ym188, body>div>div>span+div>div[style='opacity: 1;'] {background-color: rgba(255, 255, 255, 0.65) !important;}
.GifPlayer img, .GifPlayer.isPlaying video {filter: invert(1) !important;}
.GifPlayer.isPlaying img.ztext-gif.GifPlayer-gif2mp4Image, img[alt="[公式]"] {filter: none !important;}
`,
            style_darkMode_2_firefox = `/* 暗黑模式（方案 2） */
html {filter: invert(90%) !important; background-image: url(); text-shadow: 0 0 0 !important;}
html[data-theme=light] body.ZVideo-body {background-color: #fff;}
img, .ZVideoItem-video, .ZVideo-video, .VideoAnswerPlayer-video {filter: invert(1) !important;}
.GifPlayer img, .GifPlayer.isPlaying video {filter: invert(1) !important;}
.GifPlayer.isPlaying img.ztext-gif.GifPlayer-gif2mp4Image {filter: none !important;}
`,
            style_darkMode_3 = `/* 暗黑模式（方案 3） */
html {filter: brightness(70%) !important;}
`,
            style_darkMode_3_firefox = `/* 暗黑模式（方案 3） */
html {filter: brightness(70%) !important; background-image: url();}
`,
            style_darkMode_4 = `/* 暗黑模式（方案 4） */
html {filter: brightness(65%) sepia(30%) !important;}
`,
             style_darkMode_4_firefox = `/* 暗黑模式（方案 4） */
html {filter: brightness(65%) sepia(30%) !important; background-image: url();}
`
        let style_Add = document.createElement('style');



        // 如果开启了 [暗黑模式]
        if (menu_value('menu_darkMode')) {
            // firefox 浏览器
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                style_darkMode_2 = style_darkMode_2_firefox
                style_darkMode_3 = style_darkMode_3_firefox
                style_darkMode_4 = style_darkMode_4_firefox
            }

            // 如果开启了 [暗黑模式跟随浏览器] 且 当前浏览器是暗黑模式
            if (menu_value('menu_darkModeAuto') && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // 如果是暗黑模式，则需要改为白天模式
                if (getTheme() === 'dark') {
                    setTheme('light');
                }
            } else {
                // 如果暗黑模式为 1
                if (menu_value('menu_darkModeType') === 1) {
                    // 如果当前知乎主题为白天模式，那就是改为暗黑模式
                    if (getTheme() === 'light') {
                        setTheme('dark');
                    }
                    // 如果是问题日志页，则改为暗黑模式
                    if (location.pathname.indexOf('/log') > -1) {
                        document.documentElement.setAttribute('data-theme', 'dark');
                        style_darkMode_1 += style_darkMode_1_x;
                    }
                } else { // 如果是其他暗黑模式，则需要确保为白天模式
                    if (getTheme() === 'dark') {
                        setTheme('light');
                    }
                }
                switch(menu_value('menu_darkModeType')) {
                    case 1:
                        if (!(location.hostname.indexOf('zhuanlan') > -1 && (location.pathname.indexOf('/edit') > -1 || location.pathname.indexOf('/write') > -1))) style += style_darkMode_1;
                        break;
                    case 2:
                        style += style_darkMode_2;
                        break;
                    case 3:
                        style += style_darkMode_3;
                        break;
                    case 4:
                        style += style_darkMode_4;
                        break;
                }
            }
        } else {
            if (getTheme() === 'dark'){
                setTheme('light');
            }
        }

        if (location.pathname === '/' || location.pathname === '/hot' || location.pathname === '/follow') style += style_index;
        if (menu_value('menu_darkMode') && menu_value('menu_darkModeType') === 1 && (location.pathname.indexOf('/special/') > -1 || location.pathname.indexOf('/pub/') > -1)) style += style_darkMode_2 + 'video {filter: invert(1) !important;}';

        // 宽屏显示
        if (menu_value('menu_widescreenDisplayIndex')) style += style_widescreenDisplayIndex;
        if (menu_value('menu_widescreenDisplayQuestion') && location.pathname.indexOf('/question/') > -1) style += style_widescreenDisplayQuestion;
        if (menu_value('menu_widescreenDisplaySearch') && (location.pathname === '/search' || location.pathname.indexOf('/club/') > -1 || location.pathname.indexOf('/topic/') > -1)) style += style_widescreenDisplaySearch;
        if (menu_value('menu_widescreenDisplayCollection') && location.pathname.indexOf('/collection/') > -1) style += style_widescreenDisplayCollection;
        if (menu_value('menu_widescreenDisplayPost') && location.hostname.indexOf('zhuanlan') > -1 && (location.pathname.indexOf('/edit') === -1 || location.pathname.indexOf('/write') === -1)) style += style_widescreenDisplayPost;
        if (menu_value('menu_widescreenDisplayPeople') && location.pathname.indexOf('/people/') > -1) style += style_widescreenDisplayPeople;

        // 调整图片最大高度
        if (menu_value('menu_picHeight')) style += style_4;
        // 隐藏文章开头大图
        if (menu_value('menu_postimg')) style += style_2;

        if (document.lastChild) {
            document.lastChild.appendChild(style_Add).textContent = style;
        } else { // 避免网站加载速度太慢的备用措施
            let timer1 = setInterval(function(){ // 每 10 毫秒检查一下 html 是否已存在
                if (document.lastChild) {
                    clearInterval(timer1); // 取消定时器
                    document.lastChild.appendChild(style_Add).textContent = style;
                }
            });
        }
    }

    function hideTitle() {
        // 获取需要控制的元素
        const floatingElement = document.getElementsByTagName('header')[0];
        let beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
            scrollHeight = window.innerHeight || document.documentElement.clientHeight

        window.addEventListener('scroll', function (e) {
            var afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                delta = afterScrollTop - beforeScrollTop;
            //console.log(delta,floatingElement)
            if (delta == 0) return false;
            if (delta > 0) {// 向下滚动 隐藏
                floatingElement.hidden = true;
            } else {
                // 向上滚动 显示
                floatingElement.hidden = false;
            }
            beforeScrollTop = afterScrollTop;
        }, false);
    }

    // 获取知乎 Cookie 中的主题类型
    function getTheme() {
        let name = 'theme=',
            ca = document.cookie.split(';');
        for (let i=0; i<ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return 'light';
    }

    // 修改知乎 Cookie 中的主题类型
    function setTheme(theme) {
        switch(theme) {
            case 'light':
                document.cookie='theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                document.lastChild.setAttribute('data-theme', 'light');
                location.reload(); // 刷新网页
                break;
            case 'dark':
                document.cookie='theme=dark; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/';
                document.lastChild.setAttribute('data-theme', 'dark');
                if (GM_getValue('menu_darkMode')) location.reload(); // 刷新网页
                break;
        }
    }
})();