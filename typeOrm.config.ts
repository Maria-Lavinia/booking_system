
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Booking } from './src/bookings/entities/booking.entity';
import { CreateBooking1677712388675 } from './migrations/1677712388675-CreateBooking'
 
config();
 
const configService = new ConfigService();
 
export default new DataSource({
  type: 'postgres',
  host: configService.get('localhost'),
  port: configService.get('5432'),
  username: configService.get('postgres'),
  password: configService.get('060994'),
  database: configService.get('bookings'),
  entities: [Booking],
  migrations: [CreateBooking1677712388675],
});