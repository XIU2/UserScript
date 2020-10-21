// ==UserScript==
// @name         知乎增强 - 区分问题和文章
// @version      1.0.0
// @author       X.I.U
// @description  首页和搜索页列表中的标题开头添加问题、文章提示
// @match        *://www.zhihu.com/
// @match        *://www.zhihu.com/search*
// @icon         https://static.zhihu.com/static/favicon.ico
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/414027
// ==/UserScript==

(function() {
    var postNum;

    setInterval(addTips, 1000);

    function addTips() {
        // URL 匹配正则表达式
        var patt_zhuanlan = /zhuanlan.zhihu.com/,
            patt_question = /question\/\d+/,
            patt_tip = /zhihu_e_tips/
        var postList = document.querySelectorAll('a[data-za-detail-view-id]');
        postNum = document.querySelectorAll('small.zhihu_e_tips');
        //console.log(`${postList.length} ${postNum.length}`);
        if (postList.length > postNum.length){
            for(var num = postNum.length;num<postList.length;num++){
                if (!patt_tip.test(postList[num].innerHTML)){              // 判断是否已添加
                    if (patt_zhuanlan.test(postList[num].href)){          // 如果是文章
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #0084ff;display: inline-block;height: 18px;">文章</small> ` + postList[num].innerHTML
                    }else if (patt_question.test(postList[num].href)){    // 如果是问题
                        postList[num].innerHTML = `<small class="zhihu_e_tips" style="color: #ffffff;font-weight: normal;font-size: 12px;padding: 0 3px;border-radius: 2px;background-color: #fd7672;display: inline-block;height: 18px;">问题</small> ` + postList[num].innerHTML
                    }
                    //postNum += 1;
                }
            }
        }
    }
})();