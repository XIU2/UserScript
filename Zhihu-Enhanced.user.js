// ==UserScript==
// @name         知乎增强
// @version      1.5.4
// @author       X.I.U
// @description  移除登录弹窗、一键收起回答、收起当前回答/评论（点击两侧空白处）、快捷回到顶部（右键两侧空白处）、屏蔽用户 (发布的内容)、屏蔽关键词（标题/评论）、屏蔽盐选内容、展开问题描述、置顶显示时间、显示问题时间、区分问题文章、默认高清原图、默认站外直链
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_info
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/4122051
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

'use strict';
var menu_ALL = [
    ['menu_collapsedAnswer', '一键收起回答', '一键收起回答', true],
    ['menu_collapsedNowAnswer', '收起当前回答/评论（点击两侧空白处）', '收起当前回答/评论', true],
    ['menu_backToTop', '快捷回到顶部（右键两侧空白处）', '快捷回到顶部', true],
    ['menu_blockUsers', '屏蔽指定用户', '屏蔽指定用户', true],
    ['menu_customBlockUsers', '自定义屏蔽用户', '自定义屏蔽用户', ['故事档案局', '盐选推荐', '盐选科普', '盐选成长计划', '知乎盐选会员', '知乎盐选创作者', '盐选心理', '盐选健康必修课', '盐选奇妙物语', '盐选生活馆', '盐选职场', '盐选文学甄选', '盐选作者小管家', '盐选博物馆', '盐选点金', '盐选测评室', '盐选科技前沿', '盐选会员精品']],
    ['menu_blockKeywords', '屏蔽指定关键词', '屏蔽指定关键词', true],
    ['menu_customBlockKeywords', '自定义屏蔽关键词', '自定义屏蔽关键词', []],
    ['menu_blockYanXuan', '屏蔽盐选内容', '屏蔽盐选内容', false],
    ['menu_questionRichTextMore', '展开问题描述', '展开问题描述', false],
    ['menu_publishTop', '置顶显示时间', '置顶显示时间', true],
    ['menu_allTime', '完整显示时间', '完整显示时间', true],
    ['menu_typeTips', '区分问题文章', '区分问题文章', true],
    ['menu_directLink', '默认站外直链', '默认站外直链', true]
], menu_ID = [];
for (let i=0;i<menu_ALL.length;i++){ // 如果读取到的值为 null 就写入默认值
    if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
}
registerMenuCommand();

// 注册脚本菜单
function registerMenuCommand() {
    if (menu_ID.length > menu_ALL.length){ // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
        for (let i=0;i<menu_ID.length;i++){
            GM_unregisterMenuCommand(menu_ID[i]);
        }
    }
    for (let i=0;i<menu_ALL.length;i++){ // 循环注册脚本菜单
        menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
        if (menu_ALL[i][0] === 'menu_customBlockUsers') {
            menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockUsers()});
        } else if (menu_ALL[i][0] === 'menu_customBlockKeywords') {
            menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockKeywords()});
        } else {
            menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        }
    }
    menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419081/feedback', {active: true,insert: true,setParent: true});});
}


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


// 一键收起回答
function collapsedAnswer() {
    if (!menu_value('menu_collapsedAnswer')) return
    if (document.querySelector('.CornerAnimayedFlex')) {
        document.head.appendChild(document.createElement('style')).textContent = '.CornerButton{margin-bottom:8px !important;}.CornerButtons{bottom:45px !important;}';
        document.querySelector('.CornerAnimayedFlex').insertAdjacentHTML('afterBegin', '<button id="collapsed-button" data-tooltip="收起回答" data-tooltip-position="left" data-tooltip-will-hide-on-click="false" aria-label="收起回答" type="button" class="Button CornerButton Button--plain"><svg class="ContentItem-arrowIcon is-active" aria-label="收起回答" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></button>');
        document.getElementById('collapsed-button').onclick = function () {
            document.querySelectorAll('.ContentItem-rightButton').forEach(function (el) {
                if (el.hasAttribute('data-zop-retract-question')) {
                    el.click()
                }
            });
        }
    }
}


