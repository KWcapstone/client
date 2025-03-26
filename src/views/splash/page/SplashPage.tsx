import Navbar from "@/views/splash/components/Navbar";
import "@/views/splash/style/splash.sass";

const SplashPage = () => {
  return (
    <>
      <Navbar />
      <div className="splash-wrap">
        <h1>Splash Page</h1>
      </div>
    </>
  );
};

export default SplashPage;
