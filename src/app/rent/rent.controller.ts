import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentEntity } from '../../entity/rent.entity';
import { CreateCarDto } from '../../dto/createCar.dto';
import { CarEntity } from '../../entity/car.entity';
import { CreateRentDto } from '../../dto/createRent.dto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get('all')
  async findAll(): Promise<RentEntity[]> {
    return await this.rentService.findAll();
  }

  @Get(':id')
  async findOne(@Query('id') id): Promise<RentEntity> {
    return await this.rentService.findOne(id);
  }

  @Post()
  async createOne(
    @Body() createRentDto: CreateRentDto,
  ): Promise<RentEntity | string> {
    return await this.rentService.createOne(createRentDto);
  }
}
