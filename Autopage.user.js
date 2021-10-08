// ==UserScript==
// @name         自动无缝翻页
// @version      2.8.1
// @author       X.I.U
// @description  无缝拼接下一页内容（瀑布流），目前支持：[所有使用「Discuz!、Flarum、DUX(WordPress)」的网站]、百度、谷歌、必应、搜狗、头条搜索、360 搜索、微信搜索、贴吧、豆瓣、微博、NGA、V2EX、煎蛋网、糗事百科、龙的天空、起点小说、IT之家、千图网、Pixabay、3DM、游侠网、游民星空、NexusMods、Steam 创意工坊、CS.RIN.RU、FitGirl、片库、茶杯狐、NO视频、低端影视、奈菲影视、91美剧网、真不卡影院、音范丝、BT之家、萌番组、动漫花园、樱花动漫、爱恋动漫、AGE 动漫、Nyaa、SrkBT、RARBG、SubHD、423Down、不死鸟、扩展迷、极简插件、小众软件、动漫狂、漫画猫、漫画DB、HiComic、动漫之家、古风漫画网、PubMed、wikiHow、GreasyFork、Github、StackOverflow（以上仅一部分，更多的写不下了...
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
        ['menu_discuz_thread_page', '帖子内自动翻页 (仅论坛)', '帖子内自动翻页 (仅论坛)', true],
        ['menu_page_number', '显示当前页码及点击暂停翻页', '显示当前页码及点击暂停翻页', true],
        ['menu_pause_page', '左键双击网页空白处暂停翻页', '左键双击网页空白处暂停翻页', false]
    ], menuId = [], webType = 0, curSite = {SiteTypeID: 0}, DBSite, SiteType, pausePage = true, pageNum = {now: 1, _now: 1}, locationchange = false, nowLocation = '', forumWebsite = ['cs.rin.ru', 'www.flyert.com', 'bbs.pediy.com', 'www.libaclub.com'];
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

                if (webType === 2 || forumWebsite.indexOf(location.host) > -1) {
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
    locationchange: 对于使用 pjax 技术的网站，需要监听 URL 变化来重新判断翻页规则
    insStyle: 要插入网页的 CSS Style 样式
    type：
      1 = 由脚本实现自动无缝翻页
      2 = 网站自带了自动无缝翻页功能，只需要点击下一页按钮即可
          nextText: 按钮文本，当按钮文本 = 该文本时，才会点击按钮加载下一页（避免一瞬间加载太多次下一页）
          nextTextOf: 按钮文本的一部分，当按钮文本包含该文本时，才会点击按钮加载下一页（避免一瞬间加载太多次下一页）
          nextHTML: 按钮内元素，当按钮内元素 = 该元素内容时，才会点击按钮加载下一页（避免一瞬间加载太多次下一页）
          intervals: 点击间隔时间，对于没有按钮文字变化的按钮，可以手动指定间隔时间，单位：ms
      3 = 依靠元素距离可视区域底部的距离来触发翻页
      4 = 部分简单的动态加载类网站（暂时）
    insertPosition：
      1 = 插入该元素本身的前面；
      2 = 插入该元素当中，第一个子元素前面；
      3 = 插入该元素当中，最后一个子元素后面；
      4 = 插入该元素本身的后面；
      5 = 插入该元素末尾（针对文本）
    mimeType: 网站编码
    scriptType: 单独插入 <script> 标签
      1 = 下一页的所有 <script> 标签
      2 = 下一页主体元素同级 <script> 标签
      3 = 下一页主体元素同级 <script> 标签（远程文件）
      4 = 下一页主体元素子元素 <script> 标签
    history: 添加历史记录 并 修改当前 URL
    forceHTTPS: 下一页链接强制 HTTPS
    scrollDelta：数值越大，滚动条触发点越靠上（越早开始翻页），一般是访问网页速度越慢，该值就需要越大（如果 Type = 3，则相反）
    function：
      before = 插入前执行函数；
      after = 插入后执行函数；
      parameter = 参数
    */
        DBSite = {
            discuz_forum: {
                SiteTypeID: 0,
                pager: {
                    type: 2,
                    nextLink: '#autopbn',
                    nextTextOf: '下一页',
                    scrollDelta: 1500
                }
            }, //       Discuz! - 各版块帖子列表（自带无缝加载下一页按钮的）
            discuz_guide: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[contains(@class, "nxt") or contains(@class, "next")][@href][not(contains(@href, "javascript"))]',
                    pageElement: 'css;#threadlist table > tbody[id^="normalthread_"]',
                    insertPosition: ['id("threadlist")//table/tbody[starts-with(@id, "normalthread_")]/parent::table', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollDelta: 1000
                }
            }, //       Discuz! - 导读页 及 各版块帖子列表（不带无缝加载下一页按钮的）
            discuz_waterfall: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[contains(@class, "nxt") or contains(@class, "next")][@href][not(contains(@href, "javascript"))]',
                    pageElement: 'css;#waterfall > li',
                    insertPosition: ['css;#waterfall', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollDelta: 1000
                }
            }, //   Discuz! - 图片模式的各版块帖子列表（不带无缝加载下一页按钮的）
            discuz_thread: {
                SiteTypeID: 0,
                insStyle: '.pgbtn {display: none;}',
                pager: {
                    type: 1,
                    nextLink: '//a[contains(@class, "nxt") or contains(@class, "next")][@href][not(contains(@href, "javascript"))]',
                    pageElement: 'css;#postlist > div[id^="post_"]',
                    insertPosition: ['css;#postlist', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[file]', 'file']
                }
            }, //      Discuz! - 帖子内
            discuz_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[contains(@class, "nxt") or contains(@class, "next")][@href][not(contains(@href, "javascript"))]',
                    pageElement: 'css;#threadlist > ul',
                    insertPosition: ['css;#threadlist', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollDelta: 1000
                }
            }, //      Discuz! - 搜索页
            discuz_youspace: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[contains(@class, "nxt") or contains(@class, "next")][@href][not(contains(@href, "javascript"))]',
                    pageElement: 'css;tbody > tr:not(.th)',
                    insertPosition: ['css;tbody', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollDelta: 1000
                }
            }, //    Discuz! - 回复页、主题页（别人的）
            discuz_collection: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[contains(@class, "nxt") or contains(@class, "next")][@href][not(contains(@href, "javascript"))]',
                    pageElement: 'css;#ct .bm_c table > tbody',
                    insertPosition: ['css;#ct .bm_c table', 3],
                    replaceE: 'css;.pg, .pages',
                    scrollDelta: 1000
                }
            }, //  Discuz! - 淘帖页
            flarum: {
                SiteTypeID: 0,
                functionStart: function() {locationchange = true;if (location.pathname.indexOf('/d/') === -1) {curSite = DBSite.flarum;}},
                pager: {
                    type: 2,
                    nextLink: '.DiscussionList-loadMore > button[title]',
                    intervals: 500,
                    scrollDelta: 1000
                }
            }, //             Flarum
            dux: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//li[@class="next-page"]/a[@href]',
                    pageElement: 'css;.content > article',
                    insertPosition: ['css;.content > .pagination', 1],
                    replaceE: 'css;.content > .pagination',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img.thumb[data-src]', 'data-src']
                }
            }, //                WordPress 主题
            baidu: {
                SiteTypeID: 0,
                host: 'www.baidu.com',
                insStyle: '.new-pmd .c-img-border {position: initial !important;} .op-bk-polysemy-video__wrap.c-gap-bottom {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: 'id("page")//a[contains(text(),"下一页")][@href]',
                    pageElement: 'css;#content_left > *',
                    insertPosition: ['css;#content_left', 3],
                    replaceE: 'css;#page',
                    scrollDelta: 1200
                }
            }, //                  百度 搜素
            google: {
                SiteTypeID: 0,
                host: /.google./,
                functionStart: function() {if (location.pathname === '/search') {
                    curSite = DBSite.google;
                } else if (location.pathname === '/scholar') {
                    curSite = DBSite.google_scholar;
                }},
                pager: {
                    type: 1,
                    nextLink: 'id("pnnext")[@href]',
                    pageElement: 'css;#res > *',
                    insertPosition: ['css;#res', 3],
                    replaceE: 'id("navcnt") | id("rcnt")//div[@role="navigation"]',
                    scriptType: 1,
                    scrollDelta: 3000
                }
            }, //                 谷歌 搜索
            bing: {
                SiteTypeID: 0,
                host: ['www.bing.com','cn.bing.com'],
                functionStart: function() {if (location.pathname === '/search') {
                    curSite = DBSite.bing;
                } else if (location.pathname === '/academic/search') {
                    curSite = DBSite.bing_academic;
                }},
                insStyle: '.b_imagePair.square_mp > .inner {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: '//a[contains(@class,"sb_pagN")][@href]',
                    pageElement: 'css;#b_results > li:not(.b_msg):not(.b_pag):not(#mfa_root)',
                    insertPosition: ['css;#b_results > .b_pag', 1],
                    replaceE: 'css;#b_results > .b_pag',
                    scrollDelta: 1500
                }
            }, //                   必应 搜索
            sogou: {
                SiteTypeID: 0,
                host: 'www.sogou.com',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.sogou;}},
                pager: {
                    type: 1,
                    nextLink: 'css;#sogou_next',
                    pageElement: 'css;.results > *',
                    insertPosition: ['css;.results', 3],
                    replaceE: 'css;#pagebar_container',
                    scriptType: 4,
                    scrollDelta: 1200
                }
            }, //                  搜狗 搜索
            sogou_weixin: {
                SiteTypeID: 0,
                host: 'weixin.sogou.com',
                functionStart: function() {if (location.pathname === '/') {
                    curSite = DBSite.sogou_weixin;
                } else if (location.pathname === '/weixin') {
                    curSite = DBSite.sogou_weixin_search;
                }},
                pager: {
                    type: 2,
                    nextLink: '#look-more',
                    intervals: 1000,
                    scrollDelta: 1000
                }
            }, //           搜狗微信 - 首页
            sogou_weixin_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;#sogou_next',
                    pageElement: 'css;.news-box > ul[class*="news-list"] > li',
                    insertPosition: ['css;.news-box > ul[class*="news-list"]', 3],
                    replaceE: 'css;#pagebar_container',
                    scrollDelta: 1000
                }
            }, //    搜狗微信 - 搜索
            toutiao: {
                SiteTypeID: 0,
                host: ['www.toutiao.com', 'so.toutiao.com'],
                functionStart: function() {if (location.hostname != 'www.toutiao.com') {if (location.pathname === '/search') {curSite = DBSite.toutiao;}}},
                pager: {
                    type: 1,
                    nextLink: '//div[contains(@class, "-pagination")]/a[contains(string(), "下一页")]',
                    pageElement: 'css;div[class*="-result-list"] > .result-content[data-i]',
                    insertPosition: ['css;div[class*="-result-list"] > .result-content:not([data-i]):last-child', 1],
                    replaceE: 'css;div[class*="-pagination"]',
                    scrollDelta: 1200
                },
                function: {
                    before: toutiao_functionBefore
                }
            }, //                头条 搜索
            so: {
                SiteTypeID: 0,
                host: 'www.so.com',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.so; insStyle('img {opacity: 1 !important;}')}},
                pager: {
                    type: 1,
                    nextLink: 'css;#snext[href]',
                    pageElement: 'css;ul.result > li, style:not(src)',
                    insertPosition: ['css;ul.result', 3],
                    replaceE: 'css;#page',
                    scrollDelta: 1200
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-isrc]', 'data-isrc']
                }
            }, //                     360 搜索
            duckduckgo: {
                SiteTypeID: 0,
                host: 'duckduckgo.com',
                functionStart: function() {
                    if (getCookie('av') != '1') {
                        document.cookie='av=1; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 强制开启自带的无缝翻页功能
                        location.reload(); // 刷新网页
                    }
                },
            }, //             DuckDuckGo 搜索
            startpage: {
                SiteTypeID: 0,
                host: 'www.startpage.com',
                functionStart: function() {if (location.pathname.indexOf('/search') > -1) {curSite = DBSite.startpage;}},
                pager: {
                    type: 1,
                    nextLink: startpage_functionNext,
                    pageElement: 'css;section.w-gl--desktop > div',
                    insertPosition: ['css;section.w-gl--desktop', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //              Startpage 搜索
            yandex: {
                SiteTypeID: 0,
                host: 'yandex.com',
                functionStart: function() {if (location.pathname === '/search/') {curSite = DBSite.yandex;}},
                pager: {
                    type: 1,
                    nextLink: 'css;a.pager__item_kind_next',
                    pageElement: 'css;#search-result > *, style',
                    insertPosition: ['css;#search-result', 3],
                    replaceE: 'css;.pager',
                    scrollDelta: 1500
                }
            }, //                 Yandex 搜索
            yahoo: {
                SiteTypeID: 0,
                host: 'search.yahoo.com',
                functionStart: function() {if (location.pathname.indexOf('/search') > -1) {curSite = DBSite.yahoo;}},
                pager: {
                    type: 1,
                    nextLink: 'css;.pagination a.next[href]',
                    pageElement: 'css;#web ol > li',
                    insertPosition: ['css;#web ol', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //                  Yahoo 搜索
            yahoo_jp: {
                SiteTypeID: 0,
                host: 'search.yahoo.co.jp',
                functionStart: function() {if (location.pathname.indexOf('/search') > -1) {curSite = DBSite.yahoo_jp;}},
                pager: {
                    type: 1,
                    nextLink: 'css;.Pagenation__next > a[href]',
                    pageElement: 'css;.Contents__innerGroupBody > div',
                    insertPosition: ['css;.Contents__innerGroupBody', 3],
                    replaceE: 'css;.Pagenation',
                    scrollDelta: 1500
                }
            }, //               Yahoo 搜索 (JP)
            qwant: {
                SiteTypeID: 0,
                host: 'www.qwant.com',
                functionStart: function() {locationchange = true; if (location.search.indexOf('q=') > -1 && location.search.indexOf('t=web') > -1) {curSite = DBSite.qwant;}},
                pager: {
                    type: 2,
                    nextLink: 'button[data-testid="buttonShowMore"]',
                    intervals: 500,
                    scrollDelta: 1500
                }
            }, //                  Qwant 搜索
            ecosia: {
                SiteTypeID: 0,
                host: 'www.ecosia.org',
                functionStart: function() {if (location.pathname === '/search') {curSite = DBSite.ecosia;}},
                pager: {
                    type: 1,
                    nextLink: 'css;nav.pagination a[href][aria-label="Next page"]',
                    pageElement: 'css;section.mainline > div:not(.related-queries)',
                    insertPosition: ['css;nav.pagination', 1],
                    replaceE: 'css;nav.pagination',
                    scrollDelta: 1500
                }
            }, //                 Ecosia 搜索
            magi: {
                SiteTypeID: 0,
                host: 'magi.com',
                functionStart: function() {if (location.pathname === '/search') {curSite = DBSite.magi;}},
                pager: {
                    type: 2,
                    nextLink: '.card[data-type="next"]',
                    nextText: '加载更多',
                    scrollDelta: 1500
                }
            }, //                   Magi 搜索
            baidu_tieba: {
                SiteTypeID: 0,
                host: 'tieba.baidu.com',
                functionStart: function() {if (location.pathname === '/f') {
                    baidu_tieba_1(); // 右侧悬浮发帖按钮点击事件（解决自动翻页导致无法发帖的问题）
                    curSite = DBSite.baidu_tieba;
                //} else if (location.pathname.indexOf('/p/') > -1) {
                    //curSite = DBSite.baidu_tieba_post;
                } else if (location.pathname === '/f/search/res') {
                    curSite = DBSite.baidu_tieba_search;
                }},
                insStyle: 'img.j_retract {margin-top: 0 !important;margin-bottom: 0 !important;}', // 修复帖子列表中预览图片，在切换下一个/上一个图片时，多出来的图片上下边距
                pager: {
                    type: 4,
                    nextLink: baidu_tieba_functionNext,
                    pageElement: 'css;#thread_list > li',
                    insertPosition: ['css;#thread_list', 3],
                    insertElement: baidu_tieba_insertElement,
                    replaceE: 'css;#frs_list_pager',
                    intervals: 3000,
                    scrollDelta: 2000
                },
                function: {
                    before: baidu_tieba_functionBefore
                }
            }, //        百度贴吧 - 帖子列表
            baidu_tieba_post: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//li[contains(@class,"pb_list_pager")]/a[contains(text(),"下一页")][@href]',
                    pageElement: 'css;#j_p_postlist > div',
                    insertPosition: ['css;#j_p_postlist', 3],
                    replaceE: 'css;li.pb_list_pager',
                    scrollDelta: 1000
                }
            }, //   百度贴吧 - 帖子内
            baidu_tieba_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next"][@href]',
                    pageElement: 'css;#j_p_postlist > *',
                    insertPosition: ['css;#j_p_postlist', 3],
                    replaceE: 'css;.pager.pager-search',
                    scriptType: 1,
                    scrollDelta: 1000
                }
            }, // 百度贴吧 - 搜索页
            douban_subject_comments: {
                SiteTypeID: 0,
                host: 'movie.douban.com',
                functionStart: function() {if (location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/comments') > -1) { // 短评列表
                    curSite = DBSite.douban_subject_comments;
                } else if (location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/reviews') > -1) { // 影评列表
                    curSite = DBSite.douban_subject_reviews;
                } else if(location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/episode') > -1) { // 电视剧每集评论
                    curSite = DBSite.douban_subject_episode;
                }},
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next"][@href]',
                    pageElement: 'css;#comments > .comment-item',
                    insertPosition: ['css;#paginator', 1],
                    replaceE: 'css;#paginator',
                    scrollDelta: 1000
                }
            }, // 豆瓣 - 短评
            douban_subject_reviews: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//link[@rel="next"][@href]',
                    pageElement: 'css;.review-list > div',
                    insertPosition: ['css;.review-list', 3],
                    replaceE: 'css;.paginator',
                    scrollDelta: 1000
                }
            }, //  豆瓣 - 影评
            douban_subject_episode: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//link[@rel="next"][@href]',
                    pageElement: 'css;#comments > div',
                    insertPosition: ['css;#comments', 3],
                    replaceE: 'css;.paginator',
                    scrollDelta: 1000
                }
            }, //  豆瓣 - 剧评
            douban_group: {
                SiteTypeID: 0,
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
                    nextLink: 'css;span.next > a',
                    pageElement: 'css;table.olt > tbody > tr:not(.th)',
                    insertPosition: ['css;table.olt > tbody', 3],
                    replaceE: 'css;.paginator',
                    scrollDelta: 1000
                }
            }, //            豆瓣 - 小组
            douban_group_explore: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;span.next > a',
                    pageElement: 'css;#content .article > div > .channel-item',
                    insertPosition: ['css;#content .article > div', 3],
                    replaceE: 'css;.paginator',
                    scrollDelta: 1000
                }
            }, //    豆瓣 - 小组讨论精选
            douban_group_topic: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;span.next > a',
                    pageElement: 'css;#comments > li',
                    insertPosition: ['css;#comments', 3],
                    replaceE: 'css;.paginator',
                    scrollDelta: 1000
                }
            }, //      豆瓣 - 小组帖子内
            weibo_comment: {
                SiteTypeID: 0,
                host: 'weibo.com',
                pager: {
                    type: 2,
                    nextLink: 'a[action-type="click_more_comment"]',
                    nextText: '查看更多c',
                    scrollDelta: 1000
                }
            }, //       微博评论
            tianya: {
                SiteTypeID: 0,
                host: 'bbs.tianya.cn',
                functionStart: function() {if (location.pathname.indexOf('/list') > -1) {
                    curSite = DBSite.tianya;
                } else if (location.pathname.indexOf('/post') > -1) {
                    curSite = DBSite.tianya_post;
                }},
                pager: {
                    type: 1,
                    nextLink: '//div[contains(@class, "pages")]/div[@class="links"]/a[contains(text(), "下一页")]',
                    pageElement: 'css;.tab-bbs-list > tbody:not(:first-of-type)',
                    insertPosition: ['css;table.tab-bbs-list', 3],
                    replaceE: '//div[contains(@class, "pages")]',
                    scrollDelta: 1500
                }
            }, //              天涯社区
            tianya_post: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'a.js-keyboard-next[href]',
                    pageElement: 'css;.atl-main > div[class="atl-item"]',
                    insertPosition: ['css;.atl-main', 3],
                    replaceE: 'css;.atl-pages > form',
                    scrollDelta: 1500
                }
            }, //         天涯社区 - 帖子内
            nga_thread: {
                SiteTypeID: 0,
                host: ['bbs.nga.cn', 'ngabbs.com', 'nga.178.com', 'g.nga.cn'],
                iframe: true,
                functionStart: function() {locationchange = true;
                if (location.pathname === '/thread.php') { // 帖子列表
                    curSite = DBSite.nga_thread;
                } else if (location.pathname === '/read.php') { // 帖子内
                    curSite = DBSite.nga_read;
                }},
                pager: {
                    type: 1,
                    nextLink: 'css;#pagebbtm a[title="下一页"][href]',
                    pageElement: 'css;#topicrows > tbody, #topicrows > script',
                    insertPosition: ['css;#topicrows', 3],
                    replaceE: 'css;div[name="pageball"]',
                    scriptType: 2,
                    scrollDelta: 1000
                },
                function: {
                    after: nga_thread_functionAfter
                }
            }, //          NGA - 各版块帖子列表
            nga_read: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;#pagebbtm a[title*="下一页"][href]',
                    pageElement: 'id("m_posts_c")/table | id("m_posts_c")/script | //script[contains(text(), "commonui.userInfo.setAll")]',
                    insertPosition: ['css;#m_posts_c', 3],
                    replaceE: 'css;div[name="pageball"]',
                    scriptType: 2,
                    scrollDelta: 1000
                }
            }, //            NGA - 帖子内
            v2ex_recent: {
                SiteTypeID: 0,
                host: ['v2ex.com', 'www.v2ex.com'],
                functionStart: function() {if (location.pathname === '/') { //                          首页
                    v2ex_functionAfter('#Main a.topic-link:not([target])');
                } else if (location.pathname === '/recent') { //             最近主题页
                    curSite = DBSite.v2ex_recent;
                    v2ex_functionAfter('#Main a.topic-link:not([target])');
                } else if (location.pathname === '/notifications') { //      提醒消息页
                    curSite = DBSite.v2ex_notifications;
                    v2ex_functionAfter('#Main a[href^="/t/"]:not([target])');
                } else if (location.pathname === '/balance') { //            账户余额页
                    curSite = DBSite.v2ex_balance;
                } else if (location.pathname.indexOf('/go/') > -1) { //      分类主题页
                    curSite = DBSite.v2ex_go;
                    v2ex_functionAfter('#Main a.topic-link:not([target])');
                } else if (location.pathname.indexOf('/replies') > -1) { //  用户回复页
                    curSite = DBSite.v2ex_replies;
                    v2ex_functionAfter('#Main a[href^="/t/"]:not([target])');
                }},
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                    pageElement: 'css;.cell.item',
                    insertPosition: ['//div[@id="Main"]//div[@class="box"]//div[@class="cell"][last()]', 1],
                    replaceE: 'css;#Main > .box > .cell[style]:not(.item) > table',
                    scrollDelta: 1500
                },
                function: {
                    after: v2ex_functionAfter,
                    parameter: '#Main a.topic-link:not([target])'
                }
            }, //         V2EX - 最近主题页
            v2ex_notifications: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                    pageElement: 'css;#notifications > div',
                    insertPosition: ['css;#notifications', 3],
                    replaceE: 'css;#Main > .box > .cell[style] > table',
                    scrollDelta: 1500
                },
                function: {
                    after: v2ex_functionAfter,
                    parameter: '#Main a[href^="/t/"]:not([target])'
                }
            }, //  V2EX - 提醒消息页
            v2ex_replies: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                    pageElement: '//div[@id="Main"]//div[@class="box"]//div[@class="dock_area"] | //*[@id="Main"]//div[@class="box"]//div[@class="inner"] | //*[@id="Main"]//div[@class="box"]//div[@class="dock_area"][last()]/following-sibling::div[@class="cell"][1]',
                    insertPosition: ['//div[@id="Main"]//div[@class="box"]//div[@class="cell"][last()]', 1],
                    replaceE: 'css;#Main > .box > .cell[style] > table',
                    scrollDelta: 1500
                },
                function: {
                    after: v2ex_functionAfter,
                    parameter: '#Main a[href^="/t/"]:not([target])'
                }
            }, //        V2EX - 用户回复页
            v2ex_go: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                    pageElement: 'css;#TopicsNode > div',
                    insertPosition: ['css;#TopicsNode', 3],
                    replaceE: 'css;#Main > .box > .cell[style] > table',
                    scrollDelta: 1500
                },
                function: {
                    after: v2ex_functionAfter,
                    parameter: '#Main a.topic-link:not([target])'
                }
            }, //             V2EX - 分类主题页
            v2ex_balance: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page_current"]/following-sibling::a[1][@href]',
                    pageElement: 'css;#Main .box > div:not(.cell) > table > tbody > tr:not(:first-child)',
                    insertPosition: ['css;#Main .box > div:not(.cell) > table > tbody', 3],
                    replaceE: 'css;#Main > .box > .cell[style] > table',
                    scrollDelta: 1000
                }
            }, //        V2EX - 账户余额页
            jandan: {
                SiteTypeID: 0,
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
                    nextLink: '//div[@class="wp-pagenavi"]/a[contains(text(), "下一页") or contains(text(), "更多文章")]',
                    pageElement: 'css;#content > .list-post',
                    insertPosition: ['css;.wp-pagenavi', 1],
                    replaceE: 'css;.wp-pagenavi, #nav_prev',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //              煎蛋网
            jandan_comment: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.previous-comment-page',
                    pageElement: 'css;ol.commentlist > li[id^="comment-"], script[src^="//cdn.jandan.net/static/min/"]',
                    insertPosition: ['css;ol.commentlist', 3],
                    replaceE: 'css;.cp-pagenavi, #nav_prev',
                    scriptType: 3,
                    scrollDelta: 1500
                }
            }, //      煎蛋网
            jandan_dzh: {
                SiteTypeID: 0,
                pager: {
                    type: 2,
                    nextLink: '.show_more',
                    intervals: 1500,
                    scrollDelta: 1500
                }
            }, //          煎蛋网 - 大杂烩
            qiushibaike: {
                SiteTypeID: 0,
                host: 'www.qiushibaike.com',
                functionStart: function() {insStyle('.qrcode-wrap, .qrcode-wrap-img, .index-side-left-AD1 {display: none !important;}');
                if (location.pathname === '/') {
                    curSite = DBSite.qiushibaike;
                } else if (location.pathname.indexOf('/article/') === -1) {
                    curSite = DBSite.qiushibaike_;
                }},
                pager: {
                    type: 1,
                    nextLink: '//ul[@class="pagination"]//a[./span[@class="next"]]',
                    pageElement: 'css;.recommend-article > ul > li',
                    insertPosition: ['css;.recommend-article > ul', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1500
                }
            }, //         糗事百科
            qiushibaike_: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//ul[@class="pagination"]//a[./span[@class="next"]]',
                    pageElement: 'css;[id^="qiushi_tag_"]',
                    insertPosition: ['css;ul.pagination', 1],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1500
                }
            }, //        糗事百科 - 分类页
            lkong: {
                SiteTypeID: 0,
                host: 'www.lkong.com',
                functionStart: function() {if (location.pathname.indexOf('/forum/') > -1) {
                    curSite = DBSite.lkong;
                } else if (location.pathname.indexOf('/thread/') > -1) {
                    curSite = DBSite.lkong_thread;
                }},
                pager: {
                    type: 1,
                    nextLink: lkong_functionNext,
                    pageElement: '//div[@class="main-title"]/parent::div/parent::div | //head/style[@data-emotion-css]',
                    insertPosition: ['//div[@class="main-title"][1]/parent::div/parent::div/parent::div', 3],
                    replaceE: 'css;ul.ant-pagination',
                    intervals: 500,
                    scrollDelta: 1200
                }
            }, //               龙的天空 - 各版块帖子列表
            lkong_thread: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: lkong_functionNext,
                    pageElement: '//div[@class="main-content"]/parent::div | //head/style[@data-emotion-css]',
                    insertPosition: ['//div[@class="main-content"][1]/parent::div/parent::div', 3],
                    replaceE: 'css;ul.ant-pagination',
                    intervals: 500,
                    scrollDelta: 1200
                }
            }, //        龙的天空 - 帖子内
            pediy_forum: {
                SiteTypeID: 0,
                host: 'bbs.pediy.com',
                functionStart: function() {if (location.pathname.indexOf('/forum-') > -1) {
                    curSite = DBSite.pediy_forum;
                } else if (location.pathname.indexOf('/thread-') > -1) {
                    if (GM_getValue('menu_discuz_thread_page')) {curSite = DBSite.pediy_thread;}
                }},
                pager: {
                    type: 1,
                    nextLink: '//ul[contains(@class, "pagination")]//a[contains(text(), "▶")]',
                    pageElement: 'css;table.threadlist > tbody > tr',
                    insertPosition: ['css;table.threadlist > tbody', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1500
                }
            }, //         看雪论坛 - 各版块帖子列表
            pediy_thread: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//ul[contains(@class, "pagination")]//a[contains(text(), "▶")]',
                    pageElement: 'css;table.postlist > tbody > tr[data-pid]',
                    insertPosition: ['css;table.postlist > tbody > tr:not([data-pid])', 1],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1500
                }
            }, //        看雪论坛 - 帖子内
            kdslife: {
                SiteTypeID: 0,
                host: 'club.kdslife.com',
                functionStart: function() {
                    if (location.pathname.indexOf('/f_') > -1) {
                        curSite = DBSite.kdslife;
                    } else if (location.pathname.indexOf('/t_') > -1) {
                        curSite = DBSite.kdslife_t;
                    }},
                pager: {
                    type: 1,
                    nextLink: '//div[@class="fr i3_r"]/a[@href][contains(text(), "后一页")]',
                    pageElement: 'css;ul.main_List > li.i2:not(.h_bg)',
                    insertPosition: ['css;ul.main_List > li.i3', 1],
                    replaceE: 'css;ul.main_List > li.i3',
                    scrollDelta: 1000
                }
            }, //             宽带山论坛
            kdslife_t: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pages"]/a[contains(text(), ">>")]',
                    pageElement: 'css;#reply_list_panel > *, script[src*="ui/js/kds.js"]',
                    insertPosition: ['css;#reply_list_panel', 3],
                    replaceE: 'css;.pages',
                    scriptType: 3,
                    scrollDelta: 1000
                }
            }, //           宽带山论坛 - 帖子内
            libaclub: {
                SiteTypeID: 0,
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
                    nextLink: '//div[@class="ui-crumbs-more"]/a[@class="fn-link"][1]',
                    pageElement: 'css;ul.ui-list > li:not(.ui-list-item-head):not(.ui-list-merchant-ad)',
                    insertPosition: ['css;ul.ui-list', 3],
                    replaceE: 'css;div.ui-crumbs-more',
                    scrollDelta: 1200
                }
            }, //            篱笆网论坛
            libaclub_f: {
                SiteTypeID: 0,
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: '//div[@class="ui-paging"]/a[@class="ui-paging-next"]',
                    pageElement: 'css;ul.ui-list > li:not(.ui-list-item-head):not(.ui-list-merchant-ad)',
                    insertPosition: ['css;ul.ui-list', 3],
                    replaceE: 'css;div.ui-paging',
                    scrollDelta: 1200
                }
            }, //          篱笆网论坛 - 各版块帖子列表
            libaclub_t: {
                SiteTypeID: 0,
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: 'css;a.ui-paging-next',
                    pageElement: 'css;.ui-box-content > div.ui-topic, .ui-box-content > a[name]',
                    insertPosition: ['css;.ui-box-content', 3],
                    replaceE: 'css;div.ui-paging',
                    scrollDelta: 1500
                }
            }, //          篱笆网论坛 - 帖子内
            libaclub_prt: {
                SiteTypeID: 0,
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: 'css;a.ui-paging-next',
                    pageElement: 'css;ul.ui-list > li',
                    insertPosition: ['css;ul.ui-list', 3],
                    replaceE: 'css;div.ui-paging',
                    scrollDelta: 2000
                }
            }, //        篱笆网论坛 - 帖子内 - 打印版
            libaclub_search: {
                SiteTypeID: 0,
                insStyle: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: '//div[@class="ui-page"]/a[contains(text(), "下一页")]',
                    pageElement: 'css;.ui-box-main > ul.ui-list > li',
                    insertPosition: ['css;.ui-box-main > ul.ui-list', 3],
                    replaceE: 'css;div.ui-page',
                    scrollDelta: 1200
                }
            }, //     篱笆网论坛 - 搜索页
            lowendtalk: {
                SiteTypeID: 0,
                host: 'lowendtalk.com',
                pager: {
                    type: 1,
                    nextLink: 'css;a.Next[href]',
                    pageElement: 'css;ul.DataList > li',
                    insertPosition: ['css;ul.DataList', 3],
                    replaceE: 'css;.Pager',
                    scrollDelta: 1500
                }
            }, //          LowEndTalk
            lieyou: {
                SiteTypeID: 0,
                host: 'bbs.lieyou888.com',
                functionStart: function() {if (location.pathname.indexOf('/forum') > -1) {curSite = DBSite.lieyou;}},
                pager: {
                    type: 1,
                    nextLink: '//div[contains(@class, "_pageNav")]/a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;ul.gb-bbs-list > li',
                    insertPosition: ['css;ul.gb-bbs-list', 3],
                    replaceE: 'css;._pageNav',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[original]', 'original']
                }
            }, //              芥子空间论坛
            xcar_forumdisplay: {
                SiteTypeID: 0,
                host: 'www.xcar.com.cn',
                functionStart: function() {if (location.pathname === '/bbs/forumdisplay.php') {curSite = DBSite.xcar_forumdisplay}},
                pager: {
                    type: 1,
                    nextLink: 'css;a.page_down',
                    pageElement: 'css;.table-section > dl:not(.table_head)',
                    insertPosition: ['css;.table-section', 3],
                    replaceE: 'css;.forumList_page',
                    scrollDelta: 2000
                }
            }, //   爱卡汽车网论坛 - 各版块帖子列表
            flyert_forumdisplay: {
                SiteTypeID: 0,
                host: 'www.flyert.com',
                functionStart: function() {if (location.search.indexOf('mod=forumdisplay') > -1) {
                    curSite = DBSite.flyert_forumdisplay;
                } else if (location.search.indexOf('mod=viewthread') > -1) {
                    if (GM_getValue('menu_discuz_thread_page')) {curSite = DBSite.flyert_viewthread;}
                }},
                pager: {
                    type: 1,
                    nextLink: '//a[@class="nxt"][@href][not(contains(@href, "javascript"))]',
                    pageElement: 'css;#threadlist table > tbody[id^="normalthread_"]',
                    insertPosition: ['id("threadlist")//table/tbody[starts-with(@id, "normalthread_")]/parent::table', 3],
                    replaceE: 'css;.pg',
                    scrollDelta: 2500
                }
            }, // 飞客网论坛 - 各版块帖子列表
            flyert_viewthread: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="nxt"][@href][not(contains(@href, "javascript"))]',
                    pageElement: 'css;#postlist > .comiis_viewbox',
                    insertPosition: ['css;#postlist', 3],
                    replaceE: 'css;.comiis_pgs > .pg',
                    scrollDelta: 3000
                }
            }, //   飞客网论坛 - 帖子内
            adnmb3: {
                SiteTypeID: 0,
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
                    nextLink: '//ul[contains(@class, "pagination")]//a[contains(text(), "下一页")]',
                    pageElement: 'css;.h-threads-list > *, script[src$="/h.desktop.js"]',
                    insertPosition: ['css;.h-threads-list', 3],
                    replaceE: '//ul[contains(@class, "pagination")]',
                    scriptType: 3,
                    scrollDelta: 1500
                }
            }, //              A 岛
            adnmb3_t: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//ul[contains(@class, "pagination")]//a[contains(text(), "下一页")]',
                    pageElement: 'css;.h-threads-list > .h-threads-item > .h-threads-item-replys, script[src$="/h.desktop.js"]',
                    insertPosition: ['css;.h-threads-list > .h-threads-item', 3],
                    replaceE: '//ul[contains(@class, "pagination")]',
                    scriptType: 3,
                    scrollDelta: 1500
                }
            }, //            A 岛 - 帖子内
            adnmb3_mf: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//li[contains(@class, "pagination-next")]//a[contains(text(), "下一页")]',
                    pageElement: 'css;.h-middle > div[id^="threads_"], .h-middle > hr.h-middle > div[id^="threads_"], .h-middle > hr:nth-of-type(n+2), script[src$="/h.mobile.js"]',
                    insertPosition: ['css;#h-threads-pagination', 1],
                    replaceE: 'css;#h-threads-pagination',
                    scriptType: 3,
                    scrollDelta: 1500
                }
            }, //           A 岛 - 帖子列表（手机版）
            adnmb3_mt: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//li[contains(@class, "pagination-next")]//a[contains(text(), "下一页")]',
                    pageElement: 'css;.h-threads-replylist > div, script[src$="/h.mobile.js"]',
                    insertPosition: ['css;.h-threads-replylist', 3],
                    replaceE: 'css;#h-threads-pagination',
                    scriptType: 3,
                    scrollDelta: 1500
                }
            }, //           A 岛 - 帖子内（手机版）
            guokr: {
                SiteTypeID: 0,
                host: 'www.guokr.com',
                pager: {
                    type: 2,
                    nextLink: 'div[class*="LoadMoreWrap"]',
                    intervals: 1500,
                    scrollDelta: 1500
                }
            }, //                   果壳网
            expreview: {
                SiteTypeID: 0,
                host: 'www.expreview.com',
                pager: {
                    type: 2,
                    nextLink: '#show_article_red_1SHOW',
                    intervals: 1500,
                    scrollDelta: 1500
                }
            }, //               超能网
            landian: {
                SiteTypeID: 0,
                host: 'www.landian.vip',
                pager: {
                    type: 2,
                    nextLink: '.load-more > button',
                    nextText: '加载更多',
                    scrollDelta: 1300
                }
            }, //                 蓝点网
            ithome: {
                SiteTypeID: 0,
                host: 'www.ithome.com',
                pager: {
                    type: 2,
                    nextLink: 'a.more',
                    intervals: 1500,
                    scrollDelta: 1500
                }
            }, //                  IT 之家
            _58pic: {
                SiteTypeID: 0,
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
                    nextLink: '//div[contains(@class,"page-box")]//a[text()="下一页"][@href]',
                    pageElement: 'css;.pic-box > .qtw-card',
                    insertPosition: ['css;.pic-box', 3],
                    replaceE: 'css;.page-box',
                    scrollDelta: 2500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //              千图网 - 分类/搜索页
            _58pic_c: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[contains(@class,"page-box")]//a[text()="下一页"][@href]',
                    pageElement: 'css;.list-box > .qtw-card',
                    insertPosition: ['css;.list-box', 3],
                    replaceE: 'css;.page-box',
                    scrollDelta: 4000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //            千图网 - 专题/收藏夹
            pixabay: {
                SiteTypeID: 0,
                host: 'pixabay.com',
                pager: {
                    type: 1,
                    nextLink: '//a[text()="›"][@href]',
                    pageElement: 'css;[class^="results"]  > [class^="container"] > div',
                    insertPosition: ['css;[class^="results"]  > [class^="container"]', 3],
                    replaceE: '//a[text()="›"][@href]',
                    scrollDelta: 2000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-lazy-src]', 'data-lazy-src']
                }
            }, //             Pixabay
            logosc: {
                SiteTypeID: 0,
                host: 'www.logosc.cn',
                functionStart: function() {if (location.pathname.indexOf('/so/') > -1) {curSite = DBSite.logosc;}},
                pager: {
                    type: 2,
                    nextLink: 'button.so-pablo-button',
                    intervals: 1500,
                    scrollDelta: 1500
                }
            }, //              搜图神器 (免费无版权)
            puxiang: {
                SiteTypeID: 0,
                host: 'www.puxiang.com',
                functionStart: function() {if (location.pathname === '/search/favorite') {
                    curSite = DBSite.puxiang_collect;
                } else if (location.pathname === '/search/puxiang' || location.pathname === '/list' || location.pathname === '/galleries' || location.pathname === '/articles') {
                    curSite = DBSite.puxiang;
                } else if (location.pathname === '/') {
                    curSite = DBSite.puxiang; curSite.pager.scrollDelta = 4000;
                }},
                pager: {
                    type: 1,
                    nextLink: 'css;li.next > a[href]',
                    pageElement: 'css;.work-list > div',
                    insertPosition: ['css;.work-list', 3],
                    replaceE: 'css;.pagerbar',
                    scrollDelta: 1500
                }
            }, //             普象网 - 作品集/搜索页
            puxiang_collect: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;li.next > a[href]',
                    pageElement: 'css;.collect-list > div',
                    insertPosition: ['css;.collect-list', 3],
                    replaceE: 'css;.pagerbar',
                    scrollDelta: 1500
                }
            }, //     普象网 - 收藏夹
            om: {
                SiteTypeID: 0,
                host: 'www.om.cn',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.om;}},
                pager: {
                    type: 1,
                    nextLink: 'css;li.next > a[href]',
                    pageElement: 'css;.main_content > ul > li',
                    insertPosition: ['css;.main_content > ul', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1500
                }
            }, //                  欧模网
            _3dmgame: {
                SiteTypeID: 0,
                host: 'www.3dmgame.com',
                pager: {
                    type: 3,
                    nextLink: '//li[@class="next"]/a[@href]',
                    pageElement: 'css;.news_warp_center > *',
                    insertPosition: ['css;.news_warp_center', 3],
                    replaceE: 'css;.pagewrap',
                    scrollElement: '.pagewrap',
                    scrollDelta: 400
                }
            }, //                3DM
            _3dmgame_mod: {
                SiteTypeID: 0,
                host: 'mod.3dmgame.com',
                pager: {
                    type: 1,
                    nextLink: _3dmgame_mod_functionNext,
                    pageElement: '//div[contains(@class, "game-mod-list") or contains(@class, "search-mod-list")] | //script[not(@src or @type)][contains(text(), ".game-mod-page") or contains(text(), ".search-mod-page")]',
                    insertPosition: ['//div[contains(@class, "game-mod-wrap") or contains(@class, "search-mod ")]', 3],
                    scriptType: 2,
                    history: true,
                    scrollDelta: 1200
                }
            }, //            3DM MOD站
            ali213_www: {
                SiteTypeID: 0,
                host: 'www.ali213.net',
                pager: {
                    type: 3,
                    nextLink: 'id("after_this_page")[@href]',
                    pageElement: 'css;#Content >*:not(.news_ding):not(.page_fenye)',
                    insertPosition: ['css;.page_fenye', 1],
                    replaceE: 'css;.page_fenye',
                    scrollElement: '.page_fenye',
                    scrollDelta: 400
                }
            }, //              游侠网
            ali213_gl: {
                SiteTypeID: 0,
                host: 'gl.ali213.net',
                insStyle: '.n_show_b {display: none !important;}',
                pager: {
                    type: 3,
                    nextLink: '//a[@class="next n"][@href]',
                    pageElement: 'css;.c-detail >*',
                    insertPosition: ['css;.c-detail', 3],
                    replaceE: 'css;.page_fenye',
                    scrollElement: '.page_fenye',
                    scrollDelta: 400
                }
            }, //               游侠网 - 攻略
            ali213_pic: {
                SiteTypeID: 0,
                host: 'pic.ali213.net',
                insStyle: 'a.prev, a.next {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: 'css;a.next[href]',
                    pageElement: 'css;#image-show > img',
                    insertPosition: ['css;#image-show', 3],
                    replaceE: 'css;#image-show > a',
                    scrollDelta: 1200
                }
            }, //              游侠网 - 图库
            gamersky_ent: {
                SiteTypeID: 0,
                host: 'www.gamersky.com',
                functionStart: function() {if (location.pathname.indexOf('/ent/') > -1) {curSite = DBSite.gamersky_ent;} else {curSite = DBSite.gamersky_gl;}},
                pager: {
                    type: 3,
                    nextLink: '//div[@class="page_css"]/a[text()="下一页"][@href]',
                    pageElement: 'css;.Mid2L_con > *:not(.gs_nc_editor):not(.pagecss):not(.page_css):not(.gs_ccs_solve):not(.post_ding)',
                    insertPosition: ['css;.page_css', 1],
                    replaceE: 'css;.page_css',
                    scrollElement: '.page_css',
                    scrollDelta: 100
                }
            }, //            游民星空
            gamersky_gl: {
                SiteTypeID: 0,
                pager: {
                    type: 3,
                    nextLink: '//div[@class="page_css"]/a[text()="下一页"][@href]',
                    forceHTTPS: true,
                    pageElement: 'css;.Mid2L_con > *:not(.gs_nc_editor):not(.pagecss):not(.gs_ccs_solve):not(.post_ding)',
                    insertPosition: ['css;.gs_nc_editor', 1],
                    replaceE: 'css;.page_css',
                    scrollElement: '.pagecss',
                    scrollDelta: -1000
                },
                function: {
                    before: gamersky_gl_functionBefore
                }
            }, //             游民星空 - 攻略
            nexusmods: {
                SiteTypeID: 0,
                host: 'www.nexusmods.com',
                pager: {
                    type: 4,
                    nextLink: nexusmods_functionNext,
                    pageElement: 'css;ul.tiles > li',
                    insertPosition: ['css;ul.tiles', 3],
                    insertElement: nexusmods_insertElement,
                    replaceE: 'css;.pagination',
                    scrollDelta: 3000
                }
            }, //               NexusMods
            steamcommunity: {
                SiteTypeID: 0,
                host: 'steamcommunity.com',
                pager: {
                    type: 1,
                    nextLink: '//a[@class="pagebtn"][last()][@href]',
                    pageElement: 'css;.workshopBrowseItems > *',
                    insertPosition: ['css;.workshopBrowseItems', 3],
                    replaceE: 'css;.workshopBrowsePaging',
                    scriptType: 2,
                    scrollDelta: 1500
                }
            }, //          创意工坊 - 项目列表
            yikm: {
                SiteTypeID: 0,
                host: 'www.yikm.net',
                pager: {
                    type: 1,
                    nextLink: '//ul[@class="pager"]//a[text()="下一页"]',
                    pageElement: '//h2[contains(text(), "所有游戏") or contains(text(), "搜索结果")]/following-sibling::div[1]/div',
                    insertPosition: ['//h2[contains(text(), "所有游戏") or contains(text(), "搜索结果")]/following-sibling::div[1]', 3],
                    replaceE: 'css;ul.pager',
                    scrollDelta: 1500
                }
            }, //                    小霸王其乐无穷
            cs_rin_ru: {
                SiteTypeID: 0,
                host: 'cs.rin.ru',
                functionStart: function() {if (location.pathname === '/forum/viewforum.php') { // 版块帖子列表
                    curSite = DBSite.cs_rin_ru;
                } else if (location.pathname === '/forum/viewtopic.php') { // 帖子内
                    if (GM_getValue('menu_discuz_thread_page')) curSite = DBSite.cs_rin_ru_viewtopic;
                } else if (location.pathname === '/forum/search.php') { // 搜索结果
                    curSite = DBSite.cs_rin_ru_search;
                }},
                pager: {
                    type: 1,
                    nextLink: '//td[@class="gensmall"][@align="right"]//a[text()="Next"][@href]',
                    pageElement: 'css;#pagecontent > table.tablebg > tbody > tr:not([align])',
                    insertPosition: ['css;#pagecontent > table.tablebg > tbody > tr[align]', 1],
                    replaceE: 'css;#pagecontent > table:first-child',
                    scrollDelta: 1500
                },
                function: {
                    before: cs_rin_ru_functionBefore
                }
            }, //               cs.rin.ru - 各版块帖子列表
            cs_rin_ru_viewtopic: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'id("pageheader")/p[@class="gensmall"]//a[text()="Next"][@href]',
                    pageElement: 'css;#pagecontent > table.tablebg:not(:nth-last-child(2)):not(:nth-child(2))',
                    insertPosition: ['css;#pagecontent > table.tablebg:nth-last-child(2)', 1],
                    replaceE: 'css;#pagecontent >table:not(.tablebg), #pageheader p.gensmall',
                    scrollDelta: 1500
                }
            }, //     cs.rin.ru - 帖子内
            cs_rin_ru_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'id("wrapcentre")/div[@class="nav"]//a[text()="Next"]',
                    pageElement: 'css;#wrapcentre > form > table.tablebg > tbody > tr[valign]',
                    insertPosition: ['css;#wrapcentre > form > table.tablebg > tbody > tr:last-child', 1],
                    replaceE: 'css;#wrapcentre > div',
                    scrollDelta: 1500
                }
            }, //        cs.rin.ru - 搜索页
            crackhub: {
                SiteTypeID: 0,
                host: 'crackhub.site',
                insStyle: 'html.wp-dark-mode-active .inside-article {background-color: var(--wp-dark-mode-bg);}',
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next page-numbers"][@href]',
                    pageElement: 'css;article[id^="post-"]',
                    insertPosition: ['css;nav.paging-navigation', 1],
                    replaceE: 'css;nav.paging-navigation',
                    scrollDelta: 2000
                }
            }, //                Crackhub213
            fitgirl: {
                SiteTypeID: 0,
                host: 'fitgirl-repacks.site',
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next page-numbers"][@href]',
                    pageElement: 'css;article[id^="post-"]',
                    insertPosition: ['css;nav.paging-navigation', 1],
                    replaceE: 'css;nav.paging-navigation',
                    scrollDelta: 2000
                }
            }, //                 FitGirl Repacks
            pianku: {
                SiteTypeID: 0,
                host: /pianku/,
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.pianku;}},
                pager: {
                    type: 1,
                    nextLink: 'css;a.a1[href]',
                    pageElement: 'css;.content-list > li',
                    insertPosition: ['css;.content-list', 3],
                    replaceE: 'css;.pages',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-src]', 'data-src']
                }
            }, //          片库
            cupfox: {
                SiteTypeID: 0,
                host: 'www.cupfox.com',
                pager: {
                    type: 2,
                    nextLink: '.load-more',
                    nextText: '点击加载更多',
                    scrollDelta: 700
                }
            }, //          茶杯狐
            novipnoad: {
                SiteTypeID: 0,
                host: 'www.novipnoad.com',
                functionStart: function() {if (location.pathname != '/' && location.pathname.indexOf('.html') === -1) {curSite = DBSite.novipnoad;}},
                pager: {
                    type: 1,
                    nextLink: 'css;a.nextpostslink',
                    pageElement: 'css;.video-listing-content .row > div',
                    insertPosition: ['css;.video-listing-content .row', 3],
                    replaceE: 'css;.wp-pagenavi',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //       NO视频
            ddrk: {
                SiteTypeID: 0,
                host: ['ddrk.me', 'ddys.tv'],
                functionStart: function() {if (location.pathname === '/' || location.pathname.indexOf('/category/') > -1 || location.pathname.indexOf('/tag/') > -1) {curSite = DBSite.ddrk;}},
                pager: {
                    type: 1,
                    nextLink: 'css;a.next',
                    pageElement: 'css;.post-box-list > article',
                    insertPosition: ['css;.post-box-list', 3],
                    replaceE: 'css;.pagination_wrap',
                    scrollDelta: 1500
                }
            }, //            低端影视
            nfmovies: {
                SiteTypeID: 0,
                host: 'www.nfmovies.com',
                functionStart: function() {if (location.pathname === '/search.php' || location.pathname.indexOf('/list/') > -1) {curSite = DBSite.nfmovies;}},
                pager: {
                    type: 1,
                    nextLink: '//ul[contains(@class, "myui-page")]/li/a[contains(text(), "下一页")]',
                    pageElement: 'css;ul.myui-vodlist > li',
                    insertPosition: ['css;ul.myui-vodlist', 3],
                    replaceE: 'css;ul.myui-page',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [1, 'a[data-original]', 'data-original']
                }
            }, //        奈菲影视
            zxzj: {
                SiteTypeID: 0,
                host: 'www.zxzj.me',
                functionStart: function() {if (location.pathname != '/' && location.pathname.indexOf('/detail/') === -1) {curSite = DBSite.zxzj;}},
                insStyle: 'div.stui-page__all {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: '//ul[contains(@class, "stui-page__item")]//a[contains(text(), "下一页")]',
                    pageElement: 'css;ul.stui-vodlist > li',
                    insertPosition: ['css;ul.stui-vodlist', 3],
                    replaceE: 'css;ul.stui-page__item',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [1, 'a[data-original]', 'data-original']
                }
            }, //            在线之家
            _91mjw: {
                SiteTypeID: 0,
                host: '91mjw.com',
                functionStart: function() {if (location.pathname.indexOf('/video/') === -1 || location.pathname.indexOf('/vplay/') === -1) {curSite = DBSite._91mjw;}},
                pager: {
                    type: 1,
                    nextLink: 'css;.next-page > a',
                    pageElement: 'css;.m-movies > article',
                    insertPosition: ['css;.pagination', 1],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //          91 美剧网
            zhenbuka: {
                SiteTypeID: 0,
                host: ['www.zhenbuka3.com', 'www.zhenbuka5.com'],
                functionStart: function() {if (location.pathname.indexOf('/vodtype/') > -1) {curSite = DBSite.zhenbuka;}},
                pager: {
                    type: 1,
                    nextLink: '//ul[contains(@class, "stui-page")]/li/a[contains(text(), "下一页")]',
                    pageElement: 'css;ul.stui-vodlist > li',
                    insertPosition: ['css;ul.stui-vodlist', 3],
                    replaceE: 'css;ul.stui-page',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [1, 'a[data-original]', 'data-original']
                }
            }, //        真不卡影院
            zzzfun: {
                SiteTypeID: 0,
                host: 'www.zzzfun.com',
                functionStart: function() {
                    if (location.pathname.indexOf('/vod_type') > -1 || location.pathname.indexOf('/vod_show') > -1) {
                        curSite = DBSite.zzzfun;
                    } else if (location.pathname.indexOf('/vod_search') > -1) {
                        curSite = DBSite.zzzfun_search;
                    }},
                pager: {
                    type: 1,
                    nextLink: 'css;#page a[title="下一页"]',
                    pageElement: 'css;ul.search-result > a',
                    insertPosition: ['css;ul.search-result', 3],
                    replaceE: 'css;#page',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //        ZzzFun 动漫
            zzzfun_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;#page a[title="下一页"]',
                    pageElement: 'css;ul.show-list > li',
                    insertPosition: ['css;ul.show-list', 3],
                    replaceE: 'css;#page',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, // ZzzFun 动漫 - 搜索页
            tucao: {
                SiteTypeID: 0,
                host: 'www.tucao.one',
                functionStart: function() {if (location.pathname.indexOf('/list/') > -1) {
                    curSite = DBSite.tucao;
                } else if (location.search.indexOf('search') > -1) {
                    curSite = DBSite.tucao_search;
                }},
                pager: {
                    type: 1,
                    nextLink: 'css;.pagego a',
                    pageElement: 'css;.list > ul > li',
                    insertPosition: ['css;.list > ul', 3],
                    replaceE: 'css;.newpages, .pagego, #float_show',
                    scrollDelta: 1000
                }
            }, //         吐槽弹幕网
            tucao_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="a1"][contains(text(), "下一页")]',
                    pageElement: 'css;.search_list > *',
                    insertPosition: ['css;.search_list', 3],
                    replaceE: 'css;.pages',
                    scrollDelta: 1000
                }
            }, //  吐槽弹幕网 - 搜索页
            mandao: {
                SiteTypeID: 0,
                host: 'www.mandao.tv',
                functionStart: function() {if (location.pathname != '/' && location.pathname.indexOf('/man') === -1) {
                    curSite = DBSite.mandao;
                }},
                pager: {
                    type: 1,
                    nextLink: '//div[contains(@class, "page")]/a[contains(text(), ">")]',
                    pageElement: 'css;.index-tj > ul > li',
                    insertPosition: ['css;.index-tj > ul', 3],
                    replaceE: 'css;.page',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //        漫岛动漫
            yhdm: {
                SiteTypeID: 0,
                host: 'www.imomoe.la',
                functionStart: function() {if (location.pathname.indexOf('/list/') > -1) {
                    curSite = DBSite.yhdm;
                } else if (location.pathname === '/so.asp' || location.pathname === '/search.asp') {
                    curSite = DBSite.yhdm_;
                }},
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pages"]/a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;#contrainer > .img> ul > li',
                    insertPosition: ['css;#contrainer > .img> ul', 3],
                    replaceE: 'css;.pages',
                    mimeType: 'text/html; charset=gb2312',
                    scrollDelta: 1000
                }
            }, //          樱花动漫
            yhdm_: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pages"]/a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;#contrainer .fire .pics > ul > li',
                    insertPosition: ['css;#contrainer .fire .pics > ul', 3],
                    replaceE: 'css;.pages',
                    mimeType: 'text/html; charset=gb2312',
                    scrollDelta: 1000
                }
            }, //         樱花动漫 - 搜索页等
            agefans: {
                SiteTypeID: 0,
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
                    nextLink: 'id("container")//div[@class="blockcontent"]/div[@style][not(@class)]/li/a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;#container .blockcontent1 > div',
                    insertPosition: ['css;#container .blockcontent1', 3],
                    replaceE: 'css;#container .blockcontent > div[style]:not([class])',
                    scrollDelta: 1000
                }
            }, //       AGE 动漫 - 全部/搜索
            agefans_: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'id("container")//div[@class="blockcontent"]/div[@style][not(@class)]/li/a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;#container .blockcontent > ul > li',
                    insertPosition: ['css;#container .blockcontent > ul', 3],
                    replaceE: 'css;#container .blockcontent > div[style]:not([class])',
                    scrollDelta: 1000
                }
            }, //      AGE 动漫 - 其他页
            agefans_rank: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'id("container")/ul[@style][not(@class)]/li/a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;#container > .div_right  .blockcontent.div_right_r_3 > ul',
                    insertPosition: ['css;#container > .div_right  .blockcontent.div_right_r_3', 3],
                    replaceE: 'css;#container > ul[style]:not([class])',
                    scrollDelta: 1000
                }
            }, //  AGE 动漫 - 排行榜
            dm233: {
                SiteTypeID: 0,
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
                    nextLink: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageElement: 'css;.dhnew ul > li',
                    insertPosition: ['css;.dhnew ul', 3],
                    replaceE: 'css;.pagelist',
                    scrollDelta: 1000
                }
            }, //         233 动漫
            dm233_article: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageElement: 'css;.xgyd ul > li',
                    insertPosition: ['css;.xgyd ul', 3],
                    replaceE: 'css;.pagelist',
                    scrollDelta: 1000
                }
            }, // 233 动漫 - 动漫情报/资讯
            dm233_rank: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageElement: 'css;.side-update.normal-wai > .normal-nei',
                    insertPosition: ['css;.side-update.normal-wai', 3],
                    replaceE: 'css;.pagelist',
                    scrollDelta: 1000
                }
            }, //    233 动漫 - 排行榜
            anime1: {
                SiteTypeID: 0,
                host: 'anime1.me',
                functionStart: function() {if (location.search.indexOf('s=') > -1) {
                        curSite = DBSite.anime1_search;
                    } else if (location.pathname === '/') {
                        curSite = DBSite.anime1;
                }},
                pager: {
                    type: 4,
                    nextLink: anime1_functionNext,
                    intervals: 500,
                    scrollDelta: 800
                }
            }, //        Anime1
            anime1_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;.nav-previous > a',
                    pageElement: 'css;#main > article',
                    insertPosition: ['css;nav.navigation', 1],
                    replaceE: 'css;nav.navigation',
                    scrollDelta: 1200
                }
            }, // Anime1 - 搜索页
            yinfans: {
                SiteTypeID: 0,
                host: 'www.yinfans.net',
                insStyle: '#post_container {height: auto !important;} #post_container > li {position: static !important; float: left !important; height: 620px !important;}',
                pager: {
                    type: 1,
                    nextLink: 'css;a.next[href]',
                    pageElement: 'css;#post_container > li',
                    insertPosition: ['css;#post_container', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //         音范丝
            btbtt: {
                SiteTypeID: 0,
                host: /btbtt/,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="page"]/a[contains(text(), "▶") or contains(text(), "下一页")]',
                    pageElement: 'css;#threadlist > table, #threadlist > hr',
                    insertPosition: ['css;#threadlist', 3],
                    replaceE: 'css;.page',
                    scrollDelta: 2000
                }
            }, //           BT 之家
            bdys: {
                SiteTypeID: 0,
                host: 'www.bd2020.com',
                functionStart: function() {if (location.pathname != '/' && !(/\/\d+\.htm/.test(location.pathname))) {curSite = DBSite.bdys;}},
                pager: {
                    type: 2,
                    nextLink: 'div.layui-flow-more > a',
                    nextText: '加载更多',
                    scrollDelta: 1000
                }
            }, //            BD 影视
            gaoqing_fm: {
                SiteTypeID: 0,
                host: 'gaoqing.fm',
                pager: {
                    type: 2,
                    nextLink: '.col-md-12 > a[href], #loadmore > a[href]',
                    intervals: 1500,
                    scrollDelta: 1000
                }
            }, //      高清电台
            yyds: {
                SiteTypeID: 0,
                host: 'yyds.fans',
                functionStart: function() {
                    if (location.search != '' && location.search.indexOf('p=') === -1) {
                        curSite = DBSite.yyds;
                    }},
                pager: {
                    type: 1,
                    nextLink: 'css;a.next.page-numbers[href]',
                    pageElement: 'css;.list-grouped > div',
                    insertPosition: ['css;.list-grouped', 3],
                    replaceE: 'css;nav.pagination',
                    scrollDelta: 1100
                }
            }, //            YYDS 电影
            kisssub: {
                SiteTypeID: 0,
                host: 'www.kisssub.org',
                pager: {
                    type: 1,
                    nextLink: 'css;a.nextprev',
                    pageElement: 'css;#data_list > tr',
                    insertPosition: ['css;#data_list', 3],
                    replaceE: 'css;.pages',
                    scrollDelta: 2500
                }
            }, //       爱恋动漫
            dmhy: {
                SiteTypeID: 0,
                host: ['share.dmhy.org', 'dmhy.anoneko.com'],
                pager: {
                    type: 1,
                    nextLink: '//div[@class="nav_title"]/a[@href][contains(text(), "下一頁")]',
                    pageElement: 'css;#topic_list > tbody > tr',
                    insertPosition: ['css;#topic_list > tbody', 3],
                    replaceE: 'css;.nav_title',
                    scrollDelta: 1500
                },
                function: {
                    after: function() {document.body.appendChild(document.createElement('script')).textContent = `$('#topic_list > tbody > tr:even:not(.even):not(.odd)').addClass('even'); $('#topic_list > tbody > tr:odd:not(.even):not(.odd)').addClass('odd');`;}
                }
            }, //          动漫花园
            futaacg: {
                SiteTypeID: 0,
                host: 'futaacg.com',
                pager: {
                    type: 1,
                    nextLink: 'css;ul.pagination a[rel="next"]',
                    pageElement: 'css;.topic-list > div',
                    insertPosition: ['css;.topic-list', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1500
                }
            }, //       扶她动漫
            bangumi: {
                SiteTypeID: 0,
                host: 'bangumi.moe',
                pager: {
                    type: 2,
                    nextLink: '[torrent-list="lattorrents"] button[ng-click="loadMore()"] ,[torrent-list="torrents"] button[ng-click="loadMore()"]',
                    intervals: 1000,
                    scrollDelta: 1500
                }
            }, //       萌番组
            miobt: {
                SiteTypeID: 0,
                host: ['miobt.com', 'www.36dm.club'],
                functionStart: function() {curSite = DBSite.miobt;
                    if (location.host === 'www.36dm.club') {
                        curSite.pager.scrollDelta = 1000;
                    }},
                pager: {
                    type: 1,
                    nextLink: '//a[@class="nextprev"][contains(text(), "〉") or contains(text(), "下一页") or contains(text(), "»")]',
                    pageElement: 'css;#data_list > tr',
                    insertPosition: ['css;#data_list', 3],
                    replaceE: 'css;.pages',
                    scrollDelta: 2000
                }
            }, //         MioBT + 简单动漫
            nyaa: {
                SiteTypeID: 0,
                host: /nyaa\.si/,
                pager: {
                    type: 1,
                    nextLink: '//a[@rel="next"][@href] | //li[@class="next"]/a[@href]',
                    pageElement: 'css;table.torrent-list > tbody > tr',
                    insertPosition: ['css;table.torrent-list > tbody', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 2000
                }
            }, //          Nyaa
            skrbt: {
                SiteTypeID: 0,
                host: /skrbt/,
                functionStart: function() {if (location.pathname === '/search') curSite = DBSite.skrbt;},
                pager: {
                    type: 1,
                    nextLink: skrbt_functionNext,
                    pageElement: 'css;div[class="row"] > .col-md-6 > ul',
                    insertPosition: ['css;nav[aria-label*="Page"]', 1],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 900
                }
            }, //           SkrBT
            rarbgprx: {
                SiteTypeID: 0,
                host: /rarbg/,
                functionStart: function() {if (location.pathname === '/torrents.php') {curSite = DBSite.rarbgprx;}},
                pager: {
                    type: 1,
                    nextLink: '(//a[@title="next page"])[1][@href]',
                    pageElement: 'css;table.lista2t tr.lista2',
                    insertPosition: ['css;table.lista2t > tbody', 3],
                    replaceE: 'css;#pager_links',
                    scrollDelta: 1000
                }
            }, //        RARBG
            subdh: {
                SiteTypeID: 0,
                host: 'subdh.com',
                functionStart: function() {if (location.pathname === '/' || location.pathname.indexOf('/list/new') > -1) {
                    curSite = DBSite.subdh;
                } else if (location.pathname.indexOf('/search') > -1) {
                    curSite = DBSite.subdh_search;
                }},
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageElement: 'css;.col-lg-9 .bg-white.shadow-sm.rounded-3 > .row.gx-0',
                    insertPosition: ['css;.col-lg-9 .bg-white.shadow-sm.rounded-3', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                }
            }, //           SubDH
            subdh_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageElement: 'css;.col-lg-9 .bg-white.shadow-sm.rounded-3',
                    insertPosition: ['css;nav[aria-label="pagination"]', 1],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                }
            }, //    SubDH - 搜索页
            mini4k: {
                SiteTypeID: 0,
                host: 'www.mini4k.com',
                functionStart: function() {if (location.pathname != '/' && !(/\/\d{3,}/.test(location.pathname))) {curSite = DBSite.mini4k;};},
                pager: {
                    type: 1,
                    nextLink: 'css;a.pager__item--next[href]',
                    pageElement: 'css;div[class*="-item-list"] > ul > li',
                    insertPosition: ['css;div[class*="-item-list"] > ul', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 2000
                }
            }, //          MINI4K
            bthaha: {
                SiteTypeID: 0,
                host: /bthaha/,
                functionStart: function() {if (location.pathname.indexOf('/search/') > -1) {
                    curSite = DBSite.bthaha;
                    document.querySelectorAll('[id^="list_top"], [id^="list_bottom"]').forEach(function (one) {one.parentElement.parentElement.hidden = true;});
                }},
                insStyle: '[id^="list_top"], [id^="list_bottom"] {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: '//ul[@class="pagination"]/li/a[contains(text(), "下一页")]',
                    pageElement: 'css;table.table > tbody > tr',
                    insertPosition: ['css;table.table > tbody', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                },
                function: {
                    before: bthaha_functionBefore
                }
            }, //          BTHaha
            a4k: {
                SiteTypeID: 0,
                host: 'www.a4k.net',
                functionStart: function() {if (location.pathname.indexOf('/subtitle/') === -1) {curSite = DBSite.a4k;};},
                pager: {
                    type: 1,
                    nextLink: 'css;a.pager__item--next[href]',
                    pageElement: 'css;ul.list > li',
                    insertPosition: ['css;ul.list', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1000
                }
            }, //           A4k 字幕网（字幕）
            assrt: {
                SiteTypeID: 0,
                host: 'assrt.net',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.assrt;};},
                pager: {
                    type: 1,
                    nextLink: assrt_functionNext,
                    pageElement: 'css;.resultcard > div:not(#top-banner):not(#bottom-banner)',
                    insertPosition: ['css;.pagelinkcard', 1],
                    replaceE: 'css;.pagelinkcard',
                    scrollDelta: 1000
                }
            }, //         射手网（字幕）
            subhd: {
                SiteTypeID: 0,
                host: 'subhd.tv',
                functionStart: function() {if (location.pathname === '/forum/forum') {
                        curSite = DBSite.subhd_forum;
                    } else if (location.pathname != '/' && location.pathname != '/zu' && location.pathname.indexOf('/a/') === -1 && location.pathname.indexOf('/d/') === -1 && location.pathname.indexOf('/forum/') === -1) {
                        curSite = DBSite.subhd;
                    }},
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageElement: 'css;.bg-white.shadow-sm.rounded-3',
                    insertPosition: ['css;nav.clearfix', 1],
                    replaceE: 'css;nav.clearfix',
                    scrollDelta: 1000
                }
            }, //         SubHD（字幕）
            subhd_forum: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageElement: 'css;.bg-white.shadow-sm.rounded-3 > div',
                    insertPosition: ['css;.bg-white.shadow-sm.rounded-3', 3],
                    replaceE: 'css;nav.clearfix',
                    scrollDelta: 800
                }
            }, //   SubHD - forum（字幕）
            qidian: {
                SiteTypeID: 0,
                host: 'www.qidian.com',
                functionStart: function() {if (location.pathname.indexOf('/all/') > -1) {curSite = DBSite.qidian;}},
                pager: {
                    type: 1,
                    nextLink: 'css;a[class*="pagination-next"][href]',
                    pageElement: 'css;ul.all-img-list > li',
                    insertPosition: ['css;ul.all-img-list', 3],
                    replaceE: 'css;#page-container',
                    scrollDelta: 900
                }
            }, //              起点小说
            qidian_read: {
                SiteTypeID: 0,
                host: 'read.qidian.com',
                insStyle: '.admire-wrap {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: 'css;a[id$="chapterNext"][href]',
                    pageElement: 'css;.main-text-wrap > div:not(.admire-wrap)',
                    insertPosition: ['css;.main-text-wrap', 3],
                    replaceE: 'css;.chapter-control, title',
                    history: true,
                    scrollDelta: 900
                }
            }, //         起点小说 - 阅读页
            baoshuu: {
                SiteTypeID: 0,
                host: 'www.baoshuu.com',
                functionStart: function() {if (location.pathname.indexOf('/TXT/list') > -1) curSite = DBSite.baoshuu;},
                pager: {
                    type: 1,
                    nextLink: '//div[@class="listl2"]//a[@href][text()="下一页"]',
                    pageElement: 'css;.listl2 > ul > li',
                    insertPosition: ['css;.listl2 > ul', 3],
                    replaceE: 'css;listl2 > dl',
                    mimeType: 'text/html; charset=gb2312',
                    scrollDelta: 900
                }
            }, //             宝书网
            baoshuu_m: {
                SiteTypeID: 0,
                host: 'm.baoshuu.com',
                functionStart: function() {if (location.pathname.indexOf('/TXT/list') > -1) curSite = DBSite.baoshuu_m;},
                pager: {
                    type: 1,
                    nextLink: '//div[@class="man_first"]//a[@href][text()="下一页"]',
                    pageElement: 'css;.man_first > ul > li',
                    insertPosition: ['css;.man_first > ul', 3],
                    replaceE: 'css;.man_first > dl',
                    mimeType: 'text/html; charset=gb2312',
                    scrollDelta: 900
                }
            }, //           宝书网- 手机版
            _23wx: {
                SiteTypeID: 0,
                host: 'www.23wx.cc',
                functionStart: function() {if (/\d+\/\d+\.html/.test(location.pathname)) {curSite = DBSite._23wx;}},
                pager: {
                    type: 1,
                    nextLink: '//div[@class="bottem2"]/a[contains(text(), "下一章")]',
                    pageElement: 'css;#content',
                    insertPosition: ['css;#content', 5],
                    replaceE: 'css;.bottem2, head > title, .bookname > h1',
                    mimeType: 'text/html; charset=gbk',
                    history: true,
                    scrollDelta: 1500
                }
            }, //               顶点小说
            xineyby: {
                SiteTypeID: 0,
                host: 'www.xineyby.com',
                functionStart: function() {if (location.pathname.indexOf('/read/') > -1) {
                    curSite = DBSite.xineyby;
                } else if (location.pathname.indexOf('/list/') > -1 || location.pathname.indexOf('/quanben/') > -1 || location.pathname.indexOf('/search') > -1) {
                    curSite = DBSite.xineyby_list;
                }},
                pager: {
                    type: 1,
                    nextLink: 'id("footlink")/a[contains(text(), "下一页")]',
                    pageElement: 'css;#contents',
                    insertPosition: ['css;#contents', 5],
                    replaceE: 'css;#footlink, head > title, #amain dd h1',
                    mimeType: 'text/html; charset=gbk',
                    history: true,
                    scrollDelta: 900
                }
            }, //             无错小说网
            xineyby_list: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;#pagelink a.next[href]',
                    pageElement: 'css;#content > dd tbody > tr:not(:first-child)',
                    insertPosition: ['css;#content > dd tbody', 3],
                    replaceE: 'css;#pagelink',
                    mimeType: 'text/html; charset=gbk',
                    scrollDelta: 900
                }
            }, //        无错小说网 - 分类/搜索页
            linovel: {
                SiteTypeID: 0,
                host: 'www.linovel.net',
                functionStart: function() {if (/\/book\/\d+\/.+\.html/.test(location.pathname)) {
                   insStyle('.reward-section {display: none !important;}');
                } else if (location.pathname.indexOf('/cat/') > -1) {
                    curSite = DBSite.linovel;
                }},
                pager: {
                    type: 1,
                    nextLink: '//ul[@class="pagination"]/li/a[contains(text(), "下一页")]',
                    pageElement: 'css;.rank-book-list > div',
                    insertPosition: ['css;.rank-book-list', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                }
            }, //             轻之文库
            linovelib: {
                SiteTypeID: 0,
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
                    nextLink: '//p[@class="mlfy_page"]/a[@href][contains(text(), "下一页") or contains(text(), "下一章")]',
                    pageElement: 'css;#mlfy_main_text > *',
                    insertPosition: ['css;#mlfy_main_text', 3],
                    replaceE: 'css;p.mlfy_page, head > title',
                    history: true,
                    scrollDelta: 1000
                }
            }, //           哔哩轻小说
            linovelib_wenku: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;#pagelink > a.next[href]',
                    pageElement: 'css;.store_collist > div.bookbox',
                    insertPosition: ['css;.store_collist', 3],
                    replaceE: 'css;#pagelink',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //     哔哩轻小说 - 文库
            linovelib_top: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;#pagelink > a.next[href]',
                    pageElement: 'css;.rankpage_box > div.rank_d_list',
                    insertPosition: ['css;div.pages', 1],
                    replaceE: 'css;#pagelink',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //       哔哩轻小说 - 全本
            linovelib_w: {
                SiteTypeID: 0,
                host: 'w.linovelib.com',
                functionStart: function() {if (/\/novel\/\d+\/.+\.html/.test(location.pathname)) {
                    curSite = DBSite.linovelib_w;
                } else if (location.pathname.indexOf('/wenku/') > -1 || location.pathname.indexOf('/sa/') > -1) {
                    curSite = DBSite.linovelib_w_wenku;
                }},
                pager: {
                    type: 1,
                    nextLink: function() {if (ReadParams) {return ReadParams.url_next}; return ''},
                    pageElement: '//body/script[contains(text(), "var ReadParams")] | id("apage")/div',
                    insertPosition: ['css;#apage', 3],
                    replaceE: 'css;head > title',
                    history: true,
                    scriptType: 2,
                    scrollDelta: 1000
                }
            }, //         哔哩轻小说 (手机版)
            linovelib_w_wenku: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;#pagelink > strong+a[href] ,#pagelink a.next[href]',
                    pageElement: 'css;ol.book-ol > li',
                    insertPosition: ['css;ol.book-ol', 3],
                    replaceE: 'css;#pagelink',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //   哔哩轻小说 (手机版) - 文库
            cartoonmad: {
                SiteTypeID: 0,
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
                    nextLink: cartoonmad_functionNext,
                    pageElement: 'css;body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child img',
                    insertPosition: ['css;body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child > a', 3],
                    replaceE: 'css;body > table > tbody > tr:nth-child(2), body > table > tbody > tr:nth-child(5)',
                    mimeType: 'text/html; charset=big5',
                    scrollDelta: 2000
                }
            }, //        动漫狂
            cartoonmad_list: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="pages"][contains(text(), "下一頁")]',
                    pageElement: 'css;td[background="/image/content_box4.gif"]+td > table > tbody > tr',
                    insertPosition: ['css;td[background="/image/content_box4.gif"]+td > table > tbody', 3],
                    replaceE: '//a[@class="pages"]/parent::td/parent::tr | //font[contains(text(), "目前在第")]',
                    mimeType: 'text/html; charset=big5',
                    scrollDelta: 1000
                }
            }, //   动漫狂 - 分类/搜索页
            manhuacat: {
                SiteTypeID: 0,
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
                    nextLink: manhuacat_functionNext,
                    insertPosition: ['css;.img-content', 3],
                    insertElement: manhuacat_insertElement,
                    replaceE: 'css;.comic-detail > .breadcrumb-bar, .comic-detail >h2.h4, title, .vg-r-data, body > script:not([src])',
                    intervals: 2000,
                    scrollDelta: 3000
                }
            }, //         漫画猫
            manhuacat_list: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[contains(@class, "pagination")]//a[@href][contains(text(), "下一页") or contains(text(), "下页")]',
                    pageElement: 'css;.comic-main-section > *',
                    insertPosition: ['css;.comic-main-section', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //    漫画猫 - 分类页
            manhuacat_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[contains(@class, "pagination")]//a[@href][contains(text(), "下一页") or contains(text(), "下页")]',
                    pageElement: 'css;.comic-main-section .row > div',
                    insertPosition: ['css;.comic-main-section .row', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1000
                }
            }, //  漫画猫 - 搜索页
            manhuadb: {
                SiteTypeID: 0,
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
                    nextLink: manhuadb_functionNext,
                    pageElement: 'css;body > script:not([type]):not([src]), .vg-r-data, ol.links-of-books.num_div',
                    insertPosition: ['css;.pjax-container', 3],
                    insertElement: manhuadb_insertElement,
                    intervals: 5000,
                    scrollDelta: 3000
                }
            }, //          漫画 DB
            hicomic: {
                SiteTypeID: 0,
                host: 'www.hicomic.net',
                functionStart: function() {if (location.pathname.indexOf('/chapters/') > -1) {
                    setTimeout(hicomic_init, 100);
                    curSite = DBSite.hicomic;
                }},
                insStyle: '.content {height: auto !important;} .footer, .left_cursor, .right_cursor, .finish {display: none !important;} .content > img {display: block !important;margin: 0 auto !important;}',
                pager: {
                    type: 4,
                    nextLink: hicomic_functionNext,
                    insertPosition: ['css;.content', 3],
                    insertElement: hicomic_insertElement,
                    intervals: 5000,
                    scrollDelta: 3000
                }
            }, //           HiComic (嗨漫画)
            dmzj: {
                SiteTypeID: 0,
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
                    nextLink: dmzj_functionNext,
                    insertPosition: ['css;.comic_wraCon', 3],
                    insertElement: dmzj_insertElement,
                    replaceE: 'css;.wrap_last_mid, .wrap_last_head, title',
                    intervals: 2000,
                    scrollDelta: 3000
                }
            }, //              动漫之家 - 原创
            dmzj_list: {
                SiteTypeID: 0,
                insStyle: '.wrap_mhlist_l.con_left, .wrap_list {height: auto!important;}',
                pager: {
                    type: 1,
                    nextLink: 'css;a.pg_next[href]',
                    pageElement: 'css;ul.list_con_li > li',
                    insertPosition: ['css;ul.list_con_li', 3],
                    replaceE: 'css;.page',
                    scrollDelta: 1000
                }
            }, //         动漫之家 - 原创 - 分类页
            dmzj_rank: {
                SiteTypeID: 0,
                insStyle: '.wrap_mhlist_l.con_left {height: auto!important;}',
                pager: {
                    type: 1,
                    nextLink: 'css;a.pg_next[href]',
                    pageElement: 'css;.ph_r_con_li > div:not(.ad_column)',
                    insertPosition: ['css;.ph_r_con_li', 3],
                    replaceE: 'css;.page',
                    scrollDelta: 1000
                }
            }, //         动漫之家 - 原创 - 排行榜
            dmzj_manhua: {
                SiteTypeID: 0,
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
                    nextLink: dmzj_manhua_functionNext,
                    insertPosition: ['css;#center_box', 3],
                    insertElement: dmzj_manhua_insertElement,
                    replaceE: 'css;.display_graybg, title',
                    intervals: 2000,
                    scrollDelta: 3000
                }
            }, //       动漫之家 - 日漫
            dmzj_manhua_update: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pages"]/a[contains(text(), "下一页")]',
                    pageElement: 'css;.newpic_content > *:not(.pages)',
                    insertPosition: ['css;.newpic_content', 3],
                    replaceE: 'css;.pages',
                    scrollDelta: 1000
                }
            }, //动漫之家 - 日漫 - 最新更新
            copymanga: {
                SiteTypeID: 0,
                host: 'www.copymanga.com',
                functionStart: function() {if (location.pathname.indexOf('/chapter/') > -1) {
                    curSite = DBSite.copymanga;
                } else if (location.pathname.indexOf('/comics') > -1) {
                    curSite = DBSite.copymanga_list;
                }},
                insStyle: '.upMember, .comicContainerAds, .footer {display: none !important;}',
                pager: {
                    type: 4,
                    nextLink: copymanga_functionNext,
                    insertPosition: ['css;ul.comicContent-image-list > li:first-child', 1],
                    insertElement: copymanga_insertElement,
                    replaceE: 'css;.disposableData, .disposablePass, .disposableUrlPrefix, .disposableUrlSuffix, .footer, h4.header, title',
                    intervals: 5000,
                    scrollDelta: 3000
                }
            }, //         拷贝漫画
            copymanga_list: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;li.next > a[href]',
                    pageElement: 'css;.exemptComic-box > div',
                    insertPosition: ['css;.exemptComic-box', 3],
                    replaceE: 'css;ul.page-all',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-src]', 'data-src']
                }
            }, //    拷贝漫画 - 分类页
            mhxqiu: {
                SiteTypeID: 0,
                host: 'www.mhxqiu.com',
                functionStart: function() {if (/\/\d+\.html/.test(location.pathname)) { // 阅读页
                    curSite = DBSite.mhxqiu;
                } else if (/\/\d+\/$/.test(location.pathname)) { // 目录页
                    setTimeout(function(){if (document.getElementById('zhankai')) document.getElementById('zhankai').click();}, 500)
                } else if (/\/(sort|rank)\//.test(location.pathname)) { // 分类页
                    curSite = DBSite.mhxqiu_list;
                }},
                insStyle: '.imgFloat_1, .imgFloat_2, .main_control {display: none !important;} body {height: auto !important;}',
                pager: {
                    type: 4,
                    nextLink: mhxqiu_functionNext,
                    insertPosition: ['css;#comicContain', 3],
                    insertElement: mhxqiu_insertElement,
                    replaceE: 'css;#mainControlNext, h1.chaptername_title, title',
                    intervals: 5000,
                    scrollDelta: 3000
                }
            }, //            漫画星球
            mhxqiu_list: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="NewPages"]//a[contains(text(), "下一页")]',
                    pageElement: 'css;.cy_list_mh > ul',
                    insertPosition: ['css;.cy_list_mh', 3],
                    replaceE: 'css;.NewPages',
                    scrollDelta: 1000
                }
            }, //       漫画星球 - 分类页
            gufengmh: {
                SiteTypeID: 0,
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
                    nextLink: gufengmh_functionNext,
                    pageElement: 'css;body > script:first-child',
                    insertPosition: ['css;#images', 3],
                    insertElement: gufengmh_insertElement,
                    intervals: 5000,
                    scrollDelta: 4000
                }
            }, //          古风漫画网
            gufengmh_list: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;li.next > a[href]',
                    pageElement: 'css;ul.book-list > li',
                    insertPosition: ['css;ul.book-list', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                }
            }, //     古风漫画网 - 分类页
            szcdmj: {
                SiteTypeID: 0,
                host: 'www.szcdmj.com',
                functionStart: function() {if (location.pathname.indexOf('/szcchapter/') > -1) {curSite = DBSite.szcdmj;}},
                insStyle: '.header {opacity: 0.3 !important;}',
                pager: {
                    type: 1,
                    nextLink: '//div[@class="fanye"][1]/a[@href][text()="下一页" or text()="下一话"]',
                    pageElement: 'css;.comicpage > div,title',
                    insertPosition: ['css;.comicpage', 3],
                    replaceE: 'css;.fanye,h1.title',
                    scrollDelta: 2000
                },
                function: {
                    before: szcdmj_functionBefore
                }
            }, //            砂之船动漫家
            mangabz: {
                SiteTypeID: 0,
                host: 'mangabz.com',
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
                    nextLink: mangabz_functionNext,
                    insertPosition: ['css;#cp_img', 3],
                    insertElement: mangabz_insertElement,
                    replaceE: 'css;p.top-title, body > .container > div:not([id]), title',
                    intervals: 500,
                    scrollDelta: 1000
                }
            }, //           Mangabz 漫画
            mangabz_list: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="page-pagination"]//a[@href][contains(text(), ">")]',
                    pageElement: 'css;ul.mh-list > li',
                    insertPosition: ['css;ul.mh-list', 3],
                    replaceE: 'css;.page-pagination',
                    scrollDelta: 800
                }
            }, //      Mangabz 漫画 - 分类/搜索页
            _423down: {
                SiteTypeID: 0,
                host: 'www.423down.com',
                functionStart: function() {if (location.pathname.indexOf('.html') === -1) curSite = DBSite._423down;},
                pager: {
                    type: 1,
                    nextLink: '//div[@class="paging"]//a[contains(text(),"下一页")][@href]',
                    pageElement: 'css;div.content-wrap ul.excerpt > li',
                    insertPosition: ['css;div.content-wrap ul.excerpt', 3],
                    replaceE: 'css;div.paging',
                    scrollDelta: 1500
                }
            }, //               423Down
            iao_su: {
                SiteTypeID: 0,
                host: 'iao.su',
                pager: {
                    type: 1,
                    nextLink: '//li[@class="btn btn-primary next"]//a[@href]',
                    pageElement: 'css;#index > article, #archive > article',
                    insertPosition: ['css;ol.page-navigator', 1],
                    replaceE: 'css;ol.page-navigator',
                    scriptType: 4,
                    scrollDelta: 1000
                }
            }, //                 不死鸟
            sharerw: {
                SiteTypeID: 0,
                host: 'www.sharerw.com',
                functionStart: function() {if (location.pathname.indexOf('.html') === -1) {
                    if (location.pathname === '/search.php') {curSite = DBSite.sharerw_search;} else {curSite = DBSite.sharerw;};};},
                pager: {
                    type: 1,
                    nextLink: 'css;span.next > a[href]',
                    pageElement: 'css;.new-post > article',
                    insertPosition: ['css;.new-post', 3],
                    replaceE: 'css;.pagebar',
                    scrollDelta: 1500
                }
            }, //                分享者
            sharerw_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;span.next > a[href]',
                    pageElement: 'css;#mainbox > article',
                    insertPosition: ['css;.pagebar', 1],
                    replaceE: 'css;.pagebar',
                    scrollDelta: 1500
                }
            }, //         分享者 - 搜索页
            extfans: {
                SiteTypeID: 0,
                host: 'www.extfans.com',
                functionStart: function() {if (location.pathname != '/') {curSite = DBSite.extfans;}},
                pager: {
                    type: 1,
                    nextLink: 'css;.page a[data-page="next"]',
                    pageElement: 'css;.side-left > ul[class*="-list"] > li',
                    insertPosition: ['css;.side-left > ul[class*="-list"]', 3],
                    replaceE: 'css;.page',
                    scrollDelta: 2000
                }
            }, //                扩展迷
            chrome_zzzmh: {
                SiteTypeID: 0,
                host: 'chrome.zzzmh.cn',
                pager: {
                    type: 2,
                    nextLink: 'button.more-btn',
                    intervals: 1000,
                    scrollDelta: 1500
                }
            }, //           极简插件
            appinn: {
                SiteTypeID: 0,
                host: 'www.appinn.com',
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next page-numbers"][@href]',
                    pageElement: 'css;section#latest-posts > article',
                    insertPosition: ['css;nav.navigation.pagination', 1],
                    replaceE: 'css;div.nav-links',
                    scrollDelta: 1500
                }
            }, //                 小众软件
            isharepc: {
                SiteTypeID: 0,
                host: 'www.isharepc.com',
                pager: {
                    type: 1,
                    nextLink: 'css;a.next[href]',
                    pageElement: 'css;.content > div',
                    insertPosition: ['css;nav.pagination', 1],
                    replaceE: 'css;nav.pagination',
                    scrollDelta: 1000
                }
            }, //               乐软博客
            pc521: {
                SiteTypeID: 0,
                host: ['www.pc521.net', 'www.winos.me'],
                functionStart: function() {if (location.search.slice(0,3) === '?s=') {curSite = DBSite.pc521_search;} else if (location.pathname.indexOf('.html') === -1) {curSite = DBSite.pc521;}},
                pager: {
                    type: 2,
                    nextLink: 'div[id^="ias_trigger_"]',
                    intervals: 1000,
                    scrollDelta: 1000
                }
            }, //                  不忘初心 + WINOS
            pc521_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next[href]',
                    pageElement: 'css;#main > ul > li',
                    insertPosition: ['css;#main > ul', 3],
                    replaceE: 'css;nav.pagination',
                    scrollDelta: 1500
                }
            }, //           不忘初心 - 搜索页
            ghxi: {
                SiteTypeID: 0,
                host: 'www.ghxi.com',
                functionStart: function() {if (location.pathname === '/' && !location.search) {curSite = DBSite.ghxi;} else {curSite = DBSite.ghxi_postlist;}},
                pager: {
                    type: 2,
                    nextLink: '.load-more',
                    intervals: 1000,
                    scrollDelta: 5000
                }
            }, //                   果核剥壳 - 首页
            ghxi_postlist: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next[href]',
                    pageElement: 'css;ul.post-loop > li',
                    insertPosition: ['css;ul.post-loop', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1500
                },
                function: {
                    before: src_functionBefore
                }
            }, //          果核剥壳 - 分类/搜索页
            sixyin: {
                SiteTypeID: 0,
                host: 'www.sixyin.com',
                functionStart: function() {if (location.pathname === '/' && location.search === '') { // 首页
                    curSite = DBSite.sixyin;
                } else if (location.pathname.indexOf('.html') === -1) { //    分类页
                    curSite = DBSite.sixyin_postlist;
                }},
                pager: {
                    type: 2,
                    nextLink: '.load-more',
                    nextHTML: '点击查看更多',
                    scrollDelta: 1500
                }
            }, //                 六音软件 - 首页
            sixyin_postlist: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next"][@href]',
                    pageElement: 'css;ul.post-loop > li',
                    insertPosition: ['css;ul.post-loop', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1500
                }
            }, //        六音软件 - 分类页
            weidown: {
                SiteTypeID: 0,
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
                    nextLink: 'css;a.nextpage',
                    pageElement: 'css;.articleWrapper > .itemArticle, .articleWrapper > .richTextItem.search',
                    insertPosition: ['css;.articleWrapper', 3],
                    replaceE: 'css;#pageGroup',
                    scrollDelta: 1500
                }
            }, //                微当下载
            weidown_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.nextpage',
                    pageElement: 'css;.articleListWrapper > .richTextItem.search',
                    insertPosition: ['css;#pageGroup', 1],
                    replaceE: 'css;#pageGroup',
                    scrollDelta: 700
                }
            }, //         微当下载 - 搜索页
            weidown_special: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.nextpage',
                    pageElement: 'css;.special > .item, .articleWrapper > div',
                    insertPosition: ['css;.special, .articleWrapper', 3],
                    replaceE: 'css;#pageGroup',
                    scrollDelta: 700
                }
            }, //        微当下载 - 专题页
            th_sjy: {
                SiteTypeID: 0,
                host: ['www.th-sjy.com', 'www.puresys.net'],
                pager: {
                    type: 1,
                    nextLink: 'css;li.next-page > a',
                    pageElement: 'css;.content > article',
                    insertPosition: ['css;.pagination', 1],
                    replaceE: 'css;.pagination',
                    scrollDelta: 2000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-src]', 'data-src']
                }
            }, //                 th-sjy 汉化 + Puresys
            fsylr: {
                SiteTypeID: 0,
                host: 'fsylr.com',
                functionStart: function() {if (location.pathname.indexOf('.html') === -1) {curSite = DBSite.fsylr;}},
                pager: {
                    type: 1,
                    nextLink: 'css;a.next.page-numbers[href]',
                    pageElement: 'css;.posts-con > div:not([class*="posts-"])',
                    insertPosition: ['css;.posts-con', 3],
                    replaceE: 'css;nav.pagination',
                    scrollDelta: 1000
                }
            }, //                  发烧友绿软
            iplaysoft_postslist: {
                SiteTypeID: 0,
                host: 'www.iplaysoft.com',
                functionStart: function() {if (location.pathname.indexOf('.html') > -1 || location.pathname.indexOf('/p/') > -1) { // 文章内
                    curSite = DBSite.iplaysoft_postcomments;
                } else { // 其他页面
                    curSite = DBSite.iplaysoft_postslist;
                }},
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pagenavi"]//a[@title="下一页"][@href]',
                    pageElement: 'css;#postlist > div.entry',
                    insertPosition: ['css;#postlist > .pagenavi-button', 1],
                    replaceE: 'css;.pagenavi-button, .pagenavi',
                    scrollDelta: 1200
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-src]', 'data-src']
                }
            }, //    异次元软件
            iplaysoft_postcomments: {
                SiteTypeID: 0,
                pager: {
                    type: 2,
                    nextLink: '#loadHistoryComments',
                    nextTextOf: '展开后面',
                    scrollDelta: 1200
                }
            }, // 异次元软件 - 评论
            mpyit: {
                SiteTypeID: 0,
                host: 'www.mpyit.com',
                functionStart: function() {if (location.pathname === '/' && !location.search) {
                    curSite = DBSite.mpyit;
                } else if (location.pathname.indexOf('/category/') > -1 || location.search.indexOf('?s=') > -1) { // 搜索页 / 分类页
                    curSite = DBSite.mpyit_category;
                }},
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page-numbers"][@title="下一页"][@href]',
                    pageElement: 'css;#post > div[id^="post-"]',
                    insertPosition: ['css;#post > #pagenavi', 1],
                    replaceE: 'css;#post > #pagenavi',
                    scrollDelta: 1700
                }
            }, //                  老殁 | 殁漂遥
            mpyit_category: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page-numbers"][@title="下一页"][@href]',
                    pageElement: 'css;#content > div[class^="entry_box"]',
                    insertPosition: ['css;#content > #pagenavi', 1],
                    replaceE: 'css;#content > #pagenavi',
                    scrollDelta: 1700
                }
            }, //         老殁 | 殁漂遥 - 搜索页/分类页
            yxssp: {
                SiteTypeID: 0,
                host: 'www.yxssp.com',
                pager: {
                    type: 1,
                    nextLink: '//div[@class="page-nav td-pb-padding-side"]/a[last()][@href]',
                    pageElement: 'css;.td-modules-container.td-module-number4 > div',
                    insertPosition: ['css;.td-modules-container.td-module-number4', 3],
                    replaceE: 'css;.page-nav.td-pb-padding-side',
                    scrollDelta: 1000
                }
            }, //                  异星软件空间
            yrxitong: {
                SiteTypeID: 0,
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
                    nextLink: 'css;span.pageNext > a',
                    pageElement: 'css;#containerFormsCenter .m_news_list > div',
                    insertPosition: ['css;#containerFormsCenter .m_news_list', 3],
                    replaceE: 'css;.pagenation',
                    scrollDelta: 1200
                },
                function: {
                    before: src_functionBefore,
                    parameter: [1, 'a[data-original]', 'data-original']
                }
            }, //               小鱼儿 yr 系统
            yrxitong_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;span.pageNext > a',
                    pageElement: 'css;#containerFormsCenter .newsList > div',
                    insertPosition: ['css;#containerFormsCenter .newsList', 3],
                    replaceE: 'css;.pagenation',
                    scrollDelta: 2000
                }
            }, //        小鱼儿 yr 系统 - 搜索页
            sordum: {
                SiteTypeID: 0,
                host: 'www.sordum.org',
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next page-numbers"][@href]',
                    pageElement: 'css;.article > article',
                    insertPosition: ['css;nav.navigation.posts-navigation', 1],
                    replaceE: 'css;nav.navigation.posts-navigation',
                    scrollDelta: 1500
                }
            }, //                 (下面这几个都是国外博客网站)
            winaero: {
                SiteTypeID: 0,
                host: 'winaero.com',
                functionStart: function() {if (location.pathname === '/blog/' || location.pathname.indexOf('/category/') > -1) curSite = DBSite.winaero;},
                pager: {
                    type: 1,
                    nextLink: 'css;.nav-previous > a',
                    pageElement: 'css;#content > article',
                    insertPosition: ['css;#nav-below', 1],
                    replaceE: 'css;#nav-below',
                    scrollDelta: 1500
                }
            },
            lrepacks: {
                SiteTypeID: 0,
                host: 'lrepacks.net',
                functionStart: function() {if (location.pathname.indexOf('.html') === -1) curSite = DBSite.lrepacks;},
                pager: {
                    type: 1,
                    nextLink: 'css;.page_next > a',
                    pageElement: 'css;#main .post-list article',
                    insertPosition: ['css;.page_nav', 1],
                    replaceE: 'css;.page_nav',
                    scrollDelta: 1500
                },
                function: {
                    before: lrepacks_functionBefore
                }
            },
            winhelponline: {
                SiteTypeID: 0,
                host: 'www.winhelponline.com',
                functionStart: function() {if (location.pathname === '/blog/') {curSite = DBSite.winhelponline;}},
                pager: {
                    type: 1,
                    nextLink: 'css;span.prev > a[href]',
                    pageElement: 'css;#main > article',
                    insertPosition: ['css;nav.paging-navigation', 1],
                    replaceE: 'css;nav.paging-navigation',
                    scrollDelta: 2000
                }
            },
            windowslatest: {
                SiteTypeID: 0,
                host: 'www.windowslatest.com',
                pager: {
                    type: 1,
                    nextLink: '//div[contains(@class, "page-nav")]/a/i[@class="td-icon-menu-right"]/parent::a',
                    pageElement: 'css;.td-ss-main-content > div:not(.td-block-title-wrap):not(.page-nav)',
                    insertPosition: ['css;.page-nav', 1],
                    replaceE: 'css;.page-nav',
                    scrollDelta: 2000
                }
            },
            thewindowsclub: {
                SiteTypeID: 0,
                host: 'www.thewindowsclub.com',
                functionStart: function() {curSite = DBSite.thewindowsclub; if (location.pathname === '/') {curSite.pager.scrollDelta = 2000;}},
                pager: {
                    type: 1,
                    nextLink: 'css;li.pagination-next > a',
                    pageElement: 'css;#genesis-content > article',
                    insertPosition: ['css;.pagination', 1],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            },
            gitee: {
                SiteTypeID: 0,
                host: 'search.gitee.com',
                functionStart: function() {if (location.search) curSite = DBSite.gitee;},
                pager: {
                    type: 1,
                    nextLink: 'css;li.next > a[href]',
                    pageElement: 'css;#hits-list > div',
                    insertPosition: ['css;#hits-list', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                }
            }, //                     Gitee - 搜索页
            github_star: {
                SiteTypeID: 0,
                host: 'github.com',
                functionStart: function() {locationchange = true;
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
                    nextLink: '//div[@class="paginate-container"]//a[@href][contains(text(), "Next")]',
                    pageElement: 'css;#js-pjax-container .position-relative div[class^="col-lg-"] > div:not(.position-relative):not(.paginate-container)',
                    insertPosition: ['css;.paginate-container', 1],
                    replaceE: 'css;.paginate-container',
                    scrollDelta: 3000
                }
            }, //               Github - 用户 Star 列表
            github_issues: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;.js-navigation-container.js-active-navigation-container > div[id^="issue_"]',
                    insertPosition: ['css;.js-navigation-container.js-active-navigation-container', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 3000
                }
            }, //             Github - Issues 列表 / PR 列表
            github_discussions: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;#repo-content-pjax-container div[data-discussion-hovercards-enabled] > div',
                    insertPosition: ['css;#repo-content-pjax-container div[data-discussion-hovercards-enabled]', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 3000
                }
            }, //        Github - Discussions 列表
            github_releases: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pagination"]/a[contains(text(), "Next")]',
                    pageElement: 'css;.repository-content  >.position-relative > div',
                    insertPosition: ['css;.repository-content  >.position-relative', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 3000
                }
            }, //           Github - Releases 列表
            github_tags: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pagination"]/a[contains(text(), "Next")]',
                    pageElement: 'css;.repository-content > .Box > div.Box-row',
                    insertPosition: ['css;.repository-content > .Box', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 3000
                }
            }, //               Github - Tags 列表
            github_commits: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="paginate-container"]//a[contains(text(), "Older")]',
                    pageElement: 'css;div.js-navigation-container > div',
                    insertPosition: ['css;div.js-navigation-container', 3],
                    replaceE: 'css;.paginate-container',
                    scrollDelta: 3000
                }
            }, //            Github - Commits 列表
            github_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;ul.repo-list > li',
                    insertPosition: ['css;ul.repo-list', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //             Github - Search 列表
            github_search_code: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;.code-list > div',
                    insertPosition: ['css;.code-list', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //        Github - Search 列表 - Code
            github_search_commit: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;#commit_search_results > div',
                    insertPosition: ['css;#commit_search_results', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //      Github - Search 列表 - Commit
            github_search_issue: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;.issue-list > div > div',
                    insertPosition: ['css;.issue-list > div', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //       Github - Search 列表 - Issues/Discussions
            github_search_package: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;#package_search_results > div',
                    insertPosition: ['css;#package_search_results', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //     Github - Search 列表 - Package
            github_search_marketplace: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;.issue-list > div',
                    insertPosition: ['css;.issue-list', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, // Github - Search 列表 - Marketplace
            github_search_topics: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;.topic-list > div',
                    insertPosition: ['css;.topic-list', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //      Github - Search 列表 - Topics
            github_search_wiki: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;#wiki_search_results > div:first-child > div',
                    insertPosition: ['css;#wiki_search_results > div:first-child', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //        Github - Search 列表 - wiki
            github_search_user: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.next_page',
                    pageElement: 'css;#user_search_results > div:first-child > div',
                    insertPosition: ['css;#user_search_results > div:first-child', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //        Github - Search 列表 - user
            stackoverflow: {
                SiteTypeID: 0,
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
                    nextLink: 'css;a[href][rel="next"]',
                    pageElement: 'css;#questions > div',
                    insertPosition: ['css;#questions', 3],
                    replaceE: 'css;.pager',
                    scrollDelta: 1500
                }
            }, //             StackOverflow - Questions
            stackoverflow_tags: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a[href][rel="next"]',
                    pageElement: 'css;#tags-browser > div',
                    insertPosition: ['css;#tags-browser', 3],
                    replaceE: 'css;.pager',
                    scrollDelta: 1500
                }
            }, //        StackOverflow - Tags
            stackoverflow_users: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a[href][rel="next"]',
                    pageElement: 'css;#user-browser > div:first-child > div',
                    insertPosition: ['css;#user-browser > div:first-child', 3],
                    replaceE: 'css;.pager',
                    scrollDelta: 1500
                }
            }, //       StackOverflow - Users
            stackoverflow_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a[href][rel="next"]',
                    pageElement: 'css;.js-search-results > div:first-child > div',
                    insertPosition: ['css;.js-search-results > div:first-child', 3],
                    replaceE: 'css;.pager',
                    scrollDelta: 1500
                }
            }, //      StackOverflow - Search
            segmentfault: {
                SiteTypeID: 0,
                host: 'segmentfault.com',
                functionStart: function() {locationchange = true;
                    if (location.pathname.indexOf('/questions') > -1) {
                    curSite = DBSite.segmentfault;
                } else if (location.pathname === '/search') {
                    curSite = DBSite.segmentfault_search;
                }},
                pager: {
                    type: 1,
                    nextLink: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageElement: 'css;ul.list-group > li',
                    insertPosition: ['css;ul.list-group', 3],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                }
            }, //              SegmentFault - Questions
            segmentfault_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a[href][rel="next"]',
                    pageElement: 'css;.search-result > section',
                    insertPosition: ['css;.search-result > div:last-child', 1],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                }
            }, //       SegmentFault - Search
            cnblogs: {
                SiteTypeID: 0,
                host: ['www.cnblogs.com', 'zzk.cnblogs.com'],
                functionStart: function() {
                    if (location.host === 'zzk.cnblogs.com') {
                        curSite = DBSite.cnblogs_search;
                    } else if (document.getElementById('post_list')) {
                        curSite = DBSite.cnblogs_postlist;
                    } else if (location.pathname.split('/').length === 3 && document.querySelector('.topicListFooter')) {
                        curSite = DBSite.cnblogs;
                        if (!document.getElementById('homepage_top_pager')) {
                            document.querySelector('.forFlow').insertAdjacentHTML(addTo(2), '<div id="homepage_top_pager" class="topicListFooter"></div>');
                            document.querySelector('.forFlow').insertAdjacentHTML(addTo(3), '<div id="homepage_bottom_pager" class="topicListFooter"></div>');
                        }
                    }
                },
                pager: {
                    type: 1,
                    nextLink: '//div[@class="topicListFooter"]//a[contains(text(), "下一页")]',
                    pageElement: 'css;div.day',
                    insertPosition: ['css;.topicListFooter:not([id])', 1],
                    replaceE: 'css;.topicListFooter',
                    scrollDelta: 1000
                }
            }, //                   博客园 - 文章列表（个人）
            cnblogs_postlist: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pager"]//a[contains(text(), ">")]',
                    pageElement: 'css;#post_list > article',
                    insertPosition: ['css;#post_list', 3],
                    replaceE: 'css;.pager',
                    scrollDelta: 1000
                }
            }, //          博客园 - 文章列表
            cnblogs_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pager"]//a[contains(text(), ">")]',
                    pageElement: 'css;div.searchItem',
                    insertPosition: ['css;#paging_block', 1],
                    replaceE: 'css;.pager',
                    scrollDelta: 1000
                }
            }, //            博客园 - 搜索页
            libgen: {
                SiteTypeID: 0,
                host: /libgen/,
                functionStart: function() {if (location.pathname === '/search.php') {curSite = DBSite.libgen;}},
                pager: {
                    type: 1,
                    nextLink: '//font/a[@href][contains(text(), "►")]',
                    pageElement: 'css;table[rules="rows"] > tbody > tr:nth-of-type(n+2), .paginator+script:not([src])',
                    insertPosition: ['css;table[rules="rows"] > tbody', 3],
                    replaceE: '//td[./font/a[@href][contains(text(), "►")]]',
                    scriptType: 2,
                    history: true,
                    scrollDelta: 2000
                }
            }, //               学术
            pubmed: {
                SiteTypeID: 0,
                host: 'pubmed.ncbi.nlm.nih.gov',
                pager: {
                    type: 2,
                    nextLink: 'button.load-button.next-page',
                    nextText: 'Show more',
                    scrollDelta: 1500
                }
            }, //               学术
            google_scholar: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[./span[@class="gs_ico gs_ico_nav_next"]]',
                    pageElement: 'css;#gs_res_ccl_mid > *',
                    insertPosition: ['css;#gs_res_ccl_mid', 3],
                    replaceE: 'id("gs_n")',
                    scriptType: 1,
                    scrollDelta: 2000
                }
            }, //       谷歌学术
            bing_academic: {
                SiteTypeID: 0,
                insStyle: 'li.aca_algo_count {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: 'css;a.sb_pagN[href]',
                    pageElement: 'css;#b_results > li.aca_algo',
                    insertPosition: ['css;#b_results .b_pag', 1],
                    replaceE: 'css;#b_results .b_pag',
                    scrollDelta: 1000
                }
            }, //        必应学术
            baidu_xueshu: {
                SiteTypeID: 0,
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
                    nextLink: 'id("page")/a[./i[@class="c-icon-pager-next"]][@href]',
                    pageElement: 'css;#bdxs_result_lists > div.result',
                    insertPosition: ['css;#bdxs_result_lists', 3],
                    replaceE: 'css;#page',
                    history: true,
                    scrollDelta: 1000
                }
            }, //         百度学术
            baidu_xueshu_journal: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;a.res-page-next[href]',
                    pageElement: 'css;#journaldetail > div',
                    insertPosition: ['css;#journaldetail', 3],
                    replaceE: 'css;.res-page',
                    history: true,
                    scrollDelta: 1000
                }
            }, // 百度学术
            baidu_xueshu_paper: {
                SiteTypeID: 0,
                pager: {
                    type: 2,
                    nextLink: 'div:not([style*="display: none"]) > .more_btn',
                    nextText: '加载更多',
                    scrollDelta: 1000
                }
            }, //   百度学术
            so_xueshu: {
                SiteTypeID: 0,
                host: 'xueshu.so.com',
                functionStart: function() {if (location.pathname === '/s') {curSite = DBSite.so_xueshu;}},
                pager: {
                    type: 1,
                    nextLink: 'css;a#snext[href]',
                    pageElement: 'css;ul.list > li',
                    insertPosition: ['css;ul.list', 3],
                    replaceE: 'css;#page',
                    scrollDelta: 1000
                }
            }, //            360 学术
            wikihow: {
                SiteTypeID: 0,
                host: ['www.wikihow.com', 'zh.wikihow.com'],
                functionStart: function() {if (location.pathname.indexOf('/Category:') > -1) {
                    curSite = DBSite.wikihow;
                } else if (location.pathname.indexOf('/wikiHowTo') > -1 && location.search.indexOf('?search=') > -1) {
                    curSite = DBSite.wikihow_search;
                }},
                pager: {
                    type: 1,
                    nextLink: 'css;a.pag_next',
                    pageElement: 'css;#cat_all > .cat_grid > div',
                    insertPosition: ['css;#cat_all > .cat_grid', 3],
                    replaceE: 'css;#large_pagination',
                    scriptType: 4,
                    scrollDelta: 2000
                }
            }, //         指南
            wikihow_search: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;#searchresults_footer > a.buttonright',
                    pageElement: 'css;#searchresults_list > a',
                    insertPosition: ['css;#searchresults_list', 3],
                    replaceE: 'css;#searchresults_footer',
                    scrollDelta: 3000
                }
            }, //  指南 - 搜索页
            afreecatv: {
                SiteTypeID: 0,
                host: 'www.afreecatv.com',
                pager: {
                    type: 2,
                    nextLink: '.btn-more > button',
                    intervals: 2000,
                    scrollDelta: 1000
                }
            }, //          直播
            greasyfork: {
                SiteTypeID: 0,
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
                    nextLink: '//a[@class="next_page"][@href]',
                    pageElement: 'css;ol#browse-script-list > li',
                    insertPosition: ['css;ol#browse-script-list', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1000
                }
            }, //             脚本
            greasyfork_feedback: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next_page"][@href]',
                    pageElement: 'css;.script-discussion-list > div',
                    insertPosition: ['css;.script-discussion-list', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            }, //    脚本 - 反馈页
            greasyfork_discussions: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//a[@class="next_page"][@href]',
                    pageElement: 'css;.discussion-list > div',
                    insertPosition: ['css;.discussion-list', 3],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1000
                }
            }, // 脚本 - 讨论页
            ruyile_xuexiao: {
                SiteTypeID: 0,
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
                    nextLink: '//div[@class="fy"]/a[contains(text(), "下一页")][@href]',
                    pageElement: 'css;.xxlb > .sk',
                    insertPosition: ['css;.xxlb', 3],
                    replaceE: 'css;.fy',
                    scrollDelta: 1000
                }
            }, //  如意了教育 - 学校
            ruyile_data: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="fy"]/a[contains(text(), "下一页")][@href]',
                    pageElement: 'css;.m1_z > .lbk',
                    insertPosition: ['css;.page', 1],
                    replaceE: 'css;.fy',
                    scrollDelta: 1000
                }
            }, //     如意了教育 - 数据
            ruyile_shijuan: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="fy"]/a[contains(text(), "下一页")][@href]',
                    pageElement: 'css;.m1_z > .m2_lb',
                    insertPosition: ['css;.page', 1],
                    replaceE: 'css;.fy',
                    scrollDelta: 1000
                }
            }, //  如意了教育 - 试卷
            w3school_cn: {
                SiteTypeID: 0,
                host: 'www.w3school.com.cn',
                functionStart: function() {if (location.pathname.split('/').length > 2) {curSite = DBSite.w3school_cn;}},
                pager: {
                    type: 1,
                    nextLink: function() { // 过滤部分非本页的参考手册
                        let next = document.querySelector('li.next > a')
                        if (next.href.indexOf('/index.') === -1) return next.href;
                        curSite = {SiteTypeID: 0}; return ''
                    },
                    pageElement: 'css;#maincontent > h1, #maincontent > div:not(#tpn):not(#bpn)',
                    insertPosition: ['css;#bpn', 1],
                    replaceE: 'css;ul.prenext, #navsecond, head > title',
                    history: true,
                    forceHTTPS: true,
                    scrollDelta: 2000
                }
            }, //     W3school
            runoob: {
                SiteTypeID: 0,
                host: 'www.runoob.com',
                functionStart: function() {if (location.pathname.split('/').length > 2) {
                    curSite = DBSite.runoob;
                }},
                insStyle: '#comments, #postcomments, #respond, #footer {display: none !important;} .article-intro h1:not(:nth-of-type(1)) {margin: 30px 0 10px 0;}',
                pager: {
                    type: 1,
                    nextLink: function() { // 过滤部分非本页的参考手册
                        let next = document.querySelector('#leftcolumn > a[style]~a')
                        if (next.href.split('/').length === location.href.split('/').length && next.href.split('/')[3] === location.href.split('/')[3]) return next.href;
                        next.href = location.href; curSite = {SiteTypeID: 0}; return ''
                    },
                    pageElement: 'css;#content > *',
                    insertPosition: ['css;#content', 3],
                    replaceE: 'css;.previous-next-links, #leftcolumn, head > title',
                    history: true,
                    forceHTTPS: true,
                    scrollDelta: 1000
                },
                function: {
                    after: function() { // 左侧栏高亮当前页面标题
                        let title = document.title.split(' | '); if (title.length > 1) {title = title[0]; document.querySelectorAll('#leftcolumn > a').forEach(function(e){if (e.innerText === title) {e.style = 'background-color: rgb(150, 185, 125); font-weight: bold; color: rgb(255, 255, 255);';}})}
                    }
                }
            }, //          菜鸟教程
            netbian: {
                SiteTypeID: 0,
                host: 'pic.netbian.com',
                insStyle: 'li.nextpage {display: none !important;}',
                pager: {
                    type: 1,
                    nextLink: '//div[@class="page"]/a[contains(text(),"下一页")]',
                    pageElement: 'css;.slist ul > li:not(.nextpage)',
                    insertPosition: ['css;.slist ul', 3],
                    replaceE: 'css;.page',
                    mimeType: 'text/html; charset=gbk',
                    scrollDelta: 1000
                }
            }, //           彼岸图网
            ioliu: {
                SiteTypeID: 0,
                host: 'bing.ioliu.cn',
                functionStart: function() {if (location.pathname.indexOf('/photo/') === -1 && location.pathname.indexOf('.html') === -1) {curSite = DBSite.ioliu; document.head.appendChild(document.createElement('base')).target = '_blank';}},
                insStyle: '.progressive--not-loaded {filter: none !important;}',
                pager: {
                    type: 1,
                    nextLink: '//div[@class="page"]/a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;body > .container > div.item',
                    insertPosition: ['css;body > .container', 3],
                    replaceE: 'css;.page',
                    scrollDelta: 1000
                }
            }, //             必应壁纸
            nastol: {
                SiteTypeID: 0,
                host: 'www.nastol.com.ua',
                pager: {
                    type: 1,
                    nextLink: '//a[./span[@class="nav-next"]]',
                    pageElement: 'css;#dle-content > div',
                    insertPosition: ['css;#dle-content > noindex', 1],
                    replaceE: 'css;.navigation',
                    mimeType: 'text/html; charset=windows-1251',
                    scrollDelta: 1000
                }
            }, //            壁纸
            hdqwalls: {
                SiteTypeID: 0,
                host: 'hdqwalls.com',
                pager: {
                    type: 1,
                    nextLink: 'css;a#next',
                    pageElement: 'css;.wallpapers_container > div.wall-resp',
                    insertPosition: ['css;div.pagination_container, .wallpapers_container > div.wall-resp+div:not(.wall-resp)', 1],
                    replaceE: 'css;ul.pagination',
                    scrollDelta: 1000
                }
            }, //          壁纸
            fnvshen: {
                SiteTypeID: 0,
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
                    nextLink: '//div[@class="pagesYY"]//a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;#listdiv > ul > li',
                    insertPosition: ['css;#listdiv > ul', 3],
                    replaceE: 'css;.pagesYY',
                    scrollDelta: 1000
                },
                function: {
                    before: src_functionBefore,
                    parameter: [0, 'img[data-original]', 'data-original']
                }
            }, //             宅男女神
            fnvshen_g: {
                SiteTypeID: 0,
                insStyle: '.yalayi_box {display: none !important; margin: -4px 0 !important;}',
                pager: {
                    type: 1,
                    nextLink: 'id("pages")/a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;#hgallery > img',
                    insertPosition: ['css;#hgallery', 3],
                    replaceE: 'css;#pages',
                    scrollDelta: 1000
                }
            }, //           宅男女神 - 图片内
            fnvshen_article_list: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//div[@class="pagesYY"]//a[@href][contains(text(), "下一页")]',
                    pageElement: 'css;li.other_girlli',
                    insertPosition: ['//ul[./li[@class="other_girlli"]]', 3],
                    replaceE: 'css;.pagesYY',
                    scrollDelta: 1000
                }
            }, //宅男女神 - 文章列表
            fnvshen_article: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: 'css;.pagesYY a.cur+a',
                    pageElement: 'css;#articleDiv',
                    insertPosition: ['css;#articleDiv', 5],
                    replaceE: 'css;.pagesYY',
                    scrollDelta: 1000
                }
            }, //     宅男女神 - 文章内
            zhutix: {
                SiteTypeID: 0,
                host: 'zhutix.com',
                functionStart: function() {if (document.getElementById('primary-home')) {
                    curSite = DBSite.zhutix_postlist;
                } else {
                    curSite = DBSite.zhutix;
                }},
                pager: {
                    type: 1,
                    nextLink: '//li[@class="next-page"]/a | //div[@class="btn-pager"]/a[contains(text(), "❯")]',
                    pageElement: 'css;#post-list > ul > li',
                    insertPosition: ['css;#post-list > ul', 3],
                    replaceE: 'css;.pagination, .b2-pagenav.post-nav',
                    scrollDelta: 1500
                }
            }, //          致美化
            zhutix_postlist: {
                SiteTypeID: 0,
                pager: {
                    type: 1,
                    nextLink: '//li[@class="next-page"]/a',
                    pageElement: 'css;#primary-home > div:not(.pagination)',
                    insertPosition: ['css;.pagination', 1],
                    replaceE: 'css;.pagination',
                    scrollDelta: 1500
                }
            } //  致美化 - 文章列表
        };
        // 生成 SiteTypeID
        generateID();
        // 用于脚本判断（针对部分特殊的网站）
        SiteType = {
            BAIDU_TIEBA: DBSite.baidu_tieba.SiteTypeID,
            GAMERSKY_GL: DBSite.gamersky_gl.SiteTypeID
        };
    }


    if (webType != 1) {
        // < 所有 Discuz!论坛 >
        if (webType === 2) {
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
            // < 所有 Flarum 论坛 >
        } else if (webType === 3) {
            DBSite.flarum.functionStart()
            // < 所有使用 WordPress DUX 主题的网站 >
        } else if (webType === 4) {
            if (location.pathname.indexOf('.html') === -1) curSite = DBSite.dux;
            if (location.host === 'apphot.cc') curSite.pager.scrollDelta = 2500; // 对于速度慢的网站，需要增加翻页敏感度
        }
    }

    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
    pausePageEvent(); // 左键双击网页空白处暂停翻页

    if (locationchange) { // 对于使用 pjax 技术的网站，需要监听 URL 变化来重新判断翻页规则
        nowLocation = location.href
        addLocationchange(); // 自定义 locationchange 事件
        if (webType === 1) {
            window.addEventListener('locationchange', function(){
                if (nowLocation != location.href) {
                    nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                    registerMenuCommand(); // 重新判断规则
                    curSite.pageUrl = ''; // 下一页URL
                    pageLoading(); // 自动无缝翻页

                    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                    pausePageEvent(); // 左键双击网页空白处暂停翻页
                }
            })
        } else if (webType === 3) {
            window.addEventListener('locationchange', function(){
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
        if (document.getElementById('autopbn')) { //                判断是否有 [下一页] 按钮
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
    function src_functionBefore(pageElems, css) {
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
    function toutiao_functionBefore(pageElems) {
        for (let i = 0; i < pageElems.length; i++) {
            let now = pageElems[i].querySelector('div[class*="-header"]')
            if (now && now.textContent === '相关搜索') {
                pageElems.splice(i,1)
            }
        }
        return pageElems
    }


    // [Startpage] 获取下一页地址
    function startpage_functionNext() {
        let form = getElementByXpath('//div[contains(@class, "pagination ")]/form[./button[@class="pagination__next-prev-button next"]]');
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
            document.querySelector('li.tbui_aside_fbar_button.tbui_fbar_down').insertAdjacentHTML(addTo(4), '<li class="tbui_aside_fbar_button tbui_fbar_post"><a href="javascript:void(0);" title="因为 [自动无缝翻页] 的原因，请点击该按钮发帖！"></a></li>')
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
    function baidu_tieba_functionBefore(pageElems) {
        pageElems.forEach(function (one) {
            one.querySelectorAll('img.threadlist_pic[data-original]').forEach(function (now) {
                now.src = now.dataset.original;
                now.style.display = 'inline';
            })
        });
        return pageElems
    }
    // [百度贴吧] 获取下一页地址
    function baidu_tieba_functionNext() {
        let next = document.querySelector('a.next.pagination-item[href]');
        if (next != null && next.nodeType === 1 && next.href && next.href.slice(0,4) === 'http') {
            var url = next.href + '&pagelets=frs-list%2Fpagelet%2Fthread&pagelets_stamp=' + new Date().getTime();
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url;
            getPageElems(curSite.pageUrl);
        };
    }
    // [百度贴吧] 插入数据
    function baidu_tieba_insertElement(newBody, type) {
        if (!newBody) return
        let pageElems = getAllElements(curSite.pager.pageElement, newBody, newBody),
            toElement = getAllElements(curSite.pager.insertPosition[0])[0];
        if (pageElems.length >= 0) {
            // 执行插入前函数
            pageElems = curSite.function.before(pageElems);
            // 插入位置
            let addTo1 = addTo(curSite.pager.insertPosition[1]);
            // 获取 <script> 内容
            const scriptElems = getAllElements('//script', newBody, newBody);
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
                pageElems = curSite.function.before(getAllElements(curSite.pager.pageElement, temp_baidu_tieba, temp_baidu_tieba)); // 插入前执行函数
                pageElems.forEach(function (one) {toElement.insertAdjacentElement(addTo1, one);}); // 插入元素
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
                // 替换元素
                let oriE = document.querySelectorAll(curSite.pager.pageElement.replace('css;', '')),
                    repE = getAllElements(curSite.pager.replaceE, temp_baidu_tieba, temp_baidu_tieba);
                if (oriE.length === repE.length) {
                    for (let i = 0; i < oriE.length; i++) {
                        oriE[i].outerHTML = repE[i].outerHTML;
                    }
                }
            }
        }
    }


    // [NGA(玩家社区)] 的插入后函数（加载各版块帖子列表样式）
    function nga_thread_functionAfter() {
        document.body.appendChild(document.createElement('script')).textContent = 'commonui.topicArg.loadAll();';
    }


    // [V2EX] 的插入后函数（新标签页打开链接）
    function v2ex_functionAfter(css) {
        let links = document.querySelectorAll(css);if (!links) return
        links.forEach(function (_this) {_this.target = '_blank';});
    }


    // [龙的天空] 获取下一页地址
    function lkong_functionNext() {
        let next = document.querySelector('li.ant-pagination-next'), page;
        if (next && next.getAttribute('aria-disabled') === 'false') {
            page = document.querySelector('li.ant-pagination-item-active[title]');
            if (page && page.title) {
                if (curSite.pager.intervals) {
                    let _SiteTypeID = curSite.SiteTypeID; curSite.SiteTypeID = 0;
                    setTimeout(function(){curSite.SiteTypeID = _SiteTypeID;}, curSite.pager.intervals)
                }
                return (location.origin + location.pathname + '?page=' + ++page.title);
            }
        }
        return '';
    }


    // [3DM MOD] 获取下一页地址
    function _3dmgame_mod_functionNext() {
        let nextNum = getElementByXpath('//li[@class="page-list active"]/following-sibling::li[contains(@class, "page-list")]/a');
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
    function gamersky_gl_functionBefore(pageElems) {
        pageElems.forEach(function (one) {
            if (one.tagName === 'P' && one.textContent.indexOf('更多相关内容请关注') > -1) {one.style.display = 'none';}
        });
        return pageElems
    }


    // [NexusMods] 获取下一页地址
    function nexusmods_functionNext() {
        if (document.querySelector('.nexus-ui-blocker')) return
        let modList;
        if (location.pathname.indexOf('/news') > -1) {modList = RH_NewsTabContent;} else {modList = RH_ModList;}
        let out_items = JSON.stringify(modList.out_items).replace(/{|}|"/g,''),
            nextNum = getElementByXpath('//div[contains(@class, "pagenav")][1]//a[contains(@class, "page-selected")]/parent::li/following-sibling::li/a'),
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
    function nexusmods_insertElement(newBody, type) {
        if (!newBody) return
        let pageElems = getAllElements(curSite.pager.pageElement, newBody, newBody), // 主体元素
            toElement = getAllElements(curSite.pager.insertPosition[0])[0], // 插入位置的元素
            addTo1 = addTo(curSite.pager.insertPosition[1]); // 插入位置
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
        pageElems.forEach(function (one) {toElement.insertAdjacentElement(addTo1, one);});
        // 当前页码 + 1
        pageNum.now = pageNum._now + 1
        // 替换元素
        let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
            repE = getAllElements(curSite.pager.replaceE, newBody, newBody);
        if (oriE.length === repE.length) {
            for (let i = 0; i < oriE.length; i++) {
                oriE[i].outerHTML = repE[i].outerHTML;
            }
        }
    }


    // [cs_rin_ru] 各版块帖子列表的插入前函数（过滤置顶帖子）
    function cs_rin_ru_functionBefore(pageElems) {
        for (let i = 0; i < pageElems.length; i++) {
            if (pageElems[i].textContent.replace(/\n|	/g,'') === 'Topics') {
                pageElems.splice(0,i+1);
                break;
            }
        }
        return pageElems
    }


    // [Anime1] 获取下一页地址
    function anime1_functionNext() {
        let next = document.getElementById('tablepress-1_next');
        if (next && next.className.indexOf('disabled') === -1) {
            let oldList = document.querySelector('tbody.row-hover');
            if (oldList) {
                // 将当前列表存为变量
                oldList = oldList.innerHTML;
                // 暂停一段时间，避免多次重复点击下一页
                /*let _SiteTypeID = curSite.SiteTypeID;
                curSite.SiteTypeID = 0;
                setTimeout(function(){curSite.SiteTypeID = _SiteTypeID;}, 400)*/
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
    function skrbt_functionNext() {
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
    function bthaha_functionBefore(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.querySelector('[id^="list_top"], [id^="list_bottom"]')
            if (now) {one.hidden = true;}
        });
        return pageElems
    }


    // [射手网] 获取下一页地址
    function assrt_functionNext() {
        let nextXPAHT = '//a[@id="pl-nav"][@href][contains(text(), ">")]'
        let url = getElementByXpath(nextXPAHT);
        if (url) {
            url = /(?<=\()\d+(?=,)/.exec(url.href)[0]
            if (url) {
                return (location.origin + location.pathname + location.search.replace(/(&)?page=\d+$/,'') + '&page=' + url);
            }
        }
        return '';
    }


    // [LRepacks] 的插入前函数（调整 class）
    function lrepacks_functionBefore(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.querySelector('.slideUp, .elementFade')
            if (now) {
                now.className = now.className.replace('slideUp','slideUpRun').replace('elementFade','elementFadeRun');
            }
        });
        return pageElems
    }


    // [漫画狂] 获取下一页地址
    function cartoonmad_functionNext() {
        let nextXPAHT = '//a[@class="pages"][contains(text(),"下一頁")]',
            nextPXPATH = '//a[@class="pages"][contains(string(),"下一話")]'
        let url = getElementByXpath(nextXPAHT);
        if (url) {
            if (url.getAttribute('href') === 'thend.asp') {
                url = getElementByXpath(nextPXPATH)
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
        document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中

    }
    // [漫画猫] 获取下一页地址
    function manhuacat_functionNext(pageElems, type) {
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
    function manhuacat_insertElement(pageElems, type) {
        if (!pageElems) return
        if (type === 'url') { // 获取下一页链接
            manhuacat_functionNext(pageElems, type); return
        }

        // 添加历史记录
        window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

        // 替换元素
        let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
            repE = getAllElements(curSite.pager.replaceE, pageElems, pageElems);
        if (oriE.length === repE.length) {
            for (let i = 0; i < oriE.length; i++) {
                oriE[i].outerHTML = repE[i].outerHTML;
            }
        }

        // 插入图片
        let _img = '', _img_arr = LZString.decompressFromBase64(getElementByXpath('//body/script[not(@src)][contains(text(), "img_data")]').textContent.split('"')[1]).split(','), vg_r_data = document.querySelector('.vg-r-data');;
        for (let now of _img_arr) {
            _img += `<img src="${vg_r_data.dataset.chapterDomain}${img_pre}${now}">`;
        }
        if (_img) {
            document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中
            // 当前页码 + 1
            pageNum.now = pageNum._now + 1
        }
    }


    // [漫画DB] 初始化（将本话其余图片插入网页中）
    function manhuadb_init() {
        let _img = '',
            data = document.querySelector('.vg-r-data'), imgDate;
        if (!data) return
        document.querySelectorAll(curSite.pager.pageElement.replace('css;', '')).forEach(function (one) {
            if (one.tagName === 'SCRIPT' && one.textContent.indexOf('var img_data =') > -1) {
                let json = JSON.parse(window.atob(one.textContent.split("'")[1]));
                if (json) {
                    let _img = '';
                    for (let i = 0; i < json.length; i++) { // 遍历图片文件名数组，组合为 img 标签
                        let src = data.dataset.host + data.dataset.img_pre + json[i].img;
                        _img += `<img class="img-fluid show-pic" src="${src}">`
                    }
                    document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中
                }
            }
        })
    }
    // [漫画DB] 获取下一页地址
    function manhuadb_functionNext() {
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
    function manhuadb_insertElement(pageElems, type) {
        if (!pageElems) return
        let oriE = document.querySelectorAll(curSite.pager.pageElement.replace('css;', '')),
            repE = getAllElements(curSite.pager.pageElement, pageElems, pageElems);
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
        document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中
        window.document.title = window.document.title.replace(/(\(第.+\))? - HiComic/, `(${document.querySelector('.chapter_name').textContent}) - HiComic`); // 修改网页标题（加上 第 X 话）
    }
    // [HiComic(嗨漫画)] 获取下一页地址
    function hicomic_functionNext() {
        let nextId;
        nextId = document.querySelector('.next_chapter:not(.end)')
        if (nextId && nextId.id && nextId.id != 'None') {
            curSite.pageUrl = location.href;
            getPageElems(`https://www.hicomic.net/api/web/chapter/${nextId.id}/contents`, 'json');
        }
    }
    // [HiComic(嗨漫画)] 插入数据
    function hicomic_insertElement(pageElems, type) {
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
        document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中
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
        document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中

    }
    // [动漫之家] 获取下一页地址
    function dmzj_functionNext() {
        let next;
        next = document.querySelector('span.next > a[href]')
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            getPageElems(curSite.pageUrl);
        }
    }
    // [动漫之家] 插入数据
    function dmzj_insertElement(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        let scriptElement = pageElems.querySelectorAll('head > script[type]:not([src])'), scriptText = '';
        scriptElement.forEach(function (one) {scriptText += ';' + one.textContent;});
        if (scriptText) document.body.appendChild(document.createElement('script')).textContent = scriptText;

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
            document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中

            // 添加历史记录
            window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

            // 替换元素
            let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
                repE = getAllElements(curSite.pager.replaceE, pageElems, pageElems);
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
        document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中

    }
    // [动漫之家-漫画] 获取下一页地址
    function dmzj_manhua_functionNext() {
        let next;
        next = document.getElementById('next_chapter')
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            getPageElems(curSite.pageUrl);
        }
    }
    // [动漫之家-漫画] 插入数据
    function dmzj_manhua_insertElement(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        let scriptElement = pageElems.querySelectorAll('head > script[type]:not([src])'), scriptText = '';
        scriptElement.forEach(function (one) {scriptText += ';' + one.textContent;});
        if (scriptText) document.body.appendChild(document.createElement('script')).textContent = scriptText;

        // 插入图片
        let _img = '';
        for (let now of arr_pages) {
            _img += `<img src="${img_prefix}${now}">`;
        }
        if (_img) {
            document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中

            // 添加历史记录
            window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

            // 替换元素
            let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
                repE = getAllElements(curSite.pager.replaceE, pageElems, pageElems);
            if (oriE.length === repE.length) {
                for (let i = 0; i < oriE.length; i++) {
                    oriE[i].outerHTML = repE[i].outerHTML;
                }
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
            }
        }
    }


    // [拷贝漫画] 获取下一页地址
    function copymanga_functionNext() {
        let next;
        next = document.querySelector('.comicContent-next > a[href]')
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            getPageElems(curSite.pageUrl);
        }
    }
    // [拷贝漫画] 插入数据
    function copymanga_insertElement(pageElems, type) {
        if (!pageElems) return
        // 添加历史记录
        window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);
        let oldImg = document.querySelector('.comicContent-image-list').innerHTML;

        // 替换元素
        let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
            repE = getAllElements(curSite.pager.replaceE, pageElems, pageElems);
        if (oriE.length === repE.length) {
            for (let i = 0; i < oriE.length; i++) {
                oriE[i].outerHTML = repE[i].outerHTML;
            }
            // 插入并运行 <script>
            document.body.appendChild(document.createElement('script')).src = document.querySelector('body > script[async][src*="comic_content_pass"]').src;
            setTimeout(function(){
                document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), oldImg); // 将 img 标签插入到网页中
            }, 100);
            // 当前页码 + 1
            pageNum.now = pageNum._now + 1
        }
    }


    // [漫画星球] 获取下一页地址
    function mhxqiu_functionNext() {
        let next = document.querySelector('#mainControlNext');
        if (next) {
            if (next.href === curSite.pageUrl) return
            curSite.pageUrl = next.href;
            getPageElems(curSite.pageUrl);
        }
    }
    // [漫画星球] 插入数据
    function mhxqiu_insertElement(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        let scriptElement = getElementByXpath('//body/script[@type][not(@src)][contains(text(), "eval(")]', pageElems);
        if (scriptElement) document.body.appendChild(document.createElement('script')).textContent = scriptElement.textContent;

        // 插入图片
        let _img = '';
        for (let now of newImgs) {
            _img += `<li style="margin:0 auto;"><div style="display: inline-block;zoom: 1;"><img src="${now}" class="loaded lazy" style="opacity: 1;box-shadow:none;"></div></li>`;
        }
        if (_img) {
            document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中

            // 添加历史记录
            window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

            // 替换元素
            let oriE = document.querySelectorAll(curSite.pager.replaceE.replace('css;', '')),
                repE = getAllElements(curSite.pager.replaceE, pageElems, pageElems);
            if (oriE.length === repE.length) {
                for (let i = 0; i < oriE.length; i++) {
                    oriE[i].outerHTML = repE[i].outerHTML;
                }
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
            }
        }
    }


    // [古风漫画网] 获取下一页地址
    function gufengmh_functionNext() {
        let pageElems = document.querySelector(curSite.pager.pageElement.replace('css;', '')); // 寻找数据所在元素
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
    function gufengmh_insertElement(pageElems, type) {
        if (pageElems) {
            let url = curSite.pageUrl;
            pageElems = getAllElements(curSite.pager.pageElement, pageElems, pageElems)[0];
            let chapterImages, chapterPath;
            document.querySelector(curSite.pager.pageElement.replace('css;', '')).innerText = pageElems.textContent; // 将当前网页内的数据所在元素内容改为刚刚获取的下一页数据内容，以便循环获取下一页 URL
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
                document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中
                // 当前页码 + 1
                pageNum.now = pageNum._now + 1
            }
        }
    }


    // [砂之船动漫家] 的插入前函数（加载图片）
    function szcdmj_functionBefore(pageElems) {
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
        pageNumber('del');
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
    function mangabz_functionNext() {
        var url = '';
        if (MANGABZ_PAGE === MANGABZ_IMAGE_COUNT) { // 下一话
            url = getElementByXpath('//a[./img[contains(@src, "icon_xiayizhang")]]')
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
    function mangabz_insertElement(pageElems, type) {
        if (pageElems) {
            if (type === 'Next') {
                let imgArr = eval(pageElems),
                    _img = '';
                for (let now of imgArr) {
                    _img += `<img src="${now}">`;
                }
                if (_img) {
                    document.querySelector(curSite.pager.insertPosition[0].replace('css;', '')).insertAdjacentHTML(addTo(curSite.pager.insertPosition[1]), _img); // 将 img 标签插入到网页中

                    // 添加历史记录
                    MANGABZ_PAGE += imgArr.length;
                    window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, document.title, location.origin + MANGABZ_CURL.substring(0, MANGABZ_CURL.length - 1) + '-p' + MANGABZ_PAGE + '/');
                }
            } else {
                // 插入 <script> 标签
                let scriptElement = pageElems.querySelectorAll('html:not([dir]) > head > script:not([src])'), scriptText = '';
                scriptElement.forEach(function (one) {scriptText += ';' + one.textContent;});
                if (scriptText) {
                    document.body.appendChild(document.createElement('script')).textContent = scriptText;

                    window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, pageElems.querySelector('title').textContent, curSite.pageUrl);

                    // 替换待替换元素
                    let oriE = getAllElements(curSite.pager.replaceE),
                        repE = getAllElements(curSite.pager.replaceE, pageElems, pageElems);
                    if (oriE.length === repE.length) {
                        for (let i = 0; i < oriE.length; i++) {
                            oriE[i].outerHTML = repE[i].outerHTML;
                        }
                    }
                    MANGABZ_PAGE = 0;
                    mangabz_functionNext();
                }
            }
        }
    }


    // 自动无缝翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0) {
            windowScroll(function (direction, e) {
                if (direction === 'down' && pausePage === true && curSite.SiteTypeID > 0) { // 下滑 且 未暂停翻页 且 SiteTypeID > 0 时，才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                        scrollHeight = window.innerHeight || document.documentElement.clientHeight,
                        scrollDelta = curSite.pager.scrollDelta;

                    if (curSite.pager.type === 3) { // <<<<< 翻页类型 3（依靠元素距离可视区域底部的距离来触发翻页）>>>>>
                        let scrollElement = document.querySelector(curSite.pager.scrollElement);
                        //console.log(scrollElement.offsetTop - (scrollTop + scrollHeight), scrollDelta, curSite.SiteTypeID)
                        if (scrollElement.offsetTop - (scrollTop + scrollHeight) <= scrollDelta) {
                            if (curSite.SiteTypeID === SiteType.GAMERSKY_GL) curSite.pager.scrollDelta -= 800 // 游民星空 gl 的比较奇葩，需要特殊处理下
                            ShowPager.loadMorePage();
                        }

                    } else {
                        if (document.documentElement.scrollHeight <= scrollHeight + scrollTop + scrollDelta) {

                            if (curSite.pager.type === 2) { // <<<<< 翻页类型 2（网站自带了自动无缝翻页功能，只需要点击下一页按钮即可）>>>>>
                                let autopbn = document.querySelector(curSite.pager.nextLink);
                                if (autopbn) { // 寻找下一页链接
                                    // 避免重复点击翻页按钮
                                    if (curSite.pager.nextText) { //          按钮文本，当按钮文本 = 该文本时，才会点击按钮加载下一页
                                        if (autopbn.innerText === curSite.pager.nextText) {autopbn.click(); pageNum.now = pageNum._now + 1;} // 当前页码 + 1

                                    } else if (curSite.pager.nextTextOf) { // 按钮文本的一部分，当按钮文本包含该文本时，才会点击按钮加载下一页
                                        if (autopbn.innerText.indexOf(curSite.pager.nextTextOf) > -1) {autopbn.click(); pageNum.now = pageNum._now + 1;} // 当前页码 + 1

                                    } else if (curSite.pager.nextHTML) { //   按钮内元素，当按钮内元素 = 该元素内容时，才会点击按钮加载下一页
                                        if (autopbn.innerHTML === curSite.pager.nextHTML) {autopbn.click(); pageNum.now = pageNum._now + 1;} // 当前页码 + 1

                                    } else { // 如果没有指定按钮文字就直接点击
                                        autopbn.click(); pageNum.now = pageNum._now + 1; // 当前页码 + 1
                                        // 对于没有按钮文字变化的按钮，可以指定间隔时间（默认 300ms）
                                        if (!curSite.pager.intervals) {curSite.pager.intervals = 300;}
                                        let _SiteTypeID = curSite.SiteTypeID; curSite.SiteTypeID = 0;
                                        setTimeout(function(){curSite.SiteTypeID = _SiteTypeID;}, curSite.pager.intervals)
                                    }
                                }

                            } else if (curSite.pager.type === 1) { // <<<<< 翻页类型 1（由脚本实现自动无缝翻页）>>>>>
                                ShowPager.loadMorePage();

                            } else if (curSite.pager.type === 4) { // <<<<< 翻页类型 4（部分简单的动态加载类网站）>>>>>
                                // 为百度贴吧的发帖考虑...
                                if (!(document.documentElement.scrollHeight <= scrollHeight + scrollTop + 200 && curSite.SiteTypeID === SiteType.BAIDU_TIEBA)) {
                                    curSite.pager.nextLink();
                                }
                                if (curSite.pager.intervals) {
                                    let _SiteTypeID = curSite.SiteTypeID;
                                    curSite.SiteTypeID = 0;
                                    setTimeout(function(){curSite.SiteTypeID = _SiteTypeID;}, curSite.pager.intervals)
                                }
                            }
                        }
                    }
                }
            });
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
        if (curSite.SiteTypeID === 0) {let status = document.getElementById('Autopage_number');if (status) {status.style.display = 'none';}; return}
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


    // 生成 ID
    function generateID() {
        let num = 0
        for (let val in DBSite) {
            DBSite[val].SiteTypeID = num = num + 1;
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
            console.info('[自动无缝翻页] - 其他网站（独立规则）'); return 1;
        } else if (document.querySelector('meta[name="author"][content*="Discuz!"], meta[name="generator"][content*="Discuz!"]') || document.querySelector('body[id="nv_forum"][class^="pg_"][onkeydown*="27"]') || document.querySelector('body[id="nv_search"][onkeydown*="27"]') || (document.querySelector('a[href*="www.discuz.net"]') && document.querySelector('a[href*="www.discuz.net"]').textContent.indexOf('Discuz!') > -1) || (document.getElementById('ft') && document.getElementById('ft').textContent.indexOf('Discuz!') > -1)) {
            console.info('[自动无缝翻页] - Discuz! 论坛'); return 2;
        } else if (document.getElementById('flarum-loading')) {
            console.info('[自动无缝翻页] - Flarum 论坛'); return 3;
        } else if (document.querySelector('link[href*="themes/dux" i], script[src*="themes/dux" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress DUX 主题的网站'); return 4;
        } else if (self != top) {
            return -1;
        }
        return 0;
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


    // 类型 4 专用
    function getPageElems(url, type = '', method = 'GET', data = '', type2) {
        //console.log(url, data)
        let mimeType = '';
        if (curSite.pager.mimeType) mimeType = curSite.pager.mimeType;
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
            timeout: 5000,
            onload: function (response) {
                try {
                    //console.log('最终 URL：' + response.finalUrl, '返回内容：' + response.responseText)
                    switch (type) {
                        case 'json':
                            curSite.pager.insertElement(response.response, type2);
                            break;
                        case 'text':
                            curSite.pager.insertElement(response.responseText, type2)
                            break;
                        default:
                            curSite.pager.insertElement(ShowPager.createDocumentByString(response.responseText), type2)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }


    // 插入位置
    function addTo(num) {
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
                if (typeof curSite.pager.nextLink == 'function') {
                    url = curSite.pager.nextLink();
                } else {
                    if (curSite.pager.nextLink.slice(0,4) === 'css;') {
                        url = this.getFullHref(getElementByCSS(curSite.pager.nextLink.slice(4)));
                    } else {
                        url = this.getFullHref(getElementByXpath(curSite.pager.nextLink));
                    }
                }
                //console.log(url, curSite.pageUrl);
                if (url === '') return;
                if (curSite.pager.forceHTTPS && location.protocol === 'https:') {url = url.replace(/^http:/,'https:');}
                if (curSite.pageUrl === url) return;// 避免重复加载相同的页面
                curSite.pageUrl = url;
                let mimeType = '';
                if (curSite.pager.mimeType) mimeType = curSite.pager.mimeType;
                // 读取下一页的数据
                GM_xmlhttpRequest({
                    url: url,
                    method: 'GET',
                    overrideMimeType: mimeType,
                    headers: {
                        'Referer': location.href
                    },
                    timeout: 5000,
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
    function processResult(response) {
        //console.log('最终 URL：' + response.finalUrl, '返回内容：' + response.responseText)
        var newBody = ShowPager.createDocumentByString(response.responseText);
        let pageElems = getAllElements(curSite.pager.pageElement, newBody, newBody),
            toElement = getAllElements(curSite.pager.insertPosition[0])[0];
        //console.log(curSite.pager.pageElement, pageElems, curSite.pager.insertPosition, toElement)

        if (pageElems.length >= 0) {
            // 如果有插入前函数就执行函数
            if (curSite.function && curSite.function.before) {
                if (curSite.function.parameter) { // 如果指定了参数
                    pageElems = curSite.function.before(pageElems, curSite.function.parameter);
                } else {
                    pageElems = curSite.function.before(pageElems);
                }
            }

            // 插入位置
            let addTo1 = addTo(curSite.pager.insertPosition[1]);

            // 插入新页面元素
            if (curSite.pager.insertPosition[1] === 2 || curSite.pager.insertPosition[1] === 4) { // 插入到元素内头部、目标本身后面，需要合并后一起插入，否则会顺序相反
                let afterend = '';
                pageElems.forEach(function (one) {afterend += one.outerHTML;});
                toElement.insertAdjacentHTML(addTo1, afterend);
            } else if (curSite.pager.insertPosition[1] === 5) { // 插入到目标内部末尾（针对文本）
                let afterend = '';
                pageElems.forEach(function (one) {afterend += one.innerHTML;});
                toElement.insertAdjacentHTML(addTo1, afterend);
            } else {
                pageElems.forEach(function (one) {toElement.insertAdjacentElement(addTo1, one);});
            }

            // 当前页码 + 1
            pageNum.now = pageNum._now + 1

            // 插入 <script> 标签
            if (curSite.pager.scriptType) {
                let scriptText = '';
                if (curSite.pager.scriptType === 1) { //         下一页的所有 <script> 标签
                    const scriptElems = getAllElements('//script', newBody, newBody);
                    scriptElems.forEach(function (one) {
                        if (one.src) {
                            toElement.appendChild(document.createElement('script')).src = one.src;
                        } else {
                            scriptText += ';' + one.textContent;
                        }
                    });
                    toElement.appendChild(document.createElement('script')).textContent = scriptText;
                } else if (curSite.pager.scriptType === 2) { //  下一页主体元素同级 <script> 标签
                    pageElems.forEach(function (one) {if (one.tagName === 'SCRIPT') {scriptText += ';' + one.textContent;}});
                    if (scriptText) toElement.appendChild(document.createElement('script')).textContent = scriptText;
                } else if (curSite.pager.scriptType === 3) { //  下一页主体元素同级 <script> 标签（远程文件）
                    pageElems.forEach(function (one) {if (one.tagName === 'SCRIPT' && one.src) {toElement.appendChild(document.createElement('script')).src = one.src;}});
                } else if (curSite.pager.scriptType === 4) { //  下一页主体元素子元素 <script> 标签
                    pageElems.forEach(function (one) {
                        const scriptElems = one.querySelectorAll('script');
                        scriptElems.forEach(function (script) {scriptText += ';' + script.textContent;});
                    });
                    if (scriptText) toElement.appendChild(document.createElement('script')).textContent = scriptText;
                }
            }

            // 添加历史记录
            if (curSite.pager.history && curSite.pager.history == true) {
                window.history.pushState(`{title: ${document.title}, url: ${location.href}}`, newBody.querySelector('title').textContent, curSite.pageUrl);
            }

            // 替换待替换元素
            if (curSite.pager.replaceE) {
                try {
                    let oriE = getAllElements(curSite.pager.replaceE),
                        repE = getAllElements(curSite.pager.replaceE, newBody, newBody);
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
            if (curSite.function && curSite.function.after) {
                if (curSite.function.parameter) { // 如果指定了参数
                    curSite.function.after(curSite.function.parameter);
                } else {
                    curSite.function.after();
                }
            }
        }
    }
    function getElementByCSS(css, contextNode = document) {
        return contextNode.querySelector(css);
    }
    function getAllElementsByCSS(css, contextNode = document) {
        return [].slice.call(contextNode.querySelectorAll(css));
    }
    function getElementByXpath(xpath, contextNode, doc = document) {
        contextNode = contextNode || doc;
        try {
            const result = doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            // 应该总是返回一个元素节点
            return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
        } catch (err) {
            throw new Error(`Invalid xpath: ${xpath}`);
        }
    }
    function getAllElementsByXpath(xpath, contextNode, doc = document) {
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
    function getAllElements(selector, contextNode = undefined, doc = document, win = window, _cplink = undefined) {
        if (!selector) return [];
        contextNode = contextNode || doc;
        if (typeof selector === 'string') {
            if (selector.search(/^css;/i) === 0) {
                return getAllElementsByCSS(selector.slice(4), contextNode);
            } else {
                return getAllElementsByXpath(selector, contextNode, doc);
            }
        } else {
            const query = selector(doc, win, _cplink);
            if (!Array.isArray(query)) {
                throw new Error('getAllElements 返回错误类型');
            } else {
                return query;
            }
        }
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