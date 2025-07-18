const inp = document.querySelector('.task');
const btn = document.querySelector('.btn');
const lis = document.querySelector('.task-list');
const error = document.querySelector('.error-message');
const remove = document.querySelector('.remove');
const remtext = document.querySelector('.rem');

let a = [];

if (localStorage.getItem("tasks")) {
    a = JSON.parse(localStorage.getItem("tasks"));
    a.forEach(task => {
        createTaskUI(task);
    });
}

function createTaskUI(task) {
    const newdiv = document.createElement('div');
    const newtask = document.createElement('input');
    newtask.type = 'checkbox';
    newtask.classList.add('new');

    const lab = document.createElement('label');
    lab.textContent = task;
    lab.classList.add('lab');

    newdiv.classList.add('task-item');
    newdiv.appendChild(newtask);
    newdiv.appendChild(lab);
    lis.appendChild(newdiv);
}

function createTask(task) {
    createTaskUI(task);
    a.push(task);
    localStorage.setItem("tasks", JSON.stringify(a));
    inp.value = '';
    error.innerHTML = '';
}

btn.addEventListener('click', function () {
    remtext.innerHTML = '';
    if (a.includes(inp.value.trim())) {
        error.innerHTML = "Task Already added to List";
    } else if (inp.value.trim() !== '') {
        createTask(inp.value.trim());
    } else {
        error.innerHTML = "Please enter a valid task!!!";
    }
});

remove.addEventListener('click', function () {
    const ev = document.querySelectorAll('.new');
    let count = 0;
    ev.forEach(function (e) {
        if (e.checked) {
            const taskLabel = e.nextSibling.textContent;
            a = a.filter(item => item !== taskLabel);
            lis.removeChild(e.parentElement);
            count++;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(a));
    remtext.textContent = `Number of items removed: ${count}`;
});
