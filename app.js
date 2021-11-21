const form = document.querySelector('.input-container');
const input = document.getElementById('input');
const grocery = document.querySelector('.grocery');
const groceryList = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
const btnSubmit = document.querySelector('.submit-btn');
//edit option
let editElement;
let editFlag = false;
let editId = "";

// ***********event listener**********
//clear button
clearBtn.addEventListener("click", ClearItem);
//submit form
form.addEventListener("submit", AddItem);

//load window
window.addEventListener("DOMContentLoaded", setUpItems)
//************function******** */
function AddItem(e){
    e.preventDefault();
    const inputValue = input.value;
    const id = new Date().getTime().toString();
    if(inputValue !=="" && !editFlag){
        const elememt = document.createElement('article');
        // console.log(elememt)
        let attr = document.createAttribute("data-id");
        attr.value = id;
        elememt.setAttributeNode(attr);

        elememt.classList.add("grocery-container");
        elememt.innerHTML = `<p class="name">${inputValue}</p>
        <div class="btn-control">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit "></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash "></i>
            </button>
        </div>`
        const deleteBtn = elememt.querySelector('.delete-btn');
        deleteBtn.addEventListener("click", DeleteItem);
        const editBtn = elememt.querySelector('.edit-btn');
        editBtn.addEventListener("click", EditItem);

        //add item into father's class
        groceryList.appendChild(elememt);

        grocery.classList.add('show-grocery');

        addToLocalStorage(id, inputValue)
        SetDefault();
    }else if(inputValue !=="" && editFlag){
        editElement.innerHTML = inputValue;
        editLocalStorage(inputValue, editId);
        SetDefault();
    }else{
        console.log('empty item')
    }   
}

//set default
function SetDefault(){
    input.value = "";
    let editFlag = false;
    let editId = "";
    btnSubmit.textContent = 'submit';
}

//delete
function DeleteItem(e){
    const elememt = e.currentTarget.parentElement.parentElement;
    const id = elememt.dataset.id;
    groceryList.removeChild(elememt)
    if(groceryList.children.length === 0){
        grocery.classList.remove('show-grocery')
    }
    removeFromLocalStorage(id);
    SetDefault();
}
//edit
function EditItem(e){
    const elememt = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    input.value = editElement.innerHTML;
    editFlag = true;
    editId = elememt.dataset.id;
    
    btnSubmit.textContent = 'edit';
}
//clear
function ClearItem(){
    const allItem = document.querySelectorAll('.grocery-container');
    if(allItem.length > 0){
        allItem.forEach(function(item){
            groceryList.removeChild(item);
        })
        grocery.classList.remove('show-grocery');
        localStorage.removeItem('list');
        SetDefault();

    }
}

// local Storage 

function addToLocalStorage(id, value){
    const groceryItem ={id , value}; 
    let items = getlocalStorage();
    items.push(groceryItem)
    localStorage.setItem('list', JSON.stringify(items))
}

function getlocalStorage(){
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

function removeFromLocalStorage(id){
    let items = getlocalStorage();

    items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    })
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(value,id){
    let items = getlocalStorage();
    items = items.map(function(item) {
        if(item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));

}

function setUpItems(value,id){
    const items = getlocalStorage();
    if(items.length > 0){
        items.forEach(function(item) {
            createClassList(item.id, item.value);
        });
    }
    grocery.classList.add('show-grocery');
}

function createClassList(id, value){
    const elememt = document.createElement('article');
    // console.log(elememt)
    let attr = document.createAttribute("data-id");
    attr.value = id;
    elememt.setAttributeNode(attr);

    elememt.classList.add("grocery-container");
    elememt.innerHTML = `<p class="name">${value}</p>
    <div class="btn-control">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit "></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash "></i>
        </button>
    </div>`
    const deleteBtn = elememt.querySelector('.delete-btn');
    deleteBtn.addEventListener("click", DeleteItem);
    const editBtn = elememt.querySelector('.edit-btn');
    editBtn.addEventListener("click", EditItem);

    //add item into father's class
    groceryList.appendChild(elememt);
}