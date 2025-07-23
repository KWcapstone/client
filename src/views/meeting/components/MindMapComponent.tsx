import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Node,
  Edge,
} from "@xyflow/react";

// style
import "@xyflow/react/dist/style.css";
import "@/views/meeting/style/mind-map.sass";

// api
import { nameUpdate, postScript, endMeeting } from "@/api/meeting/meeting";
import { getProfile } from "@/api/main/profile";

// component
import UseSpeechToText from "@/views/meeting/components/UseSpeechToText";
import useRecordingTimer from "@/views/meeting/components/RecodingTimer";

// import
import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import html2canvas from "html2canvas";

// type
import { conferenceData } from "@/types/conferanceData";
import { RealTimeSummaryData } from "@/types/realTimeSummaryData";

interface scriptData {
  time: string;
  script: string;
}

interface MindMapComponentProps {
  setScripts: React.Dispatch<React.SetStateAction<scriptData[]>>;
  conferenceData: conferenceData;
  setSummary: React.Dispatch<React.SetStateAction<RealTimeSummaryData[]>>;
}

const MindMapComponent = ({
  setScripts,
  conferenceData,
  setSummary,
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
    audioBlob,
  } = UseSpeechToText();

  const { formattedTime } = useRecordingTimer(isRecording, isPaused);

  const [, setScriptList] = useState<{ time: string; script: string }[]>([]);

  const [allScripts, setAllScripts] = useState<string[]>([]);

  const [mode, setMode] = useState<string>("none");

  const [mainKeyword, setMainKeyword] = useState([]);
  const [recommendKeyword, setRecommendKeyword] = useState([]);

  const mindMapRef = useRef<HTMLDivElement>(null);

  const clientRef = useRef<Client | null>(null); // WebSocket 클라이언트 저장

  const meetingStart = () => {
    const client = new Client({
      brokerURL: "ws://3.39.11.168:8080/ws",
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        client.subscribe(
          `/topic/conference/${conferenceData.projectId}`,
          (message: any) => {
            const data: any = JSON.parse(message.body);
            console.log(data);

            if (data.event === "liveOn") {
              // GPT 응답이 들어온 경우
              setSummary((prev) => [
                ...prev,
                {
                  time: formattedTime,
                  title: data.summary.title,
                  item: data.summary.content,
                },
              ]);

              setInitialNodes(data.nodes);

              const edges = data.nodes
                .filter((node: any) => node.parentId)
                .map((node: any, index: number) => ({
                  id: `${index}`,
                  source: node.parentId!,
                  target: node.id,
                }));

              setInitialEdges(edges);

              setMainKeyword(
                JSON.parse(data.mainKeywords).map((x: any, i: number) => ({
                  id: i,
                  value: x,
                }))
              );
              setRecommendKeyword(
                JSON.parse(data.recommendedKeywords)
                  .filter(Boolean)
                  .map((x: any, i: number) => ({ id: i, value: x }))
              );
            }
          }
        );

        getProfile().then((res: any) => {
          client.publish({
            destination: `/app/conference/${conferenceData.projectId}/modify_inviting`,
            body: JSON.stringify({
              event: "participant_join",
              projectId: conferenceData.projectId,
              memberId: res.data.data.memberId,
            }),
          });
        });
      },
      onWebSocketError: (event) => {
        console.error("❌ WebSocket 연결 실패:", event);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 에러:", frame);
      },
    });
    console.log(client);
    client.activate();
    clientRef.current = client;
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
      setAllScripts((prev) => [...prev, finalTranscript]);
      setScriptList((prev) => {
        const updated = [...prev, newScript];

        if (updated.length >= 2 && clientRef.current?.connected) {
          console.log('스크립트 전송')
          const testString = updated.map((item) => item.script).join(" ");
          const data = {
            event: "script",
            projectId: conferenceData.projectId,
            scription: testString,
          };

          // WebSocket 기반 GPT 마인드맵 요청
          clientRef.current.publish({
            destination: `/app/conference/${conferenceData.projectId}/script`,
            body: JSON.stringify(data),
          });
          
          console.log(JSON.stringify(data))

          setScriptList([]);
        }

        // if (updated.length >= 7) {
        //   const testString = updated.map((item) => item.script).join(" ");

        //   let data = {
        //     event: "script",
        //     projectId: conferenceData.projectId,
        //     scription: testString,
        //   };
        //   postScript(conferenceData.projectId, data).then((res: any) => {
        //     setScriptList([]);

        //     setSummary((prev) => [
        //       ...prev,
        //       {
        //         time: formattedTime,
        //         title: res.data.data.summary.title,
        //         item: res.data.data.summary.content,
        //       },
        //     ]);

        //     setInitialNodes(res.data.data.nodes);
        //     const edges = res.data.data.nodes
        //       .filter((node: any) => node.parentId)
        //       .map((node: any, index: number) => ({
        //         id: `${index}`,
        //         source: node.parentId!,
        //         target: node.id,
        //       }));

        //     setInitialEdges(edges);
        //     setMainKeyword(
        //       JSON.parse(res.data.data.mainKeywords).map(
        //         (x: any, i: number) => ({ id: i, value: x })
        //       )
        //     );
        //     setRecommendKeyword(
        //       JSON.parse(res.data.data.recommendedKeywords)
        //         .filter(Boolean)
        //         .map((x: any, i: number) => ({ id: i, value: x }))
        //     );
        //   });
        // }

        return updated.length >= 2 ? [] : updated;
      });

      resetTranscript();
    }
  }, [finalTranscript]);

  const stopClick = async () => {
    console.log("asd");
    toggleListening();
    setMode("end");

    const fullScript = allScripts.join(" ");

    if (mindMapRef.current) {
      console.log("afaf");
      const canvas = await html2canvas(mindMapRef.current);
      const imageBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b: any) => resolve(b), "image/jpeg")
      );

      console.log(audioBlob);

      if (imageBlob && audioBlob) {
        console.log("qwtwtqw");
        const imageData = new FormData();
        imageData.append("file", imageBlob, "mindmap.jpg");

        const audioData = new FormData();
        audioData.append("file", audioBlob, "recording.webm");

        let data = {
          projectId: conferenceData.projectId,
          scription: fullScript,
          record: audioData,
          node: imageData,
        };
        endMeeting(data).then((res: any) => {
          console.log(res);
        });
      }
    }
  };

  const [initialNodes, setInitialNodes] = useState<Node[]>([
    {
      id: "1",
      type: "input",
      data: { label: "회의 키워드" },
      position: { x: -150, y: 0 },
    },
    {
      id: "2",
      type: "output",
      data: { label: "다음 키워드" },

      position: { x: 150, y: 0 },
    },
  ]);

  const [initialEdges, setInitialEdges] = useState<Edge[]>([
    { id: "1", source: "1", target: "2" },
  ]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]); // 임시방편으로 만듦

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

