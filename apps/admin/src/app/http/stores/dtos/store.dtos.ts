class StoreField {
  inputValue: any = '';
  keyName: any;
}
export class StoreDto {
  constructor(workflowKey: string, stepId: string, storeId: string) {
    this.workflowKey = workflowKey;
    this.stepId = stepId;
    this.storeId = storeId;
  }
  stepId: string;
  storeId: string;
  workflowKey: string;
  fields: StoreField[] = [];

  static getStore(storeData: StoreDto) {
    const storeObj = {};
    storeObj['storeId'] = storeData.storeId;
    storeData.fields.forEach((element) => {
      storeObj[element.keyName] = element.inputValue;
    });
    return storeObj;
  }
}
