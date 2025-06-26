import { Request, Response } from "express";
import { Soldado } from "../schemas/index";

class SoldadoController {
  public async create(req: Request, res: Response): Promise<any> {
    const { cim, altura, militar } = req.body;

    try {
      const document = new Soldado({ cim, altura, militar });
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        return res.json({ message: "CIM já em uso" });
      } else if (error?.errors?.cim) {
        return res.json({ message: error.errors["cim"].message });
      } else if (error?.errors?.altura) {
        return res.json({ message: error.errors["altura"].message });
      } else if (error?.errors?.militar) {
        return res.json({ message: error.errors["militar"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response): Promise<any> {
    try {
      const soldados = await Soldado.find().populate("militar").sort({ cim: "asc" });
      return res.json(soldados);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { id: _id } = req.body;
    try {
      const soldado = await Soldado.findByIdAndDelete(_id);
      if (soldado) {
        return res.json({ message: "Soldado excluído com sucesso" });
      } else {
        return res.json({ message: "Soldado inexistente" });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    const { id, cim, altura, militar } = req.body;

    try {
      const document = await Soldado.findById(id);
      if (!document) {
        return res.json({ message: "Soldado inexistente" });
      }

      document.cim = cim;
      document.altura = altura;
      document.militar = militar;

      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        return res.json({ message: "CIM já em uso" });
      } else if (error?.errors?.cim) {
        return res.json({ message: error.errors["cim"].message });
      } else if (error?.errors?.altura) {
        return res.json({ message: error.errors["altura"].message });
      } else if (error?.errors?.militar) {
        return res.json({ message: error.errors["militar"].message });
      }
      return res.json({ message: error.message });
    }
  }
}

export default new SoldadoController();