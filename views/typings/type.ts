//////////////////////////////////////////////////
//////////////////////////////////////////////////

export interface IInitialState {
  cityCode: number;
  routeId: string;
  BasicbusInfo: Item[];
  BusStationInfo: IBusStationItem[];
  BusLocationInfo: IBusLoactionItem[];
  getBusLoactionfailure: boolean;
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
export interface IBusBasicInfo {
  response: Response;
  "#omit-xml-declaration": string;
}

export interface Response {
  header: Header;
  body: Body;
}

export interface Body {
  items: Items;
}

export interface Items {
  item: Item[];
}

export interface Item {
  citycode: string;
  cityname: string;
}

export interface Header {
  resultCode: string;
  resultMsg: string;
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////

export interface IBusStationType {
  response: IBusStaionResponse;
  "#omit-xml-declaration": string;
}

export interface IBusStaionResponse {
  header: IBusStaionHeader;
  body: IBusStationBody;
}

export interface IBusStationBody {
  items: IBusStationItems;
  numOfRows: string;
  pageNo: string;
  totalCount: string;
}

export interface IBusStationItems {
  item: IBusStationItem[];
}

export interface IBusStationItem {
  endnodenm: string;
  endvehicletime: string;
  routeid: string;
  routeno: string;
  routetp: Routetp;
  startnodenm: string;
  startvehicletime: string;
}

export enum Routetp {
  간선버스 = "간선버스",
  광역버스 = "광역버스",
  급행버스 = "급행버스",
  마을버스 = "마을버스",
  지선버스 = "지선버스",
}

export interface IBusStaionHeader {
  resultCode: string;
  resultMsg: string;
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////

export interface IBusLocationType {
  response: IBusLocationResponse;
  "#omit-xml-declaration": string;
}

export interface IBusLocationResponse {
  header: IBusLoactionHeader;
  body: IBusLoactionBody;
}

export interface IBusLoactionBody {
  items: IBusLoactionItems;
  numOfRows: string;
  pageNo: string;
  totalCount: string;
}

export interface IBusLoactionItems {
  item: IBusLoactionItem[];
}

export interface IBusLoactionItem {
  gpslati: string;
  gpslong: string;
  nodeid: string;
  nodenm: string;
  nodeord: string;
  routenm: string;
  routetp: string;
  vehicleno: string;
}

export interface IBusLoactionHeader {
  resultCode: string;
  resultMsg: string;
}

export type T_BusRouteBodyType = { cityCode: number; routeId: string };
