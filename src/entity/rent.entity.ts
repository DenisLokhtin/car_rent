import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarEntity } from './car.entity';

@Entity({ name: 'rent' })
export class RentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  rentStart: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  rentStop: Date;

  @Column()
  carId: number;

  @ManyToOne(() => CarEntity, (car) => car.rents, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  car: CarEntity;

  @Column()
  rentTakerId: number;

  @Column({
    default: () => 'false',
  })
  completed: boolean;
}
