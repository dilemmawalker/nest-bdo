import { BadRequestException, Injectable } from '@nestjs/common';
import { ClassValidator } from '@shared/app/validators/class.validator';
import { WorkflowRequestField } from 'apps/agent/src/app/http/workflow/requests/workflow.request';
import { FieldService } from 'libs/core/fields/src/field.service';

@Injectable()
export class ValidationUtils {
  constructor(private fieldService: FieldService) {}
  async validateWorkFlowRequestFields(
    workflowRequestFields: WorkflowRequestField[],
  ) {
    for (const workflowRequestField of workflowRequestFields) {
      await this.validateField(
        workflowRequestField.keyName,
        workflowRequestField.inputValue,
      );
    }
  }

  async validateField(keyName: string, inputValue: string) {
    const field: any = await this.fieldService.findOne(keyName);
    const validations = field.validations;
    if (
      !ClassValidator.typeValidation(field, inputValue) ||
      !ClassValidator.dynamicValidation(inputValue, validations)
    ) {
      throw new BadRequestException(
        keyName,
        'Error while validating the field',
      );
    }
  }
}
