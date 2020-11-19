import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Users, { IUser } from '@models/Users';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

export default module.exports = {
  async index(req: Request, res: Response) {
    Users.find()
      .populate('openedCalls', 'callId')
      .exec((err: Error, user: IUser) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(user);
      });
  },

  async show(req: Request, res: Response) {
    Users.findById(req.params.id).populate('openedCalls', 'callId').exec((err:Error, user: IUser) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(user);
    });
  },

  async store(req: Request, res: Response) {
    try {
      const user: IUser = await Users.create(req.body);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({
        error,
      });
    }
  },

  async update(req: Request, res: Response) {
    const user: IUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json(user);
  },

  async destroy(req: Request, res: Response) {
    const user: IUser = await Users.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      mensagem: `Usuario ${user.id} deletado  com sucesso!`,
    });
  },
};
