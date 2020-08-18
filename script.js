// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const dateElement = document.getElementById("date");

// SHOW TODAYS DATE
const options ={weekday: "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  // Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //CHECK MARK BUTTON
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  //CHECK TRASH BUTTON
  const trahButton = document.createElement('button');
  trahButton.innerHTML = '<i class="fas fa-trash"></i>';
  trahButton.classList.add("trash-btn");
  todoDiv.appendChild(trahButton);

  // APPEND TO List
  todoList.appendChild(todoDiv);

  // CLEAR Todo INPUT VALUE
  todoInput.value = "";
}

function deleteCheck(event){
  const item = event.target;
  // DELETE TODO
  if(item.classList[0] === 'trash-btn'){
  const todo = item.parentElement;
  removeLocalTodos(todo);
  todo.remove();
  }
  // CHECK MARK
  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(event.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
          break;
      case "uncompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
          break;
    }
  });
}

// SAVE LOCAL TODOS
function saveLocalTodos(todo){
  // CHECK TO SEE IF I HAVE ANYTHING IN STORAGE ALREADY
  let todos;
  if(localStorage.getItem('todos') === null){
    // IF EMPTY CREATE EMPTY ARRAY
    todos = [];
  } else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // IF EMPTY THEN PLACE ITEMS IN STORAGE
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// CALL SAVED TODOS
function getTodos(){
  // CHECK TO SEE IF I HAVE ANYTHING IN STORAGE ALREADY
  let todos;
  if(localStorage.getItem('todos') === null){
    // IF EMPTY CREATE EMPTY ARRAY
    todos = [];
  } else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);


    //CHECK TRASH BUTTON
    const trahButton = document.createElement('button');
    trahButton.innerHTML = '<i class="fas fa-trash"></i>';
    trahButton.classList.add("trash-btn");
    todoDiv.appendChild(trahButton);

    // APPEND TO List
    todoList.appendChild(todoDiv);
  });
}

// REMOVE/DELETE LOCAL TODOS FROM STORAGE
function removeLocalTodos(todo){
  // CHECK TO SEE IF I HAVE ANYTHING IN STORAGE ALREADY
  let todos;
  if(localStorage.getItem('todos') === null){
    // IF EMPTY CREATE EMPTY ARRAY
    todos = [];
  } else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
