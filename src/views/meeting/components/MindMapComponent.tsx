import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Node
} from "@xyflow/react";

// style
import "@xyflow/react/dist/style.css";
import "@/views/meeting/style/mind-map.sass";

// api
import { postScript } from "@/api/meeting/meeting";

// component
import UseSpeechToText from "@/views/meeting/components/UseSpeechToText";
import useRecordingTimer from "@/views/meeting/components/RecodingTimer";

// import
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import html2canvas from 'html2canvas';

// type
import { conferenceData } from "@/types/conferanceData";

interface scriptData {
  time: string;
  script: string;
}

interface MindMapComponentProps {
  setScripts: React.Dispatch<React.SetStateAction<scriptData[]>>;
  conferenceData: conferenceData;
}

const MindMapComponent = ({
  setScripts,
  conferenceData,
}: MindMapComponentProps) => {
  const {
    // transcript,
    isRecording,
    isPaused,
    toggleListening,
    pauseRecording,
    resumeRecording,
    finalTranscript,
    resetTranscript,
    // audioUrl,
  } = UseSpeechToText();

  const { formattedTime } = useRecordingTimer(isRecording, isPaused);

  const [scriptList, setScriptList] = useState<
  { time: string; script: string }[]
  >([]);

  const [mode, setMode] = useState<string>("none");

  const meetingStart = () => {
    const client = new Client({
      brokerURL: "wss://www.moaba.site/ws", // 서버 WebSocket URL q
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("연결");
        client.subscribe(
          `/topic/conference/${conferenceData.projectId}/participants`,
          (message: any) => {
            const data: any = JSON.parse(message.body);
            console.log(data.participants);
          }
        );
      },
      onWebSocketError: (event) => {
        console.error("❌ WebSocket 연결 실패:", event);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 에러:", frame);
      },
      // onConnect: (conn: any) => {
      //   console.log('[+] WebSocket 연결이 되었습니다.', conn);
      //   // client.subscribe(SUB_ENDPOINT, (message: IMessage) => {
      //   //   const receiveData = JSON.parse(message.body);
      //   // });
      // },
    });
    console.log(client);
    client.activate();

    // getProfile().then((res: any) => {
    //   let data = {
    //     "event": "participant_join",
    //     "projectId": projectId,
    //     "memberId": res.data.data.memberId
    //   }
    //   getInviting(projectId, data).then((res: any) => {

    //   })
    // })
  };

  const handleDownload = (title: string, ref: React.RefObject<HTMLDivElement>) => () => {
    if (!ref.current) return;

    html2canvas(ref.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = title === '' ? '제목없음' : title;
      document.body.appendChild(link);
      link.click();
    });
  };

  useEffect(() => {
    if (finalTranscript !== "") {
      const newScript = {
        time: formattedTime,
        script: finalTranscript,
      };

      setScripts((prev) => [...prev, newScript]);
      setScriptList((prev) => {
        const updated = [...prev, newScript];

        if (updated.length >= 2) {
          const testString = updated.map((item) => item.script).join(" ");

          let data = {
            "event": "script",
            "projectId": conferenceData.projectId,
            "scription": testString
          }
          postScript(data).then((res: any) => {
            setScriptList([]);
            setInitialNodes(res.data.data.nodes)
          });
        }

        return updated.length >= 7 ? [] : updated;
      });

      resetTranscript();
    }
  }, [finalTranscript]);

  const stopClick = () => {
    toggleListening();
  };

  const [initialNodes, setInitialNodes] = useState<Node[]>([
    {
      id: '1',
      type: 'input',
      data: { label: '회의 키워드' },
      position: { x: -150, y: 0 },
    },
    // {
    //   id: '2',
    //   type: 'output',
    //   data: { label: '키워드드' },
    //   position: { x: 150, y: 0 },
    // },
    // {
    //   id: '1',
    //   type: 'input',
    //   data: { label: 'Start here...' },
    //   position: { x: -150, y: 0 },
    // },
    // {
    //   id: '2',
    //   type: 'input',
    //   data: { label: '...or here!' },
    //   position: { x: 150, y: 0 },
    // },
    // { id: '3', data: { label: 'Delete me.' }, position: { x: 0, y: 100 } },
    // { id: '4', data: { label: 'Then me!' }, position: { x: 0, y: 200 } },
    // {
    //   id: '5',
    //   type: 'output',
    //   data: { label: 'End here!' },
    //   position: { x: 0, y: 300 },
    // },
  ]);

  const initialEdges = [
    { id: "1->2", source: "1", target: "3" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]); // 임시방편으로 만듦

  const onConnect = useCallback(
    (params: any) => setEdges(addEdge(params, edges)),
    [edges]
  );

  const onNodesDelete = useCallback(
    (deleted: any[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge: { id: string; source: string; target: string }) =>
              !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  return (
    <div className="mind-map-container">
      {mode === "none" ? (
        <div className="start-wrap">
          <p>
            녹음을 시작하고 자동으로 생성되는
            <br />
            마인드맵을 확인해보세요.
          </p>
          <button
            className="btn-mic"
            onClick={() => (
              toggleListening().then(() => {
                setMode("meeting");
              })
            )}
          >
            녹음 시작하기
          </button>
        </div>
      ) : (
        <div className="mind-map-main">
          <div className="mind-map-wrap">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onNodesDelete={onNodesDelete}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              attributionPosition="top-right"
            ></ReactFlow>
          </div>
          <div className="middle-bar">
            <div className="record-length-wrap">
              <div className="box-wrap">
                <div className="red box"></div>
                {Array.from({ length: 9 }).map(() => (
                  <div className="box"></div>
                ))}
              </div>
              <div className="box-time">{formattedTime}</div>
              {isRecording && (
                <div className="box-menu">
                  {isRecording && !isPaused && (
                    <button
                      className="btn-pause"
                      onClick={pauseRecording}
                    ></button>
                  )}
                  {isRecording && isPaused && (
                    <button className="btn-resume" onClick={resumeRecording}></button>
                  )}
                  <button className="btn-stop" onClick={stopClick}></button>
                </div>
              )}
            </div>
          </div>
          <div className="keyword-container">
            <h2>라이브 키워드</h2>
            <div className="main-keyword-wrap">
              <h3>주요 키워드</h3>
              <div className="keyword-wrap">
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
              </div>
            </div>
            <div className="recommend-keyword-wrap">
              <h3>추천 키워드</h3>
              <div className="keyword-wrap">
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
                <div className="keyword">GPU</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapComponent;
