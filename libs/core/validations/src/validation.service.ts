import { Injectable } from '@nestjs/common';
import { Validation } from '@shared/app/schemas/validation/validation.schema';
import { ValidationDto } from './dtos/validation.dto';
import { ValidationRepository } from './validation.repository';

@Injectable()
export class ValidationService {
  constructor(private readonly validationRepository: ValidationRepository) {}

  async create(validationDto: ValidationDto): Promise<Validation> {
    return await this.validationRepository.create(validationDto);
  }

  async update(validationDto: ValidationDto): Promise<Validation> {
    return await this.validationRepository.findOneAndUpdate(
      { name: validationDto.name },
      validationDto,
    );
  }

  async getAll(): Promise<Validation[]> {
    return await this.validationRepository.findAll();
  }
}
