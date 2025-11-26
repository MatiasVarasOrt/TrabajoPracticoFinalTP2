import Artista from "./Artista.js";
import Cancion from "./Cancion.js";
import User from "./User.js";
import Role from "./Role.js";
import PlayList from "./PlayList.js";
import PlaylistsCanciones from "./PlaylistsCanciones.js";

export function initAssociations() {
  // un artista tiene muchas canciones
  Artista.hasMany(Cancion, {
    foreignKey: "IdArtista",
    as: "Canciones",
  });

  // una canción pertenece a un artista
  Cancion.belongsTo(Artista, {
    foreignKey: "IdArtista",
    as: "Artista",
  });

  // un usuario pertenece a un rol
  User.belongsTo(Role, {
    foreignKey: "roleId",
    as: "Role",
  });

  // un rol tiene muchos usuarios
  Role.hasMany(User, {
    foreignKey: "roleId",
    as: "Users",
  });

  // un usuario tiene muchas playlists
  User.hasMany(PlayList, {
    foreignKey: "userId",
    as: "Playlists",
  });

  // una playlist pertenece a un usuario
  PlayList.belongsTo(User, {
    foreignKey: "userId",
    as: "Owner",
  });

  // una playlist tiene muchas canciones (muchos a muchos)
  PlayList.belongsToMany(Cancion, {
    through: PlaylistsCanciones,
    foreignKey: "IdPlaylist",
    otherKey: "IdCancion",
    as: "Canciones",
  });

  // una canción pertenece a muchas playlists (muchos a muchos)
  Cancion.belongsToMany(PlayList, {
    through: PlaylistsCanciones,
    foreignKey: "IdCancion",
    otherKey: "IdPlaylist",
    as: "Playlists",
  });

  PlaylistsCanciones.belongsTo(Cancion, {
    foreignKey: "IdCancion",
    as: "Cancion",
  });

  PlaylistsCanciones.belongsTo(PlayList, {
    foreignKey: "IdPlaylist",
    as: "Playlist",
  });

  console.log("Asociaciones de modelos inicializadas correctamente");
}
