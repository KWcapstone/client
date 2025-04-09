// style
import "@/views/main/style/record.sass";
import arrow from "@/assets/imgs/icon/arrow_down_black.svg";

// component
import SideBar from "@/views/main/components/SideBar";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RecordPage = () => {
  const [tab, setTab] = useState<string>("all");
  const [order, setOrder] = useState<boolean>(true);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [checkCount, setCheckCount] = useState<number>(0);

  const [data, setData] = useState([
    { id: 1, name: "test1", date: "", user: "", time: "", size: "", selected: false },
    { id: 2, name: "test2", date: "", user: "", time: "", size: "", selected: false },
    { id: 3, name: "test3", date: "", user: "", time: "", size: "", selected: false },
    { id: 4, name: "test4", date: "", user: "", time: "", size: "", selected: false },
  ]);

  // 전체 선택 여부 체크
  const isAllSelected = data.every((row) => row.selected);

  // 전체 선택 / 해제
  const handleSelectAll = () => {
    const newData = data.map((row) => ({ ...row, selected: !isAllSelected }));
    setData(newData);
  };

  // 개별 선택 / 해제
  const handleSelectRow = (id: Number) => {
    const newData = data.map((row) =>
      row.id === id ? { ...row, selected: !row.selected } : row
    );
    setData(newData);
  };

  useEffect(() => {
    setIsCheck(data.some(row => row.selected));
    const count = data.filter(row => row.selected).length;
    setCheckCount(count);
  }, [data]);


  return (
    <div className="main">
      <SideBar />
      <div className="record-wrap">
        <div className="nevigation-wrap">
          <div className="title-wrap">
            <h2>음성・스크립트</h2>
            <div className="search-wrap">
              <input type="text" placeholder="음성명 검색" />
              <Link to="/meeting">새로 만들기</Link>
            </div>
          </div>
          <div className="sort-wrap">
            <div className="tab-wrap">
              <ul>
                <li className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>전체</li>
                <li className={tab === "mine" ? "active" : ""} onClick={() => setTab("mine")}>내 음성</li>
                <li className={tab === "invite" ? "active" : ""} onClick={() => setTab("invite")}>초대된 음성</li>
              </ul>
            </div>
            <div className="order-wrap">
              <button onClick={() => setShowOrder(!showOrder)}>{ order ? "최신순" : "오래된 순" }<img src={arrow}/></button>
              {
                showOrder &&
                <ul>
                  <li onClick={() => {setOrder(true); setShowOrder(false)}}>최신순</li>
                  <li onClick={() => {setOrder(false); setShowOrder(false)}}>오래된 순</li>
                </ul>
              }
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
                        <button className="cancel" onClick={() => setData(data.map(row => ({ ...row, selected: false })))}>취소</button>
                      </div>
                    </th>
                  ) : (
                    <th>회의 이름</th>
                  )
                }
                <th>생성일</th>
                <th>생성자</th>
                <th>음성 길이</th>
                <th>문서크기</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} onClick={() => handleSelectRow(row.id)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.selected}
                    />
                  </td>
                  <td>{row.name}</td>
                  <td>{row.date}</td>
                  <td>{row.user}</td>
                  <td>{row.time}</td>
                  <td>{row.size}</td>
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
