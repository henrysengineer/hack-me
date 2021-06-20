import { CreateBookingDto } from '../../../src/api/bookings/dto/create-booking.dto';
import { MahoganyDesk, SteelDesk } from '../desk';
import { BrianHalloway, JeanDeResque } from '../employee';

export const BrianHallowayMahoganyBooking: CreateBookingDto = {
    employeeId: BrianHalloway.employeeId,
    deskId: MahoganyDesk.deskId,
    bookingStart: new Date('December 17, 2021 03:24:00').toISOString(),
    bookingEnd: new Date('December 18, 2021 08:26:00').toISOString()
};

export const JeanDeResqueSteelBooking: CreateBookingDto = {
    employeeId: JeanDeResque.employeeId,
    deskId: SteelDesk.deskId,
    bookingStart: new Date('December 19, 2021 03:24:00').toISOString(),
    bookingEnd: new Date('December 24, 2021 07:24:00').toISOString()
};
