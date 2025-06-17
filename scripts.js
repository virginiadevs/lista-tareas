/* --- --- * MOSTRAR FECHA * --- --- */
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const week = document.getElementById("week");

window.addEventListener("load", () => {
    const today = new Date();
    day.textContent = today.getDate();
    month.textContent = today.toLocaleString("es-ES", { month: "long" });
    year.textContent = today.getFullYear();
    week.textContent = today.toLocaleString("es-ES", { weekday: "long" });
});

/* --- --- * GESTIONAR TAREAS INDIVIDUALMENTE * --- --- */
const add = document.getElementById("btn-add");
add.addEventListener("click", addTask);

/* --- --- * GESTIONAR TODAS LAS TAREAS * --- --- */
const checkall = document.getElementById("btn-checkall");
checkall.addEventListener("click", checkAllTasks);

const removeall = document.getElementById("btn-removeall");
removeall.addEventListener("click", removeAllTasks);


/* --- --- * FUNCIONES * --- --- */
function addTask() {
    const taskInput = document.getElementById("task-input");
    
    if(taskInput.value.trim() == "") {
        alert("Introduce una tarea");
    }
    else {
        // Añadir una tarea
        const pending = document.querySelector("#pending");

        const newTask = document.createElement("li");
        newTask.classList.add("new-task");

        const task = document.createElement("span");
        task.textContent = taskInput.value;

        const remove = document.createElement("button");
        remove.innerHTML = "<i class='fa-solid fa-trash-can'></i>";

        newTask.appendChild(task);
        newTask.appendChild(remove);
        pending.appendChild(newTask);

        // Marcar como completada
        newTask.addEventListener("click", function() {
            newTask.classList.toggle("checked");
        });

        // Eliminar una tarea
        const eliminar = document.querySelectorAll(".new-task button");
                
        eliminar.forEach(btn => {
            btn.addEventListener("click", () => {
                btn.parentElement.remove();
            });
        });
    }

    taskInput.value = "";
    taskInput.focus();
    document.querySelector(".buttons").style.display = "flex";
}

// Marcar/desmarcar TODAS las tareas
function checkAllTasks() {
    const allTasks = document.querySelectorAll(".new-task");
    
    if(allTasks.length !=0) {
        allTasks.forEach(task => {
            task.classList.toggle("checked");
            // no hacer con toggle
            // si hay mas marcados -> desmarcar todos
            // si ha mas no-marcados -> marcar todos
        });
    }
}

// Eliminar TODAS las tareas
function removeAllTasks() {
    const allTasks = document.querySelectorAll(".new-task");
    
    if(allTasks.length !=0) {
        allTasks.forEach(task => {
            task.remove();
        });
    }
    
    document.querySelector(".buttons").style.display = "none";
}