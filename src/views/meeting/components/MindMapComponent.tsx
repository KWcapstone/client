import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "@xyflow/react";

// style
import "@xyflow/react/dist/style.css";
import "@/views/meeting/style/mind-map.sass";

// import { getProfile } from "@/api/main/profile";

// component
import UseSpeechToText from "@/views/meeting/components/UseSpeechToText";
import useRecordingTimer from "@/views/meeting/components/RecodingTimer";

// import
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

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

  console.log("컨퍼런스 데이터 :", conferenceData);

  const { formattedTime } = useRecordingTimer(isRecording, isPaused);

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

  useEffect(() => {
    if (finalTranscript !== "") {
      // console.log("🎙️ 시간", formattedTime);
      // console.log("🎙️ 인식된 텍스트:", finalTranscript);
      setScripts((prev) => [
        ...prev,
        {
          time: formattedTime,
          script: finalTranscript,
        },
      ]);
    }

    // 여기서 백엔드한테 보내기
    resetTranscript();
  }, [finalTranscript]);

  const stopClick = () => {
    toggleListening();
  };

  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Start here..." },
      position: { x: -150, y: 0 },
    },
    {
      id: "2",
      type: "input",
      data: { label: "...or here!" },
      position: { x: 150, y: 0 },
    },
    { id: "3", data: { label: "Delete me." }, position: { x: 0, y: 100 } },
    { id: "4", data: { label: "Then me!" }, position: { x: 0, y: 200 } },
    {
      id: "5",
      type: "output",
      data: { label: "End here!" },
      position: { x: 0, y: 300 },
    },
  ];

  const initialEdges = [
    { id: "1->3", source: "1", target: "3" },
    { id: "2->3", source: "2", target: "3" },
    { id: "3->4", source: "3", target: "4" },
    { id: "4->5", source: "4", target: "5" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
  }, []); // 임시방편으로 만듦

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
              }),
              meetingStart()
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
                    <button className="btn-resume" onClick={resumeRecording}>
                      재개
                    </button>
                  )}
                  <button className="btn-stop" onClick={stopClick}></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapComponent;
