// Select form
var form = document.getElementById("form");
// Getting input field
var input = document.getElementById("input");
// Getting elements to display lists in HTML
var forward = document.getElementById("list");
var forward2 = document.getElementById("completedList");

// Getting data from localStorage
let schoolList = JSON.parse(localStorage.getItem("schoolList")) || [];
let listLength = schoolList.length;
let schoolCompletedList = JSON.parse(localStorage.getItem("schoolCompletedList")) || [];
let completedListLength = schoolCompletedList.length;

// Variable to store the index of an item being edited
let EditList = -1;
let msgText;

// Check the width of the window
var windowWidth = window.innerWidth;

//Calling function to getvalue in localstorage
addingTodo();
listCompleted();
form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
  addingTodo();
  listCompleted();
  localStorage.setItem("schoolList", JSON.stringify(schoolList));
  localStorage.setItem("schoolCompletedList", JSON.stringify(schoolCompletedList));
});
// Function to add a value
function add() {
  let inputValue = input.value.trim();
  // Checking duplicate value
  var isDuplicate = schoolList.some(
    (store) => store.value.toUpperCase() == inputValue.toUpperCase()
  );

  // Checking if the input is empty
  if (inputValue.length == 0) {
    msgText = "You entered an empty text!";
    popupNotification(0, msgText);
  }
  // Checking for duplicate value before storing it in the list
  else if (isDuplicate) {
    if (EditList >= 0) {
      input.value = "";
      document.getElementById("btn").innerHTML = "Add";
      msgText = "There is no changes in your todo";
      popupNotification(1, msgText);
      EditList = -1;
      if (windowWidth > 700) {
        document.getElementById("popup").style.display = "block";
      } else {
        document.getElementById("popup").style.display = "none";
      }
      document.getElementById("formTitle").innerHTML = "Add todo";
    } else {
      msgText = "This value already entered in list";
      popupNotification(0, msgText);
    }
  }
  // Adding or editing the value
  else {
    if (EditList >= 0) {
      schoolList = schoolList.map((q, index) => ({
        ...q,
        time: index == EditList ? new Date() : q.time,
        value: index == EditList ? inputValue : q.value,
      }));
      EditList = -1;
      document.getElementById("btn").innerHTML = "Add";
      input.value = "";
      msgText = "Changes have been saved in the list";
      popupNotification(1, msgText);
      if (windowWidth > 700) {
        document.getElementById("popup").style.display = "block";
      } else {
        document.getElementById("popup").style.display = "none";
      }
      document.getElementById("formTitle").innerHTML = "Add todo";
    } else {
      schoolList.push({
        time: new Date(),
        value: inputValue,
        checked: false,
      });
      input.value = "";
      listLength += 1;
      msgText = "Your new todo has been added";
      popupNotification(1, msgText);
      if (windowWidth > 700) {
        document.getElementById("popup").style.display = "block";
      } else {
        document.getElementById("popup").style.display = "none";
      }
    }
  }
}

// Function to display the list of todos
function addingTodo() {
  if (schoolList.length === 0) {
    forward.innerHTML =
      '<center class="valueMessage" style="margin-top:50px; font-size:20px">Your Todo List is empty</center>';
    document.getElementById("taskValue").innerHTML = "Tasks - " + listLength;
    return;
  }
  forward.innerHTML = "";
  schoolList.sort((a, b) => new Date(b.time) - new Date(a.time));
  schoolList.forEach((todo, index) => {
    if (todo.checked === true) {
      schoolCompletedList.push(todo);
      schoolList = schoolList.filter((_, idx) => idx !== index);
      localStorage.setItem("schoolList", JSON.stringify(schoolList));
      localStorage.setItem("schoolCompletedList", JSON.stringify(schoolCompletedList));
      listLength -= 1;
      completedListLength += 1;
      document.getElementById("taskValue").innerHTML = "Tasks - " + listLength;

      if (schoolList.length === 0) {
        forward.innerHTML =
          '<center class="valueMessage">Your Todo List is empty</center>';
        document.getElementById("taskValue").innerHTML =
          "Tasks - " + listLength;
        return;
      }
    }
    // Sort the list based on time
    forward.innerHTML += `
      <div class="listview" id=${index}>
        <i 
          class="bi ${
            todo.checked ? "bi-check-circle-fill" : "bi-circle"
          } check"
          data-action="check"
        ></i> 
        <p class="value">${todo.value}</p>
        <button id="editbutton" class="btnedit bi bi-pencil-square" data-action="edit"></button>
        <button id="deletebutton" class="btndelete bi bi-trash" data-action="delete"></button>   
      </div>`;
  });
  if (listLength > 0) {
    document.getElementById("taskValue").innerHTML = "Tasks - " + listLength;
  }
}

