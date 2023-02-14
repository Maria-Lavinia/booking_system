import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BookingDto } from './../src/bookings/entities/create-booking.dto';
import { Booking } from './../src/bookings/entities/booking.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let bookingRepository: Repository<Booking>;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    bookingRepository = moduleFixture.get(getRepositoryToken(Booking));
    connection = moduleFixture.get<Connection>(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Resets the db befotre each test
    afterEach (async () => {
      await connection.dropDatabase();
      await connection.runMigrations()
      await moduleFixture.close();
    })

describe('GET /bookings', () => {
  it('should return an array of bookings', async () => {

    // Arrange
    await Promise.all([
  
    bookingRepository.insert(new BookingDto('Maria', 2, new Date(2023, 2, 15), '12345', 'email.email@gmail.com', 'No allergies')),

    bookingRepository.insert(new BookingDto('Andrew', 4, new Date(), '20202002020', 'an.email@gmail.com', 'No comment')),
  ]);

  
    // Act
    const {body}:{body: Booking[]} = await request(app.getHttpServer())
                  .get('/bookings')
                  .expect(200)

    // Assert
    expect(body.length).toEqual(2)
    
  })
})

  // it('should create a valid booking (POST)', async () => {
  //   const booking = new BookingDto('Ana', 2, new Date(), '123456', 'maria@email.com', 'Lactose intolerant' )

  //   const { body } = await request(app.getHttpServer())
  //     .post('/bookings')
  //     .send(booking)
  //     .expect(201)

  //     expect(body.name).toEqual('Ana')
  // });

  afterAll(() => {
    app.close();
  })
});
