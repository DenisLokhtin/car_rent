import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

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

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'enter discount id',
    required: true,
  })
  @Get(':id')
  async getDiscount() {
    return this.discountService.getDiscount();
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'enter discount id',
    required: true,
  })
  @Put(':id')
  async updateDiscount() {
    return this.discountService.updateDiscount();
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'enter discount id',
    required: true,
  })
  @Delete(':id')
  async deleteDiscount() {
    return this.discountService.deleteDiscount();
  }
}
