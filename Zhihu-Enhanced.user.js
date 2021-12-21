// ==UserScript==
// @name         知乎增强
// @version      1.8.6
// @author       X.I.U
// @description  移除登录弹窗、屏蔽首页视频、默认收起回答、快捷收起当前回答/评论（左键两侧空白处）、快捷回到顶部（右键两侧空白处）、屏蔽用户 (发布的内容)、屏蔽关键词（标题/评论）、移除高亮链接、屏蔽盐选内容、净化标题消息、展开问题描述、置顶显示时间、完整问题时间、区分问题文章、直达问题按钮、默认高清原图、默认站外直链
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
// @incompatible safari
// @namespace    https://greasyfork.org/scripts/4122051
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

'use strict';
var menu_ALL = [
    ['menu_defaultCollapsedAnswer', '默认收起回答', '默认收起回答', true],
    ['menu_collapsedAnswer', '一键收起回答', '一键收起回答', true],
    ['menu_collapsedNowAnswer', '收起当前回答/评论 (点击两侧空白处)', '收起当前回答/评论', true],
    ['menu_backToTop', '快捷回到顶部 (右键两侧空白处)', '快捷回到顶部', true],
    ['menu_blockUsers', '屏蔽指定用户', '屏蔽指定用户', true],
    ['menu_customBlockUsers', '自定义屏蔽用户', '自定义屏蔽用户', ['故事档案局', '盐选推荐', '盐选科普', '盐选成长计划', '知乎盐选会员', '知乎盐选创作者', '盐选心理', '盐选健康必修课', '盐选奇妙物语', '盐选生活馆', '盐选职场', '盐选文学甄选', '盐选作者小管家', '盐选博物馆', '盐选点金', '盐选测评室', '盐选科技前沿', '盐选会员精品']],
    ['menu_blockKeywords', '屏蔽指定关键词', '屏蔽指定关键词', true],
    ['menu_customBlockKeywords', '自定义屏蔽关键词', '自定义屏蔽关键词', []],
    ['menu_blockType', '屏蔽指定类别 (视频/文章等)', '勾选 = 屏蔽该类别的信息流', ''],
    ['menu_blockTypeVideo', '视频 [首页、搜索页、问题页]', '视频（首页、搜索页、问题页）', true],
    ['menu_blockTypeArticle', '文章 [首页、搜索页]', '文章（首页、搜索页）', false],
    ['menu_blockTypeTopic', '话题 [搜索页]', '话题（搜索页）', false],
    ['menu_blockTypeSearch', '杂志文章、相关搜索等 [搜索页]', '相关搜索、杂志等（搜索页）', false],
    ['menu_removeHighlightLink', '移除高亮链接', '移除高亮链接', true],
    ['menu_blockYanXuan', '屏蔽盐选内容', '屏蔽盐选内容', false],
    ['menu_cleanTitles', '净化标题消息 (标题中的私信/消息)', '净化标题提醒', false],
    ['menu_questionRichTextMore', '展开问题描述', '展开问题描述', false],
    ['menu_publishTop', '置顶显示时间', '置顶显示时间', true],
    ['menu_allTime', '完整显示时间', '完整显示时间', true],
    ['menu_typeTips', '区分问题文章', '区分问题文章', true],
    ['menu_toQuestion', '直达问题按钮', '直达问题按钮', true],
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
            if (menu_value('menu_blockUsers')) menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockUsers()});
        } else if (menu_ALL[i][0] === 'menu_customBlockKeywords') {
            if (menu_value('menu_blockKeywords')) menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockKeywords()});
        } else if (menu_ALL[i][0] === 'menu_blockType') {
            menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_setting('checkbox', menu_ALL[i][1], menu_ALL[i][2], true, [menu_ALL[i+1], menu_ALL[i+2], menu_ALL[i+3], menu_ALL[i+4]])});
        } else if (menu_ALL[i][0] != 'menu_blockTypeVideo' && menu_ALL[i][0] != 'menu_blockTypeArticle' && menu_ALL[i][0] != 'menu_blockTypeTopic' && menu_ALL[i][0] != 'menu_blockTypeSearch') {
            menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        }
    }
    menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419081/feedback', {active: true,insert: true,setParent: true});});
}


