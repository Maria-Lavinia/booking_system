import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './entities/booking.dto';

@Injectable()
export class BookingsService {
    constructor(@InjectRepository(Booking) private bookingRepository: Repository<Booking>){}


  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async findById(id: number): Promise<Booking> {
    return this.bookingRepository.findOneBy({id: id});
  }

  async create(bookingDto: BookingDto): Promise<Booking>  {
    return this.bookingRepository.save(bookingDto);
  }

  async update(id: number, bookingDto: BookingDto): Promise<Booking> {
    await this.bookingRepository.update({ id }, { ...bookingDto });
    const updatedBooking = await this.bookingRepository.findOneBy({ id: id });
    return updatedBooking;
  }

  async remove(id: number) {
    return this.bookingRepository.delete(id);
  }



}
