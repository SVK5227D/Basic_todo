//Select form
var form = document.getElementById("form");
//getting input form inputfield
var input = document.getElementById("input");
//getting id to listing value in html
var forward = document.getElementById("list");
var forward2 = document.getElementById("completedList");
//Getting the data form localstorage
let schoolList = JSON.parse(localStorage.getItem("schoolList")) || [];
let listLength4 = schoolList.length;
let schoolCompletedList =
  JSON.parse(localStorage.getItem("schoolCompletedList")) || [];
let completedlistLength4 = schoolCompletedList.length;

// Check the width of the window
var windowWidth = window.innerWidth;

//array to store
let editList4 = -1;
// Passing empty value for toast message
let msgText4;
//Calling function to getvalue in localstorage
addingTodo();
listCompleted();
//submit
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //Calling function to add into list
  add();
  //Calling function to viewing list in html
  addingTodo();
  //
  listCompleted();
  //Adding the data into local storage
  localStorage.setItem("schoolList", JSON.stringify(schoolList));
  localStorage.setItem(
    "schoolCompletedList",
    JSON.stringify(schoolCompletedList)
  );
});

//-----------------         Function to add a value               ------------------
function add() {
  let inputValue = input.value.trim();
  //checking duplicate value
  var isDuplicate = schoolList.some(
    (store) => store.value.toUpperCase() == inputValue.toUpperCase()
  );
  //Checking the input is empty or not empty
  if (inputValue.length == 0) {
    msgText4 = "Your entered empty text!!!!!!!!";
    popupNotification(0, msgText4);
    if (windowWidth > 700) {
      document.getElementById("popup").style.display = "block";
    } else {
      document.getElementById("popup").style.display = "none";
    }
  }
  //Checking the duplicate value before storig list
  else if (isDuplicate) {
    if (editList4 >= 0) {
      input.value = "";
      document.getElementById("btn").innerHTML = "Add";
      msgText4 = "There is no changes in your todo";
      popupNotification(1, msgText4);
      if (windowWidth > 700) {
        document.getElementById("popup").style.display = "block";
      } else {
        document.getElementById("popup").style.display = "none";
      }
      document.getElementById("formTitle").innerHTML = "Add todo";
    } else {
      msgText4 = "This value already entered in list";
      popupNotification(0, msgText4);
    }
  }
  //Adding and editing
  else {
    if (editList4 >= 0) {
      schoolList = schoolList.map((q, index) => ({
        ...q,
        time: index == editList4 ? new Date() : q.time,
        value: index == editList4 ? inputValue : q.value,
      }));
      editList4 = -1;
      // Changing the button "Add" after saving the value
      document.getElementById("btn").innerHTML = "Add";
      // Clearing the inputfield after edting the value
      input.value = "";
      msgText4 = "Changes has been saved in list";
      popupNotification(1, msgText4);
      if (windowWidth > 700) {
        document.getElementById("popup").style.display = "block";
      } else {
        document.getElementById("popup").style.display = "none";
      }
      document.getElementById("formTitle").innerHTML = "Add todo";
    } else {
      // To store the value
      schoolList.push({
        time: new Date(),
        value: inputValue,
        checked: false,
      });
      // Clearing the Inputfield after entering the value
      input.value = "";
      listLength4 += 1;
      msgText4 = "Your new todo has been added";
      popupNotification(1, msgText4);
      if (windowWidth > 700) {
        document.getElementById("popup").style.display = "block";
      } else {
        document.getElementById("popup").style.display = "none";
      }
    }
  }
}

// --------------                 Functio to add a todo's --------------------------------------------
function addingTodo(id) {
  if (schoolList.length == 0) {
    forward.innerHTML =
      '<center class ="valueMessage">Your Todo List has been empty</center>';
    document.getElementById("taskValue").innerHTML = "Tasks - " + listLength4;
    return;
  }
  schoolList.sort((a, b) => new Date(b.time) - new Date(a.time));
  // Clear the list before enter the value
  forward.innerHTML = "";
  // Adding values to list
  schoolList.forEach((todo, index) => {
    if (todo.checked == true) {
      schoolCompletedList.push(todo);
      schoolList = schoolList.filter((h, index) => id != index);
      localStorage.setItem("schoolList", JSON.stringify(schoolList));
      localStorage.setItem(
        "schoolCompletedList",
        JSON.stringify(schoolCompletedList)
      );
      listLength4 -= 1;
      completedlistLength4 += 1;
      document.getElementById("taskValue").innerHTML = "Task -  " + listLength4;
      document.getElementById("completedListLength").innerHTML =
        "Completed -  " + completedlistLength4;
      if (schoolList.length == 0) {
        forward.innerHTML =
          '<center class ="valueMessage">Your Todo List has been empty</center>';
        document.getElementById("taskValue").innerHTML =
          "Tasks - " + listLength4;
        return;
      }
    }
    forward.innerHTML += `
        <div class="listview" id=${index}>
        <i 
        class="bi ${todo.checked ? "bi-check-circle-fill" : "bi-circle"} check"
        data-action="check"        
        ></i> 
        <p class="value" data-action="check">${todo.value}</p>
        <button id="editbutton" class="btnedit bi bi-pencil-square" data-action="edit"></button>
        <button id="deletebutton" class="btndelete bi bi-trash" data-action="delete"></button>   
        </div>`;
  });
  // Showing length in list
  if (listLength4 > 0) {
    document.getElementById("taskValue").innerHTML = "Task -  " + listLength4;
  }
  // listCompleted();
}

