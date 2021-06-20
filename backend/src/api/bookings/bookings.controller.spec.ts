import { TestingModule } from '@nestjs/testing';

import {
    BrianHallowayMahoganyBooking,
    JeanDeResqueSteelBooking
} from '../../../test/fixtures/booking';
import { boostrapModuleWithInMemoryDatabase } from '../../../test/boostrap';
import { BrianHalloway, JeanDeResque } from '../../../test/fixtures/employee';
import { MahoganyDesk, SteelDesk } from '../../../test/fixtures/desk';

import { Desk } from '../desks/entities/desk.entity';
import { Employee } from '../employees/entities/employee.entity';
import { DesksRepository } from '../desks/repositories/desks.repository';
import { EmployeesRepository } from '../employees/repositories/employees.repository';

import { Booking } from './entities/booking.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsRepository } from './repositories/bookings.repository';

describe('BookingsController', () => {
    let controller: BookingsController;
    let module: TestingModule;
    let desksRepository: DesksRepository;
    let employeesRepository: EmployeesRepository;

    beforeEach(async () => {
        module = await boostrapModuleWithInMemoryDatabase({
            entities: [Booking, Desk, Employee],
            features: [
                BookingsRepository,
                DesksRepository,
                EmployeesRepository
            ],
            controllers: [BookingsController],
            providers: [BookingsService]
        });

        controller = module.get<BookingsController>(BookingsController);
        desksRepository = module.get<DesksRepository>(DesksRepository);
        employeesRepository =
            module.get<EmployeesRepository>(EmployeesRepository);

        module.enableShutdownHooks();
    });

    afterEach(() => module.close());

    describe('::create', () => {
        let booking: Booking;
        beforeEach(async () => {
            booking = await controller.create(BrianHallowayMahoganyBooking);
        });

        it('should create a booking', () => {
            expect(booking).toMatchInlineSnapshot(`
                Booking {
                  "bookingEnd": "2021-12-18T07:26:00.000Z",
                  "bookingId": 1,
                  "bookingStart": "2021-12-17T02:24:00.000Z",
                  "deskId": 1,
                  "employeeId": 1,
                }
            `);
        });
    });

    describe('::update', () => {
        let booking: Booking;
        beforeEach(async () => {
            await employeesRepository.save(BrianHalloway);
            await desksRepository.save(MahoganyDesk);

            booking = await controller.create(BrianHallowayMahoganyBooking);

            booking = await controller.update(
                {
                    bookingEnd: new Date(
                        'December 26, 2021 07:24:00'
                    ).toISOString()
                },
                booking.bookingId
            );
        });

        it('should update a booking', () => {
            expect(booking).toMatchInlineSnapshot(`
                Booking {
                  "bookingEnd": "2021-12-26T06:24:00.000Z",
                  "bookingId": 1,
                  "bookingStart": "2021-12-17T02:24:00.000Z",
                  "deskId": 1,
                  "employeeId": 1,
                }
            `);
        });
    });

    describe('::delete', () => {
        let booking: Booking;
        beforeEach(async () => {
            await employeesRepository.save(BrianHalloway);
            await desksRepository.save(MahoganyDesk);

            booking = await controller.create(BrianHallowayMahoganyBooking);

            await controller.delete(booking.bookingId);
        });

        it('should delete a booking', () => {
            expect(
                controller.findOne(booking.bookingId)
            ).rejects.toThrowErrorMatchingInlineSnapshot(
                `"Booking 1 not found"`
            );
        });
    });

    describe('::findAll', () => {
        let bookings: Booking[];
        beforeEach(async () => {
            await employeesRepository.save(BrianHalloway);
            await desksRepository.save(MahoganyDesk);
            await controller.create(BrianHallowayMahoganyBooking);

            await employeesRepository.save(JeanDeResque);
            await desksRepository.save(SteelDesk);
            await controller.create(JeanDeResqueSteelBooking);

            bookings = await controller.findAll();
        });

        it('should find all bookings', () => {
            expect(bookings).toMatchInlineSnapshot(`
                Array [
                  Booking {
                    "bookingEnd": "2021-12-18T07:26:00.000Z",
                    "bookingId": 1,
                    "bookingStart": "2021-12-17T02:24:00.000Z",
                    "deskId": 1,
                    "employeeId": 1,
                  },
                  Booking {
                    "bookingEnd": "2021-12-24T06:24:00.000Z",
                    "bookingId": 2,
                    "bookingStart": "2021-12-19T02:24:00.000Z",
                    "deskId": 3,
                    "employeeId": 2,
                  },
                ]
            `);
        });
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
