import { extname } from 'path';
export class FileUploadingUtils {
  public static imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidationError = 'only image files allowed';
      return callback(null, false);
    }
    callback(null, true);
  };

  public static docFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(doc|docx|txt|pdf)$/)) {
      req.fileValidationError = 'only image files allowed';
      return callback(null, false);
    }
    callback(null, true);
  };

  public static editFilename = (filename): string => {
    const name = filename.split('.')[0];
    const fileExtName = extname(filename);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${randomName}${fileExtName}`;
  };

  public static getImageFilename = (filename) => {
    return 'img/' + this.editFilename(filename);
  };
  public static getDocFilename = (filename) => {
    return 'docs/' + this.editFilename(filename);
  };
}
