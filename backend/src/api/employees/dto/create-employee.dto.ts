import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    @ApiProperty()
    fullName: string;

    @ApiProperty()
    job: string;

    @ApiProperty()
    age: number;
}
