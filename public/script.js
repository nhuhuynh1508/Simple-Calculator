const inputBox = document.getElementById("input-box");
const checkboxList = document.getElementById("list");

// Function to add a task
function addTask() {
    const taskValue = inputBox.value.trim();
    const creationTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    if (taskValue) {
        createTicket(taskValue, creationTime);
        saveTask();
        inputBox.value = '';
    } else {
        alert("Write something!");
        return;
    }
}

// Function to create a task item
function createTicket(info, creationTime) {
    // Create a new list item
    let li = document.createElement('li');
    li.className = 'bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200';

    // Create a div to hold the checkbox, label, and remove icon
    let div = document.createElement('div');
    div.className = 'flex items-center';

    // Create a checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'custom-checkbox';

    // Create a text label
    let label = document.createElement('label');
    label.className = 'ml-3 text-lg text-gray-900';
    label.contentEditable = 'true';
    label.textContent = info;

    // Create a remove icon
    let removeIcon = document.createElement('span');
    removeIcon.innerHTML = '&times;';
    removeIcon.className = 'ml-auto cursor-pointer text-black text-2xl hover:text-red-700 font-bold remove-task';
    removeIcon.addEventListener('click', function () {
        li.remove();
        saveTask(); // Update storage after removal
    });

    // Append checkbox, label, and remove icon to the div
    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(removeIcon);

    // Append the div to the list item
    li.appendChild(div);

    // Create a timestamp element with a unique class
    let timestamp = document.createElement('span');
    timestamp.className = 'ml-6 text-sm text-black-500 block task-timestamp';
    timestamp.textContent = `Created at: ${creationTime}`;

    // Append the timestamp to the list item, after the div
    li.appendChild(timestamp);

    // Append the list item to the list
    checkboxList.appendChild(li);
}

// Function to erase all tasks
function eraseAllTasks() {
    checkboxList.innerHTML = "";
    localStorage.removeItem('tasks');
}

// Function to save tasks to local storage
function saveTask() {
    let tasks = [];
    checkboxList.querySelectorAll('li').forEach((li) => {
        const label = li.querySelector('label');
        const timestamp = li.querySelector('.task-timestamp');
        if (label && timestamp) {
            tasks.push({
                label: label.textContent.trim(),
                timestamp: timestamp.textContent.replace('Created at: ', '').trim()
            });
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTicket(task.label, task.timestamp);
    });
}

// Load saved tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

checkboxList.addEventListener("click", function (e) {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        e.target.parentElement.classList.toggle("checked");
        const label = e.target.nextElementSibling;
        if (label) {
            label.classList.toggle("line-through");
            label.classList.toggle("text-gray-500");
        }
    }
});

function updateTime() {
    const timeDisplay = document.getElementById('time-display');
    timeDisplay.textContent = moment().format('MMMM Do YYYY, h:mm:ss a');
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to display time immediately
updateTime();
