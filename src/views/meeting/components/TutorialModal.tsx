import { useRef, useState } from "react";
import img1 from "@/assets/imgs/meeting/tutorial/img-1.png";
import img2 from "@/assets/imgs/meeting/tutorial/img-2.png";
import img3 from "@/assets/imgs/meeting/tutorial/img-3.png";
import img4 from "@/assets/imgs/meeting/tutorial/img-4.png";
import "@/views/meeting/style/tutorial-modal.sass";
import Modal from "@/views/components/modal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from "swiper";
import { Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    img: img1,
    title: "함께할 팀원을 초대하고 프로젝트를 시작하세요",
    desc: [
      "‘공유하기’ 버튼을 눌러 이메일 또는 링크로 팀원을 간편하게 초대해요.",
      "초대한 팀원은 공유 목록에서 바로 확인할 수 있어요.",
      "프로젝트명을 클릭해 자유롭게 수정할 수 있어요.",
    ],
  },
  {
    img: img2,
    title: "녹음을 시작하면 자동으로 펼쳐지는 아이디어",
    desc: [
      "음성 녹음을 시작하면, 대화 중 자주 언급되거나 중요한 단어는",
      "키워드로 실시간 추출되며 아이디어 마인드맵이 실시간으로 정리돼요.",
      "또한 AI가 대화 흐름을 분석해 요약본도 함께 제공해요.",
    ],
  },
  {
    img: img3,
    title: "마인드맵을 직접 수정하며 생각을 확장해보세요!",
    desc: [
      "라이브모드를 해제하면 마인드맵을 직접 수정할 수 있어요.",
      "직접 키워드를 선택해 마인드맵에 추가하거나, 추천 키워드를 참고해",
      "아이디어를 확장해보세요. 키워드를 추가할수록 마인드맵이 더 풍부해져요.",
    ],
  },
  {
    img: img4,
    title: "아이디어를 정리하고, 언제든 다시 꺼내봐요",
    desc: [
      "‘회의 종료’ 버튼을 누르면 지금까지의 아이디어들이 정리돼 저장돼요.",
      "언제든 메인 페이지에서 프로젝트 파일을 한눈에 확인하세요.",
      "마인드맵, 키워드, 요약본을 각 파일로 다운로드할 수도 있어요!",
    ],
  },
];

interface TutorialModalProps {
  onCloseModal: () => void;
}

const TutorialModal = ({
  onCloseModal,
}: TutorialModalProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === slides.length - 1;

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="modal-wrap">
        <Swiper
          onSwiper={(swiper:any) => (swiperRef.current = swiper)}
          onSlideChange={(swiper:any) => setActiveIndex(swiper.activeIndex)}
          effect="fade"
          speed={500}
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
          allowTouchMove={false}
          modules={[EffectFade, Pagination]}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="img-wrap">
                <img src={slide.img} alt={`slide-${index}`} />
              </div>
              <div className="desc-wrap">
                <b>{slide.title}</b>
                <p>
                  {slide.desc.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="btn-wrap">
          <button onClick={onCloseModal}>건너뛰기</button>
          <button className="btn-next" onClick={() => {
              if (isLastSlide) {
                onCloseModal();
              } else {
                swiperRef.current?.slideNext();
              }
            }}>{isLastSlide ? "시작하기" : "다음"}</button>
        </div>
      </div>
    </Modal>
  );
};

export default TutorialModal;
