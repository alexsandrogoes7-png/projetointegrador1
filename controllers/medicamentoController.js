const Medicamento = require("../models/medicamento");

// Criar medicamento
exports.criarMedicamento = async (req, res) => {
  try {
    console.log("Recebido:", req.body); // Log do JSON recebido

    const { nome, quantidade, validade, dose, horario } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !quantidade || !validade || !dose || !horario) {
      return res.status(400).json({ error: "Campos obrigatórios faltando!" });
    }

    // Cria o medicamento com todos os campos
    const novoMedicamento = new Medicamento({ nome, quantidade, validade, dose, horario });
    await novoMedicamento.save();

    res.status(201).json(novoMedicamento);
  } catch (err) {
    console.error("Erro ao criar medicamento:", err); // Mostra o erro real no console
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Listar todos os medicamentos
exports.listarMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.find();
    res.json(medicamentos);
  } catch (err) {
    console.error("Erro ao listar medicamentos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
