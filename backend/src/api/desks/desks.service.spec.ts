import { TestingModule } from '@nestjs/testing';

import { MahoganyDesk, SteelDesk } from '../../../test/fixtures/desk';
import { boostrapModuleWithInMemoryDatabase } from '../../../test/boostrap';
import { Booking } from '../bookings/entities/booking.entity';
import { BookingsRepository } from '../bookings/repositories/bookings.repository';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeesRepository } from '../employees/repositories/employees.repository';

import { Desk } from './entities/desk.entity';
import { DesksService } from './desks.service';
import { DesksRepository } from './repositories/desks.repository';

describe('DesksService', () => {
    let service: DesksService;
    let module: TestingModule;

    beforeEach(async () => {
        module = await boostrapModuleWithInMemoryDatabase({
            entities: [Desk, Booking, Employee],
            features: [
                DesksRepository,
                BookingsRepository,
                EmployeesRepository
            ],
            providers: [DesksService]
        });

        service = module.get<DesksService>(DesksService);
        module.enableShutdownHooks();
    });

    afterEach(() => module.close());

    describe('::create', () => {
        let desk: Desk;
        beforeEach(async () => {
            desk = await service.create(MahoganyDesk);
        });

        it('should create a desk', () => {
            expect(desk).toMatchInlineSnapshot(`
                Desk {
                  "deskId": 1,
                  "occupancy": 2,
                  "type": "MAHOGANY",
                }
            `);
        });
    });

    describe('::update', () => {
        let desk: Desk;
        beforeEach(async () => {
            desk = await service.create(MahoganyDesk);

            desk = await service.update(desk.deskId, {
                occupancy: 4
            });
        });

        it('should update a desk', () => {
            expect(desk).toMatchInlineSnapshot(`
                Desk {
                  "deskId": 1,
                  "occupancy": 4,
                  "type": "MAHOGANY",
                }
            `);
        });
    });

    describe('::delete', () => {
        let desk: Desk;
        beforeEach(async () => {
            desk = await service.create(MahoganyDesk);

            await service.delete(desk.deskId);
        });

        it('should delete a desk', () => {
            expect(
                service.findOne(desk.deskId)
            ).rejects.toThrowErrorMatchingInlineSnapshot(`"Desk #1 not found"`);
        });
    });

    describe('::findAll', () => {
        let desks: Desk[];
        beforeEach(async () => {
            await service.create(MahoganyDesk);
            await service.create(SteelDesk);

            desks = await service.findAll();
        });

        it('should find all desks', () => {
            expect(desks).toMatchInlineSnapshot(`
                Array [
                  Desk {
                    "deskId": 1,
                    "occupancy": 2,
                    "type": "MAHOGANY",
                  },
                  Desk {
                    "deskId": 3,
                    "occupancy": 3,
                    "type": "STEEL",
                  },
                ]
            `);
        });
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
