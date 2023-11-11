// Varibles from file
let toggleMoon = document.getElementById('toggle-moon');
let backgroundModeDark = document.getElementById('bg-darkmode');
let backgroundModeLight = document.getElementById('bg-lightmode');
let body = document.querySelector('body')
let header = document.querySelector('h1')
let mainContainer = document.querySelector('.main-container')
let btnAdd = document.getElementById('circle-container');
let taskContainer = document.getElementById('task-container');
let taskInput = document.getElementById('add-todo');
let containerForAdding = document.querySelector('.continer-for-adding')
let containerOptions = document.querySelectorAll('.same-style')
let containerOptionsBox = document.getElementById('container-options')
let taskText = document.querySelectorAll('.task-item')
let taskCompleted = document.getElementById('task-completed-container');
let taskActive = document.getElementById('task-currently-active')
let completedTaskBtn = document.getElementById('completed')
let activeTaskBtn = document.getElementById('active')
let allTaskBtn = document.getElementById('all-task')
let optionsToClear = document.getElementById('option-to-clear')
let taskCountForDesktop = document.getElementById('task-count-for-desktop')
let OptionToClearForDesktop = document.getElementById('option-to-clear-for-desktop')


//initialize state to track the click of the toggle moon
let isDarkModeActive = false
let isDarkModeActiveforClr = null

//event listeners
header.addEventListener('click', function (e) {
    const target = e.target
    console.log(target , 'has been clicked');
    mainContainer.scrollIntoView({behavior : 'smooth'})
})


/* TODO:
- make the hover effect on the buttons when dark more is actived✅

*/

/* FIXME:
    - fix the active container
*/

//initial task count
let taskCount = 0
let taskAdded = false
let isTicked = false

btnAdd.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    //creating an elemnt container of a div 
    const task = document.createElement('div');
    //add a classname to the cotainer so that we could style it
    task.classList.add('task');
    task.setAttribute('draggable' , 'true')

    const checkBtn = document.createElement('button')
    checkBtn.innerHTML = "<img src='images/icon-check.svg' alt='icon for check button'>"
    checkBtn.classList.add('checkTask', 'border-color')
    task.appendChild(checkBtn)

    const li = document.createElement('li')
    li.innerText = `${taskInput.value}`
    li.setAttribute('class', 'task-item')
    task.appendChild(li);

    if (isDarkModeActiveforClr) {
        li.style.color = 'hsl(236, 33%, 92%)'
    }else if (isTicked) {
        li.style.color = 'intial'
    }
    else {
        li.style.color = ''
    }

    


    const deleteTask = document.createElement('button')
    deleteTask.innerHTML = "<img src='images/icon-cross.svg' alt='icon to delete' class='tick-icon'>"
    deleteTask.classList.add("deleteTask")
    task.appendChild(deleteTask);


    //events to make the delete button disappear
    li.addEventListener('mouseenter', function (e) {
        const target = e.target

        if (target.matches('li')) {
            deleteTask.style.display = 'block'; 

            // Set a timeout to hide the button after a delay of 3s
            //settimeout is a callback function with a another parameter to define the time for delay
            setTimeout(function () {
                deleteTask.style.display = 'none';
            }, 3000); 
        }
    })

    const inputValue = taskInput.value;

    if (taskInput.value === '') {
        alert('please enetr a task....')
    } else {
        li.innerText = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        //add the task to the task-container and the active container
        taskActive.appendChild(task)
        taskContainer.appendChild(task);
        taskAdded = true
        taskCount++;
        taskCountForDesktop++;
        updateTaskCount();
    }

    taskInput.value = '';

    //when the complete button is checked or clicked
    checkBtn.addEventListener('click', function () { 
        
        isTicked = true 

        // const target = e.target
        checkBtn.classList.add('btn-transition')
        checkBtn.parentElement.style.textDecoration = 'line-through'
        checkBtn.parentElement.style.textDecorationColor = 'hsl(236, 9%, 61%)'
        li.style.color = 'hsl(236, 9%, 61%)'
        checkBtn.style.background = 'linear-gradient(to right,hsl(192, 100%, 67%),hsl(280, 87%, 65%)'
        checkBtn.style.border = 'none'
        
        
        taskCount--;
        taskCountForDesktop--;
        updateTaskCount()

        // Flag the task as ticked using a data attribute
        checkBtn.parentElement.setAttribute('task-ticked', 'true'); 

        // Flag the task as completed using a data attribute
        checkBtn.parentElement.setAttribute('data-completed' , 'true')
         
    
        optionsToClear.addEventListener('click', function () {
            // const target = e.target
            if (checkBtn.parentElement.getAttribute('task-ticked') === 'true') {
                taskCompleted.appendChild(checkBtn.parentElement)
            }

        });

        OptionToClearForDesktop.addEventListener('click', function () {
            // const target = e.target
            if (checkBtn.parentElement.getAttribute('task-ticked') === 'true') {
                taskCompleted.appendChild(checkBtn.parentElement)
            }

        });

        // Remove the event listener to prevent further clicks
        checkBtn.removeEventListener('click', arguments.callee);
        
    })

    deleteTask.addEventListener('click', function (e) {
        const target = e.target
        if (checkBtn.parentElement.getAttribute('data-completed') === 'true') {
            // target.parentElement.parentElement.remove(task)

        } else {
            taskCount--;
            taskCountForDesktop--;
            updateTaskCount();
            // target.parentElement.parentElement.remove(task)
        }

        target.parentElement.parentElement.remove(task)
    })
    
});


