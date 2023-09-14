// import $ from "jquery
//設定全域變數
var jsonData, displayedColumns, result_json_data, optionContent; 
var VotePeople = 0;

//計算得票情況
function which(data_array){
  if(Number(data_array[0]['得票數']) > Number(data_array[1]['得票數'])){
    return `恭喜會長為${data_array[0]['家長']}`
  }else if (data_array[0]['得票數'] === data_array[1]['得票數']){
    if (data_array[1]['得票數'] === data_array[2]['得票數']){
      return `恭喜${data_array[0]['家長']}、${data_array[1]['家長']}、${data_array[2]['家長']}三位獲得相同票數`;
    }else{
      return `恭喜${data_array[0]['家長']}和${data_array[1]['家長']}獲得同票數`
    }
  }
}

//生成表格內投票區域 第二種方法
function actionsArea2(id){
  let actions = document.createElement('div');
  actions.className = 'btn-group';
  actions.role = 'group';
  let add = document.createElement('button');
  add.textContent = '投票'
  add.type = 'button';
  add.id = id;
  add.className = 'btn btn-success'
  add.addEventListener('click', () => {
    addVoteVersion2(add);
  })
  let remove = document.createElement('button');
  remove.textContent = '取消投票'
  remove.type = 'button';
  remove.className = 'btn btn-danger'
  remove.id = id;
  remove.addEventListener('click', () => {
    deleteVoteVersion2(remove);
  })
  actions.appendChild(add);
  actions.appendChild(remove);
  return actions
}

//計算投票結果
function calcResult(event){
  let file = event.target.files[0];

  if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
    alert("檔案類型不符合 請上傳 xlsx 檔案");
    return;
  }
  let reader = new FileReader();
  reader.onload = e => {
    let data = new Uint8Array(e.target.result);
    let workbook = XLSX.read(data, {type: 'array'});
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    result_json_data = XLSX.utils.sheet_to_json(worksheet);

    result_json_data.sort((a, b) => b['得票數'] - a['得票數']);

    let topThree = result_json_data.slice(0, 3).map(row => {
      return {
        家長: row['家長'],
        得票數: row['得票數']
      };
    });
    console.log(topThree);
    console.log(topThree[0]['家長']);
    let parents = topThree.map(row => row['家長']);
    let vote = topThree.map(row => row['得票數']);
    let canvas = document.createElement('canvas');
    canvas.id = 'chart';
    canvas.style.width = '60%';
    canvas.style.height = '400px';
    canvas.style.textAlign = 'center';
    let Container_area = document.getElementById('tableContainer');
    Container_area.style.height = '600px';
    Container_area.style.width = '600px';
    Container_area.innerHTML = '';
    Container_area.appendChild(canvas);
    let subarea = document.getElementById('subcontent');
    let subtitle = document.getElementById('subtitle');
    subtitle.textContent = '投票結果'
    console.log(which(topThree))
    let content = document.getElementById('result_show');
    content.textContent = which(topThree);
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: parents,
        datasets: [{
          label: '得票數',
          data: vote,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }],
        options: {
          responsive: true,
        }
      }
    })
  };
  reader.readAsArrayBuffer(file);
  $('#vote_bar').hide();
}


