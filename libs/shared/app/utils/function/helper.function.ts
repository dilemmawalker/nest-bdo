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

export function getCurrentDate(): Date {
  const todayDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });
  return new Date(todayDateTime);
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


export function generateNextPageUrl(
  page: number,
  limit: number,
  status: string,
  storeCount: number,
): string {
  const skip = page * limit;
  if (page == null || page < 1 || skip >= storeCount) return '';
  return `agent/api/agent/stores/${status}?page=${page + 1}&limit=${limit}`;
}

export function generatePreviousPageUrl(
  page: number,
  limit: number,
  status: string,
  storeCount: number,
): string {
  const skip = (page - 2) * limit;
  const prevPage = Math.ceil(storeCount / limit);
  if (page == null || page <= 1) return '';
  if (skip >= storeCount)
    return `agent/api/agent/stores/${status}?page=${prevPage}&limit=${limit}`;
  return `agent/api/agent/stores/${status}?page=${page - 1}&limit=${limit}`;
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

//Workflows/WorkflowController_getWorkflowSteps
//Agents/AgentController_get

