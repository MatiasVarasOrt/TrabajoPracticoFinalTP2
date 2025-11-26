class PlayListController {
  constructor(service) {
    this.playlistService = service;
  }

  getAllPlaylists = async (req, res) => {
    try {
      const playlists = await this.playlistService.getAllPlaylists();
      res.json({
        success: true,
        count: playlists.length,
        data: playlists,
      });
    } catch (error) {
      console.error("Error al obtener playlists:", error);
      res.status(500).json({
        success: false,
        error: "Error al obtener las playlists",
        details: error.message,
      });
    }
  };

  getPlaylistById = async (req, res) => {
    try {
      const { id } = req.params;
      const playlist = await this.playlistService.getPlaylistById(id);
      res.json({
        success: true,
        data: playlist,
      });
    } catch (error) {
      console.error("Error al obtener playlist:", error);

      if (error.message === "Playlist no encontrada") {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: "Error al obtener la playlist",
        details: error.message,
      });
    }
  };

  getPlaylistsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const playlists = await this.playlistService.getPlaylistsByUserId(userId);
      res.json({
        success: true,
        count: playlists.length,
        data: playlists,
      });
    } catch (error) {
      console.error("Error al obtener playlists por usuario:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: "Error al obtener las playlists del usuario",
        details: error.message,
      });
    }
  };

  createPlaylist = async (req, res) => {
    try {
      const userId = req.user?.id ?? req.body.userId ?? req.body.UserId;
      const playlist = await this.playlistService.createPlaylist(req.body, userId);
      res.status(201).json({
        success: true,
        message: "Playlist creada exitosamente",
        data: playlist,
      });
    } catch (error) {
      console.error("Error al crear playlist:", error);

      if (
        error.name === "ValidationError" ||
        error.name === "SequelizeValidationError"
      ) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: "Error al crear la playlist",
        details: error.message,
      });
    }
  };

  updatePlaylistName = async (req, res) => {
    try {
      const { id } = req.params;
      const playlist = await this.playlistService.updatePlaylistName(
        id,
        req.body
      );
      res.json({
        success: true,
        message: "Playlist actualizada exitosamente",
        data: playlist,
      });
    } catch (error) {
      console.error("Error al actualizar playlist:", error);

      if (error.message === "Playlist no encontrada") {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      if (
        error.name === "ValidationError" ||
        error.name === "SequelizeValidationError"
      ) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: "Error al actualizar la playlist",
        details: error.message,
      });
    }
  };

  deletePlaylist = async (req, res) => {
    try {
      const { id } = req.params;
      await this.playlistService.deletePlaylist(id);
      res.json({
        success: true,
        message: "Playlist eliminada exitosamente",
      });
    } catch (error) {
      console.error("Error al eliminar playlist:", error);

      if (error.message === "Playlist no encontrada") {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: "Error al eliminar la playlist",
        details: error.message,
      });
    }
  };

  getPlaylistFollowers = async (req, res) => {
    try {
      const { id } = req.params;
      const playlist = await this.playlistService.getPlaylistFollowers(id);
      res.json({
        success: true,
        data: playlist,
      });
    } catch (error) {
      console.error("Error al obtener followers de playlist:", error);

      if (error.message === "Playlist no encontrada") {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        error: "Error al obtener los followers de la playlist",
        details: error.message,
      });
    }
  };

  followPlaylist = async (req, res) => {
    try {
      const { id } = req.params;
      const followerUserId = req.user?.id ?? req.body.userId ?? req.body.UserId;

      const result = await this.playlistService.followPlaylist(
        id,
        followerUserId
      );

      res.json({
        success: true,
        message: result.alreadyFollowing
          ? "Ya seguis esta playlist"
          : "Ahora seguis la playlist",
        data: {
          IdPlaylist: result.IdPlaylist,
          Name: result.Name,
          userId: result.userId,
          Followers: result.Followers,
        },
      });
    } catch (error) {
      console.error("Error al seguir playlist", error);

      if (error.message === "Playlist no encontrada") {
        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }


      res.status(500).json({
        success: false,
        error: "Error al seguir la playlist",
        details: error.message,
      });
    }
  };

  addCancion = async (req, res) => {
    try {
      const { id } = req.params;
      const { cancionId } = req.body;

      if (!cancionId) {
        return res.status(400).json({
          success: false,
          error: "El campo cancionId es obligatorio",
        });
      }

      const result = await this.playlistService.addCancionToPlaylist(
        parseInt(id),
        parseInt(cancionId)
      );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const status = error.name === "ValidationError" ? 400 : 500;
      res.status(status).json({
        success: false,
        error: error.message,
      });
    }
  };

  getCanciones = async (req, res) => {
    try {
      const { id } = req.params;
      const canciones = await this.playlistService.getCancionesByPlaylistId(
        parseInt(id)
      );

      res.json({
        success: true,
        count: canciones.length,
        data: canciones,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };

  removeCancion = async (req, res) => {
    try {
      const { id, cancionId } = req.params;

      const result = await this.playlistService.removeCancionFromPlaylist(
        parseInt(id),
        parseInt(cancionId)
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };

  getCancionesCount = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.playlistService.getCancionesCount(parseInt(id));

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };
}

export default PlayListController;
