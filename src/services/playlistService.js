class PlayListService {
  constructor(playlist, cancion, playlistCanciones) {
    this.playlist = playlist;
    this.cancion = cancion;
    this.playlistCanciones = playlistCanciones;
  }

  async getAllPlaylists() {
    return await PlayList.findAll({
      order: [["Name", "ASC"]],
    });
  }

  async getPlaylistById(id) {
    const playlist = await this.playlist.findByPk(id);
    if (!playlist) {
      throw new Error("Playlist no encontrada");
    }
    return playlist;
  }

  async getPlaylistsByUserId(userId) {
    if (userId === undefined || userId === null) {
      const error = new Error("El parámetro userId es obligatorio");
      error.name = "ValidationError";
      throw error;
    }

    return await this.playlist.findAll({
      where: { userId },
      order: [["IdPlaylist", "DESC"]],
    });
  }

  async createPlaylist(data) {
    // Aceptamos tanto userId como UserId para mayor flexibilidad
    const { Name, userId, Followers = [] } = data;

    if (!Name || Name.trim() === "") {
      const error = new Error("El campo Name es obligatorio");
      error.name = "ValidationError";
      throw error;
    }

    if (!userId) {
      const error = new Error("El campo UserId es obligatorio");
      error.name = "ValidationError";
      throw error;
    }

    return await this.playlist.create({
      Name: Name.trim(),
      userId,
      Followers,
    });
  }

  async updatePlaylistName(id, data) {
    const playlist = await this.playlist.findByPk(id);
    if (!playlist) {
      throw new Error("Playlist no encontrada");
    }

    const { Name } = data;
    if (!Name || Name.trim() === "") {
      const error = new Error(
        "El campo Name es obligatorio para la actualización"
      );
      error.name = "ValidationError";
      throw error;
    }

    playlist.Name = Name.trim();
    await playlist.save();

    return playlist;
  }

  async deletePlaylist(id) {
    const playlist = await this.playlist.findByPk(id);
    if (!playlist) {
      throw new Error("Playlist no encontrada");
    }

    await playlist.destroy();
    return true;
  }

  async getPlaylistFollowers(id) {
    const playlist = await this.playlist.findByPk(id, {
      attributes: ["IdPlaylist", "Name", "userId", "Followers"],
    });

    if (!playlist) {
      throw new Error("Playlist no encontrada");
    }

    return {
      IdPlaylist: playlist.IdPlaylist,
      Name: playlist.Name,
      userId: playlist.userId,
      Followers: playlist.Followers || [],
    };
  }

  async addCancionToPlaylist(playlistId, cancionId) {
    // Validar que la playlist existe
    await this.getPlaylistById(playlistId);

    // Validar que la canción existe
    const cancion = await this.cancion.findByPk(cancionId);
    if (!cancion) {
      throw new Error("Canción no encontrada");
    }

    // Verificar si ya existe la relación
    const existe = await this.playlistCanciones.findOne({
      where: {
        IdPlaylist: playlistId,
        IdCancion: cancionId,
      },
    });

    if (existe) {
      const error = new Error("La canción ya está en la playlist");
      error.name = "ValidationError";
      throw error;
    }

    // Crear la relación
    await this.playlistCanciones.create({
      IdPlaylist: playlistId,
      IdCancion: cancionId,
    });

    return {
      message: "Canción agregada a la playlist exitosamente",
      playlistId,
      cancionId,
    };
  }

  async getCancionesByPlaylistId(playlistId) {
    // Validar que la playlist existe
    await this.getPlaylistById(playlistId);

    const canciones = await this.playlistCanciones.findAll({
      where: { IdPlaylist: playlistId },
      include: [
        {
          model: this.cancion,
          as: "Cancion",
          attributes: ["IdCancion", "Name"],
          include: [
            {
              model: this.cancion.associations.Artista.target,
              as: "Artista",
              attributes: ["IdArtista", "Name"],
            },
          ],
        },
      ],
    });

    return canciones.map((cancion) => ({
      IdCancion: cancion.Cancion.IdCancion,
      Name: cancion.Cancion.Name,
      Artista: cancion.Cancion.Artista,
    }));
  }

  async removeCancionFromPlaylist(playlistId, cancionId) {
    // Validar que la playlist existe
    await this.getPlaylistById(playlistId);

    const relacion = await this.playlistCanciones.findOne({
      where: {
        IdPlaylist: playlistId,
        IdCancion: cancionId,
      },
    });

    if (!relacion) {
      throw new Error("La canción no está en la playlist");
    }

    await relacion.destroy();

    return {
      message: "Canción eliminada de la playlist exitosamente",
    };
  }

  async getCancionesCount(playlistId) {
    await this.getPlaylistById(playlistId);

    const count = await this.playlistCanciones.count({
      where: { IdPlaylist: playlistId },
    });

    return { playlistId, count };
  }
}

export default PlayListService;
