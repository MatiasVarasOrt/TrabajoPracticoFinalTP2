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
      where: { userId },
      order: [["IdPlaylist", "DESC"]],
    });
  }

  async createPlaylist(data) {
    // Aceptamos tanto userId como UserId para mayor flexibilidad
    const { Name, userId, UserId, Followers = null } = data;
    const finalUserId = userId ?? UserId;

    if (!Name || Name.trim() === "") {
      const error = new Error("El campo Name es obligatorio");
      error.name = "ValidationError";
      throw error;
    }

    if (finalUserId === undefined || finalUserId === null) {
      const error = new Error("El campo UserId es obligatorio");
      error.name = "ValidationError";
      throw error;
    }

    return await PlayList.create({
      Name: Name.trim(),
      userId: finalUserId,
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

  async getPlaylistFollowers(id) {
    const playlist = await PlayList.findByPk(id, {
      attributes: ["IdPlaylist", "Name", "userId", "Followers"],
    });

    if (!playlist) {
      throw new Error("Playlist no encontrada");
    }

    return {
      IdPlaylist: playlist.IdPlaylist,
      Name: playlist.Name,
      UserId: playlist.userId,
      userId: playlist.userId,
      Followers: playlist.Followers || [],
    };
  }

  async followPlaylist(playlistId, followerUserId) {
    const id = Number(playlistId);
    const userId = Number(followerUserId);

   

    const playlist = await PlayList.findByPk(id);
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

export default new PlayListService();
