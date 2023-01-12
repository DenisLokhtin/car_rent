import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from './entity/discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity])],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
