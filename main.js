const list_element = document.getElementById("list");
const create_button_element = document.getElementById("create");

let todo = [];

create_button_element.addEventListener('click', CreateNewTodo);

function CreateNewTodo () {
    console.log("Create New Todo")
}