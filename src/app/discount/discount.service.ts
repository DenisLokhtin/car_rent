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

  // addDiscount(discount: { start: number; end: number; percentage: number }) {
  //   const overlappingDiscount = this.discounts.find();
  //
  //   const duplicateDiscount = this.discounts.find();
  //
  //   if (!overlappingDiscount && !duplicateDiscount) {
  //     const id = Math.max(...this.discounts.map((d) => d.id), 0) + 1;
  //     this.discounts.push({ id, ...discount });
  //   }
  // }
  //
  // getAllDiscounts() {
  //   return this.discounts;
  // }
  //
  // getDiscount(id: number) {
  //   return this.discounts.find((d) => d.id === id);
  // }
  //
  // updateDiscount(
  //   id: number,
  //   discount: { start: number; end: number; percentage: number },
  // ) {
  //   const index = this.discounts.findIndex((d) => d.id === id);
  //   if (index !== -1) {
  //     this.discounts[index] = { id, ...discount };
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  //
  // deleteDiscount(id: number) {
  //   const index = this.discounts.findIndex((d) => d.id === id);
  //   if (index !== -1) {
  //     this.discounts.splice(index, 1);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
