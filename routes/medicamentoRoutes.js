const express = require("express");
const router = express.Router();
const { criarMedicamento, listarMedicamentos } = require("../controllers/medicamentoController");

router.post("/", criarMedicamento);
router.get("/", listarMedicamentos);

module.exports = router;
