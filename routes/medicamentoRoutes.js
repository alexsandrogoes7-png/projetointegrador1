const express = require("express");
const router = express.Router();
const {
  criarMedicamento,
  listarMedicamentos,
  criarMedicamentoAtualizado,
  deletarMedicamento
} = require("../controllers/medicamentoController");

router.post("/", criarMedicamento);
router.get("/", listarMedicamentos);
router.put("/:id", criarMedicamentoAtualizado);
router.delete("/:id", deletarMedicamento); 

module.exports = router;
