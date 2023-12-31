import { useView } from "../contexts/ViewContext";
import Confetti from "react-confetti";
import LoginPage from "./LoginPage/LoginPage";
import MapPage from "./MapPage/MapPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { loggedIn, showConfetti } = useView();

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      {showConfetti && <Confetti />}
      {loggedIn || sessionStorage.getItem("loggedIn") === "true" ? (
        <MapPage />
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default HomePage;
