import { Request, Response } from "express";
import { Militar } from "../schemas/index";

class MilitarController {
  public async create(req: Request, res: Response): Promise<any> {
    const { nome, idade, email, fone } = req.body;

    try {
      const document = new Militar({ nome, idade, email, fone });
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        return res.json({ message: "E-mail já em uso" });
      } else if (error?.errors?.nome) {
        return res.json({ message: error.errors["nome"].message });
      } else if (error?.errors?.idade) {
        return res.json({ message: error.errors["idade"].message });
      } else if (error?.errors?.email) {
        return res.json({ message: error.errors["email"].message });
      } else if (error?.errors?.fone) {
        return res.json({ message: error.errors["fone"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response): Promise<any> {
    try {
      const militares = await Militar.find().sort({ nome: "asc" });
      return res.json(militares);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { id: _id } = req.body;
    try {
      const militar = await Militar.findByIdAndDelete(_id);
      if (militar) {
        return res.json({ message: "Militar excluído com sucesso" });
      } else {
        return res.json({ message: "Militar inexistente" });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    const { id, nome, idade, email, fone } = req.body;

    try {
      const document = await Militar.findById(id);
      if (!document) {
        return res.json({ message: "Militar inexistente" });
      }

      document.nome = nome;
      document.idade = idade;
      document.email = email;
      document.fone = fone;

      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        return res.json({ message: "E-mail já em uso" });
      } else if (error?.errors?.nome) {
        return res.json({ message: error.errors["nome"].message });
      } else if (error?.errors?.idade) {
        return res.json({ message: error.errors["idade"].message });
      } else if (error?.errors?.email) {
        return res.json({ message: error.errors["email"].message });
      } else if (error?.errors?.fone) {
        return res.json({ message: error.errors["fone"].message });
      }
      return res.json({ message: error.message });
    }
  }
}

export default new MilitarController();