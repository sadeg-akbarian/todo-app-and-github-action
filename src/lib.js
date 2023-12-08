export function initTodoApp(todosArray, todoListDomElement) {
  todosArray = readTodosFromLocalStorage(todosArray);
  renderTodos(todosArray, todoListDomElement);
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function readTodosFromLocalStorage(todosArray) {
  const todosFromStorage = localStorage.getItem("todos");
  if (todosFromStorage !== null) {
    todosArray = JSON.parse(todosFromStorage);
  } else {
    todosArray = [];
  }
  return todosArray;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function renderTodos(todosArray, todoListDomElement) {
  todoListDomElement.innerHTML = "";

  todosArray.forEach(function (currentTodo) {
    const newTodoLiEl = document.createElement("li");

    const todoCheckboxEl = document.createElement("input");
    todoCheckboxEl.setAttribute("type", "checkbox");
    todoCheckboxEl.checked = currentTodo.done;
    newTodoLiEl.appendChild(todoCheckboxEl);

    const textNode = document.createTextNode(currentTodo.todo);
    newTodoLiEl.append(textNode);

    if (currentTodo.done === true) {
      newTodoLiEl.classList.add("done");
    }

    newTodoLiEl.todo = currentTodo;

    const filterValue = getFilterValue();
    if (filterValue === "done") {
      newTodoLiEl.hidden = true;
    }

    todoListDomElement.appendChild(newTodoLiEl);
  });

  filterTodos(todoListDomElement);
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function filterTodos(todoListDomElement) {
  const filterValue = getFilterValue();

  for (let i = 0; i < todoListDomElement.children.length; i++) {
    const currentTodo = todoListDomElement.children[i];
    if (filterValue === "all") {
      currentTodo.hidden = false;
    } else if (filterValue === "open") {
      currentTodo.hidden = currentTodo.todo.done;
    } else if (filterValue === "done") {
      currentTodo.hidden = !currentTodo.todo.done;
    }
  }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function getFilterValue() {
  return document.querySelector('#todo-filter input[type="radio"]:checked')
    .value;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function isDuplicate(todo, todosArray) {
  todo = todo.toLowerCase();

  for (let i = 0; i < todosArray.length; i++) {
    const currentTodo = todosArray[i];
    if (currentTodo.todo.toLowerCase() === todo) {
      return true;
    }
  }
  return false;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function addNewTodo(newTodoElement, todosArray, todoListDomElement) {
  const newTodoText = newTodoElement.value.trim();

  // length check
  if (newTodoText.length === 0) {
    return;
  }

  // duplicate check
  if (isDuplicate(newTodoText, todosArray)) {
    return;
  }

  const newTodo = {
    todo: newTodoText,
    done: false,
  };
  todosArray.push(newTodo);

  saveTodosToLocalStorage(todosArray);
  renderTodos(todosArray, todoListDomElement);

  newTodoElement.value = "";
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function saveTodosToLocalStorage(todosArray) {
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function deleteDoneTodos(todosArray, todoListDomElement) {
  todosArray = todosArray.filter((todo) => todo.done === false);
  saveTodosToLocalStorage(todosArray);
  renderTodos(todosArray, todoListDomElement);
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function toggleTodoState(event, todosArray) {
  const checkbox = event.target;
  if (checkbox.checked === true) {
    checkbox.parentElement.classList.add("done");
    checkbox.parentElement.todo.done = true;
  } else {
    checkbox.parentElement.classList.remove("done");
    checkbox.parentElement.todo.done = false;
  }

  saveTodosToLocalStorage(todosArray);
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function forAppJs() {
  let todos = [];
  const deleteTodosButton = document.querySelector("#delete-todos");
  const addTodoBtn = document.querySelector("#add-todo");
  const todoListEl = document.querySelector("#todo-list");
  const newTodoEl = document.querySelector("#new-todo");

  initTodoApp(todos, todoListEl);

  addTodoBtn.addEventListener("click", function () {
    todos = readTodosFromLocalStorage();
    addNewTodo(newTodoEl, todos, todoListEl);
  });

  deleteTodosButton.addEventListener("click", function () {
    deleteDoneTodos(todos, todoListEl);
  });

  const todoFilterEl = document.querySelector("#todo-filter");
  todoFilterEl.addEventListener("change", function () {
    filterTodos(todoListEl);
  });

  todoListEl.addEventListener("change", function (event) {
    toggleTodoState(event, todos);
  });
}