//event listner to display the delete buttoon when hovered over a task
const selectAllTask = document.querySelectorAll('.task-item')
const deleteTaskBtn = document.querySelectorAll('.deleteTask')

for (let i = 0; i < selectAllTask.length; i++){
    
    selectAllTask[i].addEventListener('mouseenter', function () {
        if (deleteTaskBtn[i]) {
            deleteTaskBtn[i].style.display = 'block'
        }
    }) 

    selectAllTask[i].addEventListener('mouseleave', function () {
        if (deleteTaskBtn[i]) {
            deleteTaskBtn[i].style.display = 'none'
        }
    }) 
}



// Function to update the displayed task count
function updateTaskCount() {
    // Get the element where you want to display the count (e.g., an element with id 'task-count')
    const taskCountElement = document.getElementById('task-count');
    const taskCountElementForDesktop = document.getElementById('task-count-for-desktop');
    
    if (taskCountElement) {
        taskCountElement.innerText = taskCount.toString() + ' items left';
        taskCountElementForDesktop.innerText = taskCount.toString() + ' items left';
    }
}
// Call the updateTaskCount function initially to set the count to zero
updateTaskCount();


activeTaskBtn.addEventListener('click', function () { 
    taskCompleted.style.display = 'none'
    taskContainer.style.display = 'none'
    taskActive.style.display = 'block'
})

allTaskBtn.addEventListener('click', function () { 
    taskCompleted.style.display = 'none'
    taskActive.style.display = 'none'
    taskContainer.style.display = 'flex'
    
})


completedTaskBtn.addEventListener('click', function () {
    taskContainer.style.display = 'none'
    taskActive.style.display = 'none'
    taskCompleted.style.display = 'block'

    //function to make all delete buttons on the completed task to disappear
    const deletebtn = document.querySelectorAll('.deleteTask')
    for (let i = 0; i < deletebtn.length; i++){
        deletebtn[i].style.display = 'none'
    }
})





//event listner here is triggered when the image of the sun and moon is clicked
toggleMoon.addEventListener('click', function () {
    // const target = e.target
    // console.log(target, 'has been clicked');

    //we will toggle the class active when the icon is pressed
    this.classList.toggle('active')

    // we will add transition to it to make it smooothly
    toggleMoon.classList.add('toggle-transition-for-all')

    //reinitiliaze to set it to when it its false
    isDarkModeActive = true
    // isDarkModeActiveforClr = this.classList.contains('active');

    // Reset isDarkModeActiveforClr when switching to light mode
    if (!isDarkModeActive) {
        isDarkModeActiveforClr = null;
    } else {
        isDarkModeActiveforClr = this.classList.contains('active');
    }
    
    updateTextTaskColor()

    //we will declare when the which icon is pressed and make sure to display the right color and background image
    if (this.classList.contains('active')) {
        // Change to sun icon when active
        this.src = 'images/icon-sun.svg'
        backgroundModeLight.style.display = 'none'
        backgroundModeDark.style.display = 'block'
        body.style.backgroundColor = 'hsl(235, 21%, 11%)'
        containerForAdding.style.backgroundColor = 'hsl(235, 24%, 19%)'
        taskInput.style.backgroundColor = 'hsl(235, 24%, 19%)'
        taskInput.style.color = 'hsl(236, 33%, 92%)'
        taskCompleted.style.backgroundColor = 'hsl(235, 24%, 19%)'
        taskContainer.style.backgroundColor = 'hsl(235, 24%, 19%)'
        containerOptionsBox.style.backgroundColor = 'hsl(235, 24%, 19%)'
        

    } else {
        // Change to moon icon when not active
        this.src = 'images/icon-moon.svg'
        backgroundModeDark.style.display = 'none'
        backgroundModeLight.style.display = 'block'
        body.style.backgroundColor = ''
        containerForAdding.style.backgroundColor = ''
        taskInput.style.backgroundColor = ''
        taskInput.style.color = ''
        taskContainer.style.backgroundColor = ''
        taskCompleted.style.backgroundColor = ''
        containerOptionsBox.style.backgroundColor = ''  
        
    }

    // Remove the 'toggle-transition' class after a delay (0.5s)
    setTimeout(() => {
        toggleMoon.classList.remove('toggle-transition-for-all');
    }, 500);
    
})


