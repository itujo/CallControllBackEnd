import mongoose from 'mongoose';

const Bases = mongoose.model('Base');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const BasesMod = {
  // LISTAR TODOS OS CHAMADO
  async index(req, res) {
    Bases.find()
      .populate('calls', 'callId')
      .exec((err, base) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(base);
      });
  },

  // MAIS INFORMAÇÕES DO CHAMADO ID
  async show(req, res) {
    const base = await Bases.findById(req.params.id);

    return res.status(200).json(base);
  },

  // SALVAR CHAMADO
  async store(req, res) {
    try {
      const base = await Bases.create(req.body);

      return res.status(201).json(base);
    } catch (error) {
      return res.status(400).json({
        message: 'Falha ao inserir base, o nome da base deve ser único!',
        debug: error,
      });
    }
  },

  // ATUALIZAR CHAMADO
  async update(req, res) {
    const base = await Bases.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json(base);
  },

  // DELETAR CHAMADO
  async destroy(req, res) {
    const base = await Bases.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      mensagem: `Base ${base.id} deletada  com sucesso!`,
    });
  },
};

export default BasesMod;
