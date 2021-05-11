// ==UserScript==
// @name         知乎美化
// @version      1.1.18
// @author       X.I.U
// @description  宽屏显示、暗黑模式（4种）、隐藏文章开头大图、调整图片最大高度、向下翻时自动隐藏顶栏、文章编辑页面与实际文章宽度一致、屏蔽登录提示
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
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
        ['menu_widescreenDisplay', '宽屏显示', '宽屏显示', true],
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
        if (menu_status === 1) { // 设置 Cookie
            if (getTheme() === 'light') document.cookie="theme=dark; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/";
        } else {
            if (getTheme() === 'dark') document.cookie="theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
        if (menu_value('menu_darkMode')) {
            location.reload(); // 刷新网页
        } else {
            GM_notification({text: `已切换暗黑模式为：方案 ${menu_status}\n`, timeout: 3500}); // 提示消息
            registerMenuCommand(); // 重新注册脚本菜单
        }
    };

    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);

            if (Name === 'menu_darkMode') { // 暗黑模式
                if (getTheme() === 'dark') document.cookie="theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                location.reload(); // 刷新网页
            } else {
                GM_notification({text: `已关闭 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
            }
        } else {
            GM_setValue(`${Name}`, true);

            if (Name === 'menu_darkMode') {
                if (menu_value('menu_darkModeType') === 1) {
                    if (getTheme() === 'light') document.cookie="theme=dark; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/";
                } else {
                    if (getTheme() === 'dark') document.cookie="theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                }
                location.reload(); // 刷新网页
            } else {
                GM_notification({text: `已开启 [${Tips}] 功能\n（刷新网页后生效）`, timeout: 3500});
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
.GlobalSideBar, .Question-sideColumn, .ContentLayout-sideColumn, .SearchSideBar, .Card.QuestionHeaderTopicMeta, .ClubSideBar {
	display: none !important;
}
.Topstory-mainColumn, .Question-mainColumn, .ContentLayout-mainColumn,.SearchMain, .QuestionWaiting-mainColumn, .Club-mainColumn, .Post-mainColumn {
	width: 1000px !important;
}
.QuestionWaiting-mainColumn {
	margin-right: 0 !important;
}
.ImageMessage-ImageView {
	z-index: 999 !important;
}`,
            style_2 = `/* 隐藏在各列表中查看文章时开头显示的大图，不影响文章、专栏页面 */
.RichContent img.ArticleItem-image {display: none !important;}
`,
            style_3 = `/* 调整文章编辑页面与实际文章宽度一致 */
.PostEditor .RichText {min-width: 690px !important;}
/* 及标题输入框内的文字大小 */
.WriteIndex-titleInput .Input {min-width: 690px !important;font-size: 24px;}
`,
            style_4 = `/* 向下翻时自动隐藏顶栏*/
header.is-hidden {display: none;}
`,
            style_5 = `/* 调整图片最大高度 */
.ztext .content_image, .ztext .origin_image, .GifPlayer img {max-height: 500px;width: auto;}
`,
            style_darkMode_1 = `/* 暗黑模式（方案 1） */
/* 文字颜色 */
html[data-theme=dark] body, html[data-theme=dark] .ContentItem-title, html[data-theme=dark] .QuestionHeader-title, html[data-theme=dark] .Tabs-link, html[data-theme=dark] .CreatorEntrance-title, html[data-theme=dark] .Search-container, html[data-theme=dark] .HotItem-excerpt, html[data-theme=dark] .PushNotifications-item, html[data-theme=dark] .Notifications-Main>header h1, html[data-theme=dark] .Notifications-Section-header h2, html[data-theme=dark] .NotificationList-Item-content, html[data-theme=dark] .Reward {color: #adbac7 !important;}
/* 热榜标题 */
html[data-theme=dark] .HotItem-title {color: #c4cfda !important;}
/* 首页信息流标题 */
html[data-theme=dark] .ContentItem-title a:hover, html[data-theme=dark] .RichContent.is-collapsed .RichContent-inner:hover, html[data-theme=dark] .ContentItem-more:hover {color: #c6d7ea !important;}


/* 背景颜色 - 网页 */
html[data-theme=dark] body {background: #22272E !important;}
/* 背景颜色 - 问题 */
html[data-theme=dark] .AppHeader, html[data-theme=dark] .QuestionHeader, html[data-theme=dark] .QuestionHeader-footer, html[data-theme=dark] .Input-wrapper.Input-wrapper--grey, html[data-theme=dark] .EmoticonsFooter-item--selected, html[data-theme=dark] .Card, html[data-theme=dark] .ContentItem-actions, html[data-theme=dark] .MoreAnswers .List-headerText, html[data-theme=dark] .CommentsV2-withPagination, html[data-theme=dark] .Topbar, html[data-theme=dark] .CommentsV2-footer, html[data-theme=dark] .CommentEditorV2-inputWrap--active, html[data-theme=dark] .InputLike, html[data-theme=dark] .Popover-content, html[data-theme=dark] .Notifications-footer, html[data-theme=dark] .Messages-footer, html[data-theme=dark] .Modal-inner, html[data-theme=dark] .Emoticons, html[data-theme=dark] .EmoticonsFooter, html[data-theme=dark] .SearchTabs, html[data-theme=dark] .Popover-arrow:after, html[data-theme=dark] .CommentEditorV2-inputWrap, html[data-theme=dark] .ProfileHeader-wrapper, html[data-theme=dark] .UserCover, html[data-theme=dark] .AnswerForm-footer, html[data-theme=dark] .Editable-toolbar, html[data-theme=dark] .AnswerForm-fullscreenContent .Editable-toolbar, html[data-theme=dark] .KfeCollection-PcCollegeCard-wrapper, html[data-theme=dark] .KfeCollection-PcCollegeCard-root, html[data-theme=dark] .HotItem, html[data-theme=dark] .HotList, html[data-theme=dark] .HotListNavEditPad, html[data-theme=dark] .QuestionWaiting-typesTopper, html[data-theme=dark] .QuestionWaiting-types, html[data-theme=dark] .PostItem, html[data-theme=dark] .ClubSideBar section, html[data-theme=dark] .SearchSubTabs, html[data-theme=dark] .Club-SearchPosts-Content, html[data-theme=dark] .Club-content, html[data-theme=dark] .ClubJoinOrCheckinButton, html[data-theme=dark] .ClubEdit, html[data-theme=dark] .CornerButton, html[data-theme=dark] .Notifications-Section-header, html[data-theme=dark] .NotificationList, .NotificationList-Item.NotificationList-Item:after, .NotificationList-DateSplit.NotificationList-DateSplit:after, html[data-theme=dark] .Chat, .ChatUserListItem:after, .ChatListGroup-SectionTitle--bottomBorder:after, html[data-theme=dark] .ActionMenu, .ChatSideBar-Search--active, html[data-theme=dark] .ChatSideBar-Search-ResultListWrap, html[data-theme=dark] .QuestionMainDivider-inner, html[data-theme=dark] .Topic-bar, html[data-theme=dark] .AnnotationTag, html[data-theme=dark] .HoverCard, html[data-theme=dark] .HoverCard-loading {background: #2D333B !important;}
html[data-theme=dark] .CommentListV2-header-divider, html[data-theme=dark] .CommentsV2-openComment-divider, html[data-theme=dark] .AnswerForm-fullscreenScroller, html[data-theme=dark] .HotListNav-item {background-color: #222933 !important;}
html[data-theme=dark] .CornerButton:hover {background: #3f4752 !important;} /* 右下角按钮 */

/* 背景颜色 - 引用 */
html[data-theme=dark] .ztext blockquote {color: #768390 !important;border-left: 3px solid #3b3b3b !important;}

/* 加载动画 */
html[data-theme=dark] .PlaceHolder-bg {background: -webkit-gradient(linear,left top,right top,from(#22272e),color-stop(20%,#2d333b),color-stop(40%,#22272e),to(#22272e)) !important;background: linear-gradient(90deg,#22272e 0,#2d333b 20%,#22272e 40%,#22272e) !important;}
html[data-theme=dark] .PlaceHolder-inner {background: #22272e !important;color: #2d333b !important;}

/* 私信 */
html[data-theme=dark] .Input-wrapper {background-color: #30363f !important;}
html[data-theme=dark] .TextMessage-sender, html[data-theme="dark"] .TextMessage-sender::after {background-color: #57616f !important;}
html[data-theme=dark] .TextMessage-receiver, html[data-theme="dark"] .TextMessage-receiver::after {background-color: #1e5fbf !important;}

html[data-theme=dark] .TextMessage-sender, html[data-theme=dark] .TextMessage-receiver {color: #dcdcdc !important;}
/*html[data-theme=dark] .MessagesBox::-webkit-scrollbar {width: 0px !important;height: 0px !important;}*/
html[data-theme=dark] .ToolBar, html[data-theme=dark] .Input-wrapper, html[data-theme=dark] .ClubTopPosts {border: none !important;}

/* 私信网页 */
html[data-theme=dark] .ChatUserListItem .Chat-ActionMenuPopover-Button {background: -webkit-gradient(linear,left top,right top,from(rgba(18,18,18,0)),color-stop(20%,#22272e)) !important;background: linear-gradient(90deg,rgba(18,18,18,0),#22272e 20%) !important;}

/* 选项鼠标指向时背景颜色 */
html[data-theme=dark] .Messages-item:hover, html[data-theme=dark] .GlobalSideBar-navLink:hover, html[data-theme=dark] .Menu-item.is-active, html[data-theme=dark] .ActionMenu-item:hover, html[data-theme=dark] .ChatUserListItem--active {background-color: #272c33 !important;}
/* 通知 */
html[data-theme=dark] .PushNotifications-item a {color: #8ab5e0 !important;}

/* 封面大图/文章头部大图 */
html[data-theme=dark] img.UserCover-image, html[data-theme=dark] img.TitleImage {opacity: 0.7 !important;}
/* 其他图片 */
html[data-theme=dark] img {opacity: 0.9 !important;}
/* GIF 动图除外 */
html[data-theme=dark] .GifPlayer img {opacity: 1 !important;}

/* 边框 */
html[data-theme=dark] .Topbar, html[data-theme=dark] .CommentsV2-footer, html[data-theme=dark] .Topstory-mainColumnCard .Card:not(.Topstory-tabCard), html[data-theme=dark] .NestComment:not(:last-child):after, html[data-theme=dark] .NestComment--rootComment:after, html[data-theme=dark] .NestComment .NestComment--child:after, html[data-theme=dark] .NestComment .NestComment--child:after, html[data-theme=dark] .CommentsV2-replyNum, html[data-theme=dark] .CommentItemV2:not(:first-child):after, html[data-theme=dark] .Tabs, html[data-theme=dark] .Popover-arrow:after {border-bottom: 1px solid #282d35 !important;}
html[data-theme=dark] .CommentEditorV2-inputWrap--active, html[data-theme=dark] .CommentEditorV2-inputWrap, html[data-theme=dark] .PostItem {border: none !important;}
html[data-theme=dark] .InputLike {border: 1px solid #424b56 !important;}

/* 滚动条 */
html[data-theme=dark] body::-webkit-scrollbar, html[data-theme="dark"] .MessagesBox::-webkit-scrollbar, html[data-theme="dark"] .Messages-list::-webkit-scrollbar, html[data-theme=dark] .PushNotifications-list::-webkit-scrollbar, html[data-theme=dark] .CommentListV2::-webkit-scrollbar, .ChatListGroup-SectionContent::-webkit-scrollbar, html[data-theme=dark] .ChatSideBar-Search-ResultListWrap::-webkit-scrollbar {width: 6px !important;height: 1px !important;}
html[data-theme=dark] body::-webkit-scrollbar-thumb, html[data-theme="dark"] .MessagesBox::-webkit-scrollbar-thumb, html[data-theme="dark"] .Messages-list::-webkit-scrollbar-thumb, html[data-theme=dark] .PushNotifications-list::-webkit-scrollbar-thumb, html[data-theme=dark] .CommentListV2::-webkit-scrollbar-thumb, .ChatListGroup-SectionContent::-webkit-scrollbar-thumb, html[data-theme=dark] .ChatSideBar-Search-ResultListWrap::-webkit-scrollbar-thumb {background: #3f4752 !important;}
html[data-theme=dark] body::-webkit-scrollbar-track, .ChatListGroup-SectionContent::-webkit-scrollbar-track, html[data-theme=dark] .ChatSideBar-Search-ResultListWrap::-webkit-scrollbar-track {background: #22272e !important;}
html[data-theme=dark] .MessagesBox::-webkit-scrollbar-track, html[data-theme="dark"] .Messages-list::-webkit-scrollbar-track, html[data-theme=dark] .PushNotifications-list::-webkit-scrollbar-track, html[data-theme=dark] .CommentListV2::-webkit-scrollbar-track {background: #2d333b !important;}

/* 背景颜色 - 专栏/文章 */
html[data-theme=dark] .WhiteBg-body, html[data-theme=dark] .Post-content {background: #22272E !important;}
html[data-theme=dark] .ColumnPageHeader {background: #1c2129 !important;}

/* 按钮颜色（蓝色） */
.TopstoryTabs-link.is-active, html[data-theme=dark] .TopstoryTabs-link.is-active, html[data-theme=dark] .VoteButton, .Tag, html[data-theme=dark] .Tag, html[data-theme=dark] .HotListNav-item.is-active, html[data-theme=dark] .RichText a.UserLink-link {color: #3faaff !important;}
/*html[data-theme=dark] .Tabs-link.is-active:after {background: #2196F3 !important;}*/
html[data-theme=dark] .Reward-rewardBtn {color: #ffffff !important;}

/* 关闭查看回复时的高闪 */
html[data-theme=dark] .CommentItemV2--highlighted {-webkit-animation: nano !important;animation: nano !important;}
`,
            style_darkMode_2 = `/* 暗黑模式（方案 2） */
html {filter: invert(80%) !important;}
img, .ZVideoItem-video, .ZVideo-video {filter: invert(1) !important;}
.GifPlayer img, .GifPlayer.isPlaying video {filter: invert(1) !important;}
.GifPlayer.isPlaying img.ztext-gif.GifPlayer-gif2mp4Image {filter: none !important;}
`,
            style_darkMode_3 = `/* 暗黑模式（方案 3） */
html {filter: brightness(75%) !important;}
`,
            style_darkMode_4 = `/* 暗黑模式（方案 4） */
html {filter: brightness(75%) sepia(30%) !important;}
`
        let style_Add = document.createElement('style');

        // 暗黑模式
        if (menu_value('menu_darkMode')) {
            if (menu_value('menu_darkModeType') === 1) {
                if (getTheme() === 'light') {
                    document.cookie="theme=dark; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/";
                    document.getElementsByTagName('html')[0].setAttribute('data-theme', 'dark');
                    location.reload(); // 刷新网页
                }
            } else {
                if (getTheme() === 'dark') {
                    document.cookie="theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                    document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light');
                    location.reload(); // 刷新网页
                }
            }
            switch(menu_value('menu_darkModeType')) {
                case 1:
                    style += style_darkMode_1;
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
        } else {
            if (getTheme() === 'dark'){
                document.cookie="theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light');
                location.reload(); // 刷新网页
            }
        }

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

        // 文章编辑页面与实际文章宽度一致
        if(window.location.href.indexOf("zhuanlan") > -1){
            if(window.location.href.indexOf("/edit") > -1){
                style += style_3;
            }
        }

        style_Add.innerHTML = style;
        if (document.head) {
                document.head.appendChild(style_Add);
        } else {
            let timer = setInterval(function(){
                if (document.head) {
                    document.head.appendChild(style_Add);
                    clearInterval(timer);
                }
            }, 1);
        }
    }
    function getTheme() {
        let name = "theme=";
        let ca = document.cookie.split(';');
        for(let i=0; i<ca.length; i++)
        {
            let c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "light";
    }
})();