// collecting all btn variables and storing them in an array
// Add the 'dark-mode-btn-clr' class to the elements directly
const elementsToChangeColor = [
    OptionToClearForDesktop,
    allTaskBtn,
    activeTaskBtn,
    completedTaskBtn,
    optionsToClear,
];
  
elementsToChangeColor.forEach(element => {
  element.classList.add('dark-mode-btn-clr');
});
  
let elementClicked = null; // Initialize a flag to track if an element has been clicked

// Handle click events to change color
elementsToChangeColor.forEach(element => {
    element.addEventListener('click', function (e) {
        const target = e.target
        // Reset the color for all elements
        elementsToChangeColor.forEach(el => {
          el.style.color = '';
        });

        // Set the color for the clicked element
        this.style.color = 'hsl(220, 98%, 61%)';

        //we set the elementclicked to the target 
        elementClicked = target
    });
});
  
// Handle hover effects
elementsToChangeColor.forEach(element => {
    element.addEventListener('mouseenter', function (e) {
        const target = e.target
        // Check if the element has not been clicked before applying hover effect
        //and if the darkmode is on
        if (target !== elementClicked && isDarkModeActiveforClr) {
          this.style.color = 'hsl(236, 33%, 92%)';
        }
    });

    element.addEventListener('mouseleave', function (e) {
        const target = e.target
        if (target !== elementClicked && isDarkModeActiveforClr) {
          this.style.color = '';
        }
    });
});

// Function to update text color for task items
function updateTextTaskColor() {
    const allTextTask = document.querySelectorAll('.task-item');
  
    for (let i = 0; i < allTextTask.length; i++) {
        if (isDarkModeActiveforClr ) {
            // Change to dark mode color
            allTextTask[i].style.color = 'hsl(236, 33%, 92%)';
        }
        else {
            // using the tenary operator to checked whether a task has been checked or not 
            allTextTask[i].style.color = '' // Change to the default color
        }
    }
}



//making a reorder functionality

// let isDragging = false;
// let currentItem = null;
// let containerOffetY = 0; 
// let initY = 0;


// taskContainer.style.height = 'auto'
// taskContainer.style.width = 86 + '%'


//here in this event, we detect whether the user is pressing down their mouse
//in a way that they would like to drag an item from their original positiion
// document.addEventListener('mousedown', function (e) {

//     //checkign if the item being drag is the task container
//     const target = e.target.closest('.task')

//     if (target) {
//         isDragging = true
//         currentItem = target     //stores the current item being dragged
//         currentItem.classList.add('dragging')    //adds class named dragging to the task container
//         containerOffetY = currentItem.offsetTop;
//         document.body.style.userSelect = 'none'

//         currentItem.classList.add('insert-animation')
//         currentItem.style.top = containerOffetY + 'px'
//         initY = e.clientY
//     }
    
// });



// document.addEventListener('mousemove', function (e) {
//     if (isDragging && currentItem) {

//         let newTop = containerOffetY - (initY - e.clientY)

//         currentItem.style.top = newTop + 'px'



//         let itemSiblings = [...document.querySelectorAll(".task:not(.dragging)")]
//         let nextItem = itemSiblings.find((sibling) => {
//             return (e.clientY - taskContainer.getBoundingClientRect().top <= sibling.offsetTop + sibling.offsetHeight / 2)
//         })
//     }
// });


// document.addEventListener('mouseup', function () {
//     if (currentItem) {
//         currentItem.classList.remove('dragging');
//         currentItem.style.top = 'auto';
//         currentItem = null;
//         isDragging = false;
//     }
// })













    


