// ==UserScript==
// @name         Github 增强 - 高速下载
// @version      1.0.3
// @author       X.I.U
// @description  为 Github 的 Releases、Code(ZIP) 添加高速下载
// @match        *://github.com/*
// @icon         https://github.githubassets.com/favicon.ico
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412245
// ==/UserScript==

(function() {
    var source_code = false; // Source code 加速，false=关闭，true=开启
    var download_url1 = "https://download.fastgit.org"; // 日本东京服务器
    var download_url1_name = "日本东京";
    var download_url2 = "https://github.wuyanzheshui.workers.dev"; // Cloudflare CDN 美国服务器
    var download_url2_name = "美国 01";
    var download_url3 = "https://gh.api.99988866.xyz"; // Cloudflare CDN 美国服务器
    var download_url3_name = "美国 02";
    var download_url4 = "https://g.ioiox.com"; // 腾讯 中国香港服务器
    var download_url4_name = "中国香港";
    var download_url5 = "https://git.yumenaka.net"; // 搬瓦工 美国洛杉矶服务器
    var download_url5_name = "美国洛杉矶";
    var download_zip_svg = `<svg class="octicon octicon-file-zip mr-3" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.5 1.75a.25.25 0 01.25-.25h3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h2.086a.25.25 0 01.177.073l2.914 2.914a.25.25 0 01.073.177v8.586a.25.25 0 01-.25.25h-.5a.75.75 0 000 1.5h.5A1.75 1.75 0 0014 13.25V4.664c0-.464-.184-.909-.513-1.237L10.573.513A1.75 1.75 0 009.336 0H3.75A1.75 1.75 0 002 1.75v11.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217V1.75zM8.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm2 1.5A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zm-1.25.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-.75.75a1.75 1.75 0 00-1.75 1.75v3c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-3a1.75 1.75 0 00-1.75-1.75h-.5zM7 12.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.25H7v-2.25z"></path></svg>`;
    var download_releases_style = `padding:0 4px;margin-right: -1px;border-radius: 2px;background-color: #ffffff;border-color: rgba(27, 31, 35, 0.1);font-size: 12px;`
    // Releases 加速
    $(".Box.Box--condensed").each(function () {
        $(this).find(".d-flex.Box-body>a").each(function () {
            var href = $(this).attr("href");
            var url1 = download_url1 + href;
            var url2 = download_url2 + href;
            var url3 = download_url3 + '/github.com' + href;
            var url4 = download_url4 + '/github.com' + href;
            var url5 = download_url5 + '/github.com' + href;
            var div1 = `<div style="display: flex;justify-content: flex-end;flex-grow: 1;">
<div><span style="font-size: 12px;color: #586069;line-height: 23px;">高速下载：</span></div>
<div><a style="${download_releases_style}" class="btn" href="${url1}" rel="nofollow">${download_url1_name}</a></div>
<div><a style="${download_releases_style}" class="btn" href="${url2}" rel="nofollow">${download_url2_name}</a></div>
<div><a style="${download_releases_style}" class="btn" href="${url3}" rel="nofollow">${download_url3_name}</a></div>
<div><a style="${download_releases_style}" class="btn" href="${url4}" rel="nofollow">${download_url4_name}</a></div>
<div><a style="${download_releases_style}" class="btn" href="${url5}" rel="nofollow">${download_url5_name}</a></div>
</div>`

            $(this).after(div1);
        });
        // Source code 加速，默认关闭
        if (source_code){
            $(this).find(".d-block.Box-body>a").each(function () {
                var href = $(this).attr("href");
                var url1 = download_url1 + href;
                var url2 = download_url2 + href;
                var url3 = download_url3 + '/github.com' + href;
                var url4 = download_url4 + '/github.com' + href;
                var url5 = download_url5 + '/github.com' + href;
                var div1 = `<div style="display: flex;">
<div><a style="${download_releases_style}" class="btn user-btn-link" href="${url1}" rel="nofollow">${download_url1_name}</a></div>
<div><a style="${download_releases_style}" class="btn user-btn-link" href="${url2}" rel="nofollow">${download_url2_name}</a></div>
<div><a style="${download_releases_style}" class="btn user-btn-link" href="${url3}" rel="nofollow">${download_url3_name}</a></div>
<div><a style="${download_releases_style}" class="btn user-btn-link" href="${url4}" rel="nofollow">${download_url4_name}</a></div>
<div><a style="${download_releases_style}" class="btn user-btn-link" href="${url5}" rel="nofollow">${download_url5_name}</a></div>
</div>`
                $(this).after(div1);
            });
        }
    });
    // Download ZIP 加速
    $(".dropdown-menu.dropdown-menu-sw.p-0 ul li:last-child").each(function () {
        var href_split = location.href.split("/");
        var url1 = download_url1 +"/"+href_split[3]+"/"+href_split[4]+ "/archive/master.zip";
        var url2 = download_url2 +"/"+href_split[3]+"/"+href_split[4]+ "/archive/master.zip";
        var url3 = download_url3 +"/github.com/"+href_split[3]+"/"+href_split[4]+ "/archive/master.zip";
        var url4 = download_url4 +"/github.com/"+href_split[3]+"/"+href_split[4]+ "/archive/master.zip";
        var url5 = download_url5 +"/github.com/"+href_split[3]+"/"+href_split[4]+ "/archive/master.zip";
        var span1 = `<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url1}">${download_zip_svg}Download ZIP ${download_url1_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url2}">${download_zip_svg}Download ZIP ${download_url2_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url3}">${download_zip_svg}Download ZIP ${download_url3_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url4}">${download_zip_svg}Download ZIP ${download_url4_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url5}">${download_zip_svg}Download ZIP ${download_url5_name}</a></li>
`;
        $(this).after(span1);
    });
})();
