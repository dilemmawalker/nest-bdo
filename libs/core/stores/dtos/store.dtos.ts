export class StoreField {
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
  createdBy: any;
  agent_name: string;
  agent_id: string;
  fields: StoreField[] = [];

  static getStoreObj(storeData: StoreDto) {
    const storeObj = {};
    storeObj['storeId'] = storeData.storeId;
    storeObj['status'] = storeData.status;
    if (storeData.createdBy) {
      storeObj['createdBy'] = storeData.createdBy;
    }
    if (storeData.agent_name) {
      storeObj['agent_name'] = storeData.agent_name;
    }
    if (storeData.agent_id) {
      storeObj['agent_id'] = storeData.agent_id;
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
