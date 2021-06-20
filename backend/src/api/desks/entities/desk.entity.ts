import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Booking } from '../../bookings/entities/booking.entity';
import { DeskType } from '../interface';

@Entity()
export class Desk {
    @PrimaryGeneratedColumn()
    deskId: number;

    @Column()
    occupancy: number;

    @Column()
    type: DeskType;

    @OneToMany(() => Booking, (booking) => booking.desk)
    bookings?: Booking[];
}
