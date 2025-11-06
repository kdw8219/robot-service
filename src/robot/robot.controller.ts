import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RobotService } from './robot.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';

@Controller('api/robots')
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Post()
  create(@Body() createRobotDto: CreateRobotDto) {
    return this.robotService.create(createRobotDto);
  }

  @Get()
  findAll() {
    return this.robotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') robot_id: string) {
    return this.robotService.findOne(robot_id);
  }

  @Patch()
  update(@Body() updateRobotDto: UpdateRobotDto) {
    return this.robotService.update(updateRobotDto);
  }

  @Delete(':id')
  remove(@Param('id') robot_id: string) {
    return this.robotService.remove(robot_id);
  }
}
