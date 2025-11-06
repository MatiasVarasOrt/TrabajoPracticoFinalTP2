import cancionService from "../services/cancionService.js";

export const getAllCanciones = async (req, res) => {
  try {
    const canciones = await cancionService.getAllCanciones();

    res.json({
      success: true,
      count: canciones.length,
      data: canciones,
    });
  } catch (error) {
    console.error("Error al obtener canciones:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener las canciones",
      details: error.message,
    });
  }
};

export const getCancionById = async (req, res) => {
  try {
    const { id } = req.params;

    const cancion = await cancionService.getCancionById(id);

    res.json({
      success: true,
      data: cancion,
    });
  } catch (error) {
    console.error("Error al obtener canción:", error);

    if (error.message === "Canción no encontrada") {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al obtener la canción",
      details: error.message,
    });
  }
};

export const createCancion = async (req, res) => {
  try {
    const nuevaCancion = await cancionService.createCancion(req.body);

    res.status(201).json({
      success: true,
      message: "Canción creada exitosamente",
      data: nuevaCancion,
    });
  } catch (error) {
    console.error("Error al crear canción:", error);

    if (
      error.name === "ValidationError" ||
      error.name === "SequelizeValidationError"
    ) {
      return res.status(400).json({
        success: false,
        error: "Error de validación",
        details:
          error.name === "SequelizeValidationError"
            ? error.errors.map((e) => e.message)
            : error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al crear la canción",
      details: error.message,
    });
  }
};

export const updateCancion = async (req, res) => {
  try {
    const { id } = req.params;
    const cancion = await cancionService.updateCancion(id, req.body);

    res.json({
      success: true,
      message: "Canción actualizada exitosamente",
      data: cancion,
    });
  } catch (error) {
    console.error("Error al actualizar canción:", error);

    if (error.message === "Canción no encontrada") {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        error: "Error de validación",
        details: error.errors.map((e) => e.message),
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al actualizar la canción",
      details: error.message,
    });
  }
};

export const deleteCancion = async (req, res) => {
  try {
    const { id } = req.params;
    await cancionService.deleteCancion(id);

    res.json({
      success: true,
      message: "Canción eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar canción:", error);

    if (error.message === "Canción no encontrada") {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al eliminar la canción",
      details: error.message,
    });
  }
};

export const searchCanciones = async (req, res) => {
  try {
    const { query } = req.query;
    const canciones = await cancionService.searchCanciones(query);

    res.json({
      success: true,
      count: canciones.length,
      data: canciones,
    });
  } catch (error) {
    console.error("Error al buscar canciones:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al buscar canciones",
      details: error.message,
    });
  }
};
