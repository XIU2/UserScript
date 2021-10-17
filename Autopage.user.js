// ==UserScript==
// @name         自动无缝翻页
// @version      3.0.7
// @author       X.I.U
// @description  无缝拼接下一页内容（瀑布流），目前支持：[所有「Discuz!、Flarum、phpBB、Xiuno、DUX/XIU/D8/Begin(WP主题)」网站]、百度、谷歌、必应、搜狗、头条搜索、360 搜索、微信搜索、贴吧、豆瓣、微博、NGA、V2EX、B 站(Bilibili)、蓝奏云、煎蛋网、糗事百科、龙的天空、起点小说、IT之家、千图网、Pixabay、3DM、游侠网、游民星空、NexusMods、Steam 创意工坊、CS.RIN.RU、FitGirl、片库、茶杯狐、NO视频、低端影视、奈菲影视、91美剧网、音范丝、BT之家、萌番组、动漫花园、樱花动漫、爱恋动漫、AGE动漫、Nyaa、SrkBT、RARBG、SubHD、423Down、不死鸟、扩展迷、极简插件、小众软件、动漫狂、漫画猫、漫画DB、动漫之家、古风漫画网、PubMed、wikiHow、GreasyFork、Github、StackOverflow（以上仅一小部分，更多的写不下了...
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAALfElEQVRYhX2Xe3Bd1XXGf3vvc859X+nq6nUlW5Yly7JlI2xsYzAwtnk4ATpAxkNTHm0mnaTT/gHTTvrIBDLTpp1JUoZppqHQls5AKTR2INOWJJQSXF4x2BhsJCRZ8kuWZckPSVf3/Trn7N3RVTFpQrNn1l97n7O/vda31reWMKMPcmUJA9U8vrwHGdqCHn4HPzePaIxhVSoYbYRXrn7BeMVbCUduF6kVUXHwvQP+6amDaqDnoIompmQytaBnTmB8H5lowrjgFss48SBeI/hUEEZeudLi1ywhJEIJdL6Q8rzal/1a5SGC4XZrYBvWwEZobMdLdH6RH+z/Io1taEeh52fe8tOZbysl/ouWFvANYP7fSz4DgAEBBIL4xiS8ubmnVcTZK68aRK29Dtm8dgnZJydRW+/E2nrnp19nz+7U77+60zt0qMz07J/KxuQTwrIw4rMBCDP6wC+FIIcO34eudDdXf/7jD52Opi772lugY3AZr++hp06gz48j+waRqTWYmVHcS+chEMFeuw1hBzBzY7g/fQE9fmqBYPzBQKrpVa/R4OkCAnXlSvXnX9sIllk220BE4Z8OdHoj54YCK6Od1i2/iUmuRyDRk6NUn3+M0pv/hnf0AE40jEjEqP3oe6Rf/CGOWUTNjFKby2MP7EBtugURFWFxfOhB4+o4yfhrGAdZsxHaqZt6dNce9KXYFSPfGWS68JFqTXSqO7+MCaTqETGTwxSeeoRCOoPT2YUIhFC2jbQF/uwUatU6rPbVUM5T+OfHUO3dWKv6kSsGUIOD6PEPr+fswnanpecFZYVQhFAyjPS9Tj4xw2rcU+pJApEutWsvRjaBW8NUShilkE1JIqlUPfi6VMLNFTBVr+7KYKqJ8uEjlM+dJrR5K0L7eB+9hTd2CFrWYt33h0jH3O5Nj37TBGtgZUBkUN/6q4dQ7UmsnlW450//gU5PPRq460uQXAu+j//i99A/+UdUMoXqbMNkz2OnUkixlF4u9spe/HMTULyEaA7jXkoT2fEbQIXi838DJ4cRDXHkEjc2b0MPHdptZubGpBUbM0UfKQpBRDmKWRSD3tTMk87gddA2WGe4+dkzMD0CyQ5qP/4XVDCAvfkaLMvHamzEClpQzGDF46iuJOH1CaKr2tDZRfzhQ0Ru24NYsYrCM4/jDb+FiHdi3XU/0s3vr7WsGKxcfyPSy+bxi0UqJ8f/IriiE2vrnuWsLefQk8NoO4AMBBB9/XjDI6hQCjdTxq9WCaQ6ULaDFrIeKr3oIlv70Olz2K1xlAVaSUQojD786nKi9e5A3LBHMHn0W+LUUaS1FI9q+iZZWLhHdq/FxFbWSSfsIDIQwVw4g/GK2OuuhloNMzaCaF+DNBJtQfX8LFYigElX0OkQtZKHVy3jqwDlqWncCzPI3nU4t+2FWrH+OLHzHpRl3109memTOhqDi9NfkefHEKvWLTO+VKD68Qf4G27CueFWhJ/Df+0lVFcXJOJYnobm1ZjsJUxuFjyDjK/GNK2gND4ESuDPXcCOSaI7thPqX0ft8OtUn/oTKOQgkET39KJU4RbpZXOtNRW717p+FyRSdYT+v36H4u/fQXbfc3iRDkT3FsTGjWAWEU0OZKfAU9CyEdXVD2lQPduplmo4jkBEbMzK1VgDu5EVTe3gm1RHx6Bcxpz6YLkEO0lMYeFGi6z7eVMqhkT/ZrCb0LNT+NMTRH/nt/BLRdy3X8Nv68Lu6cZEHURjE6K3hirYeLRhDWyA4jxzH40RXJwkeuM29MpN+JcziEsz+Avz6GgcW1pYbUlEQCyHwYpSyxS7rGo+v8man4ZMATrAHf+QSt7FTkWR4QbsjlbIX8IMH0VuuAqj4piGAbhmEPPzI/injnNxMUPuwOtseOIxKKTJ7/8BTBxDdXcjO9sJdTeg01VqH4wg3CDB9bshHMKORbGolVOmeRW09dVdUxkbp3ruNM7GXnS1hK5OYSoSbBDZBcxCBtF3DcUzk6hkhGA0RmtHKx1rOkE04lbzWC1tqMRt1CZHUafPIs8H6/JsNTcgN+9YFq1qgbBUFUvnK9qrVghXCvWN8MBmivueJDtylqaeBKWJaXR4JZEtNyBWrkGt6AJboCZO4J49Rc64xGIhcgtZgm6egKhgtUQQto17WeHOLqCNj5Vowbr7q4j+Lcs1JhhEphcXLTebd0jPwpkx6Lwa++bbCR95ALecp5a6BrvrJoLdHajmMOTnKb3+BrVMntjARpzeFbz8jcfpa22gGm+kMJlm95Zu9M9+iI5G0G3d6EgIUSnjzs/gv/Icgd6rqcvz0IeYWnXc8pEtYnEe8gtXNL7xz74LehHSE3DqNP7EIdx3p5DSh7JNJePiBE/gN3Uz8NWHae5sRJYXqKQvU+raQPg7L6L3/QNMHcfp6EREGjC5LDp9GaOs5VQ/NQI93YctOxFPlwniDh/C3n47JHvrQPTBl3DHjiIDQUQ4jGhOYcqaQFuE0Nl53OnLRHfsZV33KsTxd6GlHeaP477zMl5uAWv7dkyLg6kZREsb+vgCcvPOuoaYuWNQWERs3jAuQ6nooXK6TH566cXnrjQK7uwFaoseWA3oJf2WEhEJUjm/gMgXCfdvQlFFv/R3uCND6FIRv7MfMnOIiaPoI/8NEb2kWAhfoLbdjLr2jmUv/8f+pVbkHRGNnZHum2/udxxtCn4j/vgEIjNTD4O9upfIprUYoxBKo9Z14jumTq7YYD9WayvuR++hs1lkshmha4iuNeDYiIAFMoCevIi+cJHaa29gmvsRTUn0R29g9u1D7bxxv+jrRnpD56cCkdjfV9NzpA+8A5VlLojWAczlGVTAYKXimIU8MlsjtKEXgiF0aRGdm8cEYnXm+O+/gdAGuWsP3shhTHoOEYqCCEF2DsrF5f+e/xiikUldrT6l3z+GevSaTahaZdRY6uFqxRXR1sRyzU/21Gu6OTOMfzmPd6kI8TgiX8B4imouj1QCKmVUNITJ59AnR1F77kH4ZaRnQFroMyeRW3egdt6DwIX391Gshv+4LK2jtcuLqK9t7ALjZXzH1uVM/mb/7BTRnjZEex+idQ2EAnjjR/BdF1PIoV2Bae/F/fh9dL5IYE0XUmpMNo+ev4AINSJWb0UPHa63Z7SvRN3/CHJpFHj2G4iZzAuBbTu+GWpIEGxrQ/3RnlvxG5M4kYa3Lc2u4uyFblnIE+xfAbF2RMtqZGsn/uTYUgHH+dz9eFMnqYx8gO+CEwkjhcDPF/DLHurSaeTm3RiWMsDHeuDrSFvBv3+bi08+N1Vwuj/vZWtu+dwclZlFrESoeZmZysJXoTsCjnVk8dDQBuN+n8RDD9fbcdG7leBX1iOkQjhBOHmQfKGAHW3CS6fR+QClmYuYMyPY265DtPVgtfctiw4V/GcfYfGNQzj3/u4DqlormUoZEQwuc0I//eSnY4G0wPJjmdGhw+mh0fWxNZ0037cXccPd1MXgk+GjNE/tR3+Le+YEyg5TnT6LXlwgcu1u7C99HZlsv3K2+vjvkTs2RvDe3747tm7Dy1SKvzSYPP/MLwxFAkIKEzEye2zswOXX395lJyK0fOFzRHfuglQfqPin59Nn0RNDuJk09vprkd0brmx5H7xCbfgQbrZ83OkfvN1pj0+ZmkBYNhjzCwCeffr/AsBDJyU6kqBwbPzRuTcP/GXV82lYlaJpfQ+BjVdhXX0tNKTAjvzKqKXPTeC++1NKY0c9kVz1SGzb9X8tjIdfzSFCDfUw/noA0scPuxBrwcvmmH3rQIvMm3/y0XdJS4JfIpiIUG9g+wcg6KDnZpGZNDQ0Ii5cSAtlPRHYct13axWvJNwadiiAli4iEP8VAJ89HQtR129TLiG1nos0Nt8dSOi12qi9lRq3utVqT/lirql24hW3vLBQi3d3XUqu73+PZOonBNR/WnbYSMeGTO5/Xf6ZtwDwPwtFRezQVs+sAAAAAElFTkSuQmCC
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        unsafeWindow
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var menuAll = [
        ['menu_disable', '✅ 已启用 (点击对当前网站禁用)', '❌ 已禁用 (点击对当前网站启用)', []],
        ['menu_discuz_thread_page', '帖子内自动翻页', '帖子内自动翻页', true],
        ['menu_page_number', '显示当前页码及点击暂停翻页', '显示当前页码及点击暂停翻页', true],
        ['menu_pause_page', '左键双击网页空白处暂停翻页', '左键双击网页空白处暂停翻页', false]
    ], menuId = [], webType = 0, curSite = {SiteTypeID: 0}, DBSite, SiteType, pausePage = true, pageNum = {now: 1, _now: 1}, locationChange = false, nowLocation = '', forumWebsite = ['cs.rin.ru', 'www.flyert.com', 'bbs.pediy.com', 'www.libaclub.com', 'tieba.baidu.com'];
    for (let i=0;i<menuAll.length;i++){ // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menuAll[i][0]) == null){GM_setValue(menuAll[i][0], menuAll[i][3])};
    }
    registerMenuCommand();
    if (menuId.length < 2) {return}
    // 注册脚本菜单
    function registerMenuCommand() {
        if (menuId.length != []){
            for (let i=0;i<menuId.length;i++){
                GM_unregisterMenuCommand(menuId[i]);
            }
        }
        for (let i=0;i<menuAll.length;i++) { // 循环注册脚本菜单
            menuAll[i][3] = GM_getValue(menuAll[i][0]);
            if (menuAll[i][0] === 'menu_disable') { // 启用/禁用

                if (menu_disable('check')) { // 当前网站在禁用列表中
                    menuId[i] = GM_registerMenuCommand(`${menuAll[i][2]}`, function(){menu_disable('del')});
                    return
                } else { // // 不在禁用列表中
                    webType = doesItSupport(); // 判断网站类型（即是否支持），顺便直接赋值
                    if (webType === 0) {
                        GM_registerMenuCommand('❌ 当前网站暂不支持 [点击申请支持]', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});});
                        console.info('[自动无缝翻页] - 不支持当前网站 [ ' + location.href + ' ]，欢迎申请支持: https://github.com/XIU2/UserScript / https://greasyfork.org/zh-CN/scripts/96880/feedback');
                        return
                    } else if (webType === -1) {
                        return
                    }
                    menuId[i] = GM_registerMenuCommand(`${menuAll[i][1]}`, function(){menu_disable('add')});
                }

            } else if (menuAll[i][0] === 'menu_discuz_thread_page') { // 帖子内自动翻页 (仅论坛)

                if (webType === 2 || webType === 4 || webType === 10 || forumWebsite.indexOf(location.host) > -1) {
                    menuId[i] = GM_registerMenuCommand(`${menuAll[i][3]?'✅':'❌'} ${menuAll[i][1]}`, function(){menu_switch(menuAll[i][3], menuAll[i][0], menuAll[i][2])});
                }

            } else {
                menuId[i] = GM_registerMenuCommand(`${menuAll[i][3]?'✅':'❌'} ${menuAll[i][1]}`, function(){menu_switch(menuAll[i][3], menuAll[i][0], menuAll[i][2])});
            }
        }
        menuId[menuId.length] = GM_registerMenuCommand('💬 反馈 & 欢迎申请支持', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});});
    }

    // 网站规则
    function setDBSite() {
    /*
    自动翻页规则
    locationChange: 对于使用 pjax 技术的网站，需要监听 URL 变化来重新判断翻页规则
    insStyle: 要插入网页的 CSS Style 样式
    type：
      1 = 由脚本实现自动无缝翻页
      2 = 网站自带了自动无缝翻页功能，只需要点击下一页按钮即可
          nextText: 按钮文本，当按钮文本 = 该文本时，才会点击按钮加载下一页（避免一瞬间加载太多次下一页）
          nextTextOf: 按钮文本的一部分，当按钮文本包含该文本时，才会点击按钮加载下一页（避免一瞬间加载太多次下一页）
          nextHTML: 按钮内元素，当按钮内元素 = 该元素内容时，才会点击按钮加载下一页（避免一瞬间加载太多次下一页）
          interval: 点击间隔时间，对于没有按钮文字变化的按钮，可以手动指定间隔时间，单位：ms
          isHidden: 只有下一页按钮可见时（没有隐藏），才会点击
      3 = 依靠元素距离可视区域底部的距离来触发翻页
      4 = 部分简单的动态加载类网站（暂时）
    insertP：
      1 = 插入该元素本身的前面；
      2 = 插入该元素当中，第一个子元素前面；
      3 = 插入该元素当中，最后一个子元素后面；
      4 = 插入该元素本身的后面；
      5 = 插入该元素末尾（针对文本）
    scriptT: 单独插入 <script> 标签
      1 = 下一页的所有 <script> 标签
      2 = 下一页主体元素同级 <script> 标签
      3 = 下一页主体元素同级 <script> 标签（远程文件）
      4 = 下一页主体元素子元素 <script> 标签
    history: 添加历史记录 并 修改当前 URL
    forceHTTPS: 下一页链接强制 HTTPS
    hiddenPN: 不显示脚本左下角的页码
    scrollD：数值越大，滚动条触发点越靠上（越早开始翻页），一般是访问网页速度越慢，该值就需要越大（如果 Type = 3，则相反）
    function：
      bF = 插入前执行函数；
      aF = 插入后执行函数；
      pF = 参数
    */
        DBSite = {
            discuz_forum: {
                pager: {
                    type: 2,
                    nextL: '#autopbn',
                    nextTextOf: '下一页',
                    scrollD: 1500
                }
            }, //       Discuz! 论坛 - 各版块帖子列表（自带无缝加载下一页按钮的）
            discuz_guide: {
                pager: {
                    type: 1,
                    nextL: '//a[contains(@class, "nxt") or contains(@class, "next")][not(contains(@href, "javascript"))]',
                    pageE: 'css;#threadlist table > tbody[id^="normalthread_"]',
                    insertP: ['id("threadlist")//table/tbody[starts-with(@id, "normalthread_")]/parent::table', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollD: 1000
                }
            }, //       Discuz! 论坛 - 导读页 及 各版块帖子列表（不带无缝加载下一页按钮的）
            discuz_waterfall: {
                pager: {
                    type: 1,
                    nextL: '//a[contains(@class, "nxt") or contains(@class, "next")][not(contains(@href, "javascript"))]',
                    pageE: 'css;#waterfall > li',
                    insertP: ['css;#waterfall', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollD: 1000
                }
            }, //   Discuz! 论坛 - 图片模式的各版块帖子列表（不带无缝加载下一页按钮的）
            discuz_thread: {
                insStyle: '.pgbtn {display: none;}',
                pager: {
                    type: 1,
                    nextL: '//a[contains(@class, "nxt") or contains(@class, "next")][not(contains(@href, "javascript"))]',
                    pageE: 'css;#postlist > div[id^="post_"]',
                    insertP: ['css;#postlist', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[file]', 'file']
                }
            }, //      Discuz! 论坛 - 帖子内
            discuz_search: {
                pager: {
                    type: 1,
                    nextL: '//a[contains(@class, "nxt") or contains(@class, "next")][not(contains(@href, "javascript"))]',
                    pageE: 'css;#threadlist > ul',
                    insertP: ['css;#threadlist', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollD: 1000
                }
            }, //      Discuz! 论坛 - 搜索页
            discuz_youspace: {
                pager: {
                    type: 1,
                    nextL: '//a[contains(@class, "nxt") or contains(@class, "next")][not(contains(@href, "javascript"))]',
                    pageE: 'css;tbody > tr:not(.th)',
                    insertP: ['css;tbody', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollD: 1000
                }
            }, //    Discuz! 论坛 - 回复页、主题页（别人的）
            discuz_collection: {
                pager: {
                    type: 1,
                    nextL: '//a[contains(@class, "nxt") or contains(@class, "next")][not(contains(@href, "javascript"))]',
                    pageE: 'css;#ct .bm_c table > tbody',
                    insertP: ['css;#ct .bm_c table', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollD: 1000
                }
            }, //  Discuz! 论坛 - 淘帖页
            flarum: {
                functionStart: function() {locationChange = true;if (location.pathname.indexOf('/d/') === -1) {curSite = DBSite.flarum;}},
                pager: {
                    type: 2,
                    nextL: '.DiscussionList-loadMore > button[title]',
                    interval: 500,
                    scrollD: 1000
                }
            }, //             Flarum 论坛
            phpbb: {
                functionStart: function() {if (location.pathname.indexOf('/viewforum.php') > -1) {
                    curSite = DBSite.phpbb;
                } else if (location.pathname.indexOf('/viewtopic.php') > -1 && GM_getValue('menu_discuz_thread_page')) {
                    curSite = DBSite.phpbb_viewtopic;
                } else if (location.pathname.indexOf('/search.php') > -1) {
                    curSite = DBSite.phpbb_search;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: 'css;.forumbg:not(.announcement) ul.topiclist.topics > li',
                    insertP: ['css;.forumbg:not(.announcement) ul.topiclist.topics', 3],
                    replaceE: 'css;.action-bar .pagination, .topic-actions .pagination',
                    scrollD: 2000
                }
            }, //              phpBB 论坛 - 各版块帖子列表
            phpbb_viewtopic: {
                pager: {
                    type: 1,
                    nextL: 'css;.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: 'css;div.post[id], div.post[id]+hr',
                    insertP: ['(//div[contains(@class, "post ")][@id]/following-sibling::hr[last()] | //div[contains(@class, "post ")][@id][last()])[last()]', 4],
                    replaceE: 'css;.action-bar .pagination, .topic-actions .pagination',
                    scrollD: 2000
                }
            }, //    phpBB 论坛 - 帖子内
            phpbb_search: {
                pager: {
                    type: 1,
                    nextL: 'css;.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: 'css;div.search.post',
                    insertP: ['//div[contains(@class, "search") and contains(@class, "post")][last()]', 1],
                    replaceE: 'css;.action-bar .pagination, .pagination',
                    scrollD: 2000
                }
            }, //       phpBB 论坛 - 搜索页
            xiuno: {
                functionStart: function() {if (location.pathname === '/' || location.pathname.indexOf('/index') > -1 || location.pathname.indexOf('/forum') > -1) {
                    curSite = DBSite.xiuno;
                } else if (location.pathname.indexOf('/thread') > -1 && GM_getValue('menu_discuz_thread_page')) {
                    curSite = DBSite.xiuno_post;
                    if (document.querySelector('ul.postlist > li.newpost')) curSite.pager.insertP = ['(//ul[contains(@class, "postlist")][./li[contains(@class, "newpost")]])[last()]', 1]; // 有的带回复框，需要插入到前面
                }},
                pager: {
                    type: 1,
                    nextL: '//li/a[contains(text(), "▶")]',
                    pageE: 'css;ul.threadlist > li',
                    insertP: ['css;ul.threadlist', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //              Xiuno 论坛 - 各版块帖子列表
            xiuno_post: {
                pager: {
                    type: 1,
                    nextL: '//li/a[contains(text(), "▶")]',
                    pageE: '(//ul[contains(@class, "postlist")][./li[@data-uid]])[last()]/li',
                    insertP: ['(//ul[contains(@class, "postlist")][./li[@data-uid]])[last()]', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //         Xiuno 论坛 - 帖子内
            dux: {
                host: 'www.puresys.net',
                pager: {
                    type: 1,
                    nextL: 'css;li.next-page > a',
                    pageE: 'css;.content > article',
                    insertP: ['css;.content > .pagination', 1],
                    replaceE: 'css;.content > .pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img.thumb[data-src]', 'data-src']
                }
            }, //                WordPress 的 DUX、XIU、D8 主题
            begin: {
                pager: {
                    type: 2,
                    nextL: 'div[id^="ias_trigger_"]',
                    interval: 500,
                    scrollD: 1500
                }
            }, //              WordPress 的 Begin 主题
            begin_search: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;#main > ul > li',
                    insertP: ['css;#main > ul', 3],
                    replaceE: 'css;nav.pagination',
                    scrollD: 1500
                }
            }, //       WordPress 的 Begin 主题 - 搜索页
            biquge: {
                functionStart: function() {if (/\d+\/\d+\.html/.test(location.pathname)) {curSite = DBSite.biquge;}},
                pager: {
                    type: 1,
                    nextL: '//a[contains(text(), "下一章") or contains(text(), "下一页")]',
                    pageE: 'css;#content',
                    insertP: ['css;#content', 5],
                    replaceE: '//*[./a[contains(text(), "下一章") or contains(text(), "下一页")]] | //title',
                    history: true,
                    scrollD: 1500
                }
            }, //             笔趣阁 模板的小说网站
            baidu: {
                host: 'www.baidu.com',
                insStyle: '.new-pmd .c-img-border {position: initial !important;} .op-bk-polysemy-video__wrap.c-gap-bottom {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: 'id("page")//a[contains(text(),"下一页")]',
                    pageE: 'css;#content_left > *',
                    insertP: ['css;#content_left', 3],
                    replaceE: 'css;#page',
                    scrollD: 1200
                }
            }, //                  百度 搜素
            google: {
                host: /.google./,
                functionStart: function() {if (location.pathname === '/search') {
                    curSite = DBSite.google;
                } else if (location.pathname === '/scholar') {
                    curSite = DBSite.google_scholar;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;#pnnext',
                    pageE: 'css;#res > *',
                    insertP: ['css;#res', 3],
                    replaceE: 'id("navcnt") | id("rcnt")//div[@role="navigation"]',
                    scriptT: 1,
                    scrollD: 3000
                }
            }, //                 谷歌 搜索
            bing: {
                host: ['www.bing.com','cn.bing.com'],
                functionStart: function() {if (location.pathname === '/search') {
                    curSite = DBSite.bing;
                } else if (location.pathname === '/academic/search') {
                    curSite = DBSite.bing_academic;
                }},
                insStyle: '.b_imagePair.square_mp > .inner {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: '//a[contains(@class,"sb_pagN")]',
                    pageE: 'css;#b_results > li:not(.b_msg):not(.b_pag):not(#mfa_root)',
                    insertP: ['css;#b_results > .b_pag', 1],
                    replaceE: 'css;#b_results > .b_pag',
                    scrollD: 1500
                }
            }, //                   必应 搜索
            sogou: {
                host: 'www.sogou.com',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.sogou;}},
                pager: {
                    type: 1,
                    nextL: 'css;#sogou_next',
                    pageE: 'css;.results > *',
                    insertP: ['css;.results', 3],
                    replaceE: 'css;#pagebar_container',
                    scriptT: 4,
                    scrollD: 1200
                }
            }, //                  搜狗 搜索
            sogou_weixin: {
                host: 'weixin.sogou.com',
                functionStart: function() {if (location.pathname === '/') {
                    curSite = DBSite.sogou_weixin;
                } else if (location.pathname === '/weixin') {
                    curSite = DBSite.sogou_weixin_search;
                }},
                pager: {
                    type: 2,
                    nextL: '#look-more',
                    interval: 1000,
                    scrollD: 1000
                }
            }, //           搜狗微信 - 首页
            sogou_weixin_search: {
                pager: {
                    type: 1,
                    nextL: 'css;#sogou_next',
                    pageE: 'css;ul[class*="news-list"] > li',
                    insertP: ['css;ul[class*="news-list"]', 3],
                    replaceE: 'css;#pagebar_container',
                    scrollD: 1000
                }
            }, //    搜狗微信 - 搜索
            toutiao: {
                host: ['www.toutiao.com', 'so.toutiao.com'],
                functionStart: function() {if (location.hostname != 'www.toutiao.com') {if (location.pathname === '/search') {curSite = DBSite.toutiao;}}},
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "-pagination")]/a[contains(string(), "下一页")]',
                    pageE: 'css;div[class*="-result-list"] > .result-content[data-i]',
                    insertP: ['css;div[class*="-result-list"] > .result-content:not([data-i]):last-child', 1],
                    replaceE: 'css;div[class*="-pagination"]',
                    scrollD: 1200
                },
                function: {
                    bF: toutiao_bF
                }
            }, //                头条 搜索
            so: {
                host: 'www.so.com',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.so; insStyle('img {opacity: 1 !important;}')}},
                pager: {
                    type: 1,
                    nextL: 'css;a#snext',
                    pageE: 'css;ul.result > li, style:not(src)',
                    insertP: ['css;ul.result', 3],
                    replaceE: 'css;#page',
                    scrollD: 1200
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-isrc]', 'data-isrc']
                }
            }, //                     360 搜索
            duckduckgo: {
                host: 'duckduckgo.com',
                functionStart: function() {
                    if (getCookie('av') != '1') {
                        document.cookie='av=1; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 强制开启自带的无缝翻页功能
                        location.reload(); // 刷新网页
                    }
                },
            }, //             DuckDuckGo 搜索
            startpage: {
                host: 'www.startpage.com',
                functionStart: function() {if (location.pathname.indexOf('/search') > -1) {curSite = DBSite.startpage;}},
                pager: {
                    type: 1,
                    nextL: startpage_nextL,
                    pageE: 'css;section.w-gl--desktop > div',
                    insertP: ['css;section.w-gl--desktop', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //              Startpage 搜索
            yandex: {
                host: 'yandex.com',
                functionStart: function() {if (location.pathname === '/search/') {curSite = DBSite.yandex;}},
                pager: {
                    type: 1,
                    nextL: 'css;a.pager__item_kind_next',
                    pageE: 'css;#search-result > *, style',
                    insertP: ['css;#search-result', 3],
                    replaceE: 'css;.pager',
                    scrollD: 1500
                }
            }, //                 Yandex 搜索
            yahoo: {
                host: 'search.yahoo.com',
                functionStart: function() {if (location.pathname.indexOf('/search') > -1) {curSite = DBSite.yahoo;}},
                pager: {
                    type: 1,
                    nextL: 'css;.pagination a.next',
                    pageE: 'css;#web ol > li',
                    insertP: ['css;#web ol', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //                  Yahoo 搜索
            yahoo_jp: {
                host: 'search.yahoo.co.jp',
                functionStart: function() {if (location.pathname.indexOf('/search') > -1) {curSite = DBSite.yahoo_jp;}},
                pager: {
                    type: 1,
                    nextL: 'css;.Pagenation__next > a',
                    pageE: 'css;.Contents__innerGroupBody > div',
                    insertP: ['css;.Contents__innerGroupBody', 3],
                    replaceE: 'css;.Pagenation',
                    scrollD: 1500
                }
            }, //               Yahoo 搜索 (JP)
            qwant: {
                host: 'www.qwant.com',
                functionStart: function() {locationChange = true; if (location.search.indexOf('q=') > -1 && location.search.indexOf('t=web') > -1) {curSite = DBSite.qwant;}},
                pager: {
                    type: 2,
                    nextL: 'button[data-testid="buttonShowMore"]',
                    interval: 500,
                    scrollD: 1500
                }
            }, //                  Qwant 搜索
            ecosia: {
                host: 'www.ecosia.org',
                functionStart: function() {if (location.pathname === '/search') {curSite = DBSite.ecosia;}},
                pager: {
                    type: 1,
                    nextL: 'css;nav.pagination a[aria-label="Next page"]',
                    pageE: 'css;section.mainline > div:not(.related-queries)',
                    insertP: ['css;nav.pagination', 1],
                    replaceE: 'css;nav.pagination',
                    scrollD: 1500
                }
            }, //                 Ecosia 搜索
            magi: {
                host: 'magi.com',
                functionStart: function() {if (location.pathname === '/search') {curSite = DBSite.magi;}},
                pager: {
                    type: 2,
                    nextL: '.card[data-type="next"]',
                    nextText: '加载更多',
                    scrollD: 1500
                }
            }, //                   Magi 搜索
            baidu_tieba: {
                host: 'tieba.baidu.com',
                functionStart: function() {if (location.pathname === '/f') {
                    baidu_tieba_1(); // 右侧悬浮发帖按钮点击事件（解决自动翻页导致无法发帖的问题）
                    curSite = DBSite.baidu_tieba;
                } else if (location.pathname.indexOf('/p/') > -1) {
                    curSite = DBSite.baidu_tieba_post;
                } else if (location.pathname === '/f/search/res') {
                    curSite = DBSite.baidu_tieba_search;
                }},
                iframe: true,
                insStyle: 'img.j_retract {margin-top: 0 !important;margin-bottom: 0 !important;}', // 修复帖子列表中预览图片，在切换下一个/上一个图片时，多出来的图片上下边距
                pager: {
                    type: 4,
                    nextL: baidu_tieba_nextL,
                    pageE: 'css;#thread_list > li',
                    insertP: ['css;#thread_list', 3],
                    insertE: baidu_tieba_insertE,
                    replaceE: 'css;#frs_list_pager',
                    interval: 2000,
                    scrollD: 2000
                },
                function: {
                    bF: baidu_tieba_bF
                }
            }, //        百度贴吧 - 帖子列表
            baidu_tieba_post: {
                insStyle: '.d_sign_split, img.j_user_sign, .d_author .d_pb_icons, .save_face_bg, .save_face_bg_2, li.d_name a.icon_tbworld, .lzl_cnt a.icon_tbworld, .core_reply div.hideLzl[style*="min-height:50px"] {display: none !important;} a.p_author_face.j_frame_guide {background: none repeat scroll 0 0 #FFF !important;border: 1px solid #CCC !important;padding: inherit !important;} .red_text, .red-text, .vip_red, .vip-red, .vip_red:hover, .vip-red:hover, .vip_red:visited, .vip-red:visited {color: #2d64b3 !important;}', // 签名、印记、头像边框、VIP 元素
                pager: {
                    type: 4,
                    nextL: baidu_tieba_post_nextL,
                    //nextL: '//li[contains(@class,"pb_list_pager")]/a[contains(text(),"下一页")]',
                    pageE: 'css;#j_p_postlist > div',
                    insertP: ['css;#j_p_postlist', 3],
                    replaceE: 'css;li.pb_list_pager',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-tb-lazyload]', 'data-tb-lazyload']
                }
            }, //   百度贴吧 - 帖子内
            baidu_tieba_search: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;.s_post_list > div',
                    insertP: ['css;.s_post_list', 3],
                    replaceE: 'css;.pager',
                    scriptT: 1,
                    scrollD: 1000
                }
            }, // 百度贴吧 - 搜索页
            douban_subject_comments: {
                host: 'movie.douban.com',
                functionStart: function() {if (location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/comments') > -1) { // 短评列表
                    curSite = DBSite.douban_subject_comments;
                } else if (location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/reviews') > -1) { // 影评列表
                    curSite = DBSite.douban_subject_reviews;
                } else if(location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/episode') > -1) { // 电视剧每集评论
                    curSite = DBSite.douban_subject_episode;
                } else if(location.pathname.indexOf('/people') > -1 && location.pathname.indexOf('/collect') > -1) { // 看过的电影
                    curSite = DBSite.douban_people_collect;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;#comments > .comment-item',
                    insertP: ['css;#paginator', 1],
                    replaceE: 'css;#paginator',
                    scrollD: 1000
                }
            }, // 豆瓣 - 短评
            douban_subject_reviews: {
                pager: {
                    type: 1,
                    nextL: 'css;link[rel="next"]',
                    pageE: 'css;.review-list > div',
                    insertP: ['css;.review-list', 3],
                    replaceE: 'css;.paginator',
                    scrollD: 1000
                }
            }, //  豆瓣 - 影评
            douban_subject_episode: {
                pager: {
                    type: 1,
                    nextL: 'css;link[rel="next"]',
                    pageE: 'css;#comments > div',
                    insertP: ['css;#comments', 3],
                    replaceE: 'css;.paginator',
                    scrollD: 1000
                }
            }, //  豆瓣 - 剧评
            douban_people_collect: {
                pager: {
                    type: 1,
                    nextL: 'css;link[rel="next"]',
                    pageE: 'css;.grid-view > div',
                    insertP: ['css;.grid-view', 3],
                    replaceE: 'css;.paginator',
                    scrollD: 1000
                }
            }, //   豆瓣 - 看过的电影
            douban_group: {
                host: 'www.douban.com',
                functionStart: function() {if (location.pathname.indexOf('/group/topic/') > -1) {
                    curSite = DBSite.douban_group_topic;
                } else if (location.pathname.indexOf('/group/explore') > -1) {
                    curSite = DBSite.douban_group_explore;
                } else if (location.pathname.indexOf('/group/') > -1 && location.pathname.indexOf('/discussion') > -1) {
                    curSite = DBSite.douban_group;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;span.next > a',
                    pageE: 'css;table.olt > tbody > tr:not(.th)',
                    insertP: ['css;table.olt > tbody', 3],
                    replaceE: 'css;.paginator',
                    scrollD: 1000
                }
            }, //            豆瓣 - 小组
            douban_group_explore: {
                pager: {
                    type: 1,
                    nextL: 'css;span.next > a',
                    pageE: 'css;#content .article > div > .channel-item',
                    insertP: ['css;#content .article > div', 3],
                    replaceE: 'css;.paginator',
                    scrollD: 1000
                }
            }, //    豆瓣 - 小组讨论精选
            douban_group_topic: {
                pager: {
                    type: 1,
                    nextL: 'css;span.next > a',
                    pageE: 'css;#comments > li',
                    insertP: ['css;#comments', 3],
                    replaceE: 'css;.paginator',
                    scrollD: 1000
                }
            }, //      豆瓣 - 小组帖子内
            weibo_comment: {
                host: 'weibo.com',
                pager: {
                    type: 2,
                    nextL: 'a[action-type="click_more_comment"]',
                    nextText: '查看更多c',
                    scrollD: 1000
                }
            }, //       微博评论
            tianya: {
                host: 'bbs.tianya.cn',
                functionStart: function() {if (location.pathname.indexOf('/list') > -1) {
                    curSite = DBSite.tianya;
                } else if (location.pathname.indexOf('/post') > -1) {
                    curSite = DBSite.tianya_post;
                }},
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "pages")]/div[@class="links"]/a[contains(text(), "下一页")]',
                    pageE: 'css;.tab-bbs-list > tbody:not(:first-of-type)',
                    insertP: ['css;table.tab-bbs-list', 3],
                    replaceE: '//div[contains(@class, "pages")]',
                    scrollD: 1500
                }
            }, //              天涯社区
            tianya_post: {
                pager: {
                    type: 1,
                    nextL: 'a.js-keyboard-next',
                    pageE: 'css;.atl-main > div[class="atl-item"]',
                    insertP: ['css;.atl-main', 3],
                    replaceE: 'css;.atl-pages > form',
                    scrollD: 1500
                }
            }, //         天涯社区 - 帖子内
            nga_thread: {
                host: ['bbs.nga.cn', 'ngabbs.com', 'nga.178.com', 'g.nga.cn'],
                iframe: true,
                functionStart: function() {locationChange = true;
                if (location.pathname === '/thread.php') { // 帖子列表
                    curSite = DBSite.nga_thread;
                } else if (location.pathname === '/read.php') { // 帖子内
                    curSite = DBSite.nga_read;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;#pagebbtm a[title="下一页"]',
                    pageE: 'css;#topicrows > tbody, #topicrows > script',
                    insertP: ['css;#topicrows', 3],
                    replaceE: 'css;div[name="pageball"]',
                    scriptT: 2,
                    scrollD: 1000
                },
                function: {
                    aF: nga_thread_aF
                }
            }, //          NGA - 各版块帖子列表
            nga_read: {
                pager: {
                    type: 1,
                    nextL: 'css;#pagebbtm a[title*="下一页"]',
                    pageE: 'id("m_posts_c")/table | id("m_posts_c")/script | //script[contains(text(), "commonui.userInfo.setAll")]',
                    insertP: ['css;#m_posts_c', 3],
                    replaceE: 'css;div[name="pageball"]',
                    scriptT: 2,
                    scrollD: 1000
                }
            }, //            NGA - 帖子内
            v2ex_recent: {
                host: ['v2ex.com', 'www.v2ex.com'],
                functionStart: function() {if (location.pathname === '/') { //                          首页
                    v2ex_aF('#Main a.topic-link:not([target])');
                } else if (location.pathname === '/recent') { //             最近主题页
                    curSite = DBSite.v2ex_recent;
                    v2ex_aF('#Main a.topic-link:not([target])');
                } else if (location.pathname === '/notifications') { //      提醒消息页
                    curSite = DBSite.v2ex_notifications;
                    v2ex_aF('#Main a[href^="/t/"]:not([target])');
                } else if (location.pathname === '/balance') { //            账户余额页
                    curSite = DBSite.v2ex_balance;
                } else if (location.pathname.indexOf('/go/') > -1) { //      分类主题页
                    curSite = DBSite.v2ex_go;
                    v2ex_aF('#Main a.topic-link:not([target])');
                } else if (location.pathname.indexOf('/replies') > -1) { //  用户回复页
                    curSite = DBSite.v2ex_replies;
                    v2ex_aF('#Main a[href^="/t/"]:not([target])');
                }},
                pager: {
                    type: 1,
                    nextL: '//a[@class="page_current"]/following-sibling::a[1]',
                    pageE: 'css;.cell.item',
                    insertP: ['//div[@id="Main"]//div[@class="box"]//div[@class="cell"][last()]', 1],
                    replaceE: 'css;#Main > .box > .cell[style]:not(.item) > table',
                    scrollD: 1500
                },
                function: {
                    aF: v2ex_aF,
                    pF: '#Main a.topic-link:not([target])'
                }
            }, //         V2EX - 最近主题页
            v2ex_notifications: {
                pager: {
                    type: 1,
                    nextL: '//a[@class="page_current"]/following-sibling::a[1]',
                    pageE: 'css;#notifications > div',
                    insertP: ['css;#notifications', 3],
                    replaceE: 'css;#Main > .box > .cell[style] > table',
                    scrollD: 1500
                },
                function: {
                    aF: v2ex_aF,
                    pF: '#Main a[href^="/t/"]:not([target])'
                }
            }, //  V2EX - 提醒消息页
            v2ex_replies: {
                pager: {
                    type: 1,
                    nextL: '//a[@class="page_current"]/following-sibling::a[1]',
                    pageE: '//div[@id="Main"]//div[@class="box"]//div[@class="dock_area"] | //*[@id="Main"]//div[@class="box"]//div[@class="inner"] | //*[@id="Main"]//div[@class="box"]//div[@class="dock_area"][last()]/following-sibling::div[@class="cell"][1]',
                    insertP: ['//div[@id="Main"]//div[@class="box"]//div[@class="cell"][last()]', 1],
                    replaceE: 'css;#Main > .box > .cell[style] > table',
                    scrollD: 1500
                },
                function: {
                    aF: v2ex_aF,
                    pF: '#Main a[href^="/t/"]:not([target])'
                }
            }, //        V2EX - 用户回复页
            v2ex_go: {
                pager: {
                    type: 1,
                    nextL: '//a[@class="page_current"]/following-sibling::a[1]',
                    pageE: 'css;#TopicsNode > div',
                    insertP: ['css;#TopicsNode', 3],
                    replaceE: 'css;#Main > .box > .cell[style] > table',
                    scrollD: 1500
                },
                function: {
                    aF: v2ex_aF,
                    pF: '#Main a.topic-link:not([target])'
                }
            }, //             V2EX - 分类主题页
            v2ex_balance: {
                pager: {
                    type: 1,
                    nextL: '//a[@class="page_current"]/following-sibling::a[1]',
                    pageE: 'css;#Main .box > div:not(.cell) > table > tbody > tr:not(:first-child)',
                    insertP: ['css;#Main .box > div:not(.cell) > table > tbody', 3],
                    replaceE: 'css;#Main > .box > .cell[style] > table',
                    scrollD: 1000
                }
            }, //        V2EX - 账户余额页
            jandan: {
                host: 'jandan.net',
                functionStart: function() {if (location.pathname === '/' || location.pathname.indexOf('/page/') > -1) {
                    curSite = DBSite.jandan;
                } else if (location.pathname === '/dzh') {
                    curSite = DBSite.jandan_dzh;
                } else {
                    curSite = DBSite.jandan_comment;
                }},
                pager: {
                    type: 1,
                    nextL: '//div[@class="wp-pagenavi"]/a[contains(text(), "下一页") or contains(text(), "更多文章")]',
                    pageE: 'css;#content > .list-post',
                    insertP: ['css;.wp-pagenavi', 1],
                    replaceE: 'css;.wp-pagenavi, #nav_prev',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //              煎蛋网
            jandan_comment: {
                pager: {
                    type: 1,
                    nextL: 'css;a.previous-comment-page',
                    pageE: 'css;ol.commentlist > li[id^="comment-"], script[src^="//cdn.jandan.net/static/min/"]',
                    insertP: ['css;ol.commentlist', 3],
                    replaceE: 'css;.cp-pagenavi, #nav_prev',
                    scriptT: 3,
                    scrollD: 1500
                }
            }, //      煎蛋网
            jandan_dzh: {
                pager: {
                    type: 2,
                    nextL: '.show_more',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //          煎蛋网 - 大杂烩
            qiushibaike: {
                host: 'www.qiushibaike.com',
                functionStart: function() {insStyle('.qrcode-wrap, .qrcode-wrap-img, .index-side-left-AD1 {display: none !important;}');
                if (location.pathname === '/') {
                    curSite = DBSite.qiushibaike;
                } else if (location.pathname.indexOf('/article/') === -1) {
                    curSite = DBSite.qiushibaike_;
                }},
                pager: {
                    type: 1,
                    nextL: '//ul[@class="pagination"]//a[./span[@class="next"]]',
                    pageE: 'css;.recommend-article > ul > li',
                    insertP: ['css;.recommend-article > ul', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //         糗事百科
            qiushibaike_: {
                pager: {
                    type: 1,
                    nextL: '//ul[@class="pagination"]//a[./span[@class="next"]]',
                    pageE: 'css;[id^="qiushi_tag_"]',
                    insertP: ['css;ul.pagination', 1],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //        糗事百科 - 分类页
            lkong: {
                host: 'www.lkong.com',
                functionStart: function() {if (location.pathname.indexOf('/forum/') > -1) {
                    curSite = DBSite.lkong;
                } else if (location.pathname.indexOf('/thread/') > -1) {
                    curSite = DBSite.lkong_thread;
                }},
                pager: {
                    type: 1,
                    nextL: lkong_nextL,
                    pageE: '//div[@class="main-title"]/parent::div/parent::div | //head/style[@data-emotion-css]',
                    insertP: ['//div[@class="main-title"][1]/parent::div/parent::div/parent::div', 3],
                    replaceE: 'css;ul.ant-pagination',
                    interval: 500,
                    scrollD: 1200
                }
            }, //               龙的天空 - 各版块帖子列表
            lkong_thread: {
                pager: {
                    type: 1,
                    nextL: lkong_nextL,
                    pageE: '//div[@class="main-content"]/parent::div | //head/style[@data-emotion-css]',
                    insertP: ['//div[@class="main-content"][1]/parent::div/parent::div', 3],
                    replaceE: 'css;ul.ant-pagination',
                    interval: 500,
                    scrollD: 1200
                }
            }, //        龙的天空 - 帖子内
            pediy_forum: {
                host: 'bbs.pediy.com',
                functionStart: function() {if (location.pathname.indexOf('/forum-') > -1) {
                    curSite = DBSite.pediy_forum;
                } else if (location.pathname.indexOf('/thread-') > -1) {
                    if (GM_getValue('menu_discuz_thread_page')) {curSite = DBSite.pediy_thread;}
                }},
                pager: {
                    type: 1,
                    nextL: '//ul[contains(@class, "pagination")]//a[contains(text(), "▶")]',
                    pageE: 'css;table.threadlist > tbody > tr',
                    insertP: ['css;table.threadlist > tbody', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //         看雪论坛 - 各版块帖子列表
            pediy_thread: {
                pager: {
                    type: 1,
                    nextL: '//ul[contains(@class, "pagination")]//a[contains(text(), "▶")]',
                    pageE: 'css;table.postlist > tbody > tr[data-pid]',
                    insertP: ['css;table.postlist > tbody > tr:not([data-pid])', 1],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //        看雪论坛 - 帖子内
            kdslife: {
                host: 'club.kdslife.com',
                functionStart: function() {
                    if (location.pathname.indexOf('/f_') > -1) {
                        curSite = DBSite.kdslife;
                    } else if (location.pathname.indexOf('/t_') > -1) {
                        curSite = DBSite.kdslife_t;
                    }},
                pager: {
                    type: 1,
                    nextL: '//div[@class="fr i3_r"]/a[contains(text(), "后一页")]',
                    pageE: 'css;ul.main_List > li.i2:not(.h_bg)',
                    insertP: ['css;ul.main_List > li.i3', 1],
                    replaceE: 'css;ul.main_List > li.i3',
                    scrollD: 1000
                }
            }, //             宽带山论坛
            kdslife_t: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pages"]/a[contains(text(), ">>")]',
                    pageE: 'css;#reply_list_panel > *, script[src*="ui/js/kds.js"]',
                    insertP: ['css;#reply_list_panel', 3],
                    replaceE: 'css;.pages',
                    scriptT: 3,
                    scrollD: 1000
                }
            }, //           宽带山论坛 - 帖子内
            libaclub: {
                host: 'www.libaclub.com',
                functionStart: function() {
                    if (location.pathname === '/' || location.pathname.indexOf('/date_') > -1) {
                        curSite = DBSite.libaclub;
                    } else if (location.pathname.indexOf('/f_') > -1) {
                        curSite = DBSite.libaclub_f;
                    } else if (location.pathname.indexOf('/t_') > -1 || location.pathname.indexOf('/reply_') > -1) {
                        curSite = DBSite.libaclub_t;
                    } else if (location.pathname.indexOf('/prt_') > -1) {
                        curSite = DBSite.libaclub_prt;
                    } else if (location.pathname === '/facade.php') {
                        curSite = DBSite.libaclub_search;
                    }},
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: '//div[@class="ui-crumbs-more"]/a[@class="fn-link"][1]',
                    pageE: 'css;ul.ui-list > li:not(.ui-list-item-head):not(.ui-list-merchant-ad)',
                    insertP: ['css;ul.ui-list', 3],
                    replaceE: 'css;div.ui-crumbs-more',
                    scrollD: 1200
                }
            }, //            篱笆网论坛
            libaclub_f: {
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a.ui-paging-next',
                    pageE: 'css;ul.ui-list > li:not(.ui-list-item-head):not(.ui-list-merchant-ad)',
                    insertP: ['css;ul.ui-list', 3],
                    replaceE: 'css;div.ui-paging',
                    scrollD: 1200
                }
            }, //          篱笆网论坛 - 各版块帖子列表
            libaclub_t: {
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a.ui-paging-next',
                    pageE: 'css;.ui-box-content > div.ui-topic, .ui-box-content > a[name]',
                    insertP: ['css;.ui-box-content', 3],
                    replaceE: 'css;div.ui-paging',
                    scrollD: 1500
                }
            }, //          篱笆网论坛 - 帖子内
            libaclub_prt: {
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a.ui-paging-next',
                    pageE: 'css;ul.ui-list > li',
                    insertP: ['css;ul.ui-list', 3],
                    replaceE: 'css;div.ui-paging',
                    scrollD: 2000
                }
            }, //        篱笆网论坛 - 帖子内 - 打印版
            libaclub_search: {
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: '//div[@class="ui-page"]/a[contains(text(), "下一页")]',
                    pageE: 'css;.ui-box-main > ul.ui-list > li',
                    insertP: ['css;.ui-box-main > ul.ui-list', 3],
                    replaceE: 'css;div.ui-page',
                    scrollD: 1200
                }
            }, //     篱笆网论坛 - 搜索页
            lowendtalk: {
                host: 'lowendtalk.com',
                pager: {
                    type: 1,
                    nextL: 'css;a.Next',
                    pageE: 'css;ul.DataList > li',
                    insertP: ['css;ul.DataList', 3],
                    replaceE: 'css;.Pager',
                    scrollD: 1500
                }
            }, //          LowEndTalk
            lieyou: {
                host: 'bbs.lieyou888.com',
                functionStart: function() {if (location.pathname.indexOf('/forum') > -1) {curSite = DBSite.lieyou;}},
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "_pageNav")]/a[contains(text(), "下一页")]',
                    pageE: 'css;ul.gb-bbs-list > li',
                    insertP: ['css;ul.gb-bbs-list', 3],
                    replaceE: 'css;._pageNav',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[original]', 'original']
                }
            }, //              芥子空间论坛
            xcar_forumdisplay: {
                host: 'www.xcar.com.cn',
                functionStart: function() {if (location.pathname === '/bbs/forumdisplay.php') {curSite = DBSite.xcar_forumdisplay}},
                pager: {
                    type: 1,
                    nextL: 'css;a.page_down',
                    pageE: 'css;.table-section > dl:not(.table_head)',
                    insertP: ['css;.table-section', 3],
                    replaceE: 'css;.forumList_page',
                    scrollD: 2000
                }
            }, //   爱卡汽车网论坛 - 各版块帖子列表
            flyert_forumdisplay: {
                host: 'www.flyert.com',
                functionStart: function() {if (location.pathname.indexOf('/forum-') > -1 || location.search.indexOf('mod=forumdisplay') > -1) {
                    curSite = DBSite.flyert_forumdisplay;
                } else if (location.pathname.indexOf('/forum') > -1 || location.search.indexOf('mod=viewthread') > -1) {
                    if (GM_getValue('menu_discuz_thread_page')) {curSite = DBSite.flyert_viewthread;}
                }},
                pager: {
                    type: 1,
                    nextL: 'css;a.nxt:not([href*="javascript"])',
                    pageE: 'css;#threadlist table > tbody[id^="normalthread_"]',
                    insertP: ['id("threadlist")//table/tbody[starts-with(@id, "normalthread_")]/parent::table', 3],
                    replaceE: 'css;.pg',
                    scrollD: 2500
                }
            }, // 飞客网论坛 - 各版块帖子列表
            flyert_viewthread: {
                pager: {
                    type: 1,
                    nextL: 'css;a.nxt:not([href*="javascript"])',
                    pageE: 'css;#postlist > .comiis_viewbox',
                    insertP: ['css;#postlist', 3],
                    replaceE: 'css;.comiis_pgs > .pg',
                    scrollD: 3000
                }
            }, //   飞客网论坛 - 帖子内
            adnmb3: {
                host: 'adnmb3.com',
                functionStart: function() {
                    if (location.pathname.indexOf('/m/f/') > -1) {
                        curSite = DBSite.adnmb3_mf;
                    } else if (location.pathname.indexOf('/m/t/') > -1) {
                        curSite = DBSite.adnmb3_mt;
                    } else if (location.pathname.indexOf('/f/') > -1 || location.pathname.indexOf('/Forum/') > -1) {
                        curSite = DBSite.adnmb3;
                    } else if (location.pathname.indexOf('/t/') > -1) {
                        curSite = DBSite.adnmb3_t;
                    }},
                pager: {
                    type: 1,
                    nextL: '//ul[contains(@class, "pagination")]//a[contains(text(), "下一页")]',
                    pageE: 'css;.h-threads-list > *, script[src$="/h.desktop.js"]',
                    insertP: ['css;.h-threads-list', 3],
                    replaceE: '//ul[contains(@class, "pagination")]',
                    scriptT: 3,
                    scrollD: 1500
                }
            }, //              A 岛
            adnmb3_t: {
                pager: {
                    type: 1,
                    nextL: '//ul[contains(@class, "pagination")]//a[contains(text(), "下一页")]',
                    pageE: 'css;.h-threads-list > .h-threads-item > .h-threads-item-replys, script[src$="/h.desktop.js"]',
                    insertP: ['css;.h-threads-list > .h-threads-item', 3],
                    replaceE: '//ul[contains(@class, "pagination")]',
                    scriptT: 3,
                    scrollD: 1500
                }
            }, //            A 岛 - 帖子内
            adnmb3_mf: {
                pager: {
                    type: 1,
                    nextL: '//li[contains(@class, "pagination-next")]//a[contains(text(), "下一页")]',
                    pageE: 'css;.h-middle > div[id^="threads_"], .h-middle > hr.h-middle > div[id^="threads_"], .h-middle > hr:nth-of-type(n+2), script[src$="/h.mobile.js"]',
                    insertP: ['css;#h-threads-pagination', 1],
                    replaceE: 'css;#h-threads-pagination',
                    scriptT: 3,
                    scrollD: 1500
                }
            }, //           A 岛 - 帖子列表（手机版）
            adnmb3_mt: {
                pager: {
                    type: 1,
                    nextL: '//li[contains(@class, "pagination-next")]//a[contains(text(), "下一页")]',
                    pageE: 'css;.h-threads-replylist > div, script[src$="/h.mobile.js"]',
                    insertP: ['css;.h-threads-replylist', 3],
                    replaceE: 'css;#h-threads-pagination',
                    scriptT: 3,
                    scrollD: 1500
                }
            }, //           A 岛 - 帖子内（手机版）
            guokr: {
                host: 'www.guokr.com',
                pager: {
                    type: 2,
                    nextL: 'div[class*="LoadMoreWrap"]',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //                   果壳网
            expreview: {
                host: 'www.expreview.com',
                pager: {
                    type: 2,
                    nextL: '#show_article_red_1SHOW',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //               超能网
            landian: {
                host: 'www.landian.vip',
                pager: {
                    type: 2,
                    nextL: '.load-more > button',
                    nextText: '加载更多',
                    scrollD: 1300
                }
            }, //                 蓝点网
            ithome: {
                host: 'www.ithome.com',
                pager: {
                    type: 2,
                    nextL: 'a.more',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //                  IT 之家
            _58pic: {
                host: 'www.58pic.com',
                functionStart: function() {insStyle('.qt-model-t, .qtw-card.place-box.is-one, .search-v3-row .search-v3-back {display: none !important;}'); // 隐藏登录弹窗
                if (location.pathname.indexOf('/tupian/') > -1) {
                    curSite = DBSite._58pic;
                } else if (location.pathname.indexOf('/c/') > -1) {
                    curSite = DBSite._58pic_c;
                }},
                insStyle: '.qtw-card.place-box.is-two {display: none !important;}', // 隐藏登录弹窗、隐藏末尾很大的 [下一页] 按钮
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class,"page-box")]//a[text()="下一页"]',
                    pageE: 'css;.pic-box > .qtw-card',
                    insertP: ['css;.pic-box', 3],
                    replaceE: 'css;.page-box',
                    scrollD: 2500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //              千图网 - 分类/搜索页
            _58pic_c: {
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class,"page-box")]//a[text()="下一页"]',
                    pageE: 'css;.list-box > .qtw-card',
                    insertP: ['css;.list-box', 3],
                    replaceE: 'css;.page-box',
                    scrollD: 4000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //            千图网 - 专题/收藏夹
            pixabay: {
                host: 'pixabay.com',
                pager: {
                    type: 1,
                    nextL: '//a[text()="›"]',
                    pageE: 'css;[class^="results"]  > [class^="container"] > div',
                    insertP: ['css;[class^="results"]  > [class^="container"]', 3],
                    replaceE: '//a[text()="›"]',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-lazy-src]', 'data-lazy-src']
                }
            }, //             Pixabay
            logosc: {
                host: 'www.logosc.cn',
                functionStart: function() {if (location.pathname.indexOf('/so/') > -1) {curSite = DBSite.logosc;}},
                pager: {
                    type: 2,
                    nextL: 'button.so-pablo-button',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //              搜图神器 (免费无版权)
            puxiang: {
                host: 'www.puxiang.com',
                functionStart: function() {if (location.pathname === '/search/favorite') {
                    curSite = DBSite.puxiang_collect;
                } else if (location.pathname === '/search/puxiang' || location.pathname === '/list' || location.pathname === '/galleries' || location.pathname === '/articles') {
                    curSite = DBSite.puxiang;
                } else if (location.pathname === '/') {
                    curSite = DBSite.puxiang; curSite.pager.scrollD = 4000;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;li.next > a',
                    pageE: 'css;.work-list > div',
                    insertP: ['css;.work-list', 3],
                    replaceE: 'css;.pagerbar',
                    scrollD: 1500
                }
            }, //             普象网 - 作品集/搜索页
            puxiang_collect: {
                pager: {
                    type: 1,
                    nextL: 'css;li.next > a',
                    pageE: 'css;.collect-list > div',
                    insertP: ['css;.collect-list', 3],
                    replaceE: 'css;.pagerbar',
                    scrollD: 1500
                }
            }, //     普象网 - 收藏夹
            om: {
                host: 'www.om.cn',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.om;}},
                pager: {
                    type: 1,
                    nextL: 'css;li.next > a',
                    pageE: 'css;.main_content > ul > li',
                    insertP: ['css;.main_content > ul', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //                  欧模网
            xiadele: {
                host: ['www.xiadele.com', 'search.xiadele.com'],
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.xiadele;}},
                insStyle: '.last-li-carousel-img {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: 'css;li.next_page a[rel="next"]',
                    pageE: 'css;ul.list-page-ul > li',
                    insertP: ['css;ul.list-page-ul', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 2000
                }
            }, //             下得乐
            _3dmgame: {
                host: 'www.3dmgame.com',
                pager: {
                    type: 3,
                    nextL: 'css;li.next > a',
                    pageE: 'css;.news_warp_center > *',
                    insertP: ['css;.news_warp_center', 3],
                    replaceE: 'css;.pagewrap',
                    scrollElement: '.pagewrap',
                    scrollD: 400
                }
            }, //                3DM
            _3dmgame_mod: {
                host: 'mod.3dmgame.com',
                pager: {
                    type: 1,
                    nextL: _3dmgame_mod_nextL,
                    pageE: '//div[contains(@class, "game-mod-list") or contains(@class, "search-mod-list")] | //script[not(@src or @type)][contains(text(), ".game-mod-page") or contains(text(), ".search-mod-page")]',
                    insertP: ['//div[contains(@class, "game-mod-wrap") or contains(@class, "search-mod ")]', 3],
                    scriptT: 2,
                    history: true,
                    scrollD: 1200
                }
            }, //            3DM MOD站
            ali213_www: {
                host: 'www.ali213.net',
                pager: {
                    type: 3,
                    nextL: 'css;#after_this_page',
                    pageE: 'css;#Content >*:not(.news_ding):not(.page_fenye)',
                    insertP: ['css;.page_fenye', 1],
                    replaceE: 'css;.page_fenye',
                    scrollElement: '.page_fenye',
                    scrollD: 400
                }
            }, //              游侠网
            ali213_gl: {
                host: 'gl.ali213.net',
                insStyle: '.n_show_b {display: none !important;}',
                pager: {
                    type: 3,
                    nextL: 'css;a.next',
                    pageE: 'css;.c-detail >*',
                    insertP: ['css;.c-detail', 3],
                    replaceE: 'css;.page_fenye',
                    scrollElement: '.page_fenye',
                    scrollD: 400
                }
            }, //               游侠网 - 攻略
            ali213_pic: {
                host: 'pic.ali213.net',
                insStyle: 'a.prev, a.next {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;#image-show > img',
                    insertP: ['css;#image-show', 3],
                    replaceE: 'css;#image-show > a',
                    scrollD: 1200
                }
            }, //              游侠网 - 图库
            gamersky_ent: {
                host: 'www.gamersky.com',
                functionStart: function() {if (location.pathname.indexOf('/ent/') > -1) {curSite = DBSite.gamersky_ent;} else {curSite = DBSite.gamersky_gl;}},
                pager: {
                    type: 3,
                    nextL: '//div[@class="page_css"]/a[text()="下一页"]',
                    pageE: 'css;.Mid2L_con > *:not(.gs_nc_editor):not(.pagecss):not(.page_css):not(.gs_ccs_solve):not(.post_ding)',
                    insertP: ['css;.page_css', 1],
                    replaceE: 'css;.page_css',
                    scrollElement: '.page_css',
                    scrollD: 100
                }
            }, //            游民星空
            gamersky_gl: {
                pager: {
                    type: 3,
                    nextL: '//div[@class="page_css"]/a[text()="下一页"]',
                    forceHTTPS: true,
                    pageE: 'css;.Mid2L_con > *:not(.gs_nc_editor):not(.pagecss):not(.gs_ccs_solve):not(.post_ding)',
                    insertP: ['css;.gs_nc_editor', 1],
                    replaceE: 'css;.page_css',
                    scrollElement: '.pagecss',
                    scrollD: -1000
                },
                function: {
                    bF: gamersky_gl_bF
                }
            }, //             游民星空 - 攻略
            nexusmods: {
                host: 'www.nexusmods.com',
                pager: {
                    type: 4,
                    nextL: nexusmods_nextL,
                    pageE: 'css;ul.tiles > li',
                    insertP: ['css;ul.tiles', 3],
                    insertE: nexusmods_insertE,
                    replaceE: 'css;.pagination',
                    scrollD: 3000
                }
            }, //               NexusMods
            steamcommunity: {
                host: 'steamcommunity.com',
                pager: {
                    type: 1,
                    nextL: '//a[@class="pagebtn"][last()]',
                    pageE: 'css;.workshopBrowseItems > *',
                    insertP: ['css;.workshopBrowseItems', 3],
                    replaceE: 'css;.workshopBrowsePaging',
                    scriptT: 2,
                    scrollD: 1500
                }
            }, //          创意工坊 - 项目列表
            yikm: {
                host: 'www.yikm.net',
                pager: {
                    type: 1,
                    nextL: '//ul[@class="pager"]//a[text()="下一页"]',
                    pageE: '//h2[contains(text(), "所有游戏") or contains(text(), "搜索结果")]/following-sibling::div[1]/div',
                    insertP: ['//h2[contains(text(), "所有游戏") or contains(text(), "搜索结果")]/following-sibling::div[1]', 3],
                    replaceE: 'css;ul.pager',
                    scrollD: 1500
                }
            }, //                    小霸王其乐无穷
            cs_rin_ru: {
                host: 'cs.rin.ru',
                functionStart: function() {if (location.pathname === '/forum/viewforum.php') { // 版块帖子列表
                    curSite = DBSite.cs_rin_ru;
                } else if (location.pathname === '/forum/viewtopic.php') { // 帖子内
                    if (GM_getValue('menu_discuz_thread_page')) curSite = DBSite.cs_rin_ru_list;
                } else if (location.pathname === '/forum/search.php') { // 搜索结果
                    curSite = DBSite.cs_rin_ru_search;
                }},
                pager: {
                    type: 1,
                    nextL: '//td[@class="gensmall"][@align="right"]//a[text()="Next"]',
                    pageE: 'css;#pagecontent > table.tablebg > tbody > tr:not([align])',
                    insertP: ['css;#pagecontent > table.tablebg > tbody > tr[align]', 1],
                    replaceE: 'css;#pagecontent > table:first-child',
                    scrollD: 1500
                },
                function: {
                    bF: cs_rin_ru_bF
                }
            }, //               cs.rin.ru - 各版块帖子列表
            cs_rin_ru_list: {
                pager: {
                    type: 1,
                    nextL: 'id("pageheader")/p[@class="gensmall"]//a[text()="Next"]',
                    pageE: 'css;#pagecontent > table.tablebg:not(:nth-last-child(2)):not(:nth-child(2))',
                    insertP: ['css;#pagecontent > table.tablebg:nth-last-child(2)', 1],
                    replaceE: 'css;#pagecontent >table:not(.tablebg), #pageheader p.gensmall',
                    scrollD: 2000
                }
            }, //          cs.rin.ru - 帖子内
            cs_rin_ru_search: {
                pager: {
                    type: 1,
                    nextL: 'id("wrapcentre")/div[@class="nav"]//a[text()="Next"]',
                    pageE: 'css;#wrapcentre > form > table.tablebg > tbody > tr[valign]',
                    insertP: ['css;#wrapcentre > form > table.tablebg > tbody > tr:last-child', 1],
                    replaceE: 'css;#wrapcentre > div',
                    scrollD: 1500
                }
            }, //        cs.rin.ru - 搜索页
            crackhub: {
                host: 'crackhub.site',
                insStyle: 'html.wp-dark-mode-active .inside-article {background-color: var(--wp-dark-mode-bg);}',
                pager: {
                    type: 1,
                    nextL: 'css;a.next.page-numbers',
                    pageE: 'css;article[id^="post-"]',
                    insertP: ['css;nav.paging-navigation', 1],
                    replaceE: 'css;nav.paging-navigation',
                    scrollD: 2000
                }
            }, //                Crackhub213
            fitgirl: {
                host: 'fitgirl-repacks.site',
                pager: {
                    type: 1,
                    nextL: 'css;a.next.page-numbers',
                    pageE: 'css;article[id^="post-"]',
                    insertP: ['css;nav.paging-navigation', 1],
                    replaceE: 'css;nav.paging-navigation',
                    scrollD: 2500
                }
            }, //                 FitGirl Repacks
            bilibili_search: {
                host: 'search.bilibili.com',
                functionStart: function() {locationChange = true; curSite = DBSite.bilibili_search;},
                pager: {
                    type: 1,
                    nextL: bilibili_search_nextL,
                    pageE: '//ul[contains(@class, "video-list")]/li | //script[contains(text(), "window.__INITIAL_STATE__")]',
                    insertP: ['css;ul.video-list', 3],
                    replaceE: 'css;ul.pages',
                    scriptT: 2,
                    history: function() {
                        if (/page=\d+/.test(location.search)) return false;
                        return true;
                    },
                    scrollD: 800
                },
                function: {
                    aF: bilibili_search_aF
                }
            }, //         B 站(Bilibili) - 搜索页
            pianku: {
                host: /pianku/,
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.pianku;}},
                pager: {
                    type: 1,
                    nextL: 'css;a.a1',
                    pageE: 'css;.content-list > li',
                    insertP: ['css;.content-list', 3],
                    replaceE: 'css;.pages',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-src]', 'data-src']
                }
            }, //          片库
            cupfox: {
                host: 'www.cupfox.com',
                pager: {
                    type: 2,
                    nextL: '.load-more',
                    nextText: '点击加载更多',
                    scrollD: 700
                }
            }, //          茶杯狐
            novipnoad: {
                host: 'www.novipnoad.com',
                functionStart: function() {if (location.pathname != '/' && location.pathname.indexOf('.html') === -1) {curSite = DBSite.novipnoad;}},
                pager: {
                    type: 1,
                    nextL: 'css;a.nextpostslink',
                    pageE: 'css;.video-listing-content .row > div',
                    insertP: ['css;.video-listing-content .row', 3],
                    replaceE: 'css;.wp-pagenavi',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //       NO视频
            ddrk: {
                host: ['ddrk.me', 'ddys.tv'],
                functionStart: function() {if (location.pathname === '/' || location.pathname.indexOf('/category/') > -1 || location.pathname.indexOf('/tag/') > -1) {curSite = DBSite.ddrk;}},
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;.post-box-list > article',
                    insertP: ['css;.post-box-list', 3],
                    replaceE: 'css;.pagination_wrap',
                    scrollD: 1500
                }
            }, //            低端影视
            nfmovies: {
                host: 'www.nfmovies.com',
                functionStart: function() {if (location.pathname === '/search.php' || location.pathname.indexOf('/list/') > -1) {curSite = DBSite.nfmovies;}},
                pager: {
                    type: 1,
                    nextL: '//ul[contains(@class, "myui-page")]/li/a[contains(text(), "下一页")]',
                    pageE: 'css;ul.myui-vodlist > li',
                    insertP: ['css;ul.myui-vodlist', 3],
                    replaceE: 'css;ul.myui-page',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [1, 'a[data-original]', 'data-original']
                }
            }, //        奈菲影视
            zxzj: {
                host: 'www.zxzj.me',
                functionStart: function() {if (location.pathname != '/' && location.pathname.indexOf('/detail/') === -1) {curSite = DBSite.zxzj;}},
                insStyle: 'div.stui-page__all {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: '//ul[contains(@class, "stui-page__item")]//a[contains(text(), "下一页")]',
                    pageE: 'css;ul.stui-vodlist > li',
                    insertP: ['css;ul.stui-vodlist', 3],
                    replaceE: 'css;ul.stui-page__item',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [1, 'a[data-original]', 'data-original']
                }
            }, //            在线之家
            enlienli: {
                host: 'enlienli.com',
                functionStart: function() {if (location.pathname.indexOf('/show/') > -1 || location.pathname.indexOf('/search') > -1) {curSite = DBSite.enlienli;}},
                pager: {
                    type: 1,
                    nextL: 'css;a.page-number.page-next',
                    pageE: 'css;.module-items > *',
                    insertP: ['css;.module-items', 3],
                    replaceE: 'css;#page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-src]', 'data-src']
                }
            }, //        嗯哩嗯哩
            _91mjw: {
                host: '91mjw.com',
                functionStart: function() {if (location.pathname.indexOf('/video/') === -1 || location.pathname.indexOf('/vplay/') === -1) {curSite = DBSite._91mjw;}},
                pager: {
                    type: 1,
                    nextL: 'css;.next-page > a',
                    pageE: 'css;.m-movies > article',
                    insertP: ['css;.pagination', 1],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //          91 美剧网
            zhenbuka: {
                host: ['www.zhenbuka3.com', 'www.zhenbuka5.com'],
                functionStart: function() {if (location.pathname.indexOf('/vodtype/') > -1) {curSite = DBSite.zhenbuka;}},
                pager: {
                    type: 1,
                    nextL: '//ul[contains(@class, "stui-page")]/li/a[contains(text(), "下一页")]',
                    pageE: 'css;ul.stui-vodlist > li',
                    insertP: ['css;ul.stui-vodlist', 3],
                    replaceE: 'css;ul.stui-page',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [1, 'a[data-original]', 'data-original']
                }
            }, //        真不卡影院
            zzzfun: {
                host: 'www.zzzfun.com',
                functionStart: function() {
                    if (location.pathname.indexOf('/vod_type') > -1 || location.pathname.indexOf('/vod_show') > -1) {
                        curSite = DBSite.zzzfun;
                    } else if (location.pathname.indexOf('/vod_search') > -1) {
                        curSite = DBSite.zzzfun_search;
                    }},
                pager: {
                    type: 1,
                    nextL: 'css;#page a[title="下一页"]',
                    pageE: 'css;ul.search-result > a',
                    insertP: ['css;ul.search-result', 3],
                    replaceE: 'css;#page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //        ZzzFun 动漫
            zzzfun_search: {
                pager: {
                    type: 1,
                    nextL: 'css;#page a[title="下一页"]',
                    pageE: 'css;ul.show-list > li',
                    insertP: ['css;ul.show-list', 3],
                    replaceE: 'css;#page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, // ZzzFun 动漫 - 搜索页
            tucao: {
                host: 'www.tucao.one',
                functionStart: function() {if (location.pathname.indexOf('/list/') > -1) {
                    curSite = DBSite.tucao;
                } else if (location.search.indexOf('search') > -1) {
                    curSite = DBSite.tucao_search;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;.pagego a',
                    pageE: 'css;.list > ul > li',
                    insertP: ['css;.list > ul', 3],
                    replaceE: 'css;.newpages, .pagego, #float_show',
                    scrollD: 1000
                }
            }, //         吐槽弹幕网
            tucao_search: {
                pager: {
                    type: 1,
                    nextL: '//a[@class="a1"][contains(text(), "下一页")]',
                    pageE: 'css;.search_list > *',
                    insertP: ['css;.search_list', 3],
                    replaceE: 'css;.pages',
                    scrollD: 1000
                }
            }, //  吐槽弹幕网 - 搜索页
            mandao: {
                host: 'www.mandao.tv',
                functionStart: function() {if (location.pathname != '/' && location.pathname.indexOf('/man') === -1) {
                    curSite = DBSite.mandao;
                }},
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "page")]/a[contains(text(), ">")]',
                    pageE: 'css;.index-tj > ul > li',
                    insertP: ['css;.index-tj > ul', 3],
                    replaceE: 'css;.page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //        漫岛动漫
            yxdm: {
                host: 'www.yxdm.li',
                functionStart: function() {if (location.pathname.indexOf('/search') > -1 || location.pathname.indexOf('/category') > -1) {curSite = DBSite.yxdm;}},
                pager: {
                    type: 1,
                    nextL: '//a[@class="nextPage" or contains(text(), "下一页")]',
                    pageE: 'css;.dhnew > ul > li',
                    insertP: ['css;.dhnew > ul', 3],
                    replaceE: 'css;.pagelist',
                    scrollD: 2000
                }
            }, //          怡萱动漫
            nicotv: {
                host: 'www.nicotv.me',
                functionStart: function() {if (location.pathname.indexOf('/search') > -1 || location.pathname.indexOf('/type') > -1) {curSite = DBSite.nicotv;}},
                pager: {
                    type: 1,
                    nextL: '//ul[contains(@class, "pagination ")]//a[contains(text(), "»")]',
                    pageE: 'css;ul.list-unstyled > li',
                    insertP: ['css;ul.list-unstyled', 3],
                    replaceE: 'css;ul.pagination ',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //        妮可动漫
            yhdm: {
                host: 'www.imomoe.la',
                functionStart: function() {if (location.pathname.indexOf('/list/') > -1) {
                    curSite = DBSite.yhdm;
                } else if (location.pathname === '/so.asp' || location.pathname === '/search.asp') {
                    curSite = DBSite.yhdm_;
                }},
                pager: {
                    type: 1,
                    nextL: '//div[@class="pages"]/a[contains(text(), "下一页")]',
                    pageE: 'css;#contrainer > .img> ul > li',
                    insertP: ['css;#contrainer > .img> ul', 3],
                    replaceE: 'css;.pages',
                    scrollD: 1000
                }
            }, //          樱花动漫
            yhdm_: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pages"]/a[contains(text(), "下一页")]',
                    pageE: 'css;#contrainer .fire .pics > ul > li',
                    insertP: ['css;#contrainer .fire .pics > ul', 3],
                    replaceE: 'css;.pages',
                    scrollD: 1000
                }
            }, //         樱花动漫 - 搜索页等
            agefans: {
                host: 'www.agefans.cc',
                functionStart: function() {if (location.pathname.indexOf('/catalog/') > -1 || location.pathname === '/search') {
                    curSite = DBSite.agefans;
                } else if (location.pathname === '/recommend' || location.pathname === '/update') {
                    curSite = DBSite.agefans_;
                } else if (location.pathname === '/rank') {
                    curSite = DBSite.agefans_rank;
                }},
                pager: {
                    type: 1,
                    nextL: 'id("container")//div[@class="blockcontent"]/div[@style][not(@class)]/li/a[contains(text(), "下一页")]',
                    pageE: 'css;#container .blockcontent1 > div',
                    insertP: ['css;#container .blockcontent1', 3],
                    replaceE: 'css;#container .blockcontent > div[style]:not([class])',
                    scrollD: 1000
                }
            }, //       AGE 动漫 - 全部/搜索
            agefans_: {
                pager: {
                    type: 1,
                    nextL: 'id("container")//div[@class="blockcontent"]/div[@style][not(@class)]/li/a[contains(text(), "下一页")]',
                    pageE: 'css;#container .blockcontent > ul > li',
                    insertP: ['css;#container .blockcontent > ul', 3],
                    replaceE: 'css;#container .blockcontent > div[style]:not([class])',
                    scrollD: 1000
                }
            }, //      AGE 动漫 - 其他页
            agefans_rank: {
                pager: {
                    type: 1,
                    nextL: 'id("container")/ul[@style][not(@class)]/li/a[contains(text(), "下一页")]',
                    pageE: 'css;#container > .div_right  .blockcontent.div_right_r_3 > ul',
                    insertP: ['css;#container > .div_right  .blockcontent.div_right_r_3', 3],
                    replaceE: 'css;#container > ul[style]:not([class])',
                    scrollD: 1000
                }
            }, //  AGE 动漫 - 排行榜
            dm233: {
                host: 'www.dm233.cc',
                functionStart: function() {if (location.pathname.indexOf('/catalog/') > -1 || location.pathname === '/recommend/' || location.pathname === '/search') {
                    curSite = DBSite.dm233;
                } else if (location.pathname === '/article/') {
                    curSite = DBSite.dm233_article;
                } else if (location.pathname === '/rank/') {
                    curSite = DBSite.dm233_rank;
                }},
                pager: {
                    type: 1,
                    nextL: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageE: 'css;.dhnew ul > li',
                    insertP: ['css;.dhnew ul', 3],
                    replaceE: 'css;.pagelist',
                    scrollD: 1000
                }
            }, //         233 动漫
            dm233_article: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageE: 'css;.xgyd ul > li',
                    insertP: ['css;.xgyd ul', 3],
                    replaceE: 'css;.pagelist',
                    scrollD: 1000
                }
            }, // 233 动漫 - 动漫情报/资讯
            dm233_rank: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageE: 'css;.side-update.normal-wai > .normal-nei',
                    insertP: ['css;.side-update.normal-wai', 3],
                    replaceE: 'css;.pagelist',
                    scrollD: 1000
                }
            }, //    233 动漫 - 排行榜
            anime1: {
                host: 'anime1.me',
                functionStart: function() {if (location.search.indexOf('s=') > -1) {
                        curSite = DBSite.anime1_search;
                    } else if (location.pathname === '/') {
                        curSite = DBSite.anime1;
                }},
                pager: {
                    type: 4,
                    nextL: anime1_nextL,
                    interval: 500,
                    scrollD: 800
                }
            }, //        Anime1
            anime1_search: {
                pager: {
                    type: 1,
                    nextL: 'css;.nav-previous > a',
                    pageE: 'css;#main > article',
                    insertP: ['css;nav.navigation', 1],
                    replaceE: 'css;nav.navigation',
                    scrollD: 1200
                }
            }, // Anime1 - 搜索页
            yinfans: {
                host: 'www.yinfans.net',
                insStyle: '#post_container {height: auto !important;} #post_container > li {position: static !important; float: left !important; height: 620px !important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;#post_container > li',
                    insertP: ['css;#post_container', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //         音范丝
            btbtt: {
                host: /btbtt/,
                pager: {
                    type: 1,
                    nextL: '//div[@class="page"]/a[contains(text(), "▶") or contains(text(), "下一页")]',
                    pageE: 'css;#threadlist > table, #threadlist > hr',
                    insertP: ['css;#threadlist', 3],
                    replaceE: 'css;.page',
                    scrollD: 2000
                }
            }, //           BT 之家
            bdys: {
                host: 'www.bd2020.com',
                functionStart: function() {if (location.pathname != '/' && !(/\/\d+\.htm/.test(location.pathname))) {curSite = DBSite.bdys;}},
                pager: {
                    type: 2,
                    nextL: 'div.layui-flow-more > a',
                    nextText: '加载更多',
                    scrollD: 1000
                }
            }, //            BD 影视
            gaoqing_fm: {
                host: 'gaoqing.fm',
                pager: {
                    type: 2,
                    nextL: '.col-md-12 > a, #loadmore > a',
                    interval: 1500,
                    scrollD: 1000
                }
            }, //      高清电台
            yyds: {
                host: 'yyds.fans',
                functionStart: function() {
                    if (location.search != '' && location.search.indexOf('p=') === -1) {
                        curSite = DBSite.yyds;
                    }},
                pager: {
                    type: 1,
                    nextL: 'css;a.next.page-numbers',
                    pageE: 'css;.list-grouped > div',
                    insertP: ['css;.list-grouped', 3],
                    replaceE: 'css;nav.pagination',
                    scrollD: 1100
                }
            }, //            YYDS 电影
            kisssub: {
                host: ['www.kisssub.org','www.comicat.org'],
                pager: {
                    type: 1,
                    nextL: 'css;a.nextprev',
                    pageE: 'css;#data_list > tr',
                    insertP: ['css;#data_list', 3],
                    replaceE: 'css;.pages',
                    scrollD: 2500
                }
            }, //       爱恋动漫
            dmhy: {
                host: ['share.dmhy.org', 'dmhy.anoneko.com'],
                pager: {
                    type: 1,
                    nextL: '//div[@class="nav_title"]/a[contains(text(), "下一")]',
                    pageE: 'css;#topic_list > tbody > tr',
                    insertP: ['css;#topic_list > tbody', 3],
                    replaceE: 'css;.nav_title',
                    scrollD: 1500
                },
                function: {
                    aF: function() {document.body.appendChild(document.createElement('script')).textContent = `$('#topic_list > tbody > tr:even:not(.even):not(.odd)').addClass('even'); $('#topic_list > tbody > tr:odd:not(.even):not(.odd)').addClass('odd');`;}
                }
            }, //          动漫花园
            futaacg: {
                host: 'futaacg.com',
                pager: {
                    type: 1,
                    nextL: 'css;ul.pagination a[rel="next"]',
                    pageE: 'css;.topic-list > div',
                    insertP: ['css;.topic-list', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //       扶她动漫
            bangumi: {
                host: 'bangumi.moe',
                pager: {
                    type: 2,
                    nextL: '[torrent-list="lattorrents"] button[ng-click="loadMore()"] ,[torrent-list="torrents"] button[ng-click="loadMore()"]',
                    interval: 1000,
                    scrollD: 1500
                }
            }, //       萌番组
            miobt: {
                host: ['miobt.com', 'www.36dm.club'],
                functionStart: function() {curSite = DBSite.miobt;
                    if (location.host === 'www.36dm.club') {
                        curSite.pager.scrollD = 1000;
                    }},
                pager: {
                    type: 1,
                    nextL: '//a[@class="nextprev"][contains(text(), "〉") or contains(text(), "下一页") or contains(text(), "»")]',
                    pageE: 'css;#data_list > tr',
                    insertP: ['css;#data_list', 3],
                    replaceE: 'css;.pages',
                    scrollD: 2000
                }
            }, //         MioBT + 简单动漫
            nyaa: {
                host: /nyaa\.si/,
                pager: {
                    type: 1,
                    nextL: 'css;a[rel="next"], li.next > a',
                    pageE: 'css;table.torrent-list > tbody > tr',
                    insertP: ['css;table.torrent-list > tbody', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 2000
                }
            }, //          Nyaa
            skrbt: {
                host: /skrbt/,
                functionStart: function() {if (location.pathname === '/search') curSite = DBSite.skrbt;},
                pager: {
                    type: 1,
                    nextL: skrbt_nextL,
                    pageE: 'css;div[class="row"] > .col-md-6 > ul',
                    insertP: ['css;nav[aria-label*="Page"]', 1],
                    replaceE: 'css;ul.pagination',
                    scrollD: 900
                }
            }, //           SkrBT
            rarbgprx: {
                host: /rarbg/,
                functionStart: function() {if (location.pathname === '/torrents.php') {curSite = DBSite.rarbgprx;}},
                pager: {
                    type: 1,
                    nextL: 'css;#pager_links > a[title="next page"]',
                    pageE: 'css;table.lista2t tr.lista2',
                    insertP: ['css;table.lista2t > tbody', 3],
                    replaceE: 'css;#pager_links',
                    scrollD: 1000
                }
            }, //        RARBG
            subdh: {
                host: 'subdh.com',
                functionStart: function() {if (location.pathname === '/' || location.pathname.indexOf('/list/new') > -1) {
                    curSite = DBSite.subdh;
                } else if (location.pathname.indexOf('/search') > -1) {
                    curSite = DBSite.subdh_search;
                }},
                pager: {
                    type: 1,
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: 'css;.col-lg-9 .bg-white.shadow-sm.rounded-3 > .row.gx-0',
                    insertP: ['css;.col-lg-9 .bg-white.shadow-sm.rounded-3', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                }
            }, //           SubDH
            subdh_search: {
                pager: {
                    type: 1,
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: 'css;.col-lg-9 .bg-white.shadow-sm.rounded-3',
                    insertP: ['css;nav[aria-label="pagination"]', 1],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                }
            }, //    SubDH - 搜索页
            mini4k: {
                host: 'www.mini4k.com',
                functionStart: function() {if (location.pathname != '/' && !(/\/\d{3,}/.test(location.pathname))) {curSite = DBSite.mini4k;};},
                pager: {
                    type: 1,
                    nextL: 'css;a.pager__item--next',
                    pageE: 'css;div[class*="-item-list"] > ul > li',
                    insertP: ['css;div[class*="-item-list"] > ul', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 2000
                }
            }, //          MINI4K
            bthaha: {
                host: /bthaha/,
                functionStart: function() {if (location.pathname.indexOf('/search/') > -1) {
                    curSite = DBSite.bthaha;
                    document.querySelectorAll('[id^="list_top"], [id^="list_bottom"]').forEach(function (one) {one.parentElement.parentElement.hidden = true;});
                }},
                insStyle: '[id^="list_top"], [id^="list_bottom"] {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: '//ul[@class="pagination"]/li/a[contains(text(), "下一页")]',
                    pageE: 'css;table.table > tbody > tr',
                    insertP: ['css;table.table > tbody', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                },
                function: {
                    bF: bthaha_bF
                }
            }, //          BTHaha
            a4k: {
                host: 'www.a4k.net',
                functionStart: function() {if (location.pathname.indexOf('/subtitle/') === -1) {curSite = DBSite.a4k;};},
                pager: {
                    type: 1,
                    nextL: 'css;a.pager__item--next',
                    pageE: 'css;ul.list > li',
                    insertP: ['css;ul.list', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1000
                }
            }, //           A4k 字幕网（字幕）
            assrt: {
                host: 'assrt.net',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.assrt;};},
                pager: {
                    type: 1,
                    nextL: assrt_nextL,
                    pageE: 'css;.resultcard > div:not(#top-banner):not(#bottom-banner)',
                    insertP: ['css;.pagelinkcard', 1],
                    replaceE: 'css;.pagelinkcard',
                    scrollD: 1000
                }
            }, //         射手网（字幕）
            subhd: {
                host: 'subhd.tv',
                functionStart: function() {if (location.pathname === '/forum/forum') {
                        curSite = DBSite.subhd_forum;
                    } else if (location.pathname != '/' && location.pathname != '/zu' && location.pathname.indexOf('/a/') === -1 && location.pathname.indexOf('/d/') === -1 && location.pathname.indexOf('/forum/') === -1) {
                        curSite = DBSite.subhd;
                    }},
                pager: {
                    type: 1,
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: 'css;.bg-white.shadow-sm.rounded-3',
                    insertP: ['css;nav.clearfix', 1],
                    replaceE: 'css;nav.clearfix',
                    scrollD: 1000
                }
            }, //         SubHD（字幕）
            subhd_forum: {
                pager: {
                    type: 1,
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: 'css;.bg-white.shadow-sm.rounded-3 > div',
                    insertP: ['css;.bg-white.shadow-sm.rounded-3', 3],
                    replaceE: 'css;nav.clearfix',
                    scrollD: 800
                }
            }, //   SubHD - forum（字幕）
            manben: {
                host: 'www.manben.com',
                functionStart: function() {if (/\/m\d+/.test(location.pathname)) {
                    if (getCookie('showtype') != '2') {
                        document.cookie='showtype=2; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 开启 [垂直阅读] 模式
                        location.reload(); // 刷新网页
                    }
                    curSite = DBSite.mhxqiu;
                }}
            }, //            漫本
            cartoonmad: {
                host: ['www.cartoonmad.com','www.cartoonmad.cc'],
                functionStart: function() {if (location.pathname.indexOf('/comic/') > -1) {
                    document.querySelector('body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child > a').href = 'javascript:void(0);'; // 清理图片上的链接
                    curSite = DBSite.cartoonmad;
                } else if (location.pathname != '/') {
                    curSite = DBSite.cartoonmad_list;
                }},
                insStyle: 'body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:not(:first-child) {display: none !important;} body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child img {max-width: 100%;height: auto;display: block !important;margin: 0 auto !important;}',
                pager: {
                    type: 1,
                    nextL: cartoonmad_nextL,
                    pageE: 'css;body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child img',
                    insertP: ['css;body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child > a', 3],
                    replaceE: 'css;body > table > tbody > tr:nth-child(2), body > table > tbody > tr:nth-child(5)',
                    scrollD: 2000
                }
            }, //        动漫狂
            cartoonmad_list: {
                pager: {
                    type: 1,
                    nextL: '//a[@class="pages"][contains(text(), "下一頁")]',
                    pageE: 'css;td[background="/image/content_box4.gif"]+td > table > tbody > tr',
                    insertP: ['css;td[background="/image/content_box4.gif"]+td > table > tbody', 3],
                    replaceE: '//a[@class="pages"]/parent::td/parent::tr | //font[contains(text(), "目前在第")]',
                    scrollD: 1000
                }
            }, //   动漫狂 - 分类/搜索页
            manhuacat: {
                host: 'www.manhuacat.com',
                functionStart: function() {if (/\/manga\/\d+\/.+\.html/.test(location.pathname)) {
                    if (getCookie('is_pull') == 'true') { // 强制关闭 [下拉] 模式
                        document.cookie='is_pull=false; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 关闭 [下拉] 模式
                        location.reload(); // 刷新网页
                    }
                    setTimeout(manhuacat_init, 100);
                    curSite = DBSite.manhuacat;
                } else if (location.pathname.indexOf('/list') > -1) {
                    curSite = DBSite.manhuacat_list;
                } else if (location.pathname.indexOf('/search') > -1 || location.pathname.indexOf('/update') > -1) {
                    curSite = DBSite.manhuacat_search;
                }},
                insStyle: '#left, #right, #pull-load, .loading, .pagination, footer {display: none !important;} .img-content > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}', // 隐藏不需要的元素，调整图片
                pager: {
                    type: 4,
                    nextL: manhuacat_nextL,
                    insertP: ['css;.img-content', 3],
                    insertE: manhuacat_insertE,
                    replaceE: 'css;.comic-detail > .breadcrumb-bar, .comic-detail >h2.h4, title, .vg-r-data, body > script:not([src])',
                    interval: 2000,
                    scrollD: 3000
                }
            }, //         漫画猫
            manhuacat_list: {
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "pagination")]//a[contains(text(), "下一页") or contains(text(), "下页")]',
                    pageE: 'css;.comic-main-section > *',
                    insertP: ['css;.comic-main-section', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //    漫画猫 - 分类页
            manhuacat_search: {
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "pagination")]//a[contains(text(), "下一页") or contains(text(), "下页")]',
                    pageE: 'css;.comic-main-section .row > div',
                    insertP: ['css;.comic-main-section .row', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1000
                }
            }, //  漫画猫 - 搜索页
            manhuatai: {
                host: 'www.manhuatai.net',
                functionStart: function() {if (location.pathname.indexOf('/manhua/') > -1) {
                    curSite = DBSite.manhuatai;
                } else if (location.pathname.indexOf('/fenlei_') > -1 || location.pathname.indexOf('/top_') > -1) {
                    curSite = DBSite.manhuatai_list;
                    } else if (location.pathname.indexOf('/search') > -1) {
                    curSite = DBSite.manhuatai_search;
                }},
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "page")]//a[@href][contains(text(), "下一页") or contains(text(), "下一章")]',
                    pageE: 'css;#htmlContent p.img > img',
                    insertP: ['css;#htmlContent p.img', 3],
                    replaceE: 'css;.page, .title, title',
                    history: true,
                    scrollD: 2000
                }
            }, //         漫画台
            manhuatai_list: {
                pager: {
                    type: 1,
                    nextL: 'css;#pagelink a.next',
                    pageE: 'css;.article-list',
                    insertP: ['css;#pagelink', 1],
                    replaceE: 'css;#pagelink',
                    scrollD: 1500
                }
            }, //    漫画台 - 分类页
            manhuatai_search: {
                pager: {
                    type: 1,
                    nextL: 'css;#pagelink a.next',
                    pageE: 'css;#content > table > tbody > tr:not([align])',
                    insertP: ['css;#content > table > tbody', 3],
                    replaceE: 'css;#pagelink',
                    scrollD: 1500
                }
            }, //  漫画台 - 搜索页
            manhuadb: {
                host: 'www.manhuadb.com',
                functionStart: function() {if (/\/manhua\/\d+\/.+\.html/.test(location.pathname)) {
                    if (document.querySelector('img.img-fluid.show-pic')) document.querySelector('img.img-fluid.show-pic').style.display = 'none'; // 隐藏第一个图片（避免重复）
                    setTimeout(manhuadb_init, 100);
                    curSite = DBSite.manhuadb;
                } else if (location.pathname.indexOf('/list') > -1) {
                    curSite = DBSite.manhuacat_list;
                } else if (location.pathname.indexOf('/search') > -1 || location.pathname.indexOf('/update') > -1) {
                    curSite = DBSite.manhuacat_search;
                }},
                insStyle: '.row.m-0.pt-3.ad_2_wrap, .row.m-0.ad_1_wrap, .pagination.justify-content-center, #left, #right {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: manhuadb_nextL,
                    pageE: 'css;body > script:not([type]):not([src]), .vg-r-data, ol.links-of-books.num_div',
                    insertP: ['css;.pjax-container', 3],
                    insertE: manhuadb_insertE,
                    interval: 5000,
                    scrollD: 3000
                }
            }, //          漫画 DB
            hicomic: {
                host: 'www.hicomic.net',
                functionStart: function() {if (location.pathname.indexOf('/chapters/') > -1) {
                    setTimeout(hicomic_init, 100);
                    curSite = DBSite.hicomic;
                }},
                insStyle: '.content {height: auto !important;} .footer, .left_cursor, .right_cursor, .finish {display: none !important;} .content > img {display: block !important;margin: 0 auto !important;}',
                pager: {
                    type: 4,
                    nextL: hicomic_nextL,
                    insertP: ['css;.content', 3],
                    insertE: hicomic_insertE,
                    interval: 5000,
                    scrollD: 3000
                }
            }, //           HiComic (嗨漫画)
            dmzj: {
                host: 'www.dmzj.com',
                functionStart: function() {if (location.pathname.indexOf('/view/') > -1) {
                    if (getCookie('display_mode') != '1') { // 强制开启 [上下滚动阅读] 模式
                        document.cookie='display_mode=1; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 开启 [上下滚动阅读] 模式
                        location.reload(); // 刷新网页
                    }
                    setTimeout(dmzj_init, 100);
                    curSite = DBSite.dmzj;
                } else if (location.pathname.indexOf('/category') > -1 || location.pathname.indexOf('/update') > -1) {
                    curSite = DBSite.dmzj_list;
                } else if (location.pathname.indexOf('/rank') > -1) {
                    curSite = DBSite.dmzj_rank;
                }},
                insStyle: 'p.mh_curr_page, .btmBtnBox, .float_code, #floatCode {display: none !important;} .comic_wraCon > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}', // 隐藏中间的页数信息
                pager: {
                    type: 4,
                    nextL: dmzj_nextL,
                    insertP: ['css;.comic_wraCon', 3],
                    insertE: dmzj_insertE,
                    replaceE: 'css;.wrap_last_mid, .wrap_last_head, title',
                    interval: 2000,
                    scrollD: 3000
                }
            }, //              动漫之家 - 原创
            dmzj_list: {
                insStyle: '.wrap_mhlist_l.con_left, .wrap_list {height: auto!important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a.pg_next',
                    pageE: 'css;ul.list_con_li > li',
                    insertP: ['css;ul.list_con_li', 3],
                    replaceE: 'css;.page',
                    scrollD: 1000
                }
            }, //         动漫之家 - 原创 - 分类页
            dmzj_rank: {
                insStyle: '.wrap_mhlist_l.con_left {height: auto!important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a.pg_next',
                    pageE: 'css;.ph_r_con_li > div:not(.ad_column)',
                    insertP: ['css;.ph_r_con_li', 3],
                    replaceE: 'css;.page',
                    scrollD: 1000
                }
            }, //         动漫之家 - 原创 - 排行榜
            dmzj_manhua: {
                host: 'manhua.dmzj.com',
                functionStart: function() {if (/\/\d+\.shtml/.test(location.pathname)) {
                    let chapterScroll = document.getElementById('qiehuan_txt') // 强制为 [上下滚动阅读] 模式
                    if (chapterScroll && chapterScroll.textContent === '切换到上下滚动阅读') {chapterScroll.click();}
                    setTimeout(dmzj_manhua_init, 100);
                    curSite = DBSite.dmzj_manhua;
                } else if (location.pathname.indexOf('/update') > -1) {
                    curSite = DBSite.dmzj_manhua_update;
                }},
                insStyle: 'p.curr_page, .btmBtnBox, .float_code, #floatCode {display: none !important;} #center_box > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}', // 隐藏中间的页数信息
                pager: {
                    type: 4,
                    nextL: dmzj_manhua_nextL,
                    insertP: ['css;#center_box', 3],
                    insertE: dmzj_manhua_insertE,
                    replaceE: 'css;.display_graybg, title',
                    interval: 2000,
                    scrollD: 3000
                }
            }, //       动漫之家 - 日漫
            dmzj_manhua_update: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pages"]/a[contains(text(), "下一页")]',
                    pageE: 'css;.newpic_content > *:not(.pages)',
                    insertP: ['css;.newpic_content', 3],
                    replaceE: 'css;.pages',
                    scrollD: 1000
                }
            }, //动漫之家 - 日漫 - 最新更新
            copymanga: {
                host: 'www.copymanga.com',
                functionStart: function() {if (location.pathname.indexOf('/chapter/') > -1) {
                    curSite = DBSite.copymanga;
                } else if (location.pathname.indexOf('/comics') > -1) {
                    curSite = DBSite.copymanga_list;
                }},
                iframe: true,
                insStyle: '.upMember, .comicContainerAds, .footer, #Autopage_number {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: copymanga_nextL,
                    pageE: 'css;ul.comicContent-list > li',
                    insertP: ['css;ul.comicContent-list', 2],
                    scrollD: 3000
                }
            }, //         拷贝漫画
            copymanga_list: {
                pager: {
                    type: 1,
                    nextL: 'css;li.next > a',
                    pageE: 'css;.exemptComic-box > div',
                    insertP: ['css;.exemptComic-box', 3],
                    replaceE: 'css;ul.page-all',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-src]', 'data-src']
                }
            }, //    拷贝漫画 - 分类页
            mhxqiu: {
                host: 'www.mhxqiu.com',
                functionStart: function() {if (/\/\d+\.html/.test(location.pathname)) { // 阅读页
                    curSite = DBSite.mhxqiu;
                } else if (/\/\d+\/$/.test(location.pathname)) { // 目录页
                    setTimeout(function(){if (document.getElementById('zhankai')) document.getElementById('zhankai').click();}, 500)
                } else if (/\/(sort|rank)\//.test(location.pathname)) { // 分类页
                    curSite = DBSite.mhxqiu_list;
                }},
                insStyle: '.imgFloat_1, .imgFloat_2, .main_control, span.comic-ft {display: none !important;} html, body, #mainView {height: auto !important;} body.view .main ul.comic-contain li{margin:0 auto !important;} .comic-contain .loaded{box-shadow: none !important;}',
                pager: {
                    type: 4,
                    nextL: mhxqiu_nextL,
                    insertP: ['css;#comicContain', 3],
                    insertE: mhxqiu_insertE,
                    replaceE: 'css;.main_control, h1.chaptername_title, span.title-comicHeading, title',
                    interval: 4000,
                    scrollD: 3000
                }
            }, //            漫画星球
            mhxqiu_list: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="NewPages"]//a[contains(text(), "下一页")]',
                    pageE: 'css;.cy_list_mh > ul',
                    insertP: ['css;.cy_list_mh', 3],
                    replaceE: 'css;.NewPages',
                    scrollD: 1000
                }
            }, //       漫画星球 - 分类页
            fffdm: {
                host: 'manhua.fffdm.com',
                functionStart: function() {if (location.pathname.split('/').length === 4) {curSite = DBSite.fffdm;}},
                insStyle: '#footer, #header {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: fffdm_nextL,
                    insertP: ['css;#mhimg0', 3],
                    insertE: fffdm_insertE,
                    replaceE: 'css;.navigation, #weizhi, h1, title',
                    scrollD: 2000
                }
            }, //             风之动漫
            gufengmh: {
                host: /gufengmh/,
                functionStart: function() {if (/\/\d+.+\.html/.test(location.pathname)) {
                    let chapterScroll = document.getElementById('chapter-scroll') // 强制为 [下拉阅读] 模式
                    if (chapterScroll && chapterScroll.className === '') {chapterScroll.click();}
                    curSite = DBSite.gufengmh;
                } else if (location.pathname.indexOf('/update') > -1 || location.pathname.indexOf('/list') > -1 || location.pathname.indexOf('/search') > -1) {
                    curSite = DBSite.gufengmh_list;
                }},
                insStyle: 'p.img_info {display: none !important;}', // 隐藏中间的页数信息
                pager: {
                    type: 4,
                    nextL: gufengmh_nextL,
                    pageE: 'css;body > script:first-child',
                    insertP: ['css;#images', 3],
                    insertE: gufengmh_insertE,
                    interval: 5000,
                    scrollD: 4000
                }
            }, //          古风漫画网
            gufengmh_list: {
                pager: {
                    type: 1,
                    nextL: 'css;li.next > a',
                    pageE: 'css;ul.book-list > li',
                    insertP: ['css;ul.book-list', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                }
            }, //     古风漫画网 - 分类页
            szcdmj: {
                host: 'www.szcdmj.com',
                functionStart: function() {if (location.pathname.indexOf('/szcchapter/') > -1) {curSite = DBSite.szcdmj;}},
                insStyle: '.header {opacity: 0.3 !important;}',
                pager: {
                    type: 1,
                    nextL: '//div[@class="fanye"][1]/a[text()="下一页" or text()="下一话"]',
                    pageE: 'css;.comicpage > div,title',
                    insertP: ['css;.comicpage', 3],
                    replaceE: 'css;.fanye,h1.title',
                    scrollD: 2000
                },
                function: {
                    bF: szcdmj_bF
                }
            }, //            砂之船动漫家
            mangabz: {
                host: ['mangabz.com', 'www.mangabz.com'],
                functionStart: function() {if (/\/m\d+/.test(location.pathname)) {
                    setTimeout(mangabz_init, 500);
                    curSite = DBSite.mangabz;
                } else if (/\/\d+bz\//.test(location.pathname)) {
                    if (document.querySelector('.detail-list-form-more')) document.querySelector('.detail-list-form-more').click();
                } else if (location.pathname.indexOf('/manga-list') > -1 || location.pathname === '/search') {
                    curSite = DBSite.mangabz_list;
                }},
                insStyle: 'body > .container > div:not([id]) {display: none !important;} .top-bar {opacity: 0.3 !important;} #cp_img > img{display: block !important;margin: 0 auto !important;width: auto !important; height: auto !important;}',
                pager: {
                    type: 4,
                    nextL: mangabz_nextL,
                    insertP: ['css;#cp_img', 3],
                    insertE: mangabz_insertE,
                    replaceE: 'css;p.top-title, body > .container > div:not([id]), title',
                    interval: 500,
                    scrollD: 1000
                }
            }, //           Mangabz 漫画
            mangabz_list: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="page-pagination"]//a[contains(text(), ">")]',
                    pageE: 'css;ul.mh-list > li',
                    insertP: ['css;ul.mh-list', 3],
                    replaceE: 'css;.page-pagination',
                    scrollD: 800
                }
            }, //      Mangabz 漫画 - 分类/搜索页
            cocomanga: {
                host: 'www.cocomanga.com',
                functionStart: function() {if (location.pathname.indexOf('.html') > -1) {
                    if (!(getCookie('mh_readmode') === '' || getCookie('mh_readmode') === '3')) {
                        document.cookie='mh_readmode=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; // 强制开启自带的无缝翻页功能
                        location.reload(); // 刷新网页
                    }
                    setTimeout(cocomanga_init, 500);
                    curSite = DBSite.cocomanga;
                } else if (/\/\d+\/$/.test(location.pathname)) {
                    setTimeout(function(){if (document.querySelector('a.website-display-all')) document.querySelector('a.website-display-all').click();}, 300)
                } else if (location.pathname === '/show') {
                    curSite = DBSite.cocomanga_list;
                } else if (location.pathname === '/search') {
                    curSite = DBSite.cocomanga_search;
                }},
                insStyle: '.mh_readend, .mh_footpager, .mh_readmode {display: none !important;} .mh_comicpic img {cursor: unset !important;}',
                pager: {
                    type: 4,
                    nextL: cocomanga_nextL,
                    insertP: ['css;#mangalist', 3],
                    insertE: cocomanga_insertE,
                    replaceE: 'css;.mh_readtitle, .mh_headpager > a.mh_prevbook, .mh_readend, head > title',
                    interval: 1000,
                    scrollD: 2500
                }
            }, //         COCOMANGA 漫画
            cocomanga_list: {
                pager: {
                    type: 1,
                    nextL: cocomanga_list_nextL,
                    pageE: 'css;ul.fed-list-info > li',
                    insertP: ['css;ul.fed-list-info', 3],
                    replaceE: 'css;.fed-page-info',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [1, 'a[data-original]', 'data-original']
                }
            }, //    COCOMANGA 漫画 - 分类页
            cocomanga_search: {
                pager: {
                    type: 1,
                    nextL: cocomanga_list_nextL,
                    pageE: 'css;dl.fed-deta-info',
                    insertP: ['css;.fed-page-info', 1],
                    replaceE: 'css;.fed-page-info',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [1, 'a[data-original]', 'data-original']
                }
            }, //  COCOMANGA 漫画 - 搜索页
            qidian: {
                host: 'www.qidian.com',
                functionStart: function() {if (location.pathname.indexOf('/all/') > -1) {curSite = DBSite.qidian;}},
                pager: {
                    type: 1,
                    nextL: 'css;a[class*="pagination-next"]',
                    pageE: 'css;ul.all-img-list > li',
                    insertP: ['css;ul.all-img-list', 3],
                    replaceE: 'css;#page-container',
                    scrollD: 900
                }
            }, //                起点小说
            qidian_read: {
                host: 'read.qidian.com',
                insStyle: '.admire-wrap {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a[id$="chapterNext"]',
                    pageE: 'css;.main-text-wrap > div:not(.admire-wrap)',
                    insertP: ['css;.main-text-wrap', 3],
                    replaceE: 'css;.chapter-control, title',
                    history: true,
                    scrollD: 900
                }
            }, //           起点小说 - 阅读页
            baoshuu: {
                host: 'www.baoshuu.com',
                functionStart: function() {if (location.pathname.indexOf('/TXT/list') > -1) curSite = DBSite.baoshuu;},
                pager: {
                    type: 1,
                    nextL: '//div[@class="listl2"]//a[text()="下一页"]',
                    pageE: 'css;.listl2 > ul > li',
                    insertP: ['css;.listl2 > ul', 3],
                    replaceE: 'css;.listl2 > dl',
                    scrollD: 900
                }
            }, //               宝书网
            baoshuu_m: {
                host: 'm.baoshuu.com',
                functionStart: function() {if (location.pathname.indexOf('/TXT/list') > -1) curSite = DBSite.baoshuu_m;},
                pager: {
                    type: 1,
                    nextL: '//div[@class="man_first"]//a[text()="下一页"]',
                    pageE: 'css;.man_first > ul > li',
                    insertP: ['css;.man_first > ul', 3],
                    replaceE: 'css;.man_first > dl',
                    scrollD: 900
                }
            }, //             宝书网- 手机版
            xineyby: {
                host: 'www.xineyby.com',
                functionStart: function() {if (location.pathname.indexOf('/read/') > -1) {
                    curSite = DBSite.xineyby;
                } else if (location.pathname.indexOf('/list/') > -1 || location.pathname.indexOf('/quanben/') > -1 || location.pathname.indexOf('/search') > -1) {
                    curSite = DBSite.xineyby_list;
                }},
                pager: {
                    type: 1,
                    nextL: 'id("footlink")/a[contains(text(), "下一页")]',
                    pageE: 'css;#contents',
                    insertP: ['css;#contents', 5],
                    replaceE: 'css;#footlink, head > title, #amain dd h1',
                    history: true,
                    scrollD: 900
                }
            }, //               无错小说网
            xineyby_list: {
                pager: {
                    type: 1,
                    nextL: 'css;#pagelink a.next',
                    pageE: 'css;#content > dd tbody > tr:not(:first-child)',
                    insertP: ['css;#content > dd tbody', 3],
                    replaceE: 'css;#pagelink',
                    scrollD: 900
                }
            }, //          无错小说网 - 分类/搜索页
            linovel: {
                host: 'www.linovel.net',
                functionStart: function() {if (/\/book\/\d+\/.+\.html/.test(location.pathname)) {
                   insStyle('.reward-section {display: none !important;}');
                } else if (location.pathname.indexOf('/cat/') > -1) {
                    curSite = DBSite.linovel;
                }},
                pager: {
                    type: 1,
                    nextL: '//ul[@class="pagination"]/li/a[contains(text(), "下一页")]',
                    pageE: 'css;.rank-book-list > div',
                    insertP: ['css;.rank-book-list', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                }
            }, //               轻之文库
            _23qb: {
                host: 'www.23qb.net',
                functionStart: function() {if (/\/book\/\d+\/.+\.html/.test(location.pathname)) {
                    curSite = DBSite._23qb;
                } else if (location.pathname != '/' && !(/\/book\/\d+\//.test(location.pathname))) {
                    curSite = DBSite._23qb_list;
                }},
                pager: {
                    type: 1,
                    nextL: function() {return (location.origin + ReadParams.url_next)},
                    pageE: 'id("mlfy_main_text")/* | //script[contains(text(), "ReadParams")]',
                    insertP: ['css;#mlfy_main_text', 3],
                    replaceE: 'css;title',
                    scriptT: 2,
                    scrollD: 1500
                }
            }, //                 铅笔小说
            _23qb_list: {
                pager: {
                    type: 1,
                    nextL: 'css;.pages a.next, .pages > strong+a',
                    pageE: 'css;#sitebox > dl',
                    insertP: ['css;#sitebox', 3],
                    replaceE: 'css;.pages',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[_src]', '_src']
                }
            }, //            铅笔小说 - 分类页
            linovelib: {
                host: 'www.linovelib.com',
                functionStart: function() {if (/\/novel\/\d+\/.+\.html/.test(location.pathname)) {
                    curSite = DBSite.linovelib;
                } else if (location.pathname.indexOf('/wenku/') > -1) {
                    curSite = DBSite.linovelib_wenku;
                } else if (location.pathname.indexOf('/top/') > -1 || location.pathname.indexOf('/topfull/') > -1 || location.pathname.indexOf('toplist.php') > -1) {
                    curSite = DBSite.linovelib_top;
                }},
                pager: {
                    type: 1,
                    nextL: '//p[@class="mlfy_page"]/a[contains(text(), "下一页") or contains(text(), "下一章")]',
                    pageE: 'css;#mlfy_main_text > *',
                    insertP: ['css;#mlfy_main_text', 3],
                    replaceE: 'css;p.mlfy_page, head > title',
                    history: true,
                    scrollD: 1000
                }
            }, //             哔哩轻小说
            linovelib_wenku: {
                pager: {
                    type: 1,
                    nextL: 'css;#pagelink > a.next',
                    pageE: 'css;.store_collist > div.bookbox',
                    insertP: ['css;.store_collist', 3],
                    replaceE: 'css;#pagelink',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //       哔哩轻小说 - 文库
            linovelib_top: {
                pager: {
                    type: 1,
                    nextL: 'css;#pagelink > a.next',
                    pageE: 'css;.rankpage_box > div.rank_d_list',
                    insertP: ['css;div.pages', 1],
                    replaceE: 'css;#pagelink',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //         哔哩轻小说 - 全本
            linovelib_w: {
                host: 'w.linovelib.com',
                functionStart: function() {if (/\/novel\/\d+\/.+\.html/.test(location.pathname)) {
                    curSite = DBSite.linovelib_w;
                } else if (location.pathname.indexOf('/wenku/') > -1 || location.pathname.indexOf('/sa/') > -1) {
                    curSite = DBSite.linovelib_w_wenku;
                }},
                pager: {
                    type: 1,
                    nextL: function() {if (ReadParams) {return ReadParams.url_next}; return ''},
                    pageE: '//body/script[contains(text(), "var ReadParams")] | id("apage")/div',
                    insertP: ['css;#apage', 3],
                    replaceE: 'css;head > title',
                    history: true,
                    scriptT: 2,
                    scrollD: 1000
                }
            }, //           哔哩轻小说 (手机版)
            linovelib_w_wenku: {
                pager: {
                    type: 1,
                    nextL: 'css;#pagelink > strong+a ,#pagelink a.next',
                    pageE: 'css;ol.book-ol > li',
                    insertP: ['css;ol.book-ol', 3],
                    replaceE: 'css;#pagelink',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //     哔哩轻小说 (手机版) - 文库
            _423down: {
                host: 'www.423down.com',
                functionStart: function() {if (location.pathname.indexOf('.html') === -1) curSite = DBSite._423down;},
                pager: {
                    type: 1,
                    nextL: '//div[@class="paging"]//a[contains(text(),"下一页")]',
                    pageE: 'css;div.content-wrap ul.excerpt > li',
                    insertP: ['css;div.content-wrap ul.excerpt', 3],
                    replaceE: 'css;div.paging',
                    scrollD: 2000
                }
            }, //            423Down
            iao_su: {
                host: 'iao.su',
                pager: {
                    type: 1,
                    nextL: 'css;li.next > a',
                    pageE: 'css;#index > article, #archive > article',
                    insertP: ['css;ol.page-navigator', 1],
                    replaceE: 'css;ol.page-navigator',
                    scriptT: 4,
                    scrollD: 1000
                }
            }, //              不死鸟
            sharerw: {
                host: 'www.sharerw.com',
                functionStart: function() {if (location.pathname.indexOf('.html') === -1) {
                    if (location.pathname === '/search.php') {curSite = DBSite.sharerw_search;} else {curSite = DBSite.sharerw;};};},
                pager: {
                    type: 1,
                    nextL: 'css;span.next > a',
                    pageE: 'css;.new-post > article',
                    insertP: ['css;.new-post', 3],
                    replaceE: 'css;.pagebar',
                    scrollD: 1500
                }
            }, //             分享者
            sharerw_search: {
                pager: {
                    type: 1,
                    nextL: 'css;span.next > a',
                    pageE: 'css;#mainbox > article',
                    insertP: ['css;.pagebar', 1],
                    replaceE: 'css;.pagebar',
                    scrollD: 1500
                }
            }, //      分享者 - 搜索页
            extfans: {
                host: 'www.extfans.com',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.extfans;}},
                pager: {
                    type: 1,
                    nextL: 'css;.page a[data-page="next"]',
                    pageE: 'css;.side-left > ul[class*="-list"] > li',
                    insertP: ['css;.side-left > ul[class*="-list"]', 3],
                    replaceE: 'css;.page',
                    scrollD: 2000
                }
            }, //             扩展迷
            chrome_zzzmh: {
                host: 'chrome.zzzmh.cn',
                pager: {
                    type: 2,
                    nextL: 'button.more-btn',
                    interval: 1000,
                    scrollD: 1500
                }
            }, //        极简插件
            appinn: {
                host: 'www.appinn.com',
                pager: {
                    type: 1,
                    nextL: 'css;a.next.page-numbers',
                    pageE: 'css;section#latest-posts > article',
                    insertP: ['css;nav.navigation.pagination', 1],
                    replaceE: 'css;div.nav-links',
                    scrollD: 1500
                }
            }, //              小众软件
            isharepc: {
                host: 'www.isharepc.com',
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;.content > div',
                    insertP: ['css;nav.pagination', 1],
                    replaceE: 'css;nav.pagination',
                    scrollD: 1000
                }
            }, //            乐软博客
            ghxi: {
                host: 'www.ghxi.com',
                functionStart: function() {if (location.pathname === '/' && !location.search) {curSite = DBSite.ghxi;} else {curSite = DBSite.ghxi_list;}},
                pager: {
                    type: 2,
                    nextL: '.load-more',
                    interval: 1000,
                    scrollD: 5000
                }
            }, //                果核剥壳 - 首页
            ghxi_list: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;ul.post-loop > li',
                    insertP: ['css;ul.post-loop', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //           果核剥壳 - 分类/搜索页
            sixyin: {
                host: 'www.sixyin.com',
                functionStart: function() {if (location.pathname === '/' && location.search === '') { // 首页
                    curSite = DBSite.sixyin;
                } else if (location.pathname.indexOf('.html') === -1) { //    分类页
                    curSite = DBSite.sixyin_list;
                }},
                pager: {
                    type: 2,
                    nextL: '.load-more',
                    nextHTML: '点击查看更多',
                    scrollD: 1500
                }
            }, //              六音软件 - 首页
            sixyin_list: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next',
                    pageE: 'css;ul.post-loop > li',
                    insertP: ['css;ul.post-loop', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1500
                }
            }, //         六音软件 - 分类页
            weidown: {
                host: 'www.weidown.com',
                functionStart: function() {if (location.pathname.indexOf('/search/') > -1) { //搜索页
                    curSite = DBSite.weidown_search;
                } else if (location.pathname.indexOf('/special') > -1) { // 专题页
                    curSite = DBSite.weidown_special;
                } else {
                    curSite = DBSite.weidown;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;a.nextpage',
                    pageE: 'css;.articleWrapper > .itemArticle, .articleWrapper > .richTextItem.search',
                    insertP: ['css;.articleWrapper', 3],
                    replaceE: 'css;#pageGroup',
                    scrollD: 1500
                }
            }, //             微当下载
            weidown_search: {
                pager: {
                    type: 1,
                    nextL: 'css;a.nextpage',
                    pageE: 'css;.articleListWrapper > .richTextItem.search',
                    insertP: ['css;#pageGroup', 1],
                    replaceE: 'css;#pageGroup',
                    scrollD: 700
                }
            }, //      微当下载 - 搜索页
            weidown_special: {
                pager: {
                    type: 1,
                    nextL: 'css;a.nextpage',
                    pageE: 'css;.special > .item, .articleWrapper > div',
                    insertP: ['css;.special, .articleWrapper', 3],
                    replaceE: 'css;#pageGroup',
                    scrollD: 700
                }
            }, //     微当下载 - 专题页
            fsylr: {
                host: 'fsylr.com',
                functionStart: function() {if (location.pathname.indexOf('.html') === -1) {curSite = DBSite.fsylr;}},
                pager: {
                    type: 1,
                    nextL: 'css;a.next.page-numbers',
                    pageE: 'css;.posts-con > div:not([class*="posts-"])',
                    insertP: ['css;.posts-con', 3],
                    replaceE: 'css;nav.pagination',
                    scrollD: 1000
                }
            }, //               发烧友绿软
            iplaysoft: {
                host: 'www.iplaysoft.com',
                functionStart: function() {if (location.pathname.indexOf('.html') > -1 || location.pathname.indexOf('/p/') > -1) { // 文章内
                    curSite = DBSite.iplaysoft_comment;
                } else { // 其他页面
                    curSite = DBSite.iplaysoft;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;.pagenavi a[title="下一页"]',
                    pageE: 'css;#postlist > div.entry',
                    insertP: ['css;#postlist > .pagenavi-button', 1],
                    replaceE: 'css;.pagenavi-button, .pagenavi',
                    scrollD: 1200
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-src]', 'data-src']
                }
            }, //           异次元软件
            iplaysoft_comment: {
                pager: {
                    type: 2,
                    nextL: '#loadHistoryComments',
                    nextTextOf: '展开后面',
                    scrollD: 1200
                }
            }, //   异次元软件 - 评论
            mpyit: {
                host: 'www.mpyit.com',
                functionStart: function() {if (location.pathname === '/' && !location.search) {
                    curSite = DBSite.mpyit;
                } else if (location.pathname.indexOf('/category/') > -1 || location.search.indexOf('?s=') > -1) { // 搜索页 / 分类页
                    curSite = DBSite.mpyit_category;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;a.page-numbers[title="下一页"]',
                    pageE: 'css;#post > div[id^="post-"]',
                    insertP: ['css;#post > #pagenavi', 1],
                    replaceE: 'css;#post > #pagenavi',
                    scrollD: 1700
                }
            }, //               老殁 | 殁漂遥
            mpyit_category: {
                pager: {
                    type: 1,
                    nextL: 'css;a.page-numbers[title="下一页"]',
                    pageE: 'css;#content > div[class^="entry_box"]',
                    insertP: ['css;#content > #pagenavi', 1],
                    replaceE: 'css;#content > #pagenavi',
                    scrollD: 1700
                }
            }, //      老殁 | 殁漂遥 - 搜索页/分类页
            tenlonstudio: {
                host: 'www.tenlonstudio.com',
                functionStart: function() {if (location.pathname === '/' && !location.search) {
                    curSite = DBSite.tenlonstudio;
                } else {
                    curSite = DBSite.tenlonstudio_list;
                }},
                pager: {
                    type: 2,
                    nextL: '.load-more',
                    nextText: '加载更多',
                    interval: 500,
                    scrollD: 1000
                }
            }, //        腾龙工作室
            tenlonstudio_list: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="btn-pager"]/a[contains(text(), "❯")]',
                    pageE: 'css;li.post-list-item',
                    insertP: ['css;li.post-list-item:last-child', 4],
                    replaceE: 'css;.ajax-pager',
                    scrollD: 1000
                }
            }, //   腾龙工作室 - 分类/搜索页
            yxssp: {
                host: 'www.yxssp.com',
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "page-nav")]/a[last()]',
                    pageE: 'css;.td-modules-container.td-module-number4 > div',
                    insertP: ['css;.td-modules-container.td-module-number4', 3],
                    replaceE: 'css;.page-nav.td-pb-padding-side',
                    scrollD: 1000
                }
            }, //               异星软件空间
            yrxitong: {
                host: 'www.yrxitong.com',
                functionStart: function() {
                    if (location.pathname === '/sr.jsp') {
                        curSite = DBSite.yrxitong_search;
                    } else if (location.pathname.indexOf('/h-nd-') === -1) {
                        curSite = DBSite.yrxitong;
                    }
                },
                pager: {
                    type: 1,
                    nextL: 'css;span.pageNext > a',
                    pageE: 'css;#containerFormsCenter .m_news_list > div',
                    insertP: ['css;#containerFormsCenter .m_news_list', 3],
                    replaceE: 'css;.pagenation',
                    scrollD: 1200
                },
                function: {
                    bF: src_bF,
                    pF: [1, 'a[data-original]', 'data-original']
                }
            }, //            小鱼儿 yr 系统
            yrxitong_search: {
                pager: {
                    type: 1,
                    nextL: 'css;span.pageNext > a',
                    pageE: 'css;#containerFormsCenter .newsList > div',
                    insertP: ['css;#containerFormsCenter .newsList', 3],
                    replaceE: 'css;.pagenation',
                    scrollD: 2000
                }
            }, //     小鱼儿 yr 系统 - 搜索页
            sordum: {
                host: 'www.sordum.org',
                pager: {
                    type: 1,
                    nextL: 'css;a.next.page-numbers',
                    pageE: 'css;.article > article',
                    insertP: ['css;nav.navigation.posts-navigation', 1],
                    replaceE: 'css;nav.navigation.posts-navigation',
                    scrollD: 1500
                }
            }, //              (下面这几个都是国外博客网站)
            winaero: {
                host: 'winaero.com',
                functionStart: function() {if (location.pathname === '/blog/' || location.pathname.indexOf('/category/') > -1) curSite = DBSite.winaero;},
                pager: {
                    type: 1,
                    nextL: 'css;.nav-previous > a',
                    pageE: 'css;#content > article',
                    insertP: ['css;#nav-below', 1],
                    replaceE: 'css;#nav-below',
                    scrollD: 1500
                }
            },
            lrepacks: {
                host: 'lrepacks.net',
                functionStart: function() {if (location.pathname.indexOf('.html') === -1) curSite = DBSite.lrepacks;},
                pager: {
                    type: 1,
                    nextL: 'css;.page_next > a',
                    pageE: 'css;#main .post-list article',
                    insertP: ['css;.page_nav', 1],
                    replaceE: 'css;.page_nav',
                    scrollD: 1500
                },
                function: {
                    bF: lrepacks_bF
                }
            },
            winhelponline: {
                host: 'www.winhelponline.com',
                functionStart: function() {if (location.pathname === '/blog/') {curSite = DBSite.winhelponline;}},
                pager: {
                    type: 1,
                    nextL: 'css;span.prev > a',
                    pageE: 'css;#main > article',
                    insertP: ['css;nav.paging-navigation', 1],
                    replaceE: 'css;nav.paging-navigation',
                    scrollD: 2000
                }
            },
            windowslatest: {
                host: 'www.windowslatest.com',
                pager: {
                    type: 1,
                    nextL: '//div[contains(@class, "page-nav")]/a[last()]',
                    pageE: 'css;.td-ss-main-content > div:not(.td-block-title-wrap):not(.page-nav)',
                    insertP: ['css;.page-nav', 1],
                    replaceE: 'css;.page-nav',
                    scrollD: 2000
                }
            },
            thewindowsclub: {
                host: 'www.thewindowsclub.com',
                functionStart: function() {curSite = DBSite.thewindowsclub; if (location.pathname === '/') {curSite.pager.scrollD = 2000;}},
                pager: {
                    type: 1,
                    nextL: 'css;li.pagination-next > a',
                    pageE: 'css;#genesis-content > article',
                    insertP: ['css;.pagination', 1],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            },
            gitee: {
                host: 'search.gitee.com',
                functionStart: function() {if (location.search) curSite = DBSite.gitee;},
                pager: {
                    type: 1,
                    nextL: 'css;li.next > a',
                    pageE: 'css;#hits-list > div',
                    insertP: ['css;#hits-list', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                }
            }, //                     Gitee - 搜索页
            github_star: {
                host: 'github.com',
                functionStart: function() {locationChange = true;
                    if (location.search.indexOf('tab=stars') > -1) {
                        curSite = DBSite.github_star;
                    } else if ((location.pathname.indexOf('/issues') > -1 && location.pathname.indexOf('/issues/') === -1) || (location.pathname.indexOf('/pulls') > -1 && location.pathname.indexOf('/pulls/') === -1)) {
                        curSite = DBSite.github_issues;
                    } else if (location.pathname.indexOf('/discussions') > -1 && !(/\/discussions\/\d+/.test(location.pathname)) && location.pathname.indexOf('new') === -1) {
                        curSite = DBSite.github_discussions;
                    } else if (location.pathname.indexOf('/releases') > -1 && location.pathname.indexOf('/releases/tag/') === -1 && location.pathname.indexOf('edit') === -1) {
                        curSite = DBSite.github_releases;
                    } else if (location.pathname.indexOf('/tags') > -1 && location.pathname.indexOf('/tags/') === -1) {
                        curSite = DBSite.github_tags;
                    } else if (location.pathname.indexOf('/commits') > -1) {
                        curSite = DBSite.github_commits;
                    } else if (location.pathname.indexOf('/notifications') > -1) {
                        curSite = DBSite.github_notifications;
                    } else if (location.pathname.indexOf('/search') > -1) {
                        if (!location.search) return
                        if (location.search.indexOf('type=Repositories') > -1 || location.search.indexOf('type=') === -1) {
                            curSite = DBSite.github_search;
                        } else if (location.search.indexOf('type=code') > -1) {
                            curSite = DBSite.github_search_code;
                        } else if (location.search.indexOf('type=commits') > -1) {
                            curSite = DBSite.github_search_commit;
                        } else if (location.search.indexOf('type=issues') > -1 || location.search.indexOf('type=discussions') > -1) {
                            curSite = DBSite.github_search_issue;
                        } else if (location.search.indexOf('type=registrypackages') > -1) {
                            curSite = DBSite.github_search_package;
                        } else if (location.search.indexOf('type=marketplace') > -1) {
                            curSite = DBSite.github_search_marketplace;
                        } else if (location.search.indexOf('type=topics') > -1) {
                            curSite = DBSite.github_search_topics;
                        } else if (location.search.indexOf('type=wikis') > -1) {
                            curSite = DBSite.github_search_wiki;
                        } else if (location.search.indexOf('type=users') > -1) {
                            curSite = DBSite.github_search_user;
                        }
                    }},
                pager: {
                    type: 1,
                    nextL: '//div[@class="paginate-container"]//a[contains(text(), "Next")]',
                    pageE: 'css;#js-pjax-container .position-relative div[class^="col-lg-"] > div:not(.position-relative):not(.paginate-container)',
                    insertP: ['css;.paginate-container', 1],
                    replaceE: 'css;.paginate-container',
                    scrollD: 3000
                }
            }, //               Github - 用户 Star 列表
            github_issues: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;.js-navigation-container.js-active-navigation-container > div[id^="issue_"]',
                    insertP: ['css;.js-navigation-container.js-active-navigation-container', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 3000
                }
            }, //             Github - Issues 列表 / PR 列表
            github_discussions: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;#repo-content-pjax-container div[data-discussion-hovercards-enabled] > div',
                    insertP: ['css;#repo-content-pjax-container div[data-discussion-hovercards-enabled]', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 3000
                }
            }, //        Github - Discussions 列表
            github_releases: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pagination"]/a[contains(text(), "Next")]',
                    pageE: 'css;.repository-content  >.position-relative > div',
                    insertP: ['css;.repository-content  >.position-relative', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 3000
                }
            }, //           Github - Releases 列表
            github_tags: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pagination"]/a[contains(text(), "Next")]',
                    pageE: 'css;.repository-content > .Box > div.Box-row',
                    insertP: ['css;.repository-content > .Box', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 3000
                }
            }, //               Github - Tags 列表
            github_commits: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="paginate-container"]//a[contains(text(), "Older")]',
                    pageE: 'css;div.js-navigation-container > div',
                    insertP: ['css;div.js-navigation-container', 3],
                    replaceE: 'css;.paginate-container',
                    scrollD: 3000
                }
            }, //            Github - Commits 列表
            github_notifications: {
                pager: {
                    type: 1,
                    nextL: 'css;nav.paginate-container > a[aria-label="Next"]',
                    pageE: 'css;li.notifications-list-item',
                    insertP: ['css;li.notifications-list-item:last-child', 4],
                    replaceE: 'css;nav.paginate-container, .js-notifications-list-paginator-counts',
                    scrollD: 3000
                }
            }, //      Github - Notifications 列表
            github_search: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;ul.repo-list > li',
                    insertP: ['css;ul.repo-list', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //             Github - Search 列表
            github_search_code: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;.code-list > div',
                    insertP: ['css;.code-list', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //        Github - Search 列表 - Code
            github_search_commit: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;#commit_search_results > div',
                    insertP: ['css;#commit_search_results', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //      Github - Search 列表 - Commit
            github_search_issue: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;.issue-list > div > div',
                    insertP: ['css;.issue-list > div', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //       Github - Search 列表 - Issues/Discussions
            github_search_package: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;#package_search_results > div',
                    insertP: ['css;#package_search_results', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //     Github - Search 列表 - Package
            github_search_marketplace: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;.issue-list > div',
                    insertP: ['css;.issue-list', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, // Github - Search 列表 - Marketplace
            github_search_topics: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;.topic-list > div',
                    insertP: ['css;.topic-list', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //      Github - Search 列表 - Topics
            github_search_wiki: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;#wiki_search_results > div:first-child > div',
                    insertP: ['css;#wiki_search_results > div:first-child', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //        Github - Search 列表 - wiki
            github_search_user: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;#user_search_results > div:first-child > div',
                    insertP: ['css;#user_search_results > div:first-child', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //        Github - Search 列表 - user
            stackoverflow: {
                host: 'stackoverflow.com',
                functionStart: function() {if (location.pathname.indexOf('/questions') > -1) {
                    curSite = DBSite.stackoverflow;
                } else if (location.pathname === '/search') {
                    curSite = DBSite.stackoverflow_search;
                } else if (location.pathname === '/tags') {
                    curSite = DBSite.stackoverflow_tags;
                } else if (location.pathname === '/users') {
                    curSite = DBSite.stackoverflow_users;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;a[rel="next"]',
                    pageE: 'css;#questions > div',
                    insertP: ['css;#questions', 3],
                    replaceE: 'css;.pager',
                    scrollD: 1500
                }
            }, //             StackOverflow - Questions
            stackoverflow_tags: {
                pager: {
                    type: 1,
                    nextL: 'css;a[rel="next"]',
                    pageE: 'css;#tags-browser > div',
                    insertP: ['css;#tags-browser', 3],
                    replaceE: 'css;.pager',
                    scrollD: 1500
                }
            }, //        StackOverflow - Tags
            stackoverflow_users: {
                pager: {
                    type: 1,
                    nextL: 'css;a[rel="next"]',
                    pageE: 'css;#user-browser > div:first-child > div',
                    insertP: ['css;#user-browser > div:first-child', 3],
                    replaceE: 'css;.pager',
                    scrollD: 1500
                }
            }, //       StackOverflow - Users
            stackoverflow_search: {
                pager: {
                    type: 1,
                    nextL: 'css;a[rel="next"]',
                    pageE: 'css;.js-search-results > div:first-child > div',
                    insertP: ['css;.js-search-results > div:first-child', 3],
                    replaceE: 'css;.pager',
                    scrollD: 1500
                }
            }, //      StackOverflow - Search
            segmentfault: {
                host: 'segmentfault.com',
                functionStart: function() {locationChange = true;
                    if (location.pathname.indexOf('/questions') > -1) {
                    curSite = DBSite.segmentfault;
                } else if (location.pathname === '/search') {
                    curSite = DBSite.segmentfault_search;
                }},
                pager: {
                    type: 1,
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: 'css;ul.list-group > li',
                    insertP: ['css;ul.list-group', 3],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                }
            }, //              SegmentFault - Questions
            segmentfault_search: {
                pager: {
                    type: 1,
                    nextL: 'css;a[rel="next"]',
                    pageE: 'css;.search-result > section',
                    insertP: ['css;.search-result > div:last-child', 1],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                }
            }, //       SegmentFault - Search
            w3school_cn: {
                host: 'www.w3school.com.cn',
                functionStart: function() {if (location.pathname.split('/').length > 2) {curSite = DBSite.w3school_cn;}},
                insStyle: '#maincontent h1:not(:nth-of-type(1)) {margin-top: 30px;}',
                pager: {
                    type: 1,
                    nextL: function() { // 过滤部分非本页的参考手册
                        let next = document.querySelector('li.next > a')
                        if (next.href.indexOf('/index.') === -1) return next.href;
                        curSite = {SiteTypeID: 0}; return ''
                    },
                    pageE: 'css;#maincontent > *:not(.prenextnav):not(#bpn):not(#tpn)',
                    insertP: ['id("bpn") | //div[@class="prenextnav"][last()]', 1],
                    replaceE: 'css;ul.prenext, #navsecond, title',
                    history: true,
                    forceHTTPS: true,
                    scrollD: 2000
                }
            }, //               W3school
            runoob: {
                host: 'www.runoob.com',
                functionStart: function() {if (location.pathname.split('/').length > 2) {curSite = DBSite.runoob;}},
                insStyle: '#comments, #postcomments, #respond, #footer {display: none !important;} .article-intro h1:not(:nth-of-type(1)) {margin: 30px 0 10px 0;}',
                pager: {
                    type: 1,
                    nextL: function() { // 过滤部分非本页的参考手册
                        let next = document.querySelector('#leftcolumn > a[style]~a')
                        if (next.href.split('/').length === location.href.split('/').length && next.href.split('/')[3] === location.href.split('/')[3]) return next.href;
                        next.href = location.href; curSite = {SiteTypeID: 0}; return ''
                    },
                    pageE: 'css;#content > *',
                    insertP: ['css;#content', 3],
                    replaceE: 'css;.previous-next-links, #leftcolumn, head > title',
                    history: true,
                    forceHTTPS: true,
                    scrollD: 1000
                },
                function: {
                    aF: function() { // 左侧栏高亮当前页面标题
                        let title = document.title.split(' | '); if (title.length > 1) {title = title[0]; document.querySelectorAll('#leftcolumn > a').forEach(function(e){if (e.innerText === title) {e.style = 'background-color: rgb(150, 185, 125); font-weight: bold; color: rgb(255, 255, 255);';}})}
                    }
                }
            }, //                    菜鸟教程
            cnblogs: {
                host: ['www.cnblogs.com', 'zzk.cnblogs.com'],
                functionStart: function() {
                    if (location.host === 'zzk.cnblogs.com') {
                        curSite = DBSite.cnblogs_search;
                    } else if (document.getElementById('post_list')) {
                        curSite = DBSite.cnblogs_list;
                    } else if (location.pathname.split('/').length === 3 && document.querySelector('.topicListFooter')) {
                        curSite = DBSite.cnblogs;
                        if (!document.getElementById('homepage_top_pager')) {
                            document.querySelector('.forFlow').insertAdjacentHTML(getAddTo(2), '<div id="homepage_top_pager" class="topicListFooter"></div>');
                            document.querySelector('.forFlow').insertAdjacentHTML(getAddTo(3), '<div id="homepage_bottom_pager" class="topicListFooter"></div>');
                        }
                    }
                },
                pager: {
                    type: 1,
                    nextL: '//div[@class="topicListFooter"]//a[contains(text(), "下一页")]',
                    pageE: 'css;div.day',
                    insertP: ['css;.topicListFooter:not([id])', 1],
                    replaceE: 'css;.topicListFooter',
                    scrollD: 1000
                }
            }, //                   博客园 - 文章列表（个人）
            cnblogs_list: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pager"]//a[contains(text(), ">")]',
                    pageE: 'css;#post_list > article',
                    insertP: ['css;#post_list', 3],
                    replaceE: 'css;.pager',
                    scrollD: 1000
                }
            }, //              博客园 - 文章列表
            cnblogs_search: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pager"]//a[contains(text(), ">")]',
                    pageE: 'css;div.searchItem',
                    insertP: ['css;#paging_block', 1],
                    replaceE: 'css;.pager',
                    scrollD: 1000
                }
            }, //            博客园 - 搜索页
            zhutix: {
                host: 'zhutix.com',
                functionStart: function() {if (document.getElementById('post-list')) {
                    curSite = DBSite.zhutix;
                } else {
                    curSite = DBSite.zhutix_list;
                }},
                pager: {
                    type: 1,
                    nextL: '//li[@class="next-page"]/a | //div[@class="btn-pager"]/a[contains(text(), "❯")]',
                    pageE: 'css;#post-list > ul > li',
                    insertP: ['css;#post-list > ul', 3],
                    replaceE: 'css;.pagination, .b2-pagenav.post-nav',
                    scrollD: 1500
                }
            }, //          致美化
            zhutix_list: {
                pager: {
                    type: 1,
                    nextL: 'css;li.next-page a',
                    pageE: 'css;#primary-home > div:not(.pagination)',
                    insertP: ['css;.pagination', 1],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                }
            }, //     致美化 - 文章列表
            lanzou: {
                host: /\.lanzou[a-z]/,
                hiddenPN: true,
                pager: {
                    type: 2,
                    nextL: '#filemore',
                    nextTextOf: '更多',
                    isHidden: true,
                    scrollD: 800
                }
            }, //             蓝奏云 - 分享链接列表
            lanzou_: {
                host: 'pc.woozooo.com',
                iframe: true,
                hiddenPN: true,
                pager: {
                    type: 2,
                    nextL: '#filemore > span[onclick]',
                    nextText: '显示更多文件',
                    isHidden: true,
                    scrollD: 800
                }
            }, //            蓝奏云 - 后台
            libgen: {
                host: /libgen/,
                functionStart: function() {if (location.pathname === '/search.php') {curSite = DBSite.libgen;}},
                pager: {
                    type: 1,
                    nextL: '//font/a[contains(text(), "►")]',
                    pageE: 'css;table[rules="rows"] > tbody > tr:nth-of-type(n+2), .paginator+script:not([src])',
                    insertP: ['css;table[rules="rows"] > tbody', 3],
                    replaceE: '//td[./font/a[contains(text(), "►")]]',
                    scriptT: 2,
                    history: true,
                    scrollD: 2000
                }
            }, //               学术
            pubmed: {
                host: 'pubmed.ncbi.nlm.nih.gov',
                pager: {
                    type: 2,
                    nextL: 'button.load-button.next-page',
                    nextText: 'Show more',
                    scrollD: 1500
                }
            }, //               学术
            google_scholar: {
                pager: {
                    type: 1,
                    nextL: '//a[./span[contains(@class, "next")]]',
                    pageE: 'css;#gs_res_ccl_mid > *',
                    insertP: ['css;#gs_res_ccl_mid', 3],
                    replaceE: 'id("gs_n")',
                    scriptT: 1,
                    scrollD: 2000
                }
            }, //       谷歌学术
            bing_academic: {
                insStyle: 'li.aca_algo_count {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: 'css;a.sb_pagN',
                    pageE: 'css;#b_results > li.aca_algo',
                    insertP: ['css;#b_results .b_pag', 1],
                    replaceE: 'css;#b_results .b_pag',
                    scrollD: 1000
                }
            }, //        必应学术
            baidu_xueshu: {
                host: 'xueshu.baidu.com',
                functionStart: function() {if (location.pathname === '/s') {
                    curSite = DBSite.baidu_xueshu;
                    } else if (location.pathname.indexOf('journal/navigation') > -1) {
                    curSite = DBSite.baidu_xueshu_journal;
                } else if (location.pathname.indexOf('paper/show') > -1) {
                    curSite = DBSite.baidu_xueshu_paper;
                }},
                pager: {
                    type: 1,
                    nextL: 'id("page")/a[./i[@class="c-icon-pager-next"]]',
                    pageE: 'css;#bdxs_result_lists > div.result',
                    insertP: ['css;#bdxs_result_lists', 3],
                    replaceE: 'css;#page',
                    history: true,
                    scrollD: 1000
                }
            }, //         百度学术
            baidu_xueshu_journal: {
                pager: {
                    type: 1,
                    nextL: 'css;a.res-page-next',
                    pageE: 'css;#journaldetail > div',
                    insertP: ['css;#journaldetail', 3],
                    replaceE: 'css;.res-page',
                    history: true,
                    scrollD: 1000
                }
            }, // 百度学术
            baidu_xueshu_paper: {
                pager: {
                    type: 2,
                    nextL: 'div:not([style*="display: none"]) > .more_btn',
                    nextText: '加载更多',
                    scrollD: 1000
                }
            }, //   百度学术
            so_xueshu: {
                host: 'xueshu.so.com',
                functionStart: function() {if (location.pathname === '/s') {curSite = DBSite.so_xueshu;}},
                pager: {
                    type: 1,
                    nextL: 'css;a#snext',
                    pageE: 'css;ul.list > li',
                    insertP: ['css;ul.list', 3],
                    replaceE: 'css;#page',
                    scrollD: 1000
                }
            }, //            360 学术
            wikihow: {
                host: ['www.wikihow.com', 'zh.wikihow.com'],
                functionStart: function() {if (location.pathname.indexOf('/Category:') > -1) {
                    curSite = DBSite.wikihow;
                } else if (location.pathname.indexOf('/wikiHowTo') > -1 && location.search.indexOf('?search=') > -1) {
                    curSite = DBSite.wikihow_search;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;a.pag_next',
                    pageE: 'css;#cat_all > .cat_grid > div',
                    insertP: ['css;#cat_all > .cat_grid', 3],
                    replaceE: 'css;#large_pagination',
                    scriptT: 4,
                    scrollD: 2000
                }
            }, //         指南
            wikihow_search: {
                pager: {
                    type: 1,
                    nextL: 'css;#searchresults_footer > a.buttonright',
                    pageE: 'css;#searchresults_list > a',
                    insertP: ['css;#searchresults_list', 3],
                    replaceE: 'css;#searchresults_footer',
                    scrollD: 3000
                }
            }, //  指南 - 搜索页
            afreecatv: {
                host: 'www.afreecatv.com',
                pager: {
                    type: 2,
                    nextL: '.btn-more > button',
                    interval: 2000,
                    scrollD: 1000
                }
            }, //          直播
            greasyfork: {
                host: 'greasyfork.org',
                functionStart: function() {if (/\/scripts$/.test(location.pathname) || location.pathname.indexOf('/scripts/by-site/') > -1) {
                    curSite = DBSite.greasyfork;
                } else if (/\/feedback$/.test(location.pathname)) {
                    curSite = DBSite.greasyfork_feedback;
                } else if (location.pathname.indexOf('/discussions') > -1 && !(/\/\d+/.test(location.pathname))) {
                    curSite = DBSite.greasyfork_discussions;
                }},
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;ol#browse-script-list > li',
                    insertP: ['css;ol#browse-script-list', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1300
                }
            }, //             脚本
            greasyfork_feedback: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;.script-discussion-list > div',
                    insertP: ['css;.script-discussion-list', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1800
                }
            }, //    脚本 - 反馈页
            greasyfork_discussions: {
                pager: {
                    type: 1,
                    nextL: 'css;a.next_page',
                    pageE: 'css;.discussion-list > div',
                    insertP: ['css;.discussion-list', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1300
                }
            }, // 脚本 - 讨论页
            smzdm: {
                host: ['www.smzdm.com', 'search.smzdm.com'],
                 functionStart: function() {if (location.host === 'search.smzdm.com' || location.pathname.indexOf('/fenlei/') > -1) {
                    curSite = DBSite.smzdm;
                 }},
                pager: {
                    type: 1,
                    nextL: '//ul[@class="pagenation-list"]//a[contains(text() ,"下一页")] | //ul[@class="pagenation-list"]/li[contains(@class, "next-page")]/a',
                    pageE: 'css;#feed-main-list > li',
                    insertP: ['css;#feed-main-list', 3],
                    replaceE: 'css;ul.pagenation-list',
                    scrollD: 1500
                }
            }, //           什么值得买 - 分类/搜索页
            ruyile_xuexiao: {
                host: 'www.ruyile.com',
                functionStart: function() {
                    if (location.pathname === '/xuexiao/') {
                        curSite = DBSite.ruyile_xuexiao;
                    } else if (location.pathname === '/data/') {
                        curSite = DBSite.ruyile_data;
                    } else if (location.pathname === '/shijuan/') {
                        curSite = DBSite.ruyile_shijuan;
                    }},
                pager: {
                    type: 1,
                    nextL: '//div[@class="fy"]/a[contains(text(), "下一页")]',
                    pageE: 'css;.xxlb > .sk',
                    insertP: ['css;.xxlb', 3],
                    replaceE: 'css;.fy',
                    scrollD: 1000
                }
            }, //  如意了教育 - 学校
            ruyile_data: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="fy"]/a[contains(text(), "下一页")]',
                    pageE: 'css;.m1_z > .lbk',
                    insertP: ['css;.page', 1],
                    replaceE: 'css;.fy',
                    scrollD: 1000
                }
            }, //     如意了教育 - 数据
            ruyile_shijuan: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="fy"]/a[contains(text(), "下一页")]',
                    pageE: 'css;.m1_z > .m2_lb',
                    insertP: ['css;.page', 1],
                    replaceE: 'css;.fy',
                    scrollD: 1000
                }
            }, //  如意了教育 - 试卷
            netbian: {
                host: 'pic.netbian.com',
                insStyle: 'li.nextpage {display: none !important;}',
                pager: {
                    type: 1,
                    nextL: '//div[@class="page"]/a[contains(text(),"下一页")]',
                    pageE: 'css;.slist ul > li:not(.nextpage)',
                    insertP: ['css;.slist ul', 3],
                    replaceE: 'css;.page',
                    scrollD: 1000
                }
            }, //           彼岸图网
            ioliu: {
                host: 'bing.ioliu.cn',
                functionStart: function() {if (location.pathname.indexOf('/photo/') === -1 && location.pathname.indexOf('.html') === -1) {curSite = DBSite.ioliu; document.head.appendChild(document.createElement('base')).target = '_blank';}},
                insStyle: '.progressive--not-loaded {filter: none !important;}',
                pager: {
                    type: 1,
                    nextL: '//div[@class="page"]/a[contains(text(), "下一页")]',
                    pageE: 'css;body > .container > div.item',
                    insertP: ['css;body > .container', 3],
                    replaceE: 'css;.page',
                    scrollD: 1000
                }
            }, //             必应壁纸
            nastol: {
                host: 'www.nastol.com.ua',
                pager: {
                    type: 1,
                    nextL: '//a[./span[@class="nav-next"]]',
                    pageE: 'css;#dle-content > div',
                    insertP: ['css;#dle-content > noindex', 1],
                    replaceE: 'css;.navigation',
                    scrollD: 1000
                }
            }, //            壁纸
            hdqwalls: {
                host: 'hdqwalls.com',
                pager: {
                    type: 1,
                    nextL: 'css;a#next',
                    pageE: 'css;.wallpapers_container > div.wall-resp',
                    insertP: ['css;div.pagination_container, .wallpapers_container > div.wall-resp+div:not(.wall-resp)', 1],
                    replaceE: 'css;ul.pagination',
                    scrollD: 1000
                }
            }, //          壁纸
            fnvshen: {
                host: 'www.fnvshen.com',
                functionStart: function() {
                    if (location.pathname.indexOf('/gallery/') > -1 || location.pathname.indexOf('/tag/') > -1) {
                        curSite = DBSite.fnvshen;
                    } else if (location.pathname.indexOf('/g/') > -1) {
                        curSite = DBSite.fnvshen_g;
                    } else if (/\/article\/\d+\//.test(location.pathname)) {
                        curSite = DBSite.fnvshen_article;
                    } else if (location.pathname.indexOf('/article/') > -1) {
                        curSite = DBSite.fnvshen_article_list;
                }},
                pager: {
                    type: 1,
                    nextL: '//div[@class="pagesYY"]//a[contains(text(), "下一页")]',
                    pageE: 'css;#listdiv > ul > li',
                    insertP: ['css;#listdiv > ul', 3],
                    replaceE: 'css;.pagesYY',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-original]', 'data-original']
                }
            }, //             宅男女神 - 分类页
            fnvshen_g: {
                insStyle: '.yalayi_box {display: none !important; margin: -4px 0 !important;}',
                pager: {
                    type: 1,
                    nextL: 'id("pages")/a[contains(text(), "下一页")]',
                    pageE: 'css;#hgallery > img',
                    insertP: ['css;#hgallery', 3],
                    replaceE: 'css;#pages',
                    scrollD: 1000
                }
            }, //           宅男女神 - 图片页
            fnvshen_article_list: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="pagesYY"]//a[contains(text(), "下一页")]',
                    pageE: 'css;li.other_girlli',
                    insertP: ['//ul[./li[@class="other_girlli"]]', 3],
                    replaceE: 'css;.pagesYY',
                    scrollD: 1000
                }
            }, //宅男女神 - 文章列表
            fnvshen_article: {
                pager: {
                    type: 1,
                    nextL: 'css;.pagesYY a.cur+a',
                    pageE: 'css;#articleDiv',
                    insertP: ['css;#articleDiv', 5],
                    replaceE: 'css;.pagesYY',
                    scrollD: 1000
                }
            }, //     宅男女神 - 文章内
            xiurenji: {
                host: 'www.xiurenji.vip',
                functionStart: function() {insStyle('img[src$=".gif"]:not([src*="logo"]) {display: none !important;}');
                    if (location.pathname.indexOf('.html') > -1 && location.pathname.indexOf('/index') === -1) {
                        curSite = DBSite.xiurenji;
                    } else if (location.pathname.indexOf('search') > -1) {
                        curSite = DBSite.xiurenji_search;
                    } else {
                        curSite = DBSite.xiurenji_list;
                }},
                pager: {
                    type: 1,
                    nextL: '//div[@class="page"]/a[contains(text(), "后")]',
                    pageE: 'css;div.img > p > *',
                    insertP: ['css;div.img > p', 3],
                    replaceE: 'css;.page',
                    scrollD: 2000
                }
            }, //            秀人网 - 图片页
            xiurenji_list: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="page"]/a[contains(text(), "下页")]',
                    pageE: 'css;td >.tp2 > *',
                    insertP: ['css;td >.tp2', 3],
                    replaceE: 'css;.page',
                    scrollD: 1000
                }
            }, //       秀人网 - 分类页
            xiurenji_search: {
                pager: {
                    type: 1,
                    nextL: 'css;.page > a.current+a',
                    pageE: 'css;.node > *',
                    insertP: ['css;.node', 3],
                    replaceE: 'css;.page',
                    scrollD: 1000
                }
            }, //     秀人网 - 搜索页
            tujigu: {
                host: 'www.tujigu.net',
                functionStart: function() {
                    if (location.pathname.indexOf('/a/') > -1) {
                        curSite = DBSite.tujigu_a;
                    } else if (location.pathname != '/' && location.pathname.indexOf('/search/') === -1) {
                        curSite = DBSite.tujigu;
                }},
                pager: {
                    type: 1,
                    nextL: 'id("pages")/a[contains(text(), "下一页")]',
                    pageE: 'css;.hezi > ul > li',
                    insertP: ['//div[@class="hezi"][last()]/ul', 3],
                    replaceE: 'css;#pages',
                    scrollD: 1000
                }
            }, //              图集谷 - 分类页
            tujigu_a: {
                pager: {
                    type: 1,
                    nextL: 'id("pages")/a[contains(text(), "下一页")]',
                    pageE: 'css;.content > img',
                    insertP: ['css;.content', 3],
                    replaceE: 'css;#pages',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[original]', 'original']
                }
            }, //            图集谷 - 图片页
            mvtui: {
                host: 'mvtui.com',
                functionStart: function() {if (location.pathname.indexOf('.html') > -1) {curSite = DBSite.mvtui;} else {curSite = DBSite.mvtui_list;}},
                pager: {
                    type: 1,
                    nextL: 'css;.article-paging span.current+a',
                    pageE: 'css;.article-content > p',
                    insertP: ['css;.article-paging', 1],
                    replaceE: 'css;.article-paging',
                    scrollD: 3000
                }
            }, //               美女推 - 图片页
            mvtui_list: {
                pager: {
                    type: 1,
                    nextL: 'css;li.next-page a',
                    pageE: 'css;#posts > div',
                    insertP: ['css;#posts', 3],
                    replaceE: 'css;.pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    pF: [0, 'img[data-src]', 'data-src']
                }
            }, //          美女推 - 分类页
            mm131: {
                host: 'www.mm131.net',
                functionStart: function() {
                    if (location.pathname.indexOf('.html') > -1) {
                        curSite = DBSite.mm131_a;
                    } else {
                        curSite = DBSite.mm131;
                }},
                pager: {
                    type: 1,
                    nextL: '//dd[@class="page"]/a[contains(text(), "下一页")]',
                    pageE: 'css;dl.list-left > dd:not([class="page"])',
                    insertP: ['css;.page', 1],
                    replaceE: 'css;.page',
                    scrollD: 1000
                }
            }, //               MM131 - 分类页
            mm131_a: {
                pager: {
                    type: 1,
                    nextL: '//div[@class="content-page"]/a[contains(text(), "下一页")]',
                    pageE: 'css;.content-pic img',
                    insertP: ['css;.content-pic', 3],
                    replaceE: 'css;.content-page',
                    scrollD: 2000
                }
            } //              MM131 - 图片页
        };
        // 生成 SiteTypeID
        setSiteTypeID();
        // 用于脚本判断（针对部分特殊的网站）
        SiteType = {
            BAIDU_TIEBA: DBSite.baidu_tieba.SiteTypeID,
            GAMERSKY_GL: DBSite.gamersky_gl.SiteTypeID
        };
    }


    if (webType != 1) {
        if (webType === 2) { // < 所有 Discuz!论坛 >
            if (document.querySelector('body[id="nv_forum"][class^="pg_"][onkeydown*="27"]')) {
                switch (document.querySelector('body[id="nv_forum"][class^="pg_"][onkeydown*="27"]').className) {
                    case 'pg_forumdisplay': // < 各版块帖子列表 >
                        discuzForum(); break;
                    case 'pg_viewthread': //   < 帖子内 >
                        if (GM_getValue('menu_discuz_thread_page')) curSite = DBSite.discuz_thread; break;
                    case 'pg_guide': //        < 导读帖子列表等 >
                        curSite = DBSite.discuz_guide; break;
                    case 'pg_collection': //   < 淘贴列表 >
                        curSite = DBSite.discuz_collection; break;
                }
            }
            // 如果上面没有匹配的则继续                  < 搜索结果 >
            if (curSite.SiteTypeID === 0) {
                if (location.pathname.indexOf('search') > -1 || document.querySelector('body[id="nv_search"][onkeydown*="27"]')) {
                    curSite = DBSite.discuz_search;
                }
            }
            // 如果上面没有匹配的则继续
            if (curSite.SiteTypeID === 0) {
                if (location.pathname.indexOf('.html') > -1) { //                   判断是不是静态网页（.html 结尾）
                    if (location.pathname.indexOf('/forum-') > -1) { //             < 各版块帖子列表 >
                        discuzForum();
                    } else if (location.pathname.indexOf('/thread-') > -1) { //     < 帖子内 >
                        if (GM_getValue('menu_discuz_thread_page')) curSite = DBSite.discuz_thread;
                    }
                }
            }
            // 如果上面没有匹配的则继续
            if (curSite.SiteTypeID === 0) {
                if (location.search.indexOf('mod=forumdisplay') > -1 || location.pathname.indexOf('forumdisplay.php') > -1) { //      < 各版块帖子列表 >
                    discuzForum();
                } else if (location.search.indexOf('mod=viewthread') > -1 || location.pathname.indexOf('viewthread.php') > -1) { // < 帖子内 >
                    if (GM_getValue('menu_discuz_thread_page')) curSite = DBSite.discuz_thread;
                } else if (location.search.indexOf('mod=guide') > -1) { //      < 导读帖子列表 >
                    curSite = DBSite.discuz_guide;
                } else if(location.search.indexOf('mod=space') > -1 && location.search.indexOf('do=thread') > -1) { // 别人的主题/回复
                    curSite = DBSite.discuz_youspace;
                } else if (location.search.indexOf('mod=collection') > -1) { // < 淘贴列表 >
                    curSite = DBSite.discuz_collection;
                } else if (document.getElementById('threadlist')) { //          < 部分论坛的各板块 URL 是自定义的 >
                    discuzForum();
                } else if (document.getElementById('postlist')) { //            < 部分论坛的帖子内 URL 是自定义的 >
                    if (GM_getValue('menu_discuz_thread_page')) curSite = DBSite.discuz_thread;
                }
            }
        } else if (webType === 3) { // < 所有 Flarum 论坛 >
            DBSite.flarum.functionStart()
        } else if (webType === 4) { // < 所有 phpBB 论坛 >
            DBSite.phpbb.functionStart()
        } else if (webType === 10) { //< 所有 Xiuno 论坛 >
            DBSite.xiuno.functionStart()
        } else if (webType === 5) { // < 所有使用 WordPress DUX 主题的网站 >
            if (location.pathname.indexOf('.html') === -1) curSite = DBSite.dux;
            if (location.host === 'apphot.cc') curSite.pager.scrollD = 2500; // 对于速度慢的网站，需要增加翻页触发点
        } else if (webType === 6) { // < 所有使用 WordPress XIU 主题的网站 >
            if (location.pathname.indexOf('.html') === -1) curSite = DBSite.dux;
            curSite.function = {bF: src_bF, pF: [0, 'img.thumb[data-original]', 'data-original']} // 修改插入前函数
        } else if (webType === 7) { // < 所有使用 WordPress D8 主题的网站 >
            if (location.pathname.indexOf('.html') === -1) curSite = DBSite.dux;
            delete curSite.function; //  不需要插入前函数
        } else if (webType === 8) { // < 所有使用 WordPress Begin 主题的网站 >
            if (location.search.slice(0,3) === '?s=') {
                curSite = DBSite.begin_search;
            } else if (location.pathname.indexOf('.html') === -1) {
                curSite = DBSite.begin;
            }
        } else if (webType === 9) { // < 所有使用 笔趣阁 模板的小说网站 >
            DBSite.biquge.functionStart()
        }
    }

    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
    pausePageEvent(); // 左键双击网页空白处暂停翻页

    if (locationChange) { // 对于使用 pjax 技术的网站，需要监听 URL 变化来重新判断翻页规则
        nowLocation = location.href
        addLocationchange(); // 自定义 locationChange 事件
        if (webType === 1) {
            window.addEventListener('locationChange', function(){
                let history = true;
                if (curSite.SiteTypeID > 0 && curSite.pager.history) history = curSite.pager.history(); // 解决 locationChange 与 history 冲突的问题，只有返回 true 才会重置规则+页码
                if (history && nowLocation != location.href) {
                    nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                    registerMenuCommand(); // 重新判断规则
                    curSite.pageUrl = ''; // 下一页URL
                    pageLoading(); // 自动无缝翻页

                    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                    pausePageEvent(); // 左键双击网页空白处暂停翻页
                }
            })
        } else if (webType === 3) {
            window.addEventListener('locationChange', function(){
                if (nowLocation != location.href) {
                    nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                    DBSite.flarum.functionStart(); // 重新判断规则
                    pageLoading(); // 自动无缝翻页

                    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                    pausePageEvent(); // 左键双击网页空白处暂停翻页
                }
            })
        }
    }
    if (curSite.insStyle) insStyle(curSite.insStyle)

    curSite.pageUrl = ''; // 下一页URL
    //console.log(curSite);
    pageLoading(); // 自动无缝翻页


    // [Discuz! 论坛] 判断各版块帖子列表类型
    function discuzForum() {
        if (document.querySelector('#pgbtn, .pgbtn')) { //          如果各版块帖子列表已存在这个元素，说明自带了无缝翻页
            return
        } else if (document.getElementById('autopbn')) { //         判断是否有 [下一页] 按钮
            curSite = DBSite.discuz_forum;
        } else if (document.getElementById('waterfall')) { //       判断是否为图片模式
            curSite = DBSite.discuz_waterfall; waterfallStyle(); // 图片模式列表样式预处理
        } else {
            curSite = DBSite.discuz_guide;
        }
    }
    // [Discuz! 论坛] 图片模式列表样式预处理
    function waterfallStyle() {
        let width = document.querySelector('#waterfall > li:first-child').style.width;
        insStyle(`#waterfall {height: auto !important; width: 100% !important;} #waterfall > li {width: ${width} !important; float: left !important; position: inherit !important; left: auto !important; top: auto !important;}`);
    }


    // 插入 Style 样式
    function insStyle(style) {
        document.lastElementChild.appendChild(document.createElement('style')).textContent = style;
    }


    // 通用型插入前函数（加载图片）
    function src_bF(pageElems, css) {
        pageElems.forEach(function (one) {
            if (css[0] == 0) { // src 图片
                one.querySelectorAll(css[1]).forEach(function (now) {
                    now.src = now.getAttribute(css[2]);
                });
            } else if (css[0] == 1) { // 背景图片
                one.querySelectorAll(css[1]).forEach(function (now) {
                    now.style.backgroundImage = 'url("' + now.getAttribute(css[2]) + '")';
                });
            }
        });
        return pageElems
    }


    // [头条搜索] 的插入前函数（过滤相关搜索）
    function toutiao_bF(pageElems) {
        for (let i = 0; i < pageElems.length; i++) {
            let now = pageElems[i].querySelector('div[class*="-header"]')
            if (now && now.textContent === '相关搜索') {
                pageElems.splice(i,1)
            }
        }
        return pageElems
    }


    // [Startpage] 获取下一页地址
    function startpage_nextL() {
        let form = getXpath('//div[contains(@class, "pagination ")]/form[./button[@class="pagination__next-prev-button next"]]');
        if (form) {
            let action = form.action, value = ''; // 获取提交表单 URL
            form.querySelectorAll('input[name]').forEach(function(input) {value += input.name + '=' + input.value + '&';}) // 生成表单参数
            value = encodeURI(value.replace(/&$/,'')); // 清理最后一个 & 符号，并替换页码
            if (action && value) return (action + '?' + value)
        }
        return '';
    }


    // [百度贴吧]（发帖按钮点击事件）
    function baidu_tieba_1() {
        let button = document.querySelector('.tbui_aside_fbar_button.tbui_fbar_post > a');
        if (button) {
            button.remove();
            document.querySelector('li.tbui_aside_fbar_button.tbui_fbar_down').insertAdjacentHTML(getAddTo(4), '<li class="tbui_aside_fbar_button tbui_fbar_post"><a href="javascript:void(0);" title="因为 [自动无缝翻页] 的原因，请点击该按钮发帖！"></a></li>')
            button = document.querySelector('.tbui_aside_fbar_button.tbui_fbar_post > a');
            if (button) {
                button.onclick = function(){
                    let button2 = document.querySelector('div.edui-btn.edui-btn-fullscreen.edui-btn-name-portrait');
                    if (button2) {
                        button2.click();
                    } else {
                        alert('提示：登录后才能发帖！');
                    }
                    return false;
                }
            }
        }
    }
    // [百度贴吧] 的插入前函数（加载图片）
    function baidu_tieba_bF(pageElems) {
        pageElems.forEach(function (one) {
            one.querySelectorAll('img.threadlist_pic[data-original]').forEach(function (now) {
                now.src = now.dataset.original;
                now.style.display = 'inline';
            })
        });
        return pageElems
    }
    // [百度贴吧] 获取下一页地址
    function baidu_tieba_nextL() {
        let next = document.querySelector('a.next.pagination-item');
        if (next != null && next.nodeType === 1 && next.href && next.href.slice(0,4) === 'http') {
            var url = next.href + '&pagelets=frs-list%2Fpagelet%2Fthread&pagelets_stamp=' + new Date().getTime();
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url;
            getPageElems(curSite.pageUrl);
        };
    }
    // [百度贴吧] 插入数据
    function baidu_tieba_insertE(newBody, type) {
        if (!newBody) return
        let pageElems = getAll(curSite.pager.pageE, newBody, newBody),
            toElement = getAll(curSite.pager.insertP[0])[0];
        if (pageElems.length >= 0) {
            // 执行插入前函数
            pageElems = curSite.function.bF(pageElems);
            // 插入位置
            let addTo = getAddTo(curSite.pager.insertP[1]);
            // 获取 <script> 内容
            const scriptElems = getAll('//script', newBody, newBody);
            let scriptText = '';
            for (let i = 0; i < scriptElems.length; i++) {
                if (scriptElems[i].textContent.indexOf('Bigpipe.register("frs-list/pagelet/thread_list"') > -1) {
                    scriptText = scriptElems[i].textContent.replace('Bigpipe.register("frs-list/pagelet/thread_list", ','');
                    break
                }
            }
            if (scriptText) {
                scriptText = scriptText.slice(0, scriptText.indexOf(').')) // 获取主体内容
                let scriptJSON = JSON.parse(scriptText).content; //           字符串转 JSON
                var temp_baidu_tieba = document.createElement('div'); temp_baidu_tieba.innerHTML = scriptJSON; // 字符串转 Element 元素
                pageElems = curSite.function.bF(getAll(curSite.pager.pageE, temp_baidu_tieba, temp_baidu_tieba)); // 插入前执行函数
                pageElems.forEach(function (one) {toElement.insertAdjacentElement(addTo, one);}); // 插入元素
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
                // 替换元素
                let oriE = document.querySelectorAll(curSite.pager.pageE.replace('css;', '')),
                    repE = getAll(curSite.pager.replaceE, temp_baidu_tieba, temp_baidu_tieba);
                if (oriE.length === repE.length) {
                    for (let i = 0; i < oriE.length; i++) {
                        oriE[i].outerHTML = repE[i].outerHTML;
                    }
                }
            }
        }
    }


    // [NGA(玩家社区)] 的插入后函数（加载各版块帖子列表样式）
    function nga_thread_aF() {
        document.body.appendChild(document.createElement('script')).textContent = 'commonui.topicArg.loadAll();';
    }


    // [V2EX] 的插入后函数（新标签页打开链接）
    function v2ex_aF(css) {
        let links = document.querySelectorAll(css);if (!links) return
        links.forEach(function (_this) {_this.target = '_blank';});
    }


    // [龙的天空] 获取下一页地址
    function lkong_nextL() {
        let next = document.querySelector('li.ant-pagination-next'), page;
        if (next && next.getAttribute('aria-disabled') === 'false') {
            page = document.querySelector('li.ant-pagination-item-active[title]');
            if (page && page.title) {
                if (curSite.pager.interval) {
                    let _SiteTypeID = curSite.SiteTypeID; curSite.SiteTypeID = 0;
                    setTimeout(function(){curSite.SiteTypeID = _SiteTypeID;}, curSite.pager.interval)
                }
                return (location.origin + location.pathname + '?page=' + ++page.title);
            }
        }
        return '';
    }


    // [3DM MOD] 获取下一页地址
    function _3dmgame_mod_nextL() {
        let nextNum = getXpath('//li[@class="page-list active"]/following-sibling::li[contains(@class, "page-list")]/a');
        var url = '';
        if (nextNum && nextNum.textContent) {
            nextNum = 'Page=' + nextNum.textContent;
            if (location.search) {
                let search = location.search.replace(/(&)?Page=\d+(&)?/, '');
                if (search === '?') {
                    url += location.origin + location.pathname + search + nextNum;
                } else {
                    url += location.origin + location.pathname + search + '&' + nextNum;
                }
            } else {
                url += location.origin + location.pathname + '?' + nextNum;
            }
        }
        //console.log(url)
        return url
    }


    // [游民星空-攻略] 的插入前函数（移除下一页底部的 "更多相关内容请关注：xxx" 文字）
    function gamersky_gl_bF(pageElems) {
        pageElems.forEach(function (one) {
            if (one.tagName === 'P' && one.textContent.indexOf('更多相关内容请关注') > -1) {one.style.display = 'none';}
        });
        return pageElems
    }


    // [NexusMods] 获取下一页地址
    function nexusmods_nextL() {
        if (document.querySelector('.nexus-ui-blocker')) return
        let modList;
        if (location.pathname.indexOf('/news') > -1) {modList = RH_NewsTabContent;} else {modList = RH_ModList;}
        let out_items = JSON.stringify(modList.out_items).replace(/{|}|"/g,''),
            nextNum = getXpath('//div[contains(@class, "pagenav")][1]//a[contains(@class, "page-selected")]/parent::li/following-sibling::li/a'),
            categories = modList.out_items.categories, categoriesUrl = '';
        var url = '';
        if (nextNum && nextNum.innerText) {
            nextNum = nextNum.innerText;
            if (out_items.indexOf('page:') > -1) {
                out_items = out_items.replace(/page:\d+/, `page:${nextNum}`)
            } else {
                out_items += `,page:${nextNum}`;
            }
            if (categories && categories != []) {
                for (let i = 0; i < categories.length; i++) {
                    categoriesUrl += `,categories[]:${categories[i]}`
                }
                categoriesUrl = categoriesUrl.replace(/,/,'');
                if (out_items.indexOf('categories:') > -1) {
                    out_items = out_items.replace(/categories:\[.*\]/, categoriesUrl)
                }
            }
            url = `https://www.nexusmods.com${modList.uri}?RH_${modList.id}=${out_items}`
            //console.log(nextNum, url, curSite.pageUrl, out_items)
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url;
            //console.log(nextNum, curSite.pageUrl, out_items)
            getPageElems(curSite.pageUrl)
        }
    }
    // [NexusMods] 插入数据
    function nexusmods_insertE(newBody, type) {
        if (!newBody) return
        let pageElems = getAll(curSite.pager.pageE, newBody, newBody), // 主体元素
            toElement = getAll(curSite.pager.insertP[0])[0], // 插入位置的元素
            addTo = getAddTo(curSite.pager.insertP[1]); // 插入位置
        // 添加下载数据
        pageElems.forEach(function (one) {
            let now = one.querySelector('.mod-tile-left');
            if (now) {
                let downloadCount = now.querySelector('.downloadcount > span.flex-label');
                if (downloadCount) {
                    //console.log(now.dataset.gameId, now.dataset.modId)
                    if (GlobalModStats[now.dataset.gameId] && GlobalModStats[now.dataset.gameId][now.dataset.modId]) {
                        downloadCount.textContent = shortFormat(parseInt(GlobalModStats[now.dataset.gameId][now.dataset.modId].total));
                    }
                }
            }
        });
        // 插入网页
        pageElems.forEach(function (one) {toElement.insertAdjacentElement(addTo, one);});
        // 当前页码 + 1
        pageNum.now = pageNum._now + 1
        // 替换元素
        let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
            repE = getAll(curSite.pager.replaceE, newBody, newBody);
        if (oriE.length === repE.length) {
            for (let i = 0; i < oriE.length; i++) {
                oriE[i].outerHTML = repE[i].outerHTML;
            }
        }
    }


    // [cs_rin_ru] 各版块帖子列表的插入前函数（过滤置顶帖子）
    function cs_rin_ru_bF(pageElems) {
        for (let i = 0; i < pageElems.length; i++) {
            if (pageElems[i].textContent.replace(/\n|	/g,'') === 'Topics') {
                pageElems.splice(0,i+1);
                break;
            }
        }
        return pageElems
    }


    // [bilibili_search] 获取下一页地址
    function bilibili_search_nextL() {
        if (!location.search) return
        let pageActive = 1, pageLast = parseInt(document.querySelector('li.page-item.last').innerText);
        if (/page=\d+/.test(location.search)) {
            pageActive = parseInt(/page=\d+/.exec(location.search)[0].replace('page=',''))
        }
        if (pageActive <= pageLast) {
            if (/page=\d+/.test(location.search)) {
                return (location.origin + location.pathname + location.search.replace(/page=\d+/,`page=${pageActive+1}`))
            } else {
                return (location.origin + location.pathname + location.search + `&page=${pageActive+1}`)
            }
        }
    }
    // [bilibili_search] 插入后函数（加载图片）
    function bilibili_search_aF() {
        let result = __INITIAL_STATE__.flow[__INITIAL_STATE__.flow.fields[0]].result;
        if (result.length > 0) {
            let imgArr = document.querySelectorAll('.img > .lazy-img > img[src=""]');
            if (imgArr.length > 0) {
                for (let i = 0; i < imgArr.length; i++) {
                    imgArr[i].src = result[i].pic;
                }
            }
        }
    }


    // [Anime1] 获取下一页内容（叠加）
    function anime1_nextL() {
        let next = document.getElementById('tablepress-1_next');
        if (next && next.className.indexOf('disabled') === -1) {
            let oldList = document.querySelector('tbody.row-hover');
            if (oldList) {
                // 将当前列表存为变量
                oldList = oldList.innerHTML;
                // 点击下一页
                next.click();
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
                // 插入到列表头部
                document.querySelector('tbody.row-hover').insertAdjacentHTML('afterbegin', oldList);
            }
        }
    }


    // [SkrBT] 获取下一页地址
    function skrbt_nextL() {
        let page = document.querySelector('a[onclick][aria-label="Next"]');
        if (page) {page = /(?<=\()\d+(?=\))/.exec(page.onclick)[0];} else {return '';} // 获取下一页页码
        if (page) {
            let action = document.getElementById('search-form').action, value = ''; // 获取提交表单 URL
            document.querySelectorAll('#search-form input[name]').forEach(function(input) {value += input.name + '=' + input.value + '&';}) // 生成表单参数
            value = encodeURI(value.replace(/&$/,'').replace(/p=\d+/,'p=' + page)); // 清理最后一个 & 符号，并替换页码
            if (action && value) return (action + '?' + value)
        }
        return '';
    }


    // [BTHaha] 的插入前函数（隐藏底部元素）
    function bthaha_bF(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.querySelector('[id^="list_top"], [id^="list_bottom"]')
            if (now) {one.hidden = true;}
        });
        return pageElems
    }


    // [射手网] 获取下一页地址
    function assrt_nextL() {
        let nextXPAHT = '//a[@id="pl-nav"][contains(text(), ">")]'
        let url = getXpath(nextXPAHT);
        if (url) {
            url = /(?<=\()\d+(?=,)/.exec(url.href)[0]
            if (url) {
                return (location.origin + location.pathname + location.search.replace(/(&)?page=\d+$/,'') + '&page=' + url);
            }
        }
        return '';
    }


    // [LRepacks] 的插入前函数（调整 class）
    function lrepacks_bF(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.querySelector('.slideUp, .elementFade')
            if (now) {
                now.className = now.className.replace('slideUp','slideUpRun').replace('elementFade','elementFadeRun');
            }
        });
        return pageElems
    }


    // [漫画狂] 获取下一页地址
    function cartoonmad_nextL() {
        let nextXPAHT = '//a[@class="pages"][contains(text(),"下一頁")]',
            nextPXPATH = '//a[@class="pages"][contains(string(),"下一話")]'
        let url = getXpath(nextXPAHT);
        if (url) {
            if (url.getAttribute('href') === 'thend.asp') {
                url = getXpath(nextPXPATH)
                if (url) return url.href;
                pausePage = false;
                GM_notification({text: `注意：该网站早期漫画（如海贼王、柯南）因为网站自身问题而无法翻至下一话（仅限于显示为 [第 X 卷]/[下一卷] 的）。\n因此需要手动去 [目录页] 进入下一卷！`, timeout: 10000});
            } else {
                return url.href;
            }
        }
        return '';
    }


    // [漫画猫] 初始化（显示本话所以图片）
    function manhuacat_init() {
        let _img = '';
        for (let now of img_data_arr) {
            _img += `<img src="${asset_domain}${img_pre}${now}">`;
        }
        document.querySelector('.img-content > img').remove();
        document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中

    }
    // [漫画猫] 获取下一页地址
    function manhuacat_nextL(pageElems, type) {
        if (type === 'url') {
            if(pageElems.code == '0000') {
                if (pageElems.url === curSite.pageUrl) return
                curSite.pageUrl = pageElems.url;
                getPageElems(curSite.pageUrl); // 真正的下一页链接
            }
        } else {
            let vg_r_data = document.querySelector('.vg-r-data');
            if (vg_r_data) {
                getPageElems(`https://${location.host}/chapter_num?chapter_id=${vg_r_data.dataset.chapter_num}&ctype=1&type=${vg_r_data.dataset.chapterType};`, 'json', 'GET', '', 'url');
            }
        }
    }
    // [漫画猫] 插入数据
    function manhuacat_insertE(pageElems, type) {
        if (!pageElems) return
        if (type === 'url') { // 获取下一页链接
            manhuacat_nextL(pageElems, type); return
        }

        // 添加历史记录
        window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

        // 替换元素
        let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
            repE = getAll(curSite.pager.replaceE, pageElems, pageElems);
        if (oriE.length === repE.length) {
            for (let i = 0; i < oriE.length; i++) {
                oriE[i].outerHTML = repE[i].outerHTML;
            }
        }

        // 插入图片
        let _img = '', _img_arr = LZString.decompressFromBase64(getXpath('//body/script[not(@src)][contains(text(), "img_data")]').textContent.split('"')[1]).split(','), vg_r_data = document.querySelector('.vg-r-data');;
        for (let now of _img_arr) {
            _img += `<img src="${vg_r_data.dataset.chapterDomain}${img_pre}${now}">`;
        }
        if (_img) {
            document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
            // 当前页码 + 1
            pageNum.now = pageNum._now + 1
        }
    }


    // [漫画DB] 初始化（将本话其余图片插入网页中）
    function manhuadb_init() {
        let _img = '',
            data = document.querySelector('.vg-r-data'), imgDate;
        if (!data) return
        document.querySelectorAll(curSite.pager.pageE.replace('css;', '')).forEach(function (one) {
            if (one.tagName === 'SCRIPT' && one.textContent.indexOf('var img_data =') > -1) {
                let json = JSON.parse(window.atob(one.textContent.split("'")[1]));
                if (json) {
                    let _img = '';
                    for (let i = 0; i < json.length; i++) { // 遍历图片文件名数组，组合为 img 标签
                        let src = data.dataset.host + data.dataset.img_pre + json[i].img;
                        _img += `<img class="img-fluid show-pic" src="${src}">`
                    }
                    document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                }
            }
        })
    }
    // [漫画DB] 获取下一页地址
    function manhuadb_nextL() {
        let nextArr = document.querySelectorAll('a.fixed-a-es'), next;
        var url = '';
        if (nextArr.length == 0) return
        for (let i = 0; i < nextArr.length; i++) {
            if (nextArr[i].className.indexOf('active') > -1) {
                if (nextArr[i+1]) url = nextArr[i+1].href;
                break;
            }
        }
        if (url === curSite.pageUrl) return
        curSite.pageUrl = url
        getPageElems(curSite.pageUrl);
    }
    // [漫画DB] 插入数据
    function manhuadb_insertE(pageElems, type) {
        if (!pageElems) return
        let oriE = document.querySelectorAll(curSite.pager.pageE.replace('css;', '')),
            repE = getAll(curSite.pager.pageE, pageElems, pageElems);
        if (oriE.length === repE.length) {
            for (let i = 0; i < oriE.length; i++) {
                oriE[i].outerHTML = repE[i].outerHTML;
            }
            // 当前页码 + 1
            pageNum.now = pageNum._now + 1
            manhuadb_init(); // 将刚刚替换的图片插入网页中
        }
    }


    // [HiComic(嗨漫画)] 初始化（将本话其余图片插入网页中）
    function hicomic_init() {
        let _img = '';
        document.querySelectorAll('.chapter > section:not(:first-child) > section[val]').forEach(function (one) {
            let src = one.getAttribute('val');
            if (src.indexOf('!p_c_c_') === -1) src += '!p_c_c_h'
            _img += `<img src="${src}">`
        })
        document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
        window.document.title = window.document.title.replace(/(\(第.+\))? - HiComic/, `(${document.querySelector('.chapter_name').textContent}) - HiComic`); // 修改网页标题（加上 第 X 话）
    }
    // [HiComic(嗨漫画)] 获取下一页地址
    function hicomic_nextL() {
        let nextId;
        nextId = document.querySelector('.next_chapter:not(.end)')
        if (nextId && nextId.id && nextId.id != 'None') {
            curSite.pageUrl = location.href;
            getPageElems(`https://www.hicomic.net/api/web/chapter/${nextId.id}/contents`, 'json');
        }
    }
    // [HiComic(嗨漫画)] 插入数据
    function hicomic_insertE(pageElems, type) {
        if (!pageElems || pageElems.code != 200) return
        if (pageElems.results.chapter.next) { // 写入下一页的 UUID
            document.querySelector('.next_chapter').id = pageElems.results.chapter.next;
        } else {
            document.querySelector('.next_chapter').id = 'None';
            document.querySelector('.next_chapter').classList.add('end');
        }
        document.querySelector('.chapter_name').textContent = pageElems.results.chapter.name; // 修改漫画标题
        let title = window.document.title.replace(/(\(第.+\))? - HiComic/, `(${pageElems.results.chapter.name}) - HiComic`)
        window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, title, curSite.pageUrl); // 添加历史记录
        window.document.title = title; // 修改当前网页标题为下一话的标题
        let _img = '';
        for (let i = 0; i < pageElems.results.chapter.contents.length; i++) { // 遍历图片文件名数组，组合为 img 标签
            let src = pageElems.results.chapter.contents[i].url;
            if (src.indexOf('!p_c_c_') === -1) src += '!p_c_c_h';
            _img += `<img src="${src}">`
        }
        document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
        // 当前页码 + 1
        pageNum.now = pageNum._now + 1
    }


    // [动漫之家] 初始化（调整本话其余图片）
    function dmzj_init() {
        let _img = '';
        document.querySelectorAll('.comic_wraCon > a > img').forEach(function (one) {
            _img += `<img src="${one.dataset.original}">`;
            one.parentElement.remove();
        })
        document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中

    }
    // [动漫之家] 获取下一页地址
    function dmzj_nextL() {
        let next;
        next = document.querySelector('span.next > a')
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            getPageElems(curSite.pageUrl);
        }
    }
    // [动漫之家] 插入数据
    function dmzj_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScriptAll('css;head > script[type]:not([src])', document.body, pageElems);

        // 插入图片
        let _img = '', _img_arr;
        if (pages.indexOf('|') === -1) {
            _img_arr = JSON.parse(pages.replace(/\r\n/g,'|')).page_url.split('|');
        } else {
            _img_arr = JSON.parse(pages).page_url.split('|');
        }
        for (let now of _img_arr) {
            _img += `<img src="${img_prefix}${now}">`;
        }
        if (_img) {
            document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中

            // 添加历史记录
            window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

            // 替换元素
            let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
                repE = getAll(curSite.pager.replaceE, pageElems, pageElems);
            if (oriE.length === repE.length) {
                for (let i = 0; i < oriE.length; i++) {
                    oriE[i].outerHTML = repE[i].outerHTML;
                }
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
            }
        }
    }


    // [动漫之家-漫画] 初始化（调整本话其余图片）
    function dmzj_manhua_init() {
        let _img = '';
        document.querySelectorAll('#center_box > .inner_img img[src]').forEach(function (one) {
            _img += `<img src="${one.dataset.original}">`;
            one.parentElement.parentElement.remove();
        })
        document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中

    }
    // [动漫之家-漫画] 获取下一页地址
    function dmzj_manhua_nextL() {
        let next;
        next = document.getElementById('next_chapter')
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            getPageElems(curSite.pageUrl);
        }
    }
    // [动漫之家-漫画] 插入数据
    function dmzj_manhua_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScriptAll('css;head > script[type]:not([src])', document.body, pageElems);

        // 插入图片
        let _img = '';
        for (let now of arr_pages) {
            _img += `<img src="${img_prefix}${now}">`;
        }
        if (_img) {
            document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中

            // 添加历史记录
            window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

            // 替换元素
            let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
                repE = getAll(curSite.pager.replaceE, pageElems, pageElems);
            if (oriE.length === repE.length) {
                for (let i = 0; i < oriE.length; i++) {
                    oriE[i].outerHTML = repE[i].outerHTML;
                }
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
            }
        }
    }


    // [百度贴吧 - 帖子内] 加载下一页
    function baidu_tieba_post_nextL() {
        let next;
        next = getXpath('//li[contains(@class,"pb_list_pager")]/a[contains(text(),"下一页")]')
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            insStyle('topic_list_box, ul.tbui_aside_float_bar, .core_title_wrap_bright.tbui_follow_fixed.core_title_absolute_bright {display: none !important;}');
            insIframe(curSite.pageUrl);
        }
    }


    // [拷贝漫画] 加载下一页
    function copymanga_nextL() {
        let next;
        next = document.querySelector('.comicContent-next > a')
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            insStyle('h4.header, h4.header +div[style*="fixed"] {display: none !important;}');
            insIframe(curSite.pageUrl);
            /*setTimeout(function(){
                let oldImg = document.querySelector(curSite.pager.pageE.replace('css;', '')).innerHTML;
                iframe.contentWindow.document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), oldImg); // 将 img 标签插入到网页中
                document.querySelector(curSite.pager.pageE.replace('css;', '')).innerHTML = ''
            }, 500);*/
        }
    }


    // 插入 iframe 加载下一页
    function insIframe(src) {
        // 停用当前页面翻页
        curSite.SiteTypeID = 0;
        // 隐藏当前页面的滚动条 + 页码
        insStyle('body::-webkit-scrollbar {width: 0 !important;height: 0 !important;} #Autopage_number {display: none !important;}');
        // 创建 iframe
        let iframe = document.createElement('iframe');
        document.lastElementChild.appendChild(iframe);
        iframe.style = 'position: absolute; width: 100%; height: 100%; border: none;';
        iframe.src = src;
    }


    // [漫画星球] 获取下一页地址
    function mhxqiu_nextL() {
        let next = document.querySelector('#mainControlNext');
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            console.log(curSite.pageUrl)
            getPageElems(curSite.pageUrl);
        }
    }
    // [漫画星球] 插入数据
    function mhxqiu_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScriptAll('//script[contains(text(), "eval") and contains(text(), "newImgs")]', document.body, pageElems);

        // 插入图片
        let _img = '';
        for (let now of newImgs) {
            _img += `<li><div style="display: inline-block;zoom: 1;"><img src="${now}" class="loaded lazy" style="opacity: 1;box-shadow:none;"></div></li>`;
        }
        if (_img) {
            // 将 img 标签插入到网页中
            document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img);

            // 添加历史记录
            window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

            // 当前页码 + 1
            pageNum.now = pageNum._now + 1

            // 替换元素
            let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
                repE = getAll(curSite.pager.replaceE, pageElems, pageElems);
            if (oriE.length === repE.length) {
                for (let i = 0; i < oriE.length; i++) {
                    oriE[i].outerHTML = repE[i].outerHTML;
                }
            }
        }
    }


    // [风之动漫] 获取下一页地址
    function fffdm_nextL() {
        let next = getXpath('//a[contains(text(), "下一页") or contains(text(), "下一话")]');
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            getPageElems(curSite.pageUrl);
        }
    }
    // [风之动漫] 插入数据
    function fffdm_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        let scriptElems = getXpath('id("main")/script[contains(text(), "mhpicurl")][1]', pageElems, pageElems);
        if (scriptElems) {
            document.body.appendChild(document.createElement('script')).textContent = scriptElems.textContent.replace(/document\.write.+/, '');
            //insScriptAll('id("main")/script[contains(text(), "mhpicurl")][1]', document.body, pageElems);

            // 插入图片
            setTimeout(function() {
                document.querySelector(curSite.pager.insertP[0].replace('css;', '')).appendChild(document.createElement('img')).src = mhpicurl;

                // 添加历史记录
                window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

                // 当前页码 + 1
                pageNum.now = pageNum._now + 1

                // 替换元素
                let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
                    repE = getAll(curSite.pager.replaceE, pageElems, pageElems);
                if (oriE.length === repE.length) {
                    for (let i = 0; i < oriE.length; i++) {
                        oriE[i].outerHTML = repE[i].outerHTML;
                    }
                }
            }, 100)
        }
    }


    // [古风漫画网] 获取下一页地址
    function gufengmh_nextL() {
        let pageElems = document.querySelector(curSite.pager.pageE.replace('css;', '')); // 寻找数据所在元素
        if (pageElems) {
            let comicUrl, nextId;
            var url = '';
            pageElems.textContent.split(';').forEach(function (one){ // 分号 ; 分割为数组并遍历
                //console.log(one)
                if (one.indexOf('comicUrl') > -1) { // 下一页 URL 前半部分
                    comicUrl = one.split('"')[1];
                } else if (one.indexOf('nextChapterData') > -1) { // 下一页 URL 的后半部分 ID
                    nextId = one.split('"id":')[1].split(',')[0];
                }
            })
            if (comicUrl && nextId && nextId != 'null') { // 组合到一起就是下一页 URL
                url = comicUrl + nextId + '.html'
                if (url === curSite.pageUrl) return
                curSite.pageUrl = url
                getPageElems(curSite.pageUrl); // 访问下一页 URL 获取
            }
        }
    }
    // [古风漫画网] 插入数据
    function gufengmh_insertE(pageElems, type) {
        if (pageElems) {
            let url = curSite.pageUrl;
            pageElems = getAll(curSite.pager.pageE, pageElems, pageElems)[0];
            let chapterImages, chapterPath;
            document.querySelector(curSite.pager.pageE.replace('css;', '')).innerText = pageElems.textContent; // 将当前网页内的数据所在元素内容改为刚刚获取的下一页数据内容，以便循环获取下一页 URL
            pageElems.textContent.split(';').forEach(function (one){ // 分号 ; 分割为数组并遍历
                //console.log(one)
                if (one.indexOf('chapterImages') > -1) { // 图片文件名数组
                    chapterImages = one.replace(/^.+\[/, '').replace(']', '').replaceAll('"', '').split(',')
                } else if (one.indexOf('chapterPath') > -1) { // 图片文件路径
                    chapterPath = one.split('"')[1];
                } else if (one.indexOf('pageTitle') > -1) { // 网页标题
                    let title = one.split('"')[1];
                    window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, title, url); // 添加历史记录
                    window.document.title = title; // 修改当前网页标题为下一页的标题
                }
            })
            if (chapterImages && chapterPath) {
                let _img = '';
                chapterImages.forEach(function (one2){ // 遍历图片文件名数组，组合为 img 标签
                    _img += '<img src="https://res.xiaoqinre.com/' + chapterPath + one2 + '" data-index="0" style="display: inline-block;">'
                })
                document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
            }
        }
    }


    // [砂之船动漫家] 的插入前函数（加载图片）
    function szcdmj_bF(pageElems) {
        pageElems.forEach(function (one) {
            if (one.tagName === 'TITLE') {
                let title = one.textContent;
                window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, title, curSite.pageUrl); // 添加历史记录
                window.document.title = title; // 修改当前网页标题为下一页的标题
                one.style.display = 'none';
            } else {
                let now = one.querySelector('img[data-original]')
                if (now) {
                    now.src = now.dataset.original;
                    now.style.display = 'inline';
                }
            }
        });
        return pageElems
    }


    // [Mangabz 漫画] 初始化（调整本话图片）
    function mangabz_init() {
        let showimage = document.getElementById('showimage'),
            cp_img = document.getElementById('cp_img'),
            cp_image = document.getElementById('cp_image');
        if (showimage) {showimage.removeAttribute('oncontextmenu');}
        if (cp_img) {cp_img.removeAttribute('oncontextmenu');}
        if (cp_image) {
            cp_image.removeAttribute('oncontextmenu');
            cp_image.removeAttribute('id');
            cp_image.removeAttribute('style');
        }
    }
    // [Mangabz 漫画] 获取下一页地址
    function mangabz_nextL() {
        var url = '';
        if (MANGABZ_PAGE === MANGABZ_IMAGE_COUNT) { // 下一话
            url = getXpath('//a[./img[contains(@src, "icon_xiayizhang")]]')
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url
            //console.log(curSite.pageUrl)
            getPageElems(curSite.pageUrl); // 访问下一话 URL 获取
        } else { // 下一页
            if (!mkey) var mkey = '';
            url = location.origin + location.pathname + 'chapterimage.ashx' + `?cid=${MANGABZ_CID}&page=${MANGABZ_PAGE + 1}&key=${(mkey)}&_cid=${MANGABZ_CID}&_mid=${MANGABZ_MID}&_dt=${MANGABZ_VIEWSIGN_DT}&_sign=${MANGABZ_VIEWSIGN}`
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url
            //console.log(curSite.pageUrl)
            getPageElems(curSite.pageUrl, 'text', 'GET', '', 'Next'); // 访问下一页 URL 获取
        }
    }
    // [Mangabz 漫画] 插入数据
    function mangabz_insertE(pageElems, type) {
        if (pageElems) {
            if (type === 'Next') {
                let imgArr = eval(pageElems),
                    _img = '';
                for (let now of imgArr) {
                    _img += `<img src="${now}">`;
                }
                if (_img) {
                    document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中

                    // 添加历史记录
                    MANGABZ_PAGE += imgArr.length;
                    window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, document.title, location.origin + MANGABZ_CURL.substring(0, MANGABZ_CURL.length - 1) + '-p' + MANGABZ_PAGE + '/');
                }
            } else {
                // 插入 <script> 标签
                insScriptAll('css;html:not([dir]) > head > script:not([src])', document.body, pageElems);

                // 添加历史记录
                window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

                // 当前页码 + 1
                pageNum.now = pageNum._now + 1

                // 替换待替换元素
                let oriE = getAll(curSite.pager.replaceE),
                    repE = getAll(curSite.pager.replaceE, pageElems, pageElems);
                if (oriE.length === repE.length) {
                    for (let i = 0; i < oriE.length; i++) {
                        oriE[i].outerHTML = repE[i].outerHTML;
                    }
                }
                MANGABZ_PAGE = 0;
                mangabz_nextL();
            }
        }
    }


    // [COCOMANGA 漫画] 初始化（调整本话图片）
    function cocomanga_init() {
        let last = document.querySelector('.mh_comicpic:last-of-type');
        if (last && last.getAttribute('p')) {
            document.querySelector(curSite.pager.insertP[0].replace('css;', '')).innerHTML = ''; // 删除旧图片元素
            cocomanga_img(parseInt(last.getAttribute('p'))) // 插入新图片元素
        }
    }
    // [COCOMANGA 漫画] 生成图片元素并插入网页
    function cocomanga_img(totalImageCount) {
        if (totalImageCount < 1) return
        let _img = '';
        for (let i=1; i<=totalImageCount; i++) {
            _img += `<div class="mh_comicpic" p="${i}"><img src="${__cr.getPicUrl(i)}"></div>`;
        }
        document.querySelector(curSite.pager.insertP[0].replace('css;', '')).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
    }
    // [COCOMANGA 漫画] 获取下一页地址
    function cocomanga_nextL() {
        var url = '';
        url = getXpath('//a[contains(@class, "read_page_link") and contains(string(), "下一章")][not(contains(@href, "javascript"))]')
        if (url === curSite.pageUrl) return
        curSite.pageUrl = url
        getPageElems(curSite.pageUrl); // 访问下一话 URL 获取
    }
    // [COCOMANGA 漫画] 插入数据
    function cocomanga_insertE(pageElems, type) {
        if (pageElems) {
            // 插入 <script> 标签
            insScriptAll('css;head > script:not([src]), script[src*="custom.js"], script[src*="dynamicjs.js"]', document.body, pageElems);

            // 插入新图片元素
            setTimeout(function() {
                let totalImageCount = __cdecrypt('fw122587mkertyui', CryptoJS.enc.Base64.parse(mh_info.enc_code1).toString(CryptoJS.enc.Utf8));
                if (!totalImageCount) totalImageCount = __cdecrypt('fw12558899ertyui', CryptoJS.enc.Base64.parse(mh_info.enc_code1).toString(CryptoJS.enc.Utf8));
                cocomanga_img(parseInt(totalImageCount));
            }, 100)

            // 添加历史记录
            window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

            // 当前页码 + 1
            pageNum.now = pageNum._now + 1

            // 替换元素
            let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
                repE = getAll(curSite.pager.replaceE, pageElems, pageElems);
            if (oriE.length === repE.length) {
                for (let i = 0; i < oriE.length; i++) {
                    oriE[i].outerHTML = repE[i].outerHTML;
                }
            }
        }
    }
    // [COCOMANGA 漫画 - 列表页] 获取下一页地址
    function cocomanga_list_nextL() {
        let pageActive = parseInt(document.querySelector('.fed-page-info a.fed-btns-green').innerText);
        if (/page=\d+/.test(location.search)) {
            return (location.origin + location.pathname + location.search.replace(/page=\d+/,`page=${pageActive+1}`))
        } else {
            if (!location.search) return (location.origin + location.pathname + `?page=${pageActive+1}`)
            return (location.origin + location.pathname + location.search + `&page=${pageActive+1}`)
        }
    }


    // 自动无缝翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0) {
            windowScroll(function (direction, e) {
                if (direction === 'down' && pausePage === true && curSite.SiteTypeID > 0) { // 下滑 且 未暂停翻页 且 SiteTypeID > 0 时，才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                        scrollHeight = window.innerHeight || document.documentElement.clientHeight,
                        scrollD = curSite.pager.scrollD;
                    if (curSite.pager.type === 3) { // <<<<< 翻页类型 3（依靠元素距离可视区域底部的距离来触发翻页）>>>>>
                        let scrollElement = document.querySelector(curSite.pager.scrollElement);
                        //console.log(scrollElement.offsetTop - (scrollTop + scrollHeight), scrollD, curSite.SiteTypeID)
                        if (scrollElement.offsetTop - (scrollTop + scrollHeight) <= scrollD) {
                            if (curSite.SiteTypeID === SiteType.GAMERSKY_GL) curSite.pager.scrollD -= 800 // 游民星空 gl 的比较奇葩，需要特殊处理下
                            ShowPager.loadMorePage();
                        }

                    } else {
                        if (document.documentElement.scrollHeight <= scrollHeight + scrollTop + scrollD) {

                            if (curSite.pager.type === 1) { // <<<<< 翻页类型 1（由脚本实现自动无缝翻页）>>>>>
                                ShowPager.loadMorePage();

                            } else if (curSite.pager.type === 2) { // <<<<< 翻页类型 2（网站自带了自动无缝翻页功能，只需要点击下一页按钮即可）>>>>>
                                let autopbn = document.querySelector(curSite.pager.nextL);
                                if (autopbn) { // 寻找下一页链接
                                    if (!(curSite.pager.isHidden) || (curSite.pager.isHidden && !isHidden(autopbn))) { // 如果 isHidden = true，那么需要判断元素是否隐藏
                                        if (curSite.pager.nextText) {
                                            // 按钮文本，当按钮文本 = 该文本时，才会点击按钮加载下一页
                                            if (autopbn.innerText === curSite.pager.nextText) {
                                                autopbn.click();
                                                pageNum.now = pageNum._now + 1; // 当前页码 + 1
                                            }
                                        } else if (curSite.pager.nextTextOf) {
                                            // 按钮文本的一部分，当按钮文本包含该文本时，才会点击按钮加载下一页
                                            if (autopbn.innerText.indexOf(curSite.pager.nextTextOf) > -1) {
                                                autopbn.click();
                                                pageNum.now = pageNum._now + 1; // 当前页码 + 1
                                            }
                                        } else if (curSite.pager.nextHTML) {
                                            // 按钮内元素，当按钮内元素 = 该元素内容时，才会点击按钮加载下一页
                                            if (autopbn.innerHTML === curSite.pager.nextHTML) {
                                                autopbn.click();
                                                pageNum.now = pageNum._now + 1; // 当前页码 + 1
                                            }
                                        } else {
                                            // 如果没有指定按钮文字就直接点击
                                            autopbn.click();
                                            pageNum.now = pageNum._now + 1; // 当前页码 + 1
                                            // 对于没有按钮文字变化的按钮，可以指定间隔时间（默认 300ms）
                                            if (!curSite.pager.interval) curSite.pager.interval = 300;
                                            let _SiteTypeID = curSite.SiteTypeID; curSite.SiteTypeID = 0;
                                            setTimeout(function(){curSite.SiteTypeID = _SiteTypeID;}, curSite.pager.interval)
                                        }
                                    }
                                }

                            } else if (curSite.pager.type === 4) { // <<<<< 翻页类型 4（部分简单的动态加载类网站）>>>>>
                                // 为百度贴吧的发帖考虑，预留底部一小部分...
                                if (!(document.documentElement.scrollHeight <= scrollHeight + scrollTop + 200 && curSite.SiteTypeID === SiteType.BAIDU_TIEBA)) {
                                    curSite.pager.nextL();
                                }
                                if (curSite.pager.interval) {
                                    let _SiteTypeID = curSite.SiteTypeID;
                                    curSite.SiteTypeID = 0;
                                    setTimeout(function(){curSite.SiteTypeID = _SiteTypeID;}, curSite.pager.interval)
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    // 判断是支持
    function doesItSupport() {
        setDBSite(); // 配置 DBSite 变量对象

        // 遍历判断是否是某个已支持的网站，顺便直接赋值
        let support = false;
        for (let now in DBSite) { // 遍历对象
            if (!DBSite[now].host) continue; // 如果不存在则继续下一个循环
            if (Array.isArray(DBSite[now].host)) { // 如果是数组
                for (let i of DBSite[now].host) { // 遍历数组
                    if (i === location.host) {
                        if (DBSite[now].functionStart) {
                            DBSite[now].functionStart();
                        } else {
                            curSite = DBSite[now];
                        }
                        support = true; break; // 如果找到了就退出循环
                    }
                }
            } else if (DBSite[now].host instanceof RegExp) {
                if (DBSite[now].host.test(location.host)) {
                    if (self != top) {if (!DBSite[now].iframe) break;} // 如果当前位于 iframe 框架下，就需要判断是否需要执行
                    if (DBSite[now].functionStart) {
                        DBSite[now].functionStart();
                    } else {
                        curSite = DBSite[now];
                    }
                    support = true; break; // 如果找到了就退出循环
                }
            } else if (DBSite[now].host === location.host) {
                if (self != top) {if (!DBSite[now].iframe) break;} // 如果当前位于 iframe 框架下，就需要判断是否需要执行
                if (DBSite[now].functionStart) {
                    DBSite[now].functionStart();
                } else {
                    curSite = DBSite[now];
                }
                support = true; break; // 如果找到了就退出循环
            }
        }

        if (support) {
            console.info('[自动无缝翻页] - 独立规则 网站'); return 1;
        } else if (document.querySelector('meta[name="author" i][content*="Discuz!" i], meta[name="generator" i][content*="Discuz!" i], body[id="nv_forum" i][class^="pg_" i][onkeydown*="27"], body[id="nv_search" i][onkeydown*="27"]') || (document.querySelector('a[href*="www.discuz.net" i]') && document.querySelector('a[href*="www.discuz.net" i]').textContent.indexOf('Discuz!') > -1) || (document.getElementById('ft') && document.getElementById('ft').textContent.indexOf('Discuz!') > -1)) {
            console.info('[自动无缝翻页] - <Discuz!> 论坛'); return 2;
        } else if (document.getElementById('flarum-loading')) {
            console.info('[自动无缝翻页] - <Flarum> 论坛'); return 3;
        } else if (document.querySelector('body#phpbb')) {
            console.info('[自动无缝翻页] - <phpBB> 论坛'); return 4;
        } else if (document.querySelector('link[href*="themes/dux" i], script[src*="themes/dux" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress <DUX> 主题的网站'); return 5;
        } else if (document.querySelector('link[href*="themes/xiu" i], script[src*="themes/xiu" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress <XIU> 主题的网站'); return 6;
        } else if (document.querySelector('link[href*="themes/d8" i], script[src*="themes/d8" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress <D8> 主题的网站'); return 7;
        } else if (document.querySelector('link[href*="themes/begin" i], script[src*="themes/begin" i], img[src*="themes/begin" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress <Begin> 主题的网站'); return 8;
        } else if (document.querySelector('meta[name="description"][content*="小说"], meta[name="description"][content*="章节"], meta[name="description"][content*="阅读"]') && document.getElementById('content') && getXpath('//a[contains(text(), "下一章") or contains(text(), "下一页")]')) {
            console.info('[自动无缝翻页] - <笔趣阁> 模板的小说网站'); return 9;
        } else if (getXpath('//footer//a[contains(string(), "Xiuno")] | //link[contains(@href, "xiuno")] | //script[contains(@src, "xiuno")]')) {
            console.info('[自动无缝翻页] - <Xiuno> 论坛'); return 10;
        } else if (self != top) {
            return -1;
        }
        return 0;
    }
    // 翻页类型 4 专用
    function getPageElems(url, type = '', method = 'GET', data = '', type2) {
        let mimeType;
        switch (type) {
            case 'json':
                mimeType = 'application/json; charset=' + document.charset; break;
            case 'text':
                mimeType = 'text/plain; charset=' + document.charset; break;
            default:
                mimeType = 'text/html; charset=' + document.charset;
        }

        GM_xmlhttpRequest({
            url: url,
            method: method,
            data: data,
            responseType: type,
            overrideMimeType: mimeType,
            headers: {
                'Referer': location.href,
                'Content-Type': (method === 'POST') ? 'application/x-www-form-urlencoded':''
            },
            timeout: 10000,
            onload: function (response) {
                try {
                    //console.log('最终 URL：' + response.finalUrl, '返回内容：' + response.responseText)
                    switch (type) {
                        case 'json':
                            curSite.pager.insertE(response.response, type2);
                            break;
                        case 'text':
                            curSite.pager.insertE(response.responseText, type2)
                            break;
                        default:
                            curSite.pager.insertE(ShowPager.createDocumentByString(response.responseText), type2)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }

    // 修改自 https://greasyfork.org/scripts/14178 , https://github.com/machsix/Super-preloader
    var ShowPager = {
        getFullHref: function (e) {
            if (e != null && e.nodeType === 1 && e.href && e.href.slice(0,4) === 'http') return e.href;
            return '';
        },
        createDocumentByString: function (e) {
            if (e) {
                if ('HTML' !== document.documentElement.nodeName) return (new DOMParser).parseFromString(e, 'application/xhtml+xml');
                var t;
                try { t = (new DOMParser).parseFromString(e, 'text/html');} catch (e) {}
                if (t) return t;
                if (document.implementation.createHTMLDocument) {
                    t = document.implementation.createHTMLDocument('ADocument');
                } else {
                    try {((t = document.cloneNode(!1)).appendChild(t.importNode(document.documentElement, !1)), t.documentElement.appendChild(t.createElement('head')), t.documentElement.appendChild(t.createElement('body')));} catch (e) {}
                }
                if (t) {
                    var r = document.createRange(),
                        n = r.createContextualFragment(e);
                    r.selectNodeContents(document.body);
                    t.body.appendChild(n);
                    for (var a, o = { TITLE: !0, META: !0, LINK: !0, STYLE: !0, BASE: !0}, i = t.body, s = i.childNodes, c = s.length - 1; c >= 0; c--) o[(a = s[c]).nodeName] && i.removeChild(a);
                    return t;
                }
            } else console.error('没有找到要转成 DOM 的字符串');
        },
        loadMorePage: function () {
            if (curSite.pager) {
                var url;
                if (typeof curSite.pager.nextL == 'function') {
                    url = curSite.pager.nextL();
                } else {
                    if (curSite.pager.nextL.slice(0,4) === 'css;') {
                        url = this.getFullHref(getCSS(curSite.pager.nextL.slice(4)));
                    } else {
                        url = this.getFullHref(getXpath(curSite.pager.nextL));
                    }
                }
                //console.log(url, curSite.pageUrl);
                if (url === '') return;
                if (curSite.pager.forceHTTPS && location.protocol === 'https:') {url = url.replace(/^http:/,'https:');}
                if (curSite.pageUrl === url) return;// 避免重复加载相同的页面
                curSite.pageUrl = url;
                // 读取下一页的数据
                GM_xmlhttpRequest({
                    url: url,
                    method: 'GET',
                    overrideMimeType: 'text/html; charset=' + document.charset,
                    headers: {
                        'Referer': location.href
                    },
                    timeout: 10000,
                    onload: function (response) {
                        try {
                            processResult(response);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                });
            }
        },
    };
    // XHR 后处理结果
    function processResult(response) {
        //console.log('最终 URL：' + response.finalUrl, '返回内容：' + response.responseText)
        var newBody = ShowPager.createDocumentByString(response.responseText);
        let pageElems = getAll(curSite.pager.pageE, newBody, newBody),
            toElement = getAll(curSite.pager.insertP[0])[0];
        //console.log(curSite.pager.pageE, pageElems, curSite.pager.insertP, toElement)

        if (pageElems.length >= 0) {
            // 如果有插入前函数就执行函数
            if (curSite.function && curSite.function.bF) {
                if (curSite.function.pF) { // 如果指定了参数
                    pageElems = curSite.function.bF(pageElems, curSite.function.pF);
                } else {
                    pageElems = curSite.function.bF(pageElems);
                }
            }

            // 插入位置
            let addTo = getAddTo(curSite.pager.insertP[1]);

            // 插入新页面元素
            if (curSite.pager.insertP[1] === 2 || curSite.pager.insertP[1] === 4) { // 插入到元素内头部、目标本身后面，需要合并后一起插入，否则会顺序相反
                let afterend = '';
                pageElems.forEach(function (one) {afterend += one.outerHTML;});
                toElement.insertAdjacentHTML(addTo, afterend);
            } else if (curSite.pager.insertP[1] === 5) { // 插入到目标内部末尾（针对文本）
                let afterend = '';
                pageElems.forEach(function (one) {afterend += one.innerHTML;});
                toElement.insertAdjacentHTML(addTo, afterend);
            } else {
                pageElems.forEach(function (one) {toElement.insertAdjacentElement(addTo, one);});
            }

            // 当前页码 + 1
            pageNum.now = pageNum._now + 1

            // 插入 <script> 标签
            if (curSite.pager.scriptT) {
                let scriptText = '';
                if (curSite.pager.scriptT === 1) { //         下一页的所有 <script> 标签
                    insScriptAll('//script', toElement, newBody);
                } else if (curSite.pager.scriptT === 2) { //  下一页主体元素同级 <script> 标签
                    pageElems.forEach(function (one) {if (one.tagName === 'SCRIPT') {scriptText += ';' + one.textContent;}});
                    if (scriptText) toElement.appendChild(document.createElement('script')).textContent = scriptText;
                } else if (curSite.pager.scriptT === 3) { //  下一页主体元素同级 <script> 标签（远程文件）
                    pageElems.forEach(function (one) {if (one.tagName === 'SCRIPT' && one.src) {toElement.appendChild(document.createElement('script')).src = one.src;}});
                } else if (curSite.pager.scriptT === 4) { //  下一页主体元素子元素 <script> 标签
                    pageElems.forEach(function (one) {
                        const scriptElems = one.querySelectorAll('script');
                        scriptElems.forEach(function (script) {scriptText += ';' + script.textContent;});
                    });
                    if (scriptText) toElement.appendChild(document.createElement('script')).textContent = scriptText;
                }
            }

            // 添加历史记录
            if (curSite.pager.history) {
                window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, newBody.querySelector('title').textContent, curSite.pageUrl);
            }

            // 替换待替换元素
            if (curSite.pager.replaceE) {
                try {
                    let oriE = getAll(curSite.pager.replaceE),
                        repE = getAll(curSite.pager.replaceE, newBody, newBody);
                    //console.log(oriE, repE);
                    if (oriE.length === repE.length) {
                        for (let i = 0; i < oriE.length; i++) {
                            oriE[i].outerHTML = repE[i].outerHTML;
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            // 如果有插入后函数就执行函数
            if (curSite.function && curSite.function.aF) {
                if (curSite.function.pF) { // 如果指定了参数
                    curSite.function.aF(curSite.function.pF);
                } else {
                    curSite.function.aF();
                }
            }
        }
    }
    // 插入所有 Script
    function insScriptAll(selector = '//script', toElement = document.body, contextNode = document) {
        let scriptElems = getAll(selector, contextNode, contextNode), scriptText = '';
        scriptElems.forEach(function (one) {
            if (one.src) {
                toElement.appendChild(document.createElement('script')).src = one.src;
            } else {
                scriptText += one.textContent + ';';
            }
        });
        if (scriptText) toElement.appendChild(document.createElement('script')).textContent = scriptText;
    }
    // 获取元素（CSS/Xpath）
    function getCSS(css, contextNode = document) {
        return contextNode.querySelector(css);
    }
    function getAllCSS(css, contextNode = document) {
        return [].slice.call(contextNode.querySelectorAll(css));
    }
    function getXpath(xpath, contextNode, doc = document) {
        contextNode = contextNode || doc;
        try {
            const result = doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            // 应该总是返回一个元素节点
            return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
        } catch (err) {
            throw new Error(`无效 Xpath: ${xpath}`);
        }
    }
    function getAllXpath(xpath, contextNode, doc = document) {
        contextNode = contextNode || doc;
        const result = [];
        try {
            const query = doc.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < query.snapshotLength; i++) {
                const node = query.snapshotItem(i);
                // 如果是 Element 节点
                if (node.nodeType === 1) result.push(node);
            }
        } catch (err) {
            throw new Error(`无效 Xpath: ${xpath}`);
        }
        return result;
    }
    function getAll(selector, contextNode = undefined, doc = document, win = window, _cplink = undefined) {
        if (!selector) return [];
        contextNode = contextNode || doc;
        if (typeof selector === 'string') {
            if (selector.search(/^css;/i) === 0) {
                return getAllCSS(selector.slice(4), contextNode);
            } else {
                return getAllXpath(selector, contextNode, doc);
            }
        } else {
            const query = selector(doc, win, _cplink);
            if (!Array.isArray(query)) {
                throw new Error('function getAll() 返回错误类型');
            } else {
                return query;
            }
        }
    }

    // 启用/禁用 (当前网站)
    function menu_disable(type) {
        switch(type) {
            case 'check':
                if(check()) {return true;} else {return false;}; break;
            case 'add':
                add(); break;
            case 'del':
                del(); break;
        }

        function check() { // 存在返回真，不存在返回假
            let list = GM_getValue('menu_disable'); // 读取网站列表
            if (list.indexOf(location.host) === -1) return false // 不存在返回假
            return true
        }

        function add() {
            if (check()) return
            let list = GM_getValue('menu_disable'); // 读取网站列表
            list.push(location.host); // 追加网站域名
            GM_setValue('menu_disable', list); // 写入配置
            location.reload(); // 刷新网页
        }

        function del() {
            if (!check()) return
            let list = GM_getValue('menu_disable'), // 读取网站列表
            index = list.indexOf(location.host);
            list.splice(index, 1); // 删除网站域名
            GM_setValue('menu_disable', list); // 写入配置
            location.reload(); // 刷新网页
        }
    }
    // 左键双击网页空白处暂停翻页
    function pausePageEvent() {
        if (!GM_getValue('menu_pause_page')) return
        if (curSite.SiteTypeID === 0) return
        document.body.addEventListener('dblclick', function () {
            if (pausePage) {
                pausePage = false;
                GM_notification({text: `❌ 已暂停本页 [自动无缝翻页]\n    （再次双击可恢复）`, timeout: 2000});
            } else {
                pausePage = true;
                GM_notification({text: `✅ 已恢复本页 [自动无缝翻页]\n    （再次双击可暂停）`, timeout: 2000});
            }
        });
    }
    // 显示页码
    function pageNumber(type) {
        if (curSite.SiteTypeID === 0 || curSite.hiddenPN) {let status = document.getElementById('Autopage_number');if (status) {status.style.display = 'none';}; return}
        let status = document.getElementById('Autopage_number');
        switch (type) {
            case 'add':
                add(); break;
            case 'del':
                del(); break;
            case 'set':
                set(); break;
        }

        function add(){
            if (status) {
                if (status.style.display === 'none') {status.style.display = 'flex';}
                return
            }
            // 插入网页
            let _html = `<style>#Autopage_number {top: calc(75vh) !important;left: 0 !important;width: 32px;height: 32px;padding: 6px !important;display: flex;position: fixed !important;opacity: 0.5;transition: .2s;z-index: 1000 !important;cursor: pointer;user-select: none !important;flex-direction: column;align-items: center;justify-content: center;box-sizing: content-box;border-radius: 0 50% 50% 0;transform-origin: center !important;transform: translateX(-8px);background-color: #eee;-webkit-tap-highlight-color: transparent;box-shadow: 1px 1px 3px 0px #aaa !important;color: #000 !important;} #Autopage_number:hover {opacity: 0.9;transform: translateX(0);}</style>
<div id="Autopage_number" title="1. 此处数字为 [当前页码] (可在脚本菜单中关闭)&#10;&#10;2. 鼠标左键点击此处 [临时暂停本页自动无缝翻页]（再次点击可恢复）">${pageNum._now}</div>`
            document.body.insertAdjacentHTML('beforeend', _html);
            // 点击事件（临时暂停翻页）
            document.getElementById('Autopage_number').onclick = function () {
                if (pausePage) {
                    pausePage = false; this.style = 'color: #FF5722 !important; font-style: italic !important;';
                } else {
                    pausePage = true; this.style = '';
                }
            };
            status = document.getElementById('Autopage_number');
            set();
        }
        // 监听储存当前页码的对象值的变化
        function set(){
            Object.defineProperty(pageNum, 'now', {
                set: function(value) {
                    this._now = value;
                    if (status) status.textContent = value;
                }
            });
        }
        function del(){
            if (!status) return
            status.style.display = 'none';
        }
    }
    // 菜单开关
    function menu_switch(menu_status, Name, Tips) {
        if (menu_status === true){
            GM_setValue(Name, false);
        } else {
            GM_setValue(Name, true);
        }
        if (Name === 'menu_page_number') {
            if (menu_status === true){pageNumber('del');} else {pageNumber('add');}
            registerMenuCommand(); // 重新注册脚本菜单
        } else {
            location.reload();}
    };
    // 生成 SiteTypeID
    function setSiteTypeID() {
        let num = 0
        for (let val in DBSite) {
            DBSite[val].SiteTypeID = num = num + 1;
        }
    }
    // 获取 Cookie
    function getCookie(name) {
        if (!name) return ''
        let arr = document.cookie.split(';');
        name += '='
        for (let i=0; i<arr.length; i++) {
            let now = arr[i].trim();
            if (now.indexOf(name) == 0) return now.substring(name.length, now.length);
        }
        return '';
    }
    // 插入位置
    function getAddTo(num) {
        switch (num) {
            case 1:
                return 'beforebegin'; break;
            case 2:
                return 'afterbegin'; break;
            case 3:
                return 'beforeend'; break;
            case 4:
                return 'afterend'; break;
            case 5:
                return 'beforeend'; break;
        }
    }
    // 滚动条事件
    function windowScroll(fn1) {
        var beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            fn = fn1 || function () {};
        setTimeout(function () { // 延时 1 秒执行，避免刚载入到页面就触发翻页事件
            window.addEventListener('scroll', function (e) {
                var afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                    delta = afterScrollTop - beforeScrollTop;
                if (delta == 0) return false;
                fn(delta > 0 ? 'down' : 'up', e);
                beforeScrollTop = afterScrollTop;
            }, false);
        }, 1000)
    }
    // 自定义 locationChange 事件（用来监听 URL 变化）
    function addLocationchange() {
        history.pushState = ( f => function pushState(){
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('pushstate'));
            window.dispatchEvent(new Event('locationChange'));
            return ret;
        })(history.pushState);

        history.replaceState = ( f => function replaceState(){
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('replacestate'));
            window.dispatchEvent(new Event('locationChange'));
            return ret;
        })(history.replaceState);

        window.addEventListener('popstate',()=>{
            window.dispatchEvent(new Event('locationChange'))
        });
    }
    // 判断元素是否隐藏（隐藏返回 true）
    function isHidden(el){
        return (el.offsetParent === null);
    }
    /*// 监听 XMLHttpRequest URL
    var _send = window.XMLHttpRequest.prototype.send
    function sendReplacement(data) {
        console.log(data)
        return _send.apply(this, arguments);
    }
    window.XMLHttpRequest.prototype.send = sendReplacement;
    // 监听 XMLHttpRequest 模式(GET/POST)和数据
    var _open = window.XMLHttpRequest.prototype.open
    function openReplacement(data) {
        console.log(data, arguments)
        return _open.apply(this, arguments);
    }
    window.XMLHttpRequest.prototype.open = openReplacement;*/
})();