const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const medicamentoRoutes = require("./routes/medicamentoRoutes");

const app = express();

// Middlewares
app.use(cors({
  origin: "*", // Permite qualquer domínio
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"] // Cabeçalhos permitidos
}));
app.use(express.json());

// Rotas
app.use("/api/medicamentos", medicamentoRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado com sucesso!");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));
