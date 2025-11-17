import { Injectable, NotFoundException, GatewayTimeoutException } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { CreateRobotResponseDto } from './dto/create-robot-response.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { GetRobotsDto } from './dto/get-all-robots.dto';
import { GetRobotsResponseDto } from './dto/get-all-robots-response.dto';
import { Robot } from './entities/robot.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { ComutilService } from 'src/comutil/comutil.service';
import { GetRobotLoginDto } from './dto/get-robot-login.dto';
import * as bcrypt from "bcrypt"

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
      if (err.code === 'ETIMEDOUT') {
        throw new GatewayTimeoutException('Database timeout');
      
      }
      throw err;
    }
    return createRobotResponse;
  }

  async findAll(pages:GetRobotsDto) : Promise<GetRobotsResponseDto> {

    let getRobotResponse:GetRobotsResponseDto = new GetRobotsResponseDto();
    
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
      if (err.code === 'ETIMEDOUT') {
        throw new GatewayTimeoutException('Database timeout');
      
      }
      throw err;
    }
    return getRobotResponse;
  }

  async login(login:GetRobotLoginDto) : Promise<GetRobotsResponseDto> {
    let getRobotResponse:GetRobotsResponseDto = new GetRobotsResponseDto();

    try {
      const robot = await this.comutil.withTimeout(this.robotRepo.findOne({where: { robot_id:login.robot_id },}), 1000);
      if(!robot) throw new NotFoundException('robot not found');

      const match = await bcrypt.compare(login.robot_secret, robot.robot_secret);
      if(!match) throw new NotFoundException('Secret mismatch');

      getRobotResponse.result = `Exist`;
    }
    catch (err) {
      if (err.code === 'ETIMEDOUT') {
        throw new GatewayTimeoutException('Database timeout');
      
      }
      throw err;
    }
    return getRobotResponse;

  }

  async update(updateRobotDto: UpdateRobotDto, robot_id:string) {
    let updateRobotResponse:CreateRobotResponseDto = new CreateRobotResponseDto();
    let updateData = updateRobotDto;
    try {
      let res = await this.comutil.withTimeout(this.robotRepo.update({ robot_id }, updateData), 1000);
      if(res.affected != null && res.affected > 0) {
        updateRobotResponse.result = `Update Robot Success`;
      }
      else {
        throw new NotFoundException("Update fail... No robot existed");
      }
        
    }
    catch (err) {
      if (err.code === 'ETIMEDOUT') {
        throw new GatewayTimeoutException('Database timeout');
      
      }
      throw err;
    }
    return updateRobotResponse;
  }

  async remove(robot_id: string) {
    let getRobotResponse:GetRobotsResponseDto = new GetRobotsResponseDto();
    
    try {
      let res = await this.comutil.withTimeout(this.robotRepo.delete({robot_id:robot_id}), 1000);
      if(res.affected != null && res.affected > 0) {
        getRobotResponse.result = `Delete Robot Success`;
      }
      else {
        throw new NotFoundException("Update fail... No robot existed");
      }
        
    }
    catch (err) {
      if (err.code === 'ETIMEDOUT') {
        throw new GatewayTimeoutException('Database timeout');
      
      }
      throw err;
    }
    return getRobotResponse;
  }
}