// Function to display the completed list
function listCompleted() {
  schoolCompletedList.sort((a, b) => new Date(b.time) - new Date(a.time));
  if (schoolCompletedList.length === 0) {
    forward2.innerHTML =
      '<center class="valueMessage" style="margin-top:50px; font-size:20px">There are no completed tasks</center>';
    document.getElementById("completedListLength").innerHTML =
      "Completed - " + completedListLength;
    return;
  }
  forward2.innerHTML = "";
  schoolCompletedList.forEach((todo, index) => {
    if (todo.checked === false) {
      schoolList.push(todo);
      schoolCompletedList = schoolCompletedList.filter((_, idx) => idx !== index);
      localStorage.setItem("schoolList", JSON.stringify(schoolList));
      localStorage.setItem("schoolCompletedList", JSON.stringify(schoolCompletedList));
      listLength += 1;
      completedListLength -= 1;
      document.getElementById("taskValue").innerHTML = "Tasks - " + listLength;

      if (schoolCompletedList.length === 0) {
        forward2.innerHTML =
          '<center class="valueMessage">There are no completed tasks</center>';
        document.getElementById("completedListLength").innerHTML =
          "Completed - " + completedListLength;
        return;
      }
    }
    forward2.innerHTML += `
      <div class="listview" id=${index}>
        <i 
          class="bi ${
            todo.checked ? "bi-check-circle-fill" : "bi-circle"
          } check"
          data-action="checkCompleted"
        ></i> 
        <p class="${
          todo.checked ? "checked" : ""
        } compvalue" data-action="check">${todo.value}</p>
      </div>`;
  });
  if (completedListLength > 0) {
    document.getElementById("completedListLength").innerHTML =
      "Completed - " + completedListLength;
  }
  addingTodo();
}

// Event listener for check, edit, and delete buttons in the list
forward.addEventListener("click", (event) => {
  var target = event.target;
  var click = target.parentNode;
  if (click.className !== "listview") return;
  // Getting id to Edit or Delete the value in list
  var wl = click.id;
  // Getting action form the list button
  var action = target.dataset.action;
  //Calling function to Edit nor delete
  action === "check" && checkList(wl);
  action === "edit" && editList(wl);
  action === "delete" && deleteList(wl);
});

forward2.addEventListener("click", (event) => {
  var target = event.target;
  var click = target.parentNode;
  if (click.className !== "listview") return;
  // Getting id to Edit or Delete the value in list
  var wl = click.id;
  // Getting action form the list button
  var action = target.dataset.action;
  //Calling function to Edit nor delete
  action === "checkCompleted" && completedMove(wl);
});

// Function to mark a todo as completed
function completedMove(wl) {
  schoolCompletedList = schoolCompletedList.map((todo, index) => ({
    ...todo,
    checked: index == wl ? !todo.checked : todo.checked,
  }));
  addingTodo();
  listCompleted(wl);
  listCompleted();
  msgText = "Your todo has been moved to the active list";
  popupNotification(1, msgText);
}

function checkList(wl) {
  schoolList = schoolList.map((todo, index) => ({
    ...todo,
    checked: index == wl ? !todo.checked : todo.checked,
  }));
  addingTodo(wl);
  listCompleted();
  msgText = "Your todo has been marked as completed";
  popupNotification(1, msgText);
}

// Function to edit a todo
function editList(wl) {
  document.getElementById("formTitle").innerHTML = "Edit todo";
  document.getElementById("popup").style.display = "block";
  document.getElementById("btn").innerHTML = "Save";
  input.value = schoolList[wl].value;
  EditList = wl;
}

// Function to delete a todo
function deleteList(wl) {
  document.getElementById("id01").style.display = "block";
  var removeValue = document.getElementById("deleteValue");
  
  removeValue.addEventListener("click", function (event) {
    event.preventDefault();
    schoolList = schoolList.filter((_, index) => index != wl);
    listLength -= 1;
    if (listLength === 0) {
      schoolList = [];
      localStorage.setItem("schoolList", JSON.stringify(schoolList));
    } else {
      localStorage.setItem("schoolList", JSON.stringify(schoolList));
    }
    msgText = "Todo has been deleted";
    popupNotification(1, msgText);
    document.getElementById("id01").style.display = "none";
    localStorage.setItem("schoolList", JSON.stringify(schoolList));
        
    // Remove the event listener after deleting the item
    this.removeEventListener("click", arguments.callee);
    addingTodo();
    return;
  });
  var closeFormPopup = document.getElementById("formClose");
  closeFormPopup.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("id01").style.display = "none";
    wl = null;
  });
  this.removeEventListener("click", arguments.callee);  
}
// To open the add popup form in mobile view
function openForm() {
  document.getElementById("popup").style.display = "block";
}
// To open the close popup form in mobile view
function closeForm() {
  document.getElementById("popup").style.display = "none";
}

// Popup notification function
function popupNotification(msg, msgText) {
  const toast = document.createElement("div");
  if (msg === 0) {
    document.getElementById("toastmsg").classList.remove("toast");
    document.getElementById("toastmsg").classList.add("toast3");
    toast.textContent = msgText;
    document.body.appendChild(toast);
    document.getElementById("input").classList.add("invalid");
    setTimeout(() => {
      toast.remove();
      document.getElementById("toastmsg").classList.remove("toast");
      document.getElementById("toastmsg").classList.add("toast");
      document.getElementById("input").classList.remove("invalid");
    }, 2300);
  } else {
    let toast2 = document.getElementById("toast2");
    document.getElementById("msgTetxt").innerHTML = msgText;
    toast2.classList.add("toast-active");
    document
      .getElementById("toastCloseBtn")
      .addEventListener("click", function () {
        toast2.classList.remove("toast-active");
      });
  }
}
