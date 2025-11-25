import Cancion from "../models/Cancion.js";
import { Op } from "sequelize";

class CancionService {
  constructor(cancion) {
    this.cancion = cancion;
  }

  // GET /canciones
  getAllCanciones = async () => {
    const canciones = await this.cancion.findAll({
      order: [["IdCancion", "ASC"]],
    });
    return canciones;
  };

  // GET /canciones/:id
  getCancionById = async (id) => {
    const cancion = await this.cancion.findByPk(id);
    if (!cancion) {
      throw new Error("Canción no encontrada");
    }
    return cancion;
  };

  // POST /canciones
  createCancion = async (data) => {
    const { Name, IdArtista } = data;

    if (!Name || !IdArtista) {
      const error = new Error("Los campos Name e IdArtista son obligatorios");
      error.name = "ValidationError";
      throw error;
    }

    return await this.cancion.create({ Name, IdArtista });
  };

  // PUT /canciones/:id
  updateCancion = async (id, data) => {
    const cancion = await this.getCancionById(id);

    const { Name, IdArtista } = data;

    if (Name !== undefined) cancion.Name = Name;
    if (IdArtista !== undefined) cancion.IdArtista = IdArtista;

    await cancion.save();

    return cancion;
  };

  // DELETE /canciones/:id
  deleteCancion = async (id) => {
    const cancion = await this.getCancionById(id);

    await cancion.destroy();

    return true;
  };

  // GET /canciones/search?query=
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
    });
  };
}

export default CancionService;
