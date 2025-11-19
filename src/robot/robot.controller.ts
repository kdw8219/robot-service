import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { RobotService } from './robot.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { GetRobotsDto } from './dto/get-all-robots.dto';
import { CreateRobotResponseDto } from './dto/create-robot-response.dto';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from 'winston';
import { GetRobotsResponseDto } from './dto/get-all-robots-response.dto';
import { GetRobotLoginDto } from './dto/get-robot-login.dto';
import * as bcrypt from "bcrypt"

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

    const hashed = await bcrypt.hash(createRobotDto.robot_secret, 10)

    createRobotDto.robot_secret = hashed;

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
      this.logger.info(`success robot getting`);
    }
    else {
      this.logger.info(`failed robot getting`);
    }
    
    return getRobots;
  }

  @Get(':id')
  async findOne(@Param('id') robot_id:string) : Promise<GetRobotsResponseDto> {

    console.log('received?')
    this.logger.info(`start to get one robot`)
    
    let getRobot = await this.robotService.findOne(robot_id);

    if( getRobot.result == `Get Robot Success` ) {
      this.logger.info(`success robot getting`);
    }
    else {
      this.logger.info(`failed robot getting`);
    }
    
    return getRobot;
  }

  @Post('login')
  async login(@Body() login: GetRobotLoginDto) : Promise<GetRobotsResponseDto> {
    this.logger.info(`start to get one robot`)

    let robot = await this.robotService.login(login)

    if( robot.result == `Exist` ) {
      this.logger.info(`success robot getting`);
    }
    else {
      this.logger.info(`failed robot getting`);
    }
    
    return robot;
  }

  @Patch(':id')
  async update(@Param('id') robot_id:string, @Body() updateRobotDto: UpdateRobotDto) : Promise<CreateRobotResponseDto> {
    console.log('received?')
    this.logger.info(`start to patch robots `)

    return await this.robotService.update(updateRobotDto, robot_id);
  }

  @Delete(':id')
  remove(@Param('id') robot_id: string) {
    return this.robotService.remove(robot_id);
  }
}
