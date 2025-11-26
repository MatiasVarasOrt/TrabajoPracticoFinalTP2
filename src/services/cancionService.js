import Artista from "../models/Artista.js";
import { Op } from "sequelize";

class CancionService {
  constructor(cancion) {
    this.cancion = cancion;
  }

  getAllCanciones = async () => {
    const canciones = await this.cancion.findAll({
      attributes: ["IdCancion", "Name"],
      order: [["IdCancion", "ASC"]],
      include: {
        model: Artista,
        as: "Artista",
        attributes: ["IdArtista", "Name"],
      },
    });
    return canciones;
  };

  getCancionById = async (id) => {
    const cancion = await this.cancion.findByPk(id, {
      attributes: ["IdCancion", "Name"],
      include: {
        model: Artista,
        as: "Artista",
        attributes: ["IdArtista", "Name"],
      },
    });
    if (!cancion) {
      throw new Error("Canción no encontrada");
    }
    return cancion;
  };

  createCancion = async (data) => {
    const { Name, IdArtista } = data;

    if (!Name || Name.trim() === "") {
      const error = new Error("El campo Name es obligatorio");
      error.name = "ValidationError";
      throw error;
    }

    if (!IdArtista || typeof IdArtista !== "number" || IdArtista <= 0) {
      const error = new Error(
        "El campo IdArtista debe ser un número válido mayor a 0"
      );
      error.name = "ValidationError";
      throw error;
    }

    const nuevaCancion = await this.cancion.create({ Name, IdArtista });

    // se incluye al artista en la respuesta
    return await this.cancion.findByPk(nuevaCancion.IdCancion, {
      attributes: ["IdCancion", "Name"],
      include: {
        model: Artista,
        as: "Artista",
        attributes: ["IdArtista", "Name"],
      },
    });
  };

  updateCancion = async (id, data) => {
    const cancion = await this.getCancionById(id);

    const { Name, IdArtista } = data;

    // Validar Name si se proporciona
    if (Name !== undefined) {
      if (typeof Name !== "string" || Name.trim() === "") {
        const error = new Error("El campo Name debe ser un texto no vacío");
        error.name = "ValidationError";
        throw error;
      }
      cancion.Name = Name.trim();
    }

    // Validar IdArtista si se proporciona
    if (IdArtista !== undefined) {
      if (typeof IdArtista !== "number" || IdArtista <= 0) {
        const error = new Error(
          "El campo IdArtista debe ser un número válido mayor a 0"
        );
        error.name = "ValidationError";
        throw error;
      }

      // Verificar que el artista existe
      const artista = await Artista.findByPk(IdArtista);
      if (!artista) {
        const error = new Error(`El artista con ID ${IdArtista} no existe`);
        error.name = "ValidationError";
        throw error;
      }

      cancion.IdArtista = IdArtista;
    }

    await cancion.save();

    // se incluye al artista en la respuesta
    return await this.cancion.findByPk(id, {
      attributes: ["IdCancion", "Name"],
      include: {
        model: Artista,
        as: "Artista",
        attributes: ["IdArtista", "Name"],
      },
    });
  };

  deleteCancion = async (id) => {
    const cancion = await this.getCancionById(id);

    await cancion.destroy();

    return true;
  };

  searchCanciones = async (query) => {
    if (!query) {
      const error = new Error("El parámetro 'query' es requerido");
      error.name = "ValidationError";
      throw error;
    }

    return await this.cancion.findAll({
      where: {
        Name: { [Op.like]: `%${query}%` },
      },
      order: [["IdCancion", "ASC"]],
      include: {
        model: Artista,
        as: "Artista",
        attributes: ["IdArtista", "Name"],
      },
    });
  };
}

export default CancionService;
