const Medicamento = require("../models/medicamento");

// Criar medicamento
async function criarMedicamento(req, res) {
    const { nome, dose } = req.body;

    if (!nome || !dose) {
        return res.status(400).json({ error: "Nome e dose são obrigatórios" });
    }

    try {
        const novoMed = await Medicamento.create({ nome, dose });
        res.status(201).json(novoMed);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar medicamento" });
    }
}

// Listar todos
async function listarMedicamentos(req, res) {
    try {
        const medicamentos = await Medicamento.find();
        res.json(medicamentos);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar medicamentos" });
    }
}

// Atualizar medicamento
async function criarMedicamentoAtualizado(req, res) {
    const { id } = req.params;
    const { nome, dose } = req.body;

    try {
        const med = await Medicamento.findByIdAndUpdate(id, { nome, dose }, { new: true });
        if (!med) return res.status(404).json({ error: "Medicamento não encontrado" });
        res.json(med);
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar medicamento" });
    }
}

// Deletar medicamento
async function deletarMedicamento(req, res) {
    const { id } = req.params;

    try {
        const med = await Medicamento.findByIdAndDelete(id);
        if (!med) return res.status(404).json({ error: "Medicamento não encontrado" });
        res.json({ message: "Medicamento deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar medicamento" });
    }
}

module.exports = {
    criarMedicamento,
    listarMedicamentos,
    criarMedicamentoAtualizado,
    deletarMedicamento
};