// 菜单开关
function menu_switch(menu_status, Name, Tips) {
    if (menu_status == 'true'){
        GM_setValue(`${Name}`, false);
        GM_notification({text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
    }else{
        GM_setValue(`${Name}`, true);
        GM_notification({text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
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
.zhihuE_SettingMain input {margin: 10px 6px 10px 0;cursor: pointer;vertical-align:middle}
.zhihuE_SettingMain label {margin-right: 20px;user-select: none;cursor: pointer;vertical-align:middle}
.zhihuE_SettingMain hr {border: 0.5px solid #f4f4f4;}
[data-theme="dark"] .zhihuE_SettingRoot {color: #adbac7;background-color: #343A44;}
[data-theme="dark"] .zhihuE_SettingHeader {color: #d0d0d0;background-color: #2D333B;}
[data-theme="dark"] .zhihuE_SettingMain hr {border: 0.5px solid #2d333b;}</style>
        <div class="zhihuE_SettingBackdrop_1"><div class="zhihuE_SettingBackdrop_2"></div><div class="zhihuE_SettingRoot">
            <div class="zhihuE_SettingHeader">${title}<span class="zhihuE_SettingClose" title="点击关闭"><svg class="Zi Zi--Close Modal-closeIcon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg></span></div>
            <div class="zhihuE_SettingMain"><p>${tips}</p><hr>`
    if (line) _br = '<br>'
    for (let i=0; i<menu.length; i++) {
        if (GM_getValue(menu[i][0])) {
            _html += `<label><input name="zhihuE_Setting" type="checkbox" value="${menu[i][0]}" checked="checked">${menu[i][1]}</label>${_br}`
        } else {
            _html += `<label><input name="zhihuE_Setting" type="checkbox" value="${menu[i][0]}">${menu[i][1]}</label>${_br}`
        }
    }
    _html += `</div></div></div>`
    document.body.insertAdjacentHTML('beforeend', _html); // 插入网页末尾
    setTimeout(function() { // 延迟 100 毫秒，避免太快
        // 关闭按钮 点击事件
        document.querySelector('.zhihuE_SettingClose').onclick = function(){this.parentElement.parentElement.parentElement.remove();document.querySelector('.zhihuE_SettingStyle').remove();}
        // 点击周围空白处 = 点击关闭按钮
        document.querySelector('.zhihuE_SettingBackdrop_2').onclick = function(event){if (event.target == this) {document.querySelector('.zhihuE_SettingClose').click();};}
        // 复选框 点击事件
        document.getElementsByName('zhihuE_Setting').forEach(function (checkBox) {
            checkBox.addEventListener('click', function(){if (this.checked) {GM_setValue(this.value, true);} else {GM_setValue(this.value, false);}});
        })
    }, 100)
}


// 添加收起回答观察器
function getCollapsedAnswerObserver() {
    if (!window._collapsedAnswerObserver) {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.target.hasAttribute('script-collapsed')) return
                if (!mutation.target.classList.contains('RichContent')) continue
                for (const addedNode of mutation.addedNodes) {
                    if (addedNode.nodeType != Node.ELEMENT_NODE) continue
                    //console.log(addedNode, addedNode.offsetHeight)
                    if (addedNode.className == 'RichContent-inner' && addedNode.offsetHeight < 400) return
                    //console.log(addedNode.offsetHeight)
                    const button = addedNode.querySelector('.ContentItem-actions.Sticky [data-zop-retract-question]');
                    if (button) {
                        mutation.target.setAttribute('script-collapsed', '');
                        button.click();
                        return
                    }
                }
            }
        })

        observer.start = function() {
            if (!this._active) {
                this.observe(document, { childList: true, subtree: true });
                this._active = true;
            }
        }
        observer.end = function() {
            if (this._active) {
                this.disconnect();
            }
        }

        window.addEventListener('locationchange', function() {
            observer[location.href.indexOf('/answer/') === -1 ? 'start' : 'end']();
        })
        window._collapsedAnswerObserver = observer;
    }
    return window._collapsedAnswerObserver
}


// 默认收起回答
function defaultCollapsedAnswer() {
    if (!menu_value('menu_defaultCollapsedAnswer')) return
    const observer = getCollapsedAnswerObserver();
    if (location.href.indexOf('/answer/') === -1) {
        observer.start();
    }
}


// 一键收起回答（全部）
function collapsedAnswer() {
    if (!menu_value('menu_collapsedAnswer')) return
    if (document.querySelector('.CornerAnimayedFlex')) {
        document.head.appendChild(document.createElement('style')).textContent = '.CornerButton{margin-bottom:8px !important;}.CornerButtons{bottom:45px !important;}';
        document.querySelector('.CornerAnimayedFlex').insertAdjacentHTML('afterBegin', '<button id="collapsed-button" data-tooltip="收起全部回答" data-tooltip-position="left" data-tooltip-will-hide-on-click="false" aria-label="收起全部回答" type="button" class="Button CornerButton Button--plain"><svg class="ContentItem-arrowIcon is-active" aria-label="收起全部回答" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></button>');
        document.getElementById('collapsed-button').onclick = function () {
            if (location.pathname === '/' || location.pathname === '/hot' || location.pathname === '/follow') {
                document.querySelectorAll('.ContentItem-rightButton').forEach(function (el) {
                    if (el.hasAttribute('data-zop-retract-question')) {
                        el.click()
                    }
                });
            } else {
                document.querySelectorAll('[script-collapsed]').forEach(function(scriptCollapsed) {
                    scriptCollapsed.querySelectorAll('.ContentItem-actions [data-zop-retract-question], .ContentItem-actions.Sticky [data-zop-retract-question]').forEach(function(button) {
                        button.click();
                    })
                })
                document.querySelectorAll('.RichContent:not([script-collapsed]) .ContentItem-actions.Sticky [data-zop-retract-question]').forEach(function(button) {
                    let el = button.parentElement;
                    while (!el.classList.contains('RichContent')) {
                        el = el.parentElement;
                    }
                    if (el) {
                        el.setAttribute('script-collapsed', '');
                    }
                    button.click();
                })
                const observer = getCollapsedAnswerObserver();
                observer.start();
                if (!menu_value('menu_defaultCollapsedAnswer') && !observer._disconnectListener) {
                    window.addEventListener('locationchange', function() {
                        observer.end();
                        window._collapsedAnswerObserver = null;
                    })
                    observer._disconnectListener = true;
                }
            }
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
                //console.log('111')
                if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) commentCollapseButton.click();
                // 再去收起回答
                rightButton = rightButton.querySelector('.ContentItem-rightButton[data-zop-retract-question]')
                //console.log('222')
                if (rightButton) rightButton.click();
                // 固定在回答底部的 [收起回答]（此时正在浏览回答内容 [尾部区域]）
            } else {
                let answerCollapseButton_ = false;
                for (let el of document.querySelectorAll('.ContentItem-rightButton[data-zop-retract-question]')) { // 遍历所有回答底部的 [收起] 按钮
                    if (isElementInViewport(el)) { // 判断该 [收起] 按钮是否在可视区域内
                        // 固定的 [收起评论]（先看看是否展开评论，即存在 [收起评论] 按钮）
                        let commentCollapseButton = el.parentNode.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                        // 如果展开了评论，就收起评论
                        //console.log('333')
                        if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) commentCollapseButton.click();
                        //console.log('444')
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
                            //console.log('555')
                            if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) commentCollapseButton.click();
                            let answerCollapseButton__ = el.querySelector('.ContentItem-rightButton[data-zop-retract-question]');
                            //console.log('666')
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
                //console.log('777')
                commentCollapseButton.click();
            } else { // 固定的 [收起评论]（此时正在浏览评论内容 [头部区域]）
                let commentCollapseButton_1 = document.querySelectorAll('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type, .ContentItem-action > button.Button.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                if (commentCollapseButton_1.length > 0) {
                    for (let el of commentCollapseButton_1) {
                        if (el.textContent.indexOf('收起评论') > -1) {
                            if (isElementInViewport(el)) {
                                //console.log('888')
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
                                let commentCollapseButton = findParentElement(el, 'ContentItem AnswerItem').querySelector('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                                if (commentCollapseButton.textContent.indexOf('收起评论') > -1) {
                                    //console.log('999')
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
                                    let commentCollapseButton = findParentElement(el, 'ContentItem AnswerItem').querySelector('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                                    //console.log(commentCollapseButton)
                                    if (commentCollapseButton.textContent.indexOf('收起评论') > -1) {
                                        //console.log('101010')
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
                            item1.hidden = true;
                            break;
                        }
                    }
                }
            })
        }

        blockKeywords_now();
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
                                    target.hidden = true;
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
                                    item.hidden = true;
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
                        item.hidden = true;
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
                            item1.hidden = true;
                            break;
                        }
                    }
                }
            })
        }

        setTimeout(blockUsers_now, 500);
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

    function blockUsers_comment() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    let item = target.querySelector('img.Avatar.UserLink-avatar')
                    if (item) {
                        menu_value('menu_customBlockUsers').forEach(function(item1){ // 遍历用户黑名单
                            if (item.alt === item1) { // 找到就删除该搜索结果
                                if (findParentElement(item, 'NestComment--rootComment', true)) {
                                    findParentElement(item, 'NestComment--rootComment', true).hidden = true;;
                                } else if (findParentElement(item, 'NestComment--child', true)){
                                    findParentElement(item, 'NestComment--child', true).hidden = true;;
                                } else if (findParentElement(item, 'NestComment', true)){
                                    findParentElement(item, 'NestComment', true).hidden = true;;
                                } else if (findParentElement(item, 'CommentItemV2', true)){
                                    findParentElement(item, 'CommentItemV2', true).hidden = true;;
                                } else if (findParentElement(item, 'CommentItemV2 CommentItemV2--highlighted', true)){
                                    findParentElement(item, 'CommentItemV2 CommentItemV2--highlighted', true).hidden = true;;
                                }
                            }
                        })

                        // 添加屏蔽用户按钮（点赞、回复等按钮后面）
                        if (item) {
                            let footer = findParentElement(item, 'CommentItemV2-meta', true).parentElement.querySelector('.CommentItemV2-metaSibling > .CommentItemV2-footer'),
                                userid = item.parentElement;
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
                    //console.log(target, target.className)
                    if (target.className && (target.className.indexOf('Popover-content Popover-content--top HoverCard-popoverTarget') > -1 || target.className.indexOf('Popover-content Popover-content--bottom HoverCard-popoverTarget') > -1) || target.querySelector('.Popover-content.Popover-content--top.HoverCard-popoverTarget') || target.querySelector('.Popover-content.Popover-content--bottom.HoverCard-popoverTarget')) {
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
        case 'collection':
            blockKeywords_('.Card.CollectionDetailPageItem', 'Card CollectionDetailPageItem');
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
            if (location.pathname === '/hot') {
                document.querySelectorAll('.HotItem').forEach(function(item1){blockKeywords_1(item1, 'h2.HotItem-title');})
            } else {
                document.querySelectorAll(className1).forEach(function(item1){blockKeywords_1(item1, 'h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"]');})
            }
        }

        blockKeywords_now();
        window.addEventListener('locationchange', function(){
            setTimeout(blockKeywords_now, 500); // 网页 URL 变化后再次执行
        })

        // 这个是监听网页插入事件，用来判断后续网页动态插入的元素
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === className2) {blockKeywords_1(target, 'h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"]');}
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }


    function blockKeywords_search() {
        function blockKeywords_now() {
            if (location.search.indexOf('type=content') === -1) return // 目前只支持搜索页的 [综合]
            document.querySelectorAll('.HotLanding-contentItem, .Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"], .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"]').forEach(function(item1){blockKeywords_1(item1, 'a[data-za-detail-view-id]');})
        }

        setTimeout(blockKeywords_now, 500);
        window.addEventListener('locationchange', function(){
            setTimeout(blockKeywords_now, 500); // 网页 URL 变化后再次执行
        })

        const callback = (mutationsList, observer) => {
            if (location.search.indexOf('type=content') === -1) return // 目前只支持搜索页的 [综合]
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === 'Card SearchResult-Card' && (target.dataset.zaDetailViewPathModule === 'AnswerItem' || target.dataset.zaDetailViewPathModule === 'PostItem')) {blockKeywords_1(target, 'a[data-za-detail-view-id]');}
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

    function blockKeywords_1(item1, css) {
        let item = item1.querySelector(css); // 标题所在元素
        if (item) {
            for (const keyword of menu_value('menu_customBlockKeywords')) { // 遍历关键词黑名单
                let text = item.content || item.textContent;
                if (text.toLowerCase().indexOf(keyword.toLowerCase()) > -1) { // 找到就删除该信息流
                    console.log(text);
                    item1.hidden = true;
                    item1.style.display = 'none';
                    break;
                }
            }
        }
    }
}


// 屏蔽指定类别（视频/文章等）
function blockType(type) {
    let name;
    // 一开始加载的信息流 + 添加标签样式
    if (type === 'search') {
        if (!menu_value('menu_blockTypeVideo') && !menu_value('menu_blockTypeArticle') && !menu_value('menu_blockTypeTopic') && !menu_value('menu_blockTypeSearch')) return
        if (menu_value('menu_blockTypeSearch') && location.pathname === '/search') setTimeout(function(){document.querySelector('.RelevantQuery').parentElement.parentElement.hidden = true;;}, 1000)
        name = 'h2.ContentItem-title a, a.KfeCollection-PcCollegeCard-link, h2.SearchTopicHeader-Title a'
        addSetInterval_(name);
    } else if (type === 'question') { // 问题页
        if (!menu_value('menu_blockTypeVideo')) return
        document.lastChild.appendChild(document.createElement('style')).textContent = `.VideoAnswerPlayer, .VideoAnswerPlayer-video, .VideoAnswerPlayer-iframe {display: none !important;}`;
        name = '.VideoAnswerPlayer'
        document.querySelectorAll(name).forEach(function(item){blockType_(item);})
    } else { // 首页
        if (!menu_value('menu_blockTypeVideo') && !menu_value('menu_blockTypeArticle')) return
        // 移除相关搜索
        if (menu_value('menu_blockTypeVideo')) document.lastChild.appendChild(document.createElement('style')).textContent = `nav.TopstoryTabs > a[aria-controls="Topstory-zvideo"] {display: none !important;}`;
        name = 'h2.ContentItem-title a'
        document.querySelectorAll(name).forEach(function(item){blockType_(item);})
    }

    // 后续加载的信息流
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                blockType_(target.querySelector(name));
            }
        }
    });
    observer.observe(document, { childList: true, subtree: true });

    window.addEventListener('locationchange', function(){
        addSetInterval_(name);
        // 移除相关搜索
        if (menu_value('menu_blockTypeSearch') && location.pathname === '/search' && location.search.indexOf('type=content') > -1) setTimeout(function(){document.querySelector('.RelevantQuery').parentElement.parentElement.hidden = true;}, 1500)
    })

    function blockType_(titleA) {
        if (!titleA) return // 判断是否为真
        if (location.pathname === '/search') { // 搜索页
            if (location.search.indexOf('type=content') === -1) return //   仅限搜索页的 [综合]
            if (titleA.href.indexOf('/zvideo/') > -1) { //                  如果是视频
                if (menu_value('menu_blockTypeVideo')) findParentElement(titleA, 'Card').hidden = true;
            } else if (titleA.href.indexOf('zhuanlan.zhihu.com') > -1) { // 如果是文章
                if (menu_value('menu_blockTypeArticle')) findParentElement(titleA, 'Card SearchResult-Card').hidden = true;
            } else if (titleA.href.indexOf('/topic/') > -1) { //            如果是话题
                if (menu_value('menu_blockTypeTopic')) findParentElement(titleA, 'Card SearchResult-Card').hidden = true;
            } else if (titleA.href.indexOf('/market/') > -1) { //           如果是杂志文章等乱七八糟的
                if (menu_value('menu_blockTypeArticle')) findParentElement(titleA, 'Card SearchResult-Card').hidden = true;
            }
        } else if (location.pathname.indexOf('/question/') > -1) { // 问题页
            if (menu_value('menu_blockTypeVideo')) findParentElement(titleA, 'List-item').hidden = true;
        } else { // 首页
            if (titleA.href.indexOf('/zvideo/') > -1) { //                  如果是视频
                if (menu_value('menu_blockTypeVideo')) findParentElement(titleA, 'Card TopstoryItem TopstoryItem--old TopstoryItem-isRecommend').hidden = true;
            } else if (titleA.href.indexOf('/answer/') > -1) { //           如果是问题（视频回答）
                if (findParentElement(titleA, 'ContentItem AnswerItem').querySelector('.VideoAnswerPlayer')) {
                    if (menu_value('menu_blockTypeVideo')) findParentElement(titleA, 'Card TopstoryItem TopstoryItem--old TopstoryItem-isRecommend').hidden = true;
                }
            } else if (titleA.href.indexOf('zhuanlan.zhihu.com') > -1) { // 如果是文章
                if (menu_value('menu_blockTypeArticle')) findParentElement(titleA, 'Card TopstoryItem TopstoryItem--old TopstoryItem-isRecommend').hidden = true;
            }
        }
    }

    function addSetInterval_(A) {
        let timer = setInterval(function(){
            let aTag = document.querySelectorAll(A);
            if (aTag.length > 0) {
                clearInterval(timer);
                aTag.forEach(function(item){blockType_(item);})
            }
        });
    }
}


// 寻找父元素
function findParentElement(item, className, type = false) {
    if (item.parentElement) {
        //console.log(item.parentElement)
        if (type) { // true = 完全一致，false = 包含即可
            if (item.parentElement.className && item.parentElement.className === className) {
                //console.log(item.parentElement.className)
                return item.parentElement;
            } else {
                let temp = findParentElement(item.parentElement, className, true)
                if (temp) return temp
            }
        } else {
            if (item.parentElement.className && item.parentElement.className.indexOf(className) > -1) {
                return item.parentElement;
            } else {
                let temp = findParentElement(item.parentElement, className)
                if (temp) return temp
            }
        }
    }
    return
}


// 移除高亮链接
function removeHighlightLink() {
    if (!menu_value('menu_removeHighlightLink')) return
    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1 || target.tagName != 'A') break
                if (target.dataset.zaNotTrackLink && target.href.indexOf('https://www.zhihu.com/search?q=') > -1) {
                    target.parentElement.replaceWith(target.textContent);
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document, { childList: true, subtree: true });

    // 针对的是打开网页后直接加载的前面几个回答（上面哪些是针对动态加载的回答）
    document.querySelectorAll('span > a[data-za-not-track-link][href^="https://www.zhihu.com/search?q="]').forEach(e => e.parentElement.replaceWith(e.textContent))
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
                        target.hidden = true;
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
                        item.hidden = true;
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
            item.hidden = true;
        }
    })
}


// 区分问题文章
function addTypeTips() {
    if (!menu_value('menu_typeTips')) return
    let style = `font-weight: bold;font-size: 13px;padding: 1px 4px 0;border-radius: 2px;display: inline-block;vertical-align: top;margin: ${(location.pathname === '/search') ? '2' : '4'}px 4px 0 0;`
    document.body.appendChild(document.createElement('style')).textContent = `/* 区分问题文章 */
.AnswerItem .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #f68b83;background-color: #f68b8333;${style}}
.TopstoryQuestionAskItem .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #ff5a4e;background-color: #ff5a4e33;${style}}
.ZVideoItem .ContentItem-title a::before, .ZvideoItem .ContentItem-title a::before {content:'视频';color: #00BCD4;background-color: #00BCD433;${style}}
.ArticleItem .ContentItem-title a::before {content:'文章';color: #2196F3;background-color: #2196F333;${style}}`;
}


// 直达问题按钮
function addToQuestion() {
    if (!menu_value('menu_toQuestion')) return

    // 一开始加载的信息流 + 添加按钮样式
    if (location.pathname === '/search') {
        document.lastChild.appendChild(document.createElement('style')).textContent = `a.zhihu_e_toQuestion {font-size: 13px !important;font-weight: normal !important;padding: 1px 6px 0 !important;border-radius: 2px !important;display: inline-block !important;vertical-align: top !important;height: 20.67px !important;line-height: 20.67px !important;margin-top: 2px !important;}`;
        addSetInterval_('h2.ContentItem-title a:not(.zhihu_e_tips)');
    } else {
        document.lastChild.appendChild(document.createElement('style')).textContent = `a.zhihu_e_toQuestion {font-size: 13px !important;font-weight: normal !important;padding: 1px 6px 0 !important;border-radius: 2px !important;display: inline-block !important;vertical-align: top !important;margin-top: 4px !important;}`;
        document.querySelectorAll('h2.ContentItem-title a:not(.zhihu_e_tips)').forEach(function(item){addTypeTips_(item);})
    }

    // 后续加载的信息流
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                addTypeTips_(target.querySelector('h2.ContentItem-title a:not(.zhihu_e_tips)'));
            }
        }
    });
    observer.observe(document, { childList: true, subtree: true });

    window.addEventListener('locationchange', function(){
        addSetInterval_('h2.ContentItem-title a:not(.zhihu_e_tips)');
    })

    function addTypeTips_(titleA) {
        if (!titleA) return // 判断是否为真
        if (titleA.parentElement.querySelector('a.zhihu_e_toQuestion')) return // 判断是否已添加
        if (titleA.textContent.indexOf('?') != -1) { // 把问题末尾英文问好 [?] 的替换为中文问好 [？]，这样按钮与标题之间的间距就刚刚好~
            titleA.innerHTML = titleA.innerHTML.replace('?', "？")
        }
        if (/answer\/\d+/.test(titleA.href)) { //  如果是指向回答的问题（而非指向纯问题的链接）
            titleA.insertAdjacentHTML('afterend', `<a class="zhihu_e_toQuestion VoteButton" href="${titleA.parentElement.querySelector('meta[itemprop="url"]').content}" target="_blank">直达问题</a>`);
        }
    }

    function addSetInterval_(A) {
        let timer = setInterval(function(){
            let aTag = document.querySelectorAll(A);
            if (aTag.length > 0) {
                clearInterval(timer);
                aTag.forEach(function(item){addTypeTips_(item);})
            }
        });
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
                    let button = target.querySelector('.Button.Modal-closeButton.Button--plain');
                    if (button) button.click();
                }
            }
        }
    };

    // 未登录时才会监听并移除登录弹窗
    if(location.hostname === 'zhuanlan.zhihu.com') { // 如果是文章页
        if (!document.querySelector('button.ColumnPageHeader-MenuToggler')) { // 未登录
            const observer = new MutationObserver(removeLoginModal);
            observer.observe(document, { childList: true, subtree: true });
        } else {
            cleanTitles(); // 净化标题消息
        }
    } else { // 不是文章页
        if (document.querySelector('button.AppHeader-login')) { // 未登录
            const observer = new MutationObserver(removeLoginModal);
            observer.observe(document, { childList: true, subtree: true });
            document.lastElementChild.appendChild(document.createElement('style')).textContent = '.Question-mainColumnLogin, button.AppHeader-login {display: none !important;}'; // 屏蔽问题页中间的登录提示
            document.querySelector('button.AppHeader-login').insertAdjacentHTML('afterend', '<a class="Button AppHeader-login Button--blue" href="https://www.zhihu.com/signin" target="_blank">登录</a>'); // [登录] 按钮跳转至登录页面
        } else {
            cleanTitles(); // 净化标题消息
        }
    }
}


// 净化标题消息
function cleanTitles() {
    if (!menu_value('menu_cleanTitles')) return

    // 方案一
    const elTitle = document.head.querySelector('title');
    const original = elTitle.textContent;
    const observer = new MutationObserver(function() {
        if (elTitle.textContent != original) { // 避免重复执行
            elTitle.textContent = original;
        }
    });
    observer.observe(elTitle, { childList: true });

    // 方案二
    // if (Reflect.getOwnPropertyDescriptor(document, 'title')) {
    //     const elTitle = document.head.querySelector('title');
    //     const original = elTitle.textContent;
    //     const observer = new MutationObserver(function() {
    //         if (elTitle.textContent != original) { // 避免重复执行
    //             elTitle.textContent = original;
    //         }
    //     });
    //     observer.observe(elTitle, { childList: true });
    // } else {
    //     const title = document.title;
    //     Reflect.defineProperty(document, 'title', {
    //         set: () => {},
    //         get: () => title,
    //     });
    // }
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
                            let button = document.querySelector('.Button.Modal-closeButton.Button--plain');
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
/*function EventXMLHttpRequest() {
    var _send = window.XMLHttpRequest.prototype.send
    function sendReplacement(data) {
        addTypeTips();
        return _send.apply(this, arguments);
    }
    window.XMLHttpRequest.prototype.send = sendReplacement;
}*/


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
    if (!(document.querySelector('.QuestionPage .QuestionHeader-side p')) && location.href.indexOf("log") == -1) { // 没有执行过 且 非问题日志页
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
        if (location.href.indexOf("column") > -1){
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
                newHref = externalHref.substring(externalHref = _this.href.indexOf('link.zhihu.com/?target=') + 'link.zhihu.com/?target='.length);
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
        QuestionInvitation.style.display = 'none';
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


(function() {
    addLocationchange();
    removeLogin(); //                                                      移除登录弹窗
    setInterval(originalPic,100); //                                       默认高清原图
    if (menu_value('menu_directLink')) setInterval(directLink, 100); //    默认站外直链
    window.addEventListener('locationchange', function(){ // 针对的是从单个回答页跳转到完整回答页时
        if (location.pathname.indexOf('question') > -1 && location.pathname.indexOf('waiting') === -1 && location.pathname.indexOf('/answer/') === -1) { //       回答页 //
            setTimeout(function(){
                collapsedNowAnswer('.QuestionPage'); //                        收起当前回答 + 快捷返回顶部
                collapsedNowAnswer('.Question-main'); //                       收起当前回答 + 快捷返回顶部
                questionRichTextMore(); //                                     展开问题描述
                blockUsers('question'); //                                     屏蔽指定用户
                blockYanXuan(); //                                             屏蔽盐选内容
            }, 300);
        }
    })

    if (GM_info.scriptHandler === 'Violentmonkey') { // Violentmonkey 比 Tampermonkey 加载更早，会导致一些元素还没加载，因此需要延迟一会儿
        setTimeout(start, 300);
    } else {
        start();
    }

    function start(){
        removeHighlightLink(); //                                              移除高亮链接
        if (location.hostname != 'zhuanlan.zhihu.com') {
            collapsedAnswer(); //                                              一键收起回答
            questionInvitation(); //                                           默认折叠邀请
        }
        closeFloatingComments(); //                                            快捷关闭悬浮评论（监听点击事件，点击网页两侧空白处）
        blockKeywords('comment'); //                                           屏蔽指定关键词（评论）
        if (location.pathname.indexOf('question') > -1) { //       回答页 //
            if (location.pathname.indexOf('waiting') == -1) {
                collapsedNowAnswer('.QuestionPage'); //                        收起当前回答 + 快捷返回顶部
                collapsedNowAnswer('.Question-main'); //                       收起当前回答 + 快捷返回顶部
                questionRichTextMore(); //                                     展开问题描述
                blockUsers('question'); //                                     屏蔽指定用户
                blockYanXuan(); //                                             屏蔽盐选内容
                blockType('question'); //                                      屏蔽指定类别（视频/文章等）
                defaultCollapsedAnswer(); //                                   默认收起回答
            }
            setInterval(topTime_question, 300); //                             置顶显示时间
        } else if (location.pathname === '/search') { //          搜索结果页 //
            collapsedNowAnswer('main div'); //                                 收起当前回答 + 快捷返回顶部
            collapsedNowAnswer('.Search-container'); //                        收起当前回答 + 快捷返回顶部
            setInterval(topTime_search, 300); //                               置顶显示时间
            addTypeTips(); //                                                  区分问题文章
            addToQuestion(); //                                                直达问题按钮
            blockUsers('search'); //                                           屏蔽指定用户
            blockKeywords('search'); //                                        屏蔽指定关键词
            blockType('search'); //                                            屏蔽指定类别（视频/文章等）
        } else if (location.pathname.indexOf('/topic/') > -1) { //   话题页 //
            if (location.pathname.indexOf('/hot') > -1 || location.href.indexOf('/top-answers') > -1) { // 仅限 [讨论] [精华]
                collapsedNowAnswer('main.App-main'); //                        收起当前回答 + 快捷返回顶部
                collapsedNowAnswer('.ContentLayout'); //                       收起当前回答 + 快捷返回顶部
                setInterval(topTime_people, 300); //                           置顶显示时间
                addTypeTips(); //                                              区分问题文章
                addToQuestion(); //                                            直达问题按钮
                blockUsers('topic'); //                                        屏蔽指定用户
                blockKeywords('topic'); //                                     屏蔽指定关键词
            }
        } else if (location.hostname === 'zhuanlan.zhihu.com'){ //    文章 //
            backToTop('article.Post-Main.Post-NormalMain'); //                 快捷返回顶部
            backToTop('div.Post-Sub.Post-NormalSub'); //                       快捷返回顶部
            setInterval(topTime_zhuanlan, 300); //                             置顶显示时间
            blockUsers(); //                                                   屏蔽指定用户
        } else if (location.pathname.indexOf('/column/') > -1) { //    专栏 //
            collapsedNowAnswer('main div'); //                                 收起当前回答 + 快捷返回顶部
            setInterval(topTime_zhuanlan, 300); //                             置顶显示时间
            blockUsers(); //                                                   屏蔽指定用户
        } else if (location.pathname.indexOf('/people/') > -1 || location.href.indexOf('org') > -1) { // 用户主页 //
            if (location.pathname.split('/').length === 3) addTypeTips();addToQuestion(); // 区分问题文章、直达问题按钮
            collapsedNowAnswer('main div'); //                                 收起当前回答 + 快捷返回顶部
            collapsedNowAnswer('.Profile-main'); //                            收起当前回答 + 快捷返回顶部
            setInterval(topTime_people, 300); //                               置顶显示时间
            blockUsers('people'); //                                           屏蔽指定用户
            blockKeywords('people'); //                                        屏蔽指定关键词
        } else if (location.pathname.indexOf('/collection/') > -1) { // 收藏夹 //
            addTypeTips(); //                                                  区分问题文章
            addToQuestion(); //                                                直达问题按钮
            collapsedNowAnswer('main'); //                                     收起当前回答 + 快捷返回顶部
            collapsedNowAnswer('.CollectionsDetailPage'); //                   收起当前回答 + 快捷返回顶部
            setInterval(topTime_people, 300); //                               置顶显示时间
            blockKeywords('collection'); //                                    屏蔽指定关键词
        } else { //                                                     首页 //
            collapsedNowAnswer('main div'); //                                 收起当前回答 + 快捷返回顶部
            collapsedNowAnswer('.Topstory-container'); //                      收起当前回答 + 快捷返回顶部
            setInterval(topTime_index, 300); //                                置顶显示时间
            addTypeTips(); //                                                  区分问题文章
            addToQuestion(); //                                                直达问题按钮
            blockUsers('index'); //                                            屏蔽指定用户
            blockKeywords('index'); //                                         屏蔽指定关键词
            blockType(); //                                                    屏蔽指定类别（视频/文章等）
            // 解决屏蔽视频后，因为首页信息流太少而没有滚动条导致无法加载更多内容的问题
            if (menu_value('menu_blockTypeVideo')) document.lastElementChild.appendChild(document.createElement('style')).textContent = '.Topstory-container{min-height: 1500px;}';
        }
    }
})();