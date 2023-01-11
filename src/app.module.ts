import { Module } from '@nestjs/common';
import { CarModule } from './app/car/car.module';
import { RentModule } from './app/rent/rent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from './typeOrmConfig/typeOrm.config';
import { DiscountModule } from './app/discount/discount.module';

@Module({
  imports: [
    CarModule,
    RentModule,
    DiscountModule,
    TypeOrmModule.forRoot(DataSourceOption),
  ],
})
export class AppModule {}
