import { sequelize } from "./database.js";
import Cancion from "../models/Cancion.js";
import Artista from "../models/Artista.js";

const syncDatabase = async () => {
  try {
    console.log("🔄 Sincronizando modelos con la base de datos...");

    // Registrar asociaciones entre modelos (si existen)
    const models = sequelize.models;
    if (typeof Cancion.associate === "function") Cancion.associate(models);
    if (typeof Artista.associate === "function") Artista.associate(models);

    // alter: true modifica las tablas existentes sin borrar datos
    // force: true elimina y recrea las tablas (¡cuidado en producción!)
    await sequelize.sync({ alter: true });

    console.log("✅ Base de datos sincronizada correctamente");

    // Insertar datos de ejemplo si la tabla está vacía
    const count = await Cancion.count();
    if (count === 0) {
      console.log("📝 Insertando canciones de ejemplo...");

      // Crear artistas de ejemplo primero (necesarios por la FK ArtistaId)
      const queen = await Artista.create({ Name: "Queen" });
      const led = await Artista.create({ Name: "Led Zeppelin" });
      const eagles = await Artista.create({ Name: "Eagles" });
      const lennon = await Artista.create({ Name: "John Lennon" });
      const nirvana = await Artista.create({ Name: "Nirvana" });

      await Cancion.bulkCreate([
        { Name: "Bohemian Rhapsody", ArtistaId: queen.IdArtista },
        { Name: "Stairway to Heaven", ArtistaId: led.IdArtista },
        { Name: "Hotel California", ArtistaId: eagles.IdArtista },
        { Name: "Imagine", ArtistaId: lennon.IdArtista },
        { Name: "Smells Like Teen Spirit", ArtistaId: nirvana.IdArtista },
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
