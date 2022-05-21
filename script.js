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
    console.log(DBOpenRequest.result)
    db = DBOpenRequest.result;
    //displayData();
  };
  /**** first task ended *****/
  
  /**** second task *****/
  // handle versions and making objectstore
  DBOpenRequest.onupgradeneeded = event => {
    let db = event.target.result;
    db.onerror = event => {
      console.error(event)
    };
    let objectStore = db.createObjectStore("toDoList", { keyPath: "title" });
    objectStore.createIndex("year", "year", { unique: false });
    objectStore.createIndex("month", "month", { unique: false });
    objectStore.createIndex("day", "day", { unique: false });
    objectStore.createIndex("hour", "hour", { unique: false });
    objectStore.createIndex("min", "min", { unique: false });
    objectStore.createIndex("notified", "notified", { unique: false });
  };
  /**** second task *****/
}
