import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { CarEntity } from '../../entity/car.entity';
import { CreateCarDto } from '../../dto/createCar.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('all')
  async findAll(): Promise<CarEntity[]> {
    return await this.carService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<CarEntity | string> {
    return await this.carService.findOne(id);
  }

  @Post()
  async createOne(
    @Body() createCarDto: CreateCarDto,
  ): Promise<CarEntity | string> {
    return await this.carService.createOne(createCarDto);
  }
}
