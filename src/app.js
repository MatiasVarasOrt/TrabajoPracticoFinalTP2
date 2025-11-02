import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import cancionesRoutes from "./routes/canciones.js";

dotenv.config();

const app = express();

// ========== MIDDLEWARES ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== RUTAS ==========
// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "🎵 Mini Spotify API",
    database: "SQLite",
    version: "1.0.0",
    endpoints: {
      canciones: "/api/canciones",
      docs: "Próximamente",
    },
  });
});

// Rutas de la API
app.use("/api/canciones", cancionesRoutes);

// ========== MANEJO DE ERRORES 404 ==========
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
    path: req.path,
  });
});

// ========== INICIAR SERVIDOR ==========
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("🚀 Iniciando Mini Spotify API...");
    console.log("📊 Probando conexión a base de datos...");

    await testConnection();

    app.listen(PORT, () => {
      console.log(`\n✅ Servidor Express escuchando en el puerto ${PORT}`);
      console.log(`🌐 API: http://localhost:${PORT}`);
      console.log(`🎵 Canciones: http://localhost:${PORT}/api/canciones\n`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();

export default app;
