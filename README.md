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
    <td>欄位</td>
    <td>說明</td>
    <td>是否必填</td>
  </tr>
  <tr>
    <td>班級</td>
    <td>因此系統是因應家長會投票而產生 所以會有此欄紀錄學生資料</td>
    <td>可不填</td>
  </tr>
  <tr>
    <td>學生</td>
    <td>因此系統是因應家長會投票而產生 所以會有此欄紀錄學生資料 而這裡的學生並不是候選人</td>
    <td>可不填</td>
  </tr>
  <tr>
    <td>序號</td>
    <td>為了方便管理資料以及方便投票而產生</td>
    <td><strong>必填</strong></td>
  </tr>
  <tr>
    <td>家長</td>
    <td>即後旋人 但目前若將欄位名稱設為家長以外的名稱 如：候選人 會出檔案會出現錯誤 稍後會進行修正！</td>
    <td><strong>必填</strong></td>
  </tr>
  <tr>
    <td>得票數</td>
    <td>作為投票系統最主要的欄位 如果檢測到檔案中沒有對應欄位名稱 將會自行添加</td>
    <td>可不填</td>
  </tr>
  <tr>
    <td>子弟</td>
    <td>也是因為家長會天票產生的相關欄位</td>
    <td>可不填</td>
  </tr>
</table>
