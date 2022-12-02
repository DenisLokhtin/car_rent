import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from '../../entity/rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity])],
  providers: [RentService],
  controllers: [RentController],
})
export class RentModule {}
