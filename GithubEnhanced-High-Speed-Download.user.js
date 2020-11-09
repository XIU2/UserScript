 // ==UserScript==
// @name         Github 增强 - 高速下载
// @version      1.2.3
// @author       X.I.U
// @description  高速下载 Clone、Release、Raw、Code(ZIP) 等文件、项目列表单文件快捷下载 (☁)
// @match        https://github.com/*/*
// @match        https://github.com/*/*/releases
// @match        https://github.com/*/*/releases/*
// @icon         https://github.githubassets.com/favicon.ico
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412245
// ==/UserScript==

(function() {
    var download_url = [
            'https://gh.con.sh',
            'https://gh.api.99988866.xyz',
            'https://download.fastgit.org',
            'https://pd.zwc365.com/seturl',
            'https://g.ioiox.com',
            'https://git.yumenaka.net'
        ],
        download_url_name = ['美国','美国','日本东京','中国香港','中国香港','美国洛杉矶'],
        clone_url = [
            'https://hub.fastgit.org',
            'https://gitclone.com',
            'https://github.com.cnpmjs.org'
        ],
        raw_url = [
            'https://raw.githubusercontent.com',
            'https://cdn.jsdelivr.net',
            'https://raw.fastgit.org'
        ],
        raw_url_name = ['Github 原生','中国国内','中国香港','美国洛杉矶'],
        raw_url_tip = [
            '',
            '注意：该加速源存在缓存机制（24小时），所以文件可能不是最新。&#10;注意：当前分支所有文件总文件大小超过 50MB 时，该加速源不可用。&#10;注意：当前分支名为版本号格式时（如 v1.2.3），该高速下载链接因格式限制不可用。&#10;&#10;',
            '注意：单个文件太大时可能会提示超时（实时获取中），请重试。&#10;&#10;',
            '注意：经过测试，该加速源存在文件格式限制，如果无法下载说明不支持该文件格式。&#10;&#10;'
        ],
        svg = [
            '<svg class="octicon octicon-file-zip mr-3" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.5 1.75a.25.25 0 01.25-.25h3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h2.086a.25.25 0 01.177.073l2.914 2.914a.25.25 0 01.073.177v8.586a.25.25 0 01-.25.25h-.5a.75.75 0 000 1.5h.5A1.75 1.75 0 0014 13.25V4.664c0-.464-.184-.909-.513-1.237L10.573.513A1.75 1.75 0 009.336 0H3.75A1.75 1.75 0 002 1.75v11.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217V1.75zM8.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm2 1.5A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zm-1.25.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-.75.75a1.75 1.75 0 00-1.75 1.75v3c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-3a1.75 1.75 0 00-1.75-1.75h-.5zM7 12.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.25H7v-2.25z"></path></svg>',
            '<svg class="octicon octicon-clippy" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>',
            '<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>'
        ],
        style = ['padding:0 6px;margin-right: -1px;border-radius: 2px;background-color: #ffffff;border-color: rgba(27, 31, 35, 0.1);font-size: 11px;color: #888888;'],

        menu_raw_fast = GM_getValue('xiu2_menu_raw_fast'),
        menu_menu_raw_fast_ID, menu_feedBack_ID;
    if (menu_raw_fast == null || menu_raw_fast == '中国国内'){menu_raw_fast = 1; GM_setValue('xiu2_menu_raw_fast', 1)}; // 调整上个版本的设置存储变量内容

    registerMenuCommand();
    // 注册脚本菜单
    function registerMenuCommand() {
        if (menu_feedBack_ID){ // 如果反馈菜单ID不是 null，则删除所有脚本菜单
            GM_unregisterMenuCommand(menu_menu_raw_fast_ID);
            GM_unregisterMenuCommand(menu_feedBack_ID);
            menu_raw_fast = GM_getValue('xiu2_menu_raw_fast');
        }
        menu_menu_raw_fast_ID = GM_registerMenuCommand(`[ ${raw_url_name[menu_raw_fast]} ] 加速源 (☁) - 点击切换`, menu_toggle_raw_fast);
        menu_feedBack_ID = GM_registerMenuCommand('反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});});
    }

    // 切换加速源
    function menu_toggle_raw_fast() {
        if (menu_raw_fast >= raw_url_name.length - 1){ // 如果当前加速源位置大于等于加速源总数，则改为第一个加速源，反之递增下一个加速源
            menu_raw_fast = 0;
        }else{
            menu_raw_fast += 1;
        }
        GM_setValue('xiu2_menu_raw_fast', menu_raw_fast);
        delDownLink(); // 删除旧加速源
        addDownLink(); // 添加新加速源
        GM_notification(`已切换加速源为：${raw_url_name[menu_raw_fast]}`); // 提示消息
        registerMenuCommand(); // 重新注册脚本菜单
    };

    addRelease(); // Release 加速
    addDownloadZIP(); // Source Code 加速
    addGitClone(); // Download ZIP/Code(ZIP) 加速
    addRawFile(); // Raw 加速
    setTimeout(addDownLink, 2000); // 添加 Raw 下载链接（☁），延迟 2 秒执行，避免被 pjax 刷掉

    document.addEventListener('pjax:success',function(){ // pjax 事件发生后
        addRelease(); // Release 加速
        addDownloadZIP(); // Source Code 加速
        addGitClone(); // Download ZIP/Code(ZIP) 加速
        addRawFile(); // 添加 Raw 加速按钮
        setTimeout(addDownLink, 2000); // 添加 Raw 下载链接（☁），延迟 2 秒执行，避免被 pjax 刷掉
    });


    // Release
    function addRelease(){
        $(".Box.Box--condensed").each(function () {
            $(this).find(".d-flex.Box-body>a").each(function () {
                var href = $(this).attr("href"),
                    url = [
                        download_url[0] + '/https://github.com' + href,
                        download_url[1] + '/https://github.com' + href,
                        download_url[2] + href,
                        download_url[3] + '/https://github.com' + href,
                        download_url[4] + '/https://github.com' + href,
                        download_url[5] + '/https://github.com' + href
                    ],
                    html = `<div style="display: flex;justify-content: flex-end;">
<div><a style="${style[0]}" class="btn" href="${url[0]}" rel="noreferrer noopener nofollow">${download_url_name[0]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[1]}" rel="noreferrer noopener nofollow">${download_url_name[1]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[2]}" rel="noreferrer noopener nofollow">${download_url_name[2]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[3]}" rel="noreferrer noopener nofollow">${download_url_name[3]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[4]}" rel="noreferrer noopener nofollow">${download_url_name[4]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[5]}" rel="noreferrer noopener nofollow">${download_url_name[5]}</a></div>
</div>`;
                $(this).next().after(html);
            });
            // 修改[文件大小]元素样式
            document.querySelectorAll('small.pl-2.text-gray.flex-shrink-0').forEach(el=>el.style.cssText='display: flex; justify-content: flex-end; flex-grow: 1; margin-right: 8px;');


            // Source Code
            $(this).find(".d-block.Box-body>a").each(function () {
                var href = $(this).attr("href"),
                    url = [
                        download_url[0] + '/https://github.com' + href,
                        download_url[1] + '/https://github.com' + href,
                        download_url[2] + href,
                        download_url[3] + '/https://github.com' + href,
                        download_url[4] + '/https://github.com' + href,
                        download_url[5] + '/https://github.com' + href
                    ],
                    html = `<div style="display: flex;justify-content: flex-end;flex-grow: 1;">
<div><a style="${style[0]}" class="btn" href="${url[0]}" rel="noreferrer noopener nofollow">${download_url_name[0]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[1]}" rel="noreferrer noopener nofollow">${download_url_name[1]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[2]}" rel="noreferrer noopener nofollow">${download_url_name[2]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[3]}" rel="noreferrer noopener nofollow">${download_url_name[3]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[4]}" rel="noreferrer noopener nofollow">${download_url_name[4]}</a></div>
<div><a style="${style[0]}" class="btn" href="${url[5]}" rel="noreferrer noopener nofollow">${download_url_name[5]}</a></div>
</div>`;
                $(this).after(html);
            });
        });
        // 修改 Source code 样式，使其和加速按钮并列一排
        document.querySelectorAll('div.d-block.py-1.py-md-2.Box-body.px-2').forEach(el=>el.className='d-flex py-1 py-md-2 Box-body px-2');
    }


    // Download ZIP
    function addDownloadZIP(){
        $(".dropdown-menu.dropdown-menu-sw.p-0 ul li:last-child").each(function () {
            var href = $(this).children("a").attr("href"),
                url = [
                    download_url[0] + "/https://github.com" + href,
                    download_url[1] + "/https://github.com" + href,
                    download_url[2] + href,
                    download_url[3] + "/https://github.com" + href,
                    download_url[4] + "/https://github.com" + href,
                    download_url[5] + '/https://github.com' + href
                ],
                html = `
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="noreferrer noopener nofollow" href="${url[0]}">${svg[0]}Download ZIP ${download_url_name[0]}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="noreferrer noopener nofollow" href="${url[1]}">${svg[0]}Download ZIP ${download_url_name[1]}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="noreferrer noopener nofollow" href="${url[2]}">${svg[0]}Download ZIP ${download_url_name[2]}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="noreferrer noopener nofollow" href="${url[3]}">${svg[0]}Download ZIP ${download_url_name[3]}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="noreferrer noopener nofollow" href="${url[4]}">${svg[0]}Download ZIP ${download_url_name[4]}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="noreferrer noopener nofollow" href="${url[5]}">${svg[0]}Download ZIP ${download_url_name[5]}</a></li>
`;
            $(this).after(html);
        });
    }


    // Git Clone
    function addGitClone(){
        $("[role='tabpanel'] div.input-group").first().each(function () {
            var href_split = location.href.split("/"),
                url = [
                    clone_url[0] + "/" + href_split[3] + "/" + href_split[4] + ".git",
                    clone_url[1] + "/github.com/" + href_split[3] + "/" + href_split[4] + ".git",
                    clone_url[2] + "/" + href_split[3] + "/" + href_split[4] + ".git"
                ],
                html = `
<div class="input-group" style="margin-top: 4px;"><input value="${url[0]}" aria-label="${url[0]}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url[0]}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${svg[1]}</clipboard-copy></div></div>
<div class="input-group" style="margin-top: 4px;"><input value="${url[1]}" aria-label="${url[1]}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url[1]}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${svg[1]}</clipboard-copy></div></div>
<div class="input-group" style="margin-top: 4px;"><input value="${url[2]}" aria-label="${url[2]}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url[2]}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${svg[1]}</clipboard-copy></div></div>
`;
            $(this).after(html);
        });
    }


    // Raw
    function addRawFile(){
        $("#raw-url").each(function () {
            var href = location.href.replace('https://github.com',''),
                href2 = href.replace('/blob/','/'),
                url = [
                    raw_url[1] + "/gh" + href.replace('/blob/','@'),
                    raw_url[2] + href2,
                    download_url[5] + "/" + raw_url[0] + href2
                ],
                html = `
<a href="${url[0]}" title="${raw_url_tip[1]}" role="button" rel="noreferrer noopener nofollow" class="btn btn-sm BtnGroup-item">${raw_url_name[1]}</a>
<a href="${url[1]}" title="${raw_url_tip[2]}" role="button" rel="noreferrer noopener nofollow" class="btn btn-sm BtnGroup-item">${raw_url_name[2]}</a>
<a href="${url[2]}" title="${raw_url_tip[3]}" role="button" rel="noreferrer noopener nofollow" class="btn btn-sm BtnGroup-item">${raw_url_name[3]}</a>
`;
            $(this).after(html);
        });
    }


    // 添加 Raw 下载链接（☁）
    function addDownLink(){
        // 如果不是项目文件页面，就返回
        var files = $('.octicon.octicon-file');
        if(files.length === 0) return;
        var files1 = $('.fileDownLink');
        if(files1.length > 0) return;

        // 鼠标指向则显示
        var mouseOverHandler = function(evt){
            var elem = evt.currentTarget,
                aElm_new = elem.querySelectorAll('.fileDownLink'),
                aElm_now = elem.querySelectorAll('svg.octicon.octicon-file.text-gray-light');
            aElm_new.forEach(el=>el.style.cssText = 'display: inline');
            aElm_now.forEach(el=>el.style.cssText = 'display: none');
        };

        // 鼠标离开则隐藏
        var mouseOutHandler = function(evt){
            var elem = evt.currentTarget,
                aElm_new = elem.querySelectorAll('.fileDownLink'),
                aElm_now = elem.querySelectorAll('svg.octicon.octicon-file.text-gray-light');
            aElm_new.forEach(el=>el.style.cssText = 'display: none');
            aElm_now.forEach(el=>el.style.cssText = 'display: inline');
        };

        // 循环添加
        files.each(function(i,fileElm){
            var trElm = fileElm.parentNode.parentNode,
                cntElm_a = trElm.querySelector('.css-truncate.css-truncate-target.d-block.width-fit a'),
                cntElm_svg = trElm.querySelector('.mr-3.flex-shrink-0 svg.octicon.octicon-file.text-gray-light'),
                Name = cntElm_a.innerText,
                href = cntElm_a.attributes['href'].nodeValue.replace('https://github.com','');
            var href2 = href.replace('/blob/','/'), url, url_name, url_tip = '';
            switch(menu_raw_fast)
            {
                case 0:
                    url = raw_url[0] + href2;
                    url_name = raw_url_name[0];
                    url_tip = raw_url_tip[0];
                    break;
                case 1:
                    url = raw_url[1] + '/gh' + href.replace('/blob/','@');
                    url_name = raw_url_name[1];
                    url_tip = raw_url_tip[1];
                    break;
                case 2:
                    url = raw_url[2] + href2;
                    url_name = raw_url_name[2];
                    url_tip = raw_url_tip[2];
                    break;
                case 3:
                    url = download_url[5] + '/' + raw_url[0] + href2;
                    url_name = download_url_name[5];
                    url_tip = raw_url_tip[3];
                    break;
            }
            var html = ` <a href="${url}" download="${Name}" target="_blank" rel="noreferrer noopener nofollow" class="fileDownLink" style="display: none;" title="「${url_name}」&#10;&#10;[Alt + 左键] 或 [右键 - 另存为...] 下载文件。&#10;注意：鼠标点击 [☁] 图标，而不是左侧的文件名！&#10;&#10;${url_tip}提示：点击浏览器右上角 Tampermonkey 扩展图标 - [ ${raw_url_name[menu_raw_fast]} ] 加速源 (☁) 即可切换。">${svg[2]}</a>`;
            $(cntElm_svg).after(html);
            // 绑定鼠标事件
            trElm.onmouseover=mouseOverHandler;
            trElm.onmouseout=mouseOutHandler;
        });
    }


    // 删除 Raw 快捷下载（☁）
    function delDownLink(){
        var aElm = document.querySelectorAll('.fileDownLink');
        for(var num = 0;num<aElm.length;num++){
            aElm[num].remove();
        };
    }
})();