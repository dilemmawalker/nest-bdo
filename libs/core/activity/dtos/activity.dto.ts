export class ActivityDto {
  constructor(
    log_name: string,
    description: string,
    subject_type: string,
    subject_id: string,
    causer_type: string,
    causer_id: string,
    properties: any,
    created_at: Date,
  ) {
    this.log_name = log_name;
    this.description = description;
    this.subject_type = subject_type;
    this.subject_id = subject_id;
    this.causer_type = causer_type;
    this.causer_id = causer_id;
    this.properties = properties;
    this.created_at = created_at;
  }
  log_name: string;
  description: string;
  subject_type: string;
  subject_id: string;
  causer_type: string;
  causer_id: string;
  properties: any;
  created_at: Date;
}
