import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
@EntityRepository(Employee)
export class EmployeesRepository extends Repository<Employee> {
    public async findAll(): Promise<Employee[]> {
        return await this.find({});
    }

    public async findById(employeeId: number): Promise<Employee> {
        return await this.findOne(employeeId);
    }

    public async createEmployee(
        createEmployeeDto: CreateEmployeeDto
    ): Promise<Employee> {
        let employee = new Employee();

        Object.keys(createEmployeeDto).forEach((key) => {
            if (
                createEmployeeDto[key] === null ||
                createEmployeeDto[key] === undefined
            ) {
                throw new Error(`Missing or invalid employee property: ${key}`);
            }

            employee[key] = createEmployeeDto[key];
        });

        employee = await this.save(employee);
        return employee;
    }

    public async editEmployee(
        employeeId: number,
        updateEmployeeDto: UpdateEmployeeDto
    ): Promise<Employee> {
        const employee = await this.findOne(employeeId);

        Object.keys(updateEmployeeDto).forEach((key) => {
            if (
                updateEmployeeDto[key] === null ||
                updateEmployeeDto[key] === undefined
            ) {
                return;
            }

            employee[key] = updateEmployeeDto[key];
        });

        await this.save(employee);
        return employee;
    }

    public async destroy(employeeId: number): Promise<void> {
        const employee = await this.findOne(employeeId);
        if (!employee) {
            return;
        }

        await this.remove(employee);
    }
}
