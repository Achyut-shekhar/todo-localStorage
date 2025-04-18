const todoInput = document.getElementById("todo-input");
const addtask = document.getElementById("add-task-btn");
const todolist = document.getElementById("todo-list");

// Load tasks from localStorage on page load, or an empty array if none exist
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks from localStorage when the page loads
tasks.forEach((task) => rendertask(task));

addtask.addEventListener("click", () => {
  const tasktext = todoInput.value.trim();
  if (tasktext === "") return;

  const newtask = {
    id: Date.now(),
    text: tasktext,
    completed: false,
  };

  tasks.push(newtask);
  todoInput.value = ""; // Clear input field
  console.log(tasks);

  rendertask(newtask); // Call the function to render the new task
});

function rendertask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);

  // ✨ Tailwind styles for translucent task card
  li.className =
    "flex justify-between items-center bg-white bg-opacity-70 px-4 py-3 rounded-md shadow-md";

  // Optional: if task is completed
  if (task.completed) {
    li.classList.add("bg-amber-200", "line-through", "text-gray-500");
  }

  // Create inner HTML
  li.innerHTML = `
    <span>${task.text}</span>
    <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">Delete</button>
  `;
  li.addEventListener("click", () => {
    if (!task.completed) {
      li.classList.toggle("bg-amber-200");
      li.classList.toggle("line-through");
      li.classList.toggle("text-gray-500");
      task.completed = !task.completed;
    }
    savetasks();
    // Save tasks to localStorage
  });
  todolist.appendChild(li);

  // ❌ Delete functionality
  // Delete task on button click
  li.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent toggling from firing
    tasks = tasks.filter((t) => t.id !== task.id); // Correct filter to remove the task
    li.remove(); // Remove the task from the UI
    savetasks(); // Save updated tasks to local storage
  });
}

function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
