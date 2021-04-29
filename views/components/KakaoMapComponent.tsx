import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  VFC,
} from "react";
import { useContext } from "react";
import { GetCurrentPostioin } from "../api/util";
import { InitialStore } from "../Layouts";
import { IBusLoactionItem } from "../typings/type";

interface KakaoComponent {
  KakaoMapListInfo: IBusLoactionItem;
}

const KakaoMapComponent: FC<KakaoComponent> = ({ KakaoMapListInfo }) => {
  const [check, setCheck] = useState<
    Pick<IBusLoactionItem, "gpslati" | "gpslong">
  >({} as Pick<IBusLoactionItem, "gpslati" | "gpslong">);
  const { state, dispatch } = useContext(InitialStore);
  const { BusStationInfo, resetMapState } = state;
  const checkMemo = useMemo(() => {
    if (check.gpslati) {
      let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      if (check.gpslati) {
        let options = {
          center: new window.kakao.maps.LatLng(check.gpslati, check.gpslong), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        return new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      }
    }
  }, [check, KakaoMapListInfo, BusStationInfo]);

  useEffect(() => {
    async function name() {
      const data = await GetCurrentPostioin();
      setCheck(data);
    }
    name();
  }, []);
  useEffect(() => {
    if (check.gpslong) {
      if (KakaoMapListInfo.gpslati) {
        var moveLatLon = new window.kakao.maps.LatLng(
          KakaoMapListInfo.gpslati,
          KakaoMapListInfo.gpslong
        );

        checkMemo.panTo(moveLatLon);
        var iwContent = `<div ><div style="font-size:12px;">지역 : ${KakaoMapListInfo.nodenm} </div>`;
        iwContent += `<div style="font-size:12px;">버스 번호 : ${KakaoMapListInfo.vehicleno} </div>`;
        iwContent += `<div style="font-size:12px;">버스 종류 :${KakaoMapListInfo.routetp} </div></div>`;
        var infowindow = new window.kakao.maps.InfoWindow({
          position: moveLatLon,
          content: iwContent,
        });
        const marker = new window.kakao.maps.Marker({
          map: checkMemo,
          position: moveLatLon, // 마커를 표시할 위치
        });
        marker.setMap(checkMemo);
      }
    }
  }, [check, KakaoMapListInfo]);

  useEffect(() => {
    if (resetMapState && check.gpslong) {
      var moveLatLon = new window.kakao.maps.LatLng(
        check.gpslati,
        check.gpslong
      );
      checkMemo.panTo(moveLatLon);
    }
  }, [BusStationInfo]);

  const onClickReset = () => {};

  return (
    <div>
      <button onClick={onClickReset}></button>
      <div id="map" style={{ width: "50vw", height: "50vh" }}></div>
    </div>
  );
};

export default KakaoMapComponent;
// const [markInfo, setMarkInfo] = useState();
// const onClickAsyncBusStationInfo = useCallback(async () => {
//   try {
//     const { response: responseBusStation } = await getBusStationInfo(12);
//     setBusStationInfo([...responseBusStation.body.items.item]);
//     console.log(busStationInfo);
//   } catch (error) {
//     console.log(error);
//   }
// }, [busStationInfo]);

// const onClickAsyncBusLocationInfo = useCallback(async () => {
//   const { response } = await getBusLocationInfo({
//     cityCode: 12,
//     routeId: "SJB293000302",
//   });
//   console.log(response.body.items.item);
//   // 배열<객체> , 객체 ,
//   if (Array.isArray(response.body.items.item)) {
//     if (response.body.items.item[0].gpslati) {
//       console.log("busLocationInfo", busLocationInfo);
//       console.log(response.body.items.item);
//       setBusLoactionInfo([...response.body.items.item]);
//     }
//   } else {
//     console.log("busLocationInfo", busLocationInfo);
//     setBusLoactionInfo([{ ...(response.body.items.item as any) }]);
//   }
// }, [busLocationInfo]);

// if (BusLocationInfo) {
//   if (!clickTag) {
//   }
// } else {
// }
// if (busLocationInfo.length > 0) {
//   console.log("componentDidUpdate ///  busLocationInfo");
//   console.log(busLocationInfo);
//   var moveLatLon = new window.kakao.maps.LatLng(
//     busLocationInfo[0].gpslati,
//     busLocationInfo[0].gpslong
//   );

//   map.panTo(moveLatLon);
//   console.log(moveLatLon);
// }
