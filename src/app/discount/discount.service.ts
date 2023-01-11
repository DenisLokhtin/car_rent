import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountEntity } from './entity/discount.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discounts: Repository<DiscountEntity>,
  ) {}

  async addDiscount() {
    return 'test';
  }

  async getAllDiscounts() {
    return 'test';
  }

  async getDiscount() {
    return 'test';
  }

  async updateDiscount() {
    return 'test';
  }

  async deleteDiscount() {
    return 'test';
  }
}
