import { Injectable, NotFoundException } from '@nestjs/common';
import { Validation } from '@shared/app/schemas/validation/validation.schema';
import { ValidationDto } from './dtos/validation.dto';
import { ValidationRepository } from './validation.repository';

@Injectable()
export class ValidationService {
  constructor(private readonly validationRepository: ValidationRepository) {}

  async create(validationDto: ValidationDto): Promise<Validation> {
    console.log(validationDto);
    return await this.validationRepository.create(validationDto);
  }

  async update(validationDto: ValidationDto): Promise<Validation> {
    const response = await this.validationRepository.findOneAndUpdate(
      { name: validationDto.name },
      validationDto,
    );
    if (response) return response;
    throw new NotFoundException();
  }

  async getAll(): Promise<Validation[]> {
    return await this.validationRepository.findAll();
  }
}
