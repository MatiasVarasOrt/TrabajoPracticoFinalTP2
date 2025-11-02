import { sequelize } from "./database.js";
import Cancion from "../models/Cancion.js";

const syncDatabase = async () => {
  try {
    console.log("🔄 Sincronizando modelos con la base de datos...");

    // alter: true modifica las tablas existentes sin borrar datos
    // force: true elimina y recrea las tablas (¡cuidado en producción!)
    await sequelize.sync({ alter: true });

    console.log("✅ Base de datos sincronizada correctamente");

    // Insertar datos de ejemplo si la tabla está vacía
    const count = await Cancion.count();
    if (count === 0) {
      console.log("📝 Insertando canciones de ejemplo...");
      await Cancion.bulkCreate([
        { Name: "Bohemian Rhapsody", Artista: "Queen" },
        { Name: "Stairway to Heaven", Artista: "Led Zeppelin" },
        { Name: "Hotel California", Artista: "Eagles" },
        { Name: "Imagine", Artista: "John Lennon" },
        { Name: "Smells Like Teen Spirit", Artista: "Nirvana" },
      ]);
      console.log("✅ Canciones de ejemplo insertadas");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al sincronizar:", error);
    process.exit(1);
  }
};

syncDatabase();
