// style
import "@/views/main/style/summary.sass";
import arrowUp from "@/assets/imgs/icon/arrow_up_black.svg";
import arrowDown from "@/assets/imgs/icon/arrow_down_black.svg";

// api
import { getSearch } from "@/api/common/common";
import { getSummary } from "@/api/main/summary";

// component
import SideBar from "@/views/main/components/SideBar";

// import
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// type
import { summaryData } from "@/types/summaryData";

const SummaryPage = () => {
  // value
  const [keyword, setKeyword] = useState<string>("");
  const [tap, setTap] = useState<string>("all");
  const [order, setOrder] = useState<string>("created");
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [checkCount, setCheckCount] = useState<number>(0);
  const [summary, setSummary] = useState<Array<summaryData>>([]);
  const orderRef = useRef<HTMLDivElement | null>(null);

  // 전체 선택 여부 체크
  const isAllSelected = summary.every((row) => row.selected);

  // 전체 선택 / 해제
  const handleSelectAll = () => {
    const newData = summary.map((row) => ({ ...row, selected: !isAllSelected }));
    setSummary(newData);
  };

  // 개별 선택 / 해제
  const handleSelectRow = (id: Number) => {
    const newData = summary.map((row) =>
      row.id === id ? { ...row, selected: !row.selected } : row
    );
    setSummary(newData);
  };

  const getSearchList = () => {
    setTap("all")
    setOrder("created")
    let params = {
      tap: 'summary',
      keyword: keyword,
    };
    getSearch(params).then((res: any) => {
      const mappedSummary = res.data.data.map((item: any, index: number) => {
        const result = item.result[0] || {};
  
        return {
          id: index,
          creator: item.creator,
          projectId: item.projectId,
          projectName: item.projectName,
          sizeInBytes: result.sizeInBytes?.toString() || "0",
          updatedAt: item.updatedAt,
          selected: false,
        };
      });

      setSummary(mappedSummary);
    });
  };

  const getSummaryList = () => {
    let params = {
      sort: order,
      filterType: tap,
    };
    getSummary(params).then((res: any) => {
      const dataWithSelection = res.data.data.map((item: any, i: number) => ({
        ...item,
        selected: false,
        id: i,
      }));
      setSummary(dataWithSelection);
    });
    console.log(summary)
  };

  useEffect(() => {
    getSummaryList();
  }, [order, tap]);

  useEffect(() => {
    if (!summary) return;
    setIsCheck(summary.some((row) => row.selected));
    setCheckCount(summary.filter((row) => row.selected).length);
  }, [summary]);

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
      <div className="summary-wrap">
        <div className="nevigation-wrap">
          <div className="title-wrap">
            <h2>요약본</h2>
            <div className="search-wrap">
              <input 
                type="text"
                placeholder="요약본명 검색"
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
                  내 요약본
                </li>
                <li
                  className={tap === "invited" ? "tap-li active" : "tap-li"}
                  onClick={() => setTap("invited")}
                >
                  초대된 요약본
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
                        <button className="cancel" onClick={() => setSummary(summary.map(row => ({ ...row, selected: false })))}>취소</button>
                      </div>
                    </th>
                  ) : (
                    <th>회의 이름</th>
                  )
                }
                <th>생성일</th>
                <th>생성자</th>
                <th>문서크기(KB)</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((list) => (
                <tr key={list.id} onClick={() => handleSelectRow(list.id)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={list.selected}
                    />
                  </td>
                  <td>{list.projectName}</td>
                  <td>{new Date(list.updatedAt).toLocaleDateString()}</td>
                  <td>{list.creator}</td>
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

export default SummaryPage;
