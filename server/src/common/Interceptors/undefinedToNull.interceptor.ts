import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    //res.json()전 원하는 로직 작성
    // return next.handle().pipe(map((data) => ({ data, code: 'SUCCESS' })));
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}
//해당 코드를 사용함으로써 한번더 응답할 데이터를 가공하게 된다.
///>> 사용시 data === user
//{data : user , code : "SUCCESS"}
