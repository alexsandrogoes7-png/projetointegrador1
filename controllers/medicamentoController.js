const Medicamento = require("../models/medicamento");

// Criar medicamento
exports.criarMedicamento = async (req, res) => {
  try {
    console.log("Recebido:", req.body); // Log do JSON recebido

    const { nome, quantidade, validade } = req.body;

    // Validação simples
    if (!nome || !quantidade || !validade) {
      return res.status(400).json({ error: "Campos obrigatórios faltando!" });
    }

    const novoMedicamento = new Medicamento({ nome, quantidade, validade });
    await novoMedicamento.save();

    res.status(201).json(novoMedicamento);
  } catch (err) {
    console.error("Erro ao criar medicamento:", err); // Mostra o erro real no console
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Listar todos
exports.listarMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.find();
    res.json(medicamentos);
  } catch (err) {
    console.error("Erro ao listar medicamentos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
