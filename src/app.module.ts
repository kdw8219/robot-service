import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotModule } from './robot/robot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ComutilService } from './comutil/comutil.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') as string,
        port: configService.get('DB_PORT') as number,
        username: configService.get('DB_USER') as string,
        password: configService.get('DB_PASSWORD') as string,
        database: configService.get('DB_NAME') as string,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [/* ConfigService */ ConfigService],
    }),
    RobotModule,
    
   ],
  controllers: [AppController],
  providers: [AppService, ComutilService],
})
export class AppModule {}
