// ==UserScript==
// @name         自动无缝翻页
// @name:zh-CN   自动无缝翻页
// @name:zh-TW   自動無縫翻頁
// @name:en      AutoPager
// @version      6.2.8
// @author       X.I.U
// @description  ⭐无缝加载 下一页内容 至网页底部（类似瀑布流）⭐，目前支持：【所有「Discuz!、Flarum、phpBB、Xiuno、XenForo、NexusPHP...」论坛】【百度、谷歌(Google)、必应(Bing)、搜狗、微信、360、Yahoo、Yandex 等搜索引擎...】、贴吧、豆瓣、知乎、B 站(bilibili)、NGA、V2EX、煎蛋网、龙的天空、起点中文、千图网、千库网、Pixabay、Pixiv、3DM、游侠网、游民星空、NexusMods、Steam 创意工坊、CS.RIN.RU、RuTracker、BT之家、萌番组、动漫花园、樱花动漫、爱恋动漫、AGE 动漫、Nyaa、SrkBT、RARBG、SubHD、423Down、不死鸟、扩展迷、小众软件、【动漫狂、动漫屋、漫画猫、漫画屋、漫画 DB、动漫之家、拷贝漫画、HiComic、Mangabz、Xmanhua 等漫画网站...】、PubMed、Z-Library、GreasyFork、Github、StackOverflow（以上仅一小部分，更多的写不下了...
// @description:zh-TW  ⭐無縫加載 下一頁內容 至網頁底部（類似瀑布流）⭐，支持各論壇、社交、遊戲、漫畫、小說、學術、搜索引擎(Google、Bing、Yahoo...) 等網站~
// @description:en  Append the next page content to the bottom seamlessly (like a waterfall)~
// @match        *://*/*
// @connect      userscript.xiu2.xyz
// @connect      userscript.gh2233.ml
// @connect      bitbucket.org
// @connect      gitea.com
// @connect      raw.fastgit.org
// @connect      raw.iqiq.io
// @connect      ghproxy.net
// @connect      gh-proxy-download.moeyy.cn
// @connect      raw.njuu.cf
// @connect      raw.kgithub.com
// @connect      cdn.staticaly.com
// @connect      ghproxy.futils.com
// @connect      ghproxy.fsofso.com
// @connect      raw.xn--p8jhe.tw
// @connect      git.yumenaka.net
// @connect      raw.cithub.icu
// @connect      raw-gh.gcdn.mirr.one
// @connect      gcore.jsdelivr.net
// @connect      fastly.jsdelivr.net
// @connect      raw.githubusercontents.com
// @connect      www.xuexiniu.com
// @connect      bbs.xuexiniu.com
// @connect      weili.ooopic.com
// @connect      www.ykmh.com
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAALfElEQVRYhX2Xe3Bd1XXGf3vvc859X+nq6nUlW5Yly7JlI2xsYzAwtnk4ATpAxkNTHm0mnaTT/gHTTvrIBDLTpp1JUoZppqHQls5AKTR2INOWJJQSXF4x2BhsJCRZ8kuWZckPSVf3/Trn7N3RVTFpQrNn1l97n7O/vda31reWMKMPcmUJA9U8vrwHGdqCHn4HPzePaIxhVSoYbYRXrn7BeMVbCUduF6kVUXHwvQP+6amDaqDnoIompmQytaBnTmB8H5lowrjgFss48SBeI/hUEEZeudLi1ywhJEIJdL6Q8rzal/1a5SGC4XZrYBvWwEZobMdLdH6RH+z/Io1taEeh52fe8tOZbysl/ouWFvANYP7fSz4DgAEBBIL4xiS8ubmnVcTZK68aRK29Dtm8dgnZJydRW+/E2nrnp19nz+7U77+60zt0qMz07J/KxuQTwrIw4rMBCDP6wC+FIIcO34eudDdXf/7jD52Opi772lugY3AZr++hp06gz48j+waRqTWYmVHcS+chEMFeuw1hBzBzY7g/fQE9fmqBYPzBQKrpVa/R4OkCAnXlSvXnX9sIllk220BE4Z8OdHoj54YCK6Od1i2/iUmuRyDRk6NUn3+M0pv/hnf0AE40jEjEqP3oe6Rf/CGOWUTNjFKby2MP7EBtugURFWFxfOhB4+o4yfhrGAdZsxHaqZt6dNce9KXYFSPfGWS68JFqTXSqO7+MCaTqETGTwxSeeoRCOoPT2YUIhFC2jbQF/uwUatU6rPbVUM5T+OfHUO3dWKv6kSsGUIOD6PEPr+fswnanpecFZYVQhFAyjPS9Tj4xw2rcU+pJApEutWsvRjaBW8NUShilkE1JIqlUPfi6VMLNFTBVr+7KYKqJ8uEjlM+dJrR5K0L7eB+9hTd2CFrWYt33h0jH3O5Nj37TBGtgZUBkUN/6q4dQ7UmsnlW450//gU5PPRq460uQXAu+j//i99A/+UdUMoXqbMNkz2OnUkixlF4u9spe/HMTULyEaA7jXkoT2fEbQIXi838DJ4cRDXHkEjc2b0MPHdptZubGpBUbM0UfKQpBRDmKWRSD3tTMk87gddA2WGe4+dkzMD0CyQ5qP/4XVDCAvfkaLMvHamzEClpQzGDF46iuJOH1CaKr2tDZRfzhQ0Ru24NYsYrCM4/jDb+FiHdi3XU/0s3vr7WsGKxcfyPSy+bxi0UqJ8f/IriiE2vrnuWsLefQk8NoO4AMBBB9/XjDI6hQCjdTxq9WCaQ6ULaDFrIeKr3oIlv70Olz2K1xlAVaSUQojD786nKi9e5A3LBHMHn0W+LUUaS1FI9q+iZZWLhHdq/FxFbWSSfsIDIQwVw4g/GK2OuuhloNMzaCaF+DNBJtQfX8LFYigElX0OkQtZKHVy3jqwDlqWncCzPI3nU4t+2FWrH+OLHzHpRl3109memTOhqDi9NfkefHEKvWLTO+VKD68Qf4G27CueFWhJ/Df+0lVFcXJOJYnobm1ZjsJUxuFjyDjK/GNK2gND4ESuDPXcCOSaI7thPqX0ft8OtUn/oTKOQgkET39KJU4RbpZXOtNRW717p+FyRSdYT+v36H4u/fQXbfc3iRDkT3FsTGjWAWEU0OZKfAU9CyEdXVD2lQPduplmo4jkBEbMzK1VgDu5EVTe3gm1RHx6Bcxpz6YLkEO0lMYeFGi6z7eVMqhkT/ZrCb0LNT+NMTRH/nt/BLRdy3X8Nv68Lu6cZEHURjE6K3hirYeLRhDWyA4jxzH40RXJwkeuM29MpN+JcziEsz+Avz6GgcW1pYbUlEQCyHwYpSyxS7rGo+v8man4ZMATrAHf+QSt7FTkWR4QbsjlbIX8IMH0VuuAqj4piGAbhmEPPzI/injnNxMUPuwOtseOIxKKTJ7/8BTBxDdXcjO9sJdTeg01VqH4wg3CDB9bshHMKORbGolVOmeRW09dVdUxkbp3ruNM7GXnS1hK5OYSoSbBDZBcxCBtF3DcUzk6hkhGA0RmtHKx1rOkE04lbzWC1tqMRt1CZHUafPIs8H6/JsNTcgN+9YFq1qgbBUFUvnK9qrVghXCvWN8MBmivueJDtylqaeBKWJaXR4JZEtNyBWrkGt6AJboCZO4J49Rc64xGIhcgtZgm6egKhgtUQQto17WeHOLqCNj5Vowbr7q4j+Lcs1JhhEphcXLTebd0jPwpkx6Lwa++bbCR95ALecp5a6BrvrJoLdHajmMOTnKb3+BrVMntjARpzeFbz8jcfpa22gGm+kMJlm95Zu9M9+iI5G0G3d6EgIUSnjzs/gv/Icgd6rqcvz0IeYWnXc8pEtYnEe8gtXNL7xz74LehHSE3DqNP7EIdx3p5DSh7JNJePiBE/gN3Uz8NWHae5sRJYXqKQvU+raQPg7L6L3/QNMHcfp6EREGjC5LDp9GaOs5VQ/NQI93YctOxFPlwniDh/C3n47JHvrQPTBl3DHjiIDQUQ4jGhOYcqaQFuE0Nl53OnLRHfsZV33KsTxd6GlHeaP477zMl5uAWv7dkyLg6kZREsb+vgCcvPOuoaYuWNQWERs3jAuQ6nooXK6TH566cXnrjQK7uwFaoseWA3oJf2WEhEJUjm/gMgXCfdvQlFFv/R3uCND6FIRv7MfMnOIiaPoI/8NEb2kWAhfoLbdjLr2jmUv/8f+pVbkHRGNnZHum2/udxxtCn4j/vgEIjNTD4O9upfIprUYoxBKo9Z14jumTq7YYD9WayvuR++hs1lkshmha4iuNeDYiIAFMoCevIi+cJHaa29gmvsRTUn0R29g9u1D7bxxv+jrRnpD56cCkdjfV9NzpA+8A5VlLojWAczlGVTAYKXimIU8MlsjtKEXgiF0aRGdm8cEYnXm+O+/gdAGuWsP3shhTHoOEYqCCEF2DsrF5f+e/xiikUldrT6l3z+GevSaTahaZdRY6uFqxRXR1sRyzU/21Gu6OTOMfzmPd6kI8TgiX8B4imouj1QCKmVUNITJ59AnR1F77kH4ZaRnQFroMyeRW3egdt6DwIX391Gshv+4LK2jtcuLqK9t7ALjZXzH1uVM/mb/7BTRnjZEex+idQ2EAnjjR/BdF1PIoV2Bae/F/fh9dL5IYE0XUmpMNo+ev4AINSJWb0UPHa63Z7SvRN3/CHJpFHj2G4iZzAuBbTu+GWpIEGxrQ/3RnlvxG5M4kYa3Lc2u4uyFblnIE+xfAbF2RMtqZGsn/uTYUgHH+dz9eFMnqYx8gO+CEwkjhcDPF/DLHurSaeTm3RiWMsDHeuDrSFvBv3+bi08+N1Vwuj/vZWtu+dwclZlFrESoeZmZysJXoTsCjnVk8dDQBuN+n8RDD9fbcdG7leBX1iOkQjhBOHmQfKGAHW3CS6fR+QClmYuYMyPY265DtPVgtfctiw4V/GcfYfGNQzj3/u4DqlormUoZEQwuc0I//eSnY4G0wPJjmdGhw+mh0fWxNZ0037cXccPd1MXgk+GjNE/tR3+Le+YEyg5TnT6LXlwgcu1u7C99HZlsv3K2+vjvkTs2RvDe3747tm7Dy1SKvzSYPP/MLwxFAkIKEzEye2zswOXX395lJyK0fOFzRHfuglQfqPin59Nn0RNDuJk09vprkd0brmx5H7xCbfgQbrZ83OkfvN1pj0+ZmkBYNhjzCwCeffr/AsBDJyU6kqBwbPzRuTcP/GXV82lYlaJpfQ+BjVdhXX0tNKTAjvzKqKXPTeC++1NKY0c9kVz1SGzb9X8tjIdfzSFCDfUw/noA0scPuxBrwcvmmH3rQIvMm3/y0XdJS4JfIpiIUG9g+wcg6KDnZpGZNDQ0Ii5cSAtlPRHYct13axWvJNwadiiAli4iEP8VAJ89HQtR129TLiG1nos0Nt8dSOi12qi9lRq3utVqT/lirql24hW3vLBQi3d3XUqu73+PZOonBNR/WnbYSMeGTO5/Xf6ZtwDwPwtFRezQVs+sAAAAAElFTkSuQmCC
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_info
// @grant        GM.info
// @grant        window.onurlchange
// @grant        unsafeWindow
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// @exclude      https://*.taobao.com/*
// @exclude      https://*.tmall.com/*
// @exclude      https://*.1688.com/*
// @exclude      https://*.jd.com/*
// @exclude      https://*.vip.com/*
// @exclude      https://*.suning.com/*
// @exclude      https://*.aliexpress.com/*
// @exclude      https://*.paypal.com/*
// @exclude      https://*.iqiyi.com/*
// @exclude      https://*.youku.com/*
// @exclude      https://m.v.qq.com/*
// @exclude      https://v.qq.com/*
// @exclude      https://*.acfun.cn/*
// @exclude      https://t.bilibili.com/*
// @exclude      https://www.bilibili.com/*
// @exclude      https://live.bilibili.com/*
// @exclude      https://space.bilibili.com/*
// @exclude      https://manga.bilibili.com/*
// @exclude      https://member.bilibili.com/*
// @exclude      https://message.bilibili.com/*
// @exclude      https://*.youtube.com/*
// @exclude      https://*.youtube-nocookie.com/*
// @exclude      https://*.cnki.net/*
// @exclude      https://mail.qq.com/*
// @exclude      https://weread.qq.com/*
// @exclude      https://*.weread.qq.com/*
// @exclude      https://bz.zzzmh.cn/*
// @exclude      https://wallhaven.cc/*
// @exclude      https://chrome.zzzmh.cn/*
// @exclude      https://*.guazi.com/*
// @exclude      https://*.liepin.com/*
// @exclude      https://*.58.com/*
// ==/UserScript==

(function() {
    'use strict';
    var menuAll = [
        ['menu_disable', '✅ 已启用 (点击对当前网站禁用)', '❌ 已禁用 (点击对当前网站启用)', []],
        ['menu_thread', '帖子内自动翻页 (社区类网站)', '帖子内自动翻页 (社区类网站)', true],
        ['menu_page_number', '显示当前页码及点击暂停翻页', '显示当前页码及点击暂停翻页', true],
        ['menu_pause_page', '左键双击网页空白处暂停翻页', '左键双击网页空白处暂停翻页', false],
        ['menu_history', '添加历史记录+修改地址/标题', '添加历史记录+修改地址/标题', true],
        ['menu_rules', '更新外置翻页规则 (每天自动)', '更新外置翻页规则 (每天自动)', {}],
        ['menu_customRules', '自定义翻页规则', '自定义翻页规则', {}]
    ], urlArr = [ // 外置翻页规则更新地址分流，以确保更新成功率（记得 connect）
        'https://userscript.gh2233.ml/other/Autopage/rules.json',
        'https://bitbucket.org/xiu2/userscript/raw/master/other/Autopage/rules.json',
        'https://gitea.com/XIU2/UserScript/raw/branch/master/other/Autopage/rules.json',
        'https://raw.fastgit.org/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://raw.iqiq.io/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://raw.kgithub.com/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://ghproxy.net/https://raw.githubusercontent.com/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://gh-proxy-download.moeyy.cn/gh-proxy/https:/raw.githubusercontent.com/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://raw.njuu.cf/XIU2/UserScript/master/other/Autopage/rules.json',
        //'https://ghproxy.futils.com/https://github.com/XIU2/UserScript/blob/master/other/Autopage/rules.json',
        //'https://ghproxy.fsofso.com/https://github.com/XIU2/UserScript/blob/master/other/Autopage/rules.json',
        //'https://raw.xn--p8jhe.tw/XIU2/UserScript/master/other/Autopage/rules.json',
        //'https://git.yumenaka.net/https://raw.githubusercontent.com/XIU2/UserScript/master/other/Autopage/rules.json',
        //'https://raw.cithub.icu/XIU2/UserScript/master/other/Autopage/rules.json',
        //'https://raw-gh.gcdn.mirr.one/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://cdn.staticaly.com/gh/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://gcore.jsdelivr.net/gh/XIU2/UserScript/other/Autopage/rules.json',
        'https://fastly.jsdelivr.net/gh/XIU2/UserScript/other/Autopage/rules.json',
        'https://raw.githubusercontents.com/XIU2/UserScript/master/other/Autopage/rules.json'
    ], urlArr2 = [
        'https://userscript.gh2233.ml/other/Autopage/rules.json',
        'https://userscript.xiu2.xyz/other/Autopage/rules.json',
        'https://bitbucket.org/xiu2/userscript/raw/master/other/Autopage/rules.json',
        'https://gitea.com/XIU2/UserScript/raw/branch/master/other/Autopage/rules.json',
        'https://raw.fastgit.org/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://raw.iqiq.io/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://raw.kgithub.com/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://ghproxy.net/https://raw.githubusercontent.com/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://gh-proxy-download.moeyy.cn/gh-proxy/https:/raw.githubusercontent.com/XIU2/UserScript/master/other/Autopage/rules.json',
        'https://raw.njuu.cf/XIU2/UserScript/master/other/Autopage/rules.json'
        //'https://ghproxy.futils.com/https://github.com/XIU2/UserScript/blob/master/other/Autopage/rules.json',
        //'https://ghproxy.fsofso.com/https://github.com/XIU2/UserScript/blob/master/other/Autopage/rules.json',
        //'https://raw.xn--p8jhe.tw/XIU2/UserScript/master/other/Autopage/rules.json',
        //'https://git.yumenaka.net/https://raw.githubusercontent.com/XIU2/UserScript/master/other/Autopage/rules.json'
    ],
        loadMoreExclude1 = ['stackoverflow.com'],
        loadMoreExclude2 = ['.smzdm.com','.steampowered.com','.zcool.com.cn','.baidu.com'],
        menuId = [], webType = 0, curSite = {SiteTypeID: 0}, DBSite, DBSite2, pausePage = true, pageNum = {now: 1, _now: 1}, urlC = false, nowLocation = '', lp = location.pathname, scriptHandler;
    window.autoPage = {lp: ()=>location.pathname, indexOF: indexOF, isMobile: isMobile, isUrlC: isUrlC, blank: forceTarget, getAll: getAll, getOne: getOne, getAllXpath: getAllXpath, getXpath: getXpath, getAllCSS: getAllCSS, getCSS: getCSS, getNextE: getNextE, getNextEP: getNextEP, getNextSP: getNextSP, getNextEPN: getNextEPN, getNextUPN: getNextUPN, getNextUP: getNextUP, getNextF: getNextF, getSearch: getSearch, getCookie: getCookie, insStyle: insStyle, insScript: insScript, src_bF: src_bF, xs_bF: xs_bF}
    if (typeof GM_info != 'undefined') {scriptHandler = GM_info.scriptHandler;} else if (typeof GM != 'undefined' && typeof GM.info != 'undefined') {scriptHandler = GM.info.scriptHandler;} else {scriptHandler = '';}
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
                        menuId[0] = GM_registerMenuCommand('❌ 当前网页暂不支持 [点击申请]', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});});
                        menuId[1] = GM_registerMenuCommand('🔄 更新外置翻页规则 (每天自动)', function(){getRulesUrl(true)});
                        menuId[2] = GM_registerMenuCommand('#️⃣ 自定义翻页规则', function(){customRules()});
                        console.info('[自动无缝翻页] - 暂不支持当前网页 [ ' + location.href + ' ]，申请支持: https://github.com/XIU2/UserScript / https://greasyfork.org/zh-CN/scripts/419215/feedback');
                        return
                    } else if (webType === -1) {
                        return
                    }
                    menuId[i] = GM_registerMenuCommand(`${menuAll[i][1]}`, function(){menu_disable('add')});
                }

            } else if (menuAll[i][0] === 'menu_rules') {
                menuId[i] = GM_registerMenuCommand(`🔄 ${menuAll[i][1]}`, function(){getRulesUrl(true)});

            } else if (menuAll[i][0] === 'menu_customRules') {
                menuId[i] = GM_registerMenuCommand(`#️⃣ ${menuAll[i][1]}`, function(){customRules()});

            } else {
                menuId[i] = GM_registerMenuCommand(`${menuAll[i][3]?'✅':'❌'} ${menuAll[i][1]}`, function(){menu_switch(menuAll[i][3], menuAll[i][0], menuAll[i][2])});
            }
        }
        menuId[menuId.length] = GM_registerMenuCommand('💬 反馈失效 / 申请支持', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});});
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
            // 如果是 数组

            if (Array.isArray(DBSite[now].host)) {

                for (let i of DBSite[now].host) { // 遍历 数组

                    // 针对自定义翻页规则中的正则
                    if (typeof i === 'string' && i.slice(0,1) === '/') i = new RegExp(i.slice(1,i.length-1))
                    if ((i instanceof RegExp && i.test(location.hostname)) || (typeof i === 'string' && i === location.hostname)) {

                        if (self != top) {if (!DBSite[now].iframe) continue end;} // 如果当前位于 iframe 框架下，就需要判断是否需要继续执行
                        if (DBSite[now].url) {
                            if (typeof DBSite[now].url == 'function') {
                                DBSite[now].url();
                            } else { // 自定义翻页规则时，因为同域名不同页面 url 分开写，所以如果没找到就需要跳出当前数组循环，继续规则循环
                                try {
                                    if (DBSite[now].url.slice(0,1) === '/') { // 如果是正则，则对 URL 路径进行匹配
                                        if (new RegExp(DBSite[now].url.slice(1,DBSite[now].url.length-1), 'i').test(location.pathname + location.search) === true) {curSite = DBSite[now];} else {if (urlC === true) {support = true;}; break;}
                                    } else { // 如果是函数，那就执行代码
                                        if (new Function('fun', DBSite[now].url)(window.autoPage)) {curSite = DBSite[now];} else {if (urlC === true) {support = true;}; break;}
                                    }
                                } catch (e) {
                                    console.error('[自动无缝翻页] - 当前网页规则 "url" 有误，请检查！', e, DBSite[now].url);
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

                    if (self != top) {if (!DBSite[now].iframe) continue;} // 如果当前位于 iframe 框架下，就需要判断是否需要继续执行
                    if (DBSite[now].url) {
                        if (typeof DBSite[now].url == 'function') {
                            DBSite[now].url();
                        } else { // 自定义翻页规则时，因为同域名不同页面 url 分开写，所以如果没找到就需要继续规则循环
                            try {
                                if (DBSite[now].url.slice(0,1) === '/') { // 如果是正则，则对 URL 路径进行匹配
                                    if (new RegExp(DBSite[now].url.slice(1,DBSite[now].url.length-1), 'i').test(location.pathname + location.search) === true) {curSite = DBSite[now];} else {if (urlC === true) {support = true;}; continue;}
                                } else { // 如果是函数，那就执行代码

                                    if (new Function('fun', DBSite[now].url)(window.autoPage)) {curSite = DBSite[now];} else {if (urlC === true) {support = true;}; continue;}

                                }
                            } catch (e) {
                                console.error('[自动无缝翻页] - 当前网页规则 "url" 有误，请检查！', e, DBSite[now].url);
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
        } else if (typeof discuz_uid != 'undefined' || getCSS('meta[name="author" i][content*="Discuz!" i], meta[name="generator" i][content*="Discuz!" i], body[id="nv_forum" i][class^="pg_" i][onkeydown*="27"], body[id="nv_search" i][onkeydown*="27"]') || getXpath('id("ft")[contains(string(),"Discuz!")]')) {
            console.info(`[自动无缝翻页] - <Discuz!> 论坛`); return 2;

        } else if (typeof flarum != 'undefined' || getCSS('#flarum-loading')) {
            console.info(`[自动无缝翻页] - <Flarum> 论坛`); return 3;

        } else if (typeof phpbb != 'undefined' || getCSS('body#phpbb')) {
            console.info(`[自动无缝翻页] - <phpBB> 论坛`); return 4;

        } else if (typeof xn != 'undefined' && getXpath('//footer//a[contains(string(), "Xiuno")] | //link[contains(@href, "xiuno")] | //script[contains(@src, "xiuno")]')) {
            console.info(`[自动无缝翻页] - <Xiuno> 论坛`); return 5;

        } else if (typeof XF != 'undefined') {
            console.info(`[自动无缝翻页] - <XenForo> 论坛`); return 6;

        } else if (getCSS('head meta[name="generator" i][content="nexusphp" i]') || getXpath('id("footer")[contains(string(), "NexusPHP")]')) {
            console.info(`[自动无缝翻页] - <NexusPHP> 论坛`); return 7;

        } else if (loadMoreExclude(loadMoreExclude1) && getAllCSS('.load-more, .load_more, .loadmore, #load-more, #load_more, #loadmore, .show-more, .show_more').length === 1) {
            console.info(`[自动无缝翻页] - 部分自带 自动无缝翻页 的网站 1`); return 8;

        } else if (loadMoreExclude(loadMoreExclude2) && getAllXpath('//*[self::a or self::span or self::button or self::div][text()="加载更多" or text()="查看更多"][not(@href) or @href="#" or starts-with(@href, "javascript")]').length === 1) {
            console.info(`[自动无缝翻页] - 部分自带 自动无缝翻页 的网站 2`); return 9;

        } else if (getCSS('link[href*="/wp-content/" i], script[src*="/wp-content/" i]')) {

            //if (getAllCSS('article[class], div[id^="post-"], ul[class*="post"]>li.item, .post').length < 4 || getCSS('#nav-below, nav.navigation, nav.paging-navigation, .pagination, .wp-pagenavi, .pagenavi')) return 0;

            if (getCSS('.post-page-numbers.current+a')) {
                if (getAllCSS('.entry-content').length == 1) {
                    DBSite.wp_article_post.pager.pageE = '.entry-content>*:not(.wbp-cbm):not(.page-links):not(.article-paging):not(.entry-pagination):not(.pagination)'
                } else if (getAllCSS('.article-content').length == 1) {
                    DBSite.wp_article_post.pager.pageE = '.article-content>*:not(.page-links):not(.article-paging):not(.entry-pagination):not(.pagination)'
                } else if (getAllCSS('article').length == 1) {
                    DBSite.wp_article_post.pager.pageE = 'article>*:not(.page-links):not(.article-paging):not(.entry-pagination):not(.pagination)'
                }
                if (DBSite.wp_article_post.pager.pageE != undefined) console.info(`[自动无缝翻页] - 部分使用 WordPress 的网站 - 文章内`); return 11;
            }

            if (getCSS('a.next, a.next-page')) {
                DBSite.wp_article.pager.nextL = 'a.next, a.next-page'
            } else if (getCSS('a[rel="next" i], a[aria-label="Next Page" i], a[aria-label="下一页"], a[rel="下一页"], a[title="下一页"], a[aria-label="下一頁"], a[rel="下一頁"], a[title="下一頁"]')) {
                DBSite.wp_article.pager.nextL = 'a[rel="next" i], a[aria-label="Next Page" i], a[aria-label="下一页"], a[rel="下一页"], a[title="下一页"], a[aria-label="下一頁"], a[rel="下一頁"], a[title="下一頁"]'
            } else if (getCSS('li.next-page > a, li.next > a, li.pagination-next>a')) {
                DBSite.wp_article.pager.nextL = 'li.next-page > a, li.next > a, li.pagination-next>a'
            } else if (getCSS('span.current+a')) {
                DBSite.wp_article.pager.nextL = 'span.current+a'
            } else if (getCSS('.nav-previous a, a.nav-previous')) {
                DBSite.wp_article.pager.nextL = '.nav-previous a, a.nav-previous'
            } else if (getXpath('//a[contains(text(), "下一页") or contains(text(), "下一頁") or contains(text(), ">") or contains(text(), "next") or contains(text(), "Next") or contains(text(), "NEXT")]', getCSS('#nav-below, nav.navigation, nav.paging-navigation, .pagination:not([class*="entry"]), .wp-pagenavi, .pagenavi, nav[role="navigation"]'))) {
                DBSite.wp_article.pager.nextL = '//*[self::ul or self::nav or self::div][@id="nav-below" or contains(@class, "navigation") or contains(@class, "pagination") or contains(@class, "pagenavi") or @role="navigation"]//a[contains(text(), "下一页") or contains(text(), "下一頁") or contains(text(), ">") or contains(text(), "next") or contains(text(), "Next") or contains(text(), "NEXT")]'
            }

            if (DBSite.wp_article.pager.nextL != undefined) {
                if (getAllCSS('main').length == 1) {
                    if (getAllCSS('main article[class]').length > 3) {
                        DBSite.wp_article.pager.pageE = 'main article[class]'
                    } else if (getAllCSS('main div[id^="post-"]').length > 3) {
                        DBSite.wp_article.pager.pageE = 'main div[id^="post-"]'
                    } else if (getAllCSS('main .post').length > 3) {
                        DBSite.wp_article.pager.pageE = 'main .post'
                    }
                    if (DBSite.wp_article.pager.pageE != undefined) {console.info(`[自动无缝翻页] - 部分使用 WordPress 的网站`); return 10;}
                }

                if (getAllCSS('article[class]').length > 3) {
                    DBSite.wp_article.pager.pageE = 'article[class]'
                } else if (getAllCSS('div[id^="post-"]').length > 3) {
                    DBSite.wp_article.pager.pageE = 'div[id^="post-"]'
                } else if (getAllCSS('ul[class*="post"]>li.item').length > 3) {
                    DBSite.wp_article.pager.pageE = 'ul[class*="post"]>li.item'
                } else if (getAllCSS('.post').length > 3) {
                    DBSite.wp_article.pager.pageE = '.post'
                } else if (getAllCSS('#posts, .posts').length == 1) {
                    DBSite.wp_article.pager.pageE = '#posts, .posts'
                }
                if (DBSite.wp_article.pager.pageE != undefined) {console.info(`[自动无缝翻页] - 部分使用 WordPress 的网站`); return 10;}
            }
        } else if (getCSS('meta[name="template" i][content="handsome" i]') && getCSS('.page-navigator')) {
                console.info(`[自动无缝翻页] - 部分使用 Typecho 的网站 (handsome)`); return 12;
        } else if (getCSS('meta[name="template" i][content="Mirages" i]') && getCSS('.page-navigator')) {
                console.info(`[自动无缝翻页] - 部分使用 Typecho 的网站 (Mirages)`); return 13;

        } else if (getCSS('.stui-page, .stui-page__item, #long-page, .myui-page, .myui-page__item')) {
            console.info(`[自动无缝翻页] - 部分影视网站`); return 300;
        } else if (getCSS('#page') && getCSS('.module-items')) {
            console.info(`[自动无缝翻页] - 部分影视网站 2`); return 301;

        } else if (getCSS('.ArticleImageBox, .PictureList') && getCSS('.article_page') && getXpath('//div[contains(@class,"article_page")]//a[text()="下一页"]')) {
            console.info(`[自动无缝翻页] - 部分美女图站 - 手机版`); return 302;

        } else if (getCSS('.content > #content') && getXpath('//div[contains(@class,"page_chapter")]//a[text()="下一章"]')) {
            console.info(`[自动无缝翻页] - <笔趣阁 1> 模板的小说网站`); return 200;
        } else if (getCSS('#nr1, #chaptercontent, .Readarea, .ReadAjax_content') && getCSS('#pb_next, #linkNext')) {
            console.info(`[自动无缝翻页] - <笔趣阁 1 - 手机版> 模板的小说网站`); return 201;
        } else if (getCSS('#txt, .txt') && getCSS('#pb_next, .url_next') && getCSS('.chapter-control, .chapter-page-btn')) {
            console.info(`[自动无缝翻页] - <笔趣阁 2> 模板的小说网站`); return 202;
        } else if ((getCSS('meta[name="description" i][content*="小说"], meta[name="description" i][content*="章节"], meta[name="description" i][content*="阅读"]') || location.hostname.indexOf('biqu')!=-1 || document.title.match(/笔趣阁|小说|章/)!=null) && (getCSS('[id="content" i], [class~="content" i], [id="chaptercontent" i], [class~="chaptercontent" i], [id="booktext" i], [id="txtcontent" i], [class~="txtnav" i]') && getXpath('//a[contains(text(), "下一章") or contains(text(), "下一页") or contains(text(), "下一节")]'))) {
            console.info(`[自动无缝翻页] - <笔趣阁 3> 模板的小说网站`); return 203;
        } else if (getCSS('meta[content^=SearXNG i], link[href*=SearXNG i], script[src*=SearXNG i]')) {
            console.info(`[自动无缝翻页] - <SearXNG> 元搜索引擎`); return 303;
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
                case 8: // < 部分自带 自动无缝翻页 的网站 1 >
                    DBSite.loadmore.url('.load-more, .load_more, .loadmore, #load-more, #load_more, #loadmore, .show-more, .show_more'); break;
                case 9: // < 部分自带 自动无缝翻页 的网站 2 >
                    DBSite.loadmore.url('//*[self::a or self::span or self::button or self::div][text()="加载更多" or text()="查看更多"][not(@href) or @href="#" or starts-with(@href, "javascript")]'); break;
                case 10: // < 部分使用 WordPress 的网站 >
                    DBSite.wp_article.url(); break;
                case 11: // < 部分使用 WordPress 的网站 - 文章内 >
                    curSite = DBSite.wp_article_post; break;
                case 12: // < 部分使用 Typecho 的网站 (handsome) >
                    curSite = DBSite.typecho_handsome; break;
                case 13: // < 部分使用 Typecho 的网站 (Mirages) >
                    curSite = DBSite.typecho_mirages; break;
                case 200: // < 所有使用 笔趣阁 1 模板的小说网站 >
                    DBSite.biquge1.url(); break;
                case 201: // < 所有使用 笔趣阁 1 - 手机版 模板的小说网站 >
                    curSite = DBSite.biquge1_m; break;
                case 202: // < 所有使用 笔趣阁 2 模板的小说网站 >
                    DBSite.biquge2.url(); break;
                case 203: // < 所有使用 笔趣阁 3 模板的小说网站 >
                    curSite = DBSite.biquge3; break;
                case 300: // < 部分影视网站 >
                    curSite = DBSite.yingshi; break;
                case 301: // < 部分影视网站 2 >
                    curSite = DBSite.yingshi2; break;
                case 302: // < 部分美女图站 - 手机版 >
                    curSite = DBSite.meinvtu_m; break;
                case 303: // < SearXNG 元搜索引擎 >
                    document.cookie='infinite_scroll=1; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/';
                    document.cookie='results_on_new_tab=1; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/';
                    break;
            }
        }
    }
    // 内置翻页规则
    function setDBSite() {
        /*
    url:         匹配到该域名后要执行的函数/正则（一般用于根据 URL 分配相应翻页规则）
    urlC:        对于使用 pjax 技术的网站，需要监听 URL 变化来重新判断翻页规则（需要放在 url: 中，自定义规则的话需要使用 fun.isUrlC()）

    noReferer:   获取下一页内容时，不携带 Referer（部分网站携带与不携带可能不一样）
    hiddenPN:    不显示脚本左下角的页码
    history:     添加历史记录 并 修改当前 URL（默认开启，对于不支持的网站要设置为 false）
    thread:      对于社区类网站，要在 帖子内 的规则中加入这个，用于脚本的 [帖子内自动翻页] 功能（即用户可以选择开启/关闭所有社区类网站帖子内的自动翻页）
    style:       要插入网页的 CSS Style 样式
    retry:       允许获取失败后重试
    blank:       强制新标签页打开链接（1 = <base>，2 = 对 body 点击事件委托，3 = 仅对 pageE 的父元素点击事件委托，4 = 仅对 pageE 的父元素添加 target="_blank"）

pager: {
    type:     翻页模式
       1 = 由脚本实现自动无缝翻页，可省略（适用于：静态加载内容网站，常规模式）

       2 = 只需要点击下一页按钮（适用于：网站自带了 自动无缝翻页 功能）
           nextText:    按钮文本，当按钮文本 = 该文本时，才会点击按钮加载下一页（避免一瞬间加载太多次下一页，下同）
           nextTextOf:  按钮文本的一部分，当按钮文本包含该文本时，才会点击按钮加载下一页
           nextHTML:    按钮内元素，当按钮内元素 = 该元素内容时，才会点击按钮加载下一页
           interval:    点击间隔时间，对于没有按钮文字变化的按钮，可以手动指定间隔时间（单位 ms，默认 500，当指定上面三个时，会忽略 interval）
           isHidden:    只有下一页按钮可见时（没有被隐藏），才会点击

       3 = 依靠 [基准元素] 与 [浏览器可视区域底部] 之间的距离缩小来触发翻页（适用于：主体元素下方内容太多 且 高度不固定时）
           scrollE:     作为基准线的元素（一般为底部页码元素），和 replaceE 一样的话可以省略
           scrollD:     基准元素 - 可视区域底部

       4 = 动态加载类网站（适用于：简单的动态加载内容网站）
           insertE:     用来插入元素的函数

       5 = 插入 iframe 方式来加载下一页，无限套娃（适用于：部分动态加载内容的网站，需要允许 iframe 且支持通过 GET/POST 直接打开下一页）
           style:       加载 iframe 前要插入的 CSS Style 样式（比如为了悬浮的样式与下一页的重叠，隐藏网页底部间距提高阅读连续性）
           iframe:      这个必须加到 pager{} 外面（这样才会在该域名的 iframe 框架下运行脚本）

       6 = 通过 iframe 获取下一页动态加载内容插入本页，只有一个娃（适用于：部分动态加载内容的网站，与上面不同的是，该模式适合简单的网页，没有复杂事件什么的）
           loadTime:    预留的网页加载时间，确保网页内容加载完成

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
         注意：如 pageE 中选择了多类元素，则不能省略 insertP（比如包含 `,` 与 `|` 符号），除非另外的选择器是 <script> <style> <link> 标签

    replaceE: 要替换为下一页内容的元素（比如页码）
    scrollD： 翻页动作触发点（[滚动条] 与 [网页底部] 之间的距离），数值越大，越早开始翻页，一般是访问网页速度越慢，该值就需要越大，省略后默认 2000

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
            loadmore: {
                url: function(nextL) {curSite = DBSite.loadmore; curSite.pager.nextL = nextL;},
                pager: {
                    type: 2,
                    isHidden: true,
                    interval: 1000
                }
            }, //           部分自带 自动无缝翻页 的网站
            wp_article: {
                url: ()=> {
                    if (!indexOF('/post/') && !getCSS('#comments, .comments-area, #disqus_thread')) {
                        curSite = DBSite.wp_article;
                        // 自适应瀑布流样式
                        setTimeout(()=>{if (getCSS(curSite.pager.pageE).style.cssText.indexOf('position: absolute') != -1){insStyle(curSite.pager.pageE + '{position: static !important; float: left !important; height: '+ parseInt(getCSS(curSite.pager.pageE).offsetHeight * 1.1) + 'px !important;}');}}, 1500);
                    }
                },
                style: 'img[data-src], img[data-original] {opacity: 1 !important;}',
                blank: 3,
                pager: {
                    replaceE: '#nav-below, nav.navigation, nav.paging-navigation, .pagination:not([class*="entry"]), .wp-pagenavi, .pagenavi, nav[role="navigation"]',
                    forceHTTPS: true,
                    scrollD: 3000
                },
                function: {
                    bF: src_bF
                }
            }, //         部分使用 WordPress 的网站
            wp_article_post: {
                pager: {
                    type: 3,
                    nextL: '.post-page-numbers.current+a',
                    replaceE: '//a[contains(@class,"post-page-numbers")]/parent::*',
                    scrollD: 3000
                },
                function: {
                    bF: src_bF
                }
            }, //    部分使用 WordPress 的网站 - 文章内
            typecho_handsome: {
                blank: 3,
                pager: {
                    nextL: 'li.next>a',
                    pageE: '.blog-post, .post-list',
                    replaceE: '.page-navigator'
                }
            }, //   部分使用 Typecho 的网站 (handsome)
            typecho_mirages: {
                blank: 3,
                pager: {
                    nextL: 'li.next>a',
                    pageE: '#index>article, #archive>article',
                    scriptT: 3,
                    replaceE: '.page-navigator'
                }
            }, //    部分使用 Typecho 的网站 (Mirages)
            biquge1: {
                url: ()=> {curSite = DBSite.biquge1;xs_bF(getAllCSS('.content > #content'),[/<br>.{0,10}秒记住.+$/, '']);},
                style: 'img, .posterror, a[href*="posterror()"], [style*="background"][style*="url("]:not(html):not(body), #content > *:not(br):not(p) {display: none !important;}',
                history: true,
                pager: {
                    nextL: '//div[@class="page_chapter"]//a[text()="下一章"]',
                    pageE: '.content > #content',
                    insertP: ['.content > #content', 6],
                    replaceE: '.page_chapter'
                },
                function: {
                    bF: xs_bF,
                    bFp: [/<br>.{0,10}秒记住.+$/, '']
                }
            }, //            笔趣阁 1 模板的小说网站
            biquge1_m: {
                style: 'img, .posterror, .show-app2, a[href*="posterror()"], [onclick*="location.href"], [style*="background"][style*="url("]:not(html):not(body), #nr1>*:not(br):not(p), #chaptercontent>*:not(br):not(p), .Readarea>*:not(br):not(p), .ReadAjax_content>*:not(br):not(p) {display: none !important;}',
                history: true,
                pager: {
                    nextL: '#pb_next, #linkNext',
                    pageE: '#nr1, #chaptercontent, .Readarea, .ReadAjax_content',
                    insertP: ['#nr1, #chaptercontent, .Readarea, .ReadAjax_content', 6],
                    replaceE: '//a[@id="pb_next" or @id="linkNext"]/parent::*'
                }
            }, //          笔趣阁 2 - 手机版 模板的小说网站
            biquge2: {
                url: ()=> {if (isMobile() || getCSS('.chapter-page-btn') != null) {curSite = DBSite.biquge2_m;} else {curSite = DBSite.biquge2;}},
                style: 'img, .posterror, a[href*="posterror()"], [style*="background"][style*="url("]:not(html):not(body), #txt > *:not(br):not(p) {display: none !important;}',
                history: true,
                pager: {
                    type: 6,
                    nextL: '#pb_next, .url_next',
                    pageE: '#txt, .txt',
                    insertP: ['#txt, .txt', 6],
                    replaceE: '.chapter-control, .chapter-page-btn',
                    loadTime: 1500,
                    scrollD: 3500
                }
            }, //            笔趣阁 3 模板的小说网站
            biquge2_m: {
                style: 'img, .posterror, a[href*="posterror()"], [style*="background"][style*="url("]:not(html):not(body), #txt > *:not(br):not(p) {display: none !important;}',
                history: true,
                pager: {
                    nextL: '#pb_next, .url_next',
                    pageE: '#txt, .txt',
                    insertP: ['#txt, .txt', 6],
                    replaceE: '.chapter-control, .chapter-page-btn'
                }
            }, //          笔趣阁 3 - 手机版 模板的小说网站
            biquge3: {
                style: 'img, .posterror, a[href*="posterror()"], [style*="background"][style*="url("]:not(html):not(body), script+div[style="padding:15px;"] {display: none !important;}',
                history: true,
                pager: {
                    nextL: '//a[contains(text(), "下一章") or contains(text(), "下一页") or contains(text(), "下一节")]',
                    pageE: '[id="content" i], [class~="content" i], [id="chaptercontent" i], [class~="chaptercontent" i], [id="booktext" i], [id="txtcontent" i], [class~="txtnav" i]',
                    insertP: ['[id="content" i], [class~="content" i], [id="chaptercontent" i], [class~="chaptercontent" i], [id="booktext" i], [id="txtcontent" i], [class~="txtnav" i]', 6],
                    insertP6Br: true,
                    replaceE: '//a[contains(text(), "下一章") or contains(text(), "下一页") or contains(text(), "下一节")]/parent::*'
                },
                function: {
                    bF: xs_bF,
                    bFp: [/<br>.{0,10}秒记住.+$/, '']
                }
            }, //            笔趣阁 4 模板的小说网站
            yingshi: {
                style: 'div.stui-page__all, div.myui-page__all {display: none !important;}',
                blank: 3,
                pager: {
                    nextL: '.stui-page li.active+li>a, .stui-page__item li.active+li>a, #long-page .active+li>a, .myui-page .visible-xs+li>a',
                    pageE: '.stui-vodlist, .myui-vodlist>li, #content, #searchList',
                    replaceE: '.stui-page, .stui-page__item, #long-page, .myui-page, .myui-page__item'
                },
                function: {
                    bF: src_bF,
                    bFp: [1, '[data-original]', 'data-original']
                }
            }, //            部分影视网站
            yingshi2: {
                blank: 3,
                pager: {
                    nextL: '#page a[title="下一页"], a.page-number.page-next',
                    pageE: '.module-items>*',
                    replaceE: '#page'
                },
                function: {
                    bF: src_bF
                }
            }, //           部分影视网站 2
            meinvtu_m: {
                history: true,
                blank: 3,
                pager: {
                    type: 3,
                    nextL: '//div[contains(@class,"article_page")]//a[text()="下一页"]',
                    pageE: '.ArticleImageBox, .PictureList',
                    replaceE: '.article_page',
                    scrollD: 500
                }
            }, //          部分美女图站 - 手机版
            discuz_forum: {
                pager: {
                    type: 2,
                    nextL: '#autopbn',
                    nextTextOf: '下一'
                }
            }, //       Discuz! 论坛 - 帖子列表（自带无缝加载下一页按钮的）
            discuz_guide: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: 'tbody[id^="normalthread_"]',
                    replaceE: '.pg, .pages',
                    forceHTTPS: true
                }
            }, //       Discuz! 论坛 - 导读页 及 帖子列表（不带无缝加载下一页按钮的）
            discuz_waterfall: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: '#waterfall > li',
                    replaceE: '.pg, .pages',
                    forceHTTPS: true
                }
            }, //   Discuz! 论坛 - 图片模式的帖子列表（不带无缝加载下一页按钮的）
            discuz_thread: {
                thread: true,
                style: '.pgbtn, .viewthread:not(:first-of-type)>h1, .viewthread:not(:first-of-type)>ins, .viewthread:not(:first-of-type)>.headactions {display: none;}',
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: '#postlist > div[id^="post_"], form>.viewthread',
                    replaceE: '//div[contains(@class,"pg") or contains(@class,"pages")][./a[contains(@class,"nxt") or contains(@class,"next") or contains(@class,"prev")][not(contains(@href,"javascript") or contains(@href,"commentmore"))]]',
                    forceHTTPS: true
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
                    forceHTTPS: true
                }
            }, //      Discuz! 论坛 - 搜索页
            discuz_youspace: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: 'form:not([action^="search.php?"]) tbody > tr:not(.th)',
                    replaceE: '.pg, .pages',
                    forceHTTPS: true
                }
            }, //    Discuz! 论坛 - 回复页、主题页（别人的）
            discuz_collection: {
                pager: {
                    nextL: 'a.nxt:not([href^="javascript"]) ,a.next:not([href^="javascript"])',
                    pageE: '#ct .bm_c table > tbody',
                    replaceE: '.pg, .pages',
                    forceHTTPS: true
                }
            }, //  Discuz! 论坛 - 淘帖页
            discuz_m: {
                thread: true,
                pager: {
                    nextL: '//a[@class="nxt" or @class="next"] | //div[@class="page"]/a[text()="下一页" or contains(text(), ">")]',
                    replaceE: '.pg, .page',
                    forceHTTPS: true,
                    scrollD: 1000
                }
            }, //           Discuz! 论坛 - 触屏手机版 - 帖子内
            discuz_m_forum: {
                pager: {
                    type: 2,
                    nextL: 'a.loadmore',
                    interval: 500,
                    scrollD: 1000
                }
            }, //     Discuz! 论坛 - 触屏手机版 - 帖子列表（自带无缝加载下一页按钮的）
            flarum: {
                url: ()=> {urlC = true;if (!indexOF('/d/')) {curSite = DBSite.flarum;}},
                pager: {
                    type: 2,
                    nextL: '.DiscussionList-loadMore > button',
                    isHidden: true
                }
            }, //             Flarum 论坛
            phpbb: {
                url: ()=> {if (indexOF('/viewforum.php')) {
                    curSite = DBSite.phpbb;
                } else if (indexOF('/viewtopic.php')) {
                    curSite = DBSite.phpbb_post;
                } else if (indexOF('/search.php')) {
                    curSite = DBSite.phpbb_search;
                }},
                pager: {
                    nextL: '.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: '.forumbg:not(.announcement) ul.topiclist.topics > li',
                    replaceE: '.action-bar .pagination, .topic-actions .pagination'
                }
            }, //              phpBB 论坛 - 帖子列表
            phpbb_post: {
                thread: true,
                pager: {
                    nextL: '.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: 'div.post[id], div.post[id]+hr',
                    replaceE: '.action-bar .pagination, .topic-actions .pagination'
                }
            }, //         phpBB 论坛 - 帖子内
            phpbb_search: {
                pager: {
                    nextL: '.pagination li.next a[rel="next"], .topic-actions .pagination strong~a',
                    pageE: 'div.search.post',
                    replaceE: '.action-bar .pagination, .pagination'
                }
            }, //       phpBB 论坛 - 搜索页
            xenforo: {
                url: ()=> {if (indexOF(/\/(forums|f)\//)) {
                    curSite = DBSite.xenforo;
                } else if (indexOF(/\/(threads|t)\//)) {
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
                thread: true,
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
                url: ()=> {if (lp == '/' || indexOF(/\/(index|forum)/)) {curSite = DBSite.xiuno;} else if (indexOF('/thread')) {curSite = DBSite.xiuno_post;}},
                pager: {
                    nextL: '//li[@class="page-item"]/a[text()="▶" or text()="»" or contains(text(),">") or contains(text(),"下一页")]',
                    pageE: 'ul.threadlist > li',
                    replaceE: 'ul.pagination'
                }
            }, //              Xiuno 论坛 - 帖子列表
            xiuno_post: {
                thread: true,
                pager: {
                    nextL: '//li[@class="page-item"]/a[text()="▶" or text()="»" or contains(text(),">") or contains(text(),"下一页")]',
                    pageE: 'li.post[data-pid]:not(.newpost)',
                    replaceE: 'ul.pagination'
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
                    } else if (lp == '/forums.php' && indexOF('action=viewtopic', 's')) {
                        curSite = DBSite.nexusphp;
                        curSite.thread = true;
                        curSite.pager.pageE = 'td.text > div, td.text > div+table.main';
                    }},
                pager: {
                    nextL: '//a[./b[contains(text(), "下一页") or contains(text(), ">>")]]',
                    pageE: 'table.torrents > tbody > tr:not(:first-of-type)',
                    replaceE: '//p[@align][./font[@class="gray"]]'
                }
            }, //           NexusPHP 论坛
            nexusmods: {
                host: 'www.nexusmods.com',
                url: ()=> {urlC = true; if (indexOF(/\/(mods|users)\/\d+/)) {if (indexOF('tab=posts','s')){curSite = DBSite.nexusmods_posts;} else if (indexOF('tab=user+files','s')){curSite = DBSite.nexusmods;}} else if (lp !== '/' && getCSS('.pagination a.page-selected')) {curSite = DBSite.nexusmods;}},
                blank: 1,
                history: false,
                pager: {
                    nextL: nexusmods_nextL,
                    pageE: 'ul.tiles>li',
                    replaceE: '.pagination',
                    scrollD: 3500
                },
                function: {
                    bF: nexusmods_bF
                }
            }, //               NexusMods
            nexusmods_posts: {
                history: false,
                pager: {
                    nextL: nexusmods_nextL,
                    pageE: '#comment-container>ol>li.comment:not(.comment-sticky)',
                    replaceE: '.pagination',
                    scrollD: 3500
                }
            }, //               NexusMods posts
            bilibili_search: {
                host: 'search.bilibili.com',
                url: ()=> {
                    urlC = true;
                    if ((lp == '/all' || lp == '/video') && getCSS('ul.video-list') != null) {
                        curSite = DBSite.bilibili_search;
                    } else if (lp == '/article' && getCSS('#article-list') != null) {
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
            manhuacat: {
                host: ['www.manhuacat.com', 'www.maofly.com','www.manhuafei.com'],
                url: ()=> {if (indexOF(/\/(manga|manhua)\/\d+\/.+\.html/)) {
                    if (getCookie('is_pull') == 'true') { // 强制关闭 [下拉] 模式
                        document.cookie='is_pull=false; expires=Thu, 18 Dec 2031 12:00:00 GMT; path=/'; // 写入 Cookie 关闭 [下拉] 模式
                        location.reload(); // 刷新网页
                    }
                    setTimeout(manhuacat_init, 100);
                    curSite = DBSite.manhuacat;
                }},
                style: '#left, #right, #pull-load, .loading, .pagination, footer {display: none !important;} .img-content > img {display: block !important;margin: 0 auto !important; border: none !important; padding: 0 !important; max-width: 99% !important; height: auto !important;}', // 隐藏不需要的元素，调整图片
                pager: {
                    type: 4,
                    nextL: manhuacat_nextL,
                    insertP: ['.img-content', 3],
                    insertE: manhuacat_insertE,
                    replaceE: '.comic-detail > .breadcrumb-bar, .comic-detail >h2.h4, .vg-r-data, body > script:not([src])',
                    interval: 3000,
                    scrollD: 4000
                }
            }, //         漫画猫 + 漫画飞
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
                blank: 1,
                pager: {
                    nextL: '//div[@class="NewPages"]//a[text()="下一页"]',
                    pageE: 'ul.mh-search-list > li',
                    replaceE: '.NewPages'
                }
            }, //     爱漫画 - 分类页
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
            alimanhua: {
                host: ['www.alimanhua.com','www.iimanhua.cc'],
                url: ()=> {
                    if (indexOF(/\/\d+\.html$/)) {
                        curSite = DBSite.alimanhua;
                        pausePage = false;
                        setTimeout(()=>{pausePage = true;}, 5000)
                    } else if (indexOF(/^\/(manhua|comic)\/\d+\/$/)) {
                        setTimeout(()=>{getCSS('#openBook').click()}, 500)
                    } else if (lp != '/'){
                        curSite = DBSite.alimanhua_list;
                    }
                },
                style: 'iframe {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: alimanhua_nextL,
                    pageE: 'head>script:not([src])',
                    insertP: ['#viewimages', 3],
                    insertE: alimanhua_insertE,
                    interval: 3000,
                    scrollD: 3000
                }
            }, //         阿狸漫画 + 爱漫画
            alimanhua_list: {
                blank: 3,
                pager: {
                    nextL: '#pager>b+a',
                    pageE: '#dmList>ul',
                    replaceE: '#pager',
                    scrollD: 800
                },
                function: {
                    bF: "return fun.src_bF(pageE, [0, 'img[_src]', '_src'])"
                }
            }, //    阿狸漫画 - 分类/搜索页
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
                    interval: 500
                }
            }, //           Mangabz 漫画
            mangabz_list: {
                blank: 1,
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
                style: '.view-paging > .container, .view-comment {display: none !important;} .rightToolBar {opacity: 0.3 !important;} #cp_img > img, #barChapter > img{display: block !important;margin: 0 auto !important; max-width: 99% !important; width: auto !important; height: auto !important;} body {overflow: auto !important;}',
                pager: {
                    type: 4,
                    nextL: dm5_nextL,
                    insertP: ['#barChapter,#cp_img', 3],
                    insertE: dm5_insertE,
                    replaceE: '.view-paging > .container, .rightToolBar',
                    interval: 500
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
                blank: 1,
                pager: {
                    nextL: '//div[@class="page-pagination"]//a[contains(text(), ">")]',
                    pageE: 'ul.mh-list > li',
                    replaceE: '.page-pagination',
                    scrollD: 1000
                }
            }, //      Xmanhua 漫画 - 分类/搜索页
            coolkeyan: {
                host: 'www.coolkeyan.com',
                url: ()=> {if (location.hash.indexOf('/project/') > -1) curSite = DBSite.coolkeyan;},
                style: '.q-img {height: auto !important;} .q-img__image {max-height: 1000px !important;} .row.q-my-sm.q-gutter-sm {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: coolkeyan_nextL,
                    insertP: ['//div[contains(@class, "q-img__image")][last()]', 4],
                    insertE: coolkeyan_insertE,
                    interval: 0
                }
            }, //             酷科研
            nsfc: {
                host: ['output.nsfc.gov.cn', 'kd.nsfc.gov.cn'],
                url: ()=> {if (indexOF('/conclusionProject/')) curSite = DBSite.nsfc;},
                style: '#pageNoUl {display: none !important;}',
                pager: {
                    type: 4,
                    nextL: nsfc_nextL,
                    insertP: ['#pageNoUl', 1],
                    insertE: nsfc_insertE,
                    interval: 0
                }
            } //                   国家自然科学基金
        };
        // 合并 自定义规则、外置规则、内置规则
        if (Object.keys(GM_getValue('menu_customRules', {})).length === 0) {
            DBSite = Object.assign(GM_getValue('menu_customRules', {}), GM_getValue('menu_rules', {}), DBSite);
            DBSite2 = GM_getValue('menu_rules', {})
        } else { // 自定义规则 覆盖 同名的外置规则
            let a = GM_getValue('menu_customRules', {}), a1 = Object.keys(a),
                b = GM_getValue('menu_rules', {}), b1 = Object.keys(b)
            for (let i = 0; i < a1.length; i++) {if(b1.indexOf(a1[i]) != -1) {delete b[a1[i]]};}
            DBSite = Object.assign(a, b, DBSite);
            DBSite2 = Object.assign(a, b);
        }

        // 生成 SiteTypeID
        setSiteTypeID();
        //console.log(DBSite)
    }
    // 外置翻页规则
    function getRulesUrl(update = false) {
        // 如果是原来的时间格式 或 刚安装脚本，则需要立即更新
        if (typeof(GM_getValue('menu_ruleUpdateTime', '')) == 'string') {update = true; if (scriptHandler != 'AdGuard') {alert('请点击【确定】开始首次获取【外置翻页规则】（大概几秒\n\n在此期间请不要 操作/跳转/关闭 当前网页~\n\n如果不小心没获取成功也没事，可以去脚本菜单中手动【更新外置翻页规则】即可（浏览器右上角 Tampermonkey 扩展图标内的脚本菜单\n\n\n另外，想要【临时暂停翻页】请点击左下角悬浮的【页码】按钮\n\n如果每次打开网页都会看到该提示，说明你的 油猴脚本管理器 存在兼容性问题，请更换其他试试！');} else {urlArr2 = urlArr}}

        if (update) { // 手动更新（或安装后首次更新）
            GM_notification({text: '🔄 更新外置翻页规则中，请勿操作网页...', timeout: 5000});
            getRulesUrl_(true);
        } else if (parseInt(+new Date()/1000) - GM_getValue('menu_ruleUpdateTime', 0) > 864000) {
            getRulesUrl_();
        }

        function getRulesUrl_(n = false, url) {
            if (n) {url = urlArr2[Math.floor(Math.random()*urlArr2.length)];} else {url = urlArr[Math.floor(Math.random()*urlArr.length)];}
            if (url === undefined) {GM_notification({text: '❌ 所有更新地址均以试过，已无可用地址，请联系作者解决...', timeout: 5000}); return}
            //console.log(url); return
            GM_xmlhttpRequest({
                url: url,
                method: 'GET',
                responseType: 'json',
                overrideMimeType: 'application/json; charset=utf-8',
                timeout: 5000,
                onload: function (response) {
                    try {
                        //console.log('最终 URL：' + response.finalUrl, '返回内容：',response.response, response.responseHeaders)
                        if (response.response) {
                            GM_setValue('menu_rules', response.response); // 写入最新规则
                            GM_setValue('menu_ruleUpdateTime', parseInt(+new Date()/1000)); // 写入当前时间戳

                            curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                            registerMenuCommand(); // 重新判断规则

                            webTypeIf(); // 判断网站类型
                            if (!GM_getValue('menu_thread')) {if (curSite.thread) {curSite = {SiteTypeID: 0}; pageNum.now = 1;}} // 帖子内自动翻页判断
                            if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                            if (curSite.blank != undefined) setTimeout(forceTarget, 1000); // 强制新标签页打开链接
                            if (curSite.style) {insStyle(curSite.style)} // 插入 Style CSS 样式
                            pausePageEvent(); // 左键双击网页空白处暂停翻页
                            pageLoading(); // 自动无缝翻页

                            if (n) GM_notification({text: '✅ 已更新外置翻页规则！\n如果依然无法翻页，说明还不支持当前网页，点击此处提交申请~', timeout: 5000, onclick: function(){window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419215/feedback', {active: true,insert: true,setParent: true});}});
                        } else {
                            console.log('URL：' + url);
                            GM_notification({text: '❌ 为空！更新失败，请再试几次...\n如果依然更新失败，请联系作者解决...', timeout: 5000});
                            if (n) {urlArr2.splice(urlArr2.indexOf(url), 1)} else {urlArr.splice(urlArr.indexOf(url), 1)}
                        }
                    } catch (e) {
                        console.log('URL：' + url, e);
                        GM_notification({text: '❌ 报错！更新失败，请再试几次...\n如果依然更新失败，请联系作者解决...', timeout: 5000});
                        if (n) {urlArr2.splice(urlArr2.indexOf(url), 1)} else {urlArr.splice(urlArr.indexOf(url), 1)}
                    }
                },
                onerror: function (response) {
                    console.log('URL：' + url, response)
                    GM_notification({text: '❌ 错误！更新失败，请再试几次...\n如果依然更新失败，请联系作者解决...', timeout: 5000});
                    if (n) {urlArr2.splice(urlArr2.indexOf(url), 1)} else {urlArr.splice(urlArr.indexOf(url), 1)}
                },
                ontimeout: function (response) {
                    console.log('URL：' + url, response)
                    GM_notification({text: '❌ 超时！更新失败，请再试几次...\n如果依然更新失败，请联系作者解决...', timeout: 5000});
                    if (n) {urlArr2.splice(urlArr2.indexOf(url), 1)} else {urlArr.splice(urlArr.indexOf(url), 1)}
                }
            })
        }
    }


    // --------------------------------------------------------


    // 判断网站类型
    webTypeIf();

    // 帖子内自动翻页判断
    if (!GM_getValue('menu_thread')) {if (curSite.thread) {curSite = {SiteTypeID: 0}; pageNum.now = 1;}}

    //console.log(curSite)
    // 显示页码
    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');}
    // 左键双击网页空白处暂停翻页
    pausePageEvent();
    // 强制新标签页打开链接
    if (curSite.blank != undefined) setTimeout(forceTarget, 1000);
    // 初始化事件
    //if (curSite.initE != undefined) initEvent();

    // 对于使用 pjax 技术的网站，需要监听 URL 变化来重新判断翻页规则
    if (urlC) {
        nowLocation = location.href
        if (window.onurlchange === undefined) {addUrlChangeEvent();} // Tampermonkey v4.11 版本添加的 onurlchange 事件 grant，可以监控 pjax 等网页的 URL 变化
        if (webType === 1) {
            window.addEventListener('urlchange', function(){
                lp = location.pathname;
                //console.log(nowLocation, location.href)
                if (curSite.history !== false && window.top.document.Autopage_nowUrl === location.href) {nowLocation = location.href; return}
                if (nowLocation == location.href) return
                if (curSite.pager && curSite.pager.type == 5) {
                    if (self != top) {window.top.location.href = location.href;} else {if (getCSS('iframe#Autopage_iframe')) {getCSS('iframe#Autopage_iframe').remove();}}
                    pausePage = true;
                } // 对于翻页模式 5，如果是 iframe 框架内 URL 变动，则升级为顶级页面，如果是顶级页面的 URL 变动，则清理 iframe 框架
                nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                registerMenuCommand(); // 重新判断规则

                //console.log(curSite);
                if (curSite.blank != undefined) setTimeout(forceTarget, 1000); // 强制新标签页打开链接
                //if (curSite.initE != undefined) initEvent(); // 初始化事件
                if (curSite.style) {insStyle(curSite.style)} // 插入 Style CSS 样式
                if (!GM_getValue('menu_thread')) {if (curSite.thread) {curSite = {SiteTypeID: 0}; pageNum.now = 1;}} // 帖子内自动翻页判断
                if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                pausePageEvent(); // 左键双击网页空白处暂停翻页

                pageLoading();
            })
        } else if (webType === 2) {
            window.addEventListener('urlchange', function(){
                lp = location.pathname;
                //console.log(nowLocation, location.href)
                if (nowLocation == location.href) return
                setTimeout(function(){
                    nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                    discuz_(); // 重新判断规则

                    if (!GM_getValue('menu_thread')) {if (curSite.thread) {curSite = {SiteTypeID: 0}; pageNum.now = 1;}} // 帖子内自动翻页判断
                    if (curSite.style) {insStyle(curSite.style)} // 插入 Style CSS 样式
                    if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                    pausePageEvent(); // 左键双击网页空白处暂停翻页

                    pageLoading();
                }, 500)
            })
        } else if (webType === 3) {
            window.addEventListener('urlchange', function(){
                lp = location.pathname;
                if (nowLocation == location.href) return
                nowLocation = location.href; curSite = {SiteTypeID: 0}; pageNum.now = 1; // 重置规则+页码
                DBSite.flarum.url(); // 重新判断规则

                if (curSite.style) {insStyle(curSite.style)} // 插入 Style CSS 样式
                if (GM_getValue('menu_page_number')) {pageNumber('add');} else {pageNumber('set');} // 显示页码
                pausePageEvent(); // 左键双击网页空白处暂停翻页

                pageLoading();
            })
        }
    }
    // 插入 Style CSS 样式
    if (curSite.style) insStyle(curSite.style)

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
            if (curSite.SiteTypeID !== 0 && location.hostname === 'keylol.com') {curSite.history = false; urlC = true;}
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
        if (curSite.SiteTypeID !== 0 && location.hostname === 'keylol.com') {curSite.history = false; urlC = true;}
    }
    function discuz_() {
        if (getCSS('body[id="nv_forum"][class^="pg_"][onkeydown*="27"]')) {
            switch (getCSS('body[id="nv_forum"][class^="pg_"][onkeydown*="27"]').className) {
                case 'pg_forumdisplay': // < 各版块帖子列表 >
                    discuzForum(); break;
                case 'pg_viewthread': //   < 帖子内 >
                    curSite = DBSite.discuz_thread; break;
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
                    curSite = DBSite.discuz_m; curSite.pager.pageE = '.threadlist > ul > li'; urlC = true;
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
                        discuzThreadM();
                    } else {
                        curSite = DBSite.discuz_thread;
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
                    discuzThreadM();
                } else {
                    curSite = DBSite.discuz_thread;
                }
            } else if (indexOF('mod=guide', 's')) { //      < 导读帖子列表 >
                curSite = DBSite.discuz_guide;
            } else if(indexOF('mod=space', 's') && indexOF('do=thread', 's')) { // 别人的主题/回复
                curSite = DBSite.discuz_youspace;
            } else if (indexOF('mod=collection', 's')) { // < 淘贴列表 >
                curSite = DBSite.discuz_collection;
            } else if (getCSS('#threadlist, tbody[id^="normalthread_"]')) { //          < 部分论坛的各板块 URL 是自定义的 >
                discuzForum();
            } else if (getCSS('#postlist, form>.viewthread')) { //            < 部分论坛的帖子内 URL 是自定义的 >
                curSite = DBSite.discuz_thread;
            } else if (isMobile()) { //                     手机版判断
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


    // [NexusMods] 获取下一页地址
    function nexusmods_nextL() {
        if (getCSS('.nexus-ui-blocker') || !getCSS('.pagination a.page-selected')) return
        let modList;
        if (indexOF('/news')) {modList = RH_NewsTabContent;} else if (indexOF('/users/') && indexOF('tab=user+files','s')) {modList = RH_UserModsTab;} else if (indexOF('/mods/') && indexOF('tab=posts','s')) {modList = RH_CommentContainer;} else {modList = RH_ModList;}
        if (!modList) return
        let out_items = JSON.stringify(modList.out_items).replace(/{|}|"/g,''),
            nextNum = getXpath('//div[contains(@class, "pagination")][1]//a[contains(@class, "page-selected")]/parent::li/following-sibling::li[1]/a');
        var url = '';
        if (nextNum && nextNum.innerText) {
            nextNum = nextNum.innerText;
            if (out_items.indexOf('page:') > -1) {out_items = out_items.replace(/page:\d+/, `page:${nextNum}`);} else {out_items += `,page:${nextNum}`;}
            if (!indexOF(/\/(mods|users)\/\d+/)) { // MOD 页/用户页 不需要这些
                let categories = modList.out_items.categories, categoriesUrl = '', tags_yes = modList.out_items.tags_yes, tags_yesUrl = '', search = modList.out_items.search, searchUrl = '';
                if (categories && categories != []) { // 分类页
                    for (let i = 0; i < categories.length; i++) {categoriesUrl += `,categories[]:${categories[i]}`;}
                    if (out_items.indexOf('categories:') > -1) out_items = out_items.replace(/categories:\[.*\]/, categoriesUrl.replace(/,/,''))
                }
                if (tags_yes && tags_yes != []) { // 标签页
                    for (let i = 0; i < tags_yes.length; i++) {tags_yesUrl += `,tags_yes[]:${tags_yes[i]}`;}
                    if (out_items.indexOf('tags_yes:') > -1) out_items = out_items.replace(/tags_yes:\[.*\]/, tags_yesUrl.replace(/,/,''))
                }
                if (search && search.length != 0) { // 搜索页
                    for (let key in modList.out_items.search) {searchUrl += `search[${key}]:${modList.out_items.search[key]},`;}
                    if (out_items.indexOf('search:') > -1) out_items = out_items.replace('search:',searchUrl)
                }
            }
            //console.log(`https://www.nexusmods.com${modList.uri}?RH_${modList.id}=${out_items}`)
            return `https://www.nexusmods.com${modList.uri}?RH_${modList.id}=${out_items}`
        }
        return ''
    }
    // [NexusMods] 的插入前函数（隐藏底部元素）
    function nexusmods_bF(pageE) {
        pageE.forEach(function (one) {
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
        return pageE
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
    function bilibili_search_bF(pageE) {
        pageE.forEach(function (one) {
            let img = getCSS('.img > .lazy-img > img[src=""]', one)
            if (img) {
                img.setAttribute('data-srclz', 'lazy')
            }
        });
        return pageE
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


    // [漫画猫] 初始化（显示本话所以图片）
    function manhuacat_init() {
        let _img = '';
        for (let now of img_data_arr) {_img += `<img src="${asset_domain}${img_pre}${now}">`;}
        getOne(curSite.pager.insertP[0]).innerHTML = _img;

    }
    // [漫画猫] 获取下一页地址
    function manhuacat_nextL(pageE, type) {
        if (type === 'url') {
            if(pageE.code == '0000') {
                if (pageE.url === curSite.pageUrl) return
                curSite.pageUrl = pageE.url;
                getPageE_(curSite.pageUrl); // 真正的下一页链接
            }
        } else {
            let vg_r_data = getCSS('.vg-r-data');
            if (vg_r_data) {
                getPageE_(`${location.origin}/chapter_num?chapter_id=${vg_r_data.dataset.chapter_num}&ctype=1&type=${vg_r_data.dataset.chapterType};`, 'json', 'GET', '', 'url');
            }
        }
    }
    // [漫画猫] 插入数据
    function manhuacat_insertE(pageE, type) {
        if (!pageE) return
        if (type === 'url') { // 获取下一页链接
            manhuacat_nextL(pageE, type); return
        }
        addHistory(pageE);
        replaceElems(pageE);

        // 插入图片
        let _img = '', _img_arr = LZString.decompressFromBase64(getXpath('//body/script[not(@src)][contains(text(), "img_data")]').textContent.split('"')[1]).split(','), vg_r_data = getCSS('.vg-r-data');;
        for (let now of _img_arr) {_img += `<img src="${vg_r_data.dataset.chapterDomain}${img_pre}${now}">`;}
        if (_img) {
            getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
            pageNum.now = pageNum._now + 1
        }
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
            getPageE_(curSite.pageUrl);
        }
    }
    // [爱漫画] 插入数据
    function imanhuaw_insertE(pageE, type) {
        if (!pageE) return
        // 插入并运行 <script>
        insScript('//head/script[not(@src)][contains(text(), "qTcms_S_m_murl_e")]', pageE);
        // 将 img 标签插入到网页中
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), imanhuaw_getIMG());
        addHistory(pageE);
        pageNum.now = pageNum._now + 1
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
            getPageE_(`https://www.hicomic.net/api/web/chapter/${nextId.id}/contents`, 'json');
        }
    }
    // [HiComic(嗨漫画)] 插入数据
    function hicomic_insertE(pageE, type) {
        if (!pageE || pageE.code != 200) return
        if (pageE.results.chapter.next) { // 写入下一页的 UUID
            getCSS('.next_chapter').id = pageE.results.chapter.next;
        } else {
            getCSS('.next_chapter').id = 'None';
            getCSS('.next_chapter').classList.add('end');
        }
        curSite.pageUrl =`https://www.hicomic.net/chapters/${pageE.results.chapter.uuid}/contents`
        getCSS('.chapter_name').textContent = pageE.results.chapter.name; // 修改漫画标题
        addHistory(pageE, window.document.title.replace(/(\(第.+\))? - HiComic/, `(${pageE.results.chapter.name}) - HiComic`));
        let _img = '';
        for (let i = 0; i < pageE.results.chapter.contents.length; i++) { // 遍历图片文件名数组，组合为 img 标签
            let src = pageE.results.chapter.contents[i].url;
            if (src.indexOf('!p_c_c_') === -1) src += '!p_c_c_h';
            _img += `<img src="${src}">`
        }
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
        pageNum.now = pageNum._now + 1
    }


    // [阿狸漫画] 获取下一页地址
    function alimanhua_nextL(pageE, type) {
        if (type === 'url') {
            if(pageE.status == 1){
                if (pageE.url === curSite.pageUrl) return
                curSite.pageUrl = pageE.url;
                getPageE_(curSite.pageUrl); // 真正的下一页链接
            } else {
                curSite = {SiteTypeID: 0}
                alert("已经是最后一章！");
            }
        } else {
            getPageE_(`${location.origin}/e/extend/ret_page/mindex.php?bid=${window.location.href.split("/")[4]}&id=${window.location.href.split("/")[5]}&u=1`, 'json', 'GET', '', 'url');
        }
    }
    // [阿狸漫画] 插入数据
    function alimanhua_insertE(pageE, type) {
        if (!pageE) return
        if (type === 'url') { // 获取下一页链接
            alimanhua_nextL(pageE, type); return
        }
        insScript('head>script:not([src])', pageE);

        // 插入图片
        let _img = '', _host='http://res.img.tueqi.com/';
        if (location.hostname == '') _host = 'https://res.img.96youhuiquan.com/'
        for (let i=1;i<photosr.length;i++){_img += `<img src="${_host}${photosr[i]}">`;}
        getCSS(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img);
        addHistory(pageE);
        pageNum.now = pageNum._now + 1
    }


    // [Mangabz 漫画] 初始化（调整本话图片）
    function mangabz_init() {
        if (getCSS('#showimage')) getCSS('#showimage').removeAttribute('oncontextmenu');
        if (getCSS('#cp_img')) getCSS('#cp_img').removeAttribute('oncontextmenu');
        if (getCSS('#barChapter')) getCSS('#barChapter').removeAttribute('oncontextmenu');
        if (getCSS('#cp_image')) {
            getCSS('#cp_image').removeAttribute('oncontextmenu');
            getCSS('#cp_image').removeAttribute('id');
            getCSS('#cp_image').removeAttribute('style');
        }
    }
    // [Mangabz 漫画] 获取下一页地址
    function mangabz_nextL() {
        var url = '';
        if (MANGABZ_PAGE === MANGABZ_IMAGE_COUNT) { // 下一话
            if (getNextE('//a[./img[contains(@src, "icon_xiayizhang")]]')) getPageE_(curSite.pageUrl); // 访问下一话 URL 获取
        } else { // 下一页
            if (!mkey) var mkey = '';
            url = location.origin + location.pathname + 'chapterimage.ashx' + `?cid=${MANGABZ_CID}&page=${MANGABZ_PAGE + 1}&key=${(mkey)}&_cid=${MANGABZ_CID}&_mid=${MANGABZ_MID}&_dt=${MANGABZ_VIEWSIGN_DT}&_sign=${MANGABZ_VIEWSIGN}`
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url
            //console.log(curSite.pageUrl)
            getPageE_(curSite.pageUrl, 'text', 'GET', '', 'Next'); // 访问下一页 URL 获取
        }
    }
    // [Mangabz 漫画] 插入数据
    function mangabz_insertE(pageE, type) {
        if (pageE) {
            if (type === 'Next') { // 下一页
                let imgArr = eval(pageE),
                    _img = '';
                for (let now of imgArr) {_img += `<img src="${now}">`;}
                if (_img) {
                    getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                    MANGABZ_PAGE += imgArr.length;
                    addHistory(pageE, document.title, location.origin + MANGABZ_CURL.substring(0, MANGABZ_CURL.length - 1) + '-p' + MANGABZ_PAGE + '/');
                }
            } else { // 下一话
                // 插入 <script> 标签
                insScript('html:not([dir]) > head > script:not([src])', pageE);
                addHistory(pageE);
                pageNum.now = pageNum._now + 1
                replaceElems(pageE)
                MANGABZ_PAGE = 0;
                mangabz_nextL();
            }
        }
    }


    // [动漫屋] 获取下一页地址
    function dm5_nextL() {
        var url = '';
        if (DM5_PAGE === DM5_IMAGE_COUNT) { // 下一话
            if (getNextE('//div[@class="view-paging"]//a[text()="下一章"]')) getPageE_(curSite.pageUrl); // 访问下一话 URL 获取
        } else { // 下一页
            if (!mkey) var mkey = '';
            url = location.origin + location.pathname + 'chapterfun.ashx' + `?cid=${DM5_CID}&page=${DM5_PAGE + 1}&key=${(mkey)}&language=1&gtk=6&_cid=${DM5_CID}&_mid=${DM5_MID}&_dt=${DM5_VIEWSIGN_DT}&_sign=${DM5_VIEWSIGN}`
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url
            //console.log(curSite.pageUrl)
            getPageE_(curSite.pageUrl, 'text', 'GET', '', 'Next'); // 访问下一页 URL 获取
        }
    }
    // [动漫屋] 插入数据
    function dm5_insertE(pageE, type) {
        if (pageE) {
            if (type === 'Next') { // 下一页
                let imgArr = eval(pageE),
                    _img = '';
                for (let now of imgArr) {_img += `<img src="${now}">`;}
                if (_img) {
                    getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                    DM5_PAGE += imgArr.length;
                    addHistory(pageE, document.title, location.origin + DM5_CURL.substring(0, DM5_CURL.length - 1) + '-p' + DM5_PAGE + '/');
                }
            } else { // 下一话
                // 插入 <script> 标签
                insScript('html:not([dir])>head>script:not([src])', pageE);
                addHistory(pageE);
                pageNum.now = pageNum._now + 1
                replaceElems(pageE)
                DM5_PAGE = 0;
                dm5_nextL();
            }
        }
    }


    // [Xmanhua 漫画] 获取下一页地址
    function xmanhua_nextL() {
        var url = '';
        if (XMANHUA_PAGE === XMANHUA_IMAGE_COUNT) { // 下一话
            if (getNextE('//a[./img[contains(@src, "reader-bottom-right-2.png")]]')) getPageE_(curSite.pageUrl); // 访问下一话 URL 获取
        } else { // 下一页
            if (!mkey) var mkey = '';
            url = location.origin + location.pathname + 'chapterimage.ashx' + `?cid=${XMANHUA_CID}&page=${XMANHUA_PAGE + 1}&key=${(mkey)}&_cid=${XMANHUA_CID}&_mid=${XMANHUA_MID}&_dt=${XMANHUA_VIEWSIGN_DT}&_sign=${XMANHUA_VIEWSIGN}`
            if (url === curSite.pageUrl) return
            curSite.pageUrl = url
            //console.log(curSite.pageUrl)
            getPageE_(curSite.pageUrl, 'text', 'GET', '', 'Next'); // 访问下一页 URL 获取
        }
    }
    // [Xmanhua 漫画] 插入数据
    function xmanhua_insertE(pageE, type) {
        if (pageE) {
            if (type === 'Next') { // 下一页
                let imgArr = eval(pageE),
                    _img = '';
                for (let now of imgArr) {_img += `<img src="${now}">`;}
                if (_img) {
                    getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), _img); // 将 img 标签插入到网页中
                    XMANHUA_PAGE += imgArr.length;
                    addHistory(pageE, document.title, location.origin + XMANHUA_CURL.substring(0, XMANHUA_CURL.length - 1) + '-p' + XMANHUA_PAGE + '/');
                }
            } else { // 下一话
                // 插入 <script> 标签
                insScript('html:not([dir]) > head > script:not([src])', pageE);
                addHistory(pageE);
                pageNum.now = pageNum._now + 1
                replaceElems(pageE)
                XMANHUA_PAGE = 0;
                xmanhua_nextL();
            }
        }
    }


    // [国家自然科学基金] 获取下一页地址
    function nsfc_nextL() {
        let id = decodeURIComponent(document.location.href.split('/')[document.location.href.split('/').length - 1]), data
        if (!document.nowPageNum) document.nowPageNum = 2
        data = `id=${id}&index=${document.nowPageNum}`
        if (data === curSite.pageUrl) return
        curSite.pageUrl = data
        getPageE_(location.origin + '/baseQuery/data/completeProjectReport', 'json', 'POST', data); // 访问下一页 URL 获取
    }
    // [国家自然科学基金] 插入数据
    function nsfc_insertE(pageE, type) {
        if (!pageE || pageE.code != 200) {curSite.SiteTypeID = 0; return}
        if (!pageE.data.hasnext) {curSite.SiteTypeID = 0} else {document.nowPageNum++}
        pageNum.now = pageNum._now + 1
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), `<img style="width: 100%;" data-magnify="gallery" data-src="${pageE.data.url}" src="${pageE.data.url}">`);
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
        getPageE_(location.origin + '/api/funds/nsfc/creport?' + data, 'json', 'GET'); // 访问下一页 URL 获取
    }
    // [酷科研] 插入数据
    function coolkeyan_insertE(pageE, type) {
        if (!pageE || pageE == {}) {curSite.SiteTypeID = 0; return}
        if (!pageE.url) {curSite.SiteTypeID = 0; return} else {document.nowPageNum++}
        pageNum.now = pageNum._now + 1
        getCSS('.q-img>div[style*="padding-bottom"]').style.paddingBottom = `${(document.nowPageNum * 1000) - 1000}px`
        getOne(curSite.pager.insertP[0]).insertAdjacentHTML(getAddTo(curSite.pager.insertP[1]), `<div class="q-img__image absolute-full" style="background-size: contain; background-position: 50% 50%; background-image: url('${pageE.url}'); top: ${(document.nowPageNum * 1000) - 2000}px"></div>`);
    }


    // --------------------------------------------------------


    // 自动无缝翻页
    function pageLoading() {
        if (curSite.SiteTypeID === 0 || !curSite.pager) return
        if (curSite.pager.type === undefined) curSite.pager.type = 1; // 默认翻页模式 1
        if (curSite.pager.scrollD === undefined) curSite.pager.scrollD = 2000; // 默认翻页触发线 2000
        if (curSite.pager.interval === undefined) curSite.pager.interval = 500; // 默认间隔时间 500ms
        //console.log(curSite)
        curSite.pageUrl = ''; // 下一页URL
        windowScroll(function (direction, e) {
            // 下滑 且 未暂停翻页 且 SiteTypeID > 0 时，才准备翻页
            if (direction != 'down' || !pausePage || curSite.SiteTypeID == 0) return

            // 翻页模式 5 且为框架内时，要判断顶层是否通过页码暂停翻页了
            if (curSite.pager.type == 5 && self != top && window.top.document.xiu_pausePage == false) return

            let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                scrollHeight = window.innerHeight || document.documentElement.clientHeight,
                scrollD = curSite.pager.scrollD;
            // <<<<< 翻页类型 3（依靠 [基准元素] 与 [浏览器可视区域底部] 之间的距离缩小来触发翻页）>>>>>
            if (curSite.pager.type === 3) {
                if (!curSite.pager.scrollE) curSite.pager.scrollE = curSite.pager.replaceE; // 默认基准元素是页码
                let scrollE = getOne(curSite.pager.scrollE);
                //console.log(scrollE.offsetTop, scrollE.offsetTop - (scrollTop + scrollHeight), scrollD, scrollTop + scrollHeight, curSite.SiteTypeID)
                if (scrollE.offsetTop - (scrollTop + scrollHeight) <= scrollD) {intervalPause(); checkURL(getPageE);}

            } else if (document.documentElement.scrollHeight <= scrollHeight + scrollTop + scrollD) {
                // <<<<< 翻页类型 1（由脚本实现自动无缝翻页）>>>>>
                if (curSite.pager.type === 1) {
                    intervalPause(); checkURL(getPageE);

                    // <<<<< 翻页类型 2（网站自带了自动无缝翻页功能，只需要点击下一页按钮即可）>>>>>
                } else if (curSite.pager.type === 2) {
                    let autopbn = getOne(curSite.pager.nextL);
                    if (!autopbn) return
                    if (curSite.pager.isHidden && isHidden(autopbn)) return // 如果 isHidden = true，那么需要判断元素是否隐藏
                    if (curSite.pager.nextText) {
                        //console.log(curSite.pager.nextText, autopbn.innerText, autopbn)
                        // 按钮文本，当按钮文本 = 该文本时，才会点击按钮加载下一页
                        if (autopbn.innerText === curSite.pager.nextText) {autopbn.click(); pageNum.now = pageNum._now + 1;}
                    } else if (curSite.pager.nextTextOf) {
                        // 按钮文本的一部分，当按钮文本包含该文本时，才会点击按钮加载下一页
                        if (autopbn.innerText.indexOf(curSite.pager.nextTextOf) > -1) {autopbn.click(); pageNum.now = pageNum._now + 1;}
                    } else if (curSite.pager.nextHTML) {
                        // 按钮内元素，当按钮内元素 = 该元素内容时，才会点击按钮加载下一页
                        if (autopbn.innerHTML === curSite.pager.nextHTML) {autopbn.click(); pageNum.now = pageNum._now + 1;}
                    } else {
                        intervalPause();
                        // 如果没有指定按钮文字就直接点击
                        autopbn.click(); pageNum.now = pageNum._now + 1;
                    }

                    // <<<<< 翻页类型 4（部分简单的动态加载类网站）>>>>>
                } else if (curSite.pager.type === 4) {
                    intervalPause(); if (typeof curSite.pager.nextL == 'function') {curSite.pager.nextL();} else if (getNextE(curSite.pager.nextL)) {getPageE_(curSite.pageUrl);}

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
    function getPageE(url) {
        GM_xmlhttpRequest({
            url: url,
            method: 'GET',
            overrideMimeType: 'text/html; charset=' + (document.characterSet||document.charset||document.inputEncoding),
            headers: {
                'Referer': (curSite.noReferer === true) ? '':location.href,
                'User-Agent': navigator.userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml'
            },
            timeout: 10000,
            onload: function (response) {
                try {
                    //console.log('URL：' + url, '最终 URL：' + response.finalUrl, '返回内容：' + response.responseText)
                    processElems(createDocumentByString(response.responseText));
                } catch (e) {
                    console.error('[自动无缝翻页] - 处理获取到的下一页内容时出现问题，请检查！', e, response.responseText);
                }
            },
            onerror: function (response) {
                console.log('URL：' + url, response)
                GM_notification({text: '❌ 获取下一页失败...', timeout: 5000});
            },
            ontimeout: function (response) {
                setTimeout(function(){curSite.pageUrl = '';}, 3000)
                console.log('URL：' + url, response)
                GM_notification({text: '❌ 获取下一页超时，可 3 秒后再次滚动网页重试（或尝试刷新网页）...', timeout: 5000});
            }
        });
    }
    // 翻页类型 4
    function getPageE_(url, type = '', method = 'GET', data = '', type2) {
        let mimeType,accept;
        switch (type) {
            case 'json':
                accept = 'application/json'; mimeType = 'application/json; charset=' + (document.characterSet||document.charset||document.inputEncoding); break;
            case 'text':
                accept = 'text/plain'; mimeType = 'text/plain; charset=' + (document.characterSet||document.charset||document.inputEncoding); break;
            default:
                accept = 'text/html,application/xhtml+xml,application/xml'; mimeType = 'text/html; charset=' + (document.characterSet||document.charset||document.inputEncoding);
        }

        GM_xmlhttpRequest({
            url: url,
            method: method,
            data: data,
            responseType: type,
            overrideMimeType: mimeType,
            headers: {
                'Referer': (curSite.noReferer === true) ? '':location.href,
                'Content-Type': (method === 'POST') ? 'application/x-www-form-urlencoded':'',
                'User-Agent': navigator.userAgent,
                'Accept': accept
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
            },
            onerror: function (response) {
                console.log('URL：' + url, response)
                GM_notification({text: '❌ 获取下一页失败...', timeout: 5000});
            },
            ontimeout: function (response) {
                setTimeout(function(){curSite.pageUrl = '';}, 3000)
                console.log('URL：' + url, response)
                GM_notification({text: '❌ 获取下一页超时，可 3 秒后再次滚动网页重试（或尝试刷新网页）...', timeout: 5000});
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
        iframe.id = 'Autopage_iframe';
        iframe.src = src.replace(/#.+$/,'');

        document.documentElement.appendChild(document.createElement('style')).textContent = 'iframe#Autopage_iframe {position: absolute !important; width: 100% !important; height: 100% !important; border: none !important;}';

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
            if (delta > 0 && scrollTop + clientHeight + 10 >= scrollHeight && !getCSS('#Autopage_iframe-scroll')) {
                let newStyle = document.createElement('style'); newStyle.id = 'Autopage_iframe-scroll';
                newStyle.textContent = 'html::-webkit-scrollbar, body::-webkit-scrollbar {width: 0 !important;height: 0 !important;} html, body {scrollbar-width: none !important;}';
                if (curSite.pager.style) newStyle.textContent += curSite.pager.style;
                document.documentElement.appendChild(newStyle);

                // 恢复 iframe 的滚动条
                if (iframe.contentWindow.document.querySelectorAll('#Autopage_iframe-scroll-hidden')) iframe.contentWindow.document.querySelectorAll('#Autopage_iframe-scroll-hidden').forEach((o)=>{o.remove();});

                // 给予 iframe 焦点
                iframe.focus();
                if (iframe.contentWindow.document.body) {iframe.contentWindow.document.body.focus(); iframe.contentWindow.document.body.click();}
            } else if (delta < 0 && scrollTop + clientHeight + 10 <= scrollHeight && getCSS('#Autopage_iframe-scroll')) {
                getCSS('#Autopage_iframe-scroll').remove();
                // 再次禁用 iframe 的滚动条
                if (!iframe.contentWindow.document.getElementById('Autopage_iframe-scroll-hidden')) {
                    let newStyle = document.createElement('style'); newStyle.id = 'Autopage_iframe-scroll-hidden';
                    newStyle.textContent = 'html, body {overflow: hidden !important;}';
                    iframe.contentWindow.document.documentElement.appendChild(newStyle);
                }
            }
        }, false);

        // 加载完成后才继续
        iframe.onload = function() {
            // 暂时禁用 iframe 的滚动条
            if (!getCSS('#Autopage_iframe-scroll') && !iframe.contentWindow.document.getElementById('Autopage_iframe-scroll-hidden')) {

                let newStyle = document.createElement('style'); newStyle.id = 'Autopage_iframe-scroll-hidden';
                newStyle.textContent = 'html, body {overflow: hidden !important;}';
                iframe.contentWindow.document.documentElement.appendChild(newStyle);
            }

            // 添加历史记录
            if (curSite.history === undefined) {
                if (GM_getValue('menu_history', true)) addHistory(iframe.contentWindow.document, iframe.contentWindow.document.title);
            } else {
                if (curSite.history) addHistory(iframe.contentWindow.document, iframe.contentWindow.document.title);
            }
            // 当前页码 + 1
            if (!curSite.hiddenPN) {
                let autopageNumber = getCSS('#Autopage_number', window.top.document)
                if (autopageNumber) {autopageNumber.textContent = parseInt(autopageNumber.textContent) + 1;}
            }
        }

        // 插入 iframe
        if (location.hostname == 'www.cocomanga.com') {
            document.body.appendChild(iframe);
        } else {
            document.documentElement.appendChild(iframe);
        }
    }
    // 翻页类型 6（通过 iframe 获取下一页动态加载内容，只有一个娃）
    function insIframe_(src) {
        // 暂停翻页
        if (!pausePage) return
        pausePage = false

        //console.log('000',src)
        // 如果不存在，则创建一个 iframe
        let iframe = document.getElementById('Autopage_iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            //iframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';
            iframe.id = 'Autopage_iframe';
            iframe.src = src.replace(/#.+$/,'');

            document.documentElement.appendChild(document.createElement('style')).textContent = 'iframe#Autopage_iframe {position: absolute !important; top: -9999px !important; left: -9999px !important; width: 100% !important; height: 100% !important; border: none !important; z-index: -999 !important;}';
        }

        // 加载完成后才继续
        iframe.onload = function() {
            if (!curSite.pager.loadTime) curSite.pager.loadTime = 300; // 默认 300ms
            let time1 = 0 ,time2 = setInterval(function(){
                let scrollHeight = (iframe.contentWindow.document.documentElement.scrollHeight || iframe.contentWindow.document.body.scrollHeight)/10
                iframe.contentWindow.scrollTo(0, 999999);
                iframe.contentWindow.scrollTo(0, scrollHeight*time1);
                if (++time1 == 10) {
                    clearInterval(time2);
                    processElems(iframe.contentWindow.document); // 插入/替换元素等
                    pausePage = true; //      恢复翻页
                }
            }, curSite.pager.loadTime/10)
            }

        // 插入 iframe（如果已存在则直接改 src）
        if (document.getElementById('Autopage_iframe')) {
            iframe.src = src.replace(/#.+$/,'');
        } else {
            document.documentElement.appendChild(iframe);
        }
    }


    // XHR 后处理结果，插入、替换元素等（适用于翻页类型 1/3/6）
    function processElems(response) {
        if (!curSite.pager.insertP) {curSite.pager.insertP = [curSite.pager.pageE, 5]}
        let pageE = getAll(curSite.pager.pageE, response, response), toE;
        if (curSite.pager.insertP[1] === 5) { // 插入 pageE 列表最后一个元素的后面
            toE = toE5pop(getAll(curSite.pager.insertP[0]));
        } else {
            toE = getOne(curSite.pager.insertP[0]);
        }
        //console.log(curSite.pager.pageE, pageE, curSite.pager.insertP, toE)

        if (pageE.length > 0 && toE) {
            // 如果有插入前函数就执行函数
            if (curSite.function && curSite.function.bF) {
                if (curSite.function.bFp) { // 如果指定了参数
                    if (typeof(curSite.function.bF) == 'string') { // 如果是字符串，说明是自定义规则
                        pageE = new Function('pageE', 'bFp', 'fun', curSite.function.bF)(pageE, curSite.function.bFp, window.autoPage)
                    } else {
                        pageE = curSite.function.bF(pageE, curSite.function.bFp);
                    }
                } else {
                    if (typeof(curSite.function.bF) == 'string') { // 如果是字符串，说明是自定义规则
                        pageE = new Function('pageE', 'fun', curSite.function.bF)(pageE, window.autoPage)
                    } else {
                        pageE = curSite.function.bF(pageE);
                    }
                }
            }

            // 强制新标签页打开链接
            if (curSite.blank === 4) {pageE = forceTarget(pageE);}

            // 插入位置
            let addTo = getAddTo(curSite.pager.insertP[1]);

            // 插入新页面元素
            if (curSite.pager.insertP[1] === 6) { // 插入到目标内部末尾（针对文本，比如小说网页）
                let afterend = '';
                if (curSite.pager.insertP6Br) afterend += '<br/><br/>'
                pageE.forEach(function (one) {afterend += one.innerHTML;});
                toE.insertAdjacentHTML(addTo, afterend);
            } else {
                if (curSite.pager.insertP[1] === 2 || curSite.pager.insertP[1] === 4 || curSite.pager.insertP[1] === 5) pageE.reverse(); // 插入到 [元素内头部]、[目标本身后面] 时，需要反转顺序
                pageE.forEach(function (one) {toE.insertAdjacentElement(addTo, one);});
            }

            // 当前页码 + 1
            pageNum.now = pageNum._now + 1

            // 添加历史记录
            if (curSite.history === undefined) {
                if (GM_getValue('menu_history', true)) addHistory(response);
            } else {
                if (curSite.history) addHistory(response);
            }

            // 替换待替换元素
            if (curSite.pager.replaceE) replaceElems(response);

            // 插入 <script> 标签
            if (curSite.pager.scriptT || curSite.pager.scriptT == 0) {
                switch (curSite.pager.scriptT) {
                    case 0: // 下一页的所有 <script> 标签
                        insScript('script', response); break;
                    case 1: // 下一页的所有 <script> 标签（不包括 src 链接）
                        insScript('script:not([src])', response); break;
                    case 2: // 下一页主体元素 (pageE) 的同级 <script> 标签
                        if (curSite.pager.insertP[1] === 2 || curSite.pager.insertP[1] === 4 || curSite.pager.insertP[1] === 5) pageE.reverse(); // 为了避免 JS 执行顺序反了，还需要再给反转回去
                        insScript(null, pageE); break;
                    case 3: // 下一页主体元素 (pageE) 的子元素 <script> 标签
                        if (curSite.pager.insertP[1] === 2 || curSite.pager.insertP[1] === 4 || curSite.pager.insertP[1] === 5) pageE.reverse(); // 为了避免 JS 执行顺序反了，还需要再给反转回去
                        insScript('script:not([src])', pageE); break;
                }
            }

            // 如果有插入后函数就执行函数
            if (curSite.function && curSite.function.aF) {
                if (curSite.function.aFp) { // 如果指定了参数
                    if (typeof(curSite.function.aF) == 'string') { // 如果是字符串，说明是自定义规则
                        new Function('aFp', 'fun', curSite.function.aF)(curSite.function.aFp, window.autoPage)
                    } else {
                        curSite.function.aF(curSite.function.aFp);
                    }
                } else {
                    if (typeof(curSite.function.aF) == 'string') { // 如果是字符串，说明是自定义规则
                        new Function('fun', curSite.function.aF)(window.autoPage);
                    } else {
                        curSite.function.aF();
                    }
                }
            }
        } else { // 获取主体元素失败后，尝试重新获取
            console.log(curSite.pager.pageE, pageE, curSite.pager.insertP, toE, response)
            if (curSite.retry) {
                console.warn('[自动无缝翻页] 获取主体元素失败，尝试重新获取...')
                setTimeout(function(){curSite.pageUrl = '';}, curSite.retry)
            } else {
                console.error('[自动无缝翻页] 获取主体元素失败...')
                // 尝试替换元素看能不能继续翻页下去
                /*if (curSite.pager.replaceE) {
                    if (replaceElems(response)) { // 如果替换成功
                        console.log('[自动无缝翻页] 获取主体元素失败，尝试替换元素成功！')
                        // 当前页码 + 1
                        pageNum.now = pageNum._now + 1;
                        // 添加历史记录
                        if (curSite.history === undefined) {
                            if (GM_getValue('menu_history', true)) addHistory(response);
                        } else {
                            if (curSite.history) addHistory(response);
                        }
                    } else {console.error('[自动无缝翻页] 获取主体元素失败，尝试替换元素失败...')}
                }*/
            }
        }
    }
    // 通用型插入前函数（加载图片）
    function src_bF(pageE, css = [0, 'img[data-original], img[data-src]', 'data-original']) {
        if (css[2] === undefined) css[2] = 'data-original'
        pageE.forEach(function (one) {
            if (css[0] == 0) { // src 图片
                if (one.tagName === 'IMG') {
                    if (one.getAttribute(css[2])){one.src = one.getAttribute(css[2]);}else if (one.dataset.src){one.src = one.dataset.src;}
                } else {
                    one.querySelectorAll(css[1]).forEach(function (now) {if (now.getAttribute(css[2])){now.src = now.getAttribute(css[2]);}else if (now.dataset.src){now.src = now.dataset.src;};});
                }
            } else if (css[0] == 1) { // 背景图片
                if (one.tagName === 'IMG') {
                    if (one.getAttribute(css[2])){one.style.backgroundImage = 'url("' + one.getAttribute(css[2]) + '")';}else if (one.dataset.src){one.style.backgroundImage = 'url("' + one.dataset.src + '")';}
                } else {
                    one.querySelectorAll(css[1]).forEach(function (now) {if (now.getAttribute(css[2])){now.style.backgroundImage = 'url("' + now.getAttribute(css[2]) + '")';}else if (now.dataset.src){now.style.backgroundImage = 'url("' + now.dataset.src + '")';};});
                }
            }
        });
        return pageE
    }
    // 文字型插入前函数（正则过滤）
    function xs_bF(pageE, reg) {
        pageE.forEach(function (one) {one.innerHTML = one.innerHTML.replace(reg[0], reg[1])});
        return pageE
    }

    // 通用型获取下一页地址（从 元素 中获取页码）
    function getNextE(css) {
        if (!css) css = curSite.pager.nextL;
        let next = getOne(css);
        if (next && next.nodeType === 1 && next.href && next.href.slice(0,4) === 'http' && next.getAttribute('href').slice(0,1) !== '#') {
            if (next.href != curSite.pageUrl) {
                if (curSite.pager.forceHTTPS && location.protocol === 'https:') {
                    if (next.href.replace(/^http:/,'https:') === curSite.pageUrl) {
                        return false
                    }
                    curSite.pageUrl = next.href.replace(/^http:/,'https:');
                } else {
                    curSite.pageUrl = next.href;
                }
            } else {
                return false
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
        //console.log('111', url)
        return url
    }
    // 通用型获取下一页地址（直接给定页码，URL 替换 page= 参数）
    function getNextSP(page, pf, reg) {
        let url = '';
        if (!page) return url
        if (typeof page === 'number') page = page.toString()
        if (location.search) {
            if (indexOF(pf, 's')) {
                url = location.search.replace(reg, pf + page);
            } else {
                url = location.search + '&' + pf + page;
            }
        } else {
            url = '?' + pf + page;
        }
        return (location.origin + location.pathname + url)
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
            url = location.origin + url + location.search;
        }
        return url
    }
    // 通用型获取下一页地址（从 URL 中获取页码，URL 替换 pathname 路径）
    function getNextUPN(urlReg, reg, a, b = '', initP = '2', endP) {
        let nextNum = urlReg.exec(location.pathname);
        if (nextNum) {
            nextNum = String(parseInt(nextNum[0])+1);
            if (endP && (parseInt(nextNum) > parseInt(endP))) return ''
        } else {
            nextNum = initP;
            if (endP && (parseInt(nextNum) >= parseInt(endP))) return ''
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
        url = location.origin + url + location.search;
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
        if (!curSite.pager.nextL) return
        if (typeof curSite.pager.nextL == 'function') {
            let tempUrl = curSite.pager.nextL();
            if (!tempUrl || tempUrl === curSite.pageUrl || tempUrl.slice(0,4) !== 'http') return
            curSite.pageUrl = tempUrl;
            func(curSite.pageUrl);
        } else if (curSite.pager.nextL.search(/^js;/i) === 0) { // 自定义翻页规则中执行 JavaScript 代码的
            try {
                let tempUrl = new Function('fun', curSite.pager.nextL.slice(3))(window.autoPage);
                if (!tempUrl || tempUrl === curSite.pageUrl || tempUrl.slice(0,4) !== 'http') return
                curSite.pageUrl = tempUrl;
                func(curSite.pageUrl);
            } catch (e) {
                console.error('[自动无缝翻页] - 当前网页规则 "nextL" 内 JS 代码有误，请检查！', e, curSite.pager.nextL);
            }
        } else if (getNextE()) {
            func(curSite.pageUrl);
        }
        //console.log(curSite.pageUrl);
    }
    // 替换元素
    function replaceElems(pageE, o = curSite.pager.replaceE, r = curSite.pager.replaceE) {
        let oE = getAll(o),
            rE = getAll(r, pageE, pageE);
        if (oE.length != 0 && rE.length != 0 && oE.length === rE.length) {
            for (let i = 0; i < oE.length; i++) {
                oE[i].outerHTML = rE[i].outerHTML;
            }
            return true
        } else {console.log(pageE,oE,rE)}
        return false
    }
    // 添加历史记录
    function addHistory(pageE, title, url) {
        if (!curSite.pageUrl) return
        // 对于自带类似功能 或者 覆盖了 history 原生函数的网站，则跳过不再添加历史记录
        if (window.top.history.toString() !== '[object History]') return
        title = title || ((pageE.querySelector('title')) ? pageE.querySelector('title').textContent : window.top.document.title);
        url = url || curSite.pageUrl;
        window.top.document.Autopage_nowUrl = curSite.pageUrl;
        // 对于下一页 URL 和当前网页 URL 的协议不同时，以当前网页 URL 协议为准
        if (url.indexOf(window.top.location.protocol) === -1) url = url.replace(/^https?:/,window.top.location.protocol)
        window.top.history.pushState('Autopage_history', title, url);
        window.top.document.title = title;
    }
    // 插入 <Script>
    function insScript(selector, contextNode = document, toE = document.body) {
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
                    toE.appendChild(document.createElement('script')).src = one.src;
                } else {
                    toE.appendChild(document.createElement('script')).textContent = one.textContent;//.replaceAll('document.write', '');
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
        } else console.error('没有找到要转成 DOM 的字符串', e);
    }


    // 强制新标签页打开链接
    function forceTarget(pageE) {
        if (curSite.blank === 1) {
            document.head.appendChild(document.createElement('base')).target = '_blank';

        } else if (curSite.blank === 4) {
            if (pageE) {
                pageE.forEach(function (dd) {getAllCSS('a[href]:not([target="_blank"]):not([onclick]):not([href^="#"]):not([href^="javascript:"])',dd).forEach(function (a) {a.target = '_blank';});});
                return pageE
            }

            let dd = toE5pop(getAll(curSite.pager.pageE));
            if (dd && dd.parentElement != null) dd = dd.parentElement
            getAllCSS('a[href]:not([target="_blank"]):not([onclick]):not([href^="#"]):not([href^="javascript:"])',dd).forEach(function (a) {a.target = '_blank';})

        } else {
            let d;
            if (curSite.blank === 2) {
                d = document.body
            } else if (curSite.blank === 3) {
                let dd = toE5pop(getAll(curSite.pager.pageE));
                if (dd && dd.parentElement != null) d = dd.parentElement
            }
            if (!d) return

            function forceTarget_(target, e){
                if (target.href && target.target != '_blank' && !(target.getAttribute('onclick')) && target.href.slice(0,4) == 'http' && target.getAttribute('href').slice(0,1) != '#') {
                    e.preventDefault(); // 阻止默认打开链接事件
                    window.GM_openInTab(target.href, {active: true,insert: true,setParent: true});
                }
            }
            d.addEventListener('click', function(e) {
                //console.log(e.target.tagName, e.path)
                if (e.target.tagName === 'A') {
                    forceTarget_(e.target, e);
                } else {
                    let path = e.path || e.composedPath();
                    for (let i = 1; i < path.length - 4; i++) {if (path[i].tagName === 'A') {forceTarget_(path[i], e); break;}}
                }
            });
        }
    }
    // 初始化事件
    /*function initEvent() {
        if (curSite.initE[1] == undefined) curSite.initE[1] = 500;
        setTimeout(function(){getAllCSS(curSite.initE[0]).forEach(function (o) {o.innerHTML = o.innerHTML;});}, curSite.initE[1])
    }*/
    // 判断元素是否隐藏（隐藏返回 true）
    function isHidden(el){
        return (el.offsetParent === null);
    }
    // 判断是否为手机版（是则返回 true）
    function isMobile(){
        return (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|MicroMessenger|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent) || (window.screen.width < 500 && window.screen.height < 800));
    }
    // 用以自定义规则中设置 urlC = true
    function isUrlC(){
        urlC = true;
    }
    // 判断 URL 是否存在指定文本
    function indexOF(e, l = 'p', low = true){
        switch (l) {
            case 'h':
                l = location.href; break;
            case 'p':
                l = location.pathname; break;
            case 's':
                l = location.search; break;
        }
        //console.log(l,e,l.indexOf(e))
        if (e instanceof RegExp) {
            if (e.test(l)) return true
        } else {
            if (low) {e = e.toLowerCase(); l = l.toLowerCase();} // 全部转为小写（即不区分大小写）
            if (l.indexOf(e) != -1) return true
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

        let customRules = JSON.stringify(GM_getValue('menu_customRules', {}), null, '\t');
        if (customRules == '{}') customRules = '{\n\t\n}'; // 引导用户插入规则的位置
        let _html = `<div id="Autopage_customRules" style="left: 0 !important; right: 0 !important; top: 0 !important; bottom: 0 !important; width: 100% !important; height: 100% !important; margin: auto !important; padding: 25px 10px 10px 10px !important; position: fixed !important; opacity: 0.95 !important; z-index: 99999 !important; background-color: #eee !important; color: #222 !important; font-size: 14px !important; overflow: scroll !important; text-align: left !important;">
<h3 style="font-size: 22px !important;overflow: hidden !important;text-overflow: ellipsis !important;white-space: nowrap !important;"><strong># 自定义翻页规则（优先级最高，会覆盖同名的外置翻页规则）-【将规则插入默认的 <code>{ }</code> 中间】</strong></h3>
<details><summary style="cursor: pointer;overflow: hidden !important;text-overflow: ellipsis !important;white-space: nowrap !important;"><kbd><strong>「 点击展开 查看规则示例 」（为了避免需要的时候还要找，我干脆把常用规则都一股脑塞进去了）</strong></kbd></summary>
<ul style="list-style: disc !important; margin-left: 35px !important;">
<li>翻页规则为 JSON 格式，因此大家需要多少<strong>了解一点 JSON 的基本格式</strong>（主要就是逗号、转义、双引号等）。</li>
<li>具体的翻页规则说明、示例，为了方便更新及补充，我都写到 <strong><a href="https://github.com/XIU2/UserScript/issues/176" target="_blank">Github</a></strong> 里面了。</li>
<li>脚本会自动格式化规则，因此<strong>无需手动缩进、换行</strong>，只需把规则<strong>插入默认的 { } 中间</strong>即可。</li>
</ul>
<pre style="white-space: pre-wrap !important;user-select: auto !important;">
// 下面示例是把所有规则都塞进去了，但实际上大都用不上，大多数网站只需要像第一个 "aaa" 这样的规则
// "aaa" 是规则名，唯一！不能重复！否则会被 外置/内置规则 覆盖，支持中文等各种字符
// "url" 是用来控制哪些网站中页面适用该规则，省略后代表该规则应用于全站
// "scrollD" 是用来控制翻页敏感度的（越大就越早触发翻页，访问速度慢的网站需要调大，可省略(注意逗号)，默认 2000）
{
    "aaa": {
        "host": "aaaa",
        "url": "xxxx",
        "pager": {
            "nextL": "xxxx",
            "pageE": "xxxx",
            "replaceE": "xxxx",
            "scrollD": 2000
        }
    },
    "bbb": {
        "host": ["bbb1.com", "bbb2.com"],
        "url": "/^\\/s$/",
        "style": ".aaaa {display: none !important;}",
        "blank": 3,
        "hiddenPN": true,
        "history": false,
        "thread": true,
        "iframe": true,
        "pager": {
            "type": 1,
            "nextL": "id('page')//a[contains(text(),'下一页')] || id('page2')//a[text()='下一页']",
            "pageE": "aaa",
            "insertP": [".bbb",3],
            "replaceE": ".page",
            "scriptT": 1,
            "forceHTTPS": true,
            "interval": 500,
            "scrollD": 2000
        },
        "function": {
            "bF": "return fun.src_bF(pageE, [0,'img[data-src]','data-src'])",
            "aF": "document.body.appendChild(document.createElement('script')).textContent = 'xxx'"
        }
    },
    "这里也可以用中文": {
        "host": "/\\.ccc\\.com/",
        "url": "fun.isUrlC(); return (fun.lp() == '/' || fun.indexOF('/s') || fun.isMobile())",
        "pager": {
            "type": 2,
            "nextL": "#autopbn",
            "nextText": "下一页",
            "nextTextOf": "下一页",
            "isHidden": true,
            "interval": 1000,
            "scrollD": 2000
        }
    }
}
</pre></details>
<details><summary style="cursor: pointer;overflow: hidden !important;text-overflow: ellipsis !important;white-space: nowrap !important;"><kbd><strong>「 点击展开 查看所有规则 」（可按 Ctrl+F 搜索规则，脚本内置的通用规则因格式限制无法列出）</strong></kbd></summary>
<pre id="Autopage_customRules_all" style="overflow-y: scroll !important; overflow-x: hidden !important; height: 500px !important; word-break: break-word !important; white-space: pre-wrap !important;user-select: auto !important;"> </pre></details>

<textarea id="Autopage_customRules_textarea" style="min-width:95% !important; min-height:70% !important; display: block !important; margin: 10px 0 10px 0; white-space:nowrap !important; overflow:scroll !important; resize: auto !important; text-transform: initial !important;" placeholder="留空等于默认的 {}，请把规则插入 {} 之间">${customRules}</textarea>
<button id="Autopage_customRules_save" style="margin-right: 20px !important;">保存并刷新</button><button id="Autopage_customRules_cancel">取消修改</button>
</div>`
        document.documentElement.insertAdjacentHTML('beforeend', _html); // 插入元素
        document.documentElement.style.overflow = document.body.style.overflow = 'hidden'; // 避免网页本身滚动
        getCSS('#Autopage_customRules_all').textContent = JSON.stringify(DBSite2, null, '\t'); // 单独插入全部规则列表，避免被 insertAdjacentHTML 语义化 HTML 标签
        //let b=Object.entries(DBSite2)
        //for (var i = 0; i < b.length; i++) {console.log(b[i][0], b[i][1].host);}
        // 点击事件
        getCSS('#Autopage_customRules_save').onclick = function () {
            customRules = getCSS('#Autopage_customRules_textarea').value;
            //console.log(customRules)
            if (!customRules) customRules = '{}'
            try {
                customRules = JSON.parse(customRules)
                //console.log(customRules)
                GM_setValue('menu_customRules', customRules)
                location.reload();
            } catch (e) {
                console.error('自定义规则存在格式错误：\n' + e + '\n\n格式错误一般为：\n· 逗号：每组 {} 中的最后一个值末尾不能加逗号\n\n· 转义：如果正则表达式中含有转义符 \\ 那就要对其再次转义为 \\\\\n\n· 双引号：规则中冒号左右的内容都需要加上双引号，如果内容中含有双引号则需要对双引号转义（即 \\" 这样），或改为单引号')
                window.alert('自定义规则存在格式错误：\n' + e + '\n\n格式错误一般为：\n· 逗号：每组 {} 中的最后一个值末尾不能加逗号\n\n· 转义：如果正则表达式中含有转义符 \\ 那就要对其再次转义为 \\\\\n\n· 双引号：规则中冒号左右的内容都需要加上双引号，如果内容中含有双引号则需要对双引号转义（即 \\" 这样），或改为单引号');
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
                _html = `<div id="Autopage_number" title="1. 此为【当前页码】（仅指脚本翻了多少页，并非实际页码，该页码可在脚本菜单中关闭）&#10;&#10;2. 鼠标【左键】点击此处可【临时暂停翻页】（再次点击可恢复）&#10;&#10;3. 鼠标【右键】点击此处可【回到顶部】">${pageNum._now}</div>`
            document.documentElement.insertAdjacentHTML('beforeend', _style + _html);
            // 解决 远景论坛 会清理掉前面插入的 CSS 样式的问题
            if (location.hostname === 'bbs.pcbeta.com') {setTimeout(function(){document.documentElement.insertAdjacentHTML('beforeend', _style);}, 500);}
            if (curSite.pager && curSite.pager.type == 5) window.top.document.xiu_pausePage = pausePage
            // 左键点击事件（临时暂停翻页）
            getCSS('#Autopage_number').onclick = function(e) {
                if (pausePage) {this.style = 'color: #FF5722 !important; font-style: italic !important;';} else {this.style = '';}
                pausePage = !pausePage;
                if (curSite.pager && curSite.pager.type == 5) window.top.document.xiu_pausePage = pausePage
                e.preventDefault();
                e.stopPropagation();
                return false
            };
            // 右键点击事件（回到顶部）
            getCSS('#Autopage_number').oncontextmenu = function(e) {
                window.scrollTo(0,0);
                e.preventDefault();
                e.stopPropagation();
                return false
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
    // 遍历 loadMoreExclude 数组，判断是否包含域名
    function loadMoreExclude(l) {
        for (let i=0; i<l.length; i++) {
            if (location.hostname.indexOf(l[i]) != -1) return false
        }
        return true
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
    // 插入位置 5 时，排除 <script> <style> <link> 标签
    function toE5pop(a) {
        if (a.length === 0) return
        let b = a.pop();
        if (b.tagName === 'SCRIPT' || b.tagName === 'STYLE' || b.tagName === 'LINK') {
            return toE5pop(a);
        }
        return b
    }
    // 滚动条事件
    function windowScroll(fn1) {
        var beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            fn = fn1 || function () {};
        setTimeout(function () { // 延时 1 秒执行，避免刚载入到页面就触发翻页事件

            // 避免网页内容太少，高度撑不起来，不显示滚动条而无法触发翻页事件
            let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                scrollHeight = window.innerHeight || document.documentElement.clientHeight
            if (scrollTop === 0 && document.documentElement.scrollHeight === scrollHeight) {
                insStyle(`html, body {min-height: ${document.documentElement.scrollHeight+10}px;}`)
            }

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