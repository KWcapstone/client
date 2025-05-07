import logo from "@/assets/imgs/common/logo.svg";
import "@/views/splash/style/nav-bar.sass";
import { useEffect, useState } from "react";

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar = ({ onOpenModal }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY !== 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scroll" : ""}`}>
      <img src={logo} alt="logo" />
      <button onClick={onOpenModal} className="btn">
        로그인/회원가입
      </button>
    </nav>
  );
};

export default Navbar;
