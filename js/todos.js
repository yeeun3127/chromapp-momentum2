const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");


const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement; // clicked html element's parent
  li.remove();
  toDos = toDos.filter(item => item.id !== parseInt(li.id)); // toDos - clicked
  saveToDos();
}

function paintToDo(newToDoObj) {
  /*
  <li>
      <span></span>
      <button></button>
  </li>
  */
  const li = document.createElement("li");
  li.id = newToDoObj.id; // html element에 id 부여하기
  const span =document.createElement("span");
  span.innerText = newToDoObj.text;
  const button =document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault(); // prevent refresh when enter
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);

  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

// 새로고침후 나타남
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null ) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
