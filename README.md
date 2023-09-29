# 家長會投票系統 ｜ 公開投票系統
## GitHub連結：[`https://github.com/fuweiQiu/vote_public.git`](https://github.com/fuweiQiu/vote_public.git)
## 用到的函式庫以及插件
### CSS
[`Bootstrap`](https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css)
### Javascript
[`SheetJS`](https://cdn.jsdelivr.net/npm/xlsx@0.17.4/dist/xlsx.full.min.js)
[`jQeury`](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js)
[`Bootstrap`](https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js)
[`anime.js`](https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js)
[`chart.js`](https://cdn.jsdelivr.net/npm/chart.js)
[`confeffi`](https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js)
[`popper`](https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js)
## 說明
本頁主要是通過`Javascript`來實現投票功能

首先會利用`SheetJS`來實現讀去Excel表格並轉成網頁表格

然後由使用者在網頁上投票 投票完可匯出為Excel檔案

也可針對不同的投票情況設定**最終投出來的人數**以及投票**前幾名最終的職位**

## 範例檔案說明
如要使用本系統投票 需要有投票名單的Excel檔案`.xlsx` 以下將對檔案中每個必須欄位進行說明

<table>
  <tr>
    <th>欄位</th>
    <th>說明</th>
    <th>是否必填</th>
  </tr>
  <tr>
    <td>序號</td>
    <td>為了方便管理資料以及方便投票而產生</td>
    <td><strong>必填</strong></td>
  </tr>
  <tr>
    <td>候選人</td>
    <td>作為投票系統將要被投票的對象</td>
    <td><strong>必填</strong></td>
  </tr>
  <tr>
    <td>得票數</td>
    <td>作為投票系統最主要的欄位 如果檢測到檔案中沒有對應欄位名稱 將會自行添加</td>
    <td>可不填</td>
  </tr>
</table>

## 製作動機
一開始製作投票系統這個任務是作為老師派給我的暑假作業，後來因為種種因素下，老師決定將我所製作的系統作為家長會投票實際會用到的系統。
## 製作過程
在開始著手進行系統製作時，我其實是一頭霧水的，因為對於老師提的要求，很多項都是我先前不懂、不會的項目，所以我先是透過AI的力量幫助我找到方向，我首先先是詢問chatGPT關於這些要求，有哪些方法可以實現，最終我選擇了Javascript的前端來開發而非PHP的後端，製作過程中也是學習到很多以前從沒接觸過的函式庫，當然也有以前曾經運用過的，像是jQuery，經過這次的實作，我對這些曾經用過的函式庫更加了解了。
## 心得與感想
在完成這次系統後，明顯感受到自己對於Javascript這個語言的了解又加深了，也很謝謝**星孝老師**給我這個機會可以精進自己，給我這個表現的機會，其實在一開始，我也很懷疑我能不能準時完成任務，但最終在老師的推動下，我不僅完成原有的任務，甚至對於老師後續提出對於系統的微調及功能的增加我也完成了許多，要不是老師替我出想法，我也沒辦法靠我自己完成如今功能完善的系統。
## 作品展示圖片
<div style="display: inline-box">
  <img src="https://allservice.qiuqiuqiu.repl.co/家長會.jpg" width="50%" height="50%">
  <img src="https://allservice.qiuqiuqiu.repl.co/家長會2.jpg" width="50%" height="50%">
</div>
