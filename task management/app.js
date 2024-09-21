document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const taskCategory = document.getElementById("task-category");
    
    const showAllTasksButton = document.getElementById("show-all-tasks");
    const showPersonalTasksButton = document.getElementById("show-personal-tasks");
    const showWorkTasksButton = document.getElementById("show-work-tasks");
  
    const allTaskCount = document.getElementById("all-task-count");
    const personalTaskCount = document.getElementById("personal-task-count");
    const workTaskCount = document.getElementById("work-task-count");
    const totalTaskCount = document.getElementById("total-task-count");
  
    let tasks = [];
  
   
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️"; // Update button text for light mode
    }
  
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️"; 
        localStorage.setItem("theme", "dark"); 
      } else {
        darkModeToggle.textContent = "🌙"; 
        localStorage.setItem("theme", "light"); 
      }
    });
  
   
    addTaskButton.addEventListener("click", () => {
      const taskName = taskInput.value;
      const category = taskCategory.value;
      if (taskName) {
        const taskItem = {
          name: taskName,
          category: category,
        };
        tasks.push(taskItem);
        renderTasks();
        updateTaskCounts();
        taskInput.value = "";
      }
    });
  
  
    function renderTasks(filter = "all") {
      taskList.innerHTML = ""; 
      const filteredTasks = tasks.filter(task => filter === "all" || task.category === filter);
  
      filteredTasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
          <span>${task.name} (${task.category})</span>
          <div>
            <button class="delete-task">❌</button>
          </div>
        `;
  
        taskList.appendChild(taskElement);
  
        taskElement.querySelector(".delete-task").addEventListener("click", () => {
          tasks = tasks.filter(t => t.name !== task.name);
          renderTasks(filter);
          updateTaskCounts();
        });
      });
    }
  
   
    function updateTaskCounts() {
      const totalTasks = tasks.length;
      const personalTasks = tasks.filter(task => task.category === "personal").length;
      const workTasks = tasks.filter(task => task.category === "work").length;
  
      allTaskCount.textContent = totalTasks;
      personalTaskCount.textContent = personalTasks;
      workTaskCount.textContent = workTasks;
      totalTaskCount.textContent = totalTasks;
    }
  
    
    function openFilteredTasksWindow(filter) {
      let categoryHeader;
      
     
      if (filter === "all") {
        categoryHeader = "All Tasks";
      } else if (filter === "personal") {
        categoryHeader = "Personal Tasks";
      } else if (filter === "work") {
        categoryHeader = "Work Tasks";
      }
  
     
      const newWindow = window.open("", "_blank");
  
      
      newWindow.document.write(`
        <html>
        <head>
          <title>${categoryHeader}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
              background-color: #f9f9f9;
              color: #333;
            }
            h1 {
              color: #4CAF50;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              padding: 10px;
              margin: 5px 0;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <h1>${categoryHeader}</h1>
          <ul id="task-list"></ul>
        </body>
        </html>
      `);
  
      const taskListInNewWindow = newWindow.document.getElementById("task-list");
  
      
      const filteredTasks = tasks.filter(task => filter === "all" || task.category === filter);
  
      filteredTasks.forEach(task => {
        const taskElement = newWindow.document.createElement("li");
        taskElement.textContent = `${task.name} (${task.category})`;
        taskListInNewWindow.appendChild(taskElement);
      });
    }
  
   
    showAllTasksButton.addEventListener("click", () => {
      openFilteredTasksWindow("all");
    });
  
    showPersonalTasksButton.addEventListener("click", () => {
      openFilteredTasksWindow("personal");
    });
  
    showWorkTasksButton.addEventListener("click", () => {
      openFilteredTasksWindow("work");
    });
  });
  
