import { createConnection } from 'typeorm';

import { Employee } from '../../src/api/employees/entities/employee.entity';
import { Desk } from '../../src/api/desks/entities/desk.entity';

export default async function unseed() {
    const connection = await createConnection({
        type: 'sqlite',
        database: './src/database/employee-desk- bookings.sqlite3',
        entities: [Employee, Desk]
    });

    await connection.dropDatabase();
}

unseed();
