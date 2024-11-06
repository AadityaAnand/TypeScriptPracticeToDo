var tasks = [];
var taskInput = document.getElementById("task-input");
var addTaskBtn = document.getElementById("add_task");
var taskList = document.getElementById("task-list");
addTaskBtn.addEventListener("click", addTask);
function addTask() {
    var title = taskInput.value.trim();
    if (title === " ")
        return;
    var newTask = {
        id: Date.now(),
        title: title,
        completed: false,
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = " ";
}
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        var taskItem = document.createElement("li");
        var taskText = document.createElement("span");
        taskText.innerText = task.title;
        taskText.contentEditable = "true";
        taskText.addEventListener("blur", function () { return editTask(task.id, taskText.innerText); });
        var deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", function () { return deleteTask(task.id); });
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    });
}
function deleteTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
}
function editTask(id, newTitle) {
    var task = tasks.find(function (task) { return task.id == id; });
    if (task) {
        task.title = newTitle;
    }
}
