const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function updateUI() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "done" : ""}`;

    li.innerHTML = `
            <div style="display: flex; gap: 12px; align-items: center;">
                <input type="checkbox" ${task.completed ? "checked" : ""} 
                       onchange="toggleTask(${index})">
                <span>${task.text}</span>
            </div>
            <button class="delete-btn" onclick="removeTask(${index})">Delete</button>
        `;
    taskList.appendChild(li);
  });

  const pending = tasks.filter((t) => !t.completed).length;
  taskCount.innerText = `${pending} tasks left`;
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateUI();
  }
});

window.toggleTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateUI();
};

window.removeTask = (index) => {
  tasks.splice(index, 1);
  updateUI();
};

// Initial load
updateUI();