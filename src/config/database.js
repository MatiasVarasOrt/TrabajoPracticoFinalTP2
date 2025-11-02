import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta donde se guardará la base de datos
const dbPath = path.join(__dirname, "../../database.sqlite");

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false, // Cambiar a console.log si quieres ver las queries SQL
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a SQLite establecida correctamente.");
    console.log("📁 Archivo de BD:", dbPath);

    // Sincronizar modelos (crear tablas automáticamente)
    await sequelize.sync();
    console.log("✅ Tablas sincronizadas correctamente.");

    return true;
  } catch (error) {
    console.error("❌ Error al conectar a SQLite:", error.message);
    return false;
  }
};

export { sequelize, testConnection };
