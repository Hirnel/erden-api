const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./db/mongo");
const clasesRoutes = require("./routes/clasesRoutes");
const path = require("path");

const app = express();

// base de datos
const { client, db } = connectMongo();
app.locals.db = db;
app.locals.client = client;

// Middleware
app.use(express.json()); // Parsear JSON
app.use(cors()); // Permitir CORS
app.use(express.static("public")); // Servir archivos estáticos desde 'public'

// Configurar carpeta estática específica para 'diagrama'
app.use("/diagrama", express.static(path.join(__dirname, "public/diagrama")));

// Rutas
app.use("/api/clases", clasesRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
