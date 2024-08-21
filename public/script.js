const inputBox = document.getElementById("input-box");
const checkboxList = document.getElementById("list");
const creationTime = moment().format('MMMM Do YYYY, h:mm:ss a');

function addTask() {
    const taskValue = inputBox.value.trim();

    if (taskValue) {
        inputBox.value = '';
        saveTask();
    } else {
        alert("Write something!");
        return;
    }

    createTicket(taskValue, creationTime);
}

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

    // Create a timestamp element
    let timestamp = document.createElement('span');
    timestamp.className = 'ml-6 text-sm text-black-500 block';
    timestamp.textContent = `Created at: ${creationTime}`;

    // Append the timestamp to the list item, after the div
    li.appendChild(timestamp);

    // Append the list item to the list
    checkboxList.appendChild(li);
}

function eraseAllTasks() {
    checkboxList.innerHTML = "";
    localStorage.removeItem('tasks');
}

function saveTask() {
    let tasks = [];
    checkboxList.querySelectorAll('li').forEach((li) => {
        const label = li.querySelector('label');
        if (label) {
            tasks.push(label.textContent.trim());
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTicket(task, moment().format('MMMM Do YYYY, h:mm:ss a'));
    });
}

// Create default tasks
createTicket("Default Task", moment().format('MMMM Do YYYY, h:mm:ss a'));

// Load saved tasks when page loads
loadTasks();

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
