import Cancion from "../models/Cancion.js";
import { Op } from "sequelize";

export class CancionService {
  async getAllCanciones() {
    return await Cancion.findAll({
      order: [["Name", "ASC"]],
    });
  }

  async getCancionById(id) {
    const cancion = await Cancion.findByPk(id);
    if (!cancion) {
      throw new Error("Canción no encontrada");
    }
    return cancion;
  }

  async createCancion(data) {
    const { Name, Artista } = data;

    if (!Name || !Artista) {
      const error = new Error("Los campos Name y Artista son obligatorios");
      error.name = "ValidationError";
      throw error;
    }

    return await Cancion.create({ Name, Artista });
  }

  async updateCancion(id, data) {
    const cancion = await Cancion.findByPk(id);

    if (!cancion) {
      throw new Error("Canción no encontrada");
    }

    const { Name, Artista } = data;

    if (Name !== undefined) cancion.Name = Name;
    if (Artista !== undefined) cancion.Artista = Artista;

    await cancion.save();

    return cancion;
  }

  async deleteCancion(id) {
    const cancion = await Cancion.findByPk(id);

    if (!cancion) {
      throw new Error("Canción no encontrada");
    }

    await cancion.destroy();

    return true;
  }

  async searchCanciones(query) {
    if (!query) {
      const error = new Error("El parámetro 'query' es requerido");
      error.name = "ValidationError";
      throw error;
    }

    return await Cancion.findAll({
      where: {
        [Op.or]: [
          { Name: { [Op.like]: `%${query}%` } },
          { Artista: { [Op.like]: `%${query}%` } },
        ],
      },
      order: [["Name", "ASC"]],
    });
  }
}

export default new CancionService();
