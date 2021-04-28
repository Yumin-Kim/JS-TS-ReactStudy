import axios from "axios";
import {
  IBusBasicInfo,
  IBusLocationType,
  IBusStationType,
  T_BusRouteBodyType,
} from "../../views/typings/type";

export async function bus() {
  try {
    return await axios.get<IBusBasicInfo>(
      "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getCtyCodeList?serviceKey=rZ0pAUmylymULG2efMLk8UuWGlwX3Cw4YJui%2Fi6FE%2BK2K3za4bSpwq6zAR1ZSOH5555axRCMpa4vuZWH9tB%2F9A%3D%3D&"
    );
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getBusStationInfo(cityCode: number) {
  try {
    const { data } = await axios.get<IBusStationType>(
      `http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteNoList?serviceKey=JWgiq%2BZwoSXIEBrNC8Haufh89ABK1km8JduikIhCWc1wAJjsgQpyM3SNd2i%2ByhnglLKzv92fStrPSSHllI0sXA%3D%3D&cityCode=${cityCode}&numOfRows=200`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function getDetailBuslocation({
  cityCode,
  routeId,
}: T_BusRouteBodyType) {
  try {
    const { data } = await axios.get<IBusLocationType>(
      `http://openapi.tago.go.kr/openapi/service/BusLcInfoInqireService/getRouteAcctoBusLcList?serviceKey=rZ0pAUmylymULG2efMLk8UuWGlwX3Cw4YJui%2Fi6FE%2BK2K3za4bSpwq6zAR1ZSOH5555axRCMpa4vuZWH9tB%2F9A%3D%3D&cityCode=${cityCode}&routeId=${routeId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
