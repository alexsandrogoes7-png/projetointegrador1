const express = require("express");
const router = express.Router();
const { criarMedicamento, listarMedicamentos, criarMedicamentoAtualizado } = require("../controllers/medicamentoController");

router.post("/", criarMedicamento);
router.get("/", listarMedicamentos);
router.put("/:id", criarMedicamentoAtualizado); // PUT para atualizar medicamento

module.exports = router; // exportar **depois de todas as rotas**
