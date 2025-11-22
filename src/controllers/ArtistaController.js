import artistaService from "../services/artistaService.js";

export const getAllArtistas = async (req, res) => {
  debugger;
  try {
    const artista = await artistaService.getAllArtistas();

    res.json({
      success: true,
      count: artista.length,
      data: artista,
    });
  } catch (error) {
    console.error("Error al obtener artistas:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener los artistas",
      details: error.message,
    });
  }
};

export const getArtistaById = async (req, res) => {
  try {
    const { id } = req.params;
    debugger;
    const artista = await artistaService.getArtistaById(id);

    res.json({
      success: true,
      data: artista,
    });
  } catch (error) {
    console.error("Error al obtener artista:", error);

    if (error.message === "Artista no encontrada") {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al obtener el artista",
      details: error.message,
    });
  }
};

export const createArtista = async (req, res) => {
  try {
    console.log("Datos recibidos para crear artista:", req.body);
    const nuevoArtista = await artistaService.createArtista(req.body);

    res.status(201).json({
      success: true,
      message: "Artista creado exitosamente",
      data: nuevoArtista,
    });
  } catch (error) {
    console.error("Error al crear artista:", error);

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
      error: "Error al crear la artista",
      details: error.message,
    });
  }
};

export const updateArtista = async (req, res) => {
  try {
    const { id } = req.params;
    const artista = await artistaService.updateArtista(id, req.body);

    res.json({
      success: true,
      message: "Artista actualizado exitosamente",
      data: artista,
    });
  } catch (error) {
    console.error("Error al actualizar artista:", error);

    if (error.message === "Artista no encontrado") {
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
      error: "Error al actualizar el artista",
      details: error.message,
    });
  }
};

export const deleteArtista = async (req, res) => {
  try {
    const { id } = req.params;
    await artistaService.deleteArtista(id);

    res.json({
      success: true,
      message: "Artista eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar artista:", error);

    if (error.message === "Artista no encontrada") {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al eliminar la artista",
      details: error.message,
    });
  }
};

export const searchArtistas = async (req, res) => {
  try {
    const { query } = req.query;
    const artista = await artistaService.searchArtistas(query);

    res.json({
      success: true,
      count: artista.length,
      data: artista,
    });
  } catch (error) {
    console.error("Error al buscar artistas:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al buscar artistas",
      details: error.message,
    });
  }
};
