import axios from "axios";
import {
  IBusBasicInfo,
  IBusLoactionItem,
  IBusLoactionItems,
  IBusLocationType,
  IBusStationItem,
  IBusStationType,
  Item,
  T_BusRouteBodyType,
} from "../typings/type";

const REQUESTURL = "https://busappyuminkim.herokuapp.com" as const;

export const getBusBasicInfo = async (
  state: Item[],
  setState: React.Dispatch<React.SetStateAction<Item[]>>
) => {
  try {
    const { data: responseBasicBusInfo } = await axios.post<IBusBasicInfo>(
      `${REQUESTURL}/businfo`
    );
    const { response: baiscBusInfo } = responseBasicBusInfo;
    setState({ ...baiscBusInfo.body.items.item });
    console.log(state);
  } catch (error) {
    console.log(error);
  }
};

export const getBusBasic = async (): Promise<Item[] | undefined> => {
  try {
    const { data: responseBasicBusInfo } = await axios.post<IBusBasicInfo>(
      `${REQUESTURL}/businfo`
    );
    const { response: baiscBusInfo } = responseBasicBusInfo;
    console.log(baiscBusInfo);
    if (baiscBusInfo.body.items.item) return baiscBusInfo.body.items.item;
  } catch (error) {
    console.log(error);
  }
};

export const getBusStationInfo = async (
  cityCode: number
): Promise<IBusStationType> => {
  return (
    await axios.post<IBusStationType>(`${REQUESTURL}/busstation`, { cityCode })
  ).data;
};

export const getBusLocationInfo = async (requestBody: T_BusRouteBodyType) => {
  console.log(requestBody);
  const response = (
    await axios.post<IBusLocationType>(`${REQUESTURL}/buslocation`, requestBody)
  ).data;
  return response;
};
