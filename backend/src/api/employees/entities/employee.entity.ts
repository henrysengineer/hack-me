import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    employeeId: number;

    @Column({ unique: true })
    fullName: string;

    @Column()
    job: string;

    @Column()
    age: number;

    @OneToMany(() => Booking, (booking) => booking.employee)
    bookings?: Booking[];
}
