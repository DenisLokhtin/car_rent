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
  })
  rentStart: Date;

  @Column({
    type: 'timestamptz',
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
