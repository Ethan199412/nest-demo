import { IsString, IsInt, IsBoolean } from 'class-validator';

export class PersonDto {

    @IsInt()
    readonly id: number;

    @IsString()
    readonly name: string;

    @IsString()
    readonly age: number;
}