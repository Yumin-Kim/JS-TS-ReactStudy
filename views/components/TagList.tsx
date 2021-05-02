import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IInitialState, Item } from "../typings/type";
import { antdDefaultColor } from "./SiderInputBox";
import Tag from "antd/lib/tag";
import Spin from "antd/lib/spin";
import Button from "antd/lib/button";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface TagListProps {
  ListElement: Item[];
  onClickTagFunc: (params: string) => void;
}

const TagList: FC<TagListProps> = ({ ListElement, onClickTagFunc }) => {
  const ListIndex = useRef(0);
  const [moreInfo, setMoreInfo] = useState(true);

  const onClickMoreInfo = useCallback(() => {
    setMoreInfo(false);
  }, []);

  useEffect(() => {
    if (ListIndex.current === 6) {
      ListIndex.current = -1;
    }
    if (!moreInfo) {
      setTimeout(() => {
        ListIndex.current++;
        setMoreInfo(true);
      }, 800);
    }
  }, [moreInfo]);

  return (
    <>
      {Array.isArray(ListElement) && ListElement.length !== 0 && moreInfo ? (
        <div style={{ height: "12vh", width: "100%" }}>
          {ListIndex.current === 0
            ? ListElement.map((params, index) => {
                if (index < antdDefaultColor.length) {
                  return (
                    <Tag
                      style={{ fontSize: "12px", marginBottom: "8px" }}
                      color={antdDefaultColor[index]}
                      onClick={() => onClickTagFunc(params.citycode)}
                      key={`${index}_${params.citycode}`}
                    >
                      {params.cityname}
                    </Tag>
                  );
                }
              })
            : ListElement.map((params, index) => {
                if (
                  index > antdDefaultColor.length * ListIndex.current &&
                  index < antdDefaultColor.length * (ListIndex.current + 1)
                ) {
                  return (
                    <Tag
                      style={{ fontSize: "17px", marginBottom: "8px" }}
                      color={antdDefaultColor[index % 18]}
                      onClick={() => onClickTagFunc(params.citycode)}
                      key={`${index}_${params.citycode}`}
                    >
                      {params.cityname}
                    </Tag>
                  );
                }
              })}
          <Button
            type="primary"
            onClick={onClickMoreInfo}
            style={{ display: "block", margin: "0 auto" }}
          >
            더보기
          </Button>
        </div>
      ) : (
        <Spin
          style={{
            margin: "30px auto 0",
            display: "block",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          indicator={antIcon}
        />
      )}
    </>
  );
};

export default memo(TagList);
