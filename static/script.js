function addTask(){
  const input=document.getElementById("taskInput")
  const taskText=input.value
  if(taskText==="") return
  const li=document.createElement("li")
  li.innerText=taskText
  document.getElementById("taskList").appendChild(li)
  input.value=""
}