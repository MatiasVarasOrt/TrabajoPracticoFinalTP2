import playListService from "../services/playlistService.js";

export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await playListService.getAllPlaylists();
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

export const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await playListService.getPlaylistById(id);
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

export const getPlaylistsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await playListService.getPlaylistsByUserId(userId);
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

export const createPlaylist = async (req, res) => {
  try {
    const playlist = await playListService.createPlaylist(req.body);
    res.status(201).json({
      success: true,
      message: "Playlist creada exitosamente",
      data: playlist,
    });
  } catch (error) {
    console.error("Error al crear playlist:", error);

    if (error.name === "ValidationError" || error.name === "SequelizeValidationError") {
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

export const updatePlaylistName = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await playListService.updatePlaylistName(id, req.body);
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

    if (error.name === "ValidationError" || error.name === "SequelizeValidationError") {
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

export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    await playListService.deletePlaylist(id);
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
