import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './entity/car.entity';
import { CreateCarDto } from './dto/createCar.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async findAll(): Promise<CarEntity[]> {
    return await this.carRepository.find();
  }

  async findOne(carId): Promise<CarEntity | string> {
    if (!carId) return 'id не передан';

    const car = await this.carRepository.findOne({
      where: { id: carId },
      relations: { rents: true },
    });
    if (!car) return 'такого автомобиля не существует';

    return car;
  }

  async createOne(createCarDto: CreateCarDto): Promise<CarEntity | string> {
    if (!createCarDto.carNumber) return 'номер машины не передан';

    const car = await this.carRepository.findOne({
      where: { carNumber: createCarDto.carNumber },
    });

    if (car) return 'автомобиль с таким номером уже существует';

    return await this.carRepository.save(createCarDto);
  }

  async changeOne(
    carId: number,
    createCarDto: CreateCarDto,
  ): Promise<CarEntity> {
    const profile = await this.carRepository.findOne({
      where: { id: carId },
    });
    if (profile) {
      await this.carRepository.update({ id: carId }, createCarDto);
      return await this.carRepository.findOne({ where: { id: carId } });
    }
  }
}
