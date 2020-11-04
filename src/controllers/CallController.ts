/* eslint-disable no-console */
import { Request, Response } from 'express';

import mongoose from 'mongoose';

import Calls from '@models/Call';
import Bases from '@models/Bases';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

export default module.exports = {
  // LISTAR TODOS OS CHAMADO
  async index(req:Request, res: Response) {
    Calls.find()
      .populate('base', 'name')
      .exec((err: Error, calls: JSON) => {
        if (err) return res.status(500).json({ err });

        return res.status(200).json({ calls });
      });
  },

  // MAIS INFORMAÇÕES DO CHAMADO ID
  async show(req: Request, res: Response) {
    Calls.findById(req.params.id)
      .populate('base', 'name')
      .exec((err: Error, call: JSON) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(call);
      });
  },

  // SALVAR CHAMADO
  async store(req, res) {
    try {
      const call = await Calls.create(req.body);

      Bases.findOneAndUpdate(
        { _id: req.body.base },
        // eslint-disable-next-line no-underscore-dangle
        { $push: { calls: call._id } },
        (error, success) => {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        },
      );
      return res.status(201).json(call);
    } catch (erro) {
      console.log(erro);
      res.status(400).json({
        message:
          'Falha ao inserir chamado, o número do chamado deve ser único!',
        erro,
      });
    }
    return res.json({ message: 'test' });
  },

  // ATUALIZAR CHAMADO
  async update(req, res) {
    const call = await Calls.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json(call);
  },

  // DELETAR CHAMADO
  async destroy(req, res) {
    // const call = await Calls.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      // mensagem: `Chamado de numero ${call.callId} deletado  com sucesso!`,
      mensagem: 'deletado',
    });
  },
};
