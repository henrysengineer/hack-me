import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingsModule } from '../bookings/bookings.module';

import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { EmployeesRepository } from './repositories/employees.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeesRepository]),
        forwardRef(() => BookingsModule)
    ],
    exports: [TypeOrmModule, EmployeesService],
    controllers: [EmployeesController],
    providers: [EmployeesService]
})
export class EmployeesModule {}
