/* eslint-disable no-underscore-dangle */
import {
  NextFunction, Request, Response,
} from 'express';
import mongoose from 'mongoose';

import Calls, { ICall } from '@models/Call';
import Bases from '@models/Bases';
import Users from '@models/Users';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

export default module.exports = {

  async index(req:Request, res: Response) {
    Calls.find()
      .populate('base', 'name')
      .populate('user', 'login')
      .exec((err: Error, calls: Array<ICall>) => {
        if (err) return res.status(500).json({ err });

        return res.status(200).json({ calls });
      });
  },

  async show(req: Request, res: Response) {
    Calls.findById(req.params.id)
      .populate('base', 'name')
      .populate('user', 'login')
      .exec((err: Error, call: ICall) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(call);
      });
  },

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const call: ICall = await Calls.create(req.body);

      Bases.findOneAndUpdate(
        { _id: req.body.base },
        { $push: { calls: call._id } },
        { new: true },
        (error: Error) => {
          if (error) return res.status(500).json({ error });

          return next();
        },
      );

      Users.findOneAndUpdate(
        { _id: req.body.user },
        { $push: { openedCalls: call._id } },
        { new: true }, (error: Error) => {
          if (error) return res.status(500).json({ error });
          return next();
        },
      );

      return res.status(201).json({ message: 'Chamado inserido com sucesso!', call });
    } catch (errors: any) {
      return res.status(400).send(errors);
    }
  },

  async update(req: Request, res: Response) {
    const call: ICall = await Calls.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json(call);
  },

  async destroy(req: Request, res: Response, next: NextFunction) {
    const call = await Calls.findByIdAndDelete(req.params.id);

    Bases.findOneAndUpdate(
      { _id: call.base },

      { $pull: { calls: call._id } },
      { new: true },
      (error: Error) => {
        if (error) return res.status(500).json({ error });

        return next();
      },
    );

    Users.findOneAndUpdate(
      { _id: call.user },

      { $pull: { openedCalls: call._id, closedCalls: call._id } },
      { new: true },
      (error: Error) => {
        if (error) return res.status(500).json({ error });

        return next();
      },
    );
    return res.status(202).json({ message: `Chamado ${call.callId} deletado com sucesso!` });
  },
};
