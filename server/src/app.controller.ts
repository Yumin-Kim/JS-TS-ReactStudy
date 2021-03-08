import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

//req , res 에 대해서 실질적으로 분석하여 라우트간 분리??
//express에선 하나의 라우트에서 요청에 대한 분석후 주요 로직(비즈니스 로직)이 동작하게되고 res를 통해 프론트단으로 전송해주었지만
//nest는 주요동작과 req,res에 대한 처리를 분리하여 코딩한다. >> 비즈니스 로직을 하나의 서비스로 구현후 재사용할 수 있다.

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  PostUser(): string {
    return this.appService.postHello();
  }
}
