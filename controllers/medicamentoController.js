const Medicamento = require("../models/medicamento");

// Criar medicamento
exports.criarMedicamento = async (req, res) => {
  try {
    const { nome, quantidade, validade, dose, horario } = req.body;

    if (!nome || !quantidade || !validade || !dose || !horario) {
      return res.status(400).json({ error: "Campos obrigatórios faltando!" });
    }

    const novoMedicamento = new Medicamento({ nome, quantidade, validade, dose, horario });
    await novoMedicamento.save();

    res.status(201).json(novoMedicamento);
  } catch (err) {
    console.error("Erro ao criar medicamento:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Listar medicamentos
exports.listarMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.find();
    res.json(medicamentos);
  } catch (err) {
    console.error("Erro ao listar medicamentos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Atualizar medicamento
exports.criarMedicamentoAtualizado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, quantidade, validade, dose, horario } = req.body;

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
