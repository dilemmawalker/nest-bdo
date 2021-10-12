import { StepData } from '../../../schemas/stores/store.schema';

export class StoreDto {
  name: string;
  mobile: string;
  lead: StepData = new StepData();

  static getStore(storeData: StoreDto) {
    const storeObj = {};
    storeData.lead.data.forEach((element) => {
      storeObj[element.keyName] = element.inputValue;
    });
    return storeObj;
  }
}
