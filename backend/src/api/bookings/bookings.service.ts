import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingsRepository } from './repositories/bookings.repository';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(BookingsRepository)
        private bookingsRepository: BookingsRepository
    ) {}

    public async findAll(): Promise<Booking[]> {
        return this.bookingsRepository.findAll();
    }

    public async findOne(bookingId: number): Promise<Booking> {
        const booking = await this.bookingsRepository.findById(bookingId);
        if (!booking) {
            throw new NotFoundException(`Booking ${bookingId} not found`);
        }

        return booking;
    }

    public async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        return this.bookingsRepository.createBooking(createBookingDto);
    }

    public async update(
        bookingId: number,
        updateBookingDto: UpdateBookingDto
    ): Promise<Booking> {
        const booking = await this.bookingsRepository.findOne(bookingId);
        if (!booking) {
            throw new NotFoundException(`Booking #${bookingId} not found`);
        }

        return this.bookingsRepository.editBooking(bookingId, updateBookingDto);
    }

    public async delete(bookingId: number): Promise<void> {
        await this.bookingsRepository.delete(bookingId);
    }
}
