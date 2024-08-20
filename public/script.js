const inputBox = document.getElementById("input-box");
const checkboxList = document.getElementById("list");
const creationTime = moment().format('MMMM Do YYYY, h:mm:ss a');

function addTask() {
    const taskValue = inputBox.value.trim();


    if (taskValue) {
        createTicket(taskValue, creationTime);
        inputBox.value = '';
        saveTask();
    } else {
        alert("Write something!");
        return;
    }
}

function createTicket(info, creationTime) {
    // create a new list item
    let li = document.createElement('li');
    li.className = 'flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200';

    // create a checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'custom-checkbox';

    // create a text label
    let label = document.createElement('label');
    label.className = 'ml-3 text-lg text-gray-900';
    label.contentEditable = 'true';
    label.textContent = info;

    label.addEventListener('input', function () {
        saveTask();
    })

    // create a timestamp element
    let timestamp = document.createElement('span');
    timestamp.className = 'ml-3 text-sm text-black-500';
    timestamp.textContent = `Created at: ${creationTime}`;

    // create a remove icon
    let removeIcon = document.createElement('span');
    removeIcon.innerHTML = '&times;';
    removeIcon.className = 'ml-auto cursor-pointer text-black text-2xl hover:text-red-700 font-bold';
    removeIcon.addEventListener('click', function () {
        li.remove();
        saveTask();
    });

    // append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(timestamp);
    li.appendChild(removeIcon);

    // append the list item to the list
    checkboxList.appendChild(li);
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

    // only create a default task if there isn't any task in the array
    if (tasks.length === 0) {
        createTicket("Default Task", moment().format('MMMM Do YYYY, h:mm:ss a'));
    }
}

// load saved tasks when page loads
loadTasks();

inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

checkboxList.addEventListener("click", function (e) {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        e.target.parentElement.classList.toggle("checked");
        const label = e.target.nextElement;
        if (label) {
            label.classList.toggle("line-through");
            label.classList.toggle("text-gray-500");
        }
    }
});


function eraseAllTasks() {
    checkboxList.innerHTML = "";
    localStorage.removeItem('tasks');
}

function updateTime() {
    const timeDisplay = document.getElementById('time-display');
    timeDisplay.textContent = moment().format('MMMM Do YYYY, h:mm:ss a');
}

// update the time every second
setInterval(updateTime, 1000);

// initial call to display time immediately
updateTime();
