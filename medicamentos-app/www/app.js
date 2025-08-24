const lista = document.getElementById("medicamentos-lista");
const form = document.getElementById("form-med");

// Função para buscar e mostrar os medicamentos
async function carregarMedicamentos() {
    lista.innerHTML = ""; // limpa a lista
    try {
        const resposta = await fetch("http://172.22.22.17:10000/api/medicamentos");
        const medicamentos = await resposta.json();

        medicamentos.forEach(med => {
            const li = document.createElement("li");
            li.textContent = `${med.nome} - ${med.dose} - ${med.horario} `;

            // Botão Editar
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.style.marginLeft = "10px";
            btnEditar.addEventListener("click", () => {
                document.getElementById("nome").value = med.nome;
                document.getElementById("dose").value = med.dose;
                document.getElementById("horario").value = med.horario;

                // Salva o ID no formulário para saber que é uma edição
                form.dataset.editId = med._id;
            });

            // Botão Deletar
            const btnDeletar = document.createElement("button");
            btnDeletar.textContent = "Deletar";
            btnDeletar.style.marginLeft = "10px";
            btnDeletar.addEventListener("click", async () => {
                try {
                    await fetch(`http://172.22.22.17:10000/api/medicamentos/${med._id}`, {
                        method: "DELETE"
                    });
                    carregarMedicamentos(); // atualiza a lista
                } catch (err) {
                    console.error("Erro ao deletar medicamento:", err);
                    alert("Não foi possível deletar o medicamento.");
                }
            });

            li.appendChild(btnEditar);
            li.appendChild(btnDeletar);
            lista.appendChild(li);
        });
    } catch (err) {
        console.error("Erro ao carregar medicamentos:", err);
    }
}

// Chama a função ao carregar a página
carregarMedicamentos();

// Adicionar ou editar medicamento
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const dose = document.getElementById("dose").value;
    const horario = document.getElementById("horario").value;
    const editId = form.dataset.editId; // verifica se é edição

    try {
        if (editId) {
            // Edição
            const resposta = await fetch(`http://172.22.22.17:10000/api/medicamentos/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, dose, horario })
            });
            if (!resposta.ok) throw new Error("Erro ao atualizar medicamento");
            delete form.dataset.editId; // limpa o ID após edição
        } else {
            // Criação
            const resposta = await fetch("http://172.22.22.17:10000/api/medicamentos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, dose, horario })
            });
            if (!resposta.ok) throw new Error("Erro ao adicionar medicamento");
        }

        form.reset();
        carregarMedicamentos(); // atualiza a lista
    } catch (err) {
        console.error(err);
        alert("Não foi possível salvar o medicamento.");
    }
});
