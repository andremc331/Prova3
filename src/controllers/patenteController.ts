import { Request, Response } from "express";
import { Patente } from "../schemas/index";

class PatenteController {
  public async create(req: Request, res: Response): Promise<any> {
    const { codigo, descricao } = req.body;

    try {
      const document = new Patente({ codigo, descricao });
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error?.errors?.codigo) {
        return res.json({ message: error.errors["codigo"].message });
      } else if (error?.errors?.descricao) {
        return res.json({ message: error.errors["descricao"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response): Promise<any> {
    try {
      const patentes = await Patente.find().sort({ descricao: "asc" });
      return res.json(patentes);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { id: _id } = req.body;
    try {
      const patente = await Patente.findByIdAndDelete(_id);
      if (patente) {
        return res.json({ message: "Patente excluída com sucesso" });
      } else {
        return res.json({ message: "Patente inexistente" });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    const { id, codigo, descricao } = req.body;

    try {
      const document = await Patente.findById(id);
      if (!document) {
        return res.json({ message: "Patente inexistente" });
      }

      document.codigo = codigo;
      document.descricao = descricao;

      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error?.errors?.codigo) {
        return res.json({ message: error.errors["codigo"].message });
      } else if (error?.errors?.descricao) {
        return res.json({ message: error.errors["descricao"].message });
      }
      return res.json({ message: error.message });
    }
  }
}

export default new PatenteController();