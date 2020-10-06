// ==UserScript==
// @name         Github 增强 - 高速下载
// @version      1.0.9
// @author       X.I.U
// @description  为 Github 的 Clone、Release、Raw、Code(ZIP) 添加高速下载
// @match        https://github.com/*/*
// @match        https://github.com/*/*/releases
// @match        https://github.com/*/*/releases/*
// @icon         https://github.githubassets.com/favicon.ico
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412245
// ==/UserScript==

(function() {
    var download_url1 = "https://download.fastgit.org";
    var download_url1_name = "日本东京";
    var download_url2 = "https://gh.con.sh";
    var download_url2_name = "美国 01";
    var download_url3 = "https://gh.api.99988866.xyz";
    var download_url3_name = "美国 02";
    var download_url4 = "https://g.ioiox.com";
    var download_url4_name = "中国香港";
    var download_url5 = "https://git.yumenaka.net";
    var download_url5_name = "美国洛杉矶";

    var clone_url1 = "https://hub.fastgit.org"; // 中国香港
    var clone_url2 = "https://gitclone.com"; // 中国浙江杭州
    var clone_url3 = "https://github.com.cnpmjs.org"; // 新加坡

    var raw_fast = true; // true 下载链接为高速下载链接，false 下载链接为 Github 原生下载链接
    var raw_url1 = "https://cdn.jsdelivr.net"; // 中国国内CDN

    var download_zip_svg = `<svg class="octicon octicon-file-zip mr-3" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.5 1.75a.25.25 0 01.25-.25h3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h2.086a.25.25 0 01.177.073l2.914 2.914a.25.25 0 01.073.177v8.586a.25.25 0 01-.25.25h-.5a.75.75 0 000 1.5h.5A1.75 1.75 0 0014 13.25V4.664c0-.464-.184-.909-.513-1.237L10.573.513A1.75 1.75 0 009.336 0H3.75A1.75 1.75 0 002 1.75v11.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217V1.75zM8.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm2 1.5A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zm-1.25.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-.75.75a1.75 1.75 0 00-1.75 1.75v3c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-3a1.75 1.75 0 00-1.75-1.75h-.5zM7 12.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.25H7v-2.25z"></path></svg>`;
    var download_clone_svg = `<svg class="octicon octicon-clippy" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>`
    var download_release_style = `padding:0 4px;margin-right: -1px;border-radius: 2px;background-color: #ffffff;border-color: rgba(27, 31, 35, 0.1);font-size: 12px;`

    addRelease(); // Release 加速
    addDownloadZIP(); // Source Code 加速
    addGitClone(); // Download ZIP/Code(ZIP) 加速
    addRawFile(); // Raw 加速
    addDownLink(); // 添加 Raw 下载链接（添加到项目页文件名称后面）

    $(document).on('pjax:success',function(evt){
        addRawFile(); // pjax 事件发生后，添加 Raw 加速按钮 及 Raw 下载链接
        addDownLink();
    });


    // Release 加速
    function addRelease(){
        $(".Box.Box--condensed").each(function () {
            $(this).find(".d-flex.Box-body>a").each(function () {
                var href = $(this).attr("href");
                var url1 = download_url1 + href;
                var url2 = download_url2 + '/github.com' + href;
                var url3 = download_url3 + '/github.com' + href;
                var url4 = download_url4 + '/github.com' + href;
                var url5 = download_url5 + '/github.com' + href;
                var html1 = `<div style="display: flex;justify-content: flex-end;flex-grow: 1;">
<div><span style="font-size: 12px;color: #586069;line-height: 23px;">高速下载：</span></div>
<div><a style="${download_release_style}" class="btn" href="${url1}" rel="nofollow">${download_url1_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url2}" rel="nofollow">${download_url2_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url3}" rel="nofollow">${download_url3_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url4}" rel="nofollow">${download_url4_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url5}" rel="nofollow">${download_url5_name}</a></div>
</div>`;
                $(this).after(html1);
            });
            // Source Code 加速
            $(this).find(".d-block.Box-body>a").each(function () {
                var href = $(this).attr("href");
                var url1 = download_url1 + href;
                var url2 = download_url2 + '/github.com' + href;
                var url3 = download_url3 + '/github.com' + href;
                var url4 = download_url4 + '/github.com' + href;
                var url5 = download_url5 + '/github.com' + href;
                var html1 = `<div style="display: flex;justify-content: flex-end;flex-grow: 1;">
<div><span style="font-size: 12px;color: #586069;line-height: 23px;">高速下载：</span></div>
<div><a style="${download_release_style}" class="btn" href="${url1}" rel="nofollow">${download_url1_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url2}" rel="nofollow">${download_url2_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url3}" rel="nofollow">${download_url3_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url4}" rel="nofollow">${download_url4_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url5}" rel="nofollow">${download_url5_name}</a></div>
</div>`;
                $(this).after(html1);
            });
            // 修改 Source code 样式，使其和加速按钮并列一排
            document.querySelectorAll('.d-block.py-1.py-md-2.Box-body.px-2').forEach(el=>el.className='d-flex py-1 py-md-2 Box-body px-2');
        });
    }


    // Download ZIP 加速
    function addDownloadZIP(){
        $(".dropdown-menu.dropdown-menu-sw.p-0 ul li:last-child").each(function () {
            var href = $(this).children("a").attr("href");
            var url1 = download_url1 + href;
            var url2 = download_url2 + "/github.com" + href;
            var url3 = download_url3 + "/github.com" + href;
            var url4 = download_url4 + "/github.com" + href;
            var url5 = download_url5 + "/github.com" + href;
            var html1 = `
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url1}">${download_zip_svg}Download ZIP ${download_url1_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url2}">${download_zip_svg}Download ZIP ${download_url2_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url3}">${download_zip_svg}Download ZIP ${download_url3_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url4}">${download_zip_svg}Download ZIP ${download_url4_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url5}">${download_zip_svg}Download ZIP ${download_url5_name}</a></li>
`;
            $(this).after(html1);
        });
    }


    // Git Clone 加速
    function addGitClone(){
        $("[role='tabpanel'] div.input-group").first().each(function () {
            var href_split = location.href.split("/");
            var url1 = clone_url1 + "/" + href_split[3] + "/" + href_split[4] + ".git";
            var url2 = clone_url2 + "/github.com/" + href_split[3] + "/" + href_split[4] + ".git";
            var url3 = clone_url3 + "/" + href_split[3] + "/" + href_split[4] + ".git";
            var html1 = `
<div class="input-group" style="margin-top: 4px;"><input value="${url1}" aria-label="${url1}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url1}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${download_clone_svg}</clipboard-copy></div></div>
<div class="input-group" style="margin-top: 4px;"><input value="${url2}" aria-label="${url2}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url2}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${download_clone_svg}</clipboard-copy></div></div>
<div class="input-group" style="margin-top: 4px;"><input value="${url3}" aria-label="${url3}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url3}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${download_clone_svg}</clipboard-copy></div></div>
`;
            $(this).after(html1);
        });
    }


    // Raw 加速
    function addRawFile(){
        $("#raw-url").each(function () {
            var href = location.href.replace('https://github.com','').replace('/blob/','@');
            var url1 = raw_url1 + "/gh" + href;
            var html1 = `<a href="${url1}" role="button" class="btn btn-sm BtnGroup-item">高速下载</a>`;
            $(this).after(html1);
        });
    }


    // 添加 Raw 下载链接（添加到项目页文件名称后面）
    function addDownLink(){
        // 如果不是项目文件页面，就返回
        var $files = $('.octicon.octicon-file');
        if($files.length === 0) return;

        // 鼠标指向则显示
        var mouseOverHandler = function(evt){
        var elem = evt.currentTarget,
            aElm = elem.querySelector('.fileDownLink');
        aElm.style.visibility = 'visible';
        };

        // 鼠标离开则隐藏
        var mouseOutHandler = function(evt){
            var elem = evt.currentTarget,
                aElm = elem.querySelector('.fileDownLink');
            aElm.style.visibility = 'hidden';
        };

        // 循环添加
        $files.each(function(i,fileElm){
            var trElm = fileElm.parentNode.parentNode,
                cntElm = trElm.querySelector('.css-truncate.css-truncate-target.d-block.width-fit a'),
                href = cntElm.attributes["href"].nodeValue.replace('https://github.com','');
            // 如果 raw_fast 为 true 则下载链接为高速下载链接，反之为 Github 原生下载链接
            if (raw_fast){
                href = raw_url1 + "/gh" + href.replace('/blob/','@');
            }else{
                href = "https://raw.githubusercontent.com" + href.replace('/blob/','/');
            }
            var html1 = ` <a href="${href}" class="fileDownLink js-navigation-open link-gray-dark" style="cursor: pointer; visibility: hidden;" download title="高速下载链接时（默认）&#10;文本、图片等文件浏览器会直接显示，需要 右键该链接 - [链接另存为...] 才会下载。&#10;&#10;原生下载链接时&#10;所有文件浏览器都会直接显示，请 右键该链接 - [链接另存为...] 下载。&#10;&#10;修改脚本头部的 raw_fast 变量可以切换为 Github 原生 Raw 下载链接。">下载</a>`;
            $(cntElm).after(html1);
            // 绑定鼠标事件
            trElm.onmouseover=mouseOverHandler;
            trElm.onmouseout=mouseOutHandler;
        });
    }
})();