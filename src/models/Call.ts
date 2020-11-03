import mongoose, { Document, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface ICall extends Document {
  callId: string;
  callType: string;
  fullName: string;
  cpf: string;
  address: string;
  cep: string;
  city: string;
  resPhone: string;
  comercialPhone: string;
  cellPhone: string;
  cellPhone2: string;
  email: string;
  nfe: string;
  nfeEmiss: Date;
  romaneio: string;
  router: string;
  sellType: string;
  prevDate: Date;
  isOpen: boolean;
  observation: string;
  base: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const CallSchema: Schema = new mongoose.Schema({
  callId: {
    type: String,
    unique: true,
  },
  callType: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  resPhone: {
    type: String,
    required: true,
  },
  comercialPhone: {
    type: String,
    required: false,
  },
  cellPhone: {
    type: String,
    required: true,
  },
  cellPhone2: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  nfe: {
    type: String,
    required: true,
    unique: true,
  },
  nfeEmiss: {
    type: Date,
    required: true,
  },
  romaneio: {
    type: String,
    required: true,
  },
  router: {
    type: String,
    required: true,
  },
  sellType: {
    type: String,
    required: true,
  },
  prevDate: {
    type: Date,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true,
  },
  observation: {
    type: String,
    required: false,
  },
  base: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Base',
    required: true,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CallSchema.plugin(uniqueValidator);

export default mongoose.model<ICall>('Call', CallSchema);
