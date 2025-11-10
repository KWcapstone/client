// style
import "@/views/splash/style/splash.sass";
import "@/views/components/style/modal.sass";
import splashIcon from "@/assets/imgs/common/splashIcon.svg";
import mainImage from "@/assets/imgs/common/splash_main_img.svg";
import solarSystem from "@/assets/imgs/common/splash_solarSystem.svg";
import keyword1 from "@/assets/imgs/common/splash_keyword1.svg";
import keyword2 from "@/assets/imgs/common/splash_keyword2.svg";
import keyword3 from "@/assets/imgs/common/splash_keyword3.svg";
import keyword4 from "@/assets/imgs/common/splash_keyword4.svg";
import keyword5 from "@/assets/imgs/common/splash_keyword5.svg";
import sec1icon from "@/assets/imgs/splash/sec1icon.svg";
import sec2icon from "@/assets/imgs/splash/sec2icon.svg";
import sec3icon from "@/assets/imgs/splash/sec3icon.svg";
import image from "@/assets/imgs/splash/image.svg";
import mindmap from "@/assets/imgs/splash/mindmap.svg";
import mindmapComponent from "@/assets/imgs/splash/mindmapComponent.svg";
import nodeedit from "@/assets/imgs/splash/nodeedit.svg";
import nodeeditComponent from "@/assets/imgs/splash/nodeeditComponent.svg";
import curser from "@/assets/imgs/splash/curser.svg";
import card1 from "@/assets/imgs/splash/card1.svg";
import card2 from "@/assets/imgs/splash/card2.svg";
import card3 from "@/assets/imgs/splash/card3.svg";
import card4 from "@/assets/imgs/splash/card4.svg";
import logo from "@/assets/imgs/splash/logo.svg";
import divider from "@/assets/imgs/splash/divider.svg";

// library
import { useState, useEffect, useRef } from "react";

// component
import Navbar from "@/views/splash/components/Navbar";
import LoginModal from "@/views/splash/components/LoginModal";
import SignupModal from "@/views/splash/components/SignupModal";
import AgreeModal from "@/views/splash/components/AgreeModal";
import PasswordResetModal from "@/views/splash/components/PasswordResetModal";

// api
import { getTest } from "@/api/common/common";

