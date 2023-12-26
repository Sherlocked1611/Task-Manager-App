let tasks = []

function addTask(title, description, dueDate) {
    const task = {
        title,
        description,
        dueDate
    };
    tasks.push(task);
    renderTaskList();
    saveTasksToLocal();
    console.log("New task added:", task);
}

function saveTasksToLocal()
{
    localStorage.setItem('tassks', JSON.stringify(tasks))
}

function renderTaskList() {
    const taskListContainer = document.getElementById('task-list');
    taskListContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
            <strong>${task.title}</strong> - ${task.description} - Due: ${task.dueDate} 
            <button onclick="showTaskDetailsModal(${index})">Details</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskListContainer.appendChild(taskElement);
    });
}



function deleteTask(index)
{
    tasks.splice(index, 1)
    renderTaskList();

}


function showTaskDetailsModal(index) {
    const modal = document.getElementById('task-details-modal');
    const titleElement = document.getElementById('modal-task-title');
    const descriptionElement = document.getElementById('modal-task-description');
    const dueDateElement = document.getElementById('modal-task-due-date');

    const task = tasks[index];
    titleElement.textContent = task.title;
    descriptionElement.textContent = `Description: ${task.description}`;
    dueDateElement.textContent = `Due Date: ${task.dueDate}`;

    modal.style.display = 'block';
}

function closeTaskDetailsModal() {
    const modal = document.getElementById('task-details-modal');
    modal.style.display = 'none';
}

function loadTasksFromLocal()
{
    const storedTasks = localStorage.getItem('tasks')

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTaskList();
    }
}



// app.js

document.addEventListener('DOMContentLoaded', function () {

    loadTasksFromLocal();
    const addTaskForm = document.getElementById('add-task-form');

    addTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;

        addTask(title, description, dueDate);

        // Clear the form
        addTaskForm.reset();
    });
});
