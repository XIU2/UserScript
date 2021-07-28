// ==UserScript==
// @name         自动无缝翻页
// @version      1.3.4
// @author       X.I.U
// @description  自动无缝翻页，目前支持：所有 Discuz!论坛、423Down、Apphot、不死鸟、小众软件、异次元软件、微当下载、异星软件空间、豆瓣电影、微博评论、3DM游戏网、游侠网、游民星空、千图网、阿里小站、RARBG、FitGirl Repacks、AlphaCoders、PubMed...
// @match        *://*/*
// @exclude      *://www.423down.com/*.html
// @exclude      *://apphot.cc/*.html
// @connect      www.gamersky.com
// @icon         https://i.loli.net/2021/03/07/rdijeYm83pznxWq.png
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    // 目前支持的网站
    var websiteList = ['www.423down.com',
                       'apphot.cc',
                       'iao.su',
                       'www.appinn.com',
                       'www.iplaysoft.com',
                       'www.weidown.com',
                       'fitgirl-repacks.site',
                       'art.alphacoders.com', 'wall.alphacoders.com', 'avatars.alphacoders.com', 'mobile.alphacoders.com',
                       'pubmed.ncbi.nlm.nih.gov',
                       'movie.douban.com',
                       'search.douban.com',
                       'www.3dmgame.com',
                       'www.gamersky.com',
                       'www.ali213.net',
                       'gl.ali213.net',
                       'www.58pic.com',
                       'rarbgprx.org',
                       'www.yxssp.com',
                       'pan.yuankongjian.com',
                       'weibo.com'];

    if (GM_getValue('menu_disable') == null){GM_setValue('menu_disable', [])};
    // 注册脚本菜单
    if (menu_disable('check')) { // 当前网站是否已存在禁用列表中
        GM_registerMenuCommand('❎ 已禁用 (点击对当前网站启用)', function(){menu_disable('del')});
        return
    } else {
        if (websiteList.indexOf(location.host) > -1 || document.querySelector('meta[name="author"][content*="Discuz!"]')) {
            GM_registerMenuCommand('✅ 已启用 (点击对当前网站禁用)', function(){menu_disable('add')});
        } else {

            GM_registerMenuCommand('❌ 当前网站暂不支持，请点击下方选项申请支持~');
        }
    }
    GM_registerMenuCommand('💬 反馈 & 欢迎申请支持', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});});

    // 默认 ID 为 0
    var curSite = {SiteTypeID: 0};

    /*
    自动翻页规则
    type：
      1 = 脚本实现自动无缝翻页
      2 = 网站自带了自动无缝翻页功能，只需要点击下一页按钮即可，这时 nextText 为按钮文本，避免一瞬间加载太多次下一页
      3 = 依靠元素距离可视区域底部的距离来触发翻页
    HT_insert：
      1 = 插入该元素本身的前面；
      2 = 插入该元素当中，第一个子元素前面；
      3 = 插入该元素当中，最后一个子元素后面；
      4 = 插入该元素本身的后面；
    scrollDelta：数值越大，滚动条触发点越靠上（越早开始翻页），一般是访问网页速度越慢，该值就需要越大
    function：
      before = 插入前执行函数；
      after = 插入后执行函数；
      parameter = 参数
    */
    let DBSite = {
        discuz_forum: {
            SiteTypeID: 1,
            pager: {
                type: 2,
                nextLink: '#autopbn',
                nextText: '下一页 »',
                scrollDelta: 1000
            }
        },
        discuz_thread: {
            SiteTypeID: 2,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#postlist > div[id^="post_"]',
                HT_insert: ['css;div#postlist', 3],
                replaceE: 'css;div.pg',
                scrollDelta: 1000
            }
        },
        discuz_search: {
            SiteTypeID: 3,
            pager: {
                type: 1,
                nextLink: '//a[@class="nxt"][@href]',
                pageElement: 'css;div#threadlist > ul',
                HT_insert: ['css;div#threadlist', 3],
                replaceE: 'css;div.pg',
                scrollDelta: 1000
            }
        },
        _423down_postslist: {
            SiteTypeID: 4,
            pager: {
                type: 1,
                nextLink: '//div[@class="paging"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div.content-wrap ul.excerpt > li',
                HT_insert: ['css;div.content-wrap ul.excerpt', 3],
                replaceE: 'css;div.paging',
                scrollDelta: 1500
            }
        },
        apphot_postslist: {
            SiteTypeID: 5,
            pager: {
                type: 1,
                nextLink: '//div[@class="pagination"]//a[contains(text(),"下一页")][@href]',
                pageElement: 'css;div.content > article.excerpt',
                HT_insert: ['css;div.pagination', 1],
                replaceE: 'css;div.pagination',
                scrollDelta: 1500
            }
        },
        iao_su_postslist: {
            SiteTypeID: 6,
            pager: {
                type: 1,
                nextLink: '//li[@class="btn btn-primary next"]//a[@href]',
                pageElement: 'css;#index > article, #archive > article',
                HT_insert: ['css;ol.page-navigator', 1],
                replaceE: 'css;ol.page-navigator',
                scrollDelta: 800
            },
            function: {
                before: iao_su_postslist_beforeFunction
            }
        },
        appinn_postslist: {
            SiteTypeID: 7,
            pager: {
                type: 1,
                nextLink: '//a[@class="next page-numbers"][@href]',
                pageElement: 'css;section#latest-posts > article',
                HT_insert: ['css;nav.navigation.pagination', 1],
                replaceE: 'css;div.nav-links',
                scrollDelta: 1500
            }
        },
        iplaysoft_postslist: {
            SiteTypeID: 8,
            pager: {
                type: 1,
                nextLink: '//div[@class="pagenavi"]//a[@title="下一页"][@href]',
                pageElement: 'css;#postlist > div.entry',
                HT_insert: ['css;#postlist > .pagenavi-button', 1],
                replaceE: 'css;.pagenavi-button, .pagenavi',
                scrollDelta: 1200
            },
            function: {
                before: iplaysoft_postslist_beforeFunction
            }
        },
        iplaysoft_postcomments: {
            SiteTypeID: 9,
            pager: {
                type: 2,
                nextLink: '#loadHistoryComments',
                nextText: '展开后面',
                scrollDelta: 1200
            }
        },
        pubmed_postslist: {
            SiteTypeID: 10,
            pager: {
                type: 2,
                nextLink: 'button.load-button.next-page',
                nextText: 'Show more',
                scrollDelta: 1500
            }
        },
        wall_alphacoders: {
            SiteTypeID: 11,
            pager: {
                type: 1,
                nextLink: '//a[@id="next_page"][@href]',
                pageElement: 'css;.thumb-container-big, .avatar-thumb, .thumb-element',
                HT_insert: ['css;.thumb-container-big:nth-last-child(1), .avatar-thumb:nth-last-child(1), .thumb-element:nth-last-child(1)', 4],
                replaceE: '//div[@class="hidden-xs hidden-sm"]/..',
                scrollDelta: 1000
            }
        },
        art_alphacoders: {
            SiteTypeID: 12,
            pager: {
                type: 1,
                nextLink: '//a[@id="next_page"][@href]',
                pageElement: 'css;.container-masonry > div',
                HT_insert: ['css;.container-masonry', 3],
                replaceE: '//div[@class="hidden-xs hidden-sm"]/..',
                scrollDelta: 1000
            },
            function: {
                before: art_alphacoders_beforeFunction
            }
        },
        fitgirl: {
            SiteTypeID: 13,
            pager: {
                type: 1,
                nextLink: '//a[@class="next page-numbers"][@href]',
                pageElement: 'css;article[id^="post-"]',
                HT_insert: ['css;nav.navigation.paging-navigation', 1],
                replaceE: 'css;nav.navigation.paging-navigation',
                scrollDelta: 2000
            }
        },
        weidown: {
            SiteTypeID: 14,
            pager: {
                type: 1,
                nextLink: '//a[@class="nextpage"][@href]',
                pageElement: 'css;.articleWrapper > .itemArticle, .articleWrapper > .richTextItem.search',
                HT_insert: ['css;.articleWrapper', 3],
                replaceE: 'css;#pageGroup',
                scrollDelta: 1500
            }
        },
        weidown_search: {
            SiteTypeID: 14,
            pager: {
                type: 1,
                nextLink: '//a[@class="nextpage"][@href]',
                pageElement: 'css;.articleListWrapper > .richTextItem.search',
                HT_insert: ['css;#pageGroup', 1],
                replaceE: 'css;#pageGroup',
                scrollDelta: 700
            }
        },
        weidown_special: {
            SiteTypeID: 14,
            pager: {
                type: 1,
                nextLink: '//a[@class="nextpage"][@href]',
                pageElement: 'css;.special > .item',
                HT_insert: ['css;.special', 3],
                replaceE: 'css;#pageGroup',
                scrollDelta: 700
            }
        },
        douban_subject_comments: {
            SiteTypeID: 15,
            pager: {
                type: 1,
                nextLink: '//a[@class="next"][@href]',
                pageElement: 'css;#comments > .comment-item',
                HT_insert: ['css;#paginator', 1],
                replaceE: 'css;#paginator',
                scrollDelta: 700
            }
        },
        douban_subject_reviews: {
            SiteTypeID: 16,
            pager: {
                type: 1,
                nextLink: '//link[@rel="next"][@href]',
                pageElement: 'css;.review-list > div',
                HT_insert: ['css;.review-list', 3],
                replaceE: 'css;.paginator',
                scrollDelta: 700
            }
        },
        douban_subject_episode: {
            SiteTypeID: 17,
            pager: {
                type: 1,
                nextLink: '//link[@rel="next"][@href]',
                pageElement: 'css;#comments > div',
                HT_insert: ['css;#comments', 3],
                replaceE: 'css;.paginator',
                scrollDelta: 700
            }
        },
        douban_search: {
            SiteTypeID: 18,
            pager: {
                type: 1,
                nextLink: '//a[@class="next"][@href]',
                pageElement: 'css;#root [class^="_"] [class^="sc-"]',
                HT_insert: ['css;.paginator', 1],
                replaceE: 'css;.paginator',
                scrollDelta: 700
            }
        },
        _3dmgame: {
            SiteTypeID: 19,
            pager: {
                type: 3,
                nextLink: '//li[@class="next"]/a[@href]',
                pageElement: 'css;.news_warp_center > *',
                HT_insert: ['css;.news_warp_center', 3],
                replaceE: 'css;.pagewrap',
                scrollElement: '.pagewrap',
                scrollDelta: 400
            }
        },
        gamersky_ent: {
            SiteTypeID: 20,
            pager: {
                type: 3,
                nextLink: '//div[@class="page_css"]/a[text()="下一页"][@href]',
                pageElement: 'css;.Mid2L_con > *:not(.gs_nc_editor):not(.pagecss):not(.page_css):not(.gs_ccs_solve):not(.post_ding)',
                HT_insert: ['css;.page_css', 1],
                replaceE: 'css;.page_css',
                scrollElement: '.page_css',
                scrollDelta: 100
            }
        },
        gamersky_gl: {
            SiteTypeID: 21,
            pager: {
                type: 3,
                nextLink: '//div[@class="page_css"]/a[text()="下一页"][@href]',
                pageElement: 'css;.Mid2L_con > *:not(.gs_nc_editor):not(.pagecss):not(.gs_ccs_solve):not(.post_ding)',
                HT_insert: ['css;.gs_nc_editor', 1],
                replaceE: 'css;.page_css',
                scrollElement: '.pagecss',
                scrollDelta: -1000
            }
        },
        ali213_www: {
            SiteTypeID: 22,
            pager: {
                type: 3,
                nextLink: '//a[@id="after_this_page"][@href]',
                pageElement: 'css;#Content >*:not(.news_ding):not(.page_fenye)',
                HT_insert: ['css;.page_fenye', 1],
                replaceE: 'css;.page_fenye',
                scrollElement: '.page_fenye',
                scrollDelta: 400
            }
        },
        ali213_gl: {
            SiteTypeID: 23,
            pager: {
                type: 3,
                nextLink: '//a[@class="next n"][@href]',
                pageElement: 'css;.c-detail >*',
                HT_insert: ['css;.c-detail', 3],
                replaceE: 'css;.page_fenye',
                scrollElement: '.page_fenye',
                scrollDelta: 400
            }
        },
        _58pic: {
            SiteTypeID: 24,
            pager: {
                type: 1,
                nextLink: '//div[contains(@class,"page-box")]//a[text()="下一页"][@href]',
                pageElement: 'css;.pic-box > .qtw-card',
                HT_insert: ['css;.pic-box', 3],
                replaceE: 'css;.page-box',
                scrollDelta: 2000
            },
            function: {
                before: _58pic_beforeFunction
            }
        },
        _58pic_c: {
            SiteTypeID: 25,
            pager: {
                type: 1,
                nextLink: '//div[contains(@class,"page-box")]//a[text()="下一页"][@href]',
                pageElement: 'css;.list-box > .qtw-card',
                HT_insert: ['css;.list-box', 3],
                replaceE: 'css;.page-box',
                scrollDelta: 4000
            },
            function: {
                before: _58pic_beforeFunction
            }
        },
        rarbgprx: {
            SiteTypeID: 26,
            pager: {
                type: 1,
                nextLink: '(//a[@title="next page"])[1][@href]',
                pageElement: 'css;table.lista2t tr.lista2',
                HT_insert: ['css;table.lista2t > tbody', 3],
                replaceE: 'css;#pager_links',
                scrollDelta: 900
            }
        },
        yxssp: {
            SiteTypeID: 27,
            pager: {
                type: 1,
                nextLink: '//div[@class="page-nav td-pb-padding-side"]/a[last()][@href]',
                pageElement: 'css;.td-modules-container.td-module-number4 > div',
                HT_insert: ['css;.td-modules-container.td-module-number4', 3],
                replaceE: 'css;.page-nav.td-pb-padding-side',
                scrollDelta: 900
            }
        },
        yuankongjian: {
            SiteTypeID: 28,
            pager: {
                type: 2,
                nextLink: 'button[title="加载更多"]',
                nextText: '加载更多',
                scrollDelta: 500
            }
        },
        weibo_comment: {
            SiteTypeID: 29,
            pager: {
                type: 2,
                nextLink: 'a[action-type="click_more_comment"]',
                nextText: '查看更多c',
                scrollDelta: 1000
            }
        }
    };


    switch (location.host) {
        case "www.423down.com":
            curSite = DBSite._423down_postslist;
            break;
        case "apphot.cc":
            curSite = DBSite.apphot_postslist;
            break;
        case "iao.su":
            curSite = DBSite.iao_su_postslist;
            break;
        case "www.appinn.com":
            curSite = DBSite.appinn_postslist;
            break;
        case "www.iplaysoft.com":
            if (location.pathname.indexOf(".html") > -1 || location.pathname.indexOf("/p/") > -1) { // 文章内
                curSite = DBSite.iplaysoft_postcomments;
            } else { // 其他页面
                curSite = DBSite.iplaysoft_postslist;
            }
            break;
        case "www.weidown.com":
            if (location.pathname.indexOf("/search/") > -1) {
                curSite = DBSite.weidown_search;
            } else if (location.pathname.indexOf("/special/") > -1) {
                curSite = DBSite.weidown_special;
            } else {
                curSite = DBSite.weidown;
            }
            break;
        case "www.yxssp.com":
            curSite = DBSite.yxssp;
            break;
        case "fitgirl-repacks.site":
            curSite = DBSite.fitgirl;
            break;
        case "art.alphacoders.com":
            curSite = DBSite.art_alphacoders;
            setTimeout(art_alphacoders_beforeFunction_0, 1000);
            break;
        case "wall.alphacoders.com":
        case "avatars.alphacoders.com":
        case "mobile.alphacoders.com":
            curSite = DBSite.wall_alphacoders;
            break;
        case "pubmed.ncbi.nlm.nih.gov":
            curSite = DBSite.pubmed_postslist;
            break;
        case "movie.douban.com":
            if (location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/comments') > -1) { //               短评
                curSite = DBSite.douban_subject_comments;
            } else if (location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/reviews') > -1) { //       影评
                curSite = DBSite.douban_subject_reviews;
            }else if(location.pathname.indexOf('/subject') > -1 && location.pathname.indexOf('/episode') > -1) { //         电视剧每集评论
                curSite = DBSite.douban_subject_episode;
            }
            break;
        case "search.douban.com":
            curSite = DBSite.douban_search;
            break;
        case "www.3dmgame.com":
            curSite = DBSite._3dmgame;
            break;
        case "www.gamersky.com":
            if (location.pathname.indexOf("/ent/") > -1) {
                curSite = DBSite.gamersky_ent;
            } else {
                curSite = DBSite.gamersky_gl;
            }
            //document.lastElementChild.appendChild(document.createElement('style')).textContent = `.Comment {display: none !important;}` // 隐藏评论区
            break;
        case "www.ali213.net":
            curSite = DBSite.ali213_www;
            break;
        case "gl.ali213.net":
            curSite = DBSite.ali213_gl;
            document.lastElementChild.appendChild(document.createElement('style')).textContent = `.n_show_b {display: none !important;}` // 隐藏部分碍事元素
            break;
        case "www.58pic.com":
            if (location.pathname.indexOf("/tupian/") > -1) {
                curSite = DBSite._58pic;
            } else if (location.pathname.indexOf("/c/") > -1) {
                curSite = DBSite._58pic_c;
            }
            break;
        case "rarbgprx.org":
            curSite = DBSite.rarbgprx;
            break;
        case "pan.yuankongjian.com":
            if (location.pathname.indexOf('/d/') === -1) {
                curSite = DBSite.yuankongjian;
            }
            break;
        case "weibo.com":
            curSite = DBSite.weibo_comment;
            break;
        default: //                                                                 < Discuz! 论坛专用 >
            if (location.pathname.indexOf('.html') > -1) { //                   判断是不是静态网页（.html 结尾）
                if (location.pathname.indexOf('forum') > -1) { //               各版块帖子列表
                    curSite = DBSite.discuz_forum;
                } else if (location.pathname.indexOf('thread') > -1) { //       帖子内
                    curSite = DBSite.discuz_thread;
                    hidePgbtn(); //                                             隐藏帖子内的 [下一页] 按钮
                }else if(location.pathname.indexOf('search') > -1) { //         搜索结果
                    curSite = DBSite.discuz_search;
                }
            } else {
                if (location.search.indexOf('mod=forumdisplay') > -1) { //      各版块帖子列表
                    curSite = DBSite.discuz_forum;
                } else if (location.search.indexOf('mod=viewthread') > -1) { // 帖子内
                    curSite = DBSite.discuz_thread;
                    hidePgbtn(); //                                             隐藏帖子内的 [下一页] 按钮
                } else if (location.pathname.indexOf('search') > -1) { //       搜索结果
                    curSite = DBSite.discuz_search;
                }
            }
    }
    curSite.pageUrl = ""; // 下一页URL
    pageLoading(); // 自动无缝翻页


    // 自动无缝翻页
    function pageLoading() {
        if (curSite.SiteTypeID > 0) {
            windowScroll(function (direction, e) {
                if (direction === "down") { // 下滑才准备翻页
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                        scrollHeight = window.innerHeight || document.documentElement.clientHeight,
                        scrollDelta = curSite.pager.scrollDelta;
                    if (curSite.pager.type === 3) { // 翻页类型 3
                        let scrollElement = document.querySelector(curSite.pager.scrollElement);
                        //console.log(scrollElement.offsetTop - (scrollTop + scrollHeight), scrollDelta, curSite.SiteTypeID)
                        if (scrollElement.offsetTop - (scrollTop + scrollHeight) <= scrollDelta) {
                            if (curSite.SiteTypeID === 21) curSite.pager.scrollDelta -= 800 // 游民星空的比较奇葩，需要特殊处理下
                            ShowPager.loadMorePage();
                        }
                    } else {
                        if (document.documentElement.scrollHeight <= scrollHeight + scrollTop + scrollDelta) {
                            if (curSite.pager.type === 2) { // 翻页类型 2
                                let autopbn = document.querySelector(curSite.pager.nextLink);
                                if (autopbn) { // 如果正在加载，就不再点击
                                    if (!curSite.pager.nextText) { // 如果没有指定 nextText 就直接点击
                                        autopbn.click();
                                    } else if (autopbn.innerText.indexOf(curSite.pager.nextText) > -1){ // 如果指定了 nextText 就需要判断后再点击（避免已经在加载了，还重复点击）
                                        autopbn.click();
                                    }
                                }
                            } else {
                                ShowPager.loadMorePage();
                            }
                        }
                    }
                }
            });
        }
    }


    function getElementToPageTop(el) {
        if(el.parentElement) {
            return getElementToPageTop(el.parentElement) + el.offsetTop
        }
        return el.offsetTop
    }


    // 隐藏帖子内的 [下一页] 按钮
    function hidePgbtn() {
        let style_hidePgbtn = document.createElement('style');
        style_hidePgbtn.innerHTML = `.pgbtn {display: none;}`;
        document.head.appendChild(style_hidePgbtn);
    }


    // iplaysoft 的插入前函数
    function iplaysoft_postslist_beforeFunction(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.querySelector("img.lazyload")
            if (now && !now.getAttribute('src')) {
                now.setAttribute("src",now.getAttribute('data-src'))
                now.setAttribute("srcset",now.getAttribute('data-src'))
                now.setAttribute("class","lazyloaded")
            }
        });
        return pageElems
    }


    // iao.su 的插入前函数
    function iao_su_postslist_beforeFunction(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.getElementsByClassName("post-card")[0]
            if (now) {
                now.getElementsByClassName("blog-background")[0].style.backgroundImage = 'url("' + RegExp("(?<=loadBannerDirect\\(').*(?=', '',)").exec(now.getElementsByTagName("script")[0].innerText)[0]; + '")';
            }
        });
        return pageElems
    }


    // art_alphacoders
    function art_alphacoders_beforeFunction_0() {
        let pageElems1 = document.querySelectorAll(".container-masonry > div")
        document.querySelector(".container-masonry").style.height = "auto"
        pageElems1.forEach(function (one) {
            one.setAttribute("style","float: left");
        });
    }


    // art_alphacoders 的插入前函数
    function art_alphacoders_beforeFunction(pageElems) {
        pageElems.forEach(function (one) {
            one.setAttribute("style","float: left");
        });
        return pageElems
    }


    // iplaysoft 的插入前函数
    function _58pic_beforeFunction(pageElems) {
        let is_one = document.querySelector(".qtw-card.place-box.is-one");
        if (is_one && is_one.style.display != "none") {
            is_one.setAttribute("style", "display: none;")
        }
        pageElems.forEach(function (one) {
            let now = one.querySelector("img.lazy")
            if (now && now.getAttribute('src') === "//icon.qiantucdn.com/static/images/qtw-card/card-place.png") {
                now.setAttribute("src", now.dataset.original)
                now.setAttribute("style", "display: block;")
            }
        });
        return pageElems
    }


    // 启用/禁用 (当前网站)
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


    // 滚动条事件
    function windowScroll(fn1) {
        var beforeScrollTop = document.documentElement.scrollTop,
            fn = fn1 || function () {};
        setTimeout(function () { // 延时执行，避免刚载入到页面就触发翻页事件
            window.addEventListener("scroll", function (e) {
                var afterScrollTop = document.documentElement.scrollTop,
                    delta = afterScrollTop - beforeScrollTop;
                if (delta == 0) return false;
                fn(delta > 0 ? "down" : "up", e);
                beforeScrollTop = afterScrollTop;
            }, false);
        }, 1000)
    }


    var ShowPager = { // 修改自 https://greasyfork.org/scripts/14178
        getFullHref: function (e) {
            if(e == null) return '';
            "string" != typeof e && (e = e.getAttribute("href"));
            var t = this.getFullHref.a;
            return t || (this.getFullHref.a = t = document.createElement("a")), t.href = e, t.href;
        },
        createDocumentByString: function (e) {
            if (e) {
                if ("HTML" !== document.documentElement.nodeName) return (new DOMParser).parseFromString(e, "application/xhtml+xml");
                var t;
                try {
                    t = (new DOMParser).parseFromString(e, "text/html");
                } catch (e) {
                }
                if (t) return t;
                if (document.implementation.createHTMLDocument) t = document.implementation.createHTMLDocument("ADocument"); else try {
                    (t = document.cloneNode(!1)).appendChild(t.importNode(document.documentElement, !1)),
                        t.documentElement.appendChild(t.createElement("head")), t.documentElement.appendChild(t.createElement("body"));
                } catch (e) {
                }
                if (t) {
                    var r = document.createRange();
                    r.selectNodeContents(document.body);
                    var n = r.createContextualFragment(e);
                    t.body.appendChild(n);
                    for (var a, o = {
                        TITLE: !0,
                        META: !0,
                        LINK: !0,
                        STYLE: !0,
                        BASE: !0
                    }, i = t.body, s = i.childNodes, c = s.length - 1; c >= 0; c--) o[(a = s[c]).nodeName] && i.removeChild(a);
                    return t;
                }
            } else console.error("没有找到要转成DOM的字符串");
        },
        loadMorePage: function () {
            if (curSite.pager) {
                let curPageEle = getElementByXpath(curSite.pager.nextLink);
                var url = this.getFullHref(curPageEle);
                //console.log(`${url} ${curPageEle} ${curSite.pageUrl}`);
                if (url === '') return;
                if (curSite.pageUrl === url) return;// 避免重复加载相同的页面
                curSite.pageUrl = url;
                // 读取下一页的数据
                curSite.pager.startFilter && curSite.pager.startFilter();
                GM_xmlhttpRequest({
                    url: url,
                    method: "GET",
                    timeout: 5000,
                    onload: function (response) {
                        try {
                            //console.log(`${response.responseText}`)
                            var newBody = ShowPager.createDocumentByString(response.responseText);
                            let pageElems = getAllElements(curSite.pager.pageElement, newBody, newBody);
                            let toElement = getAllElements(curSite.pager.HT_insert[0])[0];
                            if (pageElems.length >= 0) {
                                // 如果有插入前函数就执行函数
                                if (curSite.function && curSite.function.before) {
                                    if (curSite.function.parameter) { // 如果指定了参数
                                        pageElems = curSite.function.before(curSite.function.parameter);
                                    }else{
                                        pageElems = curSite.function.before(pageElems);
                                    }
                                }
                                // 插入位置
                                let addTo;
                                switch (curSite.pager.HT_insert[1]) {
                                    case 1:
                                        addTo = "beforebegin"
                                        break;
                                    case 2:
                                        addTo = "afterbegin"
                                        break;
                                    case 3:
                                        addTo = "beforeend"
                                        break;
                                    case 4:
                                        addTo = "afterend"
                                        break;
                                }
                                // 插入新页面元素
                                pageElems.forEach(function (one) {
                                    toElement.insertAdjacentElement(addTo, one);
                                });
                                // 替换待替换元素
                                try {
                                    let oriE = getAllElements(curSite.pager.replaceE);
                                    let repE = getAllElements(curSite.pager.replaceE, newBody, newBody);
                                    if (oriE.length === repE.length) {
                                        for (var i = 0; i < oriE.length; i++) {
                                            oriE[i].outerHTML = repE[i].outerHTML;
                                        }
                                    }
                                } catch (e) {
                                    console.log(e);
                                }
                                // 如果有插入后函数就执行函数
                                if (curSite.function && curSite.function.after) {
                                    if (curSite.function.parameter) { // 如果指定了参数
                                        curSite.function.after(curSite.function.parameter);
                                    }else{
                                        curSite.function.after();
                                    }
                                }
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }
                });
            }
        },
    };


    function getElementByXpath(e, t, r) {
      r = r || document, t = t || r;
      try {
        return r.evaluate(e, t, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      } catch (t) {
        return void console.error("无效的xpath");
      }
    }


    function getAllElements(e, t, r, n, o) {
      let getAllElementsByXpath = function(e, t, r) {
        return r = r || document, t = t || r, r.evaluate(e, t, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      }

      var i, s = [];
      if (!e) return s;
      if (r = r || document, n = n || window, o = o || void 0, t = t || r, "string" == typeof e) i = 0 === e.search(/^css;/i) ? function getAllElementsByCSS(e, t) {
        return (t || document).querySelectorAll(e);
      }(e.slice(4), t) : getAllElementsByXpath(e, t, r); else {
        if (!(i = e(r, n, o))) return s;
        if (i.nodeType) return s[0] = i, s;
      }
      return function makeArray(e) {
        var t, r, n, o = [];
        if (e.pop) {
          for (t = 0, r = e.length; t < r; t++) (n = e[t]) && (n.nodeType ? o.push(n) : o = o.concat(makeArray(n)));
          return a()(o);
        }
        if (e.item) {
          for (t = e.length; t;) o[--t] = e[t];
          return o;
        }
        if (e.iterateNext) {
          for (t = e.snapshotLength; t;) o[--t] = e.snapshotItem(t);
          return o;
        }
      }(i);
    }
})();