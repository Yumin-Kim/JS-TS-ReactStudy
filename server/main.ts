import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import register from "@react-ssr/nestjs-express/register";
import { AppModule } from "./app.module";

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await register(app);

  app.setViewEngine("hbs");

  app.listen(process.env.PORT || 5000, async () => {
    console.log(`> Ready on http://localhost:3000`);
  });
})();
