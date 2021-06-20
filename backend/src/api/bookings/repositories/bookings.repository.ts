import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Booking } from '../entities/booking.entity';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';

@Injectable()
@EntityRepository(Booking)
export class BookingsRepository extends Repository<Booking> {
    public async findAll(): Promise<Booking[]> {
        return await this.find({});
    }

    public async findById(bookingId: number): Promise<Booking> {
        return await this.findOne(bookingId);
    }

    public async createBooking(
        createBookingDto: CreateBookingDto
    ): Promise<Booking> {
        let booking = new Booking();

        Object.keys(createBookingDto).forEach((key) => {
            if (
                createBookingDto[key] === null ||
                createBookingDto[key] === undefined
            ) {
                throw new Error(`Missing or invalid booking property: ${key}`);
            }

            booking[key] = createBookingDto[key];
        });

        booking = await this.save(booking);
        return booking;
    }

    public async editBooking(
        bookingId: number,
        updateBookingDto: UpdateBookingDto
    ): Promise<Booking> {
        const booking = await this.findOne(bookingId);

        Object.keys(updateBookingDto).forEach((key) => {
            if (
                updateBookingDto[key] === null ||
                updateBookingDto[key] === undefined
            ) {
                return;
            }

            booking[key] = updateBookingDto[key];
        });

        await this.save(booking);
        return booking;
    }

    public async destroy(bookingId: number): Promise<void> {
        const booking = await this.findOne(bookingId);
        if (!booking) {
            return;
        }

        await this.remove(booking);
    }
}
