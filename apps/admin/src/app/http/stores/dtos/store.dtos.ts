class StoreField {
  inputValue: any = '';
  keyName: any;
  groupKey: any;
}
export class StoreDto {
  constructor(workflowKey: string, stepId: string, storeId: string) {
    this.workflowKey = workflowKey;
    this.stepId = stepId;
    this.storeId = storeId;
  }
  stepId: string;
  storeId: string;
  workflow: any;
  workflowKey: string;
  currentStepId: string;
  agentId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  fields: StoreField[] = [];

  static getStoreObj(storeData: StoreDto) {
    const storeObj = {};
    storeObj['storeId'] = storeData.storeId;
    storeObj['status'] = storeData.status;
    if (storeData.createdAt) {
      storeObj['createdAt'] = storeData.createdAt;
    }
    if (storeData.workflowKey) {
      storeObj['workflowKey'] = storeData.workflowKey;
    }
    storeObj['currentStepId'] = storeData.currentStepId;
    storeObj['updatedAt'] = storeData.updatedAt;
    storeData.fields.forEach((element) => {
      if (!element.groupKey) {
        storeObj[element.keyName] = element.inputValue;
      } else {
        if (!storeObj[element.groupKey]) {
          storeObj[element.groupKey] = {};
        }
        storeObj[element.groupKey][element.keyName] = element.inputValue;
      }
    });
    return storeObj;
  }
}
