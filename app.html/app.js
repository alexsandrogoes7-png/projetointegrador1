const lista = document.getElementById("medicamentos-lista");

// Substitua pelo IP do seu computador se estiver usando celular na mesma rede
const API_URL = "http://10.217.17.166:10000/medicamentos";

async function carregarMedicamentos() {
    const resposta = await fetch(API_URL);
    const medicamentos = await resposta.json();

    medicamentos.forEach(med => {
        const li = document.createElement("li");
        li.textContent = med.nome; // aqui assumimos que o medicamento tem campo "nome"
        lista.appendChild(li);
    });
}

carregarMedicamentos();
