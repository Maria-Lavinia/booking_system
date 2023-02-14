import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { BookingDto } from './entities/create-booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private bookingService: BookingsService) {}

    @Post()
    create(@Body() bookingDto: BookingDto): Promise<Booking>  {
        return this.bookingService.create(bookingDto);
    }

    

}
