const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const taskList = document.getElementById('task-list');
const title = document.getElementById('title');
const year = document.getElementById('year');
const month = document.getElementById('month')
const day = document.getElementById('day');
const hour = document.getElementById('hour');
const min = document.getElementById('min');
const submit = document.getElementById('submit');

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
  }
];

/**** first task *****/
// create a "toDoList" database in indexeddb
const DBOpenRequest = window.indexedDB.open("toDoList", 1);
DBOpenRequest.onerror = event => {
  console.error(event)
};
DBOpenRequest.onsuccess = event => {
  console.log(DBOpenRequest.result)
  db = DBOpenRequest.result;
  displayData();
};
/**** first task ended *****/

/**** second task *****/
// handle versions and making objectstore
DBOpenRequest.onupgradeneeded = event => {
  let db = event.target.result;
  db.onerror = event => {
    console.error(event)
  };
  let objectStore = db.createObjectStore("tasks", { keyPath: "title" });
  objectStore.createIndex("year", "year", { unique: false });
  objectStore.createIndex("month", "month", { unique: false });
  objectStore.createIndex("day", "day", { unique: false });
  objectStore.createIndex("hour", "hour", { unique: false });
  objectStore.createIndex("min", "min", { unique: false });
};
/**** second task ended *****/

/**** third task *****/
// add tasks to objectStore
function addTask() {
  let newItem = [
    { 
      title: title.value,
      year: year.value,
      month: month.value,
      day: day.value,
      hour: hour.value,
      min: min.value
    }
  ];
  let transaction = db.transaction(["tasks"], "readwrite");
  let objectStore = transaction.objectStore("tasks");
  let objectStoreRequest = objectStore.add(newItem[0]);
  objectStoreRequest.onsuccess = function(event) {
    title.value = '';
    year.value = null;
    month.value = '';
    day.value = null;
    hour.value = null;
    min.value = null;
    displayData();
  };
}
/**** third task ended *****/


/**** fourth task *****/
//create a list of tasks
function displayData() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild);
  }
  let objectStore = db.transaction('tasks').objectStore('tasks');
  objectStore.openCursor().onsuccess = event => {
    let cursor = event.target.result;
    if(cursor) {
      const toDoText = cursor.value.title;
      const listItem = createListItem(toDoText);
      taskList.appendChild(listItem);
      const deleteButton = document.createElement('button');
      deleteButton.style.marginLeft = '10px'
      listItem.appendChild(deleteButton);
      deleteButton.textContent = 'X';
      deleteButton.setAttribute('task', cursor.value.title);
      deleteButton.onclick = event => {
        deleteItem(event);
      }
      cursor.continue();
    }
  }
}
function createListItem(contents) {
  const listItem = document.createElement('li');
  listItem.textContent = contents;
  return listItem;
}
/**** fourth task ended *****/


/**** fifth task *****/
//be able to delete task
function deleteItem(event) {
  let dataTask = event.target.getAttribute('task');
  let transaction = db.transaction(["tasks"], "readwrite");
  let request = transaction.objectStore("tasks").delete(dataTask);
  transaction.oncomplete = () => {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  };
};
/**** fifth task ended *****/
