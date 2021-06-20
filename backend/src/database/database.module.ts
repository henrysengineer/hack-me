import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { Booking } from '../api/bookings/entities/booking.entity';
import { Desk } from '../api/desks/entities/desk.entity';
import { Employee } from '../api/employees/entities/employee.entity';

export function DatabaseOrmModule(
    {
        entities,
        database,
        dropSchema
    }: {
        entities: EntityClassOrSchema[];
        database: string;
        dropSchema: boolean;
    } = {
        database: './src/database/employee-desk- bookings.sqlite3',
        entities: [Employee, Desk, Booking],
        dropSchema: false
    }
): DynamicModule {
    return TypeOrmModule.forRoot({
        type: 'sqlite',
        database,
        entities,
        synchronize: true,
        dropSchema,
        logging: false
    });
}

@Module({
    imports: [DatabaseOrmModule()]
})
export class DatabaseModule {}
