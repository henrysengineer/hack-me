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

import { DesksService } from './desks.service';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';
import { Desk } from './entities/desk.entity';

@Controller('/api/desks')
export class DesksController {
    constructor(private desksService: DesksService) {}

    @Get()
    public async findAll(): Promise<Desk[]> {
        return this.desksService.findAll();
    }

    @Get('/:deskId')
    public async findOne(@Param('deskId') deskId: number): Promise<Desk> {
        return this.desksService.findOne(deskId);
    }

    @Post()
    public async create(
        @Body(new ValidationPipe({ transform: true }))
        createDesksDto: CreateDeskDto
    ): Promise<Desk> {
        try {
            return await this.desksService.create(createDesksDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('/:deskId')
    public async update(
        @Body() updateDeskDto: UpdateDeskDto,
        @Param('deskId') deskId: number
    ): Promise<Desk> {
        const desk = await this.desksService.update(deskId, updateDeskDto);

        return desk;
    }

    @Delete('/:deskId')
    public async delete(@Param('deskId') deskId: number): Promise<void> {
        const desk = await this.findOne(deskId);
        if (!desk) {
            throw new NotFoundException(`Desk #${desk} not found`);
        }

        return this.desksService.delete(deskId);
    }
}
