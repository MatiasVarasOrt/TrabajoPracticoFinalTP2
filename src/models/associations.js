import Artista from "./Artista.js";
import Cancion from "./Cancion.js";
import User from "./User.js";
import Role from "./Role.js";
import Playlist from "./PlayList.js";

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

  // Asociación: Un Usuario pertenece a un Rol
  User.belongsTo(Role, {
    foreignKey: "roleId",
    as: "Role",
  });

  // Asociación: Un Rol tiene muchos Usuarios
  Role.hasMany(User, {
    foreignKey: "roleId",
    as: "Users",
  });

  // Asociación: Un Usuario tiene muchas Playlists
  User.hasMany(Playlist, {
    foreignKey: "userId",
    as: "playlists",
  });

  // Asociación: Una Playlist pertenece a un Usuario
  Playlist.belongsTo(User, {
    foreignKey: "userId",
    as: "Owner",
  });

  console.log("✅ Asociaciones de modelos inicializadas");
}
