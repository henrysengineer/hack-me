import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Desk } from '../entities/desk.entity';
import { CreateDeskDto } from '../dto/create-desk.dto';
import { UpdateDeskDto } from '../dto/update-desk.dto';

@Injectable()
@EntityRepository(Desk)
export class DesksRepository extends Repository<Desk> {
    public async findAll(): Promise<Desk[]> {
        return await this.find({});
    }

    public async findById(deskId: number): Promise<Desk> {
        return await this.findOne(deskId);
    }

    public async createDesk(createDeskDto: CreateDeskDto): Promise<Desk> {
        let desk = new Desk();

        Object.keys(createDeskDto).forEach((key) => {
            if (
                createDeskDto[key] === null ||
                createDeskDto[key] === undefined
            ) {
                throw new Error(`Missing or invalid desk property: ${key}`);
            }

            desk[key] = createDeskDto[key];
        });

        desk = await this.save(desk);
        return desk;
    }

    public async editDesk(
        deskId: number,
        updateDeskDto: UpdateDeskDto
    ): Promise<Desk> {
        const desk = await this.findOne(deskId);

        Object.keys(updateDeskDto).forEach((key) => {
            if (
                updateDeskDto[key] === null ||
                updateDeskDto[key] === undefined
            ) {
                return;
            }

            desk[key] = updateDeskDto[key];
        });

        await this.save(desk);
        return desk;
    }

    public async destroy(deskId: number): Promise<void> {
        const desk = await this.findOne(deskId);
        if (!desk) {
            return;
        }

        await this.remove(desk);
    }
}