//處理上傳投票檔案 並製作表格
function handleFileUpload(event){
  let file = event.target.files[0];

  if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
    alert("檔案類型不符合 請上傳 xlsx 檔案");
    return;
  }

  let reader = new FileReader();

  reader.onload = e => {
    let data = new Uint8Array(e.target.result);
    let workbook = XLSX.read(data, {type: 'array'});

    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    jsonData = XLSX.utils.sheet_to_json(worksheet);

    jsonData.sort((a, b) => {
      return b.得票數 - a.得票數
    })

    displayedColumns = Object.keys(jsonData[0]);
    let votesNum = false;
    for(let index in displayedColumns){
      if(displayedColumns[index] == '子弟'){
        // console.log('此表含有子弟欄位');
        displayedColumns.splice(index, 1);
      }
      if(displayedColumns[index] == '得票數' || displayedColumns[index] == '票數'){
        votesNum = true;
      }
    }
    if(!votesNum){
      alert('此表沒有得票數 將會自動加入 並將所有得票數設為0');
      displayedColumns.push('得票數');
      for(let index in jsonData){
        jsonData[index].得票數 = 0;
      }
    }

    let coldata = jsonData.map(row => {
      return row['家長'];
    });

    let table = document.createElement('table');
    table.className = 'table';

    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    displayedColumns.forEach(key => {
      let th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });
    let actionTh = document.createElement('th');
    actionTh.textContent = '操作';
    headerRow.appendChild(actionTh);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement('tbody'); //創建表身
    let voteName;
    jsonData.forEach(row => { //遍歷jsonData 並把每筆資料存成row
      let tr = document.createElement('tr'); //創建單行
      displayedColumns.forEach(key => { //遍歷顯示欄位的array
        let td = document.createElement('td'); //創建行中每個元素
        td.textContent = row[key];
        if(key == '家長'){
          voteName = row[key];
        }
        tr.appendChild(td);
      });
      let actionTd = document.createElement('td');
      actionTd.appendChild(actionsArea2(voteName));
      tr.appendChild(actionTd);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    if(VotePeople == 0){
      VotePeople = jsonData.length;
    };
    if(VotePeople > jsonData.length){
      let alertContent = document.getElementById('alertContainer');
      alertContent.classList.add('show');
      let closeButton = alertContent.querySelector(".btn-close");
      closeButton.addEventListener('click', () => {
        alertContent.classList.remove("show")
      })
    }
    let tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
    //創建下拉式選單
    let dropdown = document.getElementById('vote');
    dropdown.innerHTML = ''; //清空#vote 
    console.log(`coldata是${coldata}`);
    coldata.forEach(value => {
      let option = document.createElement('option');
      for(let i = 0; i < jsonData.length; i++){
        if(jsonData[i].家長 == value){
          optionContent = jsonData[i].序號 + '.' + value;
        }
      }
      option.value = value;
      option.textContent = optionContent;
      dropdown.add(option);
    });
    // console.log(jsonData);
  };
  // console.log(jsonData);
  reader.readAsArrayBuffer(file);
}

//減少票數 表格操作版2 操控投票區版本
function deleteVoteVersion2(element){
  let selectValue = element.id;
  let voteBar = document.getElementById('vote');
  voteBar.value = selectValue;
  deleteSelectOption();
  renderTable(jsonData, displayedColumns, selectValue);
}

//減少票數
function deleteSelectOption(){
  var selectElement = document.getElementById('vote'); //取得下拉式選單
  var selectValue = selectElement.options[selectElement.selectedIndex].text.split('.')[1]; //取得下拉式選單所選的選項 加上.split('.')[1]
  console.log(selectElement); //印出
  console.log(selectValue); //印出

  // 尋找選取的候選人在 JSON 資料中的對應物件
  let selectedCandidate = jsonData.find(row => {
    let result = row['家長'] === selectValue;
    if(result == undefined){
      result = row['候選人'] === selectValue;
    }
    return result;
  });

  if (selectedCandidate) {
    // 更新得票數
    selectedCandidate['得票數'] -= 1;
    // updateSpreadsheet(jsonData); //下載檔案 這邊之後新增一個匯出按鈕
  }
  jsonData.sort((a, b) => {
    return b.得票數 - a.得票數;
  })
  renderTable(jsonData, displayedColumns);
}

//新增票數 表格操作版 操控投票去版本
function addVoteVersion2(element){
  let selectValue = element.id;
  let voteBar = document.getElementById('vote');
  voteBar.value = selectValue;
  getSelectOption();
  renderTable(jsonData, displayedColumns, selectValue);
}

//新增票數
function getSelectOption() {
  var selectElement = document.getElementById('vote'); //取得下拉式選單
  var selectValue = selectElement.options[selectElement.selectedIndex].text.split('.')[1]; //取得候選人名字

  console.log(selectElement);
  console.log(selectValue);

  // 尋找選取的候選人在 JSON 資料中的對應物件
  let selectedCandidate = jsonData.find(row => {
    let result = row['家長'] === selectValue;
    if(result == undefined){
      result = row['候選人'] === selectValue;
    }
    return result;
  });

  if (selectedCandidate) {
    // 更新得票數
    // selectedCandidate['得票數'] = selectedCandidate['得票數'] ? Number(selectedCandidate['得票數']) + 1 : 1;
    selectedCandidate['得票數'] += 1;
    // updateSpreadsheet(jsonData); //下載檔案 這邊之後新增一個匯出按鈕
  }
  jsonData.sort((a, b) => {
    return b.得票數 - a.得票數;
  })
  renderTable(jsonData, displayedColumns);
}

//渲染表格
function renderTable(data, displayedColumns, voteRow) {
    let cssedTr;
    var table = document.createElement('table');
    table.className = 'table';
    //定義表頭
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    displayedColumns.forEach(function(key) {
      var th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });
    var actionTh = document.createElement('th');
    actionTh.textContent = '操作';
    headerRow.appendChild(actionTh);
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    var tbody = document.createElement('tbody');
    data.forEach(function(row) {
      let voteName;
      var tr = document.createElement('tr');
      displayedColumns.forEach(function(key) {
        var td = document.createElement('td');
        if(key == '家長'){
          voteName = row[key]
        }
        td.textContent = row[key];
        if(voteRow && voteRow != ''){
          if(row[key] == voteRow){
            cssedTr = tr;
            tr.classList.add('table-danger'); //設定按下去的那個欄背景為紅色
          }
        }
        tr.appendChild(td);
      });
      let actionTd = document.createElement('td');
      let actionsArae = actionsArea2(voteName) //需要套id name
      actionTd.appendChild(actionsArea2(voteName));
      tr.appendChild(actionTd);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    var tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = ''; // 清空容器內的內容
    tableContainer.appendChild(table);
    //加入動畫
    // change(cssedTr);
    if(cssedTr){
      change(cssedTr);
    }
    if(voteRow && voteRow != ''){
      fadeOutClass();
    }
}

//偵測到有樣式的tr就讓其class慢慢消失
function fadeOutClass(){
  var time = 1;
  var countdown = setInterval(() => {
    time--
    if(time <= 0){
      clearInterval(countdown);
      let trList = $('tr');
      // console.log(trList);
      for(let i = 0; i < trList.length; i++){
        if(trList[i].className == 'table-danger'){
          $(trList[i]).removeClass('table-danger');
          $(trList[i]).css('background-color', '#f8d7da');
          // console.log(`索引${i}`)
        }
      }
    }
  }, 200)
}

//下載檔案
function updateSpreadsheet(originalData){
  let data;
  let maxIndex = outputSort(VotePeople - 1);
  if(maxIndex && maxIndex != 0){
    if(maxIndex == 1){
      let leader = originalData[0].家長;
      celebrate(leader)
      return
    }else{
      data = originalData.slice(0, maxIndex);
    }
  }else{
    data = originalData;
  }
  console.log('輸出索引是', maxIndex);
  let worksheet = XLSX.utils.json_to_sheet(data);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1');
  let excelData = XLSX.write(workbook, {type: 'array', bookType: 'xlsx'});
  let blob = new Blob([excelData], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = '投票結果輸出檔案';
  a.click();

  URL.revokeObjectURL(url);
}

//動畫：放大
function change(tr){
  anime({
    targets: tr,
    height: '+=20px',
    fontSize: '+=5px',
    easeing: 'easeInOutQuad',
    direction: 'alternate',
    loop: false
  })
  let time = 1;
  const timer = setInterval(() => {
    if(time <= 0){
      back(tr)
    }else{
      time--;
    }
  }, 200);
}

//動畫：回復原樣
function back(element){
  anime({
    targets: element,
    height: '-=20px',
    fontSize: '16px',
    easeing: 'easeInOutQuad',
    direction: 'alternate',
    loop: false
  })
}

function makeNotice(text){
  let notice = document.createElement('h6');
  notice.textContent = text;
  notice.style.color = '#f00';
  notice.id = 'noticeContent';
  return notice;
} 

//設定投出候選人
function getPeople(){
  let inputBar = document.getElementById('people');
  if(jsonData){
    if(inputBar.value > jsonData.length || inputBar.value == 0 || inputBar.value < 0){
      let noticeContent = document.getElementById('noticeContent');
      if(noticeContent){
        return
      }else{
        document.getElementById('modalBody').appendChild(makeNotice('數字必須包含以下條件：小於所有投票人的人數、不可輸入0、不可輸入負數、不可留空並按下確定'));
        return
      }
    }
  }
  VotePeople = inputBar.value;
  let notice = document.getElementById('noticeContent');
  if(notice){
    notice.parentNode.removeChild(notice);
  }
  let closeBtn = document.getElementById('cancel');
  closeBtn.click();
}

//獲取正確的截取數量
function outputSort(index){
  console.log(index);
  if(index + 1 == jsonData.length){
    // alert('全部')
    return jsonData.length;
  }
  if(index + 1 == 1){
    return 1;
  }
  if(jsonData[index].得票數 > jsonData[index + 1].得票數){
    return index + 1;
  }else{
    for(let i = index; i < jsonData.length - 2; i++){
      if(jsonData[i].得票數 > jsonData[i + 1].得票數){
        return i + 1;
      }
    }
  }
}

//慶祝
function celebrate(leader){
  let content = document.querySelector('.content');
  content.innerHTML = '';
  let newContent = document.createElement('h1');
  newContent.textContent = `恭喜${leader}成為新會長`;
  content.style.display = 'grid';
  content.style.placeItems = 'center';
  newContent.style.paddingTop = '200px';
  newContent.style.fontSize = '50px'
  content.appendChild(newContent);
    confetti({
    particleCount: 1000,
    spread: 360,
    origin: { y: 0.6 }
  });
}

//關閉alert
function closeAlert(){
  let alertArea = document.getElementById('alertContainer');
  alertArea.parentNode.removeChild(alertArea);
}

//產生新的detail
function newDetail(){
  let btn = document.getElementById('addDetail');
  let detailContainer = document.createElement('div')
  detailContainer.classList.add('detail');
  detailContainer.id = 'detail';
  let removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm');
  let icon = document.createElement('embed');
  icon.src = './cross.svg';
  icon.type = 'image/svg+xml';
  icon.classList.add('iconBtn-small');
  let removeBtnText = document.createElement('span');
  removeBtnText.textContent = '刪除';
  removeBtn.appendChild(icon);
  removeBtn.appendChild(removeBtnText);
  detailContainer.appendChild(removeBtn);
  let span1 = document.createElement('span');
  span1.textContent = '指定第'
  detailContainer.appendChild(span1);
  let inputBar1 = document.createElement('input');
  inputBar1.type = 'number';
  inputBar1.placeholder = '名次';
  detailContainer.appendChild(inputBar1);
  let span2 = document.createElement('span');
  span2.textContent = '名為';
  detailContainer.appendChild(span2);
  let inputBar2 = document.createElement('input');
  inputBar2.type = 'text';
  inputBar2.placeholder = '職位';
  detailContainer.appendChild(inputBar2);
  btn.parentNode.insertBefore(detailContainer, btn);
}