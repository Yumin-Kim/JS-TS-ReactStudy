import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// declare 키워드 타입스크립트 컴파일러에게 특정한 변수가 있다고 선언하는 키워드로 전역변수를 사용하거나 .d.ts 파일을 만들때 사용한다.
declare var module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Test API Swagger')
    .setDescription('Test API 문서 입니다')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
