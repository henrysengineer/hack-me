import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesRepository } from './repositories/employees.repository';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(EmployeesRepository)
        private employeesRepository: EmployeesRepository
    ) {}

    public async findAll(): Promise<Employee[]> {
        return this.employeesRepository.findAll();
    }

    public async findOne(employeeId: number): Promise<Employee> {
        const employee = await this.employeesRepository.findById(employeeId);
        if (!employee) {
            throw new NotFoundException(`Employee #${employeeId} not found`);
        }

        return employee;
    }

    public async create(
        createEmployeeDto: CreateEmployeeDto
    ): Promise<Employee> {
        return this.employeesRepository.createEmployee(createEmployeeDto);
    }

    public async update(
        employeeId: number,
        updateEmployeeDto: UpdateEmployeeDto
    ): Promise<Employee> {
        const employee = await this.employeesRepository.findOne(employeeId);
        if (!employee) {
            throw new NotFoundException(`Employee #${employeeId} not found`);
        }

        return this.employeesRepository.editEmployee(
            employeeId,
            updateEmployeeDto
        );
    }

    public async delete(employeeId: number): Promise<void> {
        await this.employeesRepository.delete(employeeId);
    }
}