const ClickKeyword = (keyword: string) => {
  const newNode: Node = {
    id: `${Date.now()}`,
    type: "default",
    data: { label: keyword },
    position: {
      x: Math.random() * 250,
      y: Math.random() * 250,
    },
  };

  setNodes((nds) => [...nds, newNode]);
};

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
            onClick={() => {
              toggleListening().then(() => {
                setMode("live");
                meetingStart();
              });
            }}
          >
            녹음 시작하기
          </button>
        </div>
      ) : (
        <div className="mind-map-main">
          <div className="mind-map-wrap" ref={mindMapRef}>
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
                <>
                  <div className="box-menu">
                    {isRecording && !isPaused && (
                      <button
                        className="btn-pause"
                        onClick={pauseRecording}
                      ></button>
                    )}
                    {isRecording && isPaused && (
                      <button
                        className="btn-resume"
                        onClick={resumeRecording}
                      ></button>
                    )}
                    <button className="btn-stop" onClick={stopClick}></button>
                  </div>
                  <div className="live-mode-wrap">
                    <input
                      className="btn-live"
                      type="checkbox"
                      id="live"
                      onClick={() => {
                        setMode(mode === "live" ? "meeting" : "live");
                      }}
                      checked={mode === "live"}
                    />
                    <label htmlFor="live"></label>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="keyword-container">
            <h2>라이브 키워드</h2>
            {mode === "live" ? (
              <>
                <div className="main-keyword-wrap">
                  <h3>주요 키워드</h3>
                  {mainKeyword.length ? (
                    <div className="keyword-wrap">
                      {mainKeyword.map((x: any) => (
                        <div
                          className="keyword"
                          id={x.id.toString()}
                          key={x.id}
                        >
                          {x.value}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>회의가 진행되면 주요 키워드가 자동 생성됩니다.</p>
                  )}
                </div>
                <div className="recommend-keyword-wrap">
                  <h3>추천 키워드</h3>
                  {recommendKeyword.length ? (
                    <div className="keyword-wrap">
                      {recommendKeyword.map((x: any) => (
                        <div
                          className="keyword"
                          id={x.id.toString()}
                          key={x.id}
                        >
                          {x.value}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>회의가 진행되면 추천 키워드가 자동 생성됩니다.</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="main-keyword-wrap">
                  <h3>주요 키워드</h3>
                  {mainKeyword.length ? (
                    <div className="keyword-wrap">
                      {mainKeyword.map((x: any) => (
                        <button
                          className="keyword"
                          id={x.id.toString()}
                          key={x.id}
                          onClick={() => {ClickKeyword(x.value)}}
                        >
                          {x.value}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>회의가 진행되면 주요 키워드가 자동 생성됩니다.</p>
                  )}
                </div>
                <div className="recommend-keyword-wrap">
                  <h3>추천 키워드</h3>
                  {recommendKeyword.length ? (
                    <div className="keyword-wrap">
                      {recommendKeyword.map((x: any) => (
                        <button
                          className="keyword"
                          id={x.id.toString()}
                          key={x.id}
                          onClick={() => {ClickKeyword(x.value)}}
                        >
                          {x.value}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>회의가 진행되면 주요 키워드가 자동 생성됩니다.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapComponent;
