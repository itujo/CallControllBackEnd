import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface ICall extends Document {
  callId: String;
  callType: String;
  fullName: String;
  cpf: String;
  address: String;
  cep: String;
  city: String;
  resPhone: String;
  comercialPhone: String;
  cellPhone: String;
  cellPhone2: String;
  email: String;
  nfe: String;
  nfeEmiss: Date;
  romaneio: String;
  router: String;
  sellType: String;
  prevDate: Date;
  isOpen: Boolean;
  observation: String;
  base: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const CallSchema: Schema = new mongoose.Schema({
  callId: { type: String, unique: true, required: [true, 'Número de chamado'] },
  callType: { type: String, required: true },
  fullName: { type: String, required: true },
  cpf: { type: String },
  address: { type: String, required: [true, 'Endereço'] },
  cep: { type: String, required: [true, 'CEP'] },
  city: { type: String, required: [true, 'Cidade'] },
  resPhone: { type: String, required: [true, 'Telefone'] },
  comercialPhone: { type: String },
  cellPhone: { type: String, required: [true, 'Celular'] },
  cellPhone2: { type: String },
  email: { type: String, required: [true, 'EmaiL'] },
  nfe: { type: String, required: [true, 'NFE'] },
  nfeEmiss: { type: Date, required: [true, 'Data de emissão NFE'] },
  romaneio: { type: String, required: [true, 'Romaneio'] },
  router: { type: String, required: [true, 'Roteiro'] },
  sellType: { type: String, required: [true, 'Tipo de venda'] },
  prevDate: { type: Date, required: [true, 'Previsão de retorno'] },
  isOpen: { type: Boolean, required: [true, 'Status'], default: true },
  observation: { type: String },
  base: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: [true, 'Base'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Usuário'],
  },
  createdAt: { type: Date, default: Date.now },
});
CallSchema.plugin(uniqueValidator, { message: 'Número de chamado já cadastrado' });

export default mongoose.model<ICall>('Call', CallSchema);
