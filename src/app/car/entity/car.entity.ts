import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RentEntity } from '../../rent/entity/rent.entity';
import { Min } from 'class-validator';

@Entity({ name: 'car' })
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(0)
  tariff: number;

  @Column({ type: 'varchar', length: 255 })
  carNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @OneToMany(() => RentEntity, (rent) => rent.car, {
    nullable: true,
  })
  @JoinColumn()
  rents: RentEntity[];
}
