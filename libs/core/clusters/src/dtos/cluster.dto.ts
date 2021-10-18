import * as mongoose from 'mongoose';

export class ClusterDto {
  name: string;
  onboarding: mongoose.Types.ObjectId;
  onboardingWorkflowKey: string;
}
