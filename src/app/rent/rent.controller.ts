import { Controller, Get, Query } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentEntity } from '../../entity/rent.entity';

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
}
