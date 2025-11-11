import { IsOptional, IsInt} from 'class-validator'
import { Type } from 'class-transformer';

export class GetRobotsDto {
    @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page_per: number;
}
