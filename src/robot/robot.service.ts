import { Injectable } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { CreateRobotResponseDto } from './dto/create-robot-response.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { GetRobotsDto } from './dto/get-all-robots.dto';
import { GetRobotsResponseDto } from './dto/get-all-robots-response.dto';
import { Robot } from './entities/robot.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { ComutilService } from 'src/comutil/comutil.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import e from 'express';
import { TimeoutError } from 'rxjs';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(Robot)
    private readonly robotRepo: Repository<Robot>,
    private comutil: ComutilService,
  ) {}

  async create(createRobotDto: CreateRobotDto) : Promise<CreateRobotResponseDto> {
    let robot:Robot | null = null;
    let createRobotResponse:CreateRobotResponseDto = new CreateRobotResponseDto();
    createRobotResponse.robot_id = createRobotDto.robot_id;
    try {
      robot = await this.comutil.withTimeout(this.robotRepo.save(createRobotDto), 1000);
      createRobotResponse.result = `Robot Creation is success`;
    }
    catch (err) {
      if(err instanceof TimeoutError) {
        createRobotResponse.result = `robot creation fail, Internal Error occurred`;
      }
      else {
        createRobotResponse.result = `robot creation fail, check datas`;
      }
    }
    return createRobotResponse;
  }

  async findAll(pages:GetRobotsDto) : Promise<GetRobotsResponseDto> {

    let robots:Robot[] | null = null;
    let getRobotResponse:GetRobotsResponseDto = new GetRobotsResponseDto();
    let currentTotalCount:Number = 0;
    let totalCount:Number = 0;
    
    try {
      let skip:number = (pages.page - 1) * pages.page_per;
      let pagePer:number = pages.page_per;
      const [[robots, currentTotalCount], totalCount ] = await Promise.all([
        this.comutil.withTimeout(this.robotRepo.findAndCount(
        {
          skip,
          take: pagePer,
          order: { created_at: 'ASC' },
        }
      ), 1000),
      this.comutil.withTimeout(this.robotRepo.count(), 1000)
    ]);

      getRobotResponse.robots = robots;
      getRobotResponse.current_totalCount = currentTotalCount;
      getRobotResponse.totalCount = totalCount;
      getRobotResponse.result = `Get Robot Success`;
    }
    catch (err) {
      if(err instanceof TimeoutError) {
        getRobotResponse.result = `Get Robot fail, Internal Error occurred`;
      }
      else {
        getRobotResponse.result = `Get Robot fail, check datas`;
      }
    }
    return getRobotResponse;
  }

  findOne(robot_id: string) {
    return `This action returns a #${robot_id} robot`;
  }

  update(updateRobotDto: UpdateRobotDto) {
    return `This action updates a robot`;
  }

  remove(robot_id: string) {
    return `This action removes a #${robot_id} robot`;
  }
}
