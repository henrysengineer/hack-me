import { createConnection } from 'typeorm';

import { Employee } from '../../src/api/employees/entities/employee.entity';
import { Desk } from '../../src/api/desks/entities/desk.entity';
import { Booking } from '../../src/api/bookings/entities/booking.entity';

import { BrianHalloway, JeanDeResque } from './employee';
import { ExecutiveLeatherDesk, MahoganyDesk, SteelDesk } from './desk';
import {
    BrianHallowayMahoganyBooking,
    JeanDeResqueSteelBooking
} from './booking';

export default async function seed() {
    const connection = await createConnection({
        type: 'sqlite',
        database: './src/database/employee-desk- bookings.sqlite3',
        entities: [Employee, Desk, Booking]
    });
    const bookingsRepository = connection.getRepository(Booking);
    const employeeRepository = connection.getRepository(Employee);

    await Promise.all(
        [BrianHalloway, JeanDeResque].map(async (employee) => {
            try {
                console.log(`Saving employee ${employee.fullName}`);
                await employeeRepository.save(
                    employeeRepository.create(employee)
                );
            } catch (error) {
                console.error(error);
            }
        })
    );

    const desksRepository = connection.getRepository(Desk);

    await Promise.all(
        [SteelDesk, MahoganyDesk, ExecutiveLeatherDesk].map(async (desk) => {
            try {
                console.log(`Saving desk ${desk.deskId}`);
                await desksRepository.save(desksRepository.create(desk));
            } catch (error) {
                console.error(error);
            }
        })
    );

    await Promise.all(
        [BrianHallowayMahoganyBooking, JeanDeResqueSteelBooking].map(
            async (booking) => {
                await bookingsRepository.save(booking);
            }
        )
    );
}

seed();
