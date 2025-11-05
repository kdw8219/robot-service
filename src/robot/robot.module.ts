import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { RobotController } from './robot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Robot } from './entities/robot.entity'

@Module({
  imports:[TypeOrmModule.forFeature([Robot])],
  controllers: [RobotController],
  providers: [RobotService],
})
export class RobotModule {}
