import { IBusLoactionItem } from "../typings/type";

export const GetCurrentPostioin = async () => {
  return new Promise<Pick<IBusLoactionItem, "gpslati" | "gpslong">>(
    (resolve, reject) => {
      // navigator.geolocation.getCurrentPosition(position => {
      resolve({
        gpslati: "36.6232956",
        gpslong: "127.4829271",
      });
      // }, reject);
    }
  );
};
