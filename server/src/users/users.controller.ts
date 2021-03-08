import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';

console.log('Ehllo');

@Controller('users')
export class UsersController {
  // @Req() req를 사용하여 req의 데이터를 가지고 올 수 있다
  @Get()
  getUsers(@Req() req) {
    return req.user;
  }
  //@Body() express의 bodyParse와 같은 역할함
  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    // this.userService.postUsers(data.email, data.nickname, data.password);
  }

  @Post('login')
  logIn(@Req() req) {
    return req.user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.id', { httpOnly: true });
    res.send('ok');
  }
}
