async function addTask() {
const input = document.getElementById("taskInput")
const taskText = input.value
if(taskText === "") return
await fetch("/api/tasks",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({task:taskText})
})
loadTasks()

input.value=""
}


async function loadTasks(){

const response = await fetch("/api/tasks")
const tasks = await response.json()

const list = document.getElementById("taskList")

list.innerHTML = ""

tasks.forEach(task => {

const li = document.createElement("li")

// checkbox
const checkbox = document.createElement("input")
checkbox.type = "checkbox"
checkbox.checked = task.completed

checkbox.onclick = async () => {

await fetch(`/api/tasks/${task.id}/toggle`,{
method:"PUT"
})

loadTasks()

}

// task text
const span = document.createElement("span")
span.innerText = task.task

if(task.completed){
span.style.textDecoration = "line-through"
}

// edit button
const editBtn = document.createElement("button")
editBtn.innerText = "Edit"

// delete button
const deleteBtn = document.createElement("button")
deleteBtn.innerText = "Delete"

li.appendChild(checkbox)
li.appendChild(span)
li.appendChild(editBtn)
li.appendChild(deleteBtn)

list.appendChild(li)

})

}
window.onload = loadTasks


async function deleteTask(id){

await fetch(`/api/tasks/${id}`,{
method:"DELETE"
})

loadTasks()

}



async function editTask(task){

const newText = prompt("Edit task:", task.task)

if(newText === null || newText.trim() === "") return

await fetch(`/api/tasks/${task.id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({task:newText})
})

loadTasks()

}