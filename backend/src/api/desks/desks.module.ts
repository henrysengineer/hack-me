import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingsModule } from '../bookings/bookings.module';

import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';
import { DesksRepository } from './repositories/desks.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([DesksRepository]),
        forwardRef(() => BookingsModule)
    ],
    exports: [TypeOrmModule, DesksService],
    controllers: [DesksController],
    providers: [DesksService]
})
export class DesksModule {}
