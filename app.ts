interface Task{
    id: number;
    title:string;
    completed: boolean;
}

let tasks: Task[] = [];

const taskInput = document.getElementById("task-input") as HTMLInputElement;
const addTaskBtn = document.getElementById("add_task") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;

addTaskBtn.addEventListener("click", addTask);

function addTask(): void{
    const title = taskInput.value.trim();
    if (title === " ") return;
    const newTask: Task = {
        id: Date.now(),
        title: title,
        completed: false, 
    };

    tasks.push(newTask);
    renderTasks();
    taskInput.value = " ";
}

function renderTasks(): void{
    taskList.innerHTML ="";
    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.innerText = task.title;
        taskText.contentEditable = "true";
        taskText.addEventListener("blur", ()=> editTask(task.id, taskText.innerText));
        
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", ()=> deleteTask(task.id));
        
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

    });
}

function deleteTask(id:number): void{
    tasks = tasks.filter((task) => task.id!==id);
    renderTasks();
}

function editTask(id:number, newTitle:string): void{
    const task = tasks.find((task)=> task.id==id);
    if (task){
        task.title = newTitle;
    }
}
