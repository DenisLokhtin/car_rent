import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({
    description: 'car number',
    example: '123456',
  })
  carNumber: string;

  @ApiProperty({
    description: 'car description',
    example: 'test text string',
  })
  description: string;

  @ApiProperty({
    description: 'car price for 1 day',
    example: 1000,
  })
  tariff: number;
}
