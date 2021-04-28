import { bus, getBusStationInfo, getDetailBuslocation } from "./api/busIngfo";
import { Body, Controller, Get, Post, Query, Render } from "@nestjs/common";
import { T_BusRouteBodyType } from "../views/typings/type";

@Controller()
export class AppController {
  @Get()
  @Render("index.tsx")
  showHomePage() {
    return {
      message: "Hello NestJS",
    };
  }
  // 각 도시에 대한 전반적인 정보 전달
  @Post("/businfo")
  async showBusData() {
    const { data }: any = await bus();
    return data;
  }
  //도시에 따른 정류장 조회
  @Post("/busstation")
  async showBusStation(@Body() body: Pick<T_BusRouteBodyType, "cityCode">) {
    const data = await getBusStationInfo(body.cityCode);
    return data;
  }

  @Post("/buslocation")
  async showBusLocation(@Body() body: T_BusRouteBodyType) {
    const data = await getDetailBuslocation(body);
    return data;
  }

  @Get("about")
  @Render("about.hbs")
  public showAboutPage() {
    return {
      message: "About Page",
    };
  }
}
