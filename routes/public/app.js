const lista = document.getElementById("medicamentos-lista");

// Função para buscar e mostrar os medicamentos
async function carregarMedicamentos() {
    lista.innerHTML = ""; // limpa a lista
    try {
        const resposta = await fetch("http://172.22.22.17:10000/api/medicamentos");
        const medicamentos = await resposta.json();

        medicamentos.forEach(med => {
            const li = document.createElement("li");
            li.textContent = `${med.nome} - ${med.dose} - ${med.horario}`;
            lista.appendChild(li);
        });
    } catch (err) {
        console.error("Erro ao carregar medicamentos:", err);
    }
}

// Chama a função ao carregar a página
carregarMedicamentos();

const form = document.getElementById("form-med");

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

