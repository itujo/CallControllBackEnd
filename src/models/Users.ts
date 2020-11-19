import mongoose, { Document, Schema } from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';

const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IUser extends Document {
  login: String;
  openedCalls: [Schema.Types.ObjectId];
  closedCalls: [Schema.Types.ObjectId];
}

const UserSchema: Schema = new Schema({
  login: { type: String, required: true, unique: true },
  openedCalls: [
    { type: Schema.Types.ObjectId, ref: 'Call' },
  ],
  closedCalls: [
    { type: Schema.Types.ObjectId, ref: 'Call' },
  ],
});

UserSchema.plugin(uniqueValidator);

UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

export default mongoose.model<IUser>('User', UserSchema);
