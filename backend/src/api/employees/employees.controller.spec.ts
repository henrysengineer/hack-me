import { TestingModule } from '@nestjs/testing';

import { BrianHalloway, JeanDeResque } from '../../../test/fixtures/employee';
import { boostrapModuleWithInMemoryDatabase } from '../../../test/boostrap';
import { Booking } from '../bookings/entities/booking.entity';
import { BookingsRepository } from '../bookings/repositories/bookings.repository';
import { Desk } from '../desks/entities/desk.entity';
import { DesksRepository } from '../desks/repositories/desks.repository';

import { Employee } from './entities/employee.entity';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { EmployeesRepository } from './repositories/employees.repository';

describe('EmployeesController', () => {
    let controller: EmployeesController;

    let module: TestingModule;

    beforeEach(async () => {
        module = await boostrapModuleWithInMemoryDatabase({
            entities: [Employee, Booking, Desk],
            features: [
                EmployeesRepository,
                BookingsRepository,
                DesksRepository
            ],
            controllers: [EmployeesController],
            providers: [EmployeesService]
        });

        controller = module.get<EmployeesController>(EmployeesController);

        module.enableShutdownHooks();
    });

    afterEach(() => module.close());

    describe('::create', () => {
        let employee: Employee;
        beforeEach(async () => {
            employee = await controller.create(BrianHalloway);
        });

        it('should create a employee', () => {
            expect(employee).toMatchInlineSnapshot(`
                Employee {
                  "age": 45,
                  "employeeId": 1,
                  "fullName": "Brian Halloway",
                  "job": "Senior VP",
                }
            `);
        });
    });

    describe('::update', () => {
        let employee: Employee;
        beforeEach(async () => {
            employee = await controller.create(BrianHalloway);

            employee = await controller.update(
                {
                    job: 'Lead VP'
                },
                employee.employeeId
            );
        });

        it('should update a employee', () => {
            expect(employee).toMatchInlineSnapshot(`
                Employee {
                  "age": 45,
                  "employeeId": 1,
                  "fullName": "Brian Halloway",
                  "job": "Lead VP",
                }
            `);
        });
    });

    describe('::delete', () => {
        let employee: Employee;
        beforeEach(async () => {
            employee = await controller.create(BrianHalloway);

            await controller.delete(employee.employeeId);
        });

        it('should delete a employee', () => {
            expect(
                controller.findOne(employee.employeeId)
            ).rejects.toThrowErrorMatchingInlineSnapshot(
                `"Employee #1 not found"`
            );
        });
    });

    describe('::findAll', () => {
        let employees: Employee[];
        beforeEach(async () => {
            await controller.create(BrianHalloway);
            await controller.create(JeanDeResque);

            employees = await controller.findAll();
        });

        it('should find all employees', () => {
            expect(employees).toMatchInlineSnapshot(`
                Array [
                  Employee {
                    "age": 45,
                    "employeeId": 1,
                    "fullName": "Brian Halloway",
                    "job": "Senior VP",
                  },
                  Employee {
                    "age": 35,
                    "employeeId": 2,
                    "fullName": "Jean de Resque",
                    "job": "Junior VP",
                  },
                ]
            `);
        });
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
