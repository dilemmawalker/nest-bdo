import { Properties } from 'aws-sdk/clients/cloudformation';

export class ActivityDto {
  // refId: string;
  log_name: string;
  description: string;
  subject_type: string;
  subject_id: string;
  causer_type: string;
  causer_id: Properties;
  properties: string;
  created_at: Date;
}
