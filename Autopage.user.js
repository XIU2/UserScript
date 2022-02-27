// ==UserScript==
// @name         自动无缝翻页
// @name:zh-CN   自动无缝翻页
// @name:zh-TW   自動無縫翻頁
// @name:en      AutoPager
// @version      4.9.9
// @author       X.I.U
// @description  无缝拼接下一页内容（瀑布流，追求小而美），目前支持：【所有「Discuz!、Flarum、phpBB、Xiuno、XenForo、NexusPHP」论坛】【百度、谷歌、必应、搜狗、微信、360、Yahoo、Yandex 等搜索引擎】、贴吧、豆瓣、知乎、微博、NGA、V2EX、B 站(Bilibili)、煎蛋网、糗事百科、龙的天空、起点中文、IT之家、千图网、Pixabay、Pixiv、3DM、游侠网、游民星空、NexusMods、Steam 创意工坊、CS.RIN.RU、BT之家、萌番组、动漫花园、樱花动漫、爱恋动漫、AGE 动漫、Nyaa、SrkBT、RARBG、SubHD、423Down、不死鸟、扩展迷、小众软件、【动漫狂、漫画猫、漫画屋、漫画 DB、动漫之家、拷贝漫画、包子漫画、Mangabz、Xmanhua 等漫画网站】、PubMed、Z-Library、GreasyFork、Github、StackOverflow（以上仅一小部分，更多的写不下了...
// @description:zh-TW  無縫拼接下一頁內容（瀑布流，追求小而美），支持各種論壇、搜索引擎、漫畫網站~
// @description:en  Seamlessly stitch next page content (waterfall)~
// @match        *://*/*
// @connect      userscript.xiu2.xyz
// @connect      www.ykmh.com
// @connect      www.xuexiniu.com
// @connect      bbs.xuexiniu.com
// @connect      www.tujigu.net
// @connect      weili.ooopic.com
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAALfElEQVRYhX2Xe3Bd1XXGf3vvc859X+nq6nUlW5Yly7JlI2xsYzAwtnk4ATpAxkNTHm0mnaTT/gHTTvrIBDLTpp1JUoZppqHQls5AKTR2INOWJJQSXF4x2BhsJCRZ8kuWZckPSVf3/Trn7N3RVTFpQrNn1l97n7O/vda31reWMKMPcmUJA9U8vrwHGdqCHn4HPzePaIxhVSoYbYRXrn7BeMVbCUduF6kVUXHwvQP+6amDaqDnoIompmQytaBnTmB8H5lowrjgFss48SBeI/hUEEZeudLi1ywhJEIJdL6Q8rzal/1a5SGC4XZrYBvWwEZobMdLdH6RH+z/Io1taEeh52fe8tOZbysl/ouWFvANYP7fSz4DgAEBBIL4xiS8ubmnVcTZK68aRK29Dtm8dgnZJydRW+/E2nrnp19nz+7U77+60zt0qMz07J/KxuQTwrIw4rMBCDP6wC+FIIcO34eudDdXf/7jD52Opi772lugY3AZr++hp06gz48j+waRqTWYmVHcS+chEMFeuw1hBzBzY7g/fQE9fmqBYPzBQKrpVa/R4OkCAnXlSvXnX9sIllk220BE4Z8OdHoj54YCK6Od1i2/iUmuRyDRk6NUn3+M0pv/hnf0AE40jEjEqP3oe6Rf/CGOWUTNjFKby2MP7EBtugURFWFxfOhB4+o4yfhrGAdZsxHaqZt6dNce9KXYFSPfGWS68JFqTXSqO7+MCaTqETGTwxSeeoRCOoPT2YUIhFC2jbQF/uwUatU6rPbVUM5T+OfHUO3dWKv6kSsGUIOD6PEPr+fswnanpecFZYVQhFAyjPS9Tj4xw2rcU+pJApEutWsvRjaBW8NUShilkE1JIqlUPfi6VMLNFTBVr+7KYKqJ8uEjlM+dJrR5K0L7eB+9hTd2CFrWYt33h0jH3O5Nj37TBGtgZUBkUN/6q4dQ7UmsnlW450//gU5PPRq460uQXAu+j//i99A/+UdUMoXqbMNkz2OnUkixlF4u9spe/HMTULyEaA7jXkoT2fEbQIXi838DJ4cRDXHkEjc2b0MPHdptZubGpBUbM0UfKQpBRDmKWRSD3tTMk87gddA2WGe4+dkzMD0CyQ5qP/4XVDCAvfkaLMvHamzEClpQzGDF46iuJOH1CaKr2tDZRfzhQ0Ru24NYsYrCM4/jDb+FiHdi3XU/0s3vr7WsGKxcfyPSy+bxi0UqJ8f/IriiE2vrnuWsLefQk8NoO4AMBBB9/XjDI6hQCjdTxq9WCaQ6ULaDFrIeKr3oIlv70Olz2K1xlAVaSUQojD786nKi9e5A3LBHMHn0W+LUUaS1FI9q+iZZWLhHdq/FxFbWSSfsIDIQwVw4g/GK2OuuhloNMzaCaF+DNBJtQfX8LFYigElX0OkQtZKHVy3jqwDlqWncCzPI3nU4t+2FWrH+OLHzHpRl3109memTOhqDi9NfkefHEKvWLTO+VKD68Qf4G27CueFWhJ/Df+0lVFcXJOJYnobm1ZjsJUxuFjyDjK/GNK2gND4ESuDPXcCOSaI7thPqX0ft8OtUn/oTKOQgkET39KJU4RbpZXOtNRW717p+FyRSdYT+v36H4u/fQXbfc3iRDkT3FsTGjWAWEU0OZKfAU9CyEdXVD2lQPduplmo4jkBEbMzK1VgDu5EVTe3gm1RHx6Bcxpz6YLkEO0lMYeFGi6z7eVMqhkT/ZrCb0LNT+NMTRH/nt/BLRdy3X8Nv68Lu6cZEHURjE6K3hirYeLRhDWyA4jxzH40RXJwkeuM29MpN+JcziEsz+Avz6GgcW1pYbUlEQCyHwYpSyxS7rGo+v8man4ZMATrAHf+QSt7FTkWR4QbsjlbIX8IMH0VuuAqj4piGAbhmEPPzI/injnNxMUPuwOtseOIxKKTJ7/8BTBxDdXcjO9sJdTeg01VqH4wg3CDB9bshHMKORbGolVOmeRW09dVdUxkbp3ruNM7GXnS1hK5OYSoSbBDZBcxCBtF3DcUzk6hkhGA0RmtHKx1rOkE04lbzWC1tqMRt1CZHUafPIs8H6/JsNTcgN+9YFq1qgbBUFUvnK9qrVghXCvWN8MBmivueJDtylqaeBKWJaXR4JZEtNyBWrkGt6AJboCZO4J49Rc64xGIhcgtZgm6egKhgtUQQto17WeHOLqCNj5Vowbr7q4j+Lcs1JhhEphcXLTebd0jPwpkx6Lwa++bbCR95ALecp5a6BrvrJoLdHajmMOTnKb3+BrVMntjARpzeFbz8jcfpa22gGm+kMJlm95Zu9M9+iI5G0G3d6EgIUSnjzs/gv/Icgd6rqcvz0IeYWnXc8pEtYnEe8gtXNL7xz74LehHSE3DqNP7EIdx3p5DSh7JNJePiBE/gN3Uz8NWHae5sRJYXqKQvU+raQPg7L6L3/QNMHcfp6EREGjC5LDp9GaOs5VQ/NQI93YctOxFPlwniDh/C3n47JHvrQPTBl3DHjiIDQUQ4jGhOYcqaQFuE0Nl53OnLRHfsZV33KsTxd6GlHeaP477zMl5uAWv7dkyLg6kZREsb+vgCcvPOuoaYuWNQWERs3jAuQ6nooXK6TH566cXnrjQK7uwFaoseWA3oJf2WEhEJUjm/gMgXCfdvQlFFv/R3uCND6FIRv7MfMnOIiaPoI/8NEb2kWAhfoLbdjLr2jmUv/8f+pVbkHRGNnZHum2/udxxtCn4j/vgEIjNTD4O9upfIprUYoxBKo9Z14jumTq7YYD9WayvuR++hs1lkshmha4iuNeDYiIAFMoCevIi+cJHaa29gmvsRTUn0R29g9u1D7bxxv+jrRnpD56cCkdjfV9NzpA+8A5VlLojWAczlGVTAYKXimIU8MlsjtKEXgiF0aRGdm8cEYnXm+O+/gdAGuWsP3shhTHoOEYqCCEF2DsrF5f+e/xiikUldrT6l3z+GevSaTahaZdRY6uFqxRXR1sRyzU/21Gu6OTOMfzmPd6kI8TgiX8B4imouj1QCKmVUNITJ59AnR1F77kH4ZaRnQFroMyeRW3egdt6DwIX391Gshv+4LK2jtcuLqK9t7ALjZXzH1uVM/mb/7BTRnjZEex+idQ2EAnjjR/BdF1PIoV2Bae/F/fh9dL5IYE0XUmpMNo+ev4AINSJWb0UPHa63Z7SvRN3/CHJpFHj2G4iZzAuBbTu+GWpIEGxrQ/3RnlvxG5M4kYa3Lc2u4uyFblnIE+xfAbF2RMtqZGsn/uTYUgHH+dz9eFMnqYx8gO+CEwkjhcDPF/DLHurSaeTm3RiWMsDHeuDrSFvBv3+bi08+N1Vwuj/vZWtu+dwclZlFrESoeZmZysJXoTsCjnVk8dDQBuN+n8RDD9fbcdG7leBX1iOkQjhBOHmQfKGAHW3CS6fR+QClmYuYMyPY265DtPVgtfctiw4V/GcfYfGNQzj3/u4DqlormUoZEQwuc0I//eSnY4G0wPJjmdGhw+mh0fWxNZ0037cXccPd1MXgk+GjNE/tR3+Le+YEyg5TnT6LXlwgcu1u7C99HZlsv3K2+vjvkTs2RvDe3747tm7Dy1SKvzSYPP/MLwxFAkIKEzEye2zswOXX395lJyK0fOFzRHfuglQfqPin59Nn0RNDuJk09vprkd0brmx5H7xCbfgQbrZ83OkfvN1pj0+ZmkBYNhjzCwCeffr/AsBDJyU6kqBwbPzRuTcP/GXV82lYlaJpfQ+BjVdhXX0tNKTAjvzKqKXPTeC++1NKY0c9kVz1SGzb9X8tjIdfzSFCDfUw/noA0scPuxBrwcvmmH3rQIvMm3/y0XdJS4JfIpiIUG9g+wcg6KDnZpGZNDQ0Ii5cSAtlPRHYct13axWvJNwadiiAli4iEP8VAJ89HQtR129TLiG1nos0Nt8dSOi12qi9lRq3utVqT/lirql24hW3vLBQi3d3XUqu73+PZOonBNR/WnbYSMeGTO5/Xf6ZtwDwPwtFRezQVs+sAAAAAElFTkSuQmCC
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        window.onurlchange
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
        ['menu_thread', '帖子内自动翻页 (社区类网站)', '帖子内自动翻页 (社区类网站)', true],
        ['menu_page_number', '显示当前页码及点击暂停翻页', '显示当前页码及点击暂停翻页', true],
        ['menu_pause_page', '左键双击网页空白处暂停翻页', '左键双击网页空白处暂停翻页', false],
        ['menu_rules', '更新外置翻页规则', '更新外置翻页规则', {}],
        ['menu_customRules', '自定义翻页规则', '自定义翻页规则', {}]
    ], menuId = [], webType = 0, curSite = {SiteTypeID: 0}, DBSite, SiteType, pausePage = true, pageNum = {now: 1, _now: 1}, locationC = false, nowLocation = '', lp = location.pathname;
    window.autoPage = {src_bF: src_bF, xs_bF: xs_bF}

    for (let i=0;i<menuAll.length;i++){ // 如果读取到的值为 null 就写入默认值
        if (GM_getValue(menuAll[i][0]) == null){GM_setValue(menuAll[i][0], menuAll[i][3])};
    }
    getRulesUrl();
    registerMenuCommand();
    if (menuId.length < 4) {return}
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
                } else { // 不在禁用列表中
                    webType = doesItSupport(); // 判断网站类型（即是否支持），顺便直接赋值
                    if (webType === 0) {
                        menuId[0] = GM_registerMenuCommand('❌ 当前网站暂不支持 [点击申请支持]', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});});
                        menuId[1] = GM_registerMenuCommand('🔄 更新外置翻页规则', function(){getRulesUrl(true)});
                        menuId[2] = GM_registerMenuCommand('#️⃣ 自定义翻页规则', function(){customRules()});
                        console.info('[自动无缝翻页] - 不支持当前网站 [ ' + location.href + ' ]，欢迎申请支持: https://github.com/XIU2/UserScript / https://greasyfork.org/zh-CN/scripts/96880/feedback');
                        return
                    } else if (webType === -1) {
                        return
                    }
                    menuId[i] = GM_registerMenuCommand(`${menuAll[i][1]}`, function(){menu_disable('add')});
                }

            } else if (menuAll[i][0] === 'menu_rules') {
                menuId[i] = GM_registerMenuCommand(`🔄 ${menuAll[i][1]}`, function(){reGetRulesUrl()});

            } else if (menuAll[i][0] === 'menu_customRules') {
                menuId[i] = GM_registerMenuCommand(`#️⃣ ${menuAll[i][1]}`, function(){customRules()});

            } else {
                menuId[i] = GM_registerMenuCommand(`${menuAll[i][3]?'✅':'❌'} ${menuAll[i][1]}`, function(){menu_switch(menuAll[i][3], menuAll[i][0], menuAll[i][2])});
            }
        }
        menuId[menuId.length] = GM_registerMenuCommand('💬 反馈失效 / 欢迎申请支持', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});});
    }


    // --------------------------------------------------------


    // 判断是支持
    function doesItSupport() {
        setDBSite(); // 配置 DBSite 变量对象

        // 遍历判断是否是某个已支持的网站，顺便直接赋值
        let support = false;
        end:
        for (let now in DBSite) { // 遍历 对象
            if (!DBSite[now].host) continue; // 如果不存在则继续下一个循环
            //console.log(DBSite[now].host)
            // 如果是 数组
            if (Array.isArray(DBSite[now].host)) {

                for (let i of DBSite[now].host) { // 遍历 数组
                    // 针对自定义翻页规则中的正则
                    if (typeof i === 'string' && i.slice(0,1) === '/') i = new RegExp(i.slice(1,i.length-1))
                    if ((i instanceof RegExp && i.test(location.hostname)) || (typeof i === 'string' && i === location.hostname)) {

                        if (self != top) {if (!DBSite[now].iframe) break end;} // 如果当前位于 iframe 框架下，就需要判断是否需要继续执行
                        if (DBSite[now].url) {
                            if (typeof DBSite[now].url == 'function') {
                                DBSite[now].url();
                            } else { // 自定义翻页规则时，因为同域名不同页面 url 分开写，所以如果没找到就需要跳出当前数组循环，继续规则循环
                                if (DBSite[now].url.slice(0,1) === '/') { // 如果是正则，则对 URL 路径进行匹配
                                    if (new RegExp(DBSite[now].url.slice(1,DBSite[now].url.length-1)).test(location.pathname + location.search) === true) {curSite = DBSite[now];} else {break;}
                                } else { // 如果是函数，那就执行代码
                                    if (new Function (DBSite[now].url)() === true) {curSite = DBSite[now];} else {break;}
                                }
                            }
                        } else {
                            curSite = DBSite[now];
                        }
                        support = true; break end; // 如果找到了就退出所有循环
                    }
                }

                // 如果是 正则/字符串
            } else {
                // 针对自定义翻页规则中的正则
                if (typeof DBSite[now].host === 'string' && DBSite[now].host.slice(0,1) === '/') DBSite[now].host = new RegExp(DBSite[now].host.slice(1,DBSite[now].host.length-1))
                if ((DBSite[now].host instanceof RegExp && DBSite[now].host.test(location.hostname)) || (typeof DBSite[now].host === 'string' && DBSite[now].host === location.hostname)) {

                    if (self != top) {if (!DBSite[now].iframe) break;} // 如果当前位于 iframe 框架下，就需要判断是否需要继续执行
                    if (DBSite[now].url) {
                        if (typeof DBSite[now].url == 'function') {
                            DBSite[now].url();
                        } else { // 自定义翻页规则时，因为同域名不同页面 url 分开写，所以如果没找到就需要继续规则循环
                            if (DBSite[now].url.slice(0,1) === '/') { // 如果是正则，则对 URL 路径进行匹配
                                if (new RegExp(DBSite[now].url.slice(1,DBSite[now].url.length-1)).test(location.pathname + location.search) === true) {curSite = DBSite[now];} else {continue;}
                            } else { // 如果是函数，那就执行代码
                                if (new Function (DBSite[now].url)() === true) {curSite = DBSite[now];} else {continue;}
                            }
                        }
                    } else {
                        curSite = DBSite[now];
                    }
                    support = true; break; // 如果找到了就退出循环
                }
            }
        }

        if (support) {
            console.info('[自动无缝翻页] - 独立规则 网站'); return 1;
        } else if (self != top) {
            return -1;
        } else if (typeof discuz_uid != 'undefined' || getCSS('meta[name="author" i][content*="Discuz!" i], meta[name="generator" i][content*="Discuz!" i], body[id="nv_forum" i][class^="pg_" i][onkeydown*="27"], body[id="nv_search" i][onkeydown*="27"]') || (getCSS('a[href*="www.discuz.net" i]') && getCSS('a[href*="www.discuz.net" i]').textContent.indexOf('Discuz!') > -1) || (getCSS('#ft') && getCSS('#ft').textContent.indexOf('Discuz!') > -1)) {
            console.info('[自动无缝翻页] - <Discuz!> 论坛'); return 2;
        } else if (getCSS('#flarum-loading')) {
            console.info('[自动无缝翻页] - <Flarum> 论坛'); return 3;
        } else if (getCSS('body#phpbb')) {
            console.info('[自动无缝翻页] - <phpBB> 论坛'); return 4;
        } else if (getXpath('//footer//a[contains(string(), "Xiuno")] | //link[contains(@href, "xiuno")] | //script[contains(@src, "xiuno")]')) {
            console.info('[自动无缝翻页] - <Xiuno> 论坛'); return 5;
        } else if (typeof XF != 'undefined') {
            console.info('[自动无缝翻页] - <XenForo> 论坛'); return 6;
        } else if (getCSS('head meta[name="generator" i][content="nexusphp" i]') || getXpath('id("footer")[contains(string(), "NexusPHP")]')) {
            console.info('[自动无缝翻页] - <NexusPHP> 论坛'); return 7;
        } else if (getCSS('link[href*="themes/dux" i], script[src*="themes/dux" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress <DUX> 主题的网站'); return 100;
        } else if (getCSS('link[href*="themes/xiu" i], script[src*="themes/xiu" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress <XIU> 主题的网站'); return 101;
        } else if (getCSS('link[href*="themes/d8" i], script[src*="themes/d8" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress <D8> 主题的网站'); return 102;
        } else if (getCSS('link[href*="themes/begin" i], script[src*="themes/begin" i], img[src*="themes/begin" i]')) {
            console.info('[自动无缝翻页] - 使用 WordPress <Begin> 主题的网站'); return 103;
        } else if (getCSS('link[href*="/wp-content/" i], script[src*="/wp-content/" i]')) {
            if (getCSS('article.post') && getCSS('nav.navigation')) {
                if (getCSS('.nav-previous a')) {
                    console.info('[自动无缝翻页] - 使用 WordPress <nav-previous 旧文章式> 主题的网站'); return 104;
                } else if (getXpath('//nav[contains(@class, "navigation")]//a[contains(text(), "下一页") or contains(text(), ">")]')) {
                    console.info('[自动无缝翻页] - 使用 WordPress <nav-navigation> 下一页式> 主题的网站'); return 105;
                }
            }
        } else if ((getCSS('meta[name="description" i][content*="小说"], meta[name="description" i][content*="章节"], meta[name="description" i][content*="阅读"]') || location.hostname.indexOf('biqu') > -1 || document.title.indexOf('笔趣阁') > -1) && getCSS('#content, .content, #chaptercontent, .chaptercontent, #BookText') && getXpath('//a[contains(text(), "下一章") or contains(text(), "下一页")]')) {
            console.info('[自动无缝翻页] - <笔趣阁> 模板的小说网站'); return 200;
        }
        return 0;
    }
    // 判断网站类型
    function webTypeIf() {
        if (webType != 1) {
            switch (webType) {
                case 2: //   < 所有 Discuz!论坛 >
                    discuz_(); break;
                case 3: //   < 所有 Flarum 论坛 >
                    DBSite.flarum.url(); break;
                case 4: //   < 所有 phpBB 论坛 >
                    DBSite.phpbb.url(); break;
                case 5: //   < 所有 Xiuno 论坛 >
                    DBSite.xiuno.url(); break;
                case 6: //   < 所有 XenForo 论坛 >
                    DBSite.xenforo.url(); break;
                case 7: //   < 所有 NexusPHP 论坛 >
                    DBSite.nexusphp.url(); break;
                case 100: // < 所有使用 WordPress DUX 主题的网站 >
                    DBSite.dux.url(); if (location.hostname === 'apphot.cc') {curSite.pager.scrollD = 2500;}; break;
                case 101: // < 所有使用 WordPress XIU 主题的网站 >
                    DBSite.dux.url(); curSite.function = {bF: src_bF, bFp: [0, 'img.thumb[data-original]', 'data-original']}; break;
                case 102: // < 所有使用 WordPress D8 主题的网站 >
                    DBSite.dux.url(); delete curSite.function; break;
                case 103: // < 所有使用 WordPress Begin 主题的网站 >
                    DBSite.begin.url(); break;
                case 104: // < 所有使用 WordPress nav-previous 旧文章式 主题的网站 >
                    DBSite.wp_nav_navigation.url(); break;
                case 105: // < 所有使用 WordPress nav-navigation 下一页式 主题的网站 >
                    DBSite.wp_nav_navigation.url('//nav[contains(@class, "navigation")]//a[contains(text(), "下一页") or contains(text(), ">")]'); break;
                case 200: // < 所有使用 笔趣阁 模板的小说网站 >
                    DBSite.biquge.url(); break;
            }
        }
    }
    // 网站规则
    function setDBSite() {
        /*
    url:         匹配到该域名后要执行的函数/正则（一般用于根据 URL 分配相应翻页规则）
    locationC:   对于使用 pjax 技术的网站，需要监听 URL 变化来重新判断翻页规则（需要放在 url 中）

    hiddenPN:    不显示脚本左下角的页码
    history:     添加历史记录 并 修改当前 URL（默认开启，对于不支持的网站要设置为 false）
    style:       要插入网页的 CSS Style 样式
    retry:       允许获取失败后重试

pager: {
    type:     翻页模式
       1 = 由脚本实现自动无缝翻页，可省略（适用于：静态加载内容网站，常规模式）

       2 = 只需要点击下一页按钮（适用于：网站自带了 自动无缝翻页 功能）
           nextText:    按钮文本，当按钮文本 = 该文本时，才会点击按钮加载下一页（避免一瞬间加载太多次下一页，下同）
           nextTextOf:  按钮文本的一部分，当按钮文本包含该文本时，才会点击按钮加载下一页
           nextHTML:    按钮内元素，当按钮内元素 = 该元素内容时，才会点击按钮加载下一页
           interval:    点击间隔时间，对于没有按钮文字变化的按钮，可以手动指定间隔时间（单位 ms，默认 300，当指定上面三个时，会忽略 interval）
           isHidden:    只有下一页按钮可见时（没有被隐藏），才会点击

       3 = 依靠 [基准元素] 与 [浏览器可视区域底部] 之间的距离缩小来触发翻页（适用于：主体元素下方内容太多 且 高度不固定时）
           scrollE:     作为基准线的元素（一般为底部页码元素）
           scrollD:     基准元素 - 可视区域底部

       4 = 动态加载类网站（适用于：简单的动态加载内容网站）
           insertE:     用来插入元素的函数

       5 = 插入 iframe 方式来加载下一页，无限套娃（适用于：部分动态加载内容的网站，需要允许 iframe 且支持通过 GET/POST 直接打开下一页）
           style:       加载 iframe 前要插入的 CSS Style 样式（比如为了悬浮的样式与下一页的重叠，隐藏网页底部间距提高阅读连续性）
           iframe:      这个必须加到 pager{} 外面（这样才会在该域名的 iframe 框架下运行脚本）
           forceTarget: 强制新标签页打开链接（适用于一些使用 pjax 技术的链接）

       6 = 通过 iframe 获取下一页动态加载内容插入本页，只有一个娃（适用于：部分动态加载内容的网站，与上面不同的是，该模式适合简单的网页，没有复杂事件什么的）
           loadTime:    预留的网页加载时间，确保网页内容加载完成
           forceTarget: 强制新标签页打开链接

    nextL:    下一页链接所在元素
    pageE:    要从下一页获取的元素
    insertP:  下一页元素插入本页的位置（数组第一个是基准元素，第二个是基准元素的前后具体位置）
       1 = 插入基准元素自身的前面
       2 = 插入基准元素内，第一个子元素前面
       3 = 插入基准元素内，最后一个子元素后面
       4 = 插入基准元素自身的后面
       5 = 插入 pageE 列表最后一个元素的后面（该 insertP 可以直接省略不写，等同于 ['pageE', 5] ）
       6 = 插入该元素自身内部末尾（针对小说网站等文本类的），附带参数 insertP6Br: true, 用来中间插入换行
    // 小技巧：当基准元素是下一页主体元素的父元素时（或者说要将下一页元素插入到本页同元素最后一个后面时）是可以省略不写 insertP
         例如：当 pageE: 'ul>li' 且 insertP: ['ul', 3] 时，实际等同于 ['ul>li', 5]
               当 pageE: '.item' 且 insertP: ['.item', 4] 时，实际等同于 ['.item', 5]
               当 pageE: '.item' 且 insertP: ['.page', 1] 时，实际等同于 ['.item', 5]
         注意：如 pageE 中选择了多类元素，则不能省略 insertP（比如包含 `,` 与 `|` 符号）

    replaceE: 要替换为下一页内容的元素（比如页码）
    scrollD： 翻页动作触发点（[滚动条] 与 [网页底部] 之间的距离），数值越大，越早开始翻页，一般是访问网页速度越慢，该值就需要越大

    scriptT:  单独插入 <script> 标签
       0 = 下一页的所有 <script> 标签
       1 = 下一页的所有 <script> 标签（不包括 src 链接）
       2 = 下一页主体元素 (pageE) 的同级 <script> 标签
       3 = 下一页主体元素 (pageE) 的子元素 <script> 标签

    interval:   翻页后间隔时间（单位 ms）
    forceHTTPS: 下一页链接强制 HTTPS
},
function: {
       bF = 插入前执行函数
       bFp = 参数
       aF = 插入后执行函数
       aFp = 参数
}
    */ //<<< 规则简单说明 >>>
        DBSite = {
            discuz_forum: {
                pager: {
                    type: 2,
                    nextL: '#autopbn',
                    nextTextOf: '下一页',
                    scrollD: 1500
                }
            }, //       Discuz! 论坛 - 帖子列表（自带无缝加载下一页按钮的）
            discuz_guide: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: 'id("threadlist")//table[./tbody[contains(@id, "normalthread_")]]/tbody[not(@id="separatorline")]',
                    replaceE: '.pg, .pages',
                    scrollD: 1500
                }
            }, //       Discuz! 论坛 - 导读页 及 帖子列表（不带无缝加载下一页按钮的）
            discuz_waterfall: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: '#waterfall > li',
                    replaceE: '.pg, .pages',
                    scrollD: 1500
                }
            }, //   Discuz! 论坛 - 图片模式的帖子列表（不带无缝加载下一页按钮的）
            discuz_thread: {
                style: '.pgbtn {display: none;}',
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: '#postlist > div[id^="post_"]',
                    replaceE: '//div[contains(@class,"pg") or contains(@class,"pages")][./a[contains(@class,"nxt") or contains(@class,"next") or contains(@class,"prev")][not(contains(@href,"javascript") or contains(@href,"commentmore"))]]',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[file]', 'file']
                }
            }, //      Discuz! 论坛 - 帖子内
            discuz_search: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: '#threadlist > ul',
                    replaceE: '.pg, .pages',
                    scrollD: 1500
                }
            }, //      Discuz! 论坛 - 搜索页
            discuz_youspace: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: 'form:not([action^="search.php?"]) tbody > tr:not(.th)',
                    replaceE: '.pg, .pages',
                    scrollD: 1500
                }
            }, //    Discuz! 论坛 - 回复页、主题页（别人的）
            discuz_collection: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: '#ct .bm_c table > tbody',
                    replaceE: '.pg, .pages',
                    scrollD: 1500
                }
            }, //  Discuz! 论坛 - 淘帖页
            discuz_m: {
                pager: {
                    nextL: '//a[@class="nxt" or @class="next"] | //div[@class="page"]/a[text()="下一页" or contains(text(), ">")]',
                    replaceE: '.pg, .page',
                    scrollD: 1000
                }
            }, //           Discuz! 论坛 - 触屏手机版
            discuz_m_forum: {
                pager: {
                    type: 2,
                    nextL: 'a.loadmore',
                    interval: 500,
                    scrollD: 1000
                }
            }, //     Discuz! 论坛 - 触屏手机版 - 帖子列表（自带无缝加载下一页按钮的）
            flarum: {
                url: ()=> {locationC = true;if (!indexOF('/d/')) {curSite = DBSite.flarum;}},
                pager: {
                    type: 2,
                    nextL: '.DiscussionList-loadMore > button',
                    isHidden: true,
                    scrollD: 1500
                }
            }, //             Flarum 论坛
            phpbb: {
                url: ()=> {if (indexOF('/viewforum.php')) {
                    curSite = DBSite.phpbb;
                } else if (indexOF('/viewtopic.php') && GM_getValue('menu_thread')) {
                    curSite = DBSite.phpbb_post;
                } else if (indexOF('/search.php')) {
                    curSite = DBSite.phpbb_search;
                }},
                pager: {
                    nextL: '.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: '.forumbg:not(.announcement) ul.topiclist.topics > li',
                    replaceE: '.action-bar .pagination, .topic-actions .pagination',
                    scrollD: 2000
                }
            }, //              phpBB 论坛 - 帖子列表
            phpbb_post: {
                pager: {
                    nextL: '.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: 'div.post[id], div.post[id]+hr',
                    replaceE: '.action-bar .pagination, .topic-actions .pagination',
                    scrollD: 2000
                }
            }, //         phpBB 论坛 - 帖子内
            phpbb_search: {
                pager: {
                    nextL: '.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: 'div.search.post',
                    replaceE: '.action-bar .pagination, .pagination',
                    scrollD: 2000
                }
            }, //       phpBB 论坛 - 搜索页
            xenforo: {
                url: ()=> {if (indexOF(/\/(forums|f)\//)) {
                    curSite = DBSite.xenforo;
                } else if (indexOF(/\/(threads|t)\//) && GM_getValue('menu_thread')) {
                    curSite = DBSite.xenforo_post;
                } else if (indexOF('/search/')) {
                    curSite = DBSite.xenforo_search;
                }},
                pager: {
                    nextL: 'a.pageNav-jump--next',
                    pageE: '.structItemContainer-group.js-threadList > div',
                    replaceE: 'nav.pageNavWrapper',
                    scrollD: 2500
                }
            }, //            XenForo 论坛 - 帖子列表
            xenforo_post: {
                pager: {
                    nextL: 'a.pageNav-jump--next',
                    pageE: '.block-body.js-replyNewMessageContainer > article',
                    replaceE: 'nav.pageNavWrapper',
                    scrollD: 2500
                }
            }, //       XenForo 论坛 - 帖子内
            xenforo_search: {
                pager: {
                    nextL: 'a.pageNav-jump--next',
                    pageE: 'ol.block-body > li',
                    replaceE: 'nav.pageNavWrapper',
                    scrollD: 2500
                }
            }, //     XenForo 论坛 - 搜索页
            xiuno: {
                url: ()=> {if (lp == '/' || indexOF(/\/(index|forum)/)) {curSite = DBSite.xiuno;} else if (indexOF('/thread') && GM_getValue('menu_thread')) {curSite = DBSite.xiuno_post;}},
                pager: {
                    nextL: '//li[@class="page-item"]/a[text()="▶"]',
                    pageE: 'ul.threadlist > li',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //              Xiuno 论坛 - 帖子列表
            xiuno_post: {
                pager: {
                    nextL: '//li[@class="page-item"]/a[text()="▶"]',
                    pageE: 'li.post[data-pid]:not(.newpost)',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //         Xiuno 论坛 - 帖子内
            nexusphp: {
                url: ()=> {
                    if (lp == '/torrents.php' || getCSS('table.torrents')) {
                        curSite = DBSite.nexusphp;
                    } else if (lp == '/subtitles.php') {
                        curSite = DBSite.nexusphp;
                        curSite.pager.pageE = '#outer > table.main~table > tbody > tr:not(:first-of-type)'
                    } else if (lp == '/forums.php' && indexOF('action=viewforum', 's')) {
                        curSite = DBSite.nexusphp;
                        curSite.pager.pageE = '#outer > table.main+table > tbody > tr:not(:first-of-type):not(:last-of-type)'
                    } else if (lp == '/forums.php' && indexOF('action=viewtopic', 's') && GM_getValue('menu_thread')) {
                        curSite = DBSite.nexusphp;
                        curSite.pager.pageE = 'td.text > div, td.text > div+table.main'
                    }},
                pager: {
                    nextL: '//a[./b[contains(text(), "下一页") or contains(text(), ">>")]]',
                    pageE: 'table.torrents > tbody > tr:not(:first-of-type)',
                    replaceE: '//p[@align][./font[@class="gray"]]',
                    scrollD: 1500
                }
            }, //           NexusPHP 论坛
            dux: {
                host: 'www.puresys.net',
                url: ()=> {if (!indexOF('.html')) curSite = DBSite.dux;},
                pager: {
                    nextL: 'li.next-page > a',
                    pageE: '.content > article',
                    replaceE: '.content > .pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img.thumb[data-src]', 'data-src']
                }
            }, //                WordPress 的 DUX、XIU、D8 主题
            begin: {
                url: ()=> {if (location.search.slice(0,3) === '?s=') {curSite = DBSite.begin_search;} else if (!indexOF('.html')) {curSite = DBSite.begin;}},
                pager: {
                    type: 2,
                    nextL: 'div[id^="ias_trigger_"]',
                    interval: 500,
                    scrollD: 1500
                }
            }, //              WordPress 的 Begin 主题
            begin_search: {
                pager: {
                    nextL: 'a.next',
                    pageE: '#main > ul > li',
                    replaceE: 'nav.pagination',
                    scrollD: 1500
                }
            }, //       WordPress 的 Begin 主题 - 搜索页
            wp_nav_navigation: {
                url: function(nextL = '.nav-previous a') {if (!indexOF('/post/') && !getCSS('#comments, .comments-area, #disqus_thread')) {curSite = DBSite.wp_nav_navigation; curSite.pager.nextL = nextL;}},
                pager: {
                    nextL: '.nav-previous a',
                    pageE: 'article.post',
                    replaceE: 'nav.navigation',
                    scrollD: 1500
                }
            }, //  Wordpress 的 nav.navigation 规则
            biquge: {
                url: ()=> {if (indexOF(/\d+\/\d+\.html/)) {curSite = DBSite.biquge;}},
                style: 'img, .posterror {display: none !important;}',
                pager: {
                    nextL: '//a[contains(text(), "下一章") or contains(text(), "下一页")]',
                    pageE: '#content, .content, #chaptercontent, .chaptercontent, #BookText',
                    insertP: ['#content, .content, #chaptercontent, .chaptercontent, #BookText', 6],
                    insertP6Br: true,
                    replaceE: '//*[./a[contains(text(), "下一章") or contains(text(), "下一页")]]',
                    scrollD: 1500
                }
            }, //             笔趣阁 模板的小说网站
            baidu: {
                host: 'www.baidu.com',
                url: ()=> {locationC = true; if (lp == '/s') {curSite = DBSite.baidu;} else if (location.pathname.slice(location.pathname.length - 2,location.pathname.length) == '/s' || isMobile()) {location.hostname = 'm.baidu.com';}},
                style: '.new-pmd .c-img-border {position: initial !important;} .op-bk-polysemy-video__wrap.c-gap-bottom {display: none !important;}',
                pager: {
                    nextL: 'id("page")//a[contains(text(),"下一页")]',
                    pageE: '#content_left > *',
                    replaceE: '#page',
                    scrollD: 2000
                }
            }, //                  百度 搜索
            baidu_m: {
                host: 'm.baidu.com',
                url: ()=> {if (location.pathname.slice(location.pathname.length - 2,location.pathname.length) == '/s') curSite = DBSite.baidu_m;},
                style: 'div.result[tpl="recommend_list"], #page-copyright {display: none !important;}',
                pager: {
                    nextL: 'a[class^="new-nextpage"]',
                    pageE: '#results > *',
                    replaceE: '#page-controller',
                    scrollD: 2000
                }
            }, //                百度 搜索 - 手机版
            google: {
                host: /^www\.google\./,
                url: ()=> {if (lp == '/search' && !indexOF('tbm=isch', 's')) {
                    if (indexOF('sclient=mobile', 's') || isMobile()) {
                        curSite = DBSite.google_m;
                    } else {
                        curSite = DBSite.google;
                    }
                } else if (lp == '/scholar') {
                    curSite = DBSite.google_scholar;
                }},
                pager: {
                    nextL: '#pnnext',
                    pageE: 'id("search")/* | //style[not(contains(text(), "table,div,span,p{display:none}"))]',
                    insertP: ['#search', 3],
                    replaceE: 'id("navcnt") | id("rcnt")//div[@role="navigation"]',
                    scriptT: 0,
                    scrollD: 3000
                },
                function: {
                    bF: google_bF
                }
            }, //                 谷歌 搜索
            google_m: {
                pager: {
                    type: 2,
                    nextL: 'a[aria-label="查看更多"], a[aria-label="See more" i]',
                    isHidden: true,
                    scrollD: 1000
                }
            }, //               谷歌 搜索 - 手机版
            bing: {
                host: ['www.bing.com','cn.bing.com'],
                url: ()=> {if (lp == '/search') {
                    curSite = DBSite.bing;
                    curSite.function = {bF: bing_bF}
                } else if (lp == '/academic/search') {
                    curSite = DBSite.bing_academic;
                }},
                style: '.b_imagePair.square_mp > .inner {display: none !important;}',
                pager: {
                    nextL: 'a.sb_pagN, a.sb_halfnext, a.sb_fullnpl',
                    pageE: '#b_results > li:not(.b_msg):not([class="b_ans"]):not(.b_pag):not(#mfa_root)',
                    replaceE: '#b_results > .b_pag',
                    scrollD: 2000
                }
            }, //                   必应 搜索 + 手机版
            sogou: {
                host: 'www.sogou.com',
                url: '/^\\/.+/',
                pager: {
                    nextL: '#sogou_next',
                    pageE: '.results > *',
                    replaceE: '#pagebar_container',
                    scriptT: 3,
                    scrollD: 2000
                }
            }, //                  搜狗 搜索
            sogou_m: {
                host: ['m.sogou.com', 'wap.sogou.com'],
                url: '/^\\/.+/',
                pager: {
                    type: 2,
                    nextL: '#ajax_next_page',
                    isHidden: true,
                    scrollD: 1000
                }
            }, //                搜狗 搜索 - 手机版
            sogou_weixin: {
                host: 'weixin.sogou.com',
                url: ()=> {if (lp == '/') {
                    curSite = DBSite.sogou_weixin;
                } else if (lp == '/weixin') {
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
                    nextL: '#sogou_next',
                    pageE: 'ul[class*="news-list"] > li',
                    replaceE: '#pagebar_container',
                    scrollD: 1200
                }
            }, //    搜狗微信 - 搜索
            toutiao: {
                host: ['www.toutiao.com', 'so.toutiao.com'],
                url: ()=> {if (location.hostname != 'www.toutiao.com') {
                    if (lp == '/search/' || isMobile()) {
                        curSite = DBSite.toutiao_m;
                    } else if (lp == '/search') {
                        curSite = DBSite.toutiao;
                    }
                }},
                pager: {
                    nextL: '//div[contains(@class, "-pagination")]/a[string()="下一页"]',
                    pageE: 'div[class*="-result-list"] > .result-content[data-i]',
                    replaceE: 'div[class*="-pagination"]',
                    scrollD: 2000
                },
                function: {
                    bF: pageElems => { // 插入前函数（过滤相关搜索）
                        if (getXpath('//div[contains(@class,"-header") and string()="相关搜索"]', pageElems[pageElems.length - 1])) pageElems[pageElems.length - 1].style.display = 'none';
                        return pageElems
                    }
                }
            }, //                头条 搜索
            toutiao_m: {
                pager: {
                    nextL: '#page-bottom a[class*="containerRight_"], #page-bottom a[class*="container_"]',
                    pageE: '#results > div',
                    replaceE: '#page-bottom',
                    scrollD: 2000
                }
            }, //              头条 搜索 - 手机版
            so: {
                host: 'www.so.com',
                url: '/^\\/.+/',
                style: 'img {opacity: 1 !important;}',
                pager: {
                    nextL: 'a#snext',
                    pageE: 'ul.result > li, style:not(src)',
                    insertP: ['ul.result', 3],
                    replaceE: '#page',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-isrc]', 'data-isrc']
                }
            }, //                     360 搜索
            so_m: {
                host: 'm.so.com',
                url: '/^\\/.+/',
                pager: {
                    type: 2,
                    nextL: '#load-more',
                    isHidden: true,
                    scrollD: 1000
                }
            }, //                   360 搜索 - 手机版
            duckduckgo: {
                host: 'duckduckgo.com',
                url: ()=> {
                    if (getCookie('av') != '1') {
                        document.cookie='av=1; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 强制开启自带的无缝翻页功能
                        location.reload(); // 刷新网页
                    }
                },
                history: false
            }, //             DuckDuckGo 搜索
            startpage: {
                host: ['startpage.com', 'www.startpage.com'],
                url: ()=> {if (indexOF('/search')) {curSite = DBSite.startpage;}},
                pager: {
                    nextL: ()=> getNextF('//div[contains(@class, "pagination ")]/form[./button[@class="pagination__next-prev-button next"]]'),
                    pageE: 'section.w-gl--desktop > div',
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //              Startpage 搜索
            yandex: {
                host: ['yandex.com', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.uz', 'yandex.com.tr'],
                url: ()=> {if (lp == '/search/') {curSite = DBSite.yandex;} else if (lp == '/video/search') {curSite = DBSite.yandex_video;}},
                pager: {
                    nextL: 'a.pager__item_kind_next',
                    pageE: '#search-result > *, style',
                    insertP: ['#search-result', 3],
                    replaceE: '.pager',
                    scrollD: 1500
                }
            }, //                 Yandex 搜索
            yandex_video: {
                hiddenPN: true,
                pager: {
                    type: 2,
                    nextL: 'button.more__button',
                    interval: 1000,
                    scrollD: 1000
                }
            }, //           Yandex 搜索 - 视频
            yahoo: {
                host: 'search.yahoo.com',
                url: ()=> {if (indexOF('/search')) {curSite = DBSite.yahoo;}},
                pager: {
                    nextL: '.pagination a.next',
                    pageE: '#web ol > li',
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //                  Yahoo 搜索
            yahoo_jp: {
                host: 'search.yahoo.co.jp',
                url: ()=> {if (indexOF('/search')) {curSite = DBSite.yahoo_jp;}},
                pager: {
                    nextL: '.Pagenation__next > a',
                    pageE: '.Contents__innerGroupBody > div',
                    replaceE: '.Pagenation',
                    scrollD: 2000
                }
            }, //               Yahoo 搜索 (JP)
            qwant: {
                host: 'www.qwant.com',
                url: ()=> {locationC = true; if (indexOF('q=', 's') && indexOF('t=web', 's')) {curSite = DBSite.qwant;}},
                pager: {
                    type: 2,
                    nextL: 'button[data-testid="buttonShowMore"]',
                    interval: 500,
                    scrollD: 2000
                }
            }, //                  Qwant 搜索
            ecosia: {
                host: 'www.ecosia.org',
                url: ()=> {if (lp == '/search') {curSite = DBSite.ecosia;}},
                pager: {
                    nextL: 'nav.pagination a[aria-label="Next page"]',
                    pageE: 'section.mainline > div:not(.related-queries)',
                    replaceE: 'nav.pagination',
                    scrollD: 1500
                }
            }, //                 Ecosia 搜索
            magi: {
                host: 'magi.com',
                url: ()=> {if (lp == '/search') {curSite = DBSite.magi;}},
                pager: {
                    type: 2,
                    nextL: '.card[data-type="next"]',
                    nextText: '加载更多',
                    scrollD: 1500
                }
            }, //                   Magi 搜索
            ask: {
                host: ['ask.com', 'www.ask.com'],
                url: ()=> {if (lp == '/web') {curSite = DBSite.ask;}},
                style: '.PartialSearchResults-heading {display: none !important;}',
                pager: {
                    nextL: 'li.PartialWebPagination-next > a',
                    pageE: '.PartialSearchResults.mid',
                    replaceE: '.PartialWebPagination',
                    scrollD: 2000
                }
            }, //                    ASK 搜索
            fsou: {
                host: 'fsou.cc',
                url: ()=> {
                    if (lp == '/search') {
                        if (window.screen.width < 780) {
                            curSite = DBSite.fsou_m;
                        } else {
                            curSite = DBSite.fsou;
                        }
                    }
                },
                retry: 1000,
                pager: {
                    type: 6,
                    nextL: ()=> getNextEP('.turn-page-num-wrap.selected', 'pageIndex=', /pageIndex=\d+/),
                    pageE: '.organic-results > div',
                    replaceE: '.bottom-pagination',
                    loadTime: 1000,
                    scrollD: 3000
                }
            }, //                   F 搜
            fsou_m: {
                pager: {
                    type: 2,
                    nextL: '.next-page-container',
                    scrollD: 1500
                }
            }, //                 F 搜 - 手机版
            baidu_tieba: {
                host: ['tieba.baidu.com', 'jump2.bdimg.com'],
                url: ()=> {if (location.hostname == 'jump2.bdimg.com') location.hostname = 'tieba.baidu.com';
                           if (lp == '/f') {
                               baidu_tieba_1(); // 右侧悬浮发帖按钮点击事件（解决自动翻页导致无法发帖的问题）
                               curSite = DBSite.baidu_tieba;
                           } else if (indexOF('/p/') && GM_getValue('menu_thread')) {
                               curSite = DBSite.baidu_tieba_post;
                           } else if (lp == '/f/search/res') {
                               curSite = DBSite.baidu_tieba_search;
                           }},
                style: 'img.j_retract {margin-top: 0 !important;margin-bottom: 0 !important;}', // 修复帖子列表中预览图片，在切换下一个/上一个图片时，多出来的图片上下边距
                history: false,
                iframe: true,
                pager: {
                    type: 4,
                    nextL: ()=> {if (getNextE('a.next.pagination-item')) getPageElems_(curSite.pageUrl + '&pagelets=frs-list%2Fpagelet%2Fthread&pagelets_stamp=' + new Date().getTime());},
                    pageE: '#thread_list > li',
                    insertP: ['#thread_list', 3],
                    insertE: baidu_tieba_insertE,
                    replaceE: '#frs_list_pager',
                    interval: 2000,
                    scrollD: 2500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //        百度贴吧 - 帖子列表
            baidu_tieba_post: {
                forceTarget: true,
                style: '.d_sign_split, img.j_user_sign, .d_author .d_pb_icons, .save_face_bg, .save_face_bg_2, li.d_name a.icon_tbworld, .lzl_cnt a.icon_tbworld, .topic_list_box.topic-fixed {display: none !important;} a.p_author_face.j_frame_guide {background: none repeat scroll 0 0 #FFF !important;border: 1px solid #CCC !important;padding: inherit !important;} .red_text, .red-text, .vip_red, .vip-red, .vip_red:hover, .vip-red:hover, .vip_red:visited, .vip-red:visited {color: #2d64b3 !important;}', // 签名、印记、头像边框、VIP 元素
                pager: {
                    type: 5,
                    nextL: '//li[contains(@class,"pb_list_pager")]/a[text()="下一页"]',
                    style: 'ul.tbui_aside_float_bar, .core_title_wrap_bright.tbui_follow_fixed.core_title_absolute_bright {display: none !important;}',
                    scrollD: 1500
                }
            }, //   百度贴吧 - 帖子内
            baidu_tieba_search: {
                pager: {
                    nextL: 'a.next',
                    pageE: '.s_post_list > div',
                    replaceE: '.pager',
                    scrollD: 1000
                }
            }, // 百度贴吧 - 搜索页
            douban_subject_comments: {
                host: 'movie.douban.com',
                url: ()=> {if (indexOF('/subject/') && indexOF('/comments')) {
                    curSite = DBSite.douban_subject_comments;
                } else if (indexOF('/subject/') && indexOF('/reviews')) {
                    curSite = DBSite.douban_subject_reviews;
                } else if(indexOF('/subject/') && indexOF('/episode') || indexOF('/subject/') && indexOF('/tv_discuss')) {
                    curSite = DBSite.douban_subject_episode;
                } else if(indexOF('/people/') && indexOF('/collect')) {
                    curSite = DBSite.douban_people_collect;
                } else if(indexOF('/celebrity/') && indexOF('/movies')) {
                    curSite = DBSite.douban_celebrity_movies;
                }},
                pager: {
                    nextL: 'a.next',
                    pageE: '#comments > .comment-item',
                    replaceE: '#paginator',
                    scrollD: 1500
                }
            }, // 豆瓣 - 短评
            douban_subject_reviews: {
                pager: {
                    nextL: 'link[rel="next"]',
                    pageE: '.review-list > div',
                    replaceE: '.paginator',
                    scrollD: 1500
                }
            }, //  豆瓣 - 影评
            douban_subject_episode: {
                pager: {
                    nextL: 'link[rel="next"]',
                    pageE: '#comments > div',
                    replaceE: '.paginator',
                    scrollD: 1500
                }
            }, //  豆瓣 - 剧评
            douban_people_collect: {
                pager: {
                    nextL: 'link[rel="next"]',
                    pageE: '.grid-view > div',
                    replaceE: '.paginator',
                    scrollD: 1500
                }
            }, //   豆瓣 - 看过的电影
            douban_celebrity_movies: {
                pager: {
                    nextL: 'link[rel="next"]',
                    pageE: '.grid_view > ul > li',
                    replaceE: '.paginator',
                    scrollD: 1500
                }
            }, // 豆瓣 - 作品
            douban_group: {
                host: 'www.douban.com',
                url: ()=> {if (indexOF('/group/topic/') && GM_getValue('menu_thread')) {
                    curSite = DBSite.douban_group_topic;
                } else if (indexOF('/group/explore')) {
                    curSite = DBSite.douban_group_explore;
                } else if (indexOF('/group/') && indexOF('/discussion')) {
                    curSite = DBSite.douban_group;
                }},
                pager: {
                    nextL: 'span.next > a',
                    pageE: 'table.olt > tbody > tr:not(.th)',
                    replaceE: '.paginator',
                    scrollD: 1500
                }
            }, //            豆瓣 - 小组
            douban_group_explore: {
                pager: {
                    nextL: 'span.next > a',
                    pageE: '#content .article > div > .channel-item',
                    replaceE: '.paginator',
                    scrollD: 1500
                }
            }, //    豆瓣 - 小组讨论精选
            douban_group_topic: {
                pager: {
                    nextL: 'span.next > a',
                    pageE: '#comments > li',
                    replaceE: '.paginator',
                    scrollD: 1500
                }
            }, //      豆瓣 - 小组帖子内
            zhihu: {
                host: 'www.zhihu.com',
                url: ()=> {locationC = true; if (indexOF(/\/people\/.+\/.+/) || indexOF('/collection/')) {curSite = DBSite.zhihu; if (self != top) insStyle('#ProfileHeader {display: none !important;}')}},
                forceTarget: true,
                iframe: true,
                pager: {
                    type: 5,
                    nextL: ()=> {
                        let next = getCSS('.Pagination .PaginationButton--current+button:not(.PaginationButton-next)');
                        if (next) return (location.origin + location.pathname + '?page=' + next.textContent)
                    },
                    scrollD: 2000
                }
            }, //               知乎 - 用户主页、收藏夹
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
                url: ()=> {if (indexOF('/list')) {
                    curSite = DBSite.tianya;
                } else if (indexOF('/post') && GM_getValue('menu_thread')) {
                    curSite = DBSite.tianya_post;
                }},
                pager: {
                    nextL: '//div[contains(@class, "pages")]/div[@class="links"]/a[text()="下一页"]',
                    pageE: '.tab-bbs-list > tbody:not(:first-of-type)',
                    replaceE: '//div[contains(@class, "pages")]',
                    scrollD: 1500
                }
            }, //              天涯社区
            tianya_post: {
                pager: {
                    nextL: 'a.js-keyboard-next',
                    pageE: '.atl-main > div[class="atl-item"]',
                    replaceE: '.atl-pages > form',
                    scrollD: 2000
                }
            }, //         天涯社区 - 帖子内
            hupu: {
                host: 'bbs.hupu.com',
                url: ()=> {if (indexOF('.html')) {
                    if (GM_getValue('menu_thread')) curSite = DBSite.hupu_post;
                } else if (lp != '/' && !indexOF('/all-')) {
                    curSite = DBSite.hupu;
                }},
                pager: {
                    nextL: ()=> {let next = getCSS('li.hupu-rc-pagination-item-active+li.hupu-rc-pagination-item > a');if (next) {return (location.origin + location.pathname.replace(/-\d+/,'') + '-' + next.textContent)} else {return ''}},
                    pageE: 'li.bbs-sl-web-post-body',
                    replaceE: 'ul.hupu-rc-pagination',
                    scrollD: 1500
                }
            }, //                虎扑社区
            hupu_post: {
                pager: {
                    nextL: 'li.hupu-rc-pagination-next > a',
                    pageE: '.post-reply-list ',
                    replaceE: 'ul.hupu-rc-pagination',
                    scrollD: 2000
                }
            }, //           虎扑社区 - 帖子内
            nga_thread: {
                host: ['bbs.nga.cn', 'ngabbs.com', 'nga.178.com', 'g.nga.cn'],
                iframe: true,
                url: ()=> {locationC = true;
                           if (lp == '/thread.php') {
                               curSite = DBSite.nga_thread;
                           } else if (lp == '/read.php' && GM_getValue('menu_thread')) {
                               curSite = DBSite.nga_read;
                           }},
                pager: {
                    nextL: '#pagebbtm a[title="下一页"]',
                    pageE: '#topicrows > tbody, #topicrows > script',
                    insertP: ['#topicrows', 3],
                    replaceE: 'div[name="pageball"]',
                    scriptT: 2,
                    scrollD: 1000
                },
                function: {
                    aF: ()=> {document.body.appendChild(document.createElement('script')).textContent = 'commonui.topicArg.loadAll();';}
                }
            }, //          NGA - 各版块帖子列表
            nga_read: {
                history: false,
                retry: 1000,
                pager: {
                    nextL: '#pagebbtm a[title*="下一页"]',
                    pageE: 'id("m_posts_c")/table | id("m_posts_c")/script | //script[contains(text(), "commonui.userInfo.setAll")]',
                    insertP: ['#m_posts_c', 3],
                    replaceE: 'div[name="pageball"]',
                    scriptT: 2,
                    scrollD: 1000
                }
            }, //            NGA - 帖子内
            v2ex_recent: {
                host: ['v2ex.com', 'www.v2ex.com'],
                url: ()=> {if (lp == '/') {
                    v2ex_aF('#Main a.topic-link:not([target])');
                } else if (lp == '/recent') {
                    curSite = DBSite.v2ex_recent;
                    v2ex_aF('#Main a.topic-link:not([target])');
                } else if (lp == '/notifications') {
                    curSite = DBSite.v2ex_notifications;
                    v2ex_aF('#Main a[href^="/t/"]:not([target])');
                } else if (lp == '/balance') {
                    curSite = DBSite.v2ex_balance;
                } else if (indexOF('/go/')) {
                    curSite = DBSite.v2ex_go;
                    v2ex_aF('#Main a.topic-link:not([target])');
                } else if (indexOF('/replies')) {
                    curSite = DBSite.v2ex_replies;
                    v2ex_aF('#Main a[href^="/t/"]:not([target])');
                }},
                pager: {
                    nextL: 'a.page_current+a.page_normal',
                    pageE: '.cell.item',
                    replaceE: '#Main > .box > .cell[style]:not(.item) > table',
                    scrollD: 1500
                },
                function: {
                    aF: v2ex_aF,
                    aFp: '#Main a.topic-link:not([target])'
                }
            }, //         V2EX - 最近主题页
            v2ex_notifications: {
                pager: {
                    nextL: 'a.page_current+a.page_normal',
                    pageE: '#notifications > div',
                    replaceE: '#Main > .box > .cell[style] > table',
                    scrollD: 1500
                },
                function: {
                    aF: v2ex_aF,
                    aFp: '#Main a[href^="/t/"]:not([target])'
                }
            }, //  V2EX - 提醒消息页
            v2ex_replies: {
                pager: {
                    nextL: 'a.page_current+a.page_normal',
                    pageE: '//div[@id="Main"]//div[@class="box"]//div[@class="dock_area"] | //*[@id="Main"]//div[@class="box"]//div[@class="inner"] | //*[@id="Main"]//div[@class="box"]//div[@class="dock_area"][last()]/following-sibling::div[@class="cell"][1]',
                    insertP: ['//div[@id="Main"]//div[@class="box"]//div[@class="cell"][last()]', 1],
                    replaceE: '#Main > .box > .cell[style] > table',
                    scrollD: 1500
                },
                function: {
                    aF: v2ex_aF,
                    aFp: '#Main a[href^="/t/"]:not([target])'
                }
            }, //        V2EX - 用户回复页
            v2ex_go: {
                pager: {
                    nextL: 'a.page_current+a.page_normal',
                    pageE: '#TopicsNode > div',
                    replaceE: '#Main > .box > .cell[style] > table',
                    scrollD: 1500
                },
                function: {
                    aF: v2ex_aF,
                    aFp: '#Main a.topic-link:not([target])'
                }
            }, //             V2EX - 分类主题页
            v2ex_balance: {
                pager: {
                    nextL: 'a.page_current+a.page_normal',
                    pageE: '#Main .box > div:not(.cell) > table > tbody > tr:not(:first-child)',
                    replaceE: '#Main > .box > .cell[style] > table',
                    scrollD: 1000
                }
            }, //        V2EX - 账户余额页
            jandan: {
                host: 'jandan.net',
                url: ()=> {if (lp == '/' || indexOF('/page/')) {
                    curSite = DBSite.jandan;
                } else if (lp == '/dzh') {
                    curSite = DBSite.jandan_dzh;
                } else {
                    curSite = DBSite.jandan_comment;
                }},
                style: '#nav_prev, #nav_next, .post.f:not(.list-post) {display: none !important;}',
                history: false,
                pager: {
                    nextL: '//div[@class="wp-pagenavi"]/a[contains(text(), "下一页") or contains(text(), "更多文章")]',
                    pageE: '#content > .list-post',
                    replaceE: '.wp-pagenavi',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //              煎蛋网
            jandan_comment: {
                style: '#nav_prev, #nav_next, #tucao-gg {display: none !important;} .jandan-vote a.tucao-btn23:link {color: #c8c7cc !important;} .jandan-tucao {background-color: #fafaf9 !important;}',
                pager: {
                    nextL: 'a.previous-comment-page',
                    pageE: 'ol.commentlist > li[id^="comment-"], script[src^="//cdn.jandan.net/static/min/"]',
                    insertP: ['ol.commentlist', 3],
                    replaceE: '.cp-pagenavi',
                    scriptT: 2,
                    scrollD: 1500
                },
                function: {
                    bF: pageElems => { // 插入前函数（修改当前网页中的 吐槽 等按钮，避免重复添加点击事件）
                        getAllCSS('a.tucao-btn').forEach(function (now) {now.className = now.className.replace('tucao-btn', 'tucao-btn23');});
                        getAllCSS('a.comment-like.like').forEach(function (now) {now.className = now.className.replace('comment-like', 'comment-like23');});
                        getAllCSS('a.comment-unlike.unlike').forEach(function (now) {now.className = now.className.replace('comment-unlike', 'comment-unlike23');});
                        return pageElems
                    }
                }
            }, //      煎蛋网
            jandan_dzh: {
                history: false,
                pager: {
                    type: 2,
                    nextL: '.show_more',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //          煎蛋网 - 大杂烩
            qiushibaike: {
                host: 'www.qiushibaike.com',
                url: ()=> {insStyle('.qrcode-wrap, .qrcode-wrap-img, .index-side-left-AD1 {display: none !important;}');
                           if (lp == '/') {
                               curSite = DBSite.qiushibaike;
                           } else if (!indexOF('/article/')) {
                               curSite = DBSite.qiushibaike_;
                           }},
                pager: {
                    nextL: '//ul[@class="pagination"]//a[./span[@class="next"]]',
                    pageE: '.recommend-article > ul > li',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //         糗事百科
            qiushibaike_: {
                pager: {
                    nextL: '//ul[@class="pagination"]//a[./span[@class="next"]]',
                    pageE: '[id^="qiushi_tag_"]',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //        糗事百科 - 分类页
            lkong: {
                host: 'www.lkong.com',
                url: ()=> {locationC = true; if (indexOF('/forum/')) {
                    curSite = DBSite.lkong;
                } else if (indexOF('/thread/') && GM_getValue('menu_thread')) {
                    curSite = DBSite.lkong;
                    curSite.pager.pageE = '//div[@class="main-content"]/parent::div | //head/style[@data-emotion-css]';
                    curSite.pager.insertP = ['//div[@class="main-content"][1]/parent::div/parent::div', 3];
                }},
                history: false,
                pager: {
                    nextL: ()=> { // 获取下一页地址
                        let next = getCSS('li.ant-pagination-next'), page;
                        if (next && next.getAttribute('aria-disabled') === 'false') {
                            page = getCSS('li.ant-pagination-item-active[title]');
                            if (page && page.title) {return (location.origin + location.pathname + '?page=' + ++page.title);}
                        }
                        return '';
                    },
                    pageE: '//div[@class="main-title"]/parent::div/parent::div | //head/style[@data-emotion-css]',
                    insertP: ['//div[@class="main-title"][1]/parent::div/parent::div/parent::div', 3],
                    replaceE: 'ul.ant-pagination',
                    interval: 500,
                    scrollD: 1200
                }
            }, //               龙的天空
            pediy_forum: {
                host: 'bbs.pediy.com',
                url: ()=> {if (indexOF('/forum-')) {
                    curSite = DBSite.pediy_forum;
                } else if (indexOF('/thread-') && GM_getValue('menu_thread')) {
                    curSite = DBSite.pediy_thread;
                }},
                pager: {
                    nextL: '//a[@class="page-link" and text()="▶"]',
                    pageE: 'table.threadlist > tbody > tr',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //         看雪论坛 - 各版块帖子列表
            pediy_thread: {
                pager: {
                    nextL: '//a[@class="page-link" and text()="▶"]',
                    pageE: 'table.postlist > tbody > tr[data-pid]',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //        看雪论坛 - 帖子内
            bangumitv: {
                host: 'bangumi.tv',
                url: ()=> {
                    if (indexOF('/browser') || indexOF('/subject_search')) {
                        curSite = DBSite.bangumitv;
                    } else if (indexOF('/forum')) {
                        curSite = DBSite.bangumitv_forum;
                    }},
                pager: {
                    nextL: '//div[@class="page_inner"]/a[text()="››"]',
                    pageE: 'ul#browserItemList > li',
                    replaceE: '.page_inner',
                    scrollD: 1500
                }
            }, //           番组计划
            bangumitv_forum: {
                pager: {
                    nextL: '//div[@class="page_inner"]/a[text()="››"]',
                    pageE: '.topic_list > tbody:last-of-type > tr.topic',
                    replaceE: '.page_inner',
                    scrollD: 1500
                }
            }, //     番组计划 - 小组帖子列表
            dongchedi: {
                host: 'www.dongchedi.com',
                url: ()=> {locationC = true;
                           if (indexOF('/community/')) {
                               curSite = DBSite.dongchedi;
                           }},
                pager: {
                    nextL: 'li.pagination-item.is-active+li > a',
                    pageE: '.data-wrapper > section.community-card, style',
                    insertP: ['.data-wrapper', 3],
                    replaceE: '//ul[./li[contains(@class, "pagination-item")]]',
                    scrollD: 2000
                },
                function: {
                    bF: pageElems => {
                        pageElems.forEach(function (one) {
                            one.querySelectorAll('.g-load-img-wrap, .tw-absolute.tw-cursor-pointer, .avatar').forEach(function (now) {
                                getCSS('noscript+img', now).src = getCSS('noscript > img', now).src;
                            });
                        });
                        return pageElems
                    }
                }
            }, //           懂车帝论坛
            kdslife: {
                host: 'club.kdslife.com',
                url: ()=> {
                    if (indexOF('/f_')) {
                        curSite = DBSite.kdslife;
                    } else if (indexOF('/t_')) {
                        curSite = DBSite.kdslife_t;
                    }},
                pager: {
                    nextL: '//div[@class="fr i3_r"]/a[text()="后一页"]',
                    pageE: 'ul.main_List > li.i2:not(.h_bg)',
                    replaceE: 'ul.main_List > li.i3',
                    scrollD: 1000
                }
            }, //             宽带山论坛
            kdslife_t: {
                pager: {
                    nextL: '//div[@class="pages"]/a[text()=">>"]',
                    pageE: '#reply_list_panel > *, script[src*="ui/js/kds.js"]',
                    insertP: ['#reply_list_panel', 3],
                    replaceE: '.pages',
                    scriptT: 2,
                    scrollD: 1000
                }
            }, //           宽带山论坛 - 帖子内
            libaclub: {
                host: 'www.libaclub.com',
                url: ()=> {
                    if (lp == '/' || indexOF('/date_')) {
                        curSite = DBSite.libaclub;
                    } else if (indexOF('/f_')) {
                        curSite = DBSite.libaclub_f;
                    } else if (indexOF('/t_') || indexOF('/reply_')) {
                        curSite = DBSite.libaclub_t;
                    } else if (indexOF('/prt_')) {
                        curSite = DBSite.libaclub_prt;
                    } else if (lp == '/facade.php') {
                        curSite = DBSite.libaclub_search;
                    }},
                style: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    nextL: '//div[@class="ui-crumbs-more"]/a[@class="fn-link"][1]',
                    pageE: 'ul.ui-list > li:not(.ui-list-item-head):not(.ui-list-merchant-ad)',
                    replaceE: 'div.ui-crumbs-more',
                    scrollD: 1200
                }
            }, //            篱笆网论坛
            libaclub_f: {
                style: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    nextL: 'a.ui-paging-next',
                    pageE: 'ul.ui-list > li:not(.ui-list-item-head):not(.ui-list-merchant-ad)',
                    replaceE: 'div.ui-paging',
                    scrollD: 1200
                }
            }, //          篱笆网论坛 - 各版块帖子列表
            libaclub_t: {
                style: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    nextL: 'a.ui-paging-next',
                    pageE: '.ui-box-content > div.ui-topic, .ui-box-content > a[name]',
                    insertP: ['.ui-box-content', 3],
                    replaceE: 'div.ui-paging',
                    scrollD: 1500
                }
            }, //          篱笆网论坛 - 帖子内
            libaclub_prt: {
                style: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    nextL: 'a.ui-paging-next',
                    pageE: 'ul.ui-list > li',
                    replaceE: 'div.ui-paging',
                    scrollD: 2000
                }
            }, //        篱笆网论坛 - 帖子内 - 打印版
            libaclub_search: {
                style: 'li.ui-list-merchant-ad, .ui-nav-appImage {display: none !important;}',
                pager: {
                    nextL: '//div[@class="ui-page"]/a[contains(text(), "下一页")]',
                    pageE: '.ui-box-main > ul.ui-list > li',
                    replaceE: 'div.ui-page',
                    scrollD: 1200
                }
            }, //     篱笆网论坛 - 搜索页
            taoguba: {
                host: 'www.taoguba.com.cn',
                url: ()=> {insStyle('#joinTGB {display: none !important;}')
                           if (indexOF('/Article/') && GM_getValue('menu_thread')) {
                               curSite = DBSite.taoguba_t;
                           } else if (indexOF('/shenghuoba/')) {
                               curSite = DBSite.taoguba_;
                           } else if (indexOF(/\/bbs|zongban|dianzan|jinghua\//)) {
                               curSite = DBSite.taoguba;
                           }},
                history: false,
                pager: {
                    nextL: ()=> {
                        let next = getXpath('//div[contains(@class, "t_page01")]/a[contains(text(), "下一页")]'), next_ = '/';
                        if (next) {
                            next = next.getAttribute('onclick').replace('gotoPage(','').replace(')','').split(',');
                            if (indexOF(/\/dianzan|jinghua\//)) next_ = '-';
                            if (parseInt(next[0]) <= parseInt(next[2])) {return (`${location.origin}/${location.pathname.split('/')[1]}/${next[0]}${next_}${next[1]}`)}
                        }
                        return '';
                    },
                    pageE: '.p_list > .p_list01[class*="user_"]',
                    replaceE: '.t_page',
                    scrollD: 1000
                }
            }, //             淘股吧论坛
            taoguba_: {
                history: false,
                pager: {
                    nextL: ()=> {
                        let next = getCSS('#N_go_pageBtn'), next_ = location.pathname.split('/')[2].split('-')[0];
                        if (next && (parseInt(next.dataset.now) + 1 <= parseInt(next.dataset.total))) {
                            if (!next_) next_ = 'H';
                            return (`${location.origin}/shenghuoba/${next_}-${parseInt(next.dataset.now) + 1}`)
                        }
                        return '';
                    },
                    pageE: '.lifeContent-topicList-item',
                    replaceE: '.N_sortPage ',
                    scrollD: 1000
                }
            }, //            淘股吧论坛 - 生活圈
            taoguba_t: {
                history: false,
                pager: {
                    nextL: ()=> {
                        let next = getXpath('//div[contains(@class, "t_page01")]/a[contains(text(), "下一页")]');
                        if (next) {
                            next = next.getAttribute('onclick').replace('gotoPageTopic(','').replace(')','').split(',');
                            if (parseInt(next[0]) <= parseInt(next[1])) {return (`${location.origin}/Article/${getCSS("#looktopicID").value}/${next[0]}`)}
                        }
                        return '';
                    },
                    pageE: 'div[id^="reply_"]',
                    replaceE: '.t_page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //           淘股吧论坛 - 帖子内
            lowendtalk: {
                host: 'lowendtalk.com',
                pager: {
                    nextL: 'a.Next',
                    pageE: 'ul.DataList > li',
                    replaceE: '.Pager',
                    scrollD: 1500
                }
            }, //          LowEndTalk
            lieyou: {
                host: 'bbs.lieyou888.com',
                url: ()=> {if (indexOF('/forum')) {curSite = DBSite.lieyou;}},
                pager: {
                    nextL: '//div[contains(@class, "_pageNav")]/a[text()="下一页"]',
                    pageE: 'ul.gb-bbs-list > li',
                    replaceE: '._pageNav',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[original]', 'original']
                }
            }, //              芥子空间论坛
            xcar_forumdisplay: {
                host: 'www.xcar.com.cn',
                url: ()=> {if (lp == '/bbs/forumdisplay.php') {curSite = DBSite.xcar_forumdisplay}},
                pager: {
                    nextL: 'a.page_down',
                    pageE: '.table-section > dl:not(.table_head)',
                    replaceE: '.forumList_page',
                    scrollD: 2000
                }
            }, //   爱卡汽车网论坛 - 各版块帖子列表
            flyert_forumdisplay: {
                host: 'www.flyert.com',
                url: ()=> {if (indexOF('/forum-') || indexOF('mod=forumdisplay', 's')) {
                    curSite = DBSite.flyert_forumdisplay;
                } else if (indexOF('/forum') || indexOF('mod=viewthread', 's')) {
                    if (GM_getValue('menu_thread')) {curSite = DBSite.flyert_viewthread;}
                }},
                pager: {
                    nextL: 'a.nxt:not([href*="javascript"])',
                    pageE: '#threadlist table > tbody[id^="normalthread_"]',
                    replaceE: '.pg',
                    scrollD: 2500
                }
            }, // 飞客网论坛 - 各版块帖子列表
            flyert_viewthread: {
                pager: {
                    nextL: 'a.nxt:not([href*="javascript"])',
                    pageE: '#postlist > .comiis_viewbox',
                    replaceE: '.comiis_pgs > .pg',
                    scrollD: 3000
                }
            }, //   飞客网论坛 - 帖子内
            cnprint: {
                host: 'www.cnprint.org',
                url: ()=> {if (indexOF('/forum/')) {curSite = DBSite.cnprint;} else if (indexOF('/thread/') && GM_getValue('menu_thread')) {curSite = DBSite.cnprint_thread;}},
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: 'tbody[id*="threadbits_forum"] > tr',
                    replaceE: '.pagenav',
                    scrollD: 2500
                }
            }, //             CPC 中文印刷社区
            cnprint_thread: {
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: '#posts > div:not([id])',
                    replaceE: '.pagenav',
                    scrollD: 2000
                }
            }, //      CPC 中文印刷社区 - 帖子内
            discusshk: {
                host: /.+\.discuss\.com\.hk/,
                url: ()=> {if (lp == '/forumdisplay.php') {curSite = DBSite.discusshk;} else if (lp == '/viewthread.php' && GM_getValue('menu_thread')) {curSite = DBSite.discusshk_thread;}},
                pager: {
                    nextL: '.pagination a.next',
                    pageE: 'tbody[id^="normalthread_"]',
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //           中国香港社区
            discusshk_thread: {
                style: '.viewthread.mt-0:not(:first-of-type) .viewthread__head {display: none !important;}',
                pager: {
                    nextL: '.pagination a.next',
                    pageE: '.viewthread',
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //    中国香港论坛 - 帖子内
            tgfcer: {
                host: 'bbs.tgfcer.com',
                url: ()=> {if (lp == '/forumdisplay.php' || indexOF('/forum')) {curSite = DBSite.tgfcer;} else if (GM_getValue('menu_thread') && (lp == '/viewthread.php' || indexOF('/thread'))) {curSite = DBSite.tgfcer_thread;}},
                pager: {
                    nextL: '.pages a.next',
                    pageE: 'tbody[id^="normalthread_"]',
                    replaceE: '.pages',
                    scrollD: 2000
                }
            }, //              TGFC Lifestyle
            tgfcer_thread: {
                style: '.viewthread:not(:first-of-type) h1 {display: none !important;}',
                pager: {
                    nextL: '.pages a.next',
                    pageE: '.viewthread',
                    replaceE: '.pages',
                    scrollD: 2000
                }
            }, //       TGFC Lifestyle - 帖子内
            south: {
                host: /((www|bbs)\.)?(soul|north|south|white|level|summer|spring|snow)-plus\.(net|org)/,
                url: ()=> {
                    if (lp == '/thread.php' || lp == '/search.php') {
                        curSite = DBSite.south;
                    } else if (lp == '/thread_new.php') {
                        curSite = DBSite.south; curSite.pager.pageE = 'li.dcsns-li'; curSite.pager.scrollD = 2000; curSite.function = {bF: src_bF,bFp: [0, 'img[data-original]', 'data-original']}; curSite.style = 'img.lazy {display: inline !important;}';
                    } else if (GM_getValue('menu_thread') && lp == '/read.php') {
                        curSite = DBSite.south; curSite.pager.pageE = 'form[name=delatc] > *:not(input)';
                    } else if (lp == '/u.php' && (indexOF('action-topic-', 's') || indexOF('action-post-', 's'))) {
                        curSite = DBSite.south; curSite.pager.pageE = '#u-contentmain table tr';
                    }},
                pager: {
                    nextL: '//div[@class="pages"]/ul/li[./b]/following-sibling::li[1][not(@class)]/a[not(text()="»")]',
                    pageE: 'tr.tr3',
                    replaceE: '.pages',
                    scrollD: 1500
                }
            }, //               South Plus (南+)
            goddessfantasy: {
                host: 'www.goddessfantasy.net',
                url: ()=> {
                    if (indexOF('board=', 's')) {
                        curSite = DBSite.goddessfantasy;
                    } else if (indexOF('topic=', 's')) {
                        if (GM_getValue('menu_thread')) curSite = DBSite.goddessfantasy; curSite.pager.pageE = '#quickModForm > *';
                    }},
                pager: {
                    nextL: '//div[contains(@class,"pagelinks")]/a[@class="navPages" and text()="»"]',
                    pageE: '.table_grid > tbody > tr',
                    replaceE: '.pagelinks',
                    scrollD: 1500
                }
            }, //      纯美苹果园
            adnmb3: {
                host: ['adnmb3.com', 'www.tnmb.org', 'nimingban.org'],
                url: ()=> {
                    if (indexOF('/m/f/')) {
                        curSite = DBSite.adnmb3_mf;
                    } else if (indexOF('/m/t/')) {
                        if (GM_getValue('menu_thread')) curSite = DBSite.adnmb3_mt;
                    } else if (indexOF(/\/(f|Forum)\//)) {
                        curSite = DBSite.adnmb3;
                    } else if (indexOF('/t/')) {
                        if (GM_getValue('menu_thread')) curSite = DBSite.adnmb3_t;
                    }},
                pager: {
                    nextL: '//ul[contains(@class, "pagination")]//a[text()="下一页"]',
                    pageE: '.h-threads-list > *, script[src$="/h.desktop.js"]',
                    insertP: ['.h-threads-list', 3],
                    replaceE: '//ul[contains(@class, "pagination")]',
                    scriptT: 2,
                    scrollD: 2500
                }
            }, //              A 岛
            adnmb3_t: {
                pager: {
                    nextL: '//ul[contains(@class, "pagination")]//a[text()="下一页"]',
                    pageE: '.h-threads-list > .h-threads-item > .h-threads-item-replys, script[src$="/h.desktop.js"]',
                    insertP: ['.h-threads-list > .h-threads-item', 3],
                    replaceE: '//ul[contains(@class, "pagination")]',
                    scriptT: 2,
                    scrollD: 2500
                }
            }, //            A 岛 - 帖子内
            adnmb3_mf: {
                pager: {
                    nextL: '//li[contains(@class, "pagination-next")]//a[text()="下一页"]',
                    pageE: '.h-middle > div[id^="threads_"], .h-middle > hr.h-middle > div[id^="threads_"], .h-middle > hr:nth-of-type(n+2), script[src$="/h.mobile.js"]',
                    insertP: ['#h-threads-pagination', 1],
                    replaceE: '#h-threads-pagination',
                    scriptT: 2,
                    scrollD: 2500
                }
            }, //           A 岛 - 帖子列表（手机版）
            adnmb3_mt: {
                pager: {
                    nextL: '//li[contains(@class, "pagination-next")]//a[text()="下一页"]',
                    pageE: '.h-threads-replylist > div, script[src$="/h.mobile.js"]',
                    insertP: ['.h-threads-replylist', 3],
                    replaceE: '#h-threads-pagination',
                    scriptT: 2,
                    scrollD: 2500
                }
            }, //           A 岛 - 帖子内（手机版）
            pixiv: {
                host: 'www.pixiv.net',
                url: ()=> {locationC = true;
                           if (lp == '/') {
                               forceTarget();
                           } else if (indexOF('/tags/')/* && self == top*/) {
                               curSite = DBSite.pixiv;
                           } else if (indexOF('/users/') && indexOF(/\/(artworks|illustrations|manga)/)) {
                               curSite = DBSite.pixiv_user;
                           } else if (indexOF('/artworks/')) {
                               setTimeout(function(){getXpath('//button[contains(string(), "查看全部") or contains(string(), "See all") or contains(string(), "すべて見る") or contains(string(), "모두 보기")]').click();}, 1000)
                           }
                          },
                forceTarget: true,
                style: 'ul[class*="-1 "] > li {display: inline !important;} #root{margin-bottom: -175px;} ul > li > button[class^="sc-"], a[href^="/premium/lead/lp"] {display: none !important;}',
                iframe: true,
                pager: {
                    type: 5,
                    nextL: 'a[aria-disabled="false"][class*="filterProps-Styled-Component"][href]:last-child',
                    /*pageE: '//ul[contains(@class, "-1 ")]/li',
                    insertP: ['//ul[contains(@class, "-1 ")]', 3],
                    replaceE: '//nav[./a[@aria-disabled="false"][contains(@class, "filterProps-Styled-Component")]]',*/
                    scrollD: 2000
                }
            }, //               Pixiv - 分类页
            pixiv_user: {
                forceTarget: true,
                style: 'ul[class*="-1 "] > li {display: inline !important;} #root{margin-bottom: -125px;} ul > li > button[class^="sc-"][style="background-color: rgb(0, 0, 0);"], a[href^="/premium/lead/lp"] {display: none !important;}',
                pager: {
                    type: 5,
                    nextL: 'a[aria-disabled="false"][class*="filterProps-Styled-Component"][href]:last-child',
                    /*pageE: '//ul[contains(@class, "-1 ")]/li',
                    insertP: ['//ul[contains(@class, "-1 ")]', 3],
                    replaceE: '//nav[./a[@aria-disabled="false"][contains(@class, "filterProps-Styled-Component")]]',*/
                    scrollD: 2000
                }
            }, //          Pixiv - 用户作品页
            vilipix: {
                host: 'www.vilipix.com',
                url: ()=> {locationC = true; if (lp == '/') {forceTarget();} else if (indexOF(/\/(tags|user|new|ranking)/)) {curSite = DBSite.vilipix;}},
                forceTarget: true,
                pager: {
                    type: 6,
                    nextL: ()=> {let next = getCSS('li.number.active+li.number'); if (next) return (location.origin + location.pathname + '?p=' + next.textContent)},
                    pageE: 'ul.illust-content > li',
                    replaceE: 'ul.el-pager',
                    loadTime: 800,
                    scrollD: 2000
                }
            }, //             Vilipix
            pixivision: {
                host: 'www.pixivision.net',
                url: ()=> {if (!indexOF('/a/')) curSite = DBSite.pixivision;},
                pager: {
                    nextL: 'a.next',
                    pageE: 'li.article-card-container',
                    replaceE: '._pager',
                    scrollD: 2000
                }
            }, //          Pixivision
            _58pic: {
                host: 'www.58pic.com',
                url: ()=> {insStyle('.qt-model-t.login-model {display: none !important;}');
                           if (indexOF(/\/(tupian|piccate)\//)) {
                               curSite = DBSite._58pic;
                               if (indexOF('/piccate/') && getCSS('.card-grid-box .qt-card-box[style*="width:"]')) insStyle('.card-grid-box .qt-card-box {display: block;height: 300px;min-height: 250px;}')
                           } else if (indexOF('/c/')) {
                               curSite = DBSite._58pic_c;
                           }},
                style: '.qtw-card.place-box, .card-lazy, .is-line .is-back {display: none !important;}',
                pager: {
                    nextL: '//div[contains(@class,"page-box")]//a[text()="下一页"]',
                    pageE: '.card-grid-box:not(.favorites-box) > div',
                    replaceE: '.page-box',
                    scrollD: 2500
                },
                function: {
                    bF: "src_bF",
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //              千图网 - 分类/搜索页
            _58pic_c: {
                pager: {
                    nextL: '//div[contains(@class,"page-box")]//a[text()="下一页"]',
                    pageE: '.list-box > .qtw-card',
                    replaceE: '.page-box',
                    scrollD: 4000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //            千图网 - 专题/收藏夹
            _588ku: {
                host: '588ku.com',
                style: '.listlogin-box.listloginBox, .CLdialogV1, .editIndexEntry, .globalRSideB {display: none !important;}',
                pager: {
                    nextL: '//ul[contains(@class, "page-list")]//a[text()="下一页"]',
                    pageE: '.data-box .dataList, .data-box .data-list',
                    insertP: ['.data-box .dataList, .data-box .data-list', 3],
                    replaceE: 'ul.page-list',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //              千库网
            nipic: {
                host: ['www.nipic.com', 'soso.nipic.com'],
                style: 'li.search-works-item {display: none !important;}',
                pager: {
                    nextL: '//a[@title="下一页" or text()="下一页"][not(contains(@class, "search-works-nextpage"))]',
                    pageE: 'ul#img-list-outer > li',
                    replaceE: '.common-page-box, .common-seo-page-box',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //               昵图网
            ztupic: {
                host: 'www.ztupic.com',
                url: ()=> {if (lp != '/' && !indexOF('/sucai/')) {curSite = DBSite.ztupic;}},
                pager: {
                    nextL: 'a.page-link[rel="next"]',
                    pageE: '.floor_item',
                    replaceE: 'ul.pagination',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //              众图网
            ooopic: {
                host: ['www.ooopic.com', 'so.ooopic.com', 'weili.ooopic.com'],
                url: ()=> {if (lp != '/' && !indexOF('/weili_')) {curSite = DBSite.ooopic;}},
                style: '.overWidth.clearfix.masonry {height: auto !important;} .pic-list, .video-list {position: relative !important;float: left !important;top: auto !important;left: auto !important;}',
                pager: {
                    nextL: 'a.next_page, a.so-next',
                    pageE: '.overWidth.clearfix.masonry > div',
                    replaceE: '.page',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //              我图网
            ibaotu: {
                host: 'ibaotu.com',
                url: ()=> {if (lp != '/' && !indexOF('/sucai/')) {curSite = DBSite.ibaotu;if (indexOF('/yinxiao') || indexOF('/peiyue')) {curSite.pager.pageE = 'ul.media-list-ul > li[pr-data-title]'} else if (indexOF('/font/')) {curSite.pager.pageE = '.baotufonts-list > a'}}},
                style: '.searchAdver {display: none !important;}',
                pager: {
                    nextL: 'a.next',
                    pageE: '.pr-container[pr-data-title]:not(.searchAdver)',
                    replaceE: '.pagelist',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-url]', 'data-url']
                }
            }, //              包图网
            pixabay: {
                host: 'pixabay.com',
                pager: {
                    nextL: '//a[text()="›"]',
                    pageE: '[class^="results"]  > [class^="container"] > div',
                    replaceE: '//a[text()="›"]',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-lazy-src]', 'data-lazy-src']
                }
            }, //             Pixabay
            logosc: {
                host: 'www.logosc.cn',
                url: '/\\/so\\//',
                pager: {
                    type: 2,
                    nextL: 'button.so-pablo-button',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //              搜图神器 (免费无版权)
            sccnn: {
                host: 'www.sccnn.com',
                pager: {
                    nextL: '//ul[@class="listpage"]//a[text()=">"]',
                    pageE: 'td[valign="TOP"]:not([width]) tr[valign="Middle"]',
                    replaceE: 'ul.listpage',
                    scrollD: 1000
                }
            }, //               素材中国
            sccnn_so: {
                host: 'so.sccnn.com',
                pager: {
                    nextL: 'font[color="Red"]+a.F16',
                    pageE: '//tr[@valign="Top"][1]/preceding-sibling::tr',
                    replaceE: '//tr[@valign="Top"][last()]',
                    scrollD: 1000
                }
            }, //            素材中国 - 搜索页
            pngss: {
                host: 'pngss.com',
                url: ()=> {if (lp == '/search') curSite = DBSite.pngss;},
                pager: {
                    nextL: '.page a[rel="next"]',
                    pageE: 'ul.list-ul > li',
                    replaceE: '.page',
                    scrollD: 1200
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //               PNG 搜索网
            iconfont: {
                host: 'www.iconfont.cn',
                url: ()=> {locationC = true; if (indexOF('/search/')) curSite = DBSite.iconfont;},
                forceTarget: true,
                style: '.footer, header .bind-tips, .block-pagination-wrap, #magix_vf_main .block-sub-banner, #J_block_sidebar {display: none !important;}',
                iframe: true,
                pager: {
                    type: 5,
                    nextL: ()=> getNextEP('li.active+li:not(.disabled) > a', 'page=', /page=\d+/),
                    scrollD: 1000
                }
            }, //            iconfont
            iconarchive: {
                host: 'iconarchive.com',
                url: '/\\/(tag|search|category)/',
                pager: {
                    nextL: 'a.next',
                    pageE: '.icondetail',
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //         IconArchive
            puxiang: {
                host: 'www.puxiang.com',
                url: ()=> {if (lp == '/search/favorite') {
                    curSite = DBSite.puxiang_collect;
                } else if (lp == '/search/puxiang' || lp == '/list' || lp == '/galleries' || lp == '/articles') {
                    curSite = DBSite.puxiang;
                } else if (lp == '/') {
                    curSite = DBSite.puxiang; curSite.pager.scrollD = 4000;
                }},
                pager: {
                    nextL: 'li.next > a',
                    pageE: '.work-list > div',
                    replaceE: '.pagerbar',
                    scrollD: 1500
                }
            }, //             普象网 - 作品集/搜索页
            puxiang_collect: {
                pager: {
                    nextL: 'li.next > a',
                    pageE: '.collect-list > div',
                    replaceE: '.pagerbar',
                    scrollD: 1500
                }
            }, //     普象网 - 收藏夹
            xuexiniu: {
                host: ['www.xuexiniu.com', 'bbs.xuexiniu.com'],
                url: ()=> {
                    if (getCSS('body#nv_forum.pg_forumdisplay')) {
                        if (getCSS('ul.waterfall')) {
                            curSite = DBSite.xuexiniu_forum;
                        } else {
                            curSite = DBSite.discuz_guide
                        }
                    } else if (getCSS('body#nv_forum.pg_viewthread') && GM_getValue('menu_thread')) {
                        curSite = DBSite.xuexiniu_thread;
                    } else if (indexOF('/search.php')) {
                        curSite = DBSite.xuexiniu_search;
                    } else {
                        curSite = DBSite.xuexiniu;
                    }
                },
                pager: {
                    nextL: '//a[@class="page-link" and contains(text(), "下一页")]',
                    pageE: '.row > .col-sm-6',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //            学犀牛 - 分类页
            xuexiniu_forum: {
                pager: {
                    nextL: 'a.nxt:not([href*="javascript"])',
                    pageE: '.waterfall > li',
                    replaceE: '.pg',
                    scrollD: 1500
                }
            }, //      学犀牛 - 各板块帖子列表
            xuexiniu_thread: {
                pager: {
                    nextL: 'a.nxt:not([href*="javascript"])',
                    pageE: '#zhanzhuai_primary > .box',
                    replaceE: '.pg',
                    scrollD: 1500
                }
            }, //     学犀牛 - 帖子内
            xuexiniu_search: {
                pager: {
                    nextL: 'a.nxt:not([href*="javascript"])',
                    pageE: '.yangshi.yangshi2',
                    insertP: ['.page', 1],
                    replaceE: '.page',
                    scrollD: 1500
                }
            }, //     学犀牛 - 搜索页
            om: {
                host: 'www.om.cn',
                url: '/^\\/.+/',
                pager: {
                    nextL: 'li.next > a',
                    pageE: '.main_content > ul > li',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //                  欧模网
            xiadele: {
                host: ['www.xiadele.com', 'search.xiadele.com'],
                url: '/^\\/.+/',
                style: '.last-li-carousel-img {display: none !important;}',
                pager: {
                    nextL: 'li.next_page a[rel="next"]',
                    pageE: 'ul.list-page-ul > li',
                    replaceE: 'ul.pagination',
                    scrollD: 2000
                }
            }, //             下得乐
            Mixkit: {
                host: 'mixkit.co',
                url: '/^\\/.+/',
                pager: {
                    nextL: 'a.pagination__link--next',
                    pageE: '.item-grid-item',
                    replaceE: '.pagination__wrapper',
                    scrollD: 2000
                }
            }, //              Mixkit
            _3dmgame: {
                host: 'www.3dmgame.com',
                url: ()=> {
                    if (getCSS('.Llist_b > div.lis')) {
                        curSite = DBSite._3dmgame_list;
                    } else if (getCSS('.newsleft > ul')) {
                        curSite = DBSite._3dmgame_list2;
                    } else if (indexOF('/resource')) {
                        curSite = DBSite._3dmgame_list3;
                    } else {
                        curSite = DBSite._3dmgame;
                    }},
                pager: {
                    type: 3,
                    nextL: 'li.next > a',
                    pageE: 'script[src*="common.js"], .news_warp_center > *',
                    insertP: ['.news_warp_center', 3],
                    replaceE: '.pagewrap',
                    scrollE: '.pagewrap',
                    scriptT: 2,
                    interval: 500,
                    scrollD: 500
                }
            }, //                3DM
            _3dmgame_list: {
                pager: {
                    nextL: 'li.next > a',
                    pageE: '.Llist_b > div.lis',
                    replaceE: '.pagewrap',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //           3DM - 分类页
            _3dmgame_list2: {
                pager: {
                    nextL: 'li.next > a',
                    pageE: '.newsleft > ul > li',
                    replaceE: '.pagewrap',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //          3DM - 游戏专区 - 分类页
            _3dmgame_list3: {
                pager: {
                    nextL: 'li.next > a',
                    pageE: '.item > ul',
                    insertP: ['.item > ul:last-child', 1],
                    replaceE: '.pagewrap',
                    scrollD: 800
                }
            }, //          3DM - 游戏专区 - 资源页
            _3dmgame_mod: {
                host: 'mod.3dmgame.com',
                pager: {
                    nextL: ()=> getNextEP('//li[@class="page-list active"]/following-sibling::li[contains(@class, "page-list")]/a', 'Page=', /Page=\d+/),
                    pageE: '//div[contains(@class, "game-mod-list") or contains(@class, "search-mod-list")] | //script[not(@src or @type)][contains(text(), ".game-mod-page") or contains(text(), ".search-mod-page")]',
                    insertP: ['//div[contains(@class, "game-mod-wrap") or contains(@class, "search-mod ")]', 3],
                    scriptT: 2,
                    scrollD: 1200
                }
            }, //            3DM MOD站
            ali213_www: {
                host: 'www.ali213.net',
                pager: {
                    type: 3,
                    nextL: '#after_this_page',
                    pageE: '#Content >*:not(.news_ding):not(.page_fenye)',
                    insertP: ['.page_fenye', 1],
                    replaceE: '.page_fenye',
                    scrollE: '.page_fenye',
                    interval: 500,
                    scrollD: 100
                }
            }, //              游侠网
            ali213_list: {
                host: 'down.ali213.net',
                url: ()=> {if (getCSS('.famous-ul > .famous-li')) {curSite = DBSite.ali213_list;}},
                pager: {
                    nextL: 'a.page-next',
                    pageE: '.famous-ul > .famous-li',
                    replaceE: '.page-container',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //             游侠网 - 分类页
            ali213_gl: {
                host: 'gl.ali213.net',
                style: '.n_show_b, a.morezjjump {display: none !important;}',
                pager: {
                    type: 3,
                    nextL: 'a.next',
                    pageE: '.c-detail > *',
                    insertP: ['.c-detail', 3],
                    replaceE: '.page_fenye',
                    scrollE: '.page_fenye',
                    interval: 500,
                    scrollD: 300
                }
            }, //               游侠网 - 攻略
            ali213_pic: {
                host: 'pic.ali213.net',
                style: 'a.prev, a.next {display: none !important;}',
                pager: {
                    nextL: 'a.next',
                    pageE: '#image-show > img',
                    replaceE: '#image-show > a',
                    scrollD: 1200
                }
            }, //              游侠网 - 图库
            gamersky_ent: {
                host: 'www.gamersky.com',
                url: ()=> {if (indexOF('/ent/')) {
                    curSite = DBSite.gamersky_ent;
                } else {
                    curSite = DBSite.gamersky_gl;
                    if (indexOF('/zl/') && indexOF('.shtml')) {curSite.pager.insertP = ['.pagecss', 1]; curSite.pager.scrollD = 400;}
                }},
                pager: {
                    type: 3,
                    nextL: '//div[@class="page_css"]/a[text()="下一页"]',
                    pageE: '.Mid2L_con > *:not(.gs_nc_editor):not(.pagecss):not(.page_css):not(.gs_ccs_solve):not(.post_ding)',
                    insertP: ['.page_css', 1],
                    replaceE: '.page_css',
                    scrollE: '.page_css',
                    interval: 500,
                    scrollD: 100
                }
            }, //            游民星空
            gamersky_gl: {
                pager: {
                    type: 3,
                    nextL: '//div[@class="page_css"]/a[text()="下一页"]',
                    pageE: '.Mid2L_con > *:not(.gs_nc_editor):not(.pagecss):not(.gs_ccs_solve):not(.post_ding)',
                    insertP: ['.gs_nc_editor', 1],
                    replaceE: '.page_css',
                    scrollE: '.page_css',
                    forceHTTPS: true,
                    interval: 500,
                    scrollD: 100
                },
                function: {
                    bF: pageElems => { // 插入前函数（移除下一页底部的 "更多相关内容请关注：xxx" 文字 + 加载图片）
                        pageElems.forEach(function (one) {if (one.tagName === 'P' && one.textContent.indexOf('更多相关内容请关注') > -1) {one.style.display = 'none';}});
                        return src_bF(pageElems, [0, 'img[data-src]', 'data-src'])
                    }
                }
            }, //             游民星空 - 攻略
            nexusmods: {
                host: 'www.nexusmods.com',
                url: ()=> {locationC = true; if (!(lp == '/' || indexOF(/\/mods\/\d+/))) {curSite = DBSite.nexusmods;}},
                history: false,
                pager: {
                    nextL: nexusmods_nextL,
                    pageE: 'ul.tiles > li',
                    replaceE: '.pagination',
                    scrollD: 4000
                },
                function: {
                    bF: nexusmods_bF
                }
            }, //               NexusMods
            curseforge: {
                host: 'www.curseforge.com',
                pager: {
                    nextL: '.pagination-next > a',
                    pageE: 'div.my-2',
                    replaceE: '.pagination',
                    scrollD: 2500
                }
            }, //              CurseForge
            steamcommunity_workshop: {
                host: 'steamcommunity.com',
                url: ()=> {if (indexOF('/workshop/browse')) {curSite = DBSite.steamcommunity_workshop;} else if (indexOF(/eventcomments\/\d/)) {curSite = DBSite.steamcommunity_eventcomments;}},
                pager: {
                    nextL: '//a[@class="pagebtn" and text()=">"]',
                    pageE: '.workshopBrowseItems > *',
                    replaceE: '.workshopBrowsePaging',
                    scriptT: 2,
                    scrollD: 1500
                }
            }, //      Steam 创意工坊 - 项目列表
            steamcommunity_eventcomments: {
                style: '.forum_paging_controls {display: none !important;}',
                pager: {
                    nextL: ()=> getNextUP('ctp=', /ctp=\d+/, location.pathname, '2', getCSS('span.commentthread_pagelinks > a:last-child').textContent),
                    pageE: '.commentthread_comments > .commentthread_comment',
                    replaceE: '.forum_paging .forum_paging_summary',
                    scriptT: 1,
                    scrollD: 1500
                }
            }, // Steam 社区 - 活动评论
            yikm: {
                host: 'www.yikm.net',
                pager: {
                    nextL: '//ul[@class="pager"]//a[text()="下一页"]',
                    pageE: '//h2[contains(text(), "所有游戏") or contains(text(), "搜索结果")]/following-sibling::div[1]/div',
                    replaceE: 'ul.pager',
                    scrollD: 1500
                }
            }, //                    小霸王其乐无穷
            switch520: {
                host: 'switch520.com',
                url: ()=> {if (!indexOF('.html')) {curSite = DBSite.switch520;}},
                pager: {
                    nextL: 'a.next',
                    pageE: '.row.posts-wrapper > div',
                    replaceE: 'ul.page-numbers',
                    scrollD: 1000
                }
            }, //               Switch520
            cs_rin_ru: {
                host: 'cs.rin.ru',
                url: ()=> {if (lp == '/forum/viewforum.php') {
                    curSite = DBSite.cs_rin_ru;
                } else if (lp == '/forum/search.php') {
                    curSite = DBSite.cs_rin_ru_search;
                    if (indexOF('sr=posts', 's')) curSite.pager.pageE = '#wrapcentre > form > table.tablebg > tbody > tr[class^="row"]'
                } else if (lp == '/forum/viewtopic.php' && GM_getValue('menu_thread')) {
                    curSite = DBSite.cs_rin_ru_list;
                }},
                pager: {
                    nextL: '//td[@class="gensmall"][@align="right"]//a[text()="Next"]',
                    pageE: '#pagecontent > table.tablebg > tbody > tr:not([align])',
                    replaceE: '#pagecontent > table:first-child',
                    scrollD: 1500
                },
                function: {
                    bF: pageElems => { // 插入前函数（过滤置顶帖子）
                        for (let i = 0; i < pageElems.length; i++) {if (pageElems[i].textContent.replace(/\n|	/g,'') === 'Topics') {pageElems.splice(0,i+1); break;}}
                        return pageElems
                    }
                }
            }, //               cs.rin.ru - 各版块帖子列表
            cs_rin_ru_list: {
                pager: {
                    nextL: 'id("pageheader")/p[@class="gensmall"]//a[text()="Next"]',
                    pageE: '#pagecontent > table.tablebg:not(:nth-last-child(2)):not(:nth-child(2))',
                    replaceE: '#pagecontent >table:not(.tablebg), #pageheader p.gensmall',
                    scrollD: 2000
                }
            }, //          cs.rin.ru - 帖子内
            cs_rin_ru_search: {
                pager: {
                    nextL: 'id("wrapcentre")/div[@class="nav"]//a[text()="Next"]',
                    pageE: '#wrapcentre > form > table.tablebg > tbody > tr[valign]',
                    replaceE: '#wrapcentre > div',
                    scrollD: 1500
                }
            }, //        cs.rin.ru - 搜索页
            crackhub: {
                host: 'crackhub.site',
                style: 'html.wp-dark-mode-active .inside-article {background-color: var(--wp-dark-mode-bg);}',
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: 'article[id^="post-"]',
                    replaceE: 'nav.paging-navigation',
                    scrollD: 2000
                }
            }, //                Crackhub213
            fitgirl: {
                host: 'fitgirl-repacks.site',
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: 'article[id^="post-"]',
                    replaceE: 'nav.paging-navigation',
                    scrollD: 2500
                }
            }, //                 FitGirl Repacks
            bilibili_search: {
                host: 'search.bilibili.com',
                url: ()=> {
                    locationC = true;
                    if (lp == '/all' || lp == '/video') {
                        curSite = DBSite.bilibili_search;
                    } else if (lp == '/article') {
                        curSite = DBSite.bilibili_search_article;
                    }
                },
                retry: 100,
                pager: {
                    nextL: bilibili_search_nextL,
                    pageE: '//ul[contains(@class, "video-list")]/li | //script[contains(text(), "window.__INITIAL_STATE__")]',
                    insertP: ['ul.video-list', 3],
                    replaceE: 'ul.pages',
                    scriptT: 2,
                    scrollD: 1000
                },
                function: {
                    bF: bilibili_search_bF,
                    aF: bilibili_search_aF
                }
            }, //         B 站(Bilibili) - 搜索页 - 视频
            bilibili_search_article: {
                retry: 100,
                pager: {
                    nextL: bilibili_search_nextL,
                    pageE: 'li.article-item',
                    replaceE: 'ul.pages',
                    //scriptT: 2,
                    scrollD: 1000
                }
            }, // B 站(Bilibili) - 搜索页 - 专栏
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
                url: ()=> {if (lp != '/' && !indexOF('.html')) {curSite = DBSite.novipnoad;}},
                pager: {
                    nextL: 'a.nextpostslink',
                    pageE: '.video-listing-content .row > div',
                    replaceE: '.wp-pagenavi',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //       NO视频
            ddrk: {
                host: ['ddrk.me', 'ddys.tv'],
                url: ()=> {if (lp == '/' || indexOF(/\/(category|tag)\//)) {curSite = DBSite.ddrk;}},
                pager: {
                    nextL: 'a.next',
                    pageE: '.post-box-list > article',
                    replaceE: '.pagination_wrap',
                    scrollD: 1500
                }
            }, //            低端影视
            nfmovies: {
                host: 'www.nfmovies.com',
                url: ()=> {if (lp == '/search.php' || indexOF('/list/')) {curSite = DBSite.nfmovies;}},
                pager: {
                    nextL: '//ul[contains(@class, "myui-page")]/li/a[text()="下一页"]',
                    pageE: 'ul.myui-vodlist > li',
                    replaceE: 'ul.myui-page',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [1, 'a[data-original]', 'data-original']
                }
            }, //        奈菲影视
            zxzj: {
                host: ['www.zxzj.me', 'www.zxzj.fun'],
                url: ()=> {if (lp != '/' && !indexOF('/detail/') && !indexOF('/video/')) {curSite = DBSite.zxzj;}},
                style: 'div.stui-page__all {display: none !important;}',
                pager: {
                    nextL: '//ul[contains(@class, "stui-page__item")]//a[text()="下一页"]',
                    pageE: 'ul.stui-vodlist > li',
                    replaceE: 'ul.stui-page__item',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [1, 'a[data-original]', 'data-original']
                }
            }, //            在线之家
            enlienli: {
                host: 'enlienli.com',
                url: ()=> {if (indexOF('/show/') || indexOF('/search')) {curSite = DBSite.enlienli;}},
                pager: {
                    nextL: 'a.page-number.page-next',
                    pageE: '.module-items > *',
                    replaceE: '#page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //        嗯哩嗯哩
            mjw91: {
                host: 'mjw91.com',
                url: ()=> {if (!indexOF('/video/') || !indexOF('/vplay/')) {curSite = DBSite.mjw91;}},
                pager: {
                    nextL: '.next-page > a',
                    pageE: '.m-movies > article',
                    replaceE: '.pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //           91 美剧网
            zhenbuka: {
                host: ['www.zhenbuka3.com', 'www.zhenbuka5.com'],
                url: ()=> {if (indexOF('/vodtype/')) {curSite = DBSite.zhenbuka;}},
                pager: {
                    nextL: '//ul[contains(@class, "stui-page")]/li/a[text()="下一页"]',
                    pageE: 'ul.stui-vodlist > li',
                    replaceE: 'ul.stui-page',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [1, 'a[data-original]', 'data-original']
                }
            }, //        真不卡影院
            zzzfun: {
                host: 'www.zzzfun.com',
                url: ()=> {
                    if (indexOF('/vod_type') || indexOF('/vod_show')) {
                        curSite = DBSite.zzzfun;
                    } else if (indexOF('/vod_search')) {
                        curSite = DBSite.zzzfun_search;
                    }},
                pager: {
                    nextL: '#page a[title="下一页"]',
                    pageE: 'ul.search-result > a',
                    replaceE: '#page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //        ZzzFun 动漫
            zzzfun_search: {
                pager: {
                    nextL: '#page a[title="下一页"]',
                    pageE: 'ul.show-list > li',
                    replaceE: '#page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, // ZzzFun 动漫 - 搜索页
            tucao: {
                host: 'www.tucao.one',
                url: ()=> {if (indexOF('/list/')) {
                    curSite = DBSite.tucao;
                } else if (indexOF('search', 's')) {
                    curSite = DBSite.tucao_search;
                }},
                pager: {
                    nextL: '.pagego a',
                    pageE: '.list > ul > li',
                    replaceE: '.newpages, .pagego, #float_show',
                    scrollD: 1000
                }
            }, //         吐槽弹幕网
            tucao_search: {
                pager: {
                    nextL: '//a[@class="a1"][contains(text(), "下一页")]',
                    pageE: '.search_list > *',
                    replaceE: '.pages',
                    scrollD: 1000
                }
            }, //  吐槽弹幕网 - 搜索页
            mandao: {
                host: 'www.mandao.tv',
                url: ()=> {if (lp != '/' && !indexOF('/man')) {
                    curSite = DBSite.mandao;
                }},
                pager: {
                    nextL: '//div[contains(@class, "page")]/a[text()=">"]',
                    pageE: '.index-tj > ul > li',
                    replaceE: '.page',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //        漫岛动漫
            yxdm: {
                host: 'www.yxdm.li',
                url: ()=> {if (indexOF('/search') || indexOF('/category') || indexOF('/resource')) {curSite = DBSite.yxdm;}},
                pager: {
                    nextL: '//a[@class="nextPage" or text()="下一页"]',
                    pageE: '.dhnew > ul > li',
                    replaceE: '.pagelist',
                    scrollD: 2000
                }
            }, //          怡萱动漫
            nicotv: {
                host: 'www.nicotv.me',
                url: ()=> {if (indexOF('/search') || indexOF('/type')) {curSite = DBSite.nicotv;}},
                pager: {
                    nextL: '//ul[contains(@class, "pagination ")]//a[text()="»"]',
                    pageE: 'ul.list-unstyled > li',
                    replaceE: 'ul.pagination ',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //        妮可动漫
            yhdm: {
                host: ['www.imomoe.la', 'www.imomoe.live'],
                url: ()=> {if (indexOF('/list/')) {
                    curSite = DBSite.yhdm;
                } else if (lp == '/so.asp' || lp == '/search.asp') {
                    curSite = DBSite.yhdm_;
                }},
                pager: {
                    nextL: '//div[@class="pages"]/a[text()="下一页"]',
                    pageE: '#contrainer > .img> ul > li',
                    replaceE: '.pages',
                    scrollD: 1000
                }
            }, //          樱花动漫
            yhdm_: {
                pager: {
                    nextL: '//div[@class="pages"]/a[text()="下一页"]',
                    pageE: '#contrainer .fire .pics > ul > li',
                    replaceE: '.pages',
                    scrollD: 1000
                }
            }, //         樱花动漫 - 搜索页等
            agefans: {
                host: ['www.agemys.com', 'www.age.tv'],
                url: ()=> {if (indexOF('/catalog/') || lp == '/search') {
                    curSite = DBSite.agefans;
                } else if (lp == '/recommend' || lp == '/update') {
                    curSite = DBSite.agefans_;
                } else if (lp == '/rank') {
                    curSite = DBSite.agefans_rank;
                }},
                pager: {
                    nextL: 'id("container")//div[@class="blockcontent"]/div[@style][not(@class)]/li/a[contains(text(), "下一页")]',
                    pageE: '#container .blockcontent1 > div',
                    replaceE: '#container .blockcontent > div[style]:not([class])',
                    scrollD: 1000
                }
            }, //       AGE 动漫 - 全部/搜索
            agefans_: {
                pager: {
                    nextL: 'id("container")//div[@class="blockcontent"]/div[@style][not(@class)]/li/a[contains(text(), "下一页")]',
                    pageE: '#container .blockcontent > ul > li',
                    replaceE: '#container .blockcontent > div[style]:not([class])',
                    scrollD: 1000
                }
            }, //      AGE 动漫 - 其他页
            agefans_rank: {
                pager: {
                    nextL: 'id("container")/ul[@style][not(@class)]/li/a[contains(text(), "下一页")]',
                    pageE: '#container > .div_right  .blockcontent.div_right_r_3 > ul',
                    replaceE: '#container > ul[style]:not([class])',
                    scrollD: 1000
                }
            }, //  AGE 动漫 - 排行榜
            dm233: {
                host: 'www.dm233.cc',
                url: ()=> {if (indexOF('/catalog/') || lp == '/recommend/' || lp == '/search') {
                    curSite = DBSite.dm233;
                } else if (lp == '/article/') {
                    curSite = DBSite.dm233_article;
                } else if (lp == '/rank/') {
                    curSite = DBSite.dm233_rank;
                }},
                pager: {
                    nextL: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageE: '.dhnew ul > li',
                    replaceE: '.pagelist',
                    scrollD: 1000
                }
            }, //         233 动漫
            dm233_article: {
                pager: {
                    nextL: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageE: '.xgyd ul > li',
                    replaceE: '.pagelist',
                    scrollD: 1000
                }
            }, // 233 动漫 - 动漫情报/资讯
            dm233_rank: {
                pager: {
                    nextL: '//div[@class="pagelist"]//a[contains(text(), "下一页") or contains(text(), "下一頁")]',
                    pageE: '.side-update.normal-wai > .normal-nei',
                    replaceE: '.pagelist',
                    scrollD: 1000
                }
            }, //    233 动漫 - 排行榜
            anime1: {
                host: 'anime1.me',
                url: ()=> {if (indexOF('s=', 's')) {curSite = DBSite.wp_nav_navigation;} else if (lp == '/') {curSite = DBSite.anime1;}},
                history: false,
                pager: {
                    type: 4,
                    nextL: ()=> { // 获取下一页内容（叠加）
                        let next = getCSS('a.paginate_button.next');
                        if (next && next.className.indexOf('disabled') === -1) {
                            let oldList = getCSS('#table-list > tbody').innerHTML;
                            if (oldList) {next.click(); pageNum.now = pageNum._now + 1; getCSS('#table-list > tbody').insertAdjacentHTML('afterbegin', oldList);}
                        }
                    },
                    interval: 500,
                    scrollD: 800
                }
            }, //        Anime1
            yinfans: {
                host: /www\.yinfans\./,
                style: '#post_container {height: auto !important;} #post_container > li {position: static !important; float: left !important; height: 620px !important;}',
                pager: {
                    nextL: 'a.next',
                    pageE: '#post_container > li',
                    replaceE: '.pagination',
                    scrollD: 1500
                }
            }, //         音范丝
            btbtt: {
                host: /btbtt/,
                pager: {
                    nextL: '//div[@class="page"]/a[contains(text(), "▶") or contains(text(), "下一页")]',
                    pageE: '#threadlist > *',
                    replaceE: '.page',
                    scrollD: 2000
                }
            }, //           BT 之家
            bdys: {
                host: 'www.bd2020.com',
                url: ()=> {if (lp != '/' && !indexOF(/\/\d+\.htm/)) {curSite = DBSite.bdys;}},
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
                url: ()=> {if (location.search != '' && !indexOF('p=', 's')) {curSite = DBSite.yyds;}},
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: '.list-grouped > div',
                    replaceE: 'nav.pagination',
                    scrollD: 1100
                }
            }, //            YYDS 电影
            kisssub: {
                host: ['www.kisssub.org','www.comicat.org', /(share|www)\.acgnx\./],
                pager: {
                    nextL: 'a.nextprev:last-of-type',
                    pageE: '#data_list > tr',
                    replaceE: '.pages',
                    scrollD: 2500
                }
            }, //       爱恋动漫 / 漫猫动漫 / 末日动漫
            dmhy: {
                host: ['share.dmhy.org', 'dmhy.anoneko.com'],
                pager: {
                    nextL: '//div[@class="nav_title"]/a[contains(text(), "下一")]',
                    pageE: '#topic_list > tbody > tr',
                    replaceE: '.nav_title',
                    scrollD: 1500
                },
                function: {
                    aF: ()=> {document.body.appendChild(document.createElement('script')).textContent = `$('#topic_list > tbody > tr:even:not(.even):not(.odd)').addClass('even'); $('#topic_list > tbody > tr:odd:not(.even):not(.odd)').addClass('odd');`;}
                }
            }, //          动漫花园
            futaacg: {
                host: /futaacg\./,
                pager: {
                    nextL: 'ul.pagination a[rel="next"]',
                    pageE: '.topic-list > div',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //       扶她动漫
            acg_rip: {
                host: 'acg.rip',
                pager: {
                    nextL: 'li.next>a',
                    pageE: 'table.post-index > tbody > tr',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //       ACG.RIP
            bangumi: {
                host: 'bangumi.moe',
                url: ()=> {if (indexOF('/lite')) {curSite = DBSite.bangumi_lite;} else {curSite = DBSite.bangumi;}},
                pager: {
                    type: 2,
                    nextL: '[torrent-list="lattorrents"] button[ng-click="loadMore()"] ,[torrent-list="torrents"] button[ng-click="loadMore()"]',
                    interval: 1000,
                    scrollD: 1500
                }
            }, //       萌番组
            bangumi_lite: {
                pager: {
                    nextL: '//section/a[./span[contains(@class, "next")]]',
                    pageE: 'li.torrent-li',
                    replaceE: '.page-btn-section',
                    scrollD: 2000
                }
            }, //  萌番组 lite
            miobt: {
                host: ['miobt.com', 'www.36dm.club'],
                url: ()=> {curSite = DBSite.miobt; if (location.hostname === 'www.36dm.club') {curSite.pager.scrollD = 1000;}},
                pager: {
                    nextL: '//a[@class="nextprev"][contains(text(), "〉") or contains(text(), "下一页") or contains(text(), "»")]',
                    pageE: '#data_list > tr',
                    replaceE: '.pages',
                    scrollD: 2000
                }
            }, //         MioBT + 简单动漫
            reimu: {
                host: /\.reimu\./,
                url: ()=> {if (lp == '/' || indexOF('/category') || indexOF('/tag')) curSite = DBSite.reimu},
                pager: {
                    nextL: 'span.current+a.sfwppa-current-page',
                    pageE: 'article[id^="post-"]',
                    replaceE: '.wp-pagenavi',
                    scrollD: 1500
                }
            }, //         REIMU
            hacg: {
                host: /\.hacg\./,
                url: ()=> {if (indexOF('/wp/') && !indexOF(/\d+\.html/)) curSite = DBSite.hacg},
                pager: {
                    nextL: 'a.nextpostslink',
                    pageE: 'article[id^="post-"]',
                    replaceE: '.wp-pagenavi',
                    scrollD: 1500
                }
            }, //          HACG
            nyaa: {
                host: /nyaa\.si/,
                pager: {
                    nextL: 'a[rel="next"], li.next > a',
                    pageE: 'table.torrent-list > tbody > tr',
                    replaceE: 'ul.pagination',
                    scrollD: 2000
                }
            }, //          Nyaa
            skrbt: {
                host: /skrbt/,
                url: ()=> {if (lp == '/search') curSite = DBSite.skrbt;},
                pager: {
                    nextL: ()=> { // 获取下一页地址
                        let page = getCSS('a[onclick][aria-label="Next"]');
                        if (page) {page = /(?<=\()\d+(?=\))/.exec(page.onclick)[0];} else {return '';} // 获取下一页页码
                        if (page) return getNextF('#search-form').replace(/p=\d+/,'p=' + page)
                        return '';
                    },
                    pageE: 'div[class="row"] > .col-md-6 > ul',
                    insertP: ['nav[aria-label*="Page"]', 1],
                    replaceE: 'ul.pagination',
                    scrollD: 900
                }
            }, //           SkrBT
            _1337x: {
                host: /1337x\./,
                url: ()=> {if (indexOF('search/')) {curSite = DBSite._1337x;}},
                pager: {
                    nextL: '//div[@class="pagination"]//a[text()=">>"]',
                    pageE: 'table.table-list > tbody > tr',
                    replaceE: '.pagination',
                    scrollD: 1200
                }
            }, //          1337x
            rarbg: {
                host: /rarbg/,
                url: ()=> {if (lp == '/torrents.php') {curSite = DBSite.rarbg; curSite.function.bF(getAllCSS('table.lista2t tr.lista2'));}},
                style: 'html::-webkit-scrollbar {height: 0 !important;}',
                pager: {
                    nextL: '#pager_links > a[title="next page"]',
                    pageE: 'table.lista2t tr.lista2',
                    replaceE: '#pager_links',
                    scrollD: 1200
                },
                function: {
                    bF: pageElems => { // 插入前函数（鼠标指向显示封面）
                        pageElems.forEach(function (one) {
                            one.querySelectorAll('td > a[onmouseover][onmouseout]').forEach(function (now) {
                                now.parentElement.parentElement.setAttribute('onmouseover', now.getAttribute('onmouseover')); now.removeAttribute('onmouseover');
                                now.parentElement.parentElement.setAttribute('onmouseout', now.getAttribute('onmouseout')); now.removeAttribute('onmouseout');
                            });
                        });
                        return pageElems
                    }
                }
            }, //           RARBG
            /*thepiratebay: {
                host: 'thepiratebay.org',
                url: ()=> {if (lp == '/search.php') {curSite = DBSite.thepiratebay;}},
                pager: {
                    type: 6,
                    nextL: 'center > b+a[href]',
                    pageE: 'ol#torrents > li[id]',
                    replaceE: 'center',
                    loadTime: 1000,
                    scrollD: 1500
                }
            },*/ //          thepiratebay
            subdh: {
                host: 'subdh.com',
                url: ()=> {if (lp == '/' || indexOF('/list/new')) {curSite = DBSite.subdh;} else if (indexOF('/search')) {curSite = DBSite.subdh_search;}},
                pager: {
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: '.col-lg-9 .bg-white.shadow-sm.rounded-3 > .row.gx-0',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //           SubDH
            subdh_search: {
                pager: {
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: '.col-lg-9 .bg-white.shadow-sm.rounded-3',
                    insertP: ['nav[aria-label="pagination"]', 1],
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //    SubDH - 搜索页
            mini4k: {
                host: 'www.mini4k.com',
                url: ()=> {if (indexOF('/forum') && !indexOF('/topic')) {curSite = DBSite.mini4k; curSite.pager.pageE = '#block-white-content tbody > tr'} else if (lp != '/' && !indexOF(/\/\d{3,}/)) {curSite = DBSite.mini4k;};},
                pager: {
                    nextL: 'a.pager__item--next',
                    pageE: 'div[class*="-item-list"] > ul > li',
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //          MINI4K
            bthaha: {
                host: /bthaha/,
                url: ()=> {if (indexOF('/search/')) {
                    curSite = DBSite.bthaha;
                    getAllCSS('[id^="list_top"], [id^="list_bottom"]').forEach(function (one) {one.parentElement.parentElement.hidden = true;});
                }},
                style: '[id^="list_top"], [id^="list_bottom"] {display: none !important;}',
                pager: {
                    nextL: '//ul[@class="pagination"]/li/a[contains(text(), "下一页")]',
                    pageE: 'table.table > tbody > tr',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                },
                function: {
                    bF: pageElems => { // 插入前函数（隐藏底部元素）
                        pageElems.forEach(function (one) {let now = one.querySelector('[id^="list_top"], [id^="list_bottom"]'); if (now) {one.hidden = true;};});
                        return pageElems
                    }
                }
            }, //          BTHaha
            a4k: {
                host: 'www.a4k.net',
                url: ()=> {if (!indexOF('/subtitle/')) {curSite = DBSite.a4k;};},
                pager: {
                    nextL: 'a.pager__item--next',
                    pageE: 'ul.list > li',
                    replaceE: '.pagination',
                    scrollD: 1000
                }
            }, //           A4k 字幕网（字幕）
            assrt: {
                host: 'assrt.net',
                url: ()=> {if (lp === '/sub/') {curSite = DBSite.assrt;} else if (indexOF('/list/')) {curSite = DBSite.assrt_list;}},
                pager: {
                    nextL: ()=> getNextEP('#pl-current+a[href]:not([id])', 'page=', /page=\d+/),
                    pageE: '.resultcard > div:not(#top-banner):not(#bottom-banner):not(.pagelinkcard)',
                    insertP: ['.pagelinkcard', 1],
                    replaceE: '.pagelinkcard',
                    scrollD: 1000
                }
            }, //         射手网（字幕）
            assrt_list: {
                pager: {
                    nextL: '//a[@id="pl-nav" and text()=">"]',
                    pageE: '#resultsdiv > .subitem:not([id])',
                    replaceE: '.pagelinkcard',
                    scrollD: 1000
                }
            }, //    射手网（字幕）
            subhd: {
                host: 'subhd.tv',
                url: ()=> {if (lp == '/forum/forum') {
                    curSite = DBSite.subhd_forum;
                } else if (lp != '/' && lp != '/zu' && !indexOF('/a/') && !indexOF('/d/') && !indexOF('/forum/')) {
                    curSite = DBSite.subhd;
                }},
                pager: {
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: '.bg-white.shadow-sm.rounded-3',
                    insertP: ['nav.clearfix', 1],
                    replaceE: 'nav.clearfix',
                    scrollD: 1000
                }
            }, //         SubHD（字幕）
            subhd_forum: {
                pager: {
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: '.bg-white.shadow-sm.rounded-3 > div',
                    replaceE: 'nav.clearfix',
                    scrollD: 800
                }
            }, //   SubHD - forum（字幕）
            manben: {
                host: 'www.manben.com',
                url: ()=> {if (indexOF(/\/m\d+/)) {
                    if (getCookie('showtype') != '2') {
                        document.cookie='showtype=2; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 开启 [垂直阅读] 模式
                        location.reload(); // 刷新网页
                    }
                    curSite = DBSite.mhxqiu;
                }}
            }, //            漫本
            haoman: {
                host: ['www.haoman6.com', 'www.g-lens.com'],
                url: ()=> {
                    if (indexOF('/chapter/')) {
                        curSite = DBSite.haoman;
                        if (location.hostname == 'www.g-lens.com') curSite.function.bFp = [0, 'img[data-echo]', 'data-echo']
                    } else if (indexOF('/comic/')) {
                        if (getCSS('.chapter__more')) getCSS('.chapter__more').click();
                    } else if (indexOF('/category/') || indexOF('/search')) {
                        curSite = DBSite.haoman_list;
                    }},
                style: '.rd-guess, .rd-aside, .page-index__btn {display: none !important;} .rd-article__pic {display: initial !important;} .rd-article__pic > img {margin: 0 auto;display: block;height: auto;min-height: 200px;}',
                pager: {
                    nextL: ()=> {if (getCSS('a.rd-aside__item.j-rd-next')) return location.origin + getCSS('a.rd-aside__item.j-rd-next').getAttribute('_href')},
                    pageE: '.rd-article-wr > div',
                    replaceE: 'a.last-crumb, .rd-aside',
                    interval: 2000,
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[dta-echo]', 'dta-echo']
                }
            }, //            好漫 6
            haoman_list: {
                pager: {
                    nextL: 'a.next',
                    pageE: '.cate-comic-list > div',
                    replaceE: '#Pagination',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //       好漫 6 - 分类/搜索页
            cartoonmad: {
                host: ['www.cartoonmad.com','www.cartoonmad.cc'],
                url: ()=> {if (indexOF('/comic/')) {
                    getCSS('body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child > a').href = 'javascript:void(0);'; // 清理图片上的链接
                    curSite = DBSite.cartoonmad;
                } else if (lp != '/') {
                    curSite = DBSite.cartoonmad_list;
                }},
                style: 'body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:not(:first-child) {display: none !important;} body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child img {max-width: 100%;height: auto;display: block !important;margin: 0 auto !important;}',
                pager: {
                    nextL: cartoonmad_nextL,
                    pageE: 'body > table > tbody > tr:nth-child(4) > td > table > tbody > tr:first-child > td:first-child img',
                    replaceE: 'body > table > tbody > tr:nth-child(2), body > table > tbody > tr:nth-child(5)',
                    scrollD: 2000
                }
            }, //        动漫狂
            cartoonmad_list: {
                pager: {
                    nextL: '//a[@class="pages"][contains(text(), "下一頁")]',
                    pageE: 'td[background="/image/content_box4.gif"]+td > table > tbody > tr',
                    replaceE: '//a[@class="pages"]/parent::td/parent::tr | //font[contains(text(), "目前在第")]',
                    scrollD: 1000
                }
            }, //   动漫狂 - 分类/搜索页
            dongman: {
                host: 'www.dongman.la',
                url: ()=> {if (indexOF('/chapter/')) {
                    src_bF(getAllCSS('img.mdui-img-fluid[data-srcset]:not([src])'), [0, 'img[data-srcset]', 'data-srcset']);
                    curSite = DBSite.dongman;
                } else if (indexOF('/detail/')) {
                    setTimeout(function(){getCSS('a#zhankai').click()}, 500)
                } else if (indexOF('/manhua/')) {
                    curSite = DBSite.dongman_list;
                }},
                style: 'button.prePic, button.nextPic, footer, header, #left-drawer {display: none !important;} body, #app {padding: 0 !important;} .slick-track {width: 100% !important;} .lazyBox {width: 100%; display: inline-block;}',
                pager: {
                    nextL: '//footer//a[./label[text()="下一章"]]',
                    pageE: '.lazyBox',
                    insertP: ['.slick-track', 3],
                    replaceE: 'footer',
                    scrollD: 3000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-srcset]', 'data-srcset']
                }
            }, //           动漫啦
            dongman_list: {
                pager: {
                    nextL: '//a[@class="GPageLink" and text()="下一页"]',
                    pageE: '.cy_list_mh > ul',
                    replaceE: '.NewPages',
                    scrollD: 2000
                }
            }, //      动漫啦 - 分类页
            manhuacat: {
                host: ['www.manhuacat.com', 'www.maofly.com'],
                url: ()=> {if (indexOF(/\/manga\/\d+\/.+\.html/)) {
                    if (getCookie('is_pull') == 'true') { // 强制关闭 [下拉] 模式
                        document.cookie='is_pull=false; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 关闭 [下拉] 模式
                        location.reload(); // 刷新网页
                    }
                    setTimeout(manhuacat_init, 100);
                    curSite = DBSite.manhuacat;
                } else if (indexOF('/list')) {
                    curSite = DBSite.manhuacat_list;
                } else if (indexOF('/search') || indexOF('/update')) {
                    curSite = DBSite.manhuacat_search;
                }},
                style: '#left, #right, #pull-load, .loading, .pagination, footer {display: none !important;} .img-content > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}', // 隐藏不需要的元素，调整图片
                pager: {
                    type: 4,
                    nextL: manhuacat_nextL,
                    insertP: ['.img-content', 3],
                    insertE: manhuacat_insertE,
                    replaceE: '.comic-detail > .breadcrumb-bar, .comic-detail >h2.h4, .vg-r-data, body > script:not([src])',
                    interval: 2000,
                    scrollD: 3000
                }
            }, //         漫画猫
            manhuacat_list: {
                pager: {
                    nextL: '//div[contains(@class, "pagination")]//a[contains(text(), "下一页") or contains(text(), "下页")]',
                    pageE: '.comic-main-section > *',
                    replaceE: '.pagination',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //    漫画猫 - 分类页
            manhuacat_search: {
                pager: {
                    nextL: '//div[contains(@class, "pagination")]//a[contains(text(), "下一页") or contains(text(), "下页")]',
                    pageE: '.comic-main-section .row > div',
                    replaceE: '.pagination',
                    scrollD: 1000
                }
            }, //  漫画猫 - 搜索页
            manhuatai: {
                host: 'www.manhuatai.net',
                url: ()=> {if (indexOF('/manhua/')) {
                    curSite = DBSite.manhuatai;
                } else if (indexOF('/fenlei_') || indexOF('/top_')) {
                    curSite = DBSite.manhuatai_list;
                } else if (indexOF('/search')) {
                    curSite = DBSite.manhuatai_search;
                }},
                pager: {
                    nextL: '//div[contains(@class, "page")]//a[@href][contains(text(), "下一页") or contains(text(), "下一章")]',
                    pageE: '#htmlContent p.img > img',
                    replaceE: '.page, .title',
                    scrollD: 2000
                }
            }, //         漫画台
            manhuatai_list: {
                pager: {
                    nextL: '#pagelink a.next',
                    pageE: '.article-list',
                    replaceE: '#pagelink',
                    scrollD: 1500
                }
            }, //    漫画台 - 分类页
            manhuatai_search: {
                pager: {
                    nextL: '#pagelink a.next',
                    pageE: '#content > table > tbody > tr:not([align])',
                    replaceE: '#pagelink',
                    scrollD: 1500
                }
            }, //  漫画台 - 搜索页
            manhuapi: {
                host: 'www.manhuapi.com',
                url: ()=> {if (indexOF('/chapter/')) {
                    curSite = DBSite.manhuapi;
                } else if (!indexOF(/\/manhua\/\d+\.html/)) {
                    curSite = DBSite.manhuapi_list;
                }},
                pager: {
                    nextL: '//div[@class="page"]/a[text()="下一页" or text()="下一章"]',
                    pageE: '.mh_list img[src]',
                    replaceE: '.page',
                    scrollD: 2000
                }
            }, //          漫画皮
            manhuapi_list: {
                pager: {
                    nextL: '//div[@class="pages"]/a[text()="下一页"]',
                    pageE: '.cy_list_mh > ul',
                    replaceE: '.pages',
                    scrollD: 1500
                }
            }, //     漫画皮 - 分类页
            imanhuaw: {
                host: ['www.imanhuaw.net', 'www.imanhuaw.com', 'www.ccshwy.com'],
                url: ()=> {
                    if (getCSS('.mh-search-result')) {
                        curSite = DBSite.imanhuaw_list;
                    } else if (getCSS('a#zhankai')) {
                        getCSS('a#zhankai').click();
                    } else if (indexOF(/\/\d{3,}\.html/)) {
                        curSite = DBSite.imanhuaw; imanhuaw_init();
                    }
                },
                style: '#sider-left, #sider-right, .main-left, .main-right, .w996.tc, .title > span {display: none !important;} #qTcms_Pic_middle img {max-width: 110%;height: auto;}',
                pager: {
                    type: 4,
                    nextL: imanhuaw_nextL,
                    insertP: ['#qTcms_Pic_middle img:last-of-type', 4],
                    insertE: imanhuaw_insertE,
                    replaceE: '.title h2',
                    interval: 2000,
                    scrollD: 3000
                }
            }, //          爱漫画 + 188漫画网
            imanhuaw_list: {
                pager: {
                    nextL: '//div[@class="NewPages"]//a[text()="下一页"]',
                    pageE: 'ul.mh-search-list > li',
                    replaceE: '.NewPages',
                    scrollD: 1500
                }
            }, //     爱漫画 - 分类页
            manhuagui: {
                host: ['www.mhgui.com', 'tw.mhgui.com', 'www.manhuagui.com', 'tw.manhuagui.com'],
                url: ()=> {if (indexOF(/\/comic\/\d+\/\d+\.html/)) {
                    if (!getXpath('//li[@class="pfunc"]/a[@class="current"][text()="双击" or text()="雙擊"]')) getXpath('//li[@class="pfunc"]/a[text()="双击" or text()="雙擊"]').click();
                    pausePage = false;
                    setTimeout(manhuagui_init, 100);
                    curSite = DBSite.manhuagui;
                } else if (indexOF('list/') || indexOF('/s/')) {
                    curSite = DBSite.manhuagui_list;
                }},
                style: '.sub-btn, .tc {display: none !important;} #mangaBox > img {width: auto !important;height: auto !important;display: block !important;margin: 0 auto !important;max-width: 100% !important;}',
                pager: {
                    type: 4,
                    nextL: manhuagui_nextL,
                    pageE: 'body > script:not([src])',
                    insertP: ['#mangaBox', 3],
                    insertE: manhuagui_insertE,
                    replaceE: 'title',
                    interval: 4000,
                    scrollD: 2500
                }
            }, //         漫画柜
            manhuagui_list: {
                pager: {
                    nextL: '//div[@class="pager"]/a[text()="下一页" or text()="下一頁"]',
                    pageE: '.book-result > ul > li, .book-list > ul > li',
                    insertP: ['.book-result > ul, .book-list > ul', 3],
                    replaceE: '.pager',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //    漫画台 - 分类/搜索页
            _36manga: {
                host: ['36manga.com', 'www.36manga.com', '36manhua.com', 'www.36manhua.com'],
                url: ()=> {if (indexOF(/\/manhua\/.+\/\d+\.html/)) {
                    if (localStorage.getItem('chapterScroll') != '"pagination"') {
                        localStorage.setItem('chapterScroll', '"pagination"'); location.reload()
                    } else {
                        pausePage = false;
                        setTimeout(_36manga_init, 100);
                        curSite = DBSite._36manga;
                    }
                } else if (indexOF('list/') || indexOF('/search/')) {
                    curSite = DBSite._36manga_list;
                }},
                style: '#sider-left, #sider-right, p.img_info, .tc, .chapter-view + .w996 {display: none !important;} #images > img {width: auto !important;height: auto !important;display: block !important;margin: 0 auto !important;max-width: 100% !important;}',
                pager: {
                    type: 4,
                    nextL: _36manga_nextL,
                    pageE: '//body/script[contains(text(), "chapterImages")]',
                    insertP: ['#images', 3],
                    insertE: _36manga_insertE,
                    replaceE: '.title',
                    interval: 4000,
                    scrollD: 2500
                }
            }, //          36漫画
            _36manga_list: {
                pager: {
                    nextL: 'ul.pagination li.next a',
                    pageE: '#contList',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //     36漫画 - 分类/搜索页
            manhuadb: {
                host: 'www.manhuadb.com',
                url: ()=> {if (indexOF(/\/manhua\/\d+\/.+\.html/)) {
                    if (getCSS('img.img-fluid.show-pic')) getCSS('img.img-fluid.show-pic').style.display = 'none'; // 隐藏第一个图片（避免重复）
                    setTimeout(manhuadb_init, 100);
                    curSite = DBSite.manhuadb;
                } else if (indexOF('/list')) {
                    curSite = DBSite.manhuacat_list;
                } else if (indexOF('/search') || indexOF('/update')) {
                    curSite = DBSite.manhuacat_search;
                }},
                style: '.row.m-0.pt-3.ad_2_wrap, .row.m-0.ad_1_wrap, .pagination.justify-content-center, #left, #right {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: manhuadb_nextL,
                    pageE: 'body > script:not([type]):not([src]), .vg-r-data, ol.links-of-books.num_div',
                    insertP: ['.pjax-container', 3],
                    insertE: manhuadb_insertE,
                    interval: 5000,
                    scrollD: 3000
                }
            }, //          漫画 DB
            hicomic: {
                host: 'www.hicomic.net',
                url: ()=> {if (indexOF('/chapters/')) {
                    setTimeout(hicomic_init, 100);
                    curSite = DBSite.hicomic;
                }},
                style: '.content {height: auto !important;} .footer, .left_cursor, .right_cursor, .finish {display: none !important;} .content > img {display: block !important;margin: 0 auto !important;}',
                pager: {
                    type: 4,
                    nextL: hicomic_nextL,
                    insertP: ['.content', 3],
                    insertE: hicomic_insertE,
                    interval: 5000,
                    scrollD: 3000
                }
            }, //           HiComic (嗨漫画)
            dmzj: {
                host: 'www.dmzj.com',
                url: ()=> {if (indexOF('/view/')) {
                    if (getCookie('display_mode') != '1') { // 强制开启 [上下滚动阅读] 模式
                        document.cookie='display_mode=1; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 开启 [上下滚动阅读] 模式
                        location.reload(); // 刷新网页
                    }
                    setTimeout(function() {dmzj_init('.comic_wraCon > a > img')}, 100);
                    curSite = DBSite.dmzj;
                } else if (indexOF('/category') || indexOF('/update')) {
                    curSite = DBSite.dmzj_list;
                } else if (indexOF('/rank')) {
                    curSite = DBSite.dmzj_rank;
                }},
                style: 'p.mh_curr_page, .btmBtnBox, .float_code, #floatCode {display: none !important;} .comic_wraCon > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}', // 隐藏中间的页数信息
                pager: {
                    type: 4,
                    nextL: 'span.next > a',
                    insertP: ['.comic_wraCon', 3],
                    insertE: dmzj_insertE,
                    replaceE: '.wrap_last_mid, .wrap_last_head',
                    interval: 2000,
                    scrollD: 3000
                }
            }, //              动漫之家 - 原创
            dmzj_list: {
                style: '.wrap_mhlist_l.con_left, .wrap_list {height: auto!important;}',
                pager: {
                    nextL: 'a.pg_next',
                    pageE: 'ul.list_con_li > li',
                    replaceE: '.page',
                    scrollD: 1000
                }
            }, //         动漫之家 - 原创 - 分类页
            dmzj_rank: {
                style: '.wrap_mhlist_l.con_left {height: auto!important;}',
                pager: {
                    nextL: 'a.pg_next',
                    pageE: '.ph_r_con_li > div:not(.ad_column)',
                    replaceE: '.page',
                    scrollD: 1000
                }
            }, //         动漫之家 - 原创 - 排行榜
            dmzj_manhua: {
                host: 'manhua.dmzj.com',
                url: ()=> {if (indexOF(/\/\d+\.shtml/)) {
                    let chapterScroll = getCSS('#qiehuan_txt') // 强制为 [上下滚动阅读] 模式
                    if (chapterScroll && chapterScroll.textContent === '切换到上下滚动阅读') {chapterScroll.click();}
                    setTimeout(function() {dmzj_init('#center_box > .inner_img img[src]')}, 100);
                    curSite = DBSite.dmzj_manhua;
                    /*} else if (indexOF('/tags/')) {
                    curSite = DBSite.dmzj_manhua_list;*/
                } else if (indexOF('/update')) {
                    curSite = DBSite.dmzj_manhua_update;
                }},
                style: 'p.curr_page, .btmBtnBox, .float_code, #floatCode {display: none !important;} #center_box > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}', // 隐藏中间的页数信息
                pager: {
                    type: 4,
                    nextL: '#next_chapter',
                    insertP: ['#center_box', 3],
                    insertE: dmzj_manhua_insertE,
                    replaceE: '.display_graybg',
                    interval: 2000,
                    scrollD: 3000
                }
            }, //       动漫之家 - 日漫
            /*dmzj_manhua_list: {
                pager: {
                    nextL: ()=> getNextUPN(/(?<=-)\d+(?=\.shtml)/, /-\d+\.shtml/, '-', '.shtml', '2', getCSS('#topage > option:last-child').value),
                    pageE: '#search_list_div ul',
                    scrollD: 1500
                }
            },*/ //  动漫之家 - 日漫 - 分类页
            dmzj_manhua_update: {
                pager: {
                    nextL: '//div[@class="pages"]/a[contains(text(), "下一页")]',
                    pageE: '.newpic_content > *:not(.pages)',
                    replaceE: '.pages',
                    scrollD: 1000
                }
            }, //动漫之家 - 日漫 - 最新更新
            acgn: {
                host: 'comic.acgn.cc',
                url: ()=> {
                    if (indexOF('/view-')) {
                        curSite = DBSite.acgn;
                        acgn_aF();
                    } else if (indexOF('/cate-') || indexOF('/pinyin-')) {
                        curSite = DBSite.acgn_list;
                    }
                },
                style: '.img1 {cursor: initial !important;}',
                pager: {
                    nextL: '#next_chapter',
                    pageE: '.pic[_src]',
                    replaceE: '[class^="display_"]',
                    interval: 2000,
                    scrollD: 2000
                },
                function: {
                    aF: acgn_aF
                }
            }, //              动漫戏说
            acgn_list: {
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: 'ul#display > li',
                    replaceE: '#pagination',
                    scrollD: 1000
                }
            }, //         动漫戏说 - 分类页
            ykmh: {
                host: 'www.ykmh.com',
                url: ()=> {if (indexOF(/\/\d+\.html/)) {
                    let chapterScroll = getCSS('#qiehuan_txt') // 强制为 [上下滚动阅读] 模式
                    if (localStorage.getItem('chapterScroll') != '"scroll"') {
                        localStorage.setItem('chapterScroll', '"scroll"'); location.reload()
                    } else {
                        setTimeout(ykmh_init, 100);
                        curSite = DBSite.ykmh;
                    }
                } else if (indexOF('/list') || indexOF('/search')) {
                    curSite = DBSite.ykmh_list;
                }},
                style: 'p.img_info {display: none !important;} #images > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}',
                pager: {
                    type: 4,
                    nextL: ykmh_nextL,
                    insertP: ['#images', 3],
                    insertE: ykmh_insertE,
                    replaceE: '.head_title, span.head_wz',
                    interval: 2000,
                    scrollD: 3000
                }
            }, //              优酷漫画
            ykmh_list: {
                pager: {
                    nextL: 'li.next > a',
                    pageE: 'li.list-comic',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //         优酷漫画 - 分类页
            copymanga: {
                host: /copymanga\./,
                url: ()=> {if (indexOF('/chapter/')) {
                    curSite = DBSite.copymanga;
                } else if (indexOF('/comics')) {
                    curSite = DBSite.copymanga_list;
                }},
                style: '.upMember, .comicContainerAds, .footer {display: none !important;} body, html {height: auto !important;}',
                iframe: true,
                pager: {
                    type: 5,
                    nextL: '.comicContent-next > a',
                    style: 'h4.header, h4.header +div[style*="fixed"] {display: none !important;}',
                    scrollD: 3000
                }
            }, //         拷贝漫画
            copymanga_list: {
                pager: {
                    nextL: 'li.next > a',
                    pageE: '.exemptComic-box > div',
                    replaceE: 'ul.page-all',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //    拷贝漫画 - 分类页
            mhxqiu: {
                host: /\.mhxqiu/,
                url: ()=> {if (indexOF(/\/\d+\.html/)) { // 阅读页
                    curSite = DBSite.mhxqiu;
                } else if (indexOF(/\/\d+\/$/)) { // 目录页
                    setTimeout(function(){if (getCSS('#zhankai')) getCSS('#zhankai').click();}, 500)
                } else if (indexOF(/\/(sort|rank)\//)) { // 分类页
                    curSite = DBSite.mhxqiu_list;
                }},
                style: '.imgFloat_1, .imgFloat_2, .main_control, span.comic-ft {display: none !important;} html, body, #mainView {height: auto !important;} body.view .main ul.comic-contain li{margin:0 auto !important;} .comic-contain .loaded{box-shadow: none !important;}',
                pager: {
                    type: 4,
                    nextL: '#mainControlNext',
                    insertP: ['#comicContain', 3],
                    insertE: mhxqiu_insertE,
                    replaceE: '.main_control, h1.chaptername_title, span.title-comicHeading',
                    interval: 4000,
                    scrollD: 3000
                }
            }, //            漫画星球
            mhxqiu_list: {
                pager: {
                    nextL: '//div[@class="NewPages"]//a[contains(text(), "下一页")]',
                    pageE: '.cy_list_mh > ul',
                    replaceE: '.NewPages',
                    scrollD: 1000
                }
            }, //       漫画星球 - 分类页
            fffdm: {
                host: 'manhua.fffdm.com',
                url: ()=> {if (location.pathname.split('/').length === 4) {curSite = DBSite.fffdm;}},
                style: '#footer, #header {display: none !important;} #mhimg0 img {display: block !important;margin: 0 auto !important;}',
                pager: {
                    type: 4,
                    nextL: '//a[contains(text(), "下一页") or contains(text(), "下一頁") or contains(text(), "下一话") or contains(text(), "下一話")]',
                    insertP: ['#mhimg0', 3],
                    insertE: fffdm_insertE,
                    replaceE: '.navigation, #weizhi, h1',
                    scrollD: 2000
                }
            }, //             风之动漫
            baozimh: {
                host: ['www.webmota.com', 'cn.webmota.com', 'cn.baozimh.com'],
                url: ()=> {
                    if (indexOF('/chapter/')) {
                        curSite = DBSite.baozimh;
                    } else if (indexOF('/comic/')) {
                        if (getCSS('#button_show_all_chatper')) getCSS('#button_show_all_chatper').click();
                    }},
                style: '#footer, #header {display: none !important;} .header, .bottom-bar {opacity: 0.3;}',
                pager: {
                    nextL: '.next_chapter > a',
                    pageE: '.comic-contain > amp-img',
                    replaceE: '.next_chapter, .bottom-bar, .header .title',
                    scrollD: 2000
                }
            }, //           包子漫画
            leyuman: {
                host: 'www.leyuman.com',
                url: ()=> {if (indexOF(/\/comic\/\d+\/\d+\.html/)) {
                    curSite = DBSite.leyuman;
                    setTimeout(leyuman_init, 100);
                } else if (indexOF(/\/comic\/\d+\.html/)) {
                    setTimeout(function(){if (getCSS('#read-more')) getCSS('#read-more').click();}, 500)
                } else {
                    curSite = DBSite.leyuman_list;
                }},
                style: '.mh_select, .mh_comicpic > p, mh_headpager {display: none !important;} .mh_comicpic > img{width: 100% !important; height: auto !important;}',
                pager: {
                    type: 4,
                    nextL: '#xurl',
                    insertP: ['.mh_comicpic', 3],
                    insertE: leyuman_insertE,
                    replaceE: '.mh_headpager, .mh_readtitle',
                    interval: 3000,
                    scrollD: 3000
                }
            }, //           乐语漫画
            leyuman_list: {
                pager: {
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: '.works_recommend.classification_works > ul',
                    replaceE: '.paging',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //      乐语漫画 - 分类页
            _77mh: {
                host: 'www.77mh.cc',
                url: ()=> {if (indexOF(/\/\d+\.html/)) {
                    curSite = DBSite._77mh;
                    setTimeout(_77mh_init, 100);
                } else if (indexOF('/colist_')) {
                    setTimeout(function(){if (getCSS('#listmore1, .listmore')) getCSS('#listmore1, .listmore').click();}, 500)
                } else {
                    curSite = DBSite._77mh_list;
                }},
                style: '.page_num, #bdtopbot {display: none !important;} #comicImg > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}',
                pager: {
                    type: 4,
                    nextL: _77mh_nextL,
                    insertP: ['#comicImg', 3],
                    insertE: _77mh_insertE,
                    interval: 3000,
                    scrollD: 2000
                }
            }, //             新新漫画
            _77mh_list: {
                pager: {
                    nextL: '//div[@class="pages_s"]/a[text()="下一页"]',
                    pageE: '.ar_list_co > ul > li',
                    replaceE: '.pages_s',
                    scrollD: 1000
                }
            }, //        新新漫画 - 分类页
            _77mh_search: {
                host: 'so.77mh.cc',
                pager: {
                    nextL: 'a.next',
                    pageE: '.ar_list_co > ul > dl',
                    replaceE: '.pages_s',
                    scrollD: 1000
                }
            }, //      新新漫画 - 搜索页
            gufengmh: {
                host: /gufengmh/,
                url: ()=> {if (indexOF(/\/\d+.+\.html/)) {
                    let chapterScroll = getCSS('#chapter-scroll') // 强制为 [下拉阅读] 模式
                    if (chapterScroll && chapterScroll.className === '') {chapterScroll.click();}
                    curSite = DBSite.gufengmh;
                } else if (indexOF(/\/(update|list|search)/)) {
                    curSite = DBSite.gufengmh_list;
                }},
                style: 'p.img_info {display: none !important;}', // 隐藏中间的页数信息
                pager: {
                    type: 4,
                    nextL: gufengmh_nextL,
                    pageE: 'body > script:first-child',
                    insertP: ['#images', 3],
                    insertE: gufengmh_insertE,
                    interval: 5000,
                    scrollD: 4000
                }
            }, //          古风漫画网
            gufengmh_list: {
                pager: {
                    nextL: 'li.next > a',
                    pageE: 'ul.book-list > li',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //     古风漫画网 - 分类页
            szcdmj: {
                host: 'www.szcdmj.com',
                url: ()=> {
                    if (indexOF('/szcchapter/')) {
                        curSite = DBSite.szcdmj;
                    } else if (indexOF('/szcbook/')) {
                        if (getCSS('#detail-list-more')) getCSS('#detail-list-more').click();
                    } else if (lp == '/szcbolist' || lp == '/update') {
                        curSite = DBSite.szcdmj_list;
                    }},
                style: '.header {opacity: 0.3 !important;}',
                pager: {
                    nextL: '//div[@class="fanye"][1]/a[@href][text()="下一页" or text()="下一话"]',
                    pageE: '.comicpage > div',
                    insertP: ['.comicpage', 3],
                    replaceE: '.fanye,h1.title',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //            砂之船动漫家
            szcdmj_list: {
                pager: {
                    nextL: '#nextPage',
                    pageE: 'ul.mh-list > li',
                    replaceE: '.pagination',
                    scrollD: 1000
                }
            }, //       砂之船动漫家 - 分类/搜索页
            mangabz: {
                host: ['mangabz.com', 'www.mangabz.com'],
                url: ()=> {if (indexOF(/\/m\d+/)) {
                    setTimeout(mangabz_init, 1500);
                    curSite = DBSite.mangabz;
                } else if (indexOF(/\/\d+bz\//)) {
                    if (getCSS('.detail-list-form-more')) getCSS('.detail-list-form-more').click();
                } else if (indexOF('/manga-list') || lp == '/search') {
                    curSite = DBSite.mangabz_list;
                }},
                style: 'body > .container > div:not([id]) {display: none !important;} .top-bar {opacity: 0.3 !important;} #cp_img > img{display: block !important;margin: 0 auto !important; max-width: 99% !important; width: auto !important; height: auto !important;}',
                pager: {
                    type: 4,
                    nextL: mangabz_nextL,
                    insertP: ['#cp_img', 3],
                    insertE: mangabz_insertE,
                    replaceE: 'p.top-title, body > .container > div:not([id])',
                    interval: 500,
                    scrollD: 2000
                }
            }, //           Mangabz 漫画
            mangabz_list: {
                pager: {
                    nextL: '//div[contains(@class,"page-pagination")]//a[contains(text(), ">")]',
                    pageE: 'ul.mh-list > li',
                    replaceE: '.page-pagination',
                    scrollD: 800
                }
            }, //      Mangabz 漫画 - 分类/搜索页
            dm5: {
                host: 'www.dm5.com',
                url: ()=> {if (indexOF(/\/m\d+/)) {
                    setTimeout(mangabz_init, 1500);
                    curSite = DBSite.dm5;
                } else if (indexOF('/manga-list') || lp == '/search' || getCSS('.box-body > ul.mh-list > li')) {
                    curSite = DBSite.mangabz_list;
                } else if (getCSS('.detail-more')) {
                    getCSS('.detail-more').click();
                }},
                style: '.view-paging > .container, .view-comment {display: none !important;} .rightToolBar {opacity: 0.3 !important;} #cp_img > img{display: block !important;margin: 0 auto !important; max-width: 99% !important; width: auto !important; height: auto !important;} body {overflow: auto !important;}',
                pager: {
                    type: 4,
                    nextL: dm5_nextL,
                    insertP: ['#cp_img', 3],
                    insertE: dm5_insertE,
                    replaceE: '.view-paging > .container, .rightToolBar',
                    interval: 500,
                    scrollD: 2000
                }
            }, //               动漫屋
            xmanhua: {
                host: ['xmanhua.com', 'www.xmanhua.com'],
                url: ()=> {if (indexOF(/\/m\d+/)) {
                    setTimeout(mangabz_init, 1500);
                    curSite = DBSite.xmanhua;
                } else if (indexOF(/\/\d+xm\//)) {
                    if (getCSS('.detail-list-form-more')) getCSS('.detail-list-form-more').click();
                } else if (indexOF('/manga-list') || lp == '/search') {
                    curSite = DBSite.xmanhua_list;
                }},
                style: 'a.reader-bottom-page {display: none !important;} .header, .reader-bottom {opacity: 0.3 !important;} #cp_img > img{display: block !important;margin: 0 auto !important; max-width: 99% !important; width: auto !important; height: auto !important;}',
                hiddenPN: true,
                pager: {
                    type: 4,
                    nextL: xmanhua_nextL,
                    insertP: ['#cp_img', 3],
                    insertE: xmanhua_insertE,
                    replaceE: '.reader-title, body > .container > div:not([id])',
                    interval: 500,
                    scrollD: 2500
                }
            }, //           Xmanhua 漫画
            xmanhua_list: {
                pager: {
                    nextL: '//div[@class="page-pagination"]//a[contains(text(), ">")]',
                    pageE: 'ul.mh-list > li',
                    replaceE: '.page-pagination',
                    scrollD: 1000
                }
            }, //      Xmanhua 漫画 - 分类/搜索页
            cocomanga: {
                host: 'www.cocomanga.com',
                url: ()=> {if (indexOF('.html')) {
                    if (!(getCookie('mh_readmode') === '' || getCookie('mh_readmode') === '3')) {
                        document.cookie='mh_readmode=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; // 强制开启自带的无缝翻页功能
                        location.reload(); // 刷新网页
                    }
                    setTimeout(cocomanga_init, 500);
                    curSite = DBSite.cocomanga;
                } else if (indexOF(/\/\d+\/$/)) {
                    setTimeout(function(){if (getCSS('a.website-display-all')) getCSS('a.website-display-all').click();}, 300)
                } else if (lp == '/show') {
                    curSite = DBSite.cocomanga_list;
                } else if (lp == '/search') {
                    curSite = DBSite.cocomanga_search;
                }},
                style: '.mh_readend, .mh_footpager, .mh_readmode {display: none !important;} .mh_comicpic img {cursor: unset !important;} .mh_comicpic img {min-height: 150px;}',
                pager: {
                    type: 4,
                    nextL: '//a[contains(@class, "read_page_link") and contains(string(), "下一章")][not(contains(@href, "javascript"))]',
                    insertP: ['#mangalist', 3],
                    insertE: cocomanga_insertE,
                    replaceE: '.mh_readtitle, .mh_headpager > a.mh_prevbook, .mh_readend',
                    interval: 1000,
                    scrollD: 2500
                }
            }, //         COCOMANGA 漫画
            cocomanga_list: {
                pager: {
                    nextL: ()=> getNextEP('.fed-page-info a.fed-btns-green+a[onclick]', 'page=', /page=\d+/),
                    pageE: 'ul.fed-list-info > li',
                    replaceE: '.fed-page-info',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [1, 'a[data-original]', 'data-original']
                }
            }, //    COCOMANGA 漫画 - 分类页
            cocomanga_search: {
                pager: {
                    nextL: ()=> getNextEP('.fed-page-info a.fed-btns-green+a[onclick]', 'page=', /page=\d+/),
                    pageE: 'dl.fed-deta-info',
                    replaceE: '.fed-page-info',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [1, 'a[data-original]', 'data-original']
                }
            }, //  COCOMANGA 漫画 - 搜索页
            qidian: {
                host: 'www.qidian.com',
                url: ()=> {if (indexOF('/all/')) {curSite = DBSite.qidian;}},
                pager: {
                    nextL: 'a[class*="pagination-next"]',
                    pageE: 'ul.all-img-list > li',
                    replaceE: '#page-container',
                    scrollD: 900
                }
            }, //                起点中文
            qidian_read: {
                host: 'read.qidian.com',
                style: '.admire-wrap {display: none !important;}',
                pager: {
                    nextL: 'a[id$="chapterNext"]',
                    pageE: '.main-text-wrap > div:not(.admire-wrap)',
                    replaceE: '.chapter-control',
                    scrollD: 900
                }
            }, //           起点中文 - 阅读页
            qimao: {
                host: 'www.qimao.com',
                url: ()=> {if (indexOF(/\/shuku\/\d+-\d+\//) || indexOF('/reader/index/')) {curSite = DBSite.qimao;}},
                pager: {
                    nextL: '//div[@class="reader-footer"]/a[text()="下一章"]',
                    pageE: '.article > p',
                    replaceE: '.reader-footer',
                    scrollD: 900
                }
            }, //                 七猫中文
            zxcs: {
                host: 'zxcs.me',
                url: ()=> {if (indexOF('/sort/')) curSite = DBSite.zxcs;},
                pager: {
                    nextL: '#pagenavi > span+a',
                    pageE: 'dl[id="plist"]',
                    replaceE: '#pagenavi',
                    scrollD: 900
                }
            }, //                  知轩藏书
            baoshuu: {
                host: 'www.baoshuu.com',
                url: ()=> {if (indexOF('/TXT/list')) curSite = DBSite.baoshuu;},
                pager: {
                    nextL: '//div[@class="listl2"]//a[text()="下一页"]',
                    pageE: '.listl2 > ul > li',
                    replaceE: '.listl2 > dl',
                    scrollD: 900
                }
            }, //               宝书网
            baoshuu_m: {
                host: 'm.baoshuu.com',
                url: ()=> {if (indexOF('/TXT/list')) curSite = DBSite.baoshuu_m;},
                pager: {
                    nextL: '//div[@class="man_first"]//a[text()="下一页"]',
                    pageE: '.man_first > ul > li',
                    replaceE: '.man_first > dl',
                    scrollD: 900
                }
            }, //             宝书网- 手机版
            yushubo: {
                host: 'www.yushubo.com',
                url: ()=> {if (indexOF('/read_')) {
                    curSite = DBSite.yushubo;
                } else if (indexOF('/lists/')) {
                    curSite = DBSite.yushubo_list;
                } else if (indexOF('/all')) {
                    curSite = DBSite.yushubo_all;
                }},
                style: '.readbg.mt10 {display: none !important;}',
                pager: {
                    nextL: '//div[contains(@class, "articlebtn")]/a[contains(text(), "下一页") or contains(text(), "下一章")]',
                    pageE: '#BookText',
                    insertP: ['#BookText', 6],
                    insertP6Br: true,
                    replaceE: '.articlebtn',
                    scrollD: 1000
                }
            }, //               御书网
            yushubo_list: {
                pager: {
                    nextL: 'id("pager")//a[contains(text(), "下一页")]',
                    pageE: '.books-list > ul > li',
                    replaceE: '#pager',
                    scrollD: 1000
                }
            }, //          御书网 - 分类页
            yushubo_all: {
                pager: {
                    nextL: 'id("pager")//a[contains(text(), "下一页")]',
                    pageE: 'ul.search-list > li',
                    replaceE: '#pager',
                    scrollD: 1000
                }
            }, //           御书网 - 书库页
            soxscc: {
                host: 'www.soxscc.org',
                url: ()=> {if (indexOF(/\/\d{4,}\.html/)) {curSite = DBSite.soxscc;}},
                style: '.content > p, img {display: none !important;}',
                pager: {
                    nextL: '//font[contains(text(), "下一章")]/following-sibling::a[1]',
                    pageE: '.content',
                    insertP: ['.content', 6],
                    insertP6Br: true,
                    replaceE: '.pagego',
                    scrollD: 1500
                }
            }, //                搜小说
            ihuaben: {
                host: 'www.ihuaben.com',
                url: ()=> {if (indexOF(/\/\d{4,}\.html/)) {curSite = DBSite.ihuaben;}},
                style: '.discription > p > i, img, #container, #BDBannerBottom_PC, iframe, .navFooter {display: none !important;} .discription > p {font-size: 16px; min-height: 24px; padding-bottom: 24px;}',
                pager: {
                    nextL: 'id("preAndNextBar")/a[contains(text(), "下一章")]',
                    pageE: '#contentsource > p',
                    insertP: ['.discription', 3],
                    replaceE: '#preAndNextBar',
                    scrollD: 1000
                }
            }, //               话本小说网
            xineyby: {
                host: 'www.xineyby.com',
                url: ()=> {if (indexOF('/read/')) {
                    curSite = DBSite.xineyby;
                } else if (indexOF(/\/(list|quanben|search)/)) {
                    curSite = DBSite.xineyby_list;
                }},
                pager: {
                    nextL: 'id("footlink")/a[contains(text(), "下一页")]',
                    pageE: '#contents',
                    insertP: ['#contents', 6],
                    insertP6Br: true,
                    replaceE: '#footlink, #amain dd h1',
                    scrollD: 900
                }
            }, //               无错小说网
            xineyby_list: {
                pager: {
                    nextL: '#pagelink a.next',
                    pageE: '#content > dd tbody > tr:not(:first-child)',
                    insertP: ['#content > dd tbody', 3],
                    replaceE: '#pagelink',
                    scrollD: 900
                }
            }, //          无错小说网 - 分类/搜索页
            _530p: {
                host: 'www.530p.com',
                url: ()=> {if (indexOF(/\/\d{4,}\.htm/)) {curSite = DBSite._530p;}},
                pager: {
                    nextL: '#nextLink',
                    pageE: '#cp_content',
                    insertP: ['#cp_content', 6],
                    insertP6Br: true,
                    replaceE: '#pg_bar',
                    scrollD: 1500
                }
            }, //                 无弹窗小说网
            xiaoshuo77: {
                host: 'm.xiaoshuo77.net',
                url: ()=> {if (indexOF('.html')) {curSite = DBSite.xiaoshuo77; xs_bF(getAllCSS('#novelcontent'), [/(<br>)?(&nbsp;)+内容未完，下一页.*$|【本章阅读.*$/, '<br>']);}},
                style: '#novelcontent > p, img {display: none !important;}',
                pager: {
                    nextL: '.page_chapter a.p4',
                    pageE: '#novelcontent',
                    insertP: ['#novelcontent', 6],
                    replaceE: '.page_chapter',
                    scrollD: 1500
                },
                function: {
                    bF: xs_bF,
                    bFp: [/(<br>)?(&nbsp;)+内容未完，下一页.*$|【本章阅读.*$/, '<br>']
                }
            }, //            读书族小说网
            linovel: {
                host: 'www.linovel.net',
                url: ()=> {if (indexOF(/\/book\/\d+\/.+\.html/)) {
                    insStyle('.reward-section {display: none !important;}');
                } else if (indexOF('/cat/')) {
                    curSite = DBSite.linovel;
                }},
                pager: {
                    nextL: '//ul[@class="pagination"]/li/a[contains(text(), "下一页")]',
                    pageE: '.rank-book-list > div',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //               轻之文库
            _23qb: {
                host: 'www.23qb.net',
                url: ()=> {if (indexOF(/\/book\/\d+\/.+\.html/)) {
                    curSite = DBSite._23qb; xs_bF(getAllCSS('#mlfy_main_text > *'), [/（继续下一页）.+|铅笔小说.+/, '']);
                } else if (lp != '/' && !indexOF(/\/book\/\d+\//)) {
                    curSite = DBSite._23qb_list;
                }},
                pager: {
                    nextL: ()=> (location.origin + ReadParams.url_next),
                    pageE: 'id("TextContent")/p | //script[contains(text(), "ReadParams")]',
                    insertP: ['#TextContent', 3],
                    replaceE: '.chepnav',
                    scriptT: 2,
                    scrollD: 1500
                },
                function: {
                    bF: xs_bF,
                    bFp: [/.*继续下一页.*|.*铅笔小说.*/, '']
                }
            }, //                 铅笔小说
            _23qb_list: {
                pager: {
                    nextL: '.pages a.next, .pages > strong+a',
                    pageE: '#sitebox > dl',
                    replaceE: '.pages',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[_src]', '_src']
                }
            }, //            铅笔小说 - 分类页
            linovelib: {
                host: 'www.linovelib.com',
                url: ()=> {if (indexOF(/\/novel\/\d+\/.+\.html/)) {
                    curSite = DBSite.linovelib;
                } else if (indexOF('/wenku/')) {
                    curSite = DBSite.linovelib_wenku;
                } else if (indexOF('/top/') || indexOF('/topfull/') || indexOF('toplist.php')) {
                    curSite = DBSite.linovelib_top;
                }},
                pager: {
                    nextL: '//p[@class="mlfy_page"]/a[contains(text(), "下一页") or contains(text(), "下一章")]',
                    pageE: '#mlfy_main_text > *',
                    replaceE: 'p.mlfy_page',
                    scrollD: 1000
                }
            }, //             哔哩轻小说
            linovelib_wenku: {
                pager: {
                    nextL: '#pagelink > a.next',
                    pageE: '.store_collist > div.bookbox',
                    replaceE: '#pagelink',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //       哔哩轻小说 - 文库
            linovelib_top: {
                pager: {
                    nextL: '#pagelink > a.next',
                    pageE: '.rankpage_box > div.rank_d_list',
                    replaceE: '#pagelink',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //         哔哩轻小说 - 全本
            linovelib_w: {
                host: 'w.linovelib.com',
                url: ()=> {if (indexOF(/\/novel\/\d+\/.+\.html/)) {
                    curSite = DBSite.linovelib_w;
                } else if (indexOF('/wenku/') || indexOF('/sa/')) {
                    curSite = DBSite.linovelib_w_wenku;
                }},
                style: 'body {min-height: 1000px;}',
                pager: {
                    nextL: ()=> {if (ReadParams) {return (location.origin + ReadParams.url_next)}; return ''},
                    pageE: '//body/script[contains(text(), "var ReadParams")] | id("apage")/div',
                    insertP: ['#apage', 3],
                    scriptT: 2,
                    scrollD: 1000
                }
            }, //           哔哩轻小说 (手机版)
            linovelib_w_wenku: {
                pager: {
                    nextL: '#pagelink > strong+a ,#pagelink a.next',
                    pageE: 'ol.book-ol > li',
                    replaceE: '#pagelink',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //     哔哩轻小说 (手机版) - 文库
            ao3: {
                host: 'archiveofourown.org',
                url: ()=> {if (indexOF(/\/works$/) || lp == '/works/search') {
                    curSite = DBSite.ao3;
                } else if (indexOF(/\/works\/\d+\/chapters\//)) {
                    curSite = DBSite.ao3_post;
                }},
                pager: {
                    nextL: 'li.next a',
                    pageE: 'li.work[id^="work_"]',
                    replaceE: '.pagination',
                    scrollD: 2500
                }
            }, //                   AO3 - 列表页 + 搜索页
            ao3_post: {
                pager: {
                    nextL: 'li.chapter.next a',
                    pageE: '#workskin > div',
                    replaceE: '#main ul.navigation, #feedback > ul.actions',
                    scrollD: 2000
                }
            }, //              AO3 - 阅读页
            _423down: {
                host: 'www.423down.com',
                url: ()=> {if (!indexOF('.html')) curSite = DBSite._423down;},
                pager: {
                    nextL: '//div[@class="paging"]//a[contains(text(),"下一页")]',
                    pageE: 'div.content-wrap ul.excerpt > li',
                    replaceE: 'div.paging',
                    scrollD: 2000
                }
            }, //            423Down
            iao_su: {
                host: 'iao.su',
                pager: {
                    nextL: 'li.next > a',
                    pageE: '#index > article, #archive > article',
                    insertP: ['ol.page-navigator', 1],
                    replaceE: 'ol.page-navigator',
                    scriptT: 3,
                    scrollD: 1000
                }
            }, //              不死鸟
            sharerw: {
                host: 'www.sharerw.com',
                url: ()=> {if (!indexOF('.html')) {if (lp == '/search.php') {curSite = DBSite.sharerw_search;} else {curSite = DBSite.sharerw;};};},
                pager: {
                    nextL: 'span.next > a',
                    pageE: '.new-post > article',
                    replaceE: '.pagebar',
                    scrollD: 1500
                }
            }, //             分享者
            sharerw_search: {
                pager: {
                    nextL: 'span.next > a',
                    pageE: '#mainbox > article',
                    replaceE: '.pagebar',
                    scrollD: 1500
                }
            }, //      分享者 - 搜索页
            extfans: {
                host: 'www.extfans.com',
                url: '/^\\/.+/',
                pager: {
                    nextL: 'a.page-next',
                    pageE: '.app-item-content, .article-item-content',
                    replaceE: '.pagination-content',
                    scrollD: 2000
                }
            }, //             扩展迷
            appinn: {
                host: 'www.appinn.com',
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: 'section#latest-posts > article',
                    replaceE: 'div.nav-links',
                    scrollD: 1500
                }
            }, //              小众软件
            isharepc: {
                host: 'www.isharepc.com',
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: '.content > div.post',
                    replaceE: 'nav.pagination',
                    scrollD: 1000
                }
            }, //            乐软博客
            ghxi: {
                host: 'www.ghxi.com',
                url: ()=> {if (lp == '/' && !location.search) {curSite = DBSite.ghxi;} else {curSite = DBSite.ghxi_list;}},
                pager: {
                    type: 2,
                    nextL: '.load-more',
                    interval: 1000,
                    scrollD: 5000
                }
            }, //                果核剥壳 - 首页
            ghxi_list: {
                pager: {
                    nextL: 'a.next',
                    pageE: 'ul.post-loop > li',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //           果核剥壳 - 分类/搜索页
            _6yit: {
                host: ['www.6yit.com'],
                url: ()=> {if (!indexOF('.html')) {curSite = DBSite._6yit;}},
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: 'posts.posts-item.list',
                    replaceE: '.pagenav',
                    scrollD: 1500
                }
            }, //               六音软件
            apprcn: {
                host: ['www.apprcn.com', 'free.apprcn.com'],
                url: ()=> {if (lp == '/' || indexOF('/category/')) {curSite = DBSite.apprcn;}},
                pager: {
                    nextL: '//div[@class="pagination"]//a[contains(text(), "Next")]',
                    pageE: 'article.article',
                    replaceE: '.pagination',
                    scrollD: 1000
                }
            }, //              反斗软件
            weidown: {
                host: 'www.weidown.com',
                url: ()=> {if (indexOF('/search/')) { //搜索页
                    curSite = DBSite.weidown_search;
                } else if (indexOF('/special')) { // 专题页
                    curSite = DBSite.weidown_special;
                } else {
                    curSite = DBSite.weidown;
                }},
                pager: {
                    nextL: 'a.nextpage',
                    pageE: '.articleWrapper > .itemArticle, .articleWrapper > .richTextItem.search',
                    insertP: ['.articleWrapper', 3],
                    replaceE: '#pageGroup',
                    scrollD: 1500
                }
            }, //             微当下载
            weidown_search: {
                pager: {
                    nextL: 'a.nextpage',
                    pageE: '.articleListWrapper > .richTextItem.search',
                    replaceE: '#pageGroup',
                    scrollD: 700
                }
            }, //      微当下载 - 搜索页
            weidown_special: {
                pager: {
                    nextL: 'a.nextpage',
                    pageE: '.special > .item, .articleWrapper > div',
                    insertP: ['.special, .articleWrapper', 3],
                    replaceE: '#pageGroup',
                    scrollD: 700
                }
            }, //     微当下载 - 专题页
            fsylr: {
                host: 'fsylr.com',
                url: ()=> {if (!indexOF('.html')) {curSite = DBSite.fsylr;}},
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: '.posts-con > div:not([class*="posts-"])',
                    replaceE: 'nav.pagination',
                    scrollD: 2000
                }
            }, //               发烧友绿软
            iplaysoft: {
                host: 'www.iplaysoft.com',
                url: ()=> {if (indexOF('.html') || indexOF('/p/')) {curSite = DBSite.iplaysoft_comment;} else {curSite = DBSite.iplaysoft;}},
                pager: {
                    nextL: '.pagenavi a[title="下一页"]',
                    pageE: '#postlist > div.entry',
                    replaceE: '.pagenavi-button, .pagenavi',
                    scrollD: 1200
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
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
            mubolin: {
                host: 'www.mubolin.cn',
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: '#recent-content > div',
                    replaceE: 'nav.pagination',
                    scrollD: 1500
                }
            }, //             悪魔の小站
            mpyit: {
                host: 'www.mpyit.com',
                url: ()=> {if (lp == '/' && !location.search) {
                    curSite = DBSite.mpyit;
                } else if (indexOF('/category/') || indexOF('?s=', 's')) { // 搜索页 / 分类页
                    curSite = DBSite.mpyit_category;
                }},
                pager: {
                    nextL: 'a.page-numbers[title="下一页"]',
                    pageE: '#post > div[id^="post-"]',
                    replaceE: '#post > #pagenavi',
                    scrollD: 1700
                }
            }, //               老殁 | 殁漂遥
            mpyit_category: {
                pager: {
                    nextL: 'a.page-numbers[title="下一页"]',
                    pageE: '#content > div[class^="entry_box"]',
                    replaceE: '#content > #pagenavi',
                    scrollD: 1700
                }
            }, //      老殁 | 殁漂遥 - 搜索页/分类页
            tenlonstudio: {
                host: 'www.tenlonstudio.com',
                url: ()=> {if (lp == '/' && !location.search) {
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
                    nextL: '//div[@class="btn-pager"]/a[contains(text(), "❯")]',
                    pageE: 'li.post-list-item',
                    replaceE: '.ajax-pager',
                    scrollD: 1000
                }
            }, //   腾龙工作室 - 分类/搜索页
            yxssp: {
                host: 'www.yxssp.com',
                pager: {
                    nextL: '//div[contains(@class, "page-nav")]/a[last()]',
                    pageE: '.td-modules-container.td-module-number4 > div',
                    replaceE: '.page-nav.td-pb-padding-side',
                    scrollD: 1000
                }
            }, //               异星软件空间
            yrxitong: {
                host: 'www.yrxitong.com',
                url: ()=> {
                    if (lp == '/sr.jsp') {
                        curSite = DBSite.yrxitong_search;
                    } else if (!indexOF('/h-nd-')) {
                        curSite = DBSite.yrxitong;
                    }
                },
                pager: {
                    nextL: 'span.pageNext > a',
                    pageE: '#containerFormsCenter .m_news_list > div',
                    replaceE: '.pagenation',
                    scrollD: 1200
                },
                function: {
                    bF: src_bF,
                    bFp: [1, 'a[data-original]', 'data-original']
                }
            }, //            小鱼儿 yr 系统
            yrxitong_search: {
                pager: {
                    nextL: 'span.pageNext > a',
                    pageE: '#containerFormsCenter .newsList > div',
                    replaceE: '.pagenation',
                    scrollD: 2000
                }
            }, //     小鱼儿 yr 系统 - 搜索页
            downg: {
                host: 'www.downg.com',
                url: ()=> {if (indexOF('/new/')) {curSite = DBSite.downg;}},
                pager: {
                    nextL: 'a.nextpage',
                    pageE: '.ApdList > ul.ApdLi',
                    replaceE: '.pagination',
                    scrollD: 1500
                }
            }, //               绿软家园
            sordum: {
                host: 'www.sordum.org',
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: '.article > article',
                    replaceE: 'nav.navigation.posts-navigation',
                    scrollD: 1500
                }
            }, //              (下面这几个都是国外博客网站)
            winaero: {
                host: 'winaero.com',
                url: ()=> {if (lp == '/' || indexOF('/category/')) curSite = DBSite.winaero;},
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: '#main > article',
                    replaceE: '.pagination',
                    scrollD: 1500
                }
            },
            lrepacks: {
                host: 'lrepacks.net',
                url: ()=> {if (!indexOF('.html')) curSite = DBSite.lrepacks;},
                pager: {
                    nextL: '.page_next > a',
                    pageE: '#main .post-list article',
                    replaceE: '.page_nav',
                    scrollD: 1500
                },
                function: {
                    bF: pageElems => { // 插入前函数（调整 class）
                        pageElems.forEach(function (one) {
                            let now = one.querySelector('.slideUp, .elementFade');
                            if (now) now.className = now.className.replace('slideUp','slideUpRun').replace('elementFade','elementFadeRun');
                        });
                        return pageElems
                    }
                }
            },
            dlandroid: {
                host: 'dlandroid.com',
                url: ()=> {if (indexOF('/cat/') || (lp === '/' && indexOF('?s=', 's'))) curSite = DBSite.dlandroid;},
                pager: {
                    nextL: 'a.next.page-numbers',
                    pageE: 'div.post',
                    replaceE: '.navigation',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //           DlAndroid
            winhelponline: {
                host: 'www.winhelponline.com',
                url: ()=> {if (lp == '/blog/') {curSite = DBSite.winhelponline;}},
                pager: {
                    nextL: 'span.prev > a',
                    pageE: '#main > article',
                    replaceE: 'nav.paging-navigation',
                    scrollD: 2000
                }
            },
            windowslatest: {
                host: 'www.windowslatest.com',
                pager: {
                    nextL: '//div[contains(@class, "page-nav")]/a[last()]',
                    pageE: '.td-ss-main-content > div:not(.td-block-title-wrap):not(.page-nav)',
                    replaceE: '.page-nav',
                    scrollD: 2000
                }
            },
            thewindowsclub: {
                host: 'www.thewindowsclub.com',
                url: ()=> {curSite = DBSite.thewindowsclub; if (lp == '/') {curSite.pager.scrollD = 2000;}},
                pager: {
                    nextL: 'li.pagination-next > a',
                    pageE: '#genesis-content > article.post',
                    replaceE: '.pagination',
                    scrollD: 1500
                }
            },
            acs: {
                host: ['pubs.acs.org','onlinelibrary.wiley.com'],
                url: ()=> {if (indexOF('/doSearch')) {curSite = DBSite.acs;}},
                pager: {
                    nextL: 'a.pagination__btn--next',
                    pageE: 'ul.items-results > *',
                    replaceE: '.pagination',
                    scrollD: 3000
                }
            }, //                  Wiley Online Library + ACS (Publications)
            libgen: {
                host: /libgen/,
                url: ()=> {if (lp == '/search.php') {curSite = DBSite.libgen;}},
                pager: {
                    nextL: '//font/a[contains(text(), "►")]',
                    pageE: 'table[rules="rows"] > tbody > tr:nth-of-type(n+2), .paginator+script:not([src])',
                    insertP: ['table[rules="rows"] > tbody', 3],
                    replaceE: '//td[./font/a[contains(text(), "►")]]',
                    scriptT: 2,
                    scrollD: 2000
                }
            }, //               Library Genesis
            sciencedirect: {
                host: 'www.sciencedirect.com',
                url: ()=> {locationC = true; if (lp == '/search') {curSite = DBSite.sciencedirect; setTimeout(function(){insStyle('html, body {height: ' + (document.documentElement.scrollHeight || document.body.scrollHeight) + 'px;}')}, 2000)}},
                style: 'footer {display: none !important;}',
                iframe: true,
                pager: {
                    type: 5,
                    nextL: 'a[data-aa-name="srp-next-page"]',
                    scrollD: 2000
                }
            }, //        ScienceDirect
            Z_Library: {
                host: /(\dlib|b-ok\d?|booksc|z-lib)\./,
                url: ()=> {if (indexOF('/s/')) {curSite = DBSite.Z_Library;}},
                pager: {
                    nextL: '//div[@class="paginator"]//span/strong/parent::span/parent::td/following-sibling::td[1]//a',
                    pageE: 'id("searchResultBox")/div | //script[contains(string(), "pagerOptions")]',
                    insertP: ['#searchResultBox', 3],
                    replaceE: '.paginator',
                    scriptT: 2,
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //            Z-Library
            pubmed: {
                host: 'pubmed.ncbi.nlm.nih.gov',
                pager: {
                    type: 2,
                    nextL: 'button.load-button.next-page',
                    nextText: 'Show more results',
                    scrollD: 1500
                }
            }, //               PubMed
            x_mol: {
                host: 'www.x-mol.com',
                url: ()=> {if (indexOF('/search/q') || indexOF('/paper/')) {curSite = DBSite.x_mol;}},
                pager: {
                    nextL: ()=> getNextEP('.pagination li.active+li > a', 'pageIndex=', /pageIndex=\d+/),
                    pageE: '.magazine-senior-search-results-list > ul > li, .magazine-model-content-new > ul > li',
                    insertP: ['.magazine-senior-search-results-list > ul, .magazine-model-content-new > ul', 3],
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //                X-MOL
            cqvip: {
                host: 'www.cqvip.com',
                url: ()=> {if (indexOF('/search')) {curSite = DBSite.cqvip;}},
                pager: {
                    type: 6,
                    nextL: '//ul[@class="pagenum"]//a[text()="下一页"]',
                    pageE: 'ul.prolist:last-child > li',
                    replaceE: 'ul.pagenum',
                    loadTime: 1000,
                    scrollD: 2000
                }
            }, //                维普网
            ablesci: {
                host: 'www.ablesci.com',
                url: ()=> {if (indexOF('/detail') && GM_getValue('menu_thread')) {curSite = DBSite.ablesci_p;} else if (getCSS('ul.fly-list')) {curSite = DBSite.ablesci;}},
                pager: {
                    nextL: 'li.next > a',
                    pageE: 'ul.fly-list > li',
                    replaceE: '.pages',
                    scrollD: 2000
                }
            }, //              科研通
            ablesci_p: {
                pager: {
                    nextL: 'li.next > a',
                    pageE: 'ul#jieda > li',
                    replaceE: '.pages',
                    scrollD: 2000
                }
            }, //            科研通 - 帖子内
            coolkeyan: {
                host: 'www.coolkeyan.com',
                url: ()=> {if (location.hash.indexOf('/project/') > -1) curSite = DBSite.coolkeyan;},
                style: '.q-img {height: auto !important;} .q-img__image {max-height: 1000px !important;} .row.q-my-sm.q-gutter-sm {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: coolkeyan_nextL,
                    insertP: ['//div[contains(@class, "q-img__image")][last()]', 4],
                    insertE: coolkeyan_insertE,
                    scrollD: 1500
                }
            }, //            酷科研
            muchong: {
                host: 'muchong.com',
                url: ()=> {if (indexOF('/f-') || indexOF('search.php')) {
                    curSite = DBSite.muchong;
                } else if (indexOF('/t-') && GM_getValue('menu_thread')) {
                    curSite = DBSite.muchong; curSite.pager.pageE = '#maincontent > table > tbody:not(.header)'; curSite.pager.scrollD = 2000;
                }},
                style: 'tr.forum_head {display: none !important;}',
                pager: {
                    nextL: '//div[contains(@class, "xmc_Pages")]//a[text()="下一页"]',
                    pageE: '.forum_body table > tbody',
                    replaceE: '.xmc_Pages',
                    scrollD: 1500
                }
            }, //              小木虫
            google_scholar: {
                host: 'scholar.google.com',
                url: ()=> {if (lp == '/scholar') {curSite = DBSite.google_scholar;}},
                pager: {
                    nextL: '//a[./span[contains(@class, "next")]]',
                    pageE: '#gs_res_ccl_mid > *',
                    insertP: ['#gs_res_ccl_mid', 3],
                    replaceE: '#gs_n',
                    scriptT: 1,
                    scrollD: 2000
                }
            }, //       谷歌学术
            google_scholar_: {
                host: 'sc.panda321.com',
                pager: {
                    nextL: '//a[./span[contains(@class, "next")]]',
                    pageE: '#gs_res_ccl_mid > *',
                    insertP: ['#gs_res_ccl_mid', 3],
                    replaceE: '#gs_n',
                    scriptT: 1,
                    scrollD: 2000
                },
                function: {
                    bF: pageElems => {
                        getCSS('#gs_n').remove();
                        return pageElems
                    }
                }
            }, //      谷歌学术 - 其他镜像站
            bing_academic: {
                style: 'li.aca_algo_count {display: none !important;}',
                pager: {
                    nextL: 'a.sb_pagN',
                    pageE: '#b_results > li.aca_algo',
                    replaceE: '#b_results .b_pag',
                    scrollD: 1000
                }
            }, //        必应学术
            baidu_xueshu: {
                host: 'xueshu.baidu.com',
                url: ()=> {if (lp == '/s') {
                    curSite = DBSite.baidu_xueshu;
                } else if (indexOF('journal/navigation')) {
                    curSite = DBSite.baidu_xueshu_journal;
                } else if (indexOF('paper/show')) {
                    curSite = DBSite.baidu_xueshu_paper;
                }},
                pager: {
                    nextL: 'id("page")/a[./i[@class="c-icon-pager-next"]]',
                    pageE: '#bdxs_result_lists > div.result',
                    replaceE: '#page',
                    scrollD: 1000
                }
            }, //         百度学术
            baidu_xueshu_journal: {
                pager: {
                    nextL: 'a.res-page-next',
                    pageE: '#journaldetail > div',
                    replaceE: '.res-page',
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
                url: ()=> {if (lp == '/s') {curSite = DBSite.so_xueshu;}},
                pager: {
                    nextL: 'a#snext',
                    pageE: 'ul.list > li',
                    replaceE: '#page',
                    scrollD: 1000
                }
            }, //            360 学术
            wanfangdata: {
                host: 's.wanfangdata.com.cn',
                url: ()=> {locationC = true; curSite = DBSite.wanfangdata;},
                style: '#zkFooter {display: none !important;}',
                iframe: true,
                pager: {
                    type: 5,
                    nextL: ()=> getNextEP('.pager.active+span.pager', 'p=', /p=\d+/),
                    scrollD: 2000
                }
            }, //          万方数据知识服务
            nsfc: {
                host: ['output.nsfc.gov.cn', 'kd.nsfc.gov.cn'],
                url: ()=> {if (indexOF('/conclusionProject/')) curSite = DBSite.nsfc;},
                style: '#pageNoUl {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: nsfc_nextL,
                    insertP: ['#pageNoUl', 1],
                    insertE: nsfc_insertE,
                    scrollD: 1500
                }
            }, //                 国家自然科学基金
            stackoverflow: {
                host: 'stackoverflow.com',
                url: ()=> {if (indexOF('/questions') && !indexOF(/\/questions\/\d+\//)) {
                    curSite = DBSite.stackoverflow;
                } else if (lp == '/search') {
                    curSite = DBSite.stackoverflow_search;
                } else if (lp == '/tags') {
                    curSite = DBSite.stackoverflow_tags;
                } else if (lp == '/users') {
                    curSite = DBSite.stackoverflow_users;
                }},
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: '#questions > div',
                    replaceE: '.pager',
                    scrollD: 2000
                }
            }, //             StackOverflow - Questions
            stackoverflow_tags: {
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: '#tags-browser > div',
                    replaceE: '.pager',
                    scrollD: 2000
                }
            }, //        StackOverflow - Tags
            stackoverflow_users: {
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: '#user-browser > div:first-child > div',
                    replaceE: '.pager',
                    scrollD: 2000
                }
            }, //       StackOverflow - Users
            stackoverflow_search: {
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: '.js-search-results > div:first-child > div',
                    replaceE: '.pager',
                    scrollD: 2000
                }
            }, //      StackOverflow - Search
            segmentfault: {
                host: 'segmentfault.com',
                url: ()=> {locationC = true;
                           if (indexOF('/questions')) {
                               curSite = DBSite.segmentfault;
                           } else if (lp == '/search') {
                               curSite = DBSite.segmentfault_search;
                           }},
                pager: {
                    nextL: '//a[@class="page-link"][contains(text(), "下一页")]',
                    pageE: 'ul.list-group > li',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //              SegmentFault - Questions
            segmentfault_search: {
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: '.search-result > section',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //       SegmentFault - Search
            w3school_com_cn: {
                host: 'www.w3school.com.cn',
                url: ()=> {if (location.pathname.split('/').length > 2) {curSite = DBSite.w3school_com_cn;}},
                style: '#maincontent h1:not(:nth-of-type(1)) {margin-top: 30px;}',
                pager: {
                    type: 3,
                    nextL: ()=> { // 过滤部分非本页的参考手册
                        let next = getCSS('li.next > a[href]')
                        if (next && next.href.indexOf('/index.') === -1) return next.href;
                        curSite = {SiteTypeID: 0}; return ''
                    },
                    pageE: '#maincontent > *:not([class*="prenextnav"]):not(#bpn):not(#tpn)',
                    insertP: ['id("bpn") | //div[contains(@class, "prenextnav")][last()]', 1],
                    replaceE: 'ul.prenext, #navsecond',
                    scrollE: 'id("bpn") | //div[contains(@class, "prenextnav")][last()]',
                    forceHTTPS: true,
                    scrollD: 600
                }
            }, //           W3school
            w3cschool_cn: {
                host: 'www.w3cschool.cn',
                url: ()=> {if (location.pathname.split('/').length > 2) {curSite = DBSite.w3cschool_cn;}},
                style: '.widget-body, #rfbanner {display: none !important;}',
                pager: {
                    nextL: '.next-link > a',
                    pageE: '#pro-mian-header, .content-bg',
                    replaceE: '.content-links, .splitter-sidebar',
                    scrollD: 1500
                }
            }, //              W3Cschool
            runoob: {
                host: 'www.runoob.com',
                url: ()=> {if (location.pathname.split('/').length > 2 && getCSS('#leftcolumn')) {curSite = DBSite.runoob;}},
                style: '#comments, #postcomments, #respond, #footer {display: none !important;} .article-intro h1:not(:nth-of-type(1)) {margin: 30px 0 10px 0;}',
                pager: {
                    nextL: ()=> { // 过滤部分非本页的参考手册
                        let next = getCSS('#leftcolumn > a[style]~a[href]')
                        if (next && next.href.split('/').length === location.href.split('/').length && next.href.split('/')[3] === location.href.split('/')[3]) return next.href;
                        next.href = location.href; curSite = {SiteTypeID: 0}; return ''
                    },
                    pageE: '#content > *, script[src*="assets/js/main.min.js"]',
                    insertP: ['#content', 3],
                    replaceE: '.previous-next-links, #leftcolumn',
                    scriptT: 2,
                    forceHTTPS: true,
                    scrollD: 1000
                }
            }, //                    菜鸟教程
            cnblogs: {
                host: ['www.cnblogs.com', 'zzk.cnblogs.com'],
                url: ()=> {
                    if (location.hostname === 'zzk.cnblogs.com') {
                        curSite = DBSite.cnblogs_search;
                    } else if (getCSS('#post_list')) {
                        curSite = DBSite.cnblogs_list;
                    } else if (location.pathname.split('/').length === 3 && getCSS('.topicListFooter')) {
                        curSite = DBSite.cnblogs;
                        if (!getCSS('#homepage_top_pager')) {
                            getCSS('.forFlow').insertAdjacentHTML(getAddTo(2), '<div id="homepage_top_pager" class="topicListFooter"></div>');
                            getCSS('.forFlow').insertAdjacentHTML(getAddTo(3), '<div id="homepage_bottom_pager" class="topicListFooter"></div>');
                        }
                    }
                },
                pager: {
                    nextL: '//div[@class="topicListFooter"]//a[contains(text(), "下一页")]',
                    pageE: 'div.day',
                    replaceE: '.topicListFooter',
                    scrollD: 1000
                }
            }, //                   博客园 - 文章列表（个人）
            cnblogs_list: {
                pager: {
                    nextL: '//div[@class="pager"]//a[contains(text(), ">")]',
                    pageE: '#post_list > article',
                    replaceE: '.pager',
                    scrollD: 1000
                }
            }, //              博客园 - 文章列表
            cnblogs_search: {
                pager: {
                    nextL: '//div[@class="pager"]//a[contains(text(), ">")]',
                    pageE: 'div.searchItem',
                    replaceE: '.pager',
                    scrollD: 1000
                }
            }, //            博客园 - 搜索页
            gitee: {
                host: 'gitee.com',
                url: ()=> {
                    if (indexOF('/explore/')) {
                        curSite = DBSite.gitee;
                    } else if (indexOF(/\/issues$/)) {
                        curSite = DBSite.gitee_issues;
                    } else if (indexOF(/\/releases/)) {
                        curSite = DBSite.gitee_releases;
                    } else if (indexOF(/\/tags/)) {
                        curSite = DBSite.gitee_tags;
                    }
                    if (curSite.SiteTypeID > 0 && !curSite.pager.nextL) {
                        curSite.pager.type = 1;
                        curSite.pager.nextL = 'a[rel="next"]';
                        curSite.pager.replaceE = '.pagination';
                        curSite.pager.scrollD = 2500;
                    }
                },
                pager: {
                    pageE: '.items > .item',
                }
            }, //                     Gitee - Explore 列表
            gitee_issues: {
                pager: {
                    pageE: '.issue-wrapper',
                }
            }, //              Gitee - Issues 列表
            gitee_releases: {
                pager: {
                    pageE: '.release-tag-item',
                }
            }, //            Gitee - Releases 列表
            gitee_tags: {
                pager: {
                    pageE: '.tag-item',
                }
            }, //                Gitee - Tags 列表
            gitee_search: {
                host: 'search.gitee.com',
                url: ()=> {if (location.search) curSite = DBSite.gitee_search;},
                pager: {
                    nextL: 'li.next:not(.disabled) > a',
                    pageE: '#hits-list > div',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //              Gitee - Search 列表
            github: {
                host: ['github.com', 'hub.fastgit.org'],
                url: ()=> {locationC = true;
                           if (lp == '/') {
                               curSite = DBSite.github;
                           } else if (indexOF('tab=stars', 's')) {
                               curSite = DBSite.github_star;
                           } else if (indexOF('tab=repositories', 's')) {
                               curSite = DBSite.github_repositories;
                           } else if (indexOF(/\/issues$/) || indexOF(/\/pulls$/)) {
                               curSite = DBSite.github_issues;
                           } else if (indexOF(/\/discussions$/) || indexOF('/discussions/categories')) {
                               curSite = DBSite.github_discussions;
                           } else if (indexOF(/\/releases$/)) {
                               curSite = DBSite.github_releases;
                           } else if (indexOF(/\/tags$/)) {
                               curSite = DBSite.github_tags;
                           } else if (indexOF('/commits')) {
                               curSite = DBSite.github_commits;
                           } else if (indexOF('/notifications')) {
                               curSite = DBSite.github_notifications;
                           } else if (indexOF('/search')) {
                               if (!location.search) return
                               if (!indexOF('type=', 's')) {
                                   if (lp == '/search') {
                                       curSite = DBSite.github_search_repositories;
                                   } else {
                                       curSite = DBSite.github_search_code;
                                   }
                               } else {
                                   curSite = DBSite['github_search_' + /type=[a-z]+/.exec(location.search.toLowerCase())[0].replace('type=','')];
                               }
                               if (curSite.SiteTypeID > 0 && !curSite.pager.nextL) {
                                   curSite.pager.type = 1;
                                   curSite.pager.nextL = 'a.next_page';
                                   curSite.pager.replaceE = '.pagination';
                                   curSite.pager.scrollD = 3000;
                               }
                           }},
                pager: {
                    type: 2,
                    nextL: '.ajax-pagination-btn',
                    nextText: 'More',
                    scrollD: 2500
                }
            }, //                    Github - 首页
            github_star: {
                pager: {
                    nextL: '//div[@class="paginate-container"]//a[contains(text(), "Next")]',
                    pageE: '#js-pjax-container .position-relative div[class^="col-lg-"] > div:not(.position-relative):not(.paginate-container)',
                    insertP: ['.paginate-container', 1],
                    replaceE: '.paginate-container',
                    scrollD: 3000
                }
            }, //               Github - 用户 Star 列表
            github_repositories: {
                pager: {
                    nextL: '//div[@class="paginate-container"]//a[contains(text(), "Next")]',
                    pageE: '#user-repositories-list > ul > li',
                    replaceE: '.paginate-container',
                    scrollD: 3000
                }
            }, //       Github - 用户 项目 列表
            github_issues: {
                pager: {
                    nextL: 'a.next_page',
                    pageE: '.js-navigation-container.js-active-navigation-container > div[id^="issue_"]',
                    replaceE: '.pagination',
                    scrollD: 3000
                }
            }, //             Github - Issues 列表 / PR 列表
            github_discussions: {
                pager: {
                    nextL: 'a.next_page',
                    pageE: 'ul[aria-labelledby="discussions-list"] > li',
                    replaceE: '.pagination',
                    scrollD: 3000
                }
            }, //        Github - Discussions 列表
            github_releases: {
                pager: {
                    nextL: 'a.next_page',
                    pageE: '#repo-content-pjax-container > div[data-pjax] > div:not(.paginate-container)',
                    replaceE: '.pagination',
                    scrollD: 3000
                }
            }, //           Github - Releases 列表
            github_tags: {
                pager: {
                    nextL: '//div[@class="pagination"]/a[contains(text(), "Next")]',
                    pageE: '.Box-body > div.Box-row',
                    replaceE: '.pagination',
                    scrollD: 3000
                }
            }, //               Github - Tags 列表
            github_commits: {
                pager: {
                    nextL: '//div[@class="paginate-container"]//a[contains(text(), "Older")]',
                    pageE: 'div.js-navigation-container > div',
                    replaceE: '.paginate-container',
                    scrollD: 3000
                }
            }, //            Github - Commits 列表
            github_notifications: {
                pager: {
                    nextL: 'nav.paginate-container > a[aria-label="Next"]',
                    pageE: 'li.notifications-list-item',
                    replaceE: 'nav.paginate-container, .js-notifications-list-paginator-counts',
                    scrollD: 3000
                }
            }, //      Github - Notifications 列表
            github_search_repositories: {
                pager: {
                    pageE: 'ul.repo-list > li',
                }
            }, //Github - Search 列表
            github_search_code: {
                pager: {
                    pageE: '.code-list-item',
                }
            }, //        Github - Search 列表 - Code
            github_search_commits: {
                pager: {
                    pageE: '#commit_search_results > div',
                }
            }, //     Github - Search 列表 - Commit
            github_search_issues: {
                pager: {
                    pageE: '.issue-list-item',
                }
            }, //      Github - Search 列表 - Issues
            github_search_discussions: {
                pager: {
                    pageE: '.discussion-list-item',
                }
            }, // Github - Search 列表 - Discussions
            github_search_registrypackages: {
                pager: {
                    pageE: '#package_search_results > div',
                }
            }, // Github - Search 列表 - Package
            github_search_marketplace: {
                pager: {
                    pageE: '#marketplace_search_results > div:first-child > div',
                }
            }, // Github - Search 列表 - Marketplace
            github_search_topics: {
                pager: {
                    pageE: '.topic-list-item',
                }
            }, //      Github - Search 列表 - Topics
            github_search_wikis: {
                pager: {
                    pageE: '#wiki_search_results > div:first-child > div',
                }
            }, //       Github - Search 列表 - wiki
            github_search_users: {
                pager: {
                    pageE: '#user_search_results > div:first-child > div',
                }
            }, //       Github - Search 列表 - user
            oi_wiki: {
                host: 'oi-wiki.org',
                style: 'blockquote.page-copyright, h2#__comments, form#gitalk-form {display: none !important;} article.md-content__inner{min-height: 700px;}',
                pager: {
                    nextL: 'li.md-nav__item.md-nav__item--active.md-nav__item--nested li.md-nav__item--active+li a',
                    pageE: 'article.md-content__inner',
                    insertP: ['article.md-content__inner', 6],
                    replaceE: '.md-sidebar.md-sidebar--primary',
                    scrollD: 1300
                }
            }, //                   OI Wiki
            dusaiphoto: {
                host: 'www.dusaiphoto.com',
                url: ()=> {if (location.pathname.indexOf('/article/') > -1) {curSite = DBSite.dusaiphoto;}},
                style: 'h1.article-title {margin-top: 80px;}',
                pager: {
                    nextL: 'a.hvr-bounce-to-left',
                    pageE: '#main > .mt-4 >div > .mb-4, #article_body',
                    replaceE: '.col-12.font-title, #sidebar',
                    scrollD: 1500
                }
            }, //                dusaiphoto
            guokr: {
                host: 'www.guokr.com',
                pager: {
                    type: 2,
                    nextL: 'div[class*="LoadMoreWrap"]',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //               果壳网
            landian: {
                host: 'www.landian.vip',
                url: ()=> {if (lp != '/' && !indexOF('/archives/') && !indexOF('/search/')) {curSite = DBSite.landian;}},
                style: '.pagination {display: none !important;}',
                pager: {
                    nextL: ()=> getNextUPN(/(?<=\/page\/)\d+/, /\/page\/\d+/, '/page/', '', '2', getCSS('.pagination > button.end').textContent),
                    pageE: '.content li.color-border',
                    scrollD: 1500
                }
            }, //             蓝点网
            kenengba: {
                host: 'kenengba.com',
                url: ()=> {if (lp == '/' || indexOF('/page/') || indexOF('/category/') || indexOF('/tag/')) {curSite = DBSite.kenengba;}},
                pager: {
                    nextL: '//div[@class="pagebar"]/a[@href and text()=">>"]',
                    pageE: 'article.post',
                    replaceE: '.pagebar',
                    scrollD: 3000
                }
            }, //            可能吧
            expreview: {
                host: 'www.expreview.com',
                pager: {
                    type: 2,
                    nextL: '#show_article_red_1SHOW',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //           超能网
            ithome: {
                host: 'www.ithome.com',
                pager: {
                    type: 2,
                    nextL: 'a.more',
                    interval: 1500,
                    scrollD: 1500
                }
            }, //              IT之家
            _36kr: {
                host: ['36kr.com', 'www.36kr.com'],
                url: ()=> {if (lp != '/' && !indexOF('/p/') && !indexOF('/newsflashes/')) {curSite = DBSite._36kr;}},
                pager: {
                    type: 2,
                    nextL: '.kr-loading-more-button.show',
                    nextText: '查看更多',
                    scrollD: 1500
                }
            }, //               36氪
            _36kr_m: {
                host: 'm.36kr.com',
                pager: {
                    type: 2,
                    nextL: '.kr-loading-more-button-default',
                    nextText: '查看更多',
                    scrollD: 1500
                }
            }, //             36氪 - 手机版
            sciencealert: {
                host: 'www.sciencealert.com',
                pager: {
                    type: 2,
                    nextL: '.load-more',
                    nextTextOf: 'LOAD MORE',
                    scrollD: 2000
                }
            }, //        ScienceAlert
            zhutix: {
                host: 'zhutix.com',
                url: ()=> {if (getCSS('#post-list')) {
                    curSite = DBSite.zhutix;
                } else {
                    curSite = DBSite.zhutix_list;
                }},
                pager: {
                    nextL: '//li[@class="next-page"]/a | //div[@class="btn-pager"]/a[contains(text(), "❯")]',
                    pageE: '#post-list > ul > li',
                    replaceE: '.pagination, .b2-pagenav.post-nav',
                    scrollD: 1500
                }
            }, //          致美化
            zhutix_list: {
                pager: {
                    nextL: 'li.next-page a',
                    pageE: '#primary-home > div:not(.pagination)',
                    replaceE: '.pagination',
                    scrollD: 1500
                }
            }, //     致美化 - 文章列表
            lanzou: {
                host: /\.lanzou[a-z]\./,
                hiddenPN: true,
                pager: {
                    type: 2,
                    nextL: '#filemore',
                    nextTextOf: '更多',
                    isHidden: true,
                    scrollD: 800
                }
            }, //          蓝奏云 - 分享链接列表
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
            }, //         蓝奏云 - 后台
            alipanso: {
                host: 'www.alipanso.com',
                url: ()=> {if (lp == '/search.html') {curSite = DBSite.alipanso;}},
                style: '.pager-wrap {display: none !important;}',
                pager: {
                    nextL: ()=> getNextUP('page=', /page=\d+/),
                    pageE: '#res_list > div',
                    scrollD: 2000
                }
            }, //        阿里盘搜
            wikihow: {
                host: ['www.wikihow.com', 'zh.wikihow.com'],
                url: ()=> {if (indexOF('/Category:')) {
                    curSite = DBSite.wikihow;
                } else if (indexOF('/wikiHowTo') && indexOF('?search=', 's')) {
                    curSite = DBSite.wikihow_search;
                }},
                pager: {
                    nextL: 'a.pag_next',
                    pageE: '#cat_all > .cat_grid > div',
                    replaceE: '#large_pagination',
                    scriptT: 3,
                    scrollD: 2000
                }
            }, //         指南
            wikihow_search: {
                pager: {
                    nextL: '#searchresults_footer > a.buttonright',
                    pageE: '#searchresults_list > a',
                    replaceE: '#searchresults_footer',
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
            }, //       直播
            greasyfork: {
                host: 'greasyfork.org',
                url: ()=> {if (indexOF(/\/scripts$/) || indexOF('/scripts/by-site/')) {
                    curSite = DBSite.greasyfork;
                } else if (indexOF(/\/feedback$/)) {
                    curSite = DBSite.greasyfork_feedback;
                } else if (indexOF('/discussions') && !indexOF(/\/\d+/)) {
                    curSite = DBSite.greasyfork_discussions;
                }},
                pager: {
                    nextL: 'a.next_page',
                    pageE: 'ol#browse-script-list > li',
                    replaceE: '.pagination',
                    scrollD: 1300
                }
            }, //             GreasyFork
            greasyfork_feedback: {
                pager: {
                    nextL: 'a.next_page',
                    pageE: '.script-discussion-list > div',
                    replaceE: '.pagination',
                    scrollD: 1800
                }
            }, //    GreasyFork - 反馈页
            greasyfork_discussions: {
                pager: {
                    nextL: 'a.next_page',
                    pageE: '.discussion-list > div',
                    replaceE: '.pagination',
                    scrollD: 1300
                }
            }, // GreasyFork - 讨论页
            userscript: {
                host: 'www.userscript.zone',
                url: ()=> {if (lp == '/search') {curSite = DBSite.userscript;}},
                pager: {
                    nextL: ()=> getNextF('.next > form'),
                    pageE: '.row.script',
                    replaceE: '.pagination',
                    scrollD: 1000
                }
            }, //      UserScript
            userstyles: {
                host: 'userstyles.world',
                url: ()=> {if (lp == '/explore') {curSite = DBSite.userstyles;}},
                pager: {
                    nextL: 'a.Pagination-button.next',
                    pageE: '.card',
                    replaceE: '.Pagination',
                    scrollD: 1500
                }
            }, //      UserStyles
            getquicker: {
                host: 'getquicker.net',
                url: '/\\/Share\\//',
                pager: {
                    nextL: '//a[@class="page-link" and text()="下一页"]',
                    pageE: 'table.table  > tbody > tr:not(:first-child), script[src^="/js/site.js"]',
                    insertP: ['table.table  > tbody', 3],
                    replaceE: 'ul.pagination',
                    scriptT: 2,
                    scrollD: 1000
                }
            }, //      Quicker
            xposed: {
                host: 'repo.xposed.info',
                url: '/\/module-overview/',
                pager: {
                    nextL: 'li.pager-next > a',
                    pageE: '.view-content > table > tbody > tr',
                    replaceE: 'ul.pager',
                    scrollD: 1500
                }
            }, //          Xposed
            bookmarkearth: {
                host: 'www.bookmarkearth.com',
                url: ()=> {if (lp == '/' || lp == '/page') {
                    curSite = DBSite.bookmarkearth;
                } else if (lp == '/s/search') {
                    curSite = DBSite.bookmarkearth_search;
                }},
                pager: {
                    nextL: ()=> getNextUP('currentPage=', /currentPage=\d+/, '/page', '2', getCSS('ul.pager').dataset.totalpage),
                    pageE: '.document-piece',
                    replaceE: 'ul.pager',
                    scrollD: 1000
                }
            }, //        书签地球
            bookmarkearth_search: {
                pager: {
                    nextL: ()=> getNextEP('a.cut-page-item.active+a.cut-page-item', 'currentPage=', /currentPage=\d+/),
                    pageE: '.document-piece',
                    replaceE: '.cut-page',
                    scrollD: 1000
                }
            }, // 书签地球 - 搜索页
            smzdm: {
                host: ['www.smzdm.com', 'search.smzdm.com'],
                url: ()=> {if (location.hostname === 'search.smzdm.com' || indexOF('/fenlei/') || indexOF(/\/mall\/.+\/.+/)) {curSite = DBSite.smzdm;}},
                pager: {
                    nextL: '//ul[@class="pagenation-list"]//a[contains(text() ,"下一页")] | //ul[@class="pagenation-list"]/li[contains(@class, "next-page")]/a',
                    pageE: '#feed-main-list > li',
                    replaceE: 'ul.pagenation-list',
                    scrollD: 1500
                }
            }, //           什么值得买 - 分类/搜索页
            meidebi: {
                host: 'www.meidebi.com',
                url: ()=> {if (indexOF('/fenlei/') || lp == '/Search') {
                    curSite = DBSite.meidebi;
                }},
                pager: {
                    nextL: 'a.next',
                    pageE: '.share-list > ul > li',
                    replaceE: '.h-pages',
                    scrollD: 1500
                }
            }, //         没得比 - 分类/搜索页
            ruyile_xuexiao: {
                host: 'www.ruyile.com',
                url: ()=> {
                    if (lp == '/xuexiao/') {
                        curSite = DBSite.ruyile_xuexiao;
                    } else if (lp == '/data/') {
                        curSite = DBSite.ruyile_data;
                    } else if (lp == '/shijuan/') {
                        curSite = DBSite.ruyile_shijuan;
                    }},
                pager: {
                    nextL: '//div[@class="fy"]/a[contains(text(), "下一页")]',
                    pageE: '.xxlb > .sk',
                    insertP: ['.xxlb', 3],
                    replaceE: '.fy',
                    scrollD: 1000
                }
            }, //  如意了教育 - 学校
            ruyile_data: {
                pager: {
                    nextL: '//div[@class="fy"]/a[contains(text(), "下一页")]',
                    pageE: '.m1_z > .lbk',
                    insertP: ['.page', 1],
                    replaceE: '.fy',
                    scrollD: 1000
                }
            }, //     如意了教育 - 数据
            ruyile_shijuan: {
                pager: {
                    nextL: '//div[@class="fy"]/a[contains(text(), "下一页")]',
                    pageE: '.m1_z > .m2_lb',
                    insertP: ['.page', 1],
                    replaceE: '.fy',
                    scrollD: 1000
                }
            }, //  如意了教育 - 试卷
            koolearn: {
                host: 'cet4.koolearn.com',
                pager: {
                    nextL: 'id("page")/a[text()="下一页"]',
                    pageE: 'ul.xqy_entry_list > li,.xqy_core_text > p:not([style="text-align:center"])',
                    insertP: ['ul.xqy_entry_list,.xqy_core_text', 3],
                    replaceE: '#page',
                    scrollD: 2500
                }
            }, //        新东方在线
            che168: {
                host: 'www.che168.com',
                url: ()=> {
                    if (lp != '/' && !indexOF('/dealer/')) {
                        curSite = DBSite.che168;
                    }},
                pager: {
                    nextL: 'a.page-item-next',
                    pageE: 'ul.viewlist_ul > li',
                    replaceE: '.page',
                    scrollD: 2000
                }
            }, //          二手车之家
            jiligamefun: {
                host: 'www.jiligamefun.com',
                url: ()=> {if (indexOF('/category/')) {curSite = DBSite.jiligamefun;}},
                pager: {
                    nextL: 'a.poi-pager__item.poi-pager__item_next',
                    pageE: '.inn-archive__container > article',
                    replaceE: '.poi-pager',
                    scrollD: 1800
                }
            }, //     叽哩叽哩日报
            wendangku: {
                host: 'www.wendangku.net',
                url: ()=> {if (indexOF('/doc/')) {curSite = DBSite.wendangku;}},
                pager: {
                    nextL: 'a.next',
                    pageE: '#contents > *:not(.pages)',
                    replaceE: '.pages',
                    scrollD: 1800
                }
            }, //       文档库
            oshwhub: {
                host: 'www.oshwhub.com',
                url: ()=> {if (lp == '/explore') {curSite = DBSite.oshwhub;}},
                pager: {
                    nextL: 'a.current+a',
                    pageE: '.each-project',
                    replaceE: '.page',
                    scriptT: 0,
                    scrollD: 1200
                }
            }, //         立创开源硬件平台
            netbian: {
                host: 'pic.netbian.com',
                style: 'li.nextpage {display: none !important;}',
                pager: {
                    nextL: '//div[@class="page"]/a[contains(text(),"下一页")]',
                    pageE: '.slist ul > li:not(.nextpage)',
                    replaceE: '.page',
                    scrollD: 1000
                }
            }, //           彼岸图网
            ioliu: {
                host: 'bing.ioliu.cn',
                url: ()=> {if (!indexOF('/photo/') && !indexOF('.html')) {curSite = DBSite.ioliu; document.head.appendChild(document.createElement('base')).target = '_blank';}},
                style: '.progressive--not-loaded {filter: none !important;}',
                pager: {
                    nextL: '//div[@class="page"]/a[contains(text(), "下一页")]',
                    pageE: 'body > .container > div.item',
                    replaceE: '.page',
                    scrollD: 1000
                }
            }, //             必应壁纸
            konachan: {
                host: 'konachan.net',
                url: ()=> {if (indexOF('/post')) {curSite = DBSite.konachan; document.head.appendChild(document.createElement('base')).target = '_blank';}},
                style: 'html, body {min-height: 1000px;} .javascript-hide {display: inline-block !important;} ul#post-list-posts img, ul#post-list-posts .inner{width: auto !important; height: auto !important;} ul#post-list-posts li {width: 33% !important;} a.directlink {margin: 0 !important;}',
                pager: {
                    nextL: 'a.next_page',
                    pageE: 'ul#post-list-posts > li',
                    replaceE: '#paginator',
                    scrollD: 1000
                }
            }, //          动漫壁纸
            nastol: {
                host: 'www.nastol.com.ua',
                pager: {
                    nextL: '//a[./span[@class="nav-next"]]',
                    pageE: '#dle-content > div',
                    replaceE: '.navigation',
                    scrollD: 1000
                }
            }, //            壁纸
            hdqwalls: {
                host: 'hdqwalls.com',
                pager: {
                    nextL: 'a#next',
                    pageE: '.wallpapers_container > div.wall-resp',
                    replaceE: 'ul.pagination',
                    scrollD: 1000
                }
            }, //          壁纸
            xinpianchang: {
                host: 'www.xinpianchang.com',
                style: '.lazy-img {opacity: 1 !important;}',
                pager: {
                    nextL: '.page > a[title="下一页"]',
                    pageE: 'div[class*="-container"] div[class*="-con"] > ul > li, div[class*="-container"] div[class*="-con"] > div[class*="-wrap"] > ul > li',
                    insertP: ['div[class*="-container"] div[class*="-con"] > ul, div[class*="-container"] div[class*="-con"] > div[class*="-wrap"] > ul', 3],
                    replaceE: '.page',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[_src]', '_src']
                }
            }, //      新片场
            tujigu: {
                host: ['www.tuji001.com', 'www.tujigu.net'],
                url: ()=> {
                    if (indexOF('/a/')) {
                        curSite = DBSite.tujigu;
                    } else if (lp != '/' && !indexOF('/search/')) {
                        curSite = DBSite.tujigu_list;
                    }},
                style: '.content img {display: block !important;}',
                pager: {
                    nextL: 'id("pages")/a[contains(text(), "下一页")]',
                    pageE: '.content > img',
                    replaceE: '#pages',
                    scrollD: 2000
                }
            }, //              tujigu - 图片页
            tujigu_list: {
                pager: {
                    nextL: 'id("pages")/a[contains(text(), "下一页")]',
                    pageE: '.hezi > ul > li',
                    insertP: ['//div[@class="hezi"][last()]/ul', 3],
                    replaceE: '#pages',
                    scrollD: 1000
                }
            }, //         tujigu - 分类页
            mvtui: {
                host: 'mvtui.com',
                url: ()=> {if (indexOF('.html')) {curSite = DBSite.mvtui;} else {curSite = DBSite.mvtui_list;}},
                pager: {
                    nextL: '.article-paging span.current+a',
                    pageE: '.article-content > p',
                    replaceE: '.article-paging',
                    scrollD: 3000
                }
            }, //               mvtui - 图片页
            mvtui_list: {
                pager: {
                    nextL: 'li.next-page a',
                    pageE: '#posts > div',
                    replaceE: '.pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //          mvtui - 分类页
            mzitu: {
                host: 'www.mzitu.com',
                url: ()=> {if (indexOF(/\/\d+/)) {curSite = DBSite.mzitu;getCSS('.main-image a[href]').href = 'javascript:void(0);'} else {curSite = DBSite.mzitu_list;}},
                pager: {
                    nextL: '//div[@class="pagenavi"]/a[contains(string(), "下一页")]',
                    pageE: '.main-image img',
                    replaceE: '.pagenavi',
                    scrollD: 1500
                }
            }, //               mzitu - 图片页
            mzitu_list: {
                pager: {
                    nextL: '.next.page-numbers',
                    pageE: '.postlist > ul > li',
                    replaceE: '.pagination',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //          mzitu - 分类/搜索页
            xiurenji: {
                host: /\.xiuren[a-z]+\./,
                url: ()=> {insStyle('img[src$=".gif"]:not([src*="logo"]) {display: none !important;}');
                           if (indexOF('.html') && !indexOF('/index')) {
                               curSite = DBSite.xiurenji;
                           } else if (indexOF('search')) {
                               curSite = DBSite.xiurenji_search;
                           } else {
                               curSite = DBSite.xiurenji_list;
                           }},
                pager: {
                    nextL: '//div[@class="page"]/a[text()="下页"]',
                    pageE: 'div.content > p > *',
                    replaceE: '.page',
                    scrollD: 1500
                }
            }, //            xiurenji - 图片页
            xiurenji_list: {
                pager: {
                    nextL: '//div[@class="page"]/a[text()="下页"]',
                    pageE: 'li.i_list',
                    replaceE: '.page',
                    scrollD: 1000
                }
            }, //       xiurenji - 分类页
            xiurenji_search: {
                pager: {
                    nextL: '.page > a.current+a',
                    pageE: '.node > *',
                    replaceE: '.page',
                    scrollD: 700
                }
            }, //     xiurenji - 搜索页
            jpxgmn: {
                host: 'www.jpxgyw.net',
                url: ()=> {
                    if (indexOF('.html')) {
                        curSite = DBSite.jpxgmn;
                    } else if (lp != '/' && indexOF('/search/')) {
                        curSite = DBSite.jpxgmn; curSite.pager.pageE = '.related_posts > ul';
                    }},
                pager: {
                    nextL: '.pagination a.current+a',
                    pageE: '.article-content img',
                    replaceE: '.pagination',
                    interval: 500,
                    scrollD: 2000
                }
            }, //              jpxgmn
            tvv: {
                host: /\.tvv\.tw/,
                url: ()=> {if (lp == '/' || indexOF('/page/') || indexOF('/category/')) {curSite = DBSite.tvv;}},
                style: '.blog-masonry, .blog-masonry-4col {height: auto !important;} .blog-listing {position: relative !important;float: left !important;top: auto !important;left: auto !important;} .blog-title > a {white-space: nowrap;overflow: hidden;text-overflow: ellipsis;} .blog-image img {min-height: 300px;}',
                pager: {
                    nextL: 'a.next',
                    pageE: '.blog-listing',
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //                 tvv
            mm131: {
                host: ['www.mm131.net', 'www.mmm131.com'],
                url: ()=> {if (indexOF('.html')) {curSite = DBSite.mm131;} else {curSite = DBSite.mm131_list;}},
                retry: 300,
                pager: {
                    nextL: '//div[@class="content-page"]/a[contains(text(), "下一页")]',
                    pageE: '.content-pic img',
                    replaceE: '.content-page',
                    scrollD: 2000
                }
            }, //               MM131 - 图片页
            mm131_list: {
                pager: {
                    nextL: '//dd[@class="page"]/a[contains(text(), "下一页")]',
                    pageE: 'dl.list-left > dd:not([class="page"])',
                    replaceE: '.page',
                    scrollD: 1000
                }
            }, //          MM131 - 分类页
            mm131_m: {
                host: 'm.mmm131.com',
                url: ()=> {insStyle('.bannert, .bannerb, bannert_ios, .bannerb_ios {display: none !important;}'); if (lp == '/') {curSite = DBSite.mm131_m_;} else if (indexOF('.html')) {curSite = DBSite.mm131_m;} else {curSite = DBSite.mm131_m_list;}},
                retry: true,
                pager: {
                    nextL: '//div[@class="paging"]/a[text()="下一张" or text()="下一页"]',
                    pageE: '.post-content img',
                    replaceE: '.paging',
                    scrollD: 2000
                }
            }, //             MM131 - 手机版 - 图片页
            mm131_m_list: {
                pager: {
                    nextL: '#xbtn',
                    pageE: '#content > article',
                    replaceE: '#webpage',
                    scrollD: 2000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-img]', 'data-img']
                }
            }, //        MM131 - 手机版 - 分类页
            mm131_m_: {
                pager: {
                    type: 2,
                    nextL: '#webpage>span[onclick]',
                    isHidden: true,
                    interval: 500,
                    scrollD: 2000
                }
            }, //            MM131 - 手机版 - 首页
            mrcong: {
                host: 'mrcong.com',
                url: ()=> {if (lp == '/' || indexOF('/tag/')) {curSite = DBSite.mrcong_list;} else {curSite = DBSite.mrcong;}},
                pager: {
                    nextL: '.post-page-numbers.current+a.post-page-numbers',
                    pageE: '#fukie2 > p > img',
                    replaceE: '.page-link',
                    scrollD: 3000
                }
            }, //              MrCong - 图片页
            mrcong_list: {
                pager: {
                    type: 3,
                    nextL: '.current+a.page',
                    pageE: 'article.item-list',
                    scrollE: '.pagination',
                    replaceE: '.pagination',
                    scrollD: 2000
                }
            }, //         MrCong - 分类页
            buondua: {
                host: 'buondua.com',
                url: ()=> {if (indexOF(/-photos-\d+/)) {curSite = DBSite.buondua;} else {curSite = DBSite.buondua_list;}},
                pager: {
                    type: 3,
                    nextL: '//nav[@class="pagination"]//span[./a[contains(@class, "is-current")]]/following-sibling::span[1]/a',
                    pageE: '.article-fulltext > p',
                    scrollE: 'nav.pagination',
                    replaceE: 'nav.pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //             Buon Dua - 图片页
            buondua_list: {
                pager: {
                    type: 3,
                    nextL: '.pagination-next',
                    pageE: '.items-row.column, .collection-item.column',
                    scrollE: 'nav.pagination',
                    replaceE: 'nav.pagination',
                    scrollD: 1200
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //        Buon Dua - 分类页
            fnvshen: {
                host: 'www.fnvshen.com',
                url: ()=> {
                    if (indexOF('/gallery/') || indexOF('/tag/')) {
                        curSite = DBSite.fnvshen_list;
                    } else if (indexOF('/g/')) {
                        curSite = DBSite.fnvshen;
                    } else if (indexOF(/\/article\/\d+\//)) {
                        curSite = DBSite.fnvshen_article;
                    } else if (indexOF('/article/')) {
                        curSite = DBSite.fnvshen_article_list;
                    }},
                pager: {
                    nextL: '#pages > span +a:not(.a1)',
                    pageE: '#hgallery > img',
                    replaceE: '#pages',
                    scrollD: 1500
                }
            }, //             fnvshen - 图片页
            fnvshen_list: {
                style: '.yalayi_box {display: none !important; margin: -4px 0 !important;}',
                pager: {
                    nextL: '//div[@class="pagesYY"]//a[contains(text(), "下一页")]',
                    pageE: '#listdiv > ul > li',
                    replaceE: '.pagesYY',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //        fnvshen - 分类页
            fnvshen_article_list: {
                pager: {
                    nextL: '//div[@class="pagesYY"]//a[contains(text(), "下一页")]',
                    pageE: 'li.other_girlli',
                    replaceE: '.pagesYY',
                    scrollD: 1000
                }
            }, //fnvshen - 文章列表
            fnvshen_article: {
                pager: {
                    nextL: '.pagesYY a.cur+a',
                    pageE: '#articleDiv',
                    insertP: ['#articleDiv', 6],
                    replaceE: '.pagesYY',
                    scrollD: 1000
                }
            }, //     fnvshen - 文章内
            nvshen: {
                host: 'www.99nvshen.com',
                url: ()=> {
                    if (indexOF('/galleryList/') || indexOF('/modelList/')) {
                        curSite = DBSite.nvshen; curSite.pager.pageE = '.book-list > div.col-sm-4';
                    } else if (indexOF('/gallery/')) {
                        curSite = DBSite.nvshen; curSite.pager.interval = 1500; curSite.pager.scrollD = 2500;
                    }},
                pager: {
                    nextL: 'ul.pagination a[aria-label="Next"]',
                    pageE: 'a.gallery-detail-img',
                    replaceE: 'ul.pagination',
                    scrollD: 1500
                }
            }, //              nvshen
            xrmn5: {
                host: 'www.xrmn5.cc',
                url: ()=> {if (indexOF(/\d+\.html/)) {
                    curSite = DBSite.xrmn5;
                } else if (indexOF('/search')) {
                    curSite = DBSite.xrmn5_search;
                } else {
                    curSite = DBSite.xrmn5_list;
                }},
                pager: {
                    nextL: '//div[contains(@class, "page")]//a[contains(text(), "下页")]',
                    pageE: '.content_left > p > img',
                    replaceE: '.page',
                    scrollD: 3000
                }
            }, //               xrmn5 - 图片页
            xrmn5_list: {
                pager: {
                    nextL: '//div[contains(@class, "page")]//a[contains(text(), "下页")]',
                    pageE: 'ul.update_area_lists > li',
                    replaceE: '.page',
                    scrollD: 2000
                }
            }, //          xrmn5 - 分类页
            xrmn5_search: {
                pager: {
                    nextL: '.page a.current+a',
                    pageE: 'div.sousuo',
                    replaceE: '.page',
                    scrollD: 2000
                }
            }, //        xrmn5 - 搜索页
            jpmn8: {
                host: 'www.jpmn8.com',
                url: ()=> {if (indexOF(/\/\d+\.html/)) {curSite = DBSite.jpmn8;} else if (lp != '/') {curSite = DBSite.jpmn8_list;}},
                style: 'img[onload] {min-height: 500px;}',
                pager: {
                    nextL: '//div[@class="pagination1"]//a[text()="下一页"]',
                    pageE: 'img[onload]',
                    replaceE: '.pagination1',
                    scrollD: 3000
                }
            }, //               jpmn8 - 图片页
            jpmn8_list: {
                pager: {
                    nextL: '//div[@class="pagination1"]//a[text()="下一页"]',
                    pageE: 'article.excerpt',
                    replaceE: '.pagination1',
                    scrollD: 1500
                }
            }, //          jpmn8 - 分类页
            ku66: {
                host: 'www.ku66.net',
                url: ()=> {if (/\/\d+\.html/.test(location.pathname)) {curSite = DBSite.ku66;} else {curSite = DBSite.ku66_list;}},
                style: '.content img {min-height: 500px;}',
                pager: {
                    nextL: '//div[@class="NewPages"]//a[text()="下一页"]',
                    pageE: '.content > img',
                    insertP: ['.content', 3],
                    replaceE: '.NewPages',
                    scrollD: 4000
                }
            }, //                ku66 - 图片页
            ku66_list: {
                pager: {
                    nextL: '//div[@class="NewPages"]//a[text()="下一页"]',
                    pageE: '.TypeList > ul > li',
                    insertP: ['.TypeList > ul', 3],
                    replaceE: '.NewPages',
                    scrollD: 1000
                }
            }, //           ku66 - 分类页
            ku66_m: {
                host: 'm.ku66.net',
                url: ()=> {if (/\/\d+\.html/.test(location.pathname)) {curSite = DBSite.ku66_m;} else {curSite = DBSite.ku66_m_list;}},
                style: '.ArticleImageBox img {min-height: 200px;}',
                pager: {
                    nextL: '//div[@class="article_page"]//a[text()="下一页"]',
                    pageE: '.ArticleImageBox > *',
                    replaceE: '.article_page',
                    scrollD: 4000
                }
            }, //              ku66 - 手机版 - 图片页
            ku66_m_list: {
                pager: {
                    nextL: '//div[@class="article_page"]//a[text()="下一页"]',
                    pageE: '.PictureList > ul > li',
                    replaceE: '.article_page',
                    scrollD: 1000
                }
            }, //         ku66 - 手机版 - 分类页
            ku137: {
                host: 'www.ku137.net',
                url: ()=> {if (indexOF(/\/\d+\.html/)) {curSite = DBSite.ku137;} else if (lp != '/') {curSite = DBSite.ku137_list;}},
                style: '.Title9, .dibu1, .dibu2 {display: none !important;} .content img {min-height: 500px;}',
                pager: {
                    nextL: '//div[@class="page"]/a[text()="下一页"]',
                    pageE: '.content > img',
                    replaceE: '.page',
                    scrollD: 3000
                }
            }, //               ku137 - 图片页
            ku137_list: {
                pager: {
                    nextL: '//div[@class="page"]/a[text()="下一页"]',
                    pageE: '.m-list > ul > li',
                    replaceE: '.page',
                    scrollD: 1500
                }
            }, //          ku137 - 分类页
            ku137_m: {
                host: 'm.ku137.net',
                url: ()=> {if (indexOF(/\/\d+\.html/)) {curSite = DBSite.ku137_m;} else if (lp != '/') {curSite = DBSite.ku137_m_list;}},
                style: '.ArticleImageBox img {min-height: 300px;}',
                pager: {
                    nextL: '//div[@class="article_page"]//a[text()="下一页"]',
                    pageE: '.ArticleImageBox > *',
                    replaceE: '.article_page',
                    scrollD: 3000
                }
            }, //             ku137 - 手机版 - 图片页
            ku137_m_list: {
                pager: {
                    nextL: '//div[@class="article_page"]//a[text()="下一页"]',
                    pageE: '.PictureList > ul > li',
                    replaceE: '.article_page',
                    scrollD: 1500
                }
            }, //        ku137 - 手机版 - 分类页
            mnttz: {
                host: 'www.mnttz.com',
                url: ()=> {if (indexOF(/\/\d+\.html/)) {curSite = DBSite.mnttz;} else {curSite = DBSite.mnttz_list;}},
                style: 'img.content_img {min-height: 500px;}',
                pager: {
                    nextL: '.article-paging > span+a',
                    pageE: 'img.content_img',
                    replaceE: '.article-paging',
                    scrollD: 3000
                }
            }, //               mnttz - 图片页
            mnttz_list: {
                pager: {
                    nextL: 'li.next-page > a',
                    pageE: 'article.excerpt',
                    replaceE: '.pagination',
                    scrollD: 1500
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //          mnttz - 分类页
            kingdom: {
                host: /kingdom-en\.com/,
                url: ()=> {if (indexOF(/\/\d+\.html/)) {curSite = DBSite.kingdom;} else if (lp != '/') {curSite = DBSite.kingdom_list;}},
                style: '.pic_center img {min-height: 300px;} .arcmain > .title, .footer, .index-list-title, .listmain_st {display: none !important;}',
                pager: {
                    nextL: 'a.page_next',
                    pageE: '.pic_center img',
                    replaceE: '.pagenav',
                    scrollD: 4000
                }
            }, //             kingdom - 图片页
            kingdom_list: {
                pager: {
                    nextL: 'a.page_next',
                    pageE: 'li.media',
                    replaceE: '.pagination',
                    scrollD: 1000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-src]', 'data-src']
                }
            }, //        kingdom - 分类页
            kissgoddess: {
                host: /kissgoddess\./,
                url: ()=> {if (indexOF('/album/') || indexOF('/category/')) curSite = DBSite.kissgoddess;},
                style: '.td-gallery-content > img {min-height: 300px;}',
                pager: {
                    nextL: 'a.a1:last-of-type',
                    pageE: '.td-gallery-content > img, .td-category-span',
                    replaceE: '#pages',
                    scrollD: 3000
                },
                function: {
                    bF: src_bF,
                    bFp: [0, 'img[data-original]', 'data-original']
                }
            }, //         Kiss Goddess - 图片页
            planetminecraft: {
                host: 'www.planetminecraft.com',
                url: ()=> {if (!indexOF('/forums/') && !indexOF('/posts/')) {curSite = DBSite.planetminecraft;}},
                style: '.resource .r-preview>a img[loading=lazy]:not(.lazyloaded) {visibility: initial !important;}',
                pager: {
                    nextL: 'a.pagination_next',
                    pageE: '.resource_block > ul.resource_list > li',
                    replaceE: '.pagination',
                    scrollD: 3000
                }
            }, //   Planet Minecraft
            cadtutor: {
                host: 'www.cadtutor.net',
                url: ()=> {
                    if (indexOF('/forum/forum/')) {
                        curSite = DBSite.cadtutor;
                    } else if (indexOF('/forum/topic/') && GM_getValue('menu_thread')) {
                        curSite = DBSite.cadtutor_post;
                    } else if (indexOF('/forum/search/')) {
                        curSite = DBSite.cadtutor_search;
                    }},
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: 'ol.ipsDataList > li:not([data-rowid])~li',
                    replaceE: 'ul.ipsPagination',
                    scrollD: 2000
                }
            }, //          CADTutor - 列表页
            cadtutor_post: {
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: '#elPostFeed > form > *:not(input):not(.after-first-post)',
                    replaceE: 'ul.ipsPagination',
                    scrollD: 2000
                }
            }, //     CADTutor - 帖子内
            cadtutor_search: {
                pager: {
                    nextL: 'a[rel="next"]',
                    pageE: 'ol.ipsStream > li',
                    replaceE: 'ul.ipsPagination',
                    scrollD: 2000
                }
            }, //   CADTutor - 搜索页
            theswamp: {
                host: 'www.theswamp.org',
                url: ()=> {
                    if (!location.search) return
                    if (indexOF('board=', 's')) {
                        curSite = DBSite.theswamp;
                    } else if (indexOF('topic=', 's') && GM_getValue('menu_thread')) {
                        curSite = DBSite.theswamp_post;
                    }},
                pager: {
                    nextL: '.pagelinks > strong+a',
                    pageE: '#messageindex tbody > tr:not([class])',
                    replaceE: '.pagelinks',
                    scrollD: 2000
                }
            }, //          TheSwamp - 列表页
            theswamp_post: {
                pager: {
                    nextL: '.pagelinks > strong+a',
                    pageE: '#forumposts form > *',
                    replaceE: '.pagelinks',
                    scrollD: 2000
                }
            } //      TheSwamp - 帖子内
        };
        // 生成 SiteTypeID
        if (JSON.stringify(GM_getValue('menu_customRules', {})).indexOf('functionS') > -1 || JSON.stringify(GM_getValue('menu_customRules', {})).indexOf('css;') > -1) { // 改名过渡，过段时间将其移除
            GM_setValue('menu_customRules', JSON.parse(JSON.stringify(GM_getValue('menu_customRules', {})).replaceAll('functionS', 'url').replaceAll('css;', '')))
        }
        //console.log(GM_getValue('menu_customRules'), GM_getValue('menu_rules'))
        DBSite = Object.assign(GM_getValue('menu_customRules', {}), GM_getValue('menu_rules', {}), DBSite)
        setSiteTypeID();
        //console.log(DBSite)
        // 用于脚本判断（针对部分特殊的网站）
        SiteType = {
            BAIDU_TIEBA: DBSite.baidu_tieba.SiteTypeID
        };
    }
    // 获取外置翻页规则
    function getRulesUrl(update = false) {
        if (update) GM_setValue('menu_ruleUpdateTime', '1970/1/1');
        //console.log(new Date().getTime());
        let timeNow = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate(),
            timeOld = GM_getValue('menu_ruleUpdateTime');
        if (!timeOld || timeOld != timeNow) { // 是新的一天
            GM_setValue('menu_ruleUpdateTime', timeNow); //      写入时间以供后续比较

            GM_xmlhttpRequest({
                url: 'https://userscript.xiu2.xyz/other/Autopage/rules.json',
                method: 'GET',
                responseType: 'json',
                overrideMimeType: 'application/json; charset=utf-8',
                timeout: 5000,
                onload: function (response) {
                    try {
                        //console.log('最终 URL：' + response.finalUrl, '返回内容：',response.response)
                        if (response.response) {
                            GM_setValue('menu_rules', response.response);
                            if (update) {
                                curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                                registerMenuCommand(); // 重新判断规则
                                //console.log(new Date().getTime());
                                //console.log(curSite);
                                if (curSite.style) {insStyle(curSite.style)} // 插入 Style CSS 样式
                                curSite.pageUrl = ''; // 下一页URL
                                pageLoading(); // 自动无缝翻页

                                if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                                pausePageEvent(); // 左键双击网页空白处暂停翻页
                                GM_notification({text: '✅ 已更新外置翻页规则！如果依然无法翻页，则说明还不支持，欢迎提交申请~', timeout: 5000});
                            }
                        } else {
                            GM_notification({text: '❌ 更新失败，请联系作者解决...', timeout: 5000});
                        }
                    } catch (e) {
                        console.log(e);
                        GM_notification({text: '❌ 更新失败，请联系作者解决...', timeout: 5000});
                    }
                }
            })
        }
    }


    // --------------------------------------------------------


    // 判断网站类型
    webTypeIf();
    //console.log(curSite)
    // 显示页码
    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');}
    // 左键双击网页空白处暂停翻页
    pausePageEvent();
    // 强制新标签页打开链接（翻页模式 5/6）
    if (curSite.forceTarget) forceTarget();

    // 对于使用 pjax 技术的网站，需要监听 URL 变化来重新判断翻页规则
    if (locationC) {
        nowLocation = location.href
        if (window.onurlchange === undefined) {addUrlChangeEvent();} // Tampermonkey v4.11 版本添加的 onurlchange 事件 grant，可以监控 pjax 等网页的 URL 变化
        if (webType === 1) {
            window.addEventListener('urlchange', function(){
                lp = location.pathname;
                //console.log(nowLocation, location.href)
                if (curSite.history !== false && window.top.document.xiu_nowUrl === location.href) {nowLocation = location.href; return}
                if (nowLocation == location.href) return
                if (curSite.pager && curSite.pager.type == 5) {
                    if (self != top) {window.top.location.href = location.href;} else {if (getCSS('iframe#xiu_iframe')) {getCSS('iframe#xiu_iframe').remove();}}
                    pausePage = true;
                } // 对于翻页模式 5，如果是 iframe 框架内 URL 变动，则升级为顶级页面，如果是顶级页面的 URL 变动，则清理 iframe 框架
                nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                registerMenuCommand(); // 重新判断规则
                //console.log(curSite);
                if (curSite.style) {insStyle(curSite.style)} // 插入 Style CSS 样式
                curSite.pageUrl = ''; // 下一页URL
                pageLoading(); // 自动无缝翻页

                if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                pausePageEvent(); // 左键双击网页空白处暂停翻页
            })
        } else if (webType === 2) {
            window.addEventListener('urlchange', function(){
                lp = location.pathname;
                //console.log(nowLocation, location.href)
                if (nowLocation == location.href) return
                setTimeout(function(){
                    nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                    discuz_(); // 重新判断规则
                    if (curSite.style) {insStyle(curSite.style)} // 插入 Style CSS 样式
                    pageLoading(); // 自动无缝翻页

                    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                    pausePageEvent(); // 左键双击网页空白处暂停翻页
                }, 500)
            })
        } else if (webType === 3) {
            window.addEventListener('urlchange', function(){
                lp = location.pathname;
                if (nowLocation == location.href) return
                nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                DBSite.flarum.url(); // 重新判断规则
                if (curSite.style) {insStyle(curSite.style)} // 插入 Style CSS 样式
                pageLoading(); // 自动无缝翻页

                if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                pausePageEvent(); // 左键双击网页空白处暂停翻页
            })
        }
    }
    // 插入 Style CSS 样式
    if (curSite.style) insStyle(curSite.style)

    // 对翻页模式 5 的子 iframe 添加一个跟随滚动的事件
    if (curSite.pager && curSite.pager.type === 5 && self != top) {
        var beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop
        window.addEventListener('scroll', function (e) {
            let scrollTop = window.parent.document.documentElement.scrollTop || window.parent.document.body.scrollTop,
                clientHeight = window.parent.document.documentElement.clientHeight || window.parent.document.body.clientHeight,
                scrollHeight = window.parent.document.documentElement.scrollHeight || window.parent.document.body.scrollHeight,
                afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                delta = afterScrollTop - beforeScrollTop;
            if (delta == 0) return false;
            beforeScrollTop = afterScrollTop;
            //console.log(delta, scrollHeight - (scrollTop + clientHeight), '2222')
            if (delta > 0 && scrollTop + clientHeight < scrollHeight) {
                window.parent.scrollBy(0, delta*2);
            }
        }, false);
    }

    // 下一页URL
    curSite.pageUrl = '';
    // 自动无缝翻页
    pageLoading();


    // --------------------------------------------------------


    // [Discuz! 论坛] 判断各版块帖子列表类型
    function discuzForum(m) {
        if (m == 'm') { // 手机版页面
            if (getCSS('a.loadmore')) {
                curSite = DBSite.discuz_m_forum;
            } else if (getCSS('.threadlist')) {
                curSite = DBSite.discuz_m; curSite.pager.pageE = '.threadlist > ul > li';
            } else if (getCSS('[id^="normalthread_"]')) {
                curSite = DBSite.discuz_m; curSite.pager.pageE = '[id^="normalthread_"]:not(.ZDlist)';
            }
            if (curSite.SiteTypeID !== 0 && location.hostname === 'keylol.com') {curSite.history = false; locationC = true;}
        } else {
            if (getCSS('#autopbn')) { //         判断是否有 [下一页] 按钮
                curSite = DBSite.discuz_forum;
            } else if (getCSS('#waterfall')) { //           判断是否为图片模式
                if (!getCSS('#pgbtn, .pgbtn')) { //         如果各版块帖子列表已存在这个元素，说明自带了无缝翻页
                    curSite = DBSite.discuz_waterfall; waterfallStyle(); // 图片模式列表样式预处理
                }
            } else {
                curSite = DBSite.discuz_guide;
            }
        }
    }
    // [Discuz! 论坛] 判断手机版帖子内
    function discuzThreadM() {
        if (getCSS('[id^="pid"]')) {
            curSite = DBSite.discuz_m; curSite.pager.pageE = '[id^="pid"], [id^="pid"]+div:not([id="post_new"])'
        } else if (getCSS('[id^="post_"]')) {
            curSite = DBSite.discuz_m; curSite.pager.pageE = '[id^="post_"]';
        }
        if (curSite.SiteTypeID !== 0 && location.hostname === 'keylol.com') {curSite.history = false; locationC = true;}
    }
    function discuz_() {
        if (getCSS('body[id="nv_forum"][class^="pg_"][onkeydown*="27"]')) {
            switch (getCSS('body[id="nv_forum"][class^="pg_"][onkeydown*="27"]').className) {
                case 'pg_forumdisplay': // < 各版块帖子列表 >
                    discuzForum(); break;
                case 'pg_viewthread': //   < 帖子内 >
                    if (GM_getValue('menu_thread')) curSite = DBSite.discuz_thread; break;
                case 'pg_guide': //        < 导读帖子列表等 >
                    curSite = DBSite.discuz_guide; break;
                case 'pg_collection': //   < 淘贴列表 >
                    curSite = DBSite.discuz_collection; break;
            }
        }
        // 如果上面没有匹配的则继续                  < 搜索结果 >
        if (curSite.SiteTypeID === 0) {
            if (indexOF('search') || getCSS('body[id="nv_search"][onkeydown*="27"]')) {
                if (indexOF('mobile=2', 's')) { // 手机版页面
                    curSite = DBSite.discuz_m; curSite.pager.pageE = '.threadlist > ul > li'; locationC = true;
                } else {
                    curSite = DBSite.discuz_search;
                }
            }
        }
        // 如果上面没有匹配的则继续
        if (curSite.SiteTypeID === 0) {
            if (indexOF('.html')) { //                   判断是不是静态网页（.html 结尾）
                if (indexOF('/forum-')) { //             < 各版块帖子列表 >
                    if (getXpath('//head/meta[@name="applicable-device" and @content="mobile"] | //head/title[contains(text(), "手机版")] | //head/link[contains(@href, "/mobile/")] | //head/script[contains(@src, "/mobile/")]')) { // 手机版页面
                        discuzForum('m');
                    } else {
                        discuzForum();
                    }
                } else if (indexOF('/thread-')) { //     < 帖子内 >
                    if (getXpath('//head/meta[@name="applicable-device" and @content="mobile"] | //head/title[contains(text(), "手机版")] | //head/link[contains(@href, "/mobile/")] | //head/script[contains(@src, "/mobile/")]')) { // 手机版页面
                        if (GM_getValue('menu_thread')) discuzThreadM();
                    } else {
                        if (GM_getValue('menu_thread')) curSite = DBSite.discuz_thread;
                    }
                }
            }
        }
        // 如果上面没有匹配的则继续
        if (curSite.SiteTypeID === 0) {
            if (indexOF('mod=forumdisplay', 's') || indexOF('forumdisplay.php')) { //      < 各版块帖子列表 >
                if (indexOF('mobile=2', 's') || indexOF('mobile=yes', 's') || getXpath('//head/meta[@name="applicable-device" and @content="mobile"] | //head/title[contains(text(), "手机版")] | //head/link[contains(@href, "/mobile/")] | //head/script[contains(@src, "/mobile/")]')) { // 手机版页面
                    discuzForum('m');
                } else {
                    discuzForum();
                }
            } else if (indexOF('mod=viewthread', 's') || indexOF('viewthread.php')) { // < 帖子内 >
                if (indexOF('mobile=2', 's') || getXpath('//head/meta[@name="applicable-device" and @content="mobile"] | //head/title[contains(text(), "手机版")] | //head/link[contains(@href, "/mobile/")] | //head/script[contains(@src, "/mobile/")]')) { // 手机版页面
                    if (GM_getValue('menu_thread')) discuzThreadM();
                } else {
                    if (GM_getValue('menu_thread')) curSite = DBSite.discuz_thread;
                }
            } else if (indexOF('mod=guide', 's')) { //      < 导读帖子列表 >
                curSite = DBSite.discuz_guide;
            } else if(indexOF('mod=space', 's') && indexOF('do=thread', 's')) { // 别人的主题/回复
                curSite = DBSite.discuz_youspace;
            } else if (indexOF('mod=collection', 's')) { // < 淘贴列表 >
                curSite = DBSite.discuz_collection;
            } else if (getCSS('#threadlist')) { //          < 部分论坛的各板块 URL 是自定义的 >
                discuzForum();
            } else if (getCSS('#postlist')) { //            < 部分论坛的帖子内 URL 是自定义的 >
                if (GM_getValue('menu_thread')) curSite = DBSite.discuz_thread;
            } else { // 手机版判断
                discuzForum('m');
                if (curSite.SiteTypeID === 0) discuzThreadM();
            }
        }
    }
    // [Discuz! 论坛] 图片模式列表样式预处理
    function waterfallStyle() {
        let width = getCSS('#waterfall > li:first-child').style.width;
        if (width) insStyle(`#waterfall {height: auto !important; width: 100% !important;} #waterfall > li {width: ${width} !important; float: left !important; position: inherit !important; left: auto !important; top: auto !important;}`);
    }


    // [谷歌搜索] 的插入前函数（加载视频图片）
    function google_bF(pageElems) {
        if (!indexOF('tbm=nws', 's')){
            pageElems.forEach(function (one) {
                getAllCSS('a[aria-label][href*="https://www.youtube.com/watch?v="]').forEach(function (one1) {
                    let img = getCSS('img', one1)
                    if (img) img.src = `https://i.ytimg.com/vi/${one1.href.split('?v=')[1]}/mqdefault.jpg`
                })
            });
        }
        return pageElems
    }


    // [必应搜索] 的插入前函数（加载网站图标）
    function bing_bF(pageElems) {
        if (!getCSS('.b_title > a.sh_favicon')) {
            insStyle('.b_title > a.sh_favicon {display: none !important;}');
            delete curSite.function
            //console.log(curSite)
            return pageElems
        }
        pageElems.forEach(function (one) {
            getAllCSS('div.rms_iac[data-src]').forEach(function (one1) {
                one1.outerHTML = `<img src="${one1.dataset.src}" height="16" width="16" alt="全球 Web 图标" role="presentation" class="rms_img">`;
            })
        });
        return pageElems
    }


    // [百度贴吧]（发帖按钮点击事件）
    function baidu_tieba_1() {
        let button = getCSS('.tbui_aside_fbar_button.tbui_fbar_post > a');
        if (button) {
            button.remove();
            getCSS('li.tbui_aside_fbar_button.tbui_fbar_down').insertAdjacentHTML(getAddTo(4), '<li class="tbui_aside_fbar_button tbui_fbar_post"><a href="javascript:void(0);" title="因为 [自动无缝翻页] 的原因，请点击该按钮发帖！"></a></li>')
            button = getCSS('.tbui_aside_fbar_button.tbui_fbar_post > a');
            if (button) {
                button.onclick = function(){
                    let button2 = getCSS('div.edui-btn.edui-btn-fullscreen.edui-btn-name-portrait');
                    if (button2) {button2.click();} else {alert('提示：登录后才能发帖！');}
                    return false;
                }
            }
        }
    }
    // [百度贴吧] 插入数据
    function baidu_tieba_insertE(pageElems, type) {
        if (!pageElems) return
        // 获取 <script> 内容
        const scriptElems = getXpath(`//script[contains(text(), 'Bigpipe.register("frs-list/pagelet/thread_list", ')]`, pageElems, pageElems);
        if (scriptElems) {
            // 从 <script> 中提取帖子列表字符串
            let scriptText = scriptElems.textContent.replace('Bigpipe.register("frs-list/pagelet/thread_list", ','');
            scriptText = scriptText.slice(0, scriptText.indexOf(').'));
            // 字符串转 Element 元素
            let temp_baidu_tieba = document.createElement('div'); temp_baidu_tieba.innerHTML = JSON.parse(scriptText).content;
            processElems(temp_baidu_tieba);
        }
    }


    // [V2EX] 的插入后函数（新标签页打开链接）
    function v2ex_aF(css) {
        let links = getAllCSS(css);if (!links) return
        links.forEach(function (_this) {_this.target = '_blank';});
    }


    // [NexusMods] 获取下一页地址
    function nexusmods_nextL() {
        if (getCSS('.nexus-ui-blocker')) return
        let modList;
        if (indexOF('/news')) {modList = RH_NewsTabContent;} else {modList = RH_ModList;}
        if (!modList) return
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
            return `https://www.nexusmods.com${modList.uri}?RH_${modList.id}=${out_items}`
        }
        return ''
    }
    // [NexusMods] 的插入前函数（隐藏底部元素）
    function nexusmods_bF(pageElems) {
        pageElems.forEach(function (one) {
            let now = one.querySelector('.mod-tile-left');
            if (now) {
                let downloadCount = now.querySelector('.downloadcount > span.flex-label');
                if (downloadCount) {
                    if (GlobalModStats[now.dataset.gameId] && GlobalModStats[now.dataset.gameId][now.dataset.modId]) {
                        downloadCount.textContent = shortFormat(parseInt(GlobalModStats[now.dataset.gameId][now.dataset.modId].total));
                    }
                }
            }
        });
        return pageElems
    }


    // [bilibili_search] 获取下一页地址
    function bilibili_search_nextL() {
        if (!location.search) return
        let pageActive = 1, pageLast = parseInt(getXpath('//ul[@class="pages"]/li[contains(@class, "page-item")][not(contains(@class, "next") or contains(@class, "prev"))][last()]').innerText);
        if (!pageLast) return
        if (indexOF(/page=\d+/, 's')) {
            pageActive = parseInt(/page=\d+/.exec(location.search)[0].replace('page=',''))
        }
        if (pageActive < pageLast) {
            if (indexOF(/page=\d+/, 's')) {
                return (location.origin + location.pathname + location.search.replace(/page=\d+/,`page=${pageActive+1}`))
            } else {
                return (location.origin + location.pathname + location.search + `&page=${pageActive+1}`)
            }
        }
    }
    // [bilibili_search] 插入前函数（加载图片）
    function bilibili_search_bF(pageElems) {
        pageElems.forEach(function (one) {
            let img = getCSS('.img > .lazy-img > img[src=""]', one)
            if (img) {
                img.setAttribute('data-srclz', 'lazy')
            }
        });
        return pageElems
    }
    // [bilibili_search] 插入后函数（加载图片）
    function bilibili_search_aF() {
        let result = __INITIAL_STATE__.flow[__INITIAL_STATE__.flow.fields[0]].result;
        if (result.length > 0) {
            let imgArr = getAllCSS('.img > .lazy-img > img[data-srclz]');
            if (imgArr.length > 0) {
                for (let i = 0; i < imgArr.length; i++) {
                    imgArr[i].src = result[i].pic;
                    imgArr[i].removeAttribute('data-srclz');
                }
            }
        }
    }


    // [漫画狂] 获取下一页地址
    function cartoonmad_nextL() {
        let url = getXpath('//a[@class="pages"][contains(text(),"下一頁")]');
        if (url) {
            if (url.getAttribute('href') === 'thend.asp') {
                url = getXpath('//a[@class="pages"][contains(string(),"下一話")]')
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
        for (let now of img_data_arr) {_img += `<img src="${asset_domain}${img_pre}${now}">`;}
        getOne(curSite.pager.insertP[0]).innerHTML = _img;

    }
    // [漫画猫] 获取下一页地址
    function manhuacat_nextL(pageElems, type) {
        if (type === 'url') {
            if(pageElems.code == '0000') {
                if (pageElems.url === curSite.pageUrl) return
                curSite.pageUrl = pageElems.url;
                getPageElems_(curSite.pageUrl); // 真正的下一页链接
            }
        } else {
            let vg_r_data = getCSS('.vg-r-data');
            if (vg_r_data) {
                getPageElems_(`${location.origin}/chapter_num?chapter_id=${vg_r_data.dataset.chapter_num}&ctype=1&type=${vg_r_data.dataset.chapterType};`, 'json', 'GET', '', 'url');
            }
        }
    }
    // [漫画猫] 插入数据
    function manhuacat_insertE(pageElems, type) {
        if (!pageElems) return
        if (type === 'url') { // 获取下一页链接
            manhuacat_nextL(pageElems, type); return
        }
        addHistory(pageElems);
        replaceElems(pageElems);

        // 插入图片
        let _img = '', _img_arr = LZString.decompressFromBase64(getXpath('//body/script[not(@src)][contains(text(), "img_data")]').textContent.split('"')[1]).split(','), vg_r_data = getCSS('.vg-r-data');;
        for (let now of _img_arr) {_img += `<img src="${vg_r_data.dataset.chapterDomain}${img_pre}${now}">`;}
        if (_img) {
            getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
            pageNum.now = pageNum._now + 1
        }
    }


    // [漫画柜] 初始化（将本话其余图片插入网页中）
    function manhuagui_init() {
        // hook imgDate 代码
        SMH.imgData = function(n) {window['imgDate'] = n;return{preInit:function(){}}}
        // 重新执行本页的 imgDate 代码
        insScript(curSite.pager.pageE);
        let _img = '', imgPath = `${location.protocol}//i.hamreus.com${window['imgDate'].path}`;
        //console.log(imgPath, window['imgDate'])
        if (!(window['imgDate']) || !(imgPath)) return
        // 遍历图片文件名数组，组合为 img 标签
        for (let i = 0; i < window['imgDate'].files.length; i++) {_img += `<img src="${imgPath + window['imgDate'].files[i]}?e=${window['imgDate'].sl.e}&m=${window['imgDate'].sl.m}">`;}
        // 插入并覆盖原来的一个图片
        getOne(curSite.pager.insertP[0]).innerHTML = _img;
        pausePage = true;
    }
    // [漫画柜] 获取下一页地址
    function manhuagui_nextL() {
        if (window['imgDate'].nextId == 0) return
        var url = location.origin + location.pathname.replace(window['imgDate'].cid.toString(), window['imgDate'].nextId.toString())
        if (url === curSite.pageUrl) return
        curSite.pageUrl = url
        getPageElems_(curSite.pageUrl);
    }
    // [漫画柜] 插入数据
    function manhuagui_insertE(pageElems, type) {
        if (!pageElems) return
        // 重新执行本页的 imgDate 代码
        insScript(curSite.pager.pageE, document.body, pageElems);
        let _img = '', imgPath = `${location.protocol}//i.hamreus.com${window['imgDate'].path}`;
        //console.log(imgPath, window['imgDate'])
        if (!(window['imgDate']) || !(imgPath)) return
        // 遍历图片文件名数组，组合为 img 标签
        for (let i = 0; i < window['imgDate'].files.length; i++) {_img += `<img src="${imgPath + window['imgDate'].files[i]}?e=${window['imgDate'].sl.e}&m=${window['imgDate'].sl.m}">`;}
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img);
        addHistory(pageElems);
        pageNum.now = pageNum._now + 1
    }


    // [36漫画] 初始化（将本话其余图片插入网页中）
    function _36manga_init() {
        let _img = '', imgPath = `${SinConf.resHost[0].domain[0]}${chapterPath}`;
        if (!(chapterImages) || !(imgPath)) return
        // 遍历图片文件名数组，组合为 img 标签
        for (let i = 0; i < chapterImages.length; i++) {_img += `<img src="${imgPath}${chapterImages[i]}">`;}
        // 插入并覆盖原来的一个图片
        getOne(curSite.pager.insertP[0]).innerHTML = _img;
        pausePage = true;
    }
    // [36漫画] 获取下一页地址
    function _36manga_nextL() {
        if (!nextChapterData.id) return
        var url = comicUrl + nextChapterData.id + '.html'
        if (url === curSite.pageUrl) return
        curSite.pageUrl = url
        getPageElems_(curSite.pageUrl);
    }
    // [36漫画] 插入数据
    function _36manga_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并执行数据代码
        insScript(curSite.pager.pageE, document.body, pageElems);
        let _img = '', imgPath = `${SinConf.resHost[0].domain[0]}${chapterPath}`;
        if (!(chapterImages) || !(imgPath)) return
        // 遍历图片文件名数组，组合为 img 标签
        for (let i = 0; i < chapterImages.length; i++) {_img += `<img src="${imgPath}${chapterImages[i]}">`;}
        // 插入并覆盖原来的一个图片
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img);
        addHistory(pageElems);
        pageNum.now = pageNum._now + 1
    }


    // [爱漫画] 获取全部图片
    function imanhuaw_getIMG() {
        let _img = '', _imgUrl;
        for (let one of base64_decode(qTcms_S_m_murl_e).split("$qingtiandy$")) {
            _imgUrl = one;
            if (one.substring(0,1) == '/') {
                _imgUrl = qTcms_m_weburl + _imgUrl;
            } else {
                if (qTcms_Pic_m_if != '2') {
                    one = one.replace(/\?/gi, 'a1a1');
                    one = one.replace(/&/gi, 'b1b1');
                    one = one.replace(/%/gi, 'c1c1');
                    let m_httpurl = '';
                    if (typeof(qTcms_S_m_mhttpurl) != 'undefined') m_httpurl = base64_decode(qTcms_S_m_mhttpurl);
                    if (location.hostname == 'www.ccshwy.com') qTcms_m_indexurl = 'http://h.ccshwy.com/';
                    _imgUrl = qTcms_m_indexurl + 'statics/pic/?p=' + escape(one) + '&picid=' + qTcms_S_m_id + '&m_httpurl=' + escape(m_httpurl);
                } else {
                    _imgUrl = _imgUrl.replace('http:', '')	;
                    _imgUrl = _imgUrl.replace('https:', '');
                }
            }
            _img += `<img src="${_imgUrl}">`;
        }
        return _img;
    }
    // [爱漫画] 初始化（调整本话其余图片）
    function imanhuaw_init() {
        getOne(curSite.pager.insertP[0]).outerHTML = imanhuaw_getIMG();
        document.oncontextmenu = function(){}
    }
    // [爱漫画] 获取下一页地址
    function imanhuaw_nextL() {
        let next = location.origin + qTcms_Pic_nextArr
        if (next && next != location.origin && next != curSite.pageUrl) {
            curSite.pageUrl = next;
            getPageElems_(curSite.pageUrl);
        }
    }
    // [爱漫画] 插入数据
    function imanhuaw_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScript('//head/script[not(@src)][contains(text(), "qTcms_S_m_murl_e")]', document.body, pageElems);
        // 将 img 标签插入到网页中
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), imanhuaw_getIMG());
        addHistory(pageElems);
        pageNum.now = pageNum._now + 1
    }


    // [漫画 DB] 初始化（将本话其余图片插入网页中）
    function manhuadb_init() {
        let _img = '', data = getCSS('.vg-r-data'), imgDate;
        if (!data) return
        getAllCSS(curSite.pager.pageE.replace('', '')).forEach(function (one) {
            if (one.tagName === 'SCRIPT' && one.textContent.indexOf('var img_data =') > -1) {
                let json = JSON.parse(window.atob(one.textContent.split("'")[1]));
                if (json) {
                    let _img = '';
                    for (let i = 0; i < json.length; i++) {_img += `<img class="img-fluid show-pic" src="${data.dataset.host + data.dataset.img_pre + json[i].img}">`;}
                    getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                }
            }
        })
    }
    // [漫画 DB] 获取下一页地址
    function manhuadb_nextL() {
        let nextArr = getAllCSS('a.fixed-a-es'), next;
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
        getPageElems_(curSite.pageUrl);
    }
    // [漫画 DB] 插入数据
    function manhuadb_insertE(pageElems, type) {
        if (!pageElems) return
        if (replaceElems(pageElems, curSite.pager.pageE, curSite.pager.pageE)) {
            addHistory(pageElems);
            pageNum.now = pageNum._now + 1
            manhuadb_init(); // 将刚刚替换的图片插入网页中
        }
    }


    // [HiComic(嗨漫画)] 初始化（将本话其余图片插入网页中）
    function hicomic_init() {
        let _img = '';
        getAllCSS('.chapter > section:not(:first-child) > section[val]').forEach(function (one) {
            let src = one.getAttribute('val');
            if (src.indexOf('!p_c_c_') === -1) src += '!p_c_c_h'
            _img += `<img src="${src}">`
        })
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
        window.document.title = window.document.title.replace(/(\(第.+\))? - HiComic/, `(${getCSS('.chapter_name').textContent}) - HiComic`); // 修改网页标题（加上 第 X 话）
    }
    // [HiComic(嗨漫画)] 获取下一页地址
    function hicomic_nextL() {
        let nextId;
        nextId = getCSS('.next_chapter:not(.end)')
        if (nextId && nextId.id && nextId.id != 'None') {
            curSite.pageUrl = location.href;
            getPageElems_(`https://www.hicomic.net/api/web/chapter/${nextId.id}/contents`, 'json');
        }
    }
    // [HiComic(嗨漫画)] 插入数据
    function hicomic_insertE(pageElems, type) {
        if (!pageElems || pageElems.code != 200) return
        if (pageElems.results.chapter.next) { // 写入下一页的 UUID
            getCSS('.next_chapter').id = pageElems.results.chapter.next;
        } else {
            getCSS('.next_chapter').id = 'None';
            getCSS('.next_chapter').classList.add('end');
        }
        curSite.pageUrl =`https://www.hicomic.net/chapters/${pageElems.results.chapter.uuid}/contents`
        getCSS('.chapter_name').textContent = pageElems.results.chapter.name; // 修改漫画标题
        addHistory(pageElems, window.document.title.replace(/(\(第.+\))? - HiComic/, `(${pageElems.results.chapter.name}) - HiComic`));
        let _img = '';
        for (let i = 0; i < pageElems.results.chapter.contents.length; i++) { // 遍历图片文件名数组，组合为 img 标签
            let src = pageElems.results.chapter.contents[i].url;
            if (src.indexOf('!p_c_c_') === -1) src += '!p_c_c_h';
            _img += `<img src="${src}">`
        }
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
        pageNum.now = pageNum._now + 1
    }


    // [动漫之家] 初始化（调整本话其余图片）
    function dmzj_init(css) {
        let _img = '';
        getAllCSS(css).forEach(function (one) {_img += `<img src="${one.dataset.original}">`;})
        getOne(curSite.pager.insertP[0]).innerHTML = _img;
    }
    // [动漫之家] 插入数据
    function dmzj_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScript('head > script[type]:not([src])', document.body, pageElems);

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
            getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
            addHistory(pageElems);
            if (replaceElems(pageElems)) pageNum.now = pageNum._now + 1
        }
    }
    // [动漫之家-漫画] 插入数据
    function dmzj_manhua_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScript('head > script[type]:not([src])', document.body, pageElems);

        // 插入图片
        let _img = '';
        for (let now of arr_pages) {
            _img += `<img src="${img_prefix}${now}">`;
        }
        if (_img) {
            getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
            addHistory(pageElems);
            if (replaceElems(pageElems)) pageNum.now = pageNum._now + 1
        }
    }


    // [优酷漫画] 初始化（调整本话其余图片）
    function ykmh_init(css) {
        let host = SinMH.getChapterImage(1).split('/')[0] + '//' + SinMH.getChapterImage(1).split('/')[2];
        if (!host) return
        let _img = '';
        for (let one of chapterImages) {_img += `<img src="${host}${one}">`;}
        getOne(curSite.pager.insertP[0]).innerHTML = _img;
    }
    // [优酷漫画] 获取下一页地址
    function ykmh_nextL() {
        let url = comicUrl + nextChapterData.id + '.html'
        if (url && url != '.html' && url != curSite.pageUrl) {
            curSite.pageUrl = url;
            getPageElems_(curSite.pageUrl);
        }
    }
    // [优酷漫画] 插入数据
    function ykmh_insertE(pageElems, type) {
        //console.log(pageElems)
        if (!pageElems) return
        // 插入并运行 <script>
        insScript('//script[contains(text(),"chapterImages")]', document.body, pageElems);

        let host = SinMH.getChapterImage(1).split('/')[0] + '//' + SinMH.getChapterImage(1).split('/')[2];
        if (!host) host = document.querySelector(curSite.pager.insertP[0]).src.split('/')[0] + '//' + document.querySelector(curSite.pager.insertP[0]).src.split('/')[2]
        // 插入图片
        let _img = '';
        for (let one of chapterImages) {_img += `<img src="${host}${one}">`;}
        if (_img) {
            getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
            addHistory(pageElems);
            if (replaceElems(pageElems)) pageNum.now = pageNum._now + 1
        }
    }


    // [动漫戏说] 插入后函数（加载图片）
    function acgn_aF() {
        let old = getAllCSS('.pic[_src][id]'), _img = '';
        if (old.length > 0) {
            for (let now of old) {now.outerHTML = `<div class="pic" _src="${now.getAttribute('_src')}"><img src="${now.getAttribute('_src')}" class="img1"></div>`;}
        }
    }


    // [漫画星球] 插入数据
    function mhxqiu_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScript('//script[contains(text(), "eval") and contains(text(), "newImgs")]', document.body, pageElems);

        // 插入图片
        let _img = '';
        for (let now of newImgs) {_img += `<li><div style="display: inline-block;zoom: 1;"><img src="${now}" class="loaded lazy" style="opacity: 1;box-shadow:none;"></div></li>`;}
        if (_img) {
            // 将 img 标签插入到网页中
            getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img);
            addHistory(pageElems);
            pageNum.now = pageNum._now + 1
            replaceElems(pageElems)
        }
    }


    // [风之动漫] 插入数据
    function fffdm_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        let scriptElems = getXpath('id("main")/script[contains(text(), "mhpicurl")][1]', pageElems, pageElems);
        if (scriptElems) {
            document.body.appendChild(document.createElement('script')).textContent = scriptElems.textContent.replace(/document\.write.+/, '');

            // 插入图片
            setTimeout(function() {
                getOne(curSite.pager.insertP[0]).appendChild(document.createElement('img')).src = mhpicurl;
                addHistory(pageElems);
                pageNum.now = pageNum._now + 1
                replaceElems(pageElems)
            }, 100)
        }
    }


    // [乐语漫画] 初始化（调整本话其余图片）
    function leyuman_init() {
        let _img = '';
        for (let one of JSON.parse(z_img)) {
            if (one.slice(0,4) === 'http') {
                _img += `<img src="${one}">`;
            } else {
                _img += `<img src="https://img.shishi-life.com/${one}">`;
            }
        }
        getOne(curSite.pager.insertP[0]).innerHTML = _img;

    }
    // [乐语漫画] 插入数据
    function leyuman_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScript('//body//script[not(@src)][contains(text(), "z_img=")]', document.body, pageElems);

        // 插入图片
        let _img = '';
        for (let one of JSON.parse(z_img)) {
            if (one.slice(0,4) === 'http') {
                _img += `<img src="${one}">`;
            } else {
                _img += `<img src="https://img.shishi-life.com/${one}">`;
            }
        }
        if (_img) {
            // 将 img 标签插入到网页中
            getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img);
            addHistory(pageElems);
            pageNum.now = pageNum._now + 1
            replaceElems(pageElems)
        }
    }


    // [新新漫画] 初始化（调整本话其余图片）
    function _77mh_init() {
        let _img = '';
        for (let one of arr) {_img += `<img src="${img_qianz}${one}">`;}
        getOne(curSite.pager.insertP[0]).innerHTML = _img;
    }
    // [新新漫画] 获取下一页地址
    function _77mh_nextL() {
        let next = nextLink_b
        if (next && next != curSite.pageUrl) {
            curSite.pageUrl = next;
            getPageElems_(curSite.pageUrl);
        }
    }
    // [新新漫画] 插入数据
    function _77mh_insertE(pageElems, type) {
        if (!pageElems) return
        // 插入并运行 <script>
        insScript('//script[not(@src)][contains(text(), "eval(")]', document.body, pageElems);

        // 插入图片
        let _img = '';
        for (let one of msg.split('|')) {_img += `<img src="${img_qianz}${one}.webp">`;}
        if (_img) {
            // 将 img 标签插入到网页中
            getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img);
            addHistory(pageElems);
            pageNum.now = pageNum._now + 1
        }
    }


    // [古风漫画网] 获取下一页地址
    function gufengmh_nextL() {
        let pageElems = getOne(curSite.pager.pageE); // 寻找数据所在元素
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
                getPageElems_(curSite.pageUrl); // 访问下一页 URL 获取
            }
        }
    }
    // [古风漫画网] 插入数据
    function gufengmh_insertE(pageElems, type) {
        if (pageElems) {
            let url = curSite.pageUrl;
            pageElems = getOne(curSite.pager.pageE, pageElems, pageElems);
            let chapterImages, chapterPath;
            getOne(curSite.pager.pageE).innerText = pageElems.textContent; // 将当前网页内的数据所在元素内容改为刚刚获取的下一页数据内容，以便循环获取下一页 URL
            pageElems.textContent.split(';').forEach(function (one){ // 分号 ; 分割为数组并遍历
                //console.log(one)
                if (one.indexOf('chapterImages') > -1) { // 图片文件名数组
                    chapterImages = one.replace(/^.+\[/, '').replace(']', '').replaceAll('"', '').split(',')
                } else if (one.indexOf('chapterPath') > -1) { // 图片文件路径
                    chapterPath = one.split('"')[1];
                } else if (one.indexOf('pageTitle') > -1) { // 网页标题
                    addHistory(pageElems, one.split('"')[1]);
                }
            })
            if (chapterImages && chapterPath) {
                let _img = '';
                chapterImages.forEach(function (one2){_img += '<img src="https://res.xiaoqinre.com/' + chapterPath + one2 + '" data-index="0" style="display: inline-block;">';})
                getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                pageNum.now = pageNum._now + 1
            }
        }
    }


    // [Mangabz 漫画] 初始化（调整本话图片）
    function mangabz_init() {
        let showimage = getCSS('#showimage'),
            cp_img = getCSS('#cp_img'),
            cp_image = getCSS('#cp_image');
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
            if (getNextE('//a[./img[contains(@src, "icon_xiayizhang")]]')) getPageElems_(curSite.pageUrl); // 访问下一话 URL 获取
        } else { // 下一页
            if (!mkey) var mkey = '';
            url = location.origin + location.pathname + 'chapterimage.ashx' + `?cid=${MANGABZ_CID}&page=${MANGABZ_PAGE + 1}&key=${(mkey)}&_cid=${MANGABZ_CID}&_mid=${MANGABZ_MID}&_dt=${MANGABZ_VIEWSIGN_DT}&_sign=${MANGABZ_VIEWSIGN}`
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url
            //console.log(curSite.pageUrl)
            getPageElems_(curSite.pageUrl, 'text', 'GET', '', 'Next'); // 访问下一页 URL 获取
        }
    }
    // [Mangabz 漫画] 插入数据
    function mangabz_insertE(pageElems, type) {
        if (pageElems) {
            if (type === 'Next') { // 下一页
                let imgArr = eval(pageElems),
                    _img = '';
                for (let now of imgArr) {_img += `<img src="${now}">`;}
                if (_img) {
                    getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                    MANGABZ_PAGE += imgArr.length;
                    addHistory(pageElems, document.title, location.origin + MANGABZ_CURL.substring(0, MANGABZ_CURL.length - 1) + '-p' + MANGABZ_PAGE + '/');
                }
            } else { // 下一话
                // 插入 <script> 标签
                insScript('html:not([dir]) > head > script:not([src])', document.body, pageElems);
                addHistory(pageElems);
                pageNum.now = pageNum._now + 1
                replaceElems(pageElems)
                MANGABZ_PAGE = 0;
                mangabz_nextL();
            }
        }
    }


    // [动漫屋] 获取下一页地址
    function dm5_nextL() {
        var url = '';
        if (DM5_PAGE === DM5_IMAGE_COUNT) { // 下一话
            if (getNextE('//div[@class="view-paging"]//a[text()="下一章"]')) getPageElems_(curSite.pageUrl); // 访问下一话 URL 获取
        } else { // 下一页
            if (!mkey) var mkey = '';
            url = location.origin + location.pathname + 'chapterfun.ashx' + `?cid=${DM5_CID}&page=${DM5_PAGE + 1}&key=${(mkey)}&language=1&gtk=6&_cid=${DM5_CID}&_mid=${DM5_MID}&_dt=${DM5_VIEWSIGN_DT}&_sign=${DM5_VIEWSIGN}`
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url
            //console.log(curSite.pageUrl)
            getPageElems_(curSite.pageUrl, 'text', 'GET', '', 'Next'); // 访问下一页 URL 获取
        }
    }
    // [动漫屋] 插入数据
    function dm5_insertE(pageElems, type) {
        if (pageElems) {
            if (type === 'Next') { // 下一页
                let imgArr = eval(pageElems),
                    _img = '';
                for (let now of imgArr) {_img += `<img src="${now}">`;}
                if (_img) {
                    getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                    DM5_PAGE += imgArr.length;
                    addHistory(pageElems, document.title, location.origin + DM5_CURL.substring(0, DM5_CURL.length - 1) + '-p' + DM5_PAGE + '/');
                }
            } else { // 下一话
                // 插入 <script> 标签
                insScript('html:not([dir]) > head > script:not([src])', document.body, pageElems);
                addHistory(pageElems);
                pageNum.now = pageNum._now + 1
                replaceElems(pageElems)
                DM5_PAGE = 0;
                dm5_nextL();
            }
        }
    }


    // [Xmanhua 漫画] 获取下一页地址
    function xmanhua_nextL() {
        var url = '';
        if (XMANHUA_PAGE === XMANHUA_IMAGE_COUNT) { // 下一话
            if (getNextE('//a[./img[contains(@src, "reader-bottom-right-2.png")]]')) getPageElems_(curSite.pageUrl); // 访问下一话 URL 获取
        } else { // 下一页
            if (!mkey) var mkey = '';
            url = location.origin + location.pathname + 'chapterimage.ashx' + `?cid=${XMANHUA_CID}&page=${XMANHUA_PAGE + 1}&key=${(mkey)}&_cid=${XMANHUA_CID}&_mid=${XMANHUA_MID}&_dt=${XMANHUA_VIEWSIGN_DT}&_sign=${XMANHUA_VIEWSIGN}`
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url
            //console.log(curSite.pageUrl)
            getPageElems_(curSite.pageUrl, 'text', 'GET', '', 'Next'); // 访问下一页 URL 获取
        }
    }
    // [Xmanhua 漫画] 插入数据
    function xmanhua_insertE(pageElems, type) {
        if (pageElems) {
            if (type === 'Next') { // 下一页
                let imgArr = eval(pageElems),
                    _img = '';
                for (let now of imgArr) {_img += `<img src="${now}">`;}
                if (_img) {
                    getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                    XMANHUA_PAGE += imgArr.length;
                    addHistory(pageElems, document.title, location.origin + XMANHUA_CURL.substring(0, XMANHUA_CURL.length - 1) + '-p' + XMANHUA_PAGE + '/');
                }
            } else { // 下一话
                // 插入 <script> 标签
                insScript('html:not([dir]) > head > script:not([src])', document.body, pageElems);
                addHistory(pageElems);
                pageNum.now = pageNum._now + 1
                replaceElems(pageElems)
                XMANHUA_PAGE = 0;
                xmanhua_nextL();
            }
        }
    }


    // [COCOMANGA 漫画] 初始化（调整本话图片）
    function cocomanga_init() {
        let last = getCSS('.mh_comicpic:last-of-type');
        if (last && last.getAttribute('p')) {
            getOne(curSite.pager.insertP[0]).innerHTML = ''; // 删除旧图片元素
            cocomanga_img(parseInt(last.getAttribute('p'))) // 插入新图片元素
        }
    }
    // [COCOMANGA 漫画] 生成图片元素并插入网页
    function cocomanga_img(totalImageCount) {
        if (totalImageCount < 1) return
        let _img = '';
        for (let i=1; i<=totalImageCount; i++) {_img += `<div class="mh_comicpic" p="${i}"><img src="${__cr.getPicUrl(i)}"></div>`;}
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
    }
    // [COCOMANGA 漫画] 插入数据
    function cocomanga_insertE(pageElems, type) {
        if (pageElems) {
            // 插入 <script> 标签
            insScript('head > script:not([src]), script[src*="custom.js"], script[src*="dynamicjs.js"]', document.body, pageElems);

            // 插入新图片元素
            setTimeout(function() {
                let totalImageCount = __cdecrypt('fw122587mkertyui', CryptoJS.enc.Base64.parse(mh_info.enc_code1).toString(CryptoJS.enc.Utf8));
                if (!totalImageCount) totalImageCount = __cdecrypt('fw12558899ertyui', CryptoJS.enc.Base64.parse(mh_info.enc_code1).toString(CryptoJS.enc.Utf8));
                cocomanga_img(parseInt(totalImageCount));
            }, 100)
            addHistory(pageElems);
            pageNum.now = pageNum._now + 1
            replaceElems(pageElems)
        }
    }


    // [国家自然科学基金] 获取下一页地址
    function nsfc_nextL() {
        let id = decodeURIComponent(document.location.href.split('/')[document.location.href.split('/').length - 1]), data
        if (!document.nowPageNum) document.nowPageNum = 2
        data = `id=${id}&index=${document.nowPageNum}`
        if (data === curSite.pageUrl) return
        curSite.pageUrl = data
        getPageElems_(location.origin + '/baseQuery/data/completeProjectReport', 'json', 'POST', data); // 访问下一页 URL 获取
    }
    // [国家自然科学基金] 插入数据
    function nsfc_insertE(pageElems, type) {
        if (!pageElems || pageElems.code != 200) {curSite.SiteTypeID = 0; return}
        if (!pageElems.data.hasnext) {curSite.SiteTypeID = 0} else {document.nowPageNum++}
        pageNum.now = pageNum._now + 1
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), `<img style="width: 100%;" data-magnify="gallery" data-src="${pageElems.data.url}" src="${pageElems.data.url}">`);
    }



    // [酷科研] 获取下一页地址
    function coolkeyan_nextL() {
        if (!getCSS('.q-img__image')) return
        let id = getCSS('.q-breadcrumbs--last > span.q-breadcrumbs__el'), data
        if (id && id.textContent) {id=parseInt(id.textContent)} else {return}
        if (!document.nowPageNum) document.nowPageNum = 2
        data = `ratify_no=${id}&index=${document.nowPageNum}`
        if (data === curSite.pageUrl) return
        curSite.pageUrl = data
        getPageElems_(location.origin + '/api/funds/nsfc/creport?' + data, 'json', 'GET'); // 访问下一页 URL 获取
    }
    // [酷科研] 插入数据
    function coolkeyan_insertE(pageElems, type) {
        if (!pageElems || pageElems == {}) {curSite.SiteTypeID = 0; return}
        if (!pageElems.url) {curSite.SiteTypeID = 0; return} else {document.nowPageNum++}
        pageNum.now = pageNum._now + 1
        getCSS('.q-img>div[style*="padding-bottom"]').style.paddingBottom = `${(document.nowPageNum * 1000) - 1000}px`
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), `<div class="q-img__image absolute-full" style="background-size: contain; background-position: 50% 50%; background-image: url('${pageElems.url}'); top: ${(document.nowPageNum * 1000) - 2000}px"></div>`);
    }


    // --------------------------------------------------------


    // 自动无缝翻页
    function pageLoading() {
        if (curSite.SiteTypeID == 0) return
        windowScroll(function (direction, e) {
            // 下滑 且 未暂停翻页 且 SiteTypeID > 0 时，才准备翻页
            if (direction != 'down' || !pausePage || curSite.SiteTypeID == 0) return
            if (!curSite.pager.type) curSite.pager.type = 1; // 默认翻页模式 1
            if (!curSite.pager.scrollD) curSite.pager.scrollD = 1500; // 默认翻页触发线 1500
            // 翻页模式 5 且为框架内时，要判断顶层是否通过页码暂停翻页了
            if (curSite.pager.type == 5 && self != top && window.top.document.xiu_pausePage == false) return

            let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                scrollHeight = window.innerHeight || document.documentElement.clientHeight,
                scrollD = curSite.pager.scrollD;
            // <<<<< 翻页类型 3（依靠 [基准元素] 与 [浏览器可视区域底部] 之间的距离缩小来触发翻页）>>>>>
            if (curSite.pager.type === 3) {
                let scrollE = getOne(curSite.pager.scrollE);
                //console.log(scrollE.offsetTop, scrollE.offsetTop - (scrollTop + scrollHeight), scrollD, scrollTop + scrollHeight, curSite.SiteTypeID)
                if (scrollE.offsetTop - (scrollTop + scrollHeight) <= scrollD) {intervalPause(); checkURL(getPageElems);}

            } else if (document.documentElement.scrollHeight <= scrollHeight + scrollTop + scrollD) {
                // <<<<< 翻页类型 1（由脚本实现自动无缝翻页）>>>>>
                if (curSite.pager.type === 1) {
                    intervalPause(); checkURL(getPageElems);

                    // <<<<< 翻页类型 2（网站自带了自动无缝翻页功能，只需要点击下一页按钮即可）>>>>>
                } else if (curSite.pager.type === 2) {
                    let autopbn = getOne(curSite.pager.nextL);
                    if (!autopbn) return
                    if (curSite.pager.isHidden && isHidden(autopbn)) return // 如果 isHidden = true，那么需要判断元素是否隐藏
                    if (curSite.pager.nextText) {
                        // 按钮文本，当按钮文本 = 该文本时，才会点击按钮加载下一页
                        if (autopbn.innerText === curSite.pager.nextText) {autopbn.click(); pageNum.now = pageNum._now + 1;}
                    } else if (curSite.pager.nextTextOf) {
                        // 按钮文本的一部分，当按钮文本包含该文本时，才会点击按钮加载下一页
                        if (autopbn.innerText.indexOf(curSite.pager.nextTextOf) > -1) {autopbn.click(); pageNum.now = pageNum._now + 1;}
                    } else if (curSite.pager.nextHTML) {
                        // 按钮内元素，当按钮内元素 = 该元素内容时，才会点击按钮加载下一页
                        if (autopbn.innerHTML === curSite.pager.nextHTML) {autopbn.click(); pageNum.now = pageNum._now + 1;}
                    } else {
                        // 对于没有按钮文字变化的按钮，可以指定间隔时间（默认 300ms）
                        if (!curSite.pager.interval) curSite.pager.interval = 300;
                        intervalPause();
                        // 如果没有指定按钮文字就直接点击
                        autopbn.click(); pageNum.now = pageNum._now + 1;
                    }

                    // <<<<< 翻页类型 4（部分简单的动态加载类网站）>>>>>
                } else if (curSite.pager.type === 4) {
                    // 为百度贴吧的发帖考虑，预留底部一小部分...
                    if (!(curSite.SiteTypeID === SiteType.BAIDU_TIEBA && document.documentElement.scrollHeight <= scrollHeight + scrollTop + 200)) {
                        intervalPause(); if (typeof curSite.pager.nextL == 'function') {curSite.pager.nextL();} else if (getNextE(curSite.pager.nextL)) {getPageElems_(curSite.pageUrl);}
                    }

                    // <<<<< 翻页类型 5（插入 iframe 方式来加载下一页）>>>>>
                } else if (curSite.pager.type === 5) {
                    checkURL(insIframe);

                    // <<<<< 翻页类型 6（通过 iframe 获取下一页动态加载内容）>>>>>
                } else if (curSite.pager.type === 6) {checkURL(insIframe_);}
            }
        });

        function intervalPause() {
            if (curSite.pager.interval) {
                pausePage = false
                setTimeout(function(){pausePage = true;}, curSite.pager.interval)
            }
        }
    }

    // 翻页类型 1/3
    function getPageElems(url) {
        GM_xmlhttpRequest({
            url: url,
            method: 'GET',
            overrideMimeType: 'text/html; charset=' + document.charset,
            headers: {
                'Referer': location.href,
                'User-Agent': navigator.userAgent
            },
            timeout: 10000,
            onload: function (response) {
                try {
                    //console.log('URL：' + url, '最终 URL：' + response.finalUrl, '返回内容：' + response.responseText)
                    processElems(createDocumentByString(response.responseText));
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }
    // 翻页类型 4
    function getPageElems_(url, type = '', method = 'GET', data = '', type2) {
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
                'Content-Type': (method === 'POST') ? 'application/x-www-form-urlencoded':'',
                'User-Agent': navigator.userAgent
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
                            curSite.pager.insertE(createDocumentByString(response.responseText), type2)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }
    // 翻页类型 5（插入 iframe 方式加载下一页，无限套娃）
    function insIframe(src) {
        // 停用当前页面翻页
        if (curSite.SiteTypeID == 0) return
        curSite.SiteTypeID = 0;

        // 创建 iframe
        let iframe = document.createElement('iframe');
        iframe.style = 'position: absolute; width: 100%; height: 100%; border: none;';
        iframe.id = 'xiu_iframe';
        iframe.src = src;

        var beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 当滚动条到底部时（即完全显示 iframe 框架），隐藏当前页面的滚动条
        window.addEventListener('scroll', function () {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight,
                afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                delta = afterScrollTop - beforeScrollTop;
            if (delta == 0) return false;
            beforeScrollTop = afterScrollTop;

            //console.log(delta, (scrollTop + clientHeight + 10), scrollHeight, '1111')
            if (delta > 0 && scrollTop + clientHeight + 10 >= scrollHeight && !getCSS('#xiu-scroll')) {
                let newStyle = document.createElement('style'); newStyle.id = 'xiu-scroll';
                newStyle.textContent = 'html::-webkit-scrollbar, body::-webkit-scrollbar {width: 0 !important;height: 0 !important;} html, body {scrollbar-width: none !important;}';
                if (curSite.pager.style) newStyle.textContent += curSite.pager.style;
                document.documentElement.appendChild(newStyle);
                iframe.focus();
                iframe.document.body.focus();
                //iframe.document.body.click();
            } else if (delta < 0 && getCSS('#xiu-scroll')) {
                getCSS('#xiu-scroll').remove();
            }
        }, false);

        // 加载完成后才继续
        iframe.onload = function() {
            // 添加历史记录
            if (curSite.history !== false) addHistory(iframe.contentWindow.document, iframe.contentWindow.document.title);
            // 当前页码 + 1
            if (!curSite.hiddenPN) {
                let autopageNumber = getCSS('#Autopage_number', window.top.document)
                if (autopageNumber) {autopageNumber.textContent = parseInt(autopageNumber.textContent) + 1;}
            }
        }

        // 插入 iframe
        document.documentElement.appendChild(iframe);
    }
    // 翻页类型 6（通过 iframe 获取下一页动态加载内容，只有一个娃）
    function insIframe_(src) {
        // 暂停翻页
        if (!pausePage) return
        pausePage = false
        //console.log(src)
        // 如果不存在，则创建一个 iframe
        let iframe = document.getElementById('xiu_iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.style = 'position: absolute; top: -9999px; left: -9999px; width: 100%; height: 100%; border: none; z-index: -999; /*visibility: hidden;*/';
            iframe.id = 'xiu_iframe';
            iframe.src = src;
        }

        // 加载完成后才继续
        iframe.onload = function() {
            //iframe.contentWindow.scrollTo(0, 999999); // 滚动到底部，以触发网页的滚动条相关加载事件
            //iframe.contentWindow.scrollTo({top: 9999999, behavior: 'smooth'});
            if (!curSite.pager.loadTime) curSite.pager.loadTime = 100; // 默认 100ms
            //console.log(curSite.pager.loadTime, curSite.pager.loadTime/30)
            //console.time('sort');
            let time1 = 0 ,time2 = setInterval(function(){
                let scrollHeight = (iframe.contentWindow.document.documentElement.scrollHeight || iframe.contentWindow.document.body.scrollHeight)/10
                iframe.contentWindow.scrollTo(0, 999999);
                iframe.contentWindow.scrollTo(0, scrollHeight*time1);
                //console.log(time1, iframe.contentWindow.document.documentElement.scrollHeight || iframe.contentWindow.document.body.scrollHeight)
                if (++time1 == 10) {
                    //console.timeEnd('sort');
                    clearInterval(time2);
                    processElems(iframe.contentWindow.document); // 插入/替换元素等
                    //console.log(iframe.contentWindow.document.documentElement.scrollHeight || iframe.contentWindow.document.body.scrollHeight)
                    pausePage = true; //      恢复翻页
                }
            }, curSite.pager.loadTime/10)
        }

        // 插入 iframe（如果已存在则直接改 src）
        if (document.getElementById('xiu_iframe')) {
            iframe.src = src;
        } else {
            document.documentElement.appendChild(iframe);
        }
    }


    // XHR 后处理结果，插入、替换元素等（适用于翻页类型 1/3/6）
    function processElems(response) {
        if (!curSite.pager.insertP) {curSite.pager.insertP = [curSite.pager.pageE, 5]}
        let pageElems = getAll(curSite.pager.pageE, response, response), toElement;
        if (curSite.pager.insertP[1] === 5) { // 插入 pageE 列表最后一个元素的后面
            toElement = getAll(curSite.pager.insertP[0]).pop();
        } else {
            toElement = getOne(curSite.pager.insertP[0]);
        }
        //console.log(curSite.pager.pageE, pageElems, curSite.pager.insertP, toElement)

        if (pageElems.length > 0 && toElement) {
            // 如果有插入前函数就执行函数
            if (curSite.function && curSite.function.bF) {
                if (curSite.function.bFp) { // 如果指定了参数
                    if (typeof(curSite.function.bF) == 'string') { // 如果是字符串，说明是自定义规则
                        //console.log(curSite.function.bF, curSite.function.bFp)
                        pageElems = window.autoPage[curSite.function.bF](pageElems, curSite.function.bFp);
                    } else {
                        pageElems = curSite.function.bF(pageElems, curSite.function.bFp);
                    }
                } else {
                    //console.log(curSite.function.bF)
                    if (typeof(curSite.function.bF) == 'string') { // 如果是字符串，说明是自定义规则
                        pageElems = window.autoPage[curSite.function.bF](pageElems);
                    } else {
                        pageElems = curSite.function.bF(pageElems);
                    }
                }
            }

            // 插入位置
            let addTo = getAddTo(curSite.pager.insertP[1]);

            // 插入新页面元素
            if (curSite.pager.insertP[1] === 6) { // 插入到目标内部末尾（针对文本，比如小说网页）
                let afterend = '';
                if (curSite.pager.insertP6Br) afterend += '<br/><br/>'
                pageElems.forEach(function (one) {afterend += one.innerHTML;});
                toElement.insertAdjacentHTML(addTo, afterend);
            } else {
                if (curSite.pager.insertP[1] === 2 || curSite.pager.insertP[1] === 4 || curSite.pager.insertP[1] === 5) pageElems.reverse(); // 插入到 [元素内头部]、[目标本身后面] 时，需要反转顺序
                pageElems.forEach(function (one) {toElement.insertAdjacentElement(addTo, one);});
            }

            // 当前页码 + 1
            pageNum.now = pageNum._now + 1

            // 添加历史记录
            if (curSite.history !== false) addHistory(response);

            // 替换待替换元素
            if (curSite.pager.replaceE) replaceElems(response);

            // 插入 <script> 标签
            if (curSite.pager.scriptT || curSite.pager.scriptT == 0) {
                switch (curSite.pager.scriptT) {
                    case 0: // 下一页的所有 <script> 标签
                        insScript('script', toElement, response); break;
                    case 1: // 下一页的所有 <script> 标签（不包括 src 链接）
                        insScript('script:not([src])', toElement, response); break;
                    case 2: // 下一页主体元素 (pageE) 的同级 <script> 标签
                        insScript(null, toElement, pageElems); break;
                    case 3: // 下一页主体元素 (pageE) 的子元素 <script> 标签
                        insScript('script:not([src])', toElement, pageElems); break;
                }
            }

            // 如果有插入后函数就执行函数
            if (curSite.function && curSite.function.aF) {
                if (curSite.function.aFp) { // 如果指定了参数
                    curSite.function.aF(curSite.function.aFp);
                } else {
                    if (typeof(curSite.function.aF) == 'string') { // 如果是字符串，说明是自定义规则
                        //console.log(curSite.function.aF)
                        if (window.autoPage[curSite.function.aF]) {
                            window.autoPage[curSite.function.aF]();
                        } else {
                            new Function (curSite.function.aF)();
                        }
                    } else {
                        curSite.function.aF();
                    }
                }
            }
        } else { // 获取主体元素失败后，尝试重新获取
            console.log(curSite.pager.pageE, pageElems, curSite.pager.insertP, toElement)
            if (curSite.retry) {
                console.warn('[自动无缝翻页] 获取主体元素失败，尝试重新获取...')
                setTimeout(function(){curSite.pageUrl = '';}, curSite.retry)
            } else { // 尝试替换元素看能不能继续翻页下去
                if (curSite.pager.replaceE) {
                    if (replaceElems(response)) { // 如果替换成功
                        console.log('[自动无缝翻页] 获取主体元素失败，尝试替换元素成功！')
                        pageNum.now = pageNum._now + 1; // 当前页码 + 1
                        if (curSite.history !== false) addHistory(response); // 添加历史记录
                    } else {console.error('[自动无缝翻页] 获取主体元素失败，尝试替换元素失败...')}
                }
            }
        }
    }
    // 通用型插入前函数（加载图片）
    function src_bF(pageElems, css) {
        pageElems.forEach(function (one) {
            if (css[0] == 0) { // src 图片
                if (one.tagName == 'IMG' && one.getAttribute(css[2])) one.src = one.getAttribute(css[2]);
                one.querySelectorAll(css[1]).forEach(function (now) {
                    now.src = now.getAttribute(css[2]);
                });
            } else if (css[0] == 1) { // 背景图片
                if (one.tagName == 'IMG' && one.getAttribute(css[2])) one.style.backgroundImage = 'url("' + one.getAttribute(css[2]) + '")';
                one.querySelectorAll(css[1]).forEach(function (now) {
                    now.style.backgroundImage = 'url("' + now.getAttribute(css[2]) + '")';
                });
            }
        });
        return pageElems
    }
    // 文字型插入前函数（正则过滤）
    function xs_bF(pageElems, reg) {
        pageElems.forEach(function (one) {
            one.innerHTML = one.innerHTML.replace(reg[0], reg[1])
        });
        return pageElems
    }

    // 通用型获取下一页地址（从 元素 中获取页码）
    function getNextE(css) {
        if (!css) css = curSite.pager.nextL;
        let next = getOne(css);
        if (next && next.nodeType === 1 && next.href && next.href.slice(0,4) === 'http' && next.href != curSite.pageUrl) {
            if (curSite.pager.forceHTTPS && location.protocol === 'https:') {
                curSite.pageUrl = next.href.replace(/^http:/,'https:');
            } else {
                curSite.pageUrl = next.href;
            }
            //console.log(curSite.pageUrl)
            return true
        }
        return false
    }
    // 通用型获取下一页地址（从 元素 中获取页码，URL 替换 page= 参数）
    function getNextEP(css, pf, reg) {
        let nextNum = getOne(css), url = '';
        if (nextNum && nextNum.textContent) {
            nextNum = nextNum.textContent.replaceAll(' ','');
            if (location.search) {
                if (indexOF(pf, 's')) {
                    url = location.search.replace(reg, pf + nextNum);
                } else {
                    url = location.search + '&' + pf + nextNum;
                }
            } else {
                url = '?' + pf + nextNum;
            }
            url = location.origin + location.pathname + url;
        }
        return url
    }
    // 通用型获取下一页地址（从 元素 中获取页码，URL 替换 pathname 路径）
    function getNextEPN(css, reg, a, b = '') {
        let nextNum = getOne(css), url = '';
        if (nextNum && nextNum.textContent) {
            nextNum = nextNum.textContent.replaceAll(' ','');
            if (location.pathname) {
                if (indexOF(reg)) {
                    url = location.pathname.replace(reg, a + nextNum + b);
                } else {
                    url = location.pathname + a + nextNum + b;
                }
            } else {
                url = location.pathname + a + nextNum + b;
            }
            url = location.origin + url;
        }
        return url
    }
    // 通用型获取下一页地址（从 URL 中获取页码，URL 替换 pathname 路径）
    function getNextUPN(reg1, reg, a, b = '', initP = '2', endP) {
        let nextNum = reg1.exec(location.pathname);
        if (nextNum) {
            nextNum = String(parseInt(nextNum[0])+1);
            if (endP && (parseInt(nextNum[0]) > parseInt(endP))) return ''
        } else {
            nextNum = initP;
            if (endP && (parseInt(nextNum[0]) >= parseInt(endP))) return ''
        }
        let url = '';
        if (location.pathname) {
            if (indexOF(reg)) {
                url = location.pathname.replace(reg, a + nextNum + b);
            } else {
                url = location.pathname + a + nextNum + b;
            }
        } else {
            url = location.pathname + a + nextNum + b;
        }
        url = location.origin + url;
        return url
    }
    // 通用型获取下一页地址（从 URL 中获取页码，URL 替换 page= 参数）
    function getNextUP(pf, reg, lp = location.pathname, initP = '2', endP) {
        let nextNum = getSearch(pf.replace('=',''));
        if (nextNum) {
            nextNum = String(parseInt(nextNum)+1);
            if (endP && (parseInt(nextNum) > parseInt(endP))) return ''
        } else {
            nextNum = initP;
            if (endP && (parseInt(nextNum) >= parseInt(endP))) return ''
        }
        let url = '';
        if (location.search) {
            if (indexOF(pf, 's')) {
                url = location.search.replace(reg, pf + nextNum);
            } else {
                url = location.search + '&' + pf + nextNum;
            }
        } else {
            url = '?' + pf + nextNum;
        }
        url = location.origin + lp + url;
        return url
    }
    // 通用型获取下一页地址（从 form input 中获取，返回 GET URL）
    function getNextF(css) {
        let form = getOne(css), value = '';
        if (form) {
            form.querySelectorAll('input[name]').forEach(function(input) {value += input.name + '=' + input.value + '&';}) // 生成表单参数
            value = encodeURI(value.replace(/&$/,'')); // 清理最后一个 & 符号
            if (form.action && value) return (form.action + '?' + value)
        }
        return '';
    }


    // 检查 URL
    function checkURL(func) {
        if (typeof curSite.pager.nextL == 'function') {
            let tempUrl = curSite.pager.nextL();
            if (!tempUrl || (tempUrl && tempUrl.slice(0,4) != 'http') || tempUrl === curSite.pageUrl ) return;
            curSite.pageUrl = tempUrl;
            func(curSite.pageUrl);
        } else if (curSite.pager.nextL && curSite.pager.nextL.search(/^js;/i) === 0) { // 自定义翻页规则中执行 JavaScript 代码的
            let tempUrl = new Function (curSite.pager.nextL.slice(3))();
            if (!tempUrl || (tempUrl && tempUrl.slice(0,4) != 'http') || tempUrl === curSite.pageUrl ) return;
            curSite.pageUrl = tempUrl;
            func(curSite.pageUrl);
        } else if (getNextE()) {
            func(curSite.pageUrl);
        }
        //console.log(curSite.pageUrl);
    }
    // 替换元素
    function replaceElems(pageElems, o = curSite.pager.replaceE, r = curSite.pager.replaceE) {
        let oriE = getAll(o),
            repE = getAll(r, pageElems, pageElems);
        //console.log(oriE, repE)
        if (oriE.length != 0 && repE.length != 0 && oriE.length === repE.length) {
            for (let i = 0; i < oriE.length; i++) {
                oriE[i].outerHTML = repE[i].outerHTML;
            }
            return true
        }
        return false
    }
    // 添加历史记录
    function addHistory(pageElems, title, url) {
        if (!curSite.pageUrl) return
        // 对于自带类似功能 或者 覆盖了 history 原生函数的网站，则跳过不再添加历史记录
        if (window.top.history.toString() !== '[object History]') return

        //console.log(pageElems.querySelector('title'), curSite.pageUrl)
        title = title || pageElems.querySelector('title').textContent || window.top.document.title;
        url = url || curSite.pageUrl;
        window.top.document.title = title;
        window.top.document.xiu_nowUrl = curSite.pageUrl;
        window.top.history.pushState('xiu_history', title, url);
    }
    // 插入 <Script>
    function insScript(selector, toElement = document.body, contextNode = document) {
        let scriptElems = contextNode;
        if (selector) {
            if (contextNode instanceof Array) {
                scriptElems = []; contextNode.forEach(function (one) {scriptElems = scriptElems.concat(getAll(selector, one, one));})
            } else {
                scriptElems = getAll(selector, contextNode, contextNode);
            }
        }
        scriptElems.forEach(function (one) {
            if (one.tagName === 'SCRIPT') {
                if (one.src) {
                    toElement.appendChild(document.createElement('script')).src = one.src;
                } else {
                    toElement.appendChild(document.createElement('script')).textContent = one.textContent;
                }
            }
        });
    }
    // 插入 <Style>
    function insStyle(style) {
        document.documentElement.appendChild(document.createElement('style')).textContent = style;
    }


    // 获取元素（CSS/Xpath）来自：https://github.com/machsix/Super-preloader
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
    function getOne(selector, contextNode = undefined, doc = document) {
        if (!selector) return;
        contextNode = contextNode || doc;
        if (selector.slice(0,1) === '/' || selector.slice(0,2) === './' || selector.slice(0,3) === 'id(') {
            return getXpath(selector, contextNode, doc);
        } else {
            return getCSS(selector, contextNode);
        }
    }
    function getAll(selector, contextNode = undefined, doc = document) {
        if (!selector) return [];
        contextNode = contextNode || doc;
        if (selector.slice(0,1) === '/' || selector.slice(0,2) === './' || selector.slice(0,3) === 'id(') {
            return getAllXpath(selector, contextNode, doc);
        } else {
            return getAllCSS(selector, contextNode);
        }
    }
    function createDocumentByString(e) {
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
    }


    // 强制新标签页打开链接（翻页模式 5/6）
    function forceTarget() {
        document.body.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                forceTarget_(e.target, e);
            } else {
                let path = e.path || e.composedPath();
                for (let i = 1; i < path.length - 3; i++) {
                    //console.log(path[i])
                    if (path[i].tagName === 'A') {
                        forceTarget_(path[i], e);
                        break;
                    }
                }
            }
        });

        function forceTarget_(target, e){
            if (target.href && target.target != '_blank' && !(target.getAttribute('onclick')) && target.href.slice(0,4) == 'http' && target.getAttribute('href').slice(0,1) != '#') {
                e.preventDefault(); // 阻止默认打开链接事件
                //console.log(target.href);
                //window.top.location.href = target.href;
                window.GM_openInTab(target.href, {active: true,insert: true,setParent: true});
            }
        }
        //document.head.appendChild(document.createElement('base')).target = '_top';
    }
    // 判断元素是否隐藏（隐藏返回 true）
    function isHidden(el){
        return (el.offsetParent === null);
    }
    // 判断是否为手机版（是则返回 true）
    function isMobile(){
        return (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|MicroMessenger|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent) || (window.screen.width < 500 && window.screen.height < 800));
    }
    // 判断 URL 是否存在指定文本
    function indexOF(e, l = 'p', low = false){
        switch (l) {
            case 'h':
                l = location.href; break;
            case 'p':
                l = location.pathname; break;
            case 's':
                l = location.search; break;
        }
        //console.log(l,e,l.indexOf(e))
        if (low) {e = e.toLowerCase(); l = l.toLowerCase();} // 全部转为小写
        if (e instanceof RegExp) {
            if (e.test(l)) return true
        } else {
            if (l.indexOf(e) > -1) return true
        }
        return false
    }
    // 获取 Search 指定参数
    function getSearch(variable) {
        let query = window.location.search.substring(1),
            vars = query.split('&');
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split('=');
            if(pair[0] == variable){return pair[1];}
        }
        return '';
    }
    // 启用/禁用 (当前网站)
    function menu_disable(type) {
        switch(type) {
            case 'check':
                return check(); break;
            case 'add':
                add(); break;
            case 'del':
                del(); break;
        }

        function check() { // 存在返回真，不存在返回假
            if (GM_getValue('menu_disable').indexOf(location.hostname) == -1) return false // 不存在返回假
            return true
        }

        function add() {
            if (check()) return
            let list = GM_getValue('menu_disable'); // 读取网站列表
            list.push(location.hostname); // 追加网站域名
            GM_setValue('menu_disable', list); // 写入配置
            location.reload(); // 刷新网页
        }

        function del() {
            if (!check()) return
            let list = GM_getValue('menu_disable'), // 读取网站列表
            index = list.indexOf(location.hostname);
            list.splice(index, 1); // 删除网站域名
            GM_setValue('menu_disable', list); // 写入配置
            location.reload(); // 刷新网页
        }
    }
    // 左键双击网页空白处暂停翻页
    function pausePageEvent() {
        if (!GM_getValue('menu_pause_page')) return
        if (curSite.SiteTypeID === 0) return
        if (curSite.pager && curSite.pager.type == 5) window.top.document.xiu_pausePage = pausePage
        document.body.addEventListener('dblclick', function () {
            if (pausePage) {GM_notification({text: `❌ 已暂停本页 [自动无缝翻页]\n    （再次双击可恢复）`, timeout: 2000});} else {GM_notification({text: `✅ 已恢复本页 [自动无缝翻页]\n    （再次双击可暂停）`, timeout: 2000});}
            pausePage = !pausePage;
            if (curSite.pager && curSite.pager.type == 5) window.top.document.xiu_pausePage = pausePage
        });
    }
    // 自定义翻页规则
    function customRules() {
        if (getCSS('#Autopage_customRules')) return

        let customRules = JSON.stringify(GM_getValue('menu_customRules', {}), null, '\t').replaceAll('functionS', 'url').replaceAll('css;', ''); // 改名过渡，过段时间将其移除
        if (customRules == '{}') customRules = '{\n\t\n}'; // 引导用户插入位置
        let _html = `<div id="Autopage_customRules" style="left: 0 !important; right: 0 !important; top: 0 !important; bottom: 0 !important; width: 100% !important; height: 100% !important; margin: auto !important; padding: 25px 10px 10px 10px !important; position: fixed !important; opacity: 0.95 !important; z-index: 99999 !important; background-color: #eee !important; color: #222 !important; font-size: 14px !important; overflow: scroll !important; text-align: left !important;">
<h3><strong>自定义翻页规则（优先于脚本内置规则）-【把规则插入默认的 { } 中间】</strong></h3>
<details>
<summary><kbd><strong>「 点击展开 查看示例 」（我把常用规则都塞进去了，方便需要的时候可直接复制一份修改使用）</strong></kbd></summary>
<ul style="list-style: disc !important; margin-left: 35px !important;">
<li>翻页规则为 JSON 格式，因此大家需要多少<strong>了解一点 JSON 的基本格式</strong>（主要就是逗号）。</li>
<li>具体的翻页规则说明、示例、NSFW 等网站规则，为了方便更新及补充，我都写到 <strong><a href="https://github.com/XIU2/UserScript/issues/176" target="_blank">Github</a> 及 <a href="https://greasyfork.org/scripts/419215" target="_blank">Greasyfork</a></strong> 里面了。</li>
<li>脚本会自动格式化规则，因此<strong>无需手动缩进、换行</strong>，只需把规则<strong>插入默认的 { } 中间</strong>即可。</li>
<li style="color: #ff3535 !important;">注意：不要完全照搬脚本内置规则，因为和标准 JSON 格式等有所差别，具体请对比下面示例规则。</li>
</ul>
<pre>
// 大多数网站一般都只需要像第一个 "aaa" 这样的规则（注意，不要连带着复制这几行注释说明）
// 其中 "scrollD" 是用来控制翻页敏感度的（越大就越早触发翻页，访问速度慢的网站需要调大，可省略(注意逗号)，默认 1500）
// 每个规则第一行的规则名（即 "aaa": { ）是唯一的，不能重复（包括与脚本内置规则），否则会被覆盖，支持中文
{
    "aaa": {
        "host": "aaa.com",
        "url": "/xxx/",
        "pager": {
            "nextL": "xxx",
            "pageE": "xxx",
            "replaceE": "xxx",
            "scrollD": 1000
        }
    },
    "bbb": {
        "host": ["bbb1.com", "bbb2.com"],
        "url": "/^\\/s$/",
        "style": ".aaaa {display: none !important;}",
        "pager": {
            "type": 1,
            "nextL": "id('page')//a[contains(text(),'下一页') or text()='下一页']",
            "pageE": "aaa",
            "insertP": [".bbb",3],
            "replaceE": ".page",
            "scriptT": 1,
            "interval": 500,
            "scrollD": 1500
        },
        "function": {
            "bF": "src_bF",
            "bFp": [0,"img[data-src]","data-src"],
            "aF": "document.body.appendChild(document.createElement('script')).textContent = 'xxx'"
        }
    },
    "这里也可以用中文": {
        "host": "/\\.ccc\\.com/",
        "url": "if (location.pathname.indexOf('/s') > -1) {return true;}",
        "pager": {
            "type": 2,
            "nextL": "#autopbn",
            "nextText": "下一页",
            "nextTextOf": "下一页",
            "interval": 1000,
            "scrollD": 1500
        }
    }
}
</pre>
</details>

<textarea id="Autopage_customRules_textarea" style="min-width:95% !important; min-height:70% !important; display: block !important; margin: 10px 0 10px 0; white-space:nowrap !important; overflow:scroll !important; resize: auto !important;" placeholder="留空等于默认的 {}，请把规则插入 {} 之间">${customRules}</textarea>
<button id="Autopage_customRules_save" style="margin-right: 20px !important;">保存并刷新</button><button id="Autopage_customRules_cancel">取消修改</button>
</div>`
        document.documentElement.insertAdjacentHTML('beforeend', _html);
        document.documentElement.style.overflow = document.body.style.overflow = 'hidden';
        // 点击事件
        getCSS('#Autopage_customRules_save').onclick = function () {
            customRules = getCSS('#Autopage_customRules_textarea').value.replaceAll('functionS', 'url').replaceAll('css;', ''); // 改名过渡，过段时间将其移除
            //console.log(customRules)
            if (!customRules) customRules = '{}'
            try {
                customRules = JSON.parse(customRules)
                //console.log(customRules)
                GM_setValue('menu_customRules', customRules)
                location.reload();
            } catch (e) {
                console.error('自定义规则存在格式错误：\n' + e + '\n\n注意事项：\n规则中冒号 : 左右的内容都需要加上双引号 " 而不能用单引号 \'，如果内容中含有双引号则需要对双引号转义（即 \" 这样）或者改用单引号')
                window.alert('自定义规则存在格式错误：\n' + e + '\n\n注意事项：\n规则中冒号 : 左右的内容都需要加上双引号 " 而不能用单引号 \'，如果内容中含有双引号则需要对双引号转义（即 \" 这样）或者改用单引号');
            }
        }
        getCSS('#Autopage_customRules_cancel').onclick = function () {document.documentElement.style.overflow = document.body.style.overflow = ''; getCSS('#Autopage_customRules').remove();}
    }
    // 显示页码
    function pageNumber(type) {
        if (curSite.SiteTypeID === 0 || curSite.hiddenPN || (curSite.pager && curSite.pager.type == 5 && self != top)) {if (getCSS('#Autopage_number')) {getCSS('#Autopage_number').style.display = 'none';}; return}
        let status = getCSS('#Autopage_number');
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
            let _style = `<style>#Autopage_number {top: calc(75vh) !important;left: 0 !important;width: 32px;height: 32px;padding: 6px !important;display: flex;position: fixed !important;opacity: 0.3;transition: .2s;z-index: 9999 !important;cursor: pointer;user-select: none !important;flex-direction: column;align-items: center;justify-content: center;box-sizing: content-box;border-radius: 0 50% 50% 0;transform-origin: center !important;transform: translateX(-8px);background-color: #eee;-webkit-tap-highlight-color: transparent;box-shadow: 1px 1px 3px 0px #aaa !important;color: #000 !important;font-size: medium;} #Autopage_number:hover {opacity: 0.8;transform: translateX(0);}</style>`,
                _html = `<div id="Autopage_number" title="1. 此处数字为 [当前页码] (可在脚本菜单中关闭)&#10;&#10;2. 鼠标左键点击此处可 [临时暂停翻页]（再次点击可恢复）">${pageNum._now}</div>`
            document.documentElement.insertAdjacentHTML('beforeend', _style + _html);
            // 解决 远景论坛 会清理掉前面插入的 CSS 样式的问题
            if (location.hostname === 'bbs.pcbeta.com') {setTimeout(function(){document.documentElement.insertAdjacentHTML('beforeend', _style);}, 500);}
            if (curSite.pager && curSite.pager.type == 5) window.top.document.xiu_pausePage = pausePage
            // 点击事件（临时暂停翻页）
            getCSS('#Autopage_number').onclick = function () {
                if (pausePage) {this.style = 'color: #FF5722 !important; font-style: italic !important;';} else {this.style = '';}
                pausePage = !pausePage;
                if (curSite.pager && curSite.pager.type == 5) window.top.document.xiu_pausePage = pausePage
            };
            status = getCSS('#Autopage_number');
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
            case 6:
                return 'beforeend'; break;
            case 4:
            case 5:
                return 'afterend'; break;
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
    // 自定义 urlchange 事件（用来监听 URL 变化）
    function addUrlChangeEvent() {
        history.pushState = ( f => function pushState(){
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('pushstate'));
            window.dispatchEvent(new Event('urlchange'));
            return ret;
        })(history.pushState);

        history.replaceState = ( f => function replaceState(){
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('replacestate'));
            window.dispatchEvent(new Event('urlchange'));
            return ret;
        })(history.replaceState);

        window.addEventListener('popstate',()=>{
            window.dispatchEvent(new Event('urlchange'))
        });
    }
})();