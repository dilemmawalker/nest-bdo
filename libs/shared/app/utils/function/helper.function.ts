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

export function getAgreementName(store) {
  const date_time = `${new Date().toISOString().split('T')[0]}`;
  return `1K_Retailer_Agreement_${store
    .get('store_name')
    .replace(' ', '')}_${getInitials(
    store.get('owner_name').replace(' ', ''),
  )}_${date_time}_${
    store.get('createdBy')
      ? store.get('createdBy')['agentId'].toString()
      : store.get('storeId')
  }.pdf`;
}

export function getInitials(string) {
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
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
