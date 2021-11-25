import { Injectable, NotFoundException } from '@nestjs/common';
import { Validation } from '@shared/app/schemas/validation/validation.schema';
import { Types } from 'mongoose';
import { ValidationDto } from './dtos/validation.dto';
import { ValidationRepository } from './validation.repository';

@Injectable()
export class ValidationService {
  constructor(private readonly validationRepository: ValidationRepository) {}

  async create(validationDto: ValidationDto): Promise<Validation> {
    return await this.validationRepository.create(validationDto);
  }

  async update(validationDto: ValidationDto): Promise<Validation> {
    const response = await this.validationRepository.findOneAndUpdate(
      { _id: validationDto._id },
      validationDto,
    );
    if (response) return response;
    throw new NotFoundException();
  }

  async getAll(): Promise<Validation[]> {
    return await this.validationRepository.findAll();
  }

  async findMany(validationKeys: Types.ObjectId[]): Promise<Validation[]> {
    return await this.validationRepository.findMany(validationKeys);
  }

  async getValidation(validationId: string): Promise<Validation> {
    const validation = await this.validationRepository.findOne({
      _id: validationId,
    });
    if (validation) return validation;
    throw new NotFoundException();
  }
}
