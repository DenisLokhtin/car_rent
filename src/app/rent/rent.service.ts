import { Injectable } from '@nestjs/common';
import { RentEntity } from '../../entity/rent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentDto } from '../../dto/createRent.dto';
import { CarEntity } from '../../entity/car.entity';
import * as dayjs from 'dayjs';
import GetDateDiff from '../../utils/getDateDiff';
import GetWeekDay from '../../utils/getWeekDay';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(RentEntity)
    private readonly rentRepository: Repository<RentEntity>,
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async findAll(): Promise<RentEntity[]> {
    return await this.rentRepository.find();
  }

  async findOne(rentId): Promise<RentEntity> {
    return await this.rentRepository.findOne({
      where: { id: rentId },
      relations: { car: true },
    });
  }

  async createOne(createRentDto: CreateRentDto): Promise<RentEntity | string> {
    const rentStart = createRentDto.rentStart;
    const rentStop = createRentDto.rentStop;

    const diff = GetDateDiff(rentStart, rentStop);
    const dateDay1 = GetWeekDay(rentStart);
    const dateDay2 = GetWeekDay(rentStop);

    if (dateDay1 === 0 || dateDay1 === 6)
      return 'вы не можете начать аренду автомобиля в выходные дни';

    if (dateDay2 === 0 || dateDay2 === 6)
      return 'вы не можете закончить аренду автомобиля в выходные дни';

    if (diff > 30 || diff < 1)
      return 'длина аренды не может быть меньше 1 и больше 30 дней';

    const rent = await this.rentRepository.findOne({
      where: {
        carId: createRentDto.carId,
        completed: false,
      },
    });

    if (rent) return 'автомобиль с таким номером уже арендован';

    const oldRent = await this.rentRepository.find({
      where: {
        carId: createRentDto.carId,
        completed: true,
      },
      order: { rentStop: 'DESC' },
    });

    if (GetDateDiff(oldRent[0].rentStop, rentStart) < 3)
      return 'Между окончанием бронирования и началом следующего бронирования должен быть интервал 3 дня.';

    const car = await this.carRepository.findOne({
      where: { id: createRentDto.carId },
    });

    if (!car) return 'такого автомобиля не существует';

    return await this.rentRepository.save({
      ...createRentDto,
      car: car,
    });
  }
}
