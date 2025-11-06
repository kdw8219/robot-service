import {IsString, IsNotEmpty} from 'class-validator'

export class CreateRobotDto {
    @IsString()
    @IsNotEmpty()
    robot_id:string;

    @IsString()
    @IsNotEmpty()
    model:string
    
    @IsString()
    @IsNotEmpty()
    firmware_version: string;
    
    @IsString()
    @IsNotEmpty()
    location: string;
}
