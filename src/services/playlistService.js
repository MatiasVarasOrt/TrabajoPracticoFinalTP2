import PlayList from "../models/PlayList.js";

class PlayListService {
  async getAllPlaylists() {
    return await PlayList.findAll({
      order: [["Name", "ASC"]],
    });
  }

  async getPlaylistById(id) {
    const playlist = await PlayList.findByPk(id);
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

    return await PlayList.findAll({
      where: { UserId: userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async createPlaylist(data) {
    const { Name, UserId, Followers = null } = data;

    if (!Name || Name.trim() === "") {
      const error = new Error("El campo Name es obligatorio");
      error.name = "ValidationError";
      throw error;
    }

    if (UserId === undefined || UserId === null) {
      const error = new Error("El campo UserId es obligatorio");
      error.name = "ValidationError";
      throw error;
    }

    return await PlayList.create({
      Name: Name.trim(),
      UserId,
      Followers,
    });
  }

  async updatePlaylistName(id, data) {
    const playlist = await PlayList.findByPk(id);
    if (!playlist) {
      throw new Error("Playlist no encontrada");
    }

    const { Name } = data;
    if (!Name || Name.trim() === "") {
      const error = new Error("El campo Name es obligatorio para la actualización");
      error.name = "ValidationError";
      throw error;
    }

    playlist.Name = Name.trim();
    await playlist.save();

    return playlist;
  }

  async deletePlaylist(id) {
    const playlist = await PlayList.findByPk(id);
    if (!playlist) {
      throw new Error("Playlist no encontrada");
    }

    await playlist.destroy();
    return true;
  }
}

export default new PlayListService();
