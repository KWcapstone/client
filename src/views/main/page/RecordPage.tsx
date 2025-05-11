// style
import "@/views/main/style/record.sass";
import arrowUp from "@/assets/imgs/icon/arrow_up_black.svg";
import arrowDown from "@/assets/imgs/icon/arrow_down_black.svg";

// api
import { getSearch } from "@/api/common/common";
import { getRecord } from "@/api/main/record";

// component
import SideBar from "@/views/main/components/SideBar";

// import
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// type
import { recordData } from "@/types/recordData";

const RecordPage = () => {
  // value
  const [keyword, setKeyword] = useState<string>("");
  const [tap, setTap] = useState<string>("all");
  const [order, setOrder] = useState<string>("created");
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [checkCount, setCheckCount] = useState<number>(0);
  const [record, setRecord] = useState<Array<recordData>>([]);
  const orderRef = useRef<HTMLDivElement | null>(null);

  // 전체 선택 여부 체크
  const isAllSelected = record.every((row) => row.selected);

  // 전체 선택 / 해제
  const handleSelectAll = () => {
    const newData = record.map((row) => ({ ...row, selected: !isAllSelected }));
    setRecord(newData);
  };

  // 개별 선택 / 해제
  const handleSelectRow = (id: Number) => {
    const newData = record.map((row) =>
      row.id === id ? { ...row, selected: !row.selected } : row
    );
    setRecord(newData);
  };

  const getSearchList = () => {
    setTap("all")
    setOrder("created")
    let params = {
      tap: 'record',
      keyword: keyword,
    };
    getSearch(params).then((res: any) => {
      const mappedData: recordData[] = res.data.data.map((item: any, index: number) => {
        const result = item.result[0] || {};
        return {
          creator: item.creator,
          recordId: [], // 해당 구조에는 recordId가 없으므로 빈 배열 처리
          name: item.projectName,
          sizeInBytes: result.sizeInBytes?.toString() || "0",
          length: result.length || 0,
          updatedAt: item.updatedAt,
          selected: false,
          id: index, // 인덱스를 고유 ID로 사용
        };
      });
      setRecord(mappedData);
    });
  };

  const formatDuration = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    const parts = [];
    if (hrs > 0) parts.push(`${hrs}시간`);
    if (mins > 0) parts.push(`${mins}분`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}초`);
  
    return parts.join(" ");
  };

  const getRecordList = () => {
    let params = {
      sort: order,
      filterType: tap,
    };
    getRecord(params).then((res: any) => {
      const dataWithSelection = res.data.data.map((item: any, i: number) => ({
        ...item,
        selected: false,
        id: i,
      }));
      setRecord(dataWithSelection);
    });
    console.log(record)
  };

  useEffect(() => {
    getRecordList();
  }, [order, tap]);

  useEffect(() => {
    if (!record) return;
    setIsCheck(record.some((row) => row.selected));
    setCheckCount(record.filter((row) => row.selected).length);
  }, [record]);

  useEffect(() => {
    const orderClickOutside = (e: MouseEvent) => {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setShowOrder(false);
      }
    };

    document.addEventListener("mousedown", orderClickOutside);
    return () => {
      document.removeEventListener("mousedown", orderClickOutside);
    };
  }, []);

  return (
    <div className="main">
      <SideBar />
      <div className="record-wrap">
        <div className="nevigation-wrap">
          <div className="title-wrap">
            <h2>음성・스크립트</h2>
            <div className="search-wrap">
              <input 
                type="text"
                placeholder="음성명 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getSearchList();
                  }
                }}  
              />
              <Link to="/meeting">새로 만들기</Link>
            </div>
          </div>
          <div className="sort-wrap">
            <div className="tap-wrap">
              <ul className="tap-ul">
                <li
                  className={tap === "all" ? "tap-li active" : "tap-li"}
                  onClick={() => setTap("all")}
                >
                  전체
                </li>
                <li
                  className={tap === "my" ? "tap-li active" : "tap-li"}
                  onClick={() => setTap("my")}
                >
                  내 음성
                </li>
                <li
                  className={tap === "invited" ? "tap-li active" : "tap-li"}
                  onClick={() => setTap("invited")}
                >
                  초대된 음성
                </li>
              </ul>
            </div>
            <div className="order-wrap" ref={orderRef}>
              <button
                onClick={() => setShowOrder(!showOrder)}
                className="order-button"
              >
                {order === "created" ? "최신순" : "오래된 순"}
                <img
                  src={showOrder ? arrowUp : arrowDown}
                  className="order-img"
                />
              </button>
              {showOrder && (
                <ul className="order-ul">
                  <li
                    onClick={() => {
                      setOrder("created");
                      setShowOrder(false);
                    }}
                    className="order-li"
                  >
                    최신순
                  </li>
                  <li
                    onClick={() => {
                      setOrder("latest");
                      setShowOrder(false);
                    }}
                    className="order-li"
                  >
                    오래된 순
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th onClick={handleSelectAll}>
                  <input type="checkbox" checked={isAllSelected}/>
                </th>
                {
                  isCheck ? (
                    <th>
                      <div className="craft-wrap">
                        <div>{ checkCount }개 선택됨</div>
                        <button className="dwn">다운로드 하기</button>
                        <button className="del">삭제하기</button>
                        <button className="cancel" onClick={() => setRecord(record.map(row => ({ ...row, selected: false })))}>취소</button>
                      </div>
                    </th>
                  ) : (
                    <th>회의 이름</th>
                  )
                }
                <th>생성일</th>
                <th>생성자</th>
                <th>음성 길이</th>
                <th>문서크기(KB)</th>
              </tr>
            </thead>
            <tbody>
              {record.map((list) => (
                <tr key={list.id} onClick={() => handleSelectRow(list.id)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={list.selected}
                    />
                  </td>
                  <td>{list.name}</td>
                  <td>{new Date(list.updatedAt).toLocaleDateString()}</td>
                  <td>{list.creator}</td>
                  <td>{formatDuration(list.length)}</td>
                  <td>{list.sizeInBytes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
