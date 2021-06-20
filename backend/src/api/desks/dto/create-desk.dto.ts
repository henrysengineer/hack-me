import { ApiProperty } from '@nestjs/swagger';

import { DeskType } from '../interface';

export class CreateDeskDto {
    @ApiProperty()
    type: DeskType;

    @ApiProperty()
    occupancy: number;
}
