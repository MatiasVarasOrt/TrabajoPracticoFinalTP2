import { sequelize } from "./database.js";
import Cancion from "../models/Cancion.js";
import Artista from "../models/Artista.js";
import PlayList from "../models/PlayList.js";
import PlaylistsCanciones from "../models/PlaylistsCanciones.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import { initAssociations } from "../models/associations.js";

const syncDatabase = async () => {
  try {
    console.log("🔄 Sincronizando modelos con la base de datos...");

    initAssociations();

    // alter: true modifica las tablas existentes sin borrar datos
    // force: true elimina y recrea las tablas (¡cuidado en producción!)
    await sequelize.sync({ alter: true });

    console.log("✅ Base de datos sincronizada correctamente");

    // Insertar roles si no existen
    const rolesCount = await Role.count();
    if (rolesCount === 0) {
      console.log("📝 Insertando roles...");
      await Role.bulkCreate([{ roleName: "Admin" }, { roleName: "User" }]);
      console.log("✅ Roles insertados");
    }

    // Insertar usuario administrador por defecto si no existe
    const adminUser = await User.findOne({
      where: { mail: "admin@admin.com" },
    });
    if (!adminUser) {
      console.log("📝 Creando usuario administrador por defecto...");
      const adminRole = await Role.findOne({ where: { roleName: "Admin" } });
      await User.create({
        name: "Administrador",
        mail: "admin@admin.com",
        pass: "admin123",
        roleId: adminRole.id,
      });
      console.log(
        "✅ Usuario administrador creado (mail: admin@admin.com, pass: admin123)"
      );
    }

    // Insertar datos de ejemplo si la tabla está vacía
    const count = await Cancion.count();
    if (count === 0) {
      console.log("📝 Insertando canciones de ejemplo...");

      // Crear artistas de ejemplo primero (necesarios por la FK IdArtista)
      const queen = await Artista.create({ Name: "Queen" });
      const led = await Artista.create({ Name: "Led Zeppelin" });
      const eagles = await Artista.create({ Name: "Eagles" });
      const lennon = await Artista.create({ Name: "John Lennon" });
      const nirvana = await Artista.create({ Name: "Nirvana" });

      await Cancion.bulkCreate([
        { Name: "Bohemian Rhapsody", IdArtista: queen.IdArtista },
        { Name: "Stairway to Heaven", IdArtista: led.IdArtista },
        { Name: "Hotel California", IdArtista: eagles.IdArtista },
        { Name: "Imagine", IdArtista: lennon.IdArtista },
        { Name: "Smells Like Teen Spirit", IdArtista: nirvana.IdArtista },
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
