const signIn = "../index.html";

if (!localStorage.getItem("token")) {
  window.location.href = signIn;
}

function getEmployees() {
  return JSON.parse(localStorage.getItem("employees")) || [];
}

function renderTable() {
  const tbody = document.querySelector("#employeesTbody") || document.querySelector("tbody");
  const employees = getEmployees();

  tbody.innerHTML = "";

  employees.forEach((emp, index) => {
    const tr = document.createElement("tr");

    const salaryText =
      emp.salario_liquido && emp.salario_bruto !== ""
        ? `Líquido: ${emp.salario_liquido} | Bruto: ${emp.salario_bruto}`
        : `${emp.salario_liquido || ""}`;

    tr.innerHTML = `
      <td>${emp.name ?? ""}</td>
      <td>${emp.cpf ?? ""}</td>
      <td>${emp.email ?? ""}</td>
      <td>${emp.role ?? ""}</td>
      <td>${salaryText}</td>
      <td class="acao">
        <button class="btn-action btn-edit" data-index="${index}" title="Editar">
          <i class="fa fa-pencil"></i>
        </button>
      </td>
      <td class="acao">     
        <button class="btn-action btn-delete" data-index="${index}" title="Excluir">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function goToRegister() {
  window.location.href = "../pages/main.html";
}

window.goToRegister = goToRegister;

renderTable();

document.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".btn-edit");
  const deleteBtn = e.target.closest(".btn-delete");

  // EXCLUIR
  if (deleteBtn) {
    const index = deleteBtn.dataset.index;
    const employees = getEmployees();

    if (confirm("Deseja realmente excluir este funcionário?")) {
      employees.splice(index, 1);
      localStorage.setItem("employees", JSON.stringify(employees));
      renderTable();
    }
  }

  // EDITAR
  if (editBtn) {
    const index = editBtn.dataset.index;
    localStorage.setItem("editEmployeeIndex", index);
    window.location.href = "../pages/main.html";
  }
});

