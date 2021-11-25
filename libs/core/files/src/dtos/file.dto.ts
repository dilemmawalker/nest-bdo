import { uploadType } from '@shared/constant/upload-type.constant';

export class FileDto {
  keyName: string;
  isTemp = false;
  isMultiple = false;
  url: string;
  refId: string;
  type: uploadType;
  fileName: string;
}
