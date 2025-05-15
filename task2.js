document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const errors = document.getElementById("formErrors");

  let errorMessages = [];

  if (name === "" || email === "" || message === "") {
    errorMessages.push("All fields are required.");
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    errorMessages.push("Invalid email format.");
  }

  if (errorMessages.length > 0) {
    errors.innerText = errorMessages.join("\n");
    return;
  }

  errors.innerText = "";

  document.getElementById("submittedInfo").innerHTML = `
    <h3>Contact Information</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  document.getElementById("contactForm").reset();
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const statusInput = document.getElementById("statusInput");
  const taskList = document.getElementById("taskList");
  const taskSummaryList = document.getElementById("taskSummaryList");

  const taskText = taskInput.value.trim();
  const status = statusInput.value;

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span><strong>${taskText}</strong> - <em class="status">${status}</em></span>
    <button onclick="removeTask(this)">Remove</button>
  `;

  const statusSpan = li.querySelector(".status");
  switch (status) {
    case "Pending":
      statusSpan.style.color = "#856404";
      break;
    case "In Progress":
      statusSpan.style.color = "#0c5460";
      break;
    case "Completed":
      statusSpan.style.color = "#155724";
      statusSpan.style.textDecoration = "line-through";
      break;
  }

  taskList.appendChild(li);

  const summaryLi = document.createElement("li");
  summaryLi.innerHTML = `<strong>${taskText}</strong> - <em>${status}</em>`;
  taskSummaryList.appendChild(summaryLi);

  taskInput.value = "";
  statusInput.value = "Pending";
}

function removeTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector("strong").innerText;
  const taskStatus = li.querySelector("em").innerText;

  li.remove();

  const summaryList = document.getElementById("taskSummaryList");
  for (let item of summaryList.children) {
    if (item.innerText.includes(taskText) && item.innerText.includes(taskStatus)) {
      item.remove();
      break;
    }
  }
}
