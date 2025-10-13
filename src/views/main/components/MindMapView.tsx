import React from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "@xyflow/react";

// style
import "@xyflow/react/dist/style.css";
import "@/views/meeting/style/mind-map.sass";

// api
import { getProfile } from "@/api/main/profile";

// import
import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import toltip from "@/assets/imgs/icon/toltip.svg";
// type
import { RealTimeSummaryData } from "@/types/realTimeSummaryData";

interface scriptData {
  time: string;
  script: string;
}

interface MindMapViewProps {
  setScripts: React.Dispatch<React.SetStateAction<scriptData[]>>;
  projectId: string;
  setSummary: React.Dispatch<React.SetStateAction<RealTimeSummaryData[]>>;
}

const MindMapView = ({
  setScripts,
  projectId,
  setSummary,
}: MindMapViewProps) => {
  const [mainKeyword, setMainKeyword] = useState([]);
  const [recommendKeyword, setRecommendKeyword] = useState([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const keywordRef = useRef<HTMLDivElement>(null);

  const clientRef = useRef<Client | null>(null); // WebSocket 클라이언트 저장

  useEffect(() => {
    const client = new Client({
      brokerURL: import.meta.env.VITE_API_WS_URL,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        client.subscribe(
          `/topic/conference/${projectId}`,
          (message: any) => {
            const data: any = JSON.parse(message.body);
            console.log(data);

            if (data.event === "create_node") {
              setInitialNodes(data.nodes);

              const edges = data.nodes
                .filter((node: any) => node.parentId)
                .map((node: any, index: number) => ({
                  id: `${index}`,
                  source: node.parentId!,
                  target: node.id,
                }));

              setInitialEdges(edges);
            }

            if (data.event === "summary") {
              setSummary((prev) => [
                ...prev,
                {
                  time: data.time,
                  title: data.title,
                  item: data.content,
                },
              ]);
            }

            if (data.event === "script") {
              console.log(data.scription)
              setScripts((prev) => [...prev, data.scription]);
            }

            if (data.event === "main_keywords") {
              setMainKeyword(
                data.keywords.map((x: any, i: number) => ({ id: i, value: x }))
              );
            }

            if (data.event === "recommended_keywords") {
              setRecommendKeyword(
                data.keywords.map((x: any, i: number) => ({ id: i, value: x }))
              );
            }
          }
        );

        getProfile().then((res: any) => {
          client.publish({
            destination: `/app/conference/${projectId}/modify_inviting`,
            body: JSON.stringify({
              event: "participant_join",
              projectId: projectId,
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
    client.activate();
    clientRef.current = client;

  }, []);

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

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]); // 임시방편으로 만듦

  return (
    <div className="mind-map-container">
      <div className="mind-map-main">
        <div className="mind-map-wrap" ref={mapRef}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            attributionPosition="top-right"
          ></ReactFlow>
        </div>
        <div className="keyword-container" ref={keywordRef}>
          <h2>라이브 키워드</h2>
          <div className="main-keyword-wrap">
            <h3>
              주요 키워드
              <div className="toltip-wrap">
                <img src={toltip} alt="" />
                <div className="toltip">
                  녹음 중 자동으로 추출된 핵심 키워드예요. 대화에서 자주
                  언급되는 단어나 중요한 개념을 실시간으로 분석해
                  제공해요.
                </div>
              </div>
            </h3>
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
            <h3>
              추천 키워드
              <div className="toltip-wrap">
                <img src={toltip} alt="" />
                <div className="toltip">
                  마인드맵에 추가하면 좋을 키워드를 추천해요. 대화의
                  흐름과 맥락을 분석해 관련성이 높은 키워드를 제안해요.
                </div>
              </div>
            </h3>
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
        </div>
      </div>
    </div>
  );
};

export default MindMapView;
