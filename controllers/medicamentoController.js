const Medicamento = require("../models/medicamento");
// Atualizar medicamento
exports.criarMedicamentoAtualizado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, quantidade, validade, dose, horario } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !quantidade || !validade || !dose || !horario) {
      return res.status(400).json({ error: "Campos obrigatórios faltando!" });
    }

    const medicamentoAtualizado = await Medicamento.findByIdAndUpdate(
      id,
      { nome, quantidade, validade, dose, horario },
      { new: true, runValidators: true }
    );

    if (!medicamentoAtualizado) {
      return res.status(404).json({ error: "Medicamento não encontrado" });
    }

    res.json(medicamentoAtualizado);
  } catch (err) {
    console.error("Erro ao atualizar medicamento:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// medicamentoController.js
function criarMedicamento(req, res) {
    // lógica de criação do medicamento
    res.send("Medicamento criado!");
}

module.exports = { criarMedicamento }; // ✅ exporta como objeto
