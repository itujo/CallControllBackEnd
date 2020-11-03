import Call, { ICall } from '@models/Call';
import { CreateQuery } from 'mongoose';

async function CreateCall({
  callId,
  callType,
  fullName,
  cpf,
  address,
  cep,
  city,
  resPhone,
  comercialPhone,
  cellPhone,
  cellPhone2,
  email,
  nfe,
  nfeEmiss,
  romaneio,
  router,
  sellType,
  prevDate,
  isOpen,
  observation,
  base,
  createdAt,
}: CreateQuery<ICall>): Promise<ICall> {
  return Call.create({
    callId,
    callType,
    fullName,
    cpf,
    address,
    cep,
    city,
    resPhone,
    comercialPhone,
    cellPhone,
    cellPhone2,
    email,
    nfe,
    nfeEmiss,
    romaneio,
    router,
    sellType,
    prevDate,
    isOpen,
    observation,
    base,
    createdAt,
  })
    .then((data: ICall) => data)
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  CreateCall,
};
