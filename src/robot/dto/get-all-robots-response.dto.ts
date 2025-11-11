import {ApiProperty} from '@nestjs/swagger'
import { CreateRobotDto } from './create-robot.dto';

export class GetRobotsResponseDto {

  @ApiProperty({ type: [CreateRobotDto], description: '로봇 목록' })
  robots: CreateRobotDto[];

  @ApiProperty({ example: 100, description: '조건에 맞는 총 로봇 수' })
  current_totalCount: number;

  @ApiProperty({ example: 100, description: '총 로봇 수' })
  totalCount: number;

  @ApiProperty({ example: `Get Robot Success`, description: '조회 결과 전달'})
  result:string;
}
