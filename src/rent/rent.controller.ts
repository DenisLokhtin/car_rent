import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentEntity } from './entity/rent.entity';
import { CreateRentDto } from './dto/createRent.dto';
import { UpdateRentDto } from './dto/updateRent.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get('stat')
  async getStat(): Promise<[object, { total: number }]> {
    return await this.rentService.getStat();
  }

  @Get('all')
  async findAll(): Promise<RentEntity[]> {
    return await this.rentService.findAll();
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'enter rent id',
    required: true,
  })
  @Get(':id')
  async findOne(@Query('id') id): Promise<RentEntity | string> {
    return await this.rentService.findOne(id);
  }

  @Post()
  async createOne(
    @Body() createRentDto: CreateRentDto,
  ): Promise<RentEntity | string> {
    return await this.rentService.createOne(createRentDto);
  }

  @Put()
  async stopRent(
    @Body() updateRentDto: UpdateRentDto,
  ): Promise<RentEntity | string> {
    return await this.rentService.stopRent(updateRentDto);
  }
}
