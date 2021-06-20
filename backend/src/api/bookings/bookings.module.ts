import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DesksModule } from '../desks/desks.module';
import { EmployeesModule } from '../employees/employees.module';

import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsRepository } from './repositories/bookings.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([BookingsRepository]),
        forwardRef(() => EmployeesModule),
        forwardRef(() => DesksModule)
    ],
    exports: [TypeOrmModule, BookingsService],
    controllers: [BookingsController],
    providers: [BookingsService]
})
export class BookingsModule {}
