// Select elements
const taskInput = document.getElementById('task-input');
const taskDueDate = document.getElementById('task-due-date');
const taskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const dueDate = taskDueDate.value;
    const priority = taskPriority.value;

    if (taskText !== '') {
        addTask(taskText, dueDate, priority);
        taskInput.value = '';
        taskDueDate.value = '';
        taskPriority.value = 'Low';
    }
});

// Function to add a task
function addTask(text, dueDate, priority) {
    // Create task element
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');

    const taskInputField = document.createElement('input');
    taskInputField.type = 'text';
    taskInputField.value = text;
    taskInputField.disabled = true;
    taskInputField.classList.add('task-text');

    const priorityBadge = document.createElement('span');
    priorityBadge.textContent = priority;
    priorityBadge.classList.add('task-priority', `priority-${priority.toLowerCase()}`);

    taskDetails.appendChild(taskInputField);
    taskDetails.appendChild(priorityBadge);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => editTask(taskItem, taskInputField));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        updateLocalStorage();
    });

    taskItem.appendChild(taskDetails);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    
    taskList.appendChild(taskItem);
    updateLocalStorage();
}

// Function to edit a task
function editTask(taskItem, taskInputField) {
    if (taskInputField.disabled) {
        taskInputField.disabled = false;
        taskInputField.focus();
        taskItem.querySelector('.edit-btn').textContent = 'Save';
    } else {
        taskInputField.disabled = true;
        taskItem.querySelector('.edit-btn').textContent = 'Edit';
        updateLocalStorage();
    }
}

// Function to update local storage
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text').value;
        const priority = taskItem.querySelector('.task-priority').textContent;
        tasks.push({ text: taskText, priority: priority });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, '', task.priority));
}
