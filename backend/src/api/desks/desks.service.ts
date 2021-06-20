import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Desk } from './entities/desk.entity';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';
import { DesksRepository } from './repositories/desks.repository';

@Injectable()
export class DesksService {
    constructor(
        @InjectRepository(DesksRepository)
        private desksRepository: DesksRepository
    ) {}

    public async findAll(): Promise<Desk[]> {
        return this.desksRepository.findAll();
    }

    public async findOne(deskId: number): Promise<Desk> {
        const desk = await this.desksRepository.findById(deskId);
        if (!desk) {
            throw new NotFoundException(`Desk #${deskId} not found`);
        }

        return desk;
    }

    public async create(createDeskDto: CreateDeskDto): Promise<Desk> {
        return this.desksRepository.createDesk(createDeskDto);
    }

    public async update(
        deskId: number,
        updateDeskDto: UpdateDeskDto
    ): Promise<Desk> {
        const desk = await this.desksRepository.findOne(deskId);
        if (!desk) {
            throw new NotFoundException(`Desk #${deskId} not found`);
        }

        return this.desksRepository.editDesk(deskId, updateDeskDto);
    }

    public async delete(deskId: number): Promise<void> {
        await this.desksRepository.delete(deskId);
    }
}