// 收起当前回答、评论（监听点击事件，点击网页两侧空白处）
function collapsedNowAnswer(selectors) {
    backToTop(selectors) // 快捷回到顶部
    if (!menu_value('menu_collapsedNowAnswer')) return
    document.querySelector(selectors).onclick = function(event){
        if (event.target == this) {
            // 下面这段主要是 [收起回答]，顺便 [收起评论]（如果展开了的话）
            let rightButton = document.querySelector('.ContentItem-actions.Sticky.RichContent-actions.is-fixed.is-bottom')
            // 悬浮在底部的 [收起回答]（此时正在浏览回答内容 [中间区域]）
            if (rightButton) {
                // 固定的 [收起评论]（先看看是否展开评论）
                let commentCollapseButton = rightButton.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) commentCollapseButton.click();
                // 再去收起回答
                rightButton = rightButton.querySelector('.ContentItem-rightButton[data-zop-retract-question]')
                if (rightButton) rightButton.click();
                // 固定在回答底部的 [收起回答]（此时正在浏览回答内容 [尾部区域]）
            } else {
                let answerCollapseButton_ = false;
                for (let el of document.querySelectorAll('.ContentItem-rightButton[data-zop-retract-question]')) { // 遍历所有回答底部的 [收起] 按钮
                    if (isElementInViewport(el)) { // 判断该 [收起] 按钮是否在可视区域内
                        // 固定的 [收起评论]（先看看是否展开评论，即存在 [收起评论] 按钮）
                        let commentCollapseButton = el.parentNode.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                        // 如果展开了评论，就收起评论
                        if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) commentCollapseButton.click();
                        el.click() // 再去收起回答
                        answerCollapseButton_ = true; // 如果找到并点击收起了，就没必要执行下面的代码了（可视区域中没有 [收起回答] 时）
                        break
                    }
                }
                // 针对完全看不到 [收起回答] 按钮时（如 [头部区域]，以及部分明明很长却不显示悬浮横条的回答）
                if (!answerCollapseButton_) {
                    for (let el of document.querySelectorAll('.List-item, .Card.AnswerCard')) { // 遍历所有回答主体元素
                        if (isElementInViewport_(el)) { // 判断该回答是否在可视区域内
                            // 固定的 [收起评论]（先看看是否展开评论，即存在 [收起评论] 按钮）
                            let commentCollapseButton = el.parentNode.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                            // 如果展开了评论，就收起评论
                            if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) commentCollapseButton.click();
                            let answerCollapseButton__ = document.querySelector('.ContentItem-rightButton[data-zop-retract-question]');
                            if (answerCollapseButton__) answerCollapseButton__.click() // 再去收起回答
                            break
                        }
                    }
                }
            }

            // 下面这段只针对 [收起评论]（如果展开了的话）
            let commentCollapseButton_ = false, commentCollapseButton__ = false;
            // 悬浮的 [收起评论]（此时正在浏览评论内容 [中间区域]）
            let commentCollapseButton = document.querySelector('.CommentCollapseButton')
            if (commentCollapseButton) {
                commentCollapseButton.click();
            } else { // 固定的 [收起评论]（此时正在浏览评论内容 [头部区域]）
                let commentCollapseButton_1 = document.querySelectorAll('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type, .ContentItem-action > button.Button.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                if (commentCollapseButton_1.length > 0) {
                    for (let el of commentCollapseButton_1) {
                        if (el.textContent.indexOf('收起评论') > -1) {
                            if (isElementInViewport(el)) {
                                el.click()
                                commentCollapseButton_ = true // 如果找到并点击了，就没必要执行下面的代码了（可视区域中没有 [收起评论] 时）
                                break
                            }
                        }
                    }
                }
                if (commentCollapseButton_ == false) { // 可视区域中没有 [收起评论] 时（此时正在浏览评论内容 [头部区域] + [尾部区域](不上不下的，既看不到固定的 [收起评论] 又看不到悬浮的 [收起评论])），需要判断可视区域中是否存在评论元素
                    let commentCollapseButton_1 = document.querySelectorAll('.NestComment')
                    if (commentCollapseButton_1.length > 0) {
                        for (let el of commentCollapseButton_1) {
                            if (isElementInViewport(el)) {
                                let commentCollapseButton = el.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                                if (commentCollapseButton.textContent.indexOf('收起评论') > -1) {
                                    commentCollapseButton.click()
                                    commentCollapseButton__ = true // 如果找到并点击了，就没必要执行下面的代码了（可视区域中没有 评论元素 时）
                                    break
                                }
                            }
                        }
                    }
                    if (commentCollapseButton__ == false) { // 如果上面的都没找到，那么就尝试寻找评论末尾的 [评论回复框]
                        let commentCollapseButton_2 = document.querySelectorAll('.CommentsV2-footer.CommentEditorV2--normal .CommentEditorV2-inputWrap')
                        if (commentCollapseButton_2.length > 0) {
                            for (let el of commentCollapseButton_2) {
                                if (isElementInViewport(el)) {
                                    let commentCollapseButton = el.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                                    console.log(commentCollapseButton)
                                    if (commentCollapseButton.textContent.indexOf('收起评论') > -1) {
                                        commentCollapseButton.click()
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


// 回到顶部（监听点击事件，鼠标右键点击网页两侧空白处）
function backToTop(selectors) {
    if (!menu_value('menu_backToTop')) return
    document.querySelector(selectors).oncontextmenu = function(event){
        if (event.target == this) {
            event.preventDefault();
            window.scrollTo(0,0)
        }
    }
}


//获取元素是否在可视区域（完全可见）
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
//获取元素是否在可视区域（部分可见）
function isElementInViewport_(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// 自定义屏蔽用户
function customBlockUsers() {
    let nowBlockUsers = '';
    menu_value('menu_customBlockUsers').forEach(function(item){nowBlockUsers += '|' + item})
    let newBlockUsers = prompt('编辑 [自定义屏蔽用户]\n（不同用户名之间使用 "|" 分隔，例如：用户A|用户B|用户C ）', nowBlockUsers.replace('|',''));
    if (newBlockUsers === '') {
        GM_setValue('menu_customBlockUsers', []);
        registerMenuCommand(); // 重新注册脚本菜单
    } else if (newBlockUsers != null) {
        GM_setValue('menu_customBlockUsers', newBlockUsers.split('|'));
        registerMenuCommand(); // 重新注册脚本菜单
    }
};


// 屏蔽指定用户
function blockUsers(type) {
    if (!menu_value('menu_blockUsers')) return
    if (!menu_value('menu_customBlockUsers') || menu_value('menu_customBlockUsers').length < 1) return
    switch(type) {
        case 'index':
            blockUsers_('.Card.TopstoryItem.TopstoryItem--old.TopstoryItem-isRecommend', 'Card TopstoryItem TopstoryItem--old TopstoryItem-isRecommend');
            break;
        case 'question':
            blockUsers_question();
            break;
        case 'search':
            blockUsers_search();
            break;
        case 'topic':
            blockUsers_('.List-item.TopicFeedItem', 'List-item TopicFeedItem');
            break;
        case 'people':
            blockUsers_button_people(); // 添加屏蔽用户按钮（用户主页）
            break;
    }
    blockUsers_comment(); //       评论区
    blockUsers_button(); //        加入黑名单按钮

    function blockUsers_(className1, className2) {
        // 前几条因为是直接加载的，而不是动态插入网页的，所以需要单独判断
        function blockKeywords_now() {
            document.querySelectorAll(className1).forEach(function(item1){
                let item = item1.querySelector('.ContentItem.AnswerItem, .ContentItem.ArticleItem'); // 用户名所在元素
                if (item) {
                    for (const keyword of menu_value('menu_customBlockUsers')) { // 遍历用户名黑名单
                        if (item.dataset.zop.indexOf('authorName":"' + keyword + '",') > -1) { // 找到就删除该信息流
                            console.log(item.dataset.zop);
                            item1.remove();
                            break;
                        }
                    }
                }
            })
        }

        blockKeywords_now();
        addLocationchange();
        window.addEventListener('locationchange', function(){
            setTimeout(blockKeywords_now, 500); // 网页 URL 变化后再次执行
        })

        // 这个是监听网页插入事件，用来判断后续网页动态插入的元素
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === className2) {
                        let item = target.querySelector('.ContentItem.AnswerItem, .ContentItem.ArticleItem'); // 用户名所在元素
                        if (item) {
                            for (const keyword of menu_value('menu_customBlockUsers')) { // 遍历用户名黑名单
                                if (item.dataset.zop.indexOf('authorName":"' + keyword + '",') > -1) { // 找到就删除该信息流
                                    console.log(item.dataset.zop);
                                    target.remove();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }


    function blockUsers_question() {
        const blockUsers_question_ = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === 'List-item' || target.className === 'Card AnswerCard') {
                        let item1 = target.querySelector('.ContentItem.AnswerItem');
                        if (item1) {
                            menu_value('menu_customBlockUsers').forEach(function(item2){ // 遍历用户黑名单
                                if (item1.dataset.zop.indexOf('authorName":"' + item2 + '",') > -1) { // 找到就删除该回答
                                    console.log(item1.dataset.zop)
                                    target.remove();
                                }
                            })
                        }
                    }
                }
            }
        };

        const blockUsers_question_answer_ = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    target.querySelectorAll('.List-item, .Card.AnswerCard').forEach(function(item){
                        let item1 = item.querySelector('.ContentItem.AnswerItem');
                        if (item1) {
                            menu_value('menu_customBlockUsers').forEach(function(item2){ // 遍历用户黑名单
                                if (item1.dataset.zop.indexOf('authorName":"' + item2 + '",') > -1) { // 找到就删除该回答
                                    console.log(item1.dataset.zop)
                                    item.remove();
                                }
                            })
                        }
                    })
                }
            }
        };

        if (location.pathname.indexOf('/answer/') > -1) { // 回答页（就是只有三个回答的页面）
            const observer = new MutationObserver(blockUsers_question_answer_);
            observer.observe(document, { childList: true, subtree: true });
        } else { // 问题页（可以显示所有回答的页面）
            const observer = new MutationObserver(blockUsers_question_);
            observer.observe(document, { childList: true, subtree: true });
        }

        // 针对的是打开网页后直接加载的前面几个回答（上面哪些是针对动态加载的回答）
        document.querySelectorAll('.List-item, .Card.AnswerCard').forEach(function(item){
            let item1 = item.querySelector('.ContentItem.AnswerItem');
            if (item1) {
                menu_value('menu_customBlockUsers').forEach(function(item2){ // 遍历用户黑名单
                    if (item1.dataset.zop.indexOf('authorName":"' + item2 + '",') > -1) { // 找到就删除该回答
                        console.log(item1.dataset.zop)
                        item.remove();
                    }
                })
            }
        })
    }

    function blockUsers_search() {
        function blockUsers_now() {
            if (location.search.indexOf('type=content') === -1) return // 目前只支持搜索页的 [综合]
            document.querySelectorAll('.Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"], .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"]').forEach(function(item1){
                let item = item1.querySelector('.RichText.ztext.CopyrightRichText-richText b'); // 标题所在元素
                if (item) {
                    for (const keyword of menu_value('menu_customBlockUsers')) { // 遍历关键词黑名单
                        if (item.textContent === keyword) { // 找到就删除该信息流
                            console.log(item.textContent);
                            item1.remove();
                            break;
                        }
                    }
                }
            })
        }

        setTimeout(blockUsers_now, 500);
        addLocationchange();
        window.addEventListener('locationchange', function(){
            setTimeout(blockUsers_now, 500); // 网页 URL 变化后再次执行
        })

        const callback = (mutationsList, observer) => {
            if (location.search.indexOf('type=content') === -1) return // 目前只支持搜索页的 [综合]
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === 'Card SearchResult-Card' && (target.dataset.zaDetailViewPathModule === 'AnswerItem' || target.dataset.zaDetailViewPathModule === 'PostItem')) {
                        let item = target.querySelector('.RichText.ztext.CopyrightRichText-richText b'); // 用户名所在元素
                        if (item) {
                            for (const keyword of menu_value('menu_customBlockUsers')) { // 遍历用户名黑名单
                                if (item.textContent === keyword) { // 找到就删除该信息流
                                    console.log(item.textContent);
                                    target.remove();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockUsers_comment() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    let item = target.querySelector('img.Avatar.UserLink-avatar')
                    if (item) {
                        menu_value('menu_customBlockUsers').forEach(function(item1){ // 遍历用户黑名单
                            if (item.alt === item1) { // 找到就删除该搜索结果
                                // 试了多种方案，感觉还是这个简单粗暴，缺点就是一旦知乎框架改了就失效了，但好在知乎也不会天天改~
                                if (item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'NestComment--rootCommentNoChild' || item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'NestComment--rootComment') {
                                    item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                                } else if (item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'NestComment--rootCommentNoChild' || item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'NestComment--rootComment') {
                                    item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                                } else if (item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'NestComment--child') {
                                    item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                                } else if (item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'NestComment--child') {
                                    item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                                } else if (item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'NestComment') {
                                    item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                                } else if (item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className === 'CommentItemV2') {
                                    item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                                }
                            }
                        })

                        // 添加屏蔽用户按钮（点赞、回复等按钮后面）
                        if (item) {
                            let footer = item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.CommentItemV2-metaSibling > .CommentItemV2-footer'),
                                userid = item.parentNode;
                            if (userid && footer && !footer.lastElementChild.dataset.name) {
                                userid = userid.href.split('/')[4];
                                footer.insertAdjacentHTML('beforeend',`<button type="button" data-name="${item.alt}" data-userid="${userid}" class="Button CommentItemV2-hoverBtn Button--plain"><span style="display: inline-flex; align-items: center;">&#8203;<svg class="Zi Zi--Like" fill="currentColor" viewBox="0 0 24 24" width="16" height="16" style="transform: rotate(180deg); margin-right: 5px;"><path d="M18.376 5.624c-3.498-3.499-9.254-3.499-12.752 0-3.499 3.498-3.499 9.254 0 12.752 3.498 3.499 9.254 3.499 12.752 0 3.499-3.498 3.499-9.14 0-12.752zm-1.693 1.693c2.37 2.37 2.596 6.094.678 8.69l-9.367-9.48c2.708-1.919 6.32-1.58 8.69.79zm-9.48 9.48c-2.37-2.37-2.595-6.095-.676-8.69l9.48 9.48c-2.822 1.918-6.433 1.58-8.803-.79z" fill-rule="evenodd"></path></svg></span>屏蔽用户</button>`);
                                footer.lastElementChild.onclick = function(){blockUsers_button_add(this.dataset.name, this.dataset.userid, false)}
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    // 添加屏蔽用户按钮（用户信息悬浮框中）
    function blockUsers_button() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className.indexOf('Popover-content Popover-content--top HoverCard-popoverTarget') > -1 || target.className.indexOf('Popover-content Popover-content--bottom HoverCard-popoverTarget') > -1 || target.querySelector('.Popover-content.Popover-content--top.HoverCard-popoverTarget') || target.querySelector('.Popover-content.Popover-content--bottom.HoverCard-popoverTarget')) {
                        let item = target.querySelector('.MemberButtonGroup.ProfileButtonGroup.HoverCard-buttons'),
                            item1 = target.querySelector('a.UserLink-link'),
                            name = item1.textContent,
                            userid = item1.href.split('/')[4];
                        if (item && !target.querySelector('button[data-name][data-userid]')) {
                            item.insertAdjacentHTML('beforeend', `<button type="button" data-name="${name}" data-userid="${userid}" class="Button FollowButton Button--primary Button--red" style="width: 100%;margin: 7px 0 0 0;"><span style="display: inline-flex; align-items: center;">​<svg class="Zi Zi--Plus FollowButton-icon" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M18.376 5.624c-3.498-3.499-9.254-3.499-12.752 0-3.499 3.498-3.499 9.254 0 12.752 3.498 3.499 9.254 3.499 12.752 0 3.499-3.498 3.499-9.14 0-12.752zm-1.693 1.693c2.37 2.37 2.596 6.094.678 8.69l-9.367-9.48c2.708-1.919 6.32-1.58 8.69.79zm-9.48 9.48c-2.37-2.37-2.595-6.095-.676-8.69l9.48 9.48c-2.822 1.918-6.433 1.58-8.803-.79z" fill-rule="evenodd"></path></svg></span>屏蔽用户</button>`);
                            item.lastElementChild.onclick = function(){blockUsers_button_add(this.dataset.name, this.dataset.userid, false)}
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    // 添加屏蔽用户按钮（用户主页）
    function blockUsers_button_people() {
        let item = document.querySelector('.MemberButtonGroup.ProfileButtonGroup.ProfileHeader-buttons'), // 获取按钮元素位置
            name = document.querySelector('.ProfileHeader-name').firstChild.textContent, // 获取用户名
            users = menu_value('menu_customBlockUsers'), // 读取屏蔽列表
            userid = location.href.split('/')[4];
        for (let num = 0;num<users.length;num++) { // 判断是否已存在
            if (users[num] === name) { // 已存在
                document.querySelectorAll('.Button.Button--primary.Button--red').forEach(function(item){item.style.display = 'none';}) // 隐藏知乎自带的已屏蔽按钮
                item.insertAdjacentHTML('beforeend', `<button type="button" data-name="${name}" data-userid="${userid}" class="Button FollowButton Button--primary Button--red" style="margin: 0 0 0 12px;"><span style="display: inline-flex; align-items: center;">​<svg class="Zi Zi--Plus FollowButton-icon" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M18.376 5.624c-3.498-3.499-9.254-3.499-12.752 0-3.499 3.498-3.499 9.254 0 12.752 3.498 3.499 9.254 3.499 12.752 0 3.499-3.498 3.499-9.14 0-12.752zm-1.693 1.693c2.37 2.37 2.596 6.094.678 8.69l-9.367-9.48c2.708-1.919 6.32-1.58 8.69.79zm-9.48 9.48c-2.37-2.37-2.595-6.095-.676-8.69l9.48 9.48c-2.822 1.918-6.433 1.58-8.803-.79z" fill-rule="evenodd"></path></svg></span>取消屏蔽</button>`);
                item.lastElementChild.onclick = function(){blockUsers_button_del(this.dataset.name, this.dataset.userid, true)}
                return
            }
        };
        if (item) {
            item.insertAdjacentHTML('beforeend', `<button type="button" data-name="${name}" data-userid="${userid}" class="Button FollowButton Button--primary Button--red" style="margin: 0 0 0 12px;"><span style="display: inline-flex; align-items: center;">​<svg class="Zi Zi--Plus FollowButton-icon" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M18.376 5.624c-3.498-3.499-9.254-3.499-12.752 0-3.499 3.498-3.499 9.254 0 12.752 3.498 3.499 9.254 3.499 12.752 0 3.499-3.498 3.499-9.14 0-12.752zm-1.693 1.693c2.37 2.37 2.596 6.094.678 8.69l-9.367-9.48c2.708-1.919 6.32-1.58 8.69.79zm-9.48 9.48c-2.37-2.37-2.595-6.095-.676-8.69l9.48 9.48c-2.822 1.918-6.433 1.58-8.803-.79z" fill-rule="evenodd"></path></svg></span>屏蔽用户</button>`);
            item.lastElementChild.onclick = function(){blockUsers_button_add(this.dataset.name, this.dataset.userid, true)}
        }
    }

    // 屏蔽用户按钮绑定事件（添加）
    function blockUsers_button_add(name, userid, reload) {
        if (!name || !userid) return
        let users = menu_value('menu_customBlockUsers'), // 读取屏蔽列表
            index = users.indexOf(name);
        if (index === -1) {
            users.push(name); // 追加用户名
            GM_setValue('menu_customBlockUsers', users); // 写入屏蔽列表
            // 加入知乎自带的黑名单（和本脚本互补~
            GM_xmlhttpRequest({url: `https://www.zhihu.com/api/v4/members/${userid}/actions/block`,method: 'POST',timeout: 2000});
            // 是否刷新本页
            if (reload) {
                setTimeout(function(){location.reload()}, 200); // 刷新网页，延迟 200 毫秒，避免知乎反应慢~
            } else {
                GM_notification({text: `该用户已被屏蔽~\n刷新网页后生效~`, timeout: 3000});
            }
        } else {
            GM_notification({text: `该用户已经被屏蔽啦，无需重复屏蔽~`, timeout: 3000});
        }
    }


    // 屏蔽用户按钮绑定事件（删除）
    function blockUsers_button_del(name, userid, reload) {
        if (!name || !userid) return
        let users = menu_value('menu_customBlockUsers'), // 读取屏蔽列表
            index = users.indexOf(name);
        if (index > -1) {
            users.splice(index, 1); // 移除用户名
            GM_setValue('menu_customBlockUsers', users); // 写入屏蔽列表
            // 移除知乎自带的黑名单
            GM_xmlhttpRequest({url: `https://www.zhihu.com/api/v4/members/${userid}/actions/block`,method: 'DELETE',timeout: 2000});
            // 是否刷新本页
            if (reload) {
                setTimeout(function(){location.reload()}, 200); // 刷新网页，延迟 200 毫秒，避免知乎反应慢~
            } else {
                GM_notification({text: `该用户已取消屏蔽啦~\n刷新网页后生效~`, timeout: 3000});
            }
        } else {
            GM_notification({text: `没有在屏蔽列表中找到该用户...`, timeout: 3000});
        }
    }
}


// 自定义屏蔽关键词（标题）
function customBlockKeywords() {
    let nowBlockKeywords = '';
    menu_value('menu_customBlockKeywords').forEach(function(item){nowBlockKeywords += '|' + item})
    let newBlockKeywords = prompt('编辑 [自定义屏蔽关键词]\n（不同关键词之间使用 "|" 分隔，例如：关键词A|关键词B|关键词C \n（关键词不区分大小写，支持表情如：[捂脸]|[飙泪笑]', nowBlockKeywords.replace('|',''));
    if (newBlockKeywords === '') {
        GM_setValue('menu_customBlockKeywords', []);
        registerMenuCommand(); // 重新注册脚本菜单
    } else if (newBlockKeywords != null) {
        GM_setValue('menu_customBlockKeywords', newBlockKeywords.split('|'));
        registerMenuCommand(); // 重新注册脚本菜单
    }
};


// 屏蔽指定关键词
function blockKeywords(type) {
    if (!menu_value('menu_blockKeywords')) return
    if (!menu_value('menu_customBlockKeywords') || menu_value('menu_customBlockKeywords').length < 1) return
    switch(type) {
        case 'index':
            blockKeywords_('.Card.TopstoryItem.TopstoryItem--old.TopstoryItem-isRecommend', 'Card TopstoryItem TopstoryItem--old TopstoryItem-isRecommend');
            break;
        case 'topic':
            blockKeywords_('.List-item.TopicFeedItem', 'List-item TopicFeedItem');
            break;
        case 'people':
            blockKeywords_('.List-item', 'List-item');
            break;
        case 'search':
            blockKeywords_search();
            break;
        case 'comment':
            blockKeywords_comment();
            break;
    }


    function blockKeywords_(className1, className2) {
        // 前几条因为是直接加载的，而不是动态插入网页的，所以需要单独判断
        function blockKeywords_now() {
            document.querySelectorAll(className1).forEach(function(item1){
                let item = item1.querySelector('h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"]'); // 标题所在元素
                if (item) {
                    for (const keyword of menu_value('menu_customBlockKeywords')) { // 遍历关键词黑名单
                        if (item.content.toLowerCase().indexOf(keyword.toLowerCase()) > -1) { // 找到就删除该信息流
                            console.log(item.content);
                            item1.hidden = true;
                            break;
                        }
                    }
                }
            })
        }

        blockKeywords_now();
        addLocationchange();
        window.addEventListener('locationchange', function(){
            setTimeout(blockKeywords_now, 500); // 网页 URL 变化后再次执行
        })

        // 这个是监听网页插入事件，用来判断后续网页动态插入的元素
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === className2) {
                        let item = target.querySelector('h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"]'); // 标题所在元素
                        if (item) {
                            for (const keyword of menu_value('menu_customBlockKeywords')) { // 遍历关键词黑名单
                                if (item.content.toLowerCase().indexOf(keyword.toLowerCase()) > -1) { // 找到就删除该信息流
                                    console.log(item.content);
                                    target.hidden = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }


    function blockKeywords_search() {
        function blockKeywords_now() {
            if (location.search.indexOf('type=content') === -1) return // 目前只支持搜索页的 [综合]
            document.querySelectorAll('.Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"], .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"]').forEach(function(item1){
                let item = item1.querySelector('a[data-za-detail-view-id]'); // 标题所在元素
                if (item) {
                    for (const keyword of menu_value('menu_customBlockKeywords')) { // 遍历关键词黑名单
                        if (item.textContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1) { // 找到就删除该信息流
                            console.log(item.textContent);
                            item1.hidden = true;
                            break;
                        }
                    }
                }
            })
        }

        setTimeout(blockKeywords_now, 500);
        addLocationchange();
        window.addEventListener('locationchange', function(){
            setTimeout(blockKeywords_now, 500); // 网页 URL 变化后再次执行
        })

        const callback = (mutationsList, observer) => {
            if (location.search.indexOf('type=content') === -1) return // 目前只支持搜索页的 [综合]
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === 'Card SearchResult-Card' && (target.dataset.zaDetailViewPathModule === 'AnswerItem' || target.dataset.zaDetailViewPathModule === 'PostItem')) {
                        let item = target.querySelector('a[data-za-detail-view-id]'); // 标题所在元素
                        if (item) {
                            for (const keyword of menu_value('menu_customBlockKeywords')) { // 遍历关键词黑名单
                                if (item.textContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1) { // 找到就删除该信息流
                                    console.log(item.textContent);
                                    target.remove();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }


    function blockKeywords_comment() {
        function filterComment(comment) {
            let content = comment.querySelector('.RichText'); // 寻找评论文字所在元素
            let texts = [content.textContent.toLowerCase()]; // 因为要针对评论中的表情，所以需要整个数组并全部转为小写（用来不区分大小写）
            for (let i = 0; i < content.children.length; i++) { // 该条针对的是评论中的表情
                let emoticonValue = content.children[i].getAttribute('data-zhihu-emoticon'); // 确定是表情就将其添加到稍后遍历的数组中
                if (emoticonValue) {
                    texts.push(emoticonValue)
                }
            }

            let keywords = menu_value('menu_customBlockKeywords');
            for (const text of texts) {
                for (const keyword of keywords) { // 遍历关键词黑名单
                    if (text.indexOf(keyword.toLowerCase()) > -1) { // 找到就删除该评论
                        console.log(text);
                        content.textContent = '[该评论已屏蔽]';
                        break;
                    }
                }
            }
        }

        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    for (const node of target.querySelectorAll('*')) {
                        if (node.className === 'CommentItemV2-metaSibling') filterComment(node);
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }
}


// 屏蔽盐选内容
function blockYanXuan() {
    if (!menu_value('menu_blockYanXuan')) return
    const blockYanXuan_question = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                if (target.className === 'List-item' || target.className === 'Card AnswerCard') {
                    if (target.querySelector('.KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn')) {
                        target.remove();
                    }
                }
            }
        }
    };

    const blockYanXuan_question_answer = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                target.querySelectorAll('.List-item, .Card.AnswerCard').forEach(function(item){
                    if (item.querySelector('.KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn')) {
                        item.remove();
                    }
                })
            }
        }
    };

    if (location.pathname.indexOf('/answer/') > -1) { // 回答页（就是只有三个回答的页面）
        const observer = new MutationObserver(blockYanXuan_question_answer);
        observer.observe(document, { childList: true, subtree: true });
    } else { // 问题页（可以显示所有回答的页面）
        const observer = new MutationObserver(blockYanXuan_question);
        observer.observe(document, { childList: true, subtree: true });
    }

    // 针对的是打开网页后直接加载的前面几个回答（上面哪些是针对动态加载的回答）
    document.querySelectorAll('.List-item, .Card.AnswerCard').forEach(function(item){
        if (item.querySelector('.KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn')) {
            item.remove();
        }
    })
}


var postNum;
// 区分问题文章
function addTypeTips() {
    if (!menu_value('menu_typeTips')) return
    // URL 匹配正则表达式
    let patt_zhuanlan = /zhuanlan.zhihu.com/,
        patt_question = /question\/\d+/,
        patt_question_answer = /answer\/\d+/,
        patt_video = /\/zvideo\//,
        patt_tip = /zhihu_e_tips/
    let postList = document.querySelectorAll('h2.ContentItem-title a');
    postNum = document.querySelectorAll('small.zhihu_e_tips');
    //console.log(`${postList.length} ${postNum.length}`)
    if (postList.length > postNum.length) {
        for (let num = postNum.length;num<postList.length;num++) {
            if (!patt_tip.test(postList[num].innerHTML)) { //                判断是否已添加
                if (patt_zhuanlan.test(postList[num].href)) { //             如果是文章
                    postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #2196F3;display: inline-block;height: 18px;">文章</small> ` + postList[num].innerHTML
                } else if (patt_question.test(postList[num].href)) { //      如果是问题
                    if (!postList[num].getAttribute('data-tooltip')) { //    排除用户名后面的蓝标、黄标等链接
                    if (patt_question_answer.test(postList[num].href)) { //  如果是指向回答的问题（而非指向纯问题的链接）
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #f68b83;display: inline-block;height: 18px;">问题</small> ` + postList[num].innerHTML
                    } else {
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #ff5a4e;display: inline-block;height: 18px;">问题</small> ` + postList[num].innerHTML
                    }
                    }
                } else if (patt_video.test(postList[num].href)) { //         如果是视频
                    postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #00BCD4;display: inline-block;height: 18px;">视频</small> ` + postList[num].innerHTML
                }
                //postNum += 1;
            }
        }
    }
}


// 展开问题描述
function questionRichTextMore() {
    if (!menu_value('menu_questionRichTextMore')) return
    let button = document.querySelector('button.QuestionRichText-more');
    if (button) button.click()
}


// 知乎免登录
function removeLogin() {
    const removeLoginModal = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                if (target.querySelector('.signFlowModal')) {
                    let button = target.getElementsByClassName('Button Modal-closeButton Button--plain')[0];
                    if (button) button.click();
                }
            }
        }
    };

    // 未登录时才会监听并移除登录弹窗
    if(window.location.href.indexOf('zhuanlan') > -1) { // 如果是文章页
        if (!document.querySelector('button.ColumnPageHeader-MenuToggler')) { // 如果不存在，则代表已登录
            const observer = new MutationObserver(removeLoginModal);
            observer.observe(document, { childList: true, subtree: true });
        }
    } else { // 不是文章页
        if (document.querySelector('button.AppHeader-login')) { // 如果存在，则代表未登录
            const observer = new MutationObserver(removeLoginModal);
            observer.observe(document, { childList: true, subtree: true });
            document.querySelector('button.AppHeader-login').onclick=function(){location.href='https://www.zhihu.com/signin';} // [登录] 按钮跳转至登录页面
            document.querySelector('.AppHeader-profile button.Button--primary').onclick=function(){location.href='https://www.zhihu.com/signin';} // [加入知乎] 按钮跳转至注册页面（实际上是同一个页面）
        }
    }
}


// 快捷关闭悬浮评论（监听点击事件，点击网页两侧空白处）
function closeFloatingComments() {
    const closeFloatingCommentsModal = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                if (target.querySelector('.Modal-backdrop')) {
                    document.querySelector('.Modal-backdrop').onclick = function(event){
                        if (event.target == this) {
                            let button = document.getElementsByClassName('Button Modal-closeButton Button--plain')[0];
                            if (button) button.click();
                        }
                    }
                }
            }
        }
    };
    const observer = new MutationObserver(closeFloatingCommentsModal);
    observer.observe(document, { childList: true, subtree: true });
}


// 监听 XMLHttpRequest 事件
function EventXMLHttpRequest() {
    var _send = window.XMLHttpRequest.prototype.send
    function sendReplacement(data) {
        addTypeTips();
        return _send.apply(this, arguments);
    }
    window.XMLHttpRequest.prototype.send = sendReplacement;
}


// [完整显示时间 + 置顶显示时间] 功能修改自：https://greasyfork.org/scripts/402808（从 JQuery 改为原生 JavaScript，且优化了代码）
// 完整显示时间 + 置顶显示时间 - 首页
function topTime_index() {
    let topTime = document.querySelectorAll('.TopstoryItem');if (!topTime) return
    topTime.forEach(function(_this) {
        let ContentItemTime = _this.querySelector('.ContentItem-time');if (!ContentItemTime) return
        if (!(ContentItemTime.classList.contains('full')) && ContentItemTime.querySelector('span') && ContentItemTime.querySelector('span').innerText != null) {
            // 完整显示时间
            topTime_allTime(ContentItemTime)
            // 发布时间置顶
            topTime_publishTop(ContentItemTime, _this, 'ContentItem-meta')
        }
    });
}


// 完整显示时间 + 置顶显示时间 - 回答页
function topTime_question() {
    let topTime = document.querySelectorAll('.ContentItem.AnswerItem');if (!topTime) return
    topTime.forEach(function(_this) {
        let ContentItemTime = _this.querySelector('.ContentItem-time');if (!ContentItemTime) return
        if (!(ContentItemTime.classList.contains('full')) && ContentItemTime.querySelector('span') && ContentItemTime.querySelector('span').innerText != null) {
            // 完整显示时间
            topTime_allTime(ContentItemTime)
            // 发布时间置顶
            topTime_publishTop(ContentItemTime, _this, 'ContentItem-meta')
        }

    });

    // 问题创建时间
    if (!(document.querySelector('.QuestionPage .QuestionHeader-side p')) && window.location.href.indexOf("log") == -1) { // 没有执行过 且 非问题日志页
        let createtime = document.querySelector('.QuestionPage>[itemprop~=dateCreated]').getAttribute('content');
        let modifiedtime = document.querySelector('.QuestionPage>[itemprop~=dateModified]').getAttribute('content');
        createtime = getUTC8(new Date(createtime));
        modifiedtime = getUTC8(new Date(modifiedtime));
        // 添加到问题页右上角
        document.querySelector('.QuestionPage .QuestionHeader-side').insertAdjacentHTML('beforeEnd', '<div style=\"color:#8590a6; margin-top:15px\"><p>创建时间:&nbsp;&nbsp;' + createtime + '</p><p>最后编辑:&nbsp;&nbsp;' + modifiedtime + '</p></div>');
    }
}


// 完整显示时间 + 置顶显示时间 - 搜索结果页
function topTime_search() {
    let topTime = document.querySelectorAll('.ContentItem.AnswerItem, .ContentItem.ArticleItem');if (!topTime) return
    topTime.forEach(function(_this) {
        let ContentItemTime = _this.querySelector('.ContentItem-time');if (!ContentItemTime) return
        if (!(ContentItemTime.classList.contains('full')) && ContentItemTime.querySelector('span') && ContentItemTime.querySelector('span').innerText != null) {
            // 完整显示时间
            topTime_allTime(ContentItemTime)
            // 发布时间置顶
            topTime_publishTop(ContentItemTime, _this, 'SearchItem-meta')
        }

    });
}


// 完整显示时间 + 置顶显示时间 - 用户主页
function topTime_people() {
    let topTime = document.querySelectorAll('.ContentItem.AnswerItem, .ContentItem.ArticleItem');if (!topTime) return
    topTime.forEach(function(_this) {
        let ContentItemTime = _this.querySelector('.ContentItem-time');if (!ContentItemTime) return
        if (!(ContentItemTime.classList.contains('full')) && ContentItemTime.querySelector('span') && ContentItemTime.querySelector('span').innerText != null) {
            // 完整显示时间
            topTime_allTime(ContentItemTime)
            // 发布时间置顶
            topTime_publishTop(ContentItemTime, _this, 'ContentItem-meta')
        }

    });
}


// 完整显示时间 + 置顶显示时间 - 专栏/文章
function topTime_zhuanlan() {
    let ContentItemTime = document.querySelector('.ContentItem-time');if (!ContentItemTime) return
    // 完整显示时间
    if (menu_value('menu_allTime')) {
        if (ContentItemTime.innerText.indexOf('编辑于') > -1 && !(ContentItemTime.classList.contains('doneeeeee'))) {
            let bianjiyu = ContentItemTime.innerText;
            ContentItemTime.click();
            ContentItemTime.innerText = (ContentItemTime.innerText + "，" + bianjiyu)
            ContentItemTime.classList.add("doneeeeee");
        }
    }

    //发布时间置顶
    if (menu_value('menu_publishTop') && !(document.querySelector('.Post-Header > .ContentItem-time')) && !(document.querySelector('.ContentItem-meta > .ContentItem-time'))) {
        ContentItemTime.style.cssText = 'padding:0px 0px 0px 0px; margin-top: 14px'
        let temp_time = ContentItemTime.cloneNode(true);
        // ContentItemTime.style.display = 'none';
        if (window.location.href.indexOf("column") > -1){
            document.querySelector('.ContentItem-meta').insertAdjacentElement('beforeEnd', temp_time);
        } else {
            document.querySelector('.Post-Header').insertAdjacentElement('beforeEnd', temp_time);
        }
    }
}


// 完整显示时间
function topTime_allTime(ContentItemTime) {
    if (!menu_value('menu_allTime')) return
    if (ContentItemTime.innerText.indexOf("发布于") == -1 && ContentItemTime.innerText.indexOf("编辑于") > -1) { //只有 "编辑于" 时增加具体发布时间 data-tooltip
        let data_tooltip = ContentItemTime.querySelector('span').getAttribute('data-tooltip');
        let oldtext = ContentItemTime.querySelector('span').innerText;
        ContentItemTime.querySelector('span').innerText = data_tooltip + "，" + oldtext;
        ContentItemTime.classList.add('full');
    } else if (ContentItemTime.innerText.indexOf("发布于") > -1 && ContentItemTime.innerText.indexOf("编辑于") == -1) { //只有 "发布于" 时替换为具体发布时间 data-tooltip
        let data_tooltip = ContentItemTime.querySelector('span').getAttribute('data-tooltip');
        ContentItemTime.querySelector('span').innerText = data_tooltip;
        ContentItemTime.classList.add('full');
    }
}


// 发布时间置顶
function topTime_publishTop(ContentItemTime, _this, class_) {
    if (!menu_value('menu_publishTop')) return
    if (!ContentItemTime.parentNode.classList.contains(class_)) {
        let temp_time = ContentItemTime.cloneNode(true);
        //_this.querySelector('.RichContent .ContentItem-time').style.display = 'none';
        _this.querySelector('.' + class_).insertAdjacentElement('beforeEnd', temp_time);
    }
}


// UTC 标准时转 UTC+8 北京时间，来自：https://greasyfork.org/zh-CN/scripts/402808
function getUTC8(datetime) {
    let month = (datetime.getMonth() + 1) < 10 ? "0" + (datetime.getMonth() + 1) : (datetime.getMonth() + 1);
    let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    let hours = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    let minutes = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    let seconds = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return (datetime.getFullYear() + "-" + month + "-" + date + "\xa0\xa0" + hours + ":" + minutes + ":" + seconds);
}


// 默认站外直链，修改自：https://greasyfork.org/scripts/402808（从 JQuery 改为原生 JavaScript）
function directLink () {
    let link, equal, colon, externalHref, protocol, path, newHref;
    // 文字链接
    link = document.querySelectorAll('a[class*="external"]')
    if (link) {
        link.forEach(function (_this) {
            if (_this.getElementsByTagName('span').length > 0) {
                newHref = _this.innerText;
                _this.setAttribute('href', newHref);
            } else if (_this.href.indexOf("link.zhihu.com/?target=") > -1) {
                externalHref = _this.href;
                newHref = externalHref.substring(externalHref = _this.href.indexOf("link.zhihu.com/?target=") + "link.zhihu.com/?target=".length);
                _this.setAttribute('href', decodeURIComponent(newHref));
            } else {
                externalHref = _this.href;
                if (externalHref.lastIndexOf("https%3A")) {
                    newHref = _this.href.substring(_this.href.lastIndexOf("https%3A"));
                } else if (externalHref.lastIndexOf("http%3A%2F%2F")) {
                    newHref = _this.href.substring(_this.href.lastIndexOf("http%3A"));
                }
                _this.setAttribute('href', decodeURIComponent(newHref));
            }
        });
    }

    // 卡片链接
    link = document.querySelectorAll('a[class*="LinkCard"]:not([class*="MCNLinkCard"]):not([class*="ZVideoLinkCard"])')
    if (link) {
        link.forEach(function (_this) {
            if (_this.getElementsByTagName('LinkCard-title').length > 0 && _this.getElementsByTagName('LinkCard-title')[0].indexOf("http") > -1) {
                newHref = _this.getElementsByTagName('LinkCard-title').innerText;
                _this.setAttribute('href', newHref);
            } else if (_this.href.indexOf("link.zhihu.com/?target=") > -1) {
                externalHref = _this.href;
                newHref = externalHref.substring(externalHref = _this.href.indexOf("link.zhihu.com/?target=") + "link.zhihu.com/?target=".length);
                _this.setAttribute('href', decodeURIComponent(newHref));
            } else {
                externalHref = _this.href;
                if (externalHref.lastIndexOf("https%3A")) {
                    newHref = _this.href.substring(_this.href.lastIndexOf("https%3A"));
                } else if (externalHref.lastIndexOf("http%3A%2F%2F")) {
                    newHref = _this.href.substring(_this.href.lastIndexOf("http%3A"));
                }
                _this.setAttribute('href', decodeURIComponent(newHref));
            }
        });
    }

    // 旧版视频卡片链接
    link = document.querySelectorAll('a.VideoCard-link')
    if (link) {
        link.forEach(function (_this) {
            if (_this.href.indexOf('link.zhihu.com/?target=') > -1) {
                externalHref = _this.href;
                equal = externalHref.lastIndexOf('http');
                colon = externalHref.lastIndexOf('%3A');
                protocol = externalHref.substring(equal, colon);
                path = externalHref.substring(colon + 5, externalHref.length);
                newHref = protocol + '://' + path;
                _this.setAttribute('href', decodeURIComponent(newHref));
            }
        });
    }
}


// 默认高清原图，修改自：https://greasyfork.org/scripts/402808（从 JQuery 改为原生 JavaScript）
function originalPic(){
    let pic = document.getElementsByTagName('img');if (!pic) return
    Array.from(pic).forEach(function(pic1){
        if (pic1.getAttribute('data-original') != undefined && pic1.className != 'comment_sticker') {
            if (pic1.getAttribute('src') != pic1.getAttribute('data-original')) {
                pic1.setAttribute('src', pic1.getAttribute('data-original'))
            }
        }
    });
}


// 默认折叠邀请，修改自：https://greasyfork.org/scripts/402808（从 JQuery 改为原生 JavaScript）
function questionInvitation(){
    let timer = setInterval(function(){
        let QuestionInvitation = document.querySelector('.QuestionInvitation-content');if (!QuestionInvitation) return
        clearInterval(timer);
        QuestionInvitation.style.display = "none";
        document.querySelector('.QuestionInvitation-title').innerHTML = document.querySelector('.QuestionInvitation-title').innerText + '<span style="color: #8590a6;font-size: 14px;"> 展开/折叠</span>'
        // 点击事件（展开/折叠）
        document.querySelector('.Topbar').onclick = function(){
            let QuestionInvitation = document.querySelector('.QuestionInvitation-content')
            if (QuestionInvitation.style.display == 'none') {
                QuestionInvitation.style.display = ''
            } else {
                QuestionInvitation.style.display = 'none'
            }
        }
    });
}

// 自定义 locationchange 事件（用来监听 URL 变化）
function addLocationchange() {
    history.pushState = ( f => function pushState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.pushState);

    history.replaceState = ( f => function replaceState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    })(history.replaceState);

    window.addEventListener('popstate',()=>{
        window.dispatchEvent(new Event('locationchange'))
    });
}

(function() {
    removeLogin(); //                                                      移除登录弹窗
    setInterval(originalPic,100); //                                       默认高清原图
    if (menu_value('menu_directLink')) setInterval(directLink, 100); //    默认站外直链
    addLocationchange();
    window.addEventListener('locationchange', function(){ // 针对的是从单个回答页跳转到完整回答页时
        if (window.location.pathname.indexOf('question') > -1 && window.location.pathname.indexOf('waiting') == -1 && window.location.pathname.indexOf('answer') == -1) { //       回答页 //
            setTimeout(function(){
                collapsedNowAnswer('.QuestionPage'); //                        收起当前回答 + 快捷返回顶部
                collapsedNowAnswer('.Question-main'); //                       收起当前回答 + 快捷返回顶部
                questionRichTextMore(); //                                     展开问题描述
                blockUsers('question'); //                                     屏蔽指定用户
                blockYanXuan(); //                                             屏蔽盐选内容
            }, 300);
        }
    })

    if (GM_info.scriptHandler === 'Violentmonkey') {
        setTimeout(start, 300);
    } else {
        start();
    }

    function start(){
        collapsedAnswer(); //                                                  一键收起回答
        closeFloatingComments(); //                                            快捷关闭悬浮评论（监听点击事件，点击网页两侧空白处）
        questionInvitation(); //                                               默认折叠邀请
        blockKeywords('comment'); //                                           屏蔽指定关键词（评论）
        if (window.location.href.indexOf('question') > -1) { //       回答页 //
            if (window.location.href.indexOf('waiting') == -1) {
                collapsedNowAnswer('.QuestionPage'); //                        收起当前回答 + 快捷返回顶部
                collapsedNowAnswer('.Question-main'); //                       收起当前回答 + 快捷返回顶部
                questionRichTextMore(); //                                     展开问题描述
                blockUsers('question'); //                                     屏蔽指定用户
                blockYanXuan(); //                                             屏蔽盐选内容
            }
            setInterval(topTime_question, 300); //                             置顶显示时间
        } else if (window.location.href.indexOf('search') > -1) { // 搜索结果页 //
            collapsedNowAnswer('main div'); //                                 收起当前回答 + 快捷返回顶部
            collapsedNowAnswer('.Search-container'); //                        收起当前回答 + 快捷返回顶部
            setInterval(topTime_search, 300); //                               置顶显示时间
            EventXMLHttpRequest(); //                                          区分问题文章
            blockUsers('search'); //                                           屏蔽指定用户
            blockKeywords('search'); //                                        屏蔽指定关键词
        } else if (window.location.href.indexOf('topic') > -1) { //   话题页 //
            if (window.location.href.indexOf('hot') > -1 || window.location.href.indexOf('top-answers') > -1) { // 仅限 [讨论] [精华]
                collapsedNowAnswer('main.App-main'); //                        收起当前回答 + 快捷返回顶部
                collapsedNowAnswer('.ContentLayout'); //                       收起当前回答 + 快捷返回顶部
                setInterval(topTime_people, 300); //                           置顶显示时间
                EventXMLHttpRequest(); //                                      区分问题文章
                blockUsers('topic'); //                                        屏蔽指定用户
                blockKeywords('topic'); //                                     屏蔽指定关键词
            }
        } else if (window.location.href.indexOf('zhuanlan') > -1){ //   文章 //
            backToTop('article.Post-Main.Post-NormalMain'); //                 快捷返回顶部
            backToTop('div.Post-Sub.Post-NormalSub'); //                       快捷返回顶部
            setInterval(topTime_zhuanlan, 300); //                             置顶显示时间
            blockUsers(); //                                                   屏蔽指定用户
        } else if (window.location.href.indexOf('column') > -1) { //    专栏 //
            collapsedNowAnswer('main div'); //                                 收起当前回答 + 快捷返回顶部
            setInterval(topTime_zhuanlan, 300); //                             置顶显示时间
            blockUsers(); //                                                   屏蔽指定用户
        } else if (window.location.href.indexOf('people') > -1 || window.location.href.indexOf('org') > -1) { // 用户主页 //
            collapsedNowAnswer('main div'); //                                 收起当前回答 + 快捷返回顶部
            collapsedNowAnswer('.Profile-main'); //                            收起当前回答 + 快捷返回顶部
            setInterval(topTime_people, 300); //                               置顶显示时间
            blockUsers('people'); //                                           屏蔽指定用户
            blockKeywords('people'); //                                        屏蔽指定关键词
        } else { //                                                     首页 //
            collapsedNowAnswer('main div'); //                                 收起当前回答 + 快捷返回顶部
            collapsedNowAnswer('.Topstory-container'); //                      收起当前回答 + 快捷返回顶部
            setInterval(topTime_index, 300); //                                置顶显示时间
            EventXMLHttpRequest(); //                                          区分问题文章
            blockUsers('index'); //                                            屏蔽指定用户
            blockKeywords('index'); //                                         屏蔽指定关键词
        }
    }
})();