import Artista from "../models/Artista.js";
import Cancion from "../models/Cancion.js";
import { Op } from "sequelize";

class ArtistaService {
  constructor(artista) {
    this.artista = artista;
  }

  async getAllArtistas() {
    return await this.artista.findAll({
      order: [["Name", "ASC"]],
      include: [
        {
          model: Cancion,
          as: "Canciones",
          attributes: ["IdCancion", "Name"],
        },
      ],
    });
  }

  async getArtistaById(id) {
    const artista = await this.artista.findByPk(id, {
      include: [
        {
          model: Cancion,
          as: "Canciones",
          attributes: ["IdCancion", "Name"],
        },
      ],
    });

    if (!artista) {
      throw new Error("Artista no encontrado");
    }

    return artista;
  }

  async createArtista(data) {
    const { Name } = data;

    if (!Name) {
      const error = new Error("El campo Name es necesario");
      error.name = "ValidationError";
      throw error;
    }

    return await Artista.create({ Name }); // ← CORREGIDO: pasar objeto
  }

  async updateArtista(id, data) {
    const artista = await this.artista.findByPk(id);

    if (!artista) {
      throw new Error("Artista no encontrado");
    }

    const { Name } = data;

    if (Name !== undefined) artista.Name = Name;

    await artista.save();

    return artista;
  }

  async deleteArtista(id) {
    const artista = await this.artista.findByPk(id);

    if (!artista) {
      throw new Error("Artista no encontrado");
    }

    await artista.destroy();

    return true;
  }

  async searchArtistas(query) {
    if (!query) {
      const error = new Error("El parámetro 'query' es requerido");
      error.name = "ValidationError";
      throw error;
    }

    return await this.artista.findAll({
      where: {
        Name: { [Op.like]: `%${query}%` },
      },
      order: [["Name", "ASC"]],
    });
  }
}

export default ArtistaService;
