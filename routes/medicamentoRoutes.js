const express = require("express");
const router = express.Router();
const { criarMedicamento, listarMedicamentos, criarMedicamentoAtualizado } = require("../controllers/medicamentoController");

router.post("/", criarMedicamento);
router.get("/", listarMedicamentos);

module.exports = router;

// Atualizar medicamento pelo ID
router.put("/:id", criarMedicamentoAtualizado);

module.exports = router;

