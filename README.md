# Ex03 To-Do List using JavaScript
## Date:17/11/2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM
index.html
```c
<!DOCTYPE html>
<html>
<head>
    <title>Todo Application</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <h1>My Todo List</h1>
        <p>Organize your daily tasks</p>

        <div class="input-area">
            <input type="text" id="taskInput" placeholder="Enter your task">
            <button onclick="addTask()">Add Task</button>
        </div>

        <div class="filters">
            <button onclick="filterTasks('all')">All</button>
            <button onclick="filterTasks('pending')">Pending</button>
            <button onclick="filterTasks('completed')">Completed</button>
        </div>

        <h3 id="taskCount">Total Tasks: 0</h3>

        <ul id="taskList"></ul>

        <button class="clear" onclick="clearCompleted()">
            Clear Completed
        </button>
    </div>

    <footer>
        Name: Kaviya R | Register No: 212225040179
    </footer>

    <script src="script.js"></script>
</body>
</html>
```
style.css
```c
body {
    font-family: Arial, sans-serif;
    background: #eaf0ff;
    margin: 0;
    padding: 0;
}

.container {
    width: 400px;
    margin: 60px auto;
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px #aaa;
}

h1 {
    text-align: center;
    color: #34495e;
}

p {
    text-align: center;
    color: gray;
}

.input-area {
    display: flex;
    gap: 8px;
}

input {
    flex: 1;
    padding: 10px;
    border: 1px solid #aaa;
    border-radius: 5px;
}

button {
    padding: 10px;
    background: #5271ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: #344fc4;
}

.filters {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
}

ul {
    padding: 0;
    list-style: none;
}

li {
    background: #f1f3f8;
    padding: 12px;
    margin: 8px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.delete {
    background: #e74c3c;
}

.edit {
    background: #27ae60;
}

.clear {
    width: 100%;
    margin-top: 10px;
    background: #2225e6;
}

footer {
    text-align: center;
    padding: 20px;
    color: #34495e;
}
```
script.js
```c
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
```

## OUTPUT

![alt text](<Screenshot 2026-11-17 154020.png>)

## RESULT
The program for creating To-do list using JavaScript is executed successfully.
