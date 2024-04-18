const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');
let tasks = [];

function renderTaskonHTML (taskTitle, done = false){
    //adicionando a nova tarefa no html
    const li = document.createElement('li'); // criando a tag li
    
    const input = document.createElement('input');
    input.setAttribute('type','checkbox');
    input.addEventListener('change', (event) =>{
        const liToToggle = event.target.parentElement
       
        const spanToToggle = liToToggle.querySelector('span')
       
        const done = event.target.checked

        if(done){
            spanToToggle.style.textDecoration = 'line-through'

        }else{
            spanToToggle.style.textDecoration = 'none'
        }
       tasks = tasks.map(t =>{
            if(t.title === spanToToggle.textContent){
                return{
                    title: t.title,
                    done: !t.done,
                }
            }

            return t
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    input.checked = done



    const span = document.createElement('span');
    span.textContent = taskTitle

    if(done){
        span.style.textDecoration = 'line-through'
    }

    const button = document.createElement('button');
    button.textContent = 'Remover'
    button.addEventListener('click', (event) =>{
        const liToRemove = event.target.parentElement
        
        const titleToRemove = liToRemove.querySelector('span').textContent

        tasks = tasks.filter(t => t.title !== titleToRemove)
        
        todoListUl.removeChild(liToRemove);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
    }); 

    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)


    todoListUl.appendChild(li);

    taskTitleInput.value = ''; // Cada vez que tiver entradas ele limpara para uma nova digitação

    
}


window.onload = () =>{
    const taskOnLocalStorage = localStorage.getItem('tasks')

    if(!taskOnLocalStorage) return

    tasks = JSON.parse(taskOnLocalStorage)

    tasks.forEach(t => {
        renderTaskonHTML(t.title, t.done);
    });
}


form.addEventListener('click', (event)=>{
    event.preventDefault(); // evita o recarregamento da pagima ao submit

    const taskTitle = taskTitleInput.value

    if(taskTitle.length < 3){
        alert("Sua tarefa precisa de pelo menos, 3 caracteres.");
        return;
    }

    tasks.push({
        title: taskTitle,
        done: false,

    }); // adicionando a nova tarefa no array
    localStorage.setItem('tasks', JSON.stringify(tasks)); 

    
    
});

