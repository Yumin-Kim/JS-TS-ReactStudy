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
          center: new window.kakao.maps.LatLng(
            KakaoMapListInfo.gpslati,
            KakaoMapListInfo.gpslong
          ), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        return new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      }
    }
  }, [check, KakaoMapListInfo, BusStationInfo]);
  const roadMemo = useMemo(() => {
    if (check.gpslati) {
      let roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new window.kakao.maps.Roadview(roadviewContainer);
      var roadviewClient = new window.kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      var position = new window.kakao.maps.LatLng(
        KakaoMapListInfo.gpslati,
        KakaoMapListInfo.gpslong
      );
      roadviewClient.getNearestPanoId(position, 50, function (panoId: any) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
      return [roadviewClient, roadview];
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
    console.log("useEffect KakaoMapListInfo");
    if (check.gpslong) {
      if (KakaoMapListInfo.gpslati && checkThis) {
        console.log("KakaoMapListInfo", KakaoMapListInfo);

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
          content: iwContent,
        });

        marker.setMap(checkMemo);
        if (roadMemo) {
          const [roadviewClient, roadview] = roadMemo;
          var position = new window.kakao.maps.LatLng(
            KakaoMapListInfo.gpslati,
            KakaoMapListInfo.gpslong
          );
          console.log(roadviewClient, roadview, position);

          return roadviewClient.getNearestPanoId(
            position,
            50,
            function (panoId: any) {
              roadview.setPanoId(panoId, moveLatLon); //panoId와 중심좌표를 통해 로드뷰 실행
            }
          );
        }
      }
    }
  }, [KakaoMapListInfo]);

  useEffect(() => {
    if (check.gpslong) {
      if (resetMapState) {
        console.log("resetMapState");
        var moveLatLon = new window.kakao.maps.LatLng(
          KakaoMapListInfo.gpslati,
          KakaoMapListInfo.gpslong
        );
        const marker = new window.kakao.maps.Marker({
          map: checkMemo,
          position: moveLatLon, // 마커를 표시할 위치
        });

        marker.setMap(checkMemo);
        // console.log(check.gpslong);
        // var moveLatLon = new window.kakao.maps.LatLng(
        //   check.gpslati,
        //   check.gpslong
        // );
        // const marker = new window.kakao.maps.Marker({
        //   map: checkMemo,
        //   position: moveLatLon, // 마커를 표시할 위치
        // });
        // checkMemo.panTo(moveLatLon);
        // marker.setMap(checkMemo);
        // dispatch({ type: "SWITCH_COMPONENT", payload: false });
      }
    }
  }, [check, resetMapState]);

  const onClickReset = useCallback(() => {
    setLoading(prev => !prev);
  }, []);

  return (
    <>
      <div>
        <div id="map" style={{ width: "100%", height: "50vh" }}></div>
      </div>
      <div>
        <div id="roadview" style={{ width: "100%", height: "300px" }}></div>
      </div>
    </>
  );
};

export default KakaoMapComponent;
