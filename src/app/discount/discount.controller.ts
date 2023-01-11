import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('discount')
@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @Get()
  async getAllDiscounts() {
    return this.discountService.getAllDiscounts();
  }

  @Post()
  async createDiscount() {
    return await this.discountService.addDiscount();
  }

  @Get(':id')
  async getDiscount() {
    return this.discountService.getDiscount();
  }

  @Put(':id')
  async updateDiscount() {
    return this.discountService.updateDiscount();
  }

  @Delete(':id')
  async deleteDiscount() {
    return this.discountService.deleteDiscount();
  }
}
