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

export function getFormattedDate(date: Date): string {
  const dateString =
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear().toString().substring(2);
  return dateString;
}

export function getFormattedTime(date: Date): string {
  const timeString =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return timeString;
}

export function generateWorkflowUrl(
  workflowKey: string,
  stepId: string,
  storeId: string,
): string {
  return `agent/api/workflows/${workflowKey}/${stepId}/${storeId}`;
}

export function empty(e) {
  switch (e) {
    case '':
    case null:
    case typeof e == 'undefined':
      return true;
    default:
      return false;
  }
}
