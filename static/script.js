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

li.innerText = task.task


const deleteBtn = document.createElement("button")

deleteBtn.innerText = "Delete"

deleteBtn.onclick = () => deleteTask(task.id)


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