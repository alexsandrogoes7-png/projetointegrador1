const express = require("express");
const router = express.Router();
const { criarMedicamento } = require("../controllers/medicamentoController"); // ✅ desestruturação

router.post("/medicamentos", criarMedicamento); // ✅ agora é função

module.exports = router;
