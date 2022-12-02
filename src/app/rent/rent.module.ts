import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from '../../entity/rent.entity';
import { CarEntity } from 'src/entity/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity, CarEntity])],
  providers: [RentService],
  controllers: [RentController],
})
export class RentModule {}
