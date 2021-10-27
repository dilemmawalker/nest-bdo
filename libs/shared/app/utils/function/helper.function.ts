import { extname } from 'path';

export function toUriPath(path: string): string {
  return `/${path}`;
}

export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function generateWorkflowUrl(
  workflowKey: string,
  stepId: string,
  storeId: string,
) {
  return `agent/api/workflow/${workflowKey}/${stepId}/${storeId}`;
}

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'only image files allowed';
    return callback(null, false);
  }
  callback(null, true);
};

export const docFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(doc|docx|txt)$/)) {
    req.fileValidationError = 'only image files allowed';
    return callback(null, false);
  }
  callback(null, true);
};
export const editFilename = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}-${fileExtName}`);
};
