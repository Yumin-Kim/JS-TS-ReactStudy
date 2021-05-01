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
//로딩 하는 모션 , 리팩토링

interface KakaoComponent {
  KakaoMapListInfo: IBusLoactionItem;
  checkThis: boolean;
  changeCheckThis: React.Dispatch<React.SetStateAction<boolean>>;
}

const KakaoMapComponent: FC<KakaoComponent> = ({
  KakaoMapListInfo,
  checkThis,
}) => {
  const [check, setCheck] = useState<
    Pick<IBusLoactionItem, "gpslati" | "gpslong">
  >({} as Pick<IBusLoactionItem, "gpslati" | "gpslong">);
  const [loading, setLoading] = useState(true);
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
      console.log(data);

      setCheck(data);
    }
    name();
  }, []);
  useEffect(() => {
    if (check.gpslong) {
      if (KakaoMapListInfo.gpslati && checkThis) {
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
    console.log(check.gpslong, resetMapState);

    if (check.gpslong) {
      if (resetMapState) {
        console.log("resetMapState");

        console.log(check);
        // console.log(check.gpslong);
        var moveLatLon = new window.kakao.maps.LatLng(
          check.gpslati,
          check.gpslong
        );
        const marker = new window.kakao.maps.Marker({
          map: checkMemo,
          position: moveLatLon, // 마커를 표시할 위치
        });
        checkMemo.panTo(moveLatLon);
        marker.setMap(checkMemo);
        dispatch({ type: "SWITCH_COMPONENT", payload: false });
      }
    }
  }, [check, resetMapState]);

  const onClickReset = useCallback(() => {
    setLoading(prev => !prev);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "50vh" }}></div>
    </div>
  );
};

export default KakaoMapComponent;
