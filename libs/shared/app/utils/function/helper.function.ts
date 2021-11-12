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
  return `agent/api/workflows/${workflowKey}/${stepId}/${storeId}`;
}
