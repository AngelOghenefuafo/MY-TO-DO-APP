const list_element = document.getElementById("list");
const create_button_element = document.getElementById("create");

let todo = [];

create_button_element.addEventListener('click', CreateNewTodo);

function CreateNewTodo () {
    const item = {
        id: new Date().getTime(''),
        text: "",
        complete: false
    }
    todo.unshift(item);

    const {item_element, input_element } = CreateTodoElement(item);

    list_element.prepend(item_element);

    input_element.removeAttribute("disabled");
    input_element.focus();


    Save();
}
/*<div class="item">
        <input type="checkbox" />
        <input type="text" value="list goes here" disabled />

        <div class="actions">
            <button class="material-icons">edit</button>
            <button class="material-icons remove-button">remove_circle</button>
        </div>
</div> */


function CreateTodoElement(item) {
    const item_element = document.createElement("div");
    item_element.classList.add("item");


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        item_element.classList.add("complete");
    } else {
        item_element.classList.remove("complete"); 
    }

    const input_element = document.createElement("input");
    input_element.type = "text";
    input_element.value = item.text;
    input_element.setAttribute("disabled", "");


    const actions_element = document.createElement("div");
    actions_element.classList.add("actions");

    const edit_button_element = document.createElement("button");
    edit_button_element.classList.add("material-icons");
    edit_button_element.innerText = "edit";

    const remove_button_element = document.createElement("button");
    remove_button_element.classList.add("material-icons", "remove-button");
    remove_button_element.innerText = "remove_circle";

    actions_element.append(edit_button_element);
    actions_element.append(remove_button_element);

    item_element.append(checkbox);
    item_element.append(input_element);
    item_element.append(actions_element);

    //SCENARIO
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            item_element.classList.add("complete");
        } else {
            item_element.classList.remove("complete");
        }

        Save();
    });

    input_element.addEventListener("input", () => {
        item.text = input_element.value;
    });

    input_element.addEventListener("blur", () => {
        input_element.setAttribute("disabled", "");
        Save();
    });

    edit_button_element.addEventListener("click", () => {
        input_element.removeAttribute("disabled");
        input_element.focus();
    });

    remove_button_element.addEventListener("click", () => {
        //filters out anything with the item.id
        todo = todo.filter(t => t.id != item.id);

        item_element.remove();

        Save();
    });

    return {item_element, input_element, edit_button_element, remove_button_element }
}

function DisplayTodo() {
    Load();

   for (let j = 0; j < todo.length; j++) {
        const item = todo[j];

        const { item_element } = CreateTodoElement(item);

        list_element.append(item_element);
   }
}

DisplayTodo();

function Save() {
    //SAVE TODOS
    const save = JSON.stringify(todo);

    localStorage.setItem("my_tasks", save);
}

function Load() {
    const data = localStorage.getItem("my_tasks");

    if (data) {
        todo = JSON.parse(data);
    }
}
