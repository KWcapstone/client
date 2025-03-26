import logo from "@/assets/imgs/common/logo.svg";
import "@/views/splash/style/nav-bar.sass";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="logo" />
      <button>로그인/회원가입</button>
    </nav>
  );
};

export default Navbar;
