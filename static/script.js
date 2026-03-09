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
list.innerHTML=""
tasks.forEach(task => {

const li = document.createElement("li")

const taskText = document.createElement("span")

taskText.innerText = task.task


const editBtn = document.createElement("button")

editBtn.innerText = "Edit"


const deleteBtn = document.createElement("button")

deleteBtn.innerText = "Delete"

deleteBtn.onclick = () => deleteTask(task.id)


li.appendChild(taskText)

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