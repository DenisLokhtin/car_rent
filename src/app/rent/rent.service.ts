import { Injectable } from '@nestjs/common';
import { RentEntity } from './entity/rent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateRentDto } from './dto/createRent.dto';
import { CarEntity } from '../car/entity/car.entity';
import GetDateDiff from '../../utils/getDateDiff';
import getDateDiff from '../../utils/getDateDiff';
import GetWeekDay from '../../utils/getWeekDay';
import { UpdateRentDto } from './dto/updateRent.dto';
import priceCounter from '../../utils/priceCounter';
import * as dayjs from 'dayjs';
import isBetween from '../../utils/isBetween';
import {
  counts,
  end,
  maxRentDay,
  minRentBreak,
  minRentDay,
  now,
  saturday,
  sunday,
} from '../../utils/consts';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(RentEntity)
    private readonly rentRepository: Repository<RentEntity>,
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async findAll(): Promise<RentEntity[]> {
    return await this.rentRepository.find({ order: { rentStop: 'DESC' } });
  }

  async findOne(rentId): Promise<RentEntity | string> {
    if (!rentId) return 'id не передан';

    return await this.rentRepository.findOne({
      where: { id: rentId },
      relations: { car: true },
    });
  }

  async createOne(createRentDto: CreateRentDto): Promise<RentEntity | string> {
    const rentStart = createRentDto.rentStart;
    const rentStop = createRentDto.rentStop;
    const carId = createRentDto.carId;
    const rentTakerId = createRentDto.rentTakerId;

    if (!rentStart || !rentStop || !carId || !rentTakerId)
      return `один из параметров не передан`;

    const dateDay1 = GetWeekDay(rentStart);
    const dateDay2 = GetWeekDay(rentStop);

    const diff = GetDateDiff(rentStart, rentStop);

    if (dayjs(rentStart).isAfter(rentStop))
      return 'дата конца аренды не может находится раньше даты начала аренды';

    if (dateDay1 === sunday || dateDay1 === saturday)
      return 'вы не можете начать аренду автомобиля в выходные дни';

    if (dateDay2 === sunday || dateDay2 === saturday)
      return 'вы не можете закончить аренду автомобиля в выходные дни';

    if (diff > maxRentDay || diff < minRentDay)
      return 'длина аренды не может быть меньше 1 и больше 30 дней';

    const rent = await this.rentRepository.findOne({
      where: [
        {
          carId: carId,
          completed: false,
          rentStart: Between(new Date(rentStart), new Date(rentStop)),
        },
        {
          carId: carId,
          completed: false,
          rentStop: Between(new Date(rentStart), new Date(rentStop)),
        },
      ],
    });

    if (rent) return 'автомобиль с таким номером уже арендован';

    const oldRent = await this.rentRepository.find({
      where: {
        carId: carId,
        completed: true,
      },
      order: { rentStop: 'DESC' },
    });

    if (oldRent.length) {
      if (
        GetDateDiff(oldRent[0].rentStop, rentStart) <= minRentBreak &&
        GetDateDiff(oldRent[0].rentStop, rentStart) >= -minRentBreak
      )
        return 'Между окончанием бронирования и началом следующего бронирования должен быть интервал 3 дня.';
    }

    const car = await this.carRepository.findOne({
      where: { id: carId },
    });

    if (!car) return 'такого автомобиля не существует';

    const discounts = [
      { start: 1, end: 4, percentage: 0 },
      { start: 5, end: 9, percentage: 5 },
      { start: 10, end: 17, percentage: 10 },
      { start: 18, end: 30, percentage: 15 },
    ];

    const price = priceCounter(diff, discounts, car.tariff);

    return await this.rentRepository.save({
      ...createRentDto,
      car: car,
      price: price,
    });
  }

  async getStat(): Promise<[object, { total: number }]> {
    const rents = await this.rentRepository.find({
      order: { rentStop: 'DESC' },
      relations: { car: true },
    });

    for (const rent in rents) {
      const rentStart = rents[rent].rentStart;
      const rentEnd = rents[rent].rentStop;
      let diff = getDateDiff(rentStart, rentEnd);

      if (isBetween(rentStart, rentEnd, now, end)) {
        diff = getDateDiff(rentStart, rentEnd) - getDateDiff(now, rentEnd);
      } else if (isBetween(rentEnd, rentStart, now, end)) {
        diff = getDateDiff(rentStart, rentEnd) - getDateDiff(rentStart, end);
      }
      if (!dayjs(rentStart).isAfter(now) && !dayjs(rentEnd).isBefore(end)) {
        if (!counts[rents[rent].car.carNumber]) {
          counts[rents[rent].car.carNumber] = Math.round((100 / 30) * diff);
        }
      }
    }

    const sum = Object.values(counts).reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0,
    );

    return [
      counts,
      { total: Math.round(Number(sum) / Object.values(counts).length) },
    ];
  }

  async stopRent(updateRentDto: UpdateRentDto): Promise<RentEntity | string> {
    if (!updateRentDto.rentId) return 'id не передан';

    const rent = await this.rentRepository.findOne({
      where: {
        id: updateRentDto.rentId,
      },
    });

    if (!rent) return 'аренды с таким id не существует';

    if (rent.completed) return 'аренда уже завершена';

    await this.rentRepository.update(
      { id: updateRentDto.rentId },
      { completed: true },
    );

    return await this.rentRepository.findOne({
      where: {
        id: updateRentDto.rentId,
      },
    });
  }
}
