import { Injectable } from '@nestjs/common';
import { RentEntity } from '../../entity/rent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentDto } from '../../dto/createRent.dto';
import { CarEntity } from '../../entity/car.entity';
import GetDateDiff from '../../utils/getDateDiff';
import GetWeekDay from '../../utils/getWeekDay';
import { UpdateRentDto } from '../../dto/updateRent.dto';
import priceCounter from '../../utils/priceCounter';
import getDateDiff from '../../utils/getDateDiff';
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

    const price = priceCounter(diff);

    if (dayjs(rentStart).isAfter(rentStop))
      return 'дата конца аренды не может находится раньше даты начала аренды';

    if (dateDay1 === sunday || dateDay1 === saturday)
      return 'вы не можете начать аренду автомобиля в выходные дни';

    if (dateDay2 === sunday || dateDay2 === saturday)
      return 'вы не можете закончить аренду автомобиля в выходные дни';

    if (diff > maxRentDay || diff < minRentDay)
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

    if (oldRent.length) {
      if (
        GetDateDiff(oldRent[0].rentStop, rentStart) <= minRentBreak &&
        GetDateDiff(oldRent[0].rentStop, rentStart) >= -minRentBreak
      )
        return 'Между окончанием бронирования и началом следующего бронирования должен быть интервал 3 дня.';
    }

    const car = await this.carRepository.findOne({
      where: { id: createRentDto.carId },
    });

    if (!car) return 'такого автомобиля не существует';

    return await this.rentRepository.save({
      ...createRentDto,
      car: car,
      price: price,
    });
  }

  async getStat(): Promise<{}> {
    const rents = await this.rentRepository.find({
      order: { rentStop: 'DESC' },
      relations: { car: true },
    });

    for (const rent in rents) {
      const rentStart = rents[rent].rentStart;
      const rentEnd = rents[rent].rentStop;
      let diff = getDateDiff(rentStart, rentEnd);

      if (!counts[rents[rent].car.carNumber]) {
        if (!dayjs(rentStart).isAfter(now) && !dayjs(rentEnd).isBefore(end)) {
          if (isBetween(rentStart, rentEnd, now, end)) {
            diff = getDateDiff(rentStart, rentEnd) - getDateDiff(now, rentEnd);
          } else if (isBetween(rentEnd, rentStart, now, end)) {
            diff =
              getDateDiff(rentStart, rentEnd) - getDateDiff(rentStart, end);
          }

          counts[rents[rent].car.carNumber] = Math.round((100 / 30) * diff);
        } else {
          counts[rents[rent].car.carNumber] += Math.round((100 / 30) * diff);
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
