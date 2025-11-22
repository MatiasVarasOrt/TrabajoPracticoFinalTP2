import Artista from "./Artista.js";
import Cancion from "./Cancion.js";

/**
 * Inicializa todas las asociaciones entre modelos
 * Debe ser llamado una vez al iniciar la aplicación
 */
export function initAssociations() {
  // Asociación: Un Artista tiene muchas Canciones
  Artista.hasMany(Cancion, {
    foreignKey: "IdArtista",
    as: "Canciones",
  });

  // Asociación: Una Canción pertenece a un Artista
  Cancion.belongsTo(Artista, {
    foreignKey: "IdArtista",
    as: "Artista",
  });

  console.log("✅ Asociaciones de modelos inicializadas");
}
