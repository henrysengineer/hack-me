import { TestingModule } from '@nestjs/testing';

import { MahoganyDesk, SteelDesk } from '../../../test/fixtures/desk';
import { boostrapModuleWithInMemoryDatabase } from '../../../test/boostrap';
import { Booking } from '../bookings/entities/booking.entity';
import { BookingsRepository } from '../bookings/repositories/bookings.repository';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeesRepository } from '../employees/repositories/employees.repository';

import { Desk } from './entities/desk.entity';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';
import { DesksRepository } from './repositories/desks.repository';

describe('DesksController', () => {
    let controller: DesksController;

    let module: TestingModule;

    beforeEach(async () => {
        module = await boostrapModuleWithInMemoryDatabase({
            entities: [Desk, Booking, Employee],
            features: [
                DesksRepository,
                BookingsRepository,
                EmployeesRepository
            ],
            controllers: [DesksController],
            providers: [DesksService]
        });

        controller = module.get<DesksController>(DesksController);

        module.enableShutdownHooks();
    });

    afterEach(() => module.close());

    describe('::create', () => {
        let desk: Desk;
        beforeEach(async () => {
            desk = await controller.create(MahoganyDesk);
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
            desk = await controller.create(MahoganyDesk);

            desk = await controller.update(
                {
                    occupancy: 4
                },
                desk.deskId
            );
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
            desk = await controller.create(MahoganyDesk);

            await controller.delete(desk.deskId);
        });

        it('should delete a desk', () => {
            expect(
                controller.findOne(desk.deskId)
            ).rejects.toThrowErrorMatchingInlineSnapshot(`"Desk #1 not found"`);
        });
    });

    describe('::findAll', () => {
        let desks: Desk[];
        beforeEach(async () => {
            await controller.create(MahoganyDesk);
            await controller.create(SteelDesk);

            desks = await controller.findAll();
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
        expect(controller).toBeDefined();
    });
});
