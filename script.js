const form = document.querySelector("form");
const ul = document.querySelector("ul");

form.onsubmit = handleAdd;
ul.onsubmit = handleFinishEdit;
ul.onclick = handleAction;

function handleAdd(e) {
  e.preventDefault();

  const text = form.text.value;

  if (!text) return;

  addItem(text);
  form.reset();
}

function handleAction(e) {
  const className = e.target.className;

  if (className === "edit") {
    handleEdit(e);
  } else if (className === "delete") {
    handleDelete(e);
  }
}

function handleEdit(e) {
  const btn = e.target;
  const li = btn.closest("li");
  const items = Array.from(ul.children);
  const i = items.indexOf(li);
  
  editItem(i);
}

function handleDelete(e) {
  const btn = e.target;
  const li = btn.closest("li");
  const items = Array.from(ul.children);
  const i = items.indexOf(li);
  
  deleteItem(i);
}

function handleFinishEdit(e) {
  e.preventDefault();

  const btn = e.submitter;
  const className = btn.className;
  
  if (className === "save") {
    handleSave(e);
  } else if (className === "cancel") {
    handleCancel(e);
  }
}

function handleSave(e) {
  const btn = e.target;
  const li = btn.closest("li");
  const items = Array.from(ul.children);
  const i = items.indexOf(li);
  const input = li.querySelector("input");
  const text = input.value;
  
  updateItem(i, text);
}

function handleCancel(e) {
  const btn = e.target;
  const li = btn.closest("li");
  const items = Array.from(ul.children);
  const i = items.indexOf(li);
  const input = li.querySelector("input");
  const text = input.getAttribute("value");
  
  updateItem(i, text);
}

function addItem(text) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  p.append(text);
  editBtn.append("Edit");
  deleteBtn.append("Delete");
  editBtn.classList.add("edit");
  deleteBtn.classList.add("delete");

  li.append(p, editBtn, ' ', deleteBtn);
  ul.append(li);
}

function editItem(i) {
  const li = ul.children[i];
  const p = li.querySelector("p");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const saveBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

  input.setAttribute("value", p.textContent);
  input.style.display = "block";
  input.style.margin = "1em 0";
  saveBtn.append("Save");
  cancelBtn.append("Cancel");
  saveBtn.classList.add("save");
  cancelBtn.classList.add("cancel");
  
  form.append(input, saveBtn, ' ', cancelBtn)
  li.replaceChildren(form);
}

function deleteItem(i) {
  const li = ul.children[i];
  
  li.remove();
}

function updateItem(i, text) {
  const li = ul.children[i];
  const p = document.createElement("p");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  p.append(text);
  editBtn.append("Edit");
  deleteBtn.append("Delete");
  editBtn.classList.add("edit");
  deleteBtn.classList.add("delete");

  li.replaceChildren(p, editBtn, ' ', deleteBtn);
}
