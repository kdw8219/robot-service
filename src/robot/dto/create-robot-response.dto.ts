import {IsString, IsNotEmpty} from 'class-validator'

export class CreateRobotResponseDto {
    @IsString()
    @IsNotEmpty()
    robot_id:string;

    @IsString()
    @IsNotEmpty()
    result:string;
}
