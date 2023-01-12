import { ApiProperty } from '@nestjs/swagger';

export class UpdateRentDto {
  @ApiProperty({
    description: 'rent id',
    example: 1,
  })
  rentId: number;
}
