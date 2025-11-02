import Cancion from "../models/Cancion.js";
import { Op } from "sequelize";

// GET - Obtener todas las canciones
export const getAllCanciones = async (req, res) => {
  try {
    const canciones = await Cancion.findAll({
      order: [["Name", "ASC"]],
    });

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

// GET - Obtener una canción por ID
export const getCancionById = async (req, res) => {
  try {
    const { id } = req.params;

    const cancion = await Cancion.findByPk(id);

    if (!cancion) {
      return res.status(404).json({
        success: false,
        error: "Canción no encontrada",
      });
    }

    res.json({
      success: true,
      data: cancion,
    });
  } catch (error) {
    console.error("Error al obtener canción:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener la canción",
      details: error.message,
    });
  }
};

// POST - Crear una nueva canción
export const createCancion = async (req, res) => {
  try {
    const { Name, Artista } = req.body;

    // Validar datos requeridos
    if (!Name || !Artista) {
      return res.status(400).json({
        success: false,
        error: "Los campos Name y Artista son obligatorios",
      });
    }

    const nuevaCancion = await Cancion.create({
      Name,
      Artista,
    });

    res.status(201).json({
      success: true,
      message: "Canción creada exitosamente",
      data: nuevaCancion,
    });
  } catch (error) {
    console.error("Error al crear canción:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        error: "Error de validación",
        details: error.errors.map((e) => e.message),
      });
    }

    res.status(500).json({
      success: false,
      error: "Error al crear la canción",
      details: error.message,
    });
  }
};

// PUT - Actualizar una canción
export const updateCancion = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Artista } = req.body;

    const cancion = await Cancion.findByPk(id);

    if (!cancion) {
      return res.status(404).json({
        success: false,
        error: "Canción no encontrada",
      });
    }

    // Actualizar solo los campos proporcionados
    if (Name !== undefined) cancion.Name = Name;
    if (Artista !== undefined) cancion.Artista = Artista;

    await cancion.save();

    res.json({
      success: true,
      message: "Canción actualizada exitosamente",
      data: cancion,
    });
  } catch (error) {
    console.error("Error al actualizar canción:", error);

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

// DELETE - Eliminar una canción
export const deleteCancion = async (req, res) => {
  try {
    const { id } = req.params;

    const cancion = await Cancion.findByPk(id);

    if (!cancion) {
      return res.status(404).json({
        success: false,
        error: "Canción no encontrada",
      });
    }

    await cancion.destroy();

    res.json({
      success: true,
      message: "Canción eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar canción:", error);
    res.status(500).json({
      success: false,
      error: "Error al eliminar la canción",
      details: error.message,
    });
  }
};

// GET - Buscar canciones por nombre o artista
export const searchCanciones = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: "El parámetro 'query' es requerido",
      });
    }

    const canciones = await Cancion.findAll({
      where: {
        [Op.or]: [
          { Name: { [Op.like]: `%${query}%` } },
          { Artista: { [Op.like]: `%${query}%` } },
        ],
      },
      order: [["Name", "ASC"]],
    });

    res.json({
      success: true,
      count: canciones.length,
      data: canciones,
    });
  } catch (error) {
    console.error("Error al buscar canciones:", error);
    res.status(500).json({
      success: false,
      error: "Error al buscar canciones",
      details: error.message,
    });
  }
};