function listCompleted(id) {
  if (schoolCompletedList.length == 0) {
    forward2.innerHTML =
      '<center class ="valueMessage">There is no Completed task</center>';
    document.getElementById("completedListLength").innerHTML =
      "Completed - " + completedlistLength4;
    return;
  }
  schoolCompletedList.sort((a, b) => new Date(b.time) - new Date(a.time));
  // Clear the list before enter the value
  forward2.innerHTML = "";
  // Adding values to list
  schoolCompletedList.forEach((todo, index) => {
    if (todo.checked == false) {
      schoolList.push(todo);
      schoolCompletedList = schoolCompletedList.filter(
        (h, index) => id != index
      );
      localStorage.setItem("schoolList", JSON.stringify(schoolList));
      localStorage.setItem(
        "schoolCompletedList",
        JSON.stringify(schoolCompletedList)
      );
      listLength4 += 1;
      completedlistLength4 -= 1;
      document.getElementById("taskValue").innerHTML = "Task -  " + listLength4;
      document.getElementById("completedListLength").innerHTML =
        "Completed -  " + completedlistLength4;
      if (schoolCompletedList.length == 0) {
        forward2.innerHTML =
          '<center class ="valueMessage">There is no Completed task</center>';
        document.getElementById("completedListLength").innerHTML =
          "Completed - " + completedlistLength4;
        return;
      }
    }
    forward2.innerHTML += `
        <div class="listview" id=${index}>
        <i 
        class="bi ${todo.checked ? "bi-check-circle-fill" : "bi-circle"} check"
        data-action="checkCompleted"
        ></i> 
        <p class="${
          todo.checked ? "checked" : " "
        } compvalue" data-action="check">${todo.value}</p>
        </div>`;
  });
  // Showing length in list
  if (completedlistLength4 > 0) {
    document.getElementById("completedListLength").innerHTML =
      "Completed -  " + completedlistLength4;
  }
  addingTodo();
}

//------------------------------       AddEventListener for edit and delete in listView     --------------------------
forward.addEventListener("click", (event) => {
  var target = event.target;
  var click = target.parentNode;
  if (click.className != "listview") return;
  // if(click.className != 'listview') return;
  // Getting id to Edit or Delete the value in list
  var wl = click.id;
  // Getting action form the list button
  var action = target.dataset.action;
  //Calling function to Edit nor delete
  action == "check" && checkList(wl);
  action == "edit" && editList5(wl);
  action == "delete" && deleteList(wl);
});

forward2.addEventListener("click", (event) => {
  var target = event.target;
  var click = target.parentNode;
  if (click.className != "listview") return;
  // Getting id to Edit or Delete the value in list
  var wl = click.id;
  // Getting action form the list button
  var action = target.dataset.action;
  //Calling function to Edit nor delete
  action == "checkCompleted" && completedMove(wl);
});

function completedMove(wl) {
  schoolCompletedList = schoolCompletedList.map((todo, index) => ({
    ...todo,
    checked: index == wl ? !todo.checked : todo.checked,
  }));
  addingTodo();
  listCompleted(wl);
  listCompleted();
  msgText4 = "Your todo has been moved to task inprocess";
  popupNotification(1, msgText4);
}

// -------------------------------      Completed Function         ------------------------------------------
function checkList(wl) {
  schoolList = schoolList.map((todo, index) => ({
    ...todo,
    checked: index == wl ? !todo.checked : todo.checked,
  }));
  addingTodo(wl);
  listCompleted();
  msgText4 = "Your todo has been completed";
  popupNotification(1, msgText4);
}

// ------------------------------            editList4 function          --------------------------------------------
function editList5(wl) {
  document.getElementById("formTitle").innerHTML = "Edit todo";
  document.getElementById("popup").style.display = "block";
  document.getElementById("btn").innerHTML = "Save";
  input.value = schoolList[wl].value;
  editList4 = wl;
}

//------------------------           Deleting Function while delete a value in list          --------------------------
function deleteList(wl) {
  document.getElementById("id01").style.display = "block";
  var removeValue = document.getElementById("deleteValue");
  removeValue.addEventListener("click", function (event) {
    event.preventDefault();
    schoolList = schoolList.filter((h, index) => wl != index);
    listLength4 -= 1;
    addingTodo();
    if (listLength4 == 0) {
      schoolList = [];
      localStorage.setItem("schoolList", JSON.stringify(schoolList));
    }
    localStorage.setItem("schoolList", JSON.stringify(schoolList));
    msgText4 = "Todo has been deleted";
    popupNotification(1, msgText4);
    document.getElementById("id01").style.display = "none";
  });

  // Remove the event listener after deleting the item
  this.removeEventListener("click", arguments.callee);
}

//----------------------     Popup message ----------------------------
function popupNotification(msg, msgText4) {
  const toast = document.createElement("div");
  if (msg == 0) {
    toast.classList.add("toast");
    toast.textContent = msgText4;
    document.getElementById("input").classList.add("invalid");
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
      document.getElementById("input").classList.remove("invalid");
    }, 2300);
  } else {
    let toast2 = document.getElementById("toast2");
    document.getElementById("msgTetxt").innerHTML = msgText4;
    toast2.classList.add("toast-active");
    document
      .getElementById("toastCloseBtn")
      .addEventListener("click", function () {
        toast2.classList.remove("toast-active");
      });
  }
}
// Function to close the confirmation dialog
function formClose() {
  document.getElementById("id01").style.display = "none";
}

function openForm() {
  document.getElementById("popup").style.display = "block";
}

function closeForm() {
  document.getElementById("popup").style.display = "none";
}
