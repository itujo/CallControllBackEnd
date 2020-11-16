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
  createdAt: Date;
}

export const CallSchema: Schema = new mongoose.Schema({
  callId: { type: String, unique: true },
  callType: { type: String, required: true },
  fullName: { type: String, required: true },
  cpf: { type: String },
  address: { type: String, required: true },
  cep: { type: String, required: true },
  city: { type: String, required: true },
  resPhone: { type: String, required: true },
  comercialPhone: { type: String, required: false },
  cellPhone: { type: String, required: true },
  cellPhone2: { type: String, required: false },
  email: { type: String, required: true },
  nfe: { type: String, required: true, unique: true },
  nfeEmiss: { type: Date, required: true },
  romaneio: { type: String, required: true },
  router: { type: String, required: true },
  sellType: { type: String, required: true },
  prevDate: { type: Date, required: true },
  isOpen: { type: Boolean, required: true, default: true },
  observation: { type: String, required: false },
  base: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true, default: null,
  },
  createdAt: { type: Date, default: Date.now },
});
CallSchema.plugin(uniqueValidator);

export default mongoose.model<ICall>('Call', CallSchema);
