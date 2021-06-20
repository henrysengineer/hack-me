import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    ValidationPipe,
    HttpException,
    HttpStatus
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Controller('/api/bookings')
export class BookingsController {
    constructor(private bookingsService: BookingsService) {}

    @Get()
    public async findAll(): Promise<Booking[]> {
        return this.bookingsService.findAll();
    }

    @Get('/:bookingId')
    public async findOne(
        @Param('bookingId') bookingId: number
    ): Promise<Booking> {
        return this.bookingsService.findOne(bookingId);
    }

    @Post()
    public async create(
        @Body(new ValidationPipe({ transform: true }))
        createBookingsDto: CreateBookingDto
    ): Promise<Booking> {
        try {
            return await this.bookingsService.create(createBookingsDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('/:bookingId')
    public async update(
        @Body() updateBookingDto: UpdateBookingDto,
        @Param('bookingId') bookingId: number
    ): Promise<Booking> {
        const booking = await this.bookingsService.update(
            bookingId,
            updateBookingDto
        );

        return booking;
    }

    @Delete('/:bookingId')
    public async delete(@Param('bookingId') bookingId: number): Promise<void> {
        const booking = await this.findOne(bookingId);
        if (!booking) {
            throw new NotFoundException(`Booking #${booking} not found`);
        }

        return this.bookingsService.delete(bookingId);
    }
}
