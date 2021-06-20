import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
    @ApiProperty()
    employeeId: number;

    @ApiProperty()
    deskId: number;

    @ApiProperty()
    bookingStart: string;

    @ApiProperty()
    bookingEnd: string;
}
