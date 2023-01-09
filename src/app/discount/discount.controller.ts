import {
  Controller,
  // Get,
  // Post,
  // Put,
  // Delete,
  // Body,
  // Param,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('car')
@Controller('discount')
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  // @Get()
  // getAllDiscounts() {
  //   return this.discountService.getAllDiscounts();
  // }
  //
  // @Post()
  // createDiscount(@Body() discount: { start: number, end: number, percentage: number }) {
  //   this.discountsService.addDiscount(discount);
  // }
  //
  // @Get(':id')
  // getDiscount(@Param('id') id: number) {
  //   return this.discountsService.getDiscount(id);
  // }
  //
  // @Put(':id')
  // updateDiscount(@Param('id') id: number, @Body() discount: { start: number, end: number, percentage: number }) {
  //   return this.discountsService.updateDiscount(id, discount);
  // }
  //
  // @Delete(':id')
  // deleteDiscount(@Param('id') id: number) {
  //   return this.discountsService.deleteDiscount(id);
  // }
}
