import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Max, Min } from 'class-validator';

@Entity({ name: 'discount' })
export class DiscountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(0)
  start: number;

  @Column()
  @Max(30)
  end: number;
  @Column()
  @Max(100)
  @Min(0)
  percentage: number;
}
