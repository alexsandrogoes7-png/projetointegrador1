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

            // Botão de deletar
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

            li.appendChild(btnDeletar);
            lista.appendChild(li);
        });
    } catch (err) {
        console.error("Erro ao carregar medicamentos:", err);
    }
}

// Chama a função ao carregar a página
carregarMedicamentos();

// Adicionar novo medicamento
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita que a página recarregue

    const nome = document.getElementById("nome").value;
    const dose = document.getElementById("dose").value;
    const horario = document.getElementById("horario").value;

    try {
        const resposta = await fetch("http://172.22.22.17:10000/api/medicamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, dose, horario })
        });

        if (!resposta.ok) throw new Error("Erro ao adicionar medicamento");

        // Limpa o formulário
        form.reset();

        // Atualiza a lista
        carregarMedicamentos();
    } catch (err) {
        console.error(err);
        alert("Não foi possível adicionar o medicamento.");
    }
});
