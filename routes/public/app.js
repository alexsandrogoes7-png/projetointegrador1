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
