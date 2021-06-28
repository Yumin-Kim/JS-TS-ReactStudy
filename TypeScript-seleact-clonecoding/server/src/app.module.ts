import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleWare } from './middlewares/logger.middleware';
import { UesrsModule } from './uesrs/uesrs.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [ConfigModule.forRoot(), UesrsModule, WorkspacesModule, ChannelsModule, DmsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleWare).forRoutes('*');
  }
}
