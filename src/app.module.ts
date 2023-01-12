import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { RentModule } from './rent/rent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from '../db/typeOrm.config';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [
    CarModule,
    RentModule,
    DiscountModule,
    TypeOrmModule.forRoot(DataSourceOption),
  ],
})
export class AppModule {}
