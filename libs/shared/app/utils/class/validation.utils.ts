import { BadRequestException, Injectable } from '@nestjs/common';
import { DynamicValidator } from '@shared/app/validators/dynamic.validator';
import { TypeValidator } from '@shared/app/validators/type.validator';
import { invalidDataType } from '@shared/constant/validation-message.constant';
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

    if (!TypeValidator.validate(field, inputValue)) {
      throw new BadRequestException(
        keyName,
        invalidDataType(field.type, field.label),
      );
    }
    const dynamicValidationResult = DynamicValidator.validate(
      field.label,
      inputValue,
      field.validations,
    );
    if (!dynamicValidationResult.isValid) {
      throw new BadRequestException(keyName, dynamicValidationResult.message);
    }
  }
}
