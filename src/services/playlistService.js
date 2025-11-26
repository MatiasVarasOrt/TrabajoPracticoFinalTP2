class PlayListService {
  constructor(playlist, cancion, playlistCanciones) {
    this.playlist = playlist;
    this.cancion = cancion;
    this.playlistCanciones = playlistCanciones;
  }

  async getAllPlaylists() {
    return await this.playlist.findAll({
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

  async followPlaylist(playlistId, followerUserId) {
    const id = Number(playlistId);
    const userId = Number(followerUserId);


    const playlist = await this.playlist.findByPk(id);
    if (!playlist) {
      throw new Error("Playlist no encontrada");
    }

    const normalizedFollowers = (playlist.Followers ?? [])
      .map((follower) => Number(follower))
      .filter((follower) => Number.isInteger(follower) && follower > 0);

    const alreadyFollowing = normalizedFollowers.includes(userId);
    if (!alreadyFollowing) {
      normalizedFollowers.push(userId);
    }

    playlist.Followers = normalizedFollowers;
    await playlist.save();

    return {
      IdPlaylist: playlist.IdPlaylist,
      Name: playlist.Name,
      userId: playlist.userId,
      Followers: normalizedFollowers,
      alreadyFollowing,
    };
  }
}

export default PlayListService;
