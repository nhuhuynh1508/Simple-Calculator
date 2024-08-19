const inputBox = document.getElementById("input-box");
const checkboxList = document.getElementById("list");

function addTask() {
    const taskValue = inputBox.value.trim();

    if (taskValue === '') {
        alert("Write something!");
        return;
    }

    // Get the current time using Moment.js
    const creationTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    // Create a new list item
    let li = document.createElement('li');
    li.className = 'flex items-center font-nunito bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200';

    // Create a checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'custom-checkbox';

    // Create a label
    let label = document.createElement('label');
    label.className = 'ml-3 text-lg text-gray-900';
    label.textContent = taskValue;

    // Create a timestamp element
    let timestamp = document.createElement('span');
    timestamp.className = 'ml-3 text-sm text-black-500';
    timestamp.textContent = `Created at: ${creationTime}`;

    // Create a remove icon
    let removeIcon = document.createElement('span');
    removeIcon.innerHTML = '&times;';
    removeIcon.className = 'ml-auto cursor-pointer text-black text-lg hover:text-red-700 font-bold';
    removeIcon.style.fontSize = '1.25rem';
    removeIcon.addEventListener('click', function () {
        li.remove();
    });

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(timestamp);
    li.appendChild(removeIcon);

    // Append the list item to the list
    checkboxList.appendChild(li);

    // Clear the input field
    inputBox.value = '';
}

inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
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

function saveData() {
    localStorage.setItem("data", checkboxList.innerHTML);
}

function showTask() {
    checkboxList.innerHTML = localStorage.getItem("data");
}
showTask();


