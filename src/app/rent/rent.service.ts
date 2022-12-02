import { Injectable } from '@nestjs/common';
import { RentEntity } from '../../entity/rent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(RentEntity)
    private readonly rentRepository: Repository<RentEntity>,
  ) {}

  async findAll(): Promise<RentEntity[]> {
    return await this.rentRepository.find();
  }

  async findOne(rentId): Promise<RentEntity> {
    return await this.rentRepository.findOne({
      where: { id: rentId },
      relations: { car: true },
    });
  }
}
