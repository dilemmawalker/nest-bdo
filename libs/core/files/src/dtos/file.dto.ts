import { uploadType } from '@shared/constant/upload-type.constant';

export class FileDto {
  keyName: string;
  isTemp = true;
  url: string;
  refId: string;
  type: uploadType;
}
