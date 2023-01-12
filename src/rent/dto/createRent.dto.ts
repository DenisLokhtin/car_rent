import { ApiProperty } from '@nestjs/swagger';

export class CreateRentDto {
  @ApiProperty({
    description: 'car id',
    example: 1,
  })
  carId: number;

  @ApiProperty({
    description: 'rent taker id',
    example: 1,
  })
  rentTakerId: number;

  @ApiProperty({
    description: 'rent start date',
    example: '2023-01-13 10:21:50.727000 +00:00',
  })
  rentStart: string;

  @ApiProperty({
    description: 'rent stop date',
    example: '2023-01-20 10:21:50.727000 +00:00',
  })
  rentStop: string;
}
