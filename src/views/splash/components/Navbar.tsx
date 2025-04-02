import logo from "@/assets/imgs/common/logo.svg";
import "@/views/splash/style/nav-bar.sass";

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar = ({ onOpenModal }: NavbarProps) => {
  return (
    <nav className="navbar">
      <img src={logo} alt="logo" />
      <button onClick={onOpenModal} className="btn">
        로그인/회원가입
      </button>
    </nav>
  );
};

export default Navbar;
