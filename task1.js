const input = document.getElementById("input-field");
const todoList = document.getElementById("list");
const form = document.querySelector(".todoform");

let current = new Date();
let cDate =
  current.getFullYear() +
  "-" +
  (current.getMonth() + 1) +
  "-" +
  current.getDate();
let cTime =
  current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
let dateTime = cDate + " | " + cTime;
let dT = (document.getElementById("date-time").innerHTM = dateTime);

let apiData;
// let list_todo = apiData;
// let delClicked = 0;

readTodo();
function readTodo() {
  fetch("https://63b27acf0d51f5b2972a33a9.mockapi.io/Todos")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // if (localStorage.getItem('list_todo')) {
      //   list_todo = JSON.parse(localStorage.getItem('list_todo'));
      // } else list_todo = [];

      apiData = data.map(
        (todo) => `<div id="${todo.id}"> 
  <div class="box">
  <div class= "nameDate">
  <div class="name">${todo.name}</div>
  <div id= "date-time"> ${todo.dateTime}</div></div>
  <div class= "buttons">
  <button id="editBtn-${todo.id}" onclick="editCallBack(${todo.id})" class="editBtn" type="button"><i class="fa-regular fa-pen-to-square" style="pointer-events: none;"></i></button>
  <button id="delBtn-${todo.id}" onclick="delCallBack(${todo.id})" class="delBtn" type="button"><i class="fa-regular fa-trash-can"  style="pointer-events: none;"></i></button>
  </div>
  </div>
  </div>`
      );

      document.querySelector("#list").innerHTML = apiData.join("");
    })

    .catch((err) => console.log("fetch error", err));
  // todoList.innerHTML = arrayResult;
  // const delBtns = document.querySelectorAll('.delBtn');
  // const editBtns = document.querySelectorAll('.editBtn');
  // delBtns.forEach(delBtn => delBtn.removeEventListener('click', delCallBack));
  // delBtns.forEach(delBtn => delBtn.addEventListener('click', delCallBack));

  // editBtns.forEach((editBtn) => editBtn.removeEventListener("click", editCallBack));
  // editBtns.forEach((editBtn) => editBtn.addEventListener("click", editCallBack));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") return;
  const newTodo = {
    id: Date.now(),
    name: input.value,
    dateTime: dT,
  };

  input.value = "";
  // list_todo.push(newTodo);
  // localStorage.setItem('list_todo',JSON.stringify(list_todo));
  readTodo();
  fetch("https://63b27acf0d51f5b2972a33a9.mockapi.io/Todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)))
    .then((response) => readTodo());
});

function delCallBack(id) {
  console.log("i am deleting");
  fetch(`https://63b27acf0d51f5b2972a33a9.mockapi.io/Todos/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      readTodo();
    })
    .catch((err) => {
      console.error(err);
    });
}
//   list_todo = list_todo.filter(todo => todo.id != event.target.id.split('-')[1]);
//   // localStorage.setItem("list_todo", JSON.stringify(list_todo));
//   readTodo();

// }

function editCallBack(id) {
  // const updateTodoId = event.target.id.split("-")[1];
  // let singleTodoEl = list_todo.find((todo) => todo.id === +updateTodoId);
  const updatePopup = document.querySelector(".updatePopup");

  updatePopup.classList.add("active");

  const updatePopupOverlay = document.querySelector(".updatePopup .overlay");
  const updatePopupName = document.querySelector(".updatePopup input");

  // updatePopupName.value = singleTodoEl.name;
  updatePopupOverlay.addEventListener("click", () =>
    updatePopup.classList.remove("active")
  );

  document.querySelector("#updateForm").addEventListener("submit", (event) => {
    event.preventDefault();
    // const updatedTodoElement = { ...singleTodoEl, name: updatePopupName.value };
    // const index = list_todo.findIndex((todo) => todo.id === +updateTodoId);
    // list_todo.splice(index, 1, updatedTodoElement);
    // localStorage.setItem("list_todo", JSON.stringify(list_todo));
    // updatePopup.classList.remove("active");

    let input = document.getElementById("name");
    console.log(input.value);
    let newTodo = { id: Date.now(), name: input.value };
    console.log(newTodo);

    fetch(`https://63b27acf0d51f5b2972a33a9.mockapi.io/Todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json(response))
      .then((response) => updatePopup.classList.remove("active"))
      .then((response) => readTodo())
      // .then((response) =>(id=null))
      .then((response) => (input.value = ""));
  });
}
