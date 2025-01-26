const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "10px";
    checkbox.checked = task.completed;
    li.prepend(checkbox);

    if (task.completed) {
      li.classList.add("completed");
    }

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", () => {
      deleteTask(index);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText);
    saveTasks();
    renderTasks();
    taskInput.value = "";
    // const li = document.createElement("li");
    // li.textContent = taskText;
    // const deleteBtn = document.createElement("button");
    // deleteBtn.textContent = "Delete";
    // deleteBtn.style.marginLeft = "10px";
    // deleteBtn.addEventListener("click", () => {
    //   li.remove();
    // });
    // li.appendChild(deleteBtn);
    // taskList.appendChild(li);
    // taskInput.value = "";
  }
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

loadTasks();
renderTasks();
