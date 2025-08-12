const mongoose = require("mongoose");

const medicamentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dose: { type: String, required: true },
  horario: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Medicamento", medicamentoSchema);
