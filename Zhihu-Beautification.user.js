// ==UserScript==
// @name         知乎美化
// @version      1.1.10
// @author       X.I.U
// @description  宽屏显示、暗黑模式（4种）、隐藏文章开头大图、调整图片最大高度、向下翻时自动隐藏顶栏、文章编辑页面与实际文章宽度一致、屏蔽登录提示
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/p/*
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/412212
// ==/UserScript==

(function() {
    var menu_ALL = [
        ['menu_widescreenDisplay', '宽屏显示', '一键收起回答', true],
        ['menu_darkMode', '暗黑模式', '暗黑模式', true],
        ['menu_darkModeType', '暗黑模式切换（1~4）', '暗黑模式切换', 1],
        ['menu_picHeight', '调整图片最大高度', '调整图片最大高度', true],
        ['menu_postimg', '隐藏文章开头大图', '隐藏文章开头大图', true],
        ['menu_hideTitle', '向下翻时自动隐藏顶栏', '向下翻时自动隐藏顶栏', true]
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
                if (menu_ALL[i][3] > 4){ // 避免在减少 raw 数组后，用户储存的数据大于数组而报错
                    menu_ALL[i][3] = 1;
                    GM_setValue('menu_darkModeType', menu_ALL[i][3]);
                }
                menu_ID[i] = GM_registerMenuCommand(`[ ${menu_ALL[i][3]} ] ${menu_ALL[i][1]}`, function(){menu_toggle(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`)});
            } else {
                menu_ID[i] = GM_registerMenuCommand(`[ ${menu_ALL[i][3]?'√':'×'} ] ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412212/feedback', {active: true,insert: true,setParent: true});});
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
        //GM_notification({text: `已切换暗黑模式为：方案 ${menu_status}\n（刷新网页后生效）`, timeout: 3500}); // 提示消息
        location.reload(); // 刷新网页
    };

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);
            GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
        } else {
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
        let style = `/* 屏蔽登录提示 */
.Question-mainColumnLogin {display: none !important;}
/* 屏蔽首页广告 */
.TopstoryItem--advertCard {display: none !important;}
/* 屏蔽回答页广告 */
.Pc-card.Card {display: none !important;}
/* 屏蔽文章页推荐文章 */
.Recommendations-Main {display: none !important;}
`,
            style_1 = `/* 宽屏显示 */
.GlobalSideBar,.Question-sideColumn,.ContentLayout-sideColumn,.SearchSideBar,.Card.QuestionHeaderTopicMeta {
	display: none !important;
}
.Topstory-mainColumn,.Question-mainColumn,.ContentLayout-mainColumn,.SearchMain,.QuestionWaiting-mainColumn {
	width: 1000px !important;
}
.QuestionWaiting-mainColumn {
	margin-right: 0 !important;
}
.ImageMessage-ImageView {
	z-index: 999 !important;
}
`,
            style_2 = `/* 隐藏在各列表中查看文章时开头显示的大图，不影响文章、专栏页面 */
.RichContent img.ArticleItem-image {
	display: none !important;
}
`,
            style_3 = `/* 调整文章编辑页面与实际文章宽度一致 */
.PostEditor .RichText {
	min-width: 690px !important;
}
/* 及标题输入框内的文字大小 */
.WriteIndex-titleInput .Input {
	min-width: 690px !important;
	font-size: 24px;
}
`,
            style_4 = `/* 向下翻时自动隐藏顶栏*/
header.is-hidden {
	display: none;
}
`,
            style_5 = `/* 调整图片最大高度 */
.ztext .content_image, .ztext .origin_image, .GifPlayer img {
	max-height: 500px;
	width: auto;
}
`,
            style_6 = `/* 暗黑模式（方案 1） */
