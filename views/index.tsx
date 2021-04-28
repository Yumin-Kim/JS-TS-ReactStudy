import React from "react";
import { Head } from "@react-ssr/nestjs-express";
import BasicLayout from "./Layouts/index";
declare global {
  interface Window {
    kakao: any;
  }
}
interface IndexProps {
  message: string;
}

const Index = (props: IndexProps) => {
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

  // useEffect(() => {
  //   let map;
  //   if (busInfo.length === 0) {
  //     getBusBasicInfo(busInfo, setBusInfo);
  //   } else {
  //     let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  //     let options = {
  //       //지도를 생성할 때 필요한 기본 옵션
  //       center: new window.kakao.maps.LatLng(36.475331, 127.27), //지도의 중심좌표.
  //       level: 3, //지도의 레벨(확대, 축소 정도)
  //     };

  //     map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  //   }
  //   if (busLocationInfo.length > 0) {
  //     console.log("componentDidUpdate ///  busLocationInfo");
  //     console.log(busLocationInfo);
  //     var moveLatLon = new window.kakao.maps.LatLng(
  //       busLocationInfo[0].gpslati,
  //       busLocationInfo[0].gpslong
  //     );

  //     map.panTo(moveLatLon);
  //     console.log(moveLatLon);
  //     var iwContent =
  //       '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>';
  //     var infowindow = new window.kakao.maps.InfoWindow({
  //       position: moveLatLon,
  //       content: iwContent,
  //     });
  //     const marker = new window.kakao.maps.Marker({
  //       map: map,
  //       position: moveLatLon, // 마커를 표시할 위치
  //     });
  //     infowindow.open(map, marker);
  //   }
  // }, [busInfo, busStationInfo, busLocationInfo]);

  return (
    <>
      <Head>
        <title>An example of @react-ssr/nestjs-express!!</title>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7250bf819d0f84eda2f84fa26fe67eda"
        ></script>
      </Head>
      <BasicLayout />
    </>
  );
};

export default Index;
