import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetRobotLoginDto {

  @IsString()
  @Type(() => String)
  robot_id: string;

  @IsString()
  @Type(() => String)
  robot_secret: string;
}
