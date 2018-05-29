const addToNewButton = document.querySelector('.new .add-button'),
      closePopupButton = document.querySelector('.close-popup'),
      closeEditButton = document.querySelector('.editclose'),
      editingButtons = document.querySelectorAll('.delete-button'),
      sendNewPhoneInfo = document.getElementById('sendNewPhoneInfo'),
      changingDiv = document.querySelector('.isChanging'),
      status = document.getElementById('status');
window.onload = phonesRender();
function addNewPhone() {
  document.querySelector('.add-phone').classList.toggle('hidy');
  document.querySelector('.blurit').classList.toggle('hidy');
}
function editPhoneFunc(){
  document.querySelector('.editpopup').classList.toggle('hidy');
  document.querySelector('.blurit').classList.toggle('hidy');
}
function closePopup(){
  document.querySelector('.add-phone').classList.toggle('hidy');
  document.querySelector('.blurit').classList.toggle('hidy');
}
function closeEditPopup(){
  document.querySelector('.editpopup').classList.toggle('hidy');
  document.querySelector('.blurit').classList.toggle('hidy');
}

editingButtons.forEach(function(item){
  item.addEventListener('click', function(){
    trap = item.parentNode.parentNode.children[1].children;
    for (i=0; i<trap.length; i++){
      trap[i].children[2].classList.toggle('hidy');
    }
    //.forEach(function(subitem){subitem.children[2].classList.toggle('hidy');})
  })}
);

function addNewPhoneToList(){
  let tempPhoneData={};

  if (model.value==`` || problem.value==`` ||status.value==`` ||imei.value==``){
    alert('Bведите данные'); return false;
  };

  tempPhoneData.model = model.value;
  tempPhoneData.value = problem.value;
  tempPhoneData.status = status.value;
  tempPhoneData.imei = imei.value;
  tempPhoneData.phoneID = localStorage.nextPhoneID;
  tempPhoneData.location = 1; // чтобы при онлоад прогрузке элементов было понятно в каком из трех окон этот фоун

  let phoneName = `phone${localStorage.nextPhoneID}`;
  localStorage.nextPhoneID -= -1;
  localStorage.setItem(phoneName, JSON.stringify(tempPhoneData));

  const newPhone = document.createElement('div');
  const newPhoneID = document.createElement('p');
  const newPhoneInfo = document.createElement('p');
  const editList = changingDiv.cloneNode(true);
  newPhone.appendChild(newPhoneID);
  newPhone.appendChild(newPhoneInfo);
  newPhone.appendChild(editList);
  newPhone.className = 'cell';
  newPhoneID.className = 'phoneNum';
  newPhoneInfo.className = 'phoneInfo';
  editList.classList = 'isChanging';
  newPhoneID.innerHTML = tempPhoneData.phoneID;
  newPhoneInfo.innerHTML = tempPhoneData.model + ' / ' + tempPhoneData.value;
  newPhone.id = `phone` + tempPhoneData.phoneID;
  document.querySelector('.maintable').appendChild(newPhone);
  model.value==``;  problem.value==``; status.value==``; imei.value==``;
  location.reload(); 
}

function phonesRender(){
  if (!localStorage.nextPhoneID) localStorage.nextPhoneID=1;
  
  for (i=1; i<500; i++){
    if (localStorage.getItem('phone' + [i])){
    tempPhoneData = JSON.parse(localStorage.getItem('phone' + [i]));
    createPhoneFromObject(tempPhoneData);
  }}
}
function createPhoneFromObject({ model, value, phoneID, status, location }){
  const newPhone = document.createElement('div');
  const newPhoneID = document.createElement('p');
  const newPhoneInfo = document.createElement('p');
  const editList = changingDiv.cloneNode(true);
  newPhone.appendChild(newPhoneID);
  newPhone.appendChild(newPhoneInfo);
  newPhone.appendChild(editList);
  newPhone.className = 'cell';
  newPhoneID.className = 'phoneNum';
  newPhoneInfo.className = 'phoneInfo';
  editList.classList = 'isChanging';
  newPhoneID.innerHTML = phoneID;
  newPhoneInfo.innerHTML = model + ' / ' + value;
  newPhone.id = `phone` + phoneID;
  switch (location){
    case 1: 
      document.querySelector('.maintable').appendChild(newPhone);
      break;
    case 2: 
      document.querySelector('.in-progress .maintable').appendChild(newPhone);
      break;
    case 3: {
      document.querySelector('.ready .maintable').appendChild(newPhone);
      document.querySelectorAll('.ready .to-progress').forEach(function(item){
        item.style.display = 'none';})};
      break;
  };
}

sendNewPhoneInfo.onclick = addNewPhoneToList;
addToNewButton.addEventListener('click', addNewPhone);
closePopupButton.addEventListener('click', closePopup);
closeEditButton.addEventListener('click', closeEditPopup);
toNextWindow = document.querySelectorAll('.to-progress');
removePhone = document.querySelectorAll('.close-tab');
editPhone = document.querySelectorAll('.edit-tab');
function toNextWindowAdd(){toNextWindow.forEach(function(item){
  item.addEventListener('click', function(){
    trap = item.parentNode.parentNode;
    tempPhoneData = JSON.parse(localStorage.getItem(trap.id));
    if (tempPhoneData.location == 1) {
      document.querySelector('.in-progress .maintable').appendChild(trap);
      tempPhoneData.location = 2;
      localStorage.setItem(trap.id, JSON.stringify(tempPhoneData));
    }
    else{
      document.querySelector('.ready .maintable').appendChild(trap);
      tempPhoneData.location = 3;
      localStorage.setItem(trap.id, JSON.stringify(tempPhoneData));
    };
})})};

toNextWindowAdd();

(function removePhoneAdd(){removePhone.forEach(function(item){
  item.addEventListener('click', function(){
    trap = item.parentNode.parentNode;
    trap.parentNode.removeChild(trap);
    localStorage.removeItem(trap.id)
  })
})})();
function editPhoneAdd(){editPhone.forEach(function(item){
  item.addEventListener('click', function(){
    trap=item.parentNode.parentNode;
    tempPhoneData = JSON.parse(localStorage.getItem(trap.id));
    
    editPhoneFunc();
    editmodel.value = tempPhoneData.model;
    editproblem.value = tempPhoneData.value;
    editstatus.value = tempPhoneData.status;
    editimei.value = tempPhoneData.imei;
      editPhoneInfo.onclick = function(){
    if (editmodel.value==`` || editproblem.value==`` ||editstatus.value==`` ||editimei.value==``){
      alert('Bведите данные'); return false;
    };

    tempPhoneData.model = editmodel.value;
    tempPhoneData.value = editproblem.value;
    tempPhoneData.status = editstatus.value;
    tempPhoneData.imei = editimei.value;
    
    localStorage.setItem(trap.id, JSON.stringify(tempPhoneData));
    location.reload();}
  })
})}
editPhoneAdd();