import * as mongoose from 'mongoose';

export class ClusterDto {
  name: string;
  lead: mongoose.Types.ObjectId;
}
