import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { CarEntity } from './entity/car.entity';
import { CreateCarDto } from './dto/createCar.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('all')
  async findAll(): Promise<CarEntity[]> {
    return await this.carService.findAll();
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'enter car id',
    required: true,
  })
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

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'enter car id',
    required: true,
  })
  @Put(':id')
  async changeOne(
    @Body() createCarDto: CreateCarDto,
    @Param('id') id,
  ): Promise<CarEntity> {
    return await this.carService.changeOne(id, createCarDto);
  }
}
