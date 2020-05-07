const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function filterFn(toDo) {
    return toDo.id === 1;
}

function deleteToDo(event) {
const btn = event.target;
const li = btn.parentNode;
toDoList.removeChild(li);
const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
});
toDos = cleanToDos;
saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.style = "padding-right:10px;padding-left:10px;padding-top:3px;padding-bottom:3px;margin-bottom:7px;margin-right:20px;";
    delBtn.innerText = "X";
    delBtn.className = "btn btn-danger";
    delBtn.addEventListener("click", deleteToDo)
    span.style = "line-height:50px;";
    span.innerText = text;
    span.className = "h3 text-white";
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id  : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();