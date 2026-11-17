let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    input.value = "";
    saveTasks();
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending")
            return !task.completed;

        if (currentFilter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach(task => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = () => toggleTask(task.id);

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.onclick = () => editTask(task.id);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.append(span, editBtn, deleteBtn);
        list.appendChild(li);
    });

    document.getElementById("taskCount").textContent =
        "Total Tasks: " + tasks.length +
        " | Pending: " + tasks.filter(t => !t.completed).length +
        " | Completed: " + tasks.filter(t => t.completed).length;
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    displayTasks();
}

function editTask(id) {
    let task = tasks.find(t => t.id === id);
    let newText = prompt("Edit your task:", task.text);

    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        displayTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
}

displayTasks();