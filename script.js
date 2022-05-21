const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const taskList = document.getElementById('task-list');
const title = document.getElementById('title');
const year = document.getElementById('year');
const month = document.getElementById('month')
const day = document.getElementById('day');
const hour = document.getElementById('hour');
const min = document.getElementById('min');
const submit = document.getElementById('submit');
const notifBtn = document.getElementById('enable');

MONTHS.forEach(m => {
  var opt = document.createElement('option');
    opt.value = m;
    opt.innerHTML = m;
    month.appendChild(opt);
})

let db;

let newTask = [
  { 
    title: "",
    hours: 0,
    minutes: 0,
    day: 0,
    month: "",
    year: 0,
    notified: "no"
  }
];

if(Notification.permission === 'denied' || Notification.permission === 'default') {
  notifBtn.style.display = 'block';
} else {
  notifBtn.style.display = 'none';
}

window.onload = function() {
  /**** first task *****/
  // create a "toDoList" database in indexeddb
  const DBOpenRequest = window.indexedDB.open("toDoList", 1);
  DBOpenRequest.onerror = event => {
    console.error(event)
  };
  DBOpenRequest.onsuccess = event => {
    db = DBOpenRequest.result;
    //displayData();
  };
  /**** first task ended *****/
}
