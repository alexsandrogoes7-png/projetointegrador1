const Medicamento = require("../models/medicamento");

// Criar medicamento
exports.criarMedicamento = async (req, res) => {
  try {
    const novoMedicamento = new Medicamento(req.body);
    await novoMedicamento.save();
    res.status(201).json(novoMedicamento);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar medicamento" });
  }
};

// Listar todos
exports.listarMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.find();
    res.json(medicamentos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar medicamentos" });
  }
};