const SplashPage = () => {
  type ModalType = "login" | "signup" | "agree" | "resetPw" | null;
  const [modalType, setModalType] = useState<ModalType>(null);

  const modalBackground = useRef<HTMLDivElement>(null);

  const openLoginModal = () => setModalType("login");
  const openSignupModal = () => setModalType("signup");
  const openAgreeModal = () => setModalType("agree");
  const openResetPwModal = () => setModalType("resetPw");

  const closeModal = () => setModalType(null);

  const openModal = () => setModalType("login");

  useEffect(() => {
    getTest().then(() => {});
  }, []);

  return (
    <>
      <Navbar onOpenModal={openModal} />
      <div className="splash-wrap" ref={modalBackground}>
        {modalType === "login" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <LoginModal
              onCloseModal={closeModal}
              onOpenSignup={openSignupModal}
              onOpenResetPw={openResetPwModal}
            />
          </div>
        )}
        {modalType === "signup" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <SignupModal
              onCloseModal={closeModal}
              onOpenLogin={openLoginModal}
              onOpenAgree={openAgreeModal}
            />
          </div>
        )}
        {modalType === "agree" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <AgreeModal
              onCloseModal={closeModal}
              onOpenSignup={openSignupModal}
              onOpenLogin={openLoginModal}
            />
          </div>
        )}
        {modalType === "resetPw" && (
          <div
            className="modal-container"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            <PasswordResetModal
              onCloseModal={closeModal}
              onOpenLogin={openLoginModal}
            />
          </div>
        )}
        <div className="splash-container">
          <div className="hero-container">
            <div className="intro-container">
              <div className="intro-headline">
                음성에서 마인드맵까지,
                <br /> 아이디어를 더 스마트하게
              </div>
              <div className="intro-subheadline">
                아이디어는 자유롭게, 정리는 자동으로.
                <br /> 브레인스토밍이 가벼워지는 순간을 경험해보세요.
              </div>
              <button className="intro-btn" onClick={openLoginModal}>
                바로 무료 시작하기
              </button>
            </div>
            <div className="hero-logo">
              <img src={splashIcon} alt="logo" className="hero-logo-img" />
            </div>
          </div>
          <div className="main-image">
            <img src={mainImage} alt="main" className="main-image-img" />
          </div>
          <div className="spacial-container">
            <div className="spacial-headline">
              흩어진 아이디어를 한눈에 정리해요
            </div>
            <div className="spacial-subheadline">
              녹음을 통한 실시간 음성을 텍스트로 변환하고, 대화 키워드를
              <br /> 마인드맵으로 시각화하여 아이디어 정리를 돕습니다.
            </div>
            <div className="spacial-img">
              <img
                src={solarSystem}
                alt="solarSystem"
                className="spacial-solar-img"
              />
              <img src={keyword1} alt="keyword1" className="keyword1" />
              <img src={keyword2} alt="keyword2" className="keyword2" />
              <img src={keyword3} alt="keyword3" className="keyword3" />
              <img src={keyword4} alt="keyword4" className="keyword4" />
              <img src={keyword5} alt="keyword5" className="keyword5" />
            </div>
          </div>
          <div className="explanation-container left">
            <div className="explanation-paragraph">
              <div className="paragraph-mini">AI 음성 변환</div>
              <div className="paragraph-title">
                간편한 음성
                <br />
                텍스트 변환
              </div>
              <div className="paragraph-content">
                팀원들과 자유롭게 대화하세요. <br /> AI가 자동으로 빠르게
                텍스트를 정리합니다.
              </div>
              <img
                src={sec1icon}
                alt="AI 음성 변환 아이콘"
                className="paragraph-icon"
              />
            </div>
            <img src={image} alt="" className="explanation-image" />
          </div>
          <div className="explanation-container right">
            <img src={mindmap} alt="" className="explanation-image" />
            <div className="explanation-paragraph">
              <div className="paragraph-mini">라이브모드</div>
              <div className="paragraph-title">
                실시간 생성되는
                <br />
                마인드맵과 키워드
              </div>
              <div className="paragraph-content">
                라이브 모드 중 대화 내용을 실시간으로 분석해 <br />
                핵심 개념과 키워드를 시각적으로 정리합니다.
              </div>
              <img
                src={sec2icon}
                alt="라이브모드 아이콘"
                className="paragraph-icon"
              />
            </div>
          </div>
          <div className="explanation-container left">
            <div className="explanation-paragraph">
              <div className="paragraph-mini">마인드맵수정</div>
              <div className="paragraph-title">
                키워드를 자유롭게
                <br />
                고치고, 옮기기
              </div>
              <div className="paragraph-content">
                킹뤄드와 노드를 수정하며
                <br /> 마인드맵을 자유롭게 구성할 수 있습니다.
              </div>
              <img
                src={sec3icon}
                alt="마인드맵 수정 아이콘"
                className="paragraph-icon"
              />
            </div>
            <img src={nodeedit} alt="" className="explanation-image" />
          </div>
          <div className="summary-container">
            <div className="summary-paragraph">
              <div className="paragraph-mini">어디서든, 무엇이든</div>
              <div className="paragraph-title">
                아이디어를 정리하는 모든 순간
              </div>
              <div className="paragraph-content">
                학교 과제, 가으이 기록, 팀 브레인스토밍까지 생각을 <br />
                정리해야 하는 모든 상황에 자유롭게 활용하세요.
              </div>
            </div>
            <div className="summary-cards">
              <div className="card blue">
                <img src={card1} alt="card1" className="card-img" />
                <div className="card-paragraph">
                  <div className="card-title">강연 및 강의 노트</div>
                  <div className="card-content">
                    강의 내용을 빠르게
                    <br />
                    기록하고 정리할 때
                  </div>
                </div>
              </div>
              <div className="card red">
                <img src={card2} alt="card2" className="card-img" />
                <div className="card-paragraph">
                  <div className="card-title">학교 팀 프로젝트</div>
                  <div className="card-content">
                    새로운 아이디어를
                    <br />
                    논의하고 정리할 때
                  </div>
                </div>
              </div>
              <div className="card yellow">
                <img src={card3} alt="card3" className="card-img" />
                <div className="card-paragraph">
                  <div className="card-title">프로젝트 미팅</div>
                  <div className="card-content">
                    새로운 아이디어를
                    <br />
                    논의하고 정리할 때
                  </div>
                </div>
              </div>
              <div className="card purple">
                <img src={card4} alt="card4" className="card-img" />
                <div className="card-paragraph">
                  <div className="card-title">연구 및 논문 작성</div>
                  <div className="card-content">
                    인터뷰, 조사 애뇽을
                    <br />
                    빠르게 정리할 때
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="last-container">
            <div className="last-title">
              반짝이는 아이디어를 지금 모아보세요
            </div>
            <div className="last-content">
              지금 이 순간 떠오르는 생각을 <br /> 모아바가 잊지 않고
              정리해드려요.
            </div>
            <button className="last-btn">바로 무료 시작하기</button>
          </div>
          <footer>
            <img src={logo} alt="footer logo" />
            <div className="footer-nav">
              <button className="nav-tab">문의하기</button>
              <img src={divider} alt="" />
              <button className="nav-tab">이용약관</button>
              <img src={divider} alt="" />
              <button className="nav-tab">개인정보 처리방침</button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