/* 文字颜色 */
html[data-theme=dark] body {color: #bbb !important;}
html[data-theme=dark] .ContentItem-title, html[data-theme=dark] .QuestionHeader-title {color: #ccc !important;}
/* 背景颜色 - 网页 */
html[data-theme=dark] body {background: #22272E !important;}
/* 背景颜色 - 问题 */
html[data-theme=dark] .AppHeader, html[data-theme=dark] .QuestionHeader, html[data-theme=dark] .QuestionHeader-footer, html[data-theme=dark] .Input-wrapper.Input-wrapper--grey, html[data-theme=dark] .EmoticonsFooter-item--selected, html[data-theme=dark] .Card, html[data-theme=dark] .ContentItem-actions, html[data-theme=dark] .MoreAnswers .List-headerText, html[data-theme=dark] .CommentsV2-withPagination, html[data-theme=dark] .Topbar, html[data-theme=dark] .CommentsV2-footer, html[data-theme=dark] .CommentEditorV2-inputWrap--active, html[data-theme=dark] .InputLike, html[data-theme=dark] .Popover-content, html[data-theme=dark] .Notifications-footer, html[data-theme=dark] .Messages-footer, html[data-theme=dark] .Modal-inner, html[data-theme=dark] .Emoticons, html[data-theme=dark] .EmoticonsFooter, html[data-theme=dark] .SearchTabs {background: #2D333B !important;}
html[data-theme=dark] .CommentListV2-header-divider, html[data-theme=dark] .CommentsV2-openComment-divider {background-color: #222933 !important;}
/* 背景颜色 - 用户页面 */
html[data-theme=dark] .ProfileHeader-wrapper, html[data-theme=dark] .UserCover {background: #1c2129 !important;}
/* 背景颜色 - 用户页面 - 封面大图/文章头部大图 */
html[data-theme=dark] img.UserCover-image, html[data-theme=dark] img.TitleImage {opacity: 0.7;}
/* 边框 */
html[data-theme=dark] .Topbar, html[data-theme=dark] .CommentsV2-footer, html[data-theme=dark] .Topstory-mainColumnCard .Card:not(.Topstory-tabCard), html[data-theme=dark] .NestComment:not(:last-child):after, html[data-theme=dark] .NestComment--rootComment:after, html[data-theme=dark] .NestComment .NestComment--child:after, html[data-theme=dark] .NestComment .NestComment--child:after, html[data-theme=dark] .CommentsV2-replyNum, html[data-theme=dark] .CommentItemV2:not(:first-child):after, html[data-theme=dark] .Tabs {border-bottom: 1px solid #282d35 !important;}
/* 背景颜色 - 专栏/文章 */
html[data-theme=dark] .WhiteBg-body, html[data-theme=dark] .Post-content {background: #22272E !important;}
html[data-theme=dark] .ColumnPageHeader {background: #1c2129 !important;}
/* 按钮颜色（蓝色） */
.TopstoryTabs-link.is-active, html[data-theme=dark] .TopstoryTabs-link.is-active, html[data-theme=dark] .VoteButton, .Tag, html[data-theme=dark] .Tag {color: #3faaff !important;}
/*html[data-theme=dark] .Tabs-link.is-active:after {background: #2196F3 !important;}*/
html[data-theme=dark] .Reward-rewardBtn {color: #ffffff !important;}
`,
            style_7 = `/* 暗黑模式（方案 2） */
html {filter: invert(80%) !important;}
img, .ZVideoItem-video, .ZVideo-video {filter: invert(1) !important;}
`,
            style_8 = `/* 暗黑模式（方案 3） */
html {filter: brightness(80%) !important;}
`,
            style_9 = `/* 暗黑模式（方案 4） */
html {filter: brightness(80%) sepia(30%) !important;}
`
        let style_Add = document.createElement('style');

        // 宽屏显示
        if (menu_value('menu_widescreenDisplay')) {
            style += style_1;
        }

        // 调整图片最大高度
        if (menu_value('menu_picHeight')) {
            style += style_5;
        }

        // 隐藏文章开头大图
        if (menu_value('menu_postimg')) {
            style += style_2;
        }

        // 向下翻时自动隐藏顶栏
        if (menu_value('menu_hideTitle')) {
            style += style_4;
        }

        // 暗黑模式
        if (menu_value('menu_darkMode')) {
            switch(menu_value('menu_darkModeType')) {
                case 1:
                    style += style_6;
                    if (document.getElementsByTagName('html')[0].getAttribute('data-theme') != 'dark') {
                        document.getElementsByTagName('html')[0].setAttribute('data-theme', 'dark')
                        location.search = '?theme=dark'
                    }
                    break;
                case 2:
                    style += style_7;
                    if (document.getElementsByTagName('html')[0].getAttribute('data-theme') === 'dark') {
                        document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light')
                        location.search = '?theme=light'
                    }
                    break;
                case 3:
                    style += style_8;
                    if (document.getElementsByTagName('html')[0].getAttribute('data-theme') === 'dark') {
                        document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light')
                        location.search = '?theme=light'
                    }
                    break;
                case 4:
                    style += style_9;
                    if (document.getElementsByTagName('html')[0].getAttribute('data-theme') === 'dark') {
                        document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light')
                        location.search = '?theme=light'
                    }
                    break;
            }
        } else {
            if (document.getElementsByTagName('html')[0].getAttribute('data-theme') === 'dark') {
                document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light')
                location.search = '?theme=light'
            }
        }

        // 文章编辑页面与实际文章宽度一致
        if(window.location.href.indexOf("zhuanlan") > -1){
            if(window.location.href.indexOf("/edit") > -1){
                style += style_3;
            }
        }

        style_Add.innerHTML = style;
        document.head.appendChild(style_Add);
    }
})();