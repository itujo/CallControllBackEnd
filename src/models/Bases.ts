import mongoose, { Document, Schema } from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';

const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IBase extends Document {
  name: String;
  calls: [Schema.Types.ObjectId];
}

const BaseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  calls: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Call',
    },
  ],
});

BaseSchema.plugin(uniqueValidator);

BaseSchema.plugin(AutoIncrement, { inc_field: 'id' });

export default mongoose.model<IBase>('Base', BaseSchema);
