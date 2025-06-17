const add = document.querySelector("#add");

add.addEventListener("click", function() {
    const task = document.querySelector("#task");
    const pending = document.getElementById("pending");
    alert(task.value);
    pending.innerHTML = task + "<br>";
});

function addTask() {
    const task = document.getElementById("task").value;
    const add = document.getElementById("add");
    const pending = document.querySelector("#pending");
    
    if(task.trim() == "") {
        alert("Introduce una tarea");
    }
    else {
        pending.innerHTML += "<p>" + task + "</p>";
        task = "";
    }
}