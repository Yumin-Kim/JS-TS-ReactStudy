import React, {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useContext } from "react";
import { getBusLocationInfo } from "../api/busapi";
import { InitialStore } from "../Layouts";
import Button from "antd/lib/button";
import message from "antd/lib/message";
import Table from "antd/lib/table";
import { IBusStationItem } from "../typings/type";
import { ColumnsType } from "antd/lib/table";

interface CompactBusStationInfo
  extends Pick<
    IBusStationItem,
    "endnodenm" | "startnodenm" | "routeno" | "routetp"
  > {
  button: any;
}
const StationCopoment = () => {
  const { state, dispatch } = useContext(InitialStore);
  const [spliceBusStatioinList, setSpliceBusStationList] = useState<
    Array<CompactBusStationInfo>
  >([]);
  const { BusStationInfo, cityCode, resetMapState } = state;
  const data = useRef<number>(0);
  const columns = useRef<ColumnsType<any>>([]);
  // let columns = null;
  //cityCode 사용 함에 있어 useCallbak능력 알게됨 ㄷㄷ
  const onClickBusLocation = useCallback(
    async (params: any) => {
      const [routeId] = params;

      let findIndex = 0;
      BusStationInfo.find((params, index) => {
        if (params.routeid === routeId) findIndex = index;
      });
      message.info(
        `${BusStationInfo[findIndex].startnodenm} ~ ${BusStationInfo[findIndex].startnodenm} 조회 중`
      );
      const { response: responseBusLocation } = await getBusLocationInfo({
        cityCode,
        routeId,
      });
      dispatch({
        type: "SWITCH_COMPONENT",
        payload: true,
      });
      dispatch({ type: "ROUTEID_INFO", payload: routeId });
      if ((responseBusLocation.body.items as any) === "") {
        dispatch({
          type: "LOCATION_INFO_FAILURE",
          payload: findIndex,
        });
        message.warning(`조회 결과 없습니다!`);
      } else {
        dispatch({
          type: "LOCATION_INFO_SUCCESS",
          payload: responseBusLocation.body.items.item,
        });
        message.success(`조회 성공!`);
      }
    },
    [cityCode, BusStationInfo]
  );

  useEffect(() => {
    columns.current = [
      {
        title: "버스 번호",
        dataIndex: "routeno",
        key: "routeno",
      },
      {
        title: "시작 정류장",
        dataIndex: "startnodenm",
        key: "startnodenm",
      },
      {
        title: "마지막 정류장",
        dataIndex: "endnodenm",
        key: "endnodenm",
      },
      {
        title: "버스 종류",
        dataIndex: "routetp",
        key: "routetp",
      },
      {
        title: "조회",
        dataIndex: "button",
        key: "button",
        render: (button: any) => (
          <Button value={button} onClick={() => onClickBusLocation(button)}>
            조회
          </Button>
        ),
      },
    ];

    if (BusStationInfo.length > 0) {
      const ReturnReduceBusStationList = [...BusStationInfo].reduce(
        (prev, cur, index) => {
          prev.push({
            routeno: cur.routeno,
            routetp: cur.routetp,
            button: [cur.routeid],
            startnodenm: cur.startnodenm,
            endnodenm: cur.endnodenm,
          });
          return prev;
        },
        [] as CompactBusStationInfo[]
      );
      console.log(ReturnReduceBusStationList);

      setSpliceBusStationList([...ReturnReduceBusStationList]);
    }
  }, [BusStationInfo]);

  return (
    <>
      <Table
        columns={columns.current}
        dataSource={spliceBusStatioinList}
        pagination={{ pageSize: 20 }}
        style={{ height: "100%" }}
        scroll={{ y: 450 }}
      />
    </>
  );
};

export default memo(StationCopoment);
