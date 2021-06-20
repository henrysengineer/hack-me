import { Module } from '@nestjs/common';

import { BookingsModule } from './api/bookings/bookings.module';
import { DesksModule } from './api/desks/desks.module';
import { EmployeesModule } from './api/employees/employees.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [DatabaseModule, DesksModule, EmployeesModule, BookingsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
