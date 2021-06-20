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

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('/api/employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) {}

    @Get()
    public async findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    @Get('/:employeeId')
    public async findOne(
        @Param('employeeId') employeeId: number
    ): Promise<Employee> {
        return this.employeesService.findOne(employeeId);
    }

    @Post()
    public async create(
        @Body(new ValidationPipe({ transform: true }))
        createEmployeesDto: CreateEmployeeDto
    ): Promise<Employee> {
        try {
            return await this.employeesService.create(createEmployeesDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('/:employeeId')
    public async update(
        @Body() updateEmployeeDto: UpdateEmployeeDto,
        @Param('employeeId') employeeId: number
    ): Promise<Employee> {
        const employee = await this.employeesService.update(
            employeeId,
            updateEmployeeDto
        );

        return employee;
    }

    @Delete('/:employeeId')
    public async delete(
        @Param('employeeId') employeeId: number
    ): Promise<void> {
        const employee = await this.findOne(employeeId);
        if (!employee) {
            throw new NotFoundException(`Employee #${employee} not found`);
        }

        return this.employeesService.delete(employeeId);
    }
}
