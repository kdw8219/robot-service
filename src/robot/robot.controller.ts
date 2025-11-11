import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { RobotService } from './robot.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { GetRobotsDto } from './dto/get-all-robots.dto';
import { CreateRobotResponseDto } from './dto/create-robot-response.dto';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from 'winston';
import { GetRobotsResponseDto } from './dto/get-all-robots-response.dto';

@Controller('api/robots')
export class RobotController {
  constructor(
    private readonly robotService: RobotService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() createRobotDto: CreateRobotDto) : Promise<CreateRobotResponseDto> {
    this.logger.info(`start robot registering`)
     console.log('received??!')
    let created = await this.robotService.create(createRobotDto);
    if( created.result == `Robot Creation is success` ) {
      this.logger.info(`success robot registering`);
    }
    else {
      this.logger.info(`failed robot registering`);
    }
    
    return created;
  }

  @Get()
  async findAll(@Query() pages: GetRobotsDto) : Promise<GetRobotsResponseDto> {

    console.log('received?')
    this.logger.info(`start to get robots `)
    
    let getRobots = await this.robotService.findAll(pages);

    if( getRobots.result == `Get Robot Success` ) {
      this.logger.info(`success robot registering`);
    }
    else {
      this.logger.info(`failed robot registering`);
    }
    
    return getRobots;
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
