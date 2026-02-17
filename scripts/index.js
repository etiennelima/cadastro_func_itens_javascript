

const singIn = "../index.html";
const sairBtn = document.querySelector(".clique_sair");
const userLogado = JSON.parse(localStorage.getItem("userLogado"));

if (!localStorage.getItem("token")) {
  window.location.href = singIn;
}

if (sairBtn) {
  sairBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = singIn;
  });
}

const logado = document.querySelector("#logado");
if (logado) {
  logado.innerHTML = `Olá, ${userLogado?.nome || "usuário"}!`;
}

// ===== Funcionários =====
const employeeStorageKey = "employees";

function getEmployees() {
  return JSON.parse(localStorage.getItem(employeeStorageKey)) || [];
}

function setEmployees(list) {
  localStorage.setItem(employeeStorageKey, JSON.stringify(list));
}

function createEmployeeId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
}

const form = document.querySelector("form.formulario");
//modal
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const cpf = document.querySelector("#cpf").value.trim();
    const email = document.querySelector("#email").value.trim();
    const role = document.querySelector("#funcao").value.trim();
    const salario_liquido = document.querySelector("#salario_liquido").value.trim();
    const salario_bruto = document.querySelector("#salario_bruto").value.trim();

    if (!name || !cpf || !email || !role) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const employees = getEmployees();
    const editIndex = localStorage.getItem("editEmployeeIndex");

    if (editIndex !== null) {
      // ✏️ EDITAR
      employees[editIndex] = {
        ...employees[editIndex],
        name,
        cpf,
        email,
        role,
        salario_liquido,
        salario_bruto,
      };

      localStorage.removeItem("editEmployeeIndex");
    } else {
      // ➕ CADASTRAR
      employees.push({
        id: createEmployeeId(),
        name,
        cpf,
        email,
        role,
        salario_liquido,
        salario_bruto,
        createdAt: new Date().toISOString(),
      });
    }

    setEmployees(employees);
    window.location.href = "../pages/list.html";
  });
}


function goToList() {
  window.location.href = "../pages/list.html";
}

const editIndex = localStorage.getItem("editEmployeeIndex");

if (editIndex !== null) {
  const employees = getEmployees();
  const emp = employees[editIndex];

  if (emp) {
    document.querySelector("#name").value = emp.name;
    document.querySelector("#cpf").value = emp.cpf;
    document.querySelector("#email").value = emp.email;
    document.querySelector("#funcao").value = emp.role;
    document.querySelector("#salario_liquido").value = emp.salario_liquido;
    document.querySelector("#salario_bruto").value = emp.salario_bruto;

    document.querySelector(".forms_titulo").innerText = "Editar Funcionário";
    document.querySelector("button[type='submit']").innerText = "Salvar Alterações";
  }
}

function formatCPF(input) {
  let value = input.value.replace(/\D/g, ""); // só números

  if (value.length > 11) value = value.slice(0, 11);

  value = value.replace(/^(\d{3})(\d)/, "$1.$2");
  value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");

  input.value = value;
}


