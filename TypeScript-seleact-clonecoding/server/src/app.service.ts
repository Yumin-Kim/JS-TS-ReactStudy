import { Injectable } from '@nestjs/common';

//주요 동작만 구현
//req , res 이러한 매개변수를 사용하여 코딩하는것은 좋지 않다.?

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.SECRET;
  }

  postHello(): string {
    return 'Hello Post';
  }
}
