let tasks = [];
let priority = "";
let status = "";
let updateIndex = -1;
let deleteIndex = -1;

function openModal() {
  document.getElementById("taskInput").value = "";
  priority = "";
  status = "";
  document.getElementById("modalOverlay").showModal();
}

function closeModal() {
  document.getElementById("modalOverlay").close();
  priority = "";
  status = "";
}

function selectPriorityXStatus(btn, type) {
  const dialog = btn.closest("dialog");
  dialog.querySelectorAll(`.${type}-btn`).forEach((b) => {
    b.style.background = "";
    b.style.color = b.dataset.color;
    b.style.borderColor = b.dataset.color;
  });

  btn.style.background = btn.dataset.color;
  btn.style.color = "white";
  btn.style.borderColor = btn.dataset.color;

  if (type === "priority") priority = btn.dataset.value;
  if (type === "status") status = btn.dataset.value;
}

function priorityColor(priority) {
  if (priority === "low") return "text-green-500";
  if (priority === "high") return "text-red-600";
  if (priority === "medium") return "text-yellow-400";
}

function addTask() {
  let task = document.getElementById("taskInput").value.trim();

  if (task === "") return alert("Please input a task!");
  if (priority === "") priority = "low";
  if (status === "") status = "todo";

  tasks.push({ name: task, priority: priority, status: status });
  displayTask();
  closeModal();
}

function displayTask() {
  let displaytask = document.getElementById("taskList");
  displaytask.innerHTML = "";

  [...tasks].reverse().forEach(function (item, index) {
    let realIndex = tasks.length - 1 - index;
    displaytask.innerHTML += `
      <div class="mt-4 flex justify-around bg-white p-4 rounded-t-lg shadow-md">
        <h1 class="text-xl font-bold text-black">${item.name}</h1>
        <h1 class="text-xl font-bold ${priorityColor(item.priority)}">${item.priority}</h1>
        <h1 class="text-xl font-bold text-black">${item.status}</h1>
        <div>
          <button onclick="openUpdateModal(${realIndex})" style="color:blue;"><i class="fa-regular fa-pen-to-square"></i></button>
          <button onclick="openConfirmModal(${realIndex})" style="color:red;"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    `;
  });
}

function openConfirmModal(index) {
  deleteIndex = index;
  document.getElementById("confirmModal").showModal();
}

function closeConfirmModal() {
  document.getElementById("confirmModal").close();
  deleteIndex = -1;
}

function confirmDelete() {
  tasks.splice(deleteIndex, 1);
  displayTask();
  closeConfirmModal();
}

function openUpdateModal(index) {
  updateIndex = index;
  document.getElementById("updateTaskInput").value = tasks[index].name;
  priority = tasks[index].priority;
  status = tasks[index].status;

  const dialog = document.getElementById("updateModal");

  dialog.querySelectorAll(".priority-btn, .status-btn").forEach((b) => {
    b.style.background = "";
    b.style.color = b.dataset.color;
    b.style.borderColor = b.dataset.color;
  });

  dialog.querySelectorAll(".priority-btn").forEach((b) => {
    if (b.dataset.value === priority) {
      b.style.background = b.dataset.color;
      b.style.color = "white";
    }
  });

  dialog.querySelectorAll(".status-btn").forEach((b) => {
    if (b.dataset.value === status) {
      b.style.background = b.dataset.color;
      b.style.color = "white";
    }
  });

  dialog.showModal();
}

function closeUpdateModal() {
  document.getElementById("updateModal").close();
  updateIndex = -1;
  priority = "";
  status = "";
}

function confirmUpdate() {
  let newName = document.getElementById("updateTaskInput").value.trim();
  if (newName === "") return alert("Task name cannot be empty!");
  tasks[updateIndex] = { name: newName, priority: priority, status: status };
  displayTask();
  closeUpdateModal();
}