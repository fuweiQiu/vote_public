# 家長會投票系統
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
