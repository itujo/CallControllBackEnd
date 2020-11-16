import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Bases, { IBase } from '@models/Bases';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

export default module.exports = {
  // LISTAR TODOS OS CHAMADO
  async index(req: Request, res: Response) {
    Bases.find()
      .populate('calls', 'callId')
      .exec((err: Error, base: IBase) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(base);
      });
  },

  // MAIS INFORMAÇÕES DO CHAMADO ID
  async show(req: Request, res: Response) {
    const base: IBase = await Bases.findById(req.params.id);

    return res.status(200).json(base);
  },

  // SALVAR CHAMADO
  async store(req: Request, res: Response) {
    try {
      const base: IBase = await Bases.create(req.body);

      return res.status(201).json(base);
    } catch (error: any) {
      return res.status(400).json({
        error,
      });
    }
  },

  // ATUALIZAR CHAMADO
  async update(req: Request, res: Response) {
    const base: IBase = await Bases.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json(base);
  },

  // DELETAR CHAMADO
  async destroy(req: Request, res: Response) {
    const base: IBase = await Bases.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      mensagem: `Base ${base.id} deletada  com sucesso!`,
    });
  },
};
