import { IBusLoactionItem } from "../typings/type";

export const GetCurrentPostioin = async () => {
  return new Promise<Pick<IBusLoactionItem, "gpslati" | "gpslong">>(
    (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({
          gpslati: String(position.coords.latitude),
          gpslong: String(position.coords.longitude),
        });
      }, reject);
    }
  );
};
