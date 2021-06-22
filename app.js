//-----selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//-----event listeners
//attach an evenlistener to the dom (document or window)
//and we can check if the content on the webpage is loaded and if it is, execute the funciton.
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();

    //Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li element
    const newTodo = document.createElement('li');
    //add the input value to the innerTExt of the newTodo
    newTodo.innerText = todoInput.value;

    newTodo.classList.add('todo-item');
    //We stick the newTodo into the todoDiv 
    todoDiv.appendChild(newTodo);

    //add todo to the local storage
    saveLocalTodos(todoInput.value);

    //Create checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    //we stick the completed button into the todoDiv
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    //we stick the completed button into the todoDiv
    todoDiv.appendChild(trashButton);

    //Add the todo div to the todo list (append) 
    todoList.append(todoDiv);

    //clear todo Field
    todoInput.value = "";
};


function deleteCheck(event) {
    //check what you are clicking on
    //based on what we are clicking on, we can add functionality
    console.log(event.target);

    //grab the item you want to delete
    const item = event.target;
    //delete todo
    //if the first class of the item is equal to trash-btn
    if (item.classList[0] === 'trash-btn') {
        //get the parent element of the item
        const todo = item.parentElement;

        //animation
        todo.classList.add('fall');
        //remove the todo from the array
        removeLocalTodos(todo);

        //this will wait untill the fall animation is completed and then run the todo.remove()
        todo.addEventListener('transitionend', function () {
            //remove the item
            todo.remove();
        })

    };
    //If the first class of the item is eqal to the completed-btn
    if (item.classList[0] === 'complete-btn') {
        //get the parent element of the item
        const todo = item.parentElement;
        //toggle the class completed
        todo.classList.toggle('completed');
    };
};


function filterTodo(event) {
    //get a list of all the todolist nodes 
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {

        //based on the value it will style the elements
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                //make sure to only show the todo's that contain the class of completed
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
};


function saveLocalTodos(todo) {
    //check if there are already todo's
    let todos;
    if (localStorage.getItem('todos') === null) {
        //cretae a new array
        todos = [];
    } else {
        //if we do have todos alreayd we are getting it from local storage
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    //pushing a new todo to the todos array
    todos.push(todo);
    //setting it back into the local storage 
    localStorage.setItem('todos', JSON.stringify(todos));
};




//getting the todo's that already are saved 
function getTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        //cretae a new array
        todos = [];
    } else {
        //if we do have todos alreayd we are getting it from local storage and pushing it into todos
        todos = JSON.parse(localStorage.getItem('todos'))
    };

    todos.forEach(function (todo) {
        //Create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li element
        const newTodo = document.createElement('li');

        //WE NEED TO GET THE INFO FROM THE TODO HERE INSTEAD OF THE INPUT VALUE
        newTodo.innerText = todo;

        newTodo.classList.add('todo-item');
        //We stick the newTodo into the todoDiv 
        todoDiv.appendChild(newTodo);

        //Create checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        //we stick the completed button into the todoDiv
        todoDiv.appendChild(completedButton);

        //Create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        //we stick the completed button into the todoDiv
        todoDiv.appendChild(trashButton);

        //Add the todo div to the todo list (append) 
        todoList.append(todoDiv);
    });
};

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        //cretae a new array
        todos = [];
    } else {
        //if we do have todos alreayd we are getting it from local storage and pushing it into todos
        todos = JSON.parse(localStorage.getItem('todos'))
    };

    //get the number of the index of the thing that needs to be removed
    const todoIndex = todo.children[0].innerText;
    //use splice to remove the element that has that index
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

};