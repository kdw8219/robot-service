import { Injectable } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { CreateRobotResponseDto } from './dto/create-robot-response.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
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

  findAll() {
    return `This action returns all robot`;
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
