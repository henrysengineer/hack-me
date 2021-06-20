import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Desk } from '../../desks/entities/desk.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    bookingId: number;

    @ManyToOne(() => Employee, (employee) => employee.employeeId)
    employee?: Employee;
    @Column()
    employeeId: number;

    @ManyToOne(() => Desk, (desk) => desk.deskId)
    desk?: Desk;
    @Column()
    deskId: number;

    @Column()
    bookingStart: string;

    @Column()
    bookingEnd: string;
}
