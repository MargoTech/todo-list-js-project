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

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    taskInput.value = "";
  }
});
