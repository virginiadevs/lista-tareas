const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

/* --- --- * AL CARGAR LA PÁGINA * --- --- */
window.addEventListener("load", () => {
    const today = new Date();
    day.textContent = today.getDate();
    month.textContent = today.toLocaleString("es-ES", { month: "long" });
    year.textContent = today.getFullYear();

    // Comprobar si hay tareas guardadas
    showAllTasks();
});

/* --- --- * GESTIONAR TAREAS INDIVIDUALMENTE * --- --- */
const add = document.getElementById("btn-add");
add.addEventListener("click", addTask);

/* --- --- * GESTIONAR TODAS LAS TAREAS * --- --- */
const checkall = document.getElementById("btn-checkall");
checkall.addEventListener("click", checkAllTasks);

const removeall = document.getElementById("btn-removeall");
removeall.addEventListener("click", removeAllTasks);

/* ------------------------------------------------------ */

/* --- --- * FUNCIONES * --- --- */
// Mostrar tareas guardadas en localstorage
function showAllTasks() {
    const pending = document.querySelector("#pending");
    const tasks = JSON.parse(localStorage.getItem("tareas")) || [];

    tasks.forEach(task => {
        const newTask = createTask(task);
        pending.appendChild(newTask);

        if(tasks.length > 0) {
            document.querySelector(".buttons").style.display = "flex";
        }
    });
}

// Crear tareas y guardarlas en localstorage
function addTask() {
    const taskInput = document.getElementById("task-input");
    
    if(taskInput.value.trim() === "") {
        alert("Introduce una tarea");
    }
    else {
        const pending = document.querySelector("#pending");

        const data = {
            descripcion: taskInput.value,
            completada: false
        }

        const newTask = createTask(data);
        pending.appendChild(newTask);

        saveTask(data);
        document.querySelector(".buttons").style.display = "flex";
    }

    taskInput.value = "";
    taskInput.focus();
}

// Marcar/desmarcar TODAS las tareas
function checkAllTasks() {
    const allTasks = document.querySelectorAll(".new-task");
    
    if(allTasks.length) {
        const allChecked = Array.from(allTasks).every(task =>
            task.classList.contains("checked"));

        // Actualiza visualmente
        allTasks.forEach(task => {
            if(allChecked) {
                task.classList.remove("checked");
            }
            else {
                task.classList.add("checked");
            }
        });

        // Actualiza en el localstorage
        const tasks = JSON.parse(localStorage.getItem("tareas")) || [];
        if (tasks.length) {
            const updateAll = tasks.map(task => ({
                ...task,
                completada: !allChecked
            }));
            localStorage.setItem("tareas", JSON.stringify(updateAll));
        }
    }
}

// Eliminar TODAS las tareas
function removeAllTasks() {
    const allTasks = document.querySelectorAll(".new-task");
    
    if(allTasks.length) {
        allTasks.forEach(task => {
            task.remove();
        });
    }
    document.querySelector(".buttons").style.display = "none";
    document.querySelector("#pending").innerHTML = "";
    localStorage.removeItem("tareas");
}

// Crea las tareas para las funciones 'Mostrar tareas' y 'Añadir tarea'
function createTask(data) {
    const newTask = document.createElement("li");
    newTask.classList.add("new-task");

    const taskDesc = document.createElement("span");
    taskDesc.textContent = data.descripcion;

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
    removeBtn.setAttribute("aria-label", "Botón para eliminar la tarea");

    if(data.completada) {
        newTask.classList.add("checked");
    }

    // Marcar/desmarcar como completada
    newTask.addEventListener("click", (e) => {
        /*if(e.target.closest("button")) return;*/

        newTask.classList.toggle("checked");
        
        const updatedTask = {
            descripcion: taskDesc.textContent,
            completada: newTask.classList.contains("checked")
        }
        editTask(updatedTask);
    });

    // Eliminar una tarea
    removeBtn.addEventListener("click", () => {
        newTask.remove();
        deleteTask(taskDesc.textContent);
    });

    newTask.appendChild(taskDesc);
    newTask.appendChild(removeBtn);

    return newTask;
}

// Guardar tareas en localstorage - Se llama desde 'Añadir Tarea'
function saveTask(data) {
    const tasks = JSON.parse(localStorage.getItem("tareas")) || [];
    tasks.push({
        descripcion: data.descripcion,
        completada: data.completada
    });
    localStorage.setItem("tareas", JSON.stringify(tasks));
}

// Actualiza una tarea desde el eventlistener de 'Crear Tarea'
function editTask(data) {
    const tasks = JSON.parse(localStorage.getItem("tareas")) || [];

    if (tasks.length) {
        const updatedTask = tasks.map(task => {
            if(task.descripcion === data.descripcion) {
                return { ...task, completada: data.completada };
            }
            return task;
        });
        localStorage.setItem("tareas", JSON.stringify(updatedTask));
    }
}

// Elimina una tarea desde el eventlistener de 'Crear Tarea'
function deleteTask(data) {
    const tasks = JSON.parse(localStorage.getItem("tareas")) || [];
    
    if (tasks.length) {
        const newArray = tasks.filter(task => task.descripcion !== data);

        if (newArray.length === 0) {
            document.querySelector(".buttons").style.display = "none";
            localStorage.removeItem("tareas");
        }
        else {
            localStorage.setItem("tareas", JSON.stringify(newArray));
        }
    }
}