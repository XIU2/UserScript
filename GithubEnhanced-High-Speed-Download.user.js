// ==UserScript==
// @name         Github 增强 - 高速下载
// @name:zh-CN   Github 增强 - 高速下载
// @name:zh-TW   Github 增強 - 高速下載
// @name:en      Github Enhancement - High Speed Download
// @version      2.4.4
// @author       X.I.U
// @description  高速下载 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件、项目列表单文件快捷下载 (☁)、添加 git clone 命令
// @description:zh-CN  高速下载 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件、项目列表单文件快捷下载 (☁)
// @description:zh-TW  高速下載 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件、項目列表單文件快捷下載 (☁)
// @description:en  High-speed download of Git Clone/SSH, Release, Raw, Code(ZIP) and other files, project list file quick download (☁)
// @match        *://github.com/*
// @match        *://kgithub.com/*
// @match        *://hub.fgit.gq/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUxpcRgWFhsYGBgWFhcWFh8WFhoYGBgWFiUlJRcVFRkWFhgVFRgWFhgVFRsWFhgWFigeHhkWFv////////////r6+h4eHv///xcVFfLx8SMhIUNCQpSTk/r6+jY0NCknJ97e3ru7u+fn51BOTsPCwqGgoISDg6empmpoaK2srNDQ0FhXV3eXcCcAAAAXdFJOUwCBIZXMGP70BuRH2Ze/LpIMUunHkpQR34sfygAAAVpJREFUOMt1U+magjAMDAVb5BDU3W25b9T1/d9vaYpQKDs/rF9nSNJkArDA9ezQZ8wPbc8FE6eAiQUsOO1o19JolFibKCdHGHC0IJezOMD5snx/yE+KOYYr42fPSufSZyazqDoseTPw4lGJNOu6LBXVUPBG3lqYAOv/5ZwnNUfUifzBt8gkgfgINmjxOpgqUA147QWNaocLniqq3QsSVbQHNp45N/BAwoYQz9oUJEiE4GMGfoBSMj5gjeWRIMMqleD/CAzUHFqTLyjOA5zjNnwa4UCEZ2YK3khEcBXHjVBtEFeIZ6+NxYbPqWp1DLKV42t6Ujn2ydyiPi9nX0TTNAkVVZ/gozsl6FbrktkwaVvL2TRK0C8Ca7Hck7f5OBT6FFbLATkL2ugV0tm0RLM9fedDvhWstl8Wp9AFDjFX7yOY/lJrv8AkYuz7fuP8dv9izCYH+x3/LBnj9fYPBTpJDNzX+7cAAAAASUVORK5CYII=
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        window.onurlchange
// @sandbox      JavaScript
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412245
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(function() {
    'use strict';
    var backColor = '#ffffff', fontColor = '#888888', menu_rawFast = GM_getValue('xiu2_menu_raw_fast'), menu_rawFast_ID, menu_rawDownLink_ID, menu_gitClone_ID, menu_feedBack_ID;
    const download_url_us = [
        ['https://gh.h233.eu.org/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@X.I.U/XIU2] 提供'],
        //['https://gh.api.99988866.xyz/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [hunshcn/gh-proxy] 提供'], // 官方演示站用的人太多了
        ['https://gh.ddlc.top/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@mtr-static-official] 提供'],
        //['https://gh2.yanqishui.work/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [@HongjieCN] 提供'], // Error 1101
        ['https://ghdl.feizhuqwq.cf/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [feizhuqwq.com] 提供'],
        //['https://gh-proxy-misakano7545.koyeb.app/https://github.com', '美国', '[美国 Cloudflare CDN]'], // 404
        //['https://gh.flyinbug.top/gh/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [Mintimate] 提供'], // 域名无解析
        //['https://github.91chi.fun/https://github.com', '美国', '[美国 Cloudflare CDN]'], // 连接超时
        ['https://slink.ltd/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [知了小站] 提供'],
        ['https://git.xfj0.cn/https://github.com', '美国', '[美国 Cloudflare CDN]'],
        ['https://gh.con.sh/https://github.com', '美国', '[美国 Cloudflare CDN]'],
        ['https://ghps.cc/https://github.com', '美国', '[美国 Cloudflare CDN]'],
        ['https://cors.isteed.cc/github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [Lufs\'s] 提供'],
        ['https://hub.gitmirror.com/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [GitMirror] 提供'],
        //['https://js.xxooo.ml/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [饭太硬] 提供'],
        //['https://proxy.freecdn.ml/?url=https://github.com', '美国', '[美国 Cloudflare CDN]'],
        //['https://cdn.githubjs.cf', '美国', '[美国 Cloudflare CDN]'], // 域名无解析
        ['https://download.njuu.cf', '美国', '[美国 拉斯维加斯] - 该公益加速源由 [LibraryCloud] 提供'],
        ['https://download.yzuu.cf', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [LibraryCloud] 提供'],
        ['https://download.nuaa.cf', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [LibraryCloud] 提供']
    ], download_url = [ // fastgit 的 Release 挂了，但 Download ZIP 依然可以
        ['https://download.fastgit.org', '德国', '[德国] - 该公益加速源由 [FastGit] 提供&#10;&#10;提示：如果速度可以接受，希望大家尽量多使用前面的美国节点（每次随机 4 个来负载均衡），&#10;避免流量都集中到亚洲公益节点，减少成本压力才能运营更持久~', 'https://archive.fastgit.org'],
        ['https://ghproxy.com/https://github.com', '韩国', '[日本、韩国、德国等]（CDN 不固定） - 该公益加速源由 [ghproxy] 提供&#10;&#10;提示：如果速度可以接受，希望大家尽量多使用前面的美国节点（每次随机 4 个来负载均衡），&#10;避免流量都集中到亚洲公益节点，减少成本压力才能运营更持久~'],
        ['https://kgithub.com', '新加坡', '[新加坡] - 该公益加速源由 [KGitHub] 提供&#10;&#10;提示：如果速度可以接受，希望大家尽量多使用前面的美国节点（每次随机 4 个来负载均衡），&#10;避免流量都集中到亚洲公益节点，减少成本压力才能运营更持久~']
    ], clone_url = [
        ['https://gitclone.com', '国内', '[中国 国内] - 该公益加速源由 [GitClone] 提供&#10;&#10; - 缓存：有&#10; - 首次比较慢，缓存后较快'],
        ['https://hub.fgit.cf', '香港', '[中国 香港] - 该公益加速源由 [FastGit 群组成员] 提供'],
        ['https://hub.fgit.gq', '越南', '[越南] - 该公益加速源由 [FastGit 群组成员] 提供'],
        ['https://kgithub.com', '新加坡', '[新加坡] - 该公益加速源由 [KGitHub] 提供&#10;&#10; - 缓存：无（或时间很短）'],
        ['https://github.moeyy.xyz/https://github.com', '新加坡', '[新加坡、香港、日本等]（CDN 不固定） - 该公益加速源由 [Moeyy] 提供&#10;&#10; - 缓存：无（或时间很短）'],
        ['https://ghproxy.com/https://github.com', '韩国', '[日本、韩国、德国等]（CDN 不固定） - 该公益加速源由 [ghproxy] 提供&#10;&#10; - 缓存：无（或时间很短）']
        //['https://slink.ltd/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [知了小站] 提供'] // 暂无必要
        //['https://hub.gitmirror.com/https://github.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [GitMirror] 提供'], // 暂无必要
        //['https://hub.njuu.cf', '美国', '[美国 拉斯维加斯] - 该公益加速源由 [LibraryCloud] 提供'], // 挂了
        //['https://hub.yzuu.cf', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [LibraryCloud] 提供'], // 暂无必要
        //['https://hub.nuaa.cf', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [LibraryCloud] 提供'] // 暂无必要
        //['https://hub.0z.gs', '美国', '[美国 Cloudflare CDN]'], // 域名无解析
        //['https://hub.shutcm.cf', '美国', '[美国 Cloudflare CDN]'] // 连接超时
    ], clone_ssh_url = [
        ['ssh://git@ssh.github.com:443/', 'Github 原生', '[日本、新加坡等] - Github 官方提供的 443 端口的 SSH（依然是 SSH 协议），适用于限制访问 22 端口的网络环境'],
        ['git@ssh.fastgit.org:', '香港', '[中国 香港] - 该公益加速源由 [FastGit] 提供']
        //['git@git.zhlh6.cn:', '美国', '[美国 洛杉矶]'] // 挂了
    ], raw_url = [
        ['https://raw.githubusercontent.com', 'Github 原生', '[日本 东京]'],
        ['https://raw.iqiq.io', '香港', '[中国 香港] - 该公益加速源由 [iQDNS/iQZone] 提供&#10;&#10; - 缓存：无（或时间很短）'],
        //['https://raw.fgit.cf', '香港', '[中国 香港] - 该公益加速源由 [FastGit 群组成员] 提供&#10;&#10; - 缓存：无（或时间很短）'], // 暂无必要
        //['https://raw.fgit.gq', '越南', '[越南] - 该公益加速源由 [FastGit 群组成员] 提供&#10;&#10; - 缓存：无（或时间很短）'], // 暂无必要
        ['https://raw.kgithub.com', '新加坡', '[新加坡] - 该公益加速源由 [KGitHub] 提供&#10;&#10; - 缓存：无（或时间很短）'],
        ['https://ghproxy.com/https://raw.githubusercontent.com', '韩国', '[日本、韩国、德国等]（CDN 不固定） - 该公益加速源由 [ghproxy] 提供&#10;&#10; - 缓存：无（或时间很短）'],
        ['https://fastly.jsdelivr.net/gh', '日本 1', '[日本 东京] - 该公益加速源由 [JSDelivr CDN] 提供&#10;&#10; - 缓存：有&#10; - 不支持大小超过 50 MB 的文件&#10; - 不支持版本号格式的分支名（如 v1.2.3）'],
        ['https://cdn.staticaly.com/gh', '日本 2', '[日本 东京] - 该公益加速源由 [Statically CDN] 提供&#10;&#10; - 缓存：有&#10; - 不支持大小超过 30 MB 的文件'],
        ['https://ghproxy.net/https://raw.githubusercontent.com', '日本 3', '[日本 大阪]&#10;&#10; - 缓存：无（或时间很短）'],
        //['https://raw.fastgit.org', '德国', '[德国] - 该公益加速源由 [FastGit] 提供&#10;&#10; - 缓存：无（或时间很短）'], // 暂无必要
        //['https://raw.njuu.cf', '美国', '[美国 拉斯维加斯] - 该公益加速源由 [LibraryCloud] 提供&#10;&#10; - 缓存：无（或时间很短）'], // 暂无必要
        //['https://raw.gitmirror.com', '美国', '[美国 Cloudflare CDN] - 该公益加速源由 [GitMirror] 提供&#10;&#10; - 缓存：有'], // 暂无必要
        //['https://git.yumenaka.net/https://raw.githubusercontent.com', '美国', '[美国 圣何塞]&#10;&#10; - 缓存：无（或时间很短）'], // 连接超时
        ['https://gcore.jsdelivr.net/gh', '其他 1', '[移动走香港、电信走日本] - 该公益加速源由 [JSDelivr CDN] 提供&#10;&#10; - 缓存：有&#10; - 不支持大小超过 50 MB 的文件&#10; - 不支持版本号格式的分支名（如 v1.2.3）'],
        //['https://cdn.jsdelivr.ren/gh', '其他 1', '[新加坡、香港、日本等]（CDN 不固定） - 该公益加速源由 [ayao] 提供&#10;&#10; - 缓存：有'], // 域名无解析
        ['https://jsdelivr.b-cdn.net/gh', '其他 2', '[香港、台湾、日本、新加坡等]（CDN 不固定） - 该公益加速源由 [rttwyjz] 提供&#10;&#10; - 缓存：有'], // 500
        ['https://github.moeyy.xyz/https://raw.githubusercontent.com', '其他 2', '[新加坡、香港、日本等]（CDN 不固定）&#10;&#10; - 缓存：无（或时间很短）']
    ], svg = [
        '<svg class="octicon octicon-file-zip mr-2" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M3.5 1.75a.25.25 0 01.25-.25h3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h2.086a.25.25 0 01.177.073l2.914 2.914a.25.25 0 01.073.177v8.586a.25.25 0 01-.25.25h-.5a.75.75 0 000 1.5h.5A1.75 1.75 0 0014 13.25V4.664c0-.464-.184-.909-.513-1.237L10.573.513A1.75 1.75 0 009.336 0H3.75A1.75 1.75 0 002 1.75v11.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217V1.75zM8.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm2 1.5A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zm-1.25.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-.75.75a1.75 1.75 0 00-1.75 1.75v3c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-3a1.75 1.75 0 00-1.75-1.75h-.5zM7 12.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.25H7v-2.25z"></path></svg>',
        '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon d-inline-block"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check js-clipboard-check-icon color-fg-success d-inline-block d-sm-none"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>',
        '<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>'
    ], style = ['padding:0 6px; margin-right: -1px; border-radius: 2px; background-color: var(--XIU2-back-Color); border-color: rgba(27, 31, 35, 0.1); font-size: 11px; color: var(--XIU2-font-Color);'];

    if (menu_rawFast == null){menu_rawFast = 1; GM_setValue('xiu2_menu_raw_fast', 1)};
    if (GM_getValue('menu_rawDownLink') == null){GM_setValue('menu_rawDownLink', true)};
    if (GM_getValue('menu_gitClone') == null){GM_setValue('menu_gitClone', true)};
    registerMenuCommand();
    // 注册脚本菜单
    function registerMenuCommand() {
        // 如果反馈菜单ID不是 null，则删除所有脚本菜单
        if (menu_feedBack_ID) {GM_unregisterMenuCommand(menu_rawFast_ID); GM_unregisterMenuCommand(menu_rawDownLink_ID); GM_unregisterMenuCommand(menu_gitClone_ID); GM_unregisterMenuCommand(menu_feedBack_ID); menu_rawFast = GM_getValue('xiu2_menu_raw_fast');}
        // 避免在减少 raw 数组后，用户储存的数据大于数组而报错
        if (menu_rawFast > raw_url.length - 1) menu_rawFast = 0
        if (GM_getValue('menu_rawDownLink')) menu_rawFast_ID = GM_registerMenuCommand(`${['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'][menu_rawFast]} [ ${raw_url[menu_rawFast][1]} ] 加速源 (☁) - 点击切换`, menu_toggle_raw_fast);
        menu_rawDownLink_ID = GM_registerMenuCommand(`${GM_getValue('menu_rawDownLink')?'✅':'❌'} 项目列表单文件快捷下载 (☁)`, function(){if (GM_getValue('menu_rawDownLink') == true) {GM_setValue('menu_rawDownLink', false); GM_notification({text: `已关闭 [项目列表单文件快捷下载 (☁)] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});} else {GM_setValue('menu_rawDownLink', true); GM_notification({text: `已开启 [项目列表单文件快捷下载 (☁)] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});}registerMenuCommand();});
        menu_gitClone_ID = GM_registerMenuCommand(`${GM_getValue('menu_gitClone')?'✅':'❌'} 添加 git clone 命令`, function(){if (GM_getValue('menu_gitClone') == true) {GM_setValue('menu_gitClone', false); GM_notification({text: `已关闭 [添加 git clone 命令] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});} else {GM_setValue('menu_gitClone', true); GM_notification({text: `已开启 [添加 git clone 命令] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});}registerMenuCommand();});
        menu_feedBack_ID = GM_registerMenuCommand('💬 反馈 & 建议 [Github]', function () {window.GM_openInTab('https://github.com/XIU2/UserScript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412245/feedback', {active: true,insert: true,setParent: true});});
    }

    // 切换加速源
    function menu_toggle_raw_fast() {
        // 如果当前加速源位置大于等于加速源总数，则改为第一个加速源，反之递增下一个加速源
        if (menu_rawFast >= raw_url.length - 1) {menu_rawFast = 0;} else {menu_rawFast += 1;}
        GM_setValue('xiu2_menu_raw_fast', menu_rawFast);
        delRawDownLink(); // 删除旧加速源
        addRawDownLink(); // 添加新加速源
        GM_notification({text: "已切换加速源为：" + raw_url[menu_rawFast][1], timeout: 3000}); // 提示消息
        registerMenuCommand(); // 重新注册脚本菜单
    };

    colorMode(); // 适配白天/夜间主题模式
    //if (location.pathname.indexOf('/releases')) addRelease(); // Release 加速
    setTimeout(addDownloadZIP, 2000); // Download ZIP 加速
    setTimeout(addGitClone, 2000); //    Git Clone 加速
    setTimeout(addGitCloneSSH, 2000); // Git Clone SSH 加速
    if (GM_info.scriptHandler === 'Tampermonkey') {addRawFile();} else {setTimeout(addRawFile, 1000);} // Raw 加速
    setTimeout(addRawDownLink, 2000); // Raw 单文件快捷下载（☁），延迟 2 秒执行，避免被 pjax 刷掉

    // Tampermonkey v4.11 版本添加的 onurlchange 事件 grant，可以监控 pjax 等网页的 URL 变化
    if (window.onurlchange === undefined) addUrlChangeEvent();
    window.addEventListener('urlchange', function() {
        colorMode(); // 适配白天/夜间主题模式
        if (location.pathname.indexOf('/releases')) addRelease(); // Release 加速
        setTimeout(addDownloadZIP, 2000); // Download ZIP 加速
        setTimeout(addGitClone, 2000); //    Git Clone 加速
        setTimeout(addGitCloneSSH, 2000); // Git Clone SSH 加速
        if (GM_info.scriptHandler === 'Tampermonkey') {addRawFile();} else {setTimeout(addRawFile, 1000);} // Raw 加速
        setTimeout(addRawDownLink, 2000); // Raw 单文件快捷下载（☁），延迟 2 秒执行，避免被 pjax 刷掉
        setTimeout(addRawDownLink_, 1000); // 在浏览器返回/前进时重新添加 Raw 下载链接（☁）鼠标事件
    });


    // Github Release 改版为动态加载文件列表，因此需要监控网页元素变化
    const callback = (mutationsList, observer) => {
        if (location.pathname.indexOf('/releases') === -1) return
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType !== 1) return
                if (target.tagName === 'DIV' && target.dataset.viewComponent === 'true' && target.classList[0] === 'Box') addRelease();
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document, { childList: true, subtree: true });


    // download_url 随机 4 个美国加速源
    function get_New_download_url() {
        //return download_url_us.concat(download_url) // 全输出调试用
        let shuffled = download_url_us.slice(0), i = download_url_us.length, min = i - 4, temp, index;
        while (i-- > min) {index = Math.floor((i + 1) * Math.random()); temp = shuffled[index]; shuffled[index] = shuffled[i]; shuffled[i] = temp;}
        return shuffled.slice(min).concat(download_url); // 随机洗牌 download_url_us 数组并取前 4 个，然后将其合并至 download_url 数组
    }

    // Release
    function addRelease() {
        let html = document.querySelectorAll('.Box-footer'); if (html.length == 0 || location.pathname.indexOf('/releases') == -1) return
        let divDisplay = 'margin-left: -90px;', new_download_url = get_New_download_url();
        if (document.documentElement.clientWidth > 755) {divDisplay = 'margin-top: -3px;margin-left: 8px;display: inherit;';}; // 调整小屏幕时的样式
        for (const current of html) {
            if (current.querySelector('.XIU2-RS')) continue
            current.querySelectorAll('li.Box-row a').forEach(function (_this) {
                let href = _this.href.split(location.host),
                    url = '', _html = `<div class="XIU2-RS" style="${divDisplay}">`;

                for (let i=0;i<new_download_url.length;i++) {
                    if (new_download_url[i][0] == 'https://download.fastgit.org') continue // fastgit 的 Release 挂了，但 Download ZIP 依然可以
                    if (new_download_url[i][3] !== undefined && url.indexOf('/archive/') !== -1) {
                        url = new_download_url[i][3] + href[1]
                    } else {
                        url = new_download_url[i][0] + href[1]
                    }
                    if (location.host !== 'github.com') url = url.replace(location.host,'github.com')
                    _html += `<a style="${style[0]}" class="btn" href="${url}" title="${new_download_url[i][2]}" rel="noreferrer noopener nofollow">${new_download_url[i][1]}</a>`
                }
                _this.parentElement.nextElementSibling.insertAdjacentHTML('beforeend', _html + '</div>');
            });
        }
    }


    // Download ZIP
    function addDownloadZIP() {
        if (document.querySelector('.XIU2-DZ')) return
        let html = document.querySelector('#local-panel ul li:last-child');if (!html) return
        let href = html.firstElementChild.href,
            url = '', _html = '', new_download_url = get_New_download_url();
        for (let i=0;i<new_download_url.length;i++) {
            if (new_download_url[i][3] === '') continue

            if (new_download_url[i][3] !== undefined) {
                url = new_download_url[i][3] + href.split(location.host)[1]
            } else {
                url = new_download_url[i][0] + href.split(location.host)[1]
            }
            if (location.host !== 'github.com') url = url.replace(location.host,'github.com')
            _html += `<li class="Box-row Box-row--hover-gray p-3 mt-0 XIU2-DZ"><a class="d-flex flex-items-center color-fg-default text-bold no-underline" rel="noreferrer noopener nofollow" href="${url}" title="${new_download_url[i][2]}">${svg[0]}Download ZIP ${new_download_url[i][1]}</a></li>`
        }
        html.insertAdjacentHTML('afterend', _html);
    }


    // Git Clone
    function addGitClone() {
        if (document.querySelector('.XIU2-GC')) return
        let html = document.querySelector('[role="tabpanel"]:nth-child(2) div.input-group');if (!html) return
        let href_split = html.firstElementChild.value.split(location.host),
            url = '', _html = '', _gitClone = '';

        if (GM_getValue('menu_gitClone')) {_gitClone='git clone '; html.firstElementChild.value = html.querySelector('clipboard-copy').value = _gitClone + html.firstElementChild.value;}
        for (let i=0;i<clone_url.length;i++) {
            if (clone_url[i][0] === 'https://gitclone.com') {
                url = clone_url[i][0] + '/github.com' + href_split[1]
            } else {
                url = clone_url[i][0] + href_split[1]
            }
            _html += `<div class="input-group XIU2-GC" style="margin-top: 4px;" title="加速源：${clone_url[i][1]} （点击可直接复制）"><input value="${_gitClone}${url}" aria-label="${url}" title="${clone_url[i][2]}" type="text" class="form-control input-monospace input-sm color-bg-subtle" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${_gitClone}${url}" aria-label="Copy to clipboard" class="btn btn-sm js-clipboard-copy tooltipped-no-delay ClipboardButton" tabindex="0" role="button">${svg[1]}</clipboard-copy></div></div>`
        }
        html.insertAdjacentHTML('afterend', _html);
    }


    // Git Clone SSH
    function addGitCloneSSH() {
        if (document.querySelector('.XIU2-GCS')) return
        let html = document.querySelector('[role="tabpanel"]:nth-child(3) div.input-group');if (!html) return
        let href_split = html.firstElementChild.value.split(':'),
            _html = '', _gitClone = '';

        if (href_split[0] != 'git@github.com') return

        if (GM_getValue('menu_gitClone')) {_gitClone='git clone '; html.firstElementChild.value = html.querySelector('clipboard-copy').value = _gitClone + html.firstElementChild.value;}
        for (let i=0;i<clone_ssh_url.length;i++) {
            _html += `<div class="input-group XIU2-GCS" style="margin-top: 4px;" title="加速源：${clone_ssh_url[i][1]} （点击可直接复制）"><input value="${_gitClone}${clone_ssh_url[i][0] + href_split[1]}" aria-label="${clone_ssh_url[i][0] + href_split[1]}" title="${clone_ssh_url[i][2]}" type="text" class="form-control input-monospace input-sm color-bg-subtle" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${_gitClone}${clone_ssh_url[i][0] + href_split[1]}" aria-label="Copy to clipboard" class="btn btn-sm js-clipboard-copy tooltipped-no-delay ClipboardButton" tabindex="0" role="button">${svg[1]}</clipboard-copy></div></div>`
        }
        html.insertAdjacentHTML('afterend', _html);
    }


    // Raw
    function addRawFile() {
        if (document.querySelector('.XIU2-RF')) document.querySelectorAll('.XIU2-RF').forEach((e)=>{e.remove()})
        let html = document.querySelector('#raw-url, a[data-testid="raw-button"]');if (!html) return
        let href = location.href.replace(`https://${location.host}`,''),
            href2 = href.replace('/blob/','/'),
            url = '', _html = '';

        for (let i=1;i<raw_url.length;i++) {
            if ((raw_url[i][0].indexOf('/gh') + 3 === raw_url[i][0].length) && raw_url[i][0].indexOf('cdn.staticaly.com') === -1) {
                url = raw_url[i][0] + href.replace('/blob/','@');
            } else {
                url = raw_url[i][0] + href2;
            }
            _html += `<a href="${url}" title="${raw_url[i][2]}" target="_blank" role="button" rel="noreferrer noopener nofollow" data-size="small" class="${html.className} XIU2-RF">${raw_url[i][1].replace(/ \d/,'')}</a>`
        }
        html.insertAdjacentHTML('afterend', _html);
    }


    // Raw 单文件快捷下载（☁）
    function addRawDownLink() {
        if (!GM_getValue('menu_rawDownLink')) return
        // 如果不是项目文件页面，就返回，如果网页有 Raw 下载链接（☁）就返回
        let files = document.querySelectorAll('div.Box-row svg.octicon.octicon-file, .react-directory-filename-column>svg.color-fg-muted');if(files.length === 0) return;if (location.pathname.indexOf('/tags') > -1) return
        let files1 = document.querySelectorAll('a.fileDownLink');if(files1.length > 0) return;

        // 鼠标指向则显示
        var mouseOverHandler = function(evt) {
            let elem = evt.currentTarget,
                aElm_new = elem.querySelectorAll('.fileDownLink'),
                aElm_now = elem.querySelectorAll('svg.octicon.octicon-file, svg.color-fg-muted');
            aElm_new.forEach(el=>{el.style.cssText = 'display: inline'});
            aElm_now.forEach(el=>{el.style.cssText = 'display: none'});
        };

        // 鼠标离开则隐藏
        var mouseOutHandler = function(evt) {
            let elem = evt.currentTarget,
                aElm_new = elem.querySelectorAll('.fileDownLink'),
                aElm_now = elem.querySelectorAll('svg.octicon.octicon-file, svg.color-fg-muted');
            aElm_new.forEach(el=>{el.style.cssText = 'display: none'});
            aElm_now.forEach(el=>{el.style.cssText = 'display: inline'});
        };

        // 循环添加
        files.forEach(function(fileElm) {
            let trElm = fileElm.parentNode.parentNode,
                cntElm_a = trElm.querySelector('[role="rowheader"] > .css-truncate.css-truncate-target.d-block.width-fit > a, .react-directory-truncate>a'),
                Name = cntElm_a.innerText,
                href = cntElm_a.getAttribute('href'),
                href2 = href.replace('/blob/','/'), url, url_name, url_tip = '';
            if ((raw_url[menu_rawFast][0].indexOf('/gh') + 3 === raw_url[menu_rawFast][0].length) && raw_url[menu_rawFast][0].indexOf('cdn.staticaly.com') === -1) {
                url = raw_url[menu_rawFast][0] + href.replace('/blob/','@');
            } else {
                url = raw_url[menu_rawFast][0] + href2;
            }

            url_name = raw_url[menu_rawFast][1]; url_tip = raw_url[menu_rawFast][2];
            fileElm.insertAdjacentHTML('afterend', `<a href="${url}" download="${Name}" target="_blank" rel="noreferrer noopener nofollow" class="fileDownLink" style="display: none;" title="「${url_name}」&#10;&#10;[Alt + 左键] 或 [右键 - 另存为...] 下载文件。&#10;注意：鼠标点击 [☁] 图标，而不是左侧的文件名！&#10;&#10;${url_tip}提示：点击浏览器右上角 Tampermonkey 扩展图标 - [ ${raw_url[menu_rawFast][1]} ] 加速源 (☁) 即可切换。">${svg[2]}</a>`);
            // 绑定鼠标事件
            trElm.onmouseover = mouseOverHandler;
            trElm.onmouseout = mouseOutHandler;
        });
    }


    // 移除 Raw 单文件快捷下载（☁）
    function delRawDownLink() {
        if (!GM_getValue('menu_rawDownLink')) return
        let aElm = document.querySelectorAll('.fileDownLink');if(aElm.length === 0) return;
        aElm.forEach(function(fileElm) {fileElm.remove();})
    }


    // 在浏览器返回/前进时重新添加 Raw 单文件快捷下载（☁）鼠标事件
    function addRawDownLink_() {
        if (!GM_getValue('menu_rawDownLink')) return
        // 如果不是项目文件页面，就返回，如果网页没有 Raw 下载链接（☁）就返回
        let files = document.querySelectorAll('div.Box-row svg.octicon.octicon-file, .react-directory-filename-column>svg.color-fg-muted');if(files.length === 0) return;
        let files1 = document.querySelectorAll('a.fileDownLink');if(files1.length === 0) return;

        // 鼠标指向则显示
        var mouseOverHandler = function(evt) {
            let elem = evt.currentTarget,
                aElm_new = elem.querySelectorAll('.fileDownLink'),
                aElm_now = elem.querySelectorAll('svg.octicon.octicon-file, svg.color-fg-muted');
            aElm_new.forEach(el=>{el.style.cssText = 'display: inline'});
            aElm_now.forEach(el=>{el.style.cssText = 'display: none'});
        };

        // 鼠标离开则隐藏
        var mouseOutHandler = function(evt) {
            let elem = evt.currentTarget,
                aElm_new = elem.querySelectorAll('.fileDownLink'),
                aElm_now = elem.querySelectorAll('svg.octicon.octicon-file, svg.color-fg-muted');
            aElm_new.forEach(el=>{el.style.cssText = 'display: none'});
            aElm_now.forEach(el=>{el.style.cssText = 'display: inline'});
        };
        // 循环添加
        files.forEach(function(fileElm) {
            let trElm = fileElm.parentNode.parentNode;
            // 绑定鼠标事件
            trElm.onmouseover = mouseOverHandler;
            trElm.onmouseout = mouseOutHandler;
        });
    }


    // 适配白天/夜间主题模式
    function colorMode() {
        let style_Add;
        if (document.getElementById('XIU2-Github')) {style_Add = document.getElementById('XIU2-Github')} else {style_Add = document.createElement('style'); style_Add.id = 'XIU2-Github'; style_Add.type = 'text/css';}
        backColor = '#ffffff'; fontColor = '#888888';

        if (document.lastElementChild.dataset.colorMode === 'dark') { // 如果是夜间模式
            if (document.lastElementChild.dataset.darkTheme === 'dark_dimmed') {
                backColor = '#272e37'; fontColor = '#768390';
            } else {
                backColor = '#161a21'; fontColor = '#97a0aa';
            }
        } else if (document.lastElementChild.dataset.colorMode === 'auto') { // 如果是自动模式
            if (window.matchMedia('(prefers-color-scheme: dark)').matches || document.lastElementChild.dataset.lightTheme.indexOf('dark') > -1) { // 如果浏览器是夜间模式 或 白天模式是 dark 的情况
                if (document.lastElementChild.dataset.darkTheme === 'dark_dimmed') {
                    backColor = '#272e37'; fontColor = '#768390';
                } else if (document.lastElementChild.dataset.darkTheme.indexOf('light') == -1) { // 排除夜间模式是 light 的情况
                    backColor = '#161a21'; fontColor = '#97a0aa';
                }
            }
        }

        document.lastElementChild.appendChild(style_Add).textContent = `.XIU2-RS a {--XIU2-back-Color: ${backColor}; --XIU2-font-Color: ${fontColor};}`;
    }


    // 自定义 urlchange 事件（用来监听 URL 变化），针对非 Tampermonkey 油猴管理器
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

        window.addEventListener('popstate',()=>{ // 点击浏览器的前进/后退按钮时触发 urlchange 事件
            window.dispatchEvent(new Event('urlchange'))
        });
    }
})();
