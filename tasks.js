let tasks = JSON.parse(window.localStorage.getItem('tasks')) ?? {};
let completedTasks = Number(window.localStorage.getItem('completedTasks')) ?? 0;

reloadTasks();

function reloadTasks() {
  let taskNode = document.querySelector('#tasks');
  let completedNode = document.querySelector('#completed-tasks')
  taskNode.innerHTML = '';
  tasks = JSON.parse(window.localStorage.getItem('tasks')) ?? {};
  for (const name in tasks) {
    let task = tasks[name];
    let taskHTML = `
    <div id="${name}" class="task">
      <button onclick="removeTask('${name}')">Complete</button>
      <p class="task-title">${name}</p>
      <p class="task-details">${task['description']}</p>
      <p class="task-date">Complete by: ${task['date']}</p>
      <p class="task-time">Complete in: ${task['time']}</p>
    </div>
    `;
    console.log(taskHTML);
    console.log(taskNode);
    taskNode.insertAdjacentHTML('afterbegin', taskHTML);
  }
  completedNode.innerHTML = 'Completed tasks: ' + completedTasks;
}

function createTask() {
  let taskName = window.prompt("Enter a task name:");
  if (taskName == null) { return; }
  let taskDescription = window.prompt("Enter description:");
  if (taskName == null) { return; }
  let taskDate = window.prompt("Enter the task deadline:");
  if (taskName == null) { return; }
  let taskTime = window.prompt("Enter completion time:");
  if (taskName == null) { return; }
  tasks[taskName] = {
    "description": taskDescription,
    "date": taskDate,
    "time": taskTime
  };
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
  
  reloadTasks();
}

function removeTasks() {
  window.localStorage.removeItem('tasks');
  tasks = {};
  reloadTasks();
}

function removeTask(taskName) {
  document.getElementById(taskName).remove();
  delete tasks[taskName];
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
  completedTasks++;
  window.localStorage.setItem('completedTasks', String(completedTasks));
  reloadTasks();
